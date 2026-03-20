"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { SKILLS } from "@/constants/skills";
import SkillGroupFilter from "@/components/landing/skills/SkillGroupFilter";
import SkillPill from "@/components/landing/skills/SkillPill";
import {
  getSkillHopOrder,
  type GroupKey,
} from "@/components/landing/skills/skillShowcase.shared";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

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

  const hopOrder = React.useMemo(
    () => getSkillHopOrder(filtered.map((skill) => skill.name)),
    [filtered]
  );

  const hopIndexByName = React.useMemo(
    () =>
      new Map(hopOrder.map((name, index) => [name, index])),
    [hopOrder]
  );

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
        minHeight: { xs: "auto", md: "calc(100dvh - 96px)" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "center" },
        pt: { xs: 6, md: 4 },
        pb: { xs: "calc(104px + env(safe-area-inset-bottom))", md: 5 },
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
            radial-gradient(rgba(143, 174, 130, 0.22) 1px, transparent 1px),
            radial-gradient(rgba(95, 137, 97, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: { xs: "20px 20px", md: "34px 34px" },
          backgroundPosition: "0 0, 10px 10px",
          maskImage: "radial-gradient(circle at 50% 45%, #000 0%, #000 55%, transparent 90%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ width: "100%", maxWidth: 1180, zIndex: 1, px: { xs: 2, sm: 0 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.85rem", sm: "3.5rem", md: "4.7rem" },
            mb: { xs: 2, md: 1.15 },
            textTransform: "uppercase",
            textAlign: "center",
            color: "#1CDB2F",
            textShadow: "0 0 18px rgba(28, 219, 47, 0.14)",
          }}
          data-skill-fade
        >
          My Tech Stack
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "#1B4B22",
            letterSpacing: 0.1,
            mb: { xs: 4, md: 4 },
            fontSize: { xs: 13.5, md: 14.5 },
            lineHeight: { xs: 1.58, md: 1.5 },
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
            mb: { xs: 4, md: 4.25 },
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
          <SkillGroupFilter
            active={active}
            reducedMotion={reducedMotion}
            onChange={setActive}
          />
        </Box>

        <Box
          ref={pillsRef}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: { xs: 0.85, sm: 1.4, md: 1.55 },
            rowGap: { xs: 1.05, sm: 1.45, md: 1.55 },
            maxWidth: 1120,
            width: "100%",
            mx: "auto",
            px: { xs: 0.4, sm: 0 },
          }}
        >
          {filtered.map((skill) => (
            <SkillPill
              key={skill.name}
              skill={skill}
              animate={!reducedMotion && hasEntered}
              index={hopIndexByName.get(skill.name) ?? 0}
              totalCount={filtered.length}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
