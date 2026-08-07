import { taskIcons } from '../constants/assets'
import type { TaskPageConfig, TaskPageId, UserSummary } from '../types/task'

export const mockUser: UserSummary = { displayName: '梦想实习生', level: 6, stars: 1280 }

export const mockTaskPages: Record<TaskPageId, TaskPageConfig> = {
  newcomer: {
    id: 'newcomer', title: '新手任务', subtitle: '完成入职准备，开启梦工场旅程',
    stats: { completed: 3, total: 5, stars: 120, daysRemaining: 5 },
    sections: [
      { id: 'onboarding', title: '入职准备', eyebrow: '快速完成资料与合规准备', tasks: [
        { id: 'resume-upload', icon: taskIcons.checklist, title: '上传个人简历', description: '提交最新版简历，建立个人成长档案', status: '待上传', reward: 30, action: '上传简历', actionDone: '已上传' },
        { id: 'resume-improve', icon: taskIcons.taskPlan, title: '完善个人简历', description: '根据AI建议补充项目成果与专业技能', progress: 75, progressLabel: '完整度 75%', reward: 50, action: '继续完善', actionDone: '已更新' },
        { id: 'office-rules', icon: taskIcons.handbook, title: '阅读实习办公要求', description: '了解办公规范、信息安全与保密要求', progress: 67, progressLabel: '阅读 2/3', reward: 40, action: '继续阅读', actionDone: '已阅读' },
      ] },
      { id: 'newcomer-events', title: '新人活动', eyebrow: '认识分行、导师与同期伙伴', tasks: [
        { id: 'welcome-meeting', icon: taskIcons.communication, title: '暑期实习生见面会', description: '人力资源部 · 实习安排介绍与新人破冰交流', meta: '8月3日 14:30 · 培训室', reward: 60, action: '立即报名', actionDone: '已报名' },
        { id: 'branch-tour', icon: taskIcons.branchVisit, title: '分行探索之旅', description: '参观办公区域，了解部门职能与分行文化', status: '剩余18名额', reward: 50, action: '查看活动', actionDone: '已查看' },
      ] },
    ],
  },
  mainline: {
    id: 'mainline', title: '主线任务', subtitle: '解锁本周重点，积累成长能量',
    stats: { completed: 3, total: 5, stars: 260, daysRemaining: 2 },
    sections: [
      { id: 'weekly-focus', title: '本周重点', eyebrow: '优先完成本周核心成长事项', tasks: [
        { id: 'weekly-course', icon: taskIcons.handbook, title: '完成本周视频课学习计划', description: '银行基础知识、服务礼仪与信息安全', progress: 67, progressLabel: '进度 2/3', meta: '剩余约25分钟', reward: 100, action: '继续学习', actionDone: '已进入课程', recommended: true },
        { id: 'service-experience', icon: taskIcons.sports, title: '客户服务体验活动', description: '参与活动并提交一份匿名观察记录', status: '已报名', meta: '剩余2天', reward: 120, action: '查看任务', actionDone: '已查看' },
      ] },
      { id: 'featured-events', title: '精选活动', eyebrow: '人力资源部根据培养阶段为你推荐', tasks: [
        { id: 'youth-sharing', icon: taskIcons.communication, title: '青年员工成长分享会', description: '从实习生成长为青年骨干', meta: '周五 15:00 · 线上直播', reward: 60, action: '立即报名', actionDone: '已报名', recommended: true },
        { id: 'finance-lecture', icon: taskIcons.announcement, title: '金融知识专题活动', description: '结合案例了解金融服务与风险意识', status: '报名中', reward: 50, action: '查看活动', actionDone: '已查看' },
        { id: 'department-exchange', icon: taskIcons.branchVisit, title: '跨部门交流工作坊', description: '与不同岗位实习生共同完成主题交流', meta: '下周二 14:00', reward: 50, action: '了解详情', actionDone: '已查看' },
      ] },
    ],
  },
  professional: {
    id: 'professional', title: '专业任务', subtitle: '完成岗位实践，解锁专业能力标签',
    stats: { completed: 2, total: 5, stars: 140, daysRemaining: 4 },
    mentor: { name: '陈老师', department: '零售金融部', weeklyGuidance: '观察厅堂服务流程，重点关注客户需求识别', latestFeedback: '沟通主动性较好，可进一步提升产品理解', nextMeeting: '8月2日 16:00', status: '待沟通' },
    complianceNotice: '请勿记录客户姓名、账号、联系方式及其他敏感信息；所有客户服务实践须在导师指导下完成。',
    sections: [
      { id: 'role-standards', title: '岗位标准任务', eyebrow: '当前岗位：零售业务岗 · 本周重点：客户服务与沟通表达', tasks: [
        { id: 'greet-customer', icon: taskIcons.announcement, title: '迎接1位客户', description: '在工作人员指导下完成规范问候', progress: 0, progressLabel: '0/1', reward: 30, ability: '服务意识', action: '开始任务', actionDone: '进行中', recommended: true },
        { id: 'business-guidance', icon: taskIcons.taskPlan, title: '完成一次业务指引', description: '准确说明办理区域和基本流程', status: '进行中', reward: 40, ability: '沟通表达', action: '记录完成', actionDone: '已记录' },
        { id: 'hall-observation', icon: taskIcons.branchVisit, title: '观察一次厅堂服务', description: '提交一条不含客户敏感信息的匿名记录', progress: 0, progressLabel: '0/1', reward: 40, ability: '需求洞察', action: '填写记录', actionDone: '已填写' },
        { id: 'business-area', icon: taskIcons.handbook, title: '熟悉常见业务区域', description: '了解现金区、非现金区和智能服务区', progress: 67, progressLabel: '2/3', reward: 30, ability: '业务认知', action: '继续了解', actionDone: '已更新' },
        { id: 'service-review', icon: taskIcons.checklist, title: '完成一次服务复盘', description: '回顾服务过程，记录收获和改进方向', progress: 0, progressLabel: '0/1', reward: 50, ability: '复盘能力', action: '开始复盘', actionDone: '进行中' },
      ] },
    ],
  },
}
