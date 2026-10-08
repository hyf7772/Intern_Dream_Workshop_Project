import { useEffect, useState } from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { PlayerPanel } from '../components/PlayerPanel'
import { StatsStrip } from '../components/StatsStrip'
import { TaskRow } from '../components/TaskRow'
import { TaskSidebar } from '../components/TaskSidebar'
import { TaskDetailModal } from '../components/TaskDetailModal'
import { TaskSubmitModal } from '../components/TaskSubmitModal'
import { navigationIcons } from '../constants/assets'
import { taskService } from '../services/taskService'
import type { NavigationId, TaskItem, TaskPageConfig, TaskPageId, TaskStatus, TaskSubmission, UserSummary } from '../types/task'

interface TaskCenterPageProps {
  pageId: TaskPageId
  onPageChange: (page: TaskPageId) => void
  onHome: () => void
}

export function TaskCenterPage({ pageId, onPageChange, onHome }: TaskCenterPageProps) {
  const [page, setPage] = useState<TaskPageConfig | null>(null)
  const [pages, setPages] = useState<Record<TaskPageId, TaskPageConfig> | null>(null)
  const [user, setUser] = useState<UserSummary | null>(null)
  const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>({})
  const [detailTask, setDetailTask] = useState<TaskItem | null>(null)
  const [submitTask, setSubmitTask] = useState<TaskItem | null>(null)
  const [busyTaskId, setBusyTaskId] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setPage(null)
    setError('')
    Promise.all([taskService.getTaskPages(), taskService.getUserSummary()])
      .then(([pageData, userData]) => {
        if (active) {
          setPages(pageData)
          setPage(pageData[pageId])
          setUser(userData)
          setTaskStatuses(current => ({
            ...Object.fromEntries(Object.values(pageData).flatMap(taskPage => taskPage.sections.flatMap(section => section.tasks.map(task => [task.id, task.status] as const)))),
            ...current,
          }))
        }
      })
      .catch(() => { if (active) setError('任务数据加载失败，请稍后重试') })
    return () => { active = false }
  }, [pageId])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const getTaskStatus = (task: TaskItem) => taskStatuses[task.id] ?? task.status

  const handleEnroll = async (task: TaskItem) => {
    if (getTaskStatus(task) !== 'pending') {
      setNotice(`“${task.title}”已报名，无需重复报名`)
      return
    }
    setBusyTaskId(task.id)
    try {
      const result = await taskService.enrollTask(task.id)
      setTaskStatuses(current => ({ ...current, [result.taskId]: result.status }))
      setNotice(`已报名“${task.title}”，请按要求完成并提交材料`)
    } catch {
      setNotice(`“${task.title}”报名失败，请稍后重试`)
    } finally {
      setBusyTaskId(null)
    }
  }

  const handleSubmit = async (submission: TaskSubmission) => {
    if (!submitTask) return
    if (getTaskStatus(submitTask) !== 'in_progress') {
      setNotice('请先报名任务，再提交材料')
      setSubmitTask(null)
      return
    }
    setBusyTaskId(submitTask.id)
    try {
      const result = await taskService.submitTask(submitTask.id, submission)
      setTaskStatuses(current => ({ ...current, [result.taskId]: result.status }))
      setNotice(`“${submitTask.title}”材料已提交，任务已完成`)
      setSubmitTask(null)
    } catch {
      setNotice(`“${submitTask.title}”提交失败，请稍后重试`)
    } finally {
      setBusyTaskId(null)
    }
  }

  const handleNavigation = (id: NavigationId, label: string) => {
    if (id === 'home') onHome()
    else if (id === 'tasks') setNotice('已在任务中心')
    else setNotice(`${label}模块将在后续阶段接入`)
  }

  if (error) return <main className={`task-page task-page--${pageId}`}><div className="page-loading" role="alert">{error}</div></main>
  if (!page || !pages || !user) return <main className={`task-page task-page--${pageId}`}><div className="page-loading">正在载入任务数据…</div></main>

  const currentTasks = page.sections.flatMap(section => section.tasks)
  const displayStats = { ...page.stats, completed: currentTasks.filter(task => getTaskStatus(task) === 'completed').length, total: currentTasks.length }

  return (
    <main className={`task-page task-page--${page.id}`}>
      <div className="task-page__background" aria-hidden="true" />
      <header className="task-header">
        <div className="task-title-block">
          <button type="button" className="breadcrumb-home" onClick={onHome} aria-label="返回梦工场首页"><img src={navigationIcons.home} alt="" /></button>
          <div><p className="task-breadcrumb">梦工场 <span>›</span> 任务中心 <span>›</span> {page.title}</p><h1>{page.title}<i aria-hidden="true">✦</i></h1><p>{page.subtitle}</p></div>
        </div>
        <PlayerPanel user={user} />
        <StatsStrip stats={displayStats} />
      </header>

      <div className="task-layout">
        <TaskSidebar activePage={page.id} pages={pages} onChange={onPageChange} />
        <section className="task-content" aria-label={`${page.title}内容`}>
          <section className="task-section" aria-labelledby={`${page.id}-tasks`}>
            <div className="section-heading"><div><h2 id={`${page.id}-tasks`}>{page.title}</h2></div><span>{currentTasks.length}项</span></div>
            <div className="task-list">{currentTasks.map((task) => <TaskRow key={task.id} task={task} status={getTaskStatus(task)} busy={busyTaskId === task.id} showAbility={page.id !== 'professional'} onView={setDetailTask} onEnroll={handleEnroll} onSubmit={setSubmitTask} />)}</div>
          </section>
        </section>
      </div>

      <BottomNavigation active="tasks" onNavigate={handleNavigation} />
      {notice && <div className="task-toast" role="status" aria-live="polite">{notice}</div>}
      {detailTask && <TaskDetailModal task={detailTask} status={getTaskStatus(detailTask)} onClose={() => setDetailTask(null)} />}
      {submitTask && <TaskSubmitModal task={submitTask} submitting={busyTaskId === submitTask.id} onClose={() => setSubmitTask(null)} onSubmit={handleSubmit} />}
    </main>
  )
}
