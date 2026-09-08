import api from './api'

export interface OpensourcePayload {
  name: string
  email: string
  github: string
  interests?: string[] | null
  hours?: string | null
  focus?: string | null
}

export interface OpenSourceApplication {
  id: number
  name: string
  email: string
  github: string
  interests?: string[] | null
  hours?: string | null
  focus?: string | null
  createdAt: string
  updatedAt: string
}

export interface OpensourceResponse {
  success: boolean
  data: OpenSourceApplication
}

export interface OpensourceListResponse {
  success: boolean
  data: OpenSourceApplication[]
}

export const opensource = {
  submit: (data: OpensourcePayload) =>
    api.post<OpensourceResponse>('/opensource-applications', data),

  getAll: (token: string) =>
    api.get<OpensourceListResponse>('/opensource-applications', token),

  update: (id: number, data: OpensourcePayload, token: string) =>
    api.put<OpensourceResponse>(`/opensource-applications/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/opensource-applications/${id}`, token),
}

export default opensource