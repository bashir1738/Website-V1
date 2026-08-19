import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "ProdFest: Where builders show the work | Blockfuse Labs",
  description:
    "ProdFest brings together developers, founders, product people, employers, and ecosystem partners around work that actually got built: demos, technical sessions, and conversations.",
};

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
      <div className="section-divider" />
    </div>
  );
}

export default function ProdFestPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[var(--accent)]/8 blur-[120px] md:h-[48rem] md:w-[48rem]" />
      <div className="pointer-events-none absolute right-10 top-[40rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/3 blur-[120px]" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-40 ">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              PRODFEST
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">
              Execution Over Talk
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08]">
            Where builders{" "}
            <span className="gradient-text">show the work.</span>
          </h1>

          {/* Paragraphs */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              ProdFest brings together developers, founders, product people,
              employers, and ecosystem partners around work that actually got
              built: demos, technical sessions, and the conversations that
              follow.
            </p>
            <p className="font-semibold text-[var(--accent)]">
              Plenty of events celebrate ideas. ProdFest is for execution.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/contact?intent=prodfest">
              Ask about the next edition
            </ButtonLink>
            <ButtonLink href="#get-involved" variant="secondary">
              Get involved
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DEMO STAGE SHOWCASE FRAME */}
      {/* ========================================================================= */}
      <section className="px-5 py-8 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card group relative overflow-hidden rounded-2xl border border-[var(--line)] p-8 sm:p-14 shadow-2xl transition-all duration-300 hover:border-[var(--accent)]/25">
            {/* Background subtle mesh / pattern */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#bf64e7_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

            <div className="flex flex-col items-center justify-center text-center min-h-[18rem] sm:min-h-[22rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Placeholder Showcase
              </div>
              <h3 className="mt-5 text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
                ProdFest demo stage
              </h3>
              <p className="mt-3 max-w-md text-sm text-[var(--muted)] sm:text-base leading-relaxed">
                Live product walkthroughs, real-time code reviews, and working
                software demos presented by engineers.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--muted)] text-left px-2 italic">
            A demo session at ProdFest.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. WHY WE RUN IT */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="surface-card rounded-2xl p-8 sm:p-12">
            <span className="eyebrow">
              Proof Over Promises
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              Why we run it
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              <p>
                ProdFest is where the Blockfuse community becomes visible to the
                people who can hire, fund, and partner with it. Engineers show
                real projects. Companies meet talent without a recruitment
                process. Ecosystems reach developers who are already building.
              </p>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 font-semibold text-[var(--page-fg)] leading-relaxed">
                It is also the clearest answer to the question our whole company
                is built around: what can these engineers actually do? At
                ProdFest, you do not have to take our word for it.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. GET INVOLVED */}
      {/* ========================================================================= */}
      <section id="get-involved" className="px-5 py-24 sm:px-8  scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">
              Participation
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Get involved
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Attend */}
            <div className="surface-card group flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25 sm:p-8">
              <div>
                <span className="eyebrow">
                  01
                </span>
                <h3 className="mt-3 text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                  Attend
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                  Registration for the next edition opens ahead of the event.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <Link
                  href="/contact?intent=prodfest-attend"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Join attendee waitlist</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Speak or Demo */}
            <div className="surface-card group flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25 sm:p-8">
              <div>
                <span className="eyebrow">
                  02
                </span>
                <h3 className="mt-3 text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                  Speak or demo
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                  If you have shipped something worth showing, we want it on the
                  schedule.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <Link
                  href="/contact?intent=prodfest-speak"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Submit a demo or talk</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Sponsor */}
            <div className="surface-card group flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/25 sm:p-8">
              <div>
                <span className="eyebrow">
                  03
                </span>
                <h3 className="mt-3 text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                  Sponsor
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                  Reach a room of engineers who build. Sponsorship packages
                  available on request.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <Link
                  href="/contact?intent=prodfest-sponsor"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Request sponsor pack</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <ButtonLink href="/contact?intent=prodfest">
              Ask about the next edition
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-transparent p-px shadow-2xl">
          <div className="rounded-2xl bg-[var(--surface-2)] p-8 text-center sm:p-14 md:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Execution is the only proof.
              <br />
              <span className="gradient-text">See you at ProdFest.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Whether you are an engineer looking to demo, a company looking to
              meet verified talent, or an ecosystem partner looking to connect,
              ProdFest is where it happens.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonLink href="/contact?intent=prodfest">
                Contact the ProdFest Team
              </ButtonLink>
              <ButtonLink href="/training" variant="secondary">
                Explore Academy
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


