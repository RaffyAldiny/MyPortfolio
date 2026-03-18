"use client";

import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useMediaQuery, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
    video: {
      desktop: "/videos/projects/Comparigon-Desktop.mp4",
      mobile: "/videos/projects/Comparigon-Mobile.mp4",
    },
    accent: "#1CDB2F",
    link: "https://comparigon.com",
    repo: null,
  },
  {
    id: "brainwave",
    title: "BRAINWAVE",
    subtitle: "Roblox Quiz Experience",
    desc: "A Roblox trivia-platformer that mixes timed quiz prompts, obstacle progression, and HUD-driven gameplay into a fast-paced multiplayer-friendly learning game loop.",
    tags: ["Roblox", "Luau", "Game Systems"],
    image: "/images/brainwave-game.avif",
    video: {
      desktop: "/videos/projects/Brainwave-Desktop.mp4",
      mobile: "/videos/projects/Brainwave-Mobile.mp4",
    },
    accent: "#0C7A19",
    link: "https://www.roblox.com/games/14363008084/Brainwave",
    repo: null,
  },
  {
    id: "polylayer",
    title: "POLYLAYER",
    subtitle: "Knowledge Platform",
    desc: "A 3D printer knowledge and catalog platform focused on structured descriptions, searchable product listings, comparison views, and detailed specification browsing for hardware research.",
    tags: ["Next.js", "Django REST", "PostgreSQL", "Material UI"],
    image: "/images/polylayer.avif",
    video: {
      desktop: "/videos/projects/Polylayer-Desktop.mp4",
      mobile: "/videos/projects/Polylayer-Mobile.mp4",
    },
    accent: "#74F067",
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
    video: {
      desktop: "/videos/projects/AMS%20-%20DESKTOP.mp4",
      mobile: "/videos/projects/AMS%20-%20MOBILE.mp4",
    },
    accent: "#16B728",
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
    video: {
      desktop: "/videos/projects/Edubridge-Desktop.mp4",
      mobile: "/videos/projects/Edubridge-Mobile.mp4",
    },
    accent: "#2CCF3D",
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
    video: {
      desktop: "/videos/projects/Paws-and-Promises-Desktop.mp4?v=20260319",
      mobile: "/videos/projects/Paws-and-Promises-Mobile.mp4?v=20260319",
    },
    accent: "#9AF58E",
    link: null,
    repo: null,
  },
] as const;

const archivePulse = keyframes`
  0% {
    opacity: 0.92;
    transform: translate3d(0, 0, 0) scale(0.986);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -2px, 0) scale(1.018);
  }
  100% {
    opacity: 0.92;
    transform: translate3d(0, 0, 0) scale(0.986);
  }
`;

const prismDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const NEON_GREEN = "#B8FF9D";
const DARK_GREEN_SHADOW = "rgba(4, 24, 8, 0.24)";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function clamp01(v: number) {
  return clamp(v, 0, 1);
}

const SX = {
  container: {
    width: "100%",
    position: "relative",
    bgcolor: "#050505",
    minHeight: "100dvh",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
  },
  stickySlide: {
    height: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    alignItems: "flex-end",
    isolation: "isolate",
    willChange: "transform",
  },
  introSlide: {
    height: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#050505",
    isolation: "isolate",
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
      "radial-gradient(circle at 35% 35%, rgba(28,219,47,0.18) 0%, transparent 45%), radial-gradient(circle at 70% 55%, rgba(12,122,25,0.16) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  introTitle: {
    fontWeight: 900,
    fontSize: { xs: "4.45rem", md: "10rem" },
    lineHeight: 0.8,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#C4F2A3",
    filter:
      "drop-shadow(0 0 14px rgba(121, 238, 112, 0.22)) drop-shadow(0 0 28px rgba(28, 219, 47, 0.14)) drop-shadow(0 10px 30px rgba(0,0,0,0.45))",
    transformOrigin: "center center",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    willChange: "transform, opacity",
  },
  introSub: {
    mt: 4,
    fontWeight: 800,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  introSubWrap: {
    mt: 4,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.1,
    overflow: "hidden",
  },
  introAccent: {
    width: { xs: 84, md: 128 },
    height: 3,
    borderRadius: 999,
    background:
      "linear-gradient(90deg, rgba(243,255,240,0.12) 0%, rgba(201,250,179,0.85) 50%, rgba(28,219,47,0.18) 100%)",
    boxShadow: "0 0 12px rgba(121, 238, 112, 0.18)",
    transformOrigin: "center center",
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
  projectPosterLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    transform: "scale(1.02)",
  },
  projectVideoLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  projectVideoVeil: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 28%, rgba(255,255,255,0) 55%)",
    mixBlendMode: "screen",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(4,18,7,0.86) 0%, rgba(4,18,7,0.6) 38%, rgba(0,0,0,0.04) 100%)",
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
    color: NEON_GREEN,
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 2,
    textShadow: "0 0 8px rgba(141, 255, 116, 0.16)",
  },
  projectTitle: {
    color: "#fff",
    fontWeight: 900,
    fontSize: { xs: "3rem", md: "8rem" },
    lineHeight: 0.9,
    mb: 3,
    textShadow: "0 6px 16px rgba(12, 72, 22, 0.18)",
  },
  projectDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: { xs: "1rem", md: "1.25rem" },
    maxWidth: { xs: "600px", md: "760px" },
    lineHeight: 1.6,
    mb: 4,
  },
  btn: {
    borderRadius: "50px",
    py: { xs: 1.18, md: 1.5 },
    px: { xs: 3.15, md: 4 },
    fontSize: { xs: "0.92rem", md: "1rem" },
    textTransform: "none",
    fontWeight: 800,
    minHeight: { xs: 46, md: 56 },
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
} as const;

