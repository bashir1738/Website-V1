import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  loadTeam,
  loadTeamMember,
  type TeamMember,
} from "@/features/team/content";
import { initials } from "@/lib/utils";
import { EYEBROW, SURFACE_CARD } from "@/lib/styles";

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

const SOCIALS: {
  key: keyof NonNullable<TeamMember["social"]>;
  label: string;
  short: string;
}[] = [
  { key: "linkedin", label: "LinkedIn", short: "in" },
  { key: "github", label: "GitHub", short: "GH" },
  { key: "twitter", label: "X", short: "X" },
  { key: "warpcast", label: "Warpcast", short: "W" },
];

function paragraphs(bio: string): string[] {
  return bio
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await loadTeamMember(decodeURIComponent(slug));

  if (!member) {
    return { title: "Team member not found | Blockfuse Labs" };
  }

  return {
    title: `${member.name} — ${member.role} | Blockfuse Labs`,
    description: member.bio
      ? member.bio.replace(/\s+/g, " ").slice(0, 160)
      : `${member.name} is ${member.role} at Blockfuse Labs.`,
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const member = await loadTeamMember(decodeURIComponent(slug));

  if (!member) notFound();

  const body = paragraphs(member.bio);
  const teammates = (await loadTeam())
    .filter((m) => m.slug !== member.slug)
    .slice(0, 3);
  const socials = SOCIALS.filter((s) => member.social?.[s.key]);

  return (
    <main className="mx-auto max-w-[1240px] px-5 pb-28 pt-16 sm:px-7 sm:pt-20">
      <ScrollReveal>
        <Link
          href="/about/team"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[var(--muted)] transition-colors duration-150 hover:text-[var(--page-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <span aria-hidden="true">←</span> Back to the team
        </Link>
      </ScrollReveal>

      <article className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <ScrollReveal>
          <div
            className={`${SURFACE_CARD} sticky top-28 overflow-hidden !p-0`}
          >
            <div className="relative aspect-[4/5] place-items-center overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(150deg,rgba(191,100,231,0.2),rgba(78,46,245,0.12))] grid">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top [filter:saturate(0.92)_contrast(1.02)]"
                />
              ) : (
                <span className="font-heading text-[56px] font-bold tracking-[-0.02em] text-[var(--page-fg)]/60">
                  {initials(member.name)}
                </span>
              )}
            </div>
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2 px-[22px] py-5">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={member.social![s.key]!}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on ${s.label}`}
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--action-bg)] px-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span aria-hidden="true">{s.short}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal delay={1}>
            <span className={EYEBROW}>Team</span>
            <h1 className="mt-4 max-w-[16ch] font-heading text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--page-fg)]">
              {member.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-[var(--accent)]">
              {member.role}
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8" delay={2}>
            {body.length > 0 ? (
              <div className="max-w-[62ch] space-y-6">
                {body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-[1.8] text-[var(--muted)] sm:text-[1.05rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="max-w-[62ch] text-base leading-[1.8] text-[var(--muted)]">
                Bio coming soon.
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-wrap gap-3.5" delay={3}>
            <ModalButton modal="hire">Work with this team</ModalButton>
            <Link
              href="/about/team"
              className="inline-flex h-[3.125rem] items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-7 text-[0.906rem] font-semibold text-[var(--page-fg)] transition-colors duration-200 hover:border-[var(--accent-line)] hover:bg-[var(--card-hover)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--accent)]"
            >
              All team members
            </Link>
          </ScrollReveal>
        </div>
      </article>

      {teammates.length > 0 && (
        <section className="mt-20 border-t border-[var(--line)] pt-14">
          <ScrollReveal>
            <span className={EYEBROW}>Also on the team</span>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] text-[var(--page-fg)] sm:text-3xl">
              Meet more people behind the work
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {teammates.map((person, i) => (
              <ScrollReveal key={person.slug} delay={Math.min(i + 1, 3)}>
                <Link
                  href={`/about/team/${person.slug}`}
                  className={`${SURFACE_CARD} group block h-full overflow-hidden !p-0 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`}
                >
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(150deg,rgba(191,100,231,0.2),rgba(78,46,245,0.12))]">
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={`Portrait of ${person.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 30vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="font-heading text-[28px] font-bold text-[var(--page-fg)]/60">
                        {initials(person.name)}
                      </span>
                    )}
                  </div>
                  <div className="px-5 pb-5 pt-4">
                    <h3 className="font-heading text-[15px] font-bold text-[var(--page-fg)]">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-[12.5px] text-[var(--accent)]">
                      {person.role}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
