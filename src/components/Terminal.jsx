import { useEffect, useRef, useState } from "react";
import { countries, experience, journey, profile, projects, skills } from "../content";

const PROMPT = "visitor@amina:~$";

const link = (href, label) => ({ href, label });

/** Each command returns lines; a line is a string or { href, label }. */
function run(input) {
  const [cmd, ...args] = input.trim().split(/\s+/);
  const command = (cmd || "").toLowerCase();

  switch (command) {
    case "":
      return [];
    case "help":
      return [
        "Available commands:",
        "  whoami      who is Amina?",
        "  projects    what she has built",
        "  skills      her toolbox",
        "  education   where she studied",
        "  experience  where she worked",
        "  languages   the human ones",
        "  travel      passport stamps",
        "  contact     how to reach her",
        "  cv          download her CV",
        "  clear       clean the screen",
        "Psst… there are a few hidden commands too 👀",
      ];
    case "whoami":
      return [
        `${profile.firstName} ${profile.lastName}, ${profile.role.toLowerCase()} 👩‍💻`,
        `${profile.status}.`,
        `Motto: "${profile.punchline}"`,
      ];
    case "projects":
    case "ls":
      return projects.flatMap((p) => [`▸ ${p.name}: ${p.tagline}`, link(p.code, `  ${p.code.replace("https://", "")}`)]);
    case "skills":
      return skills.map((s) => `${s.group.padEnd(20, " ")} ${s.items.join(", ")}`);
    case "education":
      return journey.map((j) => `${j.period.padEnd(13, " ")} ${j.title}, ${j.place}`);
    case "experience":
      return experience.map((e) => `${e.period.padEnd(16, " ")} ${e.title} @ ${e.place}`);
    case "languages":
      return profile.languages.map((l) => `${l.name.padEnd(9, " ")} ${l.level}`).concat("Python   fluent (it counts, right?) 🐍");
    case "travel":
      return [`${countries.length} countries and counting ✈️`, countries.join(" · ")];
    case "contact":
      return [link(`mailto:${profile.email}`, `email     ${profile.email}`), link(profile.linkedin, "linkedin  amina-aimeur"), link(profile.github, "github    AIMAMINA")];
    case "cv":
    case "cat":
      return [link(profile.cv, "📄 cv-amina-aimeur.pdf (click to download)")];
    case "sudo":
      if (args.join(" ").toLowerCase().startsWith("hire")) {
        return [
          "[sudo] password for recruiter: ********",
          "✅ Permission granted.",
          "Sending offer letter… just kidding, that part is up to you 😄",
          link(`mailto:${profile.email}`, `→ ${profile.email}`),
        ];
      }
      return ["Nice try. Only `sudo hire-amina` works here 😏"];
    case "hire-amina":
      return ["You'll need admin rights for that. Try: sudo hire-amina"];
    case "coffee":
      return ["☕ Brewing… done. Productivity +42%."];
    case "hello":
    case "hi":
    case "bonjour":
    case "salam":
    case "hola":
      return ["Hello! Bonjour ! مرحبا ! ¡Hola! 👋"];
    case "date":
      return [new Date().toString()];
    case "exit":
      return ["There is no escape from a good portfolio 😌 (try clear)"];
    default:
      return [`command not found: ${cmd}. Type help to see what I can do.`];
  }
}

const SUGGESTIONS = ["help", "whoami", "projects", "travel", "sudo hire-amina"];
const ALL = ["help", "whoami", "projects", "skills", "education", "experience", "languages", "travel", "contact", "cv", "clear", "coffee", "sudo hire-amina"];

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: "out", value: "Welcome to amina.sh 🌸 Type help to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const submit = (value) => {
    const text = value.trim();
    if (text.toLowerCase() === "clear") {
      setLines([]);
    } else {
      const out = run(text).map((v) => ({ type: "out", value: v }));
      setLines((l) => [...l, { type: "in", value: text }, ...out]);
    }
    if (text) setHistory((h) => [text, ...h]);
    setCursor(-1);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submit(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = ALL.find((c) => c.startsWith(input.toLowerCase()) && input);
      if (match) setInput(match);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-[#1a1416] text-[#f5e6d3] shadow-[0_40px_80px_-30px_rgba(26,20,22,0.6)] ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#e8826b]" />
        <span className="size-3 rounded-full bg-[#e9c7a3]" />
        <span className="size-3 rounded-full bg-[#b38a4a]" />
        <span className="ml-3 font-mono text-xs text-[#a8988c]">amina.sh, zsh</span>
      </div>

      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="h-80 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed md:h-96 md:text-sm"
        role="log"
        aria-live="polite"
      >
        {lines.map((l, i) =>
          l.type === "in" ? (
            <p key={i} className="mt-2">
              <span className="text-[#e8826b]">{PROMPT}</span> {l.value}
            </p>
          ) : typeof l.value === "string" ? (
            <p key={i} className="whitespace-pre-wrap text-[#d9c9b6]">
              {l.value}
            </p>
          ) : (
            <p key={i}>
              <a
                href={l.value.href}
                target={l.value.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                download={l.value.href.endsWith(".pdf") || undefined}
                className="text-[#d9b779] underline decoration-dotted underline-offset-4 hover:text-[#f08a7e]"
              >
                {l.value.label}
              </a>
            </p>
          ),
        )}
        <div className="mt-2 flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-[#e8826b]">
            {PROMPT}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="w-full bg-transparent text-[#f5e6d3] caret-[#e8826b] outline-none"
            aria-label="Type a command"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-[#d9c9b6] transition-colors hover:border-[#e8826b] hover:text-[#f08a7e]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
