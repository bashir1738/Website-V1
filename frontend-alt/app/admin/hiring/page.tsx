'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { hire } from '@/lib/hire'
import type { HireRequest } from '@/lib/hire'

export default function HiringAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(hire.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this hire request?')) return
    await hire.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'company', header: 'Company', render: (h: HireRequest) => <a href={`/admin/hiring/${h.id}`} className="text-text-primary hover:text-accent-purple">{h.company}</a> },
    { key: 'name', header: 'Contact' },
    { key: 'email', header: 'Email', render: (h: HireRequest) => <a href={`mailto:${h.email}`} className="text-accent-purple hover:underline">{h.email}</a> },
    { key: 'roles', header: 'Roles', render: (h: HireRequest) => Array.isArray(h.roles) ? h.roles.join(', ') : (h.roles as unknown as string) ?? '—' },
    { key: 'engagement_type', header: 'Engagement' },
    { key: 'createdAt', header: 'Received', render: (h: HireRequest) => formatDate(h.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (h: HireRequest) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/hiring/${h.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(h.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Hiring Requests" subtitle="Companies looking to hire Blockfuse engineers." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total requests" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<HireRequest> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
