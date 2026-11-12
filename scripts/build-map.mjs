// Precomputes the dotted map (run with `npm run map` if you change the region or STEP).
// Each dot stores the country it belongs to, so the visited countries can be coloured at runtime.
import { writeFileSync } from "node:fs";
import { geoBounds, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json" with { type: "json" };
import { H, STEP, W, projection } from "../src/mapProjection.js";

const all = feature(world, world.objects.countries).features;
const [west, south] = projection.invert([0, H]);
const [east, north] = projection.invert([W, 0]);
const nearby = all.filter((f) => {
  const [[x0, y0], [x1, y1]] = geoBounds(f);
  return x1 >= west - 5 && x0 <= east + 5 && y1 >= south - 5 && y0 <= north + 5;
});

const names = [];
const dots = [];
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const f = nearby.find((c) => geoContains(c, projection.invert([x, y])));
    if (!f) continue;
    let i = names.indexOf(f.properties.name);
    if (i === -1) i = names.push(f.properties.name) - 1;
    dots.push([x, y, i]);
  }
}
writeFileSync(new URL("../src/assets/map-dots.json", import.meta.url), JSON.stringify({ names, dots }));
console.log(`${dots.length} dots, ${names.length} countries`);
