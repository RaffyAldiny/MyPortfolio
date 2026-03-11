// frontend/src/theme.ts
"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: 'var(--font-poppins), "Segoe UI", sans-serif',
  },
});

export default theme;

