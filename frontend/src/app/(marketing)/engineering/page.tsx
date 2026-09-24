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
import { linkedinSearch, type Alumnus } from "@/features/alumni/content";
import { API_URL } from "@/lib/api";
import {
  BF_EYEBROW_LIGHT,
  BF_H2,
  BF_ON_DARK_BTN,
  BF_PROSE,
  EYEBROW,
  SURFACE_CARD,
  CTA_BANNER as CTA,
  CTA_BANNER_MEDIA as CTA_MEDIA,
  CTA_BANNER_MEDIA_PIC as CTA_MEDIA_PIC,
  CTA_BANNER_INNER as CTA_INNER,
  CTA_BANNER_H2 as CTA_H2,
  CTA_BANNER_P as CTA_P,
  CTA_BANNER_ACTIONS as CTA_ACTIONS,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Blockfuse Labs Engineering: build with us, or hire from us",
  description:
    "Senior-led delivery for dependable AI, web, and blockchain systems, and production-ready engineers you can hire, embed, or sponsor.",
};

const AVATAR_TONES = [
  "bg-[linear-gradient(145deg,#7340a8,#321466)]",
  "bg-[linear-gradient(145deg,#4d68a8,#162b5f)]",
] as const;

const GRAIN =
  "grain-overlay absolute inset-0 pointer-events-none opacity-[0.035] z-[2]";

const HERO =
  "relative isolate overflow-hidden bg-[#0d0d13] text-white after:content-[''] after:absolute after:inset-0 after:-z-[1] after:bg-[linear-gradient(180deg,rgba(13,13,19,0.35)_0%,rgba(13,13,19,0.5)_52%,rgba(13,13,19,0.75)_100%)]";
const HERO_MEDIA = "absolute inset-0 -z-[2]";
const HERO_MEDIA_PIC =
  "object-cover object-[center_42%]  opacity-[0.65]";

const ORB = "absolute z-0 rounded-full pointer-events-none";
const ORB_ONE = `${ORB} w-[34rem] h-[34rem] -top-[14rem] -right-[10rem] bg-white opacity-[0.06] blur-[6rem]`;
const ORB_TWO = `${ORB} w-[22rem] h-[22rem] -bottom-[10rem] -left-[8rem] bg-white opacity-[0.05] blur-[6rem]`;
const ORB_THREE = `${ORB} w-[38rem] h-[38rem] -top-[18rem] left-[55%] bg-(--color-accent) opacity-[0.16] blur-[7rem]`;

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
const HERO_PUNCH = "font-semibold text-[#e8c6f7]";
const HERO_ACTIONS = "flex flex-wrap items-center gap-7 mt-[2.5rem]";
const HERO_LINK =
  "inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[rgba(255,255,255,0.88)] underline decoration-[rgba(255,255,255,0.4)] underline-offset-[0.35rem] transition-[color,text-decoration-color] duration-150 ease-out hover:text-[#e8c6f7] hover:decoration-[#e8c6f7]";

const ROUTE_WRAP =
  "relative z-[4] mx-auto mt-[clamp(-5rem,-7vw,-3.5rem)] max-w-[1240px] px-5 sm:px-7";
const ROUTE_LABEL =
  "mb-[0.85rem] pl-1 font-mono text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[rgba(255,255,255,0.72)]";
const CHOICE =
  "grid grid-cols-1 gap-px border border-(--line) rounded-[1.5rem] bg-(--line) overflow-hidden shadow-[0_14px_36px_-28px_rgba(20,6,48,0.35)] md:grid-cols-2";
const CHOICE_CARD =
  "group flex flex-col gap-[0.65rem] bg-(--surface) py-[1.85rem] px-[1.75rem] no-underline transition-[background-color] duration-[250ms] hover:bg-(--card-hover) focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-(--accent)";
const CHOICE_TAG =
  "font-mono text-[0.66rem] font-semibold tracking-[0.18em] uppercase text-(--accent)";
