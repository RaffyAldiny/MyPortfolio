"use client";

import * as React from "react";
import Image from "next/image";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ProjectItem } from "@/components/landing/projects/projects.data";
import {
  DARK_GREEN_SHADOW,
  PROJECTS_SX,
} from "@/components/landing/projects/projects.styles";

type Props = {
  project: ProjectItem;
  zIndex: number;
  isPriority: boolean;
  isActive: boolean;
  isMobile: boolean;
  panelId?: string;
  navSectionId?: string;
};

function ProjectSlide({
  project,
  zIndex,
  isPriority,
  isActive,
  isMobile,
  panelId,
  navSectionId,
}: Props) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const videoSrc = isMobile ? project.video.mobile : project.video.desktop;
  const [videoReady, setVideoReady] = React.useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      setHasLoadedOnce(true);
    }
  }, [isActive]);

  React.useEffect(() => {
    setVideoReady(false);
  }, [videoSrc]);

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
  }, [hasLoadedOnce, isActive, videoSrc]);

  const descOverride =
    isMobile && project.mobileDescOverride
      ? {
          fontSize: project.mobileDescOverride.fontSize,
          lineHeight: project.mobileDescOverride.lineHeight,
        }
      : undefined;

  const titleSx = project.desktopTitleOverride
    ? {
        ...PROJECTS_SX.projectTitle,
        fontSize: {
          ...PROJECTS_SX.projectTitle.fontSize,
          md: project.desktopTitleOverride.fontSize,
        },
      }
    : PROJECTS_SX.projectTitle;

  return (
    <Box
      id={panelId ?? project.id}
      sx={{
        ...PROJECTS_SX.stickySlide,
        zIndex,
        bgcolor: "#000",
        boxShadow: `0 -10px 24px ${DARK_GREEN_SHADOW}`,
      }}
      data-snap-panel="true"
      data-nav-section={navSectionId}
      data-project-slide
      data-project-id={project.id}
    >
      <Box sx={PROJECTS_SX.projectImageFrame} data-project-image>
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
                src={videoSrc}
                muted
                loop
                playsInline
                preload={isActive && isPriority ? "auto" : "metadata"}
                poster={project.image}
                aria-label={`${project.title} preview video`}
                disablePictureInPicture
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoReady(false)}
                sx={{
                  ...PROJECTS_SX.projectVideoLayer,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                  backgroundColor: "#000",
                  filter: "blur(0px)",
                  opacity: videoReady && isActive ? 1 : 0,
                  transform: videoReady && isActive
                    ? "translate3d(0,0,0) scale(1)"
                    : "translate3d(0,0,0) scale(1.02)",
                  transition:
                    "opacity 520ms ease, transform 820ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              <Box
                sx={{
                  ...PROJECTS_SX.projectVideoVeil,
                  opacity: videoReady && isActive ? 0.18 : 0.34,
                  transition: "opacity 420ms ease",
                }}
              />
            </>
          ) : null}
        </Box>
      </Box>

      <Box sx={PROJECTS_SX.gradientOverlay} />

      <Box sx={PROJECTS_SX.contentBox} data-project-content>
        <Typography sx={PROJECTS_SX.projectSubtitle}>
          <Box component="span" sx={PROJECTS_SX.projectLine} data-project-line />
          <Box component="span">
            {project.subtitle}
          </Box>
        </Typography>

        <Typography variant="h1" sx={titleSx}>
          {project.title}
        </Typography>

        <Typography variant="body1" sx={PROJECTS_SX.projectDesc}>
          <Box component="span" sx={descOverride}>
            {project.desc}
          </Box>
        </Typography>

        <Box sx={PROJECTS_SX.projectTagWrap}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} data-project-tag sx={PROJECTS_SX.projectTag} />
          ))}
        </Box>

        <Stack direction="row" spacing={2} data-project-actions sx={PROJECTS_SX.projectActions}>
          {project.link ? (
            <Button
              data-project-cta="1"
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
              sx={{ ...PROJECTS_SX.btn, ...PROJECTS_SX.liveBtn }}
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
              sx={{ ...PROJECTS_SX.btn, ...PROJECTS_SX.privateBtn }}
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
                borderColor: project.accent,
                color: project.accent,
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
        </Stack>
      </Box>
    </Box>
  );
}

export default React.memo(ProjectSlide);
