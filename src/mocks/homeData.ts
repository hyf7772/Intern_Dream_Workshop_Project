import type { ModuleItem } from '../types/task'

export const internModules: ModuleItem[] = [
  { id: 'recruit', name: '新星招募局', summary: '简历初筛、性格分析与实习生入营准备', className: 'hotspot--recruit' },
  { id: 'profile', name: '新星图鉴馆', summary: '查看能力标签、人才画像与个人成长轨迹', className: 'hotspot--profile', previewImage: '/assets/intern-profile-gallery.png', previewAlt: '新星图鉴个人画像' },
  { id: 'report', name: '通关成长册', summary: '沉淀实习回顾、阶段成果与最终成长报告', className: 'hotspot--report' },
  { id: 'tasks', name: '任务中心', summary: '进入新手任务、主线任务与专业任务', className: 'hotspot--tasks', badge: 3 },
  { id: 'ranking', name: '荣耀排位场', summary: '查看星愿值、成长排行与积分激励', className: 'hotspot--ranking' },
  { id: 'learning', name: '技能修炼馆', summary: '进入课程中心并查看学习计划与进度', className: 'hotspot--learning' },
  { id: 'assistant', name: 'AI新手村', summary: '向AI成长助手咨询制度、活动与实习问题', className: 'hotspot--assistant' },
]

export const adminModules: ModuleItem[] = [
  { id: 'resume', name: '实习生简历', summary: '查看和筛选实习生简历，快速掌握候选人基础信息', className: 'hotspot--recruit' },
  { id: 'profile', name: '实习生画像', summary: '沉淀能力标签与成长轨迹，形成可视化人才画像', className: 'hotspot--profile', previewImage: '/assets/admin-profile-overview.png', previewAlt: '新星图鉴管理总览' },
  { id: 'report', name: '成长报告设置', summary: '配置报告周期、评价维度和阶段性成果展示方式', className: 'hotspot--report' },
  { id: 'activities', name: '活动配置中心', summary: '统一发布、跟进与复盘通用活动和专业实践活动', className: 'hotspot--tasks', badge: 3 },
  { id: 'ranking', name: '星愿值排名', summary: '查看实习生星愿值、成长排名与激励积分表现', className: 'hotspot--ranking' },
  { id: 'learning', name: '课程配置', summary: '维护学习课程、课件内容与实习生成长计划', className: 'hotspot--learning' },
  { id: 'assistant', name: '问答资料库', summary: '管理常见问题、制度资料与智能问答知识库', className: 'hotspot--assistant' },
]
