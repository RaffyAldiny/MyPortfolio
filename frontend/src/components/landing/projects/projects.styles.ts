"use client";

import { keyframes } from "@emotion/react";

export const archivePulse = keyframes`
  0% {
    opacity: 0.92;
    transform: translate3d(0, 0, 0) scale(0.986);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -2px, 0) scale(1.018);
  }
  100% {
    opacity: 0.92;
    transform: translate3d(0, 0, 0) scale(0.986);
  }
`;

export const prismDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const NEON_GREEN = "#B8FF9D";
export const DARK_GREEN_SHADOW = "rgba(4, 24, 8, 0.24)";

export const PROJECTS_SX = {
  container: {
    width: "100%",
    position: "relative",
    bgcolor: "#050505",
    minHeight: { xs: "100svh", md: "100dvh" },
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
  },
  stickySlide: {
    height: { xs: "100svh", md: "100dvh" },
    minHeight: { xs: "100svh", md: "100dvh" },
    width: "100%",
    position: "relative",
    overflow: "hidden",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    alignItems: "flex-end",
    isolation: "isolate",
    willChange: "transform",
  },
  introSlide: {
    height: { xs: "100svh", md: "100dvh" },
    minHeight: { xs: "100svh", md: "100dvh" },
    width: "100%",
    position: "relative",
    overflow: "hidden",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#050505",
    isolation: "isolate",
    zIndex: 1,
  },
  introVignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 55%), radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.70) 82%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  introSheen: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    opacity: 0.18,
    backgroundImage:
      "radial-gradient(circle at 35% 35%, rgba(28,219,47,0.18) 0%, transparent 45%), radial-gradient(circle at 70% 55%, rgba(12,122,25,0.16) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  introPanel: {
    position: "relative",
    zIndex: 1,
    transition: "transform 0.1s linear, opacity 0.1s linear",
    textAlign: "center",
  },
  introTitle: {
    fontWeight: 900,
    fontSize: { xs: "4.45rem", md: "10rem" },
    lineHeight: 0.8,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#C4F2A3",
    filter:
      "drop-shadow(0 0 14px rgba(121, 238, 112, 0.22)) drop-shadow(0 0 28px rgba(28, 219, 47, 0.14)) drop-shadow(0 10px 30px rgba(0,0,0,0.45))",
    transformOrigin: "center center",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    willChange: "transform, opacity",
  },
  introTitleLineWrap: {
    display: "block",
    overflow: "hidden",
  },
  introTitleLine: {
    display: "block",
  },
  introSub: {
    mt: 4,
    fontWeight: 800,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  introSubWrap: {
    mt: 4,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.1,
    overflow: "hidden",
  },
  introAccent: {
    width: { xs: 84, md: 128 },
    height: 3,
    borderRadius: 999,
    background:
      "linear-gradient(90deg, rgba(243,255,240,0.12) 0%, rgba(201,250,179,0.85) 50%, rgba(28,219,47,0.18) 100%)",
    boxShadow: "0 0 12px rgba(121, 238, 112, 0.18)",
    transformOrigin: "center center",
  },
  projectImageFrame: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    overflow: "hidden",
    willChange: "transform",
  },
  projectImageInner: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  projectPosterLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    transform: "scale(1.02)",
  },
  projectVideoLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  projectVideoVeil: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 28%, rgba(255,255,255,0) 55%)",
    mixBlendMode: "screen",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(4,18,7,0.86) 0%, rgba(4,18,7,0.6) 38%, rgba(0,0,0,0.04) 100%)",
    zIndex: 2,
  },
  contentBox: {
    position: "relative",
    zIndex: 3,
    width: "100%",
    maxWidth: "1400px",
    mx: "auto",
    p: { xs: 3, md: 8 },
    pb: { xs: 6, md: 10 },
  },
  projectSubtitle: {
    color: NEON_GREEN,
    fontWeight: 700,
    fontSize: { xs: "0.72rem", md: "1rem" },
    letterSpacing: { xs: "0.14em", md: "0.2em" },
    textTransform: "uppercase",
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 2,
    textShadow: "0 0 8px rgba(141, 255, 116, 0.16)",
  },
  projectLine: {
    width: 40,
    height: 2,
    bgcolor: NEON_GREEN,
    boxShadow: "0 0 8px rgba(141, 255, 116, 0.24)",
    transformOrigin: "left center",
  },
  projectTitle: {
    color: "#fff",
    fontWeight: 900,
    fontSize: { xs: "3rem", md: "7.4rem" },
    lineHeight: 0.9,
    mb: 3,
    textShadow: "0 6px 16px rgba(12, 72, 22, 0.18)",
  },
  projectDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: { xs: "1rem", md: "1.25rem" },
    maxWidth: { xs: "600px", md: "760px" },
    lineHeight: 1.6,
    mb: 4,
  },
  projectTagWrap: {
    display: "flex",
    flexWrap: "wrap",
    mb: 4,
    gap: { xs: 0.75, md: 1 },
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  projectTag: {
    bgcolor: "rgba(28,219,47,0.08)",
    color: "rgba(239,255,236,0.94)",
    border: "1px solid rgba(141,255,116,0.24)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
    mb: 0,
    height: { xs: 30, md: 32 },
    "& .MuiChip-label": {
      px: { xs: 1.25, md: 1.5 },
      fontSize: { xs: "0.82rem", md: "0.88rem" },
      lineHeight: 1.2,
    },
  },
  projectActions: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    borderRadius: "50px",
    py: { xs: 1.18, md: 1.5 },
    px: { xs: 3.15, md: 4 },
    fontSize: { xs: "0.92rem", md: "1rem" },
    textTransform: "none",
    fontWeight: 800,
    minHeight: { xs: 46, md: 56 },
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  liveBtn: {
    background:
      "linear-gradient(135deg, #F3FFF0 0%, #CFFAC9 25%, #79EE70 58%, #1CDB2F 100%)",
    color: "#173626",
    "&:hover": {
      background:
        "linear-gradient(135deg, #F4F8F1 0%, #D8E4D0 25%, #A9C39E 58%, #7BA27A 100%)",
    },
  },
  privateBtn: {
    bgcolor: "rgba(28,219,47,0.22)",
    color: "#E7FFE3",
    border: "1px solid rgba(141,255,116,0.28)",
    boxShadow: "0 0 0 1px rgba(141,255,116,0.05), 0 6px 16px rgba(4,18,7,0.16)",
    "&.Mui-disabled": {
      opacity: 1,
      bgcolor: "rgba(28,219,47,0.22)",
      color: "#E7FFE3",
      border: "1px solid rgba(141,255,116,0.28)",
      boxShadow: "0 0 0 1px rgba(141,255,116,0.05), 0 6px 16px rgba(4,18,7,0.16)",
    },
  },
} as const;
