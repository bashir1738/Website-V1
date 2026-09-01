import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { TeamNetwork } from "@/features/home/team-network";
import {
  howBlockfuseWorks,
  programPaths,
} from "@/features/home/content";

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
                From potential to production
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 className="mt-6 max-w-[12ch] font-heading text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[0.96] tracking-[-0.055em] text-[var(--page-fg)]">
                We build engineers who can build the future.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="mt-7 max-w-[55ch] text-base leading-[1.7] text-[var(--muted)] sm:text-lg">
                Blockfuse Labs turns high-potential people into production-ready
                software engineers through demanding training, real deadlines,
                and direct review from working engineers.
              </p>
            </ScrollReveal>

            <ScrollReveal className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" delay={3}>
              <ButtonLink href="#choose-your-path">Explore our programs</ButtonLink>
              <Link href="/engineering" className="hero-text-link">
                Build with our engineers
                <span aria-hidden="true">↗</span>
              </Link>
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
                src="/brand/heropic.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 1023px) 45vw, 21vw"
                className="object-cover object-[70%_45%]"
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
              Three focused routes. Each one is built around real work,
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
                    modal={i === 2 ? "hire" : "program"}
                    variant="link"
                    className="path-journey-action"
                    prefill={i === 2 ? undefined : { Track: program.title }}
                  >
                    {i === 2 ? "Train your team" : "Explore this path"}
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
                            : "Engineers collaborating during a Blockfuse working session"
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

      <TeamNetwork />

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
      {/* 13. FINAL CTA */}
      {/* ================================================================= */}
      <section className="final-path-section" aria-labelledby="final-path-title">
        <div className="final-path-copy">
          <ScrollReveal blur>
            <span className="eyebrow">Choose what comes next</span>
            <h2 id="final-path-title">
              Potential deserves a path. Companies deserve proof.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <p>
              Learn the work, hire proven engineers, build a serious product, or
              help create the next opportunity. Blockfuse is where it starts.
            </p>
          </ScrollReveal>

          <ScrollReveal className="final-path-primary" delay={2}>
            <ButtonLink href="#choose-your-path">Find your path</ButtonLink>
          </ScrollReveal>
        </div>

        <div className="final-path-window">
          <div className="final-path-track">
            <article className="final-path-card">
              <span className="final-path-index">01 · Academy</span>
              <h3>Become an engineer worth hiring.</h3>
              <p>Train through real products, deadlines, and direct technical review.</p>
              <ButtonLink href="/training" variant="secondary">Explore the Academy</ButtonLink>
            </article>

            <article className="final-path-card">
              <span className="final-path-index">02 · Talent</span>
              <h3>Add proven engineers to your team.</h3>
              <p>Meet vetted builders trained to contribute inside production teams.</p>
              <ModalButton modal="hire" variant="secondary" arrow={false}>
                Hire our engineers
              </ModalButton>
            </article>

            <article className="final-path-card">
              <span className="final-path-index">03 · Studio</span>
              <h3>Turn an ambitious idea into a shipped product.</h3>
              <p>Work with our senior-led engineering studio from scope to delivery.</p>
              <ButtonLink href="/engineering" variant="secondary">Start a project</ButtonLink>
            </article>

            <article className="final-path-card">
              <span className="final-path-index">04 · Partnership</span>
              <h3>Create more opportunities for African engineers.</h3>
              <p>Support cohorts, events, and pathways from potential to production.</p>
              <ModalButton modal="sponsor" variant="secondary" arrow={false}>
                Partner with us
              </ModalButton>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
