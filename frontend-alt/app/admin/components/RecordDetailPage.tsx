'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/lib/token'
import { DetailHeader, DetailView, type DetailViewField } from '@/app/admin/components/DetailView'
import { RecordEditor } from '@/app/admin/components/RecordEditor'

export function RecordDetailPage<T extends { id: number }>({
  badge,
  title,
  subtitle,
  listFetcher,
  id,
  field,
  formatTitle,
  backHref,
  updateFn,
  removeFn,
}: {
  badge?: string
  title: string
  subtitle?: string
  listFetcher: (token: string) => Promise<{ data: T[] }>
  id: string
  field: (record: T) => DetailViewField[]
  formatTitle: (record: T) => string
  backHref: string
  updateFn?: (id: number, data: Record<string, unknown>, token: string) => Promise<{ data: T }>
  removeFn?: (id: number, token: string) => Promise<unknown>
}) {
  const token = getToken()
  const [record, setRecord] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!token) return
    let active = true
    setLoading(true)
    listFetcher(token)
      .then((res) => {
        const found = res.data.find((r) => String(r.id) === String(id))
        if (active && found) {
          setRecord(found)
          setError(null)
        } else if (active) {
          setError('Record not found')
        }
      })
      .catch(() => { if (active) setError('Failed to load record') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token, listFetcher, id, reloadKey])

  const handleSave = async (data: Record<string, unknown>) => {
    if (!token || !record || !updateFn) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await updateFn(record.id, data, token)
      setRecord(res.data)
      setMessage({ type: 'success', text: 'Changes saved.' })
      setEditing(false)
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!token || !record || !removeFn || !confirm('Delete this record?')) return
    try {
      await removeFn(record.id, token)
      window.location.href = backHref
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  if (loading) return <p className="text-sm text-text-muted">Loading…</p>
  if (error || !record) return <p className="text-sm text-accent-pink">{error ?? 'Record not found'}</p>

  const editable = Boolean(updateFn && removeFn)

  return (
    <>
      <DetailHeader badge={badge} title={title} subtitle={editing ? undefined : formatTitle(record)} />
      <div className="flex items-center gap-3 mb-8">
        <a href={backHref} className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:text-accent-purple transition-all">← Back</a>
        {editable && !editing && (
          <button onClick={() => setEditing(true)} className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:text-accent-purple transition-all">Edit</button>
        )}
        {editable && !editing && (
          <button onClick={handleDelete} className="px-4 py-2 border border-accent-pink/40 text-xs tracking-widest uppercase font-mono text-accent-pink hover:bg-accent-pink hover:text-white transition-all">Delete</button>
        )}
      </div>

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      {editing ? (
        <div className="border border-dark-border bg-white/[0.01]">
          <div className="border-b border-dark-border px-6 py-4">
            <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">Edit {title}</span>
          </div>
          <div className="p-6">
            <RecordEditor
              record={record}
              fields={field(record)}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
              saving={saving}
            />
          </div>
        </div>
      ) : (
        <DetailView fields={field(record)} />
      )}
    </>
  )
}