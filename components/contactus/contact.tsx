"use client";

import Image from "next/image";
import contactVisual from "./Video → Video Play.png";
import Link from "next/link";
import { useState } from "react";
import BlogFooter from "../blog/blogfooter";
import styles from "./contact.module.css";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work",     href: "/#work" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

const desktopLinkCls =
  "min-h-11 min-w-11 flex items-center justify-center text-lg font-medium text-black transition-colors duration-300 hover:text-black/60 focus-visible:ring-2 focus-visible:ring-offset-2";

const mobileLinkCls =
  "block rounded-md px-3 py-3 text-lg font-medium text-black focus-visible:ring-2 focus-visible:ring-offset-2";

export default function ContactUs() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.page}>

      <header
        className={[
          styles.navbar,
          "fixed top-0 left-0 right-0 w-full z-50",
          "backdrop-blur-lg border-b border-white/5",
          "transition-colors duration-300",
        ].join(" ")}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto grid h-20 w-full max-w-screen-2xl grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-12">

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
            <Link
              href="/contact"
              className="hidden md:inline-flex ml-auto items-center rounded-full border border-black bg-black px-4 py-2 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Get Started
            </Link>

            {/* Hamburger */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/10 text-black focus-visible:ring-2 focus-visible:ring-offset-2"
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
            <nav className="md:hidden fixed inset-x-4 top-[var(--navbar-offset-mobile)] z-40 rounded-lg bg-bs-panel p-4 shadow-lg">
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
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-black bg-black px-4 py-2 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          )}

        </div>
      </header>

      <main className={styles.mainSection}>
        <section className={styles.contactSection}>
          <h1>Contact Us</h1>
          <p className={styles.subtitle}>
            Fill out the form and we&apos;ll get back to you within 24 hours
          </p>

          <div className={styles.contactCard}>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formMain}>
                <div className={styles.twoCols}>
                  <label className={styles.field}>
                    <span>Full Name</span>
                    <input type="text" placeholder="John Murphy" />
                  </label>
                  <label className={styles.field}>
                    <span>Email Address</span>
                    <input type="email" placeholder="your@email.com" />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>What can we help you with?</span>
                  <select defaultValue="">
                    <option value="" disabled>Select...</option>
                    <option value="web-design">Web Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="branding">Branding</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Company Name / Website</span>
                  <input type="text" placeholder="e.g. yourbrand.com" />
                </label>

                <label className={styles.field}>
                  <span>Message</span>
                  <textarea
                    rows={4}
                    placeholder="Tell us a bit about your business and what you're looking to achieve"
                  />
                </label>

                <button type="submit" className={styles.submitBtn}>
                  Submit your request
                </button>
              </div>

              <div className={styles.contactInfo}>
                <p>Prefer to reach out directly?</p>
                <a href="tel:+35312834344">+353 1 283 4344</a>
                <a href="mailto:hello@droplinemedia.ie">hello@droplinemedia.ie</a>
              </div>
            </form>

            <aside className={styles.visualPanel}>
              <Image
                src={contactVisual}
                alt="Contact section visual"
                width={600}
                height={400}
                className={styles.visualImage}
              />
            
            </aside>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
}