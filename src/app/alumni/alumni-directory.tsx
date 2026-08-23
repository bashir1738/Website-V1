"use client";

import React, { useMemo, useState } from "react";
import { alumni, alumniFilters, initials } from "@/lib/content";

export function AlumniDirectory() {
  const [filter, setFilter] = useState("All");

  const shown = useMemo(
    () =>
      alumni.filter(
        (a) => filter === "All" || a.cohort === filter || a.track === filter,
      ),
    [filter],
  );

  return (
    <>
      <div className="mb-8 mt-9 flex flex-wrap gap-2">
        {alumniFilters.map((f) => (
          <button
            key={f}
            type="button"
            className="filter-pill"
            data-active={filter === f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {shown.map((a) => (
          <div
            key={a.name}
            className="surface-card !rounded-[18px] px-[22px] pb-5 pt-[22px] transition-transform hover:-translate-y-1"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,rgba(191,100,231,0.35),rgba(78,46,245,0.25))] font-heading text-sm font-bold text-[var(--page-fg)]">
                {initials(a.name)}
              </div>
              <div className="min-w-0">
                <div className="text-[14.5px] font-semibold tracking-[-0.01em] text-[var(--page-fg)]">
                  {a.name}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--dim)]">
                  {a.cohort}
                </div>
              </div>
            </div>
            <div className="mb-2 text-[12.5px] font-medium text-[var(--accent)]">
              {a.track}
            </div>
            <div className="text-[13px] leading-relaxed text-[var(--muted)]">
              {a.now}
            </div>
          </div>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No graduates match that filter yet.
        </p>
      )}
    </>
  );
}
