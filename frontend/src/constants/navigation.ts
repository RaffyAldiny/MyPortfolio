export const LANDING_NAV_ITEMS = [
  { id: "intro", label: "Intro", subtitle: "Start here", href: "/#intro" },
  {
    id: "techstacks",
    label: "Tech Stacks",
    subtitle: "Tools I use",
    href: "/#techstacks",
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "My latest work",
    href: "/#projects",
  },
  {
    id: "research",
    label: "Research",
    subtitle: "Published work",
    href: "/#research",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Let's work together",
    href: "/#contact",
  },
] as const;

export const TIMELINE_SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "techstacks", label: "Tech Stacks" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;
