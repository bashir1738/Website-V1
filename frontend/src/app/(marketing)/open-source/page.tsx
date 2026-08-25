import React from "react";
import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ModalButton } from "@/components/ui/modal-button";
import { repos, contribSteps } from "@/features/open-source/content";

export const metadata: Metadata = {
  title: "Open Source | Blockfuse Labs",
  description:
    "Contracts, tooling, and course material maintained in the open by Blockfuse students and residents.",
};

export default function OpenSourcePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Open source"
        title="Everything we teach, in the open."
        lead="Contracts, tooling, and course material maintained by students and residents. Pull requests are reviewed to the same standard as client work."
      >
        <div className="mt-8">
          <ModalButton modal="opensource">Join the program</ModalButton>
        </div>
      </PageHero>

      {/* Repos */}
      <div className="mt-14 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        {repos.map((repo, i) => (
          <ScrollReveal key={repo.name} delay={Math.min(i + 1, 4)}>
            <div className="surface-card flex h-full flex-col gap-3.5 p-6 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-sm font-medium text-[var(--page-fg)]">
                  {repo.name}
                </div>
                <span className="mono-tag shrink-0 !text-[10px] !tracking-[0.1em]">
                  {repo.lang}
                </span>
              </div>

              <p className="flex-1 text-[13.5px] leading-relaxed text-[var(--muted)]">
                {repo.description}
              </p>

              <div className="flex items-center gap-[18px] border-t border-[var(--line)] pt-3.5 font-mono text-[11px] text-[var(--dim)]">
                <span>★ {repo.stars}</span>
                <span>⑂ {repo.forks}</span>
                <span className="ml-auto text-[var(--dim)]">{repo.updated}</span>
              </div>

              {/* Twelve-week commit sparkline */}
              <div
                className="flex h-[22px] items-end gap-[3px]"
                aria-hidden="true"
              >
                {repo.activity.map((h, idx) => (
                  <div
                    key={idx}
                    className="min-h-[2px] flex-1 rounded-sm bg-[linear-gradient(180deg,var(--accent),rgba(78,46,245,0.45))] opacity-85"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* How contribution works */}
      <ScrollReveal className="mt-16" delay={1}>
        <div className="rounded-[22px] border border-[var(--line)] bg-[var(--panel-fill)] px-8 py-9 backdrop-blur-xl sm:px-9">
          <h2 className="font-heading text-2xl font-bold tracking-[-0.025em] text-[var(--page-fg)]">
            How contribution works
          </h2>
          <div className="mt-6 grid gap-[26px] [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {contribSteps.map((step) => (
              <div key={step.n}>
                <div className="mb-2.5 font-heading text-[13px] font-bold text-[var(--accent)]">
                  {step.n}
                </div>
                <div className="mb-1.5 text-[15px] font-semibold text-[var(--page-fg)]">
                  {step.title}
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </PageShell>
  );
}
