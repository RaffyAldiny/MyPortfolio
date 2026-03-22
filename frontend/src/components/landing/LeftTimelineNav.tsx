"use client";

import * as React from "react";
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { alpha } from "@mui/material/styles";

type SectionItem = { id: string; label: string };

type Props = {
  sections: ReadonlyArray<SectionItem>;
  scrollOffsetPx?: number;
  darkSectionId?: string | string[];
  wrapAround?: boolean;
};

const ACTIVE_GREEN = "#1CDB2F";
const ACTIVE_GREEN_DARK = "#0F5E19";
const SOFT_GREEN = "#79D883";
const SOCIALS = [
  { label: "GitHub", Icon: GitHubIcon, href: "https://github.com/RaffyAldiny" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://linkedin.com/" },
  { label: "Facebook", Icon: FacebookIcon, href: "https://facebook.com/" },
] as const;

function Dot({
  active,
  sizePx,
}: {
  active: boolean;
  sizePx: number;
}) {
  const size = `${sizePx}px`;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: "999px",
        display: "inline-block",
        flexShrink: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        background: active ? ACTIVE_GREEN : "transparent",
        border: `1px solid ${
          active
            ? alpha(ACTIVE_GREEN, 0.5)
            : alpha(ACTIVE_GREEN_DARK, 0.42)
        }`,
        boxShadow: active ? "0 0 0 3px rgba(28,219,47,0.1)" : "none",
        transform: "translateZ(0)",
        transition: "all 140ms ease",
      }}
    />
  );
}

