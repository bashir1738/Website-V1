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

const ENGINEER_AVATAR =
  "grid w-[3.5rem] h-[3.5rem] shrink-0 place-items-center rounded-[1rem] overflow-hidden bg-(--card) grayscale font-heading text-[0.95rem] font-semibold tracking-[-0.03em] text-[rgba(255,255,255,0.94)] transition-[filter,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[active=true]:grayscale-0 group-data-[active=true]:-translate-y-0.5 motion-reduce:group-data-[active=true]:translate-y-0 sm:w-[4.5rem] sm:h-[4.5rem] sm:rounded-[1.15rem]";

const ENGINEER_TILE =
  "group relative flex items-center justify-start gap-3 min-h-[5.5rem] bg-(--surface) p-3 text-left cursor-pointer transition-[background-color] duration-100 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-(--card-hover) focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:-outline-offset-4 focus-visible:z-[1] data-[active=true]:bg-(--accent-dim) data-[active=true]:after:absolute data-[active=true]:after:inset-x-0 data-[active=true]:after:bottom-0 data-[active=true]:after:h-[3px] data-[active=true]:after:bg-(--accent) data-[active=true]:after:content-[''] data-[active=true]:after:pointer-events-none sm:flex-col sm:justify-center sm:min-h-[8.5rem] sm:px-2 sm:py-4 sm:text-center";

const CELL_LINK =
  "group inline-flex items-center gap-2 mt-auto pt-6 text-[0.82rem] font-semibold text-(--accent) no-underline";

/**
 * A sample of the Blockfuse Labs Talent Network, auto-rotating through profiles.
 * Pauses on hover/focus and never animates under prefers-reduced-motion —
 * the full, filterable roster always remains one click away at /community/alumni.
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
      className="overflow-hidden border border-(--line) rounded-[1.75rem] bg-(--card) shadow-(--shadow-card)"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className="flex flex-col gap-6 border-b border-(--line) p-4 min-[900px]:grid min-[900px]:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.1fr)] min-[900px]:grid-rows-[1fr_auto] min-[900px]:gap-x-[clamp(2rem,5vw,5rem)] min-[900px]:p-5">
        <div className="relative flex items-end aspect-[4/3] rounded-[1.25rem] overflow-hidden bg-(--surface) min-[900px]:row-start-1 min-[900px]:row-end-3 min-[900px]:min-h-[22rem] after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.5)_100%)]">
          <Image
            key={active.image}
            src={active.image}
            alt={`${active.name}, ${active.track} engineer`}
            fill
            priority
            sizes="(max-width: 899px) 90vw, 34vw"
            className="object-cover object-[center_22%]"
          />
          <span className="relative z-[2] ml-auto mr-[1.1rem] mb-[1.1rem] font-mono text-[0.62rem] font-semibold tracking-[0.14em] uppercase text-[rgba(255,255,255,0.88)]">
            {active.cohort}
          </span>
        </div>

        <div className="self-end">
          <h3 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[0.98] tracking-[-0.045em] text-(--page-fg)">
            {active.name}
          </h3>
          <p className="mt-3 text-[0.78rem] font-semibold tracking-[0.04em] uppercase text-(--accent)">
            {active.track}
          </p>
          <p className="mt-4 max-w-[36ch] text-[0.95rem] leading-[1.6] text-(--muted)">
            {active.now}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <Link
            href={`/contact?intent=direct-hire&track=${encodeURIComponent(active.track)}`}
            className={CELL_LINK}
          >
            Ask about engineers like this
            <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-[0.3rem]">
              →
            </span>
          </Link>
          <Link href="/community/alumni" className={CELL_LINK}>
            See the full network
            <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-[0.3rem]">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-(--line) sm:grid-cols-4 lg:grid-cols-8">
        {engineers.map((person, i) => (
          <button
            key={`${person.name}-${i}`}
            type="button"
            className={ENGINEER_TILE}
            data-active={i === activeIndex}
            aria-current={i === activeIndex ? "true" : undefined}
            aria-label={`Show ${person.name}, ${person.track}`}
            onClick={() => setActiveIndex(i)}
          >
            <span className={ENGINEER_AVATAR} aria-hidden="true">
              <Image
                src={person.image}
                alt=""
                fill
                sizes="46px"
                className="object-cover object-[center_20%]"
              />
            </span>
            <span className="text-[0.7rem] font-semibold text-(--muted) group-data-[active=true]:text-(--page-fg)">
              {person.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
