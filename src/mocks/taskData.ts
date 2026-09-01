import { taskIcons } from '../constants/assets'
import type { TaskPageConfig, TaskPageId, UserSummary } from '../types/task'

export const mockUser: UserSummary = { displayName: '梦想实习生', level: 6, stars: 1280 }

export const mockTaskPages: Record<TaskPageId, TaskPageConfig> = {
  newcomer: {
    id: 'newcomer', title: '新手任务', subtitle: '完成入职准备，开启梦工场旅程',
    stats: { completed: 3, total: 7, stars: 120, daysRemaining: 5 },
    sections: [
      { id: 'newcomer-tasks', title: '新手任务', tasks: [
        { id: 'resume-upload', icon: taskIcons.checklist, title: '上传个人简历', description: '提交最新版简历，建立个人成长档案', status: 'pending', reward: 30 },
        { id: 'resume-improve', icon: taskIcons.taskPlan, title: '完善个人简历', description: '根据AI建议补充项目成果与专业技能', status: 'in_progress', progress: 75, progressLabel: '完整度 75%', reward: 50 },
        { id: 'education-verification', icon: taskIcons.taskPlan, title: '上传学历认证报告', description: '提交学历认证报告，完善实习生身份资料', status: 'pending', reward: 40 },
        { id: 'compliance-training', icon: taskIcons.handbook, title: '完成合规保密培训', description: '学习信息安全与保密规范，完成培训测试', status: 'completed', reward: 50 },
        { id: 'office-rules', icon: taskIcons.handbook, title: '阅读实习办公要求', description: '了解办公规范、信息安全与保密要求', status: 'completed', progress: 67, progressLabel: '阅读 2/3', reward: 40 },
        { id: 'welcome-meeting', icon: taskIcons.communication, title: '暑期实习生见面会', description: '人力资源部 · 实习安排介绍与新人破冰交流', status: 'pending', meta: '8月3日 14:30 · 培训室', reward: 60 },
        { id: 'branch-tour', icon: taskIcons.branchVisit, title: '分行探索之旅', description: '参观办公区域，了解部门职能与分行文化', status: 'completed', meta: '剩余18名额', reward: 50 },
      ] },
    ],
  },
  mainline: {
    id: 'mainline', title: '主线任务', subtitle: '解锁本周重点，积累成长能量',
    stats: { completed: 3, total: 5, stars: 260, daysRemaining: 2 },
    sections: [
      { id: 'mainline-tasks', title: '主线任务', tasks: [
        { id: 'weekly-course', icon: taskIcons.handbook, title: '完成本周视频课学习计划', description: '银行基础知识、服务礼仪与信息安全', status: 'in_progress', progress: 67, progressLabel: '进度 2/3', meta: '剩余约25分钟', reward: 100 },
        { id: 'service-experience', icon: taskIcons.sports, title: '客户服务体验活动', description: '参与活动并提交一份匿名观察记录', status: 'completed', meta: '剩余2天', reward: 120 },
        { id: 'youth-sharing', icon: taskIcons.communication, title: '青年员工成长分享会', description: '从实习生成长为青年骨干', status: 'pending', meta: '周五 15:00 · 线上直播', reward: 60 },
        { id: 'finance-lecture', icon: taskIcons.announcement, title: '金融知识专题活动', description: '结合案例了解金融服务与风险意识', status: 'completed', reward: 50 },
        { id: 'department-exchange', icon: taskIcons.branchVisit, title: '跨部门交流工作坊', description: '与不同岗位实习生共同完成主题交流', status: 'completed', meta: '下周二 14:00', reward: 50 },
      ] },
    ],
  },
  professional: {
    id: 'professional', title: '专业任务', subtitle: '完成岗位实践，解锁专业能力标签',
    stats: { completed: 2, total: 5, stars: 140, daysRemaining: 4 },
    sections: [
      { id: 'professional-tasks', title: '专业任务', tasks: [
        { id: 'greet-customer', icon: taskIcons.announcement, title: '迎接1位客户', description: '在工作人员指导下完成规范问候', status: 'pending', progress: 0, progressLabel: '0/1', reward: 30 },
        { id: 'business-guidance', icon: taskIcons.taskPlan, title: '完成一次业务指引', description: '准确说明办理区域和基本流程', status: 'in_progress', reward: 40 },
        { id: 'hall-observation', icon: taskIcons.branchVisit, title: '观察一次厅堂服务', description: '提交一条不含客户敏感信息的匿名记录', status: 'pending', progress: 0, progressLabel: '0/1', reward: 40 },
        { id: 'business-area', icon: taskIcons.handbook, title: '熟悉常见业务区域', description: '了解现金区、非现金区和智能服务区', status: 'completed', progress: 67, progressLabel: '阅读 2/3', reward: 30 },
        { id: 'service-review', icon: taskIcons.checklist, title: '完成一次服务复盘', description: '回顾服务过程，记录收获和改进方向', status: 'completed', progress: 0, progressLabel: '0/1', reward: 50 },
      ] },
    ],
  },
}
