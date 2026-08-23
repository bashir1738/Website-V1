import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * The standard opening for an inner page: mono eyebrow, oversized display
 * heading, and a lead paragraph.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h1 className="max-w-[20ch] font-heading text-[clamp(2.375rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-[var(--page-fg)]">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-[var(--muted)]">
          {lead}
        </p>
      )}
      {children}
    </ScrollReveal>
  );
}

/** Constrained column shared by every inner page. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[1240px] px-5 pb-28 pt-16 sm:px-7 sm:pt-20">
      {children}
    </main>
  );
}
