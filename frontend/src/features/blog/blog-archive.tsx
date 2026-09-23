"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EYEBROW, ACTION_COLOR } from "@/lib/styles";
import { blogCategories, type BlogCategory, type Post } from "./content";

const JOURNAL_TAPE =
  "absolute z-[3] py-[0.6rem] px-4 text-(--color-ink) bg-(--accent-soft) font-mono text-[0.625rem] font-semibold tracking-[0.06em] uppercase";

const HEADLINE_LINK =
  "group grid grid-cols-[auto_1fr_auto] items-start gap-3 min-h-[6rem] p-5 border-r border-(--line-strong) text-(--page-fg) no-underline last:border-r-0 focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:-outline-offset-2 max-[56rem]:grid-cols-[auto_1fr] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:last:border-b-0";

export function BlogArchive({ posts = [] }: { posts?: Post[] }) {
  const availableCategories = useMemo(() => {
    const present = new Set(posts.map((post) => post.category));
    return blogCategories.filter((item) => item === "All" || present.has(item));
  }, [posts]);

  const [category, setCategory] = useState<BlogCategory>("All");
  const selectedCategory = availableCategories.includes(category)
    ? category
    : "All";
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);
  const [featuredPost, ...archivePosts] = filteredPosts;
  const hasPosts = posts.length > 0;
  const hasMatches = filteredPosts.length > 0;

  if (!hasPosts) {
    return (
      <main>
        <section className="px-5 py-28 text-center sm:px-7">
          <span className={EYEBROW}>Journal</span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-[-0.04em] text-(--page-fg) sm:text-4xl">
            No stories published yet.
          </h1>
          <p className="mt-3 text-sm text-(--muted)">
            Field notes and engineering insights are on the way.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      {hasMatches && (
      <section className="p-0 max-md:p-2" aria-labelledby="journal-title">
        <ScrollReveal>
          <div className="relative grid grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.2fr)] grid-rows-[1fr_auto] gap-x-12 gap-y-4 min-h-[calc(100svh_-_6.75rem)] pt-20 pr-16 pb-12 overflow-hidden border border-(--line-strong) text-(--page-fg) bg-(--surface) [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[2rem_2rem] isolate before:absolute before:content-[''] before:z-[-1] before:w-[23rem] before:h-[23rem] before:top-[-8rem] before:left-[-7rem] before:rounded-full before:bg-(--accent-dim) max-[56rem]:grid-cols-[0.8fr_1.2fr] max-[56rem]:gap-x-8 max-[56rem]:px-8 max-md:grid-cols-1 max-md:grid-rows-[auto_auto_auto] max-md:gap-10 max-md:min-h-[calc(100svh_-_5.75rem)] max-md:pt-20 max-md:px-5 max-md:pb-5">
            <div className="absolute top-[1.5rem] right-8 font-mono text-[0.625rem] font-semibold tracking-[0.1em] uppercase [writing-mode:vertical-rl] max-md:hidden" aria-hidden="true">
              Journal / 01
            </div>
            <span
              className={`${JOURNAL_TAPE} top-[3.25rem] left-[40%] rotate-[-7deg] max-md:top-8 max-md:left-auto max-md:right-6`}
              aria-hidden="true"
            >
              Ideas in practice
            </span>
            <span
              className={`${JOURNAL_TAPE} right-12 bottom-[9.5rem] rotate-[5deg] max-md:hidden`}
              aria-hidden="true"
            >
              From Jos, outward
            </span>

            <div className="self-center pb-16 max-md:pb-0">
              <span className={EYEBROW}>Engineering Insights</span>
              <h1
                id="journal-title"
                className="mt-6 text-[clamp(4.75rem,9vw,8.5rem)] font-semibold tracking-[-0.085em] leading-[0.73] uppercase max-md:text-[clamp(4.5rem,24vw,6.5rem)]"
              >
                Your Source For
                <br />
                Engineering Inspiration
              </h1>
              <p className="max-w-[31ch] mt-8 text-[0.875rem] leading-[1.65] text-(--muted)">
                Dive into technical deep-dives, protocol architectures, and developer insights curated by Blockfuse Labs engineers.
              </p>
            </div>

            <Link
              href={`/community/blog/${featuredPost.slug}`}
              className="group relative self-center grid grid-rows-[minmax(20rem,1fr)_auto] min-w-0 p-3 text-(--color-ink) bg-(--color-paper) no-underline rotate-[1.5deg] shadow-[0.4rem_0.4rem_0_var(--color-ink)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rotate-[0.5deg] hover:-translate-y-[0.25rem] motion-reduce:hover:rotate-0 motion-reduce:hover:translate-y-0 focus-visible:outline-[3px] focus-visible:outline-(--accent) focus-visible:outline-offset-5 max-md:grid-rows-[17rem_auto] max-md:rotate-[1deg] max-md:shadow-[0.3rem_0.3rem_0_var(--color-ink)]"
              aria-label={`Read ${featuredPost.title}`}
            >
              <div className="relative min-h-[20rem] overflow-hidden bg-(--surface-2) max-md:min-h-[17rem]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 767px) 92vw, 52vw"
                  className="object-cover [filter:saturate(0.75)_contrast(1.08)] [transition:transform_450ms_cubic-bezier(0.23,1,0.32,1),filter_250ms_cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025] group-hover:[filter:saturate(0.95)_contrast(1.04)] motion-reduce:group-hover:scale-100"
                />
                <span className="absolute top-4 right-4 py-[0.625rem] px-3 text-(--color-paper) bg-(--color-ink) font-mono text-[0.625rem] font-semibold tracking-[0.06em] uppercase" aria-hidden="true">
                  Featured story ↗
                </span>
              </div>
              <div className="pt-5 px-2 pb-3">
                <div className="flex justify-between gap-4 font-mono text-[0.625rem] font-semibold tracking-[0.06em] uppercase">
                  <span>{featuredPost.category}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="max-w-[22ch] mt-3 text-[clamp(1.4rem,2.5vw,2rem)] font-semibold leading-none">
                  {featuredPost.title}
                </h2>
              </div>
            </Link>

            <div className="col-span-full grid grid-cols-3 border-t border-(--line-strong) max-md:col-auto max-md:grid-cols-1" aria-label="More from the journal">
              {archivePosts.slice(0, 3).map((post, index) => (
                <Link key={post.slug} href={`/community/blog/${post.slug}`} className={HEADLINE_LINK}>
                  <span className="text-(--accent) font-mono text-[0.625rem]">0{index + 2}</span>
                  <strong className="font-heading text-[0.875rem] font-semibold leading-[1.25] group-hover:text-(--accent)">
                    {post.title}
                  </strong>
                  <span aria-hidden="true" className="text-(--accent) font-mono text-[0.625rem] max-[56rem]:hidden">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
      )}

      <section className="px-5 pb-28 pt-8 sm:px-7 sm:pt-12">
        <div className="mx-auto max-w-310">
          <div className="flex flex-col gap-7 border-b border-(--line) pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <span className={EYEBROW}>Archive</span>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-(--page-fg) sm:text-4xl">Ideas worth carrying forward.</h2>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filter articles by category">
              {availableCategories.map((item) => {
                const selected = item === selectedCategory;
                return (
                  <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={selected} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--page-bg) ${selected ? `border-(--accent) ${ACTION_COLOR} text-white` : "border-(--line-strong) text-(--muted) hover:bg-(--card) hover:text-(--page-fg)"}`}>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {archivePosts.length > 0 ? (
            <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {archivePosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={Math.min(index + 1, 3)}>
                  <Link
                    href={`/community/blog/${post.slug}`}
                    className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-4 focus-visible:ring-offset-(--page-bg)"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-(--surface-2)">
                      <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]" />
                    </div>
                    <div className="pt-5">
                      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.11em] text-(--dim)">
                        <span className="text-(--accent)">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 font-heading text-[1.35rem] font-bold leading-[1.18] tracking-[-0.03em] text-(--page-fg)">{post.title}</h3>
                      <p className="mt-3 text-sm leading-[1.7] text-(--muted)">{post.excerpt}</p>
                      <p className="mt-5 text-xs font-medium text-(--dim)">{post.date}</p>
                      <span className="mt-4 inline-block text-sm font-semibold text-(--page-fg) transition-colors duration-150 group-hover:text-(--accent)">
                        Read story <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : hasMatches ? (
            <div className="py-16 text-center">
              <p className="text-sm text-(--muted)">
                This is the only story in this category right now — it&apos;s featured above.
              </p>
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-heading text-xl font-bold text-(--page-fg)">No stories in this category yet.</h3>
              <p className="mt-2 text-sm text-(--muted)">More field notes are already in the works.</p>
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="mt-6 min-h-10 rounded-full border border-(--line-strong) px-4 text-xs font-semibold text-(--muted) transition-colors duration-150 hover:bg-(--card) hover:text-(--page-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--page-bg)"
              >
                Show all stories
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
