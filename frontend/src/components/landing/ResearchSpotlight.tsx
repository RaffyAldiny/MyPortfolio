"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { alpha, keyframes } from "@mui/material/styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const ARTICLE_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/view/1126";
const PDF_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/download/1126/1088/1867";
const PRISM_GRADIENT =
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #E0C3FC 50%, #8EC5FC 75%, #D4FFEC 100%)";
const METRIC_PRISM =
  "linear-gradient(90deg, #FF6FA8 0%, #FF93CF 18%, #C08CFF 40%, #73B5FF 66%, #83E8FF 84%, #8CFFD8 100%)";

const prismDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const metricGlow = keyframes`
  0% {
    filter: saturate(1.08) brightness(1);
  }
  50% {
    filter: saturate(1.35) brightness(1.08);
  }
  100% {
    filter: saturate(1.08) brightness(1);
  }
`;

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
      "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
    opacity: 0.2,
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    borderRadius: { xs: 4, md: 6 },
    overflow: "hidden",
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${PRISM_GRADIENT} border-box`,
    border: "1px solid transparent",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
  },
  panel: {
    p: { xs: 3, md: 5 },
    display: "grid",
    gap: { xs: 3, md: 4 },
    gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.3fr) minmax(280px, 0.7fr)" },
  },
  paperTitle: {
    fontWeight: 800,
    letterSpacing: "-0.015em",
    fontSize: { xs: "1.32rem", md: "2.1rem" },
    lineHeight: 1.28,
    color: "#111111",
    textAlign: "justify",
    textJustify: "inter-word",
    maxWidth: 720,
  },
  authors: {
    mt: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 0.75,
    rowGap: 0.45,
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.6,
    color: "#111111",
    maxWidth: 720,
  },
  byPrefix: {
    color: "#111111",
    fontWeight: 500,
  },
  authorGroup: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.45,
    flexWrap: "nowrap",
  },
  authorName: {
    color: "#111111",
    fontWeight: 500,
  },
  authorSup: {
    ml: 0.1,
    fontSize: "0.72em",
    lineHeight: 1,
    verticalAlign: "super",
    color: "#111111",
    fontWeight: 600,
  },
  authorIconLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4C6898",
    textDecoration: "none",
    transition: "color 160ms ease, transform 160ms ease",
    "& .MuiSvgIcon-root": {
      fontSize: "0.95rem",
    },
    "&:hover": {
      color: "#111111",
      transform: "translateY(-1px)",
    },
  },
  authorSeparator: {
    color: "#111111",
  },
  summary: {
    color: alpha("#162235", 0.82),
    fontSize: { xs: "0.96rem", md: "1.06rem" },
    lineHeight: 1.85,
    textAlign: "justify",
    textJustify: "inter-word",
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
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${PRISM_GRADIENT} border-box`,
    border: "1px solid transparent",
    boxShadow: `0 12px 28px ${alpha("#875FC8", 0.12)}, 0 4px 12px ${alpha("#295D98", 0.08)}`,
  },
  metricValue: {
    fontWeight: 900,
    letterSpacing: "-0.03em",
    fontSize: { xs: "1.4rem", md: "1.8rem" },
    background: METRIC_PRISM,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% 200%",
    WebkitTextStroke: `0.35px ${alpha("#355077", 0.2)}`,
    animation: `${prismDrift} 5s ease-in-out infinite, ${metricGlow} 2.8s ease-in-out infinite`,
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
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${PRISM_GRADIENT} border-box`,
    border: "1px solid transparent",
    boxShadow: `inset 0 1px 0 ${alpha("#FFFFFF", 0.9)}, 0 18px 40px rgba(15, 23, 42, 0.06)`,
    color: "#1C2A3D",
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
    background: PRISM_GRADIENT,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  journalTitle: {
    fontWeight: 700,
    lineHeight: 1.8,
    color: "#213A63",
    textShadow: `0 1px 0 ${alpha("#FFFFFF", 0.9)}`,
  },
  sideText: {
    fontWeight: 600,
    lineHeight: 1.8,
    color: alpha("#21304A", 0.84),
  },
  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  chip: {
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${PRISM_GRADIENT} border-box`,
    bgcolor: "#FFFFFF",
    color: "#31445F",
    border: "1px solid transparent",
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    gap: 1.5,
    flexWrap: { xs: "wrap", md: "nowrap" },
    alignItems: "center",
  },
  primaryBtn: {
    position: "relative",
    borderRadius: 999,
    px: 2.1,
    py: 1,
    textTransform: "none",
    fontWeight: 800,
    fontSize: "0.88rem",
    whiteSpace: "nowrap",
    minWidth: "auto",
    color: "#11314A",
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${PRISM_GRADIENT} border-box`,
    border: "1.5px solid transparent",
    boxShadow: "0 8px 24px rgba(142, 197, 252, 0.18)",
    "& .MuiButton-endIcon": {
      ml: 0.6,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
    "&:hover": {
      background:
        `linear-gradient(${alpha("#FFFFFF", 0.94)}, ${alpha(
          "#FFFFFF",
          0.94
        )}) padding-box, ${PRISM_GRADIENT} border-box`,
      boxShadow: "0 10px 28px rgba(142, 197, 252, 0.24)",
    },
  },
  secondaryBtn: {
    borderRadius: 999,
    px: 2.1,
    py: 1,
    textTransform: "none",
    fontWeight: 800,
    fontSize: "0.88rem",
    whiteSpace: "nowrap",
    minWidth: "auto",
    color: "#31445F",
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${PRISM_GRADIENT} border-box`,
    border: "1.5px solid transparent",
    "& .MuiButton-startIcon": {
      mr: 0.6,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
    "&:hover": {
      background:
        `linear-gradient(${alpha("#FFFFFF", 0.94)}, ${alpha(
          "#FFFFFF",
          0.94
        )}) padding-box, ${PRISM_GRADIENT} border-box`,
      bgcolor: "transparent",
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
            <Typography sx={SX.paperTitle} data-research-reveal>
              Enhancement of Deepfake Detection Framework Integrating EfficientNet-B0,
              Graph Attention Networks, and Gated Recurrent Units
            </Typography>

            <Box sx={SX.authors} data-research-reveal>
              <Typography component="span" sx={SX.byPrefix}>
                by
              </Typography>

              <Box sx={SX.authorGroup}>
                <Typography component="span" sx={SX.authorName}>
                  Rafael Alden F. Agoncillo
                  <Box component="span" sx={SX.authorSup}>
                    1
                  </Box>
                </Typography>
                <Box
                  component="a"
                  href="mailto:rafaelagoncillo@gmail.com"
                  sx={SX.authorIconLink}
                  aria-label="Email Rafael Alden F. Agoncillo"
                >
                  <MailOutlineIcon />
                </Box>
                <Box
                  component="a"
                  href="https://github.com/RaffyAldiny"
                  target="_blank"
                  rel="noreferrer"
                  sx={SX.authorIconLink}
                  aria-label="GitHub profile of Rafael Alden F. Agoncillo"
                >
                  <GitHubIcon />
                </Box>
              </Box>

              <Typography component="span" sx={SX.authorSeparator}>
                ,
              </Typography>

              <Box sx={SX.authorGroup}>
                <Typography component="span" sx={SX.authorName}>
                  James Kenneth M. Kiunisala
                  <Box component="span" sx={SX.authorSup}>
                    2
                  </Box>
                </Typography>
                <Box
                  component="a"
                  href="https://github.com/b0kja85"
                  target="_blank"
                  rel="noreferrer"
                  sx={SX.authorIconLink}
                  aria-label="GitHub profile of James Kenneth M. Kiunisala"
                >
                  <GitHubIcon />
                </Box>
              </Box>
            </Box>

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
                  <Typography className="research-metric-value" sx={SX.metricValue}>
                    {metric.value}
                  </Typography>
                  <Typography sx={SX.metricLabel}>{metric.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={SX.sideCard} data-research-reveal>
            <Box>
              <Typography sx={SX.sideLabel}>Journal</Typography>
              <Typography sx={{ ...SX.journalTitle, mt: 1 }}>
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
