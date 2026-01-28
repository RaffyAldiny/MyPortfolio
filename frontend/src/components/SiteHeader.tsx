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
  Chip,
} from "@mui/material";
import { alpha, useTheme, keyframes } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useHeaderTheme } from "@/context/HeaderTheme"; // Import hook

// --- CONFIGURATION ---
const PRISM_GRADIENT = "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #E0C3FC 50%, #8EC5FC 75%, #D4FFEC 100%)";
const DARK_TEXT = "#2D2D3A"; 
const GLASS_BG = "rgba(255, 255, 255, 0.65)";
const GLASS_BLUR = "blur(10px)";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { Icon: GitHubIcon, href: "https://github.com/" },
  { Icon: LinkedInIcon, href: "https://linkedin.com/" },
  { Icon: FacebookIcon, href: "https://facebook.com/" },
];

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const flow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const spinSlow = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function SiteHeader() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  // 1. Consume Context
  const { headerVisible } = useHeaderTheme();

  return (
    <>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <linearGradient id="prism-gradient-id" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9A9E" />
          <stop offset="25%" stopColor="#FECFEF" />
          <stop offset="50%" stopColor="#E0C3FC" />
          <stop offset="75%" stopColor="#8EC5FC" />
          <stop offset="100%" stopColor="#D4FFEC" />
        </linearGradient>
      </svg>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: GLASS_BG,
          backdropFilter: GLASS_BLUR,
          borderBottom: "1px solid transparent",
          borderImage: `${PRISM_GRADIENT} 1`,
          
          // 2. THE HIDING LOGIC
          // If headerVisible is false, slide UP (-100%)
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)", 
        }}
      >
        <Toolbar disableGutters sx={{ height: { xs: 64, md: 72 } }}>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            
            {/* Identity */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {!isMdUp && (
                <IconButton onClick={() => setOpen(true)} sx={{ mr: -1, color: "text.primary" }}>
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
                  gap: 1.5,
                  "&:hover .work-badge": { animationDuration: "1.5s" }
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: PRISM_GRADIENT,
                    boxShadow: "0 0 10px rgba(224, 195, 252, 0.6)",
                    transition: "transform 0.3s ease",
                    ".MuiLink-root:hover &": { transform: "scale(1.2)" }
                  }}
                />
                <Typography component="span" sx={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: DARK_TEXT }}>
                  Rafael Alden Agoncillo
                </Typography>
                {isMdUp && (
                  <Chip 
                    label="My Works" 
                    size="small"
                    className="work-badge"
                    sx={{
                      height: 24,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      background: PRISM_GRADIENT,
                      backgroundSize: "200% 200%",
                      animation: `${flow} 3s linear infinite`,
                      boxShadow: "0 2px 10px rgba(224, 195, 252, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-1px) scale(1.05)",
                        boxShadow: "0 4px 15px rgba(224, 195, 252, 0.6)",
                      }
                    }}
                  />
                )}
              </MuiLink>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Desktop Nav */}
            {isMdUp && (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mr: 2 }}>
                {NAV_ITEMS.map((item) => (
                  <MuiLink
                    key={item.href}
                    component={NextLink}
                    href={item.href}
                    underline="none"
                    sx={{
                      position: "relative",
                      px: 2,
                      py: 0.8,
                      fontWeight: 600,
                      fontSize: 15,
                      color: DARK_TEXT, 
                      transition: "all 0.2s ease",
                      zIndex: 1,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.8)",
                        border: "1px solid transparent",
                        borderColor: "rgba(224, 195, 252, 0)",
                        transform: "scale(0.85)",
                        opacity: 0,
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        zIndex: -1,
                      },
                      "&:hover": {
                        color: "#000",
                        transform: "scale(1.05)",
                        "&::before": {
                          opacity: 1,
                          transform: "scale(1)",
                          borderColor: "#E0C3FC",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      },
                      "&:active": { transform: "scale(0.95)" }
                    }}
                  >
                    {item.label}
                  </MuiLink>
                ))}
              </Stack>
            )}

            {/* Socials & CTA */}
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {SOCIALS.map(({ Icon, href }, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={href}
                  target="_blank"
                  sx={{
                    position: "relative",
                    overflow: "visible", 
                    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    "& svg": { 
                      fill: "url(#prism-gradient-id)",
                      transition: "filter 0.3s ease",
                      zIndex: 2, 
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      background: PRISM_GRADIENT,
                      opacity: 0,
                      filter: "blur(6px)",
                      transform: "scale(0.8)",
                      transition: "all 0.4s ease",
                      zIndex: 0,
                    },
                    "&:hover": { 
                      transform: "translateY(-3px)", 
                      "& svg": { filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" },
                      "&::before": {
                        opacity: 0.6,
                        transform: "scale(1)",
                        animation: `${spinSlow} 4s linear infinite`,
                      }
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}

              <Button
                component={NextLink}
                href="/#projects"
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  background: `linear-gradient(270deg, #FF9A9E, #E0C3FC, #8EC5FC)`,
                  backgroundSize: "200% 200%",
                  animation: `${shimmer} 6s ease infinite`,
                  color: "#fff",
                  boxShadow: "0 4px 14px 0 rgba(142, 197, 252, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.02)",
                    boxShadow: "0 6px 20px 0 rgba(224, 195, 252, 0.6)",
                  },
                }}
              >
                View Projects
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderRight: "1px solid rgba(255,255,255,0.5)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: "1.25rem",
              background: PRISM_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Menu
          </Typography>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.href}
                component={NextLink}
                href={item.href}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  "&:hover": {
                    background: alpha("#E0C3FC", 0.1),
                    "& .MuiListItemText-primary": { color: "#5B4B75", fontWeight: 600 },
                  },
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ sx: { color: DARK_TEXT, fontWeight: 600 } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}