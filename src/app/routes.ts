import type { ActivityPageId } from '../types/activity'
import type { UserRole } from '../types/auth'
import type { PointsPageId } from '../types/points'
import type { TaskPageId } from '../types/task'

export type AppRoute =
  | { kind: 'home' }
  | { kind: 'tasks'; pageId: TaskPageId }
  | { kind: 'activities'; pageId: ActivityPageId }
  | { kind: 'points'; pageId: PointsPageId }

const taskPageIds: TaskPageId[] = ['newcomer', 'mainline', 'professional']
const activityPageIds: ActivityPageId[] = ['general', 'professional', 'publish', 'review', 'review-professional']
const pointsPageIds: PointsPageId[] = ['ranking', 'gifts', 'redemptions']

const isTaskPageId = (value: string): value is TaskPageId => taskPageIds.includes(value as TaskPageId)
const isActivityPageId = (value: string): value is ActivityPageId => activityPageIds.includes(value as ActivityPageId)
const isPointsPageId = (value: string): value is PointsPageId => pointsPageIds.includes(value as PointsPageId)

export const parseHashRoute = (hash: string): AppRoute => {
  const path = hash.startsWith('#') ? hash.slice(1) : hash
  const [section, pageId] = path.split('/').filter(Boolean)

  if (section === 'tasks' && pageId && isTaskPageId(pageId)) return { kind: 'tasks', pageId }
  if (section === 'activities' && pageId && isActivityPageId(pageId)) return { kind: 'activities', pageId }
  if (section === 'points' && pageId && isPointsPageId(pageId)) return { kind: 'points', pageId }
  return { kind: 'home' }
}

export const routeToHash = (route: AppRoute): string => {
  if (route.kind === 'home') return ''
  return `#/${route.kind}/${route.pageId}`
}

export const canAccessRoute = (route: AppRoute, role: UserRole): boolean => (
  route.kind !== 'activities' && route.kind !== 'points' || role === 'admin'
)
