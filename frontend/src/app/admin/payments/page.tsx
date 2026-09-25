"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  RiCheckLine,
  RiCloseCircleLine,
  RiExternalLinkLine,
  RiRefreshLine,
  RiTimeLine,
} from "react-icons/ri";
import { AdminHeader } from "@/components/admin/admin-header";
import { formatDate } from "@/components/admin/data-table";
import { applyTracks } from "@/features/apply/content";
import { ApiError, getJson, patchJson } from "@/lib/api";
import { BTN_GHOST, BTN_PRIMARY, FIELD_INPUT, CUSTOM_SCROLL } from "@/lib/styles";

const naira = (value: number | null | undefined) =>
  `₦${Number(value ?? 0).toLocaleString("en-NG")}`;

interface ReviewLog {
  id: number;
  action: string;
  actor: string;
  note?: string;
  createdAt?: string;
}

interface PaymentRow {
  id: number;
  amount: number;
  installment_number: number;
  installment_status: string;
  status: "pending_review" | "verified" | "rejected";
  proof_file?: string | null;
  reference_note?: string | null;
  rejection_reason?: string | null;
  submitted_at?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  non_refundable?: boolean;
  createdAt?: string;
  applicant?: {
    name: string;
    email: string;
    phone?: string;
    track?: string;
    status?: string;
    track_legacy?: boolean;
    program_start_date?: string | null;
  };
  track?: {
    key: string;
    name: string;
    price: number;
    total_installments: number;
    duration?: string;
  } | null;
  reviews?: ReviewLog[];
}

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "pending_review", label: "Pending review" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Needs attention" },
];

const STATUS_TONE: Record<PaymentRow["status"], string> = {
  pending_review: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  verified: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  rejected: "border-red-500/40 bg-red-500/10 text-red-400",
};

