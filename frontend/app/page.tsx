"use client";

import * as React from "react";
import { Box, Container, Stack } from "@mui/material";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ResearchSpotlight from "@/components/landing/ResearchSpotlight";
import ProjectsSection from "@/components/landing/Projects";
import LetsWorkTogether from "@/components/landing/LetsWorkTogether";
import LeftTimelineNav from "@/components/landing/LeftTimelineNav";
import { TIMELINE_SECTIONS } from "@/constants/navigation";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <LandingBackground />

      <LeftTimelineNav
        sections={TIMELINE_SECTIONS}
        scrollOffsetPx={80}
        darkSectionId="projects"
        wrapAround
      />

      <Box
        id="intro"
        sx={{ scrollSnapAlign: "start", scrollMarginTop: { xs: "56px", md: "80px" } }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            pt: { xs: 8, md: 12 },
            pb: 10,
          }}
        >
          <Stack alignItems="center" spacing={8}>
            <ProfileIntro />
          </Stack>
        </Container>
      </Box>

      <Box
        id="techstacks"
        sx={{ scrollSnapAlign: "start", scrollMarginTop: { xs: "56px", md: "80px" } }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 2, md: 0 },
          }}
        >
          <Stack alignItems="center" spacing={8}>
            <SkillsShowcase />
          </Stack>
        </Container>
      </Box>

      <ProjectsSection />

      <Box
        id="research"
        sx={{ scrollSnapAlign: "start", scrollMarginTop: { xs: "56px", md: "80px" } }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 2, md: 0 },
          }}
        >
          <Stack alignItems="center" spacing={8}>
            <ResearchSpotlight />
          </Stack>
        </Container>
      </Box>

      <Box
        id="contact"
        sx={{ scrollSnapAlign: "start", scrollMarginTop: { xs: "56px", md: "80px" } }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 2, md: 0 },
          }}
        >
          <Stack alignItems="center" spacing={8}>
            <LetsWorkTogether />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
