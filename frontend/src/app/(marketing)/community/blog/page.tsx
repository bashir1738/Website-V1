import type { Metadata } from "next";
import { BlogArchive } from "@/features/blog/blog-archive";
import type { Post } from "@/features/blog/content";
import { loadArticles } from "@/features/blog/articles";
import { API_URL } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog | Blockfuse Labs",
  description: "Engineering notes, field lessons, and community stories from Blockfuse Labs.",
};

interface BackendBlog {
  slug: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string | null;
  createdAt: string | null;
}

function inferCategory(title: string, content: string): Post["category"] {
  const haystack = `${title} ${content}`.toLowerCase();
  if (/(ai |ai-|llm|machine learning|applied ai|model)/.test(haystack)) {
    return "Applied AI";
  }
  if (/(cohort|student|intake|class of|week \d)/.test(haystack)) {
    return "Cohort notes";
  }
  if (/(community|meetup|event|prodfest|workshop)/.test(haystack)) {
    return "Community";
  }
  return "Engineering";
}

function formatDate(value?: string | null): string {
  const time = value ? Date.parse(value) : NaN;
  if (Number.isNaN(time)) return "";
  return new Date(time).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function loadBackendBlogs(): Promise<BackendBlog[]> {
  try {
    // Fetch-only: content comes from the backend, never a static fallback.
    const res = await fetch(`${API_URL}/blogs`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data: BackendBlog[] };
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
  } catch {
    // Backend unreachable — the archive renders whatever the other source has.
  }
  return [];
}

export default async function BlogPage() {
  const [backendBlogs, articles] = await Promise.all([
    loadBackendBlogs(),
    loadArticles(),
  ]);

  const seen = new Set(backendBlogs.map((blog) => blog.slug));
  const merged: BackendBlog[] = [
    ...backendBlogs,
    ...articles.filter((article) => !seen.has(article.slug)),
  ];

  const posts: Post[] = merged.map((blog) => ({
    slug: blog.slug,
    category: inferCategory(blog.title, blog.content || ""),
    title: blog.title,
    excerpt: blog.content ? blog.content.substring(0, 150) + "..." : "",
    date: formatDate(blog.published_at || blog.createdAt),
    readTime: "5 min read", // Backend lacks a read time field.
    image: blog.image_url || "/brand/heropic.jpg",
    imageAlt: blog.title,
  })) satisfies Post[];

  return <BlogArchive posts={posts} />;
}
