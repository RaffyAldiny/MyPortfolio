"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useHeaderTheme } from "@/context/HeaderTheme";

/* ================== Data ================== */
const PROJECTS = [
  {
    id: "comparigon",
    title: "Comparigon",
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
    title: "Brainwave",
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
    title: "Shopee Bot",
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
const spin = keyframes`
  0% { --rotate: 0deg; }
  100% { --rotate: 360deg; }
`;

const SX = {
  scrollTrack: {
    height: "450vh", 
    width: "100%",
    position: "relative",
    background: "#fff",
  },
  stickyFrame: {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transition: "background-color 0.8s ease", // Smooth Dark Mode switch
  },
  header: {
    textAlign: "center",
    position: "absolute",
    top: "35%", 
    width: "100%",
    zIndex: 5,
    px: 2,
    transition: "all 0.8s ease",
  },
  title: {
    fontWeight: 900,
    fontSize: { xs: "3.5rem", md: "8rem" },
    textTransform: "uppercase",
    lineHeight: 0.9,
    background: "linear-gradient(135deg, #FF9A9E 0%, #A18CD1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 2,
  },
  subtitle: {
    color: "#888", 
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    transition: "color 0.5s ease",
  },
  cardWrapper: {
    position: "absolute",
    width: { xs: "90%", md: "85%" },
    maxWidth: "1200px",
    height: { xs: "55vh", md: "70vh" },
    top: "50%", 
    left: "50%",
    willChange: "transform, opacity",
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)", 
    transformStyle: "preserve-3d",
    p: "3px", 
    borderRadius: "36px",
    background: "linear-gradient(var(--rotate), #FF9A9E, #FECFEF, #E0C3FC, #8EC5FC, #D4FFEC, #FF9A9E)",
    animation: `${spin} 4s linear infinite`,
    "@property --rotate": {
        syntax: "'<angle>'",
        initialValue: "0deg",
        inherits: "false",
    },
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  },
  cardInner: {
    width: "100%",
    height: "100%",
    borderRadius: "33px",
    overflow: "hidden",
    position: "relative",
    background: "#000",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 1.2s ease",
  },
  overlayGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 60%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", 
    p: { xs: 3, md: 6 },
  },
  projectSubtitle: {
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#fff",
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    opacity: 0.9,
  },
  projectTitle: {
    fontWeight: 900,
    fontSize: { xs: "2.5rem", md: "4.5rem" },
    lineHeight: 0.9,
    color: "#fff",
    mb: 2,
    textShadow: "0 4px 20px rgba(0,0,0,0.5)",
  },
  projectDesc: {
    color: "rgba(255,255,255,0.85)", 
    fontSize: { xs: "1rem", md: "1.15rem" },
    lineHeight: 1.6,
    maxWidth: "650px",
    mb: 4,
    fontWeight: 400,
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderTop: "1px solid rgba(255,255,255,0.15)",
    pt: 3,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(4px)",
    fontWeight: 600,
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  btn: {
    borderRadius: "50px",
    py: 1,
    px: 3,
    fontSize: "0.95rem",
    textTransform: "none",
    fontWeight: 700,
  }
} as const;

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

      // 1. Hide Header Logic
      const isInside = top <= 0 && top > -scrollableDistance;
      setHeaderVisible(!isInside);

      if (scrollableDistance <= 0) return;

      let p = scrolled / scrollableDistance;
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

  const activeIndex = Math.min(
    PROJECTS.length - 1,
    Math.floor(progress * PROJECTS.length)
  );

  // --- CINEMATIC SEQUENCE ---
  
  // 1. Dark Mode Phase: Turns black at 15% scroll
  const isDarkPhase = progress > 0.15;
  const currentBg = isDarkPhase ? "#050505" : "#ffffff";

  // 2. Title Fade: Starts fading AFTER dark mode hits (at 20%)
  const titleOpacity = Math.max(0, 1 - (progress - 0.2) * 8);
  const titleScale = 1 + progress * 0.5;
  const titleY = progress * -200;

  // 3. Cards Enter: Start appearing AFTER title fades (at 25%)
  const showCards = progress > 0.25;

  return (
    <Box ref={containerRef} sx={SX.scrollTrack} id="projects">
      <Box sx={{ ...SX.stickyFrame, backgroundColor: currentBg }}>
        
        {/* --- HEADER --- */}
        <Box 
            sx={{ 
                ...SX.header, 
                opacity: titleOpacity, 
                transform: `translateY(${titleY}px) scale(${titleScale})`,
                // Force header to stay visible if we are just starting
                display: progress > 0.4 ? "none" : "block", 
            }}
        >
          <Typography variant="h2" sx={SX.title}>
            My Projects
          </Typography>
          <Typography sx={{ ...SX.subtitle, color: isDarkPhase ? "#888" : "#aaa" }}>
            Selected Works & Archives
          </Typography>
        </Box>

        {/* --- CARDS STACK --- */}
        {PROJECTS.map((project, index) => {
          let transform = "";
          let opacity = 1;
          let zIndex = 0;
          let pointerEvents = "none";

          if (index === activeIndex) {
            transform = "translate(-50%, -50%) scale(1) rotateX(0deg)";
            zIndex = 10;
            opacity = showCards ? 1 : 0;
            pointerEvents = "auto";
          } else if (index > activeIndex) {
            const offset = index - activeIndex;
            transform = `translate(-50%, calc(-50% + ${offset * 50}px)) scale(${1 - offset * 0.05})`;
            zIndex = 10 - offset;
            opacity = showCards ? Math.max(0, 1 - offset * 0.4) : 0;
          } else {
            transform = "translate(-50%, -150%) scale(0.95) rotateX(10deg)";
            zIndex = 0;
            opacity = 0;
          }

          return (
            <Box
              key={project.id}
              sx={{
                ...SX.cardWrapper,
                transform,
                opacity,
                zIndex,
                pointerEvents,
              }}
            >
              <Box sx={SX.cardInner}>
                
                {/* Image */}
                <Box 
                    sx={{ 
                        ...SX.bgImage,
                        backgroundImage: `url(${project.image})`,
                        backgroundColor: "#111",
                        transform: index === activeIndex ? "scale(1.05)" : "scale(1)",
                    }} 
                />

                {/* Text Overlay */}
                <Box sx={SX.overlayGradient}>
                   
                   <Box>
                       <Typography sx={{ ...SX.projectSubtitle, color: project.accent }}>
                           <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: project.accent }} />
                           {project.subtitle}
                       </Typography>

                       <Typography variant="h3" sx={SX.projectTitle}>
                           {project.title}
                       </Typography>

                       <Typography variant="body1" sx={SX.projectDesc}>
                           {project.desc}
                       </Typography>
                   </Box>

                   <Box sx={SX.actionRow}>
                        <Stack direction="row" gap={1} flexWrap="wrap">
                            {project.tags.map(tag => (
                                <Chip key={tag} label={tag} size="small" sx={SX.chip} />
                            ))}
                        </Stack>

                        <Stack direction="row" gap={1}>
                            <Button 
                                variant="contained" 
                                endIcon={<ArrowOutwardIcon />} 
                                sx={{ ...SX.btn, bgcolor: "#fff", color: "#000", "&:hover": { bgcolor: "#f0f0f0" } }}
                                href={project.link}
                                target="_blank"
                            >
                                Open
                            </Button>
                            
                            {project.repo !== "#" && (
                                <Button 
                                    variant="outlined" 
                                    startIcon={<GitHubIcon />} 
                                    sx={{ ...SX.btn, borderColor: "rgba(255,255,255,0.4)", color: "#fff", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
                                    href={project.repo}
                                >
                                    Code
                                </Button>
                            )}
                        </Stack>
                   </Box>

                </Box>
              </Box>
            </Box>
          );
        })}

      </Box>
    </Box>
  );
}

export default React.memo(ProjectsSection);