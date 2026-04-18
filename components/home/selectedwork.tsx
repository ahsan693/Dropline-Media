import Image, { type StaticImageData } from "next/image";
import styles from "./selectedwork.module.css";

import workOne from "./selectedworkimages/Background+Shadow.png";
import workTwo from "./selectedworkimages/Background+Shadow (1).png";
import workThree from "./selectedworkimages/Background+Shadow (2).png";
import workFour from "./selectedworkimages/Background+Shadow (3).png";
import workFive from "./selectedworkimages/Background+Shadow (4).png";
import workSix from "./selectedworkimages/Background+Shadow (5).png";

const workCards: StaticImageData[] = [
	workOne,
	workTwo,
	workThree,
	workFour,
	workFive,
	workSix,
];

export default function SelectedWork() {
	return (
		<section id="work" className={styles.selectedWorkSection}>
			<div className="section-shell">
				<div className={styles.selectedWorkWrap}>
					<header className={styles.selectedWorkHeader}>
						<h2 className={styles.selectedWorkTitle}>Selected Work</h2>
						<p className={styles.selectedWorkSubtitle}>
							A selection of branding, creative, and campaigns.
						</p>
					</header>

					<div className={styles.selectedWorkGrid}>
						{workCards.map((image, index) => (
							<article key={index} className={styles.selectedWorkCard}>
								<Image
									src={image}
									alt={`Selected work panel ${index + 1}`}
									className={styles.selectedWorkImage}
									sizes="(max-width: 519px) 100vw, (max-width: 1199px) 50vw, 600px"
									priority={index < 2}
									loading={index < 2 ? undefined : "lazy"}
								/>
							</article>
						))}
					</div>

					<div className={styles.selectedWorkCtaWrap}>
						<button type="button" className={styles.selectedWorkCta}>
							Start A Project
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
