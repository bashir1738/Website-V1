import type { Metadata } from "next";
import { BlogArchive } from "@/features/blog/blog-archive";
import type { Post } from "@/features/blog/content";
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
  createdAt: string;
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

export default async function BlogPage() {
  let backendBlogs: BackendBlog[] = [];
  try {
    // Fetch-only: content comes from the backend, never a static fallback.
    const res = await fetch(`${API_URL}/blogs`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data: BackendBlog[] };
    if (json.success && Array.isArray(json.data)) {
      backendBlogs = json.data;
    }
  } catch {
    // Backend unreachable — the archive renders the empty state.
  }

  const posts: Post[] = backendBlogs.map((blog) => ({
    slug: blog.slug,
    category: inferCategory(blog.title, blog.content || ""),
    title: blog.title,
    excerpt: blog.content ? blog.content.substring(0, 150) + "..." : "",
    date: new Date(blog.published_at || blog.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read", // Backend lacks a read time field.
    image: blog.image_url || "/brand/heropic.jpg",
    imageAlt: blog.title,
  })) satisfies Post[];

  return <BlogArchive posts={posts} />;
}