import { useEffect, useState } from 'react'

export function useData<T>(fetcher: (token: string) => Promise<{ data: T }>, token: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!token) return
    let active = true
    setLoading(true)
    fetcher(token)
      .then((res) => { if (active) { setData(res.data); setError(null) } })
      .catch(() => { if (active) setError('Failed to load data') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token, fetcher, reloadKey])

  const reload = () => setReloadKey((k) => k + 1)

  return { data, loading, error, reload }
}

export function formatDate(d?: string | null) {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString()
}
