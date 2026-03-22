"use client";

import * as React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import ProjectProgressRail from "@/components/landing/ProjectProgressRail";
import ProjectSlide from "@/components/landing/projects/ProjectSlide";
import MobileProjectsViewer from "@/components/landing/projects/MobileProjectsViewer";
import ProjectsIntro from "@/components/landing/projects/ProjectsIntro";
import { PROJECTS } from "@/components/landing/projects/projects.data";
import { PROJECTS_SX } from "@/components/landing/projects/projects.styles";
import useProjectsAnimations from "@/components/landing/projects/useProjectsAnimations";
import useProjectsScrollState from "@/components/landing/projects/useProjectsScrollState";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function ProjectsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const containerRef = React.useRef<HTMLDivElement>(null);
  const totalSlides = PROJECTS.length + 1;
  const { progress, archiveProgress, activeIndex, isInsideProjects } = useProjectsScrollState({
    containerRef,
  });

  useProjectsAnimations({ containerRef, reducedMotion });

  const introFade = reducedMotion ? 0 : archiveProgress;
  const introScale = reducedMotion ? 1 : 1 - introFade * 0.1;

  if (isMobile) {
    return <MobileProjectsViewer projects={PROJECTS} />;
  }

  return (
    <>
      {isInsideProjects && (
        <ProjectProgressRail
          progress={progress}
          activeIndex={activeIndex}
          totalSlides={totalSlides}
        />
      )}

      <Box ref={containerRef} sx={PROJECTS_SX.container} id="projects">
        <>
          <ProjectsIntro
            reducedMotion={reducedMotion}
            introFade={introFade}
            introScale={introScale}
          />

          {PROJECTS.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              zIndex={2 + index}
              isPriority={index === 0}
              isMobile={isMobile}
              isActive={isInsideProjects && activeIndex === index + 1}
            />
          ))}
        </>
      </Box>
    </>
  );
}

export default React.memo(ProjectsSection);
