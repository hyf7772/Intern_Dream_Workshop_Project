import { useEffect, useMemo, useState } from 'react'
import { activityConfigIcons, activityImages, profileAvatars, statIcons } from '../constants/assets'
import type { ActivityItem, ActivityPageId } from '../types/activity'

interface ActivityPublishPageProps {
  onPageChange: (pageId: ActivityPageId) => void
  onHome: () => void
}

interface PublishForm {
  name: string
  type: '新手任务' | '主线任务' | '专业任务'
  positionType: '零售岗位' | '公司岗位' | '运营岗位' | '其他' | ''
  startDate: string
  endDate: string
  start: string
  end: string
  location: string
  enrollmentLimit: string
  stars: string
  participants: '所有人' | '零售条线' | '批发条线' | '自定义'
  required: boolean
  content: string
  requirementsText: string
  icon: string
}

interface PublishAttachment {
  name: string
  size: string
  kind: 'pdf' | 'doc' | 'sheet' | 'zip'
}

const initialForm: PublishForm = {
  name: '', type: '主线任务', positionType: '其他', startDate: '', endDate: '', start: '09:00', end: '17:00', location: '', enrollmentLimit: '50', stars: '30', participants: '所有人', required: false, content: '', requirementsText: '', icon: '📌',
}

const initialAttachments: PublishAttachment[] = []

const smartGroups = [
  { name: '第一组', count: 12, members: ['李明', '王欣', '周宁'], tone: 'mint' },
  { name: '第二组', count: 12, members: ['朱彦绮', '赵雅', '林然'], tone: 'blue' },
  { name: '第三组', count: 11, members: ['张子涵', '吴桐', '何川'], tone: 'gold' },
]

const manualGroups = [
  { name: '产品运营组', count: 10, members: ['李明', '王欣', '朱彦绮'], tone: 'mint' },
  { name: '人力资源组', count: 13, members: ['周宁', '赵雅', '林然'], tone: 'blue' },
  { name: '市场实践组', count: 12, members: ['张子涵', '吴桐', '何川'], tone: 'gold' },
]

const attachmentIcon: Record<PublishAttachment['kind'], string> = {
  pdf: 'PDF',
  doc: 'DOC',
  sheet: 'XLS',
  zip: 'ZIP',
}

