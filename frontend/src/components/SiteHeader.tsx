"use client";

import * as React from "react";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
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
import { alpha, keyframes, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useHeaderTheme } from "@/context/HeaderTheme";
import { LANDING_NAV_ITEMS } from "@/constants/navigation";

const PRISM_GRADIENT =
  "linear-gradient(135deg, #F3FFF0 0%, #CFFAC9 24%, #8EF587 46%, #1CDB2F 62%, #159E22 82%, #0B5A14 100%)";
const DARK_TEXT = "#2D2D3A";
const GLASS_BG = "rgba(252, 255, 250, 0.9)";
const GLASS_BLUR = "blur(12px)";

const SOCIALS = [
  { Icon: GitHubIcon, href: "https://github.com/" },
  {
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/rafael-alden-agoncillo-b15719257/",
  },
  {
    Icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=61567335190849",
  },
];

const prismPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(28, 219, 47, 0.34); transform: scale(0.95); }
  70% { box-shadow: 0 0 0 10px rgba(28, 219, 47, 0); transform: scale(1); }
  100% { box-shadow: 0 0 0 0 rgba(28, 219, 47, 0); transform: scale(0.95); }
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
  const [activeSectionId, setActiveSectionId] = React.useState("intro");
  const { headerVisible } = useHeaderTheme();
  const desktopNavRef = React.useRef<HTMLDivElement | null>(null);
  const navItemRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const [navIndicator, setNavIndicator] = React.useState({ x: 0, width: 0, opacity: 0 });

  const headerOffset = isMdUp ? 80 : 56;
  const sectionIds = React.useMemo(
    () =>
      LANDING_NAV_ITEMS.map((item) => {
        const hashIndex = item.href.indexOf("#");
        return hashIndex >= 0 ? item.href.slice(hashIndex + 1) : "";
      }).filter(Boolean),
    []
  );

  const scrollToSection = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const y = window.scrollY + rect.top - headerOffset;

      window.history.replaceState(null, "", `/#${id}`);
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [headerOffset]
  );

  const handleNavClick = React.useCallback(
    (href: string) => (event: React.MouseEvent) => {
      const hashIndex = href.indexOf("#");
      const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
      if (!hash) return;

      event.preventDefault();
      setOpen(false);
      requestAnimationFrame(() => scrollToSection(hash));
    },
    [scrollToSection]
  );

  React.useEffect(() => {
    if (!sectionIds.length) return;

    const pickActive = () => {
      const activationY = headerOffset + 6;
      let nextId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= activationY) {
          nextId = id;
        }
      }

      setActiveSectionId((current) => (current === nextId ? current : nextId));
    };

    const onScrollOrResize = () => {
      requestAnimationFrame(pickActive);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    pickActive();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headerOffset, sectionIds]);

  React.useEffect(() => {
    if (!isMdUp) {
      setNavIndicator((current) =>
        current.opacity === 0 ? current : { x: 0, width: 0, opacity: 0 }
      );
      return;
    }

    const updateIndicator = () => {
      const container = desktopNavRef.current;
      const activeNode = navItemRefs.current[activeSectionId];

      if (!container || !activeNode) {
        setNavIndicator((current) =>
          current.opacity === 0 ? current : { x: 0, width: 0, opacity: 0 }
        );
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeNode.getBoundingClientRect();
      const horizontalInset = 10;
      const nextWidth = Math.max(0, activeRect.width - horizontalInset * 2);
      const nextX = activeRect.left - containerRect.left + horizontalInset;

      setNavIndicator((current) => {
        if (
          Math.abs(current.x - nextX) < 0.5 &&
          Math.abs(current.width - nextWidth) < 0.5 &&
          current.opacity === 1
        ) {
          return current;
        }

        return { x: nextX, width: nextWidth, opacity: 1 };
      });
    };

    const raf = requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator, { passive: true });

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateIndicator);
      if (desktopNavRef.current) observer.observe(desktopNavRef.current);
      Object.values(navItemRefs.current).forEach((node) => {
        if (node) observer?.observe(node);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateIndicator);
      observer?.disconnect();
    };
  }, [activeSectionId, isMdUp]);

  return (
    <>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="prism-gradient-id" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3FFF0" />
            <stop offset="25%" stopColor="#CFFAC9" />
            <stop offset="50%" stopColor="#1CDB2F" />
            <stop offset="75%" stopColor="#159E22" />
            <stop offset="100%" stopColor="#0B5A14" />
          </linearGradient>
        </defs>
      </svg>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: GLASS_BG,
          backdropFilter: GLASS_BLUR,
          borderBottom: `1px solid ${alpha("#1CDB2F", 0.3)}`,
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar disableGutters sx={{ height: { xs: 56, md: 80 } }}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 3 },
              px: { xs: 1.5, md: 3 },
            }}
          >
            <MuiLink
              component={NextLink}
              href="/"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 1.5 },
                mr: "auto",
              }}
            >
              <Box
                sx={{
                  width: { xs: 8, md: 12 },
                  height: { xs: 8, md: 12 },
                  borderRadius: "50%",
                  background: PRISM_GRADIENT,
                  boxShadow: "0 0 10px rgba(28, 219, 47, 0.22)",
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 18, md: 22 },
                  fontWeight: 850,
                  color: "#17391B",
                  letterSpacing: -0.5,
                }}
              >
                {isMdUp ? "RaffyAldiny" : "RaffyAldiny"}
              </Typography>
            </MuiLink>

            {isMdUp && (
              <Stack
                ref={desktopNavRef}
                direction="row"
                spacing={1}
                sx={{
                  mr: 2,
                  position: "relative",
                  pb: 0.75,
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 5,
                    height: 3.5,
                    width: navIndicator.width,
                    borderRadius: 999,
                    bgcolor: "#1CDB2F",
                    opacity: navIndicator.opacity,
                    transform: `translateX(${navIndicator.x}px)`,
                    boxShadow:
                      "0 0 12px rgba(28, 219, 47, 0.34), 0 0 24px rgba(28, 219, 47, 0.16)",
                    transition:
                      "transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), width 420ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 180ms ease",
                    pointerEvents: "none",
                  }}
                />
                {LANDING_NAV_ITEMS.map((item) => {
                  const hashIndex = item.href.indexOf("#");
                  const itemId = hashIndex >= 0 ? item.href.slice(hashIndex + 1) : "";
                  const isActive = itemId === activeSectionId;

                  return (
                    <MuiLink
                      key={item.href}
                      component={NextLink}
                      ref={(node: HTMLAnchorElement | null) => {
                        navItemRefs.current[itemId] = node;
                      }}
                      href={item.href}
                      onClick={handleNavClick(item.href)}
                      underline="none"
                      sx={{
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        fontSize: 15,
                        color: isActive ? "#16391B" : DARK_TEXT,
                        transition: "0.2s",
                        position: "relative",
                        "&:hover": {
                          color: "#16391B",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      {item.label}
                    </MuiLink>
                  );
                })}
              </Stack>
            )}

            <Stack direction="row" spacing={1} alignItems="center">
              {isMdUp &&
                SOCIALS.map(({ Icon, href }, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ "& svg": { fill: "url(#prism-gradient-id)" } }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}

              {isMdUp ? (
                <Button
                  component={NextLink}
                  href="/#projects"
                  onClick={handleNavClick("/#projects")}
                  variant="contained"
                  disableElevation
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: { xs: "0.7rem", md: "0.875rem" },
                    px: { xs: 1.2, md: 3 },
                    py: { xs: 0.5, md: 1 },
                    background: "#1CDB2F",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(28, 219, 47, 0.18)",
                    "&:hover": { background: "#18C029" },
                  }}
                >
                  View Projects
                </Button>
              ) : (
                <IconButton onClick={() => setOpen(true)} sx={{ color: DARK_TEXT, mr: -0.5 }}>
                  <MenuIcon />
                </IconButton>
              )}
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
            borderRight: `1px solid ${alpha("#1CDB2F", 0.3)}`,
            zIndex: theme.zIndex.drawer + 200,
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: { xs: 2.5, sm: 5 } }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.4rem", sm: "1.8rem" },
                    letterSpacing: -1,
                    color: "#1CDB2F",
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
                      background: "#1CDB2F",
                      animation: `${prismPulse} 2s infinite`,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 850,
                      letterSpacing: 0.5,
                      fontSize: "0.6rem",
                    }}
                  >
                    LET&apos;S WORK TOGETHER!
                  </Typography>
                </Box>
              </Box>

              <IconButton
                onClick={() => setOpen(false)}
                size="small"
                sx={{
                  position: "relative",
                  width: 32,
                  height: 32,
                  background: "white",
                  border: `1.5px solid ${alpha("#1CDB2F", 0.4)}`,
                  boxShadow: "0 0 8px rgba(28, 219, 47, 0.16)",
                  "&:hover": {
                    transform: "rotate(90deg)",
                    background: alpha("#1CDB2F", 0.08),
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CloseIcon sx={{ fontSize: "1.1rem", color: DARK_TEXT }} />
              </IconButton>
            </Stack>

            <List disablePadding>
              {LANDING_NAV_ITEMS.map((item) => (
                <ListItemButton
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  sx={{
                    borderRadius: 3,
                    mb: { xs: 0.8, sm: 1.5 },
                    py: { xs: 0.8, sm: 1.5 },
                    px: 1.5,
                    background: alpha("#000", 0.01),
                    "&:hover": {
                      background: "white",
                      boxShadow: "0 5px 15px rgba(28, 219, 47, 0.14)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    secondary={item.subtitle}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 850,
                        color:
                          item.href.endsWith(`#${activeSectionId}`) ? "#16391B" : DARK_TEXT,
                        fontSize: { xs: "0.95rem", sm: "1.1rem" },
                        letterSpacing: -0.5,
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: { fontWeight: 600, fontSize: "0.65rem", opacity: 0.6 },
                    }}
                  />
                  <ChevronRightIcon
                    sx={{
                      fontSize: "1.3rem",
                      color: "#1CDB2F",
                      filter: "drop-shadow(0 0 3px rgba(28, 219, 47, 0.22))",
                      animation: `${floatPop} 3s ease-in-out infinite`,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>

            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                component={NextLink}
                href="/#projects"
                onClick={handleNavClick("/#projects")}
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 900,
                  py: 1.1,
                  background: "#1CDB2F",
                  color: "#FFFFFF",
                  boxShadow: "0 10px 24px rgba(28, 219, 47, 0.16)",
                  "&:hover": { background: "#18C029" },
                }}
              >
                View Projects
              </Button>
            </Box>
          </Box>

          <Box>
            <Divider sx={{ mb: 2, borderStyle: "dashed", opacity: 0.4 }} />

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {SOCIALS.map(({ Icon, href }, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    background: "white",
                    border: "1px solid",
                    borderColor: alpha("#000", 0.05),
                    "& svg": { fill: "url(#prism-gradient-id)", fontSize: "1.1rem" },
                    "&:hover": { transform: "translateY(-3px)", borderColor: "#1CDB2F" },
                    transition: "transform 0.2s ease",
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>

            <Box
              sx={{
                p: 1.2,
                borderRadius: 2,
                bgcolor: alpha("#1CDB2F", 0.06),
                border: `1px solid ${alpha("#1CDB2F", 0.12)}`,
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 900, color: DARK_TEXT }}>
                RaffyAldiny
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.6rem" }}
              >
                Fullstack Developer &amp; UI/UX Designer
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

