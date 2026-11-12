import { useMemo, useState } from "react";
import map from "../assets/map-dots.json";
import { H, W, projection } from "../mapProjection";
import { trips } from "../content";

export function Stamp({ trip, onClose }) {
  if (!trip) {
    return (
      <div className="grid size-36 place-items-center rounded-full border-2 border-dashed border-line text-center font-mono text-xs text-muted md:size-40 dark:border-line-dark dark:text-mist">
        your stamp
        <br />
        lands here
      </div>
    );
  }
  return (
    <button
      key={trip.country}
      type="button"
      onClick={onClose}
      aria-label={`Close the ${trip.country} stamp`}
      className="stamp relative grid size-36 place-items-center rounded-full border-[3px] border-coral text-center text-coral md:size-40 dark:border-coral-light dark:text-coral-light"
    >
      <span className="absolute inset-2 rounded-full border border-dashed border-current opacity-70" />
      <span className="px-4">
        <span className="block font-mono text-[10px] tracking-wide">STAMP COLLECTED</span>
        <span className="mt-1 block font-display text-2xl leading-none italic">{trip.country}</span>
        <span className="mt-1 block font-mono text-[11px]">{trip.city}</span>
        {trip.note && <span className="mt-1 block text-[11px] leading-tight">{trip.note}</span>}
      </span>
    </button>
  );
}

export default function TravelMap({ active, setActive }) {
  const dots = useMemo(() => {
    const visited = new Set(trips.map((t) => t.country));
    return map.dots.map(([x, y, i]) => ({ x, y, country: visited.has(map.names[i]) ? map.names[i] : null }));
  }, []);
  const pins = useMemo(
    () => trips.map((t) => ({ ...t, xy: projection(t.coords) })),
    [],
  );
  const [hovered, setHovered] = useState(null);

  const toggle = (country) => setActive((a) => (a === country ? null : country));

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full select-none"
        role="group"
        aria-label={`Map of the ${trips.length} countries Amina has visited`}
      >
        {dots.map((d, i) => {
          const isActive = d.country && d.country === active;
          const isHover = d.country && d.country === hovered;
          return (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={isActive ? 2.9 : d.country ? 2.5 : 1.6}
              className={
                isActive
                  ? "fill-gold transition-all duration-300 dark:fill-gold-light"
                  : d.country
                    ? `transition-all duration-300 ${isHover ? "fill-coral dark:fill-coral-light" : "fill-rose dark:fill-coral-light/80"}`
                    : "fill-ink/15 dark:fill-pearl/15"
              }
            />
          );
        })}

        {pins.map((p) => {
          const [x, y] = p.xy;
          const isActive = p.country === active;
          const anchor = p.label.anchor ?? "start";
          return (
            <g
              key={p.country}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`${p.country}, ${p.city}`}
              onClick={() => toggle(p.country)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle(p.country))}
              onPointerEnter={() => setHovered(p.country)}
              onPointerLeave={() => setHovered(null)}
              className="group cursor-pointer outline-none"
            >
              <circle cx={x} cy={y} r="14" className="fill-transparent" />
              <circle cx={x} cy={y} r="6" className="origin-center fill-coral/30 dark:fill-coral-light/30" style={{ transformBox: "fill-box", animation: "pulse-ring 2.4s ease-out infinite" }} />
              <circle cx={x} cy={y} r={isActive ? 5 : 3.6} className={`transition-all duration-300 ${isActive ? "fill-gold dark:fill-gold-light" : "fill-coral dark:fill-coral-light"} stroke-cream dark:stroke-noir`} strokeWidth="1.5" />
              <text
                x={x + (p.label.dx ?? 9)}
                y={y + (p.label.dy ?? 4)}
                textAnchor={anchor}
                className={`font-sans text-[13px] font-medium transition-colors group-focus-visible:underline ${
                  isActive ? "fill-coral dark:fill-coral-light" : "fill-ink group-hover:fill-coral dark:fill-pearl dark:group-hover:fill-coral-light"
                }`}
                style={{ paintOrder: "stroke", stroke: "var(--label-halo)", strokeWidth: 4, strokeLinejoin: "round" }}
              >
                {p.country}
              </text>
            </g>
          );
        })}
      </svg>

    </div>
  );
}
