import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ContactFormClient } from "./contact-form-client";
import { ContactInfo } from "./contact-info";

export const metadata: Metadata = {
  title: "Contact Blockfuse Labs",
  description:
    "Get in touch with Blockfuse Labs for training, engineering, partnerships, or any other inquiries.",
};

/** Human-readable topic labels for the ?intent= links across the site. */
const INTENT_TOPICS: Record<string, string> = {
  "direct-hire": "Hiring engineers",
  embedded: "Embedded engineers",
  sponsor: "Sponsorship",
  "team-training": "Team training",
  project: "Starting a project",
  engineering: "Engineering services",
  "prodfest-attend": "ProdFest attendance",
  "prodfest-speak": "ProdFest speaking",
  "prodfest-sponsor": "ProdFest sponsorship",
};

interface ContactPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value?: string | string[]): string {
  return typeof value === "string" ? value : Array.isArray(value) ? value[0] ?? "" : "";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  let initialTopic = INTENT_TOPICS[first(params.intent)] ?? "";
  if (initialTopic) {
    const detail = first(params.service) || first(params.track);
    if (detail) initialTopic = `${initialTopic} — ${detail}`;
  }

  return (
    <main className="relative overflow-hidden pb-20">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-76px)] flex flex-col items-center justify-center text-center py-16 px-5 sm:px-8 border-b border-[var(--line)]">
        <ScrollReveal className="max-w-4xl">
          <span className="eyebrow block mb-6">{"// CONTACT US"}</span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08] mb-6">
            We&apos;d love to hear from you
          </h1>
          <p className="text-base text-[var(--muted)] sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you have questions about our training cohorts, studio engineering services, or ecosystem partnerships.
          </p>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT DETAILS
          ═══════════════════════════════════════════════════════════ */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">
            {/* Left: Heading */}
            <ScrollReveal>
              <div>
                <span className="eyebrow block mb-4">{"// CONTACT DETAILS"}</span>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl leading-[1.1] mb-6">
                  Feel free to get in touch with us
                </h2>
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  We&apos;re glad to hear from you. Let&apos;s keep in touch for software engineering, protocol audits, or talent deployment.
                </p>
              </div>
            </ScrollReveal>

            {/* Right: Contact cards */}
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT FORM
          ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--line)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal className="mb-12">
            <span className="eyebrow block mb-4">{"// SEND US A MESSAGE"}</span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Get in Touch
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <TiltCard className="surface-card p-8 sm:p-10">
              <ContactFormClient initialTopic={initialTopic} />
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — EXPLORE OTHER WAYS
          ═══════════════════════════════════════════════════════════ */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal blur>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Or explore other ways to connect
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12 flex flex-wrap justify-center gap-3.5" delay={1}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Twitter ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub ↗
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
