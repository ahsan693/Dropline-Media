import Image from "next/image";
import Link from "next/link";
import styles from "./blogmain.module.css";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import * as Sanity from "@/lib/sanity";

type BlogListPost = {
  _id: string;
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
  author?: string;
  images?: SanityImageSource[];
  featured?: boolean;
  category?: string;
};

export default async function BlogMain() {
  const query = `*[_type == "blog" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    publishedAt,
    author,
    featured,
    "images": image1,
    category
  }`;

  const posts = await Sanity.fetchQuery<BlogListPost[]>(query);

  if (!Array.isArray(posts) || posts.length === 0) {
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
            <p>No blog posts found.</p>
          </div>
        </div>
      </main>
    );
  }

  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const otherPosts = posts.filter((p) => p._id !== featuredPost._id);

  async function buildImageUrl(image: SanityImageSource, width: number, height: number) {
    if (!image) return null;
    try {
      const builder = await Sanity.urlFor(image);
      const url = builder.width(width).height(height).url();
      if (typeof url !== "string" || !url) {
        console.warn("Sanity image URL is invalid", url, image);
        return null;
      }
      return url;
    } catch (err) {
      console.error("Error building Sanity image URL", err, image);
      return null;
    }
  }

  // Build image URLs server-side to avoid bundling image-builder on client
  const featuredImageUrl = featuredPost.images?.[0]
    ? await buildImageUrl(featuredPost.images[0], 1200, 800)
    : null;

  const otherImages: (string | null)[] = [];
  for (const p of otherPosts) {
    if (p.images?.[0]) {
      const url = await buildImageUrl(p.images[0], 800, 600);
      otherImages.push(url);
    } else {
      otherImages.push(null);
    }
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
  }

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
                {featuredImageUrl ? (
                  <Image
                    src={featuredImageUrl}
                    alt={featuredPost.title}
                    fill
                    className={styles.featuredImage}
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : null}
                <span className={styles.featuredBadge}>Featured</span>
              </div>

              <div className={styles.featuredContent}>
                <div className={styles.featuredMeta}>
                  <span>{featuredPost.category}</span>
                  <span>{formatDate(featuredPost.publishedAt)}</span>
                  <span>{/* readTime placeholder */}</span>
                </div>
                <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                <div className={styles.featuredFooter}>
                  <span className={styles.featuredAuthor}>By {featuredPost.author}</span>
                  <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredLink}>
                    Read More -&gt;
                  </Link>
                </div>
              </div>
            </article>
          </section>

          <section className={styles.postsSection}>
            <div className={styles.postsGrid}>
              {otherPosts.map((post, idx) => (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <article className={styles.card}>
                    <div className={styles.cardMedia}>
                      {otherImages[idx] ? (
                        <Image
                          src={otherImages[idx] ?? ""}
                          alt={post.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                      <span className={styles.cardMediaBadge}>{post.category ?? 'Blog'}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <span className={styles.cardBadgeHidden}>{post.category}</span>
                      <h3 className={styles.cardTitle}>{post.title}</h3>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <div className={styles.cardMeta}>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>{/* optional read time */}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className={styles.readMoreWrap}>
              <Link href="/blog" className={styles.readMoreButton}>
                Read More
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
