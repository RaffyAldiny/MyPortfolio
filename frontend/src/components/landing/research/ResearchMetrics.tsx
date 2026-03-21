"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SX } from "@/components/landing/research/researchSpotlight.styles";

const METRICS = [
  { label: "Accuracy", value: "80.60%" },
  { label: "Loss", value: "0.28" },
  { label: "Published", value: "Dec 22, 2024" },
] as const;

export default function ResearchMetrics() {
  return (
    <Box sx={{ ...SX.metricGrid, mt: 3 }} data-research-reveal>
      {METRICS.map((metric) => (
        <Box key={metric.label} sx={SX.metricCard}>
          <Typography className="research-metric-value" sx={SX.metricValue}>
            {metric.value}
          </Typography>
          <Typography sx={SX.metricLabel}>{metric.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
