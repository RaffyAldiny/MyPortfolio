"use client";

import * as React from "react";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  const bg = alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.55 : 0.72);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: bg,
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar disableGutters>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isMdUp && (
                <IconButton
                  aria-label="Open menu"
                  onClick={() => setOpen(true)}
                  sx={{ mr: 0.5 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <MuiLink
                component={NextLink}
                href="/"
                underline="none"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 800,
                  letterSpacing: -0.3,
                  color: "text.primary",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.12)}`,
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    fontSize: 16,
                    fontWeight: 800,
                    background: `linear-gradient(90deg, ${theme.palette.text.primary}, ${alpha(
                      theme.palette.text.primary,
                      0.6
                    )})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Rafael
                </Typography>
              </MuiLink>
            </Box>

            <Box sx={{ flex: 1 }} />

            {isMdUp && (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                {navItems.map((item) => (
                  <MuiLink
                    key={item.href}
                    component={NextLink}
                    href={item.href}
                    underline="none"
                    sx={{
                      px: 1.25,
                      py: 0.75,
                      borderRadius: 999,
                      color: "text.primary",
                      fontSize: 14,
                      opacity: 0.9,
                      "&:hover": {
                        opacity: 1,
                        backgroundColor: alpha(theme.palette.text.primary, 0.06),
                      },
                    }}
                  >
                    {item.label}
                  </MuiLink>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <IconButton
                aria-label="GitHub"
                component="a"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                sx={{ opacity: 0.85, "&:hover": { opacity: 1 } }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="LinkedIn"
                component="a"
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                sx={{ opacity: 0.85, "&:hover": { opacity: 1 } }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>

              <Button
                component={NextLink}
                href="/#projects"
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                }}
              >
                View Projects
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>Menu</Typography>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.href}
                component={NextLink}
                href={item.href}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
