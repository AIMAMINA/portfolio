import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import { About, Contact, Hero, Journey, Marquee, Playground, Skills, Travel, Work } from "./components/Sections";
import { profile } from "./content";
import { useReveal, useTheme } from "./hooks";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Path" },
  { href: "#skills", label: "Skills" },
  { href: "#terminal", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

import photo from "./assets/photo.webp";

function Nav({ dark, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/80 py-3 backdrop-blur-md dark:bg-noir/80" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-3xl italic">
          {profile.firstName}
          <span className="text-coral dark:text-coral-light">.</span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-6">
          <ul className="hidden items-center gap-7 text-sm sm:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-coral after:transition-all hover:after:w-full">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid size-10 place-items-center rounded-full ring-1 ring-ink/15 transition-colors hover:ring-coral dark:ring-pearl/20"
          >
            <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              {dark ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              )}
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const [dark, toggle] = useTheme();
  useReveal();

  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-cream focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Cursor />
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero dark={dark} />
        <Marquee />
        <Work />
        <About photo={photo} />
        <Journey />
        <Skills />
        <Playground />
        <Travel />
        <Contact />
      </main>
      <footer className="bg-ink py-8 text-center font-mono text-xs text-sand/70 dark:bg-noir">
        Designed and built by {profile.firstName} with React, Tailwind CSS and a lot of coffee ☕ · {new Date().getFullYear()}
      </footer>
    </>
  );
}
