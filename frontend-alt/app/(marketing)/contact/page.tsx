'use client'

import { useState } from 'react'
import { contact } from '@/lib/contact'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const contactMethods = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'connect@blockfuselabs.com',
      href: 'mailto:connect@blockfuselabs.com',
      description: 'Best for detailed inquiries',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Jos, Nigeria',
      href: '#',
      description: 'Visit our studio',
    },
  ]

  const reasons = [
    { title: 'Training Programs', description: 'Ask about Academy cohorts, custom programs' },
    { title: 'Engineering Services', description: 'Discuss projects, protocols, systems' },
    { title: 'Talent Hiring', description: 'Find verified engineers for your team' },
    { title: 'Partnerships', description: 'Explore ecosystem collaborations' },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    try {
      await contact.submit(form)
      setStatus('success')
      setForm({ name: '', email: '', topic: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Message failed to send')
    }
  }

  return (
    <>
      {/* Hero - Direct & Minimal Layout */}
      <section className="min-h-[70vh] flex flex-col justify-center border-b border-dark-border mb-24 py-12">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase w-fit mx-auto">
              <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
              // LET'S WORK TOGETHER
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-7xl font-light leading-[1.05] tracking-tighter text-text-primary">
              Let's
              <br />
              <span className="text-text-secondary">
                talk
              </span>
            </h1>

            <p className="text-lg text-text-secondary font-light leading-relaxed">
              Training, hiring, engineering services, partnerships — or just say hello.
            </p>
          </div>

          {/* Two Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                className="group p-8 border border-dark-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all duration-300 relative text-center"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-pink to-accent-purple group-hover:w-full transition-all duration-500" />

                <div className="text-4xl mb-4">{method.icon}</div>

                <p className="text-xs tracking-widest text-text-muted uppercase mb-2 font-normal">
                  {method.label}
                </p>

                <p className="text-lg font-light text-text-primary mb-3 group-hover:text-accent-pink transition-colors break-all">
                  {method.value}
                </p>

                <p className="text-xs text-text-secondary font-light">
                  {method.description}
                </p>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto w-full border border-dark-border bg-white/[0.01]">
            <div className="border-b border-dark-border px-6 py-4 flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-widest text-accent-pink uppercase">
                Send us a message
              </span>
              {status === 'success' && (
                <span className="text-emerald-400 text-xs">Message sent ✓</span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-pink text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-pink text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">Topic</label>
                <input
                  type="text"
                  required
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-pink text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-pink text-sm resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-accent-pink text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-text-primary text-dark-bg text-xs tracking-widest uppercase font-mono hover:bg-transparent hover:text-text-primary hover:border hover:border-text-primary transition-all duration-300 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          </div>

          {/* Reason Cards */}
          <div className="mt-16 pt-12 border-t border-dark-border">
            <p className="text-xs tracking-widest text-text-muted uppercase font-normal mb-8 text-center">
              Common Reasons to Reach Out
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="group p-6 border border-dark-border/50 hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
                >
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                  <h3 className="text-sm font-light text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-text-secondary font-light leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Info */}
      <section className="text-center py-12 border-b border-dark-border">
        <div className="space-y-3">
          <p className="text-text-primary font-light text-lg">
            We respond within <span className="text-accent-pink font-mono">24-48 hours</span>
          </p>
          <p className="text-text-secondary text-sm">
            or faster for time-sensitive matters
          </p>
        </div>
      </section>
    </>
  )
}
