"use client";
import React from "react";
import styles from "./roarsection.module.css";

export default function RoarSection() {
  return (
    <section className={`${styles.section} bg-black`}>
      <div className={`${styles.outerWrapper} mx-auto`}>
        <div className={`${styles.innerWrapper} mx-auto`}>
          <div className={styles.content}>
            <h2 className={styles.srOnly}>ROAR metrics</h2>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <div className={styles.statRow}>
                  <span className={styles.roarGreen}>3–5x</span>
                  <span className={styles.roarWhite}>ROAS</span>
                </div>
                <p className={styles.subtitle}>
                  return on ad spend
                </p>
              </li>

              <li className={styles.listItem}>
                <div className={styles.statRow}>
                  <span className={styles.roarGreen}>2x</span>
                  <span className={styles.roarWhite}>CTR</span>
                </div>
                <p className={styles.subtitle}>
                  creative that gets clicks
                </p>
              </li>

              <li className={styles.listItem}>
                <div className={styles.statRow}>
                  <span className={styles.roarGreen}>40%</span>
                  <span className={styles.roarWhite}>Lower</span>
                </div>
                <p className={styles.subtitle}>
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
