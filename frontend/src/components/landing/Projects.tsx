"use client";

import * as React from "react";
import Image from "next/image";
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
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

const PROJECTS = [
  {
    id: "comparigon",
    title: "COMPARIGON",
    subtitle: "Device Intelligence Platform",
    desc: "A comparison platform for smartphones, chipsets, and mobile hardware with structured specs, benchmark-focused browsing, and fast category navigation for side-by-side research.",
    tags: [
      "Laravel",
      "Alpine JS",
      "Livewire",
      "Tailwind CSS",
      "DigitalOcean",
      "Filament",
      "MySQL",
      "Cloudflare",
      "Blade",
      "SEO Optimized",
    ],
    image: "/images/comparigon.avif",
    accent: "#FF9B7A",
    link: "https://comparigon.com",
    repo: null,
  },
  {
    id: "polylayer",
    title: "POLYLAYER",
    subtitle: "Knowledge Platform",
    desc: "A 3D printer knowledge and catalog platform focused on structured descriptions, searchable product listings, comparison views, and detailed specification browsing for hardware research.",
    tags: ["Next.js", "Django REST", "PostgreSQL", "Material UI"],
    image: "/images/polylayer.avif",
    accent: "#C6D0DB",
    link: null,
    repo: null,
  },
  {
    id: "academic-management-system",
    title: "ACADEMIC MS",
    subtitle: "Campus Operations Portal",
    desc: "An academic operations portal that brings announcements, calendars, library modules, and student service workflows into one admin-focused system for campus management.",
    tags: ["Laravel", "Filament", "MySQL"],
    image: "/images/academic-management-system.avif",
    accent: "#88A8FF",
    link: null,
    repo: null,
  },
  {
    id: "edubridge",
    title: "EDUBRIDGE",
    subtitle: "Student / Professional Network",
    desc: "A role-based academic networking platform that connects students and professionals through separate account flows, structured onboarding, and school-to-career interaction paths.",
    tags: ["Laravel", "MySQL", "Role-Based Auth"],
    image: "/images/edubridge.avif",
    accent: "#6AD5FF",
    link: null,
    repo: null,
  },
  {
    id: "paws-and-promises",
    title: "PAWS & PROMISES",
    subtitle: "Adoption Campaign Site",
    desc: "A pet adoption platform designed to showcase adoptable animals, communicate shelter advocacy clearly, and guide visitors toward adoption, volunteering, and community support actions.",
    tags: ["Next.js", "Django", "Adoption Platform"],
    image: "/images/paws-and-promises.avif",
    accent: "#FFD84D",
    link: null,
    repo: null,
  },
  {
    id: "brainwave",
    title: "BRAINWAVE",
    subtitle: "Roblox Quiz Experience",
    desc: "A Roblox trivia-platformer that mixes timed quiz prompts, obstacle progression, and HUD-driven gameplay into a fast-paced multiplayer-friendly learning game loop.",
    tags: ["Roblox", "Luau", "Game Systems"],
    image: "/images/brainwave-game.avif",
    accent: "#a18cd1",
    link: "https://www.roblox.com/games/14363008084/Brainwave",
    repo: null,
  },
] as const;

