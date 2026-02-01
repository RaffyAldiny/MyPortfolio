"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GlobalStyles from "@mui/material/GlobalStyles";
import { keyframes } from "@emotion/react";
import { useHeaderTheme } from "@/context/HeaderTheme";
import ProjectProgressRail from "@/components/landing/ProjectProgressRail";

/* ================== Data ================== */
const PROJECTS = [
  {
    id: "comparigon",
    title: "COMPARIGON",
    subtitle: "Flagship Platform",
    desc: "A live engine for comparing PC components. Features real-time price tracking, specs visualization, and dynamic benchmarking charts powered by PostgreSQL.",
    tags: ["Next.js", "React", "PostgreSQL"],
    image: "/images/comparigon.png",
    accent: "#FF9A9E",
    link: "https://comparigon.com",
    repo: "#",
  },
  {
    id: "roblox",
    title: "BRAINWAVE",
    subtitle: "Roblox Experience",
    desc: "An immersive 3D game featuring custom physics, multiplayer replication, and Lua-scripted logic layers.",
    tags: ["Lua", "Game Design", "Physics"],
    image: "/images/brainwave_game.png",
    accent: "#a18cd1",
    link: "https://www.roblox.com/games/14363008084/Brainwave",
    repo: "#",
  },
  {
    id: "shopee",
    title: "SHOPEE BOT",
    subtitle: "Automation Tool",
    desc: "High-frequency inventory sync system. Automates order fulfillment via the Shopee Open Platform API.",
    tags: ["Python", "Selenium", "Django"],
    image: "/images/shopee.png",
    accent: "#84fab0",
    link: "#",
    repo: "#",
  },
] as const;

/* ================== Animations ================== */
const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;
const prismDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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

const TITLE_GRADIENT =
  "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
function clamp01(v: number) {
  return clamp(v, 0, 1);
}

/* ================== Styles ================== */
const SX = {
  container: { width: "100%", position: "relative", bgcolor: "#050505" },

  stickySlide: {
    height: "100vh",
    width: "100%",
    position: "sticky",
    top: 0,
    overflow: "hidden",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    alignItems: "flex-end",
    willChange: "transform",
  },

  introSlide: {
    height: "100vh",
    width: "100%",
    position: "sticky",
    top: 0,
    overflow: "hidden",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#050505",
    zIndex: 1,
  },

  introVignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 55%), radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.70) 82%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  introSheen: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    opacity: 0.18,
    backgroundImage:
      "radial-gradient(circle at 35% 35%, rgba(129,236,255,0.25) 0%, transparent 45%), radial-gradient(circle at 70% 55%, rgba(255,138,216,0.22) 0%, transparent 55%)",
    pointerEvents: "none",
  },

  introTitle: {
    fontWeight: 900,
    fontSize: { xs: "4rem", md: "10rem" },
    lineHeight: 0.8,
    textTransform: "uppercase",
    textAlign: "center",
    backgroundImage: TITLE_GRADIENT,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    filter:
      "drop-shadow(0 0 18px rgba(212, 179, 255, 0.30)) drop-shadow(0 10px 30px rgba(0,0,0,0.45))",
  },

  introSub: {
    mt: 4,
    fontWeight: 800,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  projectImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,
  },

  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, #000 0%, rgba(0,0,0,0.82) 40%, rgba(0,0,0,0) 100%)",
    zIndex: 2,
  },

  contentBox: {
    position: "relative",
    zIndex: 3,
    width: "100%",
    maxWidth: "1400px",
    mx: "auto",
    p: { xs: 3, md: 8 },
    pb: { xs: 6, md: 10 },
  },

  projectSubtitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  projectTitle: {
    color: "#fff",
    fontWeight: 900,
    fontSize: { xs: "3rem", md: "8rem" },
    lineHeight: 0.9,
    mb: 3,
    textShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },

  projectDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: { xs: "1rem", md: "1.25rem" },
    maxWidth: "600px",
    lineHeight: 1.6,
    mb: 4,
  },

  btn: {
    borderRadius: "50px",
    py: 1.5,
    px: 4,
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: 800,
    backdropFilter: "blur(10px)",
  },
} as const;

