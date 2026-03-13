"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { alpha } from "@mui/material/styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const EMAIL = "rafaelagoncillo@gmail.com";
const GITHUB_URL = "https://github.com/RaffyAldiny";
const BORDER_GREEN = alpha("#1CDB2F", 0.42);
const DARK_GREEN = "#113E18";
const COPY_SUCCESS = "Email copied";

const OFFERINGS = [
  "Custom Management Systems",
  "Admin Dashboards",
  "Capstone / Thesis Platforms",
  "Full-Stack Web Apps",
  "AI Workflow Integrations",
] as const;

const PROCESS = [
  "Clarify scope and workflow first",
  "Design for real use, not just demos",
  "Build clean admin-friendly systems",
] as const;

const SX = {
  section: {
    width: "100%",
    minHeight: { xs: "auto", md: "calc(100dvh - 80px)" },
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: { xs: 6, md: 2 },
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.22,
    backgroundImage: `
      radial-gradient(rgba(28, 219, 47, 0.18) 1px, transparent 1px),
      radial-gradient(rgba(17, 62, 24, 0.12) 1px, transparent 1px)
    `,
    backgroundSize: { xs: "18px 18px", md: "28px 28px" },
    backgroundPosition: "0 0, 9px 9px",
    maskImage: "radial-gradient(circle at 50% 50%, #000 0%, #000 52%, transparent 88%)",
  },
  shell: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 1140,
    pointerEvents: "none",
  },
  panel: {
    p: { xs: 1, sm: 1.5, md: 2 },
    display: "grid",
    gap: { xs: 2.5, md: 4 },
    gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.18fr) minmax(320px, 0.82fr)" },
    alignItems: "center",
  },
  copyPanel: {
    position: "relative",
    pointerEvents: "auto",
    px: { xs: 1.2, sm: 2, md: 2.5 },
    py: { xs: 2.2, md: 2.8 },
    alignSelf: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: { xs: "-8% -6% auto auto", md: "-12% auto auto -6%" },
      width: { xs: 180, md: 280 },
      height: { xs: 180, md: 280 },
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(28,219,47,0.12) 0%, rgba(28,219,47,0.04) 42%, transparent 72%)",
      pointerEvents: "none",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: { xs: 0, md: 6 },
      top: { xs: 0, md: 6 },
      width: { xs: 86, md: 128 },
      height: 5,
      borderRadius: 999,
      background:
        "linear-gradient(90deg, rgba(28,219,47,0.92) 0%, rgba(178,255,153,0.12) 100%)",
      boxShadow: "0 0 12px rgba(28,219,47,0.12)",
    },
  },
  copyInner: {
    position: "relative",
    zIndex: 1,
  },
  kicker: {
    fontSize: { xs: "0.72rem", md: "0.8rem" },
    fontWeight: 900,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#0D6417",
    mb: 1.2,
  },
  title: {
    fontWeight: 900,
    letterSpacing: "-0.03em",
    fontSize: { xs: "2rem", sm: "2.6rem", md: "4rem" },
    lineHeight: 0.94,
    color: DARK_GREEN,
    maxWidth: 760,
  },
  titleLine: {
    display: "block",
  },
  titleLineWithRule: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 1, md: 1.4 },
    flexWrap: "nowrap",
  },
  titleRule: {
    flex: "1 1 auto",
    minWidth: { xs: 52, sm: 86, md: 164 },
    maxWidth: { xs: 116, sm: 170, md: 240 },
    height: { xs: 4, md: 5 },
    borderRadius: 999,
    alignSelf: "center",
    background:
      "linear-gradient(90deg, rgba(28,219,47,0.96) 0%, rgba(163,248,156,0.58) 52%, rgba(163,248,156,0.06) 100%)",
    boxShadow: "0 0 12px rgba(28,219,47,0.18)",
    transform: { xs: "translateY(3px)", md: "translateY(5px)" },
  },
  summary: {
    mt: 2,
    maxWidth: 760,
    color: alpha("#243226", 0.84),
    fontSize: { xs: "0.98rem", md: "1.08rem" },
    lineHeight: 1.8,
  },
  accentRow: {
    mt: 2.25,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    columnGap: 1,
    rowGap: 0.35,
    alignItems: "center",
    color: "#16641F",
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    bgcolor: "#1CDB2F",
    boxShadow: "0 0 0 5px rgba(28,219,47,0.12)",
  },
  chipWrap: {
    mt: 3,
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  chip: {
    bgcolor: "#FFFFFF",
    color: DARK_GREEN,
    border: `1px solid ${alpha("#1CDB2F", 0.52)}`,
    fontWeight: 700,
    height: { xs: 30, md: 34 },
    "& .MuiChip-label": {
      px: { xs: 1.1, md: 1.35 },
      fontSize: { xs: "0.78rem", md: "0.85rem" },
    },
  },
  ctaRow: {
    mt: 3.5,
    display: "flex",
    gap: { xs: 1, md: 1.5 },
    flexWrap: "wrap",
    alignItems: "center",
  },
  primaryBtn: {
    borderRadius: 999,
    px: { xs: 2, md: 2.5 },
    py: 1.1,
    textTransform: "none",
    fontWeight: 800,
    fontSize: { xs: "0.92rem", md: "0.96rem" },
    color: "#FFFFFF",
    background: "#1CDB2F",
    border: `1.5px solid ${alpha("#1CDB2F", 0.62)}`,
    boxShadow: `0 10px 28px ${alpha("#1CDB2F", 0.16)}`,
    "&:hover": {
      background: "#18C029",
      boxShadow: `0 12px 30px ${alpha("#1CDB2F", 0.2)}`,
    },
  },
  secondaryBtn: {
    borderRadius: 999,
    px: { xs: 1.7, md: 2.2 },
    py: 1.05,
    textTransform: "none",
    fontWeight: 800,
    fontSize: { xs: "0.88rem", md: "0.94rem" },
    color: DARK_GREEN,
    background: "#FFFFFF",
    border: `1.5px solid ${alpha("#1CDB2F", 0.5)}`,
    "&:hover": {
      background: alpha("#1CDB2F", 0.1),
    },
  },
  sideCard: {
    pointerEvents: "auto",
    borderRadius: 4,
    p: { xs: 2.25, sm: 3, md: 4 },
    background:
      "linear-gradient(180deg, rgba(236,249,232,0.94) 0%, rgba(247,255,245,0.96) 100%)",
    border: `1px solid ${BORDER_GREEN}`,
    boxShadow: `inset 0 1px 0 ${alpha("#FFFFFF", 0.9)}, 0 16px 36px ${alpha("#1CDB2F", 0.08)}`,
    display: "flex",
    flexDirection: "column",
    gap: { xs: 2.25, md: 3 },
    alignSelf: "center",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(6px)",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "0 0 auto 0",
      height: 54,
      background:
        "linear-gradient(90deg, rgba(28,219,47,0.08) 0%, rgba(255,255,255,0) 85%)",
      pointerEvents: "none",
    },
  },
  sideUtility: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.65,
    alignSelf: "flex-start",
    px: 1.15,
    py: 0.65,
    borderRadius: 999,
    background: "rgba(255,255,255,0.86)",
    border: `1px solid ${alpha("#1CDB2F", 0.24)}`,
    color: "#1A5D23",
    fontSize: "0.72rem",
    fontWeight: 900,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  utilityDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    bgcolor: "#1CDB2F",
    boxShadow: "0 0 0 4px rgba(28,219,47,0.1)",
  },
  sideLabel: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#1CDB2F",
  },
  contactCard: {
    p: { xs: 1.4, md: 1.7 },
    borderRadius: 3.25,
    background: "rgba(255,255,255,0.92)",
    border: `1px solid ${alpha("#1CDB2F", 0.22)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 0.9,
  },
  contactMeta: {
    minWidth: 0,
    flex: 1,
  },
  contactTitle: {
    color: alpha("#23412A", 0.76),
    fontSize: "0.75rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  contactValue: {
    color: DARK_GREEN,
    fontSize: { xs: "0.76rem", md: "0.84rem" },
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  contactAction: {
    borderRadius: 999,
    minWidth: 0,
    px: 1,
    py: 0.5,
    textTransform: "none",
    fontWeight: 800,
    fontSize: "0.7rem",
    whiteSpace: "nowrap",
    flexShrink: 0,
    color: "#138B21",
    borderColor: alpha("#1CDB2F", 0.34),
    "&:hover": {
      borderColor: alpha("#1CDB2F", 0.5),
      background: alpha("#1CDB2F", 0.08),
    },
  },
  inlineValueRow: {
    mt: 0.3,
    display: "flex",
    alignItems: "center",
    gap: 0.4,
    minWidth: 0,
  },
  inlineCopyBtn: {
    width: 22,
    height: 22,
    minWidth: 22,
    minHeight: 22,
    borderRadius: 1,
    color: "#1A8A25",
    flexShrink: 0,
    p: 0,
    "&:hover": {
      background: alpha("#1CDB2F", 0.08),
    },
  },
  processList: {
    display: "flex",
    flexDirection: "column",
    gap: 1.1,
  },
  processItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 1,
    color: alpha("#1E3423", 0.86),
    fontWeight: 600,
    lineHeight: 1.6,
  },
} as const;

function ContactRow({
  label,
  value,
  href,
  icon,
  actionLabel,
  onAction,
}: {
  label: string;
  value: React.ReactNode;
  href?: string;
  icon: React.ReactNode;
  actionLabel: string;
  onAction?: () => void;
}) {
  const isExternal = Boolean(href?.startsWith("http"));

  return (
    <Box sx={SX.contactCard} data-contact-reveal>
      <Stack direction="row" spacing={1.2} sx={{ minWidth: 0, alignItems: "center", flex: 1 }}>
        <Box sx={{ color: "#179123", display: "inline-flex", alignItems: "center" }}>{icon}</Box>
        <Box sx={SX.contactMeta}>
          <Typography sx={SX.contactTitle}>{label}</Typography>
          {typeof value === "string" ? (
            <Typography component="div" sx={{ ...SX.contactValue, mt: 0.35 }}>
              {value}
            </Typography>
          ) : (
            <Box component="div">{value}</Box>
          )}
        </Box>
      </Stack>

      {href ? (
        <Button
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          variant="outlined"
          sx={SX.contactAction}
        >
          {actionLabel}
        </Button>
      ) : (
        <Button onClick={onAction} variant="outlined" sx={SX.contactAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default function LetsWorkTogether() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const copyResetRef = React.useRef<number | null>(null);

  const handleRevisitProjects = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById("projects");
    if (!target) return;

    const headerOffset = window.innerWidth >= 900 ? 80 : 56;
    const y = window.scrollY + target.getBoundingClientRect().top - headerOffset;
    window.history.replaceState(null, "", "/#projects");
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = window.setTimeout(() => {
        setCopied(false);
        copyResetRef.current = null;
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveal = gsap.utils.toArray<HTMLElement>("[data-contact-reveal]");
      const titleLines = gsap.utils.toArray<HTMLElement>("[data-contact-title-line]");

      gsap.set(reveal, { autoAlpha: 0, y: 26 });
      gsap.set(titleLines, { autoAlpha: 0, yPercent: 110, rotateX: -60, transformOrigin: "50% 100%" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
          once: true,
        },
      });

      tl.to(titleLines, {
        autoAlpha: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "expo.out",
      }).to(
        reveal,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          stagger: 0.08,
        },
        "-=0.45"
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Box ref={rootRef} sx={SX.section}>
      <Box sx={SX.backdrop} />

      <Box sx={SX.shell}>
        <Box sx={SX.panel}>
          <Box sx={SX.copyPanel}>
            <Box sx={SX.copyInner}>
              <Typography sx={SX.kicker} data-contact-reveal>
                | Let&apos;s Work Together
              </Typography>

              <Box sx={{ overflow: "hidden" }}>
                <Typography sx={SX.title} component="div">
                  <Box component="span" sx={SX.titleLine} data-contact-title-line>
                    Build Something
                  </Box>
                  <Box component="span" sx={SX.titleLineWithRule} data-contact-title-line>
                    <Box component="span">Useful</Box>
                    <Box component="span" aria-hidden sx={SX.titleRule} />
                  </Box>
                  <Box component="span" sx={SX.titleLine} data-contact-title-line>
                    And Actually Deployable.
                  </Box>
                </Typography>
              </Box>

              <Typography sx={SX.summary} data-contact-reveal>
                I work best on systems that need structure, clarity, and practical
                execution, from custom management software and academic platforms to
                polished full-stack products with strong admin workflows.
              </Typography>

              <Box sx={SX.accentRow} data-contact-reveal>
                <Box sx={SX.availabilityDot} />
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.92rem", md: "1rem" } }}>
                  Open for serious builds, product collaborations, and tailored system
                  work.
                </Typography>
              </Box>

              <Box sx={SX.chipWrap} data-contact-reveal>
                {OFFERINGS.map((item) => (
                  <Chip key={item} label={item} sx={SX.chip} />
                ))}
              </Box>

              <Box sx={SX.ctaRow} data-contact-reveal>
                <Button
                  href={`mailto:${EMAIL}`}
                  endIcon={<ArrowOutwardIcon />}
                  sx={SX.primaryBtn}
                >
                  Start a Conversation
                </Button>

                <Button
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={SX.secondaryBtn}
                >
                  View GitHub
                </Button>

                <Button
                  href="/#projects"
                  onClick={handleRevisitProjects}
                  startIcon={<ArrowOutwardIcon />}
                  sx={SX.secondaryBtn}
                >
                  Revisit Projects
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={SX.sideCard}>
            <Box sx={SX.sideUtility} data-contact-reveal>
              <Box sx={SX.utilityDot} />
              Reach Out
            </Box>

            <Box>
              <Typography sx={SX.sideLabel} data-contact-reveal>
                Contact
              </Typography>

              <Stack spacing={1.15} sx={{ mt: 1.5 }}>
                <ContactRow
                  label="Email"
                  value={
                    <Box sx={SX.inlineValueRow}>
                      <Typography component="span" sx={{ ...SX.contactValue, mt: 0 }}>
                        {EMAIL}
                      </Typography>
                      <IconButton
                        aria-label={copied ? COPY_SUCCESS : "Copy email"}
                        onClick={handleCopy}
                        sx={SX.inlineCopyBtn}
                      >
                        <ContentCopyRoundedIcon sx={{ fontSize: "0.92rem" }} />
                      </IconButton>
                    </Box>
                  }
                  href={`mailto:${EMAIL}`}
                  icon={<MailOutlineIcon />}
                  actionLabel="Email"
                />

                <ContactRow
                  label="GitHub"
                  value={
                    <Box sx={SX.inlineValueRow}>
                      <Typography component="span" sx={{ ...SX.contactValue, mt: 0 }}>
                        github.com/RaffyAldiny
                      </Typography>
                      <IconButton
                        aria-label="Copy GitHub profile link"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(GITHUB_URL);
                          } catch {}
                        }}
                        sx={SX.inlineCopyBtn}
                      >
                        <ContentCopyRoundedIcon sx={{ fontSize: "0.92rem" }} />
                      </IconButton>
                    </Box>
                  }
                  href={GITHUB_URL}
                  icon={<GitHubIcon />}
                  actionLabel="Open"
                />
              </Stack>
            </Box>

            <Box>
              <Typography sx={SX.sideLabel} data-contact-reveal>
                Working Style
              </Typography>

              <Box sx={{ ...SX.processList, mt: 1.6 }}>
                {PROCESS.map((item) => (
                  <Box key={item} sx={SX.processItem} data-contact-reveal>
                    <TaskAltRoundedIcon sx={{ color: "#18A626", fontSize: "1.1rem", mt: 0.15 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.94rem", md: "0.98rem" } }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
