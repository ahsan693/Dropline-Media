"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./HeroSection.module.css";

interface HeroCard {
  kind: "video" | "image";
  src: string;
}

// ─── Local assets from /herosection-videocards ──────────────────────────────
// Videos and images are co-located in the same folder as this component.
// If you move them to /public, update the paths to absolute URLs, e.g.:
//   "/videos/herosection-videocards/brand guidelines.mp4"
const heroCards: HeroCard[] = [
  { kind: "video", src: "/herosection-videocards/brand%20guidelines.mp4" },
  { kind: "video", src: "/herosection-videocards/facebook%202.mp4" },
  { kind: "video", src: "/herosection-videocards/Google%20Ads%20Updated%203.mp4" },
  { kind: "image", src: "/herosection-videocards/Instagram%20ads.png" },
  { kind: "video", src: "/herosection-videocards/logo%20updated.mp4" },
  { kind: "image", src: "/herosection-videocards/pinterest%20ads.png" },
 { kind: "image", src: "/herosection-videocards/Snapchat.png" },
  { kind: "video", src: "/herosection-videocards/social%20media%20updated.mp4" },
  { kind: "video", src: "/herosection-videocards/Tiktok%20updated%203.mp4" },
  { kind: "image", src: "/herosection-videocards/youtbe%20ads.png" },
];

export default function HeroSection() {
  const sectionCardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
      setViewportWidth(window.innerWidth);
    });
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const cardsSection = sectionCardsRef.current;
    const title = titleRef.current;
    const carousel = carouselRef.current;

    if (!mounted || !cardsSection || !title || !carousel || viewportWidth <= 0) return;

    const cards = Array.from(carousel.querySelectorAll<HTMLElement>("[data-hero-card='true']"));
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const buildCarousel = (depth: number) => {
        const n = cards.length;
        const angleStep = 360 / n;

        gsap.set(cards, {
          rotateY: (i: number) => i * -angleStep,
          transformOrigin: `50% 50% ${depth}px`,
          z: -depth,
          backfaceVisibility: "hidden",
        });
      };

      mm.add("(min-width: 768px)", () => {
        if (prefersReduced) {
          gsap.set(cardsSection, { opacity: 1, filter: "none" });
          gsap.set(title, { opacity: 1 });
          return;
        }

        const depth = viewportWidth / 2.5;
        buildCarousel(depth);

        const tl = gsap.timeline();
        tl.set(cardsSection, { opacity: 0, y: 150, filter: "blur(3px) grayscale(100%)" }, 0)
          .set(title, { opacity: 0, y: 50 }, 0)
          .to(title, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
          .to(
            cardsSection,
            { opacity: 1, y: 0, filter: "none", duration: 1, ease: "power2.out" },
            "<50%",
          )
          .to(carousel, { rotationY: 45, duration: 3, ease: "circ.out" }, "<")
          .to(
            carousel,
            { rotationY: "+=360", duration: 60, ease: "linear", repeat: -1 },
            "<70%",
          );
      });

      mm.add("(max-width: 767px)", () => {
        if (prefersReduced) {
          gsap.set(cardsSection, { opacity: 1, filter: "none" });
          gsap.set(title, { opacity: 1 });
          return;
        }

        const depth = viewportWidth / 1.25;
        buildCarousel(depth);

        const tl = gsap.timeline();
        tl.set(cardsSection, { opacity: 0, y: 150, filter: "blur(3px) grayscale(100%)" }, 0)
          .set(title, { opacity: 0, y: 50 }, 0)
          .to(title, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
          .to(
            cardsSection,
            { opacity: 1, y: 0, filter: "none", duration: 1, ease: "power2.out" },
            "<50%",
          )
          .to(carousel, { rotationY: 45, duration: 3, ease: "circ.out" }, "<")
          .to(
            carousel,
            { rotationY: "+=360", duration: 60, ease: "linear", repeat: -1 },
            "<70%",
          );
      });

      return () => mm.revert();
    }, sectionCardsRef);

    return () => ctx.revert();
  }, [mounted, viewportWidth]);

  return (
    <section className={styles.bsHeroSection}>
      <div className={styles.bsHeroTitleWrap}>
        <h1 ref={titleRef} className={styles.bsHeroHeading}>
          We scale brands through
          <br />
          <em>ads</em> that <em>convert</em>
        </h1>
      </div>

      <div ref={sectionCardsRef} className={styles.bsHeroCarouselStage}>
        <div className={styles.bsHeroCarousel3dCtx}>
          <div ref={carouselRef} className={styles.bsHeroCarousel}>
            {heroCards.map((card) => (
              <article
                key={card.src}
                data-hero-card="true"
                className={styles.bsHeroCard}
                aria-hidden="true"
              >
                {card.kind === "video" ? (
                  <video
                    autoPlay
                    className={styles.bsHeroCardMedia}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={card.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    alt=""
                    className={styles.bsHeroCardMedia}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    src={card.src}
                    unoptimized
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}