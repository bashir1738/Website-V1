"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  RiArrowLeftSLine,
  RiBankCardLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiFileUploadLine,
  RiRefreshLine,
  RiTimeLine,
  RiWallet3Line,
} from "react-icons/ri";
import { ApiError, getJson, postForm } from "@/lib/api";
import { formatFileSize, validateUpload } from "@/lib/file-upload";
import {
  BTN_GHOST,
  BTN_PRIMARY,
  EYEBROW,
  FIELD_ERROR,
  FIELD_FILE,
  FIELD_INPUT,
} from "@/lib/styles";

const naira = (value: number | null | undefined) =>
  `₦${Number(value ?? 0).toLocaleString("en-NG")}`;

const fmtDate = (value: string | null | undefined) => {
  if (!value) return "Not available";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "Not available" : d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
};

interface PaymentRow {
  id: number;
  installmentNumber: number;
  amount: number;
  status: "pending_review" | "verified" | "rejected";
  installmentStatus: string;
  proofFile?: string | null;
  referenceNote?: string | null;
  submittedAt?: string | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  nonRefundable?: boolean;
}

interface StatusPayload {
  applicant: {
    id: number;
    name: string;
    email: string;
    phone: string;
    track: string;
    status: string;
    legacy?: boolean;
  };
  track: {
    key: string;
    name: string;
    price: number;
    duration?: string;
    description?: string;
    totalInstallments: number;
  } | null;
  payments: PaymentRow[];
  bank: { accountName: string; accountNumber: string; bankName: string };
  nextUpload: {
    allowed: boolean;
    reason?: string;
    installmentNumber?: number;
    amount?: number;
    dueDate?: string | null;
    rejectedPrior?: boolean;
  };
  notices: { nonRefundable: boolean; secureSpot: boolean };
}

