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
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { alpha } from "@mui/material/styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

const EMAIL = "rafaelagoncillo@gmail.com";
const GITHUB_URL = "https://github.com/RaffyAldiny";
const INQUIRY_FORM_URL = "https://forms.gle/hY6Z1aUsNf8jQ4937";
const INQUIRY_QR_SRC = "/images/qr/system-inquiry-QR.svg";
const DARK_GREEN = "#113E18";
const COPY_SUCCESS = "Email copied";

const OFFERINGS = [
  "Custom Management Systems",
  "Admin Dashboards",
  "Capstone / Thesis Platforms",
  "Full-Stack Web Apps",
  "AI Workflow Integrations",
] as const;

const SX = {
  section: {
    width: "100%",
    minHeight: { xs: "auto", md: "100dvh" },
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pt: { xs: "calc(18px + env(safe-area-inset-top))", md: 0 },
    pb: { xs: "calc(108px + env(safe-area-inset-bottom))", md: 0 },
    px: 0,
    background: "#57bc53",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.12,
    backgroundImage:
      "radial-gradient(circle at 60% 30%, rgba(232,255,226,0.12) 0%, transparent 24%), radial-gradient(circle at 78% 72%, rgba(232,255,226,0.1) 0%, transparent 22%)",
  },
  shell: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    minHeight: { xs: "auto", md: "100dvh" },
    maxWidth: 1440,
    display: "flex",
    alignItems: { xs: "stretch", md: "center" },
    justifyContent: "center",
    pointerEvents: "none",
    px: { xs: 1.15, sm: 2, md: 4 },
  },
  panel: {
    p: { xs: 1.1, sm: 1.45, md: 2.2 },
    display: "grid",
    gap: { xs: 1.6, md: 3.2 },
    gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.04fr) minmax(360px, 0.76fr)" },
    alignItems: { xs: "start", md: "center" },
    alignContent: { xs: "start", md: "center" },
    width: "100%",
    minHeight: { xs: "auto", md: "100dvh" },
    borderRadius: 0,
    background: "transparent",
    border: "none",
    boxShadow: "none",
    backdropFilter: "blur(8px)",
  },
  copyPanel: {
    position: "relative",
    pointerEvents: "auto",
    px: { xs: 0.35, sm: 1.2, md: 2.1 },
    py: { xs: 0.35, md: 2.8 },
    alignSelf: "center",
    justifySelf: "center",
    width: "100%",
    maxWidth: 980,
  },
  copyInner: {
    position: "relative",
    zIndex: 1,
    borderRadius: { xs: 4, md: 5 },
    background: "rgba(237,255,233,0.07)",
    border: "1px solid rgba(237,255,233,0.10)",
    backdropFilter: "blur(12px)",
    padding: "clamp(0.95rem, 0.8rem + 0.8vw, 2.1rem)",
    paddingRight: {
      xs: "clamp(0.95rem, 0.8rem + 0.8vw, 1.15rem)",
      md: "clamp(1.4rem, 1.15rem + 1vw, 2.8rem)",
    },
  },
  kicker: {
    fontSize: { xs: "0.68rem", md: "0.74rem" },
    fontWeight: 900,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#EDFFE8",
    mb: 1.2,
  },
  title: {
    fontWeight: 900,
    letterSpacing: "-0.03em",
    fontSize: { xs: "1.72rem", sm: "2.2rem", md: "3.38rem" },
    lineHeight: 0.94,
    color: "#F7FFF4",
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
      "linear-gradient(90deg, rgba(230,255,224,0.96) 0%, rgba(198,255,184,0.62) 52%, rgba(198,255,184,0.06) 100%)",
    boxShadow: "0 0 12px rgba(230,255,224,0.18)",
    transform: { xs: "translateY(3px)", md: "translateY(5px)" },
  },
  summary: {
    mt: { xs: 1.5, md: 2 },
    maxWidth: 760,
    color: "rgba(241,255,238,0.86)",
    fontSize: { xs: "0.76rem", md: "1rem" },
    lineHeight: { xs: 1.58, md: 1.8 },
  },
  accentRow: {
    mt: { xs: 1.65, md: 2.25 },
    display: { xs: "none", md: "grid" },
    gridTemplateColumns: "auto 1fr",
    columnGap: 1,
    rowGap: 0.35,
    alignItems: "center",
    color: "#E6FFE0",
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    bgcolor: "#E7FFE2",
    boxShadow: "0 0 0 5px rgba(231,255,226,0.10)",
  },
  chipWrap: {
    mt: { xs: 2.2, md: 3 },
    display: "flex",
    flexWrap: "wrap",
    gap: { xs: 0.7, md: 1 },
  },
  chip: {
    bgcolor: "rgba(245,255,242,0.14)",
    color: "#F6FFF3",
    border: `1px solid ${alpha("#ECFFE8", 0.2)}`,
    fontWeight: 700,
    height: { xs: 28, md: 34 },
    "& .MuiChip-label": {
      px: { xs: 0.95, md: 1.35 },
      fontSize: { xs: "0.68rem", md: "0.8rem" },
    },
  },
  ctaRow: {
    mt: { xs: 2.6, md: 3.5 },
    display: { xs: "grid", md: "flex" },
    gridTemplateColumns: { xs: "1.45fr 1fr 1.15fr", md: "none" },
    gap: { xs: 0.7, md: 1.5 },
    flexWrap: { md: "wrap" },
    alignItems: "stretch",
  },
  primaryBtn: {
    borderRadius: 999,
    px: { xs: 0.7, md: 2.5 },
    py: { xs: 0.72, md: 1.1 },
    textTransform: "none",
    fontWeight: 800,
    fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.9rem" },
    lineHeight: 1.18,
    textAlign: "center",
    background: "#F2FFF0",
    color: "#0E5A18",
    border: `1.5px solid ${alpha("#F2FFF0", 0.56)}`,
    boxShadow: `0 10px 28px ${alpha("#06210A", 0.18)}`,
    minWidth: 0,
    minHeight: { xs: 48, md: "auto" },
    width: { xs: "100%", md: "auto" },
    whiteSpace: { xs: "normal", md: "nowrap" },
    "&:hover": {
      background: "#E6FFE0",
      boxShadow: `0 12px 30px ${alpha("#06210A", 0.22)}`,
    },
    "& .MuiButton-endIcon": {
      ml: { xs: 0.32, sm: 0.6 },
      display: "inline-flex",
    },
    "& .MuiSvgIcon-root": {
      fontSize: { xs: "0.86rem", sm: "1rem" },
    },
  },
  secondaryBtn: {
    borderRadius: 999,
    px: { xs: 0.62, md: 2.2 },
    py: { xs: 0.68, md: 1.05 },
    textTransform: "none",
    fontWeight: 800,
    fontSize: { xs: "0.6rem", sm: "0.78rem", md: "0.88rem" },
    lineHeight: 1.18,
    textAlign: "center",
    color: "#F5FFF2",
    background: "rgba(255,255,255,0.06)",
    border: `1.5px solid ${alpha("#ECFFE8", 0.24)}`,
    minWidth: 0,
    minHeight: { xs: 48, md: "auto" },
    width: { xs: "100%", md: "auto" },
    whiteSpace: { xs: "normal", md: "nowrap" },
    "&:hover": {
      background: "rgba(255,255,255,0.12)",
    },
    "& .MuiButton-endIcon": {
      ml: { xs: 0.28, sm: 0.6 },
      display: "inline-flex",
    },
    "& .MuiSvgIcon-root": {
      fontSize: { xs: "0.84rem", sm: "1rem" },
    },
  },
  sideCard: {
    pointerEvents: "auto",
    borderRadius: 4,
    p: { xs: 1.45, sm: 2.4, md: 3.8 },
    background: { xs: "rgba(237,255,233,0.07)", sm: "#FFFFFF" },
    border: { xs: "1px solid rgba(237,255,233,0.10)", sm: `1px solid ${alpha("#1CDB2F", 0.34)}` },
    boxShadow: {
      xs: "none",
      sm: `inset 0 1px 0 ${alpha("#FFFFFF", 0.9)}, 0 16px 36px ${alpha("#06210A", 0.12)}`,
    },
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1.6, md: 2.7 },
    alignSelf: "center",
    justifySelf: "center",
    width: "100%",
    maxWidth: 460,
    position: "relative",
    overflow: { xs: "hidden", sm: "hidden" },
    backdropFilter: { xs: "blur(12px)", sm: "blur(6px)" },
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "0 0 auto 0",
      height: 54,
      background:
        "linear-gradient(90deg, rgba(28,219,47,0.08) 0%, rgba(255,255,255,0) 85%)",
      opacity: { xs: 0.28, sm: 1 },
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
    background: { xs: "rgba(237,255,233,0.06)", sm: "rgba(255,255,255,0.86)" },
    border: { xs: "1px solid rgba(237,255,233,0.14)", sm: `1px solid ${alpha("#1CDB2F", 0.24)}` },
    color: { xs: "#EAFEE5", sm: "#1A5D23" },
    fontSize: { xs: "0.66rem", sm: "0.72rem" },
    fontWeight: 900,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  utilityDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    bgcolor: { xs: "#1CDB2F", sm: "#1CDB2F" },
    boxShadow: { xs: "0 0 0 4px rgba(28,219,47,0.14)", sm: "0 0 0 4px rgba(28,219,47,0.1)" },
  },
  contactCard: {
    p: { xs: 1.15, md: 1.7 },
    borderRadius: 3.25,
    background: { xs: "rgba(237,255,233,0.06)", sm: "rgba(255,255,255,0.92)" },
    border: { xs: "1px solid rgba(237,255,233,0.14)", sm: `1px solid ${alpha("#1CDB2F", 0.34)}` },
    backdropFilter: { xs: "blur(12px)", sm: "none" },
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
    color: { xs: alpha("#F0FFEC", 0.7), sm: alpha("#23412A", 0.76) },
    fontSize: "0.7rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  contactValue: {
    color: { xs: "#F5FFF2", md: DARK_GREEN },
    fontSize: { xs: "0.68rem", md: "0.8rem" },
    fontWeight: 700,
    whiteSpace: { xs: "normal", md: "nowrap" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: { xs: 1.35, md: 1.4 },
  },
  contactAction: {
    borderRadius: 999,
    minWidth: 0,
    px: { xs: 0.9, md: 1 },
    py: { xs: 0.42, md: 0.5 },
    textTransform: "none",
    fontWeight: 800,
    fontSize: { xs: "0.62rem", md: "0.66rem" },
    whiteSpace: "nowrap",
    flexShrink: 0,
    color: { xs: "#0E5A18", sm: "#138B21" },
    borderColor: { xs: alpha("#F2FFF0", 0.56), sm: alpha("#1CDB2F", 0.44) },
    background: { xs: "#F2FFF0", sm: "transparent" },
    "&:hover": {
      borderColor: { xs: alpha("#F2FFF0", 0.72), sm: alpha("#1CDB2F", 0.58) },
      background: { xs: "#E6FFE0", sm: alpha("#1CDB2F", 0.08) },
    },
  },
  inlineValueRow: {
    mt: 0.3,
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.28, md: 0.4 },
    minWidth: 0,
  },
  inlineCopyBtn: {
    width: 22,
    height: 22,
    minWidth: 22,
    minHeight: 22,
    borderRadius: 1,
    color: { xs: "#DDFED7", sm: "#1A8A25" },
    flexShrink: 0,
    p: 0,
    alignSelf: "center",
    "&:hover": {
      background: { xs: "rgba(237,255,233,0.08)", sm: alpha("#1CDB2F", 0.08) },
    },
  },
  qrBlock: {
    mt: 1.25,
    display: { xs: "none", sm: "flex" },
    justifyContent: "center",
    gap: { xs: 0.8, md: 1.1 },
    alignItems: "center",
    width: "fit-content",
    maxWidth: "100%",
    alignSelf: "center",
    mx: "auto",
    px: 0,
    py: { xs: 0.35, md: 0.45 },
    color: "inherit",
    textDecoration: "none",
    transition: "transform 160ms ease",
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
  qrMeta: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 0.35,
    maxWidth: { xs: 170, md: 190 },
    transform: { xs: "translateY(8px)", md: "translateY(10px)" },
  },
  qrLead: {
    color: "#179123",
    fontSize: { xs: "0.9rem", md: "1rem" },
    fontWeight: 800,
    lineHeight: 1.35,
  },
  qrText: {
    color: alpha("#23412A", 0.72),
    fontSize: { xs: "0.66rem", md: "0.72rem" },
    fontWeight: 500,
    lineHeight: { xs: 1.42, md: 1.5 },
  },
  qrTile: {
    width: { xs: 116, md: 138 },
    height: { xs: 116, md: 138 },
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    p: 0,
    borderRadius: 0,
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },
  qrImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
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
        <Box
          sx={{
            color: { xs: "#DDFED7", sm: "#179123" },
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
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

    const y = window.scrollY + target.getBoundingClientRect().top;
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

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
          once: true,
        },
      });

      tl.fromTo(
        titleLines,
        {
          autoAlpha: 0,
          yPercent: 110,
          rotateX: -60,
          transformOrigin: "50% 100%",
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "expo.out",
        }
      ).fromTo(
        reveal,
        {
          autoAlpha: 0,
          y: 26,
        },
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
                <Button href={`mailto:${EMAIL}`} endIcon={<ArrowOutwardIcon />} sx={SX.primaryBtn}>
                  Start a Conversation
                </Button>

                <Button
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<GitHubIcon />}
                  sx={SX.secondaryBtn}
                >
                  View GitHub
                </Button>

                <Button
                  href="/#projects"
                  onClick={handleRevisitProjects}
                  endIcon={<ArrowOutwardIcon />}
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
              <Stack spacing={1.15}>
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

                <ContactRow
                  label="Project Inquiry"
                  value={
                    <Typography
                      component="div"
                      sx={{ ...SX.contactValue, mt: 0.35, whiteSpace: "normal" }}
                    >
                      Short form for project inquiries.
                    </Typography>
                  }
                  href={INQUIRY_FORM_URL}
                  icon={<DescriptionOutlinedIcon />}
                  actionLabel="Open Form"
                />

                <Box
                  component="a"
                  href={INQUIRY_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  sx={SX.qrBlock}
                  data-contact-reveal
                  aria-label="Open the project inquiry form with the QR code"
                >
                  <Box sx={SX.qrMeta}>
                    <Typography sx={SX.qrLead}>Prefer mobile?</Typography>
                    <Typography sx={SX.qrText}>
                      Scan to open the inquiry form on your phone.
                    </Typography>
                  </Box>

                  <Box sx={SX.qrTile}>
                    <Box
                      component="img"
                      src={INQUIRY_QR_SRC}
                      alt="QR code linking to the project inquiry form"
                      sx={SX.qrImage}
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
