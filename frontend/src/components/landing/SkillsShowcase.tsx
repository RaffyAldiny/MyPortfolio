// src/components/landing/SkillsShowcase.tsx
"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { SKILLS, type Skill } from "@/constants/skills";

/* ================== Animations ================== */
const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const prismRotate = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const flyIn = keyframes`
  0% { opacity: 0; transform: scale(1.12) translateY(18px); filter: blur(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
`;

/* ================== Reduced motion ================== */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);

    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

/* ================== Grouping ================== */
type GroupKey = "all" | "frontend" | "backend" | "data" | "tools";

const GROUPS: Record<GroupKey, readonly string[]> = {
  all: [],
  frontend: [
    "React",
    "NextJS",
    "TypeScript",
    "JavaScript",
    "Vue.js",
    "Flutter",
    "Dart",
    "HTML5",
    "CSS3",
    "Sass",
    "Tailwind CSS",
    "Material UI",
  ],
  backend: [
    "Django",
    "Django Rest",
    "Laravel",
    "Node.js",
    "Python",
    "PHP",
    "Java",
    "C++",
    "Roblox Luau",
    "Shopee API",
  ],
  data: [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQLite",
    "Amazon Redshift",
    "AWS Glue",
    "Power BI",
  ],
  tools: ["Git", "Linux", "Figma", "Firebase", "Vercel", "Hostinger", "Unity", "Digital Ocean"],
} as const;

// Precompute sets once (faster + cleaner than new Set() per filter)
const GROUP_SET: Record<GroupKey, Set<string>> = {
  all: new Set(),
  frontend: new Set(GROUPS.frontend),
  backend: new Set(GROUPS.backend),
  data: new Set(GROUPS.data),
  tools: new Set(GROUPS.tools),
};

/* ================== Prism tokens ================== */
const PRISM_GRADIENT =
  "linear-gradient(135deg, rgba(255,138,216,0.75), rgba(129,236,255,0.70), rgba(197,152,255,0.70), rgba(125,255,203,0.70))";
const PRISM_GRADIENT_SOFT =
  "linear-gradient(135deg, rgba(255,138,216,0.35), rgba(129,236,255,0.30), rgba(197,152,255,0.30), rgba(125,255,203,0.30))";

const TITLE_GRADIENT = "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";
const INK = "#0B0B10";

