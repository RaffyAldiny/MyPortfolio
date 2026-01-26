// src/components/SkillShowcase.tsx
"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { SKILLS, type Skill } from "@/constants/skills";

/**
 * ANIMATION: Text Shimmer
 */
const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

/**
 * ANIMATION: Brand Prism Shimmer
 */
const prismShimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/**
 * Color helpers (hex <-> hsl) so we can build a "glass brand gradient"
 */
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const to2 = (v: number) => v.toString(16).padStart(2, "0");
  return `#${to2(clamp(Math.round(r), 0, 255))}${to2(clamp(Math.round(g), 0, 255))}${to2(
    clamp(Math.round(b), 0, 255)
  )}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));

  let r1 = 0,
    g1 = 0,
    b1 = 0;

  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp >= 1 && hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp >= 2 && hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp >= 3 && hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp >= 4 && hp < 5) [r1, g1, b1] = [x, 0, c];
  else if (hp >= 5 && hp < 6) [r1, g1, b1] = [c, 0, x];

  const m = l - c / 2;
  return {
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255,
  };
}

function tweakHex(
  hex: string,
  opts: { hShift?: number; sMul?: number; lShift?: number; minSat?: number } = {}
) {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);

  const h = (hsl.h + (opts.hShift ?? 0) + 360) % 360;
  const s = clamp(hsl.s * (opts.sMul ?? 1), 0, 1);
  const s2 = clamp(Math.max(s, opts.minSat ?? 0), 0, 1);
  const l = clamp(hsl.l + (opts.lShift ?? 0), 0, 1);

  const rgb = hslToRgb(h, s2, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function isNearWhite(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return r > 240 && g > 240 && b > 240;
}

function pickAccent(color: string, textColor?: string) {
  if (isNearWhite(color)) return textColor ?? "#0B0B10";
  return color;
}

function makeBrandGlassBorder(accent: string) {
  // "Glass" look: lighter, slightly hue-shifted versions of the same brand color
  // Keep saturation present even for darker accents.
  const c1 = tweakHex(accent, { lShift: 0.18, sMul: 1.1, minSat: 0.22 });
  const c2 = tweakHex(accent, { hShift: 18, lShift: 0.12, sMul: 1.15, minSat: 0.22 });
  const c3 = tweakHex(accent, { hShift: -18, lShift: 0.08, sMul: 1.1, minSat: 0.22 });
  const c4 = tweakHex(accent, { lShift: 0.04, sMul: 1.0, minSat: 0.22 });

  return `linear-gradient(135deg, ${c1}, ${c2}, ${c4}, ${c3}, ${c1})`;
}

/**
 * SUB-COMPONENT: SkillPill
 */
function SkillPill({ name, color, textColor, icon }: Skill) {
  const fg = textColor ?? "#2D2D3A";
  const accent = pickAccent(color, textColor);
  const brandBorder = makeBrandGlassBorder(accent);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 1.35,
        py: 0.9,
        borderRadius: 2.2,

        // Glass base
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",

        // Soft inner edge, actual "white glass" border
        border: "1px solid rgba(255, 255, 255, 0.38)",

        // Subtle brand-tinted glow (still glassy)
        boxShadow: `0 4px 16px ${alpha(accent, 0.14)}`,

        transition: "transform 200ms ease, box-shadow 200ms ease",

        // Brand prism outline (masked to border only)
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px",

          background: brandBorder,
          backgroundSize: "320% 320%",
          animation: `${prismShimmer} 4s linear infinite`,

          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",

          pointerEvents: "none",

          // Keep it glassy, not neon
          opacity: 0.6,
          filter: "saturate(1.15) brightness(1.05)",
        },

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 10px 26px ${alpha(accent, 0.22)}, inset 0 1px 0 rgba(255,255,255,0.6)`,
        },
      }}
    >
      <Avatar
        variant="rounded"
        src={icon}
        alt={name}
        imgProps={{
          style: { objectFit: "contain", padding: "2px" },
        }}
        sx={{
          width: 22,
          height: 22,
          borderRadius: 1.2,

          backgroundColor: "rgba(255,255,255,0.42)",
          border: `1px solid ${alpha(accent, 0.26)}`,
          boxShadow: `0 2px 10px ${alpha(accent, 0.18)}`,
        }}
      />

      <Typography
        sx={{
          position: "relative",
          zIndex: 1,
          fontSize: 12,
          fontWeight: 950,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: fg,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

/**
 * MAIN COMPONENT: SkillsShowcase
 */
export default function SkillsShowcase({
  title = "Skills",
  subtitle = "Tools and technologies I use across projects",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          letterSpacing: -1.5,
          textTransform: "uppercase",
          display: "inline-block",

          backgroundImage: `linear-gradient(90deg, 
            #ff8ad8 0%,
            #81ecff 35%,
            #c598ff 65%,
            #7dffcb 100%
          )`,
          backgroundSize: "200% auto",
          animation: `${textShimmer} 3s linear infinite`,

          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",

          WebkitTextStroke: "1px rgba(0,0,0,0.12)",
          filter: "drop-shadow(0 0 10px rgba(212, 179, 255, 0.45))",
        }}
      >
        My Tech Stack
      </Typography>

      <Box
        sx={{
          mt: 4,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
          maxWidth: { xs: "92vw", sm: 820 },
          mx: "auto",
        }}
      >
        {SKILLS.map((skill) => (
          <SkillPill key={skill.name} {...skill} />
        ))}
      </Box>
    </Box>
  );
}
