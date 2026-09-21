"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DataTable, formatDate, type DataColumn } from "@/components/admin/data-table";
import { AdminHeader } from "@/components/admin/admin-header";
import { useCollection } from "@/components/admin/use-collection";

interface Row extends Record<string, unknown> {
  id: number;
  createdAt?: string;
}

const VIEWS: {
  key: string;
  label: string;
  path: string;
  columns: DataColumn<Record<string, unknown>>[];
}[] = [
  {
    key: "contact",
    label: "Contacts",
    path: "contact",
    columns: [
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
  },
  {
    key: "applications",
    label: "Applications",
    path: "applications",
    columns: [
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
  },
  {
    key: "hiring-requests",
    label: "Hire requests",
    path: "hiring-requests",
    columns: [
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
  },
  {
    key: "prodfest-registrations",
    label: "ProdFest",
    path: "prodfest-registrations",
    columns: [
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
  },
  {
    key: "sponsorships",
    label: "Sponsorships",
    path: "sponsorships",
    columns: [
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
  },
  {
    key: "opensource-applications",
    label: "Open source",
    path: "opensource-applications",
    columns: [
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
  },
  {
    key: "alumni-submissions",
    label: "Alumni profiles",
    path: "alumni-submissions",
    columns: [
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
  },
  {
    key: "newsletter",
    label: "Newsletter",
    path: "newsletter",
    columns: [
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
  },
];

export default function AdminInboxPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "contact";
  const activeView = VIEWS.find((v) => v.key === tab) ?? VIEWS[0];

  const { data, loading, error, reload } = useCollection<Record<string, unknown>>(
    activeView.path,
  );

  return (
    <div className="pb-16">
      <AdminHeader eyebrow="Admin" title="Inbox" />

      <div className="px-5 py-6 sm:px-8">
        {/* Tabs — use Next.js <Link> with scroll={false} so switching tabs is
            instant client-side navigation with no full page reload and no
            scroll-to-top jump. */}
        <div className="custom-scroll flex gap-1.5 overflow-x-auto pb-1" role="tablist">
          {VIEWS.map((view) => (
            <Link
              key={view.key}
              href={`/admin/inbox?tab=${view.key}`}
              scroll={false}
              replace
              role="tab"
              aria-selected={view.key === activeView.key}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                view.key === activeView.key
                  ? "border-(--accent) bg-(--accent-dim) text-(--page-fg)"
                  : "border-(--line-strong) text-(--muted) hover:text-(--page-fg)"
              }`}
            >
              {view.label}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          {loading && (
            <div className="flex flex-col items-center gap-3 py-16 text-(--dim)">
              <Loader2 className="h-5 w-5 animate-spin text-(--accent)" />
              <span className="text-xs">Loading {activeView.label.toLowerCase()}…</span>
            </div>
          )}

          {!loading && error && (
            <p className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
              {error}
            </p>
          )}

          {!loading && !error && (
            <DataTable
              columns={activeView.columns}
              rows={data as Row[]}
              emptyLabel={`No ${activeView.label.toLowerCase()} yet.`}
            />
          )}
        </div>

        {!loading && !error && (
          <button type="button" onClick={reload} className="btn-ghost mt-5">
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}