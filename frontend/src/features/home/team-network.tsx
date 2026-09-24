import React from "react";
import Link from "next/link";
import { BTN_SECONDARY } from "@/lib/styles";
import { teamMembers } from "@/features/team/content";

const NETWORK_STATS = [
  { value: "797+", label: "developers trained" },
  { value: "5,500+", label: "smart contracts deployed" },
  { value: "57+", label: "projects built" },
] as const;

const PLACEHOLDER_TONES = [
  "bg-[linear-gradient(145deg,#7340a8,#321466)]",
  "bg-[linear-gradient(145deg,#4d68a8,#162b5f)]",
  "bg-[linear-gradient(145deg,#a96a3b,#63311d)]",
  "bg-[linear-gradient(145deg,#a94770,#5f1738)]",
] as const;

const NETWORK_AVATAR =
  "relative grid aspect-square place-items-center overflow-hidden rounded-[1rem] text-[rgba(255,255,255,0.92)] before:absolute before:content-[''] before:rounded-full before:bg-[rgba(255,255,255,0.16)] before:w-[58%] before:h-[58%] before:right-[-12%] before:top-[-10%] after:absolute after:content-[''] after:rounded-full after:bg-[rgba(255,255,255,0.16)] after:w-[42%] after:h-[42%] after:left-[-10%] after:bottom-[-8%]";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function TeamNetwork() {
  return (
    <section className="overflow-hidden bg-(--page-bg) py-24 sm:py-28 lg:py-8 lg:min-h-[calc(100svh_-_4.75rem)]" aria-labelledby="network-title">
      <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-7">
        <span className="font-mono text-[0.72rem] font-semibold tracking-[0.13em] uppercase text-(--accent)">
          The people behind the standard
        </span>
        <h2 id="network-title" className="mx-auto mt-4 max-w-[32ch] font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.035em] text-[var(--page-fg)]">
          More than a programme. Join a technology community built for the long term.
        </h2>
        <p className="mx-auto mt-4 max-w-[64ch] text-base leading-[1.6] text-[var(--muted)] sm:text-lg lg:text-base">
          Learn alongside ambitious engineers, receive direct guidance from
          working practitioners, and stay connected to opportunities long after
          the cohort ends.
        </p>

        <div className="grid gap-8 mt-10 sm:mt-12 lg:mt-7 sm:grid-cols-3 lg:gap-5">
          {NETWORK_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <strong className="font-heading text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-none tracking-[-0.055em] text-(--accent) tabular-nums lg:text-[clamp(2.5rem,4vw,3.75rem)]">
                {stat.value}
              </strong>
              <span className="mt-[0.65rem] text-[0.82rem] font-semibold text-(--page-fg) lg:mt-[0.4rem]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 sm:mt-16 lg:mt-7">
        <div className="mx-auto max-w-[1240px] px-5 py-5 text-center sm:px-7 lg:py-4">
          <p className="font-mono text-base font-semibold uppercase tracking-[0.12em] text-[var(--muted)] sm:text-lg">
            Meet the Blockfuse team
          </p>
        </div>

        <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] max-sm:[mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
          <div className="flex w-max gap-6 px-3 animate-network-scroll [will-change:transform] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:[will-change:auto]">
            {[...teamMembers, ...teamMembers].map((member, index) => {
              const duplicate = index >= teamMembers.length;
              return (
                <article
                  key={`${member.name}-${index}`}
                  className="w-[15rem] flex-[0_0_15rem] text-left max-sm:w-[12.5rem] max-sm:flex-[0_0_12.5rem] lg:w-[clamp(9rem,12vw,11rem)] lg:flex-[0_0_clamp(9rem,12vw,11rem)]"
                  aria-hidden={duplicate || undefined}
                >
                  <div className={`${NETWORK_AVATAR} ${PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length]}`}>
                    <span className="relative z-[1] font-heading text-[3.25rem] font-semibold tracking-[-0.06em] lg:text-[2.5rem]">
                      {initials(member.name)}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold tracking-[-0.02em] text-(--page-fg) lg:mt-[0.65rem]">
                    {member.name}
                  </h3>
                  <p className="mt-[0.3rem] text-[0.78rem] leading-[1.5] text-(--muted)">
                    {member.role}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center lg:mt-5">
          <Link href="/about/team" className={BTN_SECONDARY}>
            Meet the full team <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
