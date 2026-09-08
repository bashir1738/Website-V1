'use client'

import { useEffect, useState } from 'react'
import { blogs } from '@/lib/blogs'
import { newsletter } from '@/lib/newsletter'
import type { Blog } from '@/lib/blogs'

export default function BlogPage() {
  const [featured, setFeatured] = useState<Blog[]>([])
  const [recent, setRecent] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [subError, setSubError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    blogs.getAll()
      .then(({ data }) => {
        if (!active) return
        setFeatured(data.slice(0, 3))
        setRecent(data.slice(3, 9))
      })
      .catch(() => { if (active) setError('Could not load blog posts') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = new FormData(form).get('email') as string
    setSubError(null)
    try {
      await newsletter.subscribe({ email })
      setSubscribed(true)
      form.reset()
    } catch (err) {
      setSubError(err instanceof Error ? err.message : 'Subscription failed')
    }
  }

  return (
    <>
      {/* Hero - Category Showcase Layout */}
      <section className="py-16 border-b border-dark-border mb-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // ENGINEERING INSIGHTS
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-light leading-[1.1] tracking-tighter text-text-primary mb-4">
                Thoughts on
                <br />
                <span className="text-text-secondary">
                  building & scaling.
                </span>
              </h1>
              <p className="text-base text-text-secondary font-light max-w-2xl">
                Deep dives on engineering practices, career growth, and building the future of Web3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="max-w-4xl mb-12 p-4 border border-accent-pink/30 bg-accent-pink/5 text-accent-pink text-sm">
          {error}
        </div>
      )}

      {/* Featured Articles */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Featured <em className="italic font-light text-text-secondary">stories</em>
        </h2>
        {loading ? (
          <p className="text-text-muted text-sm font-light">Loading posts…</p>
        ) : featured.length === 0 ? (
          <p className="text-text-muted text-sm font-light">No posts published yet.</p>
        ) : (
          <div className="space-y-8 max-w-4xl">
            {featured.map((article, i) => (
              <a
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group block px-8 py-8 border border-dark-border bg-white/[0.01] hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="flex items-start gap-4 mb-4">
                  <span className="text-xs font-mono text-accent-purple pt-1">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                        {article.title}
                      </h3>
                      <span className="text-[10px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-2.5 py-0.5 whitespace-nowrap">
                        {article.author}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                      {article.content?.slice(0, 200)}…
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-muted font-light">
                      <span>{new Date(article.published_at ?? article.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{Math.max(1, Math.ceil((article.content?.length ?? 0) / 800))} min read</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Recent Articles Grid */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Recent <em className="italic font-light text-text-secondary">posts</em>
        </h2>
        {loading ? (
          <p className="text-text-muted text-sm font-light">Loading posts…</p>
        ) : recent.length === 0 ? (
          <p className="text-text-muted text-sm font-light">More posts coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {recent.map((article) => (
              <a
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-0.5">
                    {article.author}
                  </span>
                </div>
                <h3 className="text-base font-light text-text-primary group-hover:text-accent-purple transition-colors mb-4 leading-tight">
                  {article.title}
                </h3>
                <p className="text-xs text-text-muted font-light">{new Date(article.published_at ?? article.createdAt).toLocaleDateString()}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="text-center py-12">
        <h3 className="text-2xl font-light text-text-primary mb-4">
          Get engineering insights in your inbox
        </h3>
        <p className="text-sm text-text-secondary mb-8">
          Join engineers and technical leaders receiving insights on Web3 systems, training, and career growth.
        </p>
        {subscribed ? (
          <p className="text-accent-purple text-sm font-light">Subscribed! Check your inbox.</p>
        ) : (
          <form
            className="max-w-md mx-auto flex gap-3"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/[0.02] border border-dark-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-purple focus:bg-accent-purple/5 transition-all text-sm"
            />
            <button
              type="submit"
              className="bg-text-primary text-dark-bg px-6 py-3 text-xs tracking-widest uppercase font-mono hover:bg-transparent hover:text-text-primary hover:border hover:border-text-primary transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        )}
        {subError && <p className="text-accent-pink text-sm mt-3">{subError}</p>}
      </section>
    </>
  )
}
