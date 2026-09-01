import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  engineeringServices,
  deliveryPrinciples,
  hiringModels,
} from "@/features/engineering/content";
import {
  talentCategories,
  hiringProcessSteps,
  employerTestimonials,
} from "@/features/talent/content";

export const metadata: Metadata = {
  title: "Blockfuse Engineering: build with us, or hire from us",
  description:
    "Senior-led delivery for dependable AI, web, and blockchain systems, and production-ready engineers you can hire, embed, or sponsor.",
};

const AVATAR_TONES = ["tone-violet", "tone-blue"] as const;

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

export default function EngineeringPage() {
  return (
    <main className="relative overflow-hidden pb-24">
      {/* ================================================================= */}
      {/* 1. HERO                                                           */}
      {/* ================================================================= */}
      <section className="bf-hero">
        <div className="bf-hero-media" aria-hidden="true">
          <Image
            src="/brand/path3.jpg"
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
              Blockfuse Engineering
            </span>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1>
              Build with us.
              <em>Or hire from us.</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal className="bf-hero-lead" delay={2}>
            <p className="bf-hero-lead-strong">
              Blockfuse Engineering helps startups, companies, and technology
              ecosystems design and deliver dependable AI, web, and blockchain
              systems — and introduces the production-ready engineers who can
              carry that work inside your own team.
            </p>
            <p>
              The same senior engineers who set the standard our Academy trains
              to lead these engagements. That is why our teaching stays tied to
              how software is actually shipped, and why the work we hand over
              holds up after we leave.
            </p>
            <p className="bf-hero-punch">
              One standard, whichever route you take.
            </p>
          </ScrollReveal>

          <ScrollReveal className="bf-hero-actions" delay={3}>
            <ButtonLink href="/contact?intent=engineering" dataCursor="PROJECT">
              Describe what you need built
            </ButtonLink>
            <ButtonLink
              href="#hire"
              variant="secondary"
              className="bf-on-dark-btn"
              dataCursor="HIRE"
            >
              Hire our engineers
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. THE TWO ROUTES — riding the hero edge                          */}
      {/* ================================================================= */}
      <div className="bf-stats-wrap">
        <ScrollReveal>
          <div className="bf-choice">
            <Link href="#build" className="bf-choice-card">
              <span>Route 01 — Studio</span>
              <strong>
                We build it
                <em aria-hidden="true">→</em>
              </strong>
              <p>
                A senior-led team takes the problem from advisory through
                discovery to shipped, documented software.
              </p>
            </Link>

            <Link href="#hire" className="bf-choice-card">
              <span>Route 02 — Talent</span>
              <strong>
                You build it, with our engineers
                <em aria-hidden="true">→</em>
              </strong>
              <p>
                Hire, embed, or sponsor engineers whose ability has already been
                reviewed, assessed, and evidenced.
              </p>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* ================================================================= */}
      {/* 3. WHAT WE TAKE ON                                                */}
      {/* ================================================================= */}
      <section id="build" className="scroll-mt-24 px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Scope &amp; engagements</span>
            <h2 className="bf-h2 mt-4">What we take on</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="bf-cells bf-cells-2">
              {engineeringServices.map((service, idx) => (
                <article key={service.title} className="bf-cell">
                  <div className="bf-cell-head">
                    <span className="bf-cell-index">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="bf-cell-chip">{service.time}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <Link
                    href={`/contact?intent=engineering&service=${encodeURIComponent(
                      service.title,
                    )}`}
                    className="bf-cell-link"
                  >
                    Request {service.title.toLowerCase()}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. HOW WE WORK — violet band                                      */}
      {/* ================================================================= */}
      <section className="bf-band px-5 py-24 sm:px-7 sm:py-32">
        <span className="bf-orb bf-orb-three" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow bf-eyebrow-light">
              Delivery principles
            </span>
            <h2 className="bf-h2 mt-4">How we work</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12 sm:mt-14" delay={1}>
            <div className="bf-cells bf-cells-3">
              {deliveryPrinciples.map((principle, idx) => (
                <article key={principle.title} className="bf-cell">
                  <div className="bf-cell-head">
                    <span className="bf-cell-index">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                  <p className="bf-cell-fine">{principle.fine}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. HIRING — evidence, then the specialisms                        */}
      {/* ================================================================= */}
      <section id="hire" className="scroll-mt-24 px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="bf-split">
            <ScrollReveal>
              <span className="eyebrow">The hiring reality</span>
              <h2 className="bf-h2 mt-4">
                Applications are abundant. Evidence is scarce.
              </h2>
              <div className="bf-prose mt-7">
                <p>
                  A CV can describe experience. A certificate can confirm
                  attendance. Neither proves that someone can understand an
                  unfamiliar codebase, solve a difficult problem, collaborate
                  with a team, or take responsibility for production software.
                </p>
                <p>
                  Before we recommend an engineer, we have reviewed their code,
                  assessed their technical judgment, evaluated how they work
                  with others, and seen what they can build.
                </p>
              </div>
              <p className="bf-pullquote">
                You spend less time filtering and more time speaking with
                candidates who are genuinely qualified.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={2} threshold={0.08}>
              <figure className="bf-frame">
                <div className="bf-frame-img">
                  <Image
                    src="/brand/path1.jpg"
                    alt="Blockfuse engineers at work in a training cohort in Jos"
                    fill
                    sizes="(max-width: 1023px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="bf-frame-badge">
                  <strong>Assessed, not assumed</strong>
                  <span>Every introduction rests on reviewed work</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-20 max-w-[46rem] sm:mt-24" delay={1}>
            <span className="eyebrow">Specialisations</span>
            <h2 className="bf-h2 mt-4">Engineers you can hire</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={2}>
            <div className="bf-cells bf-cells-3">
              {talentCategories.map((category, idx) => (
                <article key={category.title} className="bf-cell">
                  <div className="bf-cell-head">
                    <span className="bf-cell-index">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 6. WAYS TO WORK WITH US                                           */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Engagement models</span>
            <h2 className="bf-h2 mt-4">Ways to work with us</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="bf-cells bf-cells-2">
              {hiringModels.map((model, idx) => (
                <article key={model.title} className="bf-cell">
                  <div className="bf-cell-head">
                    <span className="bf-cell-index">
                      Model {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{model.title}</h3>
                  <p>{model.copy}</p>
                  <p className="bf-cell-fine">{model.fine}</p>
                  <Link href={model.href} className="bf-cell-link">
                    {model.ctaText}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. HOW HIRING WORKS                                               */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">The hiring flow</span>
            <h2 className="bf-h2 mt-4">How hiring through Blockfuse works</h2>
          </ScrollReveal>

          <ol className="bf-rail bf-rail-stacked max-w-[56rem]">
            {hiringProcessSteps.map((step, index) => (
              <li key={step.number} className="bf-stage">
                <span className="bf-stage-dot">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="bf-stage-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 8. WHAT EMPLOYERS SAY                                             */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Employer endorsements</span>
            <h2 className="bf-h2 mt-4">What employers say</h2>
          </ScrollReveal>

          <div className="bf-quote-grid bf-quote-grid-2 mt-12 sm:mt-14">
            {employerTestimonials.map((item, i) => (
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
              src="/brand/path2.jpg"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover"
            />
          </div>
          <span className="bf-orb bf-orb-four" aria-hidden="true" />

          <ScrollReveal className="bf-cta-inner">
            <span className="eyebrow bf-eyebrow-light">
              Tell us what you are solving
            </span>
            <h2>Have a problem worth solving?</h2>
            <p>
              Describe the system you need built, or the role you need filled.
              We will tell you honestly which route fits, and say so early if
              neither does.
            </p>
            <div className="bf-cta-actions">
              <ButtonLink
                href="/contact?intent=engineering"
                dataCursor="PROJECT"
              >
                Start a project
              </ButtonLink>
              <ModalButton
                modal="hire"
                variant="secondary"
                className="bf-on-dark-btn"
                arrow={false}
              >
                Tell us about the role
              </ModalButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
