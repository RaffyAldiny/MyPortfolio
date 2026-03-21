"use client";

import * as React from "react";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

type Params = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
};

export default function useProjectsAnimations({ containerRef, reducedMotion }: Params) {
  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const ctx = gsap.context(() => {
      const introTitleLines = gsap.utils.toArray<HTMLElement>('[data-project-intro="title-line"]');
      const introSubWrap = container.querySelector<HTMLElement>('[data-project-intro="sub-wrap"]');
      const introSub = container.querySelector<HTMLElement>('[data-project-intro="sub"]');
      const introAccent = container.querySelector<HTMLElement>('[data-project-intro="accent"]');
      const projectSlides = gsap.utils.toArray<HTMLElement>("[data-project-slide]");

      if (introTitleLines.length || introSubWrap || introAccent) {
        const introReveal = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: "#projects-archive",
            start: "top 72%",
            toggleActions: "restart none none none",
          },
        });

        if (introTitleLines.length) {
          introReveal.fromTo(
            introTitleLines,
            {
              yPercent: 118,
              rotateX: -68,
              rotateY: -6,
              autoAlpha: 0,
              transformOrigin: "50% 100%",
              willChange: "transform, opacity",
            },
            {
              yPercent: 0,
              rotateX: 0,
              rotateY: 0,
              autoAlpha: 1,
              duration: 1.05,
              stagger: 0.11,
              ease: "expo.out",
            }
          );
        }

        if (introAccent) {
          introReveal.fromTo(
            introAccent,
            {
              scaleX: 0.2,
              autoAlpha: 0,
              transformOrigin: "50% 50%",
              willChange: "transform, opacity",
            },
            {
              scaleX: 1,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }

        if (introSubWrap) {
          introReveal.fromTo(
            introSubWrap,
            {
              clipPath: "inset(0 0 100% 0)",
              autoAlpha: 1,
              willChange: "clip-path, transform, opacity",
            },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.58,
              ease: "power2.out",
            },
            "-=0.38"
          );
        }

        if (introSub) {
          introReveal.fromTo(
            introSub,
            {
              y: 18,
              autoAlpha: 0,
              willChange: "transform, opacity",
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.46,
              ease: "power2.out",
            },
            "-=0.42"
          );
        }
      }

      projectSlides.forEach((slide) => {
        const image = slide.querySelector<HTMLElement>("[data-project-image]");
        const content = slide.querySelector<HTMLElement>("[data-project-content]");
        const line = slide.querySelector<HTMLElement>("[data-project-line]");
        const tags = slide.querySelectorAll<HTMLElement>("[data-project-tag]");
        const actions = slide.querySelector<HTMLElement>("[data-project-actions]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.18 },
            {
              scale: 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 80, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (tags.length) {
          gsap.fromTo(
            tags,
            { y: 14, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.35,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                start: "top 62%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (actions) {
          gsap.fromTo(
            actions,
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef, reducedMotion]);
}
