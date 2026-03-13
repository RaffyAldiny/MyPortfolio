"use client";

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { alpha } from "@mui/material/styles";
import { GROUP_OPTIONS, INK, PRISM_GRADIENT, prismRotate, type GroupKey } from "./skillShowcase.shared";

type Props = {
  active: GroupKey;
  reducedMotion: boolean;
  onChange: (value: GroupKey) => void;
};

export default function SkillGroupFilter({ active, reducedMotion, onChange }: Props) {
  return (
    <ToggleButtonGroup
      exclusive
      value={active}
      onChange={(_, value) => value && onChange(value)}
      sx={{
        position: "relative",
        borderRadius: { xs: 3, sm: 999 },
        p: 0.5,
        backgroundColor: "rgba(249,252,247,0.56)",
        border: "1px solid rgba(28,219,47,0.16)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexWrap: "nowrap",
        gap: 0.5,
        minWidth: "max-content",
        "& .MuiToggleButton-root": {
          border: 0,
          borderRadius: { xs: 2.5, sm: 999 },
          textTransform: "uppercase",
          fontWeight: 900,
          letterSpacing: 0.8,
          fontSize: { xs: 11.25, sm: 11.5 },
          px: { xs: 2.15, sm: 2.5 },
          py: { xs: 1.05, sm: 0.95 },
          color: alpha(INK, 0.6),
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
          "&:active": { transform: "scale(0.96)" },
        },
        "& .MuiToggleButton-root.Mui-selected": {
          backgroundColor: "rgba(250,255,248,0.94)",
          color: INK,
          boxShadow: "0 4px 12px rgba(111,155,111,0.12)",
          position: "relative",
        },
        "& .MuiToggleButton-root.Mui-selected::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px",
          background: PRISM_GRADIENT,
          backgroundSize: "200% 200%",
          animation: reducedMotion ? "none" : `${prismRotate} 4s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
      }}
    >
      {GROUP_OPTIONS.map((group) => (
        <ToggleButton key={group.value} value={group.value}>
          {group.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
