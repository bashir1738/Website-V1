import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/ui/page-hero";
import { ModalButton } from "@/components/ui/modal-button";
import { AlumniDirectory } from "@/features/alumni/alumni-directory";
import { linkedinSearch, type Alumnus } from "@/features/alumni/content";
import { API_URL } from "@/lib/api";

export const metadata: Metadata = {
  title: "Alumni | Blockfuse Labs",
  description:
    "Meet Blockfuse Labs graduates building products, protocols, and engineering careers.",
};

interface ApprovedAlumnus {
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
      <section className="alumni-hero" aria-labelledby="alumni-hero-title">
        <div className="alumni-hero-copy">
          <span className="eyebrow">Meet the Blockfuse alumni</span>
          <h1 id="alumni-hero-title">
            The alumni
            <br />
            driving
            <br />
            innovation
          </h1>
          <p>
            Engineers who trained with Blockfuse Labs and are now deployed
            across top Web3 protocols, AI companies, and startups. Meet the
            people powering the next generation of technology.
          </p>
          <ModalButton modal="alumni" variant="link">
            Add your profile
          </ModalButton>
        </div>

        <div className="alumni-hero-panel alumni-hero-panel-main">
          <Image
            src="/brand/IMG_1604.JPG"
            alt="Blockfuse alumnus"
            fill
            priority
            sizes="(max-width: 767px) 76vw, (max-width: 1100px) 45vw, 32vw"
          />
          <div className="alumni-hero-panel-label">
            <span>Alumni network</span>
            <strong>{directoryAlumni.length}</strong>
          </div>
        </div>

        <div className="alumni-hero-panel alumni-hero-panel-narrow">
          <Image
            src="/brand/DSC09798.jpg"
            alt="Blockfuse alumnus"
            fill
            priority
            sizes="(max-width: 767px) 38vw, 14vw"
          />
          <span className="alumni-hero-vertical-label">Builders</span>
        </div>

        <div className="alumni-hero-panel alumni-hero-panel-narrow alumni-hero-panel-last">
          <Image
            src="/brand/IMG_1607.JPG"
            alt="Blockfuse alumnus"
            fill
            priority
            sizes="(max-width: 767px) 38vw, 14vw"
          />
          <span className="alumni-hero-vertical-label">Leaders</span>
        </div>

        <a className="alumni-hero-action" href="#alumni-directory">
          <span>Explore the alumni directory</span>
          <strong aria-hidden="true">Go&nbsp;&nbsp;↘</strong>
        </a>
      </section>
      <AlumniDirectory alumni={directoryAlumni} />
    </PageShell>
  );
}
