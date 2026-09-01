import { statIcons } from '../constants/assets'
import { taskStatusLabels, type TaskItem, type TaskStatus } from '../types/task'

interface TaskRowProps {
  task: TaskItem
  status: TaskStatus
  busy?: boolean
  showAbility?: boolean
  onView: (task: TaskItem) => void
  onEnroll: (task: TaskItem) => void
  onSubmit: (task: TaskItem) => void
}

export function TaskRow({ task, status, busy = false, showAbility = true, onView, onEnroll, onSubmit }: TaskRowProps) {
  const canEnroll = status === 'pending'
  const canSubmit = status === 'in_progress'
  const hasAbility = showAbility && Boolean(task.ability)
  const enrollLabel = status === 'completed' ? '已完成' : status === 'in_progress' ? '已报名' : busy ? '报名中…' : '报名'
  const submitLabel = status === 'completed' ? '已完成' : busy && canSubmit ? '提交中…' : '提交材料'

  return (
    <article className={`task-row ${hasAbility ? '' : 'task-row--without-ability'}`}>
      <div className="task-row__icon"><img src={task.icon} alt="" aria-hidden="true" /></div>
      <div className="task-row__copy"><h3>{task.title}</h3><p>{task.description}</p></div>
      <div className="task-row__status">
        <span className={`task-status task-status--${status}`}>{taskStatusLabels[status]}</span>
      </div>
      {hasAbility && <div className="task-row__ability"><span>{task.ability}</span></div>}
      <div className="task-row__reward">
        {task.reward ? <><img src={statIcons.stars} alt="" aria-hidden="true" /><strong>+{task.reward}</strong><small>星愿值</small></> : null}
      </div>
      <div className="task-row__actions" aria-label={`${task.title}操作`}>
        <button type="button" className="task-action task-action--secondary" onClick={() => onView(task)}>查看</button>
        <button type="button" className="task-action task-action--primary" disabled={!canEnroll || busy} onClick={() => onEnroll(task)}>{enrollLabel}</button>
        <button type="button" className="task-action task-action--primary" disabled={!canSubmit || busy} onClick={() => onSubmit(task)}>{submitLabel}</button>
      </div>
    </article>
  )
}
