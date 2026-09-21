export const blogCategories = ["All", "Engineering", "Applied AI", "Cohort notes", "Community"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface Post {
  slug: string;
  category: Exclude<BlogCategory, "All">;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
}