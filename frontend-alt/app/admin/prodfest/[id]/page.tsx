'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/lib/token'
import { PageHeader } from '@/app/admin/components/PageHeader'
import { ProdfestForm } from '@/app/admin/components/ProdfestForm'
import { DetailView } from '@/app/admin/components/DetailView'
import { prodfest } from '@/lib/prodfest'
import type { ProdfestRegistration } from '@/lib/prodfest'

export default async function ProdfestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProdfestDetail id={id} />
}

function ProdfestDetail({ id }: { id: string }) {
  const token = getToken()
  const isNew = id === 'new'
  const [record, setRecord] = useState<ProdfestRegistration | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const { reload } = useProdfestList(token, id, setRecord, setLoading, setError)

  useEffect(() => {
    if (isNew) {
      setError(null)
      setRecord(null)
    }
  }, [isNew])

  const handleSave = async (data: { name: string; email: string; attending_as?: string; organisation?: string; goals?: string }) => {
    if (!token) return
    if (isNew) {
      setSaving(true)
      setMessage(null)
      try {
        const res = await prodfest.submit(data)
        setMessage({ type: 'success', text: 'Registration created.' })
        window.location.href = `/admin/prodfest/${res.data.id}`
      } catch (err) {
        setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to create' })
      } finally {
        setSaving(false)
      }
      return
    }
    if (!record) return
    setSaving(true)
    setMessage(null)
    try {
      await prodfest.update(record.id, data, token)
      setMessage({ type: 'success', text: 'Changes saved.' })
      setEditing(false)
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!token || !record || !confirm('Delete this registration?')) return
    try {
      await prodfest.remove(record.id, token)
      window.location.href = '/admin/prodfest'
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  if (loading) return <p className="text-sm text-text-muted">Loading…</p>
  if (!isNew && (error || !record)) return <p className="text-sm text-accent-pink">{error ?? 'Record not found'}</p>

  return (
    <>
      <PageHeader title={isNew ? 'New ProdFest Registration' : 'ProdFest Registration'} subtitle={isNew ? undefined : record?.name ?? id} action={
        <div className="flex items-center gap-3">
          <a href="/admin/prodfest" className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:text-accent-purple transition-all">← Back</a>
          {!isNew && record && (
            <>
              <button onClick={() => setEditing(!editing)} className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:text-accent-purple transition-all">
                {editing ? 'Cancel Edit' : 'Edit'}
              </button>
              <button onClick={handleDelete} className="px-4 py-2 border border-accent-pink/40 text-xs tracking-widest uppercase font-mono text-accent-pink hover:bg-accent-pink hover:text-white transition-all">Delete</button>
            </>
          )}
        </div>
      } />

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      {(isNew || editing) && (
        <div className="mb-10 border border-dark-border bg-white/[0.01]">
          <div className="border-b border-dark-border px-6 py-4">
            <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">{isNew ? 'New Registration' : 'Edit Registration'}</span>
          </div>
          <div className="p-6">
            <ProdfestForm
              onSubmit={handleSave}
              loading={saving}
              submitLabel={isNew ? 'Create Registration' : 'Save Changes'}
              initial={isNew ? undefined : record ? {
                name: record.name,
                email: record.email,
                attending_as: record.attending_as ?? undefined,
                organisation: record.organisation ?? undefined,
                goals: record.goals ?? undefined,
              } : undefined}
            />
          </div>
        </div>
      )}

      {!isNew && record && !editing && (
        <DetailView fields={[
          { label: 'Name', value: record.name },
          { label: 'Email', value: record.email, href: `mailto:${record.email}` },
          { label: 'Attending As', value: record.attending_as ?? undefined },
          { label: 'Organisation', value: record.organisation ?? undefined },
          { label: 'Goals', value: record.goals ?? undefined, pre: true },
          { label: 'Registered', value: record.createdAt },
        ]} />
      )}
    </>
  )
}

function useProdfestList(token: string | null, id: string, setRecord: (r: ProdfestRegistration | null) => void, setLoading: (b: boolean) => void, setError: (s: string | null) => void) {
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!token) return
    if (id === 'new') return
    let active = true
    setLoading(true)
    prodfest.getAll(token)
      .then((res) => {
        if (!active) return
        const found = res.data.find((r) => String(r.id) === String(id))
        if (found) {
          setRecord(found)
          setError(null)
        } else {
          setRecord(null)
          setError('Record not found')
        }
      })
      .catch(() => { if (active) setError('Failed to load record') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token, id, reloadKey, setRecord, setLoading, setError])

  const reload = () => setReloadKey((k) => k + 1)

  return { reload }
}