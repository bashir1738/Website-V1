import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getToken, getAdmin, clearAuth } from './token'

export function useAuth() {
  const router = useRouter()
  const [token, setTokenState] = useState<string | null>(null)
  const [admin, setAdminState] = useState<{ id: number; email: string } | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = getToken()
    const a = getAdmin()
    if (!t) {
      router.replace('/admin/login')
    } else {
      setTokenState(t)
      setAdminState(a)
    }
    setReady(true)
  }, [router])

  const logout = () => {
    clearAuth()
    router.replace('/admin/login')
  }

  return { token, admin, ready, logout }
}
