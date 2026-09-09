"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { alumni } from "@/features/alumni/content";

const TONES = ["tone-violet", "tone-blue", "tone-amber"] as const;
const ROTATE_MS = 4000;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function toneFor(index: number) {
  return TONES[index % TONES.length];
}

/**
 * A sample of the Blockfuse Talent Network, auto-rotating through profiles.
 * Pauses on hover/focus and never animates under prefers-reduced-motion —
 * the full, filterable roster always remains one click away at /alumni.
 */
export function EngineerShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((i) => (i + 1) % alumni.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, []);

  const active = alumni[activeIndex];

  return (
    <div
      className="bf-engineers"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className="bf-engineer-detail">
        <div className={`bf-engineer-portrait ${toneFor(activeIndex)}`}>
          <span aria-hidden="true">{initials(active.name)}</span>
          <span className="bf-engineer-tag">{active.cohort}</span>
        </div>

        <div className="bf-engineer-meta">
          <h3>{active.name}</h3>
          <p className="bf-engineer-role">{active.track}</p>
          <p className="bf-engineer-now">{active.now}</p>
        </div>

        <div className="bf-engineer-links">
          <Link
            href={`/contact?intent=direct-hire&track=${encodeURIComponent(active.track)}`}
            className="bf-cell-link"
          >
            Ask about engineers like this
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/alumni" className="bf-cell-link">
            See the full network
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="bf-engineer-grid">
        {alumni.map((person, i) => (
          <button
            key={`${person.name}-${i}`}
            type="button"
            className="bf-engineer-tile"
            data-active={i === activeIndex}
            aria-current={i === activeIndex ? "true" : undefined}
            aria-label={`Show ${person.name}, ${person.track}`}
            onClick={() => setActiveIndex(i)}
          >
            <span className={`bf-avatar ${toneFor(i)}`} aria-hidden="true">
              {initials(person.name)}
            </span>
            <span className="bf-engineer-tile-name">
              {person.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