function StatusBadge({ status }: { status: PaymentRow["status"] }) {
  const map = {
    pending_review: {
      label: "Awaiting review",
      cls: "border-amber-500/40 bg-amber-500/10 text-amber-300",
      Icon: RiTimeLine,
    },
    verified: {
      label: "Verified",
      cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      Icon: RiCheckLine,
    },
    rejected: {
      label: "Needs attention",
      cls: "border-red-500/40 bg-red-500/10 text-red-400",
      Icon: RiCloseCircleLine,
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${map.cls}`}
    >
      <map.Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {map.label}
    </span>
  );
}

const SECTION_LABEL =
  "flex items-center gap-2 font-heading text-sm font-bold tracking-[-0.01em] text-(--page-fg) uppercase";

const PANEL =
  "rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow-card)";

export function ApplyStatusClient({ token }: { token: string }) {
  const [payload, setPayload] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async (): Promise<StatusPayload> => {
    return (await getJson(`/payments/status/${encodeURIComponent(token)}`)) as StatusPayload;
  }, [token]);

  useEffect(() => {
    let active = true;
    fetchStatus()
      .then((data) => {
        if (!active) return;
        setPayload(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof ApiError
            ? err.status === 404
              ? "That application link doesn't exist. Check the address in the email, or contact us for a fresh link."
              : err.message
            : "We couldn't reach the server. Check your connection and try again.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchStatus]);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setPayload(await fetchStatus());
      setError(null);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "We couldn't reach the server.",
      );
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  const [file, setFile] = useState<File | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      setFileLabel(null);
      setFileError(null);
      return;
    }
    const problem = validateUpload(f, ".pdf,.doc,.docx,image/jpeg,image/png");
    if (problem) {
      setFileError(problem);
      setFile(null);
      setFileLabel(null);
      e.target.value = "";
      return;
    }
    setFileError(null);
    setFile(f);
    setFileLabel(`${f.name} · ${formatFileSize(f.size)}`);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploading) return;
    if (!file) {
      setFileError("Attach the transfer receipt (image, PDF, or DOCX).");
      return;
    }
    setUploading(true);
    try {
      const body = new FormData();
      body.append("token", token);
      body.append("proof", file);
      if (note.trim()) body.append("reference_note", note.trim());
      await postForm("/payments/upload", body);
      toast.success("Proof received. Awaiting verification.");
      setFile(null);
      setFileLabel(null);
      setNote("");
      await reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex max-w-[1240px] flex-col items-center gap-3 px-5 pb-28 pt-24 text-(--dim)">
        <RiRefreshLine className="h-5 w-5 animate-spin text-(--accent)" />
        <span className="text-xs">Loading your application…</span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[1240px] px-5 pb-28 pt-16 sm:px-7 sm:pt-20">
        <div className="mx-auto max-w-[560px] rounded-2xl border border-(--line) bg-(--card) p-8 text-center">
          <RiErrorWarningLine
            aria-hidden="true"
            className="mx-auto text-3xl text-(--accent)"
          />
          <h1 className="mt-5 font-heading text-2xl font-bold text-(--page-fg)">
            We couldn&apos;t open that application
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">{error}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className={`${BTN_PRIMARY}`}>
              View tracks
            </Link>
            <a
              href="mailto:admin@blockfuselabs.xyz"
              className={`${BTN_GHOST}`}
            >
              Contact us
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!payload) return null;

  const { applicant, track, payments, bank, nextUpload, notices } = payload;
  const due = payments.find((p) => p.status === "pending_review") ?? null;
  const latest = [...payments]
    .sort((a, b) => b.installmentNumber - a.installmentNumber)[0];

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(bank.accountNumber);
      toast("Account number copied.");
    } catch {
      toast("Couldn't copy. Here it is: " + bank.accountNumber);
    }
  };

  return (
    <main className="mx-auto max-w-[1240px] px-5 pb-28 pt-16 sm:px-7 sm:pt-20">
      <Link
        href="/apply"
        className="inline-flex items-center gap-1 text-xs font-semibold text-(--muted) transition-colors hover:text-(--accent)"
      >
        <RiArrowLeftSLine aria-hidden="true" className="h-4 w-4" />
        All tracks
      </Link>

      <div className="mt-4">
        <div className={EYEBROW}>Your application</div>
        <h1 className="mt-2 font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-(--page-fg)">
          {applicant.name}
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-(--muted)">
          Bank the fee for your chosen track, upload the receipt here, and
          follow the review in real time. Review usually takes 1–2 working days.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left column: instructions + upload */}
        <div className="space-y-6">
          {/* Bank transfer instructions */}
          <section className={PANEL} aria-labelledby="bank-title">
            <div className={`${SECTION_LABEL}`} id="bank-title">
              <RiBankCardLine aria-hidden="true" className="text-(--accent)" />
              Pay by bank transfer
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-(--line) bg-(--surface-2) p-4">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">
                  Account name
                </dt>
                <dd className="mt-1 text-sm font-semibold text-(--page-fg)">
                  {bank.accountName}
                </dd>
              </div>
              <div className="rounded-xl border border-(--line) bg-(--surface-2) p-4">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">
                  Account number
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-(--page-fg)">
                  {bank.accountNumber}
                  <button
                    type="button"
                    onClick={copyNumber}
                    aria-label="Copy account number"
                    className="text-(--muted) transition-colors hover:text-(--accent)"
                  >
                    <RiFileCopyLine aria-hidden="true" className="h-4 w-4" />
                  </button>
                </dd>
              </div>
              <div className="rounded-xl border border-(--line) bg-(--surface-2) p-4">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">
                  Bank
                </dt>
                <dd className="mt-1 text-sm font-semibold text-(--page-fg)">
                  {bank.bankName}
                </dd>
              </div>
            </dl>

            {((nextUpload.allowed && nextUpload.amount) || due) && (
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-(--accent-line) bg-(--accent-dim) px-4 py-3">
                <RiWallet3Line aria-hidden="true" className="text-(--accent)" />
                <span className="text-xs text-(--muted)">
                  {due
                    ? `You have a payment under review for ${naira(due.amount)}.`
                    : track && nextUpload.installmentNumber
                      ? `Transfer exactly ${naira(nextUpload.amount)}${track.totalInstallments > 1 ? ` (installment ${nextUpload.installmentNumber} of ${track.totalInstallments})` : ""}.`
                      : "Amount below."}
                </span>
                <span className="font-heading text-lg font-bold text-(--page-fg)">
                  {due ? naira(due.amount) : naira(nextUpload.amount)}
                </span>
              </div>
            )}

            {notices.nonRefundable && (
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-(--dim)">
                <RiErrorWarningLine
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-(--accent)"
                />
                Application fees are non-refundable. Payment is required to secure
                your spot in the program.
              </p>
            )}
          </section>

          {/* Upload proof */}
          <section className={PANEL} aria-labelledby="upload-title">
            <div className={`${SECTION_LABEL}`} id="upload-title">
              <RiFileUploadLine aria-hidden="true" className="text-(--accent)" />
              Upload your transfer receipt
            </div>

            {nextUpload.allowed ? (
              <form onSubmit={handleUpload} className="mt-5 space-y-4">
                {nextUpload.installmentNumber && (
                  <p className="text-sm text-(--page-fg)">
                    Paying{" "}
                    <strong>
                      {naira(nextUpload.amount)}
                      {track && track.totalInstallments > 1
                        ? `: installment ${nextUpload.installmentNumber} of ${track.totalInstallments}`
                        : ""}
                    </strong>
                    {nextUpload.dueDate && (
                      <span className="text-(--muted)">
                        {" "}
                        · due by {fmtDate(nextUpload.dueDate)}
                      </span>
                    )}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="proof-file"
                    className={FIELD_FILE}
                    data-invalid={fileError ? "true" : undefined}
                  >
                    <span aria-hidden="true" className="text-[15px]">
                      ↑
                    </span>
                    <span className="truncate">
                      {fileLabel ?? "Screenshot, PDF, or DOCX of the transfer"}
                    </span>
                    <input
                      id="proof-file"
                      name="proof"
                      type="file"
                      accept=".pdf,.doc,.docx,image/jpeg,image/png"
                      className="sr-only"
                      onChange={handleFile}
                    />
                  </label>
                  {fileError && <p className={`${FIELD_ERROR} mt-1`}>{fileError}</p>}
                </div>

                <div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={500}
                    rows={3}
                    placeholder="Optional note, e.g. your MOMO/App reference number from the bank."
                    className={`${FIELD_INPUT} h-auto resize-y py-3 leading-relaxed`}
                  />
                  <div className="mt-1 text-right text-[11px] text-(--dim)">
                    {note.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  aria-busy={uploading}
                  className={`${BTN_PRIMARY} w-full sm:w-auto`}
                >
                  {uploading ? "Uploading…" : "Submit proof for review"}
                </button>
              </form>
            ) : (
              <div className="mt-5 rounded-xl border border-(--line) bg-(--surface-2) px-4 py-4 text-sm leading-relaxed text-(--muted)">
                {nextUpload.reason ||
                  "The next payment window isn't open yet. Check back when it's due, and keep an eye on your email."}
                {latest?.status === "verified" &&
                  latest.installmentNumber >= (track?.totalInstallments ?? 1) && (
                    <p className="mt-2 font-semibold text-emerald-400">
                      You&apos;re all paid up. Welcome aboard.
                    </p>
                  )}
              </div>
            )}
          </section>
        </div>

        {/* Right column: summary + history */}
        <div className="space-y-6">
          <section className={PANEL}>
            <div className={`${SECTION_LABEL}`}>
              <RiBankCardLine aria-hidden="true" className="text-(--accent)" />
              {track ? track.name : applicant.track}
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-(--muted)">Full fee</dt>
                <dd className="font-semibold text-(--page-fg)">
                  {naira(track ? track.price : latest?.amount)}
                </dd>
              </div>
              {track && track.totalInstallments > 1 && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-(--muted)">Installments</dt>
                  <dd className="font-semibold text-(--page-fg)">
                    {track.totalInstallments} × 50%
                  </dd>
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-(--muted)">Applicant</dt>
                <dd className="text-right text-(--page-fg)">
                  {applicant.email}
                  <span className="block text-xs text-(--dim)">
                    {applicant.phone}
                  </span>
                </dd>
              </div>
            </dl>
            {applicant.legacy && (
              <p className="mt-5 rounded-xl border border-(--accent-line) bg-(--accent-dim) px-4 py-3 text-xs leading-relaxed text-(--page-fg)">
                This application was made under the earlier cohort. Your
                enrollment is already recorded here. Contact us if you need
                anything.
              </p>
            )}
          </section>

          <section className={PANEL}>
            <div className={`${SECTION_LABEL}`}>
              <RiTimeLine aria-hidden="true" className="text-(--accent)" />
              Payment history
            </div>

            {payments.length === 0 ? (
              <p className="mt-5 text-sm text-(--muted)">
                No payments yet. Follow the instructions to make the transfer,
                then upload the receipt.
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {payments.map((payment) => (
                  <li
                    key={payment.id}
                    className="rounded-xl border border-(--line) bg-(--surface-2) p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-(--page-fg)">
                          {naira(payment.amount)}
                          {track && track.totalInstallments > 1 && (
                            <span className="text-(--dim)">
                              {" "}
                              · installment {payment.installmentNumber} of{" "}
                              {track.totalInstallments}
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-[11px] text-(--dim)">
                          Submitted {fmtDate(payment.submittedAt)}
                          {payment.reviewedAt
                            ? ` · reviewed ${fmtDate(payment.reviewedAt)}`
                            : ""}
                        </p>
                      </div>
                      <StatusBadge status={payment.status} />
                    </div>

                    {payment.referenceNote && (
                      <p className="mt-3 border-t border-(--line) pt-3 text-xs leading-relaxed text-(--muted)">
                        <span className="font-semibold text-(--dim)">
                          Your note:{" "}
                        </span>
                        {payment.referenceNote}
                      </p>
                    )}
                    {payment.rejectionReason && (
                      <p className="mt-3 border-t border-(--line) pt-3 text-xs leading-relaxed text-red-400">
                        <span className="font-semibold">Reason it needs attention: </span>
                        {payment.rejectionReason}
                      </p>
                    )}
                    {payment.proofFile && (
                      <a
                        href={payment.proofFile}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent) hover:underline"
                      >
                        <RiExternalLinkLine aria-hidden="true" className="h-3.5 w-3.5" />
                        View uploaded receipt
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}