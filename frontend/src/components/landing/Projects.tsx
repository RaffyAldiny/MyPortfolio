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

  // INTRO SLIDE
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
    bgcolor: "#fff",
    zIndex: 1, 
  },

  introTitle: {
    fontWeight: 900,
    fontSize: { xs: "4rem", md: "10rem" },
    lineHeight: 0.8,
    textTransform: "uppercase",
    background: "linear-gradient(135deg, #FF9A9E 0%, #A18CD1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
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
    background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)",
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
    fontWeight: 700,
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
  }
} as const;

/* ================== Component ================== */
function ProjectsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const { setHeaderVisible } = useHeaderTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const start = top; 
      const totalDistance = height - viewportHeight;
      let p = -start / totalDistance;

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
  const introScale = 1 - (introFade * 0.1);    

  return (
    <>
      <GlobalStyles styles={{
        html: { 
          scrollSnapType: "y mandatory", 
          scrollPaddingTop: "0px"
        } 
      }} />

      <Box ref={containerRef} sx={SX.container} id="projects">
        
        {/* Progress Bar */}
        <Box sx={{ 
            ...SX.progressBarContainer, 
            opacity: progress > 0 && progress < 1 ? 1 : 0 
        }}>
            <Box sx={{ ...SX.progressBarFill, height: `${progress * 100}%` }} />
        </Box>

        {/* --- SLIDE 1: INTRO --- */}
        <Box sx={SX.introSlide}>
           <Box sx={{ 
              transition: "transform 0.1s linear, opacity 0.1s linear",
              transform: `scale(${introScale})`,
              opacity: 1 - introFade,
              textAlign: "center"
           }}>
              <Typography sx={SX.introTitle}>
                  WORK<br/>ARCHIVES
              </Typography>
              <Typography sx={{ mt: 4, fontWeight: 600, color: "#888", letterSpacing: 2 }}>
                  SCROLL TO EXPLORE
              </Typography>
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
                        zIndex: zIndex,
                        bgcolor: "#000", 
                        boxShadow: "0 -20px 50px rgba(0,0,0,0.5)"
                    }}
                >
                    <Box 
                        sx={{ 
                            ...SX.projectImage, 
                            backgroundImage: `url(${project.image})`,
                            transform: "scale(1.1)" 
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
                        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                            {project.tags.map(tag => (
                                <Chip 
                                    key={tag} 
                                    label={tag} 
                                    sx={{ 
                                        bgcolor: "rgba(255,255,255,0.1)", 
                                        color: "#fff", 
                                        backdropFilter: "blur(5px)",
                                        border: "1px solid rgba(255,255,255,0.2)"
                                    }} 
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Button 
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
                                    sx={{ ...SX.btn, borderColor: "#fff", color: "#fff", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
                                    href={project.repo}
                                >
                                    Source
                                </Button>
                            )}
                        </Stack>
                    </Box>
                </Box>
            );
        })}
        {/* Spacer Removed - Handled by Footer in page.tsx */}
      </Box>
    </>
  );
}

export default React.memo(ProjectsSection);