export type UserRole = 'intern' | 'admin'

export interface AuthUser {
  id: string
  displayName: string
  role: UserRole
}

