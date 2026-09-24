import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { BF_H2, EYEBROW, LINK_ACTION, SURFACE_CARD } from "@/lib/styles";
import { socialLinks } from "@/config/social";

export const metadata: Metadata = {
  title: "Blockfuse Labs Community: Connect with engineers",
  description:
    "Join the Blockfuse Labs community hub for events, connections, and knowledge exchange with working engineers.",
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
    href: socialLinks.find((s) => s.label === "Telegram")!.href,
  },
  {
    name: "Twitter / X",
    description: "Follow for ecosystem news, cohort updates, and community highlights.",
    cta: "Follow us",
    href: socialLinks.find((s) => s.label === "X")!.href,
  },
  {
    name: "GitHub",
    description: "Open-source projects, cohort capstones, and contribution sprints.",
    cta: "View repos",
    href: socialLinks.find((s) => s.label === "GitHub")!.href,
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
    copy: "Members get access to protocol teams, hiring partners, mentors, and event opportunities through the Blockfuse Labs network.",
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
    href: "/about/team",
    cta: "Meet the Team",
  },
  {
    num: "02",
    tag: "Talent Pipeline",
    title: "Alumni",
    desc: "Engineers who trained with us and are now deployed across top Web3 protocols globally.",
    href: "/community/alumni",
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
      <section className="relative w-full min-h-[85vh] overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#e9d5ff] to-[#d8b4fe] flex flex-col items-center pt-24 sm:pt-28">
        
        {/* Background image overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: 'url("/community/welcome3.jpeg")' }}
        />

        {/* Stickers */}
        <div className="absolute top-[25%] left-[5%] sm:left-[12%] w-12 h-12 sm:w-20 sm:h-20 hidden md:block z-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-white drop-shadow-md">
            <path d="M100 0 L115 75 L190 50 L135 100 L190 150 L115 125 L100 200 L85 125 L10 150 L65 100 L10 50 L85 75 Z" />
          </svg>
        </div>

        <div className="absolute top-[38%] left-[8%] sm:left-[14%] rotate-[-12deg] bg-white border-2 border-black px-2.5 py-1 sm:px-3 sm:py-1.5 hidden md:block shadow-[3px_3px_0_0_rgba(0,0,0,1)] z-20">
          <span className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-black">Jos, Nigeria</span>
        </div>

        <div className="absolute top-[18%] right-[8%] sm:right-[18%] rotate-[10deg] bg-black border-2 border-black px-3 py-1.5 sm:px-5 sm:py-2.5 hidden md:block shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] z-20">
          <span className="font-mono text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white">Community Events</span>
        </div>

        <div className="absolute top-[32%] right-[4%] sm:right-[10%] rotate-[-8deg] bg-[#fbcfe8] border-2 border-black px-2.5 py-1 sm:px-4 sm:py-1.5 hidden lg:block shadow-[3px_3px_0_0_rgba(0,0,0,1)] z-20">
          <span className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-black">Workshops · Demos · Meetups</span>
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center px-5">
          <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-4">
            COMMUNITY HUB
          </span>
          <h1 className="font-heading text-[3.5rem] sm:text-[6.5rem] lg:text-[8rem] font-extrabold leading-[0.8] tracking-[-0.04em] text-[#0f0f0f] uppercase">
             Blockfuse Labs <br /> Engineering <br/> Community 
          </h1>
          <p className="mt-6 max-w-xl text-sm sm:text-base font-medium text-[#0f0f0f]/80 leading-relaxed max-sm:px-4">
              Explore engineering events, connect with builders, and join a dynamic community for knowledge exchange and fresh insights from working engineers.
          </p>
        </div>

        {/* Bottom overlapping cards */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto h-[220px] sm:h-[300px] lg:h-[350px] mt-auto flex justify-center items-end -mb-6 sm:-mb-12">

          {/* Left card */}
          <div className="absolute left-[-2%] sm:left-[5%] lg:left-[10%] bottom-0 sm:bottom-4 w-[40%] sm:w-[35%] lg:w-[28%] aspect-[3/4] sm:aspect-[4/3] rounded-xl sm:rounded-[1.75rem] border-[3px] border-black overflow-hidden rotate-[-12deg] sm:rotate-[-8deg] shadow-xl z-20 origin-bottom">
            <Image src="/community/welcome.jpeg" alt="Community gathering" fill className="object-cover" />
          </div>

          {/* Center card */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-8 w-[55%] sm:w-[50%] lg:w-[40%] aspect-[4/5] sm:aspect-video rounded-xl sm:rounded-[1.75rem] border-[3px] border-black overflow-hidden z-30 shadow-2xl">
            <Image src="/community/WAL_7954.jpeg" alt="Community workshop" fill className="object-cover" />
          </div>

          {/* Right card */}
          <div className="absolute right-[-2%] sm:right-[5%] lg:right-[10%] bottom-0 sm:bottom-4 w-[40%] sm:w-[35%] lg:w-[28%] aspect-[3/4] sm:aspect-[4/3] rounded-xl sm:rounded-[1.75rem] border-[3px] border-black overflow-hidden rotate-[12deg] sm:rotate-[6deg] shadow-xl z-20 origin-bottom">
            <Image src="/community/welcome2.jpeg" alt="Community meetup" fill className="object-cover" />
          </div>

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
                    {channel.cta}
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
              Connect with builders, share your work, and grow alongside the Blockfuse Labs community.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <ButtonLink href="/contact" dataCursor="COMMUNITY">
                Get Involved
              </ButtonLink>
              <ModalButton modal="newsletter" variant="secondary">
                Join the dispatch
              </ModalButton>
               <ModalButton modal="opensource" variant="secondary">
                Join the open-source programme
              </ModalButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
