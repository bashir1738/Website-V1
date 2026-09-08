'use client'

import { useState } from 'react'
import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { prodfest } from '@/lib/prodfest'
import type { ProdfestRegistration } from '@/lib/prodfest'

export default function ProdfestAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(prodfest.getAll, token)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this registration?')) return
    try {
      await prodfest.remove(id, token)
      setMessage({ type: 'success', text: 'Registration deleted.' })
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  const columns = [
    { key: 'name', header: 'Name', render: (p: ProdfestRegistration) => <a href={`/admin/prodfest/${p.id}`} className="text-text-primary hover:text-accent-purple">{p.name}</a> },
    { key: 'email', header: 'Email', render: (p: ProdfestRegistration) => <a href={`mailto:${p.email}`} className="text-accent-purple hover:underline">{p.email}</a> },
    { key: 'attending_as', header: 'Attending As' },
    { key: 'organisation', header: 'Organisation' },
    { key: 'createdAt', header: 'Registered', render: (p: ProdfestRegistration) => formatDate(p.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (p: ProdfestRegistration) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/prodfest/${p.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(p.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="ProdFest" subtitle="ProdFest registrations." action={
        <a href="/admin/prodfest/new" className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all">
          + New Registration
        </a>
      } />

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total registrations" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<ProdfestRegistration> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
