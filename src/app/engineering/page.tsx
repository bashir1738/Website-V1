import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import { engineeringServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blockfuse Engineering: senior-led AI, web and blockchain delivery",
  description:
    "Senior-led technical advisory and delivery for dependable AI systems, web platforms, blockchain solutions, and backend infrastructure.",
};

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function EngineeringPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl">
          {/* Heading with Kinetic Typography */}
          <div>
            <KineticHeroTitle
              prefix="Senior engineering for products"
              cycleWords={["that need to work.", "with zero excuses.", "shipped to scale."]}
              suffix=""
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]"
            />
          </div>

          {/* Lead & Paragraphs */}
          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Blockfuse Engineering helps startups, companies, and technology
              ecosystems design and deliver dependable AI, web, and blockchain
              systems.
            </p>
            <p>
              The same senior engineers who set the standard our Academy trains
              to lead these engagements. That is not a coincidence. It is why
              our teaching stays tied to how software is actually shipped, and
              why the work we hand over holds up after we leave.
            </p>
          </ScrollReveal>

          {/* Actions */}
          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={2}>
            <ButtonLink href="/contact?intent=engineering" dataCursor="PROJECT">
              Describe what you need built
            </ButtonLink>
            <ButtonLink href="/talent" variant="secondary" dataCursor="HIRE">
              Or hire engineers instead
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. WHAT WE TAKE ON */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Scope & Engagements
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What we take on
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {engineeringServices.map((service, idx) => (
              <ScrollReveal key={service.title} delay={idx + 1}>
                <TiltCard
                  dataCursorText="SERVICE"
                  className="surface-card-accent flex h-full flex-col justify-between p-8 sm:p-10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">
                        0{idx + 1}
                      </span>
                      <span className="inline-block rounded-full bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted)] border border-[var(--line)]">
                        {service.time}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-2xl font-bold text-[var(--page-fg)]">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                      {service.copy}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[var(--line)] pt-6 flex items-center justify-between">
                    <Link
                      href={`/contact?intent=engineering&service=${encodeURIComponent(
                        service.title
                      )}`}
                      className="link-hover group/link inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                    >
                      <span>Request {service.title}</span>
                      <span
                        aria-hidden="true"
                        className="transition group-hover/link:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. HOW WE WORK */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Delivery Principles
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              How we work
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Senior Led */}
            <ScrollReveal delay={1}>
              <TiltCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
                <div>
                  <span className="eyebrow">
                    Senior Accountability
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)]">
                    Senior-led with supervised residency
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                    Every engagement is led by a senior engineer who owns the
                    technical decisions, the quality, and your relationship with
                    us. Residents from the Academy work underneath that leadership
                    on real tasks, reviewed, supervised, and never billed as
                    senior time.
                  </p>
                  <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-xs sm:text-sm font-medium text-[var(--page-fg)]">
                    It is how engineers here get genuinely good, and it is
                    reflected in what we charge.
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Complete Ownership */}
            <ScrollReveal delay={2}>
              <TiltCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
                <div>
                  <span className="eyebrow">
                    IP & Discretion
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)]">
                    Your IP remains strictly yours
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                    Your code, your infrastructure, your IP, and your roadmap are
                    yours. We ask before we put your name on anything, and a good
                    deal of the work we do is never mentioned at all.
                  </p>
                  <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-xs sm:text-sm font-medium text-[var(--page-fg)]">
                    Delivered into your accounts with documentation written for
                    clean handover.
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. WE TAKE FEW OF THESE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <TiltCard className="p-8 sm:p-12">
              <span className="eyebrow">
                Focus & Standards
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
                We take few of these
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
                <p>
                  Every project needs the right senior lead, a clear problem, and a
                  realistic path to delivery. We take on a small number of
                  engagements and staff them properly rather than many and thinly.
                  If the fit is wrong we will say so early, and we can usually
                  point you somewhere better.
                </p>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 text-sm sm:text-base text-[var(--muted)]">
                  If what you actually need is more engineers inside your own
                  team,{" "}
                  <Link
                    href="/talent"
                    className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/50 underline-offset-4 hover:decoration-[var(--accent)]"
                  >
                    hiring or embedding Blockfuse engineers
                  </Link>{" "}
                  is probably the better route.
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/contact?intent=engineering" dataCursor="PROJECT">
                  Describe what you need built
                </ButtonLink>
                <ButtonLink href="/talent" variant="secondary" dataCursor="HIRE">
                  Or hire engineers instead
                </ButtonLink>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[var(--accent)]/30 via-transparent to-transparent p-px shadow-2xl">
          <div className="rounded-3xl bg-[var(--surface-2)] p-8 text-center sm:p-14 md:p-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Have a problem worth solving?
              <br />
              <span className="gradient-text">Let&apos;s build it right.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Whether you need architecture advice, an exploratory prototype, or
              full end-to-end delivery of AI and blockchain products, our senior
              engineers are ready to lead.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonLink href="/contact?intent=engineering" dataCursor="PROJECT">
                Start an Engineering Project
              </ButtonLink>
              <ButtonLink href="/talent" variant="secondary" dataCursor="TALENT">
                Explore Talent Network
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
