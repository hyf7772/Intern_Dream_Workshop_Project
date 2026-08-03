import type { ModuleItem } from '../types/task'

export const mockModules: ModuleItem[] = [
  { id: 'recruit', name: '新星招募局', summary: '简历初筛、性格分析与实习生入营准备', className: 'hotspot--recruit' },
  { id: 'profile', name: '新星图鉴馆', summary: '查看能力标签、人才画像与个人成长轨迹', className: 'hotspot--profile' },
  { id: 'report', name: '通关成长册', summary: '沉淀实习回顾、阶段成果与最终成长报告', className: 'hotspot--report' },
  { id: 'tasks', name: '任务中心', summary: '进入新手任务、主线任务与专业任务', className: 'hotspot--tasks', badge: 3 },
  { id: 'ranking', name: '荣耀排位场', summary: '查看星愿值、成长排行与积分激励', className: 'hotspot--ranking' },
  { id: 'learning', name: '技能修炼馆', summary: '进入课程中心并查看学习计划与进度', className: 'hotspot--learning' },
  { id: 'assistant', name: 'AI新手村', summary: '向AI成长助手咨询制度、活动与实习问题', className: 'hotspot--assistant' },
]

