import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-bs-bg px-6 text-bs-text">
      <div className="max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.12em] text-bs-muted">404</p>
        <h1 className="mt-3 text-4xl font-black text-white">Post not found</h1>
        <p className="mt-4 text-bs-muted">
          The article you are looking for is unavailable or has been moved.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          Return to blog
        </Link>
      </div>
    </main>
  );
}
