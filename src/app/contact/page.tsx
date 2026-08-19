import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";

export const metadata: Metadata = {
  title: "Contact Blockfuse Labs",
  description:
    "Get in touch about hiring engineers, sponsoring a cohort, training, or admissions.",
};

const directChannels = [
  {
    topic: "General",
    email: "hello@blockfuselabs.com",
    subject: "General Inquiry",
    hint: "General questions, ecosystem collaboration, and press.",
  },
  {
    topic: "Hiring engineers",
    email: "hello@blockfuselabs.com",
    subject: "Hiring Engineers",
    hint: "Include the roles, how many, and when you need them.",
  },
  {
    topic: "Sponsoring a cohort",
    email: "hello@blockfuselabs.com",
    subject: "Sponsoring a Cohort",
    hint: "Tell us the skills or ecosystem you want trained for.",
  },
  {
    topic: "Corporate training",
    email: "hello@blockfuselabs.com",
    subject: "Corporate Team Training",
    hint: "Team size and what they are trying to build.",
  },
  {
    topic: "Admissions",
    email: "hello@blockfuselabs.com",
    subject: "Academy Admissions",
    hint: "Your background, current experience, and which program.",
  },
  {
    topic: "Engineering services",
    email: "hello@blockfuselabs.com",
    subject: "Engineering Services Inquiry",
    hint: "What you need built or advised on, timeline, and budget range.",
  },
];

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-4xl">
          {/* Heading with Kinetic Typography */}
          <div>
            <KineticHeroTitle
              prefix="Start the right"
              cycleWords={["conversation.", "engineering partnership.", "talent cohort."]}
              suffix=""
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]"
            />
          </div>

          {/* Lead & Paragraphs */}
          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Tell us whether you want to join a program, hire an engineer, have
              something built, train your team, sponsor a cohort, or take part in
              ProdFest.
            </p>
            <p>
              The fastest route is email, with a sentence or two about what you
              need. We reply to real enquiries within two working days.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. DIRECT CONTACTS & ENQUIRY FORM */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Direct Channels Directory */}
            <div className="space-y-6">
              <ScrollReveal>
                <div>
                  <span className="eyebrow">
                    Direct Directory
                  </span>
                  <h2 className="mt-2 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
                    Direct channels
                  </h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Reach the right team directly with contextual subject lines:
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-3">
                {directChannels.map((c, i) => (
                  <ScrollReveal key={c.topic} delay={i < 4 ? i + 1 : 4}>
                    <a
                      href={`mailto:${c.email}?subject=${encodeURIComponent(
                        c.subject
                      )}`}
                      className="block group"
                    >
                      <TiltCard dataCursorText="EMAIL" className="p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-bold text-base text-[var(--page-fg)] group-hover:text-[var(--accent)] transition">
                            {c.topic}
                          </h3>
                          <span className="text-xs font-mono text-[var(--accent)]">
                            {c.email}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-[var(--muted)] leading-relaxed sm:text-sm">
                          {c.hint}
                        </p>
                      </TiltCard>
                    </a>
                  </ScrollReveal>
                ))}

                {/* Location */}
                <ScrollReveal delay={4}>
                  <TiltCard className="p-5 border border-[var(--line)]">
                    <h3 className="font-heading font-bold text-base text-[var(--page-fg)]">
                      Physical Production Space
                    </h3>
                    <p className="mt-1.5 text-xs text-[var(--muted)] sm:text-sm">
                      Jos, Plateau State, Nigeria • 09.8965° N, 8.8583° E
                    </p>
                  </TiltCard>
                </ScrollReveal>
              </div>
            </div>

            {/* Interactive Form */}
            <div>
              <ScrollReveal delay={2}>
                <TiltCard className="sticky top-28 p-8 sm:p-10 border border-[var(--line-strong)] shadow-2xl">
                  <span className="eyebrow">
                    Online Message
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--page-fg)] sm:text-3xl">
                    Send an enquiry
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--muted)]">
                    Fill in your details below to begin:
                  </p>

                  <div className="mt-6">
                    <Suspense
                      fallback={
                        <div className="py-8 text-center text-sm text-[var(--muted)]">
                          Loading form...
                        </div>
                      }
                    >
                      <ContactForm />
                    </Suspense>
                  </div>

                  <div className="mt-6 border-t border-[var(--line)] pt-4">
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                      This form prepares and opens your message with clean formatting.
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
