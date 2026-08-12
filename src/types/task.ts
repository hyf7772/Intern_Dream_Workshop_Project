export type TaskPageId = 'newcomer' | 'mainline' | 'professional'

export type NavigationId = 'home' | 'tasks' | 'growth' | 'points' | 'mine'

export interface ModuleItem {
  id: string
  name: string
  summary: string
  className: string
  badge?: number
  previewImage?: string
  previewAlt?: string
}

export interface TaskStats {
  completed: number
  total: number
  stars: number
  daysRemaining: number
}

export interface TaskItem {
  id: string
  icon: string
  title: string
  description: string
  status?: string
  progress?: number
  progressLabel?: string
  meta?: string
  reward?: number
  ability?: string
  action: string
  actionDone?: string
  recommended?: boolean
}

export interface TaskSection {
  id: string
  title: string
  eyebrow?: string
  tasks: TaskItem[]
}

export interface MentorInfo {
  name: string
  department: string
  weeklyGuidance: string
  latestFeedback: string
  nextMeeting: string
  status: string
}

export interface TaskPageConfig {
  id: TaskPageId
  title: string
  subtitle: string
  stats: TaskStats
  sections: TaskSection[]
  mentor?: MentorInfo
  complianceNotice?: string
}

export interface UserSummary {
  displayName: string
  level: number
  stars: number
}
