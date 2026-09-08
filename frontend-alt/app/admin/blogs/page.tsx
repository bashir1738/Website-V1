'use client'

import { useState } from 'react'
import { getToken } from '@/lib/token'
import { useData, formatDate } from '@/lib/useData'
import { PageHeader, StatCard } from '@/app/admin/components/PageHeader'
import { DataTable } from '@/app/admin/components/DataTable'
import { BlogForm } from '@/app/admin/components/BlogForm'
import { blogs } from '@/lib/blogs'
import type { Blog } from '@/lib/blogs'

export default function BlogAdminPage() {
  const token = getToken()
  const { data, loading, error, reload } = useData(blogs.getAll, token)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleCreate = async (input: { title: string; slug: string; author: string; content: string; published_at?: string; image?: File }) => {
    if (!token) return
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

      await blogs.create(fd, token)
      setMessage({ type: 'success', text: 'Blog post created.' })
      setShowCreate(false)
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to create post' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Delete this blog post?')) return
    try {
      await blogs.remove(id, token)
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' })
    }
  }

  const columns = [
    { key: 'title', header: 'Title', render: (b: Blog) => <a href={`/admin/blogs/${b.slug}`} className="text-text-primary hover:text-accent-purple">{b.title}</a> },
    { key: 'slug', header: 'Slug', render: (b: Blog) => <span className="font-mono text-xs">{b.slug}</span> },
    { key: 'author', header: 'Author' },
    { key: 'published_at', header: 'Published', render: (b: Blog) => formatDate(b.published_at ?? b.createdAt) },
    {
      key: 'actions', header: 'Actions',
      render: (b: Blog) => (
        <div className="flex items-center gap-2">
          <a href={`/admin/blogs/${b.slug}`} className="text-[10px] font-mono uppercase text-accent-purple hover:text-text-primary">View</a>
          <button onClick={() => handleDelete(b.id)} className="text-[10px] font-mono uppercase text-accent-pink hover:text-text-primary">Delete</button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Blogs" subtitle="Manage published blog posts." action={
        <button onClick={() => setShowCreate((s) => !s)} className="px-4 py-2 border border-dark-border text-xs tracking-widest uppercase font-mono text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all">
          {showCreate ? 'Cancel' : '+ New Post'}
        </button>
      } />

      {message && (
        <div className={`mb-6 p-4 border text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-accent-pink/30 bg-accent-pink/5 text-accent-pink'}`}>
          {message.text}
        </div>
      )}

      {showCreate && (
        <div className="mb-10 border border-dark-border bg-white/[0.01]">
          <div className="border-b border-dark-border px-6 py-4">
            <span className="text-sm font-mono tracking-widest uppercase text-accent-purple">New Blog Post</span>
          </div>
          <div className="p-6">
            <BlogForm onSubmit={handleCreate} loading={saving} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total posts" value={loading ? '—' : (data?.length ?? 0)} />
      </div>

      <DataTable<Blog> data={data ?? []} columns={columns} loading={loading} error={error} />
      <div className="mt-6">
        <button onClick={reload} className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary">⟳ Refresh</button>
      </div>
    </>
  )
}