export default function LeftTimelineNav({
  sections,
  scrollOffsetPx = 0,
  wrapAround = true,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const effectiveScrollOffsetPx = scrollOffsetPx;

  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");
  const activeIdRef = React.useRef(activeId);

  React.useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const activeIndex = React.useMemo(() => {
    const index = sections.findIndex((section) => section.id === activeId);
    return index >= 0 ? index : 0;
  }, [activeId, sections]);

  const text = "#1E3A22";
  const textMuted = alpha(ACTIVE_GREEN_DARK, 0.82);
  const activeText = ACTIVE_GREEN;
  const bg = "rgba(255,255,255,0.92)";
  const border = alpha(ACTIVE_GREEN, 0.22);

  const scrollToId = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const y = window.scrollY + el.getBoundingClientRect().top - effectiveScrollOffsetPx;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [effectiveScrollOffsetPx]
  );

  const jump = React.useCallback(
    (dir: -1 | 1) => {
      if (!sections.length) return;

      let index = activeIndex + dir;
      if (index < 0) index = wrapAround ? sections.length - 1 : 0;
      if (index > sections.length - 1) index = wrapAround ? 0 : sections.length - 1;

      scrollToId(sections[index].id);
    },
    [activeIndex, scrollToId, sections, wrapAround]
  );

  React.useEffect(() => {
    if (!activeId && sections[0]?.id) {
      setActiveId(sections[0].id);
    }
  }, [activeId, sections]);

  React.useEffect(() => {
    if (!sections.length) return;

    const sectionElements = sections
      .map((section) => ({
        id: section.id,
        el: document.getElementById(section.id),
      }))
      .filter((entry): entry is { id: string; el: HTMLElement } => Boolean(entry.el));

    if (!sectionElements.length) return;

    let rafId = 0;
    let settleTimer = 0;

    const commitActiveId = (nextId: string) => {
      activeIdRef.current = nextId;
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const pickActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const activationY = Math.min(
        Math.max(viewportHeight * 0.5, effectiveScrollOffsetPx + 6),
        Math.max(0, viewportHeight - 2)
      );
      let nextId = sectionElements[0]?.id ?? sections[0].id;

      for (const section of sectionElements) {
        if (section.el.getBoundingClientRect().top <= activationY) {
          nextId = section.id;
        }
      }

      const currentId = activeIdRef.current;
      const shouldApplyImmediately =
        !isMobile || nextId === "projects" || currentId === "projects";

      if (settleTimer) {
        window.clearTimeout(settleTimer);
        settleTimer = 0;
      }

      if (shouldApplyImmediately) {
        commitActiveId(nextId);
        return;
      }

      settleTimer = window.setTimeout(() => {
        commitActiveId(nextId);
        settleTimer = 0;
      }, 90);
    };

    const schedulePick = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        pickActiveSection();
      });
    };

    pickActiveSection();
    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick, { passive: true });
    window.addEventListener("orientationchange", schedulePick, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (settleTimer) {
        window.clearTimeout(settleTimer);
      }
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
      window.removeEventListener("orientationchange", schedulePick);
    };
  }, [effectiveScrollOffsetPx, isMobile, sections]);

  const circleBtnBase = {
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
    p: 0,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as const;

  const btnSx = {
    ...circleBtnBase,
    color: SOFT_GREEN,
    bgcolor: "rgba(248,255,247,0.96)",
    border: "1px solid",
    borderWidth: 1.5,
    borderColor: border,
    boxShadow: "0 0 0 1px rgba(28,219,47,0.05)",
    "&:hover": {
      bgcolor: "rgba(235,255,232,0.98)",
      borderColor: alpha(ACTIVE_GREEN, 0.34),
    },
  } as const;

  const socialBtnSx = {
    width: 28,
    height: 28,
    minWidth: 28,
    minHeight: 28,
    p: 0,
    borderRadius: "50%",
    color: ACTIVE_GREEN_DARK,
    bgcolor: "transparent",
    border: "none",
    boxShadow: "none",
    "& .MuiSvgIcon-root": {
      fontSize: "0.92rem",
    },
    "&:hover": {
      bgcolor: "rgba(235,255,232,0.76)",
      transform: "translateY(-1px)",
    },
  } as const;

  if (isMobile) {
    if (activeId === "projects") {
      return null;
    }

    return (
      <Box
        sx={{
          position: "fixed",
          zIndex: 9999,
          bottom: "calc(18px + env(safe-area-inset-bottom))",
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            px: 1.05,
            py: 0.78,
            borderRadius: 999,
            bgcolor: bg,
            border: "1px solid",
            borderColor: border,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <IconButton size="small" onClick={() => jump(-1)} sx={{ color: SOFT_GREEN }}>
            <KeyboardArrowUpRoundedIcon sx={{ transform: "rotate(-90deg)", fontSize: "1.15rem" }} />
          </IconButton>

          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <Box
                key={section.id}
                onClick={() => scrollToId(section.id)}
                sx={{
                  width: isActive ? 19 : 7,
                  height: 7,
                  borderRadius: 3.5,
                  background: isActive ? ACTIVE_GREEN : alpha(text, 0.25),
                  transition: "all 0.18s ease",
                  cursor: "pointer",
                }}
              />
            );
          })}

          <Typography
            sx={{
              minWidth: 78,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: "uppercase",
              textAlign: "center",
              color: text,
            }}
          >
            {sections[activeIndex]?.label}
          </Typography>

          <IconButton size="small" onClick={() => jump(1)} sx={{ color: SOFT_GREEN }}>
            <KeyboardArrowDownRoundedIcon sx={{ transform: "rotate(-90deg)", fontSize: "1.15rem" }} />
          </IconButton>
        </Stack>
      </Box>
    );
  }

  if (activeId === "projects") {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        left: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <Stack spacing={1.15} sx={{ pointerEvents: "auto", userSelect: "none" }}>
        <Tooltip title="Previous section" placement="right">
          <IconButton onClick={() => jump(-1)} sx={btnSx}>
            <KeyboardArrowUpRoundedIcon />
          </IconButton>
        </Tooltip>

        <Stack spacing={1.25} sx={{ pl: 0.5 }}>
          {sections.map((section) => {
            const isActive = section.id === activeId;

            return (
              <Box
                key={section.id}
                onClick={() => scrollToId(section.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    scrollToId(section.id);
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  outline: "none",
                  "&:hover .label": { opacity: 1, transform: "translateX(2px)" },
                }}
              >
                <Dot active={isActive} sizePx={isActive ? 10 : 7} />

                <Typography
                  className="label"
                  sx={{
                    fontSize: 12,
                    fontWeight: isActive ? 900 : 750,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: isActive ? activeText : textMuted,
                    opacity: isActive ? 1 : 0.88,
                    transition: "opacity 160ms ease, transform 160ms ease, color 160ms ease",
                    transform: "translateX(0px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {section.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        <Stack
          spacing={0.55}
          sx={{
            alignItems: "flex-start",
            pl: 0.5,
            pt: 0.15,
          }}
        >
          <Stack
            direction="row"
            spacing={0.25}
            sx={{
              px: 0.45,
              py: 0.32,
              borderRadius: 999,
              bgcolor: "rgba(248,255,247,0.94)",
              border: "1px solid",
              borderColor: border,
              boxShadow: "0 0 0 1px rgba(28,219,47,0.04)",
            }}
          >
            {SOCIALS.map(({ label, Icon, href }) => (
              <Tooltip key={label} title={label} placement="right">
                <IconButton component="a" href={href} target="_blank" rel="noreferrer" sx={socialBtnSx}>
                  <Icon />
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>

        <Tooltip title="Next section" placement="right">
          <IconButton onClick={() => jump(1)} sx={btnSx}>
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

