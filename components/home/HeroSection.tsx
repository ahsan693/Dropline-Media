"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./HeroSection.module.css";

interface HeroCard {
  kind: "video" | "image";
  src: string;
}

const heroCards: HeroCard[] = [
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/komoot.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/evernote.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/vimeo.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/wetransfer.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/remini.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/brightcove.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/meetup.mp4" },
  {
    kind: "image",
    src: "https://bendingspoons.com/_next/static/media/Harvest-card.69130bba.webp",
  },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/streamyard.mp4" },
  { kind: "video", src: "https://bendingspoons.com/videos/hero-cards-home/aol.mp4" },
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

        // GSAP's transformOrigin z-offset IS the cylinder radius.
        // We set each card's rotateY first, then push it out along Z by `depth`.
        // The result: cards sit on the surface of a cylinder of radius=depth.
        //
        // transformOrigin "50% 50% {depth}px" means the pivot is depth px
        // BEHIND the card's centre — so rotating around that pivot moves
        // the card's face onto the cylinder surface at radius=depth.
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

        /*
         * Depth formula explained:
         *
         * The carousel container is 25vw wide on desktop.
         * The inspect element shows cards at translateZ(-932px) on a ~1366px
         * viewport, which is 932 / 1366 ≈ 0.68 of viewportWidth.
         *
         * But the CONTAINER is 25vw = 0.25 * viewportWidth.
         * GSAP's transformOrigin is relative to the ELEMENT (the container),
         * not the viewport. So the effective viewport-relative radius is:
         *   containerWidth * (depth / containerWidth) = depth
         *
         * We want the cylinder radius ≈ 68% of viewportWidth:
         *   depth = viewportWidth * 0.68 ≈ viewportWidth / 1.47
         *
         * However the reference uses viewportWidth / 2.5 in its source,
         * which at 1366px gives 546px — a tighter, more dramatic cylinder.
         * Use this to match the reference exactly.
         */
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

        // Mobile: container is 50vw, use a larger depth divisor so the
        // cylinder is wider relative to screen and cards don't overlap.
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

      {/*
       * Layer 1: .bsHeroCarouselStage — perspective ONLY, no transform-style.
       * Layer 2: .bsHeroCarousel3dCtx — preserve-3d ONLY, no perspective.
       *          This element is the 3D context bridge.
       * Layer 3: .bsHeroCarousel     — GSAP spins rotationY here.
       * Layer 4: .bsHeroCard         — GSAP fans cards onto the cylinder.
       *
       * Separating perspective from preserve-3d is critical: a single element
       * with both causes the browser to flatten the 3D scene entirely.
       */}
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