'use client'

import { useState } from 'react'

export function BlogForm({ onSubmit, loading, submitLabel = 'Create Post', initial }: {
  onSubmit: (data: {
    title: string
    slug: string
    author: string
    content: string
    published_at?: string
    image?: File
  }) => Promise<void>
  loading: boolean
  submitLabel?: string
  initial?: { title: string; slug: string; author: string; content: string; published_at?: string }
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [publishedAt, setPublishedAt] = useState(initial?.published_at ?? '')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      title,
      slug,
      author,
      content,
      published_at: publishedAt || undefined,
      image: image ?? undefined,
    })
  }

  const inputCls = "w-full px-3 py-2.5 bg-white/[0.02] border border-dark-border text-text-primary focus:outline-none focus:border-accent-purple text-sm"
  const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input required value={title} onChange={(e) => { setTitle(e.target.value); if (!initial) setSlug(slugify(e.target.value)) }} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={`${inputCls} font-mono text-xs`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Author *</label>
          <input required value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Publish Date</label>
          <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={`${inputCls} text-xs`} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Cover Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className={`${inputCls} text-xs`} />
      </div>

      <div>
        <label className={labelCls}>Content *</label>
        <textarea required rows={8} value={content} onChange={(e) => setContent(e.target.value)} className={`${inputCls} resize-y leading-relaxed`} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-text-primary text-dark-bg text-xs tracking-widest uppercase font-mono hover:bg-accent-purple hover:text-white transition-all disabled:opacity-50"
      >
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}
