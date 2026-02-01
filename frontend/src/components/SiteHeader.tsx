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
  Divider,
} from "@mui/material";
import { alpha, useTheme, keyframes } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useHeaderTheme } from "@/context/HeaderTheme";

// --- CONFIGURATION ---
const PRISM_GRADIENT = "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #E0C3FC 50%, #8EC5FC 75%, #D4FFEC 100%)";
const DARK_TEXT = "#2D2D3A";
const GLASS_BG = "rgba(255, 255, 255, 0.75)";
const GLASS_BLUR = "blur(12px)";

const NAV_ITEMS = [
  { label: "About", href: "/#about", subtitle: "Who I am" },
  { label: "Projects", href: "/#projects", subtitle: "My latest work" },
  { label: "Skills", href: "/#skills", subtitle: "Tech stack" },
  { label: "Contact", href: "/#contact", subtitle: "Let's build" },
];

const SOCIALS = [
  { Icon: GitHubIcon, href: "https://github.com/" },
  { Icon: LinkedInIcon, href: "https://linkedin.com/" },
  { Icon: FacebookIcon, href: "https://facebook.com/" },
];

// --- ANIMATIONS ---
const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const prismPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(224, 195, 252, 0.7); transform: scale(0.95); }
  70% { box-shadow: 0 0 0 10px rgba(224, 195, 252, 0); transform: scale(1); }
  100% { box-shadow: 0 0 0 0 rgba(224, 195, 252, 0); transform: scale(0.95); }
`;

const floatPop = keyframes`
  0% { transform: translateX(0) scale(1); }
  50% { transform: translateX(4px) scale(1.1); }
  100% { transform: translateX(0) scale(1); }
