"use client";
import React from "react";
import styles from "./roarsection.module.css";

export default function RoarSection() {
  return (
    <section className="bg-black pt-6 pb-10 lg:pt-[1.5625rem] lg:pb-[6.5rem]">
      <div className="mx-auto w-full max-w-full lg:max-w-[90rem] lg:h-[57.21875rem]">
        <div className="mx-auto max-w-[61.25rem] px-4 sm:px-6 md:px-10 h-auto lg:h-full flex flex-col items-center justify-start">
          <div className="w-full text-center">
            <h2 className="sr-only">ROAR metrics</h2>

            <ul className="flex flex-col items-center justify-center gap-8 md:gap-12 mt-6 md:mt-8">
              <li className="flex flex-col items-center">
                <div className="flex items-baseline gap-3">
                  <span className={styles.roarGreen}>3–5x</span>
                  <span className={styles.roarWhite}>ROAS</span>
                </div>
                <p className="mt-2 text-xs text-white/70">
                  return on ad spend
                </p>
              </li>

              <li className="flex flex-col items-center">
                <div className="flex items-baseline gap-3">
                  <span className={styles.roarGreen}>2x</span>
                  <span className={styles.roarWhite}>CTR</span>
                </div>
                <p className="mt-2 text-xs text-white/70">
                  creative that gets clicks
                </p>
              </li>

              <li className="flex flex-col items-center">
                <div className="flex items-baseline gap-3">
                  <span className={styles.roarGreen}>40%</span>
                  <span className={styles.roarWhite}>Lower</span>
                </div>
                <p className="mt-2 text-xs text-white/70">
                  cost per lead
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
