import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import styles from "./marqueeTicker.module.css";

interface MarqueeTickerProps {
	image: StaticImageData;
	speed?: number;
	direction?: "left" | "right";
	height?: string;
}

export default function MarqueeTicker({
	image,
	speed = 50,
	direction = "left",
	height,
}: MarqueeTickerProps) {
	return (
		<div
			className={`${styles.marqueeContainer} ${
				direction === "left" ? styles.scrollLeft : styles.scrollRight
			}`}
			style={
				{
					"--scroll-speed": `${speed}s`,
					"--ticker-height": height,
				} as CSSProperties
			}
		>
			<div className={styles.marqueeTrack}>
				<div className={styles.marqueeItem}>
					<Image
						src={image}
						alt="Sponsored card"
						className={styles.tickerImage}
						sizes="(max-width: 390px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
					/>
				</div>
			</div>
		</div>
	);
}
