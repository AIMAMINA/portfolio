import { useEffect, useState } from "react";

/** Adds .is-visible to every .reveal element when it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Types each word, waits, deletes it, then moves to the next one. */
export function useTypewriter(words, { typing = 85, deleting = 45, pause = 1600 } = {}) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let len = words[0].length;
    let removing = false;
    let timer;
    const tick = () => {
      const word = words[i];
      if (!removing && len === word.length) {
        removing = true;
        timer = setTimeout(tick, pause);
        return;
      }
      if (removing && len === 0) {
        removing = false;
        i = (i + 1) % words.length;
      }
      len += removing ? -1 : 1;
      setText(words[i].slice(0, len));
      timer = setTimeout(tick, removing ? deleting : typing);
    };
    timer = setTimeout(tick, pause);
    return () => clearTimeout(timer);
  }, [words, typing, deleting, pause]);
  return text;
}

/** Light / dark theme, remembered between visits. */
export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    } catch {
      /* storage unavailable */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
}
