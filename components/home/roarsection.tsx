"use client";
import React, { useRef } from "react";
import styles from "./roarsection.module.css";
import WordReveal from "../ui/WordReveal";

export default function RoarSection() {
  const li1Ref = useRef<HTMLElement | null>(null);
  const li2Ref = useRef<HTMLElement | null>(null);
  const li3Ref = useRef<HTMLElement | null>(null);
  return (
    <section className="bg-black pt-6 pb-10 lg:pt-[1.5625rem] lg:pb-[6.5rem]">
      <div className="mx-auto w-full max-w-full lg:max-w-[90rem] lg:h-[57.21875rem]">
        <div className="mx-auto max-w-[61.25rem] px-4 sm:px-6 md:px-10 h-auto lg:h-full flex flex-col items-center justify-start">
          <div className="w-full text-center">
            <h2 className="sr-only">ROAR metrics</h2>

            <ul className="flex flex-col items-center justify-center gap-12 mt-6 md:mt-8">
              <li ref={li1Ref} className="flex flex-col items-center">
                <div className="flex items-baseline gap-3">
                          <WordReveal text="3–5x" targetRef={li1Ref} blurMax={0} className={`text-[2.25rem] md:text-[3.25rem] font-light ${styles.roarGreen}`} />
                          <WordReveal text="ROAS" targetRef={li1Ref} blurMax={0} className={`text-4xl md:text-5xl font-light ${styles.roarWhite}`} />
                </div>
                <p className="mt-2 text-xs text-white/70">
                  <WordReveal text="return on ad spend" targetRef={li1Ref} blurMax={0} className="inline" />
                </p>
              </li>

              <li ref={li2Ref} className="flex flex-col items-center">
                <div className="flex items-baseline gap-3">
                          <WordReveal text="2x" targetRef={li2Ref} blurMax={0} className={`text-[2.25rem] md:text-[3.25rem] font-light ${styles.roarGreen}`} />
                          <WordReveal text="CTR" targetRef={li2Ref} blurMax={0} className={`text-4xl md:text-5xl font-light ${styles.roarWhite}`} />
                </div>
                <p className="mt-2 text-xs text-white/70">
                  <WordReveal text="creative that gets clicks" targetRef={li2Ref} blurMax={0} className="inline" />
                </p>
              </li>

              <li ref={li3Ref} className="flex flex-col items-center">
                <div className="flex items-baseline gap-3">
                          <WordReveal text="40%" targetRef={li3Ref} blurMax={0} className={`text-[2.25rem] md:text-[3.25rem] font-light ${styles.roarGreen}`} />
                          <WordReveal text="Lower" targetRef={li3Ref} blurMax={0} className={`text-4xl md:text-5xl font-light ${styles.roarWhite}`} />
                </div>
                <p className="mt-2 text-xs text-white/70">
                  <WordReveal text="cost per lead" targetRef={li3Ref} blurMax={0} className="inline" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
