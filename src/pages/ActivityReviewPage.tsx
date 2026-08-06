import { useEffect, useMemo, useState } from 'react'
import { activityConfigIcons, statIcons } from '../constants/assets'
import type { ActivityPageId } from '../types/activity'

interface ActivityReviewPageProps {
  onPageChange: (pageId: ActivityPageId) => void
  onHome: () => void
}

interface ReviewActivity {
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
}

const endedActivities: ReviewActivity[] = [
  { id: 'orientation', name: '实习生入职培训', type: '成长培训', publisher: '王琳', department: '培训发展部', date: '2026-08-12', time: '09:00 ~ 17:00', location: '总部培训室 A', submitted: 120, participants: 120, points: 0, average: 60, reviewStatus: '待复盘', icon: '📖', files: ['签到记录.xlsx', '培训反馈汇总.pdf', '活动照片.zip'] },
  { id: 'forum', name: '实习生座谈会', type: '交流座谈', publisher: '张悦', department: '人力资源部', date: '2026-08-10', time: '14:00 ~ 16:00', location: '多功能会议厅', submitted: 40, participants: 40, points: 1600, average: 40, reviewStatus: '已结束', icon: '👥', files: ['座谈纪要.xlsx', '现场照片.zip'] },
  { id: 'company-walk', name: '喵厂 company walk', type: '文化体验', publisher: '李然', department: '企业文化部', date: '2026-08-06', time: '15:00 ~ 16:30', location: '园区主要路线', submitted: 51, participants: 51, points: 1530, average: 30, reviewStatus: '已结束', icon: '🐾', files: ['路线说明.pdf', '活动照片.zip'] },
  { id: 'report', name: '结业汇报', type: '成果展示', publisher: '陈宇', department: '行政管理部', date: '2026-08-16', time: '13:30 ~ 17:00', location: '演讲厅 B 区', submitted: 64, participants: 64, points: 3840, average: 60, reviewStatus: '已结束', icon: '📊', files: ['汇报评分表.xlsx', '优秀作品集.pdf'] },
  { id: 'basketball', name: '梦工场篮球活动赛', type: '文体活动', publisher: '陈宇', department: '行政管理部', date: '2026-08-18', time: '19:00 ~ 21:00', location: '园区篮球场', submitted: 80, participants: 80, points: 4800, average: 60, reviewStatus: '已结束', icon: '🏀', files: ['赛程记录.xlsx', '活动照片.zip'] },
  { id: 'sharing', name: '行业分享会', type: '经验交流', publisher: '周诗', department: '市场拓展部', date: '2026-08-05', time: '14:00 ~ 16:00', location: '培训室 B', submitted: 68, participants: 68, points: 2720, average: 40, reviewStatus: '已结束', icon: '💬', files: ['分享资料.pdf', '签到记录.xlsx'] },
]

