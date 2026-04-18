"use client"

import { useEffect, useState } from "react";

const breakpointMap: Record<string, number> = {
  xs: 320,
  'xs-plus': 360,
  'iphone-se': 375,
  'iphone-mini': 375,
  'iphone-x': 375,
  'iphone-12': 390,
  'iphone-14': 390,
  'iphone-15': 393,
  'iphone-16': 393,
  'iphone-17': 393,
  'iphone-xr': 414,
  'iphone-11-max': 414,
  'iphone-plus': 414,
  'iphone-12-max': 428,
  'iphone-15-max': 430,
  'iphone-16-max': 440,
  'iphone-17-max': 440,
  'android-xs': 360,
  'android-sm': 384,
  'android-md': 393,
  'android-lg': 412,
  'android-xl': 430,
  'android-fold': 344,
  'fold-closed': 344,
  'fold-open': 768,
  'flip-closed': 260,
  'flip-open': 390,
  sm: 640,
  'tablet-sm': 600,
  'tablet-nexus': 600,
  md: 768,
  'ipad-mini': 768,
  'ipad-air': 820,
  ipad: 810,
  'android-tab': 800,
  'ipad-pro-11': 834,
  'ipad-pro-12': 1024,
  'samsung-tab-s': 884,
  surface: 912,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint(breakpoint: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const val = breakpointMap[breakpoint];
    if (val) return window.innerWidth <= val;
    try {
      return window.matchMedia(breakpoint).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const val = breakpointMap[breakpoint];
    let m: MediaQueryList | null = null;

    if (val) {
      m = window.matchMedia(`(max-width: ${val}px)`);
    } else {
      try {
        m = window.matchMedia(breakpoint);
      } catch {
        m = null;
      }
    }

    if (!m) return;

    const handler = () => setMatches(Boolean(m && m.matches));
    handler();
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, [breakpoint]);

  return matches;
}
