import api from './api'

export interface SponsorPayload {
  organisation: string
  name: string
  email: string
  interests?: string[] | null
  budget?: string | null
  metrics?: string | null
}

export interface Sponsorship {
  id: number
  organisation: string
  name: string
  email: string
  interests?: string[] | null
  budget?: string | null
  metrics?: string | null
  createdAt: string
  updatedAt: string
}

export interface SponsorResponse {
  success: boolean
  data: Sponsorship
}

export interface SponsorListResponse {
  success: boolean
  data: Sponsorship[]
}

export const sponsor = {
  submit: (data: SponsorPayload) =>
    api.post<SponsorResponse>('/sponsorships', data),

  getAll: (token: string) =>
    api.get<SponsorListResponse>('/sponsorships', token),

  update: (id: number, data: SponsorPayload, token: string) =>
    api.put<SponsorResponse>(`/sponsorships/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/sponsorships/${id}`, token),
}

export default sponsor