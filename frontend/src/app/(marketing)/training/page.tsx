import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CounterStat } from "@/components/ui/counter-stat";
import { TestimonialsCarousel } from "@/features/training/testimonials-carousel";
import {
  academyPillars,
  academyStats,
  detailedPrograms,
  academyPathStages,
  assessmentMatrix,
  graduateTestimonials,
} from "@/features/training/content";

export const metadata: Metadata = {
  title: "Blockfuse Academy: train for the work, prove you are ready",
  description:
    "Blockfuse Academy develops production-ready engineers through rigorous, project-based training in AI-native software engineering, applied AI, and blockchain.",
};

/** Each track gets a photograph from the room it is actually taught in. */
const PROGRAM_MEDIA: Record<string, { src: string; alt: string }> = {
  "ai-native": {
    src: "/brand/path1.jpg",
    alt: "An instructor leading a Blockfuse classroom of students working on laptops",
  },
  "applied-ai": {
    src: "/brand/path3.jpg",
    alt: "Blockfuse engineers reviewing code together in the studio workspace",
  },
  blockchain: {
    src: "/brand/path2.jpg",
    alt: "A Blockfuse speaker presenting a blockchain session to a full room",
  },
  "team-training": {
    src: "/brand/heropic.jpg",
    alt: "Attendees at a Blockfuse community session in Jos",
  },
};

