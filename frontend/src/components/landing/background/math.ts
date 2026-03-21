export type ShapeType = "heart" | "star" | "frog" | "cloud" | "butterfly";

export type ShapePointSet = {
  xs: Float32Array;
  ys: Float32Array;
};

export type ShapeSetMap = Record<ShapeType, ShapePointSet>;

export const SHAPES: readonly ShapeType[] = ["heart", "star", "butterfly", "frog", "cloud"];
export const TAU = Math.PI * 2;

const SIN_LUT_SIZE = 4096;
const SIN_LUT_MASK = SIN_LUT_SIZE - 1;
const SIN_LUT = (() => {
  const table = new Float32Array(SIN_LUT_SIZE);
  for (let i = 0; i < SIN_LUT_SIZE; i += 1) {
    table[i] = Math.sin((i / SIN_LUT_SIZE) * TAU);
  }
  return table;
})();

const shapeTemplateCache = new Map<string, ShapeSetMap>();

export function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomRange(rng: () => number, min: number, max: number) {
  return rng() * (max - min) + min;
}

export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function easeInOut(value: number) {
  return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

export function sinLUT(rad: number) {
  const idx = Math.floor((rad * SIN_LUT_SIZE) / TAU) & SIN_LUT_MASK;
  return SIN_LUT[idx];
}

export function wrapTau(value: number) {
  let next = value;
  if (next >= TAU) next -= TAU * Math.floor(next / TAU);
  else if (next < 0) next += TAU * (1 + Math.floor(-next / TAU));
  return next;
}

function createEmptyShapeSetMap(): ShapeSetMap {
  return {
    heart: { xs: new Float32Array(0), ys: new Float32Array(0) },
    star: { xs: new Float32Array(0), ys: new Float32Array(0) },
    frog: { xs: new Float32Array(0), ys: new Float32Array(0) },
    cloud: { xs: new Float32Array(0), ys: new Float32Array(0) },
    butterfly: { xs: new Float32Array(0), ys: new Float32Array(0) },
  };
}

function shapePoints(type: ShapeType, count: number, seed: number, isMobile: boolean) {
  const rng = mulberry32(seed);
  const xs = new Float32Array(count);
  const ys = new Float32Array(count);

  const scale = isMobile ? 3 : 5.8;
  const jitter = () => randomRange(rng, isMobile ? -3.5 : -6.8, isMobile ? 3.5 : 6.8);

  for (let i = 0; i < count; i += 1) {
    const t = (i / count) * TAU;
    let x = 0;
    let y = 0;

    switch (type) {
      case "heart":
        x = 16 * Math.pow(Math.sin(t), 3);
        y = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );
        break;

      case "star": {
        const seg = Math.PI / 5;
        const k = Math.floor(t / seg);
        const radius = k % 2 === 0 ? 22 : 11;
        x = radius * Math.cos(t);
        y = radius * Math.sin(t);
        break;
      }

      case "butterfly": {
        const radius =
          Math.exp(Math.sin(t)) -
          2 * Math.cos(4 * t) +
          Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
        x = radius * Math.sin(t) * 10;
        y = -radius * Math.cos(t) * 10;
        break;
      }

      case "frog":
        x = 20 * Math.cos(t) * Math.pow(Math.sin(t), 2);
        y = -18 * Math.sin(t) + (i < Math.floor(count * 0.14) ? -25 : 0);
        break;

      case "cloud":
        x = 25 * Math.cos(t);
        y = 12 * Math.sin(t) + randomRange(rng, 0, 10);
        break;
    }

    xs[i] = x * scale + jitter();
    ys[i] = y * scale + jitter();
  }

  return { xs, ys };
}

export function getShapeTemplateSet(
  isMobile: boolean,
  count: number,
  seedBase: number,
  seedStride: number
) {
  const cacheKey = `${isMobile ? "m" : "d"}:${count}:${seedBase}:${seedStride}`;
  const cached = shapeTemplateCache.get(cacheKey);
  if (cached) return cached;

  const next = createEmptyShapeSetMap();
  for (const shape of SHAPES) {
    next[shape] = shapePoints(shape, count, seedBase + shape.length * seedStride, isMobile);
  }

  shapeTemplateCache.set(cacheKey, next);
  return next;
}
