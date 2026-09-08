'use client'

import { useEffect, useState, use } from 'react'
import { getToken } from '@/lib/token'
import { PageHeader } from '@/app/admin/components/PageHeader'
import { EventForm } from '@/app/admin/components/EventForm'
import { events } from '@/lib/events'
import type { Event } from '@/lib/events'

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const token = getToken()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!token) return
    let active = true
    events.getBySlug(slug)
      .then((res) => { if (active) setEvent(res.data) })
      .catch(() => { if (active) setError('Failed to load event') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token, slug])

  const handleUpdate = async (input: { title: string; slug: string; description: string; date: string; location?: string; link?: string; image?: File }) => {
    if (!token || !event) return
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
      await events.update(event.id, fd, token)
      setMessage({ type: 'success', text: 'Changes saved.' })
      const res = await events.getBySlug(input.slug)
      setEvent(res.data)
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!token || !event || !confirm('Delete this event?')) return
    try {
      await events.remove(event.id, token)
      window.location.href = '/admin/events'
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  if (loading) return <p className="text-sm text-text-muted">Loading…</p>
  if (error || !event) return <p className="text-sm text-accent-pink">{error ?? 'Event not found'}</p>

  return (
    <>
      <PageHeader title="Edit Event" subtitle={event.slug} action={
        <div className="flex items-center gap-3">
          <a href="/admin/events" className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:text-accent-purple transition-all">← Back</a>
          <button onClick={handleDelete} className="px-4 py-2 border border-accent-pink/40 text-xs tracking-widest uppercase font-mono text-accent-pink hover:bg-accent-pink hover:text-white transition-all">Delete</button>
        </div>
      } />

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      <div className="border border-dark-border bg-white/[0.01]">
        <div className="border-b border-dark-border px-6 py-4">
          <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">Event Details</span>
        </div>
        <div className="p-6">
          <EventForm
            onSubmit={handleUpdate}
            loading={saving}
            submitLabel="Save Changes"
            initial={{
              title: event.title,
              slug: event.slug,
              description: event.description,
              date: event.date,
              location: event.location ?? undefined,
              link: event.link ?? undefined,
            }}
          />
        </div>
      </div>
    </>
  )
}