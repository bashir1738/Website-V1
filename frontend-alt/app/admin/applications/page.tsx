'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { applications } from '@/lib/applications'
import type { Application } from '@/lib/applications'

export default function ApplicationAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(applications.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this application?')) return
    await applications.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'name', header: 'Name', render: (a: Application) => <a href={`/admin/applications/${a.id}`} className="text-text-primary hover:text-accent-purple">{a.name}</a> },
    { key: 'email', header: 'Email', render: (a: Application) => <a href={`mailto:${a.email}`} className="text-accent-purple hover:underline">{a.email}</a> },
    { key: 'track', header: 'Track' },
    { key: 'experience_level', header: 'Experience' },
    { key: 'github', header: 'GitHub', render: (a: Application) => a.github ? <a href={a.github} target="_blank" rel="noreferrer" className="text-accent-purple hover:underline">Link</a> : '—' },
    { key: 'createdAt', header: 'Applied', render: (a: Application) => formatDate(a.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (a: Application) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/applications/${a.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(a.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Applications" subtitle="Academy program applications." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total applications" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<Application> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
