import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import {
  EYEBROW,
  SURFACE_CARD,
  SURFACE_CARD_ACCENT,
  BF_ON_DARK_BTN,
  CTA_BANNER as CTA,
  CTA_BANNER_MEDIA as CTA_MEDIA,
  CTA_BANNER_MEDIA_PIC as CTA_MEDIA_PIC,
  CTA_BANNER_INNER as CTA_INNER,
  CTA_BANNER_H2 as CTA_H2,
  CTA_BANNER_P as CTA_P,
  CTA_BANNER_ACTIONS as CTA_ACTIONS,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "ProdFest: Where builders show the work | Blockfuse Labs",
  description:
    "ProdFest brings together developers, founders, product people, employers, and ecosystem partners around work that actually got built: demos, technical sessions, and conversations.",
};

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function ProdFestPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl">
          {/* Heading with Kinetic Typography */}
          <div>
            <KineticHeroTitle
              prefix="Where builders"
              cycleWords={["show the work.", "ship in public.", "prove what they can do."]}
              suffix=""
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]"
            />
          </div>

          {/* Paragraphs */}
          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              ProdFest brings together developers, founders, product people,
              employers, and ecosystem partners around work that actually got
              built: demos, technical sessions, and the conversations that
              follow.
            </p>
            <p className="font-semibold text-[var(--accent)]">
              Plenty of events celebrate ideas. ProdFest is for execution.
            </p>
          </ScrollReveal>

          {/* Actions */}
          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={2}>
            <ModalButton modal="prodfest">
              Ask about the next edition
            </ModalButton>
            <ButtonLink href="#get-involved" variant="secondary" dataCursor="JOIN">
              Get involved
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DEMO STAGE SHOWCASE FRAME */}
      {/* ========================================================================= */}
      <section className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <TiltCard dataCursorText="STAGE" className="p-8 sm:p-14 border border-[var(--line-strong)]">
              {/* Background subtle mesh / pattern */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(#bf64e7_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

              <div className="flex flex-col items-center justify-center text-center min-h-[18rem] sm:min-h-[22rem]">
                <span className={EYEBROW}>
                  Live Execution Stage
                </span>
                <h3 className="mt-5 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
                  ProdFest demo stage
                </h3>
                <p className="mt-3 max-w-md text-sm text-[var(--muted)] sm:text-base leading-relaxed">
                  Live product walkthroughs, real-time code reviews, and working
                  software demos presented by engineers.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>
          <p className="mt-3 text-xs text-[var(--muted)] text-left px-2 italic">
            A demo session at ProdFest.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. WHY WE RUN IT */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <TiltCard className="p-8 sm:p-12">
              <span className={EYEBROW}>
                Proof Over Promises
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
                Why we run it
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
                <p>
                  ProdFest is where the Blockfuse Labs community becomes visible to the
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
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. GET INVOLVED */}
      {/* ========================================================================= */}
      <section id="get-involved" className="px-5 py-24 sm:px-8 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center">
            <span className={EYEBROW}>
              Participation
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Get involved
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Attend */}
            <ScrollReveal delay={1}>
              <TiltCard
                dataCursorText="ATTEND"
                className={`${SURFACE_CARD} ${SURFACE_CARD_ACCENT} flex h-full flex-col justify-between p-7 sm:p-8`}
              >
                <div>
                  <span className={EYEBROW}>
                    01
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                    Attend
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:leading-7">
                    Registration for the next edition opens ahead of the event.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line)]">
                  <Link
                    href="/contact?intent=prodfest-attend"
                    className="link-hover group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]"
                  >
                    <span>Join attendee waitlist</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Speak or Demo */}
            <ScrollReveal delay={2}>
              <TiltCard
                dataCursorText="SPEAK"
                className={`${SURFACE_CARD} ${SURFACE_CARD_ACCENT} flex h-full flex-col justify-between p-7 sm:p-8`}
              >
                <div>
                  <span className={EYEBROW}>
                    02
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
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
                    className="link-hover group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]"
                  >
                    <span>Submit a demo or talk</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Sponsor */}
            <ScrollReveal delay={3}>
              <TiltCard
                dataCursorText="SPONSOR"
                className={`${SURFACE_CARD} ${SURFACE_CARD_ACCENT} flex h-full flex-col justify-between p-7 sm:p-8`}
              >
                <div>
                  <span className={EYEBROW}>
                    03
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
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
                    className="link-hover group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]"
                  >
                    <span>Request sponsor pack</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          <div className="mt-12 flex justify-center">
            <ModalButton modal="prodfest">
              Ask about the next edition
            </ModalButton>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. FINAL CTA BANNER                                                     */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className={CTA}>
          <div className={CTA_MEDIA} aria-hidden="true">
            <Image
              src="/brand/eventbg.JPG"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className={CTA_MEDIA_PIC}
            />
          </div>

          <div className={CTA_INNER}>
            <h2 className={CTA_H2}>
              Execution is the only proof.
              <br />
              <span className="gradient-text">See you at ProdFest.</span>
            </h2>

            <p className={CTA_P}>
              Whether you are an engineer looking to demo, a company looking to
              meet verified talent, or an ecosystem partner looking to connect,
              ProdFest is where it happens.
            </p>

            <div className={CTA_ACTIONS}>
              <ModalButton modal="prodfest">
                Contact the ProdFest Team
              </ModalButton>
              <ButtonLink
                href="/training"
                variant="secondary"
                className={BF_ON_DARK_BTN}
                dataCursor="ACADEMY"
              >
                Explore Academy
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
