import { useEffect, useMemo, useState } from 'react'
import { activityConfigIcons, statIcons } from '../constants/assets'
import { activityOverviews } from '../mocks/activityData'
import type { ActivityOverviewId, ActivityStatus } from '../types/activity'

interface ActivityOverviewPageProps {
  pageId: ActivityOverviewId
  onPageChange: (pageId: ActivityOverviewId) => void
  onOpenPublish: () => void
  onOpenReview: () => void
  onHome: () => void
}

const statusAction: Record<ActivityStatus, string> = {
  未发布: '发布 / 编辑',
  报名中: '查看',
  进行中: '查看',
  已结束: '查看',
}

const statusClass: Record<ActivityStatus, string> = {
  未发布: 'is-draft',
  报名中: 'is-enrolling',
  进行中: 'is-active',
  已结束: 'is-ended',
}

export function ActivityOverviewPage({ pageId, onPageChange, onOpenPublish, onOpenReview, onHome }: ActivityOverviewPageProps) {
  const config = activityOverviews[pageId]
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [department, setDepartment] = useState('')
  const [date, setDate] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')
  const pageSize = 5

  const types = useMemo(() => Array.from(new Set(config.items.map(item => item.type))), [config])
  const departments = useMemo(() => Array.from(new Set(config.items.map(item => item.department))), [config])
  const filteredItems = useMemo(() => config.items.filter(item => {
    const normalizedQuery = query.trim().toLowerCase()
    return (!status || item.status === status)
      && (!type || item.type === type)
      && (!department || item.department === department)
      && (!date || item.date === date)
      && (!normalizedQuery || [item.name, item.publisher, item.department, item.location].join(' ').toLowerCase().includes(normalizedQuery))
  }), [config, status, type, department, date, query])

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const visibleItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize)

  useEffect(() => { setPage(1) }, [pageId, status, type, department, date, query])
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const handleAction = (activityName: string, activityStatus: ActivityStatus) => {
    const action = activityStatus === '未发布' ? '打开发布与编辑' : '查看'
    setNotice(`已为“${activityName}”${action}活动详情`)
  }

  return (
    <main className="activity-page">
      <header className="activity-header">
        <button className="activity-brand" type="button" onClick={onHome} aria-label="返回梦工场首页"><img className="activity-brand__icon" src={activityConfigIcons.general} alt="" aria-hidden="true" /></button>
        <div className="activity-heading">
          <p className="activity-crumb">梦工场 <span>›</span> 活动配置中心 <span>›</span> {config.title}</p>
          <h1>{config.title}<i>✦</i></h1>
          <p>{config.subtitle}</p>
        </div>
        <aside className="activity-user-card" aria-label="当前登录用户">
          <div className="activity-user-card__avatar" aria-hidden="true">👩🏻‍💼</div>
          <div><strong>张悦</strong><small>活动配置中心</small></div>
        </aside>
      </header>

      <section className="activity-stats" aria-label="活动数据概览">
        {config.stats.map(stat => <div className="activity-stat" key={stat.label}><img className="activity-stat__icon" src={stat.icon} alt="" aria-hidden="true" /><div><span>{stat.label}</span><strong>{stat.value}</strong></div></div>)}
      </section>

      <section className="activity-workspace">
        <aside className="activity-sidebar">
          <h2>功能模块</h2>
          <nav aria-label="活动配置功能导航">
            <button className={pageId === 'general' ? 'is-selected' : ''} type="button" onClick={() => onPageChange('general')}><img className="activity-nav-icon" src={activityConfigIcons.general} alt="" aria-hidden="true" />通用活动总览<i>›</i></button>
            <button className={pageId === 'professional' ? 'is-selected' : ''} type="button" onClick={() => onPageChange('professional')}><img className="activity-nav-icon" src={activityConfigIcons.professional} alt="" aria-hidden="true" />专业活动总览<i>›</i></button>
            <button type="button" onClick={onOpenPublish}><img className="activity-nav-icon" src={activityConfigIcons.publish} alt="" aria-hidden="true" />活动发布<i>›</i></button>
            <button type="button" onClick={onOpenReview}><img className="activity-nav-icon" src={activityConfigIcons.review} alt="" aria-hidden="true" />活动复盘<i>›</i></button>
          </nav>
          <div className="activity-sidebar__illustration"><img src="/assets/activity-operations.png" alt="活动运营看板插画" /><strong>{pageId === 'general' ? '活动运营看板' : '专业实践看板'}</strong><p>{pageId === 'general' ? '统一配置与跟踪活动全流程' : '支持按岗位配置与追踪实践活动'}</p></div>
        </aside>

        <section className="activity-content">
          <div className="activity-filters" aria-label="活动筛选条件">
            <select aria-label="按状态搜索" value={status} onChange={event => setStatus(event.target.value)}><option value="">按状态搜索</option>{(['未发布', '报名中', '进行中', '已结束'] as ActivityStatus[]).map(item => <option key={item}>{item}</option>)}</select>
            <select aria-label="按活动类型搜索" value={type} onChange={event => setType(event.target.value)}><option value="">按活动类型搜索</option>{types.map(item => <option key={item}>{item}</option>)}</select>
            <select aria-label="按所属部门搜索" value={department} onChange={event => setDepartment(event.target.value)}><option value="">按所属部门搜索</option>{departments.map(item => <option key={item}>{item}</option>)}</select>
            <label className="activity-date"><span>按时间搜索</span><input type="date" aria-label="按时间搜索" value={date} onChange={event => setDate(event.target.value)} /></label>
            <label className="activity-query"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="任意输入搜索活动名称/发布人/地点" aria-label="任意输入搜索" /><span aria-hidden="true">⌕</span></label>
          </div>

          <div className="activity-list-heading"><h2>活动总览</h2><span>支持分页查询</span></div>
          <section className="activity-table-wrap" aria-label="活动列表">
            <div className="activity-table-scroll">
              <table className="activity-table">
                <thead><tr><th>活动名称</th><th>发布人/部门</th><th>时间</th><th>地点</th><th>报名人数</th><th>星愿值</th><th>任务状态</th><th>操作</th></tr></thead>
                <tbody>
                  {visibleItems.map(item => <tr key={item.id}>
                    <td><span className="activity-row-icon" aria-hidden="true">{item.icon}</span><div><strong>{item.name}</strong><small>{item.type}</small></div></td>
                    <td>{item.publisher} / {item.department}</td>
                    <td><time dateTime={item.date}>{item.date}<br />{item.time}</time></td>
                    <td>{item.location}</td>
                    <td>{item.enrollment}</td>
                    <td><img className="activity-stars" src={statIcons.stars} alt="" aria-hidden="true" /> {item.stars}</td>
                    <td><span className={`activity-status ${statusClass[item.status]}`}>{item.status}</span></td>
                    <td><button type="button" className="activity-row-action" onClick={() => handleAction(item.name, item.status)}>{statusAction[item.status]}</button></td>
                  </tr>)}
                  {!visibleItems.length && <tr><td className="activity-table__empty" colSpan={8}>没有匹配的活动，请调整筛选条件</td></tr>}
                </tbody>
              </table>
            </div>
            <footer className="activity-pagination"><span>共 {filteredItems.length} 条</span><div><button type="button" disabled={safePage === 1} onClick={() => setPage(safePage - 1)} aria-label="上一页">‹</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button type="button" className={number === safePage ? 'is-current' : ''} key={number} onClick={() => setPage(number)}>{number}</button>)}<button type="button" disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)} aria-label="下一页">›</button></div><label>5条/页 <span>⌄</span></label></footer>
          </section>
        </section>
      </section>
      {notice && <div className="activity-toast" role="status">{notice}</div>}
    </main>
  )
}
