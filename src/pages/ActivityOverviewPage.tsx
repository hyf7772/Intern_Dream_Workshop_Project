import { useEffect, useMemo, useState } from 'react'
import { ActivityDetailModal } from '../components/ActivityDetailModal'
import { ActivityHeader, ActivitySidebar } from '../components/activity'
import { activityConfigIcons, activityImages, statIcons } from '../constants/assets'
import { activityService } from '../services/activityService'
import type { ActivityItem, ActivityOverviewId, ActivityPageId, ActivityStatus } from '../types/activity'

interface ActivityOverviewPageProps {
  pageId: ActivityOverviewId
  onPageChange: (pageId: ActivityPageId) => void
  onHome: () => void
}

const statusClass: Record<ActivityStatus, string> = {
  草稿: 'is-draft',
  已发布: 'is-published',
  待复盘: 'is-pending-review',
  已复盘: 'is-reviewed',
}
const positionTypes = ['零售岗位', '公司岗位', '运营岗位', '其他'] as const

const formatActivityDate = (value: string) => value ? value.replace(/-/g, '/') : 'yyyy/mm/dd'

function ActivityDateField({ value, onChange, ariaLabel }: { value: string; onChange: (value: string) => void; ariaLabel: string }) {
  return <span className="activity-date-control"><span aria-hidden="true">{formatActivityDate(value)}</span><span className="activity-date-control__icon" aria-hidden="true">▦</span><input type="date" value={value} onChange={event => onChange(event.target.value)} aria-label={ariaLabel} /></span>
}

