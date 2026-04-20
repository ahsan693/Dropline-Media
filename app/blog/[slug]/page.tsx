import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog Disabled",
    description: "The blog has been removed from this site.",
  };
}

export default function BlogPostPage() {
  return (
    <main className="min-h-[100dvh] bg-bs-bg text-bs-text">
      <article className="section-shell py-10 sm:py-12">
        <h1 className="text-3xl font-bold">Blog Removed</h1>
        <p className="mt-4">The blog content has been removed from this site.</p>
        <div className="mt-8">
          <Link href="/blog" className="text-sm font-semibold text-bs-muted hover:text-white">
            Back to blog index
          </Link>
        </div>
      </article>
    </main>
  );
}
