import { useEffect, useRef } from "react";

const PALETTES = {
  light: ["#e8826b", "#e9c7a3", "#d9604c", "#f2b8a2"],
  dark: ["#f08a7e", "#d9b779", "#c9594b", "#eaa58f"],
};

/**
 * Liquid blobs that drift on their own and flow towards the mouse.
 * The SVG "goo" filter blurs then sharpens them so that they merge like liquid.
 */
export default function LiquidCanvas({ dark }) {
  const canvasRef = useRef(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let frame = 0;
    const mouse = { x: null, y: null };

    const blobs = Array.from({ length: 7 }, (_, i) => ({
      r: 70 + Math.random() * 90,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.35,
      color: i % 4,
      follow: i < 3, // the first blobs are attracted by the mouse
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min(1, w / 1200);
      blobs.forEach((b, i) => {
        b.base = (70 + (i * 37) % 90) * (0.55 + scale * 0.45);
        if (!b.x) {
          b.x = w * (0.45 + Math.random() * 0.5);
          b.y = h * (0.15 + Math.random() * 0.7);
        }
      });
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const palette = darkRef.current ? PALETTES.dark : PALETTES.light;
      const time = t / 1000;

      blobs.forEach((b, i) => {
        // Home position: a slow orbit that stays clear of the headline
        // (right side on desktop, top-right corner on phones)
        const narrow = w < 768;
        const homeX = narrow
          ? w * (0.82 + 0.14 * Math.sin(time * b.speed * 0.6 + b.phase))
          : w * (0.8 + 0.12 * Math.sin(time * b.speed * 0.6 + b.phase));
        const homeY = narrow
          ? h * (0.14 + 0.1 * Math.cos(time * b.speed * 0.5 + b.phase * 1.3))
          : h * (0.5 + 0.28 * Math.cos(time * b.speed * 0.5 + b.phase * 1.3));
        let tx = homeX;
        let ty = homeY;
        if (b.follow && mouse.x !== null) {
          tx = mouse.x + Math.cos(b.phase + i) * 40;
          ty = mouse.y + Math.sin(b.phase + i) * 40;
        }
        const k = b.follow && mouse.x !== null ? 0.012 : 0.004;
        b.vx = (b.vx + (tx - b.x) * k) * 0.9;
        b.vy = (b.vy + (ty - b.y) * k) * 0.9;
        b.x += b.vx;
        b.y += b.vy;

        const r = b.base * (1 + 0.1 * Math.sin(time * 1.4 + b.phase));
        ctx.fillStyle = palette[b.color];
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduce) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 36 -14" />
        </filter>
      </svg>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60 md:opacity-90 dark:opacity-75 md:dark:opacity-90"
        style={{ filter: "url(#goo)" }}
      />
    </>
  );
}
