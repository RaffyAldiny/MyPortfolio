"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

ensureGsap();

export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export { gsap, ScrollTrigger };

