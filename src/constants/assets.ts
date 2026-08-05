import type { NavigationId, TaskPageId } from '../types/task'

const ICON_ROOT = '/assets/icons'

export const statIcons = {
  completion: `${ICON_ROOT}/stat-complete.png`,
  stars: `${ICON_ROOT}/stat-star.png`,
  calendar: `${ICON_ROOT}/stat-calendar.png`,
} as const

export const activityConfigIcons = {
  general: `${ICON_ROOT}/activity-overview-general.png`,
  professional: `${ICON_ROOT}/activity-overview-professional.png`,
  publish: `${ICON_ROOT}/activity-publish.png`,
  review: `${ICON_ROOT}/activity-review.png`,
  stats: {
    weekly: `${ICON_ROOT}/stat-weekly-activities.png`,
    inProgress: `${ICON_ROOT}/stat-in-progress-tasks.png`,
    completed: `${ICON_ROOT}/stat-completed-tasks.png`,
    pendingReview: `${ICON_ROOT}/stat-pending-review.png`,
  },
} as const

export const categoryIcons: Record<TaskPageId, string> = {
  newcomer: `${ICON_ROOT}/category-newcomer.png`,
  mainline: `${ICON_ROOT}/category-mainline.png`,
  professional: `${ICON_ROOT}/category-professional.png`,
}

export const navigationIcons: Record<NavigationId, string> = {
  home: `${ICON_ROOT}/nav-home.png`,
  tasks: `${ICON_ROOT}/nav-task.png`,
  growth: `${ICON_ROOT}/nav-growth.png`,
  points: `${ICON_ROOT}/nav-points.png`,
  mine: `${ICON_ROOT}/nav-profile.png`,
}

export const sharedActivityIcon = `${ICON_ROOT}/activity-shared.png`
