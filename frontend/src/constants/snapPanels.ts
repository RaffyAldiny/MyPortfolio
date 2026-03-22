"use client";

import { PROJECTS } from "@/components/landing/projects/projects.data";

export type NavSectionId =
  | "intro"
  | "techstacks"
  | "projects"
  | "research"
  | "contact";

export type TimelineSection = {
  id: NavSectionId;
  label: string;
};

export type SnapPanelDefinition = {
  id: string;
  navSection: NavSectionId;
  type: "section" | "project-intro" | "project";
};

export const NAV_SECTIONS: readonly TimelineSection[] = [
  { id: "intro", label: "Intro" },
  { id: "techstacks", label: "Tech Stacks" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;

export const SNAP_PANEL_REGISTRY: readonly SnapPanelDefinition[] = [
  { id: "intro", navSection: "intro", type: "section" },
  { id: "techstacks", navSection: "techstacks", type: "section" },
  { id: "projects", navSection: "projects", type: "project-intro" },
  ...PROJECTS.map((project) => ({
    id: project.id,
    navSection: "projects" as const,
    type: "project" as const,
  })),
  { id: "research", navSection: "research", type: "section" },
  { id: "contact", navSection: "contact", type: "section" },
] as const;
