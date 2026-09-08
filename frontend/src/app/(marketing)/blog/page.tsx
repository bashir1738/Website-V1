import type { Metadata } from "next";
import { BlogArchive } from "@/features/blog/blog-archive";

export const metadata: Metadata = {
  title: "Blog | Blockfuse Labs",
  description: "Engineering notes, field lessons, and community stories from Blockfuse Labs.",
};

export default function BlogPage() {
  return <BlogArchive />;
}
