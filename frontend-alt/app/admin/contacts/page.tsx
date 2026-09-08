'use client'

import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { contact } from '@/lib/contact'
import type { Contact } from '@/lib/contact'

export default function ContactAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(contact.getAll, token)

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this contact message?')) return
    await contact.remove(id, token)
    reload()
  }

  const columns = [
    { key: 'name', header: 'Name', render: (c: Contact) => <a href={`/admin/contacts/${c.id}`} className="text-text-primary hover:text-accent-purple">{c.name}</a> },
    { key: 'email', header: 'Email', render: (c: Contact) => <a href={`mailto:${c.email}`} className="text-accent-purple hover:underline">{c.email}</a> },
    { key: 'topic', header: 'Topic' },
    { key: 'message', header: 'Message', render: (c: Contact) => <span className="block max-w-xs truncate" title={c.message}>{c.message}</span> },
    { key: 'createdAt', header: 'Received', render: (c: Contact) => formatDate(c.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (c: Contact) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/contacts/${c.id}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View →</a>
          <button onClick={() => handleDelete(c.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Contacts" subtitle="Messages submitted through the contact form." />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total messages" value={loading ? '—' : (data?.length ?? 0)} />
      </div>
      <DataTable<Contact> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
