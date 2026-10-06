import type { ReviewActivity, SubmittedMember } from '../types/activity'

export const endedActivities: ReviewActivity[] = [
  { id: 'orientation', name: '实习生入职培训', type: '成长培训', publisher: '孙浩哲', department: '人力资源部', date: '2026-08-12', time: '09:00 ~ 17:00', location: '分行4F会议室', submitted: 120, participants: 120, points: 0, average: 60, reviewStatus: '待复盘', icon: '📖', files: ['签到记录.xlsx', '培训反馈汇总.pdf', '活动照片.zip'], positionType: '运营岗位' },
  { id: 'forum', name: '实习生座谈会', type: '交流座谈', publisher: '阳洁', department: '人力资源部', date: '2026-08-10', time: '14:00 ~ 16:00', location: '多功能会议厅', submitted: 40, participants: 40, points: 1600, average: 40, reviewStatus: '已结束', icon: '👥', files: ['座谈纪要.xlsx', '现场照片.zip'], positionType: '零售岗位' },
  { id: 'company-walk', name: '喵厂 company walk', type: '文化体验', publisher: '李然', department: '人力资源部', date: '2026-08-06', time: '15:00 ~ 16:30', location: '园区主要路线', submitted: 51, participants: 51, points: 1530, average: 30, reviewStatus: '已结束', icon: '🐾', files: ['路线说明.pdf', '活动照片.zip'], positionType: '其他' },
  { id: 'report', name: '结业汇报', type: '成果展示', publisher: '朱彦绮', department: '人力资源部', date: '2026-08-16', time: '13:30 ~ 17:00', location: '演讲厅 B 区', submitted: 64, participants: 64, points: 3840, average: 60, reviewStatus: '已结束', icon: '📊', files: ['汇报评分表.xlsx', '优秀作品集.pdf'], positionType: '公司岗位' },
  { id: 'basketball', name: '梦工场篮球活动赛', type: '文体活动', publisher: '朱彦绮', department: '人力资源部', date: '2026-08-18', time: '19:00 ~ 21:00', location: '园区篮球场', submitted: 80, participants: 80, points: 4800, average: 60, reviewStatus: '已结束', icon: '🏀', files: ['赛程记录.xlsx', '活动照片.zip'], positionType: '其他' },
  { id: 'sharing', name: '行业分享会', type: '经验交流', publisher: '周诗', department: '市场拓展部', date: '2026-08-05', time: '14:00 ~ 16:00', location: '培训室 B', submitted: 68, participants: 68, points: 2720, average: 40, reviewStatus: '已结束', icon: '💬', files: ['分享资料.pdf', '签到记录.xlsx'], positionType: '公司岗位' },
]

export const submittedMembers: SubmittedMember[] = [
  { name: '李明轩', initials: '李', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 17:05', tone: 'green' },
  { name: '王涵瑜', initials: '王', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 16:58', tone: 'orange' },
  { name: '张子涵', initials: '张', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 16:42', tone: 'blue' },
  { name: '赵雅', initials: '赵', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 16:35', tone: 'purple' },
]
