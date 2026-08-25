import React from "react";
import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { featuredPost, sidePosts, morePosts } from "@/features/blog/content";

export const metadata: Metadata = {
  title: "Blog | Blockfuse Labs",
  description:
    "Teaching notes, engineering write-ups, and cohort retrospectives from the people running the programs.",
};

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Notes from the build room."
        lead="Teaching notes, engineering write-ups, and cohort retrospectives from the people running the programs."
      />

      {/* Featured + side rail */}
      <div className="mt-14 grid items-stretch gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        <ScrollReveal delay={1}>
          <article className="surface-card h-full overflow-hidden !rounded-[22px] !p-0">
            <div className="grid aspect-video place-items-center border-b border-[var(--line)] bg-[linear-gradient(140deg,rgba(191,100,231,0.22),rgba(78,46,245,0.14))]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--page-fg)]/45">
                Cover image
              </span>
            </div>
            <div className="px-[30px] pb-8 pt-[30px]">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="mono-tag mono-tag-accent">Featured</span>
                <span className="text-[11.5px] text-[var(--dim)]">
                  {featuredPost.meta}
                </span>
              </div>
              <h2 className="font-heading text-[27px] font-bold leading-tight tracking-[-0.03em] text-[var(--page-fg)]">
                {featuredPost.title}
              </h2>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-[var(--muted)]">
                {featuredPost.excerpt}
              </p>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="grid content-start gap-3.5">
            {sidePosts.map((post) => (
              <article
                key={post.title}
                className="surface-card cursor-pointer !rounded-[18px] px-6 py-[22px] hover:translate-x-[3px]"
              >
                <div className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--dim)]">
                  {post.meta}
                </div>
                <h3 className="font-heading text-[17.5px] font-bold leading-snug tracking-[-0.02em] text-[var(--page-fg)]">
                  {post.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* The rest */}
      <div className="mt-14 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        {morePosts.map((post, i) => (
          <ScrollReveal key={post.title} delay={Math.min(i + 1, 3)}>
            <article className="surface-card h-full cursor-pointer overflow-hidden !p-0 hover:-translate-y-1">
              <div className="grid aspect-video place-items-center border-b border-[var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(191,100,231,0.1))]">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--page-fg)]/35">
                  Image
                </span>
              </div>
              <div className="px-6 pb-6 pt-[22px]">
                <div className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--dim)]">
                  {post.meta}
                </div>
                <h3 className="font-heading text-[18px] font-bold leading-snug tracking-[-0.02em] text-[var(--page-fg)]">
                  {post.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                  {post.excerpt}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </PageShell>
  );
}
