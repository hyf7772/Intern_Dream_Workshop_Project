import { statIcons } from '../constants/assets'
import { taskStatusLabels, type TaskItem, type TaskStatus } from '../types/task'

interface TaskRowProps {
  task: TaskItem
  status: TaskStatus
  busy?: boolean
  onView: (task: TaskItem) => void
  onEnroll: (task: TaskItem) => void
  onSubmit: (task: TaskItem) => void
}

export function TaskRow({ task, status, busy = false, onView, onEnroll, onSubmit }: TaskRowProps) {
  return (
    <article className={`task-row ${task.recommended ? 'is-recommended' : ''}`}>
      {task.recommended && <span className="recommended-ribbon">推荐</span>}
      <div className="task-row__icon"><img src={task.icon} alt="" aria-hidden="true" /></div>
      <div className="task-row__copy"><h3>{task.title}</h3><p>{task.description}</p></div>
      <div className="task-row__status">
        <span className={`task-status task-status--${status}`}>{taskStatusLabels[status]}</span>
      </div>
      <div className="task-row__ability">{task.ability && <span>{task.ability}</span>}</div>
      <div className="task-row__reward">
        {task.reward ? <><img src={statIcons.stars} alt="" aria-hidden="true" /><strong>+{task.reward}</strong><small>星愿值</small></> : null}
      </div>
      <div className="task-row__actions" aria-label={`${task.title}操作`}>
        <button type="button" className="task-action task-action--secondary" onClick={() => onView(task)}>查看</button>
        {status === 'pending' && <button type="button" className="task-action task-action--primary" disabled={busy} onClick={() => onEnroll(task)}>{busy ? '报名中…' : '报名'}</button>}
        {status === 'in_progress' && <button type="button" className="task-action task-action--primary" disabled={busy} onClick={() => onSubmit(task)}>提交材料</button>}
      </div>
    </article>
  )
}
