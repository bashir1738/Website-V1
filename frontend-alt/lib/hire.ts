import api from './api'

export interface HirePayload {
  company: string
  name: string
  email: string
  roles?: string[] | null
  engagement_type?: string | null
  seniority?: string | null
  count?: string | null
  timeline?: string | null
  details: string
}

export interface HireRequest {
  id: number
  company: string
  name: string
  email: string
  roles?: string[] | null
  engagement_type?: string | null
  seniority?: string | null
  count?: string | null
  timeline?: string | null
  details: string
  createdAt: string
  updatedAt: string
}

export interface HireResponse {
  success: boolean
  data: HireRequest
}

export interface HireListResponse {
  success: boolean
  data: HireRequest[]
}

export const hire = {
  submit: (data: HirePayload) =>
    api.post<HireResponse>('/hiring-requests', data),

  getAll: (token: string) =>
    api.get<HireListResponse>('/hiring-requests', token),

  update: (id: number, data: HirePayload, token: string) =>
    api.put<HireResponse>(`/hiring-requests/${id}`, data, token),

  patch: (id: number, data: Partial<HirePayload>, token: string) =>
    api.patch<HireResponse>(`/hiring-requests/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/hiring-requests/${id}`, token),
}

export default hire