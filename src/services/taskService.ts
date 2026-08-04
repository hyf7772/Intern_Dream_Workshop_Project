import { adminModules, internModules } from '../mocks/homeData'
import type { UserRole } from '../types/auth'
import { mockTaskPages, mockUser } from '../mocks/taskData'
import type { ModuleItem, TaskPageConfig, TaskPageId, UserSummary } from '../types/task'

const clone = <T,>(value: T): T => structuredClone(value)

// API boundary: replace these implementations with HTTP requests when the backend is ready.
export const taskService = {
  async getTaskPages(): Promise<Record<TaskPageId, TaskPageConfig>> {
    return clone(mockTaskPages)
  },
  async getTaskPage(pageId: TaskPageId): Promise<TaskPageConfig> {
    return clone(mockTaskPages[pageId])
  },
  async getUserSummary(): Promise<UserSummary> {
    return clone(mockUser)
  },
  async getHomeModules(role: UserRole): Promise<ModuleItem[]> {
    return clone(role === 'admin' ? adminModules : internModules)
  },
}
