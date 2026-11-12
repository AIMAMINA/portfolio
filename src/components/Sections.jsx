import { useEffect, useRef, useState } from "react";
import LiquidCanvas from "./LiquidCanvas";
import Terminal from "./Terminal";
import TravelMap, { Stamp } from "./TravelMap";
import { useTypewriter } from "../hooks";
import { countries, trips, experience, greetings, journey, marquee, moreProjects, profile, projects, skills } from "../content";

const WORDS = ["things", "interfaces", "APIs", "AI tools"];

function Label({ children }) {
  return <p className="font-mono text-sm text-coral dark:text-coral-light">{children}</p>;
}

function Greeting() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % greetings.length), 2600);
    return () => clearInterval(id);
  }, []);
  const g = greetings[i];
  return (
    <span key={i} lang={g.lang} dir={g.dir} className="inline-block animate-[fadeUp_0.6s_ease-out]">
      {g.text}
    </span>
  );
}

export function Hero({ dark }) {
  const word = useTypewriter(WORDS);
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <LiquidCanvas dark={dark} />
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
        <p className="font-mono text-sm text-muted dark:text-mist">
          <Greeting /> <span dir="ltr">— I'm {profile.firstName} {profile.lastName} 👋</span>
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(3.4rem,10vw,8.5rem)]">
          I build{" "}
          <em className="text-coral dark:text-coral-light">
            {word}
            <span className="caret ml-1 inline-block w-[0.06em] translate-y-[0.08em] bg-current" style={{ height: "0.8em" }} aria-hidden="true" />
          </em>
          <br />
          that feel alive.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted dark:text-mist">
          {profile.role}, {profile.status.replace("Master's", "master's")} and part-time bug hunter 🐛. Looking for an alternating internship from November 2026.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-ink px-7 py-3.5 font-medium text-cream transition-colors hover:bg-coral dark:bg-pearl dark:text-noir dark:hover:bg-coral-light"
          >
            See my work
          </a>
          <a
            href={profile.cv}
            download
            className="rounded-full border border-ink/25 px-7 py-3.5 font-medium transition-colors hover:border-coral hover:text-coral dark:border-pearl/30 dark:hover:border-coral-light dark:hover:text-coral-light"
          >
            Download my CV
          </a>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-line py-5 dark:border-line-dark" aria-hidden="true">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-3xl italic text-muted dark:text-mist">
            {m}
            <span className="text-base text-coral not-italic dark:text-gold-light">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TiltImages({ images, name, accent }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const reset = () => (ref.current.style.transform = "");
  const blob = accent === "gold" ? "bg-sand dark:bg-gold/50" : "bg-rose/70 dark:bg-coral-light/40";

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={reset} data-cursor>
      <div className={`blob-shape absolute -inset-6 -z-0 ${blob}`} aria-hidden="true" />
      <div ref={ref} className="relative transition-transform duration-300 ease-out" style={{ transformStyle: "preserve-3d" }}>
        <img
          src={images[0]}
          alt={`${name}: main screen`}
          loading="lazy"
          className="w-full rounded-xl shadow-[0_30px_60px_-25px_rgba(26,20,22,0.45)] ring-1 ring-ink/10"
        />
        <img
          src={images[1]}
          alt={`${name}: second screen`}
          loading="lazy"
          className="absolute -right-4 -bottom-10 hidden w-1/2 rounded-lg shadow-[0_24px_48px_-20px_rgba(26,20,22,0.5)] ring-1 ring-ink/10 sm:block"
          style={{ transform: "translateZ(40px)" }}
        />
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="reveal">
        <Label>selected work</Label>
        <h2 className="mt-3 text-6xl md:text-7xl">
          Things I've <em className="text-coral dark:text-coral-light">built</em>
        </h2>
        <p className="mt-4 font-mono text-sm text-muted dark:text-mist">(and debugged at 2 a.m. ☕)</p>
      </div>

      <div className="mt-20 space-y-32 md:space-y-40">
        {projects.map((p, i) => (
          <article key={p.name} className="reveal grid items-center gap-14 md:grid-cols-[1.15fr_1fr] md:gap-20">
            <div className={i % 2 ? "md:order-2" : ""}>
              <TiltImages images={p.images} name={p.name} accent={p.accent} />
            </div>
            <div>
              <h3 className="text-5xl md:text-6xl">{p.name}</h3>
              <p className="mt-2 font-display text-2xl italic text-coral dark:text-coral-light">{p.tagline}</p>
              <p className="mt-6 text-muted dark:text-mist">{p.summary}</p>
              <ul className="mt-6 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-gold dark:bg-gold-light" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted dark:border-line-dark dark:text-mist">
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={p.code}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 font-medium text-ink dark:text-pearl"
              >
                <span className="border-b border-current pb-0.5 transition-colors group-hover:text-coral dark:group-hover:text-coral-light">
                  View the code on GitHub
                </span>
                <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal mt-32">
        <h3 className="text-4xl">Also built</h3>
        <ul className="mt-8 divide-y divide-line border-y border-line dark:divide-line-dark dark:border-line-dark">
          {moreProjects.map((p) => (
            <li key={p.name} className="group grid gap-2 py-6 transition-colors md:grid-cols-[minmax(0,19rem)_minmax(0,1fr)_minmax(0,16rem)] md:items-center md:gap-10">
              <p className="font-display text-2xl transition-colors group-hover:text-coral dark:group-hover:text-coral-light">{p.name}</p>
              <p className="text-muted dark:text-mist">{p.text}</p>
              <ul className="flex flex-wrap gap-1.5 md:justify-end" aria-label="Technologies">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted dark:border-line-dark dark:text-mist">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Timeline({ items }) {
  return (
    <ol className="space-y-6 border-l border-line pl-6 dark:border-line-dark">
      {items.map((j) => (
        <li key={j.title} className="relative">
          <span className="absolute top-2 -left-[29px] size-2.5 rounded-full bg-coral dark:bg-coral-light" />
          <p className="font-mono text-xs text-muted dark:text-mist">{j.period}</p>
          <p className="font-medium">{j.title}</p>
          <p className="text-sm text-muted dark:text-mist">{j.place}</p>
          {j.text && <p className="mt-1 text-sm">{j.text}</p>}
        </li>
      ))}
    </ol>
  );
}

export function About({ photo }) {
  return (
    <section id="about" className="relative overflow-hidden bg-cream-2 py-28 md:py-36 dark:bg-noir-2">
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="blob-shape absolute -inset-5 bg-sand dark:bg-gold/40" aria-hidden="true" />
          <div className="blob-shape relative aspect-square overflow-hidden bg-rose dark:bg-coral-light/70" style={{ animationDelay: "-5s" }}>
            {photo ? (
              <img src={photo} alt={`Portrait of ${profile.firstName} ${profile.lastName}`} className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center font-display text-8xl italic text-cream">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
            )}
          </div>
        </div>
        <div className="reveal">
          <Label>about me</Label>
          <h2 className="mt-3 text-5xl md:text-6xl">
            I think big, code clean, and build <em className="text-coral dark:text-coral-light">what's next.</em>
          </h2>
          <p className="mt-8 text-xl leading-relaxed">{profile.intro}</p>
          <p className="mt-5 text-muted dark:text-mist">{profile.availability}. Based in {profile.location}.</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
            {profile.languages.map((l) => (
              <div key={l.name}>
                <dt className="font-medium">{l.name}</dt>
                <dd className="text-muted dark:text-mist">{l.level}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted dark:text-mist">Off screen: {profile.interests.join(", ")}.</p>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 pt-28 md:pt-36">
      <div className="reveal">
        <Label>path</Label>
        <h2 className="mt-3 text-6xl md:text-7xl">
          Where I've <em className="text-coral dark:text-coral-light">been</em>
        </h2>
      </div>
      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <div className="reveal">
          <h3 className="mb-8 text-3xl">Education</h3>
          <Timeline items={journey} />
        </div>
        <div className="reveal">
          <h3 className="mb-8 text-3xl">Experience</h3>
          <Timeline items={experience} />
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="reveal">
        <Label>toolbox</Label>
        <h2 className="mt-3 text-6xl md:text-7xl">
          What I work <em className="text-coral dark:text-coral-light">with</em>
        </h2>
      </div>
      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group} className="reveal border-t border-ink/80 pt-5 dark:border-pearl/60">
            <h3 className="text-3xl">{s.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-cream-2 px-4 py-2 text-sm ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose hover:text-cream hover:ring-rose dark:bg-noir-2 dark:ring-line-dark dark:hover:bg-coral-light dark:hover:text-noir"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Playground() {
  return (
    <section id="terminal" className="mx-auto max-w-6xl px-6 pb-28 md:pb-36">
      <div className="reveal grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label>playground</Label>
          <h2 className="mt-3 text-6xl md:text-7xl">
            Talk to my <em className="text-coral dark:text-coral-light">terminal</em>
          </h2>
          <p className="mt-6 text-muted dark:text-mist">
            Recruiters read CVs. Developers type commands. Try <code className="font-mono text-coral dark:text-coral-light">help</code>, and maybe find a secret or two 🤫
          </p>
        </div>
        <Terminal />
      </div>
    </section>
  );
}

export function Travel() {
  const [active, setActive] = useState(null);
  const trip = trips.find((t) => t.country === active);
  return (
    <section id="travel" className="mx-auto max-w-6xl px-6 pb-28 md:pb-36">
      <div className="reveal grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Label>off screen</Label>
          <h2 className="mt-3 text-6xl md:text-7xl">
            Debugging the <em className="text-coral dark:text-coral-light">world</em>
          </h2>
          <p className="mt-6 text-muted dark:text-mist">
            When I'm not coding, I'm collecting passport stamps and way too many photos. New places taught me what code does too: adapt fast, look closely.
          </p>
          <p className="mt-8 font-display text-4xl">
            <em className="text-coral dark:text-coral-light">{countries.length}</em> stamps and counting ✈️
          </p>
          <p className="mt-2 font-mono text-sm text-muted dark:text-mist">click a country to collect its stamp</p>
          <div className="mt-8" aria-live="polite">
            <Stamp trip={trip} onClose={() => setActive(null)} />
          </div>
        </div>
        <div className="mx-auto w-full max-w-xl rounded-3xl bg-cream-2 p-4 ring-1 ring-line md:p-6 dark:bg-noir-2 dark:ring-line-dark">
          <TravelMap active={active} setActive={setActive} />
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const copy = async (e) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(profile.email);
      btn.dataset.copied = "true";
      setTimeout(() => delete btn.dataset.copied, 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-32 text-cream md:py-40 dark:bg-noir-2">
      <div className="blob-shape absolute -top-24 -right-24 size-96 bg-coral/50 blur-3xl" aria-hidden="true" />
      <div className="blob-shape absolute -bottom-32 -left-20 size-80 bg-gold/40 blur-3xl" style={{ animationDelay: "-7s" }} aria-hidden="true" />
      <div className="reveal relative mx-auto max-w-6xl px-6">
        <p className="font-mono text-sm text-sand">let's talk</p>
        <h2 className="mt-4 max-w-4xl text-[clamp(3rem,8vw,6.5rem)] text-cream">
          Let's build something people <em className="text-rose">love</em> to use.
        </h2>
        <p className="mt-6 text-lg text-sand">I reply faster than my code compiles ⚡</p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href={`mailto:${profile.email}`} className="rounded-full bg-cream px-7 py-3.5 font-medium text-ink transition-colors hover:bg-rose hover:text-cream">
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="group rounded-full border border-cream/30 px-6 py-3.5 font-medium transition-colors hover:border-rose hover:text-rose"
          >
            <span className="group-data-[copied]:hidden">Copy email</span>
            <span className="hidden group-data-[copied]:inline">Copied</span>
          </button>
        </div>
        <div className="mt-16 flex flex-wrap gap-8 font-mono text-sm text-sand">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-rose">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-rose">
            GitHub
          </a>
          <a href={profile.cv} download className="hover:text-rose">
            CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
