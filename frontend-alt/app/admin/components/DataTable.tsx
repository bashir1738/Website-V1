interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  loading,
  error,
  empty,
}: {
  data: T[]
  columns: Column<T>[]
  loading: boolean
  error?: string | null
  empty?: string
}) {
  if (loading) {
    return <p className="text-sm text-text-muted font-light">Loading…</p>
  }
  if (error) {
    return <p className="text-sm text-accent-pink font-light">{error}</p>
  }
  if (data.length === 0) {
    return <p className="text-sm text-text-muted font-light">{empty ?? 'No records found.'}</p>
  }

  return (
    <div className="overflow-x-auto border border-dark-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-dark-border bg-white/[0.02]">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-[10px] font-mono tracking-widest uppercase text-text-muted whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-border">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-text-secondary font-light align-top">
                  {col.render ? col.render(row) : (row as unknown as Record<string, unknown>)[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
