"use client"

import { useEffect, useState } from "react";

export function useSafeArea() {
  const [safe, setSafe] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "0";
    el.style.height = "0";
    el.style.paddingTop = "env(safe-area-inset-top)";
    el.style.paddingBottom = "env(safe-area-inset-bottom)";
    el.style.paddingLeft = "env(safe-area-inset-left)";
    el.style.paddingRight = "env(safe-area-inset-right)";
    el.style.visibility = "hidden";
    document.body.appendChild(el);

    const style = getComputedStyle(el);
    const top = parseFloat(style.paddingTop) || 0;
    const bottom = parseFloat(style.paddingBottom) || 0;
    const left = parseFloat(style.paddingLeft) || 0;
    const right = parseFloat(style.paddingRight) || 0;

    const safeData = { top, bottom, left, right };
    // schedule state update to avoid calling setState directly during measurement
    requestAnimationFrame(() => setSafe(safeData));
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, []);

  return safe;
}
