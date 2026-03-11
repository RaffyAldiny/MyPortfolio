"use client";

import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { SKILLS, type Skill, type SkillGroup } from "@/constants/skills";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

const textShimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const prismRotate = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

type GroupKey = "all" | SkillGroup;

const GROUP_OPTIONS: ReadonlyArray<{ value: GroupKey; label: string }> = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "data", label: "Data" },
  { value: "tools", label: "Tools" },
];

const PRISM_GRADIENT =
  "linear-gradient(135deg, rgba(255,138,216,0.75), rgba(129,236,255,0.70), rgba(197,152,255,0.70), rgba(125,255,203,0.70))";
const TITLE_GRADIENT = "linear-gradient(90deg, #ff8ad8, #81ecff, #c598ff, #7dffcb)";
const INK = "#0B0B10";

function SkillPill({ skill }: { skill: Skill }) {
  const { name, color, textColor, icon } = skill;
  const fg = textColor ?? "#2D2D3A";
  const baseShadow = `0 4px 14px ${alpha(color, 0.12)}`;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: { xs: 0.8, sm: 1.35 },
        px: { xs: 1.2, sm: 2 },
        py: { xs: 0.7, sm: 1.15 },
        borderRadius: { xs: 2.2, sm: 3 },
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 0.22)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: baseShadow,
        transition: "transform 180ms ease, box-shadow 180ms ease",
        willChange: "transform, opacity",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 12px 24px ${alpha(color, 0.22)}`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px",
          background: `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(
            color,
            0.8
          )}, ${alpha(color, 0.2)})`,
          backgroundSize: "200% 200%",
          animation: `${prismRotate} 4s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
      }}
      data-skill-pill
    >
      <Avatar
        src={icon}
        alt={name}
        variant="rounded"
        sx={{
          width: { xs: 18, sm: 26 },
          height: { xs: 18, sm: 26 },
          bgcolor: "rgba(255,255,255,0.6)",
          p: { xs: 0.35, sm: 0.45 },
          borderRadius: 1,
        }}
        imgProps={{ style: { objectFit: "contain" } }}
      />
      <Typography
        sx={{
          fontSize: { xs: 10, sm: 13 },
          fontWeight: 900,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: fg,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default function SkillsShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = React.useState<GroupKey>("all");
  const [hasEntered, setHasEntered] = React.useState(reducedMotion);
  const previousActiveRef = React.useRef<GroupKey>("all");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const pillsRef = React.useRef<HTMLDivElement>(null);

  const filtered = React.useMemo(() => {
    if (active === "all") return SKILLS;
    return SKILLS.filter((skill) => skill.groups.includes(active));
  }, [active]);

  React.useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
    }
  }, [reducedMotion]);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>("[data-skill-fade]");
      const pills = gsap.utils.toArray<HTMLElement>("[data-skill-pill]");

      if (reducedMotion) {
        gsap.set([...revealTargets, ...pills], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.set(revealTargets, { autoAlpha: 0, y: 24 });
      gsap.set(pills, { autoAlpha: 0, y: 20, scale: 0.96 });

      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { yPercent: -8 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        once: true,
        onEnter: () => {
          setHasEntered(true);

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(revealTargets, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
            })
            .to(
              pills,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.42,
                stagger: 0.018,
              },
              "-=0.32"
            );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const scope = pillsRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const pills = gsap.utils.toArray<HTMLElement>("[data-skill-pill]");
      if (!pills.length) return;

      if (reducedMotion) {
        gsap.set(pills, { autoAlpha: 1, clearProps: "transform" });
        previousActiveRef.current = active;
        return;
      }

      if (!hasEntered) {
        return;
      }

      if (previousActiveRef.current === active) {
        previousActiveRef.current = active;
        return;
      }

      previousActiveRef.current = active;

      gsap.fromTo(
        pills,
        { autoAlpha: 0, y: 18, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.34,
          ease: "power2.out",
          stagger: 0.015,
          overwrite: true,
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [active, hasEntered, reducedMotion]);

  return (
    <Box
      ref={rootRef}
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 12 },
        px: { xs: 0, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        ref={backdropRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.25,
          backgroundImage: `
            radial-gradient(rgba(140, 197, 252, 0.45) 1px, transparent 1px),
            radial-gradient(rgba(224, 195, 252, 0.40) 1px, transparent 1px)
          `,
          backgroundSize: { xs: "20px 20px", md: "34px 34px" },
          backgroundPosition: "0 0, 10px 10px",
          maskImage: "radial-gradient(circle at 50% 45%, #000 0%, #000 55%, transparent 90%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ width: "100%", maxWidth: 1100, zIndex: 1, px: { xs: 2, sm: 0 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.8rem", sm: "3.5rem", md: "5rem" },
            mb: { xs: 2, md: 1.5 },
            textTransform: "uppercase",
            textAlign: "center",
            backgroundImage: TITLE_GRADIENT,
            backgroundSize: "200% auto",
            animation: reducedMotion ? "none" : `${textShimmer} 3s linear infinite`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 12px rgba(212, 179, 255, 0.3))",
          }}
          data-skill-fade
        >
          My Tech Stack
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: alpha(INK, 0.7),
            letterSpacing: 0.1,
            mb: { xs: 4, md: 5 },
            fontSize: { xs: 12, md: 14.5 },
            lineHeight: 1.5,
            maxWidth: 680,
            mx: "auto",
          }}
          data-skill-fade
        >
          Modern tools I use to craft clean user interfaces, reliable backends,
          and scalable production-ready systems.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "center" },
            mb: { xs: 4, md: 6 },
            overflowX: "auto",
            width: "100%",
            pb: 2,
            px: { xs: 2, sm: 0 },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          data-skill-fade
        >
          <ToggleButtonGroup
            exclusive
            value={active}
            onChange={(_, value) => value && setActive(value)}
            sx={{
              position: "relative",
              borderRadius: { xs: 3, sm: 999 },
              p: 0.5,
              backgroundColor: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexWrap: "nowrap",
              gap: 0.5,
              minWidth: "max-content",
              "& .MuiToggleButton-root": {
                border: 0,
                borderRadius: { xs: 2.5, sm: 999 },
                textTransform: "uppercase",
                fontWeight: 900,
                letterSpacing: 0.8,
                fontSize: { xs: 10, sm: 11.5 },
                px: { xs: 2, sm: 2.5 },
                py: { xs: 1, sm: 0.95 },
                color: alpha(INK, 0.6),
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                "&:active": { transform: "scale(0.96)" },
              },
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.9)",
                color: INK,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                position: "relative",
              },
              "& .MuiToggleButton-root.Mui-selected::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "1.5px",
                background: PRISM_GRADIENT,
                backgroundSize: "200% 200%",
                animation: reducedMotion ? "none" : `${prismRotate} 4s linear infinite`,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            {GROUP_OPTIONS.map((group) => (
              <ToggleButton key={group.value} value={group.value}>
                {group.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box
          ref={pillsRef}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, sm: 2 },
            maxWidth: 1000,
            width: "100%",
            mx: "auto",
            px: { xs: 1, sm: 0 },
          }}
        >
          {filtered.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

