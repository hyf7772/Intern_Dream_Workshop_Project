import type { AuthUser, UserRole } from '../types/auth'

export const mockIdentityUsers: Record<UserRole, AuthUser> = {
  intern: {
    id: 'demo-intern',
    displayName: '梦想实习生',
    role: 'intern',
  },
  admin: {
    id: 'demo-admin',
    displayName: '成长管理员',
    role: 'admin',
  },
}

