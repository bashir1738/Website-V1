'use client'

import { useState } from 'react'
import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { EventForm } from '@/app/admin/components/EventForm'
import { events } from '@/lib/events'
import type { Event } from '@/lib/events'

export default function EventAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(events.getAll, token)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleCreate = async (input: { title: string; slug: string; description: string; date: string; location?: string; link?: string; image?: File }) => {
    if (!token) return
    setSaving(true)
    setMessage(null)
    try {
      const fd = new FormData()
      fd.append('title', input.title)
      fd.append('slug', input.slug)
      fd.append('description', input.description)
      fd.append('date', new Date(input.date).toISOString())
      if (input.location) fd.append('location', input.location)
      if (input.link) fd.append('link', input.link)
      if (input.image) fd.append('image', input.image)

      await events.create(fd, token)
      setMessage({ type: 'success', text: 'Event created.' })
      setShowCreate(false)
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to create event' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this event?')) return
    try {
      await events.remove(id, token)
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  const columns = [
    { key: 'title', header: 'Title', render: (e: Event) => <a href={`/admin/events/${e.slug}`} className="text-text-primary hover:text-accent-purple">{e.title}</a> },
    { key: 'date', header: 'Date', render: (e: Event) => formatDate(e.date) },
    { key: 'location', header: 'Location' },
    { key: 'link', header: 'Link', render: (e: Event) => e.link ? <a href={e.link} target="_blank" rel="noreferrer" className="text-accent-purple hover:underline">Open</a> : '—' },
    {
      key: 'actions', header: 'Actions',
      render: (e: Event) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleDelete(e.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Events" subtitle="Manage workshops, hackathons and showcases." action={
        <button onClick={() => setShowCreate((s) => !s)} className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all">
          {showCreate ? 'Cancel' : '+ New Event'}
        </button>
      } />

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      {showCreate && (
        <div className="mb-10 border border-dark-border bg-white/[0.01]">
          <div className="border-b border-dark-border px-6 py-4">
            <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">New Event</span>
          </div>
          <div className="p-6">
            <EventForm onSubmit={handleCreate} loading={saving} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total events" value={loading ? '—' : (data?.length ?? 0)} />
      </div>

      <DataTable<Event> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}