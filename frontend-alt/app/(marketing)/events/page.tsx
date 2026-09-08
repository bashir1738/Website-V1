'use client'

import { useEffect, useState } from 'react'
import { events } from '@/lib/events'
import type { Event } from '@/lib/events'

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<Event[]>([])
  const [past, setPast] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    events.getAll()
      .then(({ data }) => {
        if (!active) return
        const now = new Date()
        setUpcoming(data.filter((e) => new Date(e.date) >= now))
        setPast(data.filter((e) => new Date(e.date) < now))
      })
      .catch(() => { if (active) setError('Could not load events') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <>
      {/* Hero - Calendar Focus Layout */}
      <section className="border-b border-dark-border mb-24 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // COMMUNITY EVENTS
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-light leading-[1.1] tracking-tighter text-text-primary">
              Workshops, hackathons,
              <br />
              <span className="text-text-secondary">
                and showcases.
              </span>
            </h1>

            <p className="text-base text-text-secondary font-light max-w-2xl">
              Where we bring engineers together to learn, build, and showcase production-grade projects.
            </p>
          </div>

          {error && (
            <div className="p-4 border border-accent-pink/30 bg-accent-pink/5 text-accent-pink text-sm">
              {error}
            </div>
          )}

          {/* Next Event Highlight - Card Style */}
          {!loading && upcoming.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="p-8 border border-accent-purple/50 bg-gradient-to-br from-accent-purple/10 to-transparent relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block text-[11px] font-mono tracking-widest text-accent-purple bg-accent-purple/20 border border-accent-purple/30 px-3 py-1">
                        NEXT EVENT
                      </span>
                    </div>

                    <h2 className="text-2xl font-light text-text-primary leading-tight">
                      {upcoming[0].title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary font-light">
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{new Date(upcoming[0].date).toLocaleDateString()}</span>
                      </div>
                      {upcoming[0].location && <span>•</span>}
                      {upcoming[0].location && (
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{upcoming[0].location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {upcoming[0].description}
                    </p>

                    {upcoming[0].link && (
                      <a
                        href={upcoming[0].link}
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-dark-bg transition-all text-xs tracking-widest uppercase font-mono"
                      >
                        Learn More <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 border border-dark-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all text-center">
                  <p className="text-4xl font-light text-accent-purple mb-2">
                    {upcoming.length}
                  </p>
                  <p className="text-xs text-text-muted font-light">Upcoming Events</p>
                </div>

                <div className="p-6 border border-dark-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all text-center">
                  <p className="text-4xl font-light text-accent-purple mb-2">
                    {past.length + upcoming.length}
                  </p>
                  <p className="text-xs text-text-muted font-light">Total Events</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Upcoming <em className="italic font-light text-text-secondary">events</em>
        </h2>
        {loading ? (
          <p className="text-sm text-text-muted font-light">Loading events…</p>
        ) : upcoming.length === 0 ? (
          <p className="text-sm text-text-muted font-light">No upcoming events right now. Check back soon.</p>
        ) : (
          <div className="space-y-6 max-w-4xl">
            {upcoming.map((event, i) => (
              <a
                key={event.id}
                href={event.link ?? '#'}
                className="group block p-8 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <span className="text-xs font-mono text-accent-purple">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs text-text-muted font-light mb-2">{new Date(event.date).toLocaleDateString()}</p>
                        <h3 className="text-xl font-light text-text-primary group-hover:text-accent-purple transition-all mb-3">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted font-light">
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Recent <em className="italic font-light text-text-secondary">events</em>
        </h2>
        {loading ? (
          <p className="text-sm text-text-muted font-light">Loading events…</p>
        ) : past.length === 0 ? (
          <p className="text-sm text-text-muted font-light">No past events recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {past.map((event) => (
              <div
                key={event.id}
                className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <p className="text-xs text-text-muted font-light mb-3">{new Date(event.date).toLocaleDateString()}</p>
                <h3 className="text-base font-light text-text-primary mb-4 leading-tight group-hover:text-accent-purple transition-colors">
                  {event.title}
                </h3>
                {event.location && (
                  <div className="flex items-center justify-between text-xs text-text-muted font-light">
                    <span>📍 {event.location}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Event Info */}
      <section className="py-12 text-center border-t border-dark-border">
        <h3 className="text-2xl font-light text-text-primary mb-4">Want to host an event?</h3>
        <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">
          We partner with protocols, companies, and communities to host workshops, hackathons, and showcase events. Let's build something great together.
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all duration-300 text-xs tracking-widest uppercase font-mono">
          Get in Touch
          <span>→</span>
        </a>
      </section>
    </>
  )
}
