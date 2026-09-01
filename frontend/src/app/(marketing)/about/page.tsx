import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { KineticHeroTitle } from "@/components/ui/kinetic-hero";
import { CounterStat } from "@/components/ui/counter-stat";
import { aboutBeliefs, aboutPartners } from "@/features/about/content";
import { stats } from "@/features/home/content";

export const metadata: Metadata = {
  title: "About Blockfuse Labs: built in Jos, working globally",
  description:
    "Blockfuse Labs trains engineers for the AI-native world and delivers dependable AI, web, and blockchain software from Jos, Nigeria.",
};

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
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl">
          {/* Heading with Kinetic Typography */}
          <div>
            <KineticHeroTitle
              prefix="Talent should be judged by what it can build,"
              cycleWords={["not where it comes from.", "backed by working code.", "proven in production."]}
              suffix=""
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]"
            />
          </div>

          <ScrollReveal className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-8" delay={1}>
            <p className="font-medium text-[var(--page-fg)] text-lg sm:text-xl">
              Blockfuse Labs trains engineers for the AI-native world and builds
              dependable software for organisations.
            </p>
            <p>
              We are based in Jos, Plateau State, Nigeria. Everything we do is
              built around one standard: the work has to hold up in the real
              world.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" delay={2}>
            <ButtonLink href="/training" dataCursor="ACADEMY">Explore the Academy</ButtonLink>
            <ButtonLink href="/contact" variant="secondary" dataCursor="WORK">
              Work with us
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 2. WHAT WE DO — Tilt Cards */}
      {/* ========================================================================= */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow">Our Structure</span>
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
                  className="surface-card-accent flex h-full flex-col justify-between p-7 sm:p-9"
                >
                  <div>
                    <span className="eyebrow">{item.num} • {item.tag}</span>
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
            <span className="eyebrow">Core Principles</span>
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
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--accent)] font-heading text-xs font-bold text-white shadow-md">
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
            <span className="eyebrow">Traction & Community</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--page-fg)] sm:text-5xl">
              Our progress
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((m, i) => (
              <ScrollReveal key={m.label} delay={i + 1}>
                <TiltCard
                  dataCursorText="STAT"
                  className="p-8 text-center"
                >
                  <p className="font-heading text-4xl font-bold tracking-tight gradient-text sm:text-5xl">
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
            <span className="eyebrow">Ecosystem Supporters</span>
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
            <ButtonLink href="/training" dataCursor="JOIN">Join a program</ButtonLink>
            <ButtonLink href="/engineering#hire" variant="secondary" dataCursor="HIRE">
              Hire engineers
            </ButtonLink>
            <ButtonLink href="/engineering" variant="secondary" dataCursor="BUILD">
              Start a project
            </ButtonLink>
            <ButtonLink href="/contact?intent=partner" variant="secondary" dataCursor="PARTNER">
              Partner with us
            </ButtonLink>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
