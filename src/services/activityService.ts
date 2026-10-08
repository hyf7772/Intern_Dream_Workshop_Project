import { activityOverviews } from '../mocks/activityData'
import { endedActivities, submittedMembers } from '../mocks/activityReviewData'
import type { ActivityItem, ActivityOverviewId, ActivityOverviewConfig, ReviewActivity, SubmittedMember } from '../types/activity'
import { apiClient, type ApiClient } from './apiClient'
import { storageService } from './storageService'

const DRAFT_STORAGE_KEY = 'dream-factory-activity-drafts'
const clone = <T,>(value: T): T => structuredClone(value)

export interface ActivityService {
  getOverview(pageId: ActivityOverviewId): Promise<ActivityOverviewConfig>
  getOverviewItems(pageId: ActivityOverviewId): Promise<ActivityItem[]>
  saveDraft(draft: ActivityItem): Promise<ActivityItem>
  updateActivity(activity: ActivityItem): Promise<ActivityItem>
  publishActivity(activity: ActivityItem): Promise<ActivityItem>
  getReviewActivities(): Promise<ReviewActivity[]>
  getSubmittedMembers(): Promise<SubmittedMember[]>
  publishReviewPoints(activityId: string, allocation: ActivityPointsAllocation): Promise<ActivityPointsResult>
}

export interface ActivityPointsAllocation {
  mode: 'batch' | 'custom'
  pointValue?: number
  customPoints?: Record<string, number>
}

export interface ActivityPointsResult {
  activityId: string
  totalPoints: number
}

const readDrafts = (): ActivityItem[] => storageService.readLocal<ActivityItem[]>(DRAFT_STORAGE_KEY, [])
const writeDrafts = (drafts: ActivityItem[]) => storageService.writeLocal(DRAFT_STORAGE_KEY, drafts)

/** 本地演示实现，方法均保持异步签名，方便页面直接切换到 HTTP 实现。 */
export const createMockActivityService = (): ActivityService => ({
  async getOverview(pageId) {
    return clone(activityOverviews[pageId])
  },

  async getOverviewItems(pageId) {
    const config = await this.getOverview(pageId)
    return clone([...config.items, ...readDrafts().filter(item => (item.overview ?? 'general') === pageId)])
  },

  async saveDraft(draft) {
    const saved = clone(draft)
    writeDrafts([...readDrafts(), saved])
    return clone(saved)
  },

  async updateActivity(activity) {
    const updated = clone(activity)
    if (activity.id.startsWith('draft-')) {
      writeDrafts(readDrafts().map(item => item.id === activity.id ? updated : item))
    }
    return updated
  },

  async publishActivity(activity) {
    return this.updateActivity({ ...activity, status: '已发布' })
  },

  async getReviewActivities() {
    return clone(endedActivities)
  },

  async getSubmittedMembers() {
    return clone(submittedMembers)
  },

  async publishReviewPoints(activityId, allocation) {
    const totalPoints = allocation.mode === 'custom'
      ? Object.values(allocation.customPoints ?? {}).reduce((total, points) => total + points, 0)
      : allocation.pointValue ?? 0
    return { activityId, totalPoints }
  },
})

/** 后端实现；页面只依赖 ActivityService，不需要感知请求细节。 */
export const createHttpActivityService = (client: ApiClient = apiClient): ActivityService => ({
  getOverview: pageId => client.request(`/activities/overviews/${encodeURIComponent(pageId)}`),
  getOverviewItems: pageId => client.request(`/activities?overview=${encodeURIComponent(pageId)}`),
  saveDraft: draft => client.request('/activities/drafts', { method: 'POST', body: JSON.stringify(draft) }),
  updateActivity: activity => client.request(`/activities/${encodeURIComponent(activity.id)}`, { method: 'PUT', body: JSON.stringify(activity) }),
  publishActivity: activity => client.request(`/activities/${encodeURIComponent(activity.id)}/publish`, { method: 'POST' }),
  getReviewActivities: () => client.request('/activities/reviews'),
  getSubmittedMembers: () => client.request('/activities/submissions'),
  publishReviewPoints: (activityId, allocation) => client.request(`/activities/${encodeURIComponent(activityId)}/points`, { method: 'POST', body: JSON.stringify(allocation) }),
})

/** 配置 VITE_API_BASE_URL 后使用 HTTP，否则使用本地演示数据。 */
export const activityService: ActivityService = import.meta.env.VITE_API_BASE_URL
  ? createHttpActivityService()
  : createMockActivityService()
