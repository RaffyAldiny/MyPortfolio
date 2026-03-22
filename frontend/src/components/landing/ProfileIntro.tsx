"use client";

import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const PROFILE = {
  name: "RaffyAldiny",
  title: "Computer Science Graduate / Full-Stack Developer",
  imageSrc: "/resources/my-portfolio-picture.avif",
} as const;

const PRISM_GRADIENT =
  "linear-gradient(135deg, #F3FFF0 0%, #CFFAC9 24%, #8EF587 46%, #1CDB2F 62%, #159E22 82%, #0B5A14 100%)";

const AVATAR_SIZE = { xs: 116, md: 160 } as const;

const SX = {
  root: {
    height: "100%",
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    maxWidth: 860,
    mx: "auto",
    py: { xs: 0, md: 6 },
    pt: { xs: "calc(16px + env(safe-area-inset-top))", md: 6 },
    pb: { xs: "calc(86px + env(safe-area-inset-bottom))", md: 6 },
    overflow: { xs: "auto", md: "hidden" },
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    position: "relative",
  },
  hook: {
    fontWeight: 900,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    fontSize: { xs: "2.02rem", sm: "2.7rem", md: "3.35rem" },
    lineHeight: 1.1,
    mb: 0,
    mt: 0,
    color: "#1CDB2F",
    filter: "drop-shadow(0px 2px 8px rgba(28, 219, 47, 0.12))",
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
    filter: "drop-shadow(0 0 8px rgba(28, 219, 47, 0.22))",
  },
  avatarWrap: {
    position: "relative",
    display: "inline-flex",
    mt: 0,
  },
  ringOuter: {
    position: "absolute",
    top: { xs: -18, md: -24 },
    left: { xs: -18, md: -24 },
    right: { xs: -18, md: -24 },
    bottom: { xs: -18, md: -24 },
    borderRadius: "50%",
    border: "1px dashed rgba(143, 174, 130, 0.46)",
    zIndex: 0,
  },
  ringInner: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #F6FBF3, #8FAE82)",
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
      "linear-gradient(135deg, rgba(243, 255, 240, 0.18) 0%, rgba(28, 219, 47, 0.12) 56%, rgba(11, 90, 20, 0.14) 100%)",
    mixBlendMode: "soft-light",
    margin: "4px",
  },
  avatarFrame: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    border: "4px solid #fff",
    boxShadow: "0 10px 40px rgba(91, 130, 96, 0.16)",
    zIndex: 2,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: "50%",
  },
  textWrap: {
    width: "100%",
    px: { xs: 1.5, md: 2 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nameIntro: {
    fontWeight: 700,
    color: "#314634",
    textTransform: "none",
    letterSpacing: "0.04em",
    fontSize: { xs: "1rem", md: "1.05rem" },
    mt: { xs: 1.8, md: 0 },
    mb: -0.5,
  },
  name: {
    fontWeight: 800,
    letterSpacing: "-0.03em",
    fontSize: { xs: "1.8rem", md: "2.7rem" },
    background:
      "linear-gradient(90deg, #63BC6D 0%, #89E891 50%, #63BC6D 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    pb: 1,
    lineHeight: 1.2,
    filter: "drop-shadow(0px 1px 1px rgba(99, 188, 109, 0.1))",
    display: "inline-flex",
    alignItems: "center",
    gap: { xs: 0.8, md: 1.05 },
    flexWrap: "wrap",
    justifyContent: "center",
  },
  sakura: {
    fontSize: { xs: "1.45rem", md: "1.65rem" },
    color: "#4DBB5A",
    WebkitTextFillColor: "#4DBB5A",
    background: "none",
    lineHeight: 1,
    transform: "translateY(-1px)",
    textShadow: "none",
  },
  title: {
    fontWeight: 600,
    color: "text.secondary",
    letterSpacing: -0.5,
    mt: { xs: -0.45, md: -0.18 },
    mb: { xs: 3, md: 3.4 },
    opacity: 0.8,
    fontSize: { xs: "1rem", md: "1.4rem" },
    textAlign: "center",
  },
  glass: {
    maxWidth: "760px",
    mx: "auto",
    width: "100%",
    px: { xs: 2.1, md: 5 },
    py: { xs: 1.8, md: 3 },
    borderRadius: { xs: "28px", md: "40px" },
    backgroundColor: "rgba(250, 255, 249, 0.9)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(28, 219, 47, 0.28)",
    boxShadow:
      "0 0 0 1px rgba(28, 219, 47, 0.08), 0 0 26px rgba(28, 219, 47, 0.14), 0 18px 40px rgba(28, 219, 47, 0.08)",
  },
  bio: {
    fontSize: { xs: "0.72rem", md: "0.95rem" },
    lineHeight: { xs: 1.68, md: 1.8 },
    color: "#465546",
    fontWeight: 500,
    textAlign: "center",
  },
  highlight: {
    fontWeight: 700,
    color: "#1A4721",
    position: "relative",
    whiteSpace: "nowrap",
    backgroundImage:
      "linear-gradient(120deg, transparent 0%, transparent 10%, #EDF5E8 10%, #CFE2C6 100%)",
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const introTl = gsap
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

      const FLOAT_TARGETS = [
        '[data-hero="hook"]',
        '[data-hero="avatar-shell"]',
        '[data-hero="eyebrow"]',
        '[data-hero="name"]',
        '[data-hero="title"]',
        '[data-hero="glass"]',
      ];

      if (!isMobile) {
        gsap.set(FLOAT_TARGETS, { willChange: "transform" });
      }

      introTl.eventCallback("onComplete", () => {
        if (!isMobile) {
          FLOAT_TARGETS.forEach((target, index) => {
            gsap.to(target, {
              y: -14,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.14,
              force3D: true,
              overwrite: "auto",
            });
          });
        }

        gsap.to('[data-hero="ring-outer"]', {
          rotation: -360,
          duration: isMobile ? 72 : 24,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });

        if (!isMobile) {
          gsap.to('[data-hero="ring-inner"]', {
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });

          gsap.to('[data-hero="sakura"]', {
            rotation: 360,
            duration: 6,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });
        }

        if (isMobile) {
          gsap.to('[data-hero="wave"]', {
            rotation: 10,
            duration: 0.8,
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut",
            repeatDelay: 0.7,
            transformOrigin: "70% 70%",
          });
        } else {
          gsap.to('[data-hero="wave"]', {
            rotation: 18,
            duration: 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            repeatDelay: 1.2,
            transformOrigin: "70% 70%",
          });
        }
      });

    }, root);

    return () => ctx.revert();
  }, [isMobile, reducedMotion]);

  return (
    <Stack ref={rootRef} spacing={{ xs: 2.7, md: 4 }} sx={SX.root}>
      <Box sx={{ pb: { xs: 1.8, md: 0 } }}>
        <Typography variant="h1" sx={SX.hook} data-hero="hook">
          HELLO THERE!
          <Box component="span" sx={SX.waveEmoji} data-hero="wave">
            {"\uD83D\uDC4B"}
          </Box>
        </Typography>
      </Box>

      <Box sx={{ pt: { xs: 0.3, md: 0 } }}>
        <Box sx={SX.avatarWrap} data-hero="avatar-shell">
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
      </Box>

      <Box sx={SX.textWrap}>
        <Stack spacing={0} alignItems="center" sx={{ mb: { xs: 1, md: 1.25 } }}>
          <Typography variant="subtitle1" sx={SX.nameIntro} data-hero="eyebrow">
            I&apos;m
          </Typography>
          <Typography variant="h3" sx={SX.name} data-hero="name">
            <Box component="span" sx={SX.sakura} data-hero="sakura">
              ✿
            </Box>
            {name}
            <Box component="span" sx={SX.sakura} data-hero="sakura">
              ✿
            </Box>
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
            using them to build reliable, intelligent solutions that turn complex
            requirements into systems that feel simple, efficient, and easy to
            manage (^_^)
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

const ProfileIntro = React.memo(ProfileIntroInner);
export default ProfileIntro;
