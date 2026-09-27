"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BTN_PRIMARY } from "@/lib/styles";
import { ModalButton } from "@/components/ui/modal-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { detailedPrograms, programGroups } from "./content";
import { TrackPickerDialog } from "./track-picker-dialog";
import type { DetailedProgram, ProgramGroup } from "./content";

/** Each program card gets a photograph from the room it is actually taught in. */
const PROGRAM_MEDIA: Record<string, { src: string; alt: string }> = {
  "ai-software-engineering": {
    src: "/community/WAL_3761.jpeg",
    alt: "Blockfuse Labs engineers reviewing code together in the studio workspace",
  },
  "blockchain-engineering": {
    src: "/brand/path2.jpg",
    alt: "A Blockfuse Labs speaker presenting a blockchain session to a full room",
  },
};

const PROGRAM_GRID = "grid gap-7 sm:grid-cols-2";
const PROGRAM_CARD =
  "group flex h-full flex-col overflow-hidden border border-(--line) rounded-3xl bg-(--card) shadow-(--shadow-card) [transition:translate_350ms_cubic-bezier(0.23,1,0.32,1),border-color_250ms_ease] md:hover:-translate-y-1 md:hover:border-(--accent-line)";
const PROGRAM_MEDIA_BOX =
  "relative aspect-video overflow-hidden bg-(--surface-2)";
const PROGRAM_MEDIA_PIC =
  "object-cover scale-[1.05] saturate-[0.84] contrast-[1.03] [transition:scale_500ms_cubic-bezier(0.23,1,0.32,1),filter_250ms_ease-out] md:group-hover:scale-100 md:group-hover:saturate-100 md:group-hover:contrast-[1.01]";
const PROGRAM_INDEX =
  "absolute z-[2] top-4 left-4 grid w-11 h-11 place-items-center rounded-[0.85rem] bg-(--accent) font-heading text-[0.85rem] font-bold text-white shadow-[0_8px_18px_-12px_rgba(191,100,231,0.45)]";
const PROGRAM_BODY = "flex flex-1 flex-col p-7";
const PROGRAM_H3 =
  "font-heading text-[1.4rem] font-bold leading-[1.12] tracking-[-0.03em] text-(--page-fg)";
const PROGRAM_DESCRIPTION =
  "mt-3 max-w-[42ch] text-[0.92rem] leading-[1.65] text-(--muted)";
/** Every card ends on the same two actions, so the pair reads as one set. */
const PROGRAM_ACTIONS =
  "mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-7";
const ADVISOR_LINK =
  "group inline-flex items-center gap-2 text-[0.82rem] font-semibold accent-text no-underline";
const ADVISOR_LINK_SPAN =
  "transition-[translate] duration-200 ease-out group-hover:translate-x-[0.3rem]";

/** `?intent=academy` for a whole program, `?program=` for one specific track. */
function AdvisorLink({ href }: { href: string }) {
  return (
    <Link href={href} className={ADVISOR_LINK}>
      Talk to an advisor
      <span className={ADVISOR_LINK_SPAN} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function ProgramCover({ id, index }: { id: string; index: number }) {
  return (
    <div className={PROGRAM_MEDIA_BOX}>
      <span className={PROGRAM_INDEX} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Image
        src={PROGRAM_MEDIA[id].src}
        alt={PROGRAM_MEDIA[id].alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 28vw"
        className={PROGRAM_MEDIA_PIC}
      />
    </div>
  );
}

/**
 * A program with more than one track. The tracks stay behind a picker so the
 * section reads as two programs rather than a wall of six tracks.
 */
function GroupedProgramCard({
  group,
  index,
  tracks,
  onPick,
}: {
  group: ProgramGroup;
  index: number;
  tracks: DetailedProgram[];
  onPick: (group: ProgramGroup, tracks: DetailedProgram[]) => void;
}) {
  return (
    <ScrollReveal
      className="self-start"
      delay={index < 2 ? index + 1 : 3}
      threshold={0.08}
    >
      <article id={group.id} className={`${PROGRAM_CARD} scroll-mt-24`}>
        <ProgramCover id={group.id} index={index} />

        <div className={PROGRAM_BODY}>
          <h3 className={PROGRAM_H3}>{group.title}</h3>
          <p className={PROGRAM_DESCRIPTION}>{group.description}</p>

          <div className={PROGRAM_ACTIONS}>
            <button
              type="button"
              onClick={() => onPick(group, tracks)}
              className={BTN_PRIMARY}
            >
              <span>Choose a track</span>
              <svg
                className="h-4 w-4 transition-transform duration-250 ease group-hover:translate-x-0.75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <AdvisorLink href="/contact?intent=academy" />
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

/** A program that is a single track, so there is nothing to pick. */
function StandaloneProgramCard({
  group,
  index,
  track,
}: {
  group: ProgramGroup;
  index: number;
  track: DetailedProgram;
}) {
  return (
    <ScrollReveal delay={index < 2 ? index + 1 : 3} threshold={0.08}>
      <article id={track.id} className={`${PROGRAM_CARD} scroll-mt-24`}>
        <ProgramCover id={group.id} index={index} />

        <div className={PROGRAM_BODY}>
          <h3 className={PROGRAM_H3}>{group.title}</h3>
          <p className={PROGRAM_DESCRIPTION}>{group.description}</p>

          <div className={PROGRAM_ACTIONS}>
            <ModalButton modal="program" prefill={{ Track: track.title }}>
              Apply for this track
            </ModalButton>
            <AdvisorLink href={`/contact?program=${track.id}`} />
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ProgramCards() {
  const [picker, setPicker] = useState<{
    group: ProgramGroup;
    tracks: DetailedProgram[];
  } | null>(null);

  return (
    <>
      <div className={`${PROGRAM_GRID} mt-14 sm:mt-16`}>
        {programGroups.map((group, index) => {
          const tracks = group.trackIds
            .map((tid) => detailedPrograms.find((p) => p.id === tid))
            .filter((p): p is DetailedProgram => Boolean(p));

          return tracks.length > 1 ? (
            <GroupedProgramCard
              key={group.id}
              group={group}
              index={index}
              tracks={tracks}
              onPick={(g, t) => setPicker({ group: g, tracks: t })}
            />
          ) : (
            <StandaloneProgramCard
              key={group.id}
              group={group}
              index={index}
              track={tracks[0]}
            />
          );
        })}
      </div>

      {picker && (
        <TrackPickerDialog
          group={picker.group}
          tracks={picker.tracks}
          onClose={() => setPicker(null)}
        />
      )}
    </>
  );
}
