import { useState } from 'react'
import type { ActivityItem } from '../types/activity'

interface ActivityDetailModalProps {
  activity: ActivityItem
  editing: boolean
  onClose: () => void
  onEdit: () => void
  onSave: (activity: ActivityItem) => void
}

const splitTime = (time: string) => {
  const [start = '09:00', end = '17:00'] = time.split(' ~ ')
  return { start, end }
}

export function ActivityDetailModal({ activity, editing, onClose, onEdit, onSave }: ActivityDetailModalProps) {
  const times = splitTime(activity.time)
  const [form, setForm] = useState(() => ({
    name: activity.name,
    type: activity.type,
    date: activity.date,
    start: times.start,
    end: times.end,
    location: activity.location,
    stars: String(activity.stars),
    participants: activity.participants ?? '2026届实习生 / 全员可报名',
    content: activity.content ?? `${activity.name}活动安排与实践内容，具体要求将在活动开始前同步。`,
    requirements: (activity.requirements ?? ['签到', '完成活动内容', '提交活动反馈']).join('、'),
    attachments: activity.attachments ?? [],
    positionType: activity.positionType ?? '其他',
  }))

  const update = (key: keyof typeof form, value: string) => setForm(previous => ({ ...previous, [key]: value }))
  const addAttachments = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = Array.from(event.target.files ?? []).map(file => file.name)
    if (names.length) setForm(previous => ({ ...previous, attachments: [...previous.attachments, ...names] }))
    event.target.value = ''
  }
  const save = () => onSave({
    ...activity,
    name: form.name.trim() || activity.name,
    type: form.type,
    date: form.date,
    time: `${form.start} ~ ${form.end}`,
    location: form.location.trim() || activity.location,
    stars: Number(form.stars) || activity.stars,
    participants: form.participants,
    content: form.content,
    requirements: form.requirements.split(/[、,，]/).map(item => item.trim()).filter(Boolean),
    attachments: form.attachments,
    positionType: form.positionType as ActivityItem['positionType'],
    status: '草稿',
  })

  return (
    <div className="activity-detail-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose() }}>
      <section className="activity-detail-modal" role="dialog" aria-modal="true" aria-labelledby="activity-detail-title">
        <button className="activity-detail-close" type="button" onClick={onClose} aria-label="关闭活动详情">×</button>
        <div className="activity-detail-heading"><span className="activity-detail-icon">{activity.icon}</span><div><p>活动{editing ? '编辑' : '详情'}</p><h2 id="activity-detail-title">{editing ? '编辑活动内容' : activity.name}</h2><span className={`activity-status is-${activity.status === '草稿' ? 'draft' : activity.status === '已发布' ? 'published' : activity.status === '待复盘' ? 'pending-review' : 'reviewed'}`}>{activity.status}</span></div></div>

        {editing ? (
          <div className="activity-detail-form">
            <label><span>活动名称</span><input value={form.name} onChange={event => update('name', event.target.value)} /></label>
            <div className="activity-detail-form-grid"><label><span>活动类型</span><input value={form.type} onChange={event => update('type', event.target.value)} /></label><label><span>所属岗位</span><select value={form.positionType} onChange={event => update('positionType', event.target.value)}><option>零售岗位</option><option>公司岗位</option><option>运营岗位</option><option>其他</option></select></label></div>
            <div className="activity-detail-form-grid"><label><span>活动日期</span><input type="date" value={form.date} onChange={event => update('date', event.target.value)} /></label><label><span>活动地点</span><input value={form.location} onChange={event => update('location', event.target.value)} /></label></div>
            <div className="activity-detail-form-grid"><label><span>开始时间</span><input type="time" value={form.start} onChange={event => update('start', event.target.value)} /></label><label><span>结束时间</span><input type="time" value={form.end} onChange={event => update('end', event.target.value)} /></label></div>
            <div className="activity-detail-form-grid"><label><span>星原值</span><input type="number" min="1" value={form.stars} onChange={event => update('stars', event.target.value)} /></label><label><span>参与对象</span><input value={form.participants} onChange={event => update('participants', event.target.value)} /></label></div>
            <label><span>活动内容与要求</span><textarea value={form.content} onChange={event => update('content', event.target.value)} /></label>
            <label><span>活动要求（用顿号分隔）</span><input value={form.requirements} onChange={event => update('requirements', event.target.value)} /></label>
            <label className="activity-detail-upload"><span>附件上传</span><input type="file" multiple onChange={addAttachments} /><small>{form.attachments.length ? form.attachments.join('、') : '暂未上传附件'}</small></label>
          </div>
        ) : (
          <div className="activity-detail-content">
            <div className="activity-detail-summary"><span>发布人<strong>{activity.publisher}</strong></span><span>活动时间<strong>{activity.date} {activity.time}</strong></span><span>活动地点<strong>{activity.location}</strong></span><span>报名人数<strong>{activity.enrollment}</strong></span><span>星原值<strong>{activity.stars}</strong></span>{activity.positionType && <span>所属岗位<strong>{activity.positionType}</strong></span>}</div>
            <section><h3>活动内容与要求</h3><p className="activity-detail-description">{activity.content ?? `${activity.name}活动安排与实践内容，具体要求将在活动开始前同步。`}</p><div className="activity-requirement-list">{(activity.requirements ?? ['签到', '完成活动内容', '提交活动反馈']).map(item => <span key={item}>✓ {item}</span>)}</div></section>
            <section><h3>附件</h3><div className="activity-file-list">{(activity.attachments?.length ? activity.attachments : ['暂无附件']).map(file => <span key={file}>{file}</span>)}</div></section>
          </div>
        )}

        <footer className="activity-detail-actions">{editing ? <><button type="button" className="activity-detail-button is-secondary" onClick={onClose}>取消</button><button type="button" className="activity-detail-button is-primary" onClick={save}>保存内容</button></> : <><button type="button" className="activity-detail-button is-secondary" onClick={onClose}>关闭</button><button type="button" className="activity-detail-button is-primary" onClick={onEdit}>编辑活动</button></>}</footer>
      </section>
    </div>
  )
}
