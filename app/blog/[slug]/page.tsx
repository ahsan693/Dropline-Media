import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  client,
  POST_QUERY,
  POST_SLUGS_QUERY,
  sanityConfigReady,
  type SanityPost,
  urlFor,
} from "@/lib/sanity";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  if (!sanityConfigReady) {
    return null;
  }

  try {
    return await client.fetch<SanityPost | null>(POST_QUERY, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  if (!sanityConfigReady) {
    return [];
  }

  const entries = await client.fetch<Array<{ slug: string }>>(POST_SLUGS_QUERY);
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found | Bending Spoons Blog",
    };
  }

  return {
    title: `${post.title} | Bending Spoons Blog`,
    description: `Read ${post.title} on the Bending Spoons blog.`,
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-white/88 sm:text-lg">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-3xl font-black text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-2xl font-extrabold text-white">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-white/88">{children}</ul>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={typeof value?.href === "string" ? value.href : "#"}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-white underline decoration-white/45 underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

function formatDate(value?: string) {
  if (!value) {
    return "Upcoming";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-[100dvh] bg-bs-bg text-bs-text">
      <article className="section-shell py-10 sm:py-12">
        <Link href="/blog" className="text-sm font-semibold text-bs-muted hover:text-white">
          Back to blog
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-bs-muted">
            {formatDate(post.publishedAt)}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-bs-muted">
            {post.author?.name ? `By ${post.author.name}` : "Bending Spoons Editorial"}
          </p>
        </header>

        <div className="relative mt-10 h-64 overflow-hidden rounded-3xl border border-white/10 sm:h-80 md:h-[26.25rem]">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          ) : (
            <Image
              src="/images/product-bg.svg"
              alt="Post placeholder"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          )}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="prose prose-invert mt-10 max-w-4xl">
          <PortableText value={post.body ?? []} components={portableTextComponents} />
        </div>
      </article>
    </main>
  );
}
