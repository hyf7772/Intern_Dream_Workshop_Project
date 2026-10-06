import { activityOverviews } from '../mocks/activityData'
import { endedActivities, submittedMembers } from '../mocks/activityReviewData'
import type { ActivityItem, ActivityOverviewId, ActivityOverviewConfig, ReviewActivity, SubmittedMember } from '../types/activity'
import { storageService } from './storageService'

const DRAFT_STORAGE_KEY = 'dream-factory-activity-drafts'
const clone = <T,>(value: T): T => structuredClone(value)

const readDrafts = (): ActivityItem[] => storageService.readLocal<ActivityItem[]>(DRAFT_STORAGE_KEY, [])
const writeDrafts = (drafts: ActivityItem[]) => storageService.writeLocal(DRAFT_STORAGE_KEY, drafts)

export const activityService = {
  // 当前返回 mock；接入后端时替换为活动接口。
  getOverview(pageId: ActivityOverviewId): ActivityOverviewConfig {
    return clone(activityOverviews[pageId])
  },

  getOverviewItems(pageId: ActivityOverviewId): ActivityItem[] {
    const config = this.getOverview(pageId)
    return clone([...config.items, ...readDrafts().filter(item => (item.overview ?? 'general') === pageId)])
  },

  saveDraft(draft: ActivityItem) {
    writeDrafts([...readDrafts(), clone(draft)])
  },

  updateActivity(activity: ActivityItem): ActivityItem {
    if (activity.id.startsWith('draft-')) {
      writeDrafts(readDrafts().map(item => item.id === activity.id ? activity : item))
    }
    return clone(activity)
  },

  publishActivity(activity: ActivityItem): ActivityItem {
    const published = { ...activity, status: '已发布' as const }
    return this.updateActivity(published)
  },

  getReviewActivities(): ReviewActivity[] {
    return clone(endedActivities)
  },

  getSubmittedMembers(): SubmittedMember[] {
    return clone(submittedMembers)
  },
}
