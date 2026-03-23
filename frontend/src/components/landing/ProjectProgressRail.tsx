"use client";

import * as React from "react";
import Box from "@mui/material/Box";

type Props = {
  progress: number; // 0..1 (intro + projects)
  activeIndex: number; // 0 = intro, 1..N = project #
  totalSlides: number; // intro + projects
};

const PRISM_GRADIENT =
  "linear-gradient(90deg, #F3FFF0 0%, #CFFAC9 22%, #79EE70 50%, #1CDB2F 78%, #0B5A14 100%)";

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

export default function ProjectProgressRail({ progress, activeIndex, totalSlides }: Props) {
  if (activeIndex === 0) return null;

  const p = clamp01(progress);
  const totalProjects = Math.max(1, totalSlides - 1);
  const dotPos = (i: number) => (totalProjects <= 0 ? 1 : i / totalProjects);

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          left: "50%",
          top: "calc(60px + env(safe-area-inset-top))",
          transform: "translateX(-50%)",
          zIndex: 160,
          pointerEvents: "none",
          width: {
            xs: "min(78vw, 260px)",
            sm: "min(68vw, 320px)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 8,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.1)",
            overflow: "visible",
            boxShadow: "0 0 0 1px rgba(141,255,116,0.12)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: `${p * 100}%`,
              background: "linear-gradient(to right, #CFFAC9, #1CDB2F)",
              borderRadius: 999,
            }}
          />

          {Array.from({ length: totalProjects }).map((_, idx) => {
            const projectIndex = idx + 1;
            const t = dotPos(projectIndex);
            const isActive = projectIndex === activeIndex;

            return (
              <Box
                key={`mobile-${projectIndex}`}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: `${t * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: isActive ? 10 : 7,
                  height: isActive ? 10 : 7,
                  borderRadius: 999,
                  background: isActive ? PRISM_GRADIENT : "rgba(255,255,255,0.35)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.35)"
                    : "1px solid rgba(255,255,255,0.2)",
                  boxShadow: isActive ? "0 0 0 4px rgba(28,219,47,0.16)" : "none",
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          right: { md: 56, lg: 72 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 160,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 10,
            height: 220,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.1)",
            overflow: "visible",
            boxShadow: "0 0 0 1px rgba(141,255,116,0.12)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: `${p * 100}%`,
              background: "linear-gradient(to bottom, #CFFAC9, #1CDB2F)",
              borderRadius: 999,
            }}
          />

          {Array.from({ length: totalProjects }).map((_, idx) => {
            const projectIndex = idx + 1;
            const t = dotPos(projectIndex);
            const isActive = projectIndex === activeIndex;

            return (
              <Box
                key={`desktop-${projectIndex}`}
                sx={{
                  position: "absolute",
                  top: `${t * 100}%`,
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  borderRadius: 999,
                  background: isActive ? PRISM_GRADIENT : "rgba(255,255,255,0.35)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.35)"
                    : "1px solid rgba(255,255,255,0.2)",
                  boxShadow: isActive ? "0 0 0 4px rgba(28,219,47,0.16)" : "none",
                }}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}
