"use client";

import * as React from "react";
import { Box } from "@mui/material";

type PrismDividerProps = {
  width?: string | number;
  height?: number;
};

export default function PrismDivider({
  width = "64%",
  height = 2,
}: PrismDividerProps) {
  const prism = `
    linear-gradient(
      90deg,
      rgba(255, 160, 170, 0) 0%,
      rgba(255, 160, 170, 0.55) 14%,
      rgba(255, 215, 165, 0.55) 28%,
      rgba(190, 240, 215, 0.55) 42%,
      rgba(180, 220, 255, 0.55) 58%,
      rgba(200, 190, 255, 0.55) 72%,
      rgba(255, 170, 215, 0.55) 86%,
      rgba(255, 170, 215, 0) 100%
    )
  `;

  return (
    <Box
      sx={{
        width,
        mx: "auto",
        my: 3.5,
        position: "relative",
        height: height + 14,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          left: "-6%",
          right: "-6%",
          top: "50%",
          transform: "translateY(-50%)",
          height: height * 8,
          borderRadius: 999,
          background: prism,
          filter: "blur(18px)",
          opacity: 0.28,
          pointerEvents: "none",
        }}
      />

      {/* Prism line */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height,
          borderRadius: 999,
          background: prism,

          // glass highlight
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))",
            pointerEvents: "none",
          },
        }}
      />
    </Box>
  );
}
