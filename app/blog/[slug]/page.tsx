import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import * as Sanity from "@/lib/sanity";
import BlogNavbar from "@/components/blog/blognavbar";
import BlogFooter from "@/components/blog/blogfooter";
import styles from "@/components/details/detailsblog.module.css";

export const revalidate = 60;

function splitTextIntoChunks(input: string, chunkCount: number) {
  const safeChunkCount = Math.max(1, Math.floor(chunkCount));
  const text = (input ?? "").replace(/\r\n/g, "\n").trim();
  if (!text) return Array.from({ length: safeChunkCount }, () => "");

  const paragraphs = text.split(/\n\s*\n/g).map((p) => p.trim()).filter(Boolean);

  if (paragraphs.length <= 1) {
    const words = text.split(/\s+/).filter(Boolean);
    const perChunk = Math.max(1, Math.ceil(words.length / safeChunkCount));
    return Array.from({ length: safeChunkCount }, (_, i) =>
      words.slice(i * perChunk, (i + 1) * perChunk).join(" ")
    );
  }

  const totalLength = paragraphs.reduce((sum, p) => sum + p.length, 0);
  const target = Math.max(1, Math.floor(totalLength / safeChunkCount));

  const chunks: string[] = [];
  let current: string[] = [];
  let currentLen = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    const remainingParas = paragraphs.length - i;
    const remainingChunks = safeChunkCount - chunks.length;

    if (
      current.length > 0 &&
      currentLen >= target &&
      remainingParas >= remainingChunks
    ) {
      chunks.push(current.join("\n\n"));
      current = [];
      currentLen = 0;
    }

    current.push(para);
    currentLen += para.length;
  }

  if (current.length > 0) chunks.push(current.join("\n\n"));
  while (chunks.length < safeChunkCount) chunks.push("");

  if (chunks.length > safeChunkCount) {
    const keep = chunks.slice(0, safeChunkCount - 1);
    keep.push(chunks.slice(safeChunkCount - 1).join("\n\n"));
    return keep;
  }

  return chunks;
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
    images,
    detail
  }`;

  const post = await Sanity.fetchQuery<
    | {
        title: string;
        excerpt?: string;
        publishedAt?: string;
        author?: string;
        images?: SanityImageSource[];
        detail?: string;
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

  const images = Array.isArray(post.images) ? post.images : [];
  const selectedImages = images.slice(0, 6);

  const imageUrls = await Promise.all(
    selectedImages.map(async (image, index) => {
      if (index === 0 || index === 5) return buildImageUrl(image, 2000, 1125);
      if (index >= 1 && index <= 3) return buildImageUrl(image, 900, 675);
      if (index === 4) return buildImageUrl(image, 2000, 1125);
      return buildImageUrl(image, 1600, 900);
    })
  );

  const heroUrl = imageUrls[0] ?? null;
  const gridUrls = imageUrls.slice(1, 4).filter((u): u is string => Boolean(u));
  const wideUrl = imageUrls[4] ?? null;
  const closingUrl = imageUrls[5] ?? null;

  const prose = splitTextIntoChunks(String(post.detail ?? ""), 4);

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

            {/* Featured Image */}
            {heroUrl && (
              <div className={styles.imageWrapper}>
                <Image 
                  src={heroUrl} 
                  alt={post.title} 
                  fill
                  className={styles.blogImage}
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            {prose[0]?.trim() && (
              <div className={styles.contentSection}>
                <div className={styles.contentText}>{prose[0]}</div>
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

            {prose[1]?.trim() && (
              <div className={styles.contentSection}>
                <div className={styles.contentText}>{prose[1]}</div>
              </div>
            )}

            {wideUrl && (
              <div className={styles.wideImageWrapper}>
                <Image
                  src={wideUrl}
                  alt={`${post.title} image 5`}
                  fill
                  className={styles.blogImage}
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            )}

            {prose[2]?.trim() && (
              <div className={styles.contentSection}>
                <div className={styles.contentText}>{prose[2]}</div>
              </div>
            )}

            {closingUrl && (
              <div className={styles.imageWrapper}>
                <Image
                  src={closingUrl}
                  alt={`${post.title} image 6`}
                  fill
                  className={styles.blogImage}
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            )}

            {prose[3]?.trim() && (
              <div className={styles.contentSection}>
                <div className={styles.contentText}>{prose[3]}</div>
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
