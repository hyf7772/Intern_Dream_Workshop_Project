import { adminModules, internModules } from '../mocks/homeData'
import { mockTaskPages, mockUser } from '../mocks/taskData'
import type { UserRole } from '../types/auth'
import type { ModuleItem, TaskPageConfig, TaskPageId, TaskStatus, TaskSubmission, UserSummary } from '../types/task'
import { apiClient, type ApiClient } from './apiClient'

export interface TaskService {
  getTaskPages(): Promise<Record<TaskPageId, TaskPageConfig>>
  getTaskPage(pageId: TaskPageId): Promise<TaskPageConfig>
  getUserSummary(): Promise<UserSummary>
  getHomeModules(role: UserRole): Promise<ModuleItem[]>
  enrollTask(taskId: string): Promise<{ taskId: string; status: TaskStatus }>
  submitTask(taskId: string, submission: TaskSubmission): Promise<{ taskId: string; status: TaskStatus }>
  getTaskDetail(taskId: string): Promise<{ taskId: string }>
}

const clone = <T,>(value: T): T => structuredClone(value)

/** 当前演示环境使用的本地实现，接口签名与后端实现保持一致。 */
export const createMockTaskService = (): TaskService => ({
  async getTaskPages() {
    return clone(mockTaskPages)
  },
  async getTaskPage(pageId) {
    return clone(mockTaskPages[pageId])
  },
  async getUserSummary() {
    return clone(mockUser)
  },
  async getHomeModules(role) {
    return clone(role === 'admin' ? adminModules : internModules)
  },
  async enrollTask(taskId) {
    return { taskId, status: 'in_progress' }
  },
  async submitTask(taskId, submission) {
    void submission
    return { taskId, status: 'completed' }
  },
  async getTaskDetail(taskId) {
    return { taskId }
  },
})

/** 后端接口实现；切换时只需替换页面注入的 service，不需要修改页面交互。 */
export const createHttpTaskService = (client: ApiClient = apiClient): TaskService => ({
  getTaskPages: () => client.request('/tasks/pages'),
  getTaskPage: pageId => client.request(`/tasks/pages/${encodeURIComponent(pageId)}`),
  getUserSummary: () => client.request('/users/me/summary'),
  getHomeModules: role => client.request(`/home/modules?role=${encodeURIComponent(role)}`),
  enrollTask: taskId => client.request(`/tasks/${encodeURIComponent(taskId)}/enroll`, { method: 'POST' }),
  submitTask: (taskId, submission) => client.request(`/tasks/${encodeURIComponent(taskId)}/submit`, { method: 'POST', body: JSON.stringify(submission) }),
  getTaskDetail: taskId => client.request(`/tasks/${encodeURIComponent(taskId)}`),
})

/** 配置 VITE_API_BASE_URL 后自动切换到 HTTP 实现，未配置时继续使用 mock。 */
export const taskService: TaskService = import.meta.env.VITE_API_BASE_URL ? createHttpTaskService() : createMockTaskService()
