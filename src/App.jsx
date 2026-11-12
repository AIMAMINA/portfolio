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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-paper/85 py-3 backdrop-blur-md dark:border-line-dark dark:bg-stage/85" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6">
        <a href="#top" className="font-serif text-2xl">
          {profile.firstName} {profile.lastName}
        </a>
        <nav className="flex items-center gap-7">
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
