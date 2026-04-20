import Image from "next/image";
import FeaturedImg from "./featuredimage/Professionelles Webdesign 2025_ Der ultimative Guide.png";
import Link from "next/link";
import styles from "./blogmain.module.css";

const featuredPost = {
	href: "/blog",
	badge: "Featured",
	category: "Webdesign",
	date: "Jan 15, 2026",
	readTime: "8 min",
	title: "Professional Web Design 2025: The Ultimate Guide",
	excerpt:
		"Modern websites must blend strong visuals with smart structure. Learn how to plan, design, and ship a site that converts.",
	author: "Kerim Bilin",
	image: FeaturedImg,
};

const posts = [
	{
		href: "/blog",
		category: "Responsive design",
		title: "Responsive web design: Mobile-first design for 2025",
		excerpt:
			"Great experiences now start on small screens. Learn how to build layouts that scale beautifully.",
		date: "Jan 25, 2025",
		readTime: "6 min",
		image: "/images/framer/work-logos-grid.png",
	},
	{
		href: "/blog",
		category: "SEO",
		title: "SEO Agency: How to rank on page 1 of Google",
		excerpt:
			"Search engine optimization is the key to increased visibility, traffic, and revenue.",
		date: "Jan 25, 2025",
		readTime: "9 min",
		image: "/images/framer/work-ads.png",
	},
	{
		href: "/blog",
		category: "UI/UX Design",
		title: "UI/UX Design: Digital experiences that convert",
		excerpt:
			"Good design is invisible. Learn how UX design drives results and reduces friction.",
		date: "Jan 28, 2025",
		readTime: "8 min",
		image: "/images/framer/work-product-pages.png",
	},
	{
		href: "/blog",
		category: "Web development",
		title: "Web development: Frontend, Backend & Full Stack",
		excerpt:
			"Modern web projects need speed, stability, and clarity across the stack.",
		date: "Jan 30, 2025",
		readTime: "5 min",
		image: "/images/framer/hero-watch.png",
	},
	{
		href: "/blog",
		category: "Google Ads",
		title: "Google Ads: The Guide to Successful SEA Campaigns",
		excerpt:
			"Learn how to structure, launch, and optimize paid search campaigns that scale.",
		date: "Feb 1, 2025",
		readTime: "7 min",
		image: "/images/framer/work-rootura.png",
	},
	{
		href: "/blog",
		category: "Performance",
		title: "Performance optimization: Achieve PageSpeed 100/100",
		excerpt:
			"Fast sites convert. Explore practical steps to hit top scores without sacrificing design.",
		date: "Feb 3, 2025",
		readTime: "5 min",
		image: "/images/framer/work-plumpd.png",
	},
];

export default function BlogMain() {
	return (
		<main className={styles.blogMain}>
			<div className="section-shell">
				<div className={styles.blogInner}>
					<header className={styles.hero}>
						<h1 className={styles.title}>The Dropline Journal</h1>
						<p className={styles.subtitle}>
							Marketing insights, digital strategy, and design trends curated by
							Dublin&apos;s leading marketing agency.
						</p>
					</header>

					<section className={styles.featuredSection}>
						<article className={styles.featuredCard}>
							<div className={styles.featuredMedia}>
								<Image
									src={featuredPost.image}
									alt={featuredPost.title}
									fill
									className={styles.featuredImage}
									sizes="(max-width: 900px) 100vw, 60vw"
									style={{ objectFit: "cover" }}
									priority
								/>
								<span className={styles.featuredBadge}>{featuredPost.badge}</span>
							</div>

							<div className={styles.featuredContent}>
								<div className={styles.featuredMeta}>
									<span>{featuredPost.category}</span>
									<span>{featuredPost.date}</span>
									<span>{featuredPost.readTime}</span>
								</div>
								<h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
								<p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
								<div className={styles.featuredFooter}>
									<span className={styles.featuredAuthor}>By {featuredPost.author}</span>
									<Link href={featuredPost.href} className={styles.featuredLink}>
										Read More -&gt;
									</Link>
								</div>
							</div>
						</article>
					</section>

					<section className={styles.postsSection}>
						<div className={styles.postsGrid}>
							{posts.map((post) => (
								<article key={post.title} className={styles.card}>
									<div className={styles.cardMedia}>
										<Image
											src={post.image}
											alt={post.title}
											fill
											sizes="(max-width: 900px) 100vw, 33vw"
											style={{ objectFit: "cover" }}
										/>
									</div>
									<div className={styles.cardBody}>
										<span className={styles.cardBadge}>{post.category}</span>
										<h3 className={styles.cardTitle}>{post.title}</h3>
										<p className={styles.cardExcerpt}>{post.excerpt}</p>
										<div className={styles.cardMeta}>
											<span>{post.date}</span>
											<span>{post.readTime}</span>
										</div>
									</div>
								</article>
							))}
						</div>

						<div className={styles.readMoreWrap}>
							<button type="button" className={styles.readMoreButton}>
								Read More
							</button>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
