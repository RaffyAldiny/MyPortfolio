"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { alpha } from "@mui/material/styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const ARTICLE_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/view/1126";
const PDF_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/download/1126/1088/1867";
const RESEARCH_QR_SRC = "/images/qr/research-study-QR.svg";
const CELEB_DF_URL = "https://github.com/yuezunli/celeb-deepfakeforensics";
const EFFICIENTNET_B0_URL =
  "https://keras.io/api/applications/efficientnet/efficientnet_models/#efficientnetb0-function";
const GAT_URL = "https://arxiv.org/pdf/1710.10903";
const GRU_URL =
  "https://www.geeksforgeeks.org/machine-learning/gated-recurrent-unit-networks/";
const BORDER_GREEN = alpha("#1CDB2F", 0.46);
const DARK_GREEN = "#115419";
const LABEL_GREEN = "#1CDB2F";
const METRIC_GREEN = "#17B827";
const AUTHOR_ICON_GREEN = "#168922";
const TOOLTIP_BG = "#113416";
const TOOLTIP_FG = "#E7FFE3";

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

function HoverLinkTooltip({
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
            boxShadow: `0 10px 22px ${alpha("#1CDB2F", 0.14)}`,
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

function ReferenceLink({
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
            boxShadow: `0 2px 0 ${alpha("#1CDB2F", 0.14)}`,
          },
        }}
      >
        {children}
      </Box>
    </HoverLinkTooltip>
  );
}

