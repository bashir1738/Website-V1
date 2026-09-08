'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { sponsor } from '@/lib/sponsor'
import type { Sponsorship } from '@/lib/sponsor'

export default function SponsorshipAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(sponsor.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this sponsorship inquiry?')) return
    await sponsor.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'organisation', header: 'Organisation', render: (s: Sponsorship) => <a href={`/admin/sponsorships/${s.id}`} className="text-text-primary hover:text-accent-purple">{s.organisation}</a> },
    { key: 'name', header: 'Contact' },
    { key: 'email', header: 'Email', render: (s: Sponsorship) => <a href={`mailto:${s.email}`} className="text-accent-purple hover:underline">{s.email}</a> },
    { key: 'interests', header: 'Interests', render: (s: Sponsorship) => Array.isArray(s.interests) ? s.interests.join(', ') : '—' },
    { key: 'budget', header: 'Budget' },
    { key: 'createdAt', header: 'Received', render: (s: Sponsorship) => formatDate(s.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (s: Sponsorship) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/sponsorships/${s.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(s.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Sponsorships" subtitle="Partnership and sponsorship inquiries." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total inquiries" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<Sponsorship> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
