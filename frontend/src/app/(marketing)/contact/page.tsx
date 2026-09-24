import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ContactFormClient } from "./contact-form-client";
import { ContactInfo } from "./contact-info";
import { socialLinks } from "@/config/social";
import { BTN_SECONDARY, EYEBROW, SURFACE_CARD } from "@/lib/styles";

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

const GRAIN =
  "grain-overlay absolute inset-0 pointer-events-none opacity-[0.035] z-[2]";

const HERO =
  "relative isolate overflow-hidden min-h-[70vh] md:min-h-[70vh] flex flex-col justify-center bg-[#0d0d13] text-white after:content-[''] after:absolute after:inset-0 after:-z-[1] _100%)]";
const HERO_MEDIA = "absolute inset-0 -z-[2]";
const HERO_MEDIA_PIC =
  "object-cover object-[center_60%] opacity-[0.50]";

const ORB = "absolute z-0 rounded-full pointer-events-none";
const ORB_ONE = `${ORB} w-[34rem] h-[34rem] -top-[14rem] -right-[10rem] bg-white opacity-[0.06] blur-[6rem]`;
const ORB_TWO = `${ORB} w-[22rem] h-[22rem] -bottom-[10rem] -left-[8rem] bg-white opacity-[0.05] blur-[6rem]`;

const HERO_INNER =
  "relative z-[3] w-full mx-auto max-w-[1240px] pt-[clamp(4.5rem,10vw,7.5rem)] px-5 pb-[clamp(8rem,13vw,11rem)] sm:px-7";
const KICKER =
  "inline-flex items-center gap-3 font-mono text-[0.75rem] font-semibold tracking-[0.11em] uppercase text-[rgba(255,255,255,0.88)]";
const HERO_H1 =
  "mt-[1.9rem] max-w-[22ch] font-heading text-[clamp(2.9rem,7.4vw,6rem)] font-bold leading-[0.95] tracking-[-0.055em] text-white";
const HERO_ACCENT = "text-[#dba7f2]";
const HERO_LEAD =
  "grid gap-[1.15rem] max-w-[58ch] mt-[2.25rem] text-[clamp(0.98rem,1.3vw,1.1rem)] leading-[1.75] text-[rgba(255,255,255,0.74)]";
const HERO_LEAD_STRONG =
  "text-[clamp(1.05rem,1.55vw,1.3rem)] font-medium leading-[1.6] text-white";

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
      <section className={HERO}>
        <div className={HERO_MEDIA} aria-hidden="true">
          <Image
            src="/about/image00019.jpeg"
            alt="Blockfuse Labs team"
            fill
            priority
            sizes="100vw"
            className={HERO_MEDIA_PIC}
          />
        </div>
        <span className={ORB_ONE} aria-hidden="true" />
        <span className={ORB_TWO} aria-hidden="true" />
        <div className={GRAIN} aria-hidden="true" />

        <div className={HERO_INNER}>
          <ScrollReveal delay={1}>
            <h1 className={HERO_H1}>
              We&apos;d love to <br />
              <span className={HERO_ACCENT}>hear from you</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal className={HERO_LEAD} delay={2}>
            <p className={HERO_LEAD_STRONG}>
              Start a conversation with our team.
            </p>
            <p>
              Whether you have questions about our training cohorts, studio engineering services, or ecosystem partnerships, we are ready to help.
            </p>
          </ScrollReveal>
        </div>
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
                <span className={`${EYEBROW} mb-4`}>{" CONTACT DETAILS"}</span>
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
            <span className={`${EYEBROW} mb-4`}>{" SEND US A MESSAGE"}</span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
              Get in Touch
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <TiltCard className={`${SURFACE_CARD} p-8 sm:p-10`}>
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
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_SECONDARY}
              >
                {social.label} ↗
              </a>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