export function ActivityOverviewPage({ pageId, onPageChange, onHome }: ActivityOverviewPageProps) {
  const config = activityService.getOverview(pageId)
  const [items, setItems] = useState<ActivityItem[]>(() => activityService.getOverviewItems(pageId))
  const [status, setStatus] = useState<ActivityStatus | ''>('')
  const [positionType, setPositionType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')
  const [detail, setDetail] = useState<{ activity: ActivityItem; editing: boolean } | null>(null)
  const pageSize = 5

  useEffect(() => { setItems(activityService.getOverviewItems(pageId)); setStatus(''); setPositionType(''); setStartDate(''); setEndDate(''); setQuery(''); setPage(1) }, [pageId])
  const stats = [
    { label: '活动总数', value: items.length, icon: activityConfigIcons.stats.weekly },
    { label: '活动完成数', value: items.filter(item => item.status === '已复盘').length, icon: activityConfigIcons.stats.completed },
    { label: '活动待复盘数', value: items.filter(item => item.status === '待复盘').length, icon: activityConfigIcons.stats.pendingReview },
    { label: '活动进行中数', value: items.filter(item => item.status === '已发布').length, icon: activityConfigIcons.stats.inProgress },
  ]
  const filteredItems = useMemo(() => items.filter(item => {
    const normalizedQuery = query.trim().toLowerCase()
    return (!status || item.status === status)
      && (!positionType || item.positionType === positionType)
      && (!startDate || item.date >= startDate)
      && (!endDate || item.date <= endDate)
      && (!normalizedQuery || item.name.toLowerCase().includes(normalizedQuery))
  }), [items, status, positionType, startDate, endDate, query])

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const visibleItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize)

  useEffect(() => { setPage(1) }, [status, positionType, startDate, endDate, query])
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const saveActivity = (activity: ActivityItem) => { const saved = activityService.updateActivity(activity); setItems(previous => previous.map(item => item.id === saved.id ? saved : item)); setDetail(null); setNotice(`“${activity.name}”内容已保存，当前状态为草稿`) }
  const publishActivity = (activity: ActivityItem) => { if (activity.status === '草稿') { const published = activityService.publishActivity(activity); setItems(previous => previous.map(item => item.id === published.id ? published : item)); setNotice(`“${activity.name}”已发布`) } }

  return (
    <main className="activity-page">
      <ActivityHeader icon={activityConfigIcons.general} title={config.title} subtitle={config.subtitle} crumb={config.title} onHome={onHome} />

      <section className="activity-stats" aria-label="活动数据概览">
        {stats.map(stat => <div className="activity-stat" key={stat.label}><img className="activity-stat__icon" src={stat.icon} alt="" aria-hidden="true" /><div><span>{stat.label}</span><strong>{stat.value}</strong></div></div>)}
      </section>

      <section className="activity-workspace">
        <ActivitySidebar
          activePage={pageId}
          onPageChange={onPageChange}
          illustration={{
            src: activityImages.operations,
            alt: '活动运营看板插画',
            title: pageId === 'general' ? '活动运营看板' : '专业实践看板',
            description: pageId === 'general' ? '统一配置与跟踪活动全流程' : '支持按岗位配置与追踪实践活动',
          }}
        />

        <section className="activity-content">
          <div className="activity-filters" aria-label="活动筛选条件">
            <select aria-label="按活动状态搜索" value={status} onChange={event => setStatus(event.target.value as ActivityStatus | '')}><option value="">按活动状态搜索</option>{(['草稿', '已发布', '待复盘', '已复盘'] as ActivityStatus[]).map(item => <option key={item}>{item}</option>)}</select>
            {pageId === 'professional' && <select aria-label="按所属岗位类型搜索" value={positionType} onChange={event => setPositionType(event.target.value)}><option value="">按所属岗位类型搜索</option>{positionTypes.map(item => <option key={item}>{item}</option>)}</select>}
            <label className="activity-date-range"><span>活动日期</span><ActivityDateField value={startDate} onChange={setStartDate} ariaLabel="开始日期" /><b>至</b><ActivityDateField value={endDate} onChange={setEndDate} ariaLabel="结束日期" /></label>
            <label className="activity-query"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入活动名称搜索" aria-label="按活动名称搜索" /><span aria-hidden="true">⌕</span></label>
          </div>

          <div className="activity-list-heading"><h2>活动总览</h2><span>共 {filteredItems.length} 项</span></div>
          <section className="activity-table-wrap" aria-label="活动列表">
            <div className="activity-table-scroll">
              <table className="activity-table">
                <thead><tr><th>活动名称</th><th>活动日期</th><th>地点</th><th>星原值</th><th>任务状态</th><th>操作</th></tr></thead>
                <tbody>
                  {visibleItems.map(item => <tr key={item.id}>
                    <td><span className="activity-row-icon" aria-hidden="true">{item.icon.startsWith('data:') ? <img src={item.icon} alt="" /> : item.icon}</span><div><strong>{item.name}</strong><small>{pageId === 'professional' ? item.positionType : item.type}</small></div></td>
                    <td><time dateTime={item.date}>{item.date}<br />{item.time}</time></td>
                    <td>{item.location}</td>
                    <td><img className="activity-stars" src={statIcons.stars} alt="" aria-hidden="true" /> {item.stars}</td>
                    <td><span className={`activity-status ${statusClass[item.status]}`}>{item.status}</span></td>
                    <td><div className="activity-row-actions"><button type="button" className="activity-row-action is-secondary" onClick={() => setDetail({ activity: item, editing: false })}>查看</button><button type="button" className="activity-row-action is-secondary" onClick={() => setDetail({ activity: item, editing: true })}>编辑</button><button type="button" className="activity-row-action is-primary" disabled={item.status !== '草稿'} onClick={() => publishActivity(item)}>发布</button></div></td>
                  </tr>)}
                  {!visibleItems.length && <tr><td className="activity-table__empty" colSpan={6}>没有匹配的活动，请调整筛选条件</td></tr>}
                </tbody>
              </table>
            </div>
            <footer className="activity-pagination"><span>共 {filteredItems.length} 条</span><div><button type="button" disabled={safePage === 1} onClick={() => setPage(safePage - 1)} aria-label="上一页">‹</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button type="button" className={number === safePage ? 'is-current' : ''} key={number} onClick={() => setPage(number)}>{number}</button>)}<button type="button" disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)} aria-label="下一页">›</button></div></footer>
          </section>
        </section>
      </section>
      {notice && <div className="activity-toast" role="status">{notice}</div>}
      {detail && <ActivityDetailModal activity={detail.activity} editing={detail.editing} onClose={() => setDetail(null)} onEdit={() => setDetail(previous => previous ? { ...previous, editing: true } : previous)} onSave={saveActivity} />}
    </main>
  )
}
