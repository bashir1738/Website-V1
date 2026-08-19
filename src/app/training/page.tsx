import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import {
  academyPillars,
  detailedPrograms,
  academyPathStages,
  assessmentMatrix,
  academyExpectations,
  fundingChannels,
  graduateTestimonials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Blockfuse Academy: train for the work, prove you are ready",
  description:
    "Blockfuse Academy develops production-ready engineers through rigorous, project-based training in AI-native software engineering, applied AI, and blockchain.",
};

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 check-accent mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
      <div className="section-divider" />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[var(--accent)]/8 blur-[120px] md:h-[48rem] md:w-[48rem]" />
      <div className="pointer-events-none absolute right-10 top-[60rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/3 blur-[120px]" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-40 ">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Blockfuse Academy
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">
              Jos • Remote • Hybrid
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08]">
            Train for the work.
            <br />
            <span className="gradient-text">Prove you are ready.</span>
          </h1>

          {/* Paragraphs */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/contact">Apply to the next cohort</ButtonLink>
            <ButtonLink href="#programs" variant="secondary">
              Explore our programs
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. THE STANDARD FOR ENGINEERING HAS CHANGED */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              The Modern Paradigm
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
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
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. WHY TRAIN AT BLOCKFUSE? (7 PILLARS) */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">
              The Blockfuse Difference
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Why train at Blockfuse?
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {academyPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className={`glass group flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25 sm:p-8 ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <span className="eyebrow">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. CHOOSE YOUR PROGRAM */}
      {/* ========================================================================= */}
      <section id="programs" className="px-5 py-24 sm:px-8  scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">
              Curriculum & Specialized Tracks
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Choose your program
            </h2>
          </div>

          <div className="mt-12 space-y-8">
            {detailedPrograms.map((program) => (
              <div
                key={program.id}
                id={program.id}
                className="surface-card rounded-2xl p-8 sm:p-12 transition-all duration-300 hover:border-[var(--accent)]/25"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="lg:max-w-xl">
                    <span className="inline-block rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                      {program.target}
                    </span>
                    <h3 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
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
                    <p className="font-semibold text-sm uppercase tracking-wider text-[var(--page-fg)]">
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
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>{program.ctaText}</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <ButtonLink href="/contact" variant="secondary">
                    Apply for this track
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. YOUR PATH THROUGH BLOCKFUSE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="text-left">
            <span className="eyebrow">
              The Standard
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Your path through Blockfuse
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Completing a program does not automatically mean someone is ready
              for placement. Every stage has a clear meaning and standard.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {academyPathStages.map((stage, index) => (
              <div
                key={stage.stage}
                className="surface-card group flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25 sm:p-7"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-md">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--page-fg)] sm:text-xl">
                    {stage.stage}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-sm text-[var(--muted)] sm:text-base">
            This distinction protects both learners and employers. When we
            recommend an engineer, we want the recommendation to carry real
            weight.
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. PRODUCTION-READINESS ASSESSMENT TABLE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">
              Evaluation Matrix
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              The production-readiness assessment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              The assessment measures whether you can apply what you have
              learned in conditions that reflect real engineering work.
            </p>
          </div>

          <div className="surface-card mt-12 overflow-hidden rounded-2xl border border-[var(--line)] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-[var(--line)] bg-white/5 dark:bg-white/5">
                    <th className="px-6 py-4 font-semibold text-[var(--page-fg)] sm:w-1/3">
                      Area
                    </th>
                    <th className="px-6 py-4 font-semibold text-[var(--page-fg)]">
                      What we assess
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {assessmentMatrix.map((row) => (
                    <tr
                      key={row.area}
                      className="transition hover:bg-white/5 dark:hover:bg-white/5"
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
          </div>

          <p className="mt-6 text-center text-xs text-[var(--muted)] sm:text-sm">
            The same standard applies to everyone. Passing is based on
            demonstrated ability, not attendance or personal relationships.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 7. THE ENGINEERING RESIDENCY */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              Hands-On Production
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              The Engineering Residency
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              <p>
                The residency bridges the gap between completing training and
                taking responsibility within a professional engineering team.
              </p>
              <p>
                Where residency places are available, qualified engineers work on
                scoped, real-world engineering tasks under senior supervision.
                Residents participate in code reviews, planning, written
                updates, testing, and the normal discipline of collaborative
                software development.
              </p>
              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 text-lg font-bold text-[var(--page-fg)]">
                The residency does not exaggerate experience. It helps engineers
                earn it.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 8. WHAT WE EXPECT FROM YOU & FEES / ADMISSIONS */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Expectations */}
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              Expectations & Mutual Contract
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
              What we expect from you
            </h2>
            <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
              You do not need to know everything before you apply. You do need
              to be serious about learning and willing to do the work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6">
                <p className="font-semibold text-sm uppercase tracking-wider text-[var(--page-fg)]">
                  We expect you to:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                  {academyExpectations.map((exp) => (
                    <li key={exp} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-sm uppercase tracking-wider text-[var(--page-fg)]">
                    In return, we provide:
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Clear instruction, honest feedback, fair assessment,
                    practical support, and access to the opportunities available
                    within our network.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--line)]">
                  <p className="text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
                    High Bar • High Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fees & Admissions Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Fees */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="eyebrow">
                  Sustainability
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Fees and funded places
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Every Blockfuse cohort must be financially sustainable.
                  Programs are funded through:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  {fundingChannels.map((fc) => (
                    <li key={fc} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{fc}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed">
                  The fee, payment options, and number of funded places are
                  published when applications open. If you need financial
                  support, indicate this in your application.
                </p>
              </div>
            </div>

            {/* Admissions */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="eyebrow">
                  Selectivity
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Admissions
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Blockfuse cohorts are intentionally selective. We consider
                  your potential, commitment, readiness, and fit for the
                  program, not simply how early you applied.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Cohort sizes reflect our teaching capacity, available
                  funding, and the skills employers and technology ecosystems
                  need.
                </p>
                <p className="mt-3 text-xs text-[var(--page-fg)] font-medium">
                  We only open a cohort when we have the instructors, resources,
                  and support required to deliver it properly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 9. CODE REVIEW VISUAL CALLOUT */}
      {/* ========================================================================= */}
      <section className="px-5 py-16 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl border border-[var(--line)] p-8 text-center sm:p-12 shadow-2xl">
            <span className="eyebrow">
              The Code Review Bar
            </span>
            <h3 className="mt-3 text-2xl font-bold text-[var(--page-fg)] sm:text-3xl">
              Work is reviewed the way it is reviewed on a professional team.
            </h3>
            <p className="mt-4 text-sm text-[var(--muted)] sm:text-base">
              Directly, technically, and without flattery. Line by line.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 10. WHAT OUR GRADUATES SAY */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">
              Alumni Outcomes
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What our graduates say
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {graduateTestimonials.map((item) => (
              <blockquote
                key={item.author}
                className="surface-card flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25 sm:p-8"
              >
                <p className="text-base italic leading-relaxed text-[var(--page-fg)] sm:text-lg">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-[var(--line)] pt-4">
                  <p className="font-bold text-sm text-[var(--page-fg)]">
                    {item.author}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{item.role}</p>
                  <p className="text-xs text-[var(--accent)] font-medium mt-1">
                    {item.cohort}
                  </p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 11. READY TO PROVE WHAT YOU CAN DO? (FINAL CTA) */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-transparent p-px shadow-2xl">
          <div className="rounded-2xl bg-[var(--surface-2)] p-8 text-center sm:p-14 md:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Ready to prove what you can do?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Choose the program that matches your current level and the
              engineer you want to become.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonLink href="/contact">Apply to the next cohort</ButtonLink>
              <ButtonLink href="/talent" variant="secondary">
                Sponsor seats or a cohort
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

