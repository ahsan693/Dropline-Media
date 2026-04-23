"use client";

import Image from "next/image";
import styles from "./quotesection.module.css";

import quoteLogo from "./logoimage/logo1.svg";

export default function QuoteSection() {
	return (
		<section className={styles.quoteSection}>
			<div className={styles.quoteCard}>
				<span className={`${styles.navDot} ${styles.navDotLeft}`} aria-hidden="true">
					←
				</span>

				<div className={styles.quoteContent}>
					<Image
						src={quoteLogo}
						alt="Dropline logo"
						className={styles.quoteLogo}
						width={56}
						height={56}
						priority
					/>

					<blockquote className={styles.quoteText}>
						&ldquo;Before working together, we were spending on ads without knowing what
						was working. Everything is clear; results speak for themselves&rdquo;
					</blockquote>

					<p className={styles.quoteAuthor}>Sarah Khan</p>
					<p className={styles.quoteRole}>Marketing Manager</p>
				</div>

				<span className={`${styles.navDot} ${styles.navDotRight}`} aria-hidden="true">
					→
				</span>
			</div>
		</section>
	);
}
