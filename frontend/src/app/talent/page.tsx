import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import {
  talentCategories,
  hiringProcessSteps,
  employerTestimonials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Hire Blockfuse Engineers: ability already tested",
  description:
    "Blockfuse helps companies find production-ready software engineers without sorting through hundreds of unverified applications.",
};

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function TalentPage() {
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
              prefix="Hire engineers whose ability"
              cycleWords={["has been tested.", "is verified in code.", "delivers from day one."]}
              suffix=""
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]"
            />
          </div>

          {/* Paragraphs */}
          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Blockfuse helps companies find production-ready software engineers
              without sorting through hundreds of unverified applications.
            </p>
            <p>
              Every engineer in the Blockfuse Talent Network has come through a
              demanding program, has demonstrable work, and has met the
              Blockfuse standard for technical ability, communication, and
              professional readiness.
            </p>
            <p className="font-semibold text-[var(--accent)]">
              You tell us what your team needs. We introduce the engineers who
              can do the work.
            </p>
          </ScrollReveal>

          {/* Actions */}
          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={2}>
            <ModalButton modal="hire">
              Tell us about the role
            </ModalButton>
            <ModalButton modal="sponsor" variant="secondary" arrow={false}>
              Sponsor a talent pipeline
            </ModalButton>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. APPLICATIONS ARE ABUNDANT. EVIDENCE IS SCARCE. */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <TiltCard className="p-8 sm:p-12">
              <span className="eyebrow">
                The Hiring Reality
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
                Applications are abundant. Evidence is scarce.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
                <p>
                  A CV can describe experience. A certificate can confirm
                  attendance. Neither proves that someone can understand an
                  unfamiliar codebase, solve a difficult problem, collaborate with
                  a team, or take responsibility for production software.
                </p>
                <p className="font-medium text-[var(--page-fg)]">
                  Blockfuse gives you more useful evidence.
                </p>
                <p>
                  Before we recommend an engineer, we have reviewed their code,
                  assessed their technical judgment, evaluated how they work with
                  others, and seen what they can build. They were selected out of a
                  larger applicant pool and pushed hard for the length of a
                  program. By the time you meet them, someone here has already
                  formed a considered opinion of their work.
                </p>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 font-semibold text-[var(--page-fg)]">
                  You spend less time filtering and more time speaking with
                  candidates who are genuinely qualified.
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. TALENT YOU CAN HIRE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Specialisations
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Talent you can hire
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              The Blockfuse Talent Network includes engineers trained and
              assessed in:
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {talentCategories.map((cat, idx) => (
              <ScrollReveal key={cat.title} delay={idx + 1}>
                <TiltCard
                  dataCursorText="TALENT"
                  className="flex h-full flex-col justify-between p-7 sm:p-8"
                >
                  <div>
                    <span className="eyebrow">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                      {cat.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 flex justify-center" delay={3}>
            <ModalButton modal="hire">
              Discuss your talent requirements
            </ModalButton>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. WAYS TO WORK WITH BLOCKFUSE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Engagement Models
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Ways to work with Blockfuse
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Direct Hiring */}
            <ScrollReveal delay={1}>
              <TiltCard
                dataCursorText="DIRECT"
                className="surface-card-accent flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <div>
                  <span className="eyebrow">
                    Model 01
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)]">
                    Direct hiring
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Tell us about the role, required skills, experience level,
                    working arrangement, and hiring timeline.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    We shortlist suitable engineers, provide their verified
                    profiles and portfolios, and support the interview process.
                    You employ the successful candidate directly.
                  </p>
                  <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3 text-xs font-medium text-[var(--page-fg)]">
                    A placement fee applies only when you make a successful hire.
                  </div>
                </div>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <Link
                    href="/contact?intent=direct-hire"
                    className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    <span>Hire an engineer</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Embedded Engineers */}
            <ScrollReveal delay={2}>
              <TiltCard
                dataCursorText="EMBED"
                className="surface-card-accent flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <div>
                  <span className="eyebrow">
                    Model 02
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)]">
                    Embedded engineers
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Engage a Blockfuse engineer on a contract basis without
                    immediately adding a permanent employee.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    The engineer joins your team, follows your technical
                    direction, and works within your existing processes.
                    Blockfuse manages the engagement, provides continued
                    professional support, and helps address issues before they
                    affect delivery.
                  </p>
                  <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3 text-xs font-medium text-[var(--page-fg)]">
                    You manage the product. We support the engineer.
                  </div>
                </div>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <Link
                    href="/contact?intent=embedded"
                    className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    <span>Discuss an embedded engagement</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Sponsored Talent Pipelines */}
            <ScrollReveal delay={3}>
              <TiltCard
                dataCursorText="SPONSOR"
                className="surface-card-accent flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <div>
                  <span className="eyebrow">
                    Model 03
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)]">
                    Sponsored talent pipelines
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Sponsor a cohort designed around the technologies and
                    capabilities your company or ecosystem needs.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Blockfuse manages recruitment, selection, training, projects,
                    assessment, and outcome reporting. Your organisation receives
                    early access to engineers who successfully complete the
                    required standard.
                  </p>
                  <div className="mt-4 space-y-1 text-xs text-[var(--muted)]">
                    <p className="font-heading font-semibold text-[var(--page-fg)]">
                      Suitable for:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Companies with recurring hiring needs</li>
                      <li>Protocols building their developer ecosystems</li>
                      <li>Organisations expanding access to tech careers</li>
                      <li>Funders supporting economic opportunity</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <Link
                    href="/contact?intent=sponsor"
                    className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    <span>Sponsor seats or a cohort</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Team Training */}
            <ScrollReveal delay={4}>
              <TiltCard
                dataCursorText="TRAIN"
                className="surface-card-accent flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <div>
                  <span className="eyebrow">
                    Model 04
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)]">
                    Team training
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Develop the engineers you already have with custom programs
                    around your team&apos;s objectives, skill level, and stack.
                  </p>
                  <div className="mt-3 space-y-1 text-xs text-[var(--muted)]">
                    <p className="font-heading font-semibold text-[var(--page-fg)]">
                      Popular areas:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                      <li>• AI-assisted development</li>
                      <li>• Reliable LLM applications</li>
                      <li>• AI observability</li>
                      <li>• Cloud & Backend</li>
                      <li>• Smart contract security</li>
                      <li>• Modern testing</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <Link
                    href="/contact?intent=team-training"
                    className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    <span>Train your team</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. HOW HIRING THROUGH BLOCKFUSE WORKS */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">
              The Hiring Flow
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              How hiring through Blockfuse works
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-5">
            {hiringProcessSteps.map((step, idx) => (
              <ScrollReveal key={step.number} delay={idx < 4 ? idx + 1 : 4}>
                <TiltCard
                  dataCursorText="STEP"
                  className="flex items-start gap-5 p-6 sm:p-7"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] font-heading text-sm font-bold text-white shadow-md">
                    0{step.number}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--page-fg)] sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. WHAT EMPLOYERS SAY */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Employer Endorsements
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What employers say
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {employerTestimonials.map((item, i) => (
              <ScrollReveal key={item.author} delay={i + 1}>
                <TiltCard
                  dataCursorText="QUOTE"
                  className="flex h-full flex-col justify-between p-8"
                >
                  <p className="text-base italic leading-relaxed text-[var(--page-fg)] sm:text-lg">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-[var(--line)] pt-4">
                    <p className="font-heading font-bold text-sm text-[var(--page-fg)]">
                      {item.author}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{item.role}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 7. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[var(--accent)]/30 via-transparent to-transparent p-px shadow-2xl">
          <div className="rounded-3xl bg-[var(--surface-2)] p-8 text-center sm:p-14 md:p-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Spend less time searching.
              <br />
              <span className="gradient-text">
                Meet engineers ready to contribute.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Tell us about the role, technical capabilities, or talent pipeline
              your organisation needs. We will tell you honestly whether we have
              the right engineers available, and what it would take to develop
              them if we do not.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ModalButton modal="hire">
              Start a hiring conversation
            </ModalButton>
              <ModalButton modal="sponsor" variant="secondary" arrow={false}>
              Sponsor a cohort
            </ModalButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
