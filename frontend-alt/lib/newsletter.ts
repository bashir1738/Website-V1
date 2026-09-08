import api from './api'

export interface NewsletterPayload {
  name?: string | null
  email: string
  topics?: string[] | null
}

export interface NewsletterSubscriber {
  id: number
  name?: string | null
  email: string
  topics?: string[] | null
  createdAt: string
  updatedAt: string
}

export interface NewsletterResponse {
  success: boolean
  data: NewsletterSubscriber
}

export interface NewsletterListResponse {
  success: boolean
  data: NewsletterSubscriber[]
}

export const newsletter = {
  subscribe: (data: NewsletterPayload) =>
    api.post<NewsletterResponse>('/newsletter', data),

  getAll: (token: string) =>
    api.get<NewsletterListResponse>('/newsletter', token),

  update: (id: number, data: NewsletterPayload, token: string) =>
    api.put<NewsletterResponse>(`/newsletter/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/newsletter/${id}`, token),
}

export default newsletter