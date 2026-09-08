
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getToken, getAdmin, clearAuth } from '@/lib/token'
import { 
  MdDashboard, 
  MdEdit, 
  MdEvent, 
  MdEmail, 
  MdFolderOpen, 
  MdPeople, 
  MdFestival, 
  MdHandshake, 
  MdPublic, 
  MdSchool, 
  MdMenu, 
  MdClose 
} from 'react-icons/md'

const navItems = [
  { href: '/admin', label: 'Overview', icon: MdDashboard },
  { href: '/admin/blogs', label: 'Blogs', icon: MdEdit },
  { href: '/admin/events', label: 'Events', icon: MdEvent },
  { href: '/admin/contacts', label: 'Contacts', icon: MdEmail },
  { href: '/admin/applications', label: 'Applications', icon: MdFolderOpen },
  { href: '/admin/hiring', label: 'Hiring Requests', icon: MdPeople },
  { href: '/admin/newsletter', label: 'Newsletter', icon: MdEmail },
  { href: '/admin/prodfest', label: 'ProdFest', icon: MdFestival },
  { href: '/admin/sponsorships', label: 'Sponsorships', icon: MdHandshake },
  { href: '/admin/opensource', label: 'Open Source', icon: MdPublic },
  { href: '/admin/alumni', label: 'Alumni', icon: MdSchool },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    if (isLogin) return
    const token = getToken()
    if (!token) {
      router.replace('/admin/login')
    } else {
      setAuthed(true)
      const admin = getAdmin()
      setEmail(admin?.email ?? '')
    }
  }, [router, isLogin])

  const logout = () => {
    clearAuth()
    router.replace('/admin/login')
  }

  if (isLogin) return <>{children}</>

  if (!authed) return null

  return (
    <div className="flex flex-col md:flex-row h-screen bg-dark-bg text-text-primary overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden shrink-0 border-b border-dark-border p-4 flex justify-between items-center z-20 bg-dark-bg">
        <Link href="/admin" className="text-sm font-mono tracking-widest uppercase text-accent-purple">Blockfuse Admin</Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl px-2">
          {sidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'flex absolute inset-0 top-[61px] z-10 bg-dark-bg' : 'hidden'} 
        md:flex md:static w-full md:w-64 shrink-0 border-r border-dark-border flex-col
      `}>
        <Link href="/" className="hidden md:block border-b border-dark-border px-5 py-5">
          <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">Blockfuse Admin</span>
        </Link>

        <nav className="flex-1 overflow-y-auto hide-scrollbar py-4">
          <p className="px-5 py-2 text-[10px] font-mono tracking-widest uppercase text-text-muted">Manage</p>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm font-light transition-colors ${
                  active
                    ? 'bg-accent-purple/10 text-accent-purple border-r-2 border-accent-purple'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
                }`}
              >
                <span className="text-lg w-5 flex items-center justify-center"><Icon /></span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-dark-border p-4 space-y-2">
          <p className="text-xs text-text-muted font-light truncate">{email}</p>
          <button
            onClick={logout}
            className="w-full text-xs font-mono tracking-widest uppercase text-accent-pink hover:text-text-primary transition-colors text-left"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
