"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { alumniFilters, type Alumnus } from "@/features/alumni/content";
import { socialLinks } from "@/config/social";
import { initials } from "@/lib/utils";

const glyphFor = (platform: string): string | undefined =>
  socialLinks.find((link) => link.label === platform)?.icon;

const FILTER_PILL =
  "inline-flex flex-none min-h-10 items-center gap-2 px-[0.875rem] py-2 rounded-full font-mono text-[0.6875rem] font-semibold tracking-[0.04em] uppercase cursor-pointer border border-(--line) text-(--muted) bg-(--card) transition-[color,background-color,border-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-(--page-fg) hover:bg-(--card-hover) data-[active=true]:text-(--page-fg) data-[active=true]:bg-(--surface-3) data-[active=true]:border-(--line-strong) focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-40";

/** Cohorts match exactly; tracks match on the API's full label
 *  ("Blockchain Engineering Track" for the "Blockchain Engineering" pill). */
const matchesFilter = (alumnus: Alumnus, filter: string) =>
  filter === "All" ||
  alumnus.cohort === filter ||
  alumnus.track.toLowerCase().includes(filter.toLowerCase());

export function AlumniDirectory({ alumni }: { alumni: Alumnus[] }) {
  const [filter, setFilter] = useState("All");

  const shown = useMemo(
    () => alumni.filter((a) => matchesFilter(a, filter)),
    [filter, alumni],
  );

  return (
    <>
      <div className="grid gap-4 mt-14 mb-8 py-4 rounded-2xl border border-(--line) bg-(--card) px-4 scroll-mt-24 md:grid-cols-[auto_1fr] md:items-center" id="alumni-directory">
        <p className="m-0 text-(--dim) font-mono text-[0.7rem] font-semibold tracking-[0.1em] uppercase">
          Browse the directory
        </p>
        <div
          role="group"
          aria-label="Filter alumni"
          className="-mx-4 flex snap-x snap-proximity scroll-px-4 items-center gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-end"
        >
          {alumniFilters.map((f) => {
            const count =
              f === "All"
                ? alumni.length
                : alumni.filter((a) => matchesFilter(a, f)).length;
            return (
              <button
                key={f}
                type="button"
                className={`${FILTER_PILL} snap-start`}
                data-active={filter === f}
                aria-pressed={filter === f}
                disabled={count === 0 && filter !== f}
                onClick={() => setFilter(f)}
              >
                <span>{f}</span>
                <span aria-hidden="true" className="text-(--dim) text-[0.625rem]">
                  {count}
                </span>
              </button>
            );
          })}
          {/* Guarantees the last pill can scroll clear of the right edge. */}
          <span aria-hidden="true" className="h-px w-1 shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-2 min-[68.75rem]:grid-cols-3" aria-live="polite">
        {shown.map((a, index) => (
          <article
            key={a.id ?? `${a.name}-${a.cohort}-${a.track}`}
            className="group flex h-full min-w-0 flex-col"
          >
            <div
              className="group/portrait relative aspect-[4/3] shrink-0 overflow-hidden rounded-[1.5rem] bg-(--surface-2)"
              data-focus={a.imageFocus ?? "center"}
            >
              {a.image ? (
                <Image
                  src={a.image}
                  alt={`Portrait of ${a.name}`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="object-cover object-top [filter:saturate(0.88)_contrast(1.03)] [transition:transform_450ms_cubic-bezier(0.23,1,0.32,1),filter_250ms_cubic-bezier(0.23,1,0.32,1)] group-data-[focus=right]/portrait:object-[68%_top] group-hover:scale-[1.025] group-hover:[filter:saturate(1)_contrast(1.02)] motion-reduce:group-hover:scale-100"
                  priority={index < 3}
                />
              ) : (
                <div className="grid h-full place-items-center text-(--accent) font-heading text-[clamp(3.5rem,9vw,6.5rem)] font-semibold tracking-[-0.06em] bg-(--accent-dim)" aria-hidden="true">
                  {initials(a.name)}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col pt-[0.875rem]">
              <div className="flex flex-wrap gap-1.5 text-(--dim) font-mono text-[0.625rem] font-semibold tracking-[0.07em] leading-[1.45] uppercase">
                <span>{a.track}</span>
                <span aria-hidden="true">·</span>
                <span>{a.cohort}</span>
                {a.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{a.location}</span>
                  </>
                )}
              </div>
              <h2 className="mt-[0.6rem] line-clamp-2 text-(--page-fg) text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium leading-[1.02]">
                {a.name}
              </h2>
              <div className="mb-4">
                <p className="max-w-[34ch] mt-3 line-clamp-3 text-(--muted) text-[0.8125rem] leading-[1.6]">
                  {a.now}
                </p>
                {a.openTo?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {a.openTo.map((option) => (
                      <li
                        key={option}
                        className="rounded-full border border-(--line) bg-(--card) px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase leading-[1.45] tracking-[0.06em] text-(--dim)"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-(--line) pt-3">
                {(a.links?.length ? a.links : [a.social]).map((link) => {
                  const glyph = glyphFor(link.platform);
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${a.name} on ${link.platform}`}
                      title={link.platform}
                      className="group/social grid h-9 w-9 place-items-center rounded-full bg-(--action-bg) text-(--color-paper) transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4"
                    >
                      {glyph ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d={glyph} />
                        </svg>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="font-sans text-[0.6875rem] font-bold tracking-[-0.02em]"
                        >
                          {link.platform[0]}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="grid justify-items-start gap-3 rounded-2xl border border-(--line) bg-(--card) px-5 py-10 text-(--muted)">
          <p className="font-heading text-lg font-semibold">
            No profiles here yet.
          </p>
          <p>Try another track or cohort to keep exploring.</p>
          <button
            type="button"
            className={FILTER_PILL}
            onClick={() => setFilter("All")}
          >
            Show all alumni
          </button>
        </div>
      )}
    </>
  );
}