export function ActivityPublishPage({ onPageChange, onHome }: ActivityPublishPageProps) {
  const [form, setForm] = useState<PublishForm>(initialForm)
  const [requirementsText, setRequirementsText] = useState('')
  const [attachments, setAttachments] = useState<PublishAttachment[]>(initialAttachments)
  const [groupMode, setGroupMode] = useState<'smart' | 'manual'>('smart')
  const [groupRule, setGroupRule] = useState('按岗位')
  const [showGroups, setShowGroups] = useState(false)
  const [showPoster, setShowPoster] = useState(false)
  const [notice, setNotice] = useState('')

  const groups = useMemo(() => groupMode === 'smart' ? smartGroups : manualGroups, [groupMode])
  const totalPeople = groups.reduce((total, group) => total + group.count, 0)

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2400)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const updateField = <K extends keyof PublishForm>(key: K, value: PublishForm[K]) => {
    setForm(previous => ({ ...previous, [key]: value }))
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return
    setAttachments(previous => [
      ...previous,
      ...files.map(file => ({
        name: file.name,
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        kind: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : file.name.toLowerCase().endsWith('.xlsx') ? 'sheet' : 'doc',
      } as PublishAttachment)),
    ])
    setNotice(`已添加 ${files.length} 个附件`)
    event.target.value = ''
  }

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateField('icon', String(reader.result))
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const saveDraft = () => {
    if (!form.name.trim() || !form.startDate || !form.endDate || !form.content.trim() || !requirementsText.trim()) {
      setNotice('请先完善活动名称、活动时间、活动内容和活动要求')
      return
    }
    if (form.endDate < form.startDate) { setNotice('结束日期不能早于开始日期'); return }
    const draft: ActivityItem = {
      id: `draft-${Date.now()}`, name: form.name.trim(), type: form.type, publisher: '阳洁', department: '人力资源部', date: form.startDate,
      time: `${form.start} ~ ${form.end}`, location: form.location.trim() || '待定', enrollment: `0/${form.enrollmentLimit || '0'}`,
      stars: Number(form.stars) || 0, status: '草稿', icon: form.icon, positionType: form.type === '专业任务' && form.positionType ? form.positionType : undefined,
      participants: form.participants, content: form.content.trim(), requirements: [requirementsText.trim()], attachments: attachments.map(item => item.name), overview: form.type === '专业任务' ? 'professional' : 'general',
    }
    try {
      const previous = JSON.parse(window.localStorage.getItem('dream-factory-activity-drafts') ?? '[]') as ActivityItem[]
      window.localStorage.setItem('dream-factory-activity-drafts', JSON.stringify([...previous, draft]))
    } catch { /* 本地存储不可用时仍完成表单反馈 */ }
    setNotice('活动草稿保存成功')
    setForm(initialForm)
    setRequirementsText('')
    setAttachments([])
  }

  const generatePoster = () => setShowPoster(true)

  const publishActivity = () => undefined

  return (
    <main className="activity-builder-page">
      <header className="activity-header">
        <button className="activity-brand" type="button" onClick={onHome} aria-label="返回梦工场首页">
          <img className="activity-brand__icon" src={activityConfigIcons.publish} alt="" aria-hidden="true" />
        </button>
        <div className="activity-heading">
          <p className="activity-crumb">梦工场 <span>›</span> 活动配置中心 <span>›</span> 活动发布</p>
          <h1>活动发布 <i>✦</i></h1>
          <p>创建并配置实习生活动内容</p>
        </div>
        <aside className="activity-user-card" aria-label="当前登录用户">
          <div className="activity-user-card__avatar" aria-hidden="true"><img src={profileAvatars.activityManager} alt="" /></div>
          <div><strong>阳洁</strong><small>活动配置中心</small></div>
        </aside>
      </header>

      <section className="activity-builder-layout">
        <aside className="activity-sidebar activity-builder-sidebar">
          <h2>功能模块</h2>
          <nav aria-label="活动配置功能导航">
            <button type="button" onClick={() => onPageChange('general')}><img className="activity-nav-icon" src={activityConfigIcons.general} alt="" aria-hidden="true" />通用活动总览<i>›</i></button>
            <button type="button" onClick={() => onPageChange('professional')}><img className="activity-nav-icon" src={activityConfigIcons.professional} alt="" aria-hidden="true" />专业活动总览<i>›</i></button>
            <button className="is-selected" type="button" onClick={() => onPageChange('publish')}><img className="activity-nav-icon" src={activityConfigIcons.publish} alt="" aria-hidden="true" />活动发布<i>›</i></button>
            <button type="button" onClick={() => onPageChange('review')}><img className="activity-nav-icon" src={activityConfigIcons.review} alt="" aria-hidden="true" />活动复盘<i>›</i></button>
          </nav>
          <div className="activity-sidebar__illustration">
            <img src={activityConfigIcons.publish} alt="活动发布插画" />
            <strong>活动发布模板</strong>
            <p>快速创建标准化活动，支持自定义内容与规则配置</p>
          </div>
        </aside>

        <section className="activity-builder-content">
          <div className="builder-card">
            <div className="builder-section-heading"><b>A</b><div><h2>基本信息</h2><p>完善活动的基础资料和参与范围</p></div></div>
            <div className="builder-form-grid builder-basic-grid">
              <label className="builder-field builder-field-wide"><span>活动名称 <em>*</em></span><input value={form.name} onChange={event => updateField('name', event.target.value)} placeholder="请输入活动名称" /></label>
              <label className="builder-field"><span>活动类型 <em>*</em></span><select value={form.type} onChange={event => { const type = event.target.value as PublishForm['type']; updateField('type', type); if (type !== '专业任务') updateField('positionType', '') }}><option>新手任务</option><option>主线任务</option><option>专业任务</option></select></label>
              <label className="builder-field"><span>岗位类型 <em>*</em></span><select className={form.type !== '专业任务' ? 'is-disabled' : ''} disabled={form.type !== '专业任务'} value={form.type === '专业任务' ? form.positionType : ''} onChange={event => updateField('positionType', event.target.value as PublishForm['positionType'])}><option value="">请选择岗位类型</option><option>零售岗位</option><option>公司岗位</option><option>运营岗位</option><option>其他</option></select></label>
              <label className="builder-field builder-field-date"><span>活动时间 <em>*</em></span><div className="builder-time-fields"><input type="date" value={form.startDate} onChange={event => updateField('startDate', event.target.value)} /><input type="time" value={form.start} onChange={event => updateField('start', event.target.value)} /><i>至</i><input type="date" value={form.endDate} onChange={event => updateField('endDate', event.target.value)} /><input type="time" value={form.end} onChange={event => updateField('end', event.target.value)} /></div></label>
              <label className="builder-field"><span>活动地点</span><input value={form.location} onChange={event => updateField('location', event.target.value)} placeholder="活动地点（选填）" /></label>
              <label className="builder-field"><span>报名人数上限 <em>*</em></span><input className={form.required ? 'is-disabled' : ''} type="number" min="1" value={form.enrollmentLimit} disabled={form.required} onChange={event => updateField('enrollmentLimit', event.target.value)} placeholder="请输入人数" /></label>
              <label className="builder-field builder-field-stars"><span>星愿值 <em>*</em></span><div className="builder-number-input"><img src={statIcons.stars} alt="" aria-hidden="true" /><input type="number" min="0" value={form.stars} onChange={event => updateField('stars', event.target.value)} /><span>分</span></div></label>
              <label className="builder-field builder-field-participants"><span>参与人员 <em>*</em></span><select value={form.participants} onChange={event => updateField('participants', event.target.value as PublishForm['participants'])}><option>所有人</option><option>零售条线</option><option>批发条线</option><option>自定义</option></select></label>
              <div className="builder-field"><span>活动图标</span><label className="builder-icon-upload"><input type="file" accept="image/*" onChange={handleIconUpload} /><span>＋</span><strong>上传图标</strong></label></div>
              <label className="builder-required-toggle"><input type="checkbox" checked={form.required} onChange={event => { const checked = event.target.checked; updateField('required', checked); updateField('enrollmentLimit', checked ? '' : '50') }} /><span>活动必须参加</span><small>勾选后报名人数不可设置</small></label>
            </div>
          </div>

          <div className="builder-card builder-content-card">
            <div className="builder-section-heading"><b>B</b><div><h2>活动内容与要求</h2><p>告诉实习生要完成什么，以及如何获得星愿值</p></div></div>
            <div className="builder-content-grid">
              <label className="builder-field builder-textarea-field"><span>活动内容描述 <em>*</em></span><textarea maxLength={500} value={form.content} onChange={event => updateField('content', event.target.value)} placeholder="请输入活动内容描述" /><small>{form.content.length}/500</small></label>
              <div className="builder-requirements">
                <label className="builder-field"><span>活动要求 <em>*</em></span><textarea maxLength={300} value={requirementsText} onChange={event => setRequirementsText(event.target.value)} placeholder="请输入活动具体要求" /></label>
                <span className="builder-field-label attachment-label">附件资料</span>
                <label className="upload-dropzone"><input type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip" onChange={handleUpload} /><span className="upload-cloud" aria-hidden="true"></span><strong>点击上传</strong><small>支持 PDF、DOC、PPT、XLSX，单个文件≤50MB</small></label>
                <div className="attachment-list">{attachments.map((attachment, index) => <div className={`attachment-item is-${attachment.kind}`} key={`${attachment.name}-${index}`}><span className="attachment-type">{attachmentIcon[attachment.kind]}</span><div><strong>{attachment.name}</strong><small>{attachment.size}</small></div><button type="button" onClick={() => setAttachments(previous => previous.filter((_, itemIndex) => itemIndex !== index))} aria-label={`移除${attachment.name}`}>×</button></div>)}</div>
              </div>
            </div>
          </div>

          <div className="builder-card grouping-card">
            <div className="builder-section-heading"><b>C</b><div><h2>分组设置</h2><p>选择分组方式，让活动参与更有秩序</p></div></div>
            <div className="grouping-layout">
              <div className="grouping-controls">
                <div className="group-mode-tabs"><button className={groupMode === 'smart' ? 'is-active' : ''} type="button" onClick={() => setGroupMode('smart')}>智能分组</button><button className={groupMode === 'manual' ? 'is-active' : ''} type="button" onClick={() => setGroupMode('manual')}>手动分组</button></div>
                <div className="group-rule-options">{['按岗位', '按部门', '按人数均分'].map(rule => <button className={groupRule === rule ? 'is-selected' : ''} type="button" key={rule} onClick={() => setGroupRule(rule)}><span>{rule === '按岗位' ? '👔' : rule === '按部门' ? '🏘️' : '🤵'}</span><strong>{rule}</strong><small>{groupMode === 'smart' ? '系统根据规则自动分组' : '可拖拽调整成员分配'}</small></button>)}</div>
                <p className="group-rule-summary">当前规则：<strong>{groupRule}分组</strong><i>|</i> 预计分 <strong>{groups.length} 组</strong>，共 <strong>{totalPeople} 人</strong> <button type="button" onClick={() => setNotice('分组规则已更新')}>修改规则&nbsp; ↗</button></p>
              </div>
              <div className="group-preview">
                <div className="group-preview-heading"><strong>分组预览</strong><span>{groupMode === 'smart' ? '智能生成' : '手动配置'}</span></div>
                <div className="group-cards">{groups.map(group => <div className={`group-card is-${group.tone}`} key={group.name}><div className="group-card-title"><strong>{group.name}</strong><span>{group.count} 人</span></div><div className="group-avatar-row">{group.members.map((member, index) => <span className={`mini-avatar avatar-${index + 1}`} key={member}>{member.slice(0, 1)}</span>)}<b>…</b></div></div>)}</div>
                <button className="view-groups-button" type="button" onClick={() => setShowGroups(true)}> 查看分组名单</button>
              </div>
            </div>
          </div>

          <footer className="builder-footer-actions"><button className="builder-button is-primary" type="button" onClick={saveDraft}>保存为草稿</button></footer>
        </section>
      </section>

      {showGroups && <div className="activity-modal-backdrop" role="presentation" onClick={() => setShowGroups(false)}><section className="activity-modal group-modal" role="dialog" aria-modal="true" aria-labelledby="group-modal-title" onClick={event => event.stopPropagation()}><header><div><span className="modal-eyebrow">C · 分组设置</span><h2 id="group-modal-title">{groupMode === 'smart' ? '智能分组名单' : '手动分组名单'}</h2></div><button type="button" onClick={() => setShowGroups(false)} aria-label="关闭">×</button></header><p className="modal-summary">共 {totalPeople} 位参与人员，当前按“{groupRule}”规则分为 {groups.length} 组</p><div className="modal-group-list">{groups.map(group => <div className="modal-group" key={group.name}><div><strong>{group.name}</strong><span>{group.count} 人</span></div><p>{group.members.join('、')}、以及其他成员</p></div>)}</div><footer><button className="builder-button is-light" type="button" onClick={() => setShowGroups(false)}>返回编辑</button><button className="builder-button is-primary" type="button" onClick={() => { setShowGroups(false); setNotice('分组名单已确认') }}>确认分组</button></footer></section></div>}
      {showPoster && <ActivityPosterPreview onClose={() => setShowPoster(false)} />}
      {notice && <div className="activity-toast" role="status">{notice}</div>}
    </main>
  )
}

interface ActivityPosterPreviewProps {
  onClose: () => void
}

function ActivityPosterPreview({ onClose }: ActivityPosterPreviewProps) {
  return (
    <div className="activity-poster-backdrop" role="presentation" onClick={onClose}>
      <section className="activity-poster-modal" role="dialog" aria-modal="true" aria-label="活动海报预览" onClick={event => event.stopPropagation()}>
        <button className="poster-image-close" type="button" onClick={onClose} aria-label="关闭海报预览">×</button>
        <img className="poster-image" src={activityImages.poster} alt="实习生入职培训活动海报" />
      </section>
    </div>
  )
}