function ProjectSlide({ project, zIndex }: { project: (typeof PROJECTS)[number]; zIndex: number }) {
  return (
    <Box sx={{ ...SX.stickySlide, zIndex, bgcolor: "#000", boxShadow: "0 -20px 50px rgba(0,0,0,0.5)" }}>
      <Box sx={{ ...SX.projectImage, backgroundImage: `url(${project.image})`, transform: "scale(1.1)" }} />
      <Box sx={SX.gradientOverlay} />

      <Box sx={SX.contentBox}>
        <Typography sx={{ ...SX.projectSubtitle, color: project.accent }}>
          <Box component="span" sx={{ width: 40, height: 2, bgcolor: project.accent }} />
          {project.subtitle}
        </Typography>

        <Typography variant="h1" sx={SX.projectTitle}>
          {project.title}
        </Typography>

        <Typography variant="body1" sx={SX.projectDesc}>
          {project.desc}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "#fff",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.2)",
                mb: 1,
              }}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            data-project-cta="1"
            variant="contained"
            endIcon={<ArrowOutwardIcon />}
            sx={{ ...SX.btn, bgcolor: "#fff", color: "#000", "&:hover": { bgcolor: "#e0e0e0" } }}
            href={project.link}
            target="_blank"
          >
            View Project
          </Button>

          {project.repo !== "#" && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{
                ...SX.btn,
                borderColor: "#fff",
                color: "#fff",
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
              }}
              href={project.repo}
              target="_blank"
            >
              Source
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function ProjectsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { setHeaderVisible } = useHeaderTheme();

  const totalSlides = PROJECTS.length + 1; // intro + projects

  const [progress, setProgress] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isInsideProjects, setIsInsideProjects] = React.useState(false);

  // stable absolute bounds of the projects section
  const boundsRef = React.useRef({ startY: 0, endY: 1, height: 1 });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const startY = window.scrollY + rect.top;
      const height = rect.height;

      // endY for visibility range (full container)
      const endY = startY + height;

      boundsRef.current = { startY, endY, height };
    };

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });

    ro.observe(el);
    measure();

    window.addEventListener("resize", measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  React.useEffect(() => {
    let raf = 0;

    const compute = () => {
      const el = containerRef.current;
      if (!el) return;

      const { startY, endY } = boundsRef.current;
      const y = window.scrollY;
      const vh = window.innerHeight;

      // ✅ inside detection based on absolute scroll range, no flicker
      // keep a buffer so sticky snapping never flips it off
      const headerOffset = 80;
      const buffer = Math.round(vh * 0.65);
      const inside = y >= startY - headerOffset - buffer && y <= endY - headerOffset + buffer;

      setIsInsideProjects(inside);
      setHeaderVisible(!inside);

      // ✅ progress based on viewport-height steps (snap accurate)
      // local scroll inside projects section
      const local = clamp(y - startY, 0, (totalSlides - 1) * vh);
      const denom = Math.max(1, (totalSlides - 1) * vh);
      const p = clamp01(local / denom);

      // ✅ active index changes only when you actually reach the next stop
      const idx = clamp(Math.floor(local / vh + 1e-6), 0, totalSlides - 1);

      setProgress(p);
      setActiveIndex(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    compute();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      setHeaderVisible(true);
    };
  }, [setHeaderVisible, totalSlides]);

  const introFade = Math.min(1, progress * 3);
  const introScale = 1 - introFade * 0.1;

  return (
    <>
      <GlobalStyles
        styles={{
          html: {
            scrollSnapType: "y mandatory",
            scrollPaddingTop: "0px",
          },
        }}
      />

      {/* show only inside projects, and hide on intro via your rail component */}
      {isInsideProjects && (
        <ProjectProgressRail progress={progress} activeIndex={activeIndex} totalSlides={totalSlides} />
      )}

      <Box ref={containerRef} sx={SX.container} id="projects">
        <Box sx={SX.introSlide}>
          <Box sx={SX.introVignette} />
          <Box
            aria-hidden
            sx={{
              ...SX.introSheen,
              backgroundSize: "200% 200%",
              animation: reducedMotion ? "none" : `${prismDrift} 8s ease-in-out infinite`,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              transition: "transform 0.1s linear, opacity 0.1s linear",
              transform: `scale(${introScale})`,
              opacity: 1 - introFade,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                ...SX.introTitle,
                animation: reducedMotion ? "none" : `${textShimmer} 3s linear infinite`,
              }}
            >
              WORK
              <br />
              ARCHIVES
            </Typography>

            <Typography sx={SX.introSub}>SCROLL TO EXPLORE</Typography>
          </Box>
        </Box>

        {PROJECTS.map((p, i) => (
          <ProjectSlide key={p.id} project={p} zIndex={2 + i} />
        ))}
      </Box>
    </>
  );
}

export default React.memo(ProjectsSection);
