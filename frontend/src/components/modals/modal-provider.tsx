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
import { redirectToCheckout, savePendingPayment } from "@/lib/paystack";
import {
  EYEBROW,
  BTN_GHOST,
  BTN_PRIMARY,
  FIELD_LABEL,
  FIELD_INPUT,
  FIELD_SELECT,
  FIELD_TEXTAREA,
  FIELD_ERROR,
  FIELD_FILE,
  CHIP,
  CUSTOM_SCROLL,
} from "@/lib/styles";

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.body.dataset.modalOpen;
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  // Keep the focused field visible when the software keyboard opens.
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        window.setTimeout(() => {
          target.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 280);
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
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
    if (submitting) return;

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
      // and the Paystack checkout URL. Redirect to Paystack's hosted checkout;
      // Paystack brings the visitor back to /payment/status, which verifies
      // the charge server-side.
      const paymentInfo = paymentOf(res);
      if (form.paid && paymentInfo) {
        if (!paymentInfo.authorizationUrl) {
          toast.error("We couldn't start payment for this submission. Please try again.");
          return;
        }
        savePendingPayment(paymentInfo.reference, formKey);
        redirectToCheckout(paymentInfo);
        return;
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
    <div className="fixed inset-0 z-[90] h-[100dvh] w-full overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="animate-bf-fade absolute inset-0 bg-[rgba(4,4,7,0.72)] backdrop-blur-[6px]"
      />

      {/* Sheet */}
      <div className="animate-bf-up absolute inset-0 flex flex-col items-center justify-start sm:justify-center">
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={form.title}
          className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden border-0 border-(--line-strong) bg-(--card-strong) outline-none sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:w-[min(100%-1rem,960px)] sm:flex-none sm:rounded-[24px] sm:border sm:shadow-[0_24px_64px_-28px_rgba(0,0,0,0.55)] sm:backdrop-blur-2xl lg:max-h-[calc(100dvh-3rem)]"
        >
          {/* Header — sticky, compact on short/small screens */}
          <div className="relative shrink-0 border-b border-(--line) bg-(--card-strong)/95 px-4 pb-4 pt-4 backdrop-blur-xl sm:px-8 sm:pb-5 sm:pt-6">
            <div className="mx-auto max-w-[880px] pr-12">
              <div className={`${EYEBROW} mb-2 sm:mb-3`}>{form.eyebrow}</div>
              <h2 className="font-heading text-[clamp(1.25rem,4vw,2.125rem)] font-bold leading-tight text-(--page-fg)">
                {form.title}
              </h2>
              <p className="mt-1.5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-(--muted) sm:mt-2 sm:text-sm">
                {form.subtitle}
              </p>

              {/* What the visitor already chose on the way in */}
              {Object.entries(prefill).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  {Object.entries(prefill).map(([label, chosen]) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-(--accent-line) bg-(--accent-dim) px-3 py-1.5 text-xs text-(--page-fg)"
                    >
                      <span className="text-(--dim)">{label}</span>
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
              className="absolute right-3 top-3 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-(--line-strong) text-(--muted) transition-colors hover:bg-(--card-hover) hover:text-(--page-fg) sm:right-5 sm:top-5"
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

          {/* Body — the only scroll region */}
          <div
            className={`${CUSTOM_SCROLL} min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pb-8 sm:pt-7 [-webkit-overflow-scrolling:touch]`}
          >
            {submitted ? (
              <div className="animate-bf-pop-slow mx-auto my-10 max-w-[520px] text-center">
                <div className="mx-auto mb-7 grid h-[66px] w-[66px] place-items-center rounded-full border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.14)] text-2xl text-[#34d399]">
                  ✓
                </div>
                <h3 className="font-heading text-2xl font-bold text-(--page-fg)">
                  {form.successTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-(--muted)">
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
                <div className="grid gap-4 sm:gap-[22px] grid-cols-1 min-[22rem]:[grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
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

                <div className="mt-8 flex flex-col gap-4 border-t border-(--line) pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:pt-7">
                  <button
                    type="submit"
                    className={`${BTN_PRIMARY} w-full sm:w-auto`}
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending…" : form.cta}
                    {!submitting && <span aria-hidden="true">→</span>}
                  </button>
                  {form.note && (
                    <p className="max-w-[44ch] text-xs leading-relaxed text-(--dim)">
                      {form.note}
                    </p>
                  )}
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
  authorizationUrl: string;
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
        <p id={`${id}-error`} className={FIELD_ERROR}>
          {shownError}
        </p>
      )}
    </>
  );
}
