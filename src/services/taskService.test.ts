import { describe, expect, it, vi } from 'vitest'
import { createApiClient, type ApiClient } from './apiClient'
import { createHttpTaskService, createMockTaskService } from './taskService'

describe('taskService', () => {
  it('keeps mock task data isolated between reads', async () => {
    const service = createMockTaskService()
    const first = await service.getTaskPages()
    first.newcomer.title = '临时修改'

    const second = await service.getTaskPage('newcomer')

    expect(second.title).toBe('新手任务')
  })

  it('maps task mutations to the planned backend endpoints', async () => {
    const request = vi.fn().mockResolvedValue({ taskId: 'task/1', status: 'completed' })
    const service = createHttpTaskService({ request } as unknown as ApiClient)
    const submission = { content: '完成说明', attachmentNames: ['result.pdf'] }

    await service.enrollTask('task/1')
    await service.submitTask('task/1', submission)

    expect(request).toHaveBeenNthCalledWith(1, '/tasks/task%2F1/enroll', { method: 'POST' })
    expect(request).toHaveBeenNthCalledWith(2, '/tasks/task%2F1/submit', { method: 'POST', body: JSON.stringify(submission) })
  })

  it('reports a clear error when the API base URL is missing', async () => {
    const client = createApiClient('')

    await expect(client.request('/tasks/pages')).rejects.toMatchObject({ code: 'API_BASE_URL_MISSING', path: '/tasks/pages' })
  })
})
