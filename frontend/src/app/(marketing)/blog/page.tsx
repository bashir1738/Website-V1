import type { Metadata } from "next";
import { BlogArchive } from "@/features/blog/blog-archive";
import { posts, type Post } from "@/features/blog/content";
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

export default async function BlogPage() {
  let backendBlogs: BackendBlog[] = [];
  try {
    // Not cached at the fetch layer: Next strips the abort signal on stale
    // revalidation fetches, so a cached fetch would hang for undici's 10s
    // connect timeout. We time out inline and fall back to static posts.
    const res = await fetch(`${API_URL}/blogs`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data: BackendBlog[] };
    if (json.success && Array.isArray(json.data)) {
      backendBlogs = json.data;
    }
  } catch {
    // Unreachable API — render the static posts below.
  }

  const allPosts = backendBlogs.length > 0 ? backendBlogs.map((blog) => ({
    slug: blog.slug,
    category: "Engineering", // Fallback since backend lacks category
    title: blog.title,
    excerpt: blog.content ? blog.content.substring(0, 150) + "..." : "",
    date: new Date(blog.published_at || blog.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read", // Fallback
    image: blog.image_url || "/brand/heropic.jpg",
    imageAlt: blog.title,
  })) satisfies Post[] : posts;

  return <BlogArchive posts={allPosts} />;
}