"use client";

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { alpha } from "@mui/material/styles";
import { GROUP_OPTIONS, INK, type GroupKey } from "./skillShowcase.shared";

type Props = {
  active: GroupKey;
  onChange: (value: GroupKey) => void;
};

export default function SkillGroupFilter({ active, onChange }: Props) {
  return (
    <ToggleButtonGroup
      exclusive
      value={active}
      onChange={(_, value) => value && onChange(value)}
      sx={{
        position: "relative",
        borderRadius: { xs: 3, sm: 999 },
        p: { xs: 0.42, sm: 0.5 },
        backgroundColor: "rgba(249,252,247,0.56)",
        border: "1.5px solid rgba(28,219,47,0.32)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexWrap: "nowrap",
        gap: { xs: 0.28, sm: 0.5 },
        minWidth: "max-content",
        "& .MuiToggleButton-root": {
          border: 0,
          borderRadius: { xs: 2.5, sm: 999 },
          textTransform: "uppercase",
          fontWeight: 900,
          letterSpacing: { xs: 0.3, sm: 0.8 },
          fontSize: { xs: 10, sm: 11.5 },
          px: { xs: 1.35, sm: 2.5 },
          py: { xs: 0.92, sm: 0.95 },
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
          border: "1.5px solid rgba(28,219,47,0.34)",
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
