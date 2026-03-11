export const LANDING_NAV_ITEMS = [
  { id: "intro", label: "Intro", subtitle: "Start here", href: "/#intro" },
  {
    id: "techstacks",
    label: "Tech Stacks",
    subtitle: "Tools I use",
    href: "/#techstacks",
  },
  {
    id: "research",
    label: "Research",
    subtitle: "Published work",
    href: "/#research",
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "My latest work",
    href: "/#projects",
  },
] as const;

export const TIMELINE_SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "techstacks", label: "Tech Stacks" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
] as const;
