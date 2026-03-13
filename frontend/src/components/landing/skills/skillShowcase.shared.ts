"use client";

import { keyframes } from "@emotion/react";
import type { SkillGroup } from "@/constants/skills";

export type GroupKey = "all" | SkillGroup;

export const GROUP_OPTIONS: ReadonlyArray<{ value: GroupKey; label: string }> = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "data", label: "Data" },
  { value: "tools", label: "Tools" },
];

export const titleBreathe = keyframes`
  0%, 100% {
    opacity: 0.9;
    transform: translate3d(0, 0, 0) scale(0.982);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -1px, 0) scale(1.022);
  }
`;

export const prismRotate = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const PRISM_GRADIENT =
  "linear-gradient(135deg, rgba(247,251,244,0.88), rgba(226,236,217,0.8), rgba(193,211,181,0.76), rgba(119,221,119,0.62), rgba(102,138,103,0.66), rgba(43,69,48,0.62))";
export const INK = "#0B0B10";

type SkillHopMotion = {
  delaySeconds: number;
  distancePx: number;
  durationSeconds: number;
};

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getSkillHopMotion(index: number, totalCount: number): SkillHopMotion {
  const safeTotal = Math.max(1, totalCount);
  const cycleDuration = Math.min(20, Math.max(8.5, safeTotal * 0.68));
  const slotDuration = cycleDuration / safeTotal;

  return {
    durationSeconds: cycleDuration,
    delaySeconds: index * slotDuration,
    distancePx: safeTotal > 18 ? 8 : safeTotal > 10 ? 7 : 6,
  };
}

export function getSkillHopOrder(skillNames: readonly string[]) {
  return [...skillNames]
    .map((name) => ({
      name,
      weight: hashString(`${name}:${skillNames.length}`),
    }))
    .sort((a, b) => a.weight - b.weight)
    .map((entry) => entry.name);
}

export function createSkillHopKeyframes(distancePx: number, durationSeconds: number) {
  const anticipationPercent = (0.14 / durationSeconds) * 100;
  const liftPercent = (0.26 / durationSeconds) * 100;
  const peakPercent = (0.36 / durationSeconds) * 100;
  const landPercent = (0.48 / durationSeconds) * 100;
  const settlePercent = (0.58 / durationSeconds) * 100;
  const settlePx = Math.max(2, Math.round(distancePx * 0.24));

  return keyframes`
    0%, 100% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
    ${anticipationPercent}% {
      transform: translate3d(0, 0, 0) scale3d(1.04, 0.96, 1);
    }
    ${liftPercent}% {
      transform: translate3d(0, ${settlePx}px, 0) scale3d(0.985, 1.025, 1);
    }
    ${peakPercent}% {
      transform: translate3d(0, -${distancePx}px, 0) scale3d(0.98, 1.045, 1);
    }
    ${landPercent}% {
      transform: translate3d(0, ${settlePx}px, 0) scale3d(1.02, 0.98, 1);
    }
    ${settlePercent}%,
    100% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
  `;
}
