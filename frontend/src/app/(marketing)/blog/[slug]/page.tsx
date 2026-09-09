import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBodies, posts } from "@/features/blog/content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) return {};

  return {
    title: `${post.title} | Blockfuse Labs`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  const sections = articleBodies[post.slug];
  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article>
        <header className="px-5 pb-12 pt-14 sm:px-7 sm:pb-16 sm:pt-20">
          <div className="mx-auto max-w-[920px]">
            <Link
              href="/blog"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-[var(--muted)] transition-colors duration-150 hover:text-[var(--page-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]"
            >
              <span aria-hidden="true">←</span> Back to the journal
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--dim)]">
              <span className="text-[var(--accent)]">{post.category}</span>
              <span aria-hidden="true">·</span>
              <time>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 max-w-[22ch] font-heading text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[var(--page-fg)]">
              {post.title}
            </h1>
            <p className="mt-7 max-w-[62ch] text-lg leading-[1.75] text-[var(--muted)] sm:text-xl">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="px-5 sm:px-7">
          <div className="relative mx-auto aspect-[16/8] max-w-[1240px] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="mx-auto grid max-w-[920px] gap-10 px-5 py-16 sm:px-7 sm:py-24 md:grid-cols-[170px_1fr] md:gap-16">
          <aside className="md:sticky md:top-28 md:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--dim)]">In this note</p>
            <ol className="mt-4 space-y-3 border-l border-[var(--line-strong)] pl-4">
              {sections.map((section, index) => (
                <li key={section.heading} className="text-xs leading-relaxed text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")} · {section.heading}
                </li>
              ))}
            </ol>
          </aside>

          <div className="max-w-[68ch]">
            {sections.map((section, index) => (
              <section key={section.heading} className={index === 0 ? "" : "mt-14 border-t border-[var(--line)] pt-14"}>
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-[-0.035em] text-[var(--page-fg)] sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-6">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-[1.85] text-[var(--muted)] sm:text-[1.05rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <footer className="mt-16 border-t border-[var(--line-strong)] pt-8">
              <p className="font-heading text-xl font-bold text-[var(--page-fg)]">Keep building with us.</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Explore more field notes from the Blockfuse community.</p>
              <Link href="/blog" className="mt-5 inline-flex min-h-10 items-center rounded-full action-color px-5 text-sm font-semibold text-white transition-colors duration-150  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]">
                Browse all stories
              </Link>
            </footer>
          </div>
        </div>
      </article>

      <section className="border-t border-[var(--line)] px-5 py-20 sm:px-7">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <span className="eyebrow">Continue reading</span>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[var(--page-fg)]">More from the journal</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-semibold text-[var(--muted)] hover:text-[var(--page-fg)] sm:block">View all →</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--page-bg)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                  <Image src={related.image} alt={related.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]" />
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.11em] text-[var(--accent)]">{related.category}</p>
                <h3 className="mt-2 font-heading text-xl font-bold leading-snug tracking-[-0.025em] text-[var(--page-fg)]">{related.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
