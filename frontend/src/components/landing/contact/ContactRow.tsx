"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SX } from "@/components/landing/contact/letsWorkTogether.styles";

type Props = {
  label: string;
  value: React.ReactNode;
  href?: string;
  icon: React.ReactNode;
  actionLabel: string;
  onAction?: () => void;
};

export default function ContactRow({
  label,
  value,
  href,
  icon,
  actionLabel,
  onAction,
}: Props) {
  const isExternal = Boolean(href?.startsWith("http"));

  return (
    <Box sx={SX.contactCard} data-contact-reveal>
      <Stack direction="row" spacing={1.2} sx={{ minWidth: 0, alignItems: "center", flex: 1 }}>
        <Box
          sx={{
            color: { xs: "#DDFED7", sm: "#179123" },
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
        <Box sx={SX.contactMeta}>
          <Typography sx={SX.contactTitle}>{label}</Typography>
          {typeof value === "string" ? (
            <Typography component="div" sx={{ ...SX.contactValue, mt: 0.35 }}>
              {value}
            </Typography>
          ) : (
            <Box component="div">{value}</Box>
          )}
        </Box>
      </Stack>

      {href ? (
        <Button
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          variant="outlined"
          sx={SX.contactAction}
        >
          {actionLabel}
        </Button>
      ) : (
        <Button onClick={onAction} variant="outlined" sx={SX.contactAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
