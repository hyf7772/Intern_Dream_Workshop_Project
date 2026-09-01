import { statIcons } from '../constants/assets'
import { taskStatusLabels, type TaskItem, type TaskStatus } from '../types/task'

interface TaskDetailModalProps {
  task: TaskItem
  status: TaskStatus
  onClose: () => void
}

export function TaskDetailModal({ task, status, onClose }: TaskDetailModalProps) {
  return (
    <div className="task-modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose() }}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-detail-title">
        <button className="task-modal__close" type="button" onClick={onClose} aria-label="关闭任务详情">×</button>
        <p className="task-modal__eyebrow">任务详情</p>
        <div className="task-modal__heading"><img src={task.icon} alt="" aria-hidden="true" /><div><h2 id="task-detail-title">{task.title}</h2><span className={`task-status task-status--${status}`}>{taskStatusLabels[status]}</span></div></div>
        <div className="task-detail-grid">
          <div><small>任务说明</small><p>{task.description}</p></div>
          <div><small>任务进度</small><p>{status === 'completed' ? '已完成' : task.progressLabel ?? '待开始'}</p></div>
          {task.meta && <div><small>时间/补充信息</small><p>{task.meta}</p></div>}
          {task.ability && <div><small>能力标签</small><p>{task.ability}</p></div>}
          <div><small>完成奖励</small><p className="task-detail-reward"><img src={statIcons.stars} alt="" aria-hidden="true" />+{task.reward ?? 0} 星愿值</p></div>
        </div>
        <button className="task-modal__confirm" type="button" onClick={onClose}>知道了</button>
      </section>
    </div>
  )
}
