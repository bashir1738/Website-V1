"use client";

import React, { useState } from "react";
import Link from "next/link";
import { teamMembers } from "@/features/team/content";

const NETWORK_STATS = [
  { value: "115+", label: "engineers graduated" },
  { value: "500+", label: "smart contracts built" },
  { value: "12", label: "products shipped" },
] as const;

const PLACEHOLDER_TONES = [
  "tone-violet",
  "tone-blue",
  "tone-amber",
  "tone-rose",
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function TeamNetwork() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="network-section py-24 sm:py-32" aria-labelledby="network-title">
      <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-7">
        <span className="network-kicker">The people behind the standard</span>
        <h2 id="network-title" className="mx-auto mt-5 max-w-[22ch] font-heading text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[1] tracking-[-0.05em] text-[var(--page-fg)]">
          More than a programme. Join a technology community built for the long term.
        </h2>
        <p className="mx-auto mt-6 max-w-[64ch] text-base leading-[1.7] text-[var(--muted)] sm:text-lg">
          Learn alongside ambitious engineers, receive direct guidance from
          working practitioners, and stay connected to opportunities long after
          the cohort ends.
        </p>

        <div className="network-stats mt-14 sm:mt-16">
          {NETWORK_STATS.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="network-carousel-wrap mt-16 sm:mt-20">
        <div className="mx-auto mb-5 flex max-w-[1240px] items-center justify-between px-5 sm:px-7">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
            Meet the Blockfuse team
          </p>
          <button
            type="button"
            className="network-pause"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Play" : "Pause"}
          </button>
        </div>

        <div className={`network-carousel ${paused ? "is-paused" : ""}`}>
          <div className="network-track">
            {[...teamMembers, ...teamMembers].map((member, index) => {
              const duplicate = index >= teamMembers.length;
              return (
                <article
                  key={`${member.name}-${index}`}
                  className="network-person"
                  aria-hidden={duplicate || undefined}
                >
                  <div className={`network-avatar ${PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length]}`}>
                    <span>{initials(member.name)}</span>
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/team" className="btn-secondary">
            Meet the full team <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
