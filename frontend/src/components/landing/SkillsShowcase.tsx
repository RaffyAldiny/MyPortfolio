"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
// We import from the constants folder now
import { SKILLS, type Skill } from "@/constants/skills";

/**
 * UTILITIES
 * These are logic helpers for the UI, kept here as they are UI-specific.
 */
const bf = (blur: number, sat: number, con: number, bri: number) =>
  `blur(${blur}px) saturate(${sat}%) contrast(${con}) brightness(${bri})`;

const PILL_BF = bf(4, 340, 1.6, 1.02);

const initials = (name: string) => {
  const p = name.split(" ").filter(Boolean);
  return p.length === 1 ? p[0].slice(0, 2).toUpperCase() : (p[0][0] + p[1][0]).toUpperCase();
};

/**
 * SUB-COMPONENT: SkillPill
 * The individual visual item for a skill.
 */
function SkillPill({ name, color, textColor, icon }: Skill) {
  const fg = textColor ?? "#0B0B10";

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
        overflow: "hidden",
        backgroundColor: "rgba(10, 12, 18, 0.025)",
        border: `1px solid ${alpha("#fff", 0.32)}`,
        backdropFilter: PILL_BF,
        WebkitBackdropFilter: PILL_BF,
        boxShadow: `0 12px 26px ${alpha("#000", 0.10)}, inset 0 1px 0 ${alpha("#fff", 0.28)}`,
        transition: "transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: alpha(color, 0.50),
          boxShadow: `0 16px 34px ${alpha(color, 0.14)}, 0 12px 24px ${alpha("#000", 0.08)}, inset 0 1px 0 ${alpha(
            "#fff",
            0.32
          )}`,
        },
      }}
    >
      <Avatar
        variant="rounded"
        src={icon}
        alt={name}
        sx={{
          width: 22,
          height: 22,
          borderRadius: 1.2,
          fontSize: 11,
          fontWeight: 950,
          color: fg,
          backgroundColor: "rgba(255,255,255,0.10)",
          border: `1px solid ${alpha("#fff", 0.30)}`,
          backdropFilter: PILL_BF,
          WebkitBackdropFilter: PILL_BF,
          boxShadow: `0 10px 18px ${alpha(color, 0.10)}, inset 0 1px 0 ${alpha("#fff", 0.22)}`,
        }}
      >
        {initials(name)}
      </Avatar>

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
      <Typography sx={{ fontWeight: 950, letterSpacing: -0.4 }}>{title}</Typography>
      <Typography sx={{ mt: 0.6, opacity: 0.82, fontSize: 14 }}>{subtitle}</Typography>

      <Box
        sx={{
          mt: 4,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.2,
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