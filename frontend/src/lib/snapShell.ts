"use client";

export const SNAP_SHELL_ID = "snap-shell";

export function getSnapShell() {
  return document.getElementById(SNAP_SHELL_ID) as HTMLElement | null;
}

export function scrollSnapShellToPanel(
  panelId: string,
  behavior: ScrollBehavior = "auto"
) {
  const shell = getSnapShell();
  const panel = document.getElementById(panelId);

  if (!panel) return;

  if (!shell) {
    const top = window.scrollY + panel.getBoundingClientRect().top;
    window.scrollTo({ top, behavior });
    return;
  }

  shell.scrollTo({
    top: panel.offsetTop,
    behavior,
  });
}
