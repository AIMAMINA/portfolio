import { geoNaturalEarth1 } from "d3-geo";

export const W = 640;
export const H = 440;
export const STEP = 8; // distance between dots, in px

// Europe, North Africa and the Middle East
const REGION = { type: "MultiPoint", coordinates: [[-12, 26], [42, 26], [42, 58], [-12, 58]] };
export const projection = geoNaturalEarth1().fitSize([W, H], REGION);
