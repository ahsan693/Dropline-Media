"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./selectedwork.module.css";

import workOne from "./selectedworkimages/card 1.png";
import workTwo from "./selectedworkimages/card 2.png";
import workThree from "./selectedworkimages/card 3.png";
import workFour from "./selectedworkimages/card 4.png";
import workFive from "./selectedworkimages/card 5.png";
import workSix from "./selectedworkimages/card 6.png";

const workCards = [
  {
    image: workOne,
    title: "Branding",
    subtitle: "Built for shelf impact",
    bullets: ["Brand identity", "Packaging design", "Visual systems"],
    bg: "#1B4738",
    color: "#fff",
  },
  {
    image: workTwo,
    title: "Logos",
    subtitle: "Built for recognition",
    bullets: ["Logo design", "Brand marks", "Logo systems"],
    bg: "#FFFFFF",
    color: "#0a0a0a",
  },
  {
    image: workThree,
    title: "Web Design",
    subtitle: "+40% CVR",
    bullets: ["Landing pages", "UX and user journeys", "Conversion-focused design"],
    bg: "#F99E4D",
    color: "#fff",
  },
  {
    image: workFour,
    title: "Branding",
    subtitle: "Built to stand out",
    bullets: ["Brand identity", "Packaging", "Visual systems"],
    bg: "#ED3290",
    color: "#fff",
  },
  {
    image: workFive,
    title: "Branding",
    subtitle: "Built to scale",
    bullets: ["Brand identity", "Visual systems", "Typography and design"],
    bg: "#1B4738",
    color: "#fff",
  },
  {
    image: workSix,
    title: "Paid Media",
    subtitle: "3–5x ROAS",
    bullets: ["Paid campaigns", "Creative testing", "Campaign optimisation"],
    bg: "#FB5265",
    color: "#fff",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className={styles.selectedWorkSection}>
      <div className={styles.selectedWorkWrap}>
        <header className={styles.selectedWorkHeader}>
          <h2 className={styles.selectedWorkTitle}>Selected Work</h2>
          <p className={styles.selectedWorkSubtitle}>
            A selection of branding, creative, and campaigns.
          </p>
        </header>

        <div className={styles.selectedWorkGrid}>
          {workCards.map((card, index) => (
            <article key={index} className={styles.selectedWorkCard}>
              <Image
                src={card.image}
                alt={`Selected work panel ${index + 1}`}
                className={styles.workImage}
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="(max-width: 860px) 100vw, 638px"
                placeholder="blur"
                priority={index < 2}
                loading={index < 2 ? undefined : "lazy"}
              />

              <div
                className={styles.selectedWorkOverlay}
                style={{ background: card.bg, color: card.color }}
              >
                <div className={styles.overlayTop}>
                  <span className={styles.overlayTitle}>{card.title}</span>

                  <Link
                    href="/contact"
                    className={styles.overlayBtn}
                    style={{
                      color: card.bg,
                      background: card.color,
                    }}
                  >
                    Get Started&nbsp;↗
                  </Link>
                </div>

                <p
                  className={styles.overlaySubtitle}
                  style={{
                    color:
                      card.color === "#fff"
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(0,0,0,0.55)",
                  }}
                >
                  {card.subtitle}
                </p>

                <ul className={styles.overlayList}>
                  {card.bullets.map((b, i) => (
                    <li
                      key={i}
                      className={styles.overlayListItem}
                      style={{
                        color:
                          card.color === "#fff"
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(0,0,0,0.8)",
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.selectedWorkCtaWrap}>
          <Link href="/contact" className={styles.selectedWorkCta}>
            Start A Project
          </Link>
        </div>
      </div>
    </section>
  );
}
