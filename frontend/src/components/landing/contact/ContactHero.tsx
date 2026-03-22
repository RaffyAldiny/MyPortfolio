"use client";

import * as React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { SX } from "@/components/landing/contact/letsWorkTogether.styles";

type Props = {
  email: string;
  githubUrl: string;
  offerings: readonly string[];
  onRevisitProjects: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function ContactHero({
  email,
  githubUrl,
  offerings,
  onRevisitProjects,
}: Props) {
  return (
    <Box sx={SX.copyPanel}>
      <Box sx={SX.copyInner}>
        <Typography sx={SX.kicker} data-contact-reveal>
          | Let&apos;s Work Together
        </Typography>

        <Box sx={{ overflow: "hidden" }}>
          <Typography sx={SX.title} component="div">
            <Box component="span" sx={SX.titleLine} data-contact-title-line>
              Build Something
            </Box>
            <Box component="span" sx={SX.titleLineWithRule} data-contact-title-line>
              <Box component="span">Useful</Box>
              <Box component="span" aria-hidden sx={SX.titleRule} />
            </Box>
            <Box component="span" sx={SX.titleLine} data-contact-title-line>
              And Actually Deployable.
            </Box>
          </Typography>
        </Box>

        <Typography sx={SX.summary} data-contact-reveal>
          I build useful, deployable systems with structure, clarity, and
          practical execution, from custom management software and academic
          platforms to production-ready full-stack products with strong admin
          workflows.
        </Typography>

        <Box sx={SX.accentRow} data-contact-reveal>
          <Box sx={SX.availabilityDot} />
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.92rem", md: "1rem" } }}>
            Open for serious builds, product collaborations, and tailored system
            work.
          </Typography>
        </Box>

        <Box sx={SX.chipWrap} data-contact-reveal>
          {offerings.map((item) => (
            <Chip key={item} label={item} sx={SX.chip} />
          ))}
        </Box>

        <Box sx={SX.ctaRow} data-contact-reveal>
          <Button href={`mailto:${email}`} endIcon={<ArrowOutwardIcon />} sx={SX.primaryBtn}>
            Start a Conversation
          </Button>

          <Button
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            endIcon={<GitHubIcon />}
            sx={SX.secondaryBtn}
          >
            View GitHub
          </Button>

          <Button
            href="/#projects"
            onClick={onRevisitProjects}
            endIcon={<ArrowOutwardIcon />}
            sx={SX.secondaryBtn}
          >
            Revisit Projects
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
