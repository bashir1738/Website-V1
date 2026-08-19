import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

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
    <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
      <div className="section-divider" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[var(--accent)]/8 blur-[120px] md:h-[48rem] md:w-[48rem]" />
      <div className="pointer-events-none absolute right-10 top-[40rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/3 blur-[120px]" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-40 ">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Contact
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">
              Jos, Nigeria
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08]">
            Start the right{" "}
            <span className="gradient-text">conversation.</span>
          </h1>

          {/* Lead & Paragraphs */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Tell us whether you want to join a program, hire an engineer, have
              something built, train your team, sponsor a cohort, or take part in
              ProdFest.
            </p>
            <p>
              The fastest route is email, with a sentence or two about what you
              need. We reply to real enquiries within two working days.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. DIRECT CONTACTS & ENQUIRY FORM */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Direct Channels Directory */}
            <div className="space-y-6">
              <div>
                <span className="eyebrow">
                  Direct Directory
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[var(--page-fg)] sm:text-4xl">
                  Direct
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Reach the right team directly with contextual subject lines:
                </p>
              </div>

              <div className="space-y-3">
                {directChannels.map((c) => (
                  <a
                    key={c.topic}
                    href={`mailto:${c.email}?subject=${encodeURIComponent(
                      c.subject
                    )}`}
                    className="surface-card group block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/25"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-[var(--page-fg)] group-hover:text-[var(--accent)] transition">
                        {c.topic}
                      </h3>
                      <span className="text-xs font-mono text-[var(--accent)]">
                        {c.email}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[var(--muted)] leading-relaxed sm:text-sm">
                      {c.hint}
                    </p>
                  </a>
                ))}

                {/* Location */}
                <div className="surface-card rounded-2xl p-5 border border-[var(--line)]">
                  <h3 className="font-bold text-base text-[var(--page-fg)]">
                    Location
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--muted)] sm:text-sm">
                    Jos, Plateau State, Nigeria.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div>
              <div className="surface-card sticky top-28 rounded-2xl p-8 sm:p-10 border border-[var(--line)] shadow-2xl">
                <span className="eyebrow">
                  Online Message
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[var(--page-fg)] sm:text-3xl">
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
                    This form launches your default email client with your
                    message formatted cleanly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


