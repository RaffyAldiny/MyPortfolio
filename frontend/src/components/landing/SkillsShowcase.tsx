//src/components/SkillShowcase.tsx
"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { SKILLS, type Skill } from "@/constants/skills";

/**
 * ANIMATION: Text Shimmer
 * A very slow, linear pan of the gradient inside the text.
 */
const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

/**
 * ANIMATION: Prism Shimmer
 * Rotates the gradient on the border of the pills
 */
const prismShimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/**
 * SUB-COMPONENT: SkillPill
 */
function SkillPill({ name, color, textColor, icon }: Skill) {
  // Use a softer slate color (matches the Profile Bio) instead of harsh black
  const fg = textColor ?? "#2D2D3A";

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        // RETAINED SHAPE:
        px: 1.35,
        py: 0.9,
        borderRadius: 2.2,

        // --- NEW FROST EFFECT (Matching ProfileIntro) ---
        // 1. Light translucent background
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        
        // 2. The Blur (Frost)
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",

        // 3. The White Border
        border: "1px solid rgba(255, 255, 255, 0.4)",

        // 4. The Pink/Blue Glow Shadow (Scaled down from ProfileIntro)
        boxShadow: "0 4px 16px rgba(253, 113, 255, 0.15)",

        transition: "transform 200ms ease, box-shadow 200ms ease",

        // THE PRISM OUTLINE
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px", // Thickness of the prism border

          // The Prism Gradient
          background: `linear-gradient(135deg, 
            #FFB3E6, #97F0FF, #D4B3FF, #99FFD6, #FFB3E6
          )`,
          backgroundSize: "300% 300%",
          animation: `${prismShimmer} 4s linear infinite`,

          // Mask Logic to keep center transparent
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",

          pointerEvents: "none",
          opacity: 0.7, // Slightly softer opacity for the light theme
        },

        "&:hover": {
          transform: "translateY(-2px)",
          // Intensified Pink Glow on hover
          boxShadow: `0 8px 24px rgba(253, 113, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.6)`,
        },
      }}
    >
      <Avatar
        variant="rounded"
        src={icon}
        alt={name}
        // Ensures the logo fits nicely inside the box
        imgProps={{ 
            style: { objectFit: "contain", padding: "2px" } 
        }}
        sx={{
          width: 22,
          height: 22,
          borderRadius: 1.2,
          // Lighter background for the icon container
          backgroundColor: "rgba(255,255,255,0.4)",
          border: `1px solid rgba(255,255,255,0.5)`,
          boxShadow: `0 2px 8px ${alpha(color, 0.15)}`,
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

          // 1. High-Voltage Pastel Gradient
          backgroundImage: `linear-gradient(90deg, 
            #ff8ad8 0%,   /* Cotton Candy Pink */
            #81ecff 35%,  /* Electric Pastel Blue */
            #c598ff 65%,  /* Bright Lavender */
            #7dffcb 100%  /* Soft Neon Mint */
          )`,
          backgroundSize: "200% auto",

          // 2. FASTER ANIMATION (3s instead of 8s)
          animation: `${textShimmer} 3s linear infinite`,

          // 3. Clipping
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",

          // 4. Outline & Glow
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
          // INCREASED GAP (1.5 = 12px, vs 0.5 = 4px)
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