function StatusBadge({ status }: { status: PaymentRow["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_TONE[status]}`}
    >
      {status === "verified" ? (
        <RiCheckLine aria-hidden="true" className="h-3.5 w-3.5" />
      ) : status === "rejected" ? (
        <RiCloseCircleLine aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <RiTimeLine aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      {status === "pending_review"
        ? "Pending review"
        : status === "verified"
          ? "Verified"
          : "Needs attention"}
    </span>
  );
}

interface DetailProps {
  row: PaymentRow;
  onReviewed: () => void;
}

function PaymentDetail({ row, onReviewed }: DetailProps) {
  const [startDate, setStartDate] = useState(
    row.applicant?.program_start_date ?? "",
  );
  const [rejectReason, setRejectReason] = useState(row.rejection_reason ?? "");
  const [busy, setBusy] = useState<string | null>(null);

  const isBlockchain =
    (row.track?.total_installments ?? 1) > 1 &&
    row.installment_number < (row.track?.total_installments ?? 1);

  const approve = async () => {
    if (isBlockchain && !startDate) {
      toast.error("Set the program start date before approving. It drives the installment-2 due date.");
      return;
    }
    if (
      !window.confirm(
        `Verify this ${naira(row.amount)} payment and mark the applicant as enrolled?`,
      )
    ) {
      return;
    }
    setBusy("approve");
    try {
      await patchJson(`/payment-reviews/${row.id}/approve`, {
        program_start_date: startDate || undefined,
      });
      toast.success("Payment verified. The applicant has been emailed.");
      onReviewed();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to approve.");
    } finally {
      setBusy(null);
    }
  };

  const handleReject = async () => {
    if (!window.confirm("Reject this payment proof? The applicant will be emailed and can re-upload.")) {
      return;
    }
    setBusy("reject");
    try {
      await patchJson(`/payment-reviews/${row.id}/reject`, {
        reason: rejectReason || undefined,
      });
      toast.success("Payment rejected. The applicant has been emailed.");
      onReviewed();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to reject.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="grid gap-6 p-5 lg:grid-cols-[1fr_1fr]">
      <div className="min-w-0 space-y-4">
        <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Applicant</dt>
            <dd className="mt-0.5 text-(--page-fg)">{row.applicant?.name}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Email</dt>
            <dd className="mt-0.5 break-all text-(--page-fg)">{row.applicant?.email}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Phone</dt>
            <dd className="mt-0.5 text-(--page-fg)">{row.applicant?.phone ?? "Not available"}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Amount</dt>
            <dd className="mt-0.5 font-semibold text-(--page-fg)">{naira(row.amount)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Track</dt>
            <dd className="mt-0.5 text-(--page-fg)">
              {row.track?.name ?? row.applicant?.track}
              {row.applicant?.track_legacy && (
                <span className="ml-2 rounded-full border border-(--accent-line) px-2 py-0.5 text-[10px] text-(--accent)">
                  legacy
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Installment</dt>
            <dd className="mt-0.5 text-(--page-fg)">
              {row.installment_number}
              {row.track && row.track.total_installments > 1
                ? ` of ${row.track.total_installments}`
                : ""}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Submitted</dt>
            <dd className="mt-0.5 text-(--page-fg)">{formatDate(row.submitted_at)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">Reviewed by</dt>
            <dd className="mt-0.5 text-(--page-fg)">
              {row.reviewed_by ? `${row.reviewed_by} (${formatDate(row.reviewed_at)})` : "Not available"}
            </dd>
          </div>
        </dl>

        {row.reference_note && (
          <div className="rounded-xl border border-(--line) bg-(--surface-2) px-4 py-3 text-sm text-(--muted)">
            <span className="font-semibold text-(--dim)">Applicant note: </span>
            {row.reference_note}
          </div>
        )}

        {row.rejection_reason && (
          <div className="rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <span className="font-semibold">Rejection reason: </span>
            {row.rejection_reason}
          </div>
        )}

        {row.proof_file && (
          <a
            href={row.proof_file}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent) hover:underline"
          >
            <RiExternalLinkLine aria-hidden="true" className="h-4 w-4" />
            Open the uploaded proof
          </a>
        )}

        {(row.reviews ?? []).length > 0 && (
          <ol className="space-y-2 border-t border-(--line) pt-4">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">
              Review log
            </dt>
            {(row.reviews ?? []).map((log) => (
              <li key={log.id} className="text-xs text-(--muted)">
                <span className="capitalize font-semibold text-(--page-fg)">
                  {log.action}
                </span>{" "}
                · {log.actor}
                {log.note ? ` · ${log.note}` : ""}
                {log.createdAt ? ` · ${formatDate(log.createdAt)}` : ""}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="min-w-0 rounded-xl border border-(--line) bg-(--surface-2) p-5">
        <h3 className="text-sm font-bold text-(--page-fg)">
          Review decision
        </h3>

        {isBlockchain && (
          <label className="mt-4 block">
            <span className="mb-1 block text-[11px] font-semibold text-(--dim)">
              Program start date (YYYY-MM-DD): opens installment 2 after week 8
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={FIELD_INPUT}
            />
          </label>
        )}

        <label className="mt-4 block">
          <span className="mb-1 block text-[11px] font-semibold text-(--dim)">
            Rejection reason (sent to the applicant)
          </span>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={3}
            maxLength={2000}
            className={`${FIELD_INPUT} h-auto resize-y py-3 leading-relaxed`}
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-2">
          {row.status !== "verified" && (
            <button
              type="button"
              onClick={approve}
              disabled={busy !== null}
              aria-busy={busy === "approve"}
              className={`${BTN_PRIMARY} !min-h-9 !px-4 !text-xs`}
            >
              {busy === "approve" ? "Verifying…" : "Approve & enroll"}
            </button>
          )}
          {row.status !== "verified" && (
            <button
              type="button"
              onClick={handleReject}
              disabled={busy !== null}
              aria-busy={busy === "reject"}
              className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-red-500/40 px-4 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
            >
              {busy === "reject" ? "Rejecting…" : "Reject"}
            </button>
          )}
        </div>

        {row.status === "verified" && (
          <p className="mt-4 text-xs leading-relaxed text-emerald-400">
            This payment is verified. Applicant status:{" "}
            {row.applicant?.status ?? "Not available"}.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminPaymentsPage() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") ?? "";

  const [filters, setFilters] = useState({ status: "", track: "", installment: "" });
  const [rows, setRows] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(
    initialView ? Number(initialView) || null : null,
  );

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.track) params.set("track", filters.track);
    if (filters.installment) params.set("installment", filters.installment);
    const q = params.toString();
    return q ? `?${q}` : "";
  }, [filters]);

  const fetchRows = useCallback(async (): Promise<PaymentRow[]> => {
    return ((await getJson(`/payment-reviews${query}`)) as PaymentRow[]) ?? [];
  }, [query]);

  useEffect(() => {
    let active = true;
    fetchRows()
      .then((data) => {
        if (!active) return;
        setRows(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof ApiError ? err.message : "Failed to load payments.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchRows]);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await fetchRows());
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }, [fetchRows]);

  return (
    <div className="pb-16">
      <AdminHeader eyebrow="Admin" title="Payment reviews">
        <button type="button" onClick={() => reload()} className={BTN_GHOST}>
          <RiRefreshLine className="h-4 w-4" />
          Refresh
        </button>
      </AdminHeader>

      <div className="px-5 py-6 sm:px-8">
        {/* Filters */}
        <div className="grid gap-3 sm:grid-cols-3">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className={`${FIELD_INPUT} cursor-pointer`}
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <select
            value={filters.track}
            onChange={(e) => setFilters({ ...filters, track: e.target.value })}
            className={`${FIELD_INPUT} cursor-pointer`}
            aria-label="Filter by track"
          >
            <option value="">All tracks</option>
            {applyTracks.map((track) => (
              <option key={track.id} value={track.title}>
                {track.title}
              </option>
            ))}
          </select>

          <select
            value={filters.installment}
            onChange={(e) => setFilters({ ...filters, installment: e.target.value })}
            className={`${FIELD_INPUT} cursor-pointer`}
            aria-label="Filter by installment"
          >
            <option value="">All installments</option>
            <option value="1">Installment 1</option>
            <option value="2">Installment 2</option>
          </select>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-16 text-(--dim)">
            <RiRefreshLine className="h-5 w-5 animate-spin text-(--accent)" />
            <span className="text-xs">Loading payments…</span>
          </div>
        ) : (
          <div className={`${CUSTOM_SCROLL} mt-6 overflow-x-auto rounded-xl border border-(--line)`}>
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-(--line-strong) bg-(--surface-2) text-[11px] uppercase tracking-wider text-(--dim)">
                  <th className="w-10 px-4 py-3" aria-label="Details" />
                  <th className="px-4 py-3 font-semibold">Applicant</th>
                  <th className="px-4 py-3 font-semibold">Track</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Installment</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-(--muted)"
                    >
                      No payments match these filters.
                    </td>
                  </tr>
                )}
                {rows.map((row) => {
                  const open = openId === row.id;
                  return (
                    <Fragment key={row.id}>
                      <tr
                        className={`border-b border-(--line) bg-(--card) transition-colors hover:bg-(--card-hover) ${
                          open ? "bg-(--surface-2)" : ""
                        }`}
                      >
                        <td className="px-4 py-3 align-middle">
                          <button
                            type="button"
                            onClick={() => setOpenId(open ? null : row.id)}
                            aria-expanded={open}
                            aria-label={open ? "Hide details" : "Show details"}
                            className="grid h-7 w-7 place-items-center rounded-md border border-(--line-strong) text-(--muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
                          >
                            <svg
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <p className="font-semibold text-(--page-fg)">
                            {row.applicant?.name}
                          </p>
                          <p className="text-xs text-(--dim)">{row.applicant?.email}</p>
                        </td>
                        <td className="px-4 py-3 align-middle text-(--muted)">
                          {row.track?.name ?? row.applicant?.track ?? "Not available"}
                        </td>
                        <td className="px-4 py-3 align-middle font-semibold text-(--page-fg)">
                          {naira(row.amount)}
                        </td>
                        <td className="px-4 py-3 align-middle text-(--muted)">
                          {row.installment_number}
                          {row.track && row.track.total_installments > 1
                            ? ` / ${row.track.total_installments}`
                            : ""}
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 align-middle text-(--muted)">
                          {formatDate(row.submitted_at)}
                        </td>
                      </tr>
                      {open && (
                        <tr className="border-b border-(--line) bg-(--surface-2)">
                          <td colSpan={7}>
                            <PaymentDetail row={row} onReviewed={() => reload()} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}