import type { Metadata } from "next";
import Link from "next/link";
import { RiShieldCheckLine } from "react-icons/ri";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { applyFeesByGroup, applyFeesByTrack } from "@/features/apply/content";
import { ProgramCards } from "@/features/training/program-cards";
import { EYEBROW } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Apply: Blockfuse Labs Academy",
  description:
    "Choose a track, submit your application, and secure your seat. Tracks from ₦100,000, with Blockchain Engineering payable in two installments.",
};

const NOTICE =
  "mt-10 flex flex-col gap-2 rounded-2xl border border-(--line) bg-(--card) p-5 text-sm leading-relaxed text-(--muted) sm:flex-row sm:items-center sm:gap-3";

export default function ApplyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blockfuse Labs Academy: admissions open"
        title="Choose your path, then apply."
        lead="Every track is priced up front. Submit your application, then bank the fee and upload the receipt. Our team verifies it manually within 1–2 working days."
      />

      <ProgramCards
        trackFees={applyFeesByTrack}
        groupFees={applyFeesByGroup}
      />

      <ScrollReveal>
        <div className={NOTICE}>
          <RiShieldCheckLine
            aria-hidden="true"
            className="shrink-0 text-lg text-(--accent)"
          />
          <p>
            <strong className="text-(--page-fg)">
              Application fees are non-refundable.
            </strong>{" "}
            Payment is required to secure your spot. For Blockchain Engineering
            you pay 50% at enrollment and the remaining 50% after week 8 of the
            program.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-14 grid gap-3 rounded-2xl border border-(--line) bg-(--card) p-6 sm:grid-cols-2 sm:items-center">
          <div>
            <span className={EYEBROW}>Already applied?</span>
            <h2 className="mt-2 font-heading text-lg font-bold text-(--page-fg)">
              Your application &amp; payment status
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-(--muted)">
              We emailed you a private link right after you applied. Open it to
              see your bank-transfer instructions, upload a receipt, and follow
              your review.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <Link
              href="/training"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--line-strong) px-5 text-sm font-semibold text-(--page-fg) transition-colors hover:bg-(--card-hover)"
            >
              Compare curricula
            </Link>
            <a
              href="mailto:admin@blockfuselabs.xyz"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--line-strong) px-5 text-sm font-semibold text-(--muted) transition-colors hover:bg-(--card-hover)"
            >
              Lost your link? Contact us
            </a>
          </div>
        </div>
      </ScrollReveal>
    </PageShell>
  );
}