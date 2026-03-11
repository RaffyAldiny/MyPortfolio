"use client";

import * as React from "react";
import { Box, Container, Stack } from "@mui/material";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ResearchSpotlight from "@/components/landing/ResearchSpotlight";
import ProjectsSection from "@/components/landing/Projects";
import PrismDivider from "@/components/ui/PrismDivider";
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

      <Box id="intro" sx={{ scrollSnapAlign: "start" }}>
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
            <PrismDivider width="70%" />
          </Stack>
        </Container>
      </Box>

      <Box id="techstacks" sx={{ scrollSnapAlign: "start" }}>
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            pt: { xs: 2, md: 2 },
            pb: 10,
          }}
        >
          <Stack alignItems="center" spacing={8}>
            <SkillsShowcase />
            <PrismDivider width="70%" />
          </Stack>
        </Container>
      </Box>

      <Box id="research" sx={{ scrollSnapAlign: "start" }}>
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            pt: { xs: 2, md: 2 },
            pb: 10,
          }}
        >
          <Stack alignItems="center" spacing={8}>
            <ResearchSpotlight />
            <PrismDivider width="70%" />
          </Stack>
        </Container>
      </Box>

      <ProjectsSection />
    </Box>
  );
}
