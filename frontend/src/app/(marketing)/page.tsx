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
import {
  EYEBROW,
  BF_H2,
  BF_PROSE,
  FEATURE_PANEL,
  HAIRLINE_GRID,
  HAIRLINE_CELL,
  ROW_LIST,
  ROW_LIST_ITEM,
  MONO_TAG,
  MONO_TAG_ACCENT,
} from "@/lib/styles";

const BF_NOTE =
  "max-w-[58ch] rounded-xl border border-(--line) border-l-2 border-l-[var(--accent-line)] bg-(--card) px-[1.6rem] py-[1.35rem] text-[0.95rem] leading-[1.7] text-(--muted)";

const HERO_PHOTO =
  "group relative overflow-hidden bg-(--surface-2) shadow-[0_0.75rem_1.75rem_-1.4rem_rgba(20,12,40,0.18)]";

const HERO_PHOTO_IMG =
  "object-cover saturate-[0.86] contrast-[1.04] [transition:transform_400ms_cubic-bezier(0.23,1,0.32,1),filter_200ms_ease-out] group-hover:scale-[1.025] group-hover:saturate-100 group-hover:contrast-[1.02]";

const SPARK =
  "pointer-events-none absolute h-[1.1rem] w-[1.1rem] bg-(--accent) [clip-path:polygon(50%_0,61%_39%,100%_50%,61%_61%,50%_100%,39%_61%,0_50%,39%_39%)]";

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
      <section className="relative grid min-h-[calc(100svh_-_76px)] items-center isolate overflow-hidden px-5 pb-20 pt-10 sm:px-7 sm:pb-24 sm:pt-14 lg:pt-16 max-lg:min-h-auto">
        <div className="pointer-events-none absolute -z-1 right-[-8rem] top-[6%] h-[18rem] w-[18rem] rounded-full bg-(--accent-dim) blur-[2px] opacity-[0.55]" aria-hidden="true" />
        <div className="pointer-events-none absolute -z-1 bottom-[3%] left-[42%] h-[9rem] w-[9rem] rounded-full bg-(--accent-dim) blur-[2px] opacity-[0.35]" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(29rem,0.86fr)] lg:gap-12">
          <div className="max-w-[42rem]">
            
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
              <ButtonLink
                href="/hire-engineers"
                variant="secondary"
                className="!bg-[var(--card)] !text-[var(--page-fg)] !border-[var(--line-strong)] hover:!bg-[var(--card-hover)] hover:!text-[var(--page-fg)] hover:!border-[var(--accent-line)]"
              >
                Hire Vetted Web3 Engineers
              </ButtonLink>
            </ScrollReveal>
          </div>

          <ScrollReveal
            className="relative mx-auto grid aspect-[1.06] w-full max-w-[36rem] grid-cols-[0.755fr_1fr] grid-rows-[0.72fr_1fr] gap-3 max-lg:max-w-[42rem] max-sm:aspect-[0.94] max-sm:gap-2"
            delay={2}
          >
            <div className={`${HERO_PHOTO} row-span-2 rounded-[4.5rem_1.5rem_4.5rem_1.5rem] max-sm:rounded-[3rem_1rem_3rem_1rem]`}>
              <Image
                src="/brand/heropic.jpg"
                alt="Blockfuse community members learning together at an event"
                fill
                priority
                sizes="(max-width: 1023px) 55vw, 28vw"
                className={`${HERO_PHOTO_IMG} object-[34%_center]`}
              />
            </div>
            <div className={`${HERO_PHOTO} rounded-[1.5rem_4.5rem_1.5rem_1.5rem] max-sm:rounded-[1rem_3rem_1rem_1rem]`}>
              <Image
                src="/brand/heropic2.jpg"
                alt="A Blockfuse community member giving a thumbs up"
                fill
                priority
                sizes="(max-width: 1023px) 45vw, 21vw"
                className={`${HERO_PHOTO_IMG} object-[44%_42%]`}
              />
            </div>
            <div className={`${HERO_PHOTO} rounded-[1.5rem_1.5rem_4.5rem_1.5rem] max-sm:rounded-[1rem_1rem_3rem_1rem]`}>
              <Image
                src="/brand/image00089.jpeg"
                alt="Blockfuse community members gathered after a learning session"
                fill
                priority
                sizes="(max-width: 1023px) 45vw, 21vw"
                className={`${HERO_PHOTO_IMG} object-center`}
              />
            </div>
            <div
              className="absolute left-[36%] top-[60%] flex h-[8.25rem] w-[8.25rem] -translate-x-1/2 -translate-y-1/2 -rotate-[7deg] flex-col items-center justify-center rounded-full border-[0.45rem] border-(--page-bg) bg-(--page-fg) text-center text-(--page-bg) shadow-[0_0.5rem_1.25rem_-0.9rem_rgba(7,7,10,0.28)] max-sm:h-[6.5rem] max-sm:w-[6.5rem] max-sm:border-[0.35rem] [&::after]:absolute [&::after]:inset-[0.4rem] [&::after]:rounded-[inherit] [&::after]:border [&::after]:border-current [&::after]:content-[''] [&::after]:opacity-[0.22]"
              aria-label="Over 115 engineers graduated"
            >
              <strong className="font-heading text-[1.65rem] leading-none max-sm:text-[1.3rem]">115+</strong>
              <span className="mt-[0.35rem] font-mono text-[0.56rem] uppercase leading-[1.35] tracking-[0.1em] max-sm:text-[0.48rem]">engineers<br />graduated</span>
            </div>
            <span className={`${SPARK} bottom-[19%] right-[-0.5rem]`} aria-hidden="true" />
            <span className={`${SPARK} bottom-[13%] right-[1.25rem] scale-[1.55] opacity-[0.55]`} aria-hidden="true" />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. PROGRAMS — Choose your path (target of every generic Apply CTA) */}
      {/* ================================================================= */}
      <section
        id="choose-your-path"
        className="relative scroll-mt-24 overflow-hidden bg-(--action-bg) px-5 py-24 text-white sm:px-7 sm:py-32 [&::before]:pointer-events-none [&::before]:absolute [&::before]:content-[''] [&::before]:-right-[16rem] [&::before]:-top-[22rem] [&::before]:h-[34rem] [&::before]:w-[34rem] [&::before]:rounded-full [&::before]:bg-(--accent-soft) [&::before]:blur-[5rem] [&::before]:opacity-[0.13]"
      >
        <div className="relative z-[1] mx-auto max-w-[1120px]">
          <div className="text-center">
            <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[rgba(255,255,255,0.76)]">Choose your path</span>
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
              <article
                key={program.title}
                className="group grid items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(28rem,1fr)] lg:gap-24 lg:[&:nth-child(even)]:grid-cols-[minmax(28rem,1fr)_minmax(0,0.78fr)]"
              >
                <ScrollReveal
                  className={`max-w-[30rem] ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  delay={1}
                >
                  <span className="mb-5 block font-mono text-[0.72rem] tabular-nums tracking-[0.1em] text-[rgba(255,255,255,0.54)]">0{i + 1}</span>
                  {program.tagline && (
                    <span className="block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#dba7f2]">{program.tagline}</span>
                  )}
                  <h3 className="mt-[0.85rem] max-w-[16ch] font-heading text-[clamp(2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.045em]">{program.title}</h3>
                  <p className="mt-6 max-w-[46ch] text-[0.98rem] leading-[1.7] text-(--path-journey-muted)">{program.description}</p>
                  <p className="mt-4 max-w-[48ch] text-[0.82rem] leading-[1.65] text-[rgba(255,255,255,0.58)]">{program.audience}</p>
                  <ModalButton
                    modal={i === 3 ? "hire" : "program"}
                    variant="link"
                    className="mt-7 min-h-[2.75rem] border-b-[rgba(255,255,255,0.46)]! text-white! [&_.arrow]:transition-transform [&_.arrow]:duration-[150ms] [&_.arrow]:ease-[cubic-bezier(0.23,1,0.32,1)] hover:[&_.arrow]:translate-x-[0.3rem]"
                    prefill={i === 3 ? undefined : { Track: program.title }}
                  >
                    {i === 3 ? "Hire engineers" : "Explore this path"}
                  </ModalButton>
                </ScrollReveal>

                <ScrollReveal
                  className={`w-full ${i % 2 === 1 ? "lg:order-1" : ""}`}
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
                      className={`path-journey-photo object-cover ${["object-[center_42%]", "object-[center_38%]", "object-center", ""][i]} group-hover:[filter:contrast(1.02)] group-hover:[transform:scale(1.025)]!`}
                    />
                  </div>
                </ScrollReveal>
              </article>
            ))}
          </div>

          <ScrollReveal className="mt-24 text-center sm:mt-32" delay={1}>
            <ButtonLink href="/training" variant="secondary" className="border-[rgba(255,255,255,0.38)]! bg-transparent! text-white! hover:bg-[rgba(255,255,255,0.09)]!">
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
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7 space-y-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal>
                <span className={EYEBROW}>The Industry Challenge</span>
              </ScrollReveal>

              <h2 className={BF_H2}>
                The bottleneck is not ideas.
                <br />
                <em className="font-light text-[var(--muted)]">It is execution &amp; talent.</em>
              </h2>

              <div className="pt-4 hidden lg:block">
                <div className="bg-(--card) backdrop-blur-[14px] border border-(--line) rounded-[20px] shadow-[0_4px_14px_-12px_rgba(20,12,40,0.12)] p-4 space-y-2 text-xs font-mono text-[var(--muted)]">
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
              <div className="bg-(--card) backdrop-blur-[14px] border border-(--line) rounded-[20px] shadow-[0_4px_14px_-12px_rgba(20,12,40,0.12)] p-8 sm:p-10 space-y-6">
                <p className="text-lg sm:text-xl text-[var(--page-fg)] leading-relaxed">
                  Web3 protocols and tech enterprises move fast, but finding production-ready smart contract developers and full-stack Web3 engineers remains an uphill battle.
                </p>

                <div className={BF_NOTE}>
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
                <span className={EYEBROW}>Engagement Models</span>
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
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-(--line) bg-(--line) md:grid-cols-3">
              {engagementModels.map((model, i) => (
                <article key={model.title} className="flex flex-col group bg-(--surface) p-0 transition-[background] duration-[250ms] hover:bg-(--card-hover)">
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
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[0.66rem] font-semibold tracking-[0.18em] text-(--accent)">{model.number}</span>
                      <span className="whitespace-nowrap rounded-full border border-(--line-strong) px-[0.65rem] py-[0.2rem] font-mono text-[0.6rem] tracking-[0.06em] text-(--dim)">{model.subtitle}</span>
                    </div>
                    <h3 className="mt-4 font-heading text-[1.2rem] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--page-fg)] transition-colors duration-200 group-hover:text-[var(--accent)]">{model.title}</h3>
                    <p className="mt-[0.85rem] text-[0.88rem] leading-[1.65] text-(--muted)">{model.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {model.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[0.75rem] text-[var(--muted)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] inline-block shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={model.href} className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.82rem] font-semibold text-(--accent) hover:[&_span]:translate-x-[0.3rem] [&_span]:transition-transform [&_span]:duration-[200ms] [&_span]:ease-out">
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
              <span className={EYEBROW}>The Blockfuse Advantage</span>
            </ScrollReveal>

            <h2 className={BF_H2}>
              Why teams choose
              <br />
              <em className="font-light text-[var(--muted)]">Blockfuse Labs.</em>
            </h2>

            <p className={BF_PROSE}>
              Whether you need a full turnkey dApp build or embedded Web3 engineers, we deliver with senior oversight, verified code, and zero onboarding latency.
            </p>

            <div className="hidden lg:block pt-2">
              <div className={`${BF_NOTE} font-mono space-y-2`}>
                <div className="text-[var(--accent)]">{"// CLIENT GUARANTEE"}</div>
                <p className="font-sans text-[var(--muted)]">
                  Direct senior lead accountability, daily GitHub commits, and complete IP sovereignty on all client engagements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — row-list pattern */}
          <ScrollReveal className="lg:col-span-7" delay={1}>
            <div className={ROW_LIST}>
              {whyBlockfusePoints.map((point, i) => (
                <div key={point.title} className={`${ROW_LIST_ITEM} flex items-start gap-5 px-6 py-6`}>
                  <span className={`${MONO_TAG} ${MONO_TAG_ACCENT} shrink-0 mt-0.5`}>0{i + 1}</span>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading text-base font-semibold text-[var(--page-fg)]">
                        {point.title}
                      </h3>
                      <span className={`${MONO_TAG} shrink-0`}>{point.tag}</span>
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
              <span className={EYEBROW}>Physical Labs</span>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className={`${FEATURE_PANEL} p-8 sm:p-12 space-y-8`}>
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)", backgroundSize: "32px 32px" }}
                />
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[var(--muted)] border-b border-[var(--line)] pb-4 gap-4 relative z-10">
                  <span />
                  <span className={EYEBROW}>Cohort II · 115 Engineers</span>
                </div>
                <div className="space-y-4 max-w-2xl relative z-10">
                  <h3 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[var(--page-fg)]">
                    Cohort at work.
                  </h3>
                  <p className={BF_PROSE}>
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
                <span className={EYEBROW}>Proof &amp; Metrics</span>
              </ScrollReveal>
              <h2 className={BF_H2}>
                Proven in code,
                <br />
                <em className="font-light text-[var(--muted)]">measured in production.</em>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className={BF_PROSE}>
                We don&apos;t train for certificates. We train for engineering capability that holds up under professional scrutiny and live production benchmarks.
              </p>
            </div>
          </div>

          <ScrollReveal delay={1}>
            <div className={`${HAIRLINE_GRID} sm:grid-cols-2 lg:grid-cols-4`}>
              {proofStats.map((stat, i) => (
                <div key={stat.label} className={`${HAIRLINE_CELL} p-8 space-y-4`}>
                  <div className="flex items-center justify-between">
                    <span className={`${MONO_TAG} ${MONO_TAG_ACCENT}`}>0{i + 1}</span>
                    <span className={MONO_TAG}>[{stat.tag}]</span>
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
              <span className={EYEBROW}>Where to start</span>
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
                  <span className={EYEBROW}>{path.kicker}</span>
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
            <span className={EYEBROW}>The System</span>
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
          <div className="p-6 sm:p-10 lg:p-14 rounded-2xl border border-[var(--accent)]/40 bg-[var(--card)] backdrop-blur-2xl relative overflow-hidden shadow-md space-y-8 sm:space-y-12">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <ScrollReveal>
                  <span className={EYEBROW}>Ready to build?</span>
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
