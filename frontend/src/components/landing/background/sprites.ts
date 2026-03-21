import { TAU } from "@/components/landing/background/math";

export const HUE_VARIANT_COUNT = 24;

export type SpriteBundle = {
  base: HTMLCanvasElement[][];
  bloom: HTMLCanvasElement[][];
  halfW: number[][];
  halfH: number[][];
  bloomHalfW: number[][];
  bloomHalfH: number[][];
};

const spriteBundleCache = new Map<"mobile" | "desktop", SpriteBundle>();

function makePrismSprite(hue: number, size: number, core: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2;

  const h1 = hue;
  const h2 = Math.min(150, hue + 14);
  const h3 = Math.min(164, hue + 28);

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, rOuter);
  gradient.addColorStop(0, `hsla(${h1}, 88%, 92%, 0.95)`);
  gradient.addColorStop(0.18, `hsla(${h2}, 78%, 74%, 0.64)`);
  gradient.addColorStop(0.38, `hsla(${h3}, 62%, 58%, 0.34)`);
  gradient.addColorStop(0.62, `hsla(${h2}, 72%, 62%, 0.16)`);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, rOuter, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = `hsla(${h1}, 100%, 92%, 0.22)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-size * 0.24, 0);
  ctx.lineTo(size * 0.24, 0);
  ctx.moveTo(0, -size * 0.24);
  ctx.lineTo(0, size * 0.24);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = `hsla(${h1}, 100%, 94%, 1)`;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(1, core), 0, TAU);
  ctx.fill();

  return canvas;
}

function makeBloomSprite(src: HTMLCanvasElement, scale: number) {
  const width = Math.max(1, Math.round(src.width * scale));
  const height = Math.max(1, Math.round(src.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(src, 0, 0, width, height);
  return canvas;
}

export function getSpriteBundle(isMobile: boolean) {
  const cacheKey = isMobile ? "mobile" : "desktop";
  const cached = spriteBundleCache.get(cacheKey);
  if (cached) return cached;

  const sizes = isMobile ? [5, 10, 16] : [8, 13, 20];
  const coreSizes = isMobile ? [0.8, 1, 1.2] : [1, 1.2, 1.5];

  const base = Array.from({ length: HUE_VARIANT_COUNT }, (_, idx) => {
    const hue = 96 + Math.round((idx * 40) / Math.max(1, HUE_VARIANT_COUNT - 1));
    return [
      makePrismSprite(hue, sizes[0], coreSizes[0]),
      makePrismSprite(hue, sizes[1], coreSizes[1]),
      makePrismSprite(hue, sizes[2], coreSizes[2]),
    ];
  });

  const bloom = Array.from({ length: HUE_VARIANT_COUNT }, (_, idx) => [
    makeBloomSprite(base[idx][0], 2.1),
    makeBloomSprite(base[idx][1], 2),
    makeBloomSprite(base[idx][2], 1.8),
  ]);

  const halfW = Array.from({ length: HUE_VARIANT_COUNT }, (_, idx) => [
    base[idx][0].width * 0.5,
    base[idx][1].width * 0.5,
    base[idx][2].width * 0.5,
  ]);

  const halfH = Array.from({ length: HUE_VARIANT_COUNT }, (_, idx) => [
    base[idx][0].height * 0.5,
    base[idx][1].height * 0.5,
    base[idx][2].height * 0.5,
  ]);

  const bloomHalfW = Array.from({ length: HUE_VARIANT_COUNT }, (_, idx) => [
    bloom[idx][0].width * 0.5,
    bloom[idx][1].width * 0.5,
    bloom[idx][2].width * 0.5,
  ]);

  const bloomHalfH = Array.from({ length: HUE_VARIANT_COUNT }, (_, idx) => [
    bloom[idx][0].height * 0.5,
    bloom[idx][1].height * 0.5,
    bloom[idx][2].height * 0.5,
  ]);

  const bundle = { base, bloom, halfW, halfH, bloomHalfW, bloomHalfH };
  spriteBundleCache.set(cacheKey, bundle);
  return bundle;
}
