import api from './api'

export interface ContactPayload {
  name: string
  email: string
  topic: string
  message: string
}

export interface Contact {
  id: number
  name: string
  email: string
  topic: string
  message: string
  createdAt: string
  updatedAt: string
}

export interface ContactResponse {
  success: boolean
  data: Contact
}

export interface ContactListResponse {
  success: boolean
  data: Contact[]
}

export const contact = {
  submit: (data: ContactPayload) =>
    api.post<ContactResponse>('/contact', data),

  getAll: (token: string) =>
    api.get<ContactListResponse>('/contact', token),

  update: (id: number, data: ContactPayload, token: string) =>
    api.put<ContactResponse>(`/contact/${id}`, data, token),

  patch: (id: number, data: Partial<ContactPayload>, token: string) =>
    api.patch<ContactResponse>(`/contact/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/contact/${id}`, token),
}

export default contact