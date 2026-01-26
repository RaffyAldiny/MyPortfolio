"use client";

import * as React from "react";
import { Box, Container, Stack } from "@mui/material";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import PrismDivider from "@/components/ui/PrismDivider";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: { xs: 7, md: 10 },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      <LandingBackground />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", px: { xs: 0, sm: 1 } }}>
          <Stack alignItems="center" spacing={4}>
            <ProfileIntro />

            {/* 🌈 Prism Divider */}
            <PrismDivider width="70%" />

            <SkillsShowcase />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
