import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TestimonialsCarousel } from "@/features/training/testimonials-carousel";
import {
  academyPillars,
  academyStats,
  detailedPrograms,
  academyPathStages,
  assessmentMatrix,
  graduateTestimonials,
} from "@/features/training/content";
import {
  BF_EYEBROW_LIGHT,
  BF_H2,
  BF_ON_DARK_BTN,
  BF_PROSE,
  EYEBROW,
  CTA_BANNER as CTA,
  CTA_BANNER_MEDIA as CTA_MEDIA,
  CTA_BANNER_MEDIA_PIC as CTA_MEDIA_PIC,
  CTA_BANNER_INNER as CTA_INNER,
  CTA_BANNER_H2 as CTA_H2,
  CTA_BANNER_P as CTA_P,
  CTA_BANNER_ACTIONS as CTA_ACTIONS,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Blockfuse Labs Academy: train for the work, prove you are ready",
  description:
    "Blockfuse Labs Academy develops production-ready engineers through rigorous, project-based training in AI-native software engineering, applied AI, and blockchain.",
};

/** Each track gets a photograph from the room it is actually taught in. */
const PROGRAM_MEDIA: Record<string, { src: string; alt: string }> = {
  basic: {
    src: "/brand/path3.jpg",
    alt: "Blockfuse Labs engineers reviewing code together in the studio workspace",
  },
  intermediate: {
    src: "/brand/path1.jpg",
    alt: "An instructor leading a Blockfuse Labs classroom of students working on laptops",
  },
  advanced: {
    src: "/brand/path2.jpg",
    alt: "A Blockfuse Labs speaker presenting a blockchain session to a full room",
  },
  professional: {
    src: "/brand/heropic.jpg",
    alt: "Attendees at a Blockfuse Labs community session in Jos",
  },
  "full-program": {
    src: "/brand/path1.jpg",
    alt: "An instructor leading a Blockfuse Labs classroom of students working on laptops",
  },
  blockchain: {
    src: "/brand/path2.jpg",
    alt: "A Blockfuse Labs speaker presenting a blockchain session to a full room",
  },
};

const ACADEMY_HERO =
  "relative overflow-hidden bg-(--surface) min-h-[calc(100svh-4.75rem)] max-md:min-h-auto";
const ACADEMY_INNER =
  "grid grid-cols-[minmax(0,1.02fr)_minmax(25rem,0.98fr)] min-h-[calc(100svh-4.75rem)] mx-auto max-w-[90rem] max-md:grid-cols-1 max-md:min-h-auto";
const ACADEMY_COPY =
  "relative z-[2] self-center pt-[5rem] px-[clamp(2rem,6vw,6rem)] pb-[8rem] max-md:pt-16 max-md:px-5 max-md:pb-12";
const ACADEMY_TITLE =
  "max-w-[11ch] mt-7 text-(--page-fg) text-[clamp(3.75rem,6.5vw,6.75rem)] font-semibold tracking-[-0.07em] leading-[0.9] max-md:text-[clamp(3.5rem,16vw,5rem)]";
const ACADEMY_LEAD =
  "max-w-[42ch] mt-8 text-(--muted) text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65]";
const ACADEMY_ACTIONS = "flex flex-wrap items-center gap-6 mt-[2.25rem]";
const ACADEMY_LINK =
  "inline-flex min-h-[2.75rem] items-center gap-2.5 text-(--page-fg) text-[0.875rem] font-semibold underline decoration-(--line-strong) underline-offset-[0.35rem] transition-[color,text-decoration-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-(--accent) hover:decoration-(--accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)";
const ACADEMY_VISUAL = "relative min-h-[38rem] max-md:min-h-[34rem]";
const ACADEMY_PORTRAIT =
  "absolute inset-0 m-0 overflow-hidden bg-(--ink) max-md:inset-[0_0.75rem_0] after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(180deg,transparent_58%,rgba(7,7,10,0.72))]";
