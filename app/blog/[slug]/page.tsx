import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import * as Sanity from "@/lib/sanity";
import BlogNavbar from "@/components/blog/blognavbar";
import BlogFooter from "@/components/blog/blogfooter";
import styles from "@/components/details/detailsblog.module.css";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "blog" && slug.current == $slug][0]{title, excerpt}`;
  const post = await Sanity.fetchQuery(query, { slug });
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

  const post = await Sanity.fetchQuery(query, { slug });

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

  let imageUrl: string | null = null;
  if (post.images && post.images.length > 0) {
    const b = await Sanity.urlFor(post.images[0]);
    imageUrl = b.width(1200).height(800).url();
  }

  function formatDate(dateStr: string) {
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
            {imageUrl && (
              <div className={styles.imageWrapper}>
                <Image 
                  src={imageUrl} 
                  alt={post.title} 
                  fill
                  className={styles.blogImage}
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className={styles.contentSection}>
              <div className={styles.contentText}>
                {post.detail}
              </div>
            </div>

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
