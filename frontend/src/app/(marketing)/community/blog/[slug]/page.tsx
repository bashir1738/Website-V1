import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL } from "@/lib/api";
import { ACTION_COLOR, EYEBROW } from "@/lib/styles";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface BackendBlog {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  image_url: string | null;
  published_at: string | null;
  createdAt: string;
}

function blogImage(blog: BackendBlog) {
  return blog.image_url || "/brand/heropic.jpg";
}

function blogDate(blog: BackendBlog) {
  return new Date(blog.published_at || blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function readTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function paragraphs(content: string) {
  return content.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}

async function fetchBlog(slug: string): Promise<BackendBlog | null> {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data?: BackendBlog };
    if (json.success && json.data) return json.data;
  } catch {
    // Backend unreachable — no static fallback.
  }
  return null;
}

async function fetchAllBlogs(): Promise<BackendBlog[]> {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data?: BackendBlog[] };
    if (json.success && Array.isArray(json.data)) return json.data;
  } catch {
    // Backend unreachable — no related posts.
  }
  return [];
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlog(slug);

  return {
    title: post ? `${post.title} | Blockfuse Labs` : "Post not found",
    description: post ? post.content.slice(0, 160) : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlog(slug);

  if (!post) notFound();

  const body = paragraphs(post.content);
  const relatedPosts = (await fetchAllBlogs()).filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article>
        <header className="px-5 pb-12 pt-14 sm:px-7 sm:pb-16 sm:pt-20">
          <div className="mx-auto max-w-[920px]">
            <Link
              href="/community/blog"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-[var(--muted)] transition-colors duration-150 hover:text-[var(--page-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]"
            >
              <span aria-hidden="true">←</span> Back to the journal
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--dim)]">
              <span className="text-[var(--accent)]">Field note</span>
              <span aria-hidden="true">·</span>
              <time>{blogDate(post)}</time>
              {post.author && (<>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
              </>)}
              <span aria-hidden="true">·</span>
              <span>{readTime(post.content)}</span>
            </div>

            <h1 className="mt-6 max-w-[22ch] font-heading text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[var(--page-fg)]">
              {post.title}
            </h1>
            <p className="mt-7 max-w-[62ch] text-lg leading-[1.75] text-[var(--muted)] sm:text-xl">
              {post.content.slice(0, 160)}…
            </p>
          </div>
        </header>

        <div className="px-5 sm:px-7">
          <div className="relative mx-auto aspect-[16/8] max-w-[1240px] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
            <Image src={blogImage(post)} alt={post.title} fill priority sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="mx-auto max-w-[920px] px-5 py-16 sm:px-7 sm:py-24">
          <div className="max-w-[68ch]">
            {body.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-base leading-[1.85] text-[var(--muted)] sm:text-[1.05rem]" : "mt-7 text-base leading-[1.85] text-[var(--muted)] sm:text-[1.05rem]"}>
                {paragraph}
              </p>
            ))}

            <footer className="mt-16 border-t border-[var(--line-strong)] pt-8">
              <p className="font-heading text-xl font-bold text-[var(--page-fg)]">Keep building with us.</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Explore more field notes from the Blockfuse community.</p>
              <Link href="/community/blog" className={`mt-5 inline-flex min-h-10 items-center rounded-full ${ACTION_COLOR} px-5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]`}>
                Browse all stories
              </Link>
            </footer>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--line)] px-5 py-20 sm:px-7">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <span className={EYEBROW}>Continue reading</span>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[var(--page-fg)]">More from the journal</h2>
              </div>
              <Link href="/community/blog" className="hidden text-sm font-semibold text-[var(--muted)] hover:text-[var(--page-fg)] sm:block">View all →</Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/community/blog/${related.slug}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--page-bg)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                    <Image src={blogImage(related)} alt={related.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]" />
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.11em] text-[var(--accent)]">Field note</p>
                  <h3 className="mt-2 font-heading text-xl font-bold leading-snug tracking-[-0.025em] text-[var(--page-fg)]">{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}