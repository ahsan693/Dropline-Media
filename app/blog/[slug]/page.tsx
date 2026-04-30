import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import * as Sanity from "@/lib/sanity";
import BlogNavbar from "@/components/blog/blognavbar";
import BlogFooter from "@/components/blog/blogfooter";
import styles from "@/components/details/detailsblog.module.css";

export const revalidate = 60;

function toPortableTextValue(detail?: PortableTextBlock[] | null): PortableTextBlock[] {
  if (Array.isArray(detail)) return detail;
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "blog" && slug.current == $slug][0]{title, excerpt}`;
  const post = await Sanity.fetchQuery<{ title?: string; excerpt?: string } | null>(query, { slug });
  return {
    title: post?.title ?? "Blog post",
    description: post?.excerpt ?? "",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    excerpt,
    publishedAt,
    author,
    text1,
    image1,
    text2,
    threeImages,
    text3,
    conclusionImage,
    text4
  }`;

  const post = await Sanity.fetchQuery<
    | {
        title: string;
        excerpt?: string;
        publishedAt?: string;
        author?: string;
        image1?: SanityImageSource[];
        threeImages?: SanityImageSource[];
        conclusionImage?: SanityImageSource;
        text1?: PortableTextBlock[];
        text2?: PortableTextBlock[];
        text3?: PortableTextBlock[];
        text4?: PortableTextBlock[];
      }
    | null
  >(query, { slug });

  if (!post) {
    return (
      <div className="font-home-sans">
        <BlogNavbar />
        <main className={styles.pageMain}>
          <div className="section-shell py-20">
            <div className={styles.articleInner}>
              <div className="text-center">
                <h1 className={styles.blogTitle}>Post not found</h1>
                <Link href="/blog" className={styles.backLink}>
                  ← Back to all posts
                </Link>
              </div>
            </div>
          </div>
        </main>
        <BlogFooter />
      </div>
    );
  }

  async function buildImageUrl(image: SanityImageSource, width: number, height: number) {
    if (!image) return null;
    const builder = await Sanity.urlFor(image);
    return builder.width(width).height(height).url();
  }

  const heroSources = Array.isArray(post.image1) ? post.image1 : [];
  const heroUrls = (
    await Promise.all(heroSources.map((image) => buildImageUrl(image, 2000, 1125)))
  ).filter((u): u is string => Boolean(u));

  const threeImages = Array.isArray(post.threeImages) ? post.threeImages : [];
  const gridUrls = (
    await Promise.all(
      threeImages.map((image) => buildImageUrl(image, 900, 675))
    )
  ).filter((u): u is string => Boolean(u));

  const closingUrl = post.conclusionImage
    ? await buildImageUrl(post.conclusionImage, 2000, 1125)
    : null;

  const text1Value = toPortableTextValue(post.text1);
  const text2Value = toPortableTextValue(post.text2);
  const text3Value = toPortableTextValue(post.text3);
  const text4Value = toPortableTextValue(post.text4);
  const portableTextComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => <h1 className={styles.contentH1}>{children}</h1>,
      h2: ({ children }) => <h2 className={styles.contentH2}>{children}</h2>,
      h3: ({ children }) => <h3 className={styles.contentH3}>{children}</h3>,
      normal: ({ children }) => <p className={styles.contentParagraph}>{children}</p>,
    },
  };

  function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", { 
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  }

  return (
    <div className="font-home-sans">
      <BlogNavbar />
      <main className={styles.pageMain}>
        <article className="section-shell">
          <div className={styles.articleInner}>
            {/* Header Section */}
            <div className={styles.headerSection}>
              <div className={styles.categoryBadge}>Blog</div>
              <h1 className={styles.blogTitle}>{post.title}</h1>
              
              {/* Meta Information */}
              <div className={styles.metaInfo}>
                <span className={styles.metaAuthor}>{post.author}</span>
                <span className={styles.metaSeparator}>•</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span className={styles.metaSeparator}>•</span>
                <span>{post.excerpt}</span>
              </div>
            </div>

            {/* Text 1 */}
            {text1Value.length > 0 && (
              <div className={styles.contentSection}>
                <div className={styles.portableText}>
                  <PortableText value={text1Value} components={portableTextComponents} />
                </div>
              </div>
            )}

            {/* Image 1 */}
            {heroUrls.length > 0 &&
              heroUrls.map((url, index) => (
                <div key={`${url}-${index}`} className={styles.imageWrapper}>
                  <Image
                    src={url}
                    alt={post.title}
                    fill
                    className={styles.blogImage}
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority={index === 0}
                  />
                </div>
              ))}

            {/* Text 2 */}
            {text2Value.length > 0 && (
              <div className={styles.contentSection}>
                <div className={styles.portableText}>
                  <PortableText value={text2Value} components={portableTextComponents} />
                </div>
              </div>
            )}

            {gridUrls.length > 0 && (
              <div className={styles.imageGrid}>
                {gridUrls.map((url, index) => (
                  <div key={`${url}-${index}`} className={styles.gridItem}>
                    <Image
                      src={url}
                      alt={`${post.title} image ${index + 2}`}
                      fill
                      className={styles.gridImage}
                      sizes="(max-width: 640px) 100vw, (max-width: 896px) 33vw, 280px"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Text 3 */}
            {text3Value.length > 0 && (
              <div className={styles.contentSection}>
                <div className={styles.portableText}>
                  <PortableText value={text3Value} components={portableTextComponents} />
                </div>
              </div>
            )}

            {/* Conclusion Image */}
            {closingUrl && (
              <div className={styles.imageWrapper}>
                <Image
                  src={closingUrl}
                  alt={post.title}
                  fill
                  className={styles.blogImage}
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            )}

            {/* Text 4 */}
            {text4Value.length > 0 && (
              <div className={styles.contentSection}>
                <div className={styles.portableText}>
                  <PortableText value={text4Value} components={portableTextComponents} />
                </div>
              </div>
            )}

            {/* Back Link */}
            <div className={styles.backLinkSection}>
              <Link 
                href="/blog" 
                className={styles.backLink}
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <BlogFooter />
    </div>
  );
}
