import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import { TiltCard } from "@/components/ui/tilt-card";
import { CounterStat } from "@/components/ui/counter-stat";
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
      className="check-accent mt-0.5 h-5 w-5 shrink-0"
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
    <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
      <div className="section-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ================================================================= */}
      {/* 1. HERO */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-7 sm:pt-24">
        {/* Origin Hero Illustration from blockfuselabs/website (circles.svg) */}
        <div className="pointer-events-none absolute right-0 top-1/2 -z-10 w-[550px] max-w-none -translate-y-1/2 translate-x-1/4 select-none opacity-20 blur-[0.5px] transition-opacity sm:w-[700px] lg:w-[850px] lg:translate-x-10 dark:opacity-30">
          <Image
            src="/brand/hero-circles.svg"
            alt="Blockfuse hero ambient illustration"
            width={711}
            height={652}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px]">
          <div className="max-w-5xl">
            <KineticHeroTitle
              prefix="Training engineers for the"
              cycleWords={[
                "AI-native",
                "Production-Ready",
                "Decentralized",
                "High-Stakes",
              ]}
              suffix="world. Building dependable software."
              className="text-[clamp(2.75rem,6.2vw,5.125rem)] font-bold leading-[0.98] tracking-[-0.035em]"
            />
          </div>

          <ScrollReveal
            className="mt-9 max-w-[58ch] space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-[18.5px] sm:leading-[1.6]"
            delay={2}
          >
            <p>
              Blockfuse Labs identifies people with potential and develops them
              into{" "}
              <strong className="font-semibold text-[var(--page-fg)]">
                production-ready software engineers
              </strong>
              , the kind companies actually want to hire.
            </p>
            <p>
              The training is deliberately hard. Admission is selective, the
              workload is heavy, projects ship to real deadlines, and every line
              of code is reviewed by working engineers.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-9 flex flex-wrap gap-3" delay={3}>
            <ButtonLink href="#choose-your-path">Apply to a program</ButtonLink>
            <ModalButton modal="hire" variant="secondary" arrow={false}>
              Hire our engineers
            </ModalButton>
          </ScrollReveal>

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
      {/* 2. STATS — hairline grid */}
      {/* ================================================================= */}
      <section className="px-5 pb-24 sm:px-7">
        <ScrollReveal className="mx-auto max-w-[1240px]">
          <div className="hairline-grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="hairline-cell px-7 py-8">
                <div className="stat-figure text-[clamp(2rem,4vw,2.625rem)]">
                  <CounterStat value={stat.value} />
                </div>
                <div className="mt-3 text-[13px] leading-normal text-[var(--muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================= */}
      {/* 3. PROGRAMS — Choose your path (target of every generic Apply CTA) */}
      {/* ================================================================= */}
      <section id="choose-your-path" className="scroll-mt-24 px-5 pb-24 sm:px-7">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal>
            <span className="eyebrow">Curriculum &amp; Specialisations</span>
            <h2 className="mt-4 font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              Choose your path
            </h2>
            <p className="mt-3.5 max-w-[54ch] text-base leading-relaxed text-[var(--muted)]">
              Each track runs to professional deadlines and ends in an
              assessment, not a certificate ceremony.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {programPaths.map((program, i) => (
              <ScrollReveal key={program.title} delay={Math.min(i + 1, 4)}>
                <div className="surface-card card-ruled flex h-full flex-col px-6 pb-6 pt-7 hover:-translate-y-1">
                  <div className="mb-4 font-mono text-[10.5px] tracking-[0.16em] text-[var(--dim)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading text-xl font-bold leading-tight tracking-[-0.02em] text-[var(--page-fg)]">
                    {program.title}
                  </h3>
                  {program.tagline && (
                    <div className="mb-3.5 mt-2 text-xs font-medium text-[var(--accent)]">
                      {program.tagline}
                    </div>
                  )}
                  <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
                    {program.description}
                  </p>
                  <p className="mt-4 flex-1 text-[12.5px] leading-relaxed text-[var(--dim)]">
                    {program.audience}
                  </p>
                  <div className="mt-6">
                    <ModalButton
                      modal={i === 3 ? "hire" : "program"}
                      variant="link"
                      prefill={i === 3 ? undefined : { Track: program.title }}
                    >
                      Apply
                    </ModalButton>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10" delay={2}>
            <ButtonLink href="/training" variant="secondary">
              Explore our programs
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. PRODFEST + OPEN SOURCE */}
      {/* ================================================================= */}
      <section className="px-5 pb-24 sm:px-7">
        <div className="mx-auto grid max-w-[1240px] gap-[18px] lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <div className="feature-panel h-full px-8 py-10 sm:px-9">
              <div className="eyebrow !text-[var(--accent-soft)]">
                Flagship event
              </div>
              <h3 className="mt-4 font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
                ProdFest 2026
              </h3>
              <p className="mt-3.5 max-w-[46ch] text-[15px] leading-relaxed text-[var(--bright)]">
                One day, one stage. Cohort teams ship in front of founders,
                investors, and ecosystem partners — and the room decides what
                deserves to keep going.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <ModalButton modal="prodfest" variant="contrast" arrow={false}>
                  Register interest <span aria-hidden="true">→</span>
                </ModalButton>
                <ModalButton modal="sponsor" variant="ghost" arrow={false}>
                  Sponsor
                </ModalButton>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="surface-card flex h-full flex-col justify-between gap-6 !rounded-[22px] px-7 py-8">
              <div>
                <div className="eyebrow">Open source</div>
                <h3 className="mt-4 font-heading text-[22px] font-bold tracking-[-0.02em] text-[var(--page-fg)]">
                  Build in public with us
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--muted)]">
                  Six repos maintained by students and residents. Contributions
                  reviewed the same way client work is.
                </p>
              </div>
              <Link href="/open-source" className="link-action !border-b-0">
                See the repos
                <span aria-hidden="true" className="arrow">
                  →
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 5. COHORT SHOWCASE */}
      {/* ================================================================= */}
      <section className="px-5 py-20 sm:px-7">
        <ScrollReveal className="mx-auto max-w-[1240px]">
          <TiltCard
            dataCursorText="CAMPUS"
            className="overflow-hidden !rounded-3xl border border-[var(--line-strong)]"
          >
            <div className="relative flex min-h-[22rem] w-full flex-col items-center justify-center overflow-hidden bg-[var(--surface-2)] p-8 text-center sm:min-h-[28rem]">
              {/* Dot grid background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="absolute left-6 right-6 top-6 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
                <span className="flex items-center gap-2 font-semibold text-[var(--page-fg)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Production Workspace
                </span>
                <span className="hidden sm:inline">
                  Cohort II • 115 Engineers
                </span>
              </div>

              <div className="relative z-10 max-w-lg space-y-3">
                <span className="eyebrow">Workspace</span>
                <h3 className="font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
                  Cohort at work
                </h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-[var(--muted)]">
                  Jos Production Space: where real systems get designed,
                  reviewed, benchmarked, and shipped.
                </p>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
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
      {/* 6. THE GAP IS NOT TALENT */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">The Core Reality</span>
          </ScrollReveal>

          <ScrollReveal blur className="mt-5">
            <h2 className="font-heading text-[clamp(1.875rem,4.4vw,3.5rem)] font-bold tracking-[-0.035em] text-[var(--page-fg)]">
              The gap is not talent.{" "}
              <span className="gradient-text">It is proof.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal
            className="mt-8 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8"
            delay={1}
          >
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
              lessons. They build, they get told plainly what is not good enough
              yet, they work under professional review, and they finish with
              something a hiring manager can open and examine.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 7. HOW BLOCKFUSE WORKS */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">The System</span>
            <h2 className="mt-4 font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              How Blockfuse works
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {howBlockfuseWorks.map((step, i) => (
              <ScrollReveal key={step.number} delay={i < 3 ? i + 1 : 3}>
                <TiltCard dataCursorText="STEP" className="p-6 sm:p-8">
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
      {/* 8. AI-NATIVE PHILOSOPHY */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Philosophy</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              AI-native, grounded in engineering.
            </h2>
          </ScrollReveal>

          <ScrollReveal
            className="mt-8 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8"
            delay={1}
          >
            <p>
              AI is changing how software is built. That does not make
              engineering fundamentals less important. It makes judgment more
              important.
            </p>
            <p>
              Our students learn to use AI to research, build, test, debug, and
              document software more effectively. But they are still expected to
              understand their code, reason through trade-offs, design reliable
              systems, protect user data, and take responsibility for what they
              ship.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            <div className="rounded-[20px] border border-[var(--accent-line)] bg-[var(--accent-dim)] p-6 backdrop-blur-sm sm:p-8">
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
      {/* 9. FOR STUDENTS */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">For Students &amp; Engineers</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
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

          <ScrollReveal
            className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8"
            delay={3}
          >
            <p>
              What you do with it is yours to decide. Most people here want a job
              worth having. Some want to build their own thing. Both are good
              reasons to be in the room.
            </p>
            <p className="font-medium text-[var(--page-fg)]">
              We will provide the training, standards, feedback, and
              opportunities.
            </p>
            <p className="font-medium text-[var(--accent)]">
              You must bring the commitment.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-wrap gap-3" delay={4}>
            <ButtonLink href="#choose-your-path">Apply to the next cohort</ButtonLink>
            <ButtonLink href="/training" variant="secondary">
              See what training involves
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 10. FOR ORGANISATIONS */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">For Organisations &amp; Companies</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              Hire engineers who have already been tested.
            </h2>
          </ScrollReveal>

          <ScrollReveal
            className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8"
            delay={1}
          >
            <p>
              Finding applicants is easy. Identifying engineers who can actually
              contribute is harder.
            </p>
            <p>
              Blockfuse gives companies access to engineers who have been through
              a demanding program, built working systems, had their code reviewed
              by working engineers, and passed a structured readiness assessment.
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
              Tell us the capabilities your team needs. We will help you find, or
              develop, the right people.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-wrap gap-3" delay={4}>
            <ModalButton modal="hire">Hire Blockfuse engineers</ModalButton>
            <ModalButton modal="sponsor" variant="secondary" arrow={false}>
              Discuss a talent partnership
            </ModalButton>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 11. ENGINEERING STUDIO */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Senior Engineering Studio</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              Or have us build it.
            </h2>
          </ScrollReveal>

          <ScrollReveal
            className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8"
            delay={1}
          >
            <p>
              Some organisations do not need engineers to hire. They need the
              work done.
            </p>
            <p>
              Our senior engineers take on a limited number of engagements each
              year: technical advisory when a decision is expensive, discovery
              when the shape of the solution is unclear, and senior-led delivery
              of AI, web, blockchain, and backend systems.
            </p>
            <p>
              Your code, infrastructure, and intellectual property stay yours.
              Every engagement is led by a senior engineer who is accountable for
              the outcome.
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
      {/* 12. PRODFEST */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">Flagship Event</span>
          </ScrollReveal>
          <ScrollReveal blur className="mt-4">
            <h2 className="font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              ProdFest: where talent meets opportunity.
            </h2>
          </ScrollReveal>

          <ScrollReveal
            className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8"
            delay={1}
          >
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

          <ScrollReveal className="mt-10 flex flex-wrap gap-3" delay={2}>
            <ButtonLink href="/prodfest">Discover ProdFest</ButtonLink>
            <ButtonLink href="/events" variant="secondary">
              See all events
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 13. FINAL CTA */}
      {/* ================================================================= */}
      <section className="px-5 py-28 sm:px-7">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal blur>
            <h2 className="font-heading text-[clamp(1.875rem,5vw,3.75rem)] font-bold tracking-[-0.035em] text-[var(--page-fg)]">
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

          <ScrollReveal
            className="mt-12 flex flex-wrap justify-center gap-3.5"
            delay={2}
          >
            <ButtonLink href="#choose-your-path">Apply to Blockfuse</ButtonLink>
            <ModalButton modal="hire" variant="secondary" arrow={false}>
              Hire our graduates
            </ModalButton>
            <ButtonLink href="/engineering" variant="secondary">
              Start a project
            </ButtonLink>
            <ModalButton modal="sponsor" variant="secondary" arrow={false}>
              Partner with us
            </ModalButton>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
