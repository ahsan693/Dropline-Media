"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <header
      className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto grid min-h-[4rem] md:h-[5.25rem] w-full max-w-full lg:max-w-[75rem] grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 md:px-10 safe-x">
        <Link href="/" aria-label="Dropline Media home" className="shrink-0">
          <Image
            src="/images/framer/logo-dropline.svg"
            alt="Dropline Media"
            width={184}
            height={28}
            className="h-auto w-[clamp(72px,20vw,138px)]"
            sizes="(max-width: 390px) 40vw, (max-width: 768px) 20vw, 138px"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            link.label === "Blog" || link.label === "Contact" ? (
              <Link
                key={link.label}
                href={link.href}
                className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center text-xs font-medium text-white/88 transition hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center text-xs font-medium text-white/88 transition hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <a
            href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"
            className="hidden md:inline-flex ml-auto items-center rounded-full bg-white px-4 py-1.5 text-[0.625rem] font-semibold text-black transition hover:bg-white/90 md:px-5 md:text-[0.6875rem] focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Get Started
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full bg-white/8 text-white/90 focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => setOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={shouldReduce ? {} : { opacity: 0, y: -12 }}
              animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
              exit={shouldReduce ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-x-4 top-[var(--navbar-offset-mobile)] md:top-[var(--navbar-offset-tablet)] z-40 rounded-lg bg-bs-panel p-4 shadow-lg"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  link.label === "Blog" || link.label === "Contact" ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base font-medium text-white/92 focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base font-medium text-white/92 focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  )
                ))}

                <a
                  href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
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
