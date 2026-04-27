"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "/blog" },
];

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navAnimation =
    mounted && !shouldReduce
      ? {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
        }
      : { initial: {}, animate: {}, exit: {} };

  const desktopLinkCls =
    "min-h-[2.875rem] min-w-[2.875rem] flex items-center justify-center text-lg font-medium text-white/80 transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2";

  const mobileLinkCls =
    "block rounded-md px-3 py-3 text-[1.125rem] font-medium text-white/90 focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 w-full z-50",
        "backdrop-blur-lg border-b border-white/5",
        "transition-colors duration-300",
        scrolled ? "bg-black/60" : "bg-black/10",
      ].join(" ")}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* 
        Mobile: h-20 (80px) tall navbar, taller feel
        Desktop: h-20 unchanged 
      */}
      <div className="mx-auto grid h-20 w-full max-w-[1440px] grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-6 md:px-8 lg:px-12">

        {/* ===== LOGO ===== */}
        <Link href="/" aria-label="Dropline Media home" className="shrink-0 flex items-center">
          {/*
            Key fix: on mobile we use a plain <img> style override via Next Image's style prop.
            width/height are just aspect-ratio hints for Next.js — the actual rendered size
            is controlled by style. On mobile: 200px wide. On desktop: 180px via md override.
          */}
          <Image
            src="/images/framer/logo-dropline.svg"
            alt="Dropline Media"
            width={184}
            height={28}
            priority
            style={{ width: "200px", height: "auto" }}
            className="md:!w-[180px]"
          />
        </Link>

        {/* ===== DESKTOP NAV LINKS ===== */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => {
            if (link.label === "Blog" || link.label === "Contact") {
              return (
                <Link key={link.label} href={link.href} className={desktopLinkCls}>
                  {link.label}
                </Link>
              );
            }
            return (
              <a key={link.label} href={link.href} className={desktopLinkCls}>
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ===== RIGHT SIDE ===== */}
        <div className="flex items-center justify-end gap-3">

          {/* CTA — desktop */}
          <a
            href="/contact"
            className="hidden md:inline-flex ml-auto items-center rounded-full border border-white bg-white px-[1.125rem] py-[0.625rem] text-[16px] leading-[130%] tracking-[-0.02em] font-medium text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Get Started
          </a>

          {/* Hamburger — mobile only */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
            className="md:hidden inline-flex items-center justify-center rounded-full bg-white/10 text-white focus-visible:ring-2 focus-visible:ring-offset-2"
            /* Fixed px size so it's never tiny on any phone */
            css-hack="true"
          >
            {/* 56×56px button, 28px icon — prominent on all iPhones */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.10)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* ===== MOBILE DRAWER ===== */}
        <AnimatePresence mode="wait">
          {open && (
            <motion.nav
              key="mobile-nav"
              {...navAnimation}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-x-4 top-[var(--navbar-offset-mobile)] z-40 rounded-lg bg-bs-panel p-4 shadow-lg"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  if (link.label === "Blog" || link.label === "Contact") {
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={mobileLinkCls}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={mobileLinkCls}
                    >
                      {link.label}
                    </a>
                  );
                })}

                {/* CTA — mobile */}
                <a
                  href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-white bg-white px-[1.125rem] py-[0.625rem] text-[16px] leading-[130%] tracking-[-0.02em] font-medium text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
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