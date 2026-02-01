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
];

/* ================== Animations ================== */
const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

/* Optional: slow prism drift for subtle depth */
const prismDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

/* ================== Tokens ================== */
const TITLE_GRADIENT = "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";

/* ================== Styles ================== */
const SX = {
  container: {
    width: "100%",
    position: "relative",
    bgcolor: "#050505",
  },

  // STICKY SLIDE
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

  // INTRO SLIDE (dark)
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

  introTitle: {
    fontWeight: 900,
    fontSize: { xs: "4rem", md: "10rem" },
    lineHeight: 0.8,
    textTransform: "uppercase",
    textAlign: "center",

    // shimmer text like TechStack
    backgroundImage: TITLE_GRADIENT,
    backgroundSize: "200% auto",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",

    // glow
    filter: "drop-shadow(0 0 18px rgba(212, 179, 255, 0.30)) drop-shadow(0 10px 30px rgba(0,0,0,0.45))",
  },

  introSub: {
    mt: 4,
    fontWeight: 800,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  // subtle moving top sheen (optional)
  introSheen: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    opacity: 0.18,
    backgroundImage:
      "radial-gradient(circle at 35% 35%, rgba(129,236,255,0.25) 0%, transparent 45%), radial-gradient(circle at 70% 55%, rgba(255,138,216,0.22) 0%, transparent 55%)",
    pointerEvents: "none",
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
    background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.82) 40%, rgba(0,0,0,0) 100%)",
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

  progressBarContainer: {
    position: "fixed",
    right: { xs: 20, md: 40 },
    top: "50%",
    transform: "translateY(-50%)",
    height: "200px",
    width: "4px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "4px",
    zIndex: 100,
    overflow: "hidden",
    transition: "opacity 0.3s ease",
  },

  progressBarFill: {
    width: "100%",
    background: "linear-gradient(to bottom, #FF9A9E, #A18CD1)",
    borderRadius: "4px",
    transition: "height 0.2s linear",
  },
} as const;

/* ================== Component ================== */
function ProjectsSection() {
  const reducedMotion = usePrefersReducedMotion();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const { setHeaderVisible } = useHeaderTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalDistance = height - viewportHeight;
      let p = -top / totalDistance;

      // Header Visibility
      const isInside = top <= 50 && top > -(height - viewportHeight - 50);
      setHeaderVisible(!isInside);

      if (p < 0) p = 0;
      if (p > 1) p = 1;
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setHeaderVisible(true);
    };
  }, [setHeaderVisible]);

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

      <Box ref={containerRef} sx={SX.container} id="projects">
        {/* Progress Bar */}
        <Box
          sx={{
            ...SX.progressBarContainer,
            opacity: progress > 0 && progress < 1 ? 1 : 0,
          }}
        >
          <Box sx={{ ...SX.progressBarFill, height: `${progress * 100}%` }} />
        </Box>

        {/* --- SLIDE 1: INTRO (DARK + SHIMMER) --- */}
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

        {/* --- PROJECT SLIDES --- */}
        {PROJECTS.map((project, index) => {
          const zIndex = 2 + index;
          return (
            <Box
              key={project.id}
              sx={{
                ...SX.stickySlide,
                zIndex,
                bgcolor: "#000",
                boxShadow: "0 -20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <Box
                sx={{
                  ...SX.projectImage,
                  backgroundImage: `url(${project.image})`,
                  transform: "scale(1.1)",
                }}
              />
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
                    variant="contained"
                    endIcon={<ArrowOutwardIcon />}
                    sx={{
                      ...SX.btn,
                      bgcolor: "#fff",
                      color: "#000",
                      "&:hover": { bgcolor: "#e0e0e0" },
                    }}
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
        })}
      </Box>
    </>
  );
}

export default React.memo(ProjectsSection);
