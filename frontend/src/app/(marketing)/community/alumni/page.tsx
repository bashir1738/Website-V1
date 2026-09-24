import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/ui/page-hero";
import { ModalButton } from "@/components/ui/modal-button";
import { AlumniDirectory } from "@/features/alumni/alumni-directory";
import { linkedinSearch, type Alumnus } from "@/features/alumni/content";
import { API_URL } from "@/lib/api";
import { EYEBROW } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Alumni | Blockfuse Labs",
  description:
    "Meet Blockfuse Labs graduates building products, protocols, and engineering careers.",
};

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

function toAlumnus(profile: ApprovedAlumnus): Alumnus {
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
}

async function loadAlumni(): Promise<Alumnus[]> {
  try {
    const res = await fetch(`${API_URL}/alumni-submissions/public`, {
      // No fetch-layer cache: stale revalidation strips the abort signal (see
      // patch-fetch), so we bound the request inline and render the roster the
      // backend approves. No static fallback.
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data: ApprovedAlumnus[] };
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(toAlumnus);
    }
  } catch {
    // Backend unreachable — the directory renders the empty state.
  }
  return [];
}

export default async function AlumniPage() {
  const directoryAlumni = await loadAlumni();

  return (
    <PageShell>
      <section
        className="alumni-hero relative mx-auto grid min-h-[38rem] w-full max-w-[75rem] gap-[0.85rem] overflow-hidden rounded-[2.25rem] bg-(--surface) p-[0.9rem] grid-cols-[minmax(17rem,0.9fr)_minmax(20rem,1.05fr)_minmax(7rem,0.36fr)_minmax(7rem,0.36fr)] max-[56rem]:grid-cols-[minmax(15rem,0.82fr)_minmax(18rem,1fr)_minmax(6rem,0.34fr)] max-md:grid-cols-[minmax(0,1.35fr)_minmax(7rem,0.65fr)] max-md:min-h-auto max-md:p-3 max-md:rounded-[1.75rem]"
        aria-labelledby="alumni-hero-title"
      >
        <div className="relative z-[2] self-center p-[2rem_0.4rem_5.5rem_1.7rem] max-[56rem]:p-[1.5rem_0.25rem_5rem_1.25rem] max-md:col-span-full max-md:p-[2.5rem_1rem_1.5rem]">
          <span className={EYEBROW}>Meet the Blockfuse alumni</span>
          <h1
            id="alumni-hero-title"
            className="mt-6 max-w-[7ch] text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-(--page-fg) max-md:text-[clamp(3rem,15vw,4.5rem)]"
          >
            The alumni
            <br />
            driving
            <br />
            innovation
          </h1>
          <p className="mb-2 mt-8 max-w-[25ch] text-[0.8125rem] leading-[1.65] text-(--muted) max-md:mt-6">
            Engineers who trained with Blockfuse Labs and are now deployed
            across top Web3 protocols, AI companies, and startups. Meet the
            people powering the next generation of technology.
          </p>
          <ModalButton modal="alumni" variant="link">
            Add your profile
          </ModalButton>
        </div>

        <div className="alumni-hero-panel relative min-w-0 overflow-hidden rounded-[1.5rem] bg-(--surface-2) max-md:min-h-[25rem]">
          <Image
            src="/brand/IMG_1604.JPG"
            alt="Blockfuse alumnus"
            fill
            priority
            sizes="(max-width: 767px) 76vw, (max-width: 1100px) 45vw, 32vw"
            className="object-cover object-[48%_top] saturate-[0.9] contrast-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(transparent,rgba(7,7,10,0.78))] px-5 pb-5 pt-16 text-paper">
            <span className="max-w-[8ch] font-heading text-[1.25rem] font-medium leading-none">
              Alumni network
            </span>
            <strong className="font-heading text-[2rem] font-medium leading-[0.9]">
              {directoryAlumni.length}
            </strong>
          </div>
        </div>

        <div className="alumni-hero-panel relative min-w-0 overflow-hidden rounded-[1.5rem] bg-(--surface-2) max-md:min-h-[25rem]">
          <Image
            src="/brand/DSC09798.jpg"
            alt="Blockfuse alumnus"
            fill
            priority
            sizes="(max-width: 767px) 38vw, 14vw"
            className="object-cover object-[54%_top] saturate-[0.9] contrast-[1.03]"
          />
          <span className="absolute bottom-5 right-3 rounded-l-lg bg-[rgba(7,7,10,0.78)] px-[0.625rem] py-[0.875rem] font-heading text-[1rem] font-medium leading-none text-paper rotate-180 [writing-mode:vertical-rl]">
            Builders
          </span>
        </div>

        <div className="alumni-hero-panel relative min-w-0 overflow-hidden rounded-[1.5rem] bg-(--surface-2) max-md:min-h-[25rem] max-[56rem]:hidden">
          <Image
            src="/brand/IMG_1607.JPG"
            alt="Blockfuse alumnus"
            fill
            priority
            sizes="(max-width: 767px) 38vw, 14vw"
            className="object-cover object-[53%_top] saturate-[0.9] contrast-[1.03]"
          />
          <span className="absolute bottom-5 right-3 rounded-l-lg bg-[rgba(7,7,10,0.78)] px-[0.625rem] py-[0.875rem] font-heading text-[1rem] font-medium leading-none text-paper rotate-180 [writing-mode:vertical-rl]">
            Leaders
          </span>
        </div>

        <a
          className="group absolute bottom-8 left-8 z-[2] grid min-h-[4.5rem] w-[min(31rem,calc(100%_-_4rem))] grid-cols-[minmax(12rem,1fr)_auto] overflow-hidden rounded-full bg-(--card-strong) text-(--page-fg) no-underline shadow-[0_0.5rem_1.25rem_-1rem_rgba(7,7,10,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent) max-md:relative max-md:col-span-full max-md:bottom-auto max-md:left-auto max-md:w-full"
          href="#alumni-directory"
        >
          <span className="flex items-center px-5 text-[0.75rem] text-(--muted)">
            Explore the alumni directory
          </span>
          <strong aria-hidden="true" className="flex items-center bg-(--action-bg) px-5 font-heading text-[1rem] font-medium text-paper transition-[background] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-(--action-hover)">
            Go&nbsp;&nbsp;↘
          </strong>
        </a>
      </section>
      <AlumniDirectory alumni={directoryAlumni} />
    </PageShell>
  );
}
