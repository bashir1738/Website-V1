import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CounterStat } from "@/components/ui/counter-stat";
import { aboutBeliefs, aboutPartners } from "@/features/about/content";
import { EYEBROW, SURFACE_CARD, SURFACE_CARD_ACCENT } from "@/lib/styles";

const tractionStats = [
  { value: "797+", label: "Developers trained" },
  { value: "5,500+", label: "Smart contracts deployed" },
  { value: "57+", label: "Projects and dApps built" },
  { value: "3,620+", label: "Hours of technical training delivered" },
] as const;

export const metadata: Metadata = {
  title: "About Blockfuse Labs: built in Jos, working globally",
  description:
    "Blockfuse Labs trains engineers for the AI-native world and delivers dependable AI, web, and blockchain software from Jos, Nigeria.",
};

const GRAIN =
  "grain-overlay absolute inset-0 pointer-events-none opacity-[0.035] z-[2]";

const HERO =
  "relative isolate overflow-hidden bg-[#0d0d13] text-white after:content-[''] after:absolute after:inset-0 after:-z-[1] after:bg-[linear-gradient(180deg,rgba(13,13,19,0.35)_0%,rgba(13,13,19,0.5)_52%,rgba(13,13,19,0.75)_100%)]";
const HERO_MEDIA = "absolute inset-0 -z-[2]";
const HERO_MEDIA_PIC =
  "object-cover object-[center_60%]   opacity-[0.70]";

const ORB = "absolute z-0 rounded-full pointer-events-none";
const ORB_ONE = `${ORB} w-[34rem] h-[34rem] -top-[14rem] -right-[10rem] bg-white opacity-[0.06] blur-[6rem]`;
const ORB_TWO = `${ORB} w-[22rem] h-[22rem] -bottom-[10rem] -left-[8rem] bg-white opacity-[0.05] blur-[6rem]`;

const HERO_INNER =
  "relative z-[3] mx-auto max-w-[1240px] pt-[clamp(4.5rem,10vw,7.5rem)] px-5 pb-[clamp(8rem,13vw,11rem)] sm:px-7";
const KICKER =
  "inline-flex items-center gap-3 font-mono text-[0.75rem] font-semibold tracking-[0.11em] uppercase text-[rgba(255,255,255,0.88)]";
const KICKER_MARK = "inline-flex items-center gap-[2px]";
const KICKER_DOT = "w-[0.7rem] h-[0.7rem] rounded-full bg-(--accent-soft)";
const KICKER_BAR = "w-[0.3rem] h-[0.7rem] rounded-full bg-white";
const HERO_H1 =
  "mt-[1.9rem] max-w-[22ch] font-heading text-[clamp(2.9rem,7.4vw,6rem)] font-bold leading-[0.95] tracking-[-0.055em] text-white";
const HERO_ACCENT = "text-[#dba7f2]";
const HERO_LEAD =
  "grid gap-[1.15rem] max-w-[58ch] mt-[2.25rem] text-[clamp(0.98rem,1.3vw,1.1rem)] leading-[1.75] text-[rgba(255,255,255,0.74)]";
const HERO_LEAD_STRONG =
  "text-[clamp(1.05rem,1.55vw,1.3rem)] font-medium leading-[1.6] text-white";
