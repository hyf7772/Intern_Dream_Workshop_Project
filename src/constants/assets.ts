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

export const profileAvatars = {
  activityManager: `${ICON_ROOT}/84f9a030-1d33-4277-ae62-c6b020ad10af.png`,
  intern: `${ICON_ROOT}/23926e49-04d6-4b2a-adea-5b04b541825f.png`,
  mentor: `${ICON_ROOT}/mentor-avatar.png`,
} as const

export const loginMascotIcons = {
  brand: `${ICON_ROOT}/288283da-c07f-4a5c-9201-79aeca8f9581.png`,
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

export const taskIcons = {
  checklist: sharedActivityIcon,
  taskPlan: `${ICON_ROOT}/3f1209a7-1fe2-4de0-8204-743413d5e115.png`,
  sports: `${ICON_ROOT}/f0b9227d-af7b-4e37-9581-1c382bdef72b.png`,
  branchVisit: `${ICON_ROOT}/877f1149-c894-487f-857d-6be5ce94bca1.png`,
  announcement: `${ICON_ROOT}/605370fc-2e18-4d89-ae13-42e952ba5de5.png`,
  communication: `${ICON_ROOT}/7d7ad457-d4e0-487a-a725-2ca44ea3a0ae.png`,
  handbook: `${ICON_ROOT}/f631f4ee-e48a-49e1-8dec-6d722b6b26b5.png`,
} as const
