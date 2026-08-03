import { useEffect, useState } from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { MentorCard } from '../components/MentorCard'
import { PlayerPanel } from '../components/PlayerPanel'
import { StatsStrip } from '../components/StatsStrip'
import { TaskRow } from '../components/TaskRow'
import { TaskSidebar } from '../components/TaskSidebar'
import { navigationIcons } from '../constants/assets'
import { taskService } from '../services/taskService'
import type { NavigationId, TaskItem, TaskPageConfig, TaskPageId, UserSummary } from '../types/task'

interface TaskCenterPageProps {
  pageId: TaskPageId
  onPageChange: (page: TaskPageId) => void
  onHome: () => void
}

export function TaskCenterPage({ pageId, onPageChange, onHome }: TaskCenterPageProps) {
  const [page, setPage] = useState<TaskPageConfig | null>(null)
  const [pages, setPages] = useState<Record<TaskPageId, TaskPageConfig> | null>(null)
  const [user, setUser] = useState<UserSummary | null>(null)
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({})
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    setPage(null)
    Promise.all([taskService.getTaskPages(), taskService.getUserSummary()]).then(([pageData, userData]) => {
      if (active) { setPages(pageData); setPage(pageData[pageId]); setUser(userData) }
    })
    return () => { active = false }
  }, [pageId])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const handleTaskAction = (task: TaskItem) => {
    setCompletedActions((current) => ({ ...current, [task.id]: true }))
    setNotice(`${task.title}：${task.actionDone || '操作成功'}`)
  }

  const handleNavigation = (id: NavigationId, label: string) => {
    if (id === 'home') onHome()
    else if (id === 'tasks') setNotice('已在任务中心')
    else setNotice(`${label}模块将在后续阶段接入`)
  }

  if (!page || !pages || !user) return <main className={`task-page task-page--${pageId}`}><div className="page-loading">正在载入任务数据…</div></main>

  return (
    <main className={`task-page task-page--${page.id}`}>
      <div className="task-page__background" aria-hidden="true" />
      <header className="task-header">
        <div className="task-title-block">
          <button type="button" className="breadcrumb-home" onClick={onHome} aria-label="返回梦工场首页"><img src={navigationIcons.home} alt="" /></button>
          <div><p className="task-breadcrumb">梦工场 <span>›</span> 任务中心 <span>›</span> {page.title}</p><h1>{page.title}<i aria-hidden="true">✦</i></h1><p>{page.subtitle}</p></div>
        </div>
        <PlayerPanel user={user} />
        <StatsStrip stats={page.stats} />
      </header>

      <div className="task-layout">
        <TaskSidebar activePage={page.id} pages={pages} onChange={onPageChange} />
        <section className="task-content" aria-label={`${page.title}内容`}>
          {page.mentor && <MentorCard mentor={page.mentor} onAction={setNotice} />}
          {page.sections.map((section) => (
            <section className="task-section" key={section.id} aria-labelledby={`${page.id}-${section.id}`}>
              <div className="section-heading"><div><h2 id={`${page.id}-${section.id}`}>{section.title}</h2>{section.eyebrow && <p>{section.eyebrow}</p>}</div><span>{section.tasks.length}项</span></div>
              <div className="task-list">{section.tasks.map((task) => <TaskRow key={task.id} task={task} completed={Boolean(completedActions[task.id])} onAction={handleTaskAction} />)}</div>
            </section>
          ))}
          {page.complianceNotice && <div className="compliance-notice" role="note">{page.complianceNotice}</div>}
        </section>
      </div>

      <BottomNavigation active="tasks" onNavigate={handleNavigation} />
      {notice && <div className="task-toast" role="status" aria-live="polite">{notice}</div>}
    </main>
  )
}
