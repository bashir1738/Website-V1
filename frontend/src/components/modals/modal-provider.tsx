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
import toast from "react-hot-toast";
import { forms, type FormKey, type FormField } from "@/lib/forms";
import { postForm, postJson, ApiError } from "@/lib/api";
import { formatFileSize, validateUpload } from "@/lib/file-upload";
import { payWithPaystack } from "@/lib/paystack";

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

/**
 * Raw Tailwind utilities replicating the global .btn-* / .field-* / .chip
 * component classes, so the modal's payment and layout UI is self-contained.
 * Colors come from the site's design tokens via var(--…).
 */
const BTN_PRIMARY =
  "inline-flex h-[3.125rem] items-center justify-center gap-[0.5625rem] whitespace-nowrap rounded-full bg-[var(--action-bg)] px-[1.75rem] text-[0.906rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--action-hover)] active:scale-[0.98] focus-visible:[outline:2px_solid_var(--accent)] focus-visible:outline-offset-[3px] disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:opacity-60";

const BTN_GHOST =
  "inline-flex h-[2.875rem] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--action-bg)] bg-[var(--action-bg)] px-6 text-[0.844rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--action-hover)] active:scale-[0.98] focus-visible:[outline:2px_solid_var(--accent)] focus-visible:outline-offset-[3px]";

const EYEBROW =
  "mb-3 inline-block font-medium uppercase tracking-[0.22em] text-[var(--accent)] [font-family:'JetBrains_Mono',monospace] text-[0.656rem]";

const FIELD_BASE =
  "w-full rounded-xl border border-[var(--line-strong)] bg-[var(--card)] text-sm text-[var(--page-fg)] transition-colors duration-200 focus:border-[rgba(191,100,231,0.6)] focus:outline-none data-[invalid=true]:border-[rgba(248,113,113,0.55)]";

const FIELD_INPUT = `${FIELD_BASE} h-[2.875rem] px-[0.9375rem]`;

const FIELD_SELECT = `${FIELD_BASE} h-[2.875rem] appearance-none bg-[linear-gradient(45deg,transparent_50%,var(--muted)_50%),linear-gradient(135deg,var(--muted)_50%,transparent_50%)] bg-[position:calc(100%_-_18px)_50%,calc(100%_-_13px)_50%] bg-[size:5px_5px,5px_5px] bg-no-repeat pr-9`;

const FIELD_TEXTAREA = `${FIELD_BASE} resize-y px-[0.9375rem] py-[0.8125rem] leading-[1.55]`;

const FIELD_LABEL =
  "mb-[0.5625rem] flex items-center gap-[0.4375rem] text-xs font-semibold tracking-[0.02em] text-[var(--bright)]";

const FIELD_ERROR = "mt-[0.4rem] text-xs leading-[1.45] text-[#f87171]";

const FIELD_FILE =
  "flex h-[2.875rem] cursor-pointer items-center gap-[0.875rem] rounded-xl border border-dashed border-[var(--line-strong)] bg-[var(--card)] px-[0.9375rem] text-[0.813rem] text-[var(--dim)] transition duration-200 hover:border-[rgba(191,100,231,0.5)] hover:text-[var(--bright)] data-[invalid=true]:border-[rgba(248,113,113,0.55)]";

const CHIP =
  "cursor-pointer rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-[0.875rem] py-2 text-[0.781rem] text-[var(--muted)] transition-colors duration-100 hover:border-[rgba(191,100,231,0.55)] hover:bg-[var(--accent-dim)] hover:text-[var(--page-fg)] data-[selected=true]:border-[rgba(191,100,231,0.6)] data-[selected=true]:bg-[var(--accent-dim)] data-[selected=true]:text-[var(--page-fg)]";

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
  const [paying, setPaying] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
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

  const clearFieldError = (name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || paying) return;

    const raw = new FormData(e.currentTarget);

    // Client-side validation — surface errors under the offending fields.
    const nextErrors: Record<string, string> = {};
    if (form.multipart) {
      for (const field of form.fields) {
        if (field.kind !== "file") continue;
        const file = raw.get(field.name);
        if (file instanceof File && file.size > 0) {
          const problem = validateUpload(file, field.accept);
          if (problem) nextErrors[field.name] = problem;
        }
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      toast.error("Please fix the highlighted fields.");
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

      // Payment-backed flows: the submit response carries the server-set price
      // and reference. Pay inline, then verify server-side.
      const paymentInfo = paymentOf(res);
      if (form.paid && paymentInfo) {
        setPaying(true);
        try {
          const outcome = await payWithPaystack(paymentInfo);
          if (outcome === "cancelled") {
            toast("Payment wasn't completed. Your form is saved, and you can resubmit to try again.");
            return;
          }
          await postJson("/payments/verify", { reference: paymentInfo.reference });
        } catch (err) {
          if (err instanceof ApiError) {
            toast.error(
              err.status === 402
                ? "Payment didn't go through. You can try submitting again."
                : err.message,
            );
          } else {
            toast.error(
              "Payment couldn't be confirmed right now. If you were charged, your submission is saved and will be confirmed shortly.",
            );
          }
          return;
        } finally {
          setPaying(false);
        }
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
              <div className={EYEBROW}>{form.eyebrow}</div>
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
                  className={`${BTN_GHOST} mt-8`}
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
                      error={fieldErrors[field.name]}
                      onClearError={() => clearFieldError(field.name)}
                      onToggleChip={(option) =>
                        toggleChip(field.label, option)
                      }
                    />
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-[var(--line)] pt-7">
                  <button
                    type="submit"
                    className={BTN_PRIMARY}
                    disabled={submitting || paying}
                    aria-busy={submitting || paying}
                  >
                    {paying
                      ? "Complete payment…"
                      : submitting
                        ? "Sending…"
                        : form.cta}
                    {!submitting && !paying && <span aria-hidden="true">→</span>}
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

interface PaymentInfo {
  publicKey: string;
  email: string;
  amountKobo: number;
  reference: string;
}

/** Extract the server-issued payment payload from a submit response, if any. */
function paymentOf(res: unknown): PaymentInfo | null {
  if (res && typeof res === "object" && "payment" in res && res.payment) {
    return res.payment as PaymentInfo;
  }
  return null;
}

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

  return (
    <div className="min-w-0" style={{ gridColumn: field.span ?? "auto" }}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {field.label}
        {field.required && <span className="text-[var(--accent)]">*</span>}
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
            defaultValue={value}
            onChange={onClearError}
            className={FIELD_INPUT}
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
            className={FIELD_SELECT}
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
            className={FIELD_TEXTAREA}
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
              className={CHIP}
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
      <label htmlFor={id} className={FIELD_FILE} data-invalid={shownError ? "true" : undefined}>
        <span aria-hidden="true" className="text-[15px]">
          ↑
        </span>
        <span className="truncate">{label ?? field.placeholder}</span>
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
        <p id={`${id}-error`} className="mt-2 text-xs text-[#fca5a5]">
          {shownError}
        </p>
      )}
    </>
  );
}
