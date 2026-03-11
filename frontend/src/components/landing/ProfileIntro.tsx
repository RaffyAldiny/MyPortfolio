"use client";

import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const PROFILE = {
  name: "Rafael Alden Agoncillo",
  title: "Computer Science Graduate / Full-Stack Developer",
  imageSrc: "/resources/my%20portfolio-picture.jpg",
} as const;

const PRISM_GRADIENT =
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #E0C3FC 50%, #8EC5FC 75%, #D4FFEC 100%)";

const AVATAR_SIZE = { xs: 130, md: 160 } as const;

const SX = {
  root: {
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    mx: "auto",
    py: { xs: 4, md: 6 },
    overflow: "hidden",
    position: "relative",
  },
  hook: {
    fontWeight: 900,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    fontSize: { xs: "2.0rem", sm: "2.7rem", md: "3.35rem" },
    lineHeight: 1.1,
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
  avatarFrame: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    border: "4px solid #fff",
    boxShadow: "0 10px 40px rgba(184, 242, 255, 0.4)",
    zIndex: 2,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: "50%",
  },
  textWrap: { width: "100%", px: 2 },
  nameIntro: {
    fontWeight: 600,
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontSize: "1.05rem",
    mb: -0.5,
  },
  name: {
    fontWeight: 800,
    letterSpacing: "-0.03em",
    fontSize: { xs: "2.2rem", md: "3.15rem" },
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
    fontSize: { xs: "1.2rem", md: "1.4rem" },
  },
  glass: {
    maxWidth: "680px",
    mx: "auto",
    px: { xs: 3, md: 5 },
    py: { xs: 2, md: 3 },
    borderRadius: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 32px rgba(224, 195, 252, 0.2)",
  },
  bio: {
    fontSize: { xs: "0.95rem", md: "1.0rem" },
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

function ProfileIntroInner() {
  const { name, title, imageSrc } = PROFILE;
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.78 } })
        .from('[data-hero="hook"]', { y: 30, autoAlpha: 0 })
        .from(
          '[data-hero="avatar-shell"]',
          { y: 32, autoAlpha: 0, scale: 0.88, rotate: -8, duration: 0.9 },
          "-=0.42"
        )
        .from('[data-hero="eyebrow"]', { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.38")
        .from('[data-hero="name"]', { y: 26, autoAlpha: 0 }, "-=0.3")
        .from('[data-hero="title"]', { y: 16, autoAlpha: 0, duration: 0.55 }, "-=0.4")
        .from(
          '[data-hero="glass"]',
          { y: 24, autoAlpha: 0, scale: 0.97, duration: 0.7 },
          "-=0.32"
        );

      gsap.to('[data-hero="avatar-shell"]', {
        y: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to('[data-hero="ring-outer"]', {
        rotation: -360,
        duration: 24,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to('[data-hero="ring-inner"]', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to('[data-hero="wave"]', {
        rotation: 18,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        repeatDelay: 1.2,
        transformOrigin: "70% 70%",
      });

      gsap.to('[data-hero="hook"]', {
        y: -6,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to('[data-hero="glass"]', {
        y: -5,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Stack ref={rootRef} spacing={3} sx={SX.root}>
      <Typography variant="h1" sx={SX.hook} data-hero="hook">
        HELLO THERE!
        <Box component="span" sx={SX.waveEmoji} data-hero="wave">
          {"\uD83D\uDC4B"}
        </Box>
      </Typography>

      <Box sx={{ ...SX.avatarWrap, mt: 5 }} data-hero="avatar-shell">
        <Box sx={SX.ringOuter} data-hero="ring-outer" />
        <Box sx={SX.ringInner} data-hero="ring-inner" />
        <Box sx={SX.prismOverlay} />
        <Box sx={SX.avatarFrame}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            priority
            quality={88}
            sizes="(max-width: 900px) 130px, 160px"
            style={{ objectFit: "cover", filter: "grayscale(100%) contrast(1.1)" }}
          />
        </Box>
      </Box>

      <Box sx={SX.textWrap}>
        <Stack spacing={0} alignItems="center" sx={{ mb: 1, mt: 3 }}>
          <Typography variant="subtitle1" sx={SX.nameIntro} data-hero="eyebrow">
            I am
          </Typography>
          <Typography variant="h3" sx={SX.name} data-hero="name">
            {name}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={SX.title} data-hero="title">
          {title}
        </Typography>

        <Box sx={SX.glass} data-hero="glass">
          <Typography sx={SX.bio}>
            I develop <Highlight>custom management systems</Highlight> and{" "}
            <Highlight>academic capstone projects</Highlight>, tailoring software to
            streamline your specific workflow. I am also passionate about{" "}
            <Highlight>AI</Highlight> and <Highlight>modern tech stacks</Highlight>,
            building reliable and intelligent solutions that turn complex requirements
            into systems that are simple, efficient, and easy to manage (^_^)
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

const ProfileIntro = React.memo(ProfileIntroInner);
export default ProfileIntro;
