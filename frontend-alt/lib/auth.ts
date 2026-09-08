import api from './api'

export interface AdminUser {
  id: number
  email: string
}

export interface LoginResponse {
  success: boolean
  token: string
  admin: AdminUser
}

export interface LoginPayload {
  email: string
  password: string
}

export const auth = {
  login: (data: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', data),
}

export default auth