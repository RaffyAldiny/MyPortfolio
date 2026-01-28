"use client";

import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material"; // <--- Fixed Import

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import ProjectsSection from "@/components/landing/Projects"; 
import PrismDivider from "@/components/ui/PrismDivider";

export default function Home() {
  return (
    // ⚠️ CRITICAL FIX: Removed "overflowX: hidden" from here.
    // If you need to hide horizontal overflow, add it to 'body' in globals.css instead.
    <Box sx={{ minHeight: "100dvh" }}>
      <LandingBackground />

      {/* --- ZONE 1: LIGHT INTRO --- */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: { xs: 8, md: 12 }, pb: 10 }}>
        <Stack alignItems="center" spacing={8}>
          
          <ProfileIntro />

          <PrismDivider width="70%" />

          <SkillsShowcase />
          
          <PrismDivider width="70%" />

        </Stack>
      </Container>

      {/* --- ZONE 2: CINEMATIC PROJECTS --- */}
      <ProjectsSection />

      {/* --- ZONE 3: FOOTER --- */}
      <Box sx={{ py: 10, textAlign: "center", bgcolor: "#fff" }}>
         <Typography variant="h6" color="text.secondary">
            Let&apos;s build something together.
         </Typography>
      </Box>

    </Box>
  );
}