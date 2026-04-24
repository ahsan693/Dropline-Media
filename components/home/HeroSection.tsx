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

      mm.add("(min-width: 768px)", () => {
        if (prefersReduced) {
          // Reduced motion: set final visible state without animations
          gsap.set(cardsSection, { opacity: 1, y: 0, filter: "none" });
          gsap.set(title, { opacity: 1, y: 0, filter: "none" });
          gsap.set(carousel, { rotationY: 0 });
          return;
        }
        const depth = viewportWidth / 2.5;
        const timeline = gsap.timeline();

        timeline
          .set(
            cards,
            {
              rotateY: (index: number) => index * (-360 / cards.length),
              transformOrigin: `50% 50% ${depth}px`,
              z: -depth,
              backfaceVisibility: "hidden",
            },
            0,
          )
          .set(cardsSection, { opacity: 0, y: 150, filter: "blur(3px) grayscale(100%)" }, 0)
          .set(title, { opacity: 0, y: 50 }, 0)
          .to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            filter: "blur(0px) grayscale(0%)",
          })
          .to(
            cardsSection,
            {
              opacity: 1,
              duration: 1,
              y: 0,
              filter: "blur(0px) grayscale(0%)",
              ease: "power2.out",
            },
            "<50%",
          )
          .to(
            carousel,
            {
              rotationY: 45,
              duration: 3,
              ease: "circ.out",
            },
            "<",
          )
          .to(
            carousel,
            {
              rotationY: 360,
              duration: 60,
              ease: "linear",
              repeat: -1,
            },
            "<70%",
          );
      });

      mm.add("(max-width: 767px)", () => {
        if (prefersReduced) {
          gsap.set(cardsSection, { opacity: 1, y: 0, filter: "none" });
          gsap.set(title, { opacity: 1, y: 0, filter: "none" });
          gsap.set(carousel, { rotationY: 0 });
          return;
        }
        const depth = viewportWidth / 1.25;
        const timeline = gsap.timeline();

        timeline
          .set(
            cards,
            {
              rotateY: (index: number) => index * (-360 / cards.length),
              transformOrigin: `50% 50% ${depth}px`,
              z: -depth,
              backfaceVisibility: "hidden",
            },
            0,
          )
          .set(cardsSection, { opacity: 0, y: 150, filter: "blur(3px) grayscale(100%)" }, 0)
          .set(title, { opacity: 0, y: 50 }, 0)
          .to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            filter: "blur(0px) grayscale(0%)",
          })
          .to(
            cardsSection,
            {
              opacity: 1,
              duration: 1,
              y: 0,
              filter: "blur(0px) grayscale(0%)",
              ease: "power2.out",
            },
            "<50%",
          )
          .to(
            carousel,
            {
              rotationY: 45,
              duration: 3,
              ease: "circ.out",
            },
            "<",
          )
          .to(
            carousel,
            {
              rotationY: 360,
              duration: 60,
              ease: "linear",
              repeat: -1,
            },
            "<70%",
          );
      });

      return () => {
        mm.revert();
      };
    }, sectionCardsRef);

    return () => {
      ctx.revert();
    };
  }, [mounted, viewportWidth]);

  return (
    <section className={styles.bsHeroSection}>
      <div className={styles.bsHeroTitleWrap}>
        <h1
          ref={titleRef}
          className={styles.bsHeroHeading}
        >
          We scale brands through
          <br />
          <em>ads</em> that <em>convert</em>
        </h1>
      </div>
      <div ref={sectionCardsRef} className={styles.bsHeroCarouselStage}>
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
    </section>
  );
}
