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
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { alpha } from "@mui/material/styles";
import { ensureGsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

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

function Dot({
  active,
  dark,
  sizePx,
}: {
  active: boolean;
  dark: boolean;
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
            : dark
              ? "rgba(200,255,196,0.34)"
              : alpha(ACTIVE_GREEN_DARK, 0.42)
        }`,
        boxShadow: active
          ? dark
            ? "0 0 0 3px rgba(28,219,47,0.14)"
            : "0 0 0 3px rgba(28,219,47,0.1)"
          : "none",
        transform: "translateZ(0)",
        transition: "all 140ms ease",
      }}
    />
  );
}

export default function LeftTimelineNav({
  sections,
  scrollOffsetPx = 0,
  darkSectionId = "projects",
  wrapAround = true,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const effectiveScrollOffsetPx = isMobile ? 56 : scrollOffsetPx;

  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");
  const [isInsideDarkSection, setIsInsideDarkSection] = React.useState(false);

  const darkSectionIds = React.useMemo(
    () =>
      (Array.isArray(darkSectionId) ? darkSectionId : [darkSectionId]).filter(
        (id): id is string => Boolean(id)
      ),
    [darkSectionId]
  );

  const activeIndex = React.useMemo(() => {
    const index = sections.findIndex((section) => section.id === activeId);
    return index >= 0 ? index : 0;
  }, [activeId, sections]);

  const isDarkOverlay = isInsideDarkSection;

  const text = isDarkOverlay ? "rgba(255,255,255,0.92)" : "#1E3A22";
  const textMuted = isDarkOverlay ? "rgba(220,255,214,0.76)" : alpha(ACTIVE_GREEN_DARK, 0.82);
  const activeText = isDarkOverlay ? "#8DFF74" : ACTIVE_GREEN;
  const bg = isDarkOverlay ? "rgba(30,30,40,0.82)" : "rgba(255,255,255,0.85)";
  const border = isDarkOverlay ? alpha("#8DFF74", 0.28) : alpha(ACTIVE_GREEN, 0.22);
  const shadow = isDarkOverlay
    ? "drop-shadow(0 2px 8px rgba(0,0,0,0.42))"
    : "drop-shadow(0 2px 8px rgba(255,255,255,0.52))";

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

  useIsomorphicLayoutEffect(() => {
    ensureGsap();
    if (!sections.length) return;

    const pickActive = () => {
      const activationY = effectiveScrollOffsetPx + 6;
      let nextId = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= activationY) {
          nextId = section.id;
        }
      }

      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const triggers = sections
      .map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return null;

        return ScrollTrigger.create({
          trigger: el,
          start: () => `top top+=${effectiveScrollOffsetPx + 6}`,
          end: () => `bottom top+=${effectiveScrollOffsetPx + 6}`,
          onEnter: () => setActiveId(section.id),
          onEnterBack: () => setActiveId(section.id),
        });
      })
      .filter(Boolean);

    ScrollTrigger.addEventListener("refresh", pickActive);
    ScrollTrigger.refresh();
    pickActive();

    return () => {
      ScrollTrigger.removeEventListener("refresh", pickActive);
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [effectiveScrollOffsetPx, sections]);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();
    if (!darkSectionIds.length) return;

    const syncDarkSection = (triggers: ScrollTrigger[]) => {
      const nextIsInsideDarkSection = triggers.some((trigger) => trigger.isActive);
      setIsInsideDarkSection((current) =>
        current === nextIsInsideDarkSection ? current : nextIsInsideDarkSection
      );
    };

    const triggers = darkSectionIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;

        const index = sections.findIndex((section) => section.id === id);
        const nextSectionId = index >= 0 ? sections[index + 1]?.id : undefined;
        const nextEl = nextSectionId ? document.getElementById(nextSectionId) : null;

        return ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          ...(nextEl
            ? {
                endTrigger: nextEl,
                end: "top bottom",
              }
            : {
                end: "bottom top",
              }),
          onEnter: () => {
            setIsInsideDarkSection(true);
          },
          onEnterBack: () => {
            setIsInsideDarkSection(true);
          },
          onLeave: () => {
            setIsInsideDarkSection(false);
          },
          onLeaveBack: () => {
            setIsInsideDarkSection(false);
          },
        });
      })
      .filter((trigger): trigger is ScrollTrigger => Boolean(trigger));

    const refreshDarkSection = () => {
      syncDarkSection(triggers);
    };

    ScrollTrigger.addEventListener("refresh", refreshDarkSection);
    ScrollTrigger.refresh();
    syncDarkSection(triggers);

    return () => {
      ScrollTrigger.removeEventListener("refresh", refreshDarkSection);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [darkSectionIds, sections]);

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
    color: isDarkOverlay ? "#D9FFD0" : SOFT_GREEN,
    bgcolor: isDarkOverlay ? "rgba(35,35,42,0.9)" : "rgba(248,255,247,0.94)",
    border: "1px solid",
    borderWidth: 1.5,
    borderColor: border,
    boxShadow: isDarkOverlay
      ? "0 0 0 1px rgba(141,255,116,0.06)"
      : "0 0 0 1px rgba(28,219,47,0.05)",
    "&:hover": {
      bgcolor: isDarkOverlay ? "rgba(54,72,54,0.92)" : "rgba(235,255,232,0.98)",
      borderColor: isDarkOverlay ? alpha("#8DFF74", 0.4) : alpha(ACTIVE_GREEN, 0.34),
    },
  } as const;

  const [ctaBottomPx, setCtaBottomPx] = React.useState<number | null>(null);
  const mobileDockRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isMobile) return;

    let raf = 0;

    const findVisibleCtaBottom = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-project-cta="1"]')
      );

      if (!nodes.length) {
        setCtaBottomPx(null);
        return;
      }

      const viewportHeight = window.innerHeight;
      let best: HTMLElement | null = null;
      let bestBottom = -Infinity;

      for (const el of nodes) {
        const rect = el.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < viewportHeight;
        if (!visible) continue;

        if (rect.bottom > bestBottom) {
          bestBottom = rect.bottom;
          best = el;
        }
      }

      if (!best) {
        setCtaBottomPx(null);
        return;
      }

      const rect = best.getBoundingClientRect();
      const distanceFromBottom = viewportHeight - rect.bottom;
      const dockHeight = mobileDockRef.current?.getBoundingClientRect().height ?? rect.height;
      const centeredBottom = distanceFromBottom + (rect.height - dockHeight) / 2;
      const clamped = Math.min(Math.max(Math.round(centeredBottom), 8), 140);
      setCtaBottomPx(clamped);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(findVisibleCtaBottom);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    findVisibleCtaBottom();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isMobile]);

  if (isMobile) {
    const inProjects = activeId === "projects";
    const bottom = inProjects ? (ctaBottomPx ?? 18) : 18;
    const dockRight = inProjects;

    return (
      <Box
        ref={mobileDockRef}
        sx={{
          position: "fixed",
          zIndex: 9999,
          filter: shadow,
          bottom: `calc(${bottom}px + env(safe-area-inset-bottom))`,
          left: dockRight ? "auto" : "50%",
          right: dockRight ? 14 : "auto",
          transform: dockRight ? "none" : "translateX(-50%)",
          transition: "bottom 220ms ease, right 220ms ease, left 220ms ease, transform 220ms ease",
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
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          }}
        >
          <IconButton size="small" onClick={() => jump(-1)} sx={{ color: isDarkOverlay ? "#D9FFD0" : SOFT_GREEN }}>
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
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  cursor: "pointer",
                }}
              />
            );
          })}

          {!dockRight && (
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
          )}

          <IconButton size="small" onClick={() => jump(1)} sx={{ color: isDarkOverlay ? "#D9FFD0" : SOFT_GREEN }}>
            <KeyboardArrowDownRoundedIcon sx={{ transform: "rotate(-90deg)", fontSize: "1.15rem" }} />
          </IconButton>
        </Stack>
      </Box>
    );
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
      <Stack spacing={1.1} sx={{ pointerEvents: "auto", filter: shadow, userSelect: "none" }}>
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
                <Dot active={isActive} dark={isDarkOverlay} sizePx={isActive ? 10 : 7} />

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

        <Tooltip title="Next section" placement="right">
          <IconButton onClick={() => jump(1)} sx={btnSx}>
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

