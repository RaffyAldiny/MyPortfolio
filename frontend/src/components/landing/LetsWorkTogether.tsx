"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import ContactHero from "@/components/landing/contact/ContactHero";
import ContactReachCard from "@/components/landing/contact/ContactReachCard";
import { SX } from "@/components/landing/contact/letsWorkTogether.styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const EMAIL = "rafaelagoncillo@gmail.com";
const GITHUB_URL = "https://github.com/RaffyAldiny";
const INQUIRY_FORM_URL = "https://forms.gle/hY6Z1aUsNf8jQ4937";
const INQUIRY_QR_SRC = "/images/qr/system-inquiry-QR.svg";
const COPY_SUCCESS = "Email copied";

const OFFERINGS = [
  "Custom Management Systems",
  "Admin Dashboards",
  "Capstone / Thesis Platforms",
  "Full-Stack Web Apps",
  "AI Workflow Integrations",
] as const;

export default function LetsWorkTogether() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const copyResetRef = React.useRef<number | null>(null);

  const handleRevisitProjects = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById("projects");
    if (!target) return;

    const y = window.scrollY + target.getBoundingClientRect().top;
    window.history.replaceState(null, "", "/#projects");
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = window.setTimeout(() => {
        setCopied(false);
        copyResetRef.current = null;
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, []);

  const handleCopyGitHub = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(GITHUB_URL);
    } catch {}
  }, []);

  React.useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveal = gsap.utils.toArray<HTMLElement>("[data-contact-reveal]");
      const titleLines = gsap.utils.toArray<HTMLElement>("[data-contact-title-line]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
          once: true,
        },
      });

      tl.fromTo(
        titleLines,
        {
          autoAlpha: 0,
          yPercent: 110,
          rotateX: -60,
          transformOrigin: "50% 100%",
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "expo.out",
        }
      ).fromTo(
        reveal,
        {
          autoAlpha: 0,
          y: 26,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          stagger: 0.08,
        },
        "-=0.45"
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Box ref={rootRef} sx={SX.section}>
      <Box sx={SX.backdrop} />

      <Box sx={SX.shell}>
        <Box sx={SX.panel}>
          <ContactHero
            email={EMAIL}
            githubUrl={GITHUB_URL}
            offerings={OFFERINGS}
            onRevisitProjects={handleRevisitProjects}
          />

          <ContactReachCard
            copied={copied}
            copySuccess={COPY_SUCCESS}
            email={EMAIL}
            githubUrl={GITHUB_URL}
            inquiryFormUrl={INQUIRY_FORM_URL}
            inquiryQrSrc={INQUIRY_QR_SRC}
            onCopyEmail={handleCopy}
            onCopyGitHub={handleCopyGitHub}
          />
        </Box>
      </Box>
    </Box>
  );
}
