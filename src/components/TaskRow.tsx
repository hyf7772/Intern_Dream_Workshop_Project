import { sharedActivityIcon, statIcons } from '../constants/assets'
import type { TaskItem } from '../types/task'

interface TaskRowProps {
  task: TaskItem
  completed: boolean
  onAction: (task: TaskItem) => void
}

export function TaskRow({ task, completed, onAction }: TaskRowProps) {
  return (
    <article className={`task-row ${task.recommended ? 'is-recommended' : ''}`}>
      {task.recommended && <span className="recommended-ribbon">推荐</span>}
      <div className="task-row__icon"><img src={sharedActivityIcon} alt="" aria-hidden="true" /></div>
      <div className="task-row__copy"><h3>{task.title}</h3><p>{task.description}</p></div>
      <div className="task-row__status">
        {typeof task.progress === 'number' ? (
          <><strong>{completed ? '已更新' : task.progressLabel}</strong><div className="row-progress" aria-hidden="true"><i style={{ width: `${completed ? 100 : task.progress}%` }} /></div></>
        ) : <strong>{completed ? task.actionDone : task.status || task.meta}</strong>}
        {task.meta && typeof task.progress === 'number' && <small>{task.meta}</small>}
      </div>
      <div className="task-row__ability">{task.ability && <span>{task.ability}</span>}</div>
      <div className="task-row__reward">
        {task.reward ? <><img src={statIcons.stars} alt="" aria-hidden="true" /><strong>+{task.reward}</strong><small>星愿值</small></> : null}
      </div>
      <button type="button" className={completed ? 'is-complete' : ''} disabled={completed} onClick={() => onAction(task)}>{completed ? task.actionDone : task.action}</button>
    </article>
  )
}

