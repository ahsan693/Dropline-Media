import Image from "next/image";
import styles from "./PaidMediaHero.module.css";

import phoneImage from "../../servicessectionimages/paidmediasection/iPhone 11 Pro.png";
import ticker1Image from "../../servicessectionimages/paidmediasection/ticker1.png";
import ticker2Image from "../../servicessectionimages/paidmediasection/ticker2.png";

export default function PaidMediaHero() {
	return (
		<div className={styles.heroRoot}>
			<div className={styles.phoneWrap}>
				<Image
					src={phoneImage}
					alt="Paid media phone"
					width={280}
					height={820}
					className={styles.phoneImage}
					priority
				/>
			</div>

			{/* Left Side Image */}
			<div className={`${styles.floatCard} ${styles.leftMid} ${styles.fromLeft} ${styles["delay-1"]} ${styles.floatCardSize} z-20`}>
				<Image
					src={ticker2Image}
					alt="Left side ad"
					width={192}
					height={106}
					className="h-auto w-full rounded-[12px] object-contain shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
					sizes="192px"
				/>
			</div>

			{/* Right Side Image (single) */}
			<div className={`${styles.floatCard} ${styles.rightMid} ${styles.fromRight} ${styles["delay-3"]} ${styles.floatCardSize} z-20`}>
				<Image
					src={ticker1Image}
					alt="Right side ad"
					width={192}
					height={288}
					className="h-auto w-full rounded-[12px] object-contain shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
					sizes="192px"
				/>
			</div>
		</div>
	);
}
