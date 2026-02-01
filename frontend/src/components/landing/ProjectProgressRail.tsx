"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  progress: number;       // 0..1 (intro + projects)
  activeIndex: number;    // 0 = intro, 1..N = project #
  totalSlides: number;    // intro + projects
};

const PRISM_GRADIENT =
  "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

export default function ProjectProgressRail({ progress, activeIndex, totalSlides }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ never show during intro slide
  if (activeIndex === 0) return null;

  const p = clamp01(progress);

  const totalProjects = Math.max(1, totalSlides - 1); // intro excluded
  const labelDesktop = `PROJECT ${String(activeIndex).padStart(2, "0")} / ${String(totalProjects).padStart(2, "0")}`;
  const labelMobile = `P ${String(activeIndex).padStart(2, "0")}/${String(totalProjects).padStart(2, "0")}`;

  /* --- Desktop (vertical) --- */
  const railH = 200;
  const railW = 9;
  const dot = 7;
  const dotActive = 11;

  /* --- Mobile (horizontal, top centered) --- */
  const railWm = 200;
  const railHm = 7;
  const dotm = 5;
  const dotActivem = 8;

  const wrapperSx = isMobile
    ? {
        position: "fixed" as const,
        left: "50%",
        top: "calc(60px + env(safe-area-inset-top))",
        transform: "translateX(-50%)",
        zIndex: 160,
        pointerEvents: "none" as const,
      }
    : {
        position: "fixed" as const,
        right: 28,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 140,
        pointerEvents: "none" as const,
      };

  // Dot positions must match the progress scale:
  // progress steps: intro=0, project1=1/totalProjects, project2=2/totalProjects ... projectN=1
  // so dots must be at i/totalProjects, i=1..totalProjects
  const dotPos = (i: number) => (totalProjects <= 0 ? 1 : i / totalProjects);

  return (
    <Box sx={wrapperSx}>
      {/* Badge */}
      <Box
        sx={{
          mb: isMobile ? 0.7 : 1.2,
          px: isMobile ? 0.9 : 1.15,
          py: isMobile ? 0.4 : 0.65,
          borderRadius: 999,
          bgcolor: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.14)",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? 9.5 : 10.5,
            fontWeight: 900,
            letterSpacing: isMobile ? 1 : 1.8,
            textTransform: "uppercase",
            background: PRISM_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "nowrap",
          }}
        >
          {isMobile ? labelMobile : labelDesktop}
        </Typography>
      </Box>

      {/* Rail */}
      {isMobile ? (
        // ================= MOBILE: HORIZONTAL =================
        <Box
          sx={{
            position: "relative",
            width: railWm,
            height: railHm,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.10)",
            overflow: "hidden",
          }}
        >
          {/* Fill (LEFT -> RIGHT) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: `${p * 100}%`,
              background: "linear-gradient(to right, #FF9A9E, #A18CD1)",
              borderRadius: 999,
            }}
          />

          {/* Dots at i/totalProjects */}
          {Array.from({ length: totalProjects }).map((_, idx) => {
            const projectIndex = idx + 1; // 1..N
            const t = dotPos(projectIndex);
            const isActive = projectIndex === activeIndex;

            return (
              <Box
                key={projectIndex}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: `${t * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: isActive ? dotActivem : dotm,
                  height: isActive ? dotActivem : dotm,
                  borderRadius: 999,
                  background: isActive ? PRISM_GRADIENT : "rgba(255,255,255,0.35)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.35)"
                    : "1px solid rgba(255,255,255,0.20)",
                  boxShadow: isActive ? "0 0 0 4px rgba(224,195,252,0.14)" : "none",
                }}
              />
            );
          })}
        </Box>
      ) : (
        // ================= DESKTOP: VERTICAL =================
        <Box
          sx={{
            position: "relative",
            height: railH,
            width: railW,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.10)",
            overflow: "hidden",
          }}
        >
          {/* Fill (TOP -> DOWN) */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: `${p * 100}%`,
              background: "linear-gradient(to bottom, #FF9A9E, #A18CD1)",
              borderRadius: 999,
            }}
          />

          {/* Dots at i/totalProjects */}
          {Array.from({ length: totalProjects }).map((_, idx) => {
            const projectIndex = idx + 1; // 1..N
            const t = dotPos(projectIndex);
            const isActive = projectIndex === activeIndex;

            return (
              <Box
                key={projectIndex}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: `${t * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: isActive ? dotActive : dot,
                  height: isActive ? dotActive : dot,
                  borderRadius: 999,
                  background: isActive ? PRISM_GRADIENT : "rgba(255,255,255,0.35)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.35)"
                    : "1px solid rgba(255,255,255,0.20)",
                  boxShadow: isActive ? "0 0 0 4px rgba(224,195,252,0.14)" : "none",
                }}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
