import { mockIdentityUsers } from '../mocks/authData'
import type { AuthUser, UserRole } from '../types/auth'

const SESSION_KEY = 'dream-factory-auth-user'

const cloneUser = (user: AuthUser): AuthUser => structuredClone(user)

export const authService = {
  async signInAsRole(role: UserRole): Promise<AuthUser> {
    // 后续接入后端时，在这里替换为登录接口，并保留页面调用方式。
    return Promise.resolve(cloneUser(mockIdentityUsers[role]))
  },

  restoreSession(): AuthUser | null {
    const savedUser = window.sessionStorage.getItem(SESSION_KEY)
    if (!savedUser) return null

    try {
      return JSON.parse(savedUser) as AuthUser
    } catch {
      window.sessionStorage.removeItem(SESSION_KEY)
      return null
    }
  },

  saveSession(user: AuthUser) {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
  },

  clearSession() {
    window.sessionStorage.removeItem(SESSION_KEY)
  },
}

