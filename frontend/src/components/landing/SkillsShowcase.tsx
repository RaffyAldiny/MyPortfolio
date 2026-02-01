"use client";

import * as React from "react";
import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  0% { opacity: 0; transform: scale(1.1) translateY(12px); filter: blur(8px); }
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

/* ================== Grouping Logic ================== */
type GroupKey = "all" | "frontend" | "backend" | "data" | "tools";

const GROUPS: Record<GroupKey, readonly string[]> = {
  all: [],
  frontend: ["React", "NextJS", "TypeScript", "JavaScript", "Vue.js", "Flutter", "Dart", "HTML5", "CSS3", "Sass", "Tailwind CSS", "Material UI"],
  backend: ["Django", "Django Rest", "Laravel", "Node.js", "Python", "PHP", "Java", "C++", "Roblox Luau", "Shopee API"],
  data: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Amazon Redshift", "AWS Glue", "Power BI"],
  tools: ["Git", "Linux", "Figma", "Firebase", "Vercel", "Hostinger", "Unity", "Digital Ocean"],
} as const;

const GROUP_SET: Record<GroupKey, Set<string>> = {
  all: new Set(),
  frontend: new Set(GROUPS.frontend),
  backend: new Set(GROUPS.backend),
  data: new Set(GROUPS.data),
  tools: new Set(GROUPS.tools),
};

/* ================== Prism tokens ================== */
const PRISM_GRADIENT = "linear-gradient(135deg, rgba(255,138,216,0.75), rgba(129,236,255,0.70), rgba(197,152,255,0.70), rgba(125,255,203,0.70))";
const PRISM_GRADIENT_SOFT = "linear-gradient(135deg, rgba(255,138,216,0.35), rgba(129,236,255,0.30), rgba(197,152,255,0.30), rgba(125,255,203,0.30))";
const TITLE_GRADIENT = "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";
const INK = "#0B0B10";

/* ================== Compact Skill Pill ================== */
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
  const baseShadow = `0 4px 14px ${alpha(color, 0.12)}`;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        // Squeezed gap and padding for mobile
        gap: { xs: 0.8, sm: 1.35 },
        px: { xs: 1.2, sm: 2 },
        py: { xs: 0.7, sm: 1.15 },
        borderRadius: { xs: 2.2, sm: 3 },
        position: "relative",
        animation: show && !reducedMotion
            ? `${flyIn} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`
            : "none",
        animationDelay: `${index * 0.03}s`,
        opacity: show || reducedMotion ? 1 : 0,
        backgroundColor: "rgba(255, 255, 255, 0.22)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: baseShadow,
        transition: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px",
          background: `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.8)}, ${alpha(color, 0.2)})`,
          backgroundSize: "200% 200%",
          animation: reducedMotion ? "none" : `${prismRotate} 4s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
      }}
    >
      <Avatar
        src={icon}
        alt={name}
        variant="rounded"
        sx={{
          // Smaller avatar for mobile
          width: { xs: 18, sm: 26 },
          height: { xs: 18, sm: 26 },
          bgcolor: "rgba(255,255,255,0.6)",
          p: { xs: 0.35, sm: 0.45 },
          borderRadius: 1,
        }}
        imgProps={{ style: { objectFit: "contain" } }}
      />
      <Typography
        sx={{
          // Compact text for mobile
          fontSize: { xs: 10, sm: 13 },
          fontWeight: 900,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: fg,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

/* ================== Main Showcase ================== */
export default function SkillsShowcase() {
  const theme = useTheme();
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Box
      ref={containerRef}
      id="skills"
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 12 },
        px: { xs: 1.5, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.25,
          backgroundImage: `
            radial-gradient(rgba(140, 197, 252, 0.45) 1px, transparent 1px),
            radial-gradient(rgba(224, 195, 252, 0.40) 1px, transparent 1px)
          `,
          backgroundSize: { xs: "20px 20px", md: "34px 34px" },
          backgroundPosition: "0 0, 10px 10px",
          maskImage: "radial-gradient(circle at 50% 45%, #000 0%, #000 55%, transparent 90%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ width: "100%", maxWidth: 1100, zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.2rem", sm: "3.5rem", md: "5rem" },
            mb: 1.5,
            textTransform: "uppercase",
            textAlign: "center",
            backgroundImage: TITLE_GRADIENT,
            backgroundSize: "200% auto",
            animation: reducedMotion ? "none" : `${textShimmer} 3s linear infinite`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 12px rgba(212, 179, 255, 0.3))",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-15px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          My Tech Stack
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: alpha(INK, 0.7),
            letterSpacing: 0.1,
            mb: { xs: 3, md: 5 },
            fontSize: { xs: 12, md: 14.5 },
            lineHeight: 1.5,
            maxWidth: 680,
            mx: "auto",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          Modern tools I use to craft clean user interfaces, reliable backends, and scalable production-ready systems.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 4, md: 6 } }}>
          <ToggleButtonGroup
            exclusive
            value={active}
            onChange={(_, v) => v && setActive(v)}
            sx={{
              position: "relative",
              borderRadius: { xs: 3, sm: 999 },
              p: 0.4,
              backgroundColor: "rgba(255,255,255,0.26)",
              border: "1px solid rgba(255,255,255,0.55)",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              justifyContent: "center",
              gap: 0.4,
              width: { xs: "100%", sm: "auto" },

              "& .MuiToggleButton-root": {
                border: 0,
                borderRadius: { xs: 2, sm: 999 },
                textTransform: "uppercase",
                fontWeight: 900,
                letterSpacing: 0.5,
                fontSize: { xs: 9, sm: 11.5 },
                px: { xs: 1.2, sm: 1.75 },
                py: { xs: 0.7, sm: 0.95 },
                flex: { xs: "1 0 30%", sm: "unset" },
                minWidth: { xs: "60px", sm: "auto" },
                color: alpha(INK, 0.6),
                transition: "0.2s",
              },

              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.85)",
                color: INK,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                position: "relative",
              },

              "& .MuiToggleButton-root.Mui-selected::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "1.5px",
                background: PRISM_GRADIENT,
                backgroundSize: "200% 200%",
                animation: reducedMotion ? "none" : `${prismRotate} 4s linear infinite`,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
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
            // Compacter gap for mobile grid
            gap: { xs: 1, sm: 2 },
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