"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { archivePulse, prismDrift, PROJECTS_SX } from "@/components/landing/projects/projects.styles";

type Props = {
  reducedMotion: boolean;
  introFade: number;
  introScale: number;
  fitParent?: boolean;
};

export default function ProjectsIntro({ reducedMotion, introFade, introScale, fitParent = false }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      id="projects-archive"
      sx={{
        ...PROJECTS_SX.introSlide,
        ...(fitParent
          ? {
              height: "100%",
              minHeight: "100%",
            }
          : null),
      }}
    >
      <Box sx={PROJECTS_SX.introVignette} />
      <Box
        aria-hidden
        sx={{
          ...PROJECTS_SX.introSheen,
          backgroundSize: "200% 200%",
          animation: reducedMotion || isMobile ? "none" : `${prismDrift} 8s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          ...PROJECTS_SX.introPanel,
          transform: `scale(${introScale})`,
          opacity: 1 - introFade,
        }}
        data-project-intro="panel"
      >
        <Typography
          sx={{
            ...PROJECTS_SX.introTitle,
            animation:
              reducedMotion || isMobile
                ? "none"
                : `${archivePulse} 5.8s cubic-bezier(0.37, 0, 0.22, 1) infinite`,
          }}
          component="div"
        >
          <Box
            component="span"
            sx={{ ...PROJECTS_SX.introTitleLineWrap, pb: { xs: 0.3, md: 0.45 } }}
          >
            <Box component="span" sx={PROJECTS_SX.introTitleLine} data-project-intro="title-line">
              WORK
            </Box>
          </Box>
          <Box component="span" sx={PROJECTS_SX.introTitleLineWrap}>
            <Box component="span" sx={PROJECTS_SX.introTitleLine} data-project-intro="title-line">
              ARCHIVES
            </Box>
          </Box>
        </Typography>

        <Box sx={PROJECTS_SX.introSubWrap} data-project-intro="sub-wrap">
          <Box sx={PROJECTS_SX.introAccent} data-project-intro="accent" />
          <Typography sx={PROJECTS_SX.introSub} data-project-intro="sub">
            SCROLL TO EXPLORE
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
