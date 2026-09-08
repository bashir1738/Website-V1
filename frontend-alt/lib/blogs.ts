import api from './api'

export interface Blog {
  id: number
  title: string
  slug: string
  content: string
  author: string
  image_url?: string | null
  published_at?: string | null
  createdAt: string
  updatedAt: string
}

export interface BlogResponse {
  success: boolean
  data: Blog[]
}

export interface BlogSingleResponse {
  success: boolean
  data: Blog
}

export const blogs = {
  getAll: () => api.get<BlogResponse>('/blogs'),

  getBySlug: (slug: string) => api.get<BlogSingleResponse>(`/blogs/${slug}`),

  create: (formData: FormData, token: string) =>
    api.upload<BlogSingleResponse>('/blogs', formData, token),

  update: (id: number, formData: FormData, token: string) =>
    api.upload<BlogSingleResponse>(`/blogs/${id}`, formData, token, 'PUT'),

  patch: (id: number, data: Partial<Blog>, token: string) =>
    api.patch<BlogSingleResponse>(`/blogs/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/blogs/${id}`, token),
}

export default blogs