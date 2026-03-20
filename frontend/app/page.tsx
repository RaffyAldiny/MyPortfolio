"use client";

import * as React from "react";
import { Box, Container, Stack } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ResearchSpotlight from "@/components/landing/ResearchSpotlight";
import ProjectsSection from "@/components/landing/Projects";
import LetsWorkTogether from "@/components/landing/LetsWorkTogether";
import LeftTimelineNav from "@/components/landing/LeftTimelineNav";
import { TIMELINE_SECTIONS } from "@/constants/navigation";

const sectionSnapSx = {
  height: "100dvh",
  scrollSnapAlign: "start" as const,
  scrollSnapStop: "always" as const,
  scrollMarginTop: { xs: "56px", md: "80px" },
  display: "flex",
  alignItems: "stretch",
  overflow: "clip",
};

export default function Home() {
  return (
    <Box sx={{ minHeight: "100dvh", scrollBehavior: "smooth" }}>
      <GlobalStyles
        styles={{
          html: {
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            scrollPaddingTop: "0px",
          },
          body: {
            scrollSnapType: "y mandatory",
          },
        }}
      />

      <LandingBackground />

      <LeftTimelineNav
        sections={TIMELINE_SECTIONS}
        scrollOffsetPx={80}
        darkSectionId={["projects", "contact"]}
        wrapAround
      />

      <Box sx={{ scrollSnapType: "y mandatory" }}>
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
            height: { xs: "auto", md: "100dvh" },
            minHeight: "100dvh",
            overflow: { xs: "visible", md: "clip" },
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
              alignItems: { xs: "stretch", md: "center" },
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
            height: { xs: "auto", md: "100dvh" },
            minHeight: "100dvh",
            overflow: { xs: "visible", md: "clip" },
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
              alignItems: { xs: "stretch", md: "center" },
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
