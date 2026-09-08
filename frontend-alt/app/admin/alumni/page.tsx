'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { alumni } from '@/lib/alumni'
import type { AlumniProfile } from '@/lib/alumni'

export default function AlumniAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(alumni.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this alumni profile?')) return
    await alumni.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'name', header: 'Name', render: (a: AlumniProfile) => <a href={`/admin/alumni/${a.id}`} className="text-text-primary hover:text-accent-purple">{a.name}</a> },
    { key: 'email', header: 'Email', render: (a: AlumniProfile) => <a href={`mailto:${a.email}`} className="text-accent-purple hover:underline">{a.email}</a> },
    { key: 'cohort', header: 'Cohort' },
    { key: 'track', header: 'Track' },
    { key: 'current_status', header: 'Current Status' },
    { key: 'createdAt', header: 'Submitted', render: (a: AlumniProfile) => formatDate(a.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (a: AlumniProfile) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/alumni/${a.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(a.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Alumni" subtitle="Alumni profile submissions." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total profiles" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<AlumniProfile> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
