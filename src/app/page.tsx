import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HeroTitle } from "@/components/ui/hero-title";
import { Marquee } from "@/components/ui/marquee";
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
      {/* 1. HERO — Full viewport, grain overlay, word reveal */}
      {/* ================================================================= */}
      <section className="relative flex min-h-screen flex-col justify-center px-5 pb-20 pt-28 sm:px-8">
        {/* Grain texture */}
        <div className="grain-overlay" />

        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Jos, Nigeria
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">
              Cohort III Applications Open
            </span>
          </div>

          {/* Main Headline — Word reveal animation */}
          <HeroTitle
            text="Training engineers for the AI-native world. Building dependable software."
            className="mt-8 font-heading text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.06]"
            startDelay={400}
          />

          {/* Paragraphs */}
          <ScrollReveal className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={2}>
            <p>
              Blockfuse Labs identifies people with potential and develops them
              into production-ready software engineers, the kind companies
              actually want to hire.
            </p>
            <p>
              The training is deliberately hard. Admission is selective, the
              workload is heavy, projects ship to real deadlines, and every line
              of code is reviewed by working engineers.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={3}>
            <ButtonLink href="/training">Apply to a program</ButtonLink>
            <ButtonLink href="/talent" variant="secondary">
              Hire Blockfuse engineers
            </ButtonLink>
          </ScrollReveal>

          {/* Subtext */}
          <ScrollReveal className="mt-6" delay={4}>
            <p className="text-sm text-[var(--muted)]">
              Need software built?{" "}
              <Link
                href="/engineering"
                className="link-hover font-medium text-[var(--page-fg)]"
              >
                Start an engineering project.
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. STATS MARQUEE BAR */}
      {/* ================================================================= */}
      <div className="border-y border-[var(--line)] py-4">
        <Marquee duration={20}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-8 sm:px-12"
            >
              <span className="font-heading text-2xl font-bold text-[var(--page-fg)] sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-[var(--muted)] sm:text-sm max-w-[12rem]">
                {stat.label}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* ================================================================= */}
      {/* 3. COHORT SHOWCASE */}
      {/* ================================================================= */}
      <section className="px-5 py-20 sm:px-8">
        <ScrollReveal className="mx-auto max-w-6xl">
          <div className="surface-card relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--surface-2)] flex flex-col items-center justify-center p-8 text-center">
              {/* Dot grid pattern */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Status pills */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[var(--muted)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  Jos Production Space
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[var(--muted)]">
                  Cohort II In Session
                </span>
              </div>

              {/* Central content */}
              <div className="relative z-10 max-w-lg space-y-3">
                <span className="eyebrow">WORKSPACE</span>
                <h3 className="font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
                  Cohort at work
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Replace with a photo of students building in the Jos space
                </p>
              </div>

              {/* Bottom coordinate */}
              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-[var(--muted)] font-mono">
                  Jos, Plateau State • 09.8965° N, 8.8583° E
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--muted)] sm:text-sm">
            Cohort II at work in the Blockfuse space, Jos.
          </p>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 4. THE GAP IS NOT TALENT — Statement typography */}
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
      {/* 5. HOW BLOCKFUSE WORKS — Stacked cards */}
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
                <div className="surface-card relative overflow-hidden rounded-2xl p-6 sm:p-8">
                  {/* Watermark number */}
                  <span className="step-number">{step.number}</span>

                  <div className="relative z-10 flex items-start gap-5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] font-heading text-sm font-bold text-white">
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 6. AI-NATIVE PHILOSOPHY */}
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
            <div className="rounded-2xl border border-[var(--accent)]/15 bg-[var(--accent)]/5 p-6 sm:p-8">
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
      {/* 7. CHOOSE YOUR PATH — Program cards */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">Curriculum & Specialisations</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Choose your path
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {programPaths.map((program, i) => (
              <ScrollReveal key={program.title} delay={i < 4 ? i + 1 : 4}>
                <div className="surface-card surface-card-accent flex h-full flex-col justify-between rounded-2xl p-7 sm:p-9">
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

                  <div className="mt-8 border-t border-[var(--line)] pt-5">
                    <p className="text-xs font-medium leading-relaxed text-[var(--muted)] sm:text-sm">
                      {program.audience}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 flex justify-center" delay={3}>
            <ButtonLink href="/training">Explore our programs</ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 8. FOR STUDENTS — Become an engineer */}
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
            <div className="surface-card rounded-2xl p-6 sm:p-8">
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
            </div>
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
            <ButtonLink href="/training">Apply to the next cohort</ButtonLink>
            <ButtonLink href="/training" variant="secondary">
              See what training involves
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 9. FOR ORGANISATIONS — Hire engineers */}
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
            <div className="surface-card rounded-2xl p-6 sm:p-8">
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
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={3}>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Tell us the capabilities your team needs. We will help you find,
              or develop, the right people.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={4}>
            <ButtonLink href="/talent">Hire Blockfuse engineers</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Discuss a talent partnership
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 10. ENGINEERING STUDIO */}
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
            <ButtonLink href="/engineering">
              Explore engineering services
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 11. PARTNERS & IMPACT */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Ecosystem & Impact</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Partner with us to expand access to opportunity.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p>
              We work with technology companies, protocol ecosystems,
              development organisations, and funders that want to build
              sustainable engineering talent pipelines.
            </p>
            <p>
              Partners can sponsor cohorts, fund scholarships, contribute
              technical expertise, create employment pathways, or support
              programs designed around specific technologies.
            </p>
            <p>
              Every partnership is tied to measurable outcomes: people
              trained, skills demonstrated, projects completed, and
              opportunities created.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10" delay={2}>
            <ButtonLink href="/contact">Become a partner</ButtonLink>
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
            <ButtonLink href="/prodfest">Discover ProdFest</ButtonLink>
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
            <ButtonLink href="/training">Apply to Blockfuse</ButtonLink>
            <ButtonLink href="/talent" variant="secondary">
              Hire our graduates
            </ButtonLink>
            <ButtonLink href="/engineering" variant="secondary">
              Start a project
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Partner with us
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
