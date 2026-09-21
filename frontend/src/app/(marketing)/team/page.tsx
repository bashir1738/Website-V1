import React from "react";
import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { teamMembers } from "@/features/team/content";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team | Blockfuse Labs",
  description:
    "The engineers, mentors, and operators in Jos behind every Blockfuse assessment.",
};

export default function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Team"
        title="The people who review the work."
        lead="Engineers, mentors, and operators based in Jos. Every assessment that leaves Blockfuse has one of these names behind it."
      />

      <div className="mt-14 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
        {teamMembers.map((member, i) => (
          <ScrollReveal key={member.name} delay={Math.min(i + 1, 4)}>
            <div className="surface-card h-full overflow-hidden !p-0 hover:-translate-y-1">
              <div className="relative grid aspect-[4/3] place-items-center border-b border-[var(--line)] bg-[linear-gradient(150deg,rgba(191,100,231,0.2),rgba(78,46,245,0.12))]">
                <span className="font-heading text-[34px] font-bold tracking-[-0.02em] text-[var(--page-fg)]/60">
                  {initials(member.name)}
                </span>
                <span className="absolute bottom-2 right-2.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[var(--page-fg)]/40">
                  Photo
                </span>
              </div>
              <div className="px-[22px] pb-[22px] pt-5">
                <h3 className="font-heading text-[17px] font-bold tracking-[-0.02em] text-[var(--page-fg)]">
                  {member.name}
                </h3>
                <div className="mb-3 mt-1.5 text-[12.5px] font-medium text-[var(--accent)]">
                  {member.role}
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">
                  {member.bio}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

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
