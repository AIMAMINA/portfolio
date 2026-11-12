import { useEffect, useState } from "react";
import { About, Contact, Hero, Journey, Playground, Skills, Travel, Work } from "./components/Sections";
import { asides, profile } from "./content";
import { useReveal, useTheme } from "./hooks";
import photo from "./assets/photo.webp";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#path", label: "Path" },
  { href: "#terminal", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

function Nav({ dark, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-paper/90 py-3 backdrop-blur-md dark:border-line-dark dark:bg-stage/90" : "py-5 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="relative -ml-2 grid size-10 place-items-center md:hidden"
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] bg-current transition-all duration-300 ${open ? "top-1/2 w-6 -translate-y-1/2 -rotate-45" : "bottom-0 w-4"}`}
              />
              <span
                className={`absolute -bottom-[2px] left-[19px] size-[5px] rounded-full bg-accent transition-opacity duration-200 dark:bg-accent-dark ${open ? "opacity-0" : "opacity-100"}`}
              />
            </span>
          </button>
          <a href="#top" onClick={() => setOpen(false)} className="font-serif text-xl sm:text-2xl">
            {profile.firstName} {profile.lastName}
          </a>
        </div>
        <nav className="flex items-center gap-3 sm:gap-7">
          <ul className="hidden items-center gap-7 text-sm md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-mute transition-colors hover:text-ink dark:text-mute-dark dark:hover:text-chalk">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={dark}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-xs transition-colors hover:border-current dark:border-line-dark"
          >
            {dark ? "lights on" : "lights off"}
          </button>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full h-[100svh] border-t border-line bg-paper px-6 pt-8 dark:border-line-dark transition-[opacity,visibility] duration-300 md:hidden dark:bg-stage ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {NAV.map((n, i) => (
            <li key={n.href} className="flex items-baseline gap-4 border-b border-line py-3 dark:border-line-dark">
              <span className="font-mono text-xs text-mute dark:text-mute-dark">{String(i + 1).padStart(2, "0")}</span>
              <a href={n.href} onClick={() => setOpen(false)} className="font-serif text-4xl">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs text-mute dark:text-mute-dark">short list. like my attention span before coffee.</p>
      </div>
    </header>
  );
}

/** Lights off: a soft spotlight follows the mouse, like a stage. */
function Spotlight() {
  useEffect(() => {
    const el = document.getElementById("spotlight");
    const move = (e) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div id="spotlight" className="spotlight" aria-hidden="true" />;
}

export default function App() {
  const [dark, toggle] = useTheme();
  useReveal();

  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Spotlight />
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <Work />
        <About photo={photo} />
        <Journey />
        <Skills />
        <Playground />
        <Travel />
        <Contact />
      </main>
      <footer className="border-t border-line dark:border-line-dark">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-6 py-8 font-mono text-xs text-mute dark:text-mute-dark">
          <span>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </span>
          <span>{asides.footer}</span>
        </div>
      </footer>
    </>
  );
}