const ACADEMY_PORTRAIT_PIC = "object-cover object-[center_18%]";
const ACADEMY_CAPTION =
  "absolute z-[2] right-6 bottom-6 left-6 flex items-end justify-between gap-4 text-(--paper)";
const ACADEMY_CAPTION_META =
  "font-mono text-[0.625rem] font-semibold tracking-[0.1em] uppercase";
const ACADEMY_CAPTION_TITLE =
  "max-w-[9ch] font-heading text-[1.25rem] font-medium leading-none text-right";

const ORB = "absolute z-0 rounded-full pointer-events-none";
const ORB_THREE = `${ORB} w-[38rem] h-[38rem] -top-[18rem] left-[55%] bg-(--color-accent) opacity-[0.16] blur-[7rem]`;
const ORB_FOUR = `${ORB} w-[26rem] h-[26rem] -bottom-[12rem] -right-[6rem] bg-(--color-accent) opacity-[0.3] blur-[6rem]`;

const BAND = "relative bg-[#2a0b5e] text-white";
const BAND_ORBS = "absolute inset-0 overflow-hidden pointer-events-none";
const PILLAR =
  "relative flex h-full flex-col overflow-hidden p-[1.9rem] border rounded-[1.25rem] bg-white dark:bg-[#14141c] border-(--line) text-(--page-fg) [transition:transform_350ms_cubic-bezier(0.23,1,0.32,1),border-color_250ms_ease,background-color_250ms_ease] hover:-translate-y-1 hover:border-(--accent-line) hover:bg-[#faf8ff] dark:hover:bg-[#1a1a26] before:content-[''] before:absolute before:top-0 before:left-[1.9rem] before:right-[1.9rem] before:h-px before:opacity-0 before:transition-opacity before:duration-[250ms] before:bg-[linear-gradient(90deg,var(--accent-line),transparent)] hover:before:opacity-100";
const PILLAR_INDEX =
  "font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-(--dim)";
const PILLAR_H3 =
  "mt-[0.9rem] font-heading text-[1.3rem] font-bold leading-[1.15] tracking-[-0.03em] text-(--page-fg)";
const PILLAR_P =
  "mt-[0.9rem] text-[0.92rem] leading-[1.7] text-(--muted)";
const PILLAR_NOTE =
  "mt-[1.1rem] pl-[0.95rem] border-l-2 border-l-(--accent-line) text-[0.86rem] leading-[1.7] text-(--accent)";

const PROGRAM_GRID = "grid gap-7 sm:grid-cols-2";
const PROGRAM_CARD =
  "group flex h-full flex-col overflow-hidden border border-(--line) rounded-[1.5rem] bg-(--card) shadow-(--shadow-card) [transition:translate_350ms_cubic-bezier(0.23,1,0.32,1),border-color_250ms_ease] md:hover:-translate-y-1 md:hover:border-(--accent-line)";
const PROGRAM_MEDIA_BOX =
  "relative aspect-video overflow-hidden bg-(--surface-2)";
const PROGRAM_MEDIA_PIC =
  "object-cover scale-[1.05] saturate-[0.84] contrast-[1.03] [transition:scale_500ms_cubic-bezier(0.23,1,0.32,1),filter_250ms_ease-out] md:group-hover:scale-100 md:group-hover:saturate-100 md:group-hover:contrast-[1.01]";
const PROGRAM_INDEX =
  "absolute z-[2] top-4 left-4 grid w-11 h-11 place-items-center rounded-[0.85rem] bg-(--accent) font-heading text-[0.85rem] font-bold text-white shadow-[0_8px_18px_-12px_rgba(191,100,231,0.45)]";
const PROGRAM_BODY = "flex flex-1 flex-col p-7";
const PROGRAM_H3 =
  "font-heading text-[1.4rem] font-bold leading-[1.12] tracking-[-0.03em] text-(--page-fg)";
const PROGRAM_DESCRIPTION =
  "mt-3 text-[0.92rem] leading-[1.65] text-(--muted)";
