import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import {
  aboutBeliefs,
  aboutPartners,
  stats,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About Blockfuse Labs: built in Jos, working globally",
  description:
    "Blockfuse Labs trains engineers for the AI-native world and delivers dependable AI, web, and blockchain software from Jos, Nigeria.",
};


function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px] md:h-[48rem] md:w-[48rem]" />
      <div className="pointer-events-none absolute right-10 top-[50rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-indigo/10 blur-[100px]" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-violet animate-pulse" />
              About Blockfuse Labs
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">
              Jos, Nigeria
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08]">
            Talent should be judged by what it can build,{" "}
            <span className="gradient-text">not where it comes from.</span>
          </h1>

          {/* Lead & Paragraphs */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Blockfuse Labs trains engineers for the AI-native world and builds
              dependable software for organisations.
            </p>
            <p>
              We are based in Jos, Plateau State, Nigeria. Everything we do is
              built around one standard: the work has to hold up in the real
              world.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/training">Explore the Academy</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Work with us
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. WHAT WE DO */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Our Structure
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What we do
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Blockfuse Academy */}
            <div className="glass rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brand-violet/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  01 • Training
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Blockfuse Academy
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  The Academy finds people with potential and puts them through
                  a demanding, project-based program in AI-native software
                  engineering, applied AI, and blockchain.
                </p>
                <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card-strong)] p-4 text-xs sm:text-sm text-[var(--muted)]">
                  We assess students on what they can build, how they think, how
                  they communicate, and whether they can take responsibility
                  for real work. Not on attendance.
                </div>
              </div>
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <Link
                  href="/training"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:underline"
                >
                  <span>Explore the Academy</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Blockfuse Talent Network */}
            <div className="glass rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brand-violet/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  02 • Placement
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Blockfuse Talent Network
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Engineers who pass our production-readiness assessment become
                  Blockfuse Verified Engineers. Those approved for employer
                  introductions enter the Blockfuse Talent Network, which is what
                  companies hire from. Others use what they learned to start
                  something of their own.
                </p>
                <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card-strong)] p-4 text-xs sm:text-sm text-[var(--muted)]">
                  Companies get access to evaluated talent. Engineers get a
                  credible route from training to paid work.
                </div>
              </div>
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <Link
                  href="/talent"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:underline"
                >
                  <span>Hire Blockfuse engineers</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Blockfuse Engineering */}
            <div className="glass rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brand-violet/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  03 • Studio
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  Blockfuse Engineering
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Our senior engineers advise organisations and deliver AI, web,
                  blockchain, and backend systems.
                </p>
                <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card-strong)] p-4 text-xs sm:text-sm text-[var(--muted)]">
                  Client work keeps our technical leadership close to real
                  production problems, and gives the curriculum a direct
                  relationship with how software is actually built and
                  maintained.
                </div>
              </div>
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <Link
                  href="/engineering"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:underline"
                >
                  <span>Explore engineering services</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* ProdFest */}
            <div className="glass rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brand-violet/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  04 • Platform
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--page-fg)]">
                  ProdFest
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  ProdFest gives engineers and founders a stage to demonstrate
                  what they have built, and puts them in front of employers,
                  collaborators, funders, and technology ecosystems.
                </p>
                <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card-strong)] p-4 text-xs sm:text-sm text-[var(--muted)]">
                  The proving ground for execution over talk.
                </div>
              </div>
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <Link
                  href="/prodfest"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:underline"
                >
                  <span>Discover ProdFest</span>
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
      {/* 3. WHY TRAINING AND ENGINEERING BELONG TOGETHER */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              The Symbiosis
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              Why training and engineering belong together
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              <p>
                Training that is disconnected from professional practice goes
                stale quickly.
              </p>
              <p>
                Our engineering engagements show us what organisations are
                actually trying to build, where teams struggle, and which
                skills are becoming valuable. Those lessons go straight back
                into the Academy.
              </p>
              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--card-strong)] p-5 font-semibold text-[var(--page-fg)] leading-relaxed">
                The Academy, in turn, produces the engineers who make that
                delivery work possible. Each side keeps the other honest.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. WHAT WE BELIEVE */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Core Principles
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What we believe
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {aboutBeliefs.map((belief, idx) => (
              <div
                key={belief.title}
                className="glass group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 rounded-[1.6rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/50 sm:p-7"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-indigo font-serif text-xs font-bold text-white shadow-md">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[var(--page-fg)] sm:text-xl">
                    {belief.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    {belief.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. OUR PROGRESS (STATS) */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Traction & Community
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Our progress
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((m) => (
              <div
                key={m.label}
                className="glass group rounded-[1.8rem] p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-violet/50"
              >
                <p className="font-serif text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl gradient-text">
                  {m.value}
                </p>
                <p className="mt-3 text-sm leading-snug text-[var(--muted)]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-[var(--muted)] sm:text-sm leading-relaxed">
            These numbers are a foundation, not a finish line. The next phase
            is about stronger assessment, sustainable programs, deeper employer
            relationships, and more opportunities for the people we train.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. BUILT IN JOS. READY FOR THE WORLD. */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Origin & Ambition
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              Built in Jos. Ready for the world.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              <p>
                Our community is in Jos, Plateau State, Nigeria. The standard
                we build toward is global.
              </p>
              <p>
                World-class engineers can be developed anywhere when people
                have access to serious training, honest feedback, strong peers,
                and credible opportunities. Blockfuse exists to create that
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 7. PARTNERS AND SUPPORTERS */}
      {/* ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              Ecosystem Supporters
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Partners and supporters
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              Organisations that have funded places, sponsored a cohort or an
              event, or engaged us for engineering work.
            </p>
          </div>

          <div className="glass mt-12 rounded-[2rem] p-8 sm:p-10 border border-[var(--line)]">
            <ul className="space-y-6 divide-y divide-[var(--line)]">
              {aboutPartners.map((p, idx) => (
                <li
                  key={p.name}
                  className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 ${
                    idx !== 0 ? "pt-6" : ""
                  }`}
                >
                  <strong className="text-base sm:text-lg font-bold text-[var(--page-fg)]">
                    {p.name}
                  </strong>
                  <span className="text-sm text-[var(--muted)] sm:text-right">
                    {p.description}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <p className="text-xs text-[var(--muted)] italic">
                Every organisation named here has given permission. We do not
                list logos of ecosystems we merely attended events with.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 8. WORK WITH US (FINAL ACTION BANNER) */}
      {/* ========================================================================= */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-brand-violet via-brand-indigo to-brand-black p-px shadow-2xl">
          <div className="rounded-[2.5rem] bg-[var(--page-bg)]/90 backdrop-blur-xl p-8 text-center sm:p-14 md:p-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Work with us
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Whether you want to train as an engineer, hire verified talent,
              build software, or support our ecosystem, there is a place for
              you.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <ButtonLink href="/training">Join a program</ButtonLink>
              <ButtonLink href="/talent" variant="secondary">
                Hire engineers
              </ButtonLink>
              <ButtonLink href="/engineering" variant="secondary">
                Start a project
              </ButtonLink>
              <ButtonLink href="/contact?intent=partner" variant="secondary">
                Partner with us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