const ProjectSlide = React.memo(function ProjectSlide({
  project,
  zIndex,
  isPriority,
  shouldRenderVideo,
}: {
  project: (typeof PROJECTS)[number];
  zIndex: number;
  isPriority: boolean;
  shouldRenderVideo: boolean;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const activeVideoSrc = shouldRenderVideo && project.video
    ? isMobile
      ? project.video.mobile
      : project.video.desktop
    : null;
  const [videoReady, setVideoReady] = React.useState(false);

  React.useEffect(() => {
    setVideoReady(false);
  }, [activeVideoSrc]);

  return (
    <Box
      id={project.id}
      sx={{
        ...SX.stickySlide,
        zIndex,
        bgcolor: "#000",
        boxShadow: `0 -10px 24px ${DARK_GREEN_SHADOW}`,
      }}
      data-project-slide
    >
      <Box sx={SX.projectImageFrame} data-project-image>
        <Box sx={SX.projectImageInner}>
          {activeVideoSrc ? (
            <>
              <Box sx={SX.projectPosterLayer}>
                <Image
                  src={project.image}
                  alt={`${project.title} poster`}
                  fill
                  sizes="100vw"
                  quality={82}
                  priority={isPriority}
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box
                component="video"
                key={activeVideoSrc}
                src={activeVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload={isPriority ? "auto" : "metadata"}
                poster={project.image}
                aria-label={`${project.title} preview video`}
                disablePictureInPicture
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoReady(false)}
                sx={{
                  ...SX.projectVideoLayer,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                  backgroundColor: "#000",
                  filter: "blur(0px)",
                  opacity: videoReady ? 1 : 0,
                  transform: videoReady
                    ? "translate3d(0,0,0) scale(1)"
                    : "translate3d(0,0,0) scale(1.02)",
                  transition:
                    "opacity 520ms ease, transform 820ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              <Box
                sx={{
                  ...SX.projectVideoVeil,
                  opacity: videoReady ? 0.18 : 0.34,
                  transition: "opacity 420ms ease",
                }}
              />
            </>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="100vw"
              quality={82}
              priority={isPriority}
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>
      </Box>
      <Box sx={SX.gradientOverlay} />

      <Box sx={SX.contentBox} data-project-content>
        <Typography sx={SX.projectSubtitle}>
          <Box
            component="span"
            sx={{
              width: 40,
              height: 2,
              bgcolor: NEON_GREEN,
              boxShadow: "0 0 8px rgba(141, 255, 116, 0.24)",
              transformOrigin: "left center",
            }}
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mb: 4,
            gap: { xs: 0.75, md: 1 },
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              data-project-tag
              sx={{
                bgcolor: "rgba(28,219,47,0.08)",
                color: "rgba(239,255,236,0.94)",
                border: "1px solid rgba(141,255,116,0.24)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                mb: 0,
                height: { xs: 30, md: 32 },
                "& .MuiChip-label": {
                  px: { xs: 1.25, md: 1.5 },
                  fontSize: { xs: "0.82rem", md: "0.88rem" },
                  lineHeight: 1.2,
                },
              }}
            />
          ))}
        </Box>

        <Stack
          direction="row"
          spacing={2}
          data-project-actions
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {project.link ? (
            <Button
              data-project-cta="1"
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                ...SX.btn,
                background:
                  "linear-gradient(135deg, #F3FFF0 0%, #CFFAC9 25%, #79EE70 58%, #1CDB2F 100%)",
                color: "#173626",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #F4F8F1 0%, #D8E4D0 25%, #A9C39E 58%, #7BA27A 100%)",
                },
              }}
              href={project.link}
              target="_blank"
            >
              View Project Live
            </Button>
          ) : (
            <Button
              data-project-cta="1"
              variant="contained"
              disabled
              startIcon={<LockOutlinedIcon />}
              sx={{
                ...SX.btn,
                bgcolor: "rgba(28,219,47,0.22)",
                color: "#E7FFE3",
                border: "1px solid rgba(141,255,116,0.28)",
                boxShadow:
                  "0 0 0 1px rgba(141,255,116,0.05), 0 6px 16px rgba(4,18,7,0.16)",
                "&.Mui-disabled": {
                  opacity: 1,
                  bgcolor: "rgba(28,219,47,0.22)",
                  color: "#E7FFE3",
                  border: "1px solid rgba(141,255,116,0.28)",
                  boxShadow:
                    "0 0 0 1px rgba(141,255,116,0.05), 0 6px 16px rgba(4,18,7,0.16)",
                },
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
                borderColor: project.accent,
                color: project.accent,
                "&:hover": { borderColor: project.accent, bgcolor: "rgba(111,155,111,0.08)" },
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
        const introTitleLines = gsap.utils.toArray<HTMLElement>('[data-project-intro="title-line"]');
        const introSubWrap = container.querySelector<HTMLElement>('[data-project-intro="sub-wrap"]');
        const introSub = container.querySelector<HTMLElement>('[data-project-intro="sub"]');
        const introAccent = container.querySelector<HTMLElement>('[data-project-intro="accent"]');
        const projectSlides = gsap.utils.toArray<HTMLElement>("[data-project-slide]");

        if (introPanel) {
          gsap.set(introPanel, {
            transformPerspective: 1200,
            transformOrigin: "50% 50%",
            willChange: "transform, opacity, filter",
          });
        }

        if (introTitleLines.length || introSubWrap || introAccent) {
          const introReveal = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              once: true,
            },
          });

          if (introPanel) {
            introReveal.fromTo(
              introPanel,
              {
                y: 34,
                scale: 0.9,
                rotateX: 14,
                autoAlpha: 0,
              },
              {
                y: 0,
                scale: 1,
                rotateX: 0,
                autoAlpha: 1,
                duration: 1.05,
                ease: "expo.out",
              }
            );
          }

          if (introTitleLines.length) {
            introReveal.fromTo(
              introTitleLines,
              {
                yPercent: 118,
                rotateX: -68,
                rotateY: -6,
                autoAlpha: 0,
                transformOrigin: "50% 100%",
                willChange: "transform, opacity",
              },
              {
                yPercent: 0,
                rotateX: 0,
                rotateY: 0,
                autoAlpha: 1,
                duration: 1.05,
                stagger: 0.11,
                ease: "expo.out",
              },
              introPanel ? "-=0.76" : 0
            );
          }

          if (introAccent) {
            introReveal.fromTo(
              introAccent,
              {
                scaleX: 0.2,
                autoAlpha: 0,
                transformOrigin: "50% 50%",
                willChange: "transform, opacity",
              },
              {
                scaleX: 1,
                autoAlpha: 1,
                duration: 0.55,
                ease: "power2.out",
              },
              "-=0.5"
            );
          }

          if (introSubWrap) {
            introReveal.fromTo(
              introSubWrap,
              {
                clipPath: "inset(0 0 100% 0)",
                autoAlpha: 1,
                willChange: "clip-path, transform, opacity",
              },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.58,
                ease: "power2.out",
              },
              "-=0.38"
            );
          }

          if (introSub) {
            introReveal.fromTo(
              introSub,
              {
                y: 18,
                autoAlpha: 0,
                willChange: "transform, opacity",
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.46,
                ease: "power2.out",
              },
              "-=0.42"
            );
          }
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
                duration: 0.72,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 78%",
                  toggleActions: "play none none none",
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
                  toggleActions: "play none none none",
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
                  toggleActions: "play none none none",
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

      const nextSection = document.getElementById("research");

      const headerTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        ...(nextSection
          ? {
              endTrigger: nextSection,
              end: "top bottom",
            }
          : {
              end: "bottom top",
            }),
        onEnter: () => {
          setHeaderVisible(false);
        },
        onEnterBack: () => {
          setHeaderVisible(false);
        },
        onLeave: () => {
          setHeaderVisible(true);
        },
        onLeaveBack: () => {
          setHeaderVisible(true);
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
      {isInsideProjects && (
        <ProjectProgressRail progress={progress} activeIndex={activeIndex} totalSlides={totalSlides} />
      )}

      <Box ref={containerRef} sx={SX.container} id="projects">
        <Box id="projects-archive" sx={SX.introSlide}>
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
                animation: reducedMotion ? "none" : `${archivePulse} 5.8s cubic-bezier(0.37, 0, 0.22, 1) infinite`,
              }}
              component="div"
            >
              <Box
                component="span"
                sx={{ display: "block", overflow: "hidden", pb: { xs: 0.3, md: 0.45 } }}
              >
                <Box component="span" sx={{ display: "block" }} data-project-intro="title-line">
                  WORK
                </Box>
              </Box>
              <Box component="span" sx={{ display: "block", overflow: "hidden" }}>
                <Box component="span" sx={{ display: "block" }} data-project-intro="title-line">
                  ARCHIVES
                </Box>
              </Box>
            </Typography>

            <Box sx={SX.introSubWrap} data-project-intro="sub-wrap">
              <Box sx={SX.introAccent} data-project-intro="accent" />
              <Typography sx={SX.introSub} data-project-intro="sub">
                SCROLL TO EXPLORE
              </Typography>
            </Box>
          </Box>
        </Box>

        {PROJECTS.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            zIndex={2 + index}
            isPriority={index === 0}
            shouldRenderVideo={isInsideProjects && Math.abs(activeIndex - (index + 1)) <= 1}
          />
        ))}
      </Box>
    </>
  );
}

export default React.memo(ProjectsSection);
