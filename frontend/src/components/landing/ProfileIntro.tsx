// src/components/landing/ProfileIntro.tsx
"use client";

import * as React from "react";
import { Avatar, Box, Stack, Typography, keyframes } from "@mui/material";

// 1. Define Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const reverseSpin = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

const PROFILE = {
  name: "Rafael Alden Goncillo",
  title: "Computer Science Graduate • Full-Stack Developer",
  imageSrc: "/me.jpg",
};

// Helper component for the highlighted text style
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="span"
    sx={{
      fontWeight: 700,
      color: "#2D2D3A",
      position: "relative",
      whiteSpace: "nowrap",
      // The "Marker Pen" gradient effect
      backgroundImage: "linear-gradient(120deg, transparent 0%, transparent 10%, #FFC7EA 10%, #B8F2FF 100%)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 45%", // Height of the highlight line
      backgroundPosition: "0 90%", // Position at the bottom of text
      px: 0.5,
    }}
  >
    {children}
  </Box>
);

export default function ProfileIntro() {
  const { name, title, imageSrc } = PROFILE;

  return (
    <Stack
      alignItems="center"
      spacing={3}
      sx={{
        textAlign: "center",
        width: "100%",
        mx: "auto",
        py: { xs: 4, md: 6 },
        overflow: "hidden", // Prevents ring overflow on small screens
      }}
    >
      {/* --- ANIMATED AVATAR CONTAINER --- */}
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        
        {/* Ring 1: Outer Dashed Orbit (Slow Reverse) */}
        <Box
          sx={{
            position: "absolute",
            top: -15,
            left: -15,
            right: -15,
            bottom: -15,
            borderRadius: "50%",
            border: "1px dashed rgba(184, 242, 255, 0.6)", // Very subtle blueish dash
            animation: `${reverseSpin} 20s linear infinite`,
            zIndex: 0,
          }}
        />

        {/* Ring 2: Inner Gradient Ring (Fast Forward) */}
        <Box
          sx={{
            position: "absolute",
            top: -6,
            left: -6,
            right: -6,
            bottom: -6,
            borderRadius: "50%",
            // Create a gradient border effect
            background: "linear-gradient(135deg, #FFC7EA, #B8F2FF)",
            animation: `${spin} 8s linear infinite`,
            zIndex: 1,
            // Masking to create a hollow ring
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            padding: "2px", // Thickness of the inner ring
          }}
        />

        {/* The Actual Avatar */}
        <Avatar
          src={imageSrc}
          alt={name}
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
            border: "4px solid #fff", // Thicker white border to separate from rings
            boxShadow: "0 10px 40px rgba(184, 242, 255, 0.4)", // Soft glow matching the rings
            zIndex: 2,
            position: "relative",
          }}
        />
      </Box>

      {/* --- TEXT CONTENT --- */}
      <Box sx={{ width: "100%", px: 2 }}>
        
        {/* NAME: Deep Violet-Slate Gradient */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em", 
            mb: 1,
            fontSize: { xs: "2rem", md: "2.5rem" },
            
            // Gradient Logic
            background: "linear-gradient(135deg, #2A2A3C 0%, #5B4B75 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            
            // Subtle Shadow
            filter: "drop-shadow(0px 2px 2px rgba(91, 75, 117, 0.15))",

            // Fallback
            color: "#2A2A3C", 
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            letterSpacing: -0.5,
            mb: 3,
            opacity: 0.8,
          }}
        >
          {title}
        </Typography>

        {/* GLASSY BIO CONTAINER */}
        <Box
          sx={{
            maxWidth: "640px",
            mx: "auto",
            px: { xs: 3, md: 5 },
            py: { xs: 2, md: 3 },
            borderRadius: "40px",
            
            // Glassmorphism
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 8px 32px rgba(253, 113, 255, 0.5)",
          }}
        >
          <Typography
            sx={{
              // SMALL FONT SIZE
              fontSize: { xs: "0.75rem", md: "0.875rem" }, 
              lineHeight: 1.8,
              color: "#4A5568",
              fontWeight: 500,
            }}
          >
            I engineer custom <Highlight>management systems</Highlight> and <Highlight>academic capstone projects</Highlight>, tailoring software to streamline your specific workflow. 
            Passionate about <Highlight>AI</Highlight> and modern tech, I transform complex requirements into powerful, intelligent solutions.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}