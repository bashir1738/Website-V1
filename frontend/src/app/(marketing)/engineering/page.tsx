import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  engineeringServices,
  deliveryPrinciples,
  hiringModels,
  productHighlights,
  engineeringCapabilities,
  processsteps,
} from "@/features/engineering/content";
import {
  talentCategories,
  hiringProcessSteps,
  employerTestimonials,
} from "@/features/talent/content";
import { EngineerShowcase } from "@/features/engineering/engineer-showcase";

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
      <section className="bf-hero bf-hero--fork">
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
              BFL Engineering Studio
            </span>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1>
              Architecting <br />
              <span className="bf-hero-accent">High-Scale Protocols</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal className="bf-hero-lead" delay={2}>
            <p className="bf-hero-lead-strong">
              Blockfuse Engineering designs and delivers dependable AI, web,
              and blockchain systems — led by the same senior engineers who
              train our Academy, so the work holds up after we leave.
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
            <Link href="#build" className="bf-hero-link">
              View our work
              <span aria-hidden="true">↓</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. WHAT WE BUILD — Core Capabilities */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Studio — Core Capabilities</span>
            <h2 className="bf-h2 mt-4">What we build</h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
              End-to-end solutions across protocol development, full-stack dApps, AI systems, and production infrastructure.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="space-y-6">
              {engineeringCapabilities.map((capability, idx) => (
                <TiltCard key={capability.title} className="p-8 surface-card">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-sm font-mono font-bold text-[var(--accent)]">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--page-fg)] mb-1">
                        {capability.title}
                      </h3>
                      <span className="text-xs font-mono tracking-widest text-[var(--dim)] uppercase">
                        {capability.tagline}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono border border-[var(--line-strong)] bg-[var(--card)] px-2.5 py-1 text-[var(--dim)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. THE TWO ROUTES — the fork the rest of the page is organised around */}
      {/* ================================================================= */}
      <div className="bf-route-wrap">
        <ScrollReveal>
          <p className="bf-route-label">Two ways to work with Blockfuse</p>
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
            <span className="eyebrow">Studio — Scope &amp; engagements</span>
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
      {/* 4. WHAT WE'VE BUILT                                               */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Studio — Proof of work</span>
            <h2 className="bf-h2 mt-4">What we&apos;ve built</h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
              Client work stays private, but our tools don&apos;t. These are
              products our own engineers designed, shipped, and still
              maintain — held to the same standard as anything we deliver.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="bf-cells bf-cells-3">
              {productHighlights.map((product, idx) => (
                <article key={product.name} className="bf-cell">
                  <div className="bf-cell-head">
                    <span className="bf-cell-index">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="bf-cell-chip">{product.tag}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="bf-cell-fine">{product.proof}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            <Link href="/open-source" className="bf-cell-link">
              See everything we maintain in the open
              <span aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. HOW WE WORK — violet band                                      */}
      {/* ================================================================= */}
      <section className="bf-band px-5 py-24 sm:px-7 sm:py-32">
        <span className="bf-orb bf-orb-three" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow bf-eyebrow-light">
              Studio — Delivery principles
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
                    <span className="bf-cell-chip">{principle.eyebrow}</span>
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
      {/* 6. HIRING — evidence, then the specialisms                        */}
      {/* ================================================================= */}
      <section id="hire" className="scroll-mt-24 px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="bf-split">
            <ScrollReveal>
              <span className="eyebrow">Talent — The hiring reality</span>
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
            <span className="eyebrow">Talent — Specialisations</span>
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

          <div className="mt-20 flex flex-wrap items-end justify-between gap-4 sm:mt-24">
            <ScrollReveal className="max-w-[46rem]">
              <span className="eyebrow">Talent — The network in practice</span>
              <h2 className="bf-h2 mt-4">Meet our engineers</h2>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
                A sample of the Blockfuse Talent Network. Every profile here
                passed the same assessment before an employer ever saw it.
              </p>
            </ScrollReveal>
            <p className="mono-tag">Auto-rotating — click any profile</p>
          </div>

          <ScrollReveal className="mt-10" delay={2} threshold={0.08}>
            <EngineerShowcase />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6B. OUR PROCESS — Development Workflow */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Studio — Development Methodology</span>
            <h2 className="bf-h2 mt-4">Our process</h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
              A structured, milestone-driven approach ensuring quality and security at every stage.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="grid gap-1 lg:grid-cols-2">
              {/* Process Steps */}
              <div className="border border-[var(--line)] bg-[var(--card)]/30 p-8 space-y-8">
                {processsteps.map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-px bg-[var(--accent)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[var(--page-fg)] mb-2">
                        <span className="font-mono text-sm text-[var(--accent)]">{item.step}.</span> {item.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Box */}
              <div className="border border-[var(--line)] bg-[var(--card)]/30 p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--page-fg)] tracking-wide mb-2">IMPLEMENTATION PROCESS</h3>
                    <p className="text-sm text-[var(--muted)]">Structured approach to Web3 development</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      We follow a methodical, milestone-driven process that ensures quality at every stage:
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--accent)] font-bold mt-0.5">•</span>
                        <span className="text-sm text-[var(--muted)]">
                          <strong className="text-[var(--page-fg)]">Discovery Phase:</strong> Understanding requirements and design
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--accent)] font-bold mt-0.5">•</span>
                        <span className="text-sm text-[var(--muted)]">
                          <strong className="text-[var(--page-fg)]">Architecture:</strong> Senior oversight on technical decisions
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--accent)] font-bold mt-0.5">•</span>
                        <span className="text-sm text-[var(--muted)]">
                          <strong className="text-[var(--page-fg)]">Development:</strong> Rigorous testing and iterative work
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--accent)] font-bold mt-0.5">•</span>
                        <span className="text-sm text-[var(--muted)]">
                          <strong className="text-[var(--page-fg)]">Security:</strong> Formal audits and verification
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--accent)] font-bold mt-0.5">•</span>
                        <span className="text-sm text-[var(--muted)]">
                          <strong className="text-[var(--page-fg)]">Deployment:</strong> Mainnet launch and monitoring
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)]">
                    <p className="text-[10px] font-mono text-[var(--dim)] uppercase tracking-widest mb-3">Key Deliverables</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-mono border border-[var(--accent-line)] bg-[var(--accent-dim)] text-[var(--accent)] px-3 py-1 rounded">Production Code</span>
                      <span className="text-[9px] font-mono border border-[var(--accent-line)] bg-[var(--accent-dim)] text-[var(--accent)] px-3 py-1 rounded">100% Tests</span>
                      <span className="text-[9px] font-mono border border-[var(--accent-line)] bg-[var(--accent-dim)] text-[var(--accent)] px-3 py-1 rounded">Audit Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 7. WAYS TO WORK WITH US                                           */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Talent — Engagement models</span>
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
      {/* 8. HOW HIRING WORKS                                               */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Talent — The hiring flow</span>
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
      {/* 9. WHAT EMPLOYERS SAY                                             */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className="eyebrow">Talent — Employer endorsements</span>
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
      {/* 10. FINAL CTA                                                      */}
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
