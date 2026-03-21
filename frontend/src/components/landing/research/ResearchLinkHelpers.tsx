"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import {
  DARK_GREEN,
  TOOLTIP_BG,
  TOOLTIP_FG,
} from "@/components/landing/research/researchSpotlight.styles";

export function HoverLinkTooltip({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) {
  return (
    <Tooltip
      title={title}
      arrow
      enterDelay={120}
      leaveDelay={80}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: TOOLTIP_BG,
            color: TOOLTIP_FG,
            border: `1px solid ${alpha("#1CDB2F", 0.34)}`,
            boxShadow: `0 8px 18px ${alpha("#1CDB2F", 0.12)}`,
            fontSize: "0.74rem",
            fontWeight: 700,
            px: 1.15,
            py: 0.8,
            borderRadius: 1.5,
          },
        },
        arrow: {
          sx: {
            color: TOOLTIP_BG,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

export function ReferenceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <HoverLinkTooltip title={href}>
      <Box
        component="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        sx={{
          color: "inherit",
          textDecorationLine: "underline",
          textDecorationColor: alpha("#1CDB2F", 0.92),
          textDecorationThickness: "2px",
          textUnderlineOffset: "0.26em",
          transition:
            "color 160ms ease, text-decoration-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
          borderRadius: 0.5,
          "&:hover": {
            color: DARK_GREEN,
            textDecorationColor: "#1CDB2F",
            backgroundColor: alpha("#1CDB2F", 0.08),
            boxShadow: `0 2px 0 ${alpha("#1CDB2F", 0.12)}`,
          },
        }}
      >
        {children}
      </Box>
    </HoverLinkTooltip>
  );
}
