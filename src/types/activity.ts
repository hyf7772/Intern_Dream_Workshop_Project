export type ActivityOverviewId = 'general' | 'professional'
export type ActivityPageId = ActivityOverviewId | 'publish' | 'review' | 'review-professional'

export type ActivityStatus = '草稿' | '已发布' | '待复盘' | '已复盘'

export interface ActivityItem {
  id: string
  name: string
  type: string
  publisher: string
  department: string
  date: string
  time: string
  location: string
  enrollment: string
  stars: number
  status: ActivityStatus
  icon: string
  positionType?: '零售岗位' | '公司岗位' | '运营岗位' | '其他'
  participants?: string
  content?: string
  requirements?: string[]
  attachments?: string[]
  overview?: ActivityOverviewId
}

export interface ActivityOverviewConfig {
  id: ActivityOverviewId
  title: string
  subtitle: string
  stats: Array<{ label: string; value: number; icon: string }>
  items: ActivityItem[]
}

export interface ReviewActivity {
  id: string
  name: string
  type: string
  publisher: string
  department: string
  date: string
  time: string
  location: string
  submitted: number
  participants: number
  points: number
  average: number
  reviewStatus: '待复盘' | '已结束'
  icon: string
  files: string[]
  positionType?: '零售岗位' | '公司岗位' | '运营岗位' | '其他'
}

export interface SubmittedMember {
  name: string
  initials: string
  tags: string[]
  time: string
  tone: string
}
