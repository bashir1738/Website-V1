import { postJson } from './api'

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
    postJson('/contact', data as unknown as Record<string, unknown>),
}

export default contact
