import React from "react";
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
  return (
    <section className="network-section py-24 sm:py-28 lg:py-8" aria-labelledby="network-title">
      <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-7">
        <span className="network-kicker">The people behind the standard</span>
        <h2 id="network-title" className="mx-auto mt-4 max-w-[22ch] font-heading text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[1] tracking-[-0.05em] text-[var(--page-fg)] lg:text-[clamp(2.75rem,4vw,3.75rem)]">
          More than a programme. Join a technology community built for the long term.
        </h2>
        <p className="mx-auto mt-4 max-w-[64ch] text-base leading-[1.6] text-[var(--muted)] sm:text-lg lg:text-base">
          Learn alongside ambitious engineers, receive direct guidance from
          working practitioners, and stay connected to opportunities long after
          the cohort ends.
        </p>

        <div className="network-stats mt-10 sm:mt-12 lg:mt-7">
          {NETWORK_STATS.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="network-carousel-wrap mt-14 sm:mt-16 lg:mt-7">
        <div className="mx-auto max-w-[1240px] px-5 py-5 text-center sm:px-7 lg:py-4">
          <p className="font-mono text-base font-semibold uppercase tracking-[0.12em] text-[var(--muted)] sm:text-lg">
            Meet the Blockfuse team
          </p>
        </div>

        <div className="network-carousel">
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

        <div className="mt-8 text-center lg:mt-5">
          <Link href="/team" className="btn-secondary">
            Meet the full team <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
