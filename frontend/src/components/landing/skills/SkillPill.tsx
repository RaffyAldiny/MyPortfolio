"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Skill } from "@/constants/skills";
import { createSkillHopKeyframes, getSkillHopMotion } from "./skillShowcase.shared";

type Props = {
  skill: Skill;
  animate: boolean;
  index: number;
  totalCount: number;
};

const SkillPill = React.memo(function SkillPill({ skill, animate, index, totalCount }: Props) {
  const { name, icon, textColor } = skill;
  const motion = React.useMemo(
    () => getSkillHopMotion(index, totalCount),
    [index, totalCount]
  );
  const hopKeyframes = React.useMemo(
    () => createSkillHopKeyframes(motion.distancePx, motion.durationSeconds),
    [motion.distancePx, motion.durationSeconds]
  );

  return (
    <Box
        sx={{
          display: "inline-flex",
          borderRadius: { xs: 2.5, sm: 3 },
          transition: "transform 180ms ease, border-color 180ms ease",
          willChange: "transform, opacity",
          maxWidth: "100%",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
      data-skill-pill
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: { xs: 0.72, sm: 1.35 },
          px: { xs: 0.98, sm: 2 },
          py: { xs: 0.62, sm: 1.15 },
          borderRadius: { xs: 2.5, sm: 3 },
          position: "relative",
          backgroundColor: "rgba(249, 252, 247, 0.62)",
          backdropFilter: "blur(6px)",
          border: "1.5px solid rgba(28, 219, 47, 0.52)",
          boxShadow: "none",
          transition: "border-color 180ms ease",
          willChange: "transform",
          animation: animate
            ? `${hopKeyframes} ${motion.durationSeconds}s cubic-bezier(0.22, 0.9, 0.3, 1) ${motion.delaySeconds}s infinite`
            : "none",
          "&:hover": {
            borderColor: alpha("#1CDB2F", 0.74),
          },
        }}
      >
        <Avatar
          src={icon}
          alt={name}
          variant="rounded"
          sx={{
            width: { xs: 16, sm: 26 },
            height: { xs: 16, sm: 26 },
            bgcolor: "rgba(249,252,247,0.86)",
            p: { xs: 0.3, sm: 0.45 },
            borderRadius: 1,
            flexShrink: 0,
          }}
          imgProps={{ style: { objectFit: "contain" } }}
        />
        <Typography
          sx={{
            fontSize: { xs: 9.5, sm: 13 },
            fontWeight: 900,
            letterSpacing: { xs: 0.2, sm: 0.4 },
            textTransform: "uppercase",
            color: textColor ?? "#2D2D3A",
            lineHeight: 1.15,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
});

export default SkillPill;
