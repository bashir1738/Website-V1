'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { navItems, type NavItem } from '@/config/navigation'
import { siteConfig } from '@/config/site'

function isItemActive(item: NavItem, pathname: string): boolean {
  const matches = (href: string) => {
    const base = href.split('#')[0]
    return base === '/' ? pathname === '/' : pathname.startsWith(base)
  }
  return matches(item.href) || (item.children ?? []).some((c) => matches(c.href))
}

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const enterItem = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }

  const leaveItem = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150)
  }

  const activeDropdown = navItems.find(
    (item) => item.label === openMenu && !!item.children
  )

  return (
    <>
      {/* ── Top utility bar ─────────────────────────────────────────── */}
      <div className="hidden md:flex h-9 items-center justify-between px-6 md:px-10 border-b border-dark-border bg-dark-bg w-full shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-3 h-3 text-accent-purple shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
            +1 (555) 123-4567
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">Connect</span>
          {[
            { label: 'Twitter', href: 'https://twitter.com' },
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-0.5 text-[10px] font-mono tracking-wider text-text-secondary hover:text-accent-purple transition-colors duration-200 group"
            >
              {label}
              <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-px transition-all duration-200 text-[9px]">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Main nav bar ────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b border-dark-border bg-dark-bg/80 backdrop-blur-[18px] w-full shrink-0"
        onMouseLeave={leaveItem}
      >
        <div className="flex h-[60px] items-center gap-6 px-6 md:px-10">

          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Blockfuse Labs home"
          >
            <Image
              src="/brand/LOGO_ICON.svg"
              alt={siteConfig.name}
              width={24}
              height={24}
              className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="font-mono text-sm font-bold tracking-widest text-transparent bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text uppercase">
              BFL
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5 ml-4">
            {navItems.map((item) => {
              const active = isItemActive(item, pathname)
              const open = openMenu === item.label && !!item.children

              return (
                <div
                  key={item.label}
                  onMouseEnter={() => item.children ? enterItem(item.label) : setOpenMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-mono tracking-wider uppercase transition-colors duration-200 hover:bg-white/[0.03] ${
                      active
                        ? 'text-accent-purple font-medium'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    aria-expanded={item.children ? open : undefined}
                    onFocus={() => item.children && enterItem(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <span
                        aria-hidden="true"
                        className={`text-[8px] opacity-60 ml-0.5 transition-transform duration-200 inline-block ${open ? 'rotate-180' : ''}`}
                      >
                        ▼
                      </span>
                    )}
                    {active && (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-sm bg-gradient-to-r from-accent-purple to-accent-pink" />
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3 ml-auto">
            <Link
              href="/contact"
              className="hidden sm:inline-flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-[10px] font-mono tracking-widest uppercase text-white shadow-lg shadow-accent-purple/15 transition-all duration-300 hover:opacity-90 hover:-translate-y-px active:translate-y-0"
            >
              Apply
              <span aria-hidden="true" className="ml-1.5 text-xs">→</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-dark-border text-text-primary transition-colors hover:bg-white/[0.04] md:hidden"
            >
              {mobileOpen ? (
                <span className="text-[13px] leading-none">✕</span>
              ) : (
                <span className="flex flex-col gap-[5px]">
                  <span className="block h-[1.5px] w-4 rounded-sm bg-current" />
                  <span className="block h-[1.5px] w-4 rounded-sm bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Mega menu ───────────────────────────────────────────────── */}
        {activeDropdown && activeDropdown.children && (
          <div
            className="absolute left-0 right-0 top-full z-50 border-b border-dark-border bg-dark-bg shadow-2xl"
            style={{ animation: 'megaFadeIn 0.15s ease' }}
            onMouseEnter={() => enterItem(activeDropdown.label)}
            onMouseLeave={leaveItem}
          >
            <div className="flex items-stretch gap-0 px-6 md:px-10 py-8">

              {/* Featured card */}
              {activeDropdown.featured && (
                <>
                  <Link
                    href={activeDropdown.featured.href}
                    className="group relative shrink-0 w-56 mr-10 flex flex-col justify-end rounded-xl p-5 overflow-hidden border border-dark-border hover:border-accent-purple/40 transition-all duration-300 min-h-[148px]"
                    style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(236,72,153,0.08) 60%, transparent 100%)' }}
                  >
                    {/* grid texture */}
                    <div
                      className="absolute inset-0 opacity-[0.07] pointer-events-none"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="relative">
                      <p className="text-[9px] font-mono tracking-widest uppercase text-accent-purple/70 mb-2">Featured</p>
                      <p className="text-[13px] font-semibold text-text-primary group-hover:text-accent-purple transition-colors leading-snug">
                        {activeDropdown.featured.label}
                      </p>
                      <p className="text-[10.5px] text-text-muted mt-1.5 leading-relaxed">
                        {activeDropdown.featured.sub}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-mono tracking-wider text-accent-purple uppercase">
                        View
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                      </span>
                    </div>
                  </Link>

                  {/* vertical divider */}
                  <div className="w-px bg-dark-border shrink-0 mr-10 self-stretch" />
                </>
              )}

              {/* 3-column grid of links */}
              <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-0 content-start">
                {activeDropdown.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-white/[0.03]"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-[12px] font-semibold text-text-primary group-hover:text-accent-purple transition-colors">
                        {child.label}
                      </span>
                      <span className="text-text-muted group-hover:text-accent-purple group-hover:translate-x-0.5 transition-all duration-200 text-[11px]">
                        →
                      </span>
                      {child.flag && (
                        <span className="inline-flex items-center font-mono text-[8px] uppercase tracking-wider border border-accent-purple/40 rounded-full px-1.5 py-0.5 text-accent-purple bg-accent-purple/5">
                          Flagship
                        </span>
                      )}
                    </span>
                    <span className="text-[10.5px] leading-relaxed text-text-muted">
                      {child.desc}
                    </span>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        )}
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[96px] z-50 overflow-y-auto bg-dark-bg/98 backdrop-blur-xl border-t border-dark-border md:hidden">
          <div className="flex flex-col gap-6 px-6 py-8 pb-16">

            <div className="flex items-center gap-2 pb-4 border-b border-dark-border/60">
              <svg className="w-3.5 h-3.5 text-accent-purple shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">+1 (555) 123-4567</span>
            </div>

            {navItems.map((item) => (
              <div key={item.label} className="border-b border-dark-border/40 pb-4 last:border-0 last:pb-0">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm tracking-widest uppercase font-light text-text-primary hover:text-accent-purple transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-3 flex flex-col gap-2.5 border-l border-dark-border pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex flex-col gap-0.5"
                      >
                        <span className="text-[12px] text-text-secondary hover:text-text-primary transition-colors">
                          {child.label}
                        </span>
                        <span className="text-[10px] text-text-muted">{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-dark-border/60">
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">Connect</span>
              {[
                { label: 'Twitter', href: 'https://twitter.com' },
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] font-mono tracking-wider text-text-secondary hover:text-accent-purple transition-colors">
                  {label} ↗
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-dark-border">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-accent-purple to-accent-pink text-[10px] font-mono tracking-widest uppercase text-white shadow-lg shadow-accent-purple/15 hover:opacity-95"
              >
                Apply to a Program <span className="ml-1">→</span>
              </Link>
              <Link
                href="/talent"
                onClick={() => setMobileOpen(false)}
                className="w-full h-10 flex items-center justify-center rounded-full border border-dark-border bg-white/[0.02] text-[10px] font-mono tracking-widest uppercase text-text-primary hover:bg-white/[0.04]"
              >
                Hire Blockfuse Engineers
              </Link>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
