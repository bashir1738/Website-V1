import api from './api'

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  date: string
  location?: string | null
  image_url?: string | null
  link?: string | null
  createdAt: string
  updatedAt: string
}

export interface EventResponse {
  success: boolean
  data: Event[]
}

export interface EventSingleResponse {
  success: boolean
  data: Event
}

export const events = {
  getAll: () => api.get<EventResponse>('/events'),

  getBySlug: (slug: string) => api.get<EventSingleResponse>(`/events/${slug}`),

  create: (formData: FormData, token: string) =>
    api.upload<EventSingleResponse>('/events', formData, token),

  update: (id: number, formData: FormData, token: string) =>
    api.upload<EventSingleResponse>(`/events/${id}`, formData, token, 'PUT'),

  patch: (id: number, data: Partial<Event>, token: string) =>
    api.patch<EventSingleResponse>(`/events/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/events/${id}`, token),
}

export default events