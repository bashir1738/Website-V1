import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Privacy policy | Blockfuse Labs",
  description:
    "How Blockfuse Labs collects, uses, and protects the information you share with us.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lead="The short version: we only ask for what we need, we use it to respond to you, and we never sell your data."
      />

      <div className="mt-14 space-y-10">
        <section>
          <h2 className="font-heading text-xl font-bold text-[var(--page-fg)]">
            What we collect
          </h2>
          <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[var(--muted)]">
            When you fill in a form on this site — an application, a hire
            request, a sponsorship conversation, or a dispatch subscription —
            we store what you submit: your name, contact details, and the
            answers you provided.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[var(--page-fg)]">
            How we use it
          </h2>
          <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[var(--muted)]">
            We use the information to process your request, get back to you,
            and evaluate applications against our assessment records. Alumni
            profiles you submit are only published after we verify and approve
            them.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[var(--page-fg)]">
            Sharing
          </h2>
          <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[var(--muted)]">
            We do not sell or rent personal data. We only share what is
            necessary to respond to you, and only where you have asked us to
            connect you with someone.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[var(--page-fg)]">
            Contact
          </h2>
          <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[var(--muted)]">
            To review, correct, or delete the information we hold about you,
            email us and we will take care of it.
          </p>
        </section>
      </div>
    </PageShell>
  );
}