const HERO_ACTIONS = "flex flex-wrap items-center gap-7 mt-[2.5rem]";
const HERO_LINK =
  "inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[rgba(255,255,255,0.88)] underline decoration-[rgba(255,255,255,0.4)] underline-offset-[0.35rem] transition-[color,text-decoration-color] duration-150 ease-out hover:text-[#e8c6f7] hover:decoration-[#e8c6f7]";

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className={HERO}>
        <div className={HERO_MEDIA} aria-hidden="true">
          <Image
            src="/brand/companie3.jpeg"
            alt=""
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
              About <br />
              <span className={HERO_ACCENT}>the company</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal className={HERO_LEAD} delay={2}>
            <p className={HERO_LEAD_STRONG}>
              We develop engineers, not certificates.
            </p>
            <p>
              Production-grade software engineering and technical talent built
              from Jos, Nigeria for the global Web3 ecosystem.
            </p>
          </ScrollReveal>

          <ScrollReveal className={HERO_ACTIONS} delay={3}>
            <ButtonLink href="/contact?intent=project" dataCursor="BUILD">
              Work with us
            </ButtonLink>
            <Link href="#structure" className={HERO_LINK}>
              Our structure
              <span aria-hidden="true">↓</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. WHAT WE DO — Tilt Cards */}
      {/* ========================================================================= */}
      <section id="structure" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className={EYEBROW}>Our Structure</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What we do
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                num: "01",
                tag: "Training",
                title: "Blockfuse Academy",
                desc: "The Academy finds people with potential and puts them through a demanding, project-based program in AI-native software engineering, applied AI, and blockchain.",
                highlight: "We assess students on what they can build, how they think, how they communicate, and whether they can take responsibility for real work. Not on attendance.",
                link: "/training",
                linkText: "Explore the Academy",
              },
              {
                num: "02",
                tag: "Placement",
                title: "Blockfuse Talent Network",
                desc: "Engineers who pass our production-readiness assessment become Blockfuse Verified Engineers. Those approved for employer introductions enter the Blockfuse Talent Network, which is what companies hire from. Others use what they learned to start something of their own.",
                highlight: "Companies get access to evaluated talent. Engineers get a credible route from training to paid work.",
                link: "/engineering#hire",
                linkText: "Hire Blockfuse engineers",
              },
              {
                num: "03",
                tag: "Studio",
                title: "Blockfuse Engineering",
                desc: "Our senior engineers advise organisations and deliver AI, web, blockchain, and backend systems.",
                highlight: "Client work keeps our technical leadership close to real production problems, and gives the curriculum a direct relationship with how software is actually built and maintained.",
                link: "/engineering",
                linkText: "Explore engineering services",
              },
              {
                num: "04",
                tag: "Platform",
                title: "ProdFest",
                desc: "ProdFest gives engineers and founders a stage to demonstrate what they have built, and puts them in front of employers, collaborators, funders, and technology ecosystems.",
                highlight: "The proving ground for execution over talk.",
                link: "/prodfest",
                linkText: "Discover ProdFest",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i < 4 ? i + 1 : 4}>
                <TiltCard
                  dataCursorText="LEARN"
                  className={`${SURFACE_CARD} ${SURFACE_CARD_ACCENT} flex h-full flex-col justify-between p-7 sm:p-9`}
                >
                  <div>
                    <span className={EYEBROW}>{item.num} • {item.tag}</span>
                    <h3 className="mt-2 font-heading text-xl font-bold text-[var(--page-fg)] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                      {item.desc}
                    </p>
                    <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 text-xs sm:text-sm text-[var(--muted)]">
                      {item.highlight}
                    </div>
                  </div>
                  <div className="mt-8 border-t border-[var(--line)] pt-5">
                    <Link
                      href={item.link}
                      className="link-hover group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                    >
                      <span>{item.linkText}</span>
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 3. WHAT WE BELIEVE */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center">
            <span className={EYEBROW}>Core Principles</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              What we believe
            </h2>
          </ScrollReveal>

          <div className="mt-14 space-y-4">
            {aboutBeliefs.map((belief, idx) => (
              <ScrollReveal key={belief.title} delay={idx < 5 ? idx + 1 : 5}>
                <TiltCard
                  dataCursorText="VALUE"
                  className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-6 sm:p-7"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center  mb-2 rounded-xl bg-[var(--accent)] font-heading text-xs font-bold text-white shadow-sm">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--page-fg)] sm:text-xl">
                      {belief.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                      {belief.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. OUR PROGRESS (STATS WITH COUNTER) */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className={EYEBROW}>Traction & Impact</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Built in Jos. Creating impact across Africa.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tractionStats.map((m, i) => (
              <ScrollReveal key={m.label} delay={i + 1}>
                <TiltCard
                  dataCursorText="STAT"
                  className="p-8 text-center"
                >
                  <p className="font-heading text-4xl font-bold tracking-tight text-[#35147a] dark:text-[#c9a0e8] sm:text-5xl">
                    <CounterStat value={m.value} />
                  </p>
                  <p className="mt-3 text-sm leading-snug text-[var(--muted)]">
                    {m.label}
                  </p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 5. PARTNERS AND SUPPORTERS */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center">
            <span className={EYEBROW}>Ecosystem Supporters</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Partners and supporters
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              Organisations that have funded places, sponsored a cohort or an
              event, or engaged us for engineering work.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <TiltCard className="p-8 sm:p-10">
              <ul className="space-y-6 divide-y divide-[var(--line)]">
                {aboutPartners.map((p, idx) => (
                  <li
                    key={p.name}
                    className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 ${
                      idx !== 0 ? "pt-6" : ""
                    }`}
                  >
                    <strong className="text-base sm:text-lg font-heading font-bold text-[var(--page-fg)]">
                      {p.name}
                    </strong>
                    <span className="text-sm text-[var(--muted)] sm:text-right">
                      {p.description}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <p className="text-xs text-[var(--muted)] italic">
                  Every organisation named here has given permission. We do not
                  list logos of ecosystems we merely attended events with.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal className="mt-10 text-center" delay={2}>
            <ModalButton modal="sponsor" variant="secondary">
              Become a partner
            </ModalButton>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal blur>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Work with us
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mx-auto mt-8 max-w-2xl" delay={1}>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8">
              Whether you want to train as an engineer, hire verified talent,
              build software, or support our ecosystem, there is a place for
              you.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5" delay={2}>
            <ModalButton modal="program">Join a program</ModalButton>
            <ModalButton modal="hire" variant="secondary">
              Hire engineers
            </ModalButton>
            <ButtonLink href="/contact?intent=project" variant="secondary" dataCursor="BUILD">
              Start a project
            </ButtonLink>
            <ModalButton modal="sponsor" variant="secondary">
              Partner with us
            </ModalButton>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
