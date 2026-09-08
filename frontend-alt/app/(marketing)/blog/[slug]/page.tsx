import { notFound } from 'next/navigation'
import { blogs } from '@/lib/blogs'

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let blog
  try {
    const res = await blogs.getBySlug(slug)
    blog = res.data
  } catch {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase mb-6">
          <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
          // {blog.author}
        </div>

        <h1 className="text-4xl sm:text-5xl font-light leading-[1.1] tracking-tighter text-text-primary mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-text-muted font-light border-b border-dark-border pb-6">
          <span>{blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.published_at ?? blog.createdAt).toLocaleDateString()}</span>
        </div>
      </header>

      <div className="prose-invert space-y-6">
        <p className="text-lg text-text-secondary font-light leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-dark-border">
        <a href="/blog" className="text-xs font-mono tracking-widest uppercase text-accent-purple hover:text-text-primary transition-colors">
          ← All posts
        </a>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const res = await blogs.getBySlug(slug)
    return { title: res.data.title }
  } catch {
    return { title: 'Blog Post' }
  }
}
