"use client";

import * as React from "react";

export default function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);

    return () => mediaQuery.removeEventListener?.("change", syncPreference);
  }, []);

  return reducedMotion;
}