const CHOICE_TITLE =
  "flex items-baseline gap-[0.6rem] font-heading text-[clamp(1.35rem,2.2vw,1.7rem)] font-bold tracking-[-0.035em] leading-[1.15] text-(--page-fg)";
const CHOICE_ARROW =
  "not-italic text-(--accent) transition-[translate] duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[0.3rem]";
const CHOICE_COPY = "max-w-[40ch] text-[0.88rem] leading-[1.6] text-(--muted)";

const CELLS =
  "grid gap-px border border-(--line) rounded-[1.5rem] bg-(--line) overflow-hidden";
const CELLS_2 = `${CELLS} md:grid-cols-2`;
const CELLS_3 = `${CELLS} md:grid-cols-3`;
const CELL =
  "flex flex-col bg-(--surface) py-[1.9rem] px-[1.85rem] transition-[background-color] duration-[250ms] hover:bg-(--card-hover)";
const CELL_HEAD = "flex items-center justify-between gap-4";
const CELL_INDEX =
  "font-mono text-[0.66rem] font-semibold tracking-[0.18em] text-(--accent)";
const CELL_H3 =
  "mt-4 font-heading text-[1.2rem] font-bold leading-[1.2] tracking-[-0.03em] text-(--page-fg)";
const CELL_P = "mt-[0.85rem] text-[0.88rem] leading-[1.65] text-(--muted)";
const CELL_FINE =
  "mt-[0.85rem] pl-[0.85rem] border-l-2 border-l-(--accent-line) text-[0.8rem] leading-[1.65] text-(--page-fg)";
const CELL_LINK =
  "group inline-flex items-center gap-2 mt-auto pt-6 text-[0.82rem] font-semibold text-(--accent) no-underline";
const CELL_LINK_SPAN =
  "transition-[translate] duration-200 ease-out group-hover:translate-x-[0.3rem]";

const BAND =
  "relative overflow-hidden bg-[#2a0b5e] text-white";
const BAND_CELLS =
  "grid gap-px border border-[rgba(255,255,255,0.14)] rounded-[1.5rem] bg-[rgba(255,255,255,0.14)] overflow-hidden md:grid-cols-3";
const BAND_CELL =
  "flex flex-col bg-[rgba(255,255,255,0.045)] backdrop-blur-[10px] py-[1.9rem] px-[1.85rem] transition-[background-color] duration-[250ms] hover:bg-[rgba(255,255,255,0.085)]";
const BAND_INDEX =
  "font-mono text-[0.66rem] font-semibold tracking-[0.18em] text-[rgba(255,255,255,0.5)]";
const BAND_H3 =
  "mt-4 font-heading text-[1.2rem] font-bold leading-[1.2] tracking-[-0.03em] text-white";
const BAND_P =
  "mt-[0.85rem] text-[0.88rem] leading-[1.65] text-[rgba(255,255,255,0.72)]";
const BAND_FINE =
  "mt-[0.85rem] pl-[0.85rem] border-l-2 border-l-[rgba(219,167,242,0.45)] text-[0.8rem] leading-[1.65] text-[#e6c8f6]";

const SPLIT =
  "grid gap-12 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20";
const PULLQUOTE =
  "relative mt-8 max-w-[40ch] py-5 px-6 rounded-xl border border-(--accent-line) bg-(--accent-dim) font-heading text-[clamp(1.05rem,1.7vw,1.3rem)] font-semibold leading-[1.4] tracking-[-0.025em] text-(--page-fg)";
const FRAME =
  "group relative isolate m-0 after:content-[''] after:absolute after:-z-[1] after:right-[-1.25rem] after:bottom-[-1.25rem] after:w-[62%] after:h-[62%] after:rounded-[1.75rem] after:opacity-40 after:blur-[0.4rem] after:bg-[linear-gradient(140deg,var(--accent),transparent_68%)]";
