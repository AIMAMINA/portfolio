import { useEffect, useRef, useState } from "react";

/** A small dot and a soft ring that trails behind it. Desktop (mouse) only. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hovering = false;
    let frame;

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      hovering = !!e.target.closest("a, button, [data-cursor]");
    };
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      const scale = hovering ? 1.9 : 1;
      ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${scale})`;
      ring.current.style.opacity = hovering ? "0.55" : "1";
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    frame = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] size-2 rounded-full bg-coral dark:bg-coral-light"
      />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] size-9 rounded-full border border-coral/60 transition-[opacity] duration-300 dark:border-gold-light/70"
      />
    </>
  );
}
