import { useMemo, useState } from "react";
import map from "../assets/map-dots.json";
import { H, W, projection } from "../mapProjection";
import { trips } from "../content";

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
                  ? "fill-accent transition-all duration-300 dark:fill-accent-dark"
                  : d.country
                    ? `transition-all duration-300 ${isHover ? "fill-accent dark:fill-accent-dark" : "fill-ink/45 dark:fill-chalk/50"}`
                    : "fill-ink/10 dark:fill-chalk/12"
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
              <circle cx={x} cy={y} r="6" className="origin-center fill-accent/25 dark:fill-accent-dark/25" style={{ transformBox: "fill-box", animation: "pulse-ring 2.4s ease-out infinite" }} />
              <circle cx={x} cy={y} r={isActive ? 5 : 3.6} className={`transition-all duration-300 ${isActive ? "fill-accent dark:fill-accent-dark" : "fill-ink dark:fill-chalk"} stroke-paper dark:stroke-stage`} strokeWidth="1.5" />
              <text
                x={x + (p.label.dx ?? 9)}
                y={y + (p.label.dy ?? 4)}
                textAnchor={anchor}
                className={`font-sans text-[12.5px] transition-colors group-focus-visible:underline ${
                  isActive ? "fill-accent dark:fill-accent-dark" : "fill-ink group-hover:fill-accent dark:fill-chalk dark:group-hover:fill-accent-dark"
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
