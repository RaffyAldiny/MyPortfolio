"use client";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { HoverLinkTooltip } from "@/components/landing/research/ResearchLinkHelpers";
import { SX } from "@/components/landing/research/researchSpotlight.styles";

const BADGES = [
  "EfficientNet-B0",
  "GAT",
  "GRU",
  "Celeb-DF v2",
  "Deepfake Detection",
] as const;

type Props = {
  articleUrl: string;
  pdfUrl: string;
  qrSrc: string;
};

export default function ResearchSidebar({ articleUrl, pdfUrl, qrSrc }: Props) {
  return (
    <Box sx={SX.sideCard} data-research-reveal>
      <Box>
        <Typography sx={SX.sideLabel}>Journal</Typography>
        <Typography sx={{ ...SX.journalTitle, mt: 1 }}>
          International Journal of Progressive Research in Science and Engineering
        </Typography>

        <Typography sx={{ ...SX.sideLabel, mt: 2.4, display: { xs: "none", sm: "block" } }}>
          Focus
        </Typography>

        <Box sx={{ ...SX.chipWrap, mt: 1, display: { xs: "none", sm: "flex" } }}>
          {BADGES.map((badge) => (
            <Chip key={badge} label={badge} size="small" sx={SX.chip} />
          ))}
        </Box>
      </Box>

      <Stack spacing={1.5}>
        <Typography sx={SX.sideLabel}>Access</Typography>

        <Box sx={SX.actions}>
          <HoverLinkTooltip title={articleUrl}>
            <Button
              href={articleUrl}
              target="_blank"
              rel="noreferrer"
              endIcon={<ArrowOutwardIcon />}
              sx={SX.primaryBtn}
            >
              View Article
            </Button>
          </HoverLinkTooltip>

          <HoverLinkTooltip title={pdfUrl}>
            <Button
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              startIcon={<DescriptionOutlinedIcon />}
              sx={SX.secondaryBtn}
            >
              Download PDF
            </Button>
          </HoverLinkTooltip>
        </Box>

        <Box
          component="a"
          href={articleUrl}
          target="_blank"
          rel="noreferrer"
          sx={SX.qrLink}
          data-research-reveal
          aria-label="Open the research study article with the QR code"
        >
          <Box sx={SX.qrCopy}>
            <Typography sx={SX.qrLead}>Prefer mobile?</Typography>
            <Typography sx={SX.qrText}>
              Scan to open the study on your phone.
            </Typography>
          </Box>

          <Box sx={SX.qrTile}>
            <Box
              component="img"
              src={qrSrc}
              alt="QR code for the published research study article"
              sx={SX.qrImage}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
