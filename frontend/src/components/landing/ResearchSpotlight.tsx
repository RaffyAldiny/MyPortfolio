"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { alpha } from "@mui/material/styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const ARTICLE_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/view/1126";
const PDF_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/download/1126/1088/1867";

const BADGES = [
  "EfficientNet-B0",
  "GAT",
  "GRU",
  "Celeb-DF v2",
  "Deepfake Detection",
] as const;

const METRICS = [
  { label: "Accuracy", value: "80.60%" },
  { label: "Loss", value: "0.28" },
  { label: "Published", value: "Dec 22, 2024" },
] as const;

const SX = {
  section: {
    width: "100%",
    minHeight: { xs: "auto", md: "88vh" },
    position: "relative",
    display: "flex",
    alignItems: "center",
    py: { xs: 6, md: 10 },
  },
  aura: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(760px 380px at 18% 18%, rgba(130, 192, 255, 0.16), transparent 70%), radial-gradient(720px 360px at 82% 80%, rgba(255, 189, 108, 0.14), transparent 72%), linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
    opacity: 0.95,
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    borderRadius: { xs: 4, md: 6 },
    overflow: "hidden",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.84), rgba(245,249,255,0.62))",
    border: "1px solid rgba(255,255,255,0.55)",
    boxShadow: "0 24px 70px rgba(72, 101, 145, 0.16)",
    backdropFilter: "blur(18px)",
  },
  panel: {
    p: { xs: 3, md: 5 },
    display: "grid",
    gap: { xs: 3, md: 4 },
    gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.3fr) minmax(280px, 0.7fr)" },
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#4C6898",
  },
  title: {
    mt: 1,
    fontWeight: 900,
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    fontSize: { xs: "2.5rem", md: "4.4rem" },
    color: "#18202B",
  },
  paperTitle: {
    fontWeight: 700,
    fontSize: { xs: "1rem", md: "1.15rem" },
    lineHeight: 1.65,
    color: "#31445F",
    maxWidth: 760,
  },
  summary: {
    color: alpha("#162235", 0.82),
    fontSize: { xs: "0.96rem", md: "1.06rem" },
    lineHeight: 1.85,
    maxWidth: 760,
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
    gap: 1.5,
  },
  metricCard: {
    p: 2,
    borderRadius: 3,
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(130,160,210,0.18)",
  },
  metricValue: {
    fontWeight: 900,
    letterSpacing: "-0.03em",
    fontSize: { xs: "1.4rem", md: "1.8rem" },
    color: "#18202B",
  },
  metricLabel: {
    mt: 0.5,
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: alpha("#21304A", 0.62),
  },
  sideCard: {
    alignSelf: "stretch",
    borderRadius: 4,
    p: { xs: 3, md: 4 },
    background:
      "linear-gradient(180deg, rgba(24,32,43,0.98), rgba(34,53,80,0.94))",
    color: "#F5F8FF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 3,
    minHeight: { xs: "auto", lg: 420 },
  },
  sideLabel: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: alpha("#F5F8FF", 0.72),
  },
  sideText: {
    fontWeight: 600,
    lineHeight: 1.8,
    color: alpha("#F5F8FF", 0.86),
  },
  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  chip: {
    bgcolor: "rgba(255,255,255,0.08)",
    color: "#F5F8FF",
    border: "1px solid rgba(255,255,255,0.14)",
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    gap: 1.5,
    flexWrap: "wrap",
  },
  primaryBtn: {
    borderRadius: 999,
    px: 3,
    py: 1.2,
    textTransform: "none",
    fontWeight: 800,
    color: "#0F1825",
    bgcolor: "#FFFFFF",
    "&:hover": { bgcolor: "#E8EEF7" },
  },
  secondaryBtn: {
    borderRadius: 999,
    px: 3,
    py: 1.2,
    textTransform: "none",
    fontWeight: 800,
    color: "#F5F8FF",
    borderColor: "rgba(255,255,255,0.28)",
    "&:hover": {
      borderColor: "rgba(255,255,255,0.4)",
      bgcolor: "rgba(255,255,255,0.08)",
    },
  },
} as const;

export default function ResearchSpotlight() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveal = gsap.utils.toArray<HTMLElement>("[data-research-reveal]");

      gsap.set(reveal, { autoAlpha: 0, y: 24 });
      gsap.to(reveal, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-research-card]",
        { y: 24, rotateX: 2 },
        {
          y: -18,
          rotateX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Box ref={rootRef} sx={SX.section}>
      <Box sx={SX.aura} />

      <Box sx={SX.card} data-research-card>
        <Box sx={SX.panel}>
          <Box>
            <Typography sx={SX.eyebrow} data-research-reveal>
              Published Research
            </Typography>

            <Typography sx={SX.title} data-research-reveal>
              Thesis Study
            </Typography>

            <Typography sx={SX.paperTitle} data-research-reveal>
              Enhancement of Deepfake Detection Framework Integrating EfficientNet-B0,
              Graph Attention Networks, and Gated Recurrent Units
            </Typography>

            <Typography sx={{ ...SX.summary, mt: 2 }} data-research-reveal>
              My published thesis study proposes a deepfake detection framework that
              combines EfficientNet-B0 for feature extraction, Graph Attention Networks
              for spatial relationships, and GRU layers for temporal analysis. The paper
              reports 80.60% accuracy with 0.28 loss on Celeb-DF v2, outperforming
              several common baselines.
            </Typography>

            <Box sx={{ ...SX.metricGrid, mt: 3 }} data-research-reveal>
              {METRICS.map((metric) => (
                <Box key={metric.label} sx={SX.metricCard}>
                  <Typography sx={SX.metricValue}>{metric.value}</Typography>
                  <Typography sx={SX.metricLabel}>{metric.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={SX.sideCard} data-research-reveal>
            <Box>
              <Typography sx={SX.sideLabel}>Journal</Typography>
              <Typography sx={{ ...SX.sideText, mt: 1 }}>
                International Journal of Progressive Research in Science and Engineering
              </Typography>

              <Typography sx={{ ...SX.sideLabel, mt: 3 }}>Focus</Typography>
              <Typography sx={{ ...SX.sideText, mt: 1 }}>
                Media integrity, manipulated-content detection, and stronger
                spatiotemporal modeling for deepfake analysis.
              </Typography>

              <Box sx={{ ...SX.chipWrap, mt: 3 }}>
                {BADGES.map((badge) => (
                  <Chip key={badge} label={badge} size="small" sx={SX.chip} />
                ))}
              </Box>
            </Box>

            <Stack spacing={1.5}>
              <Typography sx={SX.sideLabel}>Access</Typography>

              <Box sx={SX.actions}>
                <Button
                  href={ARTICLE_URL}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<ArrowOutwardIcon />}
                  sx={SX.primaryBtn}
                >
                  View Article
                </Button>

                <Button
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<DescriptionOutlinedIcon />}
                  sx={SX.secondaryBtn}
                >
                  Download PDF
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
