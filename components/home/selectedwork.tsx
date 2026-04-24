import Image from "next/image";
import styles from "./selectedwork.module.css";

import workOne from "./selectedworkimages/1.png";
import workTwo from "./selectedworkimages/2.png";
import workThree from "./selectedworkimages/3.png";
import workFour from "./selectedworkimages/4.png";
import workFive from "./selectedworkimages/5.png";
import workSix from "./selectedworkimages/6.jpg";

const workCards = [
  workOne,
  workTwo,
  workThree,
  workFour,
  workFive,
  workSix,
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
          {workCards.map((image, index) => (
            <article key={index} className={styles.selectedWorkCard}>
              <Image
                src={image}
                alt={`Selected work panel ${index + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 860px) 100vw, 638px"
                placeholder="empty"
                priority={index < 2}
                loading={index < 2 ? undefined : "lazy"}
              />
            </article>
          ))}
        </div>

        <div className={styles.selectedWorkCtaWrap}>
          <button type="button" className={styles.selectedWorkCta}>
            Start A Project
          </button>
        </div>
      </div>
    </section>
  );
}