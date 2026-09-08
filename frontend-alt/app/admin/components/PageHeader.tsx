export function PageHeader({ title, subtitle, action }: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-light tracking-tighter text-text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-text-muted font-light">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({ label, value, accent = 'accent-purple' }: {
  label: string
  value: number | string
  accent?: string
}) {
  return (
    <div className="p-5 border border-dark-border">
      <p className={`text-3xl font-light text-${accent} mb-1`}>{value}</p>
      <p className="text-[10px] font-mono tracking-widest uppercase text-text-muted">{label}</p>
    </div>
  )
}
