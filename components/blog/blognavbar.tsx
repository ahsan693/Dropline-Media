"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./blognavbar.module.css";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const desktopLinkCls =
  "min-h-[2.875rem] min-w-[2.875rem] flex items-center justify-center text-lg font-medium text-black transition-colors duration-300 hover:text-black/60 focus-visible:ring-2 focus-visible:ring-offset-2";

const mobileLinkCls =
  "block rounded-md px-3 py-3 text-[1.125rem] font-medium text-black focus-visible:ring-2 focus-visible:ring-offset-2";

export default function BlogNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`${styles.navbar} fixed top-0 left-0 right-0 w-full z-50 border-b border-white/5 transition-colors duration-300`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto grid h-20 w-full max-w-[1440px] grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-12">

        {/* ===== LOGO ===== */}
        <Link href="/" aria-label="Dropline Media home" className="shrink-0">
          <Image
            src="/images/framer/logo-dropline.svg"
            alt="Dropline Media"
            width={184}
            height={28}
            className="h-auto w-[clamp(90px,20vw,180px)] brightness-0"
            sizes="(max-width: 390px) 40vw, (max-width: 768px) 20vw, 140px"
            priority
          />
        </Link>

        {/* ===== DESKTOP NAV LINKS ===== */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={desktopLinkCls}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ===== RIGHT SIDE ===== */}
        <div className="flex items-center justify-end gap-3">

          {/* CTA — desktop */}
          <a
            href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"
            className="hidden md:inline-flex ml-auto items-center rounded-full border border-black bg-black px-[1.125rem] py-[0.625rem] text-[16px] leading-[130%] tracking-[-0.02em] font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Get Started
          </a>

          {/* Hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-black/10 text-black focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => setOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* ===== MOBILE DRAWER ===== */}
        {open && (
          <nav className="md:hidden fixed inset-x-4 top-[var(--navbar-offset-mobile)] z-40 rounded-lg bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={mobileLinkCls}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA — mobile */}
              <a
                href="https://buy.polar.sh/polar_cl_540Xa7jXDRuxRHrZhhoutzRcU9p7zkrVDFgAF3LQcVL"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-black bg-black px-[1.125rem] py-[0.625rem] text-[16px] leading-[130%] tracking-[-0.02em] font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
              >
                Get Started
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}