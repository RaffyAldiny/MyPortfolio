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

type SectionItem = { id: string; label: string };

type Props = {
  sections: SectionItem[];
  scrollOffsetPx?: number;
  darkSectionId?: string;
  wrapAround?: boolean;
};

const PRISM_GRADIENT =
  "linear-gradient(135deg,#FF9A9E 0%,#FECFEF 25%,#E0C3FC 50%,#8EC5FC 75%,#D4FFEC 100%)";

export default function LeftTimelineNav({
  sections,
  scrollOffsetPx = 0,
  darkSectionId = "projects",
  wrapAround = true,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");

  const activeIndex = React.useMemo(() => {
    const idx = sections.findIndex((s) => s.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [activeId, sections]);

  const isDarkOverlay = React.useMemo(() => {
    const darkIdx = sections.findIndex((s) => s.id === darkSectionId);
    return darkIdx !== -1 && activeIndex >= darkIdx;
  }, [activeIndex, darkSectionId, sections]);

  const text = isDarkOverlay ? "rgba(255,255,255,0.92)" : "rgba(25,25,35,0.88)";
  const textMuted = isDarkOverlay ? "rgba(255,255,255,0.6)" : "rgba(25,25,35,0.6)";
  const bg = isDarkOverlay ? "rgba(30,30,40,0.85)" : "rgba(255,255,255,0.85)";
  const border = isDarkOverlay ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  const shadow = isDarkOverlay
    ? "drop-shadow(0 2px 12px rgba(0,0,0,0.58))"
    : "drop-shadow(0 2px 12px rgba(255,255,255,0.72))";

  const btnSx = React.useMemo(
    () => ({
      color: text,
      bgcolor: bg,
      backdropFilter: "blur(10px)",
      border: "1px solid",
      borderColor: border,
      "&:hover": { bgcolor: isDarkOverlay ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)" },
    }),
    [bg, border, isDarkOverlay, text]
  );

  const scrollToId = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - scrollOffsetPx;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [scrollOffsetPx]
  );

  const jump = React.useCallback(
    (dir: -1 | 1) => {
      if (!sections.length) return;
      let idx = activeIndex + dir;

      if (idx < 0) idx = wrapAround ? sections.length - 1 : 0;
      if (idx > sections.length - 1) idx = wrapAround ? 0 : sections.length - 1;

      scrollToId(sections[idx].id);
    },
    [activeIndex, scrollToId, sections, wrapAround]
  );

  /* Cache section elements for faster scroll handler */
  const elsRef = React.useRef<Array<{ id: string; el: HTMLElement | null }>>([]);

  React.useEffect(() => {
    elsRef.current = sections.map((s) => ({ id: s.id, el: document.getElementById(s.id) }));
    if (!activeId && sections[0]?.id) setActiveId(sections[0].id);
  }, [sections]); // intentionally not depending on activeId

  React.useEffect(() => {
    if (!sections.length) return;

    let raf = 0;

    const pickActive = () => {
      const activationY = scrollOffsetPx + 6;
      let chosen = sections[0].id;

      // refresh nulls lazily in case DOM mounted later
      for (const item of elsRef.current) {
        if (!item.el) item.el = document.getElementById(item.id);
        if (!item.el) continue;

        if (item.el.getBoundingClientRect().top <= activationY) chosen = item.id;
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

  /* ======================= MOBILE UI ======================= */
  if (isMobile) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          filter: shadow,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 999,
            bgcolor: bg,
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: border,
            boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
          }}
        >
          <IconButton size="small" onClick={() => jump(-1)} sx={{ color: text }}>
            <KeyboardArrowUpRoundedIcon sx={{ transform: "rotate(-90deg)" }} />
          </IconButton>

          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <Box
                key={s.id}
                onClick={() => scrollToId(s.id)}
                sx={{
                  width: isActive ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: isActive ? PRISM_GRADIENT : alpha(text, 0.25),
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  cursor: "pointer",
                }}
              />
            );
          })}

          <Typography
            sx={{
              minWidth: 72,
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

          <IconButton size="small" onClick={() => jump(1)} sx={{ color: text }}>
            <KeyboardArrowDownRoundedIcon sx={{ transform: "rotate(-90deg)" }} />
          </IconButton>
        </Stack>
      </Box>
    );
  }

  /* ======================= DESKTOP UI ======================= */
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
          <IconButton size="small" onClick={() => jump(-1)} sx={btnSx}>
            <KeyboardArrowUpRoundedIcon />
          </IconButton>
        </Tooltip>

        <Stack spacing={1.25} sx={{ pl: 0.5 }}>
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
                  "&:hover .label": { opacity: 1, transform: "translateX(2px)" },
                }}
              >
                {/* Dot (locked to perfect circle) */}
                <Box
                  sx={{
                    width: isActive ? 10 : 7,
                    height: isActive ? 10 : 7,
                    minWidth: isActive ? 10 : 7,
                    minHeight: isActive ? 10 : 7,
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    flex: "0 0 auto",
                    boxSizing: "border-box",
                    background: isActive ? PRISM_GRADIENT : "transparent",
                    border: `1px solid ${
                      isActive ? "transparent" : isDarkOverlay ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.22)"
                    }`,
                    boxShadow: isActive
                      ? isDarkOverlay
                        ? "0 0 0 4px rgba(224,195,252,0.16)"
                        : "0 0 0 4px rgba(91,75,117,0.12)"
                      : "none",
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
          <IconButton size="small" onClick={() => jump(1)} sx={btnSx}>
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
