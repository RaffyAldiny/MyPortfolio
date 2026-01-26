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
const rr = (rng: () => number, min: number, max: number) => rng() * (max - min) + min;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (v: number) => (v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2);

function shapePoints(type: ShapeType, n: number, seed: number) {
  const rng = mulberry32(seed);
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);

  const scale = 5.8;
  const jitter = () => rr(rng, -6.8, 6.8);

  for (let i = 0; i < n; i++) {
    const t = (i / n) * 2 * Math.PI;
    let x = 0;
    let y = 0;

    switch (type) {
      case "heart":
        x = 16 * Math.pow(Math.sin(t), 3);
        y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        break;

      case "star": {
        const seg = Math.PI / 5;
        const k = Math.floor(t / seg) % 2;
        const radius = k === 0 ? 22 : 11;
        x = radius * Math.cos(t);
        y = radius * Math.sin(t);
        break;
      }

      case "butterfly": {
        const rB =
          Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
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

/**
 * True colored prism sprite (the particle itself has color).
 * Uses multi-stop radial gradient with hue shifts to feel like Siri prism glass.
 */
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

  // Bloom (colored, strong)
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rOuter);
  g.addColorStop(0.0, `hsla(${h1}, 100%, 90%, 0.95)`);
  g.addColorStop(0.18, `hsla(${h2}, 100%, 74%, 0.65)`);
  g.addColorStop(0.38, `hsla(${h3}, 100%, 68%, 0.35)`);
  g.addColorStop(0.62, `hsla(${h2}, 100%, 70%, 0.16)`);
  g.addColorStop(1.0, `rgba(255,255,255,0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
  ctx.fill();

  // Fine rays
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

  // Crisp core
  ctx.fillStyle = `hsla(${h1}, 100%, 94%, 1)`;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(1, core), 0, Math.PI * 2);
  ctx.fill();

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

    let raf = 0;
    let last = performance.now();

    let w = 0;
    let h = 0;
    let dpr = 1;

    // Keep background particle sizes the same as your original.
    let FLOW = 320;
    // Increase object (cluster) particles a lot for detail.
    let SHP = 720;

    // Flow arrays
    let fx = new Float32Array(0);
    let fy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let a = new Float32Array(0);
    let phase = new Float32Array(0);
    let spd = new Float32Array(0);
    let hueBase = new Uint16Array(0);
    let sizeIdx = new Uint8Array(0);

    // Shape point attributes (shared across shapes)
    let shHue = new Uint16Array(0);
    let shSize = new Uint8Array(0);
    let shPhase = new Float32Array(0);

    const H = 48; // richer rainbow steps
    let sprites: HTMLCanvasElement[][] = []; // [hueIndex][sizeIdx]

    const leftSet: Record<ShapeType, { xs: Float32Array; ys: Float32Array }> = {} as any;
    const rightSet: Record<ShapeType, { xs: Float32Array; ys: Float32Array }> = {} as any;

    const left = { i: 0, n: 1, t0: performance.now(), every: 7000, dur: 2200, seed: 9001 };
    const right = { i: 1, n: 2, t0: performance.now(), every: 9500, dur: 2400, seed: 4242 };

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

      FLOW = isMobile ? 240 : 360;

      // ✅ Increase object particles only
      SHP = isMobile ? 520 : 820;

      // ✅ Keep background particle sizes exactly like original
      const sizes = isMobile ? [9, 14, 22] : [8, 13, 20];
      const cores = isMobile ? [1.0, 1.25, 1.55] : [1.0, 1.2, 1.5];

      sprites = Array.from({ length: H }, (_, k) => {
        const hue = Math.round((k * 360) / H);
        return [
          makePrismSprite(hue, sizes[0], cores[0]),
          makePrismSprite(hue, sizes[1], cores[1]),
          makePrismSprite(hue, sizes[2], cores[2]),
        ];
      });

      // Deterministic particles
      const rng = mulberry32(123456789);

      fx = new Float32Array(FLOW);
      fy = new Float32Array(FLOW);
      vx = new Float32Array(FLOW);
      vy = new Float32Array(FLOW);
      a = new Float32Array(FLOW);
      phase = new Float32Array(FLOW);
      spd = new Float32Array(FLOW);
      hueBase = new Uint16Array(FLOW);
      sizeIdx = new Uint8Array(FLOW);

      const baseVx = isMobile ? 14 : 18;
      const baseVy = isMobile ? -10 : -14;

      for (let i = 0; i < FLOW; i++) {
        fx[i] = rr(rng, 0, w);
        fy[i] = rr(rng, 0, h);

        vx[i] = baseVx + rr(rng, -14, 22);
        vy[i] = baseVy + rr(rng, -18, 14);

        // strong enough for white background
        a[i] = isMobile ? rr(rng, 0.58, 1.0) : rr(rng, 0.48, 0.98);

        phase[i] = rr(rng, 0, Math.PI * 2);
        spd[i] = rr(rng, 0.95, 2.2);

        hueBase[i] = Math.floor(rr(rng, 0, H));
        // bias to small, but keep a lot of bright ones
        const pick = rr(rng, 0, 1);
        sizeIdx[i] = pick < 0.55 ? 0 : pick < 0.85 ? 1 : 2;
      }

      // Shape attributes (same sprite sizes, just more points)
      const rngS = mulberry32(246813579);
      shHue = new Uint16Array(SHP);
      shSize = new Uint8Array(SHP);
      shPhase = new Float32Array(SHP);
      for (let i = 0; i < SHP; i++) {
        shHue[i] = Math.floor(rr(rngS, 0, H));
        const pick = rr(rngS, 0, 1);
        shSize[i] = pick < 0.40 ? 0 : pick < 0.80 ? 1 : 2;
        shPhase[i] = rr(rngS, 0, Math.PI * 2);
      }

      for (const s of SHAPES) {
        leftSet[s] = shapePoints(s, SHP, left.seed + s.length * 101);
        rightSet[s] = shapePoints(s, SHP, right.seed + s.length * 131);
      }
    };

    const wrap = (x: number, y: number) => {
      const pad = 26;
      let nx = x;
      let ny = y;
      if (nx < -pad) nx = w + pad;
      if (nx > w + pad) nx = -pad;
      if (ny < -pad) ny = h + pad;
      if (ny > h + pad) ny = -pad;
      return [nx, ny] as const;
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
      const A = set[SHAPES[cluster.i]];
      const B = set[SHAPES[cluster.n]];

      // Drift left/right more
      const driftX = Math.sin(now * 0.00055) * 28 + Math.sin(now * 0.0011) * 10;
      const driftY = Math.cos(now * 0.00048) * 18;

      const hueShift = (Math.floor(now / 260) + hueBias) % H;

      // Main cluster (more particles = more detail)
      for (let i = 0; i < SHP; i++) {
        const x = ax + driftX + (A.xs[i] * (1 - t) + B.xs[i] * t);
        const y = ay + driftY + (A.ys[i] * (1 - t) + B.ys[i] * t);

        const tw = 0.68 + 0.32 * Math.sin(shPhase[i] + now * 0.0026);
        ctx.globalAlpha = 0.36 + tw * 0.64;

        const hi = (shHue[i] + hueShift + (i % 7)) % H;
        const spr = sprites[hi][shSize[i]];
        ctx.drawImage(spr, x - spr.width / 2, y - spr.height / 2);

        // keep bloom but slightly sparser because SHP is much higher now
        if ((i % 5) === 0) {
          ctx.globalAlpha *= 0.30;
          const bloom = sprites[hi][2];
          ctx.drawImage(bloom, x - bloom.width / 2, y - bloom.height / 2);
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
      last = now;

      ctx.clearRect(0, 0, w, h);

      // Paint pass 1: source-over (keeps colors)
      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      const timeHue = Math.floor(now / 220) % H;

      for (let i = 0; i < FLOW; i++) {
        fx[i] += vx[i] * dt;
        fy[i] += vy[i] * dt;

        const [nx, ny] = wrap(fx[i], fy[i]);
        fx[i] = nx;
        fy[i] = ny;

        const tw = 0.70 + 0.30 * Math.sin(phase[i] + now * 0.0016 * spd[i]);
        ctx.globalAlpha = a[i] * tw;

        const hi = (hueBase[i] + timeHue) % H;
        const spr = sprites[hi][sizeIdx[i]];
        ctx.drawImage(spr, fx[i] - spr.width / 2, fy[i] - spr.height / 2);
      }

      ctx.restore();

      // Paint pass 2: screen bloom (spreads light)
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < FLOW; i++) {
        if ((i % 6) !== 0) continue; // bloom subset for speed
        const tw = 0.70 + 0.30 * Math.sin(phase[i] + now * 0.0016 * spd[i]);
        ctx.globalAlpha = (a[i] * tw) * 0.34;

        const hi = (hueBase[i] + timeHue + 3) % H;
        const bloom = sprites[hi][2];
        ctx.drawImage(bloom, fx[i] - bloom.width / 2, fy[i] - bloom.height / 2);
      }

      // clusters
      const isMobile = w < 640;
      const lx = isMobile ? w * 0.14 : w * 0.22;
      const ly = isMobile ? h * 0.26 : h * 0.36;
      const rx = isMobile ? w * 0.86 : w * 0.80;
      const ry = isMobile ? h * 0.70 : h * 0.60;

      drawCluster(now, left, leftSet, lx, ly, 8);
      drawCluster(now, right, rightSet, rx, ry, 26);

      ctx.restore();

      raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    build();
    window.addEventListener("resize", build, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    if (!reduceMotion) raf = requestAnimationFrame(frame);
    else frame(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build as any);
      document.removeEventListener("visibilitychange", onVis);
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

        // white base with prism tint fields
        background: `
          radial-gradient(1000px 560px at 18% 18%, ${alpha("#7DD3FF", 0.65)}, transparent 62%),
          radial-gradient(980px 560px at 84% 18%, ${alpha("#E7B7FF", 0.62)}, transparent 62%),
          radial-gradient(980px 620px at 56% 90%, ${alpha("#A7FFD6", 0.58)}, transparent 64%),
          radial-gradient(900px 600px at 40% 54%, ${alpha("#FFD3A5", 0.30)}, transparent 62%),
          linear-gradient(120deg, #FFFFFF, #FFFFFF)
        `,
        backgroundSize: "260% 260%",
        animation: `${shimmer} 14s ease-in-out infinite`,

        // tiny contrast so colors read on white
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `radial-gradient(1200px 700px at 50% 50%,
            ${alpha("#000", 0.00)} 0%,
            ${alpha("#000", 0.06)} 76%,
            ${alpha("#000", 0.10)} 100%
          )`,
          pointerEvents: "none",
        },
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

      {/* subtle grain */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.10,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.18) 0 1px, transparent 1.8px)",
          backgroundSize: "150px 150px",
          animation: `${shimmer} 22s ease-in-out infinite`,
          mixBlendMode: "multiply",
        }}
      />

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
