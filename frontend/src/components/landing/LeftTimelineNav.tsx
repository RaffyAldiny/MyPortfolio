"use client";

import * as React from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

type SectionItem = {
  id: string;
  label: string;
};

type Props = {
  sections: SectionItem[];
  scrollOffsetPx?: number;

  /**
   * When active section index is >= darkSectionId index, nav switches to dark styling.
   * Example: "projects"
   */
  darkSectionId?: string;

  /**
   * Up/Down wraps around at ends
   */
  wrapAround?: boolean;
};

const PRISM_GRADIENT =
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #E0C3FC 50%, #8EC5FC 75%, #D4FFEC 100%)";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function LeftTimelineNav({
  sections,
  scrollOffsetPx = 0,
  darkSectionId = "projects",
  wrapAround = true,
}: Props) {
  const [activeId, setActiveId] = React.useState<string>(sections[0]?.id ?? "");

  const activeIndex = React.useMemo(() => {
    const idx = sections.findIndex((s) => s.id === activeId);
    return idx === -1 ? 0 : idx;
  }, [activeId, sections]);

  const isDarkOverlay = React.useMemo(() => {
    const darkIdx = sections.findIndex((s) => s.id === darkSectionId);
    if (darkIdx === -1) return false;
    return activeIndex >= darkIdx;
  }, [activeIndex, darkSectionId, sections]);

  const scrollToId = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const y = window.scrollY + rect.top - scrollOffsetPx;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [scrollOffsetPx]
  );

  const goPrev = React.useCallback(() => {
    if (!sections.length) return;

    let nextIdx = activeIndex - 1;
    if (nextIdx < 0) nextIdx = wrapAround ? sections.length - 1 : 0;

    scrollToId(sections[nextIdx].id);
  }, [activeIndex, scrollToId, sections, wrapAround]);

  const goNext = React.useCallback(() => {
    if (!sections.length) return;

    let nextIdx = activeIndex + 1;
    if (nextIdx > sections.length - 1) nextIdx = wrapAround ? 0 : sections.length - 1;

    scrollToId(sections[nextIdx].id);
  }, [activeIndex, scrollToId, sections, wrapAround]);

  // Accurate "active section" detection:
  // Active = last section whose top is above the "activation line"
  React.useEffect(() => {
    if (!sections.length) return;

    let raf = 0;

    const pickActive = () => {
      const activationY = scrollOffsetPx + 6;

      const tops = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return { id: s.id, top: Number.POSITIVE_INFINITY };
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .sort((a, b) => a.top - b.top);

      let chosen = tops[0]?.id ?? sections[0].id;

      for (const t of tops) {
        if (t.top <= activationY) chosen = t.id;
      }

      setActiveId(chosen);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    pickActive();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, scrollOffsetPx]);

  // Legible floating text tokens
  const text = isDarkOverlay ? "rgba(255,255,255,0.92)" : "rgba(25,25,35,0.88)";
  const textMuted = isDarkOverlay ? "rgba(255,255,255,0.62)" : "rgba(25,25,35,0.60)";

  const shadow = isDarkOverlay
    ? "drop-shadow(0 2px 12px rgba(0,0,0,0.58))"
    : "drop-shadow(0 2px 12px rgba(255,255,255,0.72))";

  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: 12, md: 18 },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        bgcolor: "transparent",
        pointerEvents: "none",
      }}
    >
      <Stack
        spacing={1.1}
        alignItems="flex-start"
        sx={{
          pointerEvents: "auto",
          userSelect: "none",
          filter: shadow,
        }}
      >
        <Tooltip title="Previous section" placement="right">
          <IconButton
            size="small"
            onClick={goPrev}
            sx={{
              color: text,
              bgcolor: isDarkOverlay ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: isDarkOverlay ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.10)",
              "&:hover": {
                bgcolor: isDarkOverlay ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)",
              },
            }}
          >
            <KeyboardArrowUpRoundedIcon />
          </IconButton>
        </Tooltip>

        {/* Floating items (more y spacing) */}
        <Stack spacing={1.25} sx={{ pl: 0.4, py: 0.25 }}>
          {sections.map((s) => {
            const isActive = s.id === activeId;

            return (
              <Box
                key={s.id}
                onClick={() => scrollToId(s.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") scrollToId(s.id);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  outline: "none",
                  "&:hover .label": {
                    opacity: 1,
                    transform: "translateX(2px)",
                  },
                }}
              >
                {/* Dot */}
                <Box
                  sx={{
                    width: isActive ? 10 : 7,
                    height: isActive ? 10 : 7,
                    borderRadius: "50%",
                    background: isActive ? PRISM_GRADIENT : "transparent",
                    border: `1px solid ${
                      isActive
                        ? "rgba(255,255,255,0.0)"
                        : isDarkOverlay
                        ? "rgba(255,255,255,0.32)"
                        : "rgba(0,0,0,0.22)"
                    }`,
                    boxShadow: isActive
                      ? isDarkOverlay
                        ? "0 0 0 4px rgba(224,195,252,0.16)"
                        : "0 0 0 4px rgba(91,75,117,0.12)"
                      : "none",
                    flex: "0 0 auto",
                    transition: "all 140ms ease",
                  }}
                />

                <Typography
                  className="label"
                  sx={{
                    fontSize: 12,
                    fontWeight: isActive ? 900 : 750,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: isActive ? text : textMuted,
                    opacity: isActive ? 1 : 0.88,
                    transition: "opacity 160ms ease, transform 160ms ease, color 160ms ease",
                    transform: "translateX(0px)",
                    whiteSpace: "nowrap",

                    // Prism highlight only when active
                    background: isActive ? PRISM_GRADIENT : "none",
                    WebkitBackgroundClip: isActive ? "text" : "unset",
                    WebkitTextFillColor: isActive ? "transparent" : "unset",
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        <Tooltip title="Next section" placement="right">
          <IconButton
            size="small"
            onClick={goNext}
            sx={{
              color: text,
              bgcolor: isDarkOverlay ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: isDarkOverlay ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.10)",
              "&:hover": {
                bgcolor: isDarkOverlay ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)",
              },
            }}
          >
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
