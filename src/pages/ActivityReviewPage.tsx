import { useEffect, useMemo, useState } from 'react'
import { activityConfigIcons, activityImages, profileAvatars, statIcons } from '../constants/assets'
import { activityService } from '../services/activityService'
import type { ActivityPageId, ReviewActivity } from '../types/activity'

interface ActivityReviewPageProps {
  mode: 'general' | 'professional'
  onModeChange: (mode: 'general' | 'professional') => void
  onPageChange: (pageId: ActivityPageId) => void
  onHome: () => void
}

const endedActivities = activityService.getReviewActivities()
const submittedMembers = activityService.getSubmittedMembers()

const fileType: Record<string, string> = { xlsx: 'XLS', pdf: 'PDF', zip: 'ZIP' }
const reviewStatIcons = {
  endedActivities: activityConfigIcons.professional,
  pendingPoints: statIcons.stars,
  submittedResults: activityConfigIcons.stats.inProgress,
  pendingReviews: activityImages.pendingReviews,
} as const

const formatActivityDate = (value: string) => value ? value.replace(/-/g, '/') : 'yyyy/mm/dd'

function ActivityDateField({ value, onChange, ariaLabel }: { value: string; onChange: (value: string) => void; ariaLabel: string }) {
  return <span className="activity-date-control"><span aria-hidden="true">{formatActivityDate(value)}</span><span className="activity-date-control__icon" aria-hidden="true">▦</span><input type="date" value={value} onChange={event => onChange(event.target.value)} aria-label={ariaLabel} /></span>
}

