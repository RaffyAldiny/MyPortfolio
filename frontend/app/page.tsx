"use client";

// frontend/app/page.tsx
import * as React from "react";
import { Box, Container, Divider, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

import LandingBackground from "@/components/landing/LandingBackground";
import ProfileIntro from "@/components/landing/ProfileIntro";
import SkillsShowcase from "@/components/landing/SkillsShowcase";

const profile = {
  name: "Rafael Agoncillo",
  title: "Computer Science Graduate • Full-Stack Developer",
  bio: "I build clean interfaces with strong APIs, and I like turning complex systems into experiences that feel simple and polished.",
  labels: ["Next.js", "Material UI", "Django REST Framework", "Full-stack"],
  imageSrc: "/me.jpg",
};

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

        // IMPORTANT: don’t paint a solid white layer here
        backgroundColor: "transparent",
      }}
    >
      <LandingBackground />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", px: { xs: 0, sm: 1 } }}>
          <Stack alignItems="center" spacing={4}>
            <ProfileIntro {...profile} />

            <Divider ssss 
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
