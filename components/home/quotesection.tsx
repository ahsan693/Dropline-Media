"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./quotesection.module.css";

import quoteLogo from "./logoimage/Ellipse 1516.png";

type LogoMotion = {
	x: number;
	rotate: number;
};

export default function QuoteSection() {
	const [logoMotion, setLogoMotion] = useState<LogoMotion>({ x: 0, rotate: 0 });

	const updateMotionFromPoint = (clientX: number, target: HTMLDivElement) => {
		const rect = target.getBoundingClientRect();
		const ratio = (clientX - rect.left) / rect.width;
		const normalized = Math.max(-1, Math.min(1, ratio * 2 - 1));

		setLogoMotion({
			x: normalized * 26,
			rotate: normalized * 18,
		});
	};

	return (
		<section className={styles.quoteSection}>
			<div
				className={styles.quoteCard}
				onMouseMove={(event) => updateMotionFromPoint(event.clientX, event.currentTarget)}
				onMouseLeave={() => setLogoMotion({ x: 0, rotate: 0 })}
				onTouchMove={(event) => {
					const firstTouch = event.touches[0];
					if (!firstTouch) return;
					updateMotionFromPoint(firstTouch.clientX, event.currentTarget);
				}}
				onTouchEnd={() => setLogoMotion({ x: 0, rotate: 0 })}
			>
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
							style={{
								"--logo-x": `${logoMotion.x}px`,
								"--logo-rotate": `${logoMotion.rotate}deg`,
							} as CSSProperties}
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
