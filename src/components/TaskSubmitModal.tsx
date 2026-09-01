import { useState } from 'react'
import type { TaskItem, TaskSubmission } from '../types/task'

interface TaskSubmitModalProps {
  task: TaskItem
  submitting?: boolean
  onClose: () => void
  onSubmit: (submission: TaskSubmission) => void
}

export function TaskSubmitModal({ task, submitting = false, onClose, onSubmit }: TaskSubmitModalProps) {
  const [content, setContent] = useState('')
  const [attachmentNames, setAttachmentNames] = useState<string[]>([])
  const [error, setError] = useState('')

  const submit = () => {
    if (!content.trim() && attachmentNames.length === 0) {
      setError('请填写完成说明或上传至少一份材料')
      return
    }
    onSubmit({ content: content.trim(), attachmentNames })
  }

  return (
    <div className="task-modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target && !submitting) onClose() }}>
      <section className="task-modal task-submit-modal" role="dialog" aria-modal="true" aria-labelledby="task-submit-title">
        <button className="task-modal__close" type="button" onClick={onClose} disabled={submitting} aria-label="关闭提交材料窗口">×</button>
        <p className="task-modal__eyebrow">提交材料</p>
        <h2 id="task-submit-title">{task.title}</h2>
        <label className="task-submit-field"><span>完成说明</span><textarea value={content} onChange={event => { setContent(event.target.value); setError('') }} maxLength={500} placeholder="请简要说明任务完成情况、成果或收获" /></label>
        <label className="task-submit-upload"><span>上传材料</span><input type="file" multiple onChange={event => { setAttachmentNames(Array.from(event.target.files ?? []).map(file => file.name)); setError('') }} /><small>{attachmentNames.length ? attachmentNames.join('、') : '支持选择一个或多个文件'}</small></label>
        {error && <p className="task-submit-error" role="alert">{error}</p>}
        <div className="task-submit-actions"><button type="button" onClick={onClose} disabled={submitting}>取消</button><button type="button" onClick={submit} disabled={submitting}>{submitting ? '提交中…' : '确认提交'}</button></div>
      </section>
    </div>
  )
}
