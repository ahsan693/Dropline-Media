"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ================= NAV LINKS DATA (edit labels / routes here)
const navLinks = [
  { label: "Services", href: "#services" }, // section link
  { label: "Work", href: "#work" },         // section link
  { label: "Blog", href: "/blog" },         // page route
  { label: "Contact", href: "/contact" },   // page route
];

export default function HomeNavbar() {

  // ================= MOBILE MENU STATE
  const [open, setOpen] = useState(false); // true = mobile menu open

  // ================= REDUCE MOTION (accessibility animation control)
  const shouldReduce = useReducedMotion();

  return (
    // ================= HEADER WRAPPER (navbar container)
    <header
      className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent"
      // ↑ change bg-transparent → bg-black/white etc for background
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      // ↑ mobile notch safe spacing
    >

      {/* ================= MAIN NAV CONTAINER (layout grid) */}
      <div className="mx-auto grid min-h-[4rem] md:h-[5.25rem] w-full max-w-full lg:max-w-[75rem] grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 md:px-10 safe-x">

        {/* ================= LOGO SECTION (LEFT SIDE) */}
        <Link href="/" aria-label="Dropline Media home" className="shrink-0">

          {/* LOGO IMAGE */}
          <Image
            src="/images/framer/logo-dropline.svg"
            alt="Dropline Media"

            // 👇 LOGO SIZE CONTROL
            width={184}
            height={28}
            className="h-auto w-[clamp(74px,20vw,140px)]"
            // ↑ increase logo size here (140px max)

            sizes="(max-width: 390px) 40vw, (max-width: 768px) 20vw, 140px"
            priority
          />
        </Link>

        {/* ================= DESKTOP NAV LINKS (CENTER) */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {/* gap-8 → spacing between nav items (increase = more space) */}

          {navLinks.map((link) => (
            link.label === "Blog" || link.label === "Contact" ? (

              // PAGE LINKS (Next.js Link)
              <Link
                key={link.label}
                href={link.href}

                className="
                  min-h-[2.875rem] min-w-[2.875rem]
                  flex items-center justify-center

                  text-sm font-medium text-white/88
                  /* ↑ text size + font weight */

                  transition hover:text-white

                  focus-visible:ring-2 focus-visible:ring-offset-2
                "
              >
                {link.label}
              </Link>

            ) : (

              // SECTION LINKS (anchor links)
              <a
                key={link.label}
                href={link.href}

                className="
                  min-h-[2.875rem] min-w-[2.875rem]
                  flex items-center justify-center

                  text-sm font-medium text-white/88

                  transition hover:text-white

                  focus-visible:ring-2 focus-visible:ring-offset-2
                "
              >
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* ================= RIGHT SIDE (BUTTON + MOBILE MENU BUTTON) */}
        <div className="flex items-center justify-end gap-3">

          {/* ================= CTA BUTTON (DESKTOP ONLY) */}
          <a
            href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"

            className="
              hidden md:inline-flex ml-auto

              items-center rounded-full bg-white
              px-[18px] py-2 md:px-[22px]

              text-[0.75rem] md:text-[0.8125rem]
              font-semibold text-black

              transition hover:bg-white/90

              focus-visible:ring-2 focus-visible:ring-offset-2
            "
            // ↑ BUTTON SIZE CONTROL HERE:
            // px = width padding
            // py = height padding
            // text = font size
          >
            Get Started
          </a>

          {/* ================= MOBILE MENU BUTTON (HAMBURGER) */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}

            className="
              md:hidden

              inline-flex h-[2.875rem] w-[2.875rem]
              items-center justify-center

              rounded-full bg-white/8 text-white/90

              focus-visible:ring-2 focus-visible:ring-offset-2
            "
            onClick={() => setOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
          >

            {/* ICON (Hamburger / Close toggle) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"   // CLOSE ICON
                    : "M3 6h18M3 12h18M3 18h18" // HAMBURGER ICON
                }
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* ================= MOBILE MENU (DROPDOWN DRAWER) */}
        <AnimatePresence>
          {open && (
            <motion.nav

              initial={shouldReduce ? {} : { opacity: 0, y: -12 }}
              animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
              exit={shouldReduce ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}

              className="
                md:hidden
                fixed inset-x-4

                top-[var(--navbar-offset-mobile)]
                md:top-[var(--navbar-offset-tablet)]

                z-40 rounded-lg

                bg-bs-panel
                p-4 shadow-lg
              "
            >

              {/* ================= MOBILE LINKS */}
              <div className="flex flex-col gap-3">
                {/* gap-3 → spacing between items */}

                {navLinks.map((link) => (
                  link.label === "Blog" || link.label === "Contact" ? (

                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}

                      className="
                        block rounded-md
                        px-3 py-3

                        text-[1.125rem] font-medium text-white/92

                        focus-visible:ring-2 focus-visible:ring-offset-2
                      "
                    >
                      {link.label}
                    </Link>

                  ) : (

                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}

                      className="
                        block rounded-md
                        px-3 py-3

                        text-[1.125rem] font-medium text-white/92

                        focus-visible:ring-2 focus-visible:ring-offset-2
                      "
                    >
                      {link.label}
                    </a>
                  )
                ))}

                {/* ================= MOBILE CTA BUTTON */}
                <a
                  href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"

                  className="
                    mt-2 inline-flex
                    items-center justify-center

                    rounded-full bg-white

                    px-[18px] py-[10px]
                    text-base font-semibold text-black
                  "
                >
                  Get Started
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}