const SX = {
  section: {
    width: "100%",
    minHeight: { xs: "auto", md: "calc(100dvh - 80px)" },
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: { xs: 4, md: 2 },
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
    maxWidth: 1120,
    borderRadius: { xs: 4, md: 6 },
    overflow: "hidden",
    background: "#FFFFFF",
    border: `1px solid ${BORDER_GREEN}`,
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
  },
  panel: {
    p: { xs: 2.25, sm: 3, md: 5 },
    display: "grid",
    gap: { xs: 2.25, sm: 3, md: 4 },
    gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.3fr) minmax(280px, 0.7fr)" },
    alignItems: { xs: "stretch", lg: "center" },
  },
  thesisLabel: {
    fontSize: { xs: "0.72rem", md: "0.78rem" },
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "#0E4E13",
    mb: 1,
    textAlign: "left",
  },
  paperTitle: {
    fontWeight: 800,
    letterSpacing: "-0.015em",
    fontSize: { xs: "1.5rem", md: "1.95rem" },
    lineHeight: { xs: 1.18, md: 1.28 },
    color: "#16391B",
    textAlign: { xs: "left", md: "justify" },
    textJustify: { md: "inter-word" },
    maxWidth: 720,
  },
  authors: {
    mt: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 0.75,
    rowGap: 0.45,
    fontSize: { xs: "0.78rem", md: "0.92rem" },
    lineHeight: { xs: 1.45, md: 1.52 },
    color: "#111111",
    maxWidth: 720,
  },
  byPrefix: {
    color: "#111111",
    fontWeight: 500,
    fontSize: { xs: "0.78rem", md: "0.92rem" },
  },
  authorGroup: {
    display: "inline-flex",
    alignItems: "center",
    gap: { xs: 0.7, md: 0.45 },
    flexWrap: "nowrap",
  },
  authorName: {
    color: "#111111",
    fontWeight: 500,
    fontSize: { xs: "0.78rem", md: "0.92rem" },
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
    color: AUTHOR_ICON_GREEN,
    textDecoration: "none",
    transition: "color 160ms ease, transform 160ms ease",
    "& .MuiSvgIcon-root": {
      fontSize: { xs: "0.82rem", md: "0.88rem" },
    },
    "&:hover": {
      color: DARK_GREEN,
      transform: "translateY(-1px)",
    },
  },
  authorSeparator: {
    color: "#111111",
  },
  summary: {
    color: alpha("#243226", 0.82),
    fontSize: { xs: "0.88rem", md: "0.98rem" },
    lineHeight: { xs: 1.64, md: 1.76 },
    textAlign: { xs: "left", md: "justify" },
    textJustify: { md: "inter-word" },
    maxWidth: 760,
  },
  summaryAccent: {
    textDecorationLine: "underline",
    textDecorationColor: alpha("#1CDB2F", 0.92),
    textDecorationThickness: "2px",
    textUnderlineOffset: "0.26em",
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: { xs: 1, sm: 1.5 },
  },
  metricCard: {
    p: { xs: 1.1, sm: 1.5, md: 2 },
    borderRadius: 3,
    background: "#FFFFFF",
    border: `1px solid ${BORDER_GREEN}`,
    boxShadow: `0 10px 24px ${alpha("#1CDB2F", 0.14)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  metricValue: {
    display: "block",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    fontSize: { xs: "1.02rem", sm: "1.4rem", md: "1.68rem" },
    color: METRIC_GREEN,
    textShadow: "0 0 10px rgba(28, 219, 47, 0.18)",
    transform: "translateZ(0)",
  },
  metricLabel: {
    mt: 0.5,
    fontWeight: 600,
    fontSize: { xs: 9.5, sm: 12, md: 11 },
    letterSpacing: { xs: "0.06em", sm: "0.12em", md: "0.11em" },
    textTransform: "uppercase",
    color: "#084E10",
    textAlign: "center",
  },
  sideCard: {
    alignSelf: "stretch",
    borderRadius: 4,
    p: { xs: 2.25, sm: 3, md: 4 },
    background: "#FFFFFF",
    border: `1px solid ${BORDER_GREEN}`,
    boxShadow: `inset 0 1px 0 ${alpha("#FFFFFF", 0.9)}, 0 18px 40px ${alpha("#1CDB2F", 0.1)}`,
    color: "#154D1C",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: { xs: 2.25, md: 3 },
    minHeight: { xs: "auto", lg: 420 },
  },
  sideLabel: {
    fontSize: { xs: 12, md: 11 },
    fontWeight: 900,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: LABEL_GREEN,
  },
  journalTitle: {
    fontWeight: 700,
    fontSize: { xs: "1rem", md: "0.94rem" },
    lineHeight: { xs: 1.8, md: 1.68 },
    color: DARK_GREEN,
  },
  sideText: {
    fontWeight: 600,
    fontSize: { xs: "1rem", md: "0.92rem" },
    lineHeight: { xs: 1.8, md: 1.7 },
    color: alpha("#263A2A", 0.84),
  },
  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: { xs: 0.75, md: 1 },
  },
  chip: {
    bgcolor: "#FFFFFF",
    color: DARK_GREEN,
    border: `1px solid ${alpha("#1CDB2F", 0.58)}`,
    fontWeight: 700,
    height: { xs: 28, md: 32 },
    "& .MuiChip-label": {
      px: { xs: 1, md: 1.25 },
      fontSize: { xs: "0.75rem", md: "0.77rem" },
    },
  },
  actions: {
    display: "flex",
    gap: { xs: 1, md: 1.5 },
    flexWrap: "nowrap",
    alignItems: "center",
    flexDirection: "row",
  },
  primaryBtn: {
    position: "relative",
    borderRadius: 999,
    py: 1,
    textTransform: "none",
    fontWeight: 700,
    whiteSpace: "nowrap",
    minWidth: 0,
    flex: 1,
    px: { xs: 1.35, sm: 2.1 },
    fontSize: { xs: "0.76rem", sm: "0.88rem", md: "0.82rem" },
    color: "#FFFFFF",
    background: "#1CDB2F",
    border: `1.5px solid ${alpha("#1CDB2F", 0.62)}`,
    boxShadow: `0 8px 24px ${alpha("#1CDB2F", 0.14)}`,
    "& .MuiButton-endIcon": {
      ml: 0.6,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
    "&:hover": {
      background: "#18C029",
      boxShadow: `0 10px 28px ${alpha("#1CDB2F", 0.18)}`,
    },
  },
  secondaryBtn: {
    borderRadius: 999,
    py: 1,
    textTransform: "none",
    fontWeight: 700,
    whiteSpace: "nowrap",
    minWidth: 0,
    flex: 1,
    px: { xs: 1.1, sm: 2.1 },
    fontSize: { xs: "0.76rem", sm: "0.88rem", md: "0.82rem" },
    color: DARK_GREEN,
    background: "#FFFFFF",
    border: `1.5px solid ${alpha("#1CDB2F", 0.58)}`,
    "& .MuiButton-startIcon": {
      mr: 0.6,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
    "&:hover": {
      background: alpha("#1CDB2F", 0.12),
    },
  },
  qrLink: {
    mt: { xs: 1.2, md: 1.4 },
    display: "grid",
    gridTemplateColumns: { xs: "1fr auto", sm: "1fr auto" },
    gap: { xs: 1, md: 1.35 },
    alignItems: "center",
    borderRadius: 3,
    border: `1px solid ${alpha("#1CDB2F", 0.34)}`,
    background: alpha("#1CDB2F", 0.045),
    px: { xs: 1.1, md: 1.35 },
    py: { xs: 1.05, md: 1.2 },
    color: "inherit",
    textDecoration: "none",
    transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
    "&:hover": {
      background: alpha("#1CDB2F", 0.085),
      borderColor: alpha("#1CDB2F", 0.5),
      transform: "translateY(-1px)",
    },
  },
  qrCopy: {
    minWidth: 0,
  },
  qrLabel: {
    fontSize: { xs: "0.67rem", md: "0.64rem" },
    fontWeight: 900,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: LABEL_GREEN,
  },
  qrText: {
    mt: 0.4,
    fontSize: { xs: "0.72rem", md: "0.76rem" },
    lineHeight: { xs: 1.45, md: 1.5 },
    fontWeight: 600,
    color: alpha("#263A2A", 0.8),
  },
  qrTile: {
    width: { xs: 62, md: 78 },
    height: { xs: 62, md: 78 },
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    p: 0.8,
    borderRadius: 2.4,
    background: "#FFFFFF",
    border: `1px solid ${alpha("#1CDB2F", 0.32)}`,
    boxShadow: `0 10px 22px ${alpha("#1CDB2F", 0.1)}`,
  },
  qrImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
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
        { y: 16, rotateX: 2 },
        {
          y: -6,
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
            <Typography sx={SX.thesisLabel} data-research-reveal>
              | My Thesis Study
            </Typography>

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
                <HoverLinkTooltip title="rafaelagoncillo@gmail.com">
                  <Box
                    component="a"
                    href="mailto:rafaelagoncillo@gmail.com"
                    sx={SX.authorIconLink}
                    aria-label="Email Rafael Alden F. Agoncillo"
                  >
                    <MailOutlineIcon />
                  </Box>
                </HoverLinkTooltip>
                <HoverLinkTooltip title="https://github.com/RaffyAldiny">
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
                </HoverLinkTooltip>
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
                <HoverLinkTooltip title="https://github.com/b0kja85">
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
                </HoverLinkTooltip>
              </Box>
            </Box>

            <Typography sx={{ ...SX.summary, mt: 2 }} data-research-reveal>
              My published thesis study proposes a deepfake detection framework that
              combines{" "}
              <ReferenceLink href={EFFICIENTNET_B0_URL}>EfficientNet-B0</ReferenceLink>{" "}
              for feature extraction,{" "}
              <ReferenceLink href={GAT_URL}>Graph Attention Networks (GATs)</ReferenceLink>{" "}
              for spatial relationships, and{" "}
              <ReferenceLink href={GRU_URL}>Gated Recurrent Units (GRUs)</ReferenceLink>{" "}
              for temporal analysis. The paper
              reports{" "}
              <Box component="span" sx={SX.summaryAccent}>
                80.60% accuracy
              </Box>{" "}
              with{" "}
              <Box component="span" sx={SX.summaryAccent}>
                0.28 loss
              </Box>{" "}
              on{" "}
              <ReferenceLink href={CELEB_DF_URL}>
                Celeb-DF v2
              </ReferenceLink>
              , outperforming
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
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                <HoverLinkTooltip title={ARTICLE_URL}>
                  <Button
                    href={ARTICLE_URL}
                    target="_blank"
                    rel="noreferrer"
                    endIcon={<ArrowOutwardIcon />}
                    sx={SX.primaryBtn}
                  >
                    View Article
                  </Button>
                </HoverLinkTooltip>

                <HoverLinkTooltip title={PDF_URL}>
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
                </HoverLinkTooltip>
              </Box>

              <Box
                component="a"
                href={ARTICLE_URL}
                target="_blank"
                rel="noreferrer"
                sx={SX.qrLink}
                data-research-reveal
                aria-label="Open the research study article with the QR code"
              >
                <Box sx={SX.qrCopy}>
                  <Typography sx={SX.qrLabel}>Scan QR</Typography>
                  <Typography sx={SX.qrText}>
                    Open the study on your phone without crowding the main actions.
                  </Typography>
                </Box>

                <Box sx={SX.qrTile}>
                  <Box
                    component="img"
                    src={RESEARCH_QR_SRC}
                    alt="QR code for the published research study article"
                    sx={SX.qrImage}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
