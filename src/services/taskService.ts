import { adminModules, internModules } from '../mocks/homeData'
import type { UserRole } from '../types/auth'
import { mockTaskPages, mockUser } from '../mocks/taskData'
import type { ModuleItem, TaskPageConfig, TaskPageId, TaskStatus, TaskSubmission, UserSummary } from '../types/task'

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
  // 后端接入时分别替换为 POST /tasks/{id}/enroll、POST /tasks/{id}/submit。
  async enrollTask(taskId: string): Promise<{ taskId: string; status: TaskStatus }> {
    return Promise.resolve({ taskId, status: 'in_progress' })
  },
  async submitTask(taskId: string, submission: TaskSubmission): Promise<{ taskId: string; status: TaskStatus }> {
    void submission
    return Promise.resolve({ taskId, status: 'completed' })
  },
  // 后端可按需提供 GET /tasks/{id}；当前详情已包含在任务列表数据中。
  async getTaskDetail(taskId: string): Promise<{ taskId: string }> {
    return Promise.resolve({ taskId })
  },
}
