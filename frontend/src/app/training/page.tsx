import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import {
  academyPillars,
  detailedPrograms,
  academyPathStages,
  assessmentMatrix,
  graduateTestimonials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Blockfuse Academy: train for the work, prove you are ready",
  description:
    "Blockfuse Academy develops production-ready engineers through rigorous, project-based training in AI-native software engineering, applied AI, and blockchain.",
};

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <div>
            <KineticHeroTitle
              prefix="Train for the work."
              cycleWords={["Prove you are ready.", "Ship real systems.", "Build with proof."]}
              suffix=""
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]"
            />
          </div>

          {/* Paragraphs */}
          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Blockfuse Academy trains students into production-ready engineers
              through demanding, project-based programs in AI-native software
              engineering, applied AI, and blockchain.
            </p>
            <p>
              You will learn by building real systems, get told plainly what is
              not good enough yet, and be assessed against a clear professional
              standard. You will leave with more than a certificate. You will
              leave with evidence of what you can do, whether you go on to join
              a company or start one.
            </p>
            <p className="font-semibold text-[var(--accent)]">
              It is not an easy program. That is the point.
            </p>
          </ScrollReveal>

          {/* Actions */}
          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={2}>
            <ButtonLink href="#programs">Apply to the next cohort</ButtonLink>
            <ButtonLink href="#assessment" variant="secondary" dataCursor="EXPLORE">
              How we assess you
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. THE STANDARD FOR ENGINEERING HAS CHANGED */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <TiltCard className="p-8 sm:p-12">
              <span className="eyebrow">
                The Modern Paradigm
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
                The standard for engineering has changed.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
                <p>
                  AI can help almost anyone produce code. That makes engineering
                  judgment more valuable, not less.
                </p>
                <p>
                  Companies need engineers who can understand systems, evaluate
                  AI-generated output, solve unfamiliar problems, collaborate with
                  a team, and take responsibility for what they ship.
                </p>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 font-semibold text-[var(--page-fg)]">
                  That is what Blockfuse Academy is designed to develop.
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. WHY TRAIN AT BLOCKFUSE? (7 PILLARS) */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              The Blockfuse Difference
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Why train at Blockfuse?
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {academyPillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.title} delay={idx < 4 ? idx + 1 : 4}>
                <TiltCard
                  dataCursorText="PILLAR"
                  className={`flex h-full flex-col justify-between p-7 sm:p-8 ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div>
                    <span className="eyebrow">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                      {pillar.copy}
                    </p>
                    {pillar.subCopy && (
                      <p className="mt-3 text-sm font-medium text-[var(--page-fg)] leading-relaxed">
                        {pillar.subCopy}
                      </p>
                    )}
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. CHOOSE YOUR PROGRAM */}
      {/* ========================================================================= */}
      <section id="programs" className="px-5 py-24 sm:px-8 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Curriculum & Specialized Tracks
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Choose your program
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-8">
            {detailedPrograms.map((program) => (
              <ScrollReveal key={program.id}>
                <TiltCard
                  id={program.id}
                  dataCursorText="PROGRAM"
                  className="surface-card-accent p-8 sm:p-12"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="lg:max-w-xl">
                      <span className="inline-block rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                        {program.target}
                      </span>
                      <h3 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
                        {program.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                        {program.description}
                      </p>
                      <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--page-fg)]">
                        {program.outcome}
                      </p>
                      {program.note && (
                        <p className="mt-3 text-xs text-[var(--muted)] italic">
                          {program.note}
                        </p>
                      )}
                    </div>

                    <div className="w-full rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 lg:max-w-md">
                      <p className="font-heading font-semibold text-sm uppercase tracking-wider text-[var(--page-fg)]">
                        You will learn:
                      </p>
                      <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
                        {program.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5">
                            <span className="text-[var(--accent)] font-bold">✓</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[var(--line)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                      href={`/contact?program=${program.id}`}
                      className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                    >
                      <span>{program.ctaText}</span>
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                    <ModalButton
                      modal={program.id === "team-training" ? "hire" : "program"}
                      variant="secondary"
                      arrow={false}
                      prefill={
                        program.id === "team-training"
                          ? undefined
                          : { Track: program.title }
                      }
                    >
                      Apply for this track
                    </ModalButton>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. YOUR PATH THROUGH BLOCKFUSE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">
              The Standard
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Your path through Blockfuse
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Completing a program does not automatically mean someone is ready
              for placement. Every stage has a clear meaning and standard.
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {academyPathStages.map((stage, index) => (
              <ScrollReveal key={stage.stage} delay={index < 4 ? index + 1 : 4}>
                <TiltCard
                  dataCursorText="STAGE"
                  className="flex items-start gap-5 p-6 sm:p-7"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] font-heading text-sm font-bold text-white shadow-md">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--page-fg)] sm:text-xl">
                      {stage.stage}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                      {stage.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8" delay={2}>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-sm text-[var(--muted)] sm:text-base">
              This distinction protects both learners and employers. When we
              recommend an engineer, we want the recommendation to carry real
              weight.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. PRODUCTION-READINESS ASSESSMENT TABLE */}
      {/* ========================================================================= */}
      <section id="assessment" className="px-5 py-24 sm:px-8 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Evaluation Matrix
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              The production-readiness assessment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              The assessment measures whether you can apply what you have
              learned in conditions that reflect real engineering work.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <TiltCard className="overflow-hidden rounded-2xl border border-[var(--line-strong)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]">
                      <th className="px-6 py-4 font-heading font-semibold text-[var(--page-fg)] sm:w-1/3">
                        Area
                      </th>
                      <th className="px-6 py-4 font-heading font-semibold text-[var(--page-fg)]">
                        What we assess
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {assessmentMatrix.map((row) => (
                      <tr
                        key={row.area}
                        className="transition hover:bg-[var(--card-hover)]"
                      >
                        <td className="px-6 py-4 font-medium text-[var(--page-fg)]">
                          {row.area}
                        </td>
                        <td className="px-6 py-4 text-[var(--muted)] leading-relaxed">
                          {row.whatWeAssess}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TiltCard>
          </ScrollReveal>

          <p className="mt-6 text-center text-xs text-[var(--muted)] sm:text-sm">
            The same standard applies to everyone. Passing is based on
            demonstrated ability, not attendance or personal relationships.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 7. WHAT OUR GRADUATES SAY */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">
              Alumni Outcomes
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What our graduates say
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {graduateTestimonials.map((item, i) => (
              <ScrollReveal key={item.author} delay={i + 1}>
                <TiltCard
                  dataCursorText="QUOTE"
                  className="flex h-full flex-col justify-between p-7 sm:p-8"
                >
                  <p className="text-base italic leading-relaxed text-[var(--page-fg)] sm:text-lg">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-[var(--line)] pt-4">
                    <p className="font-heading font-bold text-sm text-[var(--page-fg)]">
                      {item.author}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{item.role}</p>
                    <p className="text-xs text-[var(--accent)] font-medium mt-1">
                      {item.cohort}
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
      {/* 8. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[var(--accent)]/30 via-transparent to-transparent p-px shadow-2xl">
          <div className="rounded-3xl bg-[var(--surface-2)] p-8 text-center sm:p-14 md:p-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Ready to prove what you can do?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Choose the program that matches your current level and the
              engineer you want to become.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonLink href="#programs">Apply to the next cohort</ButtonLink>
              <ModalButton modal="sponsor" variant="secondary" arrow={false}>
                Sponsor seats or a cohort
              </ModalButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
