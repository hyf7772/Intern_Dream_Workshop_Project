import { beforeEach, describe, expect, it } from 'vitest'
import { activityService } from './activityService'
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

  it('returns cloned overview data', () => {
    const overview = activityService.getOverview('general')
    overview.items[0].name = '被测试修改'

    expect(activityService.getOverview('general').items[0].name).not.toBe('被测试修改')
  })

  it('saves drafts into the matching overview', () => {
    activityService.saveDraft(draft)

    expect(activityService.getOverviewItems('professional')).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: draft.id, name: draft.name }),
    ]))
    expect(activityService.getOverviewItems('general')).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ id: draft.id }),
    ]))
  })

  it('publishes a saved draft and persists the new status', () => {
    activityService.saveDraft(draft)
    const published = activityService.publishActivity(draft)

    expect(published.status).toBe('已发布')
    expect(activityService.getOverviewItems('professional')).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: draft.id, status: '已发布' }),
    ]))
  })
})
