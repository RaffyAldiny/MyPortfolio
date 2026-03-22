"use client";

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  image: string;
  video: {
    desktop: string;
    mobile: string;
  };
  accent: string;
  link: string | null;
  repo: string | null;
  mobileDescOverride?: {
    fontSize: string;
    lineHeight: number;
  };
  desktopTitleOverride?: {
    fontSize: string;
  };
};

export const PROJECTS: readonly ProjectItem[] = [
  {
    id: "comparigon",
    title: "COMPARIGON",
    subtitle: "Device Intelligence Platform",
    desc: "A comparison platform for smartphones, chipsets, and mobile hardware with structured specs, benchmark-focused browsing, and fast category navigation for side-by-side research.",
    tags: [
      "Laravel",
      "Alpine JS",
      "Livewire",
      "Tailwind CSS",
      "DigitalOcean",
      "Filament",
      "MySQL",
      "Cloudflare",
      "Blade",
      "SEO Optimized",
    ],
    image: "/images/comparigon.avif",
    video: {
      desktop: "/videos/projects/webm/Comparigon-Desktop.webm",
      mobile: "/videos/projects/webm/Comparigon-Mobile.webm",
    },
    accent: "#1CDB2F",
    link: "https://comparigon.com",
    repo: null,
  },
  {
    id: "brainwave",
    title: "BRAINWAVE",
    subtitle: "Roblox Quiz Experience",
    desc: "A Roblox trivia-platformer that mixes timed quiz prompts, obstacle progression, and HUD-driven gameplay into a fast-paced multiplayer-friendly learning game loop.",
    tags: ["Roblox", "Luau", "Game Systems", "HUD Systems", "Multiplayer", "Quiz Gameplay"],
    image: "/images/brainwave-game.avif",
    video: {
      desktop: "/videos/projects/webm/Brainwave-Desktop.webm",
      mobile: "/videos/projects/webm/Brainwave-Mobile.webm",
    },
    accent: "#0C7A19",
    link: "https://www.roblox.com/games/14363008084/Brainwave",
    repo: null,
  },
  {
    id: "polylayer",
    title: "POLYLAYER",
    subtitle: "Knowledge Platform",
    desc: "A 3D printer knowledge and catalog platform focused on structured descriptions, searchable product listings, comparison views, and detailed specification browsing for hardware research.",
    tags: ["Next.js", "Django REST", "PostgreSQL", "Material UI", "Catalog Platform", "Comparison Views"],
    image: "/images/polylayer.avif",
    video: {
      desktop: "/videos/projects/webm/Polylayer-Desktop.webm",
      mobile: "/videos/projects/webm/Polylayer-Mobile.webm",
    },
    accent: "#74F067",
    link: null,
    repo: null,
  },
  {
    id: "academic-management-system",
    title: "ACADEMIC MS",
    subtitle: "Campus Operations Portal",
    desc: "An academic operations portal that brings announcements, calendars, library modules, and student service workflows into one admin-focused system for campus management.",
    tags: ["Laravel", "Filament", "MySQL", "Admin Portal", "Campus Workflows", "Web Development"],
    image: "/images/academic-management-system.avif",
    video: {
      desktop: "/videos/projects/webm/AMS%20-%20DESKTOP.webm",
      mobile: "/videos/projects/webm/AMS%20-%20MOBILE.webm",
    },
    accent: "#16B728",
    link: null,
    repo: null,
  },
  {
    id: "edubridge",
    title: "EDUBRIDGE",
    subtitle: "Student / Professional Network",
    desc: "A role-based academic networking platform that connects students and professionals through separate account flows, structured onboarding, and school-to-career interaction paths.",
    tags: ["Laravel", "MySQL", "Role-Based Auth", "Tailwind CSS", "Blade", "Web Development"],
    image: "/images/edubridge.avif",
    video: {
      desktop: "/videos/projects/webm/Edubridge-Desktop.webm",
      mobile: "/videos/projects/webm/Edubridge-Mobile.webm",
    },
    accent: "#2CCF3D",
    link: null,
    repo: null,
  },
  {
    id: "paws-and-promises",
    title: "PAWS & PROMISES",
    subtitle: "Adoption Campaign Site",
    desc: "A team-built pet adoption platform designed to showcase adoptable animals, communicate shelter advocacy clearly, and guide visitors toward adoption, volunteering, and community support actions. My primary role was frontend development, where I built and shaped the user-facing experience.",
    tags: ["Next.js", "Django", "Adoption Platform", "Frontend Development", "Responsive UI", "Campaign Site"],
    image: "/images/paws-and-promises.avif",
    video: {
      desktop: "/videos/projects/webm/Paws-and-Promises-Desktop.webm",
      mobile: "/videos/projects/webm/Paws-and-Promises-Mobile.webm",
    },
    accent: "#9AF58E",
    link: null,
    repo: null,
    mobileDescOverride: {
      fontSize: "0.92rem",
      lineHeight: 1.55,
    },
    desktopTitleOverride: {
      fontSize: "6.8rem",
    },
  },
];
