"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, RefreshCw } from "lucide-react";
import { getJson } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { BTN_GHOST, EYEBROW, SURFACE_CARD } from "@/lib/styles";

interface CollectionStats {
  path: string;
  label: string;
  href: string;
  count: number;
}

const COLLECTIONS: CollectionStats[] = [
  { path: "contact", label: "Contacts", href: "/admin/inbox?tab=contact", count: 0 },
  { path: "applications", label: "Applications", href: "/admin/inbox?tab=applications", count: 0 },
  { path: "hiring-requests", label: "Hire requests", href: "/admin/inbox?tab=hiring-requests", count: 0 },
  { path: "prodfest-registrations", label: "ProdFest", href: "/admin/inbox?tab=prodfest-registrations", count: 0 },
  { path: "sponsorships", label: "Sponsorships", href: "/admin/inbox?tab=sponsorships", count: 0 },
  { path: "opensource-applications", label: "Open source", href: "/admin/inbox?tab=opensource-applications", count: 0 },
  { path: "alumni-submissions", label: "Alumni profiles", href: "/admin/inbox?tab=alumni-submissions", count: 0 },
  { path: "newsletter", label: "Subscribers", href: "/admin/inbox?tab=newsletter", count: 0 },
];

interface ActivityItem {
  bucket: string;
  href: string;
  headline: string;
  detail: string;
  at: string;
}

function headlineFor(path: string, item: Record<string, unknown>): [string, string] {
  const name = String(item.name ?? item.company ?? item.organisation ?? "(anonymous)");
  const email = String(item.email ?? "");
  switch (path) {
    case "contact":
      return [`New contact from ${name}`, String(item.topic ?? "")];
    case "applications":
      return [`Application from ${name}`, String(item.track ?? email)];
    case "hiring-requests":
      return [`Hire request — ${item.company ?? ""}`, String(item.engagement_type ?? email)];
    case "prodfest-registrations":
      return [`ProdFest registration — ${name}`, String(item.attending_as ?? email)];
    case "sponsorships":
      return [`Sponsorship from ${item.organisation ?? name}`, String(item.budget ?? email)];
    case "opensource-applications":
      return [`Open source applicant — ${name}`, String(item.github ?? email)];
    case "alumni-submissions":
      return [`Alumni profile — ${name}`, String(item.current_status ?? email)];
    case "newsletter":
      return [`Newsletter subscription — ${email}`, String(item.name ?? "")];
    default:
      return [name, email];
  }
}

function statCards(overrides: Record<string, number>) {
  return COLLECTIONS.map((c) => ({
    ...c,
    count: overrides[c.path] ?? 0,
  }));
}

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  const fetchAll = useCallback(async (): Promise<ActivityItem[] & { counts: Record<string, number> }> => {
    const entries = await Promise.all(
      COLLECTIONS.map(async (collection) => {
        // getJson() → parse() already unwraps body.data from the API envelope.
        // `res` is the array directly — do NOT access .data on it again.
        const items = (await getJson(`/${collection.path}`)) as Record<string, unknown>[];
        return { path: collection.path, items: items ?? [] };
      }),
    );

    const nextCounts: Record<string, number> = {};
    const all: ActivityItem[] = [];
    for (const entry of entries) {
      const collection = COLLECTIONS.find((c) => c.path === entry.path);
      if (!collection) continue;
      nextCounts[entry.path] = entry.items.length;
      for (const item of entry.items) {
        const [headline, detail] = headlineFor(entry.path, item);
        all.push({
          bucket: collection.label,
          href: collection.href,
          headline,
          detail,
          at: String(item.createdAt ?? ""),
        });
      }
    }
    const sorted = all.sort((a, b) => (a.at < b.at ? 1 : -1)).slice(0, 8);
    return Object.assign(sorted, { counts: nextCounts });
  }, []);

  const applyResults = useCallback((results: ActivityItem[] & { counts: Record<string, number> }) => {
    setCounts(results.counts);
    setActivity(results);
    setError(null);
  }, []);

  useEffect(() => {
    let active = true;
    fetchAll()
      .then((results) => {
        if (active) applyResults(results);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Failed to load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchAll, applyResults]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      applyResults(await fetchAll());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, [fetchAll, applyResults]);

  const cards = statCards(counts);

  return (
    <div className="pb-16">
      <AdminHeader eyebrow="Admin" title="Overview">
        <div className="flex items-center gap-3">
          {loading && (
            <span className="flex items-center gap-2 text-xs text-(--dim)">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Syncing…
            </span>
          )}
          <button type="button" onClick={load} className={BTN_GHOST}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </AdminHeader>

      {error && (
        <div className="px-5 pt-6 sm:px-8">
          <p className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
            {error}
          </p>
        </div>
      )}

      <div className="px-5 py-6 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.path}
              href={card.href}
              className={`${SURFACE_CARD} group block p-5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-(--muted)">
                  {card.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-(--accent) opacity-0 transition-opacity group-hover:opacity-100"
                >
                  →
                </span>
              </div>
              <p className="mt-3 font-heading text-3xl font-bold text-(--page-fg)">
                {card.count}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className={EYEBROW}>Latest submissions</span>
              <h2 className="mt-2 font-heading text-xl font-bold text-(--page-fg)">
                What&apos;s coming in
              </h2>
            </div>
            <Link href="/admin/inbox" className="text-sm font-semibold text-(--accent) hover:underline">
              Open inbox →
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-(--line)">
            {activity.length === 0 && (
              <p className="bg-(--card) px-4 py-12 text-center text-sm text-(--muted)">
                Nothing submitted yet.
              </p>
            )}
            {activity.map((item, index) => (
              <Link
                key={`${item.bucket}-${index}`}
                href={item.href}
                className={`flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-(--card-hover) ${
                  index > 0 ? "border-t border-(--line)" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-(--page-fg)">
                    {item.headline}
                  </p>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-(--dim)">
                    {item.bucket}
                  </span>
                </div>
                {item.detail && (
                  <p className="truncate text-xs text-(--muted)">{item.detail}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}