import api from './api'

export interface ProdfestPayload {
  name: string
  email: string
  attending_as?: string | null
  organisation?: string | null
  goals?: string | null
}

export interface ProdfestRegistration {
  id: number
  name: string
  email: string
  attending_as?: string | null
  organisation?: string | null
  goals?: string | null
  createdAt: string
  updatedAt: string
}

export interface ProdfestResponse {
  success: boolean
  data: ProdfestRegistration
}

export interface ProdfestListResponse {
  success: boolean
  data: ProdfestRegistration[]
}

export const prodfest = {
  submit: (data: ProdfestPayload) =>
    api.post<ProdfestResponse>('/prodfest-registrations', data),

  getAll: (token: string) =>
    api.get<ProdfestListResponse>('/prodfest-registrations', token),

  update: (id: number, data: ProdfestPayload, token: string) =>
    api.put<ProdfestResponse>(`/prodfest-registrations/${id}`, data, token),

  remove: (id: number, token: string) =>
    api.delete<{ success: boolean }>(`/prodfest-registrations/${id}`, token),
}

export default prodfest