const PROGRAM_TOPICS = "flex flex-wrap gap-2 mt-5";
const TOPIC_CHIP =
  "border border-(--line-strong) rounded-full px-[0.7rem] py-[0.3rem] text-[0.72rem] leading-[1.3] text-(--muted)";
const TOPIC_CHIP_MUTED = "border-dashed text-(--dim)";
const PROGRAM_ACTIONS =
  "flex flex-wrap items-center gap-x-6 gap-y-4 mt-auto pt-7";
const CELL_LINK =
  "group inline-flex items-center gap-2 text-[0.82rem] font-semibold text-(--accent) no-underline";
const CELL_LINK_SPAN =
  "transition-[translate] duration-200 ease-out group-hover:translate-x-[0.3rem]";

const RAIL =
  "relative grid gap-8 mt-[clamp(3.5rem,6vw,5rem)] list-none p-0 before:content-[''] before:absolute before:left-[1.375rem] before:top-6 before:bottom-6 before:w-px before:bg-[linear-gradient(180deg,var(--accent-line),var(--line))] lg:grid-cols-5 lg:gap-6 lg:before:left-0 lg:before:right-0 lg:before:top-[1.375rem] lg:before:bottom-auto lg:before:w-auto lg:before:h-px lg:before:bg-[linear-gradient(90deg,var(--accent-line),var(--line))]";
const STAGE =
  "group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 items-start lg:block";
const STAGE_CONTENT = "lg:mt-[1.35rem]";
const STAGE_DOT =
  "relative z-[1] grid w-11 h-11 place-items-center rounded-full border border-(--accent-line) bg-(--page-bg) font-mono text-xs font-semibold text-(--accent) [transition:background-color_250ms_ease,color_250ms_ease,scale_300ms_cubic-bezier(0.23,1,0.32,1)] group-hover:bg-(--accent) group-hover:text-white group-hover:scale-[1.08]";
const STAGE_H3 =
  "font-heading text-[1.05rem] font-bold tracking-[-0.025em] leading-[1.3] text-(--page-fg)";
const STAGE_P = "mt-[0.6rem] text-[0.88rem] leading-[1.65] text-(--muted)";

const NOTE =
  "max-w-[58ch] py-[1.35rem] px-[1.6rem] border border-(--line) border-l-2 border-l-(--accent-line) rounded-xl bg-(--card) text-[0.95rem] leading-[1.7] text-(--muted)";

const MATRIX =
  "grid gap-px m-0 border border-(--line) rounded-[1.5rem] bg-(--line) overflow-hidden md:grid-cols-2";
const MATRIX_CELL =
  "bg-(--surface) py-[1.65rem] px-[1.75rem] transition-[background-color] duration-[250ms] hover:bg-(--card-hover)";
const MATRIX_LABEL =
  "flex items-baseline gap-3 font-heading text-[1.02rem] font-bold tracking-[-0.025em] text-(--page-fg)";
const MATRIX_NUM =
  "font-mono text-[0.66rem] font-semibold tracking-[0.14em] text-(--accent)";
const MATRIX_VALUE =
  "mt-[0.6rem] ml-9 text-[0.88rem] leading-[1.65] text-(--muted)";
const MATRIX_FOOTNOTE =
  "max-w-[62ch] mt-6 text-[0.82rem] leading-[1.65] text-(--dim)";

