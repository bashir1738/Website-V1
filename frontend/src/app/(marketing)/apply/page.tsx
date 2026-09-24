import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiSeedlingLine,
  RiCodeSSlashLine,
  RiStackLine,
  RiRocket2Line,
  RiBox3Line,
  RiLinksLine,
  RiShieldCheckLine,
  RiArrowRightSLine,
  RiTimeLine,
} from "react-icons/ri";
import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ModalButton } from "@/components/ui/modal-button";
import { applyTracks } from "@/features/apply/content";
import { EYEBROW } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Apply — Blockfuse Labs Academy",
  description:
    "Choose a track, submit your application, and secure your seat. Tracks from ₦100,000, with Blockchain Engineering payable in two installments.",
};

const TRACK_ICONS: Record<string, IconType> = {
  basic: RiSeedlingLine,
  intermediate: RiCodeSSlashLine,
  advanced: RiStackLine,
  professional: RiRocket2Line,
  "full-program": RiBox3Line,
  blockchain: RiLinksLine,
};

const CARD =
  "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-(--line) bg-(--card) p-7 shadow-(--shadow-card) [transition:translate_350ms_cubic-bezier(0.23,1,0.32,1),border-color_250ms_ease] hover:-translate-y-1 hover:border-(--accent-line)";
const CARD_HIGHLIGHT =
  "border-(--accent-line) bg-[linear-gradient(180deg,var(--accent-dim),transparent_42%),var(--card)]";
const ICON_BOX =
  "grid h-12 w-12 place-items-center rounded-2xl border border-(--accent-line) bg-(--accent-dim) text-xl text-(--accent)";
const PRICE =
  "mt-6 text-[1.9rem] font-heading font-bold tracking-[-0.04em] text-(--page-fg)";
const DURATION =
  "mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-(--dim)";
const BLURB = "mt-4 text-[0.9rem] leading-[1.7] text-(--muted)";
const PILL =
  "inline-flex items-center gap-1.5 rounded-full border border-(--accent-line) bg-(--accent-dim) px-3 py-1 text-[0.7rem] font-semibold text-(--accent)";
const NOTICE =
  "mt-10 flex flex-col gap-2 rounded-2xl border border-(--line) bg-(--card) p-5 text-sm leading-relaxed text-(--muted) sm:flex-row sm:items-center sm:gap-3";

export default function ApplyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blockfuse Labs Academy — admissions open"
        title="Choose your path, then apply."
        lead="Every track is priced up front. Submit your application, then bank the fee and upload the receipt — our team verifies it manually within 1–2 working days."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applyTracks.map((track, i) => {
          const Icon = TRACK_ICONS[track.id] ?? RiArrowRightSLine;
          return (
            <ScrollReveal key={track.id} delay={i < 3 ? i + 1 : 3} threshold={0.05}>
              <article
                className={`${CARD} ${track.highlight ? CARD_HIGHLIGHT : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={ICON_BOX}>
                    <Icon aria-hidden="true" />
                  </span>
                  {track.installments ? (
                    <span className={PILL}>{track.installments}</span>
                  ) : (
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-(--dim)">
                      One payment
                    </span>
                  )}
                </div>

                <h2 className="mt-5 font-heading text-[1.35rem] font-bold leading-[1.15] tracking-[-0.03em] text-(--page-fg)">
                  {track.title}
                </h2>
                <p className={`${DURATION}`}>
                  <RiTimeLine aria-hidden="true" className="h-3.5 w-3.5" />
                  {track.duration}
                </p>

                <p className={PRICE}>{track.price}</p>

                <p className={BLURB}>{track.blurb}</p>

                <div className="mt-auto pt-7">
                  <ModalButton
                    modal="program"
                    prefill={{ Track: track.title }}
                    arrow={false}
                    className="w-full"
                  >
                    Apply to {track.title}
                  </ModalButton>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

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
            Payment is required to secure your spot — for Blockchain Engineering
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