const FRAME_IMG =
  "relative aspect-[4/3.15] overflow-hidden rounded-[1.75rem] bg-(--surface-2) shadow-(--shadow-card)";
const FRAME_IMG_PIC =
  "object-cover saturate-[0.85] contrast-[1.03] [transition:scale_600ms_cubic-bezier(0.23,1,0.32,1),filter_250ms_ease-out] group-hover:scale-[1.035] group-hover:saturate-100 group-hover:contrast-[1.01]";
const FRAME_BADGE =
  "absolute left-[clamp(-1.5rem,-2vw,-0.75rem)] bottom-7 z-[2] grid gap-[0.3rem] max-w-[15rem] py-4 px-5 border border-(--line) rounded-xl bg-(--card-strong) backdrop-blur-[14px] shadow-(--shadow-card)";
const FRAME_BADGE_TITLE =
  "font-mono text-[0.66rem] font-semibold tracking-[0.16em] uppercase text-(--accent)";
const FRAME_BADGE_TEXT = "text-[0.82rem] leading-[1.45] text-(--page-fg)";

const RAIL =
  "relative grid gap-8 mt-[clamp(3.5rem,6vw,5rem)] list-none p-0 before:content-[''] before:absolute before:left-[1.375rem] before:top-6 before:bottom-6 before:w-px before:bg-[linear-gradient(180deg,var(--accent-line),var(--line))]";
const STAGE =
  "group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 items-start";
const STAGE_DOT =
  "relative z-[1] grid w-11 h-11 place-items-center rounded-full border border-(--accent-line) bg-(--page-bg) font-mono text-xs font-semibold text-(--accent) [transition:background-color_250ms_ease,color_250ms_ease,scale_300ms_cubic-bezier(0.23,1,0.32,1)] group-hover:bg-(--accent) group-hover:text-white group-hover:scale-[1.08]";
const STAGE_H3 =
  "font-heading text-[1.05rem] font-bold tracking-[-0.025em] leading-[1.3] text-(--page-fg)";
const STAGE_P = "mt-[0.6rem] text-[0.88rem] leading-[1.65] text-(--muted)";

const QUOTE_GRID = "grid gap-6 md:grid-cols-2 [&>*]:h-full";
const QUOTE =
  "relative flex h-full flex-col justify-between overflow-hidden m-0 p-8 border border-(--line) rounded-[1.5rem] bg-(--card) backdrop-blur-[14px] shadow-(--shadow-card) [transition:translate_350ms_cubic-bezier(0.23,1,0.32,1),border-color_250ms_ease] hover:-translate-y-1 hover:border-(--accent-line) before:content-['“'] before:absolute before:-top-3 before:right-5 before:font-heading before:text-[7rem] before:leading-none before:text-(--accent) before:opacity-[0.16] before:pointer-events-none";
const QUOTE_TEXT = "text-base leading-[1.7] text-(--page-fg)";
const QUOTE_CITE =
  "flex items-center gap-[0.9rem] mt-[1.85rem] pt-5 border-t border-(--line)";
const AVATAR =
  "grid w-[2.9rem] h-[2.9rem] shrink-0 place-items-center rounded-[0.9rem] font-heading text-[0.95rem] font-semibold tracking-[-0.03em] text-[rgba(255,255,255,0.94)]";
const QUOTE_PERSON = "grid gap-[0.15rem]";
const QUOTE_PERSON_NAME =
  "font-heading text-[0.9rem] font-bold tracking-[-0.02em] text-(--page-fg)";
const QUOTE_PERSON_ROLE = "text-[0.75rem] leading-[1.45] text-(--muted)";

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

interface ApprovedAlumnus {
  id: number;
  name: string;
  cohort: string;
  track: string;
  current_status: string;
  github: string | null;
  linkedin: string | null;
  photo_url: string | null;
}

