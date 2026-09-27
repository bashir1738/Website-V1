"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useModal } from "@/components/modals/modal-provider";
import { BTN_PRIMARY, BTN_GHOST, CUSTOM_SCROLL } from "@/lib/styles";
import type { DetailedProgram, ProgramGroup } from "./content";

/** Exit animation length — mirrors --animate-bf-modal-out in globals.css. */
const EXIT_MS = 240;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Shell — matches the shared form modal: bottom sheet on mobile, centred
   dialog on desktop, with the same enter/exit animations. */
const STAGE = "fixed inset-0 z-[80] overflow-hidden";
const BACKDROP = "absolute inset-0 bg-[rgba(4,4,7,0.62)] backdrop-blur-[10px]";
const PANEL =
  "pointer-events-none absolute inset-0 flex items-end justify-center lg:items-center lg:px-6";
const PANEL_CARD =
  "relative flex min-h-0 w-full flex-col overflow-hidden outline-none max-h-[92dvh] rounded-t-[28px] bg-(--card-strong) shadow-[0_-10px_36px_-28px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:max-h-[calc(100vh-3rem)] lg:max-w-[46rem] lg:rounded-[28px] lg:shadow-[0_22px_55px_-42px_rgba(0,0,0,0.4)] lg:focus-visible:outline-2 lg:-outline-offset-2 lg:focus-visible:outline-(--accent)";
const PANEL_ENTER = "pointer-events-auto animate-bf-fade-in lg:animate-bf-modal-in";
const PANEL_EXIT = "pointer-events-none animate-bf-fade-out lg:animate-bf-modal-out";

const HEADER =
  "relative shrink-0 border-b border-(--line) px-6 py-6 sm:px-8 lg:px-9";
const HEADER_TITLE =
  "font-heading text-[1.35rem] font-bold leading-[1.15] tracking-[-0.03em] text-(--page-fg)";
const HEADER_HINT =
  "mt-2 max-w-[44ch] text-[0.875rem] leading-[1.6] text-(--muted)";
const HEADER_ASK =
  "mt-3 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-(--accent) no-underline";
const HEADER_ASK_SPAN =
  "transition-[translate] duration-200 ease-out group-hover:translate-x-[0.3rem]";
const CLOSE_BUTTON =
  "absolute top-6 right-6 grid h-9 w-9 place-items-center rounded-full border border-(--line-strong) text-(--muted) transition-colors duration-200 hover:border-(--accent-line) hover:text-(--page-fg) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent)";

const TRACK_LIST = `${CUSTOM_SCROLL} flex min-h-0 flex-1 flex-col overflow-y-auto`;
const TRACK_ROW =
  "flex flex-col gap-3 border-b border-(--line) px-6 py-6 transition-colors duration-[250ms] last:border-b-0 hover:bg-(--card-hover) sm:px-8 lg:px-9";
const TRACK_NAME =
  "font-heading text-[1.05rem] font-bold leading-[1.2] tracking-[-0.03em] text-(--page-fg)";
const TRACK_P = "mt-1.5 max-w-[54ch] text-[0.875rem] leading-[1.6] text-(--muted)";
const TRACK_ACTIONS = "mt-1 flex flex-wrap items-center gap-x-5 gap-y-3";

/**
 * Track list opened from a program card. Cards stay deliberately plain, so the
 * detail — fees, curriculum, per-track application — lives here.
 */
export function TrackPickerDialog({
  group,
  tracks,
  onClose,
}: {
  group: ProgramGroup;
  tracks: DetailedProgram[];
  onClose: () => void;
}) {
  const { openModal } = useModal();
  const uid = useId();
  const titleId = `${uid}-title`;
  const hintId = `${uid}-hint`;
  const panelRef = useRef<HTMLDivElement>(null);
  const exitingRef = useRef(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [exiting, setExiting] = useState(false);

  /** Animated close: plays the exit, then unmounts through the parent. */
  const requestClose = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    exitTimer.current = setTimeout(() => {
      exitTimer.current = null;
      onClose();
    }, EXIT_MS);
  }, [onClose]);

  // Move focus into the dialog, and hand it back on close.
  useEffect(() => {
    const restoreRef = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => {
      restoreRef?.focus?.();
    };
  }, []);

  // Escape to close, and lock the page behind the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    const prevDataset = document.body.dataset.modalOpen;
    const prevOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.dataset.modalOpen = "true";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (prevDataset === undefined) delete document.body.dataset.modalOpen;
      else document.body.dataset.modalOpen = prevDataset;
      document.body.style.overflow = prevOverflow;
    };
  }, [requestClose]);

  // Keep Tab inside the dialog while it is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || exitingRef.current) return;
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );
      if (nodes.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active ? panel.contains(active) : false;
      if (e.shiftKey && (active === first || active === panel || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, []);

  /** Close first, then open the form, so the two never fight over scroll lock. */
  const applyFor = (track: DetailedProgram) => {
    requestClose();
    openTimer.current = setTimeout(
      () => openModal("program", { Track: track.title }),
      EXIT_MS,
    );
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={STAGE}>
      <div
        aria-hidden="true"
        onClick={requestClose}
        className={`${BACKDROP} ${exiting ? "animate-bf-fade-out" : "animate-bf-fade"}`}
      />

      <div className={PANEL}>
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={hintId}
          className={`${PANEL_CARD} ${exiting ? PANEL_EXIT : PANEL_ENTER}`}
        >
          <header className={HEADER}>
            <h2 id={titleId} className={HEADER_TITLE}>
              Choose your track
            </h2>
            <p id={hintId} className={HEADER_HINT}>
              {group.pickerHint}
            </p>
            <a href="/contact?intent=academy" className={`group ${HEADER_ASK}`}>
              Not sure which one fits? Talk to an advisor
              <span className={HEADER_ASK_SPAN} aria-hidden="true">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={requestClose}
              aria-label="Close dialog"
              className={CLOSE_BUTTON}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>

          <ul className={TRACK_LIST}>
            {tracks.map((track) => (
              <li key={track.id} id={track.id} className={TRACK_ROW}>
                <h3 className={TRACK_NAME}>{track.title}</h3>
                <p className={TRACK_P}>{track.description}</p>

                <div className={TRACK_ACTIONS}>
                  <button
                    type="button"
                    onClick={() => applyFor(track)}
                    className={`${BTN_PRIMARY} h-[2.75rem] px-5 text-[0.82rem]`}
                  >
                    <span>Apply for this track</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-[250ms] ease group-hover:translate-x-[3px]"
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
                </div>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 justify-end border-t border-(--line) px-6 py-3.5 sm:px-8 lg:px-9">
            <button type="button" onClick={requestClose} className={BTN_GHOST}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
