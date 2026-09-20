import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  closingPaths,
  howBlockfuseWorks,
  programPaths,
  whyBlockfusePoints,
  proofStats,
  engagementModels,
} from "@/features/home/content";

function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
      <div className="section-divider" />
    </div>
  );
}

const ENGAGEMENT_MEDIA = [
  {
    src: "/brand/companies1.JPG",
    alt: "A company team in conversation with Blockfuse engineers",
  },
  {
    src: "/brand/compaines2.JPG",
    alt: "A Blockfuse engineer presenting a product workshop",
  },
  {
    src: "/brand/companie3.jpeg",
    alt: "Blockfuse engineers and open-source partners gathered together",
  },
] as const;

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ================================================================= */}
      {/* 1. HERO */}
      {/* ================================================================= */}
      <section className="hero-shell relative px-5 pb-20 pt-10 sm:px-7 sm:pb-24 sm:pt-14 lg:pt-16">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(29rem,0.86fr)] lg:gap-12">
          <div className="max-w-[42rem]">
            <ScrollReveal>
              <div className="hero-kicker">
                <span className="hero-kicker-mark" aria-hidden="true">
                  <span />
                  <span />
                </span>
                WEB3 &amp; BLOCKCHAIN ENGINEERING STUDIO
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 className="mt-6 max-w-[18ch] font-heading text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[1.06] tracking-[-0.04em] text-[var(--page-fg)]">
                We build decentralized systems &amp; deploy vetted engineering talent.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="mt-7 max-w-[55ch] text-base leading-[1.7] text-[var(--muted)] sm:text-lg">
                Blockfuse Labs is a premier Web3 &amp; Blockchain engineering studio.
                We architect production-grade protocols, smart contracts, and
                AI-powered Web3 products while deploying battle-tested engineering
                talent to global technology teams.
              </p>
            </ScrollReveal>

            <ScrollReveal className="mt-8 flex flex-wrap items-start gap-4 sm:flex-row sm:items-center" delay={3}>
              <ButtonLink href="/engineering">Start an Engineering Project</ButtonLink>
              <ButtonLink href="/hire-engineers" variant="secondary">
                Hire Vetted Web3 Engineers
              </ButtonLink>
            </ScrollReveal>
          </div>

          <ScrollReveal className="hero-collage" delay={2}>
            <div className="hero-photo hero-photo-tall">
              <Image
                src="/brand/heropic.jpg"
                alt="Blockfuse community members learning together at an event"
                fill
                priority
                sizes="(max-width: 1023px) 55vw, 28vw"
                className="object-cover"
              />
            </div>
            <div className="hero-photo hero-photo-top">
              <Image
                src="/brand/heropic2.jpg"
                alt="A Blockfuse community member giving a thumbs up"
                fill
                priority
                sizes="(max-width: 1023px) 45vw, 21vw"
                className="object-cover"
              />
            </div>
            <div className="hero-photo hero-photo-bottom">
              <Image
                src="/brand/image00089.jpeg"
                alt="Blockfuse community members gathered after a learning session"
                fill
                priority
                sizes="(max-width: 1023px) 45vw, 21vw"
                className="object-cover object-center"
              />
            </div>
            <div className="hero-proof" aria-label="Over 115 engineers graduated">
              <strong>115+</strong>
              <span>engineers<br />graduated</span>
            </div>
            <span className="hero-spark hero-spark-one" aria-hidden="true" />
            <span className="hero-spark hero-spark-two" aria-hidden="true" />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. PROGRAMS — Choose your path (target of every generic Apply CTA) */}
      {/* ================================================================= */}
      <section id="choose-your-path" className="path-journey scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="path-journey-heading text-center">
            <span className="path-journey-kicker">Choose your path</span>
            <h2 className="mx-auto mt-5 max-w-[20ch] font-heading text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.05em]">
              Build the ability, judgment, and proof to move forward.
            </h2>
            <p className="mx-auto mt-6 max-w-[58ch] text-base leading-[1.7] text-[var(--path-journey-muted)] sm:text-lg">
              Four focused routes. Each one is built around real work,
              professional review, and outcomes that can be examined.
            </p>
          </div>

          <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
            {programPaths.map((program, i) => (
              <article key={program.title} className="path-journey-row">
                <ScrollReveal
                  className={`path-journey-copy ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  delay={1}
                >
                  <span className="path-journey-number">0{i + 1}</span>
                  {program.tagline && (
                    <span className="path-journey-tagline">{program.tagline}</span>
                  )}
                  <h3>{program.title}</h3>
                  <p className="path-journey-description">{program.description}</p>
                  <p className="path-journey-audience">{program.audience}</p>
                  <ModalButton
                    modal={i === 3 ? "hire" : "program"}
                    variant="link"
                    className="path-journey-action"
                    prefill={i === 3 ? undefined : { Track: program.title }}
                  >
                    {i === 3 ? "Hire engineers" : "Explore this path"}
                  </ModalButton>
                </ScrollReveal>

                <ScrollReveal
                  className={`path-journey-visual ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  delay={2}
                  threshold={0.08}
                >
                  <div className="path-journey-image">
                    <Image
                      src={`/brand/path${i + 1}.jpg`}
                      alt={
                        i === 0
                          ? "Engineers learning together in a Blockfuse classroom"
                          : i === 1
                            ? "A technical speaker presenting to the Blockfuse community"
                            : i === 2
                              ? "Engineers collaborating during a Blockfuse working session"
                              : "A Blockfuse engineer working on a client project"
                      }
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      className={`object-cover path-journey-photo path-journey-photo-${i + 1}`}
                    />
                  </div>
                </ScrollReveal>
              </article>
            ))}
          </div>

          <ScrollReveal className="mt-24 text-center sm:mt-32" delay={1}>
            <ButtonLink href="/training" variant="secondary" className="path-journey-all">
              View all program details
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* THE PEOPLE BEHIND THE STANDARD — commented out, preserved for later */}
      {/* ================================================================= */}
      {/* <TeamNetwork /> */}
      {/* <SectionDivider /> */}

      {/* ================================================================= */}
      {/* THE INDUSTRY CHALLENGE */}
      {/* ================================================================= */}
      <section id="core-reality" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--accent-dim)] blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 space-y-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal>
                <span className="eyebrow">The Industry Challenge</span>
              </ScrollReveal>

              <h2 className="bf-h2">
                The bottleneck is not ideas.
                <br />
                <em className="font-light text-[var(--muted)]">It is execution &amp; talent.</em>
              </h2>

              <div className="pt-4 hidden lg:block">
                <div className="surface-card p-4 space-y-2 text-xs font-mono text-[var(--muted)]">
                  <div className="flex justify-between text-[var(--accent)]">
                    <span>MARKET REALITY</span>
                    <span>PRODUCTION PROOF</span>
                  </div>
                  <p className="font-sans text-[var(--muted)]">
                    80% of blockchain projects stall due to unverified code or shortage of senior protocol engineers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <ScrollReveal className="lg:col-span-7" delay={1}>
              <div className="surface-card surface-card-accent p-8 sm:p-10 space-y-6">
                <p className="text-lg sm:text-xl text-[var(--page-fg)] leading-relaxed">
                  Web3 protocols and tech enterprises move fast, but finding production-ready smart contract developers and full-stack Web3 engineers remains an uphill battle.
                </p>

                <div className="bf-note">
                  <p className="text-base text-[var(--page-fg)] font-medium tracking-tight">
                    Blockfuse Labs bridges the execution gap.
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    We combine turnkey engineering delivery with an elite internal talent engine — giving founders and enterprises immediate access to verified technical capability.
                  </p>
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Our engineering team does not write code to pass online courses. We design protocols, test smart contracts against security vulnerabilities, ship dApps to live networks, and embed pre-vetted engineers directly into client sprint cycles.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* ENGAGEMENT MODELS */}
      {/* ================================================================= */}
      <section id="engagement" className="py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <ScrollReveal>
                <span className="eyebrow">Engagement Models</span>
              </ScrollReveal>
              <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-[var(--page-fg)]">
                How companies{" "}
                <em className="font-light text-[var(--muted)]">partner with us.</em>
              </h2>
            </div>
            <div className="text-xs font-mono text-[var(--muted)]">
              MANAGED DELIVERY • EMBEDDED PODS • CUSTOM PIPELINES
            </div>
          </div>

          {/* Cards — bf-cells hairline grid */}
          <ScrollReveal delay={1}>
            <div className="bf-cells bf-cells-3">
              {engagementModels.map((model, i) => (
                <article key={model.title} className="bf-cell !p-0 flex flex-col group">
                  {/* Image top — cards 1 & 3 */}
                  {i !== 1 && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--surface-2)] shrink-0">
                      <Image
                        src={ENGAGEMENT_MEDIA[i].src}
                        alt={ENGAGEMENT_MEDIA[i].alt}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                  )}

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-[1.9rem]">
                    <div className="bf-cell-head">
                      <span className="bf-cell-index">{model.number}</span>
                      <span className="bf-cell-chip">{model.subtitle}</span>
                    </div>
                    <h3 className="group-hover:text-[var(--accent)] transition-colors duration-200">{model.title}</h3>
                    <p>{model.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {model.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[0.75rem] text-[var(--muted)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] inline-block shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={model.href} className="bf-cell-link">
                      {model.ctaText}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Image bottom — middle card only */}
                  {i === 1 && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--surface-2)] shrink-0">
                      <Image
                        src={ENGAGEMENT_MEDIA[i].src}
                        alt={ENGAGEMENT_MEDIA[i].alt}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* THE BLOCKFUSE ADVANTAGE */}
      {/* ================================================================= */}
      <section id="why-us" className="py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <span className="eyebrow">The Blockfuse Advantage</span>
            </ScrollReveal>

            <h2 className="bf-h2">
              Why teams choose
              <br />
              <em className="font-light text-[var(--muted)]">Blockfuse Labs.</em>
            </h2>

            <p className="bf-prose">
              Whether you need a full turnkey dApp build or embedded Web3 engineers, we deliver with senior oversight, verified code, and zero onboarding latency.
            </p>

            <div className="hidden lg:block pt-2">
              <div className="bf-note text-xs font-mono space-y-2">
                <div className="text-[var(--accent)]">{"// CLIENT GUARANTEE"}</div>
                <p className="font-sans text-[var(--muted)]">
                  Direct senior lead accountability, daily GitHub commits, and complete IP sovereignty on all client engagements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — row-list pattern */}
          <ScrollReveal className="lg:col-span-7" delay={1}>
            <div className="row-list">
              {whyBlockfusePoints.map((point, i) => (
                <div key={point.title} className="py-6 px-6 flex items-start gap-5">
                  <span className="mono-tag mono-tag-accent shrink-0 mt-0.5">0{i + 1}</span>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading text-base font-semibold text-[var(--page-fg)]">
                        {point.title}
                      </h3>
                      <span className="mono-tag shrink-0">{point.tag}</span>
                    </div>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* PHYSICAL LABS + INTERNAL TALENT ENGINE */}
      {/* ================================================================= */}
      <section id="cohort-showcase" className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 space-y-12">
          {/* Physical Labs */}
          <div className="space-y-6">
            <ScrollReveal>
              <span className="eyebrow">Physical Labs</span>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="feature-panel p-8 sm:p-12 space-y-8 overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)", backgroundSize: "32px 32px" }}
                />
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[var(--muted)] border-b border-[var(--line)] pb-4 gap-4 relative z-10">
                  <span className="flex items-center gap-2 text-[var(--page-fg)]">
                    <span className="status-pill">
                      <span className="dot" />
                      <span className="label">JOS PRODUCTION WORKSPACE — ONLINE</span>
                    </span>
                  </span>
                  <span className="eyebrow">Cohort II · 115 Engineers</span>
                </div>
                <div className="space-y-4 max-w-2xl relative z-10">
                  <h3 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[var(--page-fg)]">
                    Cohort at work.
                  </h3>
                  <p className="bf-prose">
                    Jos Production Space: where real software systems get designed, reviewed, benchmarked, and shipped under live production conditions.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--muted)] border-t border-[var(--line)] pt-4 gap-4 relative z-10">
                  <span>LAT / LONG: 09.8965° N, 8.8583° E</span>
                  <span>LOCATION: PLATEAU STATE • NIGERIA</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      <SectionDivider />

      {/* ================================================================= */}
      {/* PROOF & METRICS */}
      {/* ================================================================= */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-4">
              <ScrollReveal>
                <span className="eyebrow">Proof &amp; Metrics</span>
              </ScrollReveal>
              <h2 className="bf-h2">
                Proven in code,
                <br />
                <em className="font-light text-[var(--muted)]">measured in production.</em>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="bf-prose">
                We don&apos;t train for certificates. We train for engineering capability that holds up under professional scrutiny and live production benchmarks.
              </p>
            </div>
          </div>

          <ScrollReveal delay={1}>
            <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-4">
              {proofStats.map((stat, i) => (
                <div key={stat.label} className="hairline-cell p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="mono-tag mono-tag-accent">0{i + 1}</span>
                    <span className="mono-tag">[{stat.tag}]</span>
                  </div>
                  <div className="stat-figure text-4xl sm:text-5xl">{stat.value}</div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* WHERE TO START — Learn. Hire. Build. Partner. */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-32">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[42rem] text-center">
            <ScrollReveal>
              <span className="eyebrow">Where to start</span>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="mt-4 font-heading text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[var(--page-fg)]">
                Learn. Hire. Build. Partner.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="mx-auto mt-6 max-w-[46ch] text-base leading-[1.7] text-[var(--muted)] sm:text-lg">
                Learn the work, hire engineers who can already do it, ship a
                product with our studio, or help fund the next cohort.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {closingPaths.map((path, i) => (
              <ScrollReveal key={path.title} delay={i < 3 ? i + 1 : 3}>
                <TiltCard dataCursorText="GO" className="h-full p-7 sm:p-8">
                  <span className="eyebrow">{path.kicker}</span>
                  <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-[var(--page-fg)] sm:text-2xl">
                    {path.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-[var(--muted)] sm:text-[0.95rem]">
                    {path.description}
                  </p>
                  <div className="mt-6">
                    {path.href ? (
                      <ButtonLink href={path.href} variant="secondary">
                        {path.cta}
                      </ButtonLink>
                    ) : (
                      <ModalButton modal={path.modal!} variant="secondary" arrow={false}>
                        {path.cta}
                      </ModalButton>
                    )}
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* HOW BLOCKFUSE WORKS */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="eyebrow">The System</span>
            <h2 className="mt-4 font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              How Blockfuse works
            </h2>
          </ScrollReveal>

          <div className="mt-10 border-t border-[var(--line-strong)]">
            {howBlockfuseWorks.map((step, i) => (
              <details key={step.number} name="blockfuse-process" open={i === 0} className="group border-b border-[var(--line-strong)]">
                <summary className="flex min-h-20 cursor-pointer list-none items-center gap-5 rounded-lg py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] [&::-webkit-details-marker]:hidden">
                  <span className="w-8 shrink-0 font-mono text-sm text-[var(--accent)]">0{step.number}</span>
                  <h3 className="flex-1 font-heading text-lg font-medium text-[var(--page-fg)] sm:text-xl">{step.title}</h3>
                  <span aria-hidden="true" className="text-xl text-[var(--muted)] group-open:hidden">+</span>
                  <span aria-hidden="true" className="hidden text-xl text-[var(--muted)] group-open:inline">−</span>
                </summary>
                <p className="max-w-prose pb-7 pl-12 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{step.description}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* FINAL CTA */}
      {/* ================================================================= */}
      <section id="final-cta" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[600px] h-[200px] sm:h-[280px] lg:h-[350px] bg-[var(--accent)]/10 blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 relative z-10">
          <div className="p-6 sm:p-10 lg:p-14 rounded-2xl border border-[var(--accent)]/40 bg-[var(--card)] backdrop-blur-2xl relative overflow-hidden shadow-2xl space-y-8 sm:space-y-12">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <ScrollReveal>
                  <span className="eyebrow">Ready to build?</span>
                </ScrollReveal>

                <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] text-[var(--page-fg)] leading-tight">
                  Build your next protocol.
                  <br />
                  <em className="font-light text-[var(--muted)]">Scale with vetted talent.</em>
                </h2>

                <p className="max-w-lg text-sm text-[var(--muted)] font-light leading-relaxed">
                  Whether you need a turnkey decentralized protocol build or vetted engineers embedded into your team, Blockfuse Labs delivers production-grade execution.
                </p>
              </div>
              
              {/* links */}
              <div className="lg:col-span-5">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/engineering"
                    className="flex items-center justify-between gap-4 px-6 py-5 group rounded-full border border-[var(--line-strong)] bg-[var(--card)] hover:border-[var(--accent-line)] hover:bg-[var(--card-hover)] transition-colors duration-300"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--page-fg)]">Start an Engineering Project</span>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>

                  <Link
                    href="/hire-engineers"
                    className="flex items-center justify-between gap-4 px-6 py-5 group rounded-full border border-[var(--line-strong)] bg-[var(--card)] hover:border-[var(--accent-line)] hover:bg-[var(--card-hover)] transition-colors duration-300"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--page-fg)]">Hire Vetted Web3 Engineers</span>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>

                  <Link
                    href="/training"
                    className="flex items-center justify-between gap-4 px-6 py-5 group rounded-full border border-[var(--line-strong)] bg-[var(--card)] hover:border-[var(--accent-line)] hover:bg-[var(--card-hover)] transition-colors duration-300"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--page-fg)] transition-colors duration-300">Apply to Blockfuse Academy</span>
                    <span className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-200">→</span>
                  </Link>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--muted)] border-t border-[var(--line-strong)]/80 pt-6">
              <span>BLOCKFUSE LABS • JOS, NIGERIA</span>
              <span>EST. 2024 • WEB3 &amp; AI ENGINEERING STUDIO</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
