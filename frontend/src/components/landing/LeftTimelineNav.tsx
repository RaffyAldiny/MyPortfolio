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
  sections: ReadonlyArray<SectionItem>;
  activeId: string;
  onSelect: (id: string) => void;
  hidden?: boolean;
  wrapAround?: boolean;
};

const ACTIVE_GREEN = "#1CDB2F";
const ACTIVE_GREEN_DARK = "#0F5E19";
const SOFT_GREEN = "#79D883";

export default function LeftTimelineNav({
  sections,
  activeId,
  onSelect,
  hidden = false,
  wrapAround = true,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const activeIndex = React.useMemo(() => {
    const index = sections.findIndex((section) => section.id === activeId);
    return index >= 0 ? index : 0;
  }, [activeId, sections]);

  const text = "#1A4721";
  const textMuted = alpha(ACTIVE_GREEN_DARK, 0.82);
  const activeText = ACTIVE_GREEN;
  const bg = "rgba(255,255,255,0.92)";
  const border = alpha(ACTIVE_GREEN, 0.22);
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

  const jump = React.useCallback(
    (dir: -1 | 1) => {
      if (!sections.length) return;

      let index = activeIndex + dir;
      if (index < 0) index = wrapAround ? sections.length - 1 : 0;
      if (index > sections.length - 1) index = wrapAround ? 0 : sections.length - 1;

      onSelect(sections[index].id);
    },
    [activeIndex, onSelect, sections, wrapAround]
  );

  if (hidden) {
    return null;
  }

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

  if (isMobile) {
    return (
      <Box
        sx={{
          position: "absolute",
          zIndex: 9999,
          bottom: "calc(18px + env(safe-area-inset-bottom))",
          left: "50%",
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
                onClick={() => onSelect(section.id)}
                role="button"
                tabIndex={0}
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

  return (
    <Box
      sx={{
        position: "absolute",
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
                onClick={() => onSelect(section.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    onSelect(section.id);
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
                <Box
                  sx={{
                    width: isActive ? 10 : 7,
                    height: isActive ? 10 : 7,
                    minWidth: isActive ? 10 : 7,
                    minHeight: isActive ? 10 : 7,
                    borderRadius: "999px",
                    display: "inline-block",
                    flexShrink: 0,
                    background: isActive ? ACTIVE_GREEN : "transparent",
                    border: `1px solid ${
                      isActive
                        ? alpha(ACTIVE_GREEN, 0.5)
                        : alpha(ACTIVE_GREEN_DARK, 0.42)
                    }`,
                    boxShadow: isActive ? "0 0 0 3px rgba(28,219,47,0.1)" : "none",
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
