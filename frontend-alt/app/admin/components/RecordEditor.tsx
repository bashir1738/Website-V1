'use client'

import { useState } from 'react'
import type { DetailViewField } from '@/app/admin/components/DetailView'

export function RecordEditor<T extends { id: number }>({
  record,
  fields,
  onSave,
  onCancel,
  saving,
}: {
  record: T
  fields: DetailViewField[]
  onSave: (data: Record<string, unknown>) => Promise<void>
  onCancel: () => void
  saving: boolean
}) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {}
    fields.forEach((f) => {
      const key = f.key ?? ''
      const raw = (record as unknown as Record<string, unknown>)[f.key ?? '']
      initial[key] = raw
    })
    return initial
  })

  const inputCls = "w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary focus:outline-none focus:border-accent-purple text-sm"
  const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1"

  const setValue = (key: string, next: string) => {
    setValues((v) => ({ ...v, [key]: next }))
  }

  const isLong = (f: DetailViewField) =>
    f.pre || (typeof f.value === 'string' && f.value.length > 160)

  const isArray = (f: DetailViewField) => Array.isArray(f.value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: Record<string, unknown> = {}
    fields.forEach((f) => {
      const key = f.key ?? ''
      if (!key) return
      const raw = String(values[key] ?? '').trim()
      if (raw === '') return
      if (isArray(f)) {
        payload[key] = raw.split(',').map((s) => s.trim()).filter(Boolean)
      } else {
        payload[key] = raw
      }
    })
    await onSave(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.filter((f) => f.key).map((f) => {
        const key = f.key as string
        const value = String(values[key] ?? '')
        return (
          <div key={key}>
            <label className={labelCls}>{f.label}{isArray(f) ? ' (comma-separated)' : ''}</label>
            {isLong(f) || isArray(f) ? (
              <textarea
                rows={isArray(f) ? 2 : 6}
                value={value}
                onChange={(e) => setValue(key, e.target.value)}
                className={`${inputCls} resize-y leading-relaxed`}
              />
            ) : (
              <input
                value={value}
                onChange={(e) => setValue(key, e.target.value)}
                className={inputCls}
              />
            )}
          </div>
        )
      })}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-6 py-3 bg-accent-purple text-white text-xs tracking-widest uppercase font-mono hover:bg-text-primary hover:text-dark-bg transition-all disabled:opacity-50">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} className="px-6 py-3 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-muted hover:text-text-primary transition-all">
          Cancel
        </button>
      </div>
    </form>
  )
}