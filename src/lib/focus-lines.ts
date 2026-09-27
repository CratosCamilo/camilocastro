/**
 * Geometry for manga focus lines (集中線): thin wedges converging on a point with an
 * empty center. Deterministic (seeded), so server output is stable across builds.
 * Returns three path strings — light, medium and dense ink.
 */

function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export type FocusLineOptions = {
  width: number;
  height: number;
  cx: number;
  cy: number;
  count?: number;
  seed?: number;
  /** Radius range of the empty center. */
  clear?: [number, number];
};

export function focusLinePaths({ width, height, cx, cy, count = 170, seed = 2026, clear = [220, 440] }: FocusLineOptions): [string, string, string] {
  const rand = prng(seed);
  const reach = Math.hypot(width, height) * 1.2;
  const bands: [string[], string[], string[]] = [[], [], []];
  const step = (Math.PI * 2) / count;

  for (let i = 0; i < count; i++) {
    const angle = i * step + (rand() - 0.5) * step * 1.7;
    const inner = clear[0] + rand() * (clear[1] - clear[0]);
    const spread = 0.0016 + rand() * rand() * 0.012;
    const x0 = cx + Math.cos(angle) * inner;
    const y0 = cy + Math.sin(angle) * inner;
    const x1 = cx + Math.cos(angle - spread) * reach;
    const y1 = cy + Math.sin(angle - spread) * reach;
    const x2 = cx + Math.cos(angle + spread) * reach;
    const y2 = cy + Math.sin(angle + spread) * reach;
    const band = rand() < 0.5 ? 0 : rand() < 0.7 ? 1 : 2;
    bands[band].push(`M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}Z`);
  }
  return [bands[0].join(""), bands[1].join(""), bands[2].join("")];
}
