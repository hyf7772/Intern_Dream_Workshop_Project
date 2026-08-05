export type ActivityOverviewId = 'general' | 'professional'

export type ActivityStatus = '未发布' | '报名中' | '进行中' | '已结束'

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
}

export interface ActivityOverviewConfig {
  id: ActivityOverviewId
  title: string
  subtitle: string
  stats: Array<{ label: string; value: number; icon: string }>
  items: ActivityItem[]
}
