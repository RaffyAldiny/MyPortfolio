"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
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
  // 1. SCROLL TRACK: 800vh = Huge height. 
  // This creates the "Resistance". You have to scroll a long way to move slides.
  scrollTrack: {
    height: "800vh", 
    width: "100%",
    position: "relative",
    background: "#050505",
  },

  // 2. STICKY VIEWPORT
  stickyViewport: {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },

  // 3. INTRO LAYER (The Cover)
  introLayer: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    zIndex: 10, // Sits below the projects (which are 20+)
    willChange: "transform, opacity, filter",
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

  // 4. PROJECT CARD
  projectCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    willChange: "transform",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    // Adding a subtle shadow to separate layers
    boxShadow: "0 -50px 100px rgba(0,0,0,0.5)", 
  },

  // Image Layer
  projectImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,
    transition: "transform 0.1s linear", 
  },

  // Gradient Overlay
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)",
    zIndex: 2,
  },

  // Content
  contentBox: {
    position: "relative",
    zIndex: 3,
    width: "100%",
    maxWidth: "1400px",
    mx: "auto",
    p: { xs: 3, md: 8 },
    pb: { xs: 6, md: 10 },
  },

  // Typography
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

  // Buttons
  btn: {
    borderRadius: "50px",
    py: 1.5,
    px: 4,
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: 700,
    backdropFilter: "blur(10px)",
  },

  // --- INDICATOR (Progress Bar) ---
  progressBarContainer: {
    position: "absolute",
    right: { xs: 20, md: 40 },
    top: "50%",
    transform: "translateY(-50%)",
    height: "200px",
    width: "4px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "4px",
    zIndex: 100,
    overflow: "hidden",
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
      
      const scrolled = -top;
      const scrollableDistance = height - viewportHeight;

      // Header Hiding Logic
      const isInside = top <= 0 && top > -scrollableDistance;
      setHeaderVisible(!isInside);

      if (scrollableDistance <= 0) return;

      let p = scrolled / scrollableDistance;
      // Clamp logic
      if (p < 0) p = 0;
      if (p > 1) p = 1;

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => {
        window.removeEventListener("scroll", handleScroll);
        setHeaderVisible(true);
    };
  }, [setHeaderVisible]);

  // --- LOGIC: Resistance & Stacking ---
  
  // Total Slides = Intro (1) + Projects (3) = 4 steps total
  const totalSlides = PROJECTS.length + 1;
  
  // "rawStep" goes from 0.0 to 4.0
  const rawStep = progress * totalSlides; 

  return (
    <Box ref={containerRef} sx={SX.scrollTrack} id="projects">
      <Box sx={SX.stickyViewport}>
        
        {/* 1. PROGRESS INDICATOR (Right Side) */}
        <Box sx={SX.progressBarContainer}>
            <Box sx={{ ...SX.progressBarFill, height: `${progress * 100}%` }} />
        </Box>

        {/* 2. INTRO SLIDE (The "Cover") */}
        {/* Improvement: Instead of sliding UP, we Scale Down and Fade Dark.
            This makes it feel like the first project is sliding OVER it.
        */}
        <Box 
            sx={{ 
                ...SX.introLayer,
                // Scale down slightly as we scroll past 0
                transform: rawStep > 0 ? `scale(${Math.max(0.9, 1 - rawStep * 0.1)})` : "scale(1)",
                // Fade to black (opacity reduction)
                filter: `brightness(${Math.max(0.2, 1 - rawStep)})`, 
            }}
        >
            <Typography sx={SX.introTitle}>
                WORK<br/>ARCHIVES
            </Typography>
            <Typography sx={{ mt: 4, fontWeight: 600, color: "#888", letterSpacing: 2 }}>
                SCROLL TO BEGIN
            </Typography>
        </Box>

        {/* 3. PROJECT SLIDES */}
        {PROJECTS.map((project, index) => {
            // Project 0 is actually Slide 1 (Slide 0 is Intro)
            const slideIndex = index + 1; 
            
            // --- Slide Logic ---
            // We want a "Harder" scroll. 
            // The card should start sliding in when rawStep reaches (slideIndex - 1).
            // It should finish sliding in when rawStep reaches (slideIndex).
            
            let translateY = 100; // Default: Below screen
            
            if (rawStep >= slideIndex) {
                translateY = 0; // Finished: Locked on screen
            } else if (rawStep > slideIndex - 1) {
                // Sliding In:
                const slideProgress = rawStep - (slideIndex - 1);
                // We use linear here because the "Resistance" comes from the huge scrollTrack height
                translateY = 100 * (1 - slideProgress); 
            }

            // Parallax for Image
            // Image moves slightly slower than the card for depth
            const imageParallax = (rawStep - slideIndex) * 15; 

            // Z-Index: 20, 21, 22... ensures proper stacking
            const zIndex = 20 + index; 

            return (
                <Box
                    key={project.id}
                    sx={{
                        ...SX.projectCard,
                        zIndex: zIndex,
                        transform: `translateY(${translateY}%)`,
                        // Smooth out the movement just a tiny bit, but rely mostly on scroll
                        transition: "transform 0.1s linear", 
                    }}
                >
                    {/* Background Image */}
                    <Box 
                        sx={{ 
                            ...SX.projectImage, 
                            backgroundImage: `url(${project.image})`,
                            // Parallax effect: Moves slightly up/down based on scroll
                            transform: `scale(1.1) translateY(${imageParallax}%)` 
                        }} 
                    />
                    
                    {/* Cinematic Gradient */}
                    <Box sx={SX.gradientOverlay} />

                    {/* Text Content */}
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

      </Box>
    </Box>
  );
}

export default React.memo(ProjectsSection);