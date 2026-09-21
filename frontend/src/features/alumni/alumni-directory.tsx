"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { alumniFilters, type Alumnus } from "@/features/alumni/content";
import { initials } from "@/lib/utils";

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
      <div className="alumni-toolbar" id="alumni-directory">
        <p className="alumni-toolbar-label">Browse the directory</p>
        <div className="alumni-filters" aria-label="Filter alumni">
          {alumniFilters.map((f) => (
            <button
              key={f}
              type="button"
              className="filter-pill"
              data-active={filter === f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              <span>{f}</span>
              <span aria-hidden="true" className="filter-count">
                {f === "All"
                  ? alumni.length
                  : alumni.filter((a) => a.cohort === f || a.track === f)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="alumni-grid" aria-live="polite">
        {shown.map((a, index) => (
          <article key={a.name} className="alumni-card">
            <div
              className="alumni-portrait"
              data-focus={a.imageFocus ?? "center"}
            >
              {a.image ? (
                <Image
                  src={a.image}
                  alt={`Portrait of ${a.name}`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="alumni-portrait-image"
                  priority={index < 3}
                />
              ) : (
                <div className="alumni-portrait-fallback" aria-hidden="true">
                  {initials(a.name)}
                </div>
              )}
            </div>
            <div className="alumni-card-copy">
              <div className="alumni-meta">
                <span>{a.track}</span>
                <span aria-hidden="true">—</span>
                <span>{a.cohort}</span>
              </div>
              <h2>{a.name}</h2>
              <p>{a.now}</p>
              <a
                className="alumni-social-link"
                href={a.social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Find ${a.name} on ${a.social.platform}`}
              >
                <span className="alumni-social-mark" aria-hidden="true">
                  {a.social.platform === "LinkedIn"
                    ? "in"
                    : a.social.platform === "GitHub"
                      ? "GH"
                      : a.social.platform === "Discord"
                        ? "D"
                        : "X"}
                </span>
                <span>Find on {a.social.platform}</span>
                <span className="alumni-social-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="alumni-empty">
          <p className="font-heading text-lg font-semibold">
            No profiles here yet.
          </p>
          <p>Try another track or cohort to keep exploring.</p>
          <button
            type="button"
            className="filter-pill"
            onClick={() => setFilter("All")}
          >
            Show all alumni
          </button>
        </div>
      )}
    </>
  );
}
