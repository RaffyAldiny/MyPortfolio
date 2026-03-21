"use client";

import * as React from "react";
import { ensureGsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

type Params = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}

export default function useProjectsScrollState({ containerRef }: Params) {
  const [progress, setProgress] = React.useState(0);
  const [archiveProgress, setArchiveProgress] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isInsideProjects, setIsInsideProjects] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const container = containerRef.current;
    if (!container) return;

    const updateIfChanged = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      nextValue: number
    ) => {
      setter((current) => (Math.abs(current - nextValue) > 0.001 ? nextValue : current));
    };

    const syncActiveIndexFromViewport = () => {
      const activationY = window.innerHeight * 0.52;
      const slideNodes = [
        container.querySelector<HTMLElement>("#projects-archive"),
        ...Array.from(container.querySelectorAll<HTMLElement>("[data-project-slide]")),
      ].filter((node): node is HTMLElement => Boolean(node));

      let nextIndex = 0;
      slideNodes.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        if (rect.top <= activationY && rect.bottom >= activationY * 0.35) {
          nextIndex = index;
        }
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const archiveEl = container.querySelector<HTMLElement>("#projects-archive");
    const slideNodes = Array.from(container.querySelectorAll<HTMLElement>("[data-project-slide]"));

    const archiveTrigger = archiveEl
      ? ScrollTrigger.create({
          trigger: archiveEl,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            updateIfChanged(setArchiveProgress, clamp01(self.progress));
          },
          onEnter: (self) => {
            updateIfChanged(setArchiveProgress, clamp01(self.progress));
            setActiveIndex(0);
          },
          onEnterBack: (self) => {
            updateIfChanged(setArchiveProgress, clamp01(self.progress));
            setActiveIndex(0);
          },
          onLeave: () => {
            setArchiveProgress(1);
          },
          onLeaveBack: () => {
            setArchiveProgress(0);
            setActiveIndex(0);
          },
        })
      : null;

    const slideTriggers = slideNodes.map((slide, index) =>
      ScrollTrigger.create({
        trigger: slide,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveIndex((current) => (current === index + 1 ? current : index + 1));
        },
        onEnterBack: () => {
          setActiveIndex((current) => (current === index + 1 ? current : index + 1));
        },
      })
    );

    const syncSectionState = (self: ScrollTrigger) => {
      updateIfChanged(setProgress, clamp01(self.progress));
      syncActiveIndexFromViewport();
    };

    const sectionTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onEnter: (self) => {
        setIsInsideProjects(true);
        syncSectionState(self);
      },
      onEnterBack: (self) => {
        setIsInsideProjects(true);
        syncSectionState(self);
      },
      onLeave: () => {
        setIsInsideProjects(false);
      },
      onLeaveBack: () => {
        setIsInsideProjects(false);
        setProgress(0);
        setArchiveProgress(0);
        setActiveIndex(0);
      },
      onUpdate: syncSectionState,
    });

    const handleRefresh = () => {
      if (!sectionTrigger.isActive) return;
      syncSectionState(sectionTrigger);
      if (archiveTrigger?.isActive) {
        updateIfChanged(setArchiveProgress, clamp01(archiveTrigger.progress));
      }
    };

    const isActive = sectionTrigger.isActive;
    setIsInsideProjects(isActive);
    if (isActive) {
      syncSectionState(sectionTrigger);
      if (archiveTrigger?.isActive) {
        updateIfChanged(setArchiveProgress, clamp01(archiveTrigger.progress));
      }
    }

    ScrollTrigger.addEventListener("refresh", handleRefresh);

    return () => {
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      archiveTrigger?.kill();
      slideTriggers.forEach((trigger) => trigger.kill());
      sectionTrigger.kill();
    };
  }, [containerRef]);

  return {
    progress,
    archiveProgress,
    activeIndex,
    isInsideProjects,
  };
}
