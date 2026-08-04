import { categoryIcons } from '../constants/assets'
import { taskPageOrder } from '../constants/navigation'
import type { TaskPageConfig, TaskPageId } from '../types/task'

interface TaskSidebarProps {
  activePage: TaskPageId
  pages: Record<TaskPageId, TaskPageConfig>
  onChange: (page: TaskPageId) => void
}

export function TaskSidebar({ activePage, pages, onChange }: TaskSidebarProps) {
  return (
    <aside className="task-sidebar" aria-label="任务分类">
      <p className="task-sidebar__title">任务分类</p>
      <div className="task-sidebar__nav">
        {taskPageOrder.map((pageId) => {
          const page = pages[pageId]
          return (
            <button key={page.id} type="button" className={activePage === page.id ? 'is-active' : ''} aria-current={activePage === page.id ? 'page' : undefined} onClick={() => onChange(page.id)}>
              <span className={`sidebar-icon sidebar-icon--${page.id}`}><img src={categoryIcons[page.id]} alt="" aria-hidden="true" /></span>
              <strong>{page.title}</strong>
              <small>{page.stats.total}</small>
            </button>
          )
        })}
      </div>
      <div className="sidebar-companion" aria-hidden="true"><span>✦</span><div>成长旅程</div><small>每一次完成<br />都在点亮未来</small></div>
    </aside>
  )
}
