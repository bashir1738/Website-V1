"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { blogCategories, posts, type BlogCategory } from "./content";

export function BlogArchive() {
  const [category, setCategory] = useState<BlogCategory>("All");
  const [featuredPost, ...archivePosts] = posts;
  const visiblePosts = category === "All" ? archivePosts : posts.filter((post) => post.category === category);

  return (
    <main>
      <section className="px-5 pb-8 pt-10 sm:px-7 sm:pt-14">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal>
            <div className="flex flex-col gap-4 border-b border-[var(--line-strong)] pb-7 md:flex-row md:items-end md:justify-between md:gap-10">
              <div>
                <span className="eyebrow">Inside Blockfuse</span>
                <h1 className="mt-3 font-heading text-4xl font-bold leading-tight tracking-[-0.045em] text-[var(--page-fg)] sm:text-5xl">
                  The Journal<span className="text-[var(--accent)]">.</span>
                </h1>
              </div>
              <div className="max-w-sm">
                <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  The people, projects, and lessons behind the work. Stories from our community in Jos and beyond.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section aria-label="Featured story" className="px-5 pb-10 sm:px-7 sm:pb-14">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid overflow-hidden rounded-2xl bg-[var(--color-surface-2)] text-[var(--color-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--page-bg)] md:grid-cols-[1.1fr_1fr]"
              aria-label={`Read ${featuredPost.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-96">
                <Image src={featuredPost.image} alt={featuredPost.imageAlt} fill preload sizes="(min-width: 1280px) 650px, (min-width: 768px) 55vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]" />
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">In focus / {featuredPost.category}</span>
                  <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.12] tracking-[-0.035em] lg:text-4xl">{featuredPost.title}</h2>
                  <p className="mt-5 text-sm leading-[1.75] text-[var(--color-muted-light)] sm:text-base">{featuredPost.excerpt}</p>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
                  <span className="inline-flex min-h-11 items-center gap-5 rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-ink)]">Read story <span aria-hidden="true">↗</span></span>
                  <span className="text-xs text-[var(--color-muted-light)]">{featuredPost.readTime}</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 pb-28 pt-8 sm:px-7 sm:pt-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col gap-7 border-b border-[var(--line)] pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Archive</span>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[var(--page-fg)] sm:text-4xl">Ideas worth carrying forward.</h2>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filter articles by category">
              {blogCategories.map((item) => {
                const selected = item === category;
                return (
                  <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={selected} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] ${selected ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line-strong)] text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--page-fg)]"}`}>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {visiblePosts.length > 0 ? (
            <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={Math.min(index + 1, 3)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--page-bg)]"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                      <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]" />
                    </div>
                    <div className="pt-5">
                      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.11em] text-[var(--dim)]">
                        <span className="text-[var(--accent)]">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 font-heading text-[1.35rem] font-bold leading-[1.18] tracking-[-0.03em] text-[var(--page-fg)]">{post.title}</h3>
                      <p className="mt-3 text-sm leading-[1.7] text-[var(--muted)]">{post.excerpt}</p>
                      <p className="mt-5 text-xs font-medium text-[var(--dim)]">{post.date}</p>
                      <span className="mt-4 inline-block text-sm font-semibold text-[var(--page-fg)] transition-colors duration-150 group-hover:text-[var(--accent)]">
                        Read story <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-heading text-xl font-bold text-[var(--page-fg)]">No stories in this category yet.</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">More field notes are already in the works.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
