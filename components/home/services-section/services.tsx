import Image, { type StaticImageData } from "next/image";
import styles from "./services.module.css";
import PaidMediaHero from "./paidmedia-section/PaidMediaHero";
import ContentCreation from "./content-creation/content-creation";

import paidMediaImage from "../servicessectionimages/paidmediasection/iPhone 11 Pro.png";
import contentCreationImage from "../servicessectionimages/Img - Vimeo card_margin.png";
import brandingImage from "../servicessectionimages/WeTransfer card.png";
import webDesignImage from "../servicessectionimages/Top.png";
import creativeStudioImage from "../servicessectionimages/Meetup card.png";
import oohImage from "../servicessectionimages/Img - Vimeo card_margin (1).png";

type ServiceCard = {
	title: string;
	cta: string;
	description: string;
	bullets: string[];
	image: StaticImageData;
	theme: "paid" | "content" | "branding" | "web" | "studio" | "ooh";
	motion: "left" | "right" | "none";
};

const cards: ServiceCard[] = [
	{
		title: "Paid Media",
		cta: "Start scaling",
		description: "Scaling brands through paid ads",
		bullets: [
			"Paid search, social, and video campaigns",
			"Full-funnel strategy, testing and optimisation",
			"Built to drive profitable growth",
		],
		image: paidMediaImage,
		theme: "paid",
		motion: "none",
	},
	{
		title: "Content Creation",
		cta: "Build your content",
		description: "Content built for consistency and growth",
		bullets: [
			"Short-form video and social content",
			"Platform specific content systems",
			"Designed to stay consistent and engaging",
		],
		image: contentCreationImage,
		theme: "content",
		motion: "none",
	},
	{
		title: "Branding",
		cta: "Build your brand",
		description: "Brands built to stand out and scale",
		bullets: [
			"Brand identity, positioning, and messaging",
			"Visual systems and creative direction",
			"Designed for recognition and consistency",
		],
		image: brandingImage,
		theme: "branding",
		motion: "none",
	},
	{
		title: "Web Design",
		cta: "Launch your website",
		description: "Websites built to convert",
		bullets: [
			"High-converting websites and landing pages",
			"UX-focused design and user journeys",
			"Built for performance and speed",
		],
		image: webDesignImage,
		theme: "web",
		motion: "none",
	},
	{
		title: "Creative Studio",
		cta: "Create ads",
		description: "High-impact creative built to perform",
		bullets: [
			"CGI, VFX, and ad production",
			"Performance-driven ad creatives",
			"Built for campaigns that convert",
		],
		image: creativeStudioImage,
		theme: "studio",
		motion: "none",
	},
	{
		title: "OOH Advertising",
		cta: "Plan campaign",
		description: "Offline campaigns that extend your reach",
		bullets: [
			"Billboard, transit, and outdoor placements",
			"Media planning and execution",
			"Integrated with digital campaigns",
		],
		image: oohImage,
		theme: "ooh",
		motion: "none",
	},
];

export default function Services() {
	return (
		<section className={styles.servicesSection}>
			<div className="section-shell">
				<div className={styles.servicesFrame}>
					<h1 className={styles.servicesTitle}>Services</h1>

					<div className={styles.servicesGrid}>
						{cards.map((card) => (
							<article
								key={card.title}
								className={`${styles.serviceCard} ${styles[card.theme]}`}
							>
								<div className={styles.cardTop}>
									<h3 className={styles.cardTitle}>{card.title}</h3>
									<span className={styles.cardButton}>{card.cta} ↗</span>
								</div>

								<p className={styles.cardDescription}>{card.description}</p>

								<ul className={styles.cardList}>
									{card.bullets.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>

								<div className={styles.mediaRail}>
									<div className={styles.mediaScale}>
										{card.title === "Paid Media" ? (
											<PaidMediaHero />
										) : card.title === "Content Creation" ? (
											<ContentCreation />
										) : (
											<div
												className={`${styles.mediaDrift} ${
													card.motion === "left"
														? styles.driftLeft
														: card.motion === "right"
															? styles.driftRight
															: ""
												}`}
											>
												<Image
													src={card.image}
													alt={card.title}
													className={styles.cardImage}
													sizes="(max-width: 390px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
													loading={
														card.title === "Content Creation"
															? undefined
															: "lazy"
													}
													priority={card.title === "Content Creation"}
												/>
											</div>
										)}
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
