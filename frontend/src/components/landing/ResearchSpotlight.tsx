"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ResearchMetrics from "@/components/landing/research/ResearchMetrics";
import { HoverLinkTooltip, ReferenceLink } from "@/components/landing/research/ResearchLinkHelpers";
import ResearchSidebar from "@/components/landing/research/ResearchSidebar";
import {
  SX,
} from "@/components/landing/research/researchSpotlight.styles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ensureGsap, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const ARTICLE_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/view/1126";
const PDF_URL =
  "https://journal.ijprse.com/index.php/ijprse/article/download/1126/1088/1867";
const RESEARCH_QR_SRC = "/images/qr/research-study-QR.svg";
const CELEB_DF_URL = "https://github.com/yuezunli/celeb-deepfakeforensics";
const EFFICIENTNET_B0_URL =
  "https://keras.io/api/applications/efficientnet/efficientnet_models/#efficientnetb0-function";
const GAT_URL = "https://arxiv.org/pdf/1710.10903";
const GRU_URL =
  "https://www.geeksforgeeks.org/machine-learning/gated-recurrent-unit-networks/";

export default function ResearchSpotlight() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root || reducedMotion) return;

    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      const reveal = gsap.utils.toArray<HTMLElement>("[data-research-reveal]");

      gsap.set(reveal, { autoAlpha: 0, y: 24 });

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;

          observer?.disconnect();
          observer = null;

          gsap.to(reveal, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
        { threshold: 0.24 }
      );

      observer.observe(root);
    }, root);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <Box ref={rootRef} sx={SX.section}>
      <Box sx={SX.aura} />

      <Box sx={SX.card} data-research-card>
        <Box sx={SX.panel}>
          <Box>
            <Typography sx={SX.thesisLabel} data-research-reveal>
              | My Thesis Study
            </Typography>

            <Typography sx={SX.paperTitle} data-research-reveal>
              Enhancement of Deepfake Detection Framework Integrating EfficientNet-B0,
              Graph Attention Networks, and Gated Recurrent Units
            </Typography>

            <Box sx={SX.authors} data-research-reveal>
              <Typography component="span" sx={SX.byPrefix}>
                by
              </Typography>

              <Box sx={SX.authorGroup}>
                <Typography component="span" sx={SX.authorName}>
                  Rafael Alden F. Agoncillo
                  <Box component="span" sx={SX.authorSup}>
                    1
                  </Box>
                </Typography>
                <HoverLinkTooltip title="rafaelagoncillo@gmail.com">
                  <Box
                    component="a"
                    href="mailto:rafaelagoncillo@gmail.com"
                    sx={SX.authorIconLink}
                    aria-label="Email Rafael Alden F. Agoncillo"
                  >
                    <MailOutlineIcon />
                  </Box>
                </HoverLinkTooltip>
                <HoverLinkTooltip title="https://github.com/RaffyAldiny">
                  <Box
                    component="a"
                    href="https://github.com/RaffyAldiny"
                    target="_blank"
                    rel="noreferrer"
                    sx={SX.authorIconLink}
                    aria-label="GitHub profile of Rafael Alden F. Agoncillo"
                  >
                    <GitHubIcon />
                  </Box>
                </HoverLinkTooltip>
              </Box>

              <Typography component="span" sx={SX.authorSeparator}>
                ,
              </Typography>

              <Box sx={SX.authorGroup}>
                <Typography component="span" sx={SX.authorName}>
                  James Kenneth M. Kiunisala
                  <Box component="span" sx={SX.authorSup}>
                    2
                  </Box>
                </Typography>
                <HoverLinkTooltip title="https://github.com/b0kja85">
                  <Box
                    component="a"
                    href="https://github.com/b0kja85"
                    target="_blank"
                    rel="noreferrer"
                    sx={SX.authorIconLink}
                    aria-label="GitHub profile of James Kenneth M. Kiunisala"
                  >
                    <GitHubIcon />
                  </Box>
                </HoverLinkTooltip>
              </Box>
            </Box>

            <Typography sx={{ ...SX.summary, mt: 2 }} data-research-reveal>
              My published thesis study proposes a deepfake detection framework that
              combines{" "}
              <ReferenceLink href={EFFICIENTNET_B0_URL}>EfficientNet-B0</ReferenceLink>{" "}
              for feature extraction,{" "}
              <ReferenceLink href={GAT_URL}>Graph Attention Networks (GATs)</ReferenceLink>{" "}
              for spatial relationships, and{" "}
              <ReferenceLink href={GRU_URL}>Gated Recurrent Units (GRUs)</ReferenceLink>{" "}
              for temporal analysis. The paper
              reports{" "}
              <Box component="span" sx={SX.summaryAccent}>
                80.60% accuracy
              </Box>{" "}
              with{" "}
              <Box component="span" sx={SX.summaryAccent}>
                0.28 loss
              </Box>{" "}
              on{" "}
              <ReferenceLink href={CELEB_DF_URL}>
                Celeb-DF v2
              </ReferenceLink>
              , outperforming
              several common baselines.
            </Typography>

            <ResearchMetrics />
          </Box>

          <ResearchSidebar
            articleUrl={ARTICLE_URL}
            pdfUrl={PDF_URL}
            qrSrc={RESEARCH_QR_SRC}
          />
        </Box>
      </Box>
    </Box>
  );
}
