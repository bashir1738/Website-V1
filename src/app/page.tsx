import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import { Marquee } from "@/components/ui/marquee";
import { TiltCard } from "@/components/ui/tilt-card";
import { CounterStat } from "@/components/ui/counter-stat";
import { InteractiveReviewWidget } from "@/components/ui/interactive-review-widget";
import {
  stats,
  howBlockfuseWorks,
  programPaths,
  engineerBenefits,
  orgWorkWithUsPoints,
} from "@/lib/content";

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
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ================================================================= */}
      {/* 1. HERO — Full viewport, kinetic typography, live HUD, word cycler */}
      {/* ================================================================= */}
      <section className="relative flex min-h-[92vh] flex-col justify-center px-5 pb-20 pt-28 sm:px-8 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Main Headline — Kinetic Word Springs & Word Cycler */}
          <div>
            <KineticHeroTitle
              prefix="Training engineers for the"
              cycleWords={["AI-native", "Production-Ready", "Decentralized", "High-Stakes"]}
              suffix="world. Building dependable software."
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.06]"
            />
          </div>

          {/* Subheading with interactive highlights */}
          <ScrollReveal className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={2}>
            <p>
              Blockfuse Labs identifies people with potential and develops them
              into <strong className="text-[var(--page-fg)] font-semibold">production-ready software engineers</strong>, the kind companies
              actually want to hire.
            </p>
            <p>
              The training is deliberately hard. Admission is selective, the
              workload is heavy, projects ship to real deadlines, and every line
              of code is reviewed by working engineers.
            </p>
          </ScrollReveal>

          {/* CTAs with magnetic hover */}
          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={3}>
            <ButtonLink href="/training" dataCursor="APPLY">
              Apply to a program
            </ButtonLink>
            <ButtonLink href="/talent" variant="secondary" dataCursor="HIRE">
              Hire Blockfuse engineers
            </ButtonLink>
          </ScrollReveal>

          {/* Subtext Link */}
          <ScrollReveal className="mt-6" delay={4}>
            <p className="text-sm text-[var(--muted)]">
              Need software built?{" "}
              <Link
                href="/engineering"
                className="link-hover font-semibold text-[var(--page-fg)]"
              >
                Start an engineering project →
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. STATS MARQUEE BAR WITH LIVE COUNTERS */}
      {/* ================================================================= */}
      <div className="border-y border-[var(--line)] bg-[var(--card)]/40 py-5 backdrop-blur-md">
        <Marquee duration={22}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3.5 px-8 sm:px-12"
            >
              <span className="font-heading text-2xl font-bold gradient-text sm:text-3xl">
                <CounterStat value={stat.value} />
              </span>
              <span className="text-xs font-medium text-[var(--muted)] sm:text-sm max-w-[13rem] leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* ================================================================= */}
      {/* 3. INTERACTIVE CODE REVIEW & READINESS INSPECTOR */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">Interactive Verification</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Proof over promises.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              Explore how Blockfuse engineers evaluate code vs unverified AI output.
              Click highlighted lines to inspect senior reviewer feedback or run a live readiness audit.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            <ScrollReveal delay={1}>
              <InteractiveReviewWidget />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 4. COHORT SHOWCASE WITH 3D TILT */}
      {/* ================================================================= */}
      <section className="px-5 py-20 sm:px-8">
        <ScrollReveal className="mx-auto max-w-6xl">
          <TiltCard
            dataCursorText="CAMPUS"
            className="overflow-hidden rounded-3xl border border-[var(--line-strong)]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--surface-2)] flex flex-col items-center justify-center p-8 text-center min-h-[22rem] sm:min-h-[28rem]">
              {/* Dot grid background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Header Info */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span className="flex items-center gap-2 text-[var(--page-fg)] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Production Workspace
                </span>
                <span className="hidden sm:inline">
                  Cohort II • 115 Engineers
                </span>
              </div>

              {/* Central text content */}
              <div className="relative z-10 max-w-lg space-y-3">
                <span className="eyebrow text-[var(--accent)]">WORKSPACE</span>
                <h3 className="font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
                  Cohort at work
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                  Jos Production Space: where real systems get designed, reviewed, benchmarked, and shipped.
                </p>
              </div>

              {/* Bottom coordinates HUD */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-[var(--muted)] font-mono">
                <span>09.8965° N, 8.8583° E</span>
                <span className="hidden sm:inline">PLATEAU STATE • NIGERIA</span>
              </div>
            </div>
          </TiltCard>
          <p className="mt-3 text-center text-xs text-[var(--muted)] sm:text-sm">
            Cohort II at work in the Blockfuse production space, Jos.
          </p>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 5. THE GAP IS NOT TALENT — Statement typography */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">The Core Reality</span>
          </ScrollReveal>

          <ScrollReveal blur className="mt-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl lg:text-6xl">
              The gap is not talent.{" "}
              <span className="gradient-text">It is proof.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p>
              Thousands of people want careers in technology. Companies need
              capable engineers. But traditional courses rarely prove that
              someone can contribute to real software.
            </p>
            <p className="font-medium text-[var(--page-fg)]">
              Blockfuse closes that gap.
            </p>
            <p>
              We turn potential into practical ability, and practical ability
              into credible opportunities. Our students do more than complete
              lessons. They build, they get told plainly what is not good
              enough yet, they work under professional review, and they finish
              with something a hiring manager can open and examine.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 6. HOW BLOCKFUSE WORKS — 3D Tilt Cards */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">The System</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              How Blockfuse works
            </h2>
          </ScrollReveal>

          <div className="mt-14 space-y-6">
            {howBlockfuseWorks.map((step, i) => (
              <ScrollReveal key={step.number} delay={i < 3 ? i + 1 : 3}>
                <TiltCard dataCursorText="STEP" className="p-6 sm:p-8">
                  {/* Watermark number */}
                  <span className="step-number">{step.number}</span>

                  <div className="relative z-10 flex items-start gap-5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] font-heading text-sm font-bold text-white shadow-md">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                        {step.description}
                      </p>
                      {step.subDescription && (
                        <p className="mt-3 text-sm font-medium text-[var(--page-fg)]">
                          {step.subDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 7. AI-NATIVE PHILOSOPHY */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Philosophy</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              AI-native, grounded in engineering.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p>
              AI is changing how software is built. That does not make
              engineering fundamentals less important. It makes judgment more
              important.
            </p>
            <p>
              Our students learn to use AI to research, build, test, debug, and
              document software more effectively. But they are still expected
              to understand their code, reason through trade-offs, design
              reliable systems, protect user data, and take responsibility for
              what they ship.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/6 p-6 sm:p-8 backdrop-blur-sm">
              <p className="text-base font-semibold text-[var(--page-fg)] sm:text-lg">
                We are not training people to depend on AI.
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--accent)] sm:text-lg">
                We are training people who know how to use it well.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 8. CHOOSE YOUR PATH — Program Tilt Cards */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">Curriculum & Specialisations</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Choose your path
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {programPaths.map((program, i) => (
              <ScrollReveal key={program.title} delay={i < 4 ? i + 1 : 4}>
                <TiltCard
                  dataCursorText="EXPLORE"
                  className="surface-card-accent flex h-full flex-col justify-between p-7 sm:p-9"
                >
                  <div>
                    {program.tagline && (
                      <span className="eyebrow text-[var(--accent)]">
                        {program.tagline}
                      </span>
                    )}
                    <h3 className="mt-2 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                      {program.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                      {program.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[var(--line)] pt-5 flex items-center justify-between">
                    <p className="text-xs font-medium leading-relaxed text-[var(--muted)] sm:text-sm">
                      {program.audience}
                    </p>
                    <span className="text-sm font-bold text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 flex justify-center" delay={3}>
            <ButtonLink href="/training" dataCursor="PROGRAMS">
              Explore our programs
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 9. FOR STUDENTS — Become an engineer */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">For Students & Engineers</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Become an engineer your work can speak for.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-6" delay={1}>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              You do not need another course that leaves you with videos watched
              and nothing meaningful to show. This one will ask more of you than
              that.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            <TiltCard className="p-6 sm:p-8">
              <p className="font-heading font-semibold text-[var(--page-fg)]">
                At Blockfuse, you will:
              </p>
              <ul className="mt-5 space-y-3.5 text-sm text-[var(--muted)] sm:text-base">
                {engineerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={3}>
            <p>
              What you do with it is yours to decide. Most people here want a
              job worth having. Some want to build their own thing. Both are
              good reasons to be in the room.
            </p>
            <p className="font-medium text-[var(--page-fg)]">
              We will provide the training, standards, feedback, and
              opportunities.
            </p>
            <p className="font-medium text-[var(--accent)]">
              You must bring the commitment.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={4}>
            <ButtonLink href="/training" dataCursor="APPLY">
              Apply to the next cohort
            </ButtonLink>
            <ButtonLink href="/training" variant="secondary" dataCursor="CURRICULUM">
              See what training involves
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 10. FOR ORGANISATIONS — Hire engineers */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">For Organisations & Companies</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Hire engineers who have already been tested.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p>
              Finding applicants is easy. Identifying engineers who can
              actually contribute is harder.
            </p>
            <p>
              Blockfuse gives companies access to engineers who have been
              through a demanding program, built working systems, had their
              code reviewed by working engineers, and passed a structured
              readiness assessment.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            <TiltCard className="p-6 sm:p-8">
              <p className="font-heading font-semibold text-[var(--page-fg)]">
                Organisations can work with us to:
              </p>
              <ul className="mt-5 space-y-3.5 text-sm text-[var(--muted)] sm:text-base">
                {orgWorkWithUsPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={3}>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Tell us the capabilities your team needs. We will help you find,
              or develop, the right people.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={4}>
            <ButtonLink href="/talent" dataCursor="TALENT">
              Hire Blockfuse engineers
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" dataCursor="PARTNER">
              Discuss a talent partnership
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 11. ENGINEERING STUDIO */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Senior Engineering Studio</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Or have us build it.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p>
              Some organisations do not need engineers to hire. They need the
              work done.
            </p>
            <p>
              Our senior engineers take on a limited number of engagements
              each year: technical advisory when a decision is expensive,
              discovery when the shape of the solution is unclear, and
              senior-led delivery of AI, web, blockchain, and backend systems.
            </p>
            <p>
              Your code, infrastructure, and intellectual property stay
              yours. Every engagement is led by a senior engineer who is
              accountable for the outcome.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10" delay={2}>
            <ButtonLink href="/engineering" dataCursor="SERVICES">
              Explore engineering services
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 12. PRODFEST */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Flagship Event</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              ProdFest: where talent meets opportunity.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p>
              ProdFest is Blockfuse&apos;s platform for engineers to demonstrate
              what they can build.
            </p>
            <p>
              It brings together developers, employers, founders, ecosystem
              partners, and members of the technology community to discover
              talent, exchange knowledge, and celebrate products that actually
              got built.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10" delay={2}>
            <ButtonLink href="/prodfest" dataCursor="PRODFEST">
              Discover ProdFest
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 13. FINAL CTA */}
      {/* ================================================================= */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal blur>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Potential deserves a path.
              <br />
              <span className="gradient-text">Companies deserve proof.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mx-auto mt-8 max-w-2xl" delay={1}>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Whether you want to become an engineer worth hiring, hire one, have
              a product built, or help create more opportunities for developers
              coming up behind you, Blockfuse is where that starts.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4" delay={2}>
            <ButtonLink href="/training" dataCursor="APPLY">Apply to Blockfuse</ButtonLink>
            <ButtonLink href="/talent" variant="secondary" dataCursor="TALENT">
              Hire our graduates
            </ButtonLink>
            <ButtonLink href="/engineering" variant="secondary" dataCursor="BUILD">
              Start a project
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" dataCursor="PARTNER">
              Partner with us
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
