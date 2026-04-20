import Image from "next/image";
import styles from "./selectedwork.module.css";

export default async function SelectedWork() {
  const posts: Array<any> = [];
  const workCards = posts.filter((post) => post.mainImage).slice(0, 6);

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
            {workCards.map((post, index) => (
              <article key={post._id} className={styles.selectedWorkCard}>
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(900).height(1200).url()}
                    alt={post.title}
                    width={900}
                    height={1200}
                    className={styles.selectedWorkImage}
                    sizes="(max-width: 519px) 100vw, (max-width: 1199px) 50vw, 600px"
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                  />
                ) : null}
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
