"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import styles from "../home/descriptionroar.module.css";

type Props = {
  text: string;
  targetRef: React.RefObject<HTMLElement | null>;
  blurMax?: number;
  className?: string;
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  blurMax: number;
}

function Word({ word, progress, start, end, blurMax }: WordProps) {
  // Use useTransform for a direct mapping to scroll position
  // We add a bit of overlap by not making the range strictly [start, end]
  // This makes the reveal feel more fluid and less "stuttery"
  const opacity = useTransform(progress, [start, end], [0.12, 1], { clamp: true });
  
  const blur = useTransform(progress, [start, end], [blurMax, 0], { clamp: true });
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, WebkitFilter: filter, filter }}
      className={styles.wordRevealed}
    >
      {word}
    </motion.span>
  );
}

export default function WordReveal({ text, blurMax = 12, className }: Omit<Props, "targetRef">) {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const words = text.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"],
  });
  
  const count = words.length;
  const shouldReduceMotion = useReducedMotion();
  const staticProgress = useMotionValue(1);
  const [forceReveal, setForceReveal] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setForceReveal(true);
      return;
    }

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const fullyVisible = rect.top >= 0 && rect.bottom <= vh;
      setForceReveal(fullyVisible);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
    };
  }, [shouldReduceMotion]);

  return (
    <span 
      ref={containerRef}
      aria-hidden={false} 
      className={`${styles.wordSpacing} ${className ?? ""}`}
    >
      {words.map((word, idx) => {
        // Use full range (no 0.8 compression) to spread out the reveal
        const wordDuration = 1 / (count * 0.33);
        const start = idx / count; 
        const end = start + wordDuration;
        
        const progress = forceReveal ? staticProgress : scrollYProgress;

        return (
          <Word
            key={`${idx}-${word}`}
            word={word}
            progress={progress}
            start={start}
            end={Math.min(end, 1)}
            blurMax={blurMax}
          />
        );
      })}
    </span>
  );
}
