import type { NavigationId, TaskPageId } from '../types/task'

export const taskPageOrder: TaskPageId[] = ['newcomer', 'mainline', 'professional']

export const navigationItems: Array<{ id: NavigationId; label: string }> = [
  { id: 'home', label: '梦工场' },
  { id: 'tasks', label: '任务' },
  { id: 'growth', label: '成长' },
  { id: 'points', label: '积分' },
  { id: 'mine', label: '我的' },
]
