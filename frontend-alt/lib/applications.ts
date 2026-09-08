import api from './api'

export interface ApplicationPayload {
  name: string
  email: string
  phone: string
  location?: string | null
  track?: string | null
  experience_level?: string | null
  github?: string | null
  referral?: string | null
  motivation: string
  resume_url?: string | null
}

export interface Application {
  id: number
  name: string
  email: string
  phone: string
  location?: string | null
  track?: string | null
  experience_level?: string | null
  github?: string | null
  referral?: string | null
  motivation: string
  resume_url?: string | null
  createdAt: string
  updatedAt: string
}

export interface ApplicationResponse {
  success: boolean
  data: Application
}

export interface ApplicationListResponse {
  success: boolean
  data: Application[]
}

export const applications = {
  submit: (formData: FormData) =>
    api.upload<ApplicationResponse>('/applications', formData),

  getAll: (token: string) =>
    api.get<ApplicationListResponse>('/applications', token),

  update: (id: number, data: ApplicationPayload, token: string) =>
    api.put<ApplicationResponse>(`/applications/${id}`, data, token),

  patch: (id: number, data: Partial<ApplicationPayload>, token: string) =>
    api.patch<ApplicationResponse>(`/applications/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/applications/${id}`, token),
}

export default applications