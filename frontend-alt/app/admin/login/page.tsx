'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getToken, setToken, setAdmin } from '@/lib/token'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (getToken()) router.replace('/admin')
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await auth.login({ email, password })
      setToken(res.token)
      setAdmin(res.admin)
      router.replace('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] shrink-0 border-r border-dark-border bg-white/[0.01] p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/brand/block_fuse_logo_white.png"
            alt="Blockfuse"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-lg font-light tracking-tight text-text-primary">Blockfuse <span className="text-accent-purple">Labs</span></span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
            <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
            // ADMIN CONSOLE
          </div>

          <h1 className="text-4xl xl:text-6xl font-light leading-[1.05] tracking-tighter text-text-primary">
            Manage everything.
            <br />
            <em className="font-light text-text-secondary">From one place.</em>
          </h1>

          <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm">
            Blogs, events, applications, hiring, sponsorships and more — all the data across Blockfuse, in a single dashboard.
          </p>
        </div>

        <p className="relative z-10 text-[10px] font-mono tracking-widest uppercase text-text-muted">
          Blockfuse Labs · Jos, Nigeria
        </p>
      </div>

      {/* Right — Login actions */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Image
              src="/brand/block_fuse_logo_white.png"
              alt="Blockfuse"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-base font-light tracking-tight text-text-primary">Blockfuse <span className="text-accent-purple">Labs</span></span>
          </div>

          <div className="border border-dark-border bg-white/[0.01]">
            <div className="border-b border-dark-border px-6 py-5 flex items-center justify-between">
              <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">Sign in</span>
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-light tracking-tight">Welcome back</h2>
                <p className="text-xs text-text-muted font-light">Access the Blockfuse management dashboard.</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary focus:outline-none focus:border-accent-purple text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">Password</label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary focus:outline-none focus:border-accent-purple text-sm"
                />
              </div>

              {error && <p className="text-accent-pink text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-text-primary text-dark-bg text-xs tracking-widest uppercase font-mono hover:bg-accent-purple hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Signing in…' : 'Sign In →'}
              </button>

              <a href="/" className="block text-center text-xs text-text-muted font-light hover:text-accent-purple transition-colors pt-2">
                ← Back to website
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
