import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createHttpActivityService, createMockActivityService } from './activityService'
import type { ApiClient } from './apiClient'
import type { ActivityItem } from '../types/activity'

const draft: ActivityItem = {
  id: 'draft-test-activity',
  name: '测试活动',
  type: '成长培训',
  publisher: '测试用户',
  department: '人力资源部',
  date: '2026-08-20',
  time: '09:00 ~ 10:00',
  location: '测试地点',
  enrollment: '0/10',
  stars: 30,
  status: '草稿',
  icon: '🎓',
  overview: 'professional',
}

describe('activityService', () => {
  beforeEach(() => window.localStorage.clear())

  it('returns cloned overview data from the mock implementation', async () => {
    const service = createMockActivityService()
    const overview = await service.getOverview('general')
    overview.items[0].name = '被测试修改'

    expect((await service.getOverview('general')).items[0].name).not.toBe('被测试修改')
  })

  it('saves drafts into the matching overview', async () => {
    const service = createMockActivityService()
    await service.saveDraft(draft)

    expect(await service.getOverviewItems('professional')).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: draft.id, name: draft.name }),
    ]))
    expect(await service.getOverviewItems('general')).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ id: draft.id }),
    ]))
  })

  it('publishes a saved draft and persists the new status', async () => {
    const service = createMockActivityService()
    await service.saveDraft(draft)
    const published = await service.publishActivity(draft)

    expect(published.status).toBe('已发布')
    expect(await service.getOverviewItems('professional')).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: draft.id, status: '已发布' }),
    ]))
  })

  it('maps activity reads and mutations to the planned backend endpoints', async () => {
    const request = vi.fn().mockResolvedValue([])
    const service = createHttpActivityService({ request } as unknown as ApiClient)

    await service.getOverview('professional')
    await service.getOverviewItems('general')
    await service.saveDraft(draft)
    await service.updateActivity(draft)
    await service.publishActivity(draft)
    await service.getReviewActivities()
    await service.getSubmittedMembers()
    await service.publishReviewPoints('activity-1', { mode: 'batch', pointValue: 30 })

    expect(request).toHaveBeenNthCalledWith(1, '/activities/overviews/professional')
    expect(request).toHaveBeenNthCalledWith(2, '/activities?overview=general')
    expect(request).toHaveBeenNthCalledWith(3, '/activities/drafts', { method: 'POST', body: JSON.stringify(draft) })
    expect(request).toHaveBeenNthCalledWith(4, `/activities/${draft.id}`, { method: 'PUT', body: JSON.stringify(draft) })
    expect(request).toHaveBeenNthCalledWith(5, `/activities/${draft.id}/publish`, { method: 'POST' })
    expect(request).toHaveBeenNthCalledWith(6, '/activities/reviews')
    expect(request).toHaveBeenNthCalledWith(7, '/activities/submissions')
    expect(request).toHaveBeenNthCalledWith(8, '/activities/activity-1/points', { method: 'POST', body: JSON.stringify({ mode: 'batch', pointValue: 30 }) })
  })
})
