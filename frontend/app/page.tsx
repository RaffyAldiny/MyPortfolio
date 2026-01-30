"use client";

import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material"; 

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ProjectsSection from "@/components/landing/Projects"; 
import PrismDivider from "@/components/ui/PrismDivider";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <LandingBackground />

      {/* --- ZONE 1: LIGHT INTRO --- */}
      {/* FIX 1: Added 'scrollSnapAlign: start' 
          This tells the browser: "The top of the page is a valid place to stop."
          This prevents it from sucking you down to the projects immediately.
      */}
      <Box sx={{ scrollSnapAlign: "start" }}>
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: { xs: 8, md: 12 }, pb: 10 }}>
            <Stack alignItems="center" spacing={8}>
              <ProfileIntro />
              <PrismDivider width="70%" />
              <SkillsShowcase />
              <PrismDivider width="70%" />
            </Stack>
          </Container>
      </Box>

      {/* --- ZONE 2: CINEMATIC PROJECTS --- */}
      <ProjectsSection />

      {/* --- ZONE 3: FOOTER --- */}
      {/* FIX 2: Added 'scrollSnapAlign: start'
          This tells the browser: "The footer is a valid place to stop."
          This allows you to escape the sticky projects and rest at the bottom.
      */}
      <Box sx={{ py: 10, textAlign: "center", bgcolor: "#fff", scrollSnapAlign: "start" }}>
         <Typography variant="h6" color="text.secondary">
            Let&apos;s build something together.
         </Typography>
      </Box>

    </Box>
  );
}