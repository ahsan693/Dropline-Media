import Image, { type StaticImageData } from "next/image";
import styles from "./trustedsection.module.css";

import mclLogo from "./trustedsectionimage/1.png";
import rooturaLogo from "./trustedsectionimage/2.svg";
import kudocardLogo from "./trustedsectionimage/3.svg";
import nnLogo from "./trustedsectionimage/4.svg";
import nexalleyLogo from "./trustedsectionimage/5.png";

type TrustedLogo = {
  src: StaticImageData;
  alt: string;
  isIcon?: boolean;
};

const logos: TrustedLogo[] = [
  { src: mclLogo, alt: "Michael Creative Labs" },
  { src: rooturaLogo, alt: "Rootura" },
  { src: kudocardLogo, alt: "KudoCard" },
  { src: nnLogo, alt: "NN", isIcon: true },
  { src: nexalleyLogo, alt: "Nexalley" },
];

function LogoGroup({ suffix }: { suffix: string }) {
  return (
    <div className={styles.logoGroup} aria-hidden={suffix === "b" ? true : undefined}>
      {logos.map((logo) => (
        <div
          key={`${logo.alt}-${suffix}`}
          className={`${styles.logoItem} ${logo.isIcon ? styles.iconLogo : ""}`}
        >
          <Image
            src={logo.src}
            alt={suffix === "a" ? logo.alt : ""}
            className={styles.logoImage}
            sizes="(max-width: 480px) 25vw, (max-width: 1024px) 16vw, 190px"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default function TrustedSection() {
  return (
    <section className={styles.trustedSection}>
      <div className={styles.fullWidthContainer}>
        <div className={styles.trustedWrap}>
          <h3 className={styles.trustedTitle}>Trusted by</h3>

          <div className={styles.marqueeContainer}>
            {/*
              Two identical groups placed side-by-side.
              The strip is animated from translateX(0) → translateX(-50%),
              which scrolls exactly one group width — creating a seamless loop
              regardless of screen size or logo widths.
            */}
            <div className={styles.logoStrip}>
              <LogoGroup suffix="a" />
              <LogoGroup suffix="b" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}