// frontend/app/page.tsx
"use client";

import * as React from "react";
import { Box, Container, Divider, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";

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

            <Divider
              sx={{
                width: "40%",
                borderColor: alpha("#000", 0.08),
                my: 1,
              }}
            />

            <SkillsShowcase />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
