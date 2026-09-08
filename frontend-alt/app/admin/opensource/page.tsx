'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { opensource } from '@/lib/opensource'
import type { OpenSourceApplication } from '@/lib/opensource'

export default function OpensourceAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(opensource.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this open source application?')) return
    await opensource.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'name', header: 'Name', render: (o: OpenSourceApplication) => <a href={`/admin/opensource/${o.id}`} className="text-text-primary hover:text-accent-purple">{o.name}</a> },
    { key: 'email', header: 'Email', render: (o: OpenSourceApplication) => <a href={`mailto:${o.email}`} className="text-accent-purple hover:underline">{o.email}</a> },
    { key: 'github', header: 'GitHub', render: (o: OpenSourceApplication) => <span className="font-mono text-xs">{o.github}</span> },
    { key: 'interests', header: 'Interests', render: (o: OpenSourceApplication) => Array.isArray(o.interests) ? o.interests.join(', ') : '—' },
    { key: 'hours', header: 'Hours' },
    { key: 'createdAt', header: 'Applied', render: (o: OpenSourceApplication) => formatDate(o.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (o: OpenSourceApplication) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/opensource/${o.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(o.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Open Source" subtitle="Open source contribution applications." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total applications" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<OpenSourceApplication> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
