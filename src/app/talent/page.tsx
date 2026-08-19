import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import {
  talentCategories,
  hiringProcessSteps,
  verifiedEngineerCriteria,
  ecosystemPartnerServices,
  employerTestimonials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Hire Blockfuse Engineers: ability already tested",
  description:
    "Blockfuse helps companies find production-ready software engineers without sorting through hundreds of unverified applications.",
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

export default function TalentPage() {
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
              For companies and ecosystem partners
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08]">
            Hire engineers whose ability{" "}
            <span className="gradient-text">has already been tested.</span>
          </h1>

          {/* Paragraphs */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
            <p className="font-medium text-[var(--accent)]">
              You tell us what your team needs. We introduce the engineers who
              can do the work.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/contact?intent=hire">
              Tell us about the role
            </ButtonLink>
            <ButtonLink href="/contact?intent=sponsor" variant="secondary">
              Sponsor a talent pipeline
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. APPLICATIONS ARE ABUNDANT. EVIDENCE IS SCARCE. */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              The Hiring Reality
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
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
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. TALENT YOU CAN HIRE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">
              Specialisations
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Talent you can hire
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              The Blockfuse Talent Network includes engineers trained and
              assessed in:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {talentCategories.map((cat, idx) => (
              <div
                key={cat.title}
                className="surface-card group flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25 sm:p-8"
              >
                <div>
                  <span className="eyebrow">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <ButtonLink href="/contact?intent=hire">
              Discuss your talent requirements
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. WAYS TO WORK WITH BLOCKFUSE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">
              Engagement Models
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Ways to work with Blockfuse
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Direct Hiring */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent)]/25">
              <div>
                <span className="eyebrow">
                  Model 01
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
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
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Hire an engineer</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Embedded Engineers */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent)]/25">
              <div>
                <span className="eyebrow">
                  Model 02
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
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
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Discuss an embedded engagement</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Sponsored Talent Pipelines */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent)]/25">
              <div>
                <span className="eyebrow">
                  Model 03
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
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
                  <p className="font-semibold text-[var(--page-fg)]">
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
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Sponsor seats or a cohort</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Team Training */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent)]/25">
              <div>
                <span className="eyebrow">
                  Model 04
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Team training
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Develop the engineers you already have with custom programs
                  around your team&apos;s objectives, skill level, and stack.
                </p>
                <div className="mt-3 space-y-1 text-xs text-[var(--muted)]">
                  <p className="font-semibold text-[var(--page-fg)]">
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
                <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3 text-xs text-[var(--muted)]">
                  Delivered at Blockfuse in Jos, at your office, or remotely.
                </div>
              </div>
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <Link
                  href="/contact?intent=team-training"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Train your team</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. HOW HIRING THROUGH BLOCKFUSE WORKS */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="text-left">
            <span className="eyebrow">
              The Hiring Flow
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              How hiring through Blockfuse works
            </h2>
          </div>

          <div className="mt-12 space-y-5">
            {hiringProcessSteps.map((step) => (
              <div
                key={step.number}
                className="surface-card group flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25 sm:p-7"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-md">
                  0{step.number}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--page-fg)] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. WHAT BLOCKFUSE VERIFIED ENGINEER MEANS */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              Verification Standards
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              What Blockfuse Verified Engineer means
            </h2>
            <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">
              An engineer presented for placement has:
            </p>

            <ul className="mt-6 space-y-3.5 text-sm text-[var(--muted)] sm:text-base">
              {verifiedEngineerCriteria.map((crit) => (
                <li key={crit} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{crit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-sm text-[var(--muted)] sm:text-base leading-relaxed">
              Completing a course is not enough. Engineers who pass the
              assessment are{" "}
              <strong className="text-[var(--page-fg)]">
                Blockfuse Verified Engineers
              </strong>
              . Those approved for employer introductions enter the{" "}
              <strong className="text-[var(--page-fg)]">
                Blockfuse Talent Network
              </strong>
              . Only the second group is presented to you.
            </div>

            <div className="mt-6">
              <Link
                href="/training"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                <span>See our production-readiness standard</span>
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 7. IP OWNERSHIP & CURATED MATCHING */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* IP Ownership */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="eyebrow">
                  IP & Confidentiality
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Your product and IP remain yours.
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  <p>
                    Engineers placed through Blockfuse work under your
                    confidentiality, data-protection, and intellectual-property
                    agreements.
                  </p>
                  <p>
                    Your organisation retains ownership of its product, source
                    code, data, technical decisions, and inventions. Blockfuse&apos;s
                    role is to develop, assess, place, and support the engineer,
                    not to claim ownership of what your company builds.
                  </p>
                  <p className="text-xs text-[var(--page-fg)] font-medium">
                    For embedded engagements, commercial terms, engineer
                    compensation, and Blockfuse fees are clearly agreed before
                    work begins.
                  </p>
                </div>
              </div>
            </div>

            {/* Curated Matching */}
            <div className="surface-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="eyebrow">
                  Curated Matchmaking
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  A curated network, not another CV database.
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  <p>
                    We do not introduce every graduate to every company.
                  </p>
                  <p>
                    Each match is based on the role, required skills, level of
                    experience, availability, and working environment. When we
                    recommend an engineer, we should be able to explain why
                    that person is a credible match for your team.
                  </p>
                  <p>
                    This approach keeps the standard meaningful and protects
                    everyone&apos;s time.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[var(--line)]">
                <p className="text-xs text-[var(--muted)]">
                  Need Blockfuse to own the technical delivery instead?{" "}
                  <Link
                    href="/engineering"
                    className="text-[var(--accent)] font-semibold hover:underline"
                  >
                    Explore engineering services.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 8. FOR PROTOCOL ECOSYSTEMS AND FUNDING PARTNERS */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              Ecosystem Development
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              For protocol ecosystems and funding partners
            </h2>

            <p className="mt-4 text-base text-[var(--muted)] sm:text-lg leading-relaxed">
              Technology ecosystems grow when developers can build useful,
              secure, and maintainable applications, not when they merely attend
              workshops.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8">
              <p className="font-semibold text-sm uppercase tracking-wider text-[var(--page-fg)]">
                Blockfuse can design and operate a complete talent-development
                program for your ecosystem, including:
              </p>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--muted)]">
                {ecosystemPartnerServices.map((srv) => (
                  <li key={srv} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
              Programs can sponsor an entire cohort or provide funded places
              within an existing Blockfuse program.
            </p>

            <div className="mt-8">
              <ButtonLink href="/contact?intent=partner">
                Build a talent pipeline with us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 9. WHAT EMPLOYERS SAY */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">
              Employer Endorsements
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What employers say
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {employerTestimonials.map((item) => (
              <blockquote
                key={item.author}
                className="surface-card flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25"
              >
                <p className="text-base italic leading-relaxed text-[var(--page-fg)] sm:text-lg">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-[var(--line)] pt-4">
                  <p className="font-bold text-sm text-[var(--page-fg)]">
                    {item.author}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{item.role}</p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 10. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-transparent p-px shadow-2xl">
          <div className="rounded-2xl bg-[var(--surface-2)] p-8 text-center sm:p-14 md:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
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
              <ButtonLink href="/contact?intent=hire">
                Start a hiring conversation
              </ButtonLink>
              <ButtonLink href="/contact?intent=sponsor" variant="secondary">
                Sponsor a cohort
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


