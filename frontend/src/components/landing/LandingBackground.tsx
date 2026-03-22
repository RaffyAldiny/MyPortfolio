"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import {
  clamp01,
  easeInOut,
  getShapeTemplateSet,
  mulberry32,
  randomRange,
  SHAPES,
  ShapeSetMap,
  sinLUT,
  wrapTau,
} from "@/components/landing/background/math";
import {
  BackgroundProfile,
  detectLowPowerDevice,
  getBackgroundProfile,
} from "@/components/landing/background/profile";
import {
  getSpriteBundle,
  HUE_VARIANT_COUNT,
  SpriteBundle,
} from "@/components/landing/background/sprites";
import { getSnapShell } from "@/lib/snapShell";

const mistA = keyframes`
  0%   { transform: translate3d(-1.2%, -0.8%, 0) scale(1);    opacity: 0.24; }
  50%  { transform: translate3d( 1.2%,  0.8%, 0) scale(1.03); opacity: 0.48; }
  100% { transform: translate3d(-1.2%, -0.8%, 0) scale(1);    opacity: 0.24; }
`;

type ClusterState = {
  i: number;
  n: number;
  t0: number;
  every: number;
  dur: number;
};

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
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let raf = 0;
    let last = performance.now();
    let w = 0;
    let h = 0;
    let dpr = 1;

    const lowPowerDevice = detectLowPowerDevice();
    let profile: BackgroundProfile = getBackgroundProfile(window.innerWidth, lowPowerDevice);
    let spriteBundle: SpriteBundle = getSpriteBundle(profile.isMobile);
    let leftSet: ShapeSetMap = getShapeTemplateSet(profile.isMobile, profile.shapeCount, 9001, 101);
    let rightSet: ShapeSetMap = getShapeTemplateSet(profile.isMobile, profile.shapeCount, 4242, 131);
    let isProjectsActive = false;
    let isScrollActive = false;
    let scrollIdleTimer = 0;

    let fx = new Float32Array(0);
    let fy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let alp = new Float32Array(0);
    let phase = new Float32Array(0);
    let omega = new Float32Array(0);
    let hueBase = new Uint16Array(0);
    let sizeIdx = new Uint8Array(0);
    let flowBloomMask = new Uint8Array(0);

    let shHue = new Uint16Array(0);
    let shSize = new Uint8Array(0);
    let shPhase = new Float32Array(0);
    let shMod7 = new Uint8Array(0);
    let shBloomMask = new Uint8Array(0);

    const left: ClusterState = {
      i: 0,
      n: 1,
      t0: performance.now(),
      every: 7000,
      dur: 2200,
    };
    const right: ClusterState = {
      i: 1,
      n: 2,
      t0: performance.now(),
      every: 9500,
      dur: 2400,
    };

    let sectionObserver: IntersectionObserver | null = null;
    const scrollHost = getSnapShell() ?? window;

    const resizeCanvas = () => {
      const prevW = w;
      const prevH = h;

      w = Math.max(1, window.innerWidth);
      h = Math.max(1, window.innerHeight);
      dpr = Math.min(profile.maxDpr, window.devicePixelRatio || 1);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (prevW > 0 && prevH > 0 && fx.length > 0) {
        const scaleX = w / prevW;
        const scaleY = h / prevH;
        for (let i = 0; i < fx.length; i += 1) {
          fx[i] *= scaleX;
          fy[i] *= scaleY;
        }
      }
    };

    const seedFlowParticles = () => {
      const rng = mulberry32(123456789);

      fx = new Float32Array(profile.flowCount);
      fy = new Float32Array(profile.flowCount);
      vx = new Float32Array(profile.flowCount);
      vy = new Float32Array(profile.flowCount);
      alp = new Float32Array(profile.flowCount);
      phase = new Float32Array(profile.flowCount);
      omega = new Float32Array(profile.flowCount);
      hueBase = new Uint16Array(profile.flowCount);
      sizeIdx = new Uint8Array(profile.flowCount);
      flowBloomMask = new Uint8Array(profile.flowCount);

      for (let i = 0; i < profile.flowCount; i += 1) {
        fx[i] = randomRange(rng, 0, w);
        fy[i] = randomRange(rng, 0, h);
        vx[i] = profile.baseVx + randomRange(rng, -14, 22);
        vy[i] = profile.baseVy + randomRange(rng, -18, 14);
        alp[i] = profile.isMobile
          ? randomRange(rng, 0.5, 0.9)
          : randomRange(rng, 0.48, 0.98);
        phase[i] = randomRange(rng, 0, Math.PI * 2);
        omega[i] = 1.6 * randomRange(rng, 0.95, 2.2);
        hueBase[i] = Math.floor(randomRange(rng, 0, HUE_VARIANT_COUNT));
        const pick = randomRange(rng, 0, 1);
        sizeIdx[i] = pick < 0.55 ? 0 : pick < 0.85 ? 1 : 2;
        flowBloomMask[i] = i % profile.flowBloomStride === 0 ? 1 : 0;
      }
    };

    const seedShapeParticles = () => {
      const rng = mulberry32(246813579);

      shHue = new Uint16Array(profile.shapeCount);
      shSize = new Uint8Array(profile.shapeCount);
      shPhase = new Float32Array(profile.shapeCount);
      shMod7 = new Uint8Array(profile.shapeCount);
      shBloomMask = new Uint8Array(profile.shapeCount);

      for (let i = 0; i < profile.shapeCount; i += 1) {
        shHue[i] = Math.floor(randomRange(rng, 0, HUE_VARIANT_COUNT));
        const pick = randomRange(rng, 0, 1);
        shSize[i] = pick < 0.4 ? 0 : pick < 0.8 ? 1 : 2;
        shPhase[i] = randomRange(rng, 0, Math.PI * 2);
        shMod7[i] = i % 7;
        shBloomMask[i] = i % profile.shapeBloomStride === 0 ? 1 : 0;
      }
    };

    const applyProfile = (force = false) => {
      const nextProfile = getBackgroundProfile(window.innerWidth, lowPowerDevice);
      const profileChanged = force || nextProfile.key !== profile.key;
      profile = nextProfile;

      resizeCanvas();

      if (!profileChanged) return;

      spriteBundle = getSpriteBundle(profile.isMobile);
      leftSet = getShapeTemplateSet(profile.isMobile, profile.shapeCount, 9001, 101);
      rightSet = getShapeTemplateSet(profile.isMobile, profile.shapeCount, 4242, 131);
      seedFlowParticles();
      seedShapeParticles();
    };

    const drawCluster = (
      now: number,
      cluster: ClusterState,
      set: ShapeSetMap,
      anchorX: number,
      anchorY: number,
      hueBias: number,
      allowBloom: boolean,
      alphaScale: number
    ) => {
      const elapsed = now - cluster.t0;
      if (elapsed >= cluster.every) {
        cluster.i = cluster.n;
        cluster.n = (cluster.n + 1) % 5;
        cluster.t0 = now;
      }

      const morph = easeInOut(clamp01((now - cluster.t0) / cluster.dur));
      const inv = 1 - morph;
      const driftX = Math.sin(now * 0.00055) * 28 + Math.sin(now * 0.0011) * 10;
      const driftY = Math.cos(now * 0.00048) * 18;
      const baseX = anchorX + driftX;
      const baseY = anchorY + driftY;
      const hueShift = (Math.floor(now / 260) + hueBias) % HUE_VARIANT_COUNT;
      const activeA = set[SHAPES[cluster.i]];
      const activeB = set[SHAPES[cluster.n]];

      for (let i = 0; i < profile.shapeCount; i += 1) {
        const x = baseX + activeA.xs[i] * inv + activeB.xs[i] * morph;
        const y = baseY + activeA.ys[i] * inv + activeB.ys[i] * morph;
        const twinkle = 0.68 + 0.32 * sinLUT(shPhase[i]);

        ctx.globalAlpha = (0.36 + twinkle * 0.64) * alphaScale;

        let hueIndex = shHue[i] + hueShift + shMod7[i];
        while (hueIndex >= HUE_VARIANT_COUNT) hueIndex -= HUE_VARIANT_COUNT;

        const spriteIndex = shSize[i];
        ctx.drawImage(
          spriteBundle.base[hueIndex][spriteIndex],
          x - spriteBundle.halfW[hueIndex][spriteIndex],
          y - spriteBundle.halfH[hueIndex][spriteIndex]
        );

        if (allowBloom && shBloomMask[i]) {
          ctx.globalAlpha *= 0.26;
          ctx.drawImage(
            spriteBundle.bloom[hueIndex][spriteIndex],
            x - spriteBundle.bloomHalfW[hueIndex][spriteIndex],
            y - spriteBundle.bloomHalfH[hueIndex][spriteIndex]
          );
        }
      }
    };

    const frame = (now: number) => {
      const isBusy = isProjectsActive || isScrollActive;
      const frameBudget = isBusy ? profile.projectsFrameMs : profile.targetFrameMs;
      const elapsedMs = now - last;
      if (elapsedMs < frameBudget) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, elapsedMs / 1000));
      last = now - (elapsedMs % frameBudget);

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < profile.flowCount; i += 1) {
        phase[i] = wrapTau(phase[i] + omega[i] * dt);
      }

      const shapeAdvance = 2.6 * dt;
      for (let i = 0; i < profile.shapeCount; i += 1) {
        shPhase[i] = wrapTau(shPhase[i] + shapeAdvance);
      }

      const timeHue = Math.floor(now / 220) % HUE_VARIANT_COUNT;
      const allowBloom = !isBusy;
      const flowAlphaScale = isScrollActive ? 0.64 : 1;
      const clusterAlphaScale = isScrollActive ? 0.52 : 1;

      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < profile.flowCount; i += 1) {
        let x = fx[i] + vx[i] * dt;
        let y = fy[i] + vy[i] * dt;

        if (x < -profile.pad) x = w + profile.pad;
        else if (x > w + profile.pad) x = -profile.pad;

        if (y < -profile.pad) y = h + profile.pad;
        else if (y > h + profile.pad) y = -profile.pad;

        fx[i] = x;
        fy[i] = y;

        const twinkle = 0.7 + 0.3 * sinLUT(phase[i]);
        ctx.globalAlpha = alp[i] * twinkle * flowAlphaScale;

        let hueIndex = hueBase[i] + timeHue;
        if (hueIndex >= HUE_VARIANT_COUNT) hueIndex -= HUE_VARIANT_COUNT;

        const spriteIndex = sizeIdx[i];
        ctx.drawImage(
          spriteBundle.base[hueIndex][spriteIndex],
          x - spriteBundle.halfW[hueIndex][spriteIndex],
          y - spriteBundle.halfH[hueIndex][spriteIndex]
        );
      }

      ctx.restore();

      if (allowBloom) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        for (let i = 0; i < profile.flowCount; i += 1) {
          if (!flowBloomMask[i]) continue;

          const twinkle = 0.7 + 0.3 * sinLUT(phase[i]);
          ctx.globalAlpha = alp[i] * twinkle * 0.3;

          let hueIndex = hueBase[i] + timeHue + 3;
          while (hueIndex >= HUE_VARIANT_COUNT) hueIndex -= HUE_VARIANT_COUNT;

          const spriteIndex = sizeIdx[i];
          ctx.drawImage(
            spriteBundle.bloom[hueIndex][spriteIndex],
            fx[i] - spriteBundle.bloomHalfW[hueIndex][spriteIndex],
            fy[i] - spriteBundle.bloomHalfH[hueIndex][spriteIndex]
          );
        }

        ctx.restore();
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const lx = profile.isMobile ? w * 0.18 : w * 0.22;
      const ly = profile.isMobile ? h * 0.3 : h * 0.36;
      const rx = profile.isMobile ? w * 0.82 : w * 0.8;
      const ry = profile.isMobile ? h * 0.65 : h * 0.6;

      drawCluster(now, left, leftSet, lx, ly, 8, allowBloom, clusterAlphaScale);
      drawCluster(now, right, rightSet, rx, ry, 26, allowBloom, clusterAlphaScale);

      ctx.restore();

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (!reduceMotion) start();
    };

    const handleResize = () => {
      applyProfile();
      last = performance.now();
      if (!reduceMotion && !document.hidden) start();
      else frame(performance.now());
    };

    const handleScrollActivity = () => {
      isScrollActive = true;
      if (scrollIdleTimer) {
        window.clearTimeout(scrollIdleTimer);
      }
      scrollIdleTimer = window.setTimeout(() => {
        isScrollActive = false;
        scrollIdleTimer = 0;
      }, 140);
    };

    const observeProjectsSection = () => {
      const projectPanels = Array.from(
        document.querySelectorAll<HTMLElement>('[data-nav-section="projects"]')
      );
      if (!projectPanels.length || !("IntersectionObserver" in window)) return;

      sectionObserver = new IntersectionObserver(
        (entries) => {
          isProjectsActive = entries.some(
            (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.18
          );
        },
        {
          root: null,
          threshold: [0, 0.18, 0.35, 0.6],
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      projectPanels.forEach((panel) => sectionObserver?.observe(panel));
    };

    applyProfile(true);
    observeProjectsSection();
    scrollHost.addEventListener("scroll", handleScrollActivity, { passive: true });
    scrollHost.addEventListener("touchmove", handleScrollActivity, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    if (!reduceMotion) start();
    else frame(performance.now());

    return () => {
      stop();
      if (scrollIdleTimer) {
        window.clearTimeout(scrollIdleTimer);
      }
      scrollHost.removeEventListener("scroll", handleScrollActivity);
      scrollHost.removeEventListener("touchmove", handleScrollActivity);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      sectionObserver?.disconnect();
      startedRef.current = false;
    };
  }, []);

  return (
    <Box
      ref={rootRef}
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        background: "#FCFDFB",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "-16%",
          pointerEvents: "none",
          filter: { xs: "blur(26px)", md: "blur(42px)" },
          background: `
            radial-gradient(980px 560px at 18% 22%, rgba(28,219,47,0.12), transparent 62%),
            radial-gradient(860px 520px at 78% 18%, rgba(207,250,201,0.12), transparent 64%),
            radial-gradient(820px 560px at 70% 78%, rgba(12,122,25,0.1), transparent 62%),
            radial-gradient(760px 560px at 26% 78%, rgba(247,251,244,0.16), transparent 64%)
          `,
          animation: { xs: "none", md: `${mistA} 14s ease-in-out infinite` },
          mixBlendMode: "soft-light",
          opacity: { xs: 0.78, md: 1 },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: "-10%",
          pointerEvents: "none",
          background: `
            radial-gradient(920px 600px at 30% 35%, rgba(247,251,244,0.14), transparent 66%),
            radial-gradient(820px 560px at 88% 52%, rgba(28,219,47,0.08), transparent 66%),
            radial-gradient(880px 600px at 52% 92%, rgba(12,122,25,0.08), transparent 68%),
            radial-gradient(760px 560px at 8% 58%, rgba(207,250,201,0.11), transparent 70%)
          `,
          opacity: { xs: 0.36, md: 0.6 },
          mixBlendMode: "overlay",
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
          opacity: { xs: 0.72, md: 1 },
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
