"use client"

import { useEffect, useState } from "react";

export function useTouchDevice(): boolean {
  const [touch, setTouch] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return 'ontouchstart' in window || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const handler = () => setTouch(Boolean('ontouchstart' in window || mq.matches));
    handler();
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return touch;
}
