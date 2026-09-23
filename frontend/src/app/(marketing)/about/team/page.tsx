import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { loadTeam, type TeamMember } from "@/features/team/content";
import { initials } from "@/lib/utils";
import { SURFACE_CARD } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Team | Blockfuse Labs",
  description:
    "The engineers, mentors, and operators in Jos behind every Blockfuse assessment.",
};

const SOCIALS: { key: keyof NonNullable<TeamMember["social"]>; label: string; short: string }[] = [
  { key: "linkedin", label: "LinkedIn", short: "in" },
  { key: "github", label: "GitHub", short: "GH" },
  { key: "twitter", label: "X", short: "X" },
  { key: "warpcast", label: "Warpcast", short: "W" },
];

export default async function TeamPage() {
  const team = await loadTeam();

  return (
    <PageShell>
      <PageHero
        eyebrow="Team"
        title="The people who review the work."
        lead="Engineers, mentors, and operators based in Jos. Every assessment that leaves Blockfuse has one of these names behind it."
      />

      {team.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-[var(--muted)]">
          <p className="font-heading text-lg font-semibold text-[var(--page-fg)]">
            Team roster unavailable right now.
          </p>
          <p className="mt-2">Please check back shortly.</p>
        </div>
      ) : (
        <div className="mt-14 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {team.map((member, i) => (
            <ScrollReveal key={member.slug || member.name} delay={Math.min(i + 1, 4)}>
              <div className={`${SURFACE_CARD} h-full overflow-hidden !p-0 hover:-translate-y-1`}>
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(150deg,rgba(191,100,231,0.2),rgba(78,46,245,0.12))]">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top [filter:saturate(0.92)_contrast(1.02)]"
                      priority={i < 4}
                    />
                  ) : (
                    <span className="font-heading text-[34px] font-bold tracking-[-0.02em] text-[var(--page-fg)]/60">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <div className="px-[22px] pb-[22px] pt-5">
                  <h3 className="font-heading text-[17px] font-bold tracking-[-0.02em] text-[var(--page-fg)]">
                    {member.name}
                  </h3>
                  <div className="mb-3 mt-1.5 text-[12.5px] font-medium text-[var(--accent)]">
                    {member.role}
                  </div>
                  {member.bio ? (
                    <p className="line-clamp-6 text-[13px] leading-relaxed text-[var(--muted)] whitespace-pre-line">
                      {member.bio}
                    </p>
                  ) : null}
                  {member.social &&
                    SOCIALS.some((s) => member.social?.[s.key]) && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--line)] pt-3">
                        {SOCIALS.filter((s) => member.social?.[s.key]).map((s) => (
                          <a
                            key={s.key}
                            href={member.social![s.key]!}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} on ${s.label}`}
                            className="grid h-8 w-8 place-items-center rounded-full bg-[var(--action-bg)] font-sans text-[0.65rem] font-bold tracking-[-0.02em] text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                          >
                            {s.short}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      <div className="mt-20 flex flex-col items-center gap-4 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
            Work with the engineers we make.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Every engineer reviewed by this team carries an assessment record —
            you can see the work before the call.
          </p>
        </ScrollReveal>
        <ScrollReveal className="mt-6 flex flex-wrap items-center justify-center gap-3.5" delay={2}>
          <ModalButton modal="hire">Hire Blockfuse engineers</ModalButton>
          <ModalButton modal="newsletter" variant="secondary">
            Join the dispatch
          </ModalButton>
        </ScrollReveal>
      </div>
    </PageShell>
  );
}
