import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { BF_H2, EYEBROW, LINK_ACTION, SURFACE_CARD } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Blockfuse Community: Connect with engineers",
  description:
    "Join the Blockfuse community hub for events, connections, and knowledge exchange with working engineers.",
};

const channels = [
  {
    name: "Discord",
    description: "Daily conversation, help channels, and event announcements.",
    cta: "Join Discord",
    href: "https://discord.gg/blockfuse",
  },
  {
    name: "Telegram",
    description: "Real-time updates, alpha drops, and fast-paced discussions.",
    cta: "Join Telegram",
    href: "https://t.me/blockfuse",
  },
  {
    name: "Twitter / X",
    description: "Follow for ecosystem news, cohort updates, and community highlights.",
    cta: "Follow us",
    href: "https://twitter.com/blockfuselabs",
  },
  {
    name: "GitHub",
    description: "Open-source projects, cohort capstones, and contribution sprints.",
    cta: "View repos",
    href: "https://github.com/blockfuselabs",
  },
];

const pillars = [
  {
    label: "01",
    title: "Engineers who build",
    copy: "Everyone in the community is either learning to build, actively building, or has shipped production software. There is no audience here — only practitioners.",
  },
  {
    label: "02",
    title: "Honest peer review",
    copy: "Code gets reviewed the way it gets reviewed on a real team. Directly and without flattery. That standard makes the community genuinely useful.",
  },
  {
    label: "03",
    title: "Ecosystem connections",
    copy: "Members get access to protocol teams, hiring partners, mentors, and event opportunities through the Blockfuse network.",
  },
  {
    label: "04",
    title: "A stage at ProdFest",
    copy: "Community builders can showcase projects at ProdFest — our annual demo day — in front of protocols, investors, and hiring teams.",
  },
];

const showcaseItems = [
  {
    num: "01",
    tag: "Core Leadership",
    title: "The Team",
    desc: "Meet the engineers, architects, and ecosystem builders driving Blockfuse Labs forward.",
    href: "/team",
    cta: "Meet the Team",
  },
  {
    num: "02",
    tag: "Talent Pipeline",
    title: "Alumni",
    desc: "Engineers who trained with us and are now deployed across top Web3 protocols globally.",
    href: "/alumni",
    cta: "View Alumni",
  },
  {
    num: "03",
    tag: "Ecosystem Impact",
    title: "Open Source",
    desc: "Active contributions to the underlying infrastructure and tooling of the Web3 ecosystem.",
    href: "/open-source",
    cta: "View Contributions",
  },
];

function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
      <div className="section-divider" />
    </div>
  );
}

export default function CommunityPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      {/* ================================================================= */}
      {/* 1. HERO                                                           */}
      {/* ================================================================= */}
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <div className="mb-8">
              <span className={EYEBROW}>Community Hub</span>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-6xl lg:text-7xl leading-[1.08] mt-4">
                The Blockfuse Engineering <br />
                <span className="text-[var(--muted)]">Community Hub</span>
              </h1>
            </div>
            <p className="text-base text-[var(--muted)] sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Explore engineering events, connect with builders, and join a dynamic community for knowledge exchange and fresh insights from working engineers.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12 flex justify-center gap-8" delay={1}>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-[var(--page-fg)]">1,000+</p>
                <p className="text-xs text-[var(--muted)]">Engineers</p>
              </div>
            </div>
            <div className="h-12 w-px bg-[var(--line)]" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[var(--accent)]">★</span>
                ))}
              </div>
              <span className="text-sm text-[var(--muted)]">
                <span className="font-bold text-[var(--page-fg)]">5.0</span>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 2. SHOWCASE SECTIONS                                              */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-4 lg:grid-cols-3">
            {showcaseItems.map((item) => (
              <ScrollReveal key={item.num}>
                <TiltCard className={`${SURFACE_CARD} p-8 h-full flex flex-col justify-between`}>
                  <div>
                    <span className="text-xs font-mono tracking-widest text-[var(--dim)] uppercase block mb-4">
                      {"// " + item.tag}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[var(--page-fg)] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className={`mt-6 ${LINK_ACTION}`}
                  >
                    {item.cta}
                    <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 3. COMMUNITY PILLARS                                              */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem] mb-16">
            <span className={EYEBROW}>What makes it different</span>
            <h2 className={`${BF_H2} mt-4`}>Community principles</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map((pillar) => (
                <TiltCard key={pillar.label} className={`${SURFACE_CARD} p-8`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)] text-xs font-bold text-[var(--accent)]">
                      {pillar.label}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[var(--page-fg)]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {pillar.copy}
                  </p>
                </TiltCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 4. CHANNELS                                                       */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem] mb-16">
            <span className={EYEBROW}>Where we gather</span>
            <h2 className={`${BF_H2} mt-4`}>Community channels</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {channels.map((channel) => (
                <TiltCard key={channel.name} className={`${SURFACE_CARD} p-8 flex flex-col`}>
                  <h3 className="font-heading text-lg font-bold text-[var(--page-fg)] mb-3">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)] flex-1 mb-6">
                    {channel.description}
                  </p>
                  <ButtonLink href={channel.href} variant="secondary" className="text-xs">
                    {channel.cta} →
                  </ButtonLink>
                </TiltCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ================================================================= */}
      {/* 5. CTA                                                            */}
      {/* ================================================================= */}
      <section className="px-5 py-28 sm:px-7">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal blur>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl md:text-6xl">
              Ready to join the community?
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg max-w-2xl mx-auto mb-8">
              Connect with builders, share your work, and grow alongside the Blockfuse community.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <ButtonLink href="/contact" dataCursor="COMMUNITY">
                Get Involved
              </ButtonLink>
              <ModalButton modal="opensource" variant="secondary">
                Join the open-source programme
              </ModalButton>
              <ModalButton modal="newsletter" variant="secondary">
                Join the dispatch
              </ModalButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
