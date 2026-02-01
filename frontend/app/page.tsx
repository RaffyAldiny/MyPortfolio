"use client";

import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ProjectsSection from "@/components/landing/Projects";
import PrismDivider from "@/components/ui/PrismDivider";
import LeftTimelineNav from "@/components/landing/LeftTimelineNav"; // <-- add this

export default function Home() {
  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <LandingBackground />

      {/* Left timeline: NO ABOUT, NO FOOTER, SKILLS renamed */}
      <LeftTimelineNav
        sections={[
          { id: "intro", label: "Intro" },
          { id: "techstacks", label: "Tech Stacks" },
          { id: "projects", label: "Projects" },
        ]}
        scrollOffsetPx={76} // set to your header height
        darkSectionId="projects"
        wrapAround
      />

      {/* --- ZONE 1: INTRO --- */}
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

      {/* --- ZONE 2: TECH STACKS --- */}
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

      {/* --- ZONE 3: CINEMATIC PROJECTS --- */}
      <ProjectsSection />

      {/* footer removed for now */}
    </Box>
  );
}
