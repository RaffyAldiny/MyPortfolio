"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const ZONES = [
  { id: "zone-intro", label: "Intro" },
  { id: "projects", label: "Projects" },
  { id: "zone-footer", label: "Footer" },
];

export default function ZoneTimeline() {
  const [active, setActive] = React.useState<string>("zone-intro");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    ZONES.forEach((z) => {
      const el = document.getElementById(z.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: 12, md: 28 },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 120,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {ZONES.map((z) => {
        const isActive = active === z.id;

        return (
          <Box key={z.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* dot */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: isActive ? "#FF9A9E" : "rgba(255,255,255,0.35)",
                boxShadow: isActive
                  ? "0 0 12px rgba(255,154,158,0.8)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            />

            {/* label */}
            <Typography
              sx={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: isActive
                  ? "#fff"
                  : alpha("#fff", 0.45),
                fontWeight: 700,
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {z.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
