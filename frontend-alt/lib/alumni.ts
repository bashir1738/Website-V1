import api from './api'

export interface AlumniPayload {
  name: string
  email: string
  cohort: string
  track: string
  current_status: string
  location?: string | null
  github?: string | null
  linkedin?: string | null
  open_to?: string[] | null
  photo_url?: string | null
  verification_info?: string | null
}

export interface AlumniProfile {
  id: number
  name: string
  email: string
  cohort: string
  track: string
  current_status: string
  location?: string | null
  github?: string | null
  linkedin?: string | null
  open_to?: string[] | null
  photo_url?: string | null
  verification_info?: string | null
  createdAt: string
  updatedAt: string
}

export interface AlumniResponse {
  success: boolean
  data: AlumniProfile
}

export interface AlumniListResponse {
  success: boolean
  data: AlumniProfile[]
}

export const alumni = {
  submit: (formData: FormData) =>
    api.upload<AlumniResponse>('/alumni-submissions', formData),

  getAll: (token: string) =>
    api.get<AlumniListResponse>('/alumni-submissions', token),

  update: (id: number, data: AlumniPayload, token: string) =>
    api.put<AlumniResponse>(`/alumni-submissions/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/alumni-submissions/${id}`, token),
}

export default alumni