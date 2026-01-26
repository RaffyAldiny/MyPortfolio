// src/components/landing/LandingBackground.tsx
"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

type ShapeType = "heart" | "star" | "frog" | "cloud" | "butterfly";
const SHAPES: ShapeType[] = ["heart", "star", "butterfly", "frog", "cloud"];

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50%{ background-position: 100% 50%; }
  100%{ background-position: 0% 50%; }
`;

const mistA = keyframes`
  0%   { transform: translate3d(-1.3%, -0.9%, 0) scale(1);    opacity: 0.26; }
  50%  { transform: translate3d( 1.3%,  0.9%, 0) scale(1.03); opacity: 0.52; }
  100% { transform: translate3d(-1.3%, -0.9%, 0) scale(1);    opacity: 0.26; }
`;

const mistB = keyframes`
  0%   { transform: translate3d( 1.2%,  0.8%, 0) scale(1.02); opacity: 0.20; }
  50%  { transform: translate3d(-1.2%, -0.8%, 0) scale(1.05); opacity: 0.46; }
  100% { transform: translate3d( 1.2%,  0.8%, 0) scale(1.02); opacity: 0.20; }
`;

// deterministic RNG
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
const rr = (rng: () => number, min: number, max: number) =>
  rng() * (max - min) + min;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (v: number) =>
  v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2;

const TAU = Math.PI * 2;

// Sine LUT (fast twinkle)
const SIN_LUT_SIZE = 4096; // power of 2
const SIN_LUT_MASK = SIN_LUT_SIZE - 1;
const SIN_LUT = (() => {
  const t = new Float32Array(SIN_LUT_SIZE);
  for (let i = 0; i < SIN_LUT_SIZE; i++) t[i] = Math.sin((i / SIN_LUT_SIZE) * TAU);
  return t;
})();
const sinLUT = (rad: number) => {
  const idx = Math.floor((rad * SIN_LUT_SIZE) / TAU) & SIN_LUT_MASK;
  return SIN_LUT[idx];
};
const wrapTau = (v: number) => {
  if (v >= TAU) v -= TAU * Math.floor(v / TAU);
  else if (v < 0) v += TAU * (1 + Math.floor(-v / TAU));
  return v;
};

function shapePoints(type: ShapeType, n: number, seed: number) {
  const rng = mulberry32(seed);
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);

  const scale = 5.8;
  const jitter = () => rr(rng, -6.8, 6.8);

  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU;
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
        const rB =
          Math.exp(Math.sin(t)) -
          2 * Math.cos(4 * t) +
          Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
        x = rB * Math.sin(t) * 10;
        y = -rB * Math.cos(t) * 10;
        break;
      }

      case "frog":
        x = 20 * Math.cos(t) * Math.pow(Math.sin(t), 2);
        y = -18 * Math.sin(t) + (i < Math.floor(n * 0.14) ? -25 : 0);
        break;

      case "cloud":
        x = 25 * Math.cos(t);
        y = 12 * Math.sin(t) + rr(rng, 0, 10);
        break;
    }

    xs[i] = x * scale + jitter();
    ys[i] = y * scale + jitter();
  }

  return { xs, ys };
}

/** True colored prism sprite. */
function makePrismSprite(hue: number, size: number, core: number) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return c;

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2;

  const h1 = hue;
  const h2 = (hue + 32) % 360;
  const h3 = (hue + 72) % 360;

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rOuter);
  g.addColorStop(0.0, `hsla(${h1}, 100%, 90%, 0.95)`);
  g.addColorStop(0.18, `hsla(${h2}, 100%, 74%, 0.65)`);
  g.addColorStop(0.38, `hsla(${h3}, 100%, 68%, 0.35)`);
  g.addColorStop(0.62, `hsla(${h2}, 100%, 70%, 0.16)`);
  g.addColorStop(1.0, `rgba(255,255,255,0)`);
  ctx.fillStyle = g;
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

  return c;
}

/** Pre-upscaled bloom sprite. */
function makeBloomSprite(src: HTMLCanvasElement, scale: number) {
  const w = Math.max(1, Math.round(src.width * scale));
  const h = Math.max(1, Math.round(src.height * scale));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(src, 0, 0, w, h);
  return c;
}

export default function LandingBackground() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Crisp small sprites
    ctx.imageSmoothingEnabled = false;

    let raf = 0;
    let last = performance.now();

    let w = 0;
    let h = 0;
    let dpr = 1;

    // overwritten in build() (same behavior)
    let FLOW = 320;
    let SHP = 720;
    let pad = 26;

    // Flow arrays
    let fx = new Float32Array(0);
    let fy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let alp = new Float32Array(0);
    let phase = new Float32Array(0);
    let omega = new Float32Array(0);
    let hueBase = new Uint16Array(0);
    let sizeIdx = new Uint8Array(0);
    let flowBloomMask = new Uint8Array(0); // 1 if bloom, 0 else

    // Shape arrays
    let shHue = new Uint16Array(0);
    let shSize = new Uint8Array(0);
    let shPhase = new Float32Array(0);
    let shMod7 = new Uint8Array(0);
    let shBloomMask = new Uint8Array(0); // 1 if bloom, 0 else

    // Cluster morph temp arrays
    let mx = new Float32Array(0);
    let my = new Float32Array(0);

    const H = 48;

    // sprites + precomputed halves
    let sprBase: HTMLCanvasElement[][] = [];
    let sprBloom: HTMLCanvasElement[][] = [];
    let sprHalfW: number[][] = [];
    let sprHalfH: number[][] = [];
    let bloomHalfW: number[][] = [];
    let bloomHalfH: number[][] = [];

    const leftSet: Record<ShapeType, { xs: Float32Array; ys: Float32Array }> = {} as any;
    const rightSet: Record<ShapeType, { xs: Float32Array; ys: Float32Array }> = {} as any;

    const left = { i: 0, n: 1, t0: performance.now(), every: 7000, dur: 2200, seed: 9001 };
    const right = { i: 1, n: 2, t0: performance.now(), every: 9500, dur: 2400, seed: 4242 };

    let inView = true;
    let io: IntersectionObserver | null = null;

    const build = () => {
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = w < 640;

      // SAME SETTINGS
      FLOW = isMobile ? 150 : 850;
      SHP = isMobile ? 100 : 250;
      pad = isMobile ? 24 : 26;

      // SAME sprite sizes/cores
      const sizes = isMobile ? [9, 14, 22] : [8, 13, 20];
      const cores = isMobile ? [1.0, 1.25, 1.55] : [1.0, 1.2, 1.5];

      sprBase = Array.from({ length: H }, (_, k) => {
        const hue = Math.round((k * 360) / H);
        return [
          makePrismSprite(hue, sizes[0], cores[0]),
          makePrismSprite(hue, sizes[1], cores[1]),
          makePrismSprite(hue, sizes[2], cores[2]),
        ];
      });

      // Pre-baked bloom
      sprBloom = Array.from({ length: H }, (_, hi) => [
        makeBloomSprite(sprBase[hi][0], 2.1),
        makeBloomSprite(sprBase[hi][1], 2.0),
        makeBloomSprite(sprBase[hi][2], 1.8),
      ]);

      sprHalfW = Array.from({ length: H }, (_, hi) => [
        sprBase[hi][0].width * 0.5,
        sprBase[hi][1].width * 0.5,
        sprBase[hi][2].width * 0.5,
      ]);
      sprHalfH = Array.from({ length: H }, (_, hi) => [
        sprBase[hi][0].height * 0.5,
        sprBase[hi][1].height * 0.5,
        sprBase[hi][2].height * 0.5,
      ]);

      bloomHalfW = Array.from({ length: H }, (_, hi) => [
        sprBloom[hi][0].width * 0.5,
        sprBloom[hi][1].width * 0.5,
        sprBloom[hi][2].width * 0.5,
      ]);
      bloomHalfH = Array.from({ length: H }, (_, hi) => [
        sprBloom[hi][0].height * 0.5,
        sprBloom[hi][1].height * 0.5,
        sprBloom[hi][2].height * 0.5,
      ]);

      // deterministic particles
      const rng = mulberry32(123456789);

      fx = new Float32Array(FLOW);
      fy = new Float32Array(FLOW);
      vx = new Float32Array(FLOW);
      vy = new Float32Array(FLOW);
      alp = new Float32Array(FLOW);
      phase = new Float32Array(FLOW);
      omega = new Float32Array(FLOW);
      hueBase = new Uint16Array(FLOW);
      sizeIdx = new Uint8Array(FLOW);
      flowBloomMask = new Uint8Array(FLOW);

      const baseVx = isMobile ? 14 : 18;
      const baseVy = isMobile ? -10 : -14;

      for (let i = 0; i < FLOW; i++) {
        fx[i] = rr(rng, 0, w);
        fy[i] = rr(rng, 0, h);

        vx[i] = baseVx + rr(rng, -14, 22);
        vy[i] = baseVy + rr(rng, -18, 14);

        alp[i] = isMobile ? rr(rng, 0.58, 1.0) : rr(rng, 0.48, 0.98);

        phase[i] = rr(rng, 0, TAU);

        const spd = rr(rng, 0.95, 2.2);
        omega[i] = 1.6 * spd;

        hueBase[i] = Math.floor(rr(rng, 0, H));

        const pick = rr(rng, 0, 1);
        sizeIdx[i] = pick < 0.55 ? 0 : pick < 0.85 ? 1 : 2;

        // replaces (i % 6) in hot loop
        flowBloomMask[i] = i % 6 === 0 ? 1 : 0;
      }

      const rngS = mulberry32(246813579);
      shHue = new Uint16Array(SHP);
      shSize = new Uint8Array(SHP);
      shPhase = new Float32Array(SHP);
      shMod7 = new Uint8Array(SHP);
      shBloomMask = new Uint8Array(SHP);

      for (let i = 0; i < SHP; i++) {
        shHue[i] = Math.floor(rr(rngS, 0, H));
        const pick = rr(rngS, 0, 1);
        shSize[i] = pick < 0.4 ? 0 : pick < 0.8 ? 1 : 2;
        shPhase[i] = rr(rngS, 0, TAU);
        shMod7[i] = i % 7;

        // replaces (i % 7) in hot loop
        shBloomMask[i] = i % 7 === 0 ? 1 : 0;
      }

      // cluster morph temp buffers
      mx = new Float32Array(SHP);
      my = new Float32Array(SHP);

      for (const s of SHAPES) {
        leftSet[s] = shapePoints(s, SHP, left.seed + s.length * 101);
        rightSet[s] = shapePoints(s, SHP, right.seed + s.length * 131);
      }
    };

    const drawCluster = (
      now: number,
      cluster: typeof left,
      set: Record<ShapeType, { xs: Float32Array; ys: Float32Array }>,
      ax: number,
      ay: number,
      hueBias: number
    ) => {
      const elapsed = now - cluster.t0;
      if (elapsed >= cluster.every) {
        cluster.i = cluster.n;
        cluster.n = (cluster.n + 1) % SHAPES.length;
        cluster.t0 = now;
      }

      const t = easeInOut(clamp01((now - cluster.t0) / cluster.dur));
      const inv = 1 - t;

      const A = set[SHAPES[cluster.i]];
      const B = set[SHAPES[cluster.n]];

      const driftX = Math.sin(now * 0.00055) * 28 + Math.sin(now * 0.0011) * 10;
      const driftY = Math.cos(now * 0.00048) * 18;

      const baseX = ax + driftX;
      const baseY = ay + driftY;

      const hueShift = (Math.floor(now / 260) + hueBias) % H;

      for (let i = 0; i < SHP; i++) {
        mx[i] = A.xs[i] * inv + B.xs[i] * t;
        my[i] = A.ys[i] * inv + B.ys[i] * t;
      }

      for (let i = 0; i < SHP; i++) {
        const x = baseX + mx[i];
        const y = baseY + my[i];

        const tw = 0.68 + 0.32 * sinLUT(shPhase[i]);
        ctx.globalAlpha = 0.36 + tw * 0.64;

        let hi = shHue[i] + hueShift + shMod7[i];
        if (hi >= H) hi -= H;
        if (hi >= H) hi -= H;

        const si = shSize[i];
        ctx.drawImage(sprBase[hi][si], x - sprHalfW[hi][si], y - sprHalfH[hi][si]);

        if (shBloomMask[i]) {
          ctx.globalAlpha *= 0.28;
          ctx.drawImage(
            sprBloom[hi][si],
            x - bloomHalfW[hi][si],
            y - bloomHalfH[hi][si]
          );
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < FLOW; i++) {
        phase[i] = wrapTau(phase[i] + omega[i] * dt);
      }
      const shAdv = 2.6 * dt;
      for (let i = 0; i < SHP; i++) {
        shPhase[i] = wrapTau(shPhase[i] + shAdv);
      }

      const timeHue = Math.floor(now / 220) % H;

      // pass 1
      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < FLOW; i++) {
        let x = fx[i] + vx[i] * dt;
        let y = fy[i] + vy[i] * dt;

        if (x < -pad) x = w + pad;
        else if (x > w + pad) x = -pad;

        if (y < -pad) y = h + pad;
        else if (y > h + pad) y = -pad;

        fx[i] = x;
        fy[i] = y;

        const tw = 0.7 + 0.3 * sinLUT(phase[i]);
        ctx.globalAlpha = alp[i] * tw;

        let hi = hueBase[i] + timeHue;
        if (hi >= H) hi -= H;

        const si = sizeIdx[i];
        ctx.drawImage(sprBase[hi][si], x - sprHalfW[hi][si], y - sprHalfH[hi][si]);
      }

      ctx.restore();

      // pass 2 bloom
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < FLOW; i++) {
        if (!flowBloomMask[i]) continue;

        const tw = 0.7 + 0.3 * sinLUT(phase[i]);
        ctx.globalAlpha = alp[i] * tw * 0.34;

        let hi = hueBase[i] + timeHue + 3;
        if (hi >= H) hi -= H;
        if (hi >= H) hi -= H;

        const si = sizeIdx[i];
        const x = fx[i];
        const y = fy[i];
        ctx.drawImage(
          sprBloom[hi][si],
          x - bloomHalfW[hi][si],
          y - bloomHalfH[hi][si]
        );
      }

      // clusters
      const isMobile = w < 640;
      const lx = isMobile ? w * 0.14 : w * 0.22;
      const ly = isMobile ? h * 0.26 : h * 0.36;
      const rx = isMobile ? w * 0.86 : w * 0.8;
      const ry = isMobile ? h * 0.7 : h * 0.6;

      drawCluster(now, left, leftSet, lx, ly, 8);
      drawCluster(now, right, rightSet, rx, ry, 26);

      ctx.restore();

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onVis = () => {
      if (document.hidden) stop();
      else if (!reduceMotion && inView) start();
    };

    const onResize = () => {
      build();
      last = performance.now();
      if (!reduceMotion && inView) start();
      else frame(performance.now());
    };

    build();

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          inView = entries.some((e) => e.isIntersecting);
          if (!inView) stop();
          else if (!reduceMotion && !document.hidden) start();
        },
        { root: null, threshold: 0.01 }
      );
      io.observe(root);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    if (!reduceMotion) start();
    else frame(performance.now());

    return () => {
      stop();
      window.removeEventListener("resize", onResize as any);
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
      startedRef.current = false;
    };
  }, []);

  return (
    <Box
      ref={rootRef}
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,

        // PURE WHITE BACKGROUND ONLY
        background: "#FFFFFF",
      }}
    >
      {/* mist layers */}
      <Box
        sx={{
          position: "absolute",
          inset: "-20%",
          pointerEvents: "none",
          filter: "blur(48px)",
          background: `
            radial-gradient(980px 560px at 18% 22%, rgba(255,255,255,0.32), transparent 62%),
            radial-gradient(860px 520px at 78% 18%, rgba(255,255,255,0.22), transparent 64%),
            radial-gradient(820px 560px at 70% 78%, rgba(255,255,255,0.18), transparent 62%),
            radial-gradient(760px 560px at 26% 78%, rgba(255,255,255,0.16), transparent 64%)
          `,
          animation: `${mistA} 12s ease-in-out infinite`,
          mixBlendMode: "soft-light",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: "-20%",
          pointerEvents: "none",
          filter: "blur(54px)",
          background: `
            radial-gradient(920px 600px at 30% 35%, rgba(255,255,255,0.20), transparent 66%),
            radial-gradient(820px 560px at 88% 52%, rgba(255,255,255,0.18), transparent 66%),
            radial-gradient(880px 600px at 52% 92%, rgba(255,255,255,0.16), transparent 68%),
            radial-gradient(760px 560px at 8% 58%, rgba(255,255,255,0.14), transparent 70%)
          `,
          animation: `${mistB} 16s ease-in-out infinite`,
          mixBlendMode: "overlay",
        }}
      />

      {/* canvas particles */}
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* reduce motion support */}
      <Box
        sx={{
          "@media (prefers-reduced-motion: reduce)": {
            "&, & *": { animation: "none !important", transition: "none !important" },
          },
        }}
      />
    </Box>
  );
}
