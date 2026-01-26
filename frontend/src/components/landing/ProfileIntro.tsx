"use client";

import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

type ProfileIntroProps = {
  name: string;
  title: string;
  bio: string;
  imageSrc: string; // "/me.jpg"
};

export default function ProfileIntro({
  name,
  title,
  bio,
  imageSrc,
}: ProfileIntroProps) {
  return (
    <Stack alignItems="center" spacing={2.2} sx={{ textAlign: "center" }}>
      {/* Thinner ring */}
      <Box
        sx={(theme) => ({
          p: 0.25,
          borderRadius: "50%",
          background: `linear-gradient(135deg,
            ${alpha(theme.palette.primary.main, 0.95)},
            ${alpha(theme.palette.secondary.main, 0.95)}
          )`,
          boxShadow: `0 18px 52px ${alpha(theme.palette.primary.main, 0.22)}`,
        })}
      >
        <Avatar
          src={imageSrc}
          alt={name}
          sx={{
            width: 112,
            height: 112,
            border: `1.5px solid ${alpha("#fff", 0.72)}`,
          }}
        />
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 950,
            letterSpacing: -0.8,
            lineHeight: 1.12,
          }}
        >
          {name}
        </Typography>

        <Typography sx={{ mt: 1, fontWeight: 750, opacity: 0.9 }}>
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1.3,
            opacity: 0.85,
            lineHeight: 1.85,
            maxWidth: 720,
            mx: "auto",
          }}
        >
          {bio}
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        sx={{ mt: 0.5 }}
      >
      </Stack>
    </Stack>
  );
}
