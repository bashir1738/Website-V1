'use client'

import { useState } from 'react'

const ATTENDING_AS = [
  'Builder or founder',
  'Investor',
  'Hiring partner',
  'Mentor or judge',
  'Community attendee',
]

export function ProdfestForm({ onSubmit, loading, submitLabel = 'Save Registration', initial }: {
  onSubmit: (data: { name: string; email: string; attending_as?: string; organisation?: string; goals?: string }) => Promise<void>
  loading: boolean
  submitLabel?: string
  initial?: { name: string; email: string; attending_as?: string; organisation?: string; goals?: string }
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [attendingAs, setAttendingAs] = useState(initial?.attending_as ?? '')
  const [organisation, setOrganisation] = useState(initial?.organisation ?? '')
  const [goals, setGoals] = useState(initial?.goals ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      name,
      email,
      attending_as: attendingAs || undefined,
      organisation: organisation || undefined,
      goals: goals || undefined,
    })
  }

  const inputCls = "w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary focus:outline-none focus:border-accent-purple text-sm"
  const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Attending As</label>
          <select value={attendingAs} onChange={(e) => setAttendingAs(e.target.value)} className={`${inputCls} bg-dark-bg`}>
            <option value="">—</option>
            {ATTENDING_AS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Organisation</label>
          <input value={organisation} onChange={(e) => setOrganisation(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Goals</label>
        <textarea rows={4} value={goals} onChange={(e) => setGoals(e.target.value)} className={`${inputCls} resize-y leading-relaxed`} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-text-primary text-dark-bg text-xs tracking-widest uppercase font-mono hover:bg-accent-purple hover:text-white transition-all disabled:opacity-50"
      >
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}