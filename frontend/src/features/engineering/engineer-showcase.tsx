"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Alumnus } from "@/features/alumni/content";

const ROTATE_MS = 4000;
const ENGINEER_PHOTOS = [
  "/engineers/WAL_7287.jpeg",
  "/engineers/WAL_7290.jpeg",
  "/engineers/WAL_7302.jpeg",
  "/engineers/WAL_7326.jpeg",
  "/engineers/WAL_7358.jpeg",
  "/engineers/WAL_7388.jpeg",
  "/engineers/WAL_7424.jpeg",
  "/engineers/WAL_7429.jpeg",
] as const;

/**
 * A sample of the Blockfuse Talent Network, auto-rotating through profiles.
 * Pauses on hover/focus and never animates under prefers-reduced-motion —
 * the full, filterable roster always remains one click away at /alumni.
 * Profiles come from the backend (approved alumni), never hardcoded.
 */
export function EngineerShowcase({ alumni = [] }: { alumni?: Alumnus[] }) {
  const engineers = alumni.slice(0, ENGINEER_PHOTOS.length).map((person, index) => ({
    ...person,
    image: person.image || ENGINEER_PHOTOS[index % ENGINEER_PHOTOS.length],
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (engineers.length === 0) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((i) => (i + 1) % engineers.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [engineers.length]);

  const active = engineers[activeIndex];

  if (!active) return null;

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
        <div className="bf-engineer-portrait">
          <Image
            key={active.image}
            src={active.image}
            alt={`${active.name}, ${active.track} engineer`}
            fill
            priority
            sizes="(max-width: 899px) 90vw, 34vw"
          />
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
        {engineers.map((person, i) => (
          <button
            key={`${person.name}-${i}`}
            type="button"
            className="bf-engineer-tile"
            data-active={i === activeIndex}
            aria-current={i === activeIndex ? "true" : undefined}
            aria-label={`Show ${person.name}, ${person.track}`}
            onClick={() => setActiveIndex(i)}
          >
            <span className="bf-avatar bf-engineer-avatar" aria-hidden="true">
              <Image
                src={person.image}
                alt=""
                fill
                sizes="46px"
              />
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
