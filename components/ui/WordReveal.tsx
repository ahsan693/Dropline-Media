"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../home/descriptionroar.module.css";

type Props = {
  text: string;
  targetRef: React.RefObject<HTMLElement>;
  blurMax?: number;
  className?: string;
};

export default function WordReveal({ text, targetRef, blurMax = 4, className }: Props) {
  const words = text.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const count = words.length;

  return (
    <span aria-hidden={false} className={`${styles.wordSpacing} ${className ?? ""}`}>
      {words.map((word, idx) => {
        const start = idx / count;
        const end = (idx + 1) / count;
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
        const blur = useTransform(opacity, (v) => `blur(${(1 - v) * blurMax}px)`);

        return (
          <motion.span key={idx} style={{ opacity, WebkitFilter: blur, filter: blur }} className={styles.wordRevealed}>
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
