import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  client,
  POSTS_QUERY,
  sanityConfigReady,
  type SanityPostPreview,
  urlFor,
} from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog | Bending Spoons",
  description: "Updates and long-form insights from the Bending Spoons team.",
};

export const revalidate = 60;

async function getPosts() {
  if (!sanityConfigReady) {
    return [];
  }

  try {
    return await client.fetch<SanityPostPreview[]>(POSTS_QUERY);
  } catch {
    return [];
  }
}

function formatDate(value?: string) {
  if (!value) {
    return "Upcoming";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-[100dvh] bg-bs-bg text-bs-text">
      <div className="section-shell py-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
            Bending Spoons
          </Link>
          <Link
            href="/studio"
            className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            Open studio
          </Link>
        </div>

        <div className="mt-12 max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Blog
          </h1>
          <p className="mt-4 text-base leading-relaxed text-bs-muted sm:text-lg">
            Product strategy, technology, interviews, and operating principles
            behind the brands we acquire and improve.
          </p>
        </div>

        {!sanityConfigReady && (
          <div className="mt-10 rounded-2xl border border-white/15 bg-bs-panel p-5 text-sm text-bs-muted">
            Sanity is not configured yet. Add NEXT_PUBLIC_SANITY_PROJECT_ID and
            NEXT_PUBLIC_SANITY_DATASET in your environment to load live posts.
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post._id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-bs-panel"
            >
              <div className="relative h-52">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(700).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src="/images/product-bg.svg"
                    alt="Post placeholder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-bs-muted">
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-white">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-bs-muted">
                  {post.author?.name ? `By ${post.author.name}` : "Bending Spoons Editorial"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {sanityConfigReady && posts.length === 0 && (
          <p className="mt-10 text-sm text-bs-muted">
            No posts are published yet. Create your first post in Sanity Studio.
          </p>
        )}
      </div>
    </main>
  );
}
