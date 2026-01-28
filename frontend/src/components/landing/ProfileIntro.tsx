// src/components/landing/ProfileIntro.tsx
"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/material";

/* ================== Animations ================== */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const reverseSpin = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

/* ================== Constants ================== */
const PROFILE = {
  name: "Rafael Alden Agoncillo",
  title: "Computer Science Graduate • Full-Stack Developer",
  imageSrc: "/resources/my%20portfolio-picture.jpg",
} as const;

const PRISM_GRADIENT =
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #E0C3FC 50%, #8EC5FC 75%, #D4FFEC 100%)";

const AVATAR_SIZE = { xs: 130, md: 160 } as const;

/* ================== Hoisted sx (less allocations per render) ================== */
const SX = {
  root: {
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    mx: "auto",
    py: { xs: 4, md: 6 },
    overflow: "hidden",
    spacing: 3,
  },

  hook: {
    fontWeight: 900,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.2rem" },
    lineHeight: 1.1,
    animation: `${float} 3.5s ease-in-out infinite`,
    mb: 0,

    background: "linear-gradient(135deg, #FF9A9E 0%, #E0C3FC 50%, #8EC5FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    filter: "drop-shadow(0px 4px 12px rgba(224, 195, 252, 0.5))",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 1, md: 2 },
  },

  waveEmoji: {
    fontSize: "1.1em",
    display: "inline-block",
    animation: `${wave} 2.5s infinite ease-in-out`,
    transformOrigin: "70% 70%",
    background: PRISM_GRADIENT,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    filter: "drop-shadow(0 0 8px rgba(224, 195, 252, 0.6))",
  },

  avatarWrap: { position: "relative", display: "inline-flex", mt: 1 },

  ringOuter: {
    position: "absolute",
    top: -24,
    left: -24,
    right: -24,
    bottom: -24,
    borderRadius: "50%",
    border: "1px dashed rgba(184, 242, 255, 0.6)",
    animation: `${reverseSpin} 20s linear infinite`,
    zIndex: 0,
  },

  ringInner: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FFC7EA, #B8F2FF)",
    animation: `${spin} 8s linear infinite`,
    zIndex: 1,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    padding: "2px",
  },

  prismOverlay: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    zIndex: 3,
    pointerEvents: "none",
    background:
      "linear-gradient(135deg, rgba(255, 154, 158, 0.6) 0%, rgba(224, 195, 252, 0.6) 50%, rgba(142, 197, 252, 0.6) 100%)",
    mixBlendMode: "color",
    margin: "4px",
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    border: "4px solid #fff",
    boxShadow: "0 10px 40px rgba(184, 242, 255, 0.4)",
    zIndex: 2,
    position: "relative",
    backgroundColor: "#fff",
    filter: "grayscale(100%) contrast(1.1)",
  },

  textWrap: { width: "100%", px: 2 },

  nameIntro: {
    fontWeight: 600,
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontSize: "0.85rem",
    mb: -0.5,
  },

  name: {
    fontWeight: 800,
    letterSpacing: "-0.03em",
    fontSize: { xs: "2rem", md: "3rem" },
    background: "linear-gradient(135deg, #2A2A3C 30%, #5B4B75 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    pb: 1,
    lineHeight: 1.2,
    filter: "drop-shadow(0px 2px 2px rgba(91, 75, 117, 0.15))",
  },

  title: {
    fontWeight: 600,
    color: "text.secondary",
    letterSpacing: -0.5,
    mb: 3,
    opacity: 0.8,
  },

  glass: {
    maxWidth: "640px",
    mx: "auto",
    px: { xs: 3, md: 5 },
    py: { xs: 2, md: 3 },
    borderRadius: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 32px rgba(253, 113, 255, 0.5)",
  },

  bio: {
    fontSize: { xs: "0.75rem", md: "0.875rem" },
    lineHeight: 1.8,
    color: "#4A5568",
    fontWeight: 500,
  },

  highlight: {
    fontWeight: 700,
    color: "#2D2D3A",
    position: "relative",
    whiteSpace: "nowrap",
    backgroundImage:
      "linear-gradient(120deg, transparent 0%, transparent 10%, #FFC7EA 10%, #B8F2FF 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 45%",
    backgroundPosition: "0 90%",
    px: 0.5,
  },
} as const;

/* ================== Helper ================== */
const Highlight = React.memo(function Highlight({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="span" sx={SX.highlight}>
      {children}
    </Box>
  );
});

/* ================== Component ================== */
function ProfileIntroInner() {
  const { name, title, imageSrc } = PROFILE;

  return (
    <Stack sx={SX.root}>
      {/* --- CATCHY HOOK --- */}
      <Typography variant="h1" sx={SX.hook}>
        HELLO THERE!
        <Box component="span" sx={SX.waveEmoji}>
          👋
        </Box>
      </Typography>

      {/* --- ANIMATED AVATAR CONTAINER --- */}
      <Box sx={SX.avatarWrap}>
        <Box sx={SX.ringOuter} />
        <Box sx={SX.ringInner} />
        <Box sx={SX.prismOverlay} />

        <Avatar src={imageSrc} alt={name} sx={SX.avatar} />
      </Box>

      {/* --- TEXT CONTENT --- */}
      <Box sx={SX.textWrap}>
        <Stack spacing={0} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="subtitle1" sx={SX.nameIntro}>
            I am
          </Typography>

          <Typography variant="h3" sx={SX.name}>
            {name}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={SX.title}>
          {title}
        </Typography>

        {/* --- GLASSY BIO CONTAINER --- */}
        <Box sx={SX.glass}>
          <Typography sx={SX.bio}>
            I develop custom <Highlight>management systems</Highlight> and{" "}
            <Highlight>academic capstone projects</Highlight>, tailoring software
            to streamline your specific workflow. I am also passionate about{" "}
            <Highlight>AI</Highlight> and <Highlight>modern tech stacks</Highlight>,
            building reliable and intelligent solutions that turn complex
            requirements into systems that are simple, efficient, and easy to 
            manage ( ˶ˆ꒳ˆ˵ )
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

const ProfileIntro = React.memo(ProfileIntroInner);
export default ProfileIntro;
