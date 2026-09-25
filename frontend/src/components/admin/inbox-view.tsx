"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { DataTable, SubmissionDetail, formatDate, type DataColumn } from "@/components/admin/data-table";
import { AdminHeader } from "@/components/admin/admin-header";
import { useCollection } from "@/components/admin/use-collection";
import { deleteJson, patchJson, postJson } from "@/lib/api";
import { INBOX_TYPES, inboxByKey } from "@/lib/admin-inbox";
import { BTN_GHOST, FIELD_INPUT } from "@/lib/styles";

const MAX_BROADCAST = 5000;

type SubmissionStatus = "pending" | "approved" | "rejected";

interface Row extends Record<string, unknown> {
  id: number;
  createdAt?: string;
}

function StatusBadge({ status }: { status: unknown }) {
  const tone =
    status === "approved"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
      : status === "rejected"
        ? "border-red-500/40 bg-red-500/10 text-red-400"
        : "border-amber-500/40 bg-amber-500/10 text-amber-300";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${tone}`}>
      {String(status ?? "pending")}
    </span>
  );
}

const COLUMNS: Record<string, DataColumn<Record<string, unknown>>[]> = {
  contact: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "topic", label: "Topic" },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  applications: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "track", label: "Track" },
    { key: "experience_level", label: "Experience" },
    {
      key: "createdAt",
      label: "Submitted",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  "hiring-requests": [
    { key: "company", label: "Company" },
    { key: "name", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "engagement_type", label: "Engagement" },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  "prodfest-registrations": [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "attending_as", label: "Attending as" },
    { key: "organisation", label: "Organisation" },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  sponsorships: [
    { key: "organisation", label: "Organisation" },
    { key: "name", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "budget", label: "Budget" },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  "opensource-applications": [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "github", label: "Repo" },
    { key: "hours", label: "Hours" },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  "alumni-submissions": [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "cohort", label: "Cohort" },
    { key: "track", label: "Track" },
    {
      key: "createdAt",
      label: "Submitted",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
  newsletter: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "topics", label: "Topics" },
    {
      key: "createdAt",
      label: "Subscribed",
      render: (r) => (
        <span className="whitespace-nowrap text-(--muted)">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
  ],
};

function BroadcastPanel({ subscribers }: { subscribers: Record<string, unknown>[] }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const active = subscribers.filter((s) => String(s.status ?? "pending") === "approved").length;

  const handleSend = async () => {
    if (
      !window.confirm(
        `Send this dispatch to ${active} subscriber${active === 1 ? "" : "s"}? This emails the whole active list.`,
      )
    ) {
      return;
    }
    setSending(true);
    setError(null);
    setResult(null);
    try {
      const data = (await postJson("/newsletter/broadcast", {
        subject,
        message,
      })) as { sent: number; failed: number };
      setResult(
        data.failed > 0
          ? `Sent to ${data.sent} subscribers (${data.failed} failed).`
          : `Sent to ${data.sent} subscriber${data.sent === 1 ? "" : "s"}.`,
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send broadcast.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-(--line-strong) bg-(--card) p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold text-(--page-fg)">Send a dispatch</h2>
        <span className="text-xs text-(--muted)">
          Recipients: {active} active subscriber{active === 1 ? "" : "s"}
        </span>
      </div>
      <div className="mt-4 grid gap-4">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={200}
          placeholder="Subject: e.g. Cohort III applications are open"
          className={FIELD_INPUT}
        />
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_BROADCAST}
            placeholder="Message: paragraphs, links, the works."
            rows={6}
            className={`${FIELD_INPUT} h-auto resize-y py-3 leading-relaxed`}
          />
          <div className="mt-1 text-right text-[11px] text-(--dim)">
            {message.length}/{MAX_BROADCAST}
          </div>
        </div>
        {error && (
          <p className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
            {error}
          </p>
        )}
        {result && (
          <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {result}
          </p>
        )}
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !subject.trim() || !message.trim() || active === 0}
          className={BTN_GHOST}
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            `Email ${active} subscriber${active === 1 ? "" : "s"}`
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-(--dim)">
        Sends to approved subscribers only. Unsubscribed readers are skipped
        automatically. Each email carries that reader&apos;s own one-click
        unsubscribe link.
      </p>
    </div>
  );
}

export function InboxView({ kind }: { kind: string }) {
  const active = inboxByKey(kind) ?? INBOX_TYPES[0];
  const { data, loading, error, reload } = useCollection<Record<string, unknown>>(active.apiPath);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteJson(`/${active.apiPath}/${id}`);
      reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete";
      alert(message);
    }
  };

  const handleStatus = async (id: number, status: SubmissionStatus) => {
    try {
      await patchJson(`/${active.apiPath}/${id}`, { status });
      reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update";
      alert(message);
    }
  };

  const isAlumni = active.key === "alumni-submissions";

  const columnsWithActions: DataColumn<Record<string, unknown>>[] = [
    ...(COLUMNS[active.key] ?? []),
    ...(isAlumni
      ? [
          {
            key: "status",
            label: "Status",
            render: (r: Record<string, unknown>) => <StatusBadge status={r.status} />,
          },
        ]
      : []),
    {
      key: "actions",
      label: "",
      render: (r) => {
        if (isAlumni) {
          const status = (r.status as SubmissionStatus | undefined) ?? "pending";
          return (
            <div className="flex flex-wrap items-center gap-2">
              {status !== "approved" && (
                <button
                  onClick={() => handleStatus(r.id as number, "approved")}
                  className="rounded-full border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  Approve
                </button>
              )}
              {status !== "rejected" && (
                <button
                  onClick={() => handleStatus(r.id as number, "rejected")}
                  className="rounded-full border border-red-500/40 px-3 py-1 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
                >
                  Reject
                </button>
              )}
              <button
                onClick={() => handleDelete(r.id as number)}
                className="text-xs font-semibold text-[#fca5a5] hover:underline"
              >
                Delete
              </button>
            </div>
          );
        }
        return (
          <button
            onClick={() => handleDelete(r.id as number)}
            className="text-xs font-semibold text-[#fca5a5] hover:underline"
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <div className="pb-16">
      <AdminHeader eyebrow="Admin" title={active.label} />

      <div className="px-5 py-6 sm:px-8">
        <div className="mt-6">
          {active.key === "newsletter" && !loading && !error && (
            <BroadcastPanel subscribers={data as Record<string, unknown>[]} />
          )}

          {loading && (
            <div className="flex flex-col items-center gap-3 py-16 text-(--dim)">
              <Loader2 className="h-5 w-5 animate-spin text-(--accent)" />
              <span className="text-xs">Loading {active.label.toLowerCase()}…</span>
            </div>
          )}

          {!loading && error && (
            <p className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
              {error}
            </p>
          )}

          {!loading && !error && (
            <DataTable
              columns={columnsWithActions}
              rows={data as Row[]}
              emptyLabel={`No ${active.label.toLowerCase()} yet.`}
              renderDetail={(row) => <SubmissionDetail row={row} />}
            />
          )}
        </div>

        {!loading && !error && (
          <button type="button" onClick={reload} className={`${BTN_GHOST} mt-5`}>
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}