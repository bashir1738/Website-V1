import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CounterStat } from "@/components/ui/counter-stat";
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

/** Two tracks repeat their outcome line as the note; only show a note that adds something. */
function sameSentence(a: string, b: string) {
  return a.replace(/[\u2018\u2019]/g, "'") === b.replace(/[\u2018\u2019]/g, "'");
}

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
      <section className="bf-hero">
        <div className="bf-hero-media" aria-hidden="true">
          <Image
            src="/brand/path1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <span className="bf-orb bf-orb-one" aria-hidden="true" />
        <span className="bf-orb bf-orb-two" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="bf-hero-inner">
          <ScrollReveal>
            <span className="bf-kicker">
              <span className="bf-kicker-mark" aria-hidden="true">
                <span />
                <span />
              </span>
              Blockfuse Academy
            </span>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1>
              Train for the work.
              <em>Prove you are ready.</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal className="bf-hero-lead" delay={2}>
            <p className="bf-hero-lead-strong">
              Blockfuse Academy trains students into production-ready engineers
              through demanding, project-based programs in AI-native software
              engineering, applied AI, and blockchain.
            </p>
            <p>
              You will learn by building real systems, get told plainly what is
              not good enough yet, and be assessed against a clear professional
              standard. You will leave with more than a certificate. You will
              leave with evidence of what you can do, whether you go on to join
              a company or start one.
            </p>
            <p className="bf-hero-punch">
              It is not an easy program. That is the point.
            </p>
          </ScrollReveal>

          <ScrollReveal className="bf-hero-actions" delay={3}>
            <ButtonLink href="#programs">Apply to the next cohort</ButtonLink>
            <ButtonLink
              href="#assessment"
              variant="secondary"
              className="bf-on-dark-btn"
              dataCursor="EXPLORE"
            >
              How we assess you
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. PROOF STRIP — overlapping the hero                             */}
      {/* ================================================================= */}
      <div className="bf-stats-wrap">
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
      </div>

      {/* ================================================================= */}
      {/* 3. THE STANDARD FOR ENGINEERING HAS CHANGED                       */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="bf-split">
            <ScrollReveal>
              <span className="eyebrow">The modern paradigm</span>
              <h2 className="bf-h2 mt-4">
                The standard for engineering has changed.
              </h2>
              <div className="bf-prose mt-7">
                <p>
                  AI can help almost anyone produce code. That makes engineering
                  judgment more valuable, not less.
                </p>
                <p>
                  Companies need engineers who can understand systems, evaluate
                  AI-generated output, solve unfamiliar problems, collaborate
                  with a team, and take responsibility for what they ship.
                </p>
              </div>
              <p className="bf-pullquote">
                That is what Blockfuse Academy is designed to develop.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={2} threshold={0.08}>
              <figure className="bf-frame">
                <div className="bf-frame-img">
                  <Image
                    src="/brand/path3.jpg"
                    alt="Blockfuse engineers reviewing code together during a working session"
                    fill
                    sizes="(max-width: 1023px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="bf-frame-badge">
                  <strong>Direct review</strong>
                  <span>The way it happens on a professional team</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. WHY TRAIN AT BLOCKFUSE — 7 pillars on the violet band          */}
      {/* ================================================================= */}
      <section className="bf-band px-5 py-24 sm:px-7 sm:py-32">
        <span className="bf-orb bf-orb-three" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow bf-eyebrow-light">
              The Blockfuse difference
            </span>
            <h2 className="bf-h2 mt-4">Why train at Blockfuse?</h2>
          </ScrollReveal>

          <div className="bf-pillar-grid mt-14 sm:mt-16">
            {academyPillars.map((pillar, idx) => (
              <ScrollReveal
                key={pillar.title}
                className={idx === 0 ? "bf-pillar-wide" : undefined}
                delay={idx < 4 ? idx + 1 : 4}
              >
                <article className="bf-pillar" data-cursor="PILLAR">
                  <span className="bf-pillar-index">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                  {pillar.subCopy && (
                    <p className="bf-pillar-note">{pillar.subCopy}</p>
                  )}
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

          <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
            {detailedPrograms.map((program, i) => {
              const media = PROGRAM_MEDIA[program.id];
              return (
                <article
                  key={program.id}
                  id={program.id}
                  className={`bf-program scroll-mt-24 ${
                    i % 2 === 1 ? "bf-program-reverse" : ""
                  }`}
                >
                  <ScrollReveal
                    className="bf-program-visual"
                    delay={1}
                    threshold={0.08}
                  >
                    <span className="bf-program-index" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="bf-program-image">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 44vw"
                        className="object-cover"
                      />
                    </div>
                  </ScrollReveal>

                  <ScrollReveal className="bf-program-copy" delay={2}>
                    <span className="bf-program-target">
                      {program.target}
                    </span>
                    <h3>{program.title}</h3>
                    <p className="bf-program-description">
                      {program.description}
                    </p>
                    <p className="bf-program-outcome">{program.outcome}</p>
                    {program.note && !sameSentence(program.note, program.outcome) && (
                      <p className="bf-program-note">{program.note}</p>
                    )}

                    <p className="bf-topics-label">You will learn</p>
                    <ul className="bf-topics">
                      {program.topics.map((topic) => (
                        <li key={topic} className="bf-topic">
                          <span aria-hidden="true">✦</span>
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <div className="bf-program-actions">
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
                        className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                      >
                        <span>{program.ctaText}</span>
                        <span
                          aria-hidden="true"
                          className="transition group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </ScrollReveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 6. YOUR PATH THROUGH BLOCKFUSE                                    */}
      {/* ================================================================= */}
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
      <section className="px-5 py-24 sm:px-7 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Alumni outcomes</span>
            <h2 className="bf-h2 mt-4">What our graduates say</h2>
          </ScrollReveal>

          <div className="bf-quote-grid mt-14 sm:mt-16">
            {graduateTestimonials.map((item, i) => (
              <ScrollReveal key={item.author} delay={i + 1}>
                <figure className="bf-quote" data-cursor="QUOTE">
                  <blockquote>
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption>
                    <span
                      className={`bf-avatar ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                      aria-hidden="true"
                    >
                      {initials(item.author)}
                    </span>
                    <span className="bf-quote-person">
                      <strong>{item.author}</strong>
                      <span>{item.role}</span>
                      <span className="bf-quote-cohort">
                        {item.cohort}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
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
