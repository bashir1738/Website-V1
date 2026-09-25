"use client";

import { Fragment, useState } from "react";
import { CUSTOM_SCROLL } from "@/lib/styles";

export interface DataColumn<T> {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

export function formatValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined || value === "") {
    return <span className="text-(--dim)">Not available</span>;
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not available";
  }
  if (typeof value === "string" && /^https?:\/\//.test(value)) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="inline-block max-w-[260px] align-bottom truncate text-(--accent) underline underline-offset-4"
      >
        {value.replace(/^https?:\/\//, "")}
      </a>
    );
  }
  return String(value);
}

export function formatDate(value: unknown): string {
  if (!value) return "Not available";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/** Keys that carry no submission content and are hidden from the detail view. */
const META_KEYS = new Set(["id", "createdAt", "updatedAt", "deletedAt"]);

function humanize(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Renders every stored field of a submission as label/value pairs. */
export function SubmissionDetail({ row }: { row: Record<string, unknown> }) {
  const entries = Object.entries(row).filter(([key]) => !META_KEYS.has(key));

  return (
    <dl className={`${CUSTOM_SCROLL} grid max-h-[50vh] gap-x-8 gap-y-4 overflow-y-auto p-5 sm:grid-cols-2 lg:grid-cols-3`}>
      {entries.map(([key, value]) => (
        <div key={key} className="min-w-0">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-(--dim)">
            {humanize(key)}
          </dt>
          <dd className="mt-1 break-words text-sm leading-relaxed text-(--page-fg)">
            {formatValue(value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyLabel = "Nothing here yet.",
  renderDetail,
}: {
  columns: DataColumn<T>[];
  rows: T[];
  emptyLabel?: string;
  renderDetail?: (row: T) => React.ReactNode;
}) {
  const [openKey, setOpenKey] = useState<string | number | null>(null);
  const hasDetail = Boolean(renderDetail);

  return (
    <div className={`${CUSTOM_SCROLL} overflow-x-auto rounded-xl border border-(--line)`}>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-(--line-strong) bg-(--surface-2) text-[11px] uppercase tracking-wider text-(--dim)">
            {hasDetail && <th className="w-10 px-4 py-3" aria-label="Details" />}
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (hasDetail ? 1 : 0)}
                className="px-4 py-12 text-center text-sm text-(--muted)"
              >
                {emptyLabel}
              </td>
            </tr>
          )}
          {rows.map((row, index) => {
            const key = (row.id as string | number) ?? index;
            const open = hasDetail && openKey === key;
            return (
              <Fragment key={key}>
                <tr className="border-b border-(--line) bg-(--card) transition-colors last:border-b-0 hover:bg-(--card-hover)">
                  {hasDetail && (
                    <td className="px-4 py-3 align-middle">
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : key)}
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
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-middle">
                      {column.render
                        ? column.render(row)
                        : formatValue(row[column.key])}
                    </td>
                  ))}
                </tr>
                {open && (
                  <tr className="border-b border-(--line) bg-(--surface-2)">
                    <td colSpan={columns.length + 1}>
                      {renderDetail?.(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}