async function loadApprovedAlumni(): Promise<Alumnus[]> {
  try {
    const res = await fetch(`${API_URL}/alumni-submissions/public`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data: ApprovedAlumnus[] };
    if (json.success && Array.isArray(json.data)) {
      return json.data.map((profile) => {
        const social: Alumnus["social"] = profile.linkedin
          ? { platform: "LinkedIn", url: profile.linkedin }
          : profile.github
            ? { platform: "GitHub", url: profile.github }
            : { platform: "LinkedIn", url: linkedinSearch(profile.name) };
        return {
          id: profile.id,
          name: profile.name,
          cohort: profile.cohort,
          track: profile.track,
          now: profile.current_status,
          image: profile.photo_url || undefined,
          social,
        };
      });
    }
  } catch {
    // Backend unreachable — no hardcoded roster.
  }
  return [];
}

export default async function EngineeringPage() {
  const approvedAlumni = await loadApprovedAlumni();

  return (
    <main className="relative overflow-hidden pb-24">
      {/* ================================================================= */}
      {/* 1. HERO                                                           */}
      {/* ================================================================= */}
      <section className={HERO}>
        <div className={HERO_MEDIA} aria-hidden="true">
          <Image
            src="/brand/path3.jpg"
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
              Architecting <br />
              <span className={HERO_ACCENT}>High-Scale Protocols</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal className={HERO_LEAD} delay={2}>
            <p className={HERO_LEAD_STRONG}>
              Blockfuse Labs Engineering designs and delivers dependable AI, web,
              and blockchain systems — led by the same senior engineers who
              train our Academy, so the work holds up after we leave.
            </p>
            <p className={HERO_PUNCH}>
              One standard, whichever route you take.
            </p>
          </ScrollReveal>

          <ScrollReveal className={HERO_ACTIONS} delay={3}>
            <ButtonLink href="/contact?intent=engineering" dataCursor="PROJECT">
              Describe what you need built
            </ButtonLink>
            <ButtonLink
              href="#hire"
              variant="secondary"
              className="!bg-[var(--card)] !text-[var(--page-fg)] !border-[var(--line-strong)] hover:!bg-[var(--card-hover)] hover:!text-[var(--page-fg)] hover:!border-[var(--accent-line)]"
              dataCursor="HIRE"
            >
              Hire our engineers
            </ButtonLink>

          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. WHAT WE BUILD — Core Capabilities */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className={EYEBROW}>Studio — Core Capabilities</span>
            <h2 className={`${BF_H2} mt-4`}>What we build</h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
              End-to-end solutions across protocol development, full-stack dApps, AI systems, and production infrastructure.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className="space-y-6">
              {engineeringCapabilities.map((capability, idx) => (
                <TiltCard key={capability.title} className={`p-8 ${SURFACE_CARD}`}>
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
      <div className={ROUTE_WRAP}>
        <ScrollReveal>
          <p className={ROUTE_LABEL}>Two ways to work with Blockfuse Labs</p>
          <div className={CHOICE}>
            <Link href="#build" className={CHOICE_CARD}>
              <span className={CHOICE_TAG}>Route 01 — Studio</span>
              <strong className={CHOICE_TITLE}>
                We build it
                <em className={CHOICE_ARROW} aria-hidden="true">→</em>
              </strong>
              <p className={CHOICE_COPY}>
                A senior-led team takes the problem from advisory through
                discovery to shipped, documented software.
              </p>
            </Link>

            <Link href="#hire" className={CHOICE_CARD}>
              <span className={CHOICE_TAG}>Route 02 — Talent</span>
              <strong className={CHOICE_TITLE}>
                You build it, with our engineers
                <em className={CHOICE_ARROW} aria-hidden="true">→</em>
              </strong>
              <p className={CHOICE_COPY}>
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
            <span className={EYEBROW}>Studio — Scope &amp; engagements</span>
            <h2 className={`${BF_H2} mt-4`}>What we take on</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className={CELLS_2}>
              {engineeringServices.map((service, idx) => (
                <article key={service.title} className={CELL}>
                  <div className={CELL_HEAD}>
                    <span className={CELL_INDEX}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={CELL_H3}>{service.title}</h3>
                  <p className={CELL_P}>{service.copy}</p>
                  <Link
                    href={`/contact?intent=engineering&service=${encodeURIComponent(
                      service.title,
                    )}`}
                    className={CELL_LINK}
                  >
                    Request {service.title.toLowerCase()}
                    <span className={CELL_LINK_SPAN} aria-hidden="true">→</span>
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
            <span className={EYEBROW}>Studio — Proof of work</span>
            <h2 className={`${BF_H2} mt-4`}>What we&apos;ve built</h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
              Client work stays private, but our tools don&apos;t. These are
              products our own engineers designed, shipped, and still
              maintain — held to the same standard as anything we deliver.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className={CELLS_3}>
              {productHighlights.map((product, idx) => (
                <article key={product.name} className={CELL}>
                  <div className={CELL_HEAD}>
                    <span className={CELL_INDEX}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={CELL_H3}>{product.name}</h3>
                  <p className={CELL_P}>{product.description}</p>
                  <p className={CELL_FINE}>{product.proof}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            <Link href="/open-source" className={CELL_LINK}>
              See everything we maintain in the open
              <span className={CELL_LINK_SPAN} aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. HOW WE WORK — violet band                                      */}
      {/* ================================================================= */}
      <section className={`${BAND} px-5 py-24 sm:px-7 sm:py-32`}>
        <span className={ORB_THREE} aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className={`${EYEBROW} ${BF_EYEBROW_LIGHT}`}>
              Studio — Delivery principles
            </span>
            <h2 className={`${BF_H2} mt-4 text-white`}>How we work</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12 sm:mt-14" delay={1}>
            <div className={BAND_CELLS}>
              {deliveryPrinciples.map((principle, idx) => (
                <article key={principle.title} className={BAND_CELL}>
                  <div className={CELL_HEAD}>
                    <span className={BAND_INDEX}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={BAND_H3}>{principle.title}</h3>
                  <p className={BAND_P}>{principle.copy}</p>
                  <p className={BAND_FINE}>{principle.fine}</p>
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
          <div className={SPLIT}>
            <ScrollReveal>
              <span className={EYEBROW}>Talent — The hiring reality</span>
              <h2 className={`${BF_H2} mt-4`}>
                Applications are abundant. Evidence is scarce.
              </h2>
              <div className={`${BF_PROSE} mt-7`}>
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
              <p className={PULLQUOTE}>
                You spend less time filtering and more time speaking with
                candidates who are genuinely qualified.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={2} threshold={0.08}>
              <figure className={FRAME}>
                <div className={FRAME_IMG}>
                  <Image
                    src="/brand/path1.jpg"
                    alt="Blockfuse Labs engineers at work in a training cohort in Jos"
                    fill
                    sizes="(max-width: 1023px) 100vw, 46vw"
                    className={FRAME_IMG_PIC}
                  />
                </div>
                <figcaption className={FRAME_BADGE}>
                  <strong className={FRAME_BADGE_TITLE}>Assessed, not assumed</strong>
                  <span className={FRAME_BADGE_TEXT}>Every introduction rests on reviewed work</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-20 max-w-[46rem] sm:mt-24" delay={1}>
            <span className={EYEBROW}>Talent — Specialisations</span>
            <h2 className={`${BF_H2} mt-4`}>Engineers you can hire</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={2}>
            <div className={CELLS_3}>
              {talentCategories.map((category, idx) => (
                <article key={category.title} className={CELL}>
                  <div className={CELL_HEAD}>
                    <span className={CELL_INDEX}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={CELL_H3}>{category.title}</h3>
                  <p className={CELL_P}>{category.description}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-20 grid items-end gap-8 sm:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,34rem)] lg:gap-12">
            <ScrollReveal>
              <span className={EYEBROW}>Talent — The network in practice</span>
              <h2 className={`${BF_H2} mt-4`}>Meet our engineers</h2>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
                A sample of the Blockfuse Labs Talent Network. Every profile here
                passed the same assessment before an employer ever saw it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--card)] aspect-[4/3] shadow-[var(--shadow-card)]">
                <Image
                  src="/about/engineer.JPG"
                  alt="Blockfuse Labs Talent Network engineer at work"
                  fill
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-10" delay={2} threshold={0.08}>
            <EngineerShowcase alumni={approvedAlumni} />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6B. OUR PROCESS — Development Workflow */}
      {/* ================================================================= */}
      <section className="px-5 py-24 sm:px-7 sm:py-28 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1240px]">
          <ScrollReveal className="max-w-[46rem]">
            <span className={EYEBROW}>Studio — Development Methodology</span>
            <h2 className={`${BF_H2} mt-4`}>Our process</h2>
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
            <span className={EYEBROW}>Talent — Engagement models</span>
            <h2 className={`${BF_H2} mt-4`}>Ways to work with us</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={1}>
            <div className={CELLS_2}>
              {hiringModels.map((model, idx) => (
                <article key={model.title} className={CELL}>
                  <div className={CELL_HEAD}>
                    <span className={CELL_INDEX}>
                      Model {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={CELL_H3}>{model.title}</h3>
                  <p className={CELL_P}>{model.copy}</p>
                  <p className={CELL_FINE}>{model.fine}</p>
                  <Link href={model.href} className={CELL_LINK}>
                    {model.ctaText}
                    <span className={CELL_LINK_SPAN} aria-hidden="true">→</span>
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
            <span className={EYEBROW}>Talent — The hiring flow</span>
            <h2 className={`${BF_H2} mt-4`}>How hiring through Blockfuse Labs works</h2>
          </ScrollReveal>

          <ol className={`${RAIL} max-w-[56rem]`}>
            {hiringProcessSteps.map((step, index) => (
              <li key={step.number} className={STAGE}>
                <span className={STAGE_DOT}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={STAGE_H3}>{step.title}</h3>
                  <p className={STAGE_P}>{step.description}</p>
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
            <span className={EYEBROW}>Talent — Employer endorsements</span>
            <h2 className={`${BF_H2} mt-4`}>What employers say</h2>
          </ScrollReveal>

          <div className={`${QUOTE_GRID} mt-12 sm:mt-14`}>
            {employerTestimonials.map((item, i) => (
              <ScrollReveal key={item.author} delay={i + 1}>
                <figure className={QUOTE} data-cursor="QUOTE">
                  <blockquote>
                    <p className={QUOTE_TEXT}>{item.quote}</p>
                  </blockquote>
                  <figcaption className={QUOTE_CITE}>
                    <span
                      className={`${AVATAR} ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                      aria-hidden="true"
                    >
                      {initials(item.author)}
                    </span>
                    <span className={QUOTE_PERSON}>
                      <strong className={QUOTE_PERSON_NAME}>{item.author}</strong>
                      <span className={QUOTE_PERSON_ROLE}>{item.role}</span>
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
        <div className={CTA}>
          <div className={CTA_MEDIA} aria-hidden="true">
            <Image
              src="/brand/path2.jpg"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className={CTA_MEDIA_PIC}
            />
          </div>

          <ScrollReveal className={CTA_INNER}>
            <span className={`${EYEBROW} ${BF_EYEBROW_LIGHT}`}>
              Tell us what you are solving
            </span>
            <h2 className={CTA_H2}>Have a problem worth solving?</h2>
            <p className={CTA_P}>
              Describe the system you need built, or the role you need filled.
              We will tell you honestly which route fits, and say so early if
              neither does.
            </p>
            <div className={CTA_ACTIONS}>
              <ButtonLink
                href="/contact?intent=engineering"
                dataCursor="PROJECT"
              >
                Start a project
              </ButtonLink>
              <ModalButton
                modal="hire"
                variant="secondary"
                className={BF_ON_DARK_BTN}
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
