"use client"

import { useEffect, useState } from "react";

export function useDeviceType(): "mobile" | "tablet" | "desktop" {
  const [type, setType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calc = () => {
      const w = window.innerWidth;
      if (w < 768) setType("mobile");
      else if (w >= 768 && w < 1024) setType("tablet");
      else setType("desktop");
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return type;
}
