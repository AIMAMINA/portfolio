import { useEffect, useState } from "react";
import Terminal from "./Terminal";
import TravelMap from "./TravelMap";
import { asides, countries, experience, jokes, journey, moreProjects, profile, projects, skills, trips } from "../content";

const pad = (n) => String(n).padStart(2, "0");

/** Small grey monospace text: labels, numbers, asides. */
function Mono({ children, className = "" }) {
  return <span className={`font-mono text-xs tracking-wide text-mute dark:text-mute-dark ${className}`}>{children}</span>;
}

/** Section wrapper: thin top rule, label on the left, counter or aside on the right. */
function Section({ id, label, right, children, className = "" }) {
  return (
    <section id={id} className={`border-t border-line py-24 md:py-32 dark:border-line-dark ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal mb-10 flex flex-col gap-1 sm:mb-12 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <Mono>{label}</Mono>
          {right && <Mono className="sm:text-right">{right}</Mono>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Types each one-liner, keeps it on screen for a moment, then moves to the next. */
function OneLiner() {
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [text, setText] = useState(reduced ? jokes[0] : "");
  useEffect(() => {
    if (reduced) return;
    let j = 0;
    let i = 0;
    let timer;
    const tick = () => {
      const joke = jokes[j % jokes.length];
      if (i <= joke.length) {
        setText(joke.slice(0, i++));
        timer = setTimeout(tick, 28);
      } else {
        i = 0;
        j++;
        timer = setTimeout(tick, 3400);
      }
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [reduced]);
  return (
    <p className="mt-8 min-h-[1.6em] border-l-2 border-accent pl-3 font-mono text-[13px] text-mute dark:border-accent-dark dark:text-mute-dark" aria-live="off">
      {text}
      <span className="caret ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-current opacity-60" aria-hidden="true" />
    </p>
  );
}

export function Hero() {
  return (
    <header id="top" className="mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-center px-6 pt-32 pb-20">
      <Mono className="reveal">Full-stack &amp; AI developer · {profile.location.split(",")[0]}</Mono>
      <h1 className="reveal mt-5 text-[clamp(3.2rem,9vw,7.25rem)] leading-[0.98]">
        I think big,
        <br />
        code clean, and
        <br />
        build <em className="text-accent dark:text-accent-dark">what&apos;s next.</em>
      </h1>
      <p className="reveal mt-8 max-w-xl text-lg text-mute dark:text-mute-dark">
        {profile.status}. <span className="text-ink dark:text-chalk">{profile.availability.split(" (")[0]}</span>, one week at school and two in the company.
      </p>
      <div className="reveal">
        <OneLiner />
      </div>
      <div className="reveal mt-10 flex flex-wrap items-center gap-6 text-[15px]">
        <a href="#work" className="rounded-full bg-ink px-6 py-3 text-paper transition-transform hover:-translate-y-0.5 dark:bg-chalk dark:text-stage">
          See my work
        </a>
        <a href={profile.cv} download className="border-b border-current pb-0.5 transition-colors hover:text-accent dark:hover:text-accent-dark">
          Download my CV
        </a>
      </div>
    </header>
  );
}

function ProjectRow({ project, index }) {
  const [open, setOpen] = useState(index === 0);
  const id = `project-${index}`;
  return (
    <article className="reveal border-b border-line dark:border-line-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 text-left md:grid-cols-[4rem_1fr_auto]"
      >
        <Mono>{pad(index + 1)}</Mono>
        <span>
          <span className="block font-serif text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05] transition-transform duration-500 group-hover:translate-x-2">
            {project.name}
          </span>
          <span className="mt-1 block text-[15px] text-mute dark:text-mute-dark">{project.tagline}</span>
          <span className="mt-2 block font-mono text-xs text-accent md:hidden dark:text-accent-dark">{project.joke}</span>
        </span>
        <span
          className={`text-2xl text-mute transition-all duration-500 group-hover:text-accent dark:text-mute-dark dark:group-hover:text-accent-dark ${open ? "rotate-90" : "group-hover:-rotate-45"}`}
          aria-hidden="true"
        >
          →
        </span>
        <span className="pointer-events-none absolute top-8 right-12 hidden translate-y-1 font-mono text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block dark:text-accent-dark">
          {project.joke}
        </span>
      </button>

      <div id={id} className={`grid transition-[grid-template-rows] duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="grid gap-10 pb-12 md:grid-cols-[4rem_1fr] md:gap-4">
            <span />
            <div>
              <p className="max-w-2xl text-lg">{project.summary}</p>
              <ul className="mt-6 max-w-2xl space-y-2 text-[15px] text-mute dark:text-mute-dark">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-accent dark:text-accent-dark">—</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.images.map((src, i) => (
                  <div key={src} className="overflow-hidden rounded-md border border-line dark:border-line-dark">
                    <img
                      src={src}
                      alt={`${project.name}, screen ${i + 1}`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition-all duration-700 hover:scale-[1.03] hover:grayscale-0 [@media(hover:hover)]:grayscale"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
                <Mono>{project.stack.join(" / ")}</Mono>
                <a href={project.code} target="_blank" rel="noreferrer" className="border-b border-current pb-0.5 text-[15px] transition-colors hover:text-accent dark:hover:text-accent-dark">
                  View the code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <Section id="work" label="Selected work" right={pad(projects.length)}>
      <div className="border-t border-line dark:border-line-dark">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </div>

      <div className="reveal mt-20">
        <Mono>Also built</Mono>
        <ul className="mt-6">
          {moreProjects.map((p) => (
            <li key={p.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-x-6 lg:grid-cols-[16rem_1fr_auto] dark:border-line-dark">
              <span className="font-serif text-2xl leading-tight">{p.name}</span>
              <span className="text-[15px] text-mute dark:text-mute-dark">{p.text}</span>
              <Mono className="sm:col-start-2 lg:col-start-auto lg:text-right">{p.stack.join(" / ")}</Mono>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function About({ photo }) {
  const mother = profile.languages.filter((l) => l.level.startsWith("mother"));
  const others = profile.languages.filter((l) => !l.level.startsWith("mother"));
  const facts = [
    { label: "From", value: "Constantine, Algeria" },
    { label: "Based in", value: profile.location },
    { label: "Studying", value: "Mastère Dev Manager Full Stack, EFREI Paris" },
    {
      label: "Speaks",
      value: `${mother.map((l) => l.name).join(" and ")} (mother tongues), ${others.map((l) => `${l.name} (${l.level})`).join(", ")}`,
    },
    { label: "Off screen", value: profile.interests.join(", ") },
  ];

  return (
    <Section id="about" label="About" right="Constantine → Paris">
      <div className="reveal flex items-center gap-5 sm:gap-7">
        <img
          src={photo}
          alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
          className="size-16 shrink-0 rounded-full object-cover ring-1 ring-line sm:size-24 dark:ring-line-dark"
        />
        <h2 className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
          Quiet in meetings.
          <br />
          <em className="text-accent dark:text-accent-dark">Loud in commits.</em>
        </h2>
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
        <p className="reveal text-lg leading-relaxed sm:text-xl">{profile.intro}</p>
        <dl className="reveal border-t border-line dark:border-line-dark">
          {facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[8rem_1fr] dark:border-line-dark">
              <dt>
                <Mono>{f.label}</Mono>
              </dt>
              <dd className="text-[15px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function Timeline({ title, items }) {
  return (
    <div className="reveal">
      <Mono>{title}</Mono>
      <ol className="mt-5">
        {items.map((it) => (
          <li key={it.title + it.period} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6 dark:border-line-dark">
            <Mono className="pt-1">{it.period}</Mono>
            <div>
              <h3 className="text-2xl leading-tight">{it.title}</h3>
              <p className="mt-1 text-[15px] text-mute dark:text-mute-dark">{it.place}</p>
              {it.text && <p className="mt-2 text-[15px] text-mute dark:text-mute-dark">{it.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Journey() {
  return (
    <Section id="path" label="Path" right={asides.path}>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <Timeline title="Education" items={journey} />
        <Timeline title="Experience" items={experience} />
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" label="Skills" right={asides.skills}>
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group} className="reveal border-t border-line pt-4 dark:border-line-dark">
            <h3 className="text-2xl">{s.group}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-mute dark:text-mute-dark">{s.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Playground() {
  return (
    <Section id="terminal" label="Terminal" right="try: help">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="reveal">
          <h2 className="text-[clamp(2.2rem,4.6vw,3.4rem)]">{asides.terminal}</h2>
          <p className="mt-5 max-w-sm text-[15px] text-mute dark:text-mute-dark">
            Type <code className="font-mono text-ink dark:text-chalk">help</code> to look around. There are a couple of hidden commands, if you are the curious type.
          </p>
        </div>
        <div className="reveal">
          <Terminal />
        </div>
      </div>
    </Section>
  );
}

export function Travel() {
  const [active, setActive] = useState(null);
  const trip = trips.find((t) => t.country === active);
  return (
    <Section id="travel" label="Travel" right={asides.travel}>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="reveal">
          <h2 className="text-[clamp(2.2rem,4.6vw,3.4rem)]">
            {countries.length} countries,
            <br />
            and counting.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] text-mute dark:text-mute-dark">
            New places taught me what code does too: adapt fast and look closely. Pick a country on the map.
          </p>
          <div className="mt-8 min-h-[4.5rem] border-l-2 border-accent pl-4 dark:border-accent-dark" aria-live="polite">
            {trip ? (
              <>
                <span className="block font-serif text-3xl leading-tight">{trip.country}</span>
                <Mono>
                  {trip.city}
                  {trip.note ? ` · ${trip.note}` : ""}
                </Mono>
              </>
            ) : (
              <Mono>nothing selected yet</Mono>
            )}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 lg:hidden">
            {trips.map((t) => (
              <li key={t.country}>
                <button
                  type="button"
                  onClick={() => setActive((a) => (a === t.country ? null : t.country))}
                  aria-pressed={active === t.country}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                    active === t.country
                      ? "border-accent text-accent dark:border-accent-dark dark:text-accent-dark"
                      : "border-line text-mute dark:border-line-dark dark:text-mute-dark"
                  }`}
                >
                  {t.country}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <TravelMap active={active} setActive={setActive} />
        </div>
      </div>
    </Section>
  );
}

export function Contact() {
  const links = [
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: profile.linkedin, label: "LinkedIn" },
    { href: profile.github, label: "GitHub" },
    { href: profile.cv, label: "CV (PDF)", download: true },
  ];
  return (
    <Section id="contact" label="Contact" className="pb-32 md:pb-40">
      <h2 className="reveal text-[clamp(3rem,8vw,6.25rem)] leading-none">
        Let&apos;s build
        <br />
        something.{" "}
        <a href={`mailto:${profile.email}`} className="border-b-2 border-accent transition-colors hover:text-accent dark:border-accent-dark dark:hover:text-accent-dark">
          Say hi.
        </a>
      </h2>
      <p className="reveal mt-6 text-mute dark:text-mute-dark">{asides.contact}</p>
      <ul className="reveal mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              download={l.download || undefined}
              className="border-b border-line pb-0.5 transition-colors hover:border-current hover:text-accent dark:border-line-dark dark:hover:text-accent-dark"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