`;

export default function SiteHeader() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const { headerVisible } = useHeaderTheme();

  return (
    <>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="prism-gradient-id" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9A9E" />
            <stop offset="25%" stopColor="#FECFEF" />
            <stop offset="50%" stopColor="#E0C3FC" />
            <stop offset="75%" stopColor="#8EC5FC" />
            <stop offset="100%" stopColor="#D4FFEC" />
          </linearGradient>
        </defs>
      </svg>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: GLASS_BG,
          backdropFilter: GLASS_BLUR,
          borderBottom: "1px solid",
          borderImageSource: PRISM_GRADIENT,
          borderImageSlice: 1,
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar disableGutters sx={{ height: { xs: 56, md: 80 } }}>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 3 }, px: { xs: 1.5, md: 3 } }}>
            {!isMdUp && (
              <IconButton onClick={() => setOpen(true)} sx={{ color: DARK_TEXT }}>
                <MenuIcon />
              </IconButton>
            )}

            <MuiLink component={NextLink} href="/" underline="none" sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1.5 }, mr: "auto" }}>
              <Box sx={{ width: { xs: 8, md: 12 }, height: { xs: 8, md: 12 }, borderRadius: "50%", background: PRISM_GRADIENT, boxShadow: "0 0 10px rgba(224, 195, 252, 0.6)" }} />
              <Typography sx={{ fontSize: { xs: 14, sm: 18, md: 22 }, fontWeight: 850, color: DARK_TEXT, letterSpacing: -0.5 }}>
                {isMdUp ? "Rafael Alden Agoncillo" : "R. Agoncillo"}
              </Typography>
            </MuiLink>

            {isMdUp && (
              <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
                {NAV_ITEMS.map((item) => (
                  <MuiLink key={item.href} component={NextLink} href={item.href} underline="none" sx={{ px: 2, py: 1, fontWeight: 600, fontSize: 15, color: DARK_TEXT, transition: "0.2s", "&:hover": { color: "#000", transform: "translateY(-1px)" } }}>
                    {item.label}
                  </MuiLink>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={1} alignItems="center">
              {isMdUp && SOCIALS.map(({ Icon, href }, i) => (
                <IconButton key={i} component="a" href={href} target="_blank" sx={{ "& svg": { fill: "url(#prism-gradient-id)" } }}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
              <Button component={NextLink} href="/#projects" variant="contained" disableElevation sx={{ borderRadius: "20px", textTransform: "none", fontWeight: 800, fontSize: { xs: "0.7rem", md: "0.875rem" }, px: { xs: 1.2, md: 3 }, py: { xs: 0.5, md: 1 }, background: PRISM_GRADIENT, backgroundSize: "200% 200%", animation: `${shimmer} 5s linear infinite`, color: "#fff", boxShadow: "0 4px 12px rgba(224, 195, 252, 0.4)" }}>
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
            width: { xs: "80vw", sm: 320 },
            height: "100dvh",
            background: "#FFFFFF",
            borderRight: "1px solid",
            borderImageSource: PRISM_GRADIENT,
            borderImageSlice: 1,
            zIndex: theme.zIndex.drawer + 200,
            overflow: "hidden"
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 4 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 2.5, sm: 5 } }}>
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 900, 
                    fontSize: { xs: "1.4rem", sm: "1.8rem" },
                    letterSpacing: -1,
                    background: PRISM_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Hello there!
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.2 }}>
                  <Box 
                    sx={{ 
                      width: 7, 
                      height: 7, 
                      borderRadius: "50%", 
                      background: PRISM_GRADIENT,
                      animation: `${prismPulse} 2s infinite` 
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 850, letterSpacing: 0.5, fontSize: "0.6rem" }}>
                    LET'S WORK TOGETHER!
                  </Typography>
                </Box>
              </Box>
              
              {/* Prism Styled Close Button */}
              <IconButton 
                onClick={() => setOpen(false)} 
                size="small"
                sx={{ 
                  position: "relative",
                  width: 32,
                  height: 32,
                  background: "white",
                  border: "1.5px solid",
                  borderImageSource: PRISM_GRADIENT,
                  borderImageSlice: 1,
                  boxShadow: "0 0 8px rgba(224, 195, 252, 0.3)",
                  "&:hover": { 
                    transform: "rotate(90deg)",
                    background: alpha("#E0C3FC", 0.05)
                  },
                  transition: "all 0.3s ease"
                }}
              >
                <CloseIcon sx={{ fontSize: "1.1rem", color: DARK_TEXT }} />
              </IconButton>
            </Stack>

            <List disablePadding>
              {NAV_ITEMS.map((item) => (
                <ListItemButton
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  sx={{
                    borderRadius: 3,
                    mb: { xs: 0.8, sm: 1.5 },
                    py: { xs: 0.8, sm: 1.5 },
                    px: 1.5,
                    background: alpha("#000", 0.01),
                    "&:hover": {
                      background: "white",
                      boxShadow: "0 5px 15px rgba(224, 195, 252, 0.15)",
                      transform: "translateX(5px)",
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.label} 
                    secondary={item.subtitle}
                    primaryTypographyProps={{ sx: { fontWeight: 850, color: DARK_TEXT, fontSize: { xs: "0.95rem", sm: "1.1rem" }, letterSpacing: -0.5 } }}
                    secondaryTypographyProps={{ sx: { fontWeight: 600, fontSize: "0.65rem", opacity: 0.6 } }}
                  />
                  <ChevronRightIcon 
                    sx={{ 
                      fontSize: "1.3rem", 
                      color: "#E0C3FC",
                      filter: "drop-shadow(0 0 3px rgba(224, 195, 252, 0.6))", // More saturated glow
                      animation: `${floatPop} 3s ease-in-out infinite`
                    }} 
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Box>
            <Divider sx={{ mb: 2, borderStyle: "dashed", opacity: 0.4 }} />
            
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {SOCIALS.map(({ Icon, href }, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={href}
                  target="_blank"
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    background: "white",
                    border: "1px solid",
                    borderColor: alpha("#000", 0.05),
                    "& svg": { fill: "url(#prism-gradient-id)", fontSize: "1.1rem" },
                    "&:hover": { transform: "translateY(-3px)", borderColor: "#E0C3FC" }
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>

            <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: alpha("#FECFEF", 0.03), border: `1px solid ${alpha("#FECFEF", 0.08)}` }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 900, color: DARK_TEXT }}>
                Rafael Alden Agoncillo
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.6rem" }}>
                Fullstack Developer & UI/UX Designer
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}