export function ActivityReviewPage({ mode, onModeChange, onPageChange, onHome }: ActivityReviewPageProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'待复盘' | '已复盘' | ''>('')
  const [positionType, setPositionType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedId, setSelectedId] = useState(endedActivities[0].id)
  const [notice, setNotice] = useState('')
  const [publishedIds, setPublishedIds] = useState<string[]>(endedActivities.filter(activity => activity.points > 0).map(activity => activity.id))
  const [detailOpen, setDetailOpen] = useState(false)
  const [pointsOpen, setPointsOpen] = useState(false)
  const [pointsMode, setPointsMode] = useState<'batch' | 'custom'>('batch')
  const [pointValue, setPointValue] = useState('')
  const [customPoints, setCustomPoints] = useState<Record<string, string>>({})

  const activities = useMemo(() => endedActivities.filter(activity => mode === 'general' || Boolean(activity.positionType)), [mode])
  const filteredActivities = useMemo(() => activities.filter(activity => {
    const normalizedQuery = query.trim().toLowerCase()
    const normalizedStatus = activity.reviewStatus === '已结束' ? '已复盘' : activity.reviewStatus
    return (!status || normalizedStatus === status)
      && (!positionType || activity.positionType === positionType)
      && (!startDate || activity.date >= startDate)
      && (!endDate || activity.date <= endDate)
      && (!normalizedQuery || activity.name.toLowerCase().includes(normalizedQuery))
  }), [activities, query, status, positionType, startDate, endDate])
  const selected = filteredActivities.find(activity => activity.id === selectedId) ?? filteredActivities[0] ?? endedActivities[0]
  const pendingPoints = activities.filter(activity => !publishedIds.includes(activity.id)).reduce((total, activity) => total + activity.submitted * activity.average, 0)
  const stats = { ended: activities.filter(activity => publishedIds.includes(activity.id)).length, pending: activities.filter(activity => !publishedIds.includes(activity.id)).length, all: activities.length }

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
          <h1>{mode === 'professional' ? '专业活动复盘' : '通用活动复盘'} <i>✦</i></h1>
          <p>查看已结束活动结果与成长反馈</p>
        </div>
        <aside className="activity-user-card" aria-label="当前登录用户">
          <div className="activity-user-card__avatar" aria-hidden="true"><img src={profileAvatars.activityManager} alt="" /></div>
          <div><strong>阳洁</strong><small>活动配置中心</small></div>
        </aside>
      </header>

      <section className="activity-review-stats" aria-label="活动复盘数据概览">
        <div className="review-stat"><span className="review-stat-icon is-calendar"><img src={reviewStatIcons.endedActivities} alt="" aria-hidden="true" /></span><div><span>已结束活动数量</span><strong>{stats.ended}</strong></div></div>
        <div className="review-stat"><span className="review-stat-icon is-review"><img src={reviewStatIcons.pendingReviews} alt="" aria-hidden="true" /></span><div><span>待复盘活动数量</span><strong>{stats.pending}</strong></div></div>
        <div className="review-stat"><span className="review-stat-icon is-people"><img src={reviewStatIcons.submittedResults} alt="" aria-hidden="true" /></span><div><span>全部活动数量</span><strong>{stats.all}</strong></div></div>
      </section>

      <section className="activity-review-layout">
        <aside className="activity-sidebar activity-review-sidebar">
          <h2>功能模块</h2>
          <nav aria-label="活动配置功能导航">
            <button type="button" onClick={() => onPageChange('general')}><img className="activity-nav-icon" src={activityConfigIcons.general} alt="" aria-hidden="true" />通用活动总览<i>›</i></button>
            <button type="button" onClick={() => onPageChange('professional')}><img className="activity-nav-icon" src={activityConfigIcons.professional} alt="" aria-hidden="true" />专业活动总览<i>›</i></button>
            <button type="button" onClick={() => onPageChange('publish')}><img className="activity-nav-icon" src={activityConfigIcons.publish} alt="" aria-hidden="true" />活动发布<i>›</i></button>
            <button className={mode === 'general' ? 'is-selected' : ''} type="button" onClick={() => onModeChange('general')}><img className="activity-nav-icon" src={activityConfigIcons.review} alt="" aria-hidden="true" />通用活动复盘<i>›</i></button>
            <button className={mode === 'professional' ? 'is-selected' : ''} type="button" onClick={() => onModeChange('professional')}><img className="activity-nav-icon" src={activityConfigIcons.review} alt="" aria-hidden="true" />专业活动复盘<i>›</i></button>
          </nav>
          <div className="activity-sidebar__illustration"><img src={activityConfigIcons.review} alt="活动复盘插画" /><strong>活动复盘管理</strong><p>复盘活动成效，驱动持续优化</p></div>
        </aside>

        <section className="activity-review-content">
          <div className="activity-filters" aria-label="活动复盘筛选条件">
            <select value={status} onChange={event => setStatus(event.target.value as typeof status)} aria-label="按活动状态搜索"><option value="">按活动状态搜索</option><option>待复盘</option><option>已复盘</option></select>
            {mode === 'professional' && <select value={positionType} onChange={event => setPositionType(event.target.value)} aria-label="按岗位类型搜索"><option value="">按岗位类型搜索</option><option>零售岗位</option><option>公司岗位</option><option>运营岗位</option><option>其他</option></select>}
            <label className="activity-date-range"><span>活动日期</span><ActivityDateField value={startDate} onChange={setStartDate} ariaLabel="开始日期" /><b>至</b><ActivityDateField value={endDate} onChange={setEndDate} ariaLabel="结束日期" /></label>
            <label className="activity-query"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入活动名称搜索" aria-label="按活动名称搜索" /><span aria-hidden="true">⌕</span></label>
          </div>

          <div className="review-workspace-heading"><div><h2>活动结果总览</h2><span>{mode === 'professional' ? '专业活动' : '通用活动'} · 共 {filteredActivities.length} 项</span></div><button type="button" onClick={() => { setQuery(''); setStatus(''); setPositionType(''); setStartDate(''); setEndDate(''); setNotice('筛选条件已重置') }}>↻ 重置筛选</button></div>
          <div className="review-workspace-grid">
            <section className="review-results-card" aria-label="已结束活动列表">
              <div className="review-table-scroll"><table className="review-table"><thead><tr><th>活动名称</th><th>发布人</th><th>时间</th><th>地点</th><th>报名人数</th><th>状态</th><th>操作</th></tr></thead><tbody>{filteredActivities.map(activity => { const reviewed = publishedIds.includes(activity.id); return <tr className={selected.id === activity.id ? 'is-selected' : ''} key={activity.id} onClick={() => setSelectedId(activity.id)}><td><span className="review-row-icon">{activity.icon}</span><div><strong>{activity.name}</strong><small>{activity.type}</small></div></td><td>{activity.publisher}</td><td><time dateTime={activity.date}>{activity.date}<br />{activity.time}</time></td><td>{activity.location}</td><td>{activity.submitted}/{activity.participants}</td><td><span className={`review-status ${reviewed ? 'is-done' : 'is-pending'}`}>{reviewed ? '已复盘' : '待复盘'}</span></td><td><button type="button" className="review-row-action" onClick={event => { event.stopPropagation(); setSelectedId(activity.id); setDetailOpen(true) }}>查看</button><button type="button" className="review-row-action is-points" onClick={event => { event.stopPropagation(); setSelectedId(activity.id); setPointValue(String(activity.average)); setPointsOpen(true) }}>发放积分</button><button type="button" className="review-row-action" onClick={event => { event.stopPropagation(); setNotice(`“${activity.name}”参与者材料已准备打包下载`) }}>附件下载</button></td></tr> })}{!filteredActivities.length && <tr><td colSpan={7} className="review-empty">没有匹配的活动，请调整查询条件</td></tr>}</tbody></table></div><footer className="review-table-footer"><span>共 {filteredActivities.length} 条</span><div><button type="button" aria-label="上一页" disabled>‹</button><button className="is-current" type="button">1</button><button type="button" aria-label="下一页" disabled>›</button></div></footer>
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
      {detailOpen && <div className="activity-detail-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) setDetailOpen(false) }}><section className="activity-detail-modal" role="dialog" aria-modal="true" aria-labelledby="review-detail-title"><button className="activity-detail-close" type="button" onClick={() => setDetailOpen(false)} aria-label="关闭">×</button><div className="activity-detail-heading"><span className="activity-detail-icon">{selected.icon}</span><div><p>活动复盘详情</p><h2 id="review-detail-title">{selected.name}</h2><span className={`activity-status ${publishedIds.includes(selected.id) ? 'is-reviewed' : 'is-pending-review'}`}>{publishedIds.includes(selected.id) ? '已复盘' : '待复盘'}</span></div></div><div className="activity-detail-content"><div className="activity-detail-summary"><span>发布人<strong>{selected.publisher}</strong></span><span>活动时间<strong>{selected.date} {selected.time}</strong></span><span>活动地点<strong>{selected.location}</strong></span><span>报名人数<strong>{selected.participants}</strong></span><span>上传材料人数<strong>{selected.submitted}</strong></span></div></div><footer className="activity-detail-actions"><button type="button" className="activity-detail-button is-secondary" onClick={() => setDetailOpen(false)}>关闭</button></footer></section></div>}
      {pointsOpen && <div className="review-modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) setPointsOpen(false) }}><section className="review-modal points-modal" role="dialog" aria-modal="true" aria-labelledby="points-modal-title"><button className="review-modal-close" type="button" onClick={() => setPointsOpen(false)} aria-label="关闭">×</button><h2 id="points-modal-title">发放积分 · {selected.name}</h2><div className="points-tabs"><button className={pointsMode === 'batch' ? 'is-active' : ''} type="button" onClick={() => setPointsMode('batch')}>批量发放</button><button className={pointsMode === 'custom' ? 'is-active' : ''} type="button" onClick={() => setPointsMode('custom')}>自定义发放</button></div>{pointsMode === 'batch' ? <label className="points-input"><span>本次发放星愿值</span><input type="number" min="0" value={pointValue || selected.average} onChange={event => setPointValue(event.target.value)} /><small>默认使用活动创建时的星愿值，可修改</small></label> : <div className="custom-points-list">{submittedMembers.map(member => <label key={member.name}><span>{member.name}</span><input type="number" min="0" value={customPoints[member.name] ?? String(selected.average)} onChange={event => setCustomPoints(previous => ({ ...previous, [member.name]: event.target.value }))} /></label>)}</div>}<footer className="review-modal-actions"><button type="button" className="builder-button is-outline" onClick={() => { setPointsOpen(false); setNotice('积分发放设置已暂存') }}>暂存</button><button type="button" className="builder-button is-primary" onClick={() => { publishPoints(selected); setPointsOpen(false) }}>发放</button></footer></section></div>}
      {notice && <div className="activity-toast" role="status">{notice}</div>}
    </main>
  )
}