/* ================== Pill ================== */
function SkillPill({
  skill,
  index,
  show,
  reducedMotion,
}: {
  skill: Skill;
  index: number;
  show: boolean;
  reducedMotion: boolean;
}) {
  const { name, color, textColor, icon } = skill;
  const fg = textColor ?? "#2D2D3A";

  const baseShadow = `0 4px 18px ${alpha(color, 0.14)}`;
  const hoverShadow = `0 12px 30px ${alpha(color, 0.26)}`;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.35,
        px: 2,
        py: 1.15,
        borderRadius: 3,
        position: "relative",

        animation: show && !reducedMotion ? `${flyIn} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards` : "none",
        animationDelay: `${index * 0.035}s`,
        opacity: show || reducedMotion ? 1 : 0,

        backgroundColor: "rgba(255, 255, 255, 0.22)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: baseShadow,
        transition: reducedMotion ? "none" : "transform 0.2s ease, box-shadow 0.2s ease",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "2px",
          background: `linear-gradient(135deg, ${alpha(color, 0.22)}, ${alpha(color, 0.85)}, ${alpha(
            color,
            0.22
          )})`,
          backgroundSize: "200% 200%",
          animation: reducedMotion ? "none" : `${prismRotate} 4s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },

        "&:hover": reducedMotion
          ? undefined
          : {
              transform: "translateY(-3px) scale(1.03)",
              boxShadow: hoverShadow,
              zIndex: 10,
            },

        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none", boxShadow: baseShadow },
        },
      }}
    >
      <Avatar
        src={icon}
        alt={name}
        variant="rounded"
        sx={{
          width: 26,
          height: 26,
          bgcolor: "rgba(255,255,255,0.6)",
          p: 0.45,
          borderRadius: 1.4,
        }}
        imgProps={{ style: { objectFit: "contain" } }}
      />
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: 0.55,
          textTransform: "uppercase",
          color: fg,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

/* ================== Main ================== */
export default function SkillsShowcase() {
  const reducedMotion = usePrefersReducedMotion();

  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState<GroupKey>("all");

  const filtered = React.useMemo(() => {
    if (active === "all") return SKILLS;
    const allowed = GROUP_SET[active];
    return SKILLS.filter((s) => allowed.has(s.name));
  }, [active]);

  React.useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        py: { xs: 10, md: 12 },
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background texture */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.28,
          backgroundImage: `
            radial-gradient(rgba(140, 197, 252, 0.45) 1px, transparent 1px),
            radial-gradient(rgba(224, 195, 252, 0.40) 1px, transparent 1px)
          `,
          backgroundSize: "34px 34px, 40px 40px",
          backgroundPosition: "0 0, 12px 16px",
          maskImage: "radial-gradient(circle at 50% 45%, #000 0%, #000 55%, transparent 78%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ width: "100%", maxWidth: 1100, zIndex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "3rem", md: "5rem" },
            mb: 2,
            textTransform: "uppercase",
            textAlign: "center",
            backgroundImage: TITLE_GRADIENT,
            backgroundSize: "200% auto",
            animation: reducedMotion ? "none" : `${textShimmer} 3s linear infinite`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 15px rgba(212, 179, 255, 0.35))",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none" },
          }}
        >
          My Tech Stack
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: alpha(INK, 0.75),
            letterSpacing: 0.25,
            mb: 3.5,
            fontSize: { xs: 13.5, md: 14.5 },
            lineHeight: 1.75,
            maxWidth: 760,
            mx: "auto",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          These tools are my bestfriends to build modern websites and systems, covering everything from clean user
          interfaces to reliable backends, databases, and production-ready deployments.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ToggleButtonGroup
            exclusive
            value={active}
            onChange={(_, v) => v && setActive(v)}
            sx={{
              position: "relative",
              borderRadius: 999,
              p: 0.6,
              backgroundColor: "rgba(255,255,255,0.26)",
              border: "1px solid rgba(255,255,255,0.55)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",

              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "2px",
                background: PRISM_GRADIENT_SOFT,
                backgroundSize: "200% 200%",
                animation: reducedMotion ? "none" : `${prismRotate} 6.5s linear infinite`,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
                opacity: 0.75,
              },

              "& .MuiToggleButtonGroup-grouped": { border: 0, margin: 0 },

              "& .MuiToggleButton-root": {
                border: 0,
                borderRadius: 999,
                textTransform: "uppercase",
                fontWeight: 900,
                letterSpacing: 0.6,
                fontSize: 11.5,
                px: { xs: 1.2, sm: 1.75 },
                py: 0.95,
                color: alpha(INK, 0.62),
                backgroundColor: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                transition: reducedMotion
                  ? "none"
                  : "transform 0.18s ease, background-color 0.18s ease, color 0.18s ease",
              },

              "& .MuiToggleButton-root:hover": {
                backgroundColor: "rgba(255,255,255,0.42)",
                transform: reducedMotion ? "none" : "translateY(-1px)",
              },

              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.82)",
                color: INK,
                boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
                position: "relative",
              },

              "& .MuiToggleButton-root.Mui-selected::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                padding: "2px",
                background: PRISM_GRADIENT,
                backgroundSize: "200% 200%",
                animation: reducedMotion ? "none" : `${prismRotate} 4.5s linear infinite`,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
                opacity: 0.95,
              },

              "@media (prefers-reduced-motion: reduce)": {
                "&, & *": { animation: "none !important", transition: "none !important" },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="frontend">Frontend</ToggleButton>
            <ToggleButton value="backend">Backend</ToggleButton>
            <ToggleButton value="data">Data</ToggleButton>
            <ToggleButton value="tools">Tools</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            maxWidth: 1000,
            width: "100%",
            mx: "auto",
          }}
        >
          {filtered.map((skill, i) => (
            <SkillPill
              key={skill.name}
              skill={skill}
              index={i}
              show={isVisible}
              reducedMotion={reducedMotion}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
