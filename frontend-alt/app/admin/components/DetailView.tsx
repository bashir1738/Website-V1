export interface DetailViewField {
  label: string
  key?: string
  value?: unknown
  href?: string
  pre?: boolean
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

export function DetailView({ fields }: { fields: DetailViewField[] }) {
  return (
    <div className="border border-dark-border bg-white/[0.01]">
      <div className="border-b border-dark-border px-6 py-4">
        <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">Record Details</span>
      </div>
      <dl className="divide-y divide-dark-border">
        {fields.map((f) => (
          <div key={f.label} className="grid grid-cols-1 md:grid-cols-4 gap-2 px-6 py-4">
            <dt className="text-[10px] font-mono tracking-widest uppercase text-text-muted pt-0.5 md:col-span-1">{f.label}</dt>
            <dd className="md:col-span-3 text-text-secondary font-light">
              {f.href ? (
                <a href={f.href} className="text-accent-purple hover:underline break-all">{formatValue(f.value)}</a>
              ) : f.pre ? (
                <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">{formatValue(f.value)}</pre>
              ) : (
                <span className="break-all">{formatValue(f.value)}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function DetailHeader({ badge, title, subtitle }: {
  badge?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="space-y-1 mb-8">
      {badge && <span className="inline-block px-2 py-1 border border-dark-border text-[10px] font-mono tracking-widest uppercase text-accent-purple">{badge}</span>}
      <h1 className="text-3xl font-light tracking-tighter text-text-primary">{title}</h1>
      {subtitle && <p className="text-sm text-text-muted font-light">{subtitle}</p>}
    </div>
  )
}
