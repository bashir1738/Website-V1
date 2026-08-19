import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
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
      className="h-5 w-5 shrink-0 text-brand-violet mt-0.5"
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Background ambient light effects */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px] md:h-[48rem] md:w-[48rem]" />
      <div className="pointer-events-none absolute right-10 top-[40rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-indigo/10 blur-[100px]" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Screenshot 1) */}
      {/* ========================================================================= */}
      <section className="relative px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-violet animate-pulse" />
              Jos, Nigeria
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">
              Cohort III Applications Open
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08]">
            Training engineers for the{" "}
            <span className="gradient-text">AI-native</span> world.
            <br />
            Building dependable software.
          </h1>

          {/* Paragraphs */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
            <p>
              Blockfuse Labs identifies people with potential and develops them
              into production-ready software engineers, the kind companies
              actually want to hire.
            </p>
            <p>
              The training is deliberately hard. Admission is selective, the
              workload is heavy, projects ship to real deadlines, and every line
              of code is reviewed by working engineers. We push people because
              the work ahead of them will, whether they join a company or start
              one.
            </p>
            <p>
              Our senior engineers also work directly with organisations,
              designing and delivering dependable AI, web, and blockchain
              systems.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/training">Apply to a program</ButtonLink>
            <ButtonLink href="/talent" variant="secondary">
              Hire Blockfuse engineers
            </ButtonLink>
          </div>

          {/* Subtext Link */}
          <p className="mt-6 text-sm text-[var(--muted)]">
            Need software built?{" "}
            <Link
              href="/engineering"
              className="font-medium text-[var(--page-fg)] underline decoration-brand-violet/50 underline-offset-4 hover:decoration-brand-violet hover:text-brand-violet transition"
            >
              Start an engineering project.
            </Link>
          </p>

          {/* Stats Grid (Screenshot 1) */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40"
              >
                <p className="font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-[var(--muted)] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. COHORT WORKSPACE / MEDIA SHOWCASE (Screenshots 1 & 2) */}
      {/* ========================================================================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="glass group relative overflow-hidden rounded-[2rem] border border-[var(--line)] p-2 shadow-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-black/40 via-zinc-900/60 to-brand-black/80 flex flex-col items-center justify-center p-8 text-center">
              {/* Subtle tech background grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Status Header pills */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-white/80 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Jos Production Space
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-white/80 backdrop-blur">
                  Cohort II In Session
                </span>
              </div>

              {/* Central Box with Text */}
              <div className="relative z-10 max-w-lg space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold">
                  PLACEHOLDER IMAGE
                </span>
                <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  Cohort at work
                </h3>
                <p className="text-sm text-white/70">
                  Replace with a photo of students building in the Jos space
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-white/60 font-mono">
                  Jos, Plateau State • 09.8965° N, 8.8583° E
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--muted)] sm:text-sm">
            Cohort II at work in the Blockfuse space, Jos.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. THE GAP IS NOT TALENT. IT IS PROOF. (Screenshot 2) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              The Core Reality
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              The gap is not talent. It is proof.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. HOW BLOCKFUSE WORKS (Screenshots 2 & 3) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              The System
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              How Blockfuse works
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {howBlockfuseWorks.map((step) => (
              <div
                key={step.number}
                className="glass group relative rounded-[1.6rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/50 sm:p-8"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-indigo font-serif text-base font-bold text-white shadow-lg shadow-brand-indigo/25">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
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
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. AI-NATIVE, GROUNDED IN ENGINEERING (Screenshots 3 & 4) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Philosophy
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              AI-native, grounded in engineering.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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

              <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card-strong)] p-6">
                <p className="text-base font-semibold text-[var(--page-fg)] sm:text-lg">
                  We are not training people to depend on AI.
                </p>
                <p className="mt-2 text-base font-semibold gradient-text sm:text-lg">
                  We are training people who know how to use it well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. CHOOSE YOUR PATH (Screenshots 4 & 5) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Curriculum & Specialisations
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Choose your path
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {programPaths.map((program) => (
              <div
                key={program.title}
                className="glass group flex flex-col justify-between rounded-[1.8rem] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-violet/50 sm:p-9"
              >
                <div>
                  {program.tagline && (
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      {program.tagline}
                    </span>
                  )}
                  <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                    {program.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                    {program.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <p className="text-xs font-medium leading-relaxed text-[var(--muted)] sm:text-sm">
                    {program.audience}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <ButtonLink href="/training">Explore our programs</ButtonLink>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 7. BECOME AN ENGINEER YOUR WORK CAN SPEAK FOR (Screenshot 5) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              For Students & Engineers
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Become an engineer your work can speak for.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              You do not need another course that leaves you with videos watched
              and nothing meaningful to show. This one will ask more of you than
              that.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card-strong)] p-6 sm:p-8">
              <p className="font-semibold text-[var(--page-fg)]">
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

            <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              <p>
                What you do with it is yours to decide. Most people here want a
                job worth having. Some want to build their own thing. Both are
                good reasons to be in the room.
              </p>
              <p className="font-medium text-[var(--page-fg)]">
                We will provide the training, standards, feedback, and
                opportunities.
              </p>
              <p className="font-medium text-brand-violet">
                You must bring the commitment.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/training">Apply to the next cohort</ButtonLink>
              <ButtonLink href="/training" variant="secondary">
                See what training involves
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 8. HIRE ENGINEERS WHO HAVE ALREADY BEEN TESTED (Screenshot 6) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              For Organisations & Companies
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Hire engineers who have already been tested.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
            </div>

            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card-strong)] p-6 sm:p-8">
              <p className="font-semibold text-[var(--page-fg)]">
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

            <p className="mt-8 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Tell us the capabilities your team needs. We will help you find,
              or develop, the right people.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/talent">Hire Blockfuse engineers</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Discuss a talent partnership
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 9. OR HAVE US BUILD IT (Screenshots 6 & 7) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Senior Engineering Studio
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Or have us build it.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
            </div>

            <div className="mt-10">
              <ButtonLink href="/engineering">
                Explore engineering services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 10. PARTNER WITH US TO EXPAND ACCESS TO OPPORTUNITY (Screenshot 7) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Ecosystem & Impact
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Partner with us to expand access to opportunity.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
            </div>

            <div className="mt-10">
              <ButtonLink href="/contact">Become a partner</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 11. PRODFEST: WHERE TALENT MEETS OPPORTUNITY (Screenshot 7) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Flagship Event
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              ProdFest: where talent meets opportunity.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
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
            </div>

            <div className="mt-10">
              <ButtonLink href="/prodfest">Discover ProdFest</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 12. FINAL CTA BANNER (Screenshot 8) */}
      {/* ========================================================================= */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-brand-violet via-brand-indigo to-brand-black p-px shadow-2xl">
          <div className="rounded-[2.5rem] bg-[var(--page-bg)]/90 backdrop-blur-xl p-8 text-center sm:p-14 md:p-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Potential deserves a path.
              <br />
              <span className="gradient-text">Companies deserve proof.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Whether you want to become an engineer worth hiring, hire one, have
              a product built, or help create more opportunities for developers
              coming up behind you, Blockfuse is where that starts.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

