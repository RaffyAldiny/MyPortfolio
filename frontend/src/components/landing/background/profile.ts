export type BackgroundProfile = {
  key: "mobile" | "desktop-lite" | "desktop";
  isMobile: boolean;
  flowCount: number;
  shapeCount: number;
  pad: number;
  baseVx: number;
  baseVy: number;
  flowBloomStride: number;
  shapeBloomStride: number;
  targetFrameMs: number;
  projectsFrameMs: number;
  maxDpr: number;
};

export function detectLowPowerDevice() {
  const nav = window.navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return cores <= 6 || memory <= 8;
}

export function getBackgroundProfile(width: number, lowPowerDevice: boolean): BackgroundProfile {
  if (width < 640) {
    return {
      key: "mobile",
      isMobile: true,
      flowCount: 28,
      shapeCount: 0,
      pad: 18,
      baseVx: 5,
      baseVy: -3,
      flowBloomStride: 999,
      shapeBloomStride: 999,
      targetFrameMs: 1000 / 16,
      projectsFrameMs: 1000 / 10,
      maxDpr: 1,
    };
  }

  if (lowPowerDevice) {
    return {
      key: "desktop-lite",
      isMobile: false,
      flowCount: 84,
      shapeCount: 132,
      pad: 24,
      baseVx: 16,
      baseVy: -12,
      flowBloomStride: 16,
      shapeBloomStride: 18,
      targetFrameMs: 1000 / 48,
      projectsFrameMs: 1000 / 30,
      maxDpr: 1.75,
    };
  }

  return {
    key: "desktop",
    isMobile: false,
    flowCount: 112,
    shapeCount: 176,
    pad: 26,
    baseVx: 18,
    baseVy: -14,
    flowBloomStride: 14,
    shapeBloomStride: 16,
    targetFrameMs: 1000 / 60,
    projectsFrameMs: 1000 / 36,
    maxDpr: 2,
  };
}