function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
      <div className="section-divider" />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <main className="relative pb-24">
      {/* ================================================================= */}
      {/* 1. HERO — the room, the standard, the invitation                  */}
      {/* ================================================================= */}
      <section className={ACADEMY_HERO} aria-labelledby="academy-title">
        <div className={ACADEMY_INNER}>
          <div className={ACADEMY_COPY}>
            <ScrollReveal delay={1}>
              <h1 id="academy-title" className={ACADEMY_TITLE}>
                Blockfuse Labs
                <br />
                Academy.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className={ACADEMY_LEAD}>
                Rigorous, project-based training for engineers ready to do the
                work—not simply collect another certificate.
              </p>
            </ScrollReveal>

            <ScrollReveal className={ACADEMY_ACTIONS} delay={3}>
              <ButtonLink href="#programs">Explore programs</ButtonLink>

              <Link href="/contact" className={ACADEMY_LINK}>
                Ask a question
                <span aria-hidden="true">↗</span>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal className={ACADEMY_VISUAL} delay={2}>
            <figure className={ACADEMY_PORTRAIT}>
              <Image
                src="/brand/Deborah.jpeg"
                alt="Deborah at Blockfuse Labs Academy"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 48vw"
                className={ACADEMY_PORTRAIT_PIC}
              />
              <figcaption className={ACADEMY_CAPTION}>
                <span className={ACADEMY_CAPTION_META}>Cohort IV</span>
                <strong className={ACADEMY_CAPTION_TITLE}>Builders at Blockfuse Labs</strong>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

    

      {/* ================================================================= */}
      {/* 3. WHY TRAIN AT BLOCKFUSE — The Blockfuse Labs difference              */}
      {/* ================================================================= */}
      <section className={`${BAND} px-5 py-24 sm:px-7 sm:py-32`}>
        <div className={BAND_ORBS} aria-hidden="true">
          <span className={ORB_THREE} />
        </div>
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className={`${EYEBROW} ${BF_EYEBROW_LIGHT}`}>
              The Blockfuse Labs difference
            </span>
            <h2 className={`${BF_H2} mt-4 text-white`}>
              We don&apos;t train for certificates
            </h2>
            <p className="mt-6 text-[clamp(1rem,1.25vw,1.1rem)] leading-[1.75] text-[rgba(255,255,255,0.72)] max-w-[52ch]">
              We train engineers who can think independently, solve unfamiliar
              problems, ship production code, and thrive in real technical
              environments.
            </p>
          </ScrollReveal>

          <div className="mt-14 sm:mt-16">
            {academyPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="sticky mb-6"
                style={{
                  top: `calc(5.75rem + ${idx * 1.35}rem)`,
                  zIndex: idx + 1,
                }}
              >
                <ScrollReveal delay={idx < 4 ? idx + 1 : 4}>
                  <article className={PILLAR} data-cursor="PILLAR">
                    {/* Large background number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute right-6 top-1/2 -translate-y-1/2 font-heading font-bold leading-none text-[7rem] sm:text-[9rem] text-(--page-fg)/[0.06] dark:text-white/[0.05]"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10 grid gap-6 sm:grid-cols-[1fr_minmax(0,1.2fr)] sm:items-center">
                      <div>
                        <span className={PILLAR_INDEX}>{String(idx + 1).padStart(2, "0")}</span>
                        <h3 className={PILLAR_H3}>
                          {pillar.title}
                        </h3>
                      </div>
                      <div>
                        <p className={PILLAR_P}>
                          {pillar.copy}
                        </p>
                        {pillar.subCopy && (
                          <p className={PILLAR_NOTE}>{pillar.subCopy}</p>
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              </div>
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
            <span className={EYEBROW}>Curriculum &amp; specialized tracks</span>
            <h2 className={`${BF_H2} mt-4`}>Choose your program</h2>
          </ScrollReveal>

          <div className={`${PROGRAM_GRID} mt-16 sm:mt-20`}>
            {detailedPrograms.map((program, i) => {
              const media = PROGRAM_MEDIA[program.id];
              const shownTopics = program.topics.slice(0, 4);
              const remaining = program.topics.length - shownTopics.length;
              return (
                <ScrollReveal key={program.id} delay={i < 3 ? i + 1 : 3} threshold={0.08}>
                  <article id={program.id} className={`${PROGRAM_CARD} scroll-mt-24`}>
                    <div className={PROGRAM_MEDIA_BOX}>
                      <span className={PROGRAM_INDEX} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 28vw"
                        className={PROGRAM_MEDIA_PIC}
                      />
                    </div>

                    <div className={PROGRAM_BODY}>
                      <h3 className={PROGRAM_H3}>{program.title}</h3>
                      <p className={PROGRAM_DESCRIPTION}>
                        {program.description}
                      </p>

                      <ul className={PROGRAM_TOPICS}>
                        {shownTopics.map((topic) => (
                          <li key={topic} className={TOPIC_CHIP}>
                            {topic}
                          </li>
                        ))}
                        {remaining > 0 && (
                          <li className={`${TOPIC_CHIP} ${TOPIC_CHIP_MUTED}`}>
                            +{remaining} more
                          </li>
                        )}
                      </ul>

                      <div className={PROGRAM_ACTIONS}>
                        <ModalButton
                          modal="program"
                          prefill={{ Track: program.title }}
                        >
                          Apply for this track
                        </ModalButton>
                        <Link
                          href={`/contact?program=${program.id}`}
                          className={CELL_LINK}
                        >
                          <span className={CELL_LINK_SPAN}>Full curriculum</span>
                          <span className={CELL_LINK_SPAN} aria-hidden="true">→</span>
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
                <span className={EYEBROW}>Graduation standards</span>
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
            <span className={EYEBROW}>The standard</span>
            <h2 className={`${BF_H2} mt-4`}>Your path through Blockfuse Labs</h2>
            <p className={`${BF_PROSE} mt-6`}>
              Completing a program does not automatically mean someone is ready
              for placement. Every stage has a clear meaning and standard.
            </p>
          </ScrollReveal>

          <ol className={RAIL}>
            {academyPathStages.map((stage, index) => (
              <li key={stage.stage} className={STAGE}>
                <span className={STAGE_DOT}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={STAGE_CONTENT}>
                  <h3 className={STAGE_H3}>{stage.stage}</h3>
                  <p className={STAGE_P}>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <ScrollReveal className={`${NOTE} mt-14`} delay={1}>
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
            <span className={EYEBROW}>Evaluation matrix</span>
            <h2 className={`${BF_H2} mt-4`}>
              The production-readiness assessment
            </h2>
            <p className={`${BF_PROSE} mt-6`}>
              The assessment measures whether you can apply what you have
              learned in conditions that reflect real engineering work.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-14" delay={1}>
            <dl className={MATRIX}>
              {assessmentMatrix.map((row, i) => (
                <div key={row.area} className={MATRIX_CELL}>
                  <dt className={MATRIX_LABEL}>
                    <span className={MATRIX_NUM} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {row.area}
                  </dt>
                  <dd className={MATRIX_VALUE}>{row.whatWeAssess}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <p className={MATRIX_FOOTNOTE}>
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
                <span className={EYEBROW}>Alumni voices</span>
              </ScrollReveal>
              <h2 className={BF_H2}>
                What <em className="font-light text-[var(--muted)]">graduates</em> say
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className={BF_PROSE}>
                Real engineers, real feedback. Here&apos;s what our alumni say
                about training at Blockfuse Labs.
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
        <div className={CTA}>
          <div className={CTA_MEDIA} aria-hidden="true">
            <Image
              src="/brand/heropic.jpg"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className={CTA_MEDIA_PIC}
            />
          </div>
          <span className={ORB_FOUR} aria-hidden="true" />

          <ScrollReveal className={CTA_INNER}>
            <span className={`${EYEBROW} ${BF_EYEBROW_LIGHT}`}>
              Cohort  — applications open
            </span>
            <h2 className={CTA_H2}>Ready to prove what you can do?</h2>
            <p className={CTA_P}>
              Choose the program that matches your current level and the
              engineer you want to become.
            </p>
            <div className={CTA_ACTIONS}>
              <ButtonLink href="#programs">Apply to the next cohort</ButtonLink>
              <ModalButton
                modal="sponsor"
                variant="secondary"
                className={BF_ON_DARK_BTN}
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
