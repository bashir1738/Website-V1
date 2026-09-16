"use client";

import React, { useState } from "react";
import type { GraduateTestimonial, AcademyStat } from "./content";

const AVATAR_TONES = ["tone-violet", "tone-blue", "tone-amber"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function TestimonialsCarousel({
  testimonials,
  stats,
}: {
  testimonials: GraduateTestimonial[];
  stats: AcademyStat[];
}) {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Carousel row */}
      <div className="relative flex items-center gap-2 sm:gap-4 pb-6">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="shrink-0 h-9 w-9 flex items-center justify-center border border-[var(--line-strong)] text-[var(--muted)] hover:border-[var(--accent-line)] hover:text-[var(--accent)] transition-colors duration-200 rounded-lg text-base"
        >
          ‹
        </button>

        {/* Card */}
        <div className="flex-1 surface-card p-6 sm:p-8 md:p-10">
          <p className="text-lg sm:text-xl text-[var(--page-fg)] leading-relaxed mb-8">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="flex items-center gap-3">
            <span
              className={`bf-avatar ${AVATAR_TONES[idx % AVATAR_TONES.length]}`}
              aria-hidden="true"
            >
              {initials(t.author)}
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--page-fg)] font-heading">
                {t.author}
              </p>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--muted)] mt-0.5">
                {t.role} · {t.cohort}
              </p>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-6 bg-[var(--accent)]"
                    : "w-2 bg-[var(--line-strong)] hover:bg-[var(--muted)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="shrink-0 h-9 w-9 flex items-center justify-center border border-[var(--line-strong)] text-[var(--muted)] hover:border-[var(--accent-line)] hover:text-[var(--accent)] transition-colors duration-200 rounded-lg text-base"
        >
          ›
        </button>
      </div>

      {/* Stats bar — inset to align with card edges */}
      <div className="sm:mx-11 hairline-grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="hairline-cell px-4 sm:px-6 py-5 text-center">
            <p className="stat-figure text-xl sm:text-2xl">{stat.value}</p>
            <p className="mt-1.5 text-[9px] font-mono tracking-widest uppercase text-[var(--muted)] leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
