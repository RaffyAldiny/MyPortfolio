// src/components/SkillShowcase.tsx
"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { SKILLS, type Skill } from "@/constants/skills";

/* --- ANIMATIONS --- */

const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const prismRotate = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// The "Fly In" Effect
// Starts large, blurred, and invisible -> Snaps to normal
const flyIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(2) translateY(100px); 
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
`;

/* --- SUB-COMPONENT --- */

function SkillPill({ name, color, textColor, icon, index, show }: Skill & { index: number, show: boolean }) {
  const fg = textColor ?? "#2D2D3A";
  
  // Stagger delay based on index (0.05s per item)
  const delay = `${index * 0.04}s`; 

  return (
    <Box
      sx={{
        // Base Layout
        display: "inline-flex",
        alignItems: "center",
        gap: 1.5, // Enlarge gap
        px: 2,    // Enlarge padding X
        py: 1.2,  // Enlarge padding Y
        borderRadius: 3,

        // Animation State
        animation: show ? `${flyIn} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards` : "none",
        animationDelay: delay,
        opacity: 0, // Hidden by default until animation starts

        // Glass Style
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: `0 4px 20px ${alpha(color, 0.15)}`,
        transition: "transform 0.2s, box-shadow 0.2s",

        // Prism Border (Simplified)
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "2px", // Thicker border
          background: `linear-gradient(135deg, 
            ${alpha(color, 0.2)}, 
            ${alpha(color, 0.8)}, 
            ${alpha(color, 0.2)})`,
          backgroundSize: "200% 200%",
          animation: `${prismRotate} 4s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },

        "&:hover": {
          transform: "translateY(-4px) scale(1.05)",
          boxShadow: `0 12px 30px ${alpha(color, 0.3)}`,
          zIndex: 10,
        },
      }}
    >
      <Avatar
        src={icon}
        alt={name}
        variant="rounded"
        sx={{
          width: 28, // Enlarge Icon
          height: 28,
          bgcolor: "rgba(255,255,255,0.5)",
          p: 0.5,
          borderRadius: 1.5,
        }}
        imgProps={{ style: { objectFit: "contain" } }}
      />
      <Typography
        sx={{
          fontSize: 14, // Enlarge Text
          fontWeight: 800,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: fg,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

/* --- MAIN COMPONENT --- */

export default function SkillsShowcase() {
  // Simple intersection observer state
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when 20% of the section is visible
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        minHeight: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        
        // Snap Logic
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        
        py: 6,
        px: 2,
        overflow: "hidden" // Prevent animation overflow
      }}
    >
      {/* Title */}
      <Typography
        variant="h1" // Bigger Title
        sx={{
          fontWeight: 900,
          fontSize: { xs: "3rem", md: "5rem" }, // Responsive Large Size
          mb: 6,
          textTransform: "uppercase",
          textAlign: "center",
          
          // Gradient Text
          backgroundImage: "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)",
          backgroundSize: "200% auto",
          animation: `${textShimmer} 3s linear infinite`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 0 15px rgba(212, 179, 255, 0.4))",
          
          // Simple fade in for title
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-50px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        Tech Stack
      </Typography>

      {/* Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2, // Larger gap
          maxWidth: 1000, // Wider container
          width: "100%",
        }}
      >
        {SKILLS.map((skill, i) => (
          <SkillPill 
            key={skill.name} 
            {...skill} 
            index={i} 
            show={isVisible} // Pass trigger to children
          />
        ))}
      </Box>
    </Box>
  );
}