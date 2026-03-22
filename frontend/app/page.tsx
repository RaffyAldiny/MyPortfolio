"use client";

import * as React from "react";
import { Box, Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ResearchSpotlight from "@/components/landing/ResearchSpotlight";
import ProjectsSection from "@/components/landing/Projects";
import LetsWorkTogether from "@/components/landing/LetsWorkTogether";
import LeftTimelineNav from "@/components/landing/LeftTimelineNav";
import { TIMELINE_SECTIONS } from "@/constants/navigation";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pageSnapType = "y mandatory";
  const pageScrollBehavior = isMobile ? "auto" : "smooth";
  const sectionSnapSx = {
    height: { xs: "100svh", md: "100dvh" },
    minHeight: { xs: "100svh", md: "100dvh" },
    scrollSnapAlign: "start" as const,
    scrollSnapStop: "always" as const,
    scrollMarginTop: 0,
    display: "flex",
    alignItems: "stretch",
    overflow: "clip",
  };

  return (
    <Box
      sx={{
        minHeight: { xs: "100svh", md: "100dvh" },
        scrollBehavior: pageScrollBehavior,
        backgroundColor: "#57bc53",
      }}
    >
      <GlobalStyles
        styles={{
          html: {
            scrollSnapType: pageSnapType,
            scrollBehavior: pageScrollBehavior,
            scrollPaddingTop: "env(safe-area-inset-top)",
            overscrollBehaviorY: "auto",
          },
          body: {
            scrollSnapType: pageSnapType,
            overscrollBehaviorY: "auto",
          },
        }}
      />

      <LandingBackground />

      <LeftTimelineNav
        sections={TIMELINE_SECTIONS}
        scrollOffsetPx={0}
        darkSectionId={["projects", "contact"]}
        wrapAround
      />

      <Box sx={{ scrollSnapType: pageSnapType }}>
        <Box id="intro" sx={sectionSnapSx}>
          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack alignItems="center" spacing={8} sx={{ width: "100%" }}>
              <ProfileIntro />
            </Stack>
          </Container>
        </Box>

        <Box
          id="techstacks"
          sx={{
            ...sectionSnapSx,
            minHeight: { xs: "100svh", md: "100dvh" },
            scrollMarginTop: 0,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              position: "relative",
              zIndex: 1,
              py: { xs: 0, md: 0 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack alignItems="center" spacing={0} sx={{ width: "100%" }}>
              <SkillsShowcase />
            </Stack>
          </Container>
        </Box>

        <ProjectsSection />

        <Box id="research" sx={sectionSnapSx}>
          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              position: "relative",
              zIndex: 1,
              py: { xs: 2, md: 0 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack alignItems="center" spacing={8}>
              <ResearchSpotlight />
            </Stack>
          </Container>
        </Box>

        <Box
          id="contact"
          sx={{
            ...sectionSnapSx,
            minHeight: { xs: "100svh", md: "100dvh" },
            backgroundColor: "#57bc53",
          }}
        >
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
            }}
          >
            <Stack alignItems="center" spacing={8} sx={{ width: "100%" }}>
              <LetsWorkTogether />
            </Stack>
          </Container>
        </Box>
      </Box>

    </Box>
  );
}
