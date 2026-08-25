import React from "react";
import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ModalButton } from "@/components/ui/modal-button";
import { prodfestFacts, eventKinds, pastEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events | Blockfuse Labs",
  description:
    "ProdFest, hackathons, meetups, workshops, and demo days — everything Blockfuse runs to put students in front of the people who can hire them.",
};

export default function EventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title="Where the work meets the room."
        lead="Everything we run is built to put students in front of people who can hire them, fund them, or push them harder."
      />

      {/* Flagship — ProdFest */}
      <ScrollReveal className="mt-12" delay={1}>
        <div className="feature-panel !rounded-[26px] px-7 py-10 sm:px-10 sm:py-11">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[54ch]">
              <span className="mono-tag !text-[9.5px] !tracking-[0.18em] text-[var(--page-fg)]">
                Flagship
              </span>
              <h2 className="mt-5 font-heading text-[clamp(2.125rem,4.4vw,3.375rem)] font-bold leading-none tracking-[-0.035em] text-[var(--page-fg)]">
                ProdFest
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--bright)]">
                Our annual demo festival. Cohort teams present finished products
                to a live audience of founders, investors, hiring partners, and
                the wider Jos tech community. Twelve dApps and AI products have
                launched off that stage.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <ModalButton modal="prodfest" variant="contrast" arrow={false}>
                  Register for ProdFest 2026 <span aria-hidden="true">→</span>
                </ModalButton>
                <ModalButton modal="sponsor" variant="ghost" arrow={false}>
                  Become a sponsor
                </ModalButton>
              </div>
            </div>

            <div className="grid min-w-[180px] gap-[18px]">
              {prodfestFacts.map((fact) => (
                <div key={fact.label}>
                  <div className="font-heading text-[26px] font-bold tracking-[-0.02em] text-[var(--page-fg)]">
                    {fact.value}
                  </div>
                  <div className="mt-1 text-xs text-[var(--bright)]">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* What we run */}
      <div className="mt-[18px] grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {eventKinds.map((kind, i) => (
          <ScrollReveal key={kind.id} delay={Math.min(i + 1, 4)}>
            <div
              id={kind.id}
              className="surface-card h-full scroll-mt-24 px-6 py-7 hover:-translate-y-1"
            >
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                {kind.cadence}
              </div>
              <h3 className="font-heading text-[19px] font-bold tracking-[-0.02em] text-[var(--page-fg)]">
                {kind.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--muted)]">
                {kind.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Past events */}
      <ScrollReveal className="mt-16" delay={1}>
        <h2
          id="past-events"
          className="scroll-mt-24 font-heading text-[28px] font-bold tracking-[-0.025em] text-[var(--page-fg)]"
        >
          Past events
        </h2>
        <div className="row-list mt-6">
          {pastEvents.map((event) => (
            <div
              key={event.title}
              className="flex flex-wrap items-center gap-5 px-6 py-5"
            >
              <div className="w-[92px] shrink-0 font-mono text-[11.5px] text-[var(--dim)]">
                {event.date}
              </div>
              <div className="min-w-[180px] flex-1 text-[15px] font-semibold text-[var(--page-fg)]">
                {event.title}
              </div>
              <div className="text-[12.5px] text-[var(--muted)]">
                {event.meta}
              </div>
              <span className="mono-tag">{event.kind}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Close */}
      <ScrollReveal className="mt-16 flex flex-wrap items-center gap-3.5" delay={1}>
        <ModalButton modal="prodfest">Register interest</ModalButton>
        <ModalButton modal="sponsor" variant="secondary" arrow={false}>
          Partner with us
        </ModalButton>
      </ScrollReveal>
    </PageShell>
  );
}
