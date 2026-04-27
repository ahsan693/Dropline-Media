"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./blognavbar.module.css";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
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
      <div className="mx-auto grid h-20 w-full max-w-[1440px] grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 md:px-8 lg:px-12">

        {/* ===== LOGO ===== */}
        <Link href="/" aria-label="Dropline Media home" className="shrink-0 flex items-center">
          <Image
            src="/images/framer/logo-dropline.svg"
            alt="Dropline Media"
            width={184}
            height={28}
            priority
            className="h-auto brightness-0 md:!w-[180px]"
            /* Inline style: highest specificity — cannot be overridden by Tailwind or CSS Modules.
               200px on mobile matches homepage navbar exactly. md class handles desktop. */
            style={{ width: "200px", height: "auto" }}
            sizes="(max-width: 767px) 200px, 180px"
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
            href="/contact"
            className="hidden md:inline-flex ml-auto items-center rounded-full border border-black bg-black px-[1.125rem] py-[0.625rem] text-[16px] leading-[130%] tracking-[-0.02em] font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Get Started
          </a>

          {/* Hamburger — mobile only */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center rounded-full text-black focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => setOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
            type="button"
          >
            {/* Inline span: 56×56px matches homepage hamburger exactly */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "9999px",
                background: "rgba(0,0,0,0.08)",
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

              {/* CTA — mobile: linked to /contact same as desktop */}
              <a
                href="/contact"
                onClick={() => setOpen(false)}
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