const submittedMembers = [
  { name: '李明轩', initials: '李', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 17:05', tone: 'green' },
  { name: '王涵瑜', initials: '王', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 16:58', tone: 'orange' },
  { name: '张子涵', initials: '张', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 16:42', tone: 'blue' },
  { name: '赵雅', initials: '赵', tags: ['学习心得已提交', '现场照片已上传', '培训反馈表已完成'], time: '08-12 16:35', tone: 'purple' },
]

const fileType: Record<string, string> = { xlsx: 'XLS', pdf: 'PDF', zip: 'ZIP' }

export function ActivityReviewPage({ onPageChange, onHome }: ActivityReviewPageProps) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [selectedId, setSelectedId] = useState(endedActivities[0].id)
  const [notice, setNotice] = useState('')
  const [publishedIds, setPublishedIds] = useState<string[]>(endedActivities.filter(activity => activity.points > 0).map(activity => activity.id))

  const filteredActivities = useMemo(() => endedActivities.filter(activity => {
    const normalizedQuery = query.trim().toLowerCase()
    return (!type || activity.type === type)
      && (!date || activity.date === date)
      && (!normalizedQuery || [activity.name, activity.publisher, activity.department, activity.location].join(' ').toLowerCase().includes(normalizedQuery))
  }), [query, type, date])
  const selected = filteredActivities.find(activity => activity.id === selectedId) ?? filteredActivities[0] ?? endedActivities[0]
  const types = Array.from(new Set(endedActivities.map(activity => activity.type)))
  const pendingPoints = endedActivities.filter(activity => !publishedIds.includes(activity.id)).reduce((total, activity) => total + activity.submitted * activity.average, 0)

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2400)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const publishPoints = (activity: ReviewActivity) => {
    setPublishedIds(previous => previous.includes(activity.id) ? previous : [...previous, activity.id])
    setNotice(`已为“${activity.name}”发布 ${activity.submitted * activity.average} 星愿值`)
  }

  return (
    <main className="activity-review-page">
      <header className="activity-header">
        <button className="activity-brand" type="button" onClick={onHome} aria-label="返回梦工场首页"><img className="activity-brand__icon" src={activityConfigIcons.review} alt="" aria-hidden="true" /></button>
        <div className="activity-heading">
          <p className="activity-crumb">梦工场 <span>›</span> 活动配置中心 <span>›</span> 活动复盘</p>
          <h1>活动复盘 <i>✦</i></h1>
          <p>查看已结束活动结果与成长反馈</p>
        </div>
        <aside className="activity-user-card" aria-label="当前登录用户">
          <div className="activity-user-card__avatar" aria-hidden="true">👩🏻‍💼</div>
          <div><strong>张悦</strong><small>活动配置中心</small></div>
        </aside>
      </header>

      <section className="activity-review-stats" aria-label="活动复盘数据概览">
        <div className="review-stat"><span className="review-stat-icon is-calendar">▦</span><div><span>已结束活动数量</span><strong>18</strong></div></div>
        <div className="review-stat"><span className="review-stat-icon is-star"><img src={statIcons.stars} alt="" aria-hidden="true" /></span><div><span>待发放积分数量</span><strong>{pendingPoints.toLocaleString()}</strong></div></div>
        <div className="review-stat"><span className="review-stat-icon is-people">♟</span><div><span>已提交成果人数</span><strong>456</strong></div></div>
        <div className="review-stat"><span className="review-stat-icon is-review">☷</span><div><span>待处理复盘数量</span><strong>5</strong></div></div>
      </section>

      <section className="activity-review-layout">
        <aside className="activity-sidebar activity-review-sidebar">
          <h2>功能模块</h2>
          <nav aria-label="活动配置功能导航">
            <button type="button" onClick={() => onPageChange('general')}><img className="activity-nav-icon" src={activityConfigIcons.general} alt="" aria-hidden="true" />通用活动总览<i>›</i></button>
            <button type="button" onClick={() => onPageChange('professional')}><img className="activity-nav-icon" src={activityConfigIcons.professional} alt="" aria-hidden="true" />专业活动总览<i>›</i></button>
            <button type="button" onClick={() => onPageChange('publish')}><img className="activity-nav-icon" src={activityConfigIcons.publish} alt="" aria-hidden="true" />活动发布<i>›</i></button>
            <button className="is-selected" type="button" onClick={() => onPageChange('review')}><img className="activity-nav-icon" src={activityConfigIcons.review} alt="" aria-hidden="true" />活动复盘<i>›</i></button>
          </nav>
          <div className="activity-sidebar__illustration"><img src={activityConfigIcons.review} alt="活动复盘插画" /><strong>活动复盘管理</strong><p>复盘活动成效，驱动持续优化</p></div>
        </aside>

        <section className="activity-review-content">
          <div className="review-filters" aria-label="活动复盘筛选条件">
            <select value={type} onChange={event => setType(event.target.value)} aria-label="按活动类型搜索"><option value="">按活动类型搜索</option>{types.map(item => <option key={item}>{item}</option>)}</select>
            <label className="review-date"><span>按时间搜索</span><input type="date" value={date} onChange={event => setDate(event.target.value)} aria-label="按时间搜索" /></label>
            <label className="review-query"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入活动名称/发布人/地点/关键词" aria-label="活动查询" /><span aria-hidden="true">⌕</span></label>
            <button className="review-query-button" type="button" onClick={() => setNotice(filteredActivities.length ? `已查询到 ${filteredActivities.length} 场已结束活动` : '没有匹配的活动')}>活动查询</button>
          </div>

          <div className="review-workspace-heading"><div><h2>活动结果总览</h2><span>仅展示已结束活动</span></div><button type="button" onClick={() => { setQuery(''); setType(''); setDate(''); setNotice('筛选条件已重置') }}>↻ 重置筛选</button></div>
          <div className="review-workspace-grid">
            <section className="review-results-card" aria-label="已结束活动列表">
              <div className="review-table-scroll"><table className="review-table"><thead><tr><th>活动名称</th><th>发布人/部门</th><th>时间</th><th>地点</th><th>提交人数</th><th>已发积分</th><th>状态</th><th>操作</th></tr></thead><tbody>{filteredActivities.map(activity => <tr className={selected.id === activity.id ? 'is-selected' : ''} key={activity.id} onClick={() => setSelectedId(activity.id)}><td><span className="review-row-icon">{activity.icon}</span><div><strong>{activity.name}</strong><small>{activity.type}</small></div></td><td>{activity.publisher} / {activity.department}</td><td><time dateTime={activity.date}>{activity.date}<br />{activity.time}</time></td><td>{activity.location}</td><td>{activity.submitted}/{activity.participants}</td><td><img src={statIcons.stars} alt="" aria-hidden="true" /> {activity.points.toLocaleString()}</td><td><span className={`review-status ${activity.reviewStatus === '待复盘' ? 'is-pending' : 'is-done'}`}>{activity.reviewStatus}</span></td><td><button type="button" className="review-row-action" onClick={event => { event.stopPropagation(); setSelectedId(activity.id); setNotice(`已打开“${activity.name}”复盘详情`) }}>查看</button>{activity.points === 0 && <button type="button" className="review-row-action is-points" onClick={event => { event.stopPropagation(); setSelectedId(activity.id); publishPoints(activity) }}>发放积分</button>}</td></tr>)}{!filteredActivities.length && <tr><td colSpan={8} className="review-empty">没有匹配的已结束活动，请调整查询条件</td></tr>}</tbody></table></div><footer className="review-table-footer"><span>共 {filteredActivities.length} 条</span><div><button type="button" aria-label="上一页" disabled>‹</button><button className="is-current" type="button">1</button><button type="button" aria-label="下一页" disabled>›</button></div><label>10条/页 <span>⌄</span></label></footer>
            </section>

            <aside className="review-detail-panel" aria-label="当前活动复盘详情">
              <header className="review-detail-heading"><div className="detail-title-row"><span className="review-detail-icon">{selected.icon}</span><div><h2>{selected.name}</h2><p>{selected.type} · {selected.publisher} / {selected.department}</p></div><span className={`review-status ${selected.reviewStatus === '待复盘' ? 'is-pending' : 'is-done'}`}>{selected.reviewStatus}</span></div><div className="detail-meta"><span>时间：{selected.date} {selected.time}</span><span>地点：{selected.location}</span></div></header>
              <section className="detail-result-overview"><h3>活动结果概览</h3><div className="detail-metrics"><div><span>✔️</span><small>活动完成率</small><strong>92%</strong></div><div><span>🤵</span><small>参与人数</small><strong>{selected.submitted}/{selected.participants}</strong></div><div><span>💻</span><small>已提交反馈</small><strong>{selected.submitted}</strong></div><div><span className="metric-icon is-star"><img src={statIcons.stars} alt="" aria-hidden="true" /></span><small>平均星愿值</small><strong>{selected.average}</strong></div></div></section>
              <section className="detail-submissions"><div className="detail-section-title"><h3>实习生提交内容 <em>部分</em></h3><button type="button" onClick={() => setNotice(`已加载“${selected.name}”全部提交内容`)}>查看全部 ›</button></div><div className="submission-list">{submittedMembers.slice(0, 3).map(member => <div className="submission-row" key={member.name}><span className={`submission-avatar is-${member.tone}`}>{member.initials}</span><strong>{member.name}</strong><div className="submission-tags">{member.tags.map(tag => <span key={tag}>{tag}</span>)}</div><time>{member.time}</time></div>)}</div></section>
              <section className="detail-points"><div><h3>发布积分</h3><p>{publishedIds.includes(selected.id) ? '已完成发放，实习生可查看本次活动星愿值' : `已完成签到与反馈的实习生可发放${selected.average}星愿值`}</p></div><button className="review-points-button" type="button" onClick={() => publishPoints(selected)}>{publishedIds.includes(selected.id) ? '再次发布积分' : '批量发放积分'}</button></section>
              <section className="detail-files"><h3>附件 / 成果查看</h3><div className="detail-file-list">{selected.files.slice(0, 3).map(file => <button type="button" className="detail-file" key={file} onClick={() => setNotice(`已打开附件“${file}”`)}><span className={`file-badge is-${file.split('.').pop()}`}>{fileType[file.split('.').pop() ?? 'pdf'] ?? 'FILE'}</span><strong>{file}</strong><i>↗</i></button>)}<button type="button" className="detail-file more-files" onClick={() => setNotice(`该活动共有 ${selected.files.length} 个附件`)}>更多 </button></div></section>
            </aside>
          </div>
        </section>
      </section>
      {notice && <div className="activity-toast" role="status">{notice}</div>}
    </main>
  )
}
