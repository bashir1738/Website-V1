'use client'

import { useEffect, useState, use } from 'react'
import { getToken } from '@/lib/token'
import { PageHeader } from '@/app/admin/components/PageHeader'
import { BlogForm } from '@/app/admin/components/BlogForm'
import { blogs } from '@/lib/blogs'
import type { Blog } from '@/lib/blogs'

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const token = getToken()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!token) return
    let active = true
    blogs.getBySlug(slug)
      .then((res) => { if (active) setBlog(res.data) })
      .catch(() => { if (active) setError('Failed to load post') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token, slug])

  const handleUpdate = async (input: { title: string; slug: string; author: string; content: string; published_at?: string; image?: File }) => {
    if (!token || !blog) return
    setSaving(true)
    setMessage(null)
    try {
      const fd = new FormData()
      fd.append('title', input.title)
      fd.append('slug', input.slug)
      fd.append('author', input.author)
      fd.append('content', input.content)
      if (input.published_at) fd.append('published_at', new Date(input.published_at).toISOString())
      if (input.image) fd.append('image', input.image)
      await blogs.update(blog.id, fd, token)
      setMessage({ type: 'success', text: 'Changes saved.' })
      const res = await blogs.getBySlug(input.slug)
      setBlog(res.data)
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!token || !blog || !confirm('Delete this blog post?')) return
    try {
      await blogs.remove(blog.id, token)
      window.location.href = '/admin/blogs'
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  if (loading) return <p className="text-sm text-text-muted">Loading…</p>
  if (error || !blog) return <p className="text-sm text-accent-pink">{error ?? 'Post not found'}</p>

  return (
    <>
      <PageHeader title="Edit Blog Post" subtitle={blog.slug} action={
        <div className="flex items-center gap-3">
          <a href="/admin/blogs" className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:text-accent-purple transition-all">← Back</a>
          <button onClick={handleDelete} className="px-4 py-2 border border-accent-pink/40 text-xs tracking-widest uppercase font-mono text-accent-pink hover:bg-accent-pink hover:text-white transition-all">Delete</button>
        </div>
      } />

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      {blog.image_url && (
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.image_url} alt={blog.title} className="max-h-64 w-full object-cover border border-dark-border" />
        </div>
      )}

      <div className="border border-dark-border bg-white/[0.01]">
        <div className="border-b border-dark-border px-6 py-4">
          <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">Post Details</span>
        </div>
        <div className="p-6">
          <BlogForm
            onSubmit={handleUpdate}
            loading={saving}
            submitLabel="Save Changes"
            initial={{
              title: blog.title,
              slug: blog.slug,
              author: blog.author,
              content: blog.content,
              published_at: blog.published_at ?? undefined,
            }}
          />
        </div>
      </div>
    </>
  )
}