const AVATAR_TONES = ["tone-violet", "tone-blue", "tone-amber"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
      <div className="section-divider" />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <main className="relative overflow-hidden pb-24">
      {/* ================================================================= */}
      {/* 1. HERO — the room, the standard, the invitation                  */}
      {/* ================================================================= */}
      <section className="academy-clean-hero" aria-labelledby="academy-title">
        <div className="academy-clean-inner">
          <div className="academy-clean-copy">
            <ScrollReveal>
              <span className="academy-clean-kicker">Blockfuse Academy</span>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 id="academy-title">
                Blockfuse
                <br />
                Academy.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="academy-clean-lead">
                Rigorous, project-based training for engineers ready to do the
                work—not simply collect another certificate.
              </p>
            </ScrollReveal>

            <ScrollReveal className="academy-clean-actions" delay={3}>
              <ButtonLink href="#programs">Explore programs</ButtonLink>
              <ModalButton modal="program" variant="secondary">
                Apply now
              </ModalButton>
              <Link href="/contact" className="academy-clean-link">
                Ask a question
                <span aria-hidden="true">↗</span>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal className="academy-clean-visual" delay={2}>
            <div className="academy-clean-glow" aria-hidden="true" />
            <figure className="academy-clean-portrait">
              <Image
                src="/brand/IMG_1602.JPG"
                alt="A Blockfuse Academy student"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 48vw"
              />
              <figcaption>
                <span>Cohort IV</span>
                <strong>Builders at Blockfuse</strong>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. PROOF STRIP — overlapping the hero                             */}
      {/* ================================================================= */}
      {/* <div className="bf-stats-wrap">
        <ScrollReveal>
          <dl className="bf-stats">
            {academyStats.map((stat) => (
              <div key={stat.label} className="bf-stat">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <strong>
                    <CounterStat value={stat.value} />
                  </strong>
                  <span>{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div> */}

      {/* ================================================================= */}
      {/* 3. WHY TRAIN AT BLOCKFUSE — The Blockfuse difference              */}
      {/* ================================================================= */}
      <section className="bf-band px-5 py-24 sm:px-7 sm:py-32">
        <span className="bf-orb bf-orb-three" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow bf-eyebrow-light">
              The Blockfuse difference
            </span>
            <h2 className="bf-h2 mt-4">We don&apos;t train for certificates</h2>
            <p className="mt-6 text-[clamp(1rem,1.25vw,1.1rem)] leading-[1.75] text-[rgba(255,255,255,0.72)] max-w-[52ch]">
              We train engineers who can think independently, solve unfamiliar
              problems, ship production code, and thrive in real technical
              environments.
            </p>
          </ScrollReveal>

          <div className="mt-14 sm:mt-16 space-y-5">
            {academyPillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.title} delay={idx < 4 ? idx + 1 : 4}>
                <article className="bf-pillar relative overflow-hidden" data-cursor="PILLAR">
                  {/* Large background number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute right-6 top-1/2 -translate-y-1/2 font-heading font-bold leading-none text-[7rem] sm:text-[9rem] text-white/[0.04]"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 grid gap-6 sm:grid-cols-[1fr_minmax(0,1.2fr)] sm:items-center">
                    <div>
                      <span className="bf-pillar-index">{String(idx + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 text-white text-[clamp(1.5rem,2.8vw,2.2rem)]">
                        {pillar.title}
                      </h3>
                    </div>
                    <div>
                      <p className="text-[rgba(255,255,255,0.72)] text-[0.95rem] leading-[1.75]">
                        {pillar.copy}
                      </p>
                      {pillar.subCopy && (
                        <p className="bf-pillar-note mt-4">{pillar.subCopy}</p>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. CHOOSE YOUR PROGRAM                                            */}
      {/* ================================================================= */}
      <section id="programs" className="scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Curriculum &amp; specialized tracks</span>
            <h2 className="bf-h2 mt-4">Choose your program</h2>
          </ScrollReveal>

          <div className="bf-program-grid mt-16 sm:mt-20">
            {detailedPrograms.map((program, i) => {
              const media = PROGRAM_MEDIA[program.id];
              const shownTopics = program.topics.slice(0, 4);
              const remaining = program.topics.length - shownTopics.length;
              return (
                <ScrollReveal key={program.id} delay={i < 3 ? i + 1 : 3} threshold={0.08}>
                  <article id={program.id} className="bf-program-card scroll-mt-24">
                    <div className="bf-program-card-media">
                      <span className="bf-program-index" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 28vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="bf-program-card-body">
                      <span className="bf-program-target">
                        {program.target}
                      </span>
                      <h3>{program.title}</h3>
                      <p className="bf-program-description">
                        {program.description}
                      </p>

                      <ul className="bf-program-card-topics">
                        {shownTopics.map((topic) => (
                          <li key={topic} className="bf-topic-chip">
                            {topic}
                          </li>
                        ))}
                        {remaining > 0 && (
                          <li className="bf-topic-chip bf-topic-chip-muted">
                            +{remaining} more
                          </li>
                        )}
                      </ul>

                      <div className="bf-program-card-actions">
                        <ModalButton
                          modal={
                            program.id === "team-training" ? "hire" : "program"
                          }
                          prefill={
                            program.id === "team-training"
                              ? undefined
                              : { Track: program.title }
                          }
                        >
                          Apply for this track
                        </ModalButton>
                        <Link
                          href={`/contact?program=${program.id}`}
                          className="bf-cell-link"
                        >
                          <span>Full curriculum</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 6. WHAT WE MEASURE                                                */}
      {/* ================================================================= */}
      <section id="assessment" className="scroll-mt-24 border-b border-[var(--line-strong)]">
        {/* Full-bleed header bar */}
        <div className="border-b border-[var(--line-strong)] py-12 px-5 sm:px-7">
          <div className="mx-auto max-w-[1240px] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <ScrollReveal>
                <span className="eyebrow">Graduation standards</span>
              </ScrollReveal>
              <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-[var(--page-fg)] leading-tight">
                What we measure,
                <br />
                <em className="font-light text-[var(--muted)]">not grades.</em>
              </h2>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              Graduation requires demonstrated competency across multiple
              dimensions. We assess what employers actually care about.
            </p>
          </div>
        </div>

        {/* Criteria rows */}
        <div className="px-5 sm:px-7">
          <div className="mx-auto max-w-[1240px] divide-y divide-[var(--line)]">
            {assessmentMatrix.map((row, i) => (
              <ScrollReveal key={row.area} delay={i < 4 ? 1 : 2}>
                <div className="group grid grid-cols-12 gap-6 items-center py-7 hover:bg-[var(--panel-fill-hover)] transition-colors duration-200 px-2 rounded-lg -mx-2">
                  {/* Index */}
                  <div className="col-span-1">
                    <span className="font-mono text-[11px] text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Area name */}
                  <div className="col-span-5 md:col-span-4">
                    <h4 className="text-base font-semibold text-[var(--page-fg)] font-heading tracking-[-0.02em] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {row.area}
                    </h4>
                  </div>

                  {/* Divider line that fills on hover */}
                  <div className="col-span-3 hidden md:block">
                    <div className="h-px bg-[var(--line)] group-hover:bg-[var(--accent-line)] transition-colors duration-300" />
                  </div>

                  {/* Description */}
                  <div className="col-span-6 md:col-span-4">
                    <p className="text-sm text-[var(--muted)] leading-relaxed group-hover:text-[var(--page-fg)] transition-colors duration-200">
                      {row.whatWeAssess}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
      <section className="px-5 py-24 sm:px-7 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[52rem]">
            <span className="eyebrow">The standard</span>
            <h2 className="bf-h2 mt-4">Your path through Blockfuse</h2>
            <p className="bf-prose mt-6">
              Completing a program does not automatically mean someone is ready
              for placement. Every stage has a clear meaning and standard.
            </p>
          </ScrollReveal>

          <ol className="bf-rail">
            {academyPathStages.map((stage, index) => (
              <li key={stage.stage} className="bf-stage">
                <span className="bf-stage-dot">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="bf-stage-content">
                  <h3>{stage.stage}</h3>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <ScrollReveal className="bf-note mt-14" delay={1}>
            <p>
              This distinction protects both learners and employers. When we
              recommend an engineer, we want the recommendation to carry real
              weight.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. PRODUCTION-READINESS ASSESSMENT                                */}
      {/* ================================================================= */}
      <section
        id="assessment"
        className="scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32"
      >
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[52rem]">
            <span className="eyebrow">Evaluation matrix</span>
            <h2 className="bf-h2 mt-4">
              The production-readiness assessment
            </h2>
            <p className="bf-prose mt-6">
              The assessment measures whether you can apply what you have
              learned in conditions that reflect real engineering work.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-14" delay={1}>
            <dl className="bf-matrix">
              {assessmentMatrix.map((row, i) => (
                <div key={row.area} className="bf-matrix-cell">
                  <dt>
                    <span className="bf-matrix-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {row.area}
                  </dt>
                  <dd>{row.whatWeAssess}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <p className="bf-matrix-footnote">
            The same standard applies to everyone. Passing is based on
            demonstrated ability, not attendance or personal relationships.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 8. WHAT OUR GRADUATES SAY                                         */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-32 border-b border-[var(--line-strong)]">
        <div className="mx-auto max-w-[1240px] space-y-12">
          {/* Header — two-column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-4">
              <ScrollReveal>
                <span className="eyebrow">Alumni voices</span>
              </ScrollReveal>
              <h2 className="bf-h2">
                What <em className="font-light text-[var(--muted)]">graduates</em> say
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="bf-prose">
                Real engineers, real feedback. Here&apos;s what our alumni say
                about training at Blockfuse.
              </p>
            </div>
          </div>

          <ScrollReveal delay={1}>
            <TestimonialsCarousel
              testimonials={graduateTestimonials}
              stats={academyStats}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. FINAL CTA                                                      */}
      {/* ================================================================= */}
      <section className="px-5 sm:px-7">
        <div className="bf-cta">
          <div className="bf-cta-media" aria-hidden="true">
            <Image
              src="/brand/heropic.jpg"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover"
            />
          </div>
          <span className="bf-orb bf-orb-four" aria-hidden="true" />

          <ScrollReveal className="bf-cta-inner">
            <span className="eyebrow bf-eyebrow-light">
              Cohort III — applications open
            </span>
            <h2>Ready to prove what you can do?</h2>
            <p>
              Choose the program that matches your current level and the
              engineer you want to become.
            </p>
            <div className="bf-cta-actions">
              <ButtonLink href="#programs">Apply to the next cohort</ButtonLink>
              <ModalButton
                modal="sponsor"
                variant="secondary"
                className="bf-on-dark-btn"
                arrow={false}
              >
                Sponsor seats or a cohort
              </ModalButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
