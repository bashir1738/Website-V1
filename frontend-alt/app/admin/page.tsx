'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getToken } from '@/lib/token'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { blogs } from '@/lib/blogs'
import { events } from '@/lib/events'
import { contact } from '@/lib/contact'
import { applications } from '@/lib/applications'
import { hire } from '@/lib/hire'
import { newsletter } from '@/lib/newsletter'
import { prodfest } from '@/lib/prodfest'
import { sponsor } from '@/lib/sponsor'
import { opensource } from '@/lib/opensource'
import { alumni } from '@/lib/alumni'
import { formatDate } from '@/lib/useData'

export default function AdminOverviewPage() {
  const token = getToken()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [recent, setRecent] = useState<{ label: string; href: string; items: { id: number; title: string; date?: string }[] }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let active = true
    const map = <T extends object>(arr: T[]): { id: number; title: string; date?: string }[] =>
      arr.map((e) => {
        const r = e as unknown as Record<string, unknown>
        return {
          id: r.id as number,
          title: (r.title ?? r.name ?? r.organisation ?? r.email) as string,
          date: (r.createdAt ?? r.date ?? r.published_at) as string | undefined,
        }
      })

    Promise.allSettled([
      blogs.getAll().then((r) => ({ key: 'Blogs', href: '/admin/blogs', entries: map(r.data) })),
      events.getAll().then((r) => ({ key: 'Events', href: '/admin/events', entries: map(r.data) })),
      contact.getAll(token).then((r) => ({ key: 'Contacts', href: '/admin/contacts', entries: map(r.data) })),
      applications.getAll(token).then((r) => ({ key: 'Applications', href: '/admin/applications', entries: map(r.data) })),
      hire.getAll(token).then((r) => ({ key: 'Hiring', href: '/admin/hiring', entries: map(r.data) })),
      newsletter.getAll(token).then((r) => ({ key: 'Newsletter', href: '/admin/newsletter', entries: map(r.data) })),
      prodfest.getAll(token).then((r) => ({ key: 'ProdFest', href: '/admin/prodfest', entries: map(r.data) })),
      sponsor.getAll(token).then((r) => ({ key: 'Sponsorships', href: '/admin/sponsorships', entries: map(r.data) })),
      opensource.getAll(token).then((r) => ({ key: 'Open Source', href: '/admin/opensource', entries: map(r.data) })),
      alumni.getAll(token).then((r) => ({ key: 'Alumni', href: '/admin/alumni', entries: map(r.data) })),
    ]).then((results) => {
      if (!active) return
      const newCounts: Record<string, number> = {}
      const newRecent: typeof recent = []
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { key, href, entries } = result.value
          newCounts[key] = entries.length
          newRecent.push({ label: key, href, items: entries })
        }
      })
      setCounts(newCounts)
      setRecent(newRecent)
    })
      .catch(() => { if (active) setError('Failed to load dashboard data') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token])

  return (
    <>
      <PageHeader title="Overview" subtitle="A summary across all Blockfuse data." />

      {error && <p className="text-accent-pink text-sm mb-6">{error}</p>}
      {loading && <p className="text-sm text-text-muted font-light mb-6">Loading dashboard…</p>}

      {/* Stat grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {recent.map((r) => (
          <StatCard key={r.label} label={r.label} value={counts[r.label] ?? 0} />
        ))}
      </div>

      {/* Recent lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recent.map((section) => (
          <div key={section.label} className="border border-dark-border">
            <div className="border-b border-dark-border px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest uppercase text-accent-purple">{section.label}</span>
              <Link href={section.href} className="text-[10px] text-text-muted hover:text-accent-purple">View all →</Link>
            </div>
            <div className="divide-y divide-dark-border">
              {section.items.length === 0 && <p className="px-5 py-4 text-xs text-text-muted font-light">None yet.</p>}
              {section.items.map((item) => (
                <div key={item.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <span className="text-sm text-text-primary font-light truncate">{item.title}</span>
                  {item.date && <span className="text-xs text-text-muted font-light shrink-0">{formatDate(item.date)}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
