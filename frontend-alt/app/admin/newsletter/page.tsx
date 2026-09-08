'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { newsletter } from '@/lib/newsletter'
import type { NewsletterSubscriber } from '@/lib/newsletter'

export default function NewsletterAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(newsletter.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this subscriber?')) return
    await newsletter.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'email', header: 'Email', render: (s: NewsletterSubscriber) => <a href={`/admin/newsletter/${s.id}`} className="text-accent-purple hover:underline">{s.email}</a> },
    { key: 'name', header: 'Name', render: (s: NewsletterSubscriber) => s.name ?? '—' },
    { key: 'topics', header: 'Topics', render: (s: NewsletterSubscriber) => Array.isArray(s.topics) ? s.topics.join(', ') : '—' },
    { key: 'createdAt', header: 'Subscribed', render: (s: NewsletterSubscriber) => formatDate(s.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (s: NewsletterSubscriber) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/newsletter/${s.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(s.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Newsletter" subtitle="Email newsletter subscribers." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Subscribers" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<NewsletterSubscriber> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
