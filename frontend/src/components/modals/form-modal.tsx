"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { forms, type FormKey, type FormField } from "@/lib/forms";
import { postForm, postJson, ApiError } from "@/lib/api";
import { formatFileSize, validateUpload } from "@/lib/file-upload";
import { validateFieldValue } from "@/lib/validation";
import {
  BTN_GHOST,
  BTN_PRIMARY,
  CUSTOM_SCROLL,
  FIELD_LABEL,
  FIELD_INPUT,
  FIELD_SELECT,
  FIELD_TEXTAREA,
  FIELD_ERROR,
  FIELD_FILE,
  CHIP,
} from "@/lib/styles";
import type { Prefill } from "./modal-provider";

/** Exit animation length — mirrors --animate-bf-sheet-out in globals.css. */
const EXIT_MS = 240;

/** Soft accent halo for focused fields, layered onto the shared FIELD_* styles. */
const FOCUS_RING = "focus:shadow-[0_0_0_3px_rgba(191,100,231,0.15)]";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Browser autofill hints, keyed by API field name. */
const AUTOCOMPLETE: Record<string, string> = {
  name: "name",
  email: "email",
  phone: "tel",
  company: "organization",
  organisation: "organization",
  github: "url",
  linkedin: "url",
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/35 border-t-white"
    />
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────── */

export function FormModal({
  formKey,
  prefill,
  onClose,
}: {
  formKey: FormKey;
  prefill: Prefill;
  onClose: () => void;
}) {
  const form = forms[formKey];
  const uid = useId();
  const titleId = `${uid}-title`;
  const subtitleId = `${uid}-subtitle`;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  /** Token issued at application time; opens the applicant payment/status page. */
  const [statusToken, setStatusToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [chips, setChips] = useState<Record<string, string[]>>({});
  const [exiting, setExiting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dragY, setDragY] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const formScrollerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const exitingRef = useRef(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragYRef = useRef(0);

  const prefillEntries = Object.entries(prefill);

  /** Animated close: plays the exit, then unmounts through the provider. */
  const requestClose = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    dragStartY.current = null;
    dragYRef.current = 0;
    setDragY(0);
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    exitTimer.current = setTimeout(() => {
      exitTimer.current = null;
      onClose();
    }, EXIT_MS);
  }, [onClose]);

  // Capture the trigger before opening so focus can return to it on close.
  useEffect(() => {
    restoreRef.current = (document.activeElement as HTMLElement | null) ?? null;
    const id = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      const el = restoreRef.current;
      if (el && el.isConnected && el !== document.body) el.focus();
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

  // Keep the focused field visible when the software keyboard opens, but only
  // inside the modal’s own scroll area on mobile so we don't push the sheet out
  // of alignment and hide lower controls.
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (!(tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")) return;

      const scroller = formScrollerRef.current;
      if (!scroller || window.innerWidth >= 1024) {
        window.setTimeout(() => {
          target.scrollIntoView({ block: "nearest", behavior: "auto" });
        }, 120);
        return;
      }

      const scrollerRect = scroller.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const belowFold = targetRect.bottom - scrollerRect.bottom + 24;
      const aboveFold = scrollerRect.top - targetRect.top + 24;

      if (belowFold > 0) {
        scroller.scrollTop += belowFold;
      } else if (aboveFold > 0) {
        scroller.scrollTop = Math.max(0, scroller.scrollTop - aboveFold);
      }
    };

    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, []);

  // Announce the confirmation once the form is replaced by the success state.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const toggleChip = (field: string, option: string) => {
    setChips((prev) => {
      const current = prev[field] ?? [];
      return {
        ...prev,
        [field]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const clearFieldError = (name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  // Swipe the sheet down from the handle to dismiss (mobile only).
  const onHandleTouchStart = (e: React.TouchEvent) => {
    if (exitingRef.current) return;
    dragStartY.current = e.touches[0].clientY;
    dragYRef.current = 0;
    setDragY(0);
  };
  const onHandleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    dragYRef.current = dy > 0 ? dy : 0;
    setDragY(dragYRef.current);
  };
  const onHandleTouchEnd = () => {
    if (dragStartY.current === null) return;
    dragStartY.current = null;
    const travelled = dragYRef.current;
    dragYRef.current = 0;
    setDragY(0);
    if (travelled > 80) requestClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || exitingRef.current) return;

    const raw = new FormData(e.currentTarget);

    // Client-side validation — surface errors under the offending fields.
    // The form is `noValidate`, so every rule (including "required") is ours.
    const nextErrors: Record<string, string> = {};
    for (const field of form.fields) {
      if (field.kind === "file") {
        const file = raw.get(field.name);
        const present = file instanceof File && file.size > 0;
        if (field.required && !present) {
          nextErrors[field.name] = "Please attach a file.";
          continue;
        }
        if (present && form.multipart) {
          const problem = validateUpload(file, field.accept);
          if (problem) nextErrors[field.name] = problem;
        }
        continue;
      }
      if (field.kind === "select") {
        const value = raw.get(field.name);
        if (field.required && (typeof value !== "string" || value === "")) {
          nextErrors[field.name] = "Please choose an option.";
        }
        continue;
      }
      if (field.kind === "chips") continue;
      const value = raw.get(field.name);
      if (typeof value !== "string") continue;
      const problem = validateFieldValue(field, value, formKey);
      if (problem) nextErrors[field.name] = problem;
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      toast.error("Please fix the highlighted fields.");
      const first = form.fields.find((f) => nextErrors[f.name]);
      const el = first ? document.getElementById(`f-${first.name}`) : null;
      if (el) {
        el.focus({ preventScroll: true });
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      let res: unknown;
      if (form.multipart) {
        const body = new FormData();
        for (const field of form.fields) {
          if (field.kind === "chips") {
            for (const value of chips[field.label] ?? []) {
              body.append(field.name, value);
            }
            continue;
          }
          if (field.kind === "file") {
            const file = raw.get(field.name);
            if (file instanceof File && file.size > 0) body.append(field.name, file);
            continue;
          }
          const value = raw.get(field.name);
          if (typeof value === "string" && value !== "") body.append(field.name, value);
        }
        res = await postForm(`/${form.endpoint}`, body);
      } else {
        const body: Record<string, unknown> = {};
        for (const field of form.fields) {
          if (field.kind === "chips") {
            const values = chips[field.label] ?? [];
            if (values.length > 0) body[field.name] = values;
            continue;
          }
          const value = raw.get(field.name);
          if (typeof value === "string" && value !== "") body[field.name] = value;
        }
        res = await postJson(`/${form.endpoint}`, body);
      }

      // Program applications return an opaque status_token: it opens the
      // token-protected page where the applicant banks the transfer proof.
      if (
        formKey === "program" &&
        res &&
        typeof res === "object" &&
        "statusToken" in res &&
        typeof res.statusToken === "string"
      ) {
        setStatusToken(res.statusToken);
      }

      setSubmitted(true);
      toast.success(form.successTitle);
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-[90] w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "100dvh" }}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={requestClose}
        className={`absolute inset-0 bg-[rgba(4,4,7,0.62)] backdrop-blur-[10px] ${
          exiting ? "animate-bf-fade-out" : "animate-bf-fade"
        }`}
      />

      {/* Stage — pointer-events pass through to the backdrop outside the panel */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center lg:items-center lg:px-6">
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={subtitleId}
          style={
            dragY > 0
              ? { transform: `translateY(${dragY}px)` }
              : { transition: "transform 200ms ease" }
          }
          className={[
            "relative flex min-h-0 w-full flex-col overflow-hidden outline-none",
            // Mobile: bottom sheet with a peek of the backdrop above it.
            "h-[calc(100vh-0.75rem)] max-h-[calc(100vh-0.75rem)] rounded-t-[28px]",
            "bg-(--card-strong) shadow-[0_-10px_36px_-28px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
            // Desktop: centred two-panel dialog.
            "lg:h-auto lg:max-h-[calc(100vh-3rem)] lg:w-[min(100%,64rem)] lg:rounded-[28px] lg:shadow-[0_22px_55px_-42px_rgba(0,0,0,0.4)]",
            "lg:focus-visible:outline-2 lg:-outline-offset-2 lg:focus-visible:outline-(--accent)",
            // Exactly one of these — the stage itself never takes pointer input.
            exiting
              ? "pointer-events-none animate-bf-sheet-out lg:animate-bf-modal-out"
              : "pointer-events-auto animate-bf-sheet-in lg:animate-bf-modal-in",
          ].join(" ")}
        >
          {/* Swipe handle — sits on the rail, mobile only */}
          <div
            data-drag-handle
            className="absolute inset-x-0 top-0 z-20 flex h-7 select-none items-center justify-center lg:hidden"
            style={{ touchAction: "none" }}
            onTouchStart={onHandleTouchStart}
            onTouchMove={onHandleTouchMove}
            onTouchEnd={onHandleTouchEnd}
            onTouchCancel={onHandleTouchEnd}
          >
            <span className="h-1 w-11 rounded-full bg-white/40" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Brand rail — header on mobile, identity panel on desktop */}
            <aside className="relative max-h-[45dvh] shrink-0 overflow-y-auto overflow-x-hidden bg-[#240b56] px-5 pb-5 pt-9 text-white lg:flex lg:max-h-none lg:w-[22rem] lg:shrink-0 lg:flex-col lg:overflow-hidden lg:px-8 lg:pb-8 lg:pt-9">

              <div className="relative flex flex-col lg:h-full">
                <div
                  className={`mb-2 font-mono text-[0.656rem] font-medium uppercase tracking-[0.22em] text-[#e6c2f7] ${
                    scrolled ? "hidden lg:block" : ""
                  }`}
                >
                  {form.eyebrow}
                </div>
                <h2
                  id={titleId}
                  className="pr-12 font-heading text-[clamp(1.3rem,5vw,1.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
                >
                  {form.title}
                </h2>
                <p
                  id={subtitleId}
                  className={`mt-2.5 max-w-[44ch] text-[0.844rem] leading-relaxed text-white/72 ${
                    scrolled ? "hidden lg:block" : ""
                  }`}
                >
                  {form.subtitle}
                </p>

                {/* What the visitor already chose on the way in */}
                {prefillEntries.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {prefillEntries.map(([label, chosen]) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm"
                      >
                        <span className="text-white/65">{label}</span>
                        <span className="font-semibold text-white">{chosen}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Desktop: note + wordmark pinned to the bottom of the rail */}
                <div className="mt-auto hidden lg:block">
                  {form.note && (
                    <p className="border-t border-white/15 pt-5 text-[0.781rem] leading-relaxed text-white/55">
                      {form.note}
                    </p>
                  )}
                  <div className="mt-5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white/45">
                    Blockfuse Labs
                  </div>
                </div>
              </div>
            </aside>

            {/* Form column */}
            <form
              onSubmit={handleSubmit}
              noValidate
              encType={form.multipart ? "multipart/form-data" : undefined}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* Body — the only scroll region */}
              <div
                ref={formScrollerRef}
                onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 16)}
                className={`${CUSTOM_SCROLL} min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-5 lg:px-7 lg:pb-9 lg:pt-12 [-webkit-overflow-scrolling:touch]`}
              >
                {submitted ? (
                  <div
                    ref={successRef}
                    tabIndex={-1}
                    className="mx-auto my-10 max-w-[30rem] text-center outline-none lg:my-14"
                  >
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.12)]">
                      <svg
                        className="animate-bf-fade-in h-7 w-7 text-[#34d399]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l5 5 9.75-9.75"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-6 font-heading text-[clamp(1.35rem,4vw,1.75rem)] font-bold tracking-[-0.02em] text-(--page-fg)">
                      {form.successTitle}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-(--muted)">
                      {form.successBody}
                    </p>
                  </div>
                ) : (
                  <div className="mx-auto grid w-full max-w-[44rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {form.fields.map((field) => (
                      <Field
                        key={field.label}
                        field={field}
                        value={prefill[field.label]}
                        selected={chips[field.label] ?? []}
                        error={fieldErrors[field.name]}
                        onClearError={() => clearFieldError(field.name)}
                        onToggleChip={(option) => toggleChip(field.label, option)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Action bar — always visible */}
              <div className="shrink-0 border-t border-(--line) bg-(--card-strong) backdrop-blur-xl">
                <div className="px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3.5 lg:px-7 lg:pb-5 lg:pt-4">
                  {submitted ? (
                    <div className="mx-auto flex max-w-[44rem] flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-end lg:gap-4">
                      <button
                        type="button"
                        onClick={requestClose}
                        className={`${BTN_GHOST} w-full lg:w-auto`}
                      >
                        Close
                      </button>
                      {statusToken && (
                        <Link
                          href={`/apply/${statusToken}`}
                          onClick={requestClose}
                          className={`${BTN_PRIMARY} w-full lg:w-auto`}
                        >
                          Continue to payment
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="mx-auto flex max-w-[44rem] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                      {form.note && (
                        <p className="text-xs leading-relaxed text-(--dim) lg:hidden">
                          {form.note}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        aria-busy={submitting}
                        className={`${BTN_PRIMARY} w-full shrink-0 lg:ml-auto lg:w-auto lg:min-w-[13.5rem]`}
                      >
                        {submitting && <Spinner />}
                        {submitting ? "Sending…" : form.cta}
                        {!submitting && <span aria-hidden="true">→</span>}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Close — top-right over the rail on mobile, over the form on desktop */}
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close dialog"
            className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 lg:right-4 lg:top-4 lg:border-(--line-strong) lg:bg-(--card-strong)/85 lg:text-(--muted) lg:hover:bg-(--card-hover) lg:hover:text-(--page-fg) lg:focus-visible:outline-(--accent)"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */

function Field({
  field,
  value,
  selected,
  error,
  onClearError,
  onToggleChip,
}: {
  field: FormField;
  value?: string;
  selected: string[];
  error?: string;
  onClearError: () => void;
  onToggleChip: (option: string) => void;
}) {
  const id = `f-${field.name}`;
  const kind = field.kind ?? "input";
  const autoCapitalize =
    field.type === "email" || field.type === "url"
      ? "none"
      : field.type === "tel"
        ? "off"
        : "words";

  return (
    <div className="min-w-0" style={{ gridColumn: field.span ?? "auto" }}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {field.label}
        {field.required && <span className="text-(--accent)">*</span>}
      </label>

      {kind === "input" && (
        <>
          <input
            id={id}
            name={field.name}
            type={field.type ?? "text"}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={AUTOCOMPLETE[field.name]}
            autoCapitalize={autoCapitalize}
            spellCheck={
              field.type === "url" || field.type === "email" ? false : undefined
            }
            defaultValue={value}
            onChange={onClearError}
            className={`${FIELD_INPUT} ${FOCUS_RING}`}
            data-invalid={error ? "true" : undefined}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          {error && (
            <p id={`${id}-error`} className={FIELD_ERROR}>
              {error}
            </p>
          )}
        </>
      )}

      {kind === "select" && (
        <>
          <select
            id={id}
            name={field.name}
            className={`${FIELD_SELECT} ${FOCUS_RING}`}
            defaultValue={value ?? ""}
            required={field.required}
            onChange={onClearError}
            data-invalid={error ? "true" : undefined}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <option value="" disabled>
              Select one
            </option>
            {(field.options ?? []).map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {error && (
            <p id={`${id}-error`} className={FIELD_ERROR}>
              {error}
            </p>
          )}
        </>
      )}

      {kind === "textarea" && (
        <>
          <textarea
            id={id}
            name={field.name}
            rows={4}
            placeholder={field.placeholder}
            required={field.required}
            className={`${FIELD_TEXTAREA} ${FOCUS_RING}`}
            onChange={onClearError}
            data-invalid={error ? "true" : undefined}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          {error && (
            <p id={`${id}-error`} className={FIELD_ERROR}>
              {error}
            </p>
          )}
        </>
      )}

      {kind === "file" && (
        <FileField field={field} error={error} onClearError={onClearError} />
      )}

      {kind === "chips" && (
        <div className="flex flex-wrap gap-2">
          {(field.options ?? []).map((o) => (
            <button
              key={o}
              type="button"
              className={`${CHIP} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)`}
              data-selected={selected.includes(o)}
              aria-pressed={selected.includes(o)}
              onClick={() => onToggleChip(o)}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FileField({
  field,
  error,
  onClearError,
}: {
  field: FormField;
  error?: string;
  onClearError: () => void;
}) {
  const id = `f-${field.name}`;
  const [label, setLabel] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const shownError = error ?? localError;

  return (
    <>
      <label
        htmlFor={id}
        className={`${FIELD_FILE} has-[:focus-visible]:border-(--accent) has-[:focus-visible]:shadow-[0_0_0_3px_rgba(191,100,231,0.15)]`}
        data-invalid={shownError ? "true" : undefined}
      >
        <span aria-hidden="true" className="shrink-0 text-[15px]">
          ↑
        </span>
        <span className="min-w-0 flex-1 truncate whitespace-nowrap text-ellipsis">
          {label ?? field.placeholder}
        </span>
        <input
          id={id}
          name={field.name}
          type="file"
          accept={field.accept}
          required={field.required}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            onClearError();
            if (!file) {
              setLabel(null);
              setLocalError(null);
              return;
            }
            const problem = validateUpload(file, field.accept);
            if (problem) {
              setLocalError(problem);
              setLabel(null);
              e.target.value = "";
              return;
            }
            setLocalError(null);
            setLabel(`${file.name} · ${formatFileSize(file.size)}`);
          }}
        />
      </label>
      {shownError && (
        <p id={`${id}-error`} className={FIELD_ERROR}>
          {shownError}
        </p>
      )}
    </>
  );
}