const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const prismDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const TITLE_GRADIENT =
  "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function clamp01(v: number) {
  return clamp(v, 0, 1);
}

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
  projectImageFrame: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    overflow: "hidden",
    willChange: "transform",
  },
  projectImageInner: {
    position: "relative",
    width: "100%",
    height: "100%",
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

const ProjectSlide = React.memo(function ProjectSlide({
  project,
  zIndex,
  isPriority,
}: {
  project: (typeof PROJECTS)[number];
  zIndex: number;
  isPriority: boolean;
}) {
  return (
    <Box
      sx={{
        ...SX.stickySlide,
        zIndex,
        bgcolor: "#000",
        boxShadow: "0 -20px 50px rgba(0,0,0,0.5)",
      }}
      data-project-slide
    >
      <Box sx={SX.projectImageFrame} data-project-image>
        <Box sx={SX.projectImageInner}>
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="100vw"
            quality={82}
            priority={isPriority}
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>
      <Box sx={SX.gradientOverlay} />

      <Box sx={SX.contentBox} data-project-content>
        <Typography sx={{ ...SX.projectSubtitle, color: project.accent }}>
          <Box
            component="span"
            sx={{ width: 40, height: 2, bgcolor: project.accent, transformOrigin: "left center" }}
            data-project-line
          />
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
              data-project-tag
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

        <Stack direction="row" spacing={2} data-project-actions>
          {project.link ? (
            <Button
              data-project-cta="1"
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
          ) : (
            <Button
              data-project-cta="1"
              variant="contained"
              disabled
              sx={{
                ...SX.btn,
                bgcolor: "rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Private Build
            </Button>
          )}

          {project.repo ? (
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
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
});

function ProjectsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { setHeaderVisible } = useHeaderTheme();

  const totalSlides = PROJECTS.length + 1;

  const [progress, setProgress] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isInsideProjects, setIsInsideProjects] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        const introPanel = container.querySelector<HTMLElement>('[data-project-intro="panel"]');
        const introCopy = gsap.utils.toArray<HTMLElement>('[data-project-intro="copy"]');
        const projectSlides = gsap.utils.toArray<HTMLElement>("[data-project-slide]");

        if (introCopy.length) {
          gsap.fromTo(
            introCopy,
            { y: 26, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: container,
                start: "top 75%",
                once: true,
              },
            }
          );
        }

        if (introPanel) {
          gsap.to(introPanel, {
            scale: 0.9,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=100%",
              scrub: true,
            },
          });
        }

        projectSlides.forEach((slide) => {
          const image = slide.querySelector<HTMLElement>("[data-project-image]");
          const content = slide.querySelector<HTMLElement>("[data-project-content]");
          const line = slide.querySelector<HTMLElement>("[data-project-line]");
          const tags = slide.querySelectorAll<HTMLElement>("[data-project-tag]");
          const actions = slide.querySelector<HTMLElement>("[data-project-actions]");

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.18 },
              {
                scale: 1.02,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { y: 80, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 78%",
                  end: "top 42%",
                  scrub: true,
                },
              }
            );
          }

          if (line) {
            gsap.fromTo(
              line,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (tags.length) {
            gsap.fromTo(
              tags,
              { y: 14, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.35,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 62%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (actions) {
            gsap.fromTo(
              actions,
              { y: 18, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.45,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }

      const syncProgress = (self: ScrollTrigger) => {
        const nextProgress = clamp01(self.progress);
        const nextIndex = clamp(
          Math.floor(nextProgress * (totalSlides - 1) + 1e-4),
          0,
          totalSlides - 1
        );

        setProgress((current) =>
          Math.abs(current - nextProgress) > 0.001 ? nextProgress : current
        );
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      };

      const headerTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => {
          setHeaderVisible(!isActive);
        },
      });

      const sectionTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => {
          setIsInsideProjects(true);
        },
        onEnterBack: () => {
          setIsInsideProjects(true);
        },
        onLeave: () => {
          setIsInsideProjects(false);
        },
        onLeaveBack: () => {
          setIsInsideProjects(false);
        },
        onUpdate: syncProgress,
      });

      const active = sectionTrigger.isActive;
      setIsInsideProjects(active);
      setHeaderVisible(!headerTrigger.isActive);
      syncProgress(sectionTrigger);
    }, container);

    return () => {
      setHeaderVisible(true);
      ctx.revert();
    };
  }, [reducedMotion, setHeaderVisible, totalSlides]);

  const introFade = reducedMotion ? 0 : Math.min(1, progress * 3);
  const introScale = reducedMotion ? 1 : 1 - introFade * 0.1;

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
            data-project-intro="panel"
          >
            <Typography
              sx={{
                ...SX.introTitle,
                animation: reducedMotion ? "none" : `${textShimmer} 3s linear infinite`,
              }}
              data-project-intro="copy"
            >
              WORK
              <br />
              ARCHIVES
            </Typography>

            <Typography sx={SX.introSub} data-project-intro="copy">
              SCROLL TO EXPLORE
            </Typography>
          </Box>
        </Box>

        {PROJECTS.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            zIndex={2 + index}
            isPriority={index === 0}
          />
        ))}
      </Box>
    </>
  );
}

export default React.memo(ProjectsSection);
