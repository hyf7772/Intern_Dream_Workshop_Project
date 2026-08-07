import { useEffect, useMemo, useState } from 'react'
import { activityConfigIcons, profileAvatars, statIcons } from '../constants/assets'
import type { ActivityPageId } from '../types/activity'

interface ActivityPublishPageProps {
  onPageChange: (pageId: ActivityPageId) => void
  onHome: () => void
}

interface PublishForm {
  name: string
  type: string
  date: string
  start: string
  end: string
  location: string
  stars: string
  participants: string
  content: string
}

interface PublishAttachment {
  name: string
  size: string
  kind: 'pdf' | 'doc' | 'sheet' | 'zip'
}

const initialForm: PublishForm = {
  name: '实习生入职培训',
  type: '通用活动',
  date: '2026-08-12',
  start: '09:00',
  end: '17:00',
  location: '总部培训室 A',
  stars: '60',
  participants: '2026届实习生 / 全员可报名',
  content: '完成入职培训课程、签到参会、提交学习反馈，了解梦工场制度与成长规则。',
}

const initialAttachments: PublishAttachment[] = [
  { name: '培训安排.pdf', size: '1.24 MB', kind: 'pdf' },
  { name: '签到说明.docx', size: '312 KB', kind: 'doc' },
]

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
  const [requirements, setRequirements] = useState(['签到', '学习反馈', '现场互动', '附件上传'])
  const [customRequirement, setCustomRequirement] = useState('')
  const [attachments, setAttachments] = useState<PublishAttachment[]>(initialAttachments)
  const [groupMode, setGroupMode] = useState<'smart' | 'manual'>('smart')
  const [groupRule, setGroupRule] = useState('按岗位')
  const [showGroups, setShowGroups] = useState(false)
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

  const addRequirement = () => {
    const value = customRequirement.trim()
    if (!value || requirements.includes(value)) return
    setRequirements(previous => [...previous, value])
    setCustomRequirement('')
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

  const saveDraft = () => setNotice('活动草稿已保存，可稍后继续配置')

  const publishActivity = () => {
    if (!form.name.trim() || !form.date || !form.location.trim() || !form.content.trim()) {
      setNotice('请先完善活动名称、时间、地点和活动内容')
      return
    }
    setNotice(`“${form.name}”已发布，${totalPeople} 位实习生将收到活动通知`)
  }

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
              <label className="builder-field"><span>活动类型 <em>*</em></span><select value={form.type} onChange={event => updateField('type', event.target.value)}><option>通用活动</option><option>专业实践</option><option>成长培训</option><option>团队共创</option></select></label>
              <label className="builder-field builder-field-date"><span>活动时间 <em>*</em></span><div className="builder-time-fields"><input type="date" value={form.date} onChange={event => updateField('date', event.target.value)} /><input type="time" value={form.start} onChange={event => updateField('start', event.target.value)} /><i>—</i><input type="time" value={form.end} onChange={event => updateField('end', event.target.value)} /></div></label>
              <label className="builder-field"><span>活动地点 <em>*</em></span><input value={form.location} onChange={event => updateField('location', event.target.value)} placeholder="如：总部培训室 A" /></label>
              <label className="builder-field builder-field-stars"><span>星愿值 <em>*</em></span><div className="builder-number-input"><img src={statIcons.stars} alt="" aria-hidden="true" /><input type="number" min="1" max="200" value={form.stars} onChange={event => updateField('stars', event.target.value)} /><span>分</span></div></label>
              <label className="builder-field builder-field-participants"><span>参与人员 <em>*</em></span><select value={form.participants} onChange={event => updateField('participants', event.target.value)}><option>2026届实习生 / 全员可报名</option><option>2026届实习生 / 数字化方向</option><option>人力资源部 / 指定成员</option></select></label>
            </div>
          </div>

          <div className="builder-card builder-content-card">
            <div className="builder-section-heading"><b>B</b><div><h2>活动内容与要求</h2><p>告诉实习生要完成什么，以及如何获得星愿值</p></div></div>
            <div className="builder-content-grid">
              <label className="builder-field builder-textarea-field"><span>活动内容描述 <em>*</em></span><textarea maxLength={300} value={form.content} onChange={event => updateField('content', event.target.value)} /><small>{form.content.length}/300</small></label>
              <div className="builder-requirements">
                <span className="builder-field-label">活动要求 <em>*</em></span>
                <div className="requirement-list">{requirements.map(requirement => <button className="requirement-chip is-checked" type="button" key={requirement} onClick={() => setRequirements(previous => previous.filter(item => item !== requirement))}><span>✓</span>{requirement}</button>)}<button className="requirement-chip is-add" type="button" onClick={() => document.getElementById('custom-requirement')?.focus()}><span>＋</span> 添加要求</button></div>
                <div className="requirement-add-row"><input id="custom-requirement" value={customRequirement} onChange={event => setCustomRequirement(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') addRequirement() }} placeholder="输入自定义要求后回车" /><button type="button" onClick={addRequirement}>添加</button></div>
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

          <footer className="builder-footer-actions"><button className="builder-button is-cancel" type="button" onClick={onHome}>取消</button><button className="builder-button is-outline" type="button" onClick={saveDraft}>保存草稿</button><button className="builder-button is-outline" type="button" onClick={() => setNotice('预览已打开，当前活动尚未正式发布')}>预览活动</button><button className="builder-button is-primary" type="button" onClick={publishActivity}> 发布活动</button></footer>
        </section>
      </section>

      {showGroups && <div className="activity-modal-backdrop" role="presentation" onClick={() => setShowGroups(false)}><section className="activity-modal group-modal" role="dialog" aria-modal="true" aria-labelledby="group-modal-title" onClick={event => event.stopPropagation()}><header><div><span className="modal-eyebrow">C · 分组设置</span><h2 id="group-modal-title">{groupMode === 'smart' ? '智能分组名单' : '手动分组名单'}</h2></div><button type="button" onClick={() => setShowGroups(false)} aria-label="关闭">×</button></header><p className="modal-summary">共 {totalPeople} 位参与人员，当前按“{groupRule}”规则分为 {groups.length} 组</p><div className="modal-group-list">{groups.map(group => <div className="modal-group" key={group.name}><div><strong>{group.name}</strong><span>{group.count} 人</span></div><p>{group.members.join('、')}、以及其他成员</p></div>)}</div><footer><button className="builder-button is-light" type="button" onClick={() => setShowGroups(false)}>返回编辑</button><button className="builder-button is-primary" type="button" onClick={() => { setShowGroups(false); setNotice('分组名单已确认') }}>确认分组</button></footer></section></div>}
      {notice && <div className="activity-toast" role="status">{notice}</div>}
    </main>
  )
}
