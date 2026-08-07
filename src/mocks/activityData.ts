import type { ActivityOverviewConfig } from '../types/activity'
import { activityConfigIcons } from '../constants/assets'

export const activityOverviews: Record<ActivityOverviewConfig['id'], ActivityOverviewConfig> = {
  general: {
    id: 'general',
    title: '通用活动总览',
    subtitle: '统一查看与管理实习生活动',
    stats: [
      { label: '本周活动数量', value: 12, icon: activityConfigIcons.stats.weekly },
      { label: '进行中任务数量', value: 5, icon: activityConfigIcons.stats.inProgress },
      { label: '已完成任务数量', value: 18, icon: activityConfigIcons.stats.completed },
      { label: '待复盘活动数量', value: 4, icon: activityConfigIcons.stats.pendingReview },
    ],
    items: [
      { id: 'new-employee-class', name: '职场进阶 我有一招 新员工小课堂', type: '成长培训', publisher: '阳洁', department: '人力资源部', date: '2026-08-05', time: '14:00 ~ 16:00', location: '分行培训室 A', enrollment: '36/50', stars: 30, status: '未发布', icon: '🎓' },
      { id: 'five-call', name: '五连 call 打卡', type: '成长打卡', publisher: '孙浩哲', department: '人力资源部', date: '2026-08-06', time: '09:00 ~ 18:00', location: '线上 + 线下', enrollment: '80/100', stars: 50, status: '报名中', icon: '📞' },
      { id: 'outreach', name: '素质拓展活动', type: '团队共创', publisher: '李然', department: '人力资源部', date: '2026-08-08', time: '09:30 ~ 17:30', location: '青龙湖拓展基地', enrollment: '45/60', stars: 60, status: '进行中', icon: '⛺' },
      { id: 'forum', name: '实习生座谈会', type: '交流座谈', publisher: '阳洁', department: '人力资源部', date: '2026-08-10', time: '14:00 ~ 16:00', location: '多功能会议厅', enrollment: '28/40', stars: 40, status: '报名中', icon: '👥' },
      { id: 'orientation', name: '实习生入职培训', type: '成长培训', publisher: '孙浩哲', department: '人力资源部', date: '2026-08-12', time: '09:00 ~ 17:00', location: '分行培训室 A', enrollment: '120/120', stars: 60, status: '已结束', icon: '📖' },
      { id: 'company-walk', name: '喵厂 company walk', type: '文化体验', publisher: '李然', department: '人力资源部', date: '2026-08-14', time: '15:00 ~ 16:30', location: '园区主要路线', enrollment: '51/80', stars: 30, status: '进行中', icon: '🐾' },
      { id: 'basketball', name: '梦工场篮球活动赛', type: '文体活动', publisher: '朱彦绮', department: '人力资源部', date: '2026-08-16', time: '18:30 ~ 20:30', location: '园区篮球馆', enrollment: '64/80', stars: 50, status: '报名中', icon: '🏀' },
      { id: 'six-growth', name: '成长六计——沉浸式打卡挑战赛', type: '成长打卡', publisher: '阳洁', department: '人力资源部', date: '2026-08-18', time: '09:00 ~ 18:00', location: '线上', enrollment: '170/200', stars: 60, status: '未发布', icon: '🏆' },
    ],
  },
  professional: {
    id: 'professional',
    title: '专业活动总览',
    subtitle: '按岗位查看与管理专业实践活动',
    stats: [
      { label: '本周活动数量', value: 6, icon: activityConfigIcons.stats.weekly },
      { label: '进行中任务数量', value: 3, icon: activityConfigIcons.stats.inProgress },
      { label: '已完成任务数量', value: 9, icon: activityConfigIcons.stats.completed },
      { label: '待复盘活动数量', value: 2, icon: activityConfigIcons.stats.pendingReview },
    ],
    items: [
      { id: 'refer-client', name: '转介三个客户（厅堂岗位）', type: '客户服务', publisher: '赵琳', department: '零售金融部', date: '2026-08-05', time: '09:00 ~ 12:00', location: '营业厅 A 区', enrollment: '12/20', stars: 40, status: '未发布', icon: '👥' },
      { id: 'corporate-visit', name: '协助一场上企活动（市场岗位）', type: '市场拓展', publisher: '周琪', department: '市场拓展部', date: '2026-08-06', time: '14:00 ~ 17:00', location: '企业客户现场', enrollment: '8/12', stars: 50, status: '报名中', icon: '🏠' },
      { id: 'credit-report', name: '协助撰写一篇授信报告（对公岗位）', type: '对公业务', publisher: '何川', department: '公司金融部', date: '2026-08-07', time: '10:00 ~ 15:00', location: '对公业务部', enrollment: '15/20', stars: 60, status: '进行中', icon: '📄' },
      { id: 'customer-service', name: '客户接待流程演练（零售岗位）', type: '客户服务', publisher: '赵琳', department: '零售金融部', date: '2026-08-08', time: '09:30 ~ 11:30', location: '培训室 B', enrollment: '18/25', stars: 40, status: '报名中', icon: '🤵' },
      { id: 'wealth-products', name: '理财产品讲解实战（财富岗位）', type: '产品营销', publisher: '李文', department: '财富管理部', date: '2026-08-10', time: '15:00 ~ 17:30', location: '营业厅 A 区', enrollment: '20/30', stars: 50, status: '进行中', icon: '💴' },
      { id: 'morning-meeting', name: '协助整理晨会纪要（综合支持）', type: '运营支持', publisher: '赵琳', department: '综合管理部', date: '2026-08-11', time: '09:00 ~ 11:00', location: '会议室 3', enrollment: '10/15', stars: 30, status: '已结束', icon: '📃' },
      { id: 'negotiation', name: '营销话术情景模拟（市场岗位）', type: '市场拓展', publisher: '周琪', department: '市场拓展部', date: '2026-08-12', time: '14:00 ~ 16:30', location: '培训室 B', enrollment: '14/20', stars: 40, status: '报名中', icon: '🛍️' },
    ],
  },
}
