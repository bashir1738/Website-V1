"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { forms, type FormKey, type FormField } from "@/lib/forms";
import { postForm, postJson, ApiError } from "@/lib/api";

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

/** Field label → value, for opening a form with an answer already chosen. */
export type Prefill = Record<string, string>;

interface ModalContextValue {
  openModal: (key: FormKey, prefill?: Prefill) => void;
  closeModal: () => void;
  activeModal: FormKey | null;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<FormKey | null>(null);
  const [prefill, setPrefill] = useState<Prefill>({});

  const openModal = useCallback((key: FormKey, values: Prefill = {}) => {
    setPrefill(values);
    setActiveModal(key);
  }, []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const value = useMemo(
    () => ({ openModal, closeModal, activeModal }),
    [openModal, closeModal, activeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {activeModal && (
        <FormModal
          key={activeModal}
          formKey={activeModal}
          prefill={prefill}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
}

/* ───────────────────────────────────────────────────────────── */

function FormModal({
  formKey,
  prefill,
  onClose,
}: {
  formKey: FormKey;
  prefill: Prefill;
  onClose: () => void;
}) {
  const form = forms[formKey];
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chips, setChips] = useState<Record<string, string[]>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close, and lock the page behind the sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.dataset.modalOpen = "true";
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.body.dataset.modalOpen;
    };
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    const raw = new FormData(e.currentTarget);

    try {
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
        await postForm(`/${form.endpoint}`, body);
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
        await postJson(`/${form.endpoint}`, body);
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="anim-fade absolute inset-0 bg-[rgba(4,4,7,0.72)] backdrop-blur-[6px]"
      />

      {/* Sheet */}
      <div className="anim-up absolute inset-0 flex flex-col">
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={form.title}
          className="mx-3 mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[26px] border border-b-0 border-[var(--line-strong)] bg-[var(--card-strong)] shadow-[0_-30px_90px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl outline-none sm:mx-5 sm:mt-6"
        >
          {/* Header */}
          <div className="relative border-b border-[var(--line)] px-6 pb-6 pt-7 sm:px-10">
            <div className="mx-auto max-w-[880px] pr-12">
              <div className="eyebrow mb-3">{form.eyebrow}</div>
              <h2 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight text-[var(--page-fg)]">
                {form.title}
              </h2>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[var(--muted)]">
                {form.subtitle}
              </p>

              {/* What the visitor already chose on the way in */}
              {Object.entries(prefill).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(prefill).map(([label, chosen]) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-line)] bg-[var(--accent-dim)] px-3 py-1.5 text-xs text-[var(--page-fg)]"
                    >
                      <span className="text-[var(--dim)]">{label}</span>
                      <span className="font-semibold">{chosen}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-6 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--muted)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--page-fg)] sm:right-8 sm:top-7"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="custom-scroll min-h-0 flex-1 overflow-y-auto px-6 pb-12 pt-8 sm:px-10">
            {submitted ? (
              <div className="anim-pop-slow mx-auto my-10 max-w-[520px] text-center">
                <div className="mx-auto mb-7 grid h-[66px] w-[66px] place-items-center rounded-full border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.14)] text-2xl text-[#34d399]">
                  ✓
                </div>
                <h3 className="font-heading text-2xl font-bold text-[var(--page-fg)]">
                  {form.successTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {form.successBody}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost mt-8"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                encType={form.multipart ? "multipart/form-data" : undefined}
                className="mx-auto max-w-[880px]"
              >
                <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                  {form.fields.map((field) => (
                    <Field
                      key={field.label}
                      field={field}
                      value={prefill[field.label]}
                      selected={chips[field.label] ?? []}
                      onToggleChip={(option) =>
                        toggleChip(field.label, option)
                      }
                    />
                  ))}
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-8 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm leading-relaxed text-[#fca5a5]"
                  >
                    {error}
                  </p>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-[var(--line)] pt-7">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending…" : form.cta}
                    {!submitting && <span aria-hidden="true">→</span>}
                  </button>
                  <p className="max-w-[44ch] text-xs leading-relaxed text-[var(--dim)]">
                    {form.note}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  selected,
  onToggleChip,
}: {
  field: FormField;
  value?: string;
  selected: string[];
  onToggleChip: (option: string) => void;
}) {
  const id = `f-${field.name}`;
  const kind = field.kind ?? "input";

  return (
    <div className="min-w-0" style={{ gridColumn: field.span ?? "auto" }}>
      <label htmlFor={id} className="field-label">
        {field.label}
        {field.required && <span className="text-[var(--accent)]">*</span>}
      </label>

      {kind === "input" && (
        <input
          id={id}
          name={field.name}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          required={field.required}
          autoComplete={AUTOCOMPLETE[field.name]}
          defaultValue={value}
          className="field-input"
        />
      )}

      {kind === "select" && (
        <select
          id={id}
          name={field.name}
          className="field-select"
          defaultValue={value ?? ""}
          required={field.required}
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
      )}

      {kind === "textarea" && (
        <textarea
          id={id}
          name={field.name}
          rows={4}
          placeholder={field.placeholder}
          required={field.required}
          className="field-textarea"
        />
      )}

      {kind === "file" && (
        <label htmlFor={id} className="field-file">
          <span aria-hidden="true" className="text-[15px]">
            ↑
          </span>
          <span>{field.placeholder}</span>
          <input id={id} name={field.name} type="file" className="sr-only" />
        </label>
      )}

      {kind === "chips" && (
        <div className="flex flex-wrap gap-2">
          {(field.options ?? []).map((o) => (
            <button
              key={o}
              type="button"
              className="chip"
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
