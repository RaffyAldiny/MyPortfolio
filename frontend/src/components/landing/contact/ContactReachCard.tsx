"use client";

import * as React from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ContactRow from "@/components/landing/contact/ContactRow";
import { SX } from "@/components/landing/contact/letsWorkTogether.styles";

type Props = {
  copied: boolean;
  copySuccess: string;
  email: string;
  githubUrl: string;
  inquiryFormUrl: string;
  inquiryQrSrc: string;
  onCopyEmail: () => void;
  onCopyGitHub: () => Promise<void>;
};

export default function ContactReachCard({
  copied,
  copySuccess,
  email,
  githubUrl,
  inquiryFormUrl,
  inquiryQrSrc,
  onCopyEmail,
  onCopyGitHub,
}: Props) {
  return (
    <Box sx={SX.sideCard}>
      <Box sx={SX.sideUtility} data-contact-reveal>
        <Box sx={SX.utilityDot} />
        Reach Out
      </Box>

      <Box>
        <Stack spacing={1.15}>
          <ContactRow
            label="Email"
            value={
              <Box sx={SX.inlineValueRow}>
                <Typography component="span" sx={{ ...SX.contactValue, mt: 0 }}>
                  {email}
                </Typography>
                <IconButton
                  aria-label={copied ? copySuccess : "Copy email"}
                  onClick={onCopyEmail}
                  sx={SX.inlineCopyBtn}
                >
                  <ContentCopyRoundedIcon sx={{ fontSize: "0.92rem" }} />
                </IconButton>
              </Box>
            }
            href={`mailto:${email}`}
            icon={<MailOutlineIcon />}
            actionLabel="Email"
          />

          <ContactRow
            label="GitHub"
            value={
              <Box sx={SX.inlineValueRow}>
                <Typography component="span" sx={{ ...SX.contactValue, mt: 0 }}>
                  github.com/RaffyAldiny
                </Typography>
                <IconButton
                  aria-label="Copy GitHub profile link"
                  onClick={onCopyGitHub}
                  sx={SX.inlineCopyBtn}
                >
                  <ContentCopyRoundedIcon sx={{ fontSize: "0.92rem" }} />
                </IconButton>
              </Box>
            }
            href={githubUrl}
            icon={<GitHubIcon />}
            actionLabel="Open"
          />

          <ContactRow
            label="Project Inquiry"
            value={
              <Typography component="div" sx={{ ...SX.contactValue, mt: 0.35, whiteSpace: "normal" }}>
                Short form for project inquiries.
              </Typography>
            }
            href={inquiryFormUrl}
            icon={<DescriptionOutlinedIcon />}
            actionLabel="Open Form"
          />

          <Box
            component="a"
            href={inquiryFormUrl}
            target="_blank"
            rel="noreferrer"
            sx={SX.qrBlock}
            data-contact-reveal
            aria-label="Open the project inquiry form with the QR code"
          >
            <Box sx={SX.qrMeta}>
              <Typography sx={SX.qrLead}>Prefer mobile?</Typography>
              <Typography sx={SX.qrText}>
                Scan to open the inquiry form on your phone.
              </Typography>
            </Box>

            <Box sx={SX.qrTile}>
              <Box
                component="img"
                src={inquiryQrSrc}
                alt="QR code linking to the project inquiry form"
                sx={SX.qrImage}
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
