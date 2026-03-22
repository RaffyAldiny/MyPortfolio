"use client";

import * as React from "react";
import { Box, Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";

import LandingBackground from "@/components/landing/LandingBackground";
import LeftTimelineNav from "@/components/landing/LeftTimelineNav";
import LetsWorkTogether from "@/components/landing/LetsWorkTogether";
import ProfileIntro from "@/components/landing/ProfileIntro";
import ResearchSpotlight from "@/components/landing/ResearchSpotlight";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ProjectsIntro from "@/components/landing/projects/ProjectsIntro";
import ProjectSlide from "@/components/landing/projects/ProjectSlide";
import { MobileProjectPanel } from "@/components/landing/projects/MobileProjectsViewer";
import { PROJECTS } from "@/components/landing/projects/projects.data";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { NAV_SECTIONS, SNAP_PANEL_REGISTRY } from "@/constants/snapPanels";
import { SNAP_SHELL_ID, scrollSnapShellToPanel } from "@/lib/snapShell";

const PANEL_SX = {
  height: "100svh",
  minHeight: "100svh",
  width: "100%",
  position: "relative",
  scrollSnapAlign: "start" as const,
  scrollSnapStop: "always" as const,
  contain: "layout paint style" as const,
  isolation: "isolate" as const,
  overflow: "hidden",
} as const;

const FRAMED_PANEL_SX = {
  ...PANEL_SX,
  display: "grid",
  gridTemplateRows: {
    xs: "0px minmax(0, 1fr) 0px",
    md: "0px minmax(0, 1fr) 0px",
  },
} as const;

const PANEL_BODY_SX = {
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "stretch",
} as const;

export default function Home() {
  const theme = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const shellRef = React.useRef<HTMLElement | null>(null);
  const [activePanelId, setActivePanelId] = React.useState("intro");
  const [activeNavId, setActiveNavId] = React.useState("intro");

  React.useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    let rafId = 0;

    const readPanels = () =>
      Array.from(shell.children).filter(
        (node): node is HTMLElement =>
          node instanceof HTMLElement && node.dataset.snapPanel === "true"
      );

    const updateActivePanel = () => {
      const panels = readPanels();
      if (!panels.length) return;

      const scrollTop = shell.scrollTop;
      let nearest = panels[0];
      let nearestDistance = Math.abs((panels[0]?.offsetTop ?? 0) - scrollTop);

      panels.forEach((panel) => {
        const distance = Math.abs(panel.offsetTop - scrollTop);
        if (distance < nearestDistance) {
          nearest = panel;
          nearestDistance = distance;
        }
      });

      const nextPanelId = nearest.id || "intro";
      const nextNavId = nearest.dataset.navSection || nextPanelId;

      setActivePanelId((current) => (current === nextPanelId ? current : nextPanelId));
      setActiveNavId((current) => (current === nextNavId ? current : nextNavId));
    };

    const scheduleUpdate = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActivePanel();
      });
    };

    updateActivePanel();
    shell.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      shell.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
    };
  }, []);

  const handleSelectSection = React.useCallback(
    (id: string) => {
      scrollSnapShellToPanel(id, isMobile ? "auto" : "smooth");
    },
    [isMobile]
  );

  return (
    <Box
      sx={{
        height: "100svh",
        backgroundColor: "#57bc53",
        position: "relative",
      }}
    >
      <GlobalStyles
        styles={{
          html: {
            height: "100%",
            overflow: "hidden",
          },
          body: {
            height: "100%",
            overflow: "hidden",
            overscrollBehaviorY: "contain",
          },
        }}
      />

      <LandingBackground />

      <LeftTimelineNav
        sections={NAV_SECTIONS}
        activeId={activeNavId}
        onSelect={handleSelectSection}
        hidden={activeNavId === "projects"}
        wrapAround
      />

      <Box
        component="main"
        id={SNAP_SHELL_ID}
        ref={shellRef}
        sx={{
          height: "100svh",
          overflowY: "auto",
          overflowX: "hidden",
          scrollSnapType: "y mandatory",
          overscrollBehaviorY: "contain",
          scrollBehavior: isMobile ? "auto" : "smooth",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box id="intro" data-snap-panel="true" data-nav-section="intro" sx={FRAMED_PANEL_SX}>
          <Box />
          <Box sx={PANEL_BODY_SX}>
            <Container
              maxWidth="lg"
              sx={{
                flex: 1,
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Stack alignItems="center" spacing={8} sx={{ width: "100%", height: "100%" }}>
                <ProfileIntro />
              </Stack>
            </Container>
          </Box>
          <Box />
        </Box>

        <Box
          id="techstacks"
          data-snap-panel="true"
          data-nav-section="techstacks"
          sx={FRAMED_PANEL_SX}
        >
          <Box />
          <Box sx={PANEL_BODY_SX}>
            <Container
              maxWidth="lg"
              sx={{
                flex: 1,
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Stack alignItems="center" spacing={0} sx={{ width: "100%", height: "100%" }}>
                <SkillsShowcase />
              </Stack>
            </Container>
          </Box>
          <Box />
        </Box>

        <Box id="projects" data-snap-panel="true" data-nav-section="projects" sx={FRAMED_PANEL_SX}>
          <Box />
          <Box sx={PANEL_BODY_SX}>
            <ProjectsIntro reducedMotion={reducedMotion} introFade={0} introScale={1} fitParent />
          </Box>
          <Box />
        </Box>

        {SNAP_PANEL_REGISTRY.filter((panel) => panel.type === "project").map((panel, index) => {
          const project = PROJECTS.find((item) => item.id === panel.id);
          if (!project) return null;

          return (
            <Box
              key={panel.id}
              id={panel.id}
              data-snap-panel="true"
              data-nav-section={panel.navSection}
              sx={FRAMED_PANEL_SX}
            >
              <Box />
              <Box sx={PANEL_BODY_SX}>
                {isMobile ? (
                  <MobileProjectPanel
                    project={project}
                    isActive={activePanelId === panel.id}
                    isPriority={index === 0}
                    navSectionId={panel.navSection}
                    fitParent
                  />
                ) : (
                  <ProjectSlide
                    navSectionId={panel.navSection}
                    project={project}
                    zIndex={2 + index}
                    isPriority={index === 0}
                    isMobile={false}
                    isActive={activePanelId === panel.id}
                    fitParent
                  />
                )}
              </Box>
              <Box />
            </Box>
          );
        })}

        <Box id="research" data-snap-panel="true" data-nav-section="research" sx={FRAMED_PANEL_SX}>
          <Box />
          <Box sx={PANEL_BODY_SX}>
            <Container
              maxWidth="lg"
              sx={{
                flex: 1,
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Stack alignItems="center" spacing={8} sx={{ width: "100%", height: "100%" }}>
                <ResearchSpotlight />
              </Stack>
            </Container>
          </Box>
          <Box />
        </Box>

        <Box id="contact" data-snap-panel="true" data-nav-section="contact" sx={FRAMED_PANEL_SX}>
          <Box />
          <Box sx={PANEL_BODY_SX}>
            <Container
              maxWidth={false}
              disableGutters
              sx={{
                flex: 1,
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "100%",
                px: 0,
                py: 0,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Stack alignItems="center" spacing={8} sx={{ width: "100%", height: "100%" }}>
                <LetsWorkTogether />
              </Stack>
            </Container>
          </Box>
          <Box />
        </Box>
      </Box>
    </Box>
  );
}
