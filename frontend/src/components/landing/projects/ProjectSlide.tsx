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
  shouldRenderVideo: boolean;
  isMobile: boolean;
};

function ProjectSlide({
  project,
  zIndex,
  isPriority,
  shouldRenderVideo,
  isMobile,
}: Props) {
  const activeVideoSrc = shouldRenderVideo
    ? isMobile
      ? project.video.mobile
      : project.video.desktop
    : null;
  const [videoReady, setVideoReady] = React.useState(false);

  React.useEffect(() => {
    setVideoReady(false);
  }, [activeVideoSrc]);

  const subtitleOverride =
    isMobile && project.mobileSubtitleOverride
      ? {
          fontSize: project.mobileSubtitleOverride.fontSize,
          letterSpacing: project.mobileSubtitleOverride.letterSpacing,
        }
      : undefined;

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
      id={project.id}
      sx={{
        ...PROJECTS_SX.stickySlide,
        zIndex,
        bgcolor: "#000",
        boxShadow: `0 -10px 24px ${DARK_GREEN_SHADOW}`,
      }}
      data-project-slide
      data-project-id={project.id}
    >
      <Box sx={PROJECTS_SX.projectImageFrame} data-project-image>
        <Box sx={PROJECTS_SX.projectImageInner}>
          {activeVideoSrc ? (
            <>
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
                  ...PROJECTS_SX.projectVideoLayer,
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
                  ...PROJECTS_SX.projectVideoVeil,
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

      <Box sx={PROJECTS_SX.gradientOverlay} />

      <Box sx={PROJECTS_SX.contentBox} data-project-content>
        <Typography sx={PROJECTS_SX.projectSubtitle}>
          <Box component="span" sx={PROJECTS_SX.projectLine} data-project-line />
          <Box component="span" sx={subtitleOverride}>
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
