import React from "react";
import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ModalButton } from "@/components/ui/modal-button";
import { AlumniDirectory } from "@/features/alumni/alumni-directory";

export const metadata: Metadata = {
  title: "Alumni | Blockfuse Labs",
  description:
    "Graduates from Cohorts I and II — every one assessed across coding, testing, system design, and communication.",
};

export default function AlumniPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Alumni"
        title="Two cohorts. On record."
        lead="Every graduate here passed assessment across coding, testing, system design, and communication. Filter by cohort or track."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ModalButton modal="alumni">Add your profile</ModalButton>
          <p className="max-w-[38ch] text-[13px] leading-relaxed text-[var(--dim)]">
            Graduated from a Blockfuse cohort? Submit your profile and we&apos;ll
            verify it against your assessment record before it appears here.
          </p>
        </div>
      </PageHero>
      <AlumniDirectory />
    </PageShell>
  );
}
