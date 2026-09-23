"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { alumniFilters, type Alumnus } from "@/features/alumni/content";
import { initials } from "@/lib/utils";

const FILTER_PILL =
  "inline-flex flex-none min-h-10 items-center gap-2 px-[0.875rem] py-2 rounded-full font-mono text-[0.6875rem] font-semibold tracking-[0.04em] uppercase cursor-pointer border border-(--line) text-(--muted) bg-(--card) transition-[color,background-color,border-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-(--page-fg) hover:bg-(--card-hover) data-[active=true]:text-(--page-fg) data-[active=true]:bg-(--surface-3) data-[active=true]:border-(--line-strong) focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-3";

export function AlumniDirectory({ alumni }: { alumni: Alumnus[] }) {
  const [filter, setFilter] = useState("All");

  const shown = useMemo(
    () =>
      alumni.filter(
        (a) => filter === "All" || a.cohort === filter || a.track === filter,
      ),
    [filter, alumni],
  );

  return (
    <>
      <div className="grid gap-4 mt-14 mb-8 py-4 rounded-2xl border border-(--line) bg-(--card) px-4 scroll-mt-24 md:grid-cols-[auto_1fr] md:items-center" id="alumni-directory">
        <p className="m-0 text-(--dim) font-mono text-[0.7rem] font-semibold tracking-[0.1em] uppercase">
          Browse the directory
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-end" aria-label="Filter alumni">
          {alumniFilters.map((f) => (
            <button
              key={f}
              type="button"
              className={FILTER_PILL}
              data-active={filter === f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              <span>{f}</span>
              <span aria-hidden="true" className="text-(--dim) text-[0.625rem]">
                {f === "All"
                  ? alumni.length
                  : alumni.filter((a) => a.cohort === f || a.track === f)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-2 min-[68.75rem]:grid-cols-3 min-[68.75rem]:gap-y-24" aria-live="polite">
        {shown.map((a, index) => (
          <article
            key={a.name}
            className="min-w-0 group min-[68.75rem]:nth-[3n+2]:translate-y-12"
          >
            <div
              className="group/portrait relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-(--surface-2) min-[68.75rem]:group-nth-[3n+2]:aspect-[3/4]"
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
            <div className="pt-[0.875rem]">
              <div className="flex flex-wrap gap-1.5 text-(--dim) font-mono text-[0.625rem] font-semibold tracking-[0.07em] leading-[1.45] uppercase">
                <span>{a.track}</span>
                <span aria-hidden="true">—</span>
                <span>{a.cohort}</span>
              </div>
              <h2 className="mt-[0.6rem] text-(--page-fg) text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium leading-[1.02]">
                {a.name}
              </h2>
              <p className="max-w-[34ch] mt-3 text-(--muted) text-[0.8125rem] leading-[1.6]">
                {a.now}
              </p>
              <a
                className="group/social grid grid-cols-[auto_1fr_auto] items-center gap-2.5 min-h-[2.5rem] mt-4 pt-3 border-t border-(--line) text-(--page-fg) font-mono text-[0.6875rem] font-semibold tracking-[0.04em] no-underline uppercase focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4"
                href={a.social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Find ${a.name} on ${a.social.platform}`}
              >
                <span className="grid w-7 h-7 place-items-center rounded-full text-(--color-paper) bg-(--action-bg) font-sans text-[0.6875rem] font-bold tracking-[-0.02em] normal-case" aria-hidden="true">
                  {a.social.platform === "LinkedIn"
                    ? "in"
                    : a.social.platform === "GitHub"
                      ? "GH"
                      : a.social.platform === "Discord"
                        ? "D"
                        : "X"}
                </span>
                <span>Find on {a.social.platform}</span>
                <span
                  className="text-(--accent) text-[0.875rem] transition-[transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/social:translate-x-[0.125rem] group-hover/social:-translate-y-[0.125rem]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
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
