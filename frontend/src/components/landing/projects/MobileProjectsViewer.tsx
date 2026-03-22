"use client";

import * as React from "react";
import Image from "next/image";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import type { ProjectItem } from "@/components/landing/projects/projects.data";
import { PROJECTS_SX } from "@/components/landing/projects/projects.styles";

type Props = {
  projects: readonly ProjectItem[];
};

type MobileProjectSlideProps = {
  id?: string;
  project: ProjectItem;
  isActive: boolean;
  isPriority: boolean;
  setRef?: (node: HTMLDivElement | null) => void;
  navSectionId?: string;
  fitParent?: boolean;
};

export function MobileProjectPanel({
  id,
  project,
  isActive,
  isPriority,
  setRef,
  navSectionId,
  fitParent = false,
}: MobileProjectSlideProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = React.useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      setHasLoadedOnce(true);
    }
  }, [isActive]);

  React.useEffect(() => {
    setVideoReady(false);
  }, [project.video.mobile]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasLoadedOnce) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          setVideoReady(false);
        });
      }
      return;
    }

    video.pause();
  }, [hasLoadedOnce, isActive, project.video.mobile]);

  return (
    <Box
      id={id}
      ref={setRef}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: fitParent ? "100%" : "100svh",
        height: fitParent ? "100%" : "100svh",
        overflow: "hidden",
        backgroundColor: "#000",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
      data-snap-panel="true"
      data-nav-section={navSectionId}
    >
      <Box sx={PROJECTS_SX.projectImageFrame}>
        <Box sx={PROJECTS_SX.projectImageInner}>
          <Box sx={PROJECTS_SX.projectPosterLayer}>
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

          {hasLoadedOnce ? (
            <>
              <Box
                component="video"
                ref={videoRef}
                src={project.video.mobile}
                muted
                loop
                playsInline
                preload={isPriority && isActive ? "auto" : "metadata"}
                poster={project.image}
                aria-label={`${project.title} preview video`}
                disablePictureInPicture
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoReady(false)}
                sx={{
                  ...PROJECTS_SX.projectVideoLayer,
                  opacity: videoReady && isActive ? 1 : 0,
                  transition: "opacity 380ms ease",
                  backgroundColor: "#000",
                }}
              />

              <Box
                sx={{
                  ...PROJECTS_SX.projectVideoVeil,
                  opacity: videoReady && isActive ? 0.16 : 0.28,
                  transition: "opacity 320ms ease",
                }}
              />
            </>
          ) : null}
        </Box>
      </Box>

      <Box
        sx={{
          ...PROJECTS_SX.gradientOverlay,
          background:
            "linear-gradient(to top, rgba(3,14,5,0.92) 0%, rgba(3,14,5,0.74) 34%, rgba(3,14,5,0.24) 62%, rgba(0,0,0,0.04) 100%)",
        }}
      />

      {!videoReady && isActive ? (
        <Box
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 4,
            px: 0.95,
            py: 0.5,
            borderRadius: 999,
            bgcolor: "rgba(0,0,0,0.42)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.84)",
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
          }}
        >
          Loading Preview
        </Box>
      ) : null}

      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          px: 2.2,
          pt: "calc(18px + env(safe-area-inset-top))",
          pb: "calc(28px + env(safe-area-inset-bottom))",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxHeight: "100%",
            overflowY: "hidden",
            "@media (hover: none) and (pointer: coarse)": {
              overflowY: "auto",
              overscrollBehaviorY: "contain",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            },
          }}
        >
          <Typography sx={{ ...PROJECTS_SX.projectSubtitle, mb: 0.75 }}>
            <Box component="span" sx={{ ...PROJECTS_SX.projectLine, width: 34 }} />
            <Box component="span">{project.subtitle}</Box>
          </Typography>

          <Typography
            component="h2"
            sx={{
              ...PROJECTS_SX.projectTitle,
              fontSize: "2.72rem",
              lineHeight: 0.92,
              mb: 1.15,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            sx={{
              ...PROJECTS_SX.projectDesc,
              fontSize: project.mobileDescOverride?.fontSize ?? "0.86rem",
              lineHeight: project.mobileDescOverride?.lineHeight ?? 1.46,
              mb: 1.5,
              maxWidth: "100%",
            }}
          >
            {project.desc}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.75,
              pb: 0.2,
              mb: 1.35,
              maxWidth: "100%",
            }}
          >
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  ...PROJECTS_SX.projectTag,
                  flexShrink: 0,
                  height: 30,
                  "& .MuiChip-label": {
                    px: 1.15,
                    fontSize: "0.8rem",
                    lineHeight: 1.2,
                  },
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.1,
              width: "100%",
            }}
          >
            {project.link ? (
              <Button
                variant="contained"
                endIcon={<ArrowOutwardIcon />}
                sx={{
                  ...PROJECTS_SX.btn,
                  ...PROJECTS_SX.liveBtn,
                  minHeight: 48,
                  px: 2.2,
                  flexShrink: 0,
                }}
                href={project.link}
                target="_blank"
                >
                  View Project Live
                </Button>
              ) : (
                <Button
                variant="contained"
                disabled
                startIcon={<LockOutlinedIcon />}
                sx={{
                  ...PROJECTS_SX.btn,
                  ...PROJECTS_SX.privateBtn,
                  minHeight: 48,
                  px: 2.2,
                  flexShrink: 0,
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
                  ...PROJECTS_SX.btn,
                  minHeight: 48,
                  px: 1.7,
                  borderColor: project.accent,
                  color: project.accent,
                  flexShrink: 0,
                  "&:hover": {
                    borderColor: project.accent,
                    bgcolor: "rgba(111,155,111,0.08)",
                  },
                }}
                href={project.repo}
                target="_blank"
                >
                  Source
                </Button>
              ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function MobileProjectsViewer({ projects }: Props) {
  const slideRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const slides = slideRefs.current.filter((slide): slide is HTMLDivElement => Boolean(slide));
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let nextIndex: number | null = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number((entry.target as HTMLElement).dataset.mobileProjectIndex);
          if (!Number.isFinite(index)) return;

          if (entry.intersectionRatio >= highestRatio) {
            highestRatio = entry.intersectionRatio;
            nextIndex = index;
          }
        });

        if (nextIndex !== null) {
          const resolvedIndex = nextIndex;
          setActiveIndex((current) => (current === resolvedIndex ? current : resolvedIndex));
        }
      },
      {
        threshold: [0.45, 0.6, 0.75],
      }
    );

    slides.forEach((slide, index) => {
      slide.dataset.mobileProjectIndex = String(index);
      observer.observe(slide);
    });

    return () => {
      observer.disconnect();
    };
  }, [projects]);

  return (
    <Box sx={{ width: "100%", backgroundColor: "#050505" }}>
      {projects.map((project, index) => (
        <MobileProjectPanel
          key={project.id}
          id={index === 0 ? "projects" : undefined}
          project={project}
          isActive={activeIndex === index}
          isPriority={index === 0}
          navSectionId="projects"
          setRef={(node) => {
            slideRefs.current[index] = node;
          }}
        />
      ))}
    </Box>
  );
}
