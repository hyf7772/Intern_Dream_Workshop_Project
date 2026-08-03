import { useEffect, useMemo, useState } from 'react'

type ModuleItem = {
  id: string
  name: string
  summary: string
  className: string
  badge?: number
}

type TaskPageId = 'newcomer' | 'mainline' | 'professional'

type TaskItem = {
  id: string
  icon: string
  title: string
  description: string
  status?: string
  progress?: number
  progressLabel?: string
  meta?: string
  reward?: number
  ability?: string
  action: string
  actionDone?: string
  recommended?: boolean
}

type TaskSection = {
  title: string
  eyebrow?: string
  tasks: TaskItem[]
}

type TaskPageConfig = {
  id: TaskPageId
  title: string
  subtitle: string
  navIcon: string
  count: number
  stats: {
    complete: string
    percent: number
    stars: number
    days: number
  }
  sections: TaskSection[]
}

const modules: ModuleItem[] = [
  {
    id: 'recruit',
    name: '新星招募局',
    summary: '简历初筛、性格分析与实习生入营准备',
    className: 'hotspot--recruit',
  },
  {
    id: 'profile',
    name: '新星图鉴馆',
    summary: '查看能力标签、人才画像与个人成长轨迹',
    className: 'hotspot--profile',
  },
  {
    id: 'report',
    name: '通关成长册',
    summary: '沉淀实习回顾、阶段成果与最终成长报告',
    className: 'hotspot--report',
  },
  {
    id: 'tasks',
    name: '任务中心',
    summary: '进入新手任务、主线任务与专业任务',
    className: 'hotspot--tasks',
    badge: 3,
  },
  {
    id: 'ranking',
    name: '荣耀排位场',
    summary: '查看星愿值、成长排行与积分激励',
    className: 'hotspot--ranking',
  },
  {
    id: 'learning',
    name: '技能修炼馆',
    summary: '进入课程中心并查看学习计划与进度',
    className: 'hotspot--learning',
  },
  {
    id: 'assistant',
    name: 'AI新手村',
    summary: '向AI成长助手咨询制度、活动与实习问题',
    className: 'hotspot--assistant',
  },
]

const taskPages: Record<TaskPageId, TaskPageConfig> = {
  newcomer: {
    id: 'newcomer',
    title: '新手任务',
    subtitle: '完成入职准备，开启梦工场旅程',
    navIcon: '新',
    count: 5,
    stats: { complete: '3/5', percent: 60, stars: 120, days: 5 },
    sections: [
      {
        title: '入职准备',
        eyebrow: '快速完成资料与合规准备',
        tasks: [
          {
            id: 'resume-upload',
            icon: '简',
            title: '上传个人简历',
            description: '提交最新版简历，建立个人成长档案',
            status: '待上传',
            reward: 30,
            action: '上传简历',
            actionDone: '已上传',
          },
          {
            id: 'resume-improve',
            icon: 'AI',
            title: '完善个人简历',
            description: '根据AI建议补充项目成果与专业技能',
            progress: 75,
            progressLabel: '完整度 75%',
            reward: 50,
            action: '继续完善',
            actionDone: '已更新',
          },
          {
            id: 'office-rules',
            icon: '盾',
            title: '阅读实习办公要求',
            description: '了解办公规范、信息安全与保密要求',
            progress: 67,
            progressLabel: '阅读 2/3',
            reward: 40,
            action: '继续阅读',
            actionDone: '已阅读',
          },
        ],
      },
      {
        title: '新人活动',
        eyebrow: '认识分行、导师与同期伙伴',
        tasks: [
          {
            id: 'welcome-meeting',
            icon: '会',
            title: '暑期实习生见面会',
            description: '人力资源部 · 实习安排介绍与新人破冰交流',
            meta: '8月3日 14:30 · 培训室',
            reward: 60,
            action: '立即报名',
            actionDone: '已报名',
          },
          {
            id: 'branch-tour',
            icon: '行',
            title: '分行探索之旅',
            description: '参观办公区域，了解部门职能与分行文化',
            status: '剩余18名额',
            reward: 50,
            action: '查看活动',
            actionDone: '已查看',
          },
        ],
      },
    ],
  },
  mainline: {
    id: 'mainline',
    title: '主线任务',
    subtitle: '解锁本周重点，积累成长能量',
    navIcon: '主',
    count: 5,
    stats: { complete: '3/5', percent: 60, stars: 260, days: 2 },
    sections: [
      {
        title: '本周重点',
        eyebrow: '优先完成本周核心成长事项',
        tasks: [
          {
            id: 'weekly-course',
            icon: '课',
            title: '完成本周视频课学习计划',
            description: '银行基础知识、服务礼仪与信息安全',
            progress: 67,
            progressLabel: '进度 2/3',
            meta: '剩余约25分钟',
            reward: 100,
            action: '继续学习',
            actionDone: '已进入课程',
            recommended: true,
          },
          {
            id: 'service-experience',
            icon: '服',
            title: '客户服务体验活动',
            description: '参与活动并提交一份匿名观察记录',
            status: '已报名',
            meta: '剩余2天',
            reward: 120,
            action: '查看任务',
            actionDone: '已查看',
          },
        ],
      },
      {
        title: '精选活动',
        eyebrow: '人力资源部根据培养阶段为你推荐',
        tasks: [
          {
            id: 'youth-sharing',
            icon: '享',
            title: '青年员工成长分享会',
            description: '从实习生成长为青年骨干',
            meta: '周五 15:00 · 线上直播',
            reward: 60,
            action: '立即报名',
            actionDone: '已报名',
            recommended: true,
          },
          {
            id: 'finance-lecture',
            icon: '知',
            title: '金融知识专题活动',
            description: '结合案例了解金融服务与风险意识',
            status: '报名中',
            reward: 50,
            action: '查看活动',
            actionDone: '已查看',
          },
          {
            id: 'department-exchange',
            icon: '联',
            title: '跨部门交流工作坊',
            description: '与不同岗位实习生共同完成主题交流',
            meta: '下周二 14:00',
            reward: 50,
            action: '了解详情',
            actionDone: '已查看',
          },
        ],
      },
    ],
  },
  professional: {
    id: 'professional',
    title: '专业任务',
    subtitle: '完成岗位实践，解锁专业能力标签',
    navIcon: '专',
    count: 5,
    stats: { complete: '2/5', percent: 40, stars: 140, days: 4 },
    sections: [
      {
        title: '岗位标准任务',
        eyebrow: '当前岗位：零售业务岗 · 本周重点：客户服务与沟通表达',
        tasks: [
          {
            id: 'greet-customer',
            icon: '迎',
            title: '迎接1位客户',
            description: '在工作人员指导下完成规范问候',
            progress: 0,
            progressLabel: '0/1',
            reward: 30,
            ability: '服务意识',
            action: '开始任务',
            actionDone: '进行中',
            recommended: true,
          },
          {
            id: 'business-guidance',
            icon: '引',
            title: '完成一次业务指引',
            description: '准确说明办理区域和基本流程',
            status: '进行中',
            reward: 40,
            ability: '沟通表达',
            action: '记录完成',
            actionDone: '已记录',
          },
          {
            id: 'hall-observation',
            icon: '观',
            title: '观察一次厅堂服务',
            description: '提交一条不含客户敏感信息的匿名记录',
            progress: 0,
            progressLabel: '0/1',
            reward: 40,
            ability: '需求洞察',
            action: '填写记录',
            actionDone: '已填写',
          },
          {
            id: 'business-area',
            icon: '区',
            title: '熟悉常见业务区域',
            description: '了解现金区、非现金区和智能服务区',
            progress: 67,
            progressLabel: '2/3',
            reward: 30,
            ability: '业务认知',
            action: '继续了解',
            actionDone: '已更新',
          },
          {
            id: 'service-review',
            icon: '复',
            title: '完成一次服务复盘',
            description: '回顾服务过程，记录收获和改进方向',
            progress: 0,
            progressLabel: '0/1',
            reward: 50,
            ability: '复盘能力',
            action: '开始复盘',
            actionDone: '进行中',
          },
        ],
      },
    ],
  },
}

const navItems = [
  { id: 'home', icon: '⌂', label: '梦工场' },
  { id: 'tasks', icon: '▣', label: '任务' },
  { id: 'growth', icon: '♧', label: '成长' },
  { id: 'points', icon: '★', label: '积分' },
  { id: 'mine', icon: '●', label: '我的' },
]

const isTaskPageId = (value: string): value is TaskPageId =>
  value === 'newcomer' || value === 'mainline' || value === 'professional'

const readTaskPageFromHash = (): TaskPageId | null => {
  const value = window.location.hash.replace('#/tasks/', '')
  return isTaskPageId(value) ? value : null
}

function PlayerPanel() {
  return (
    <div className="player-panel" aria-label="梦想实习生，六级，星愿值1280">
      <div className="player-avatar" aria-hidden="true">🧑🏻‍💼</div>
      <div className="player-copy">
        <strong>梦想实习生</strong>
        <span><b>Lv.6</b><i aria-hidden="true" /></span>
      </div>
      <div className="player-stars"><span aria-hidden="true">★</span>1280</div>
    </div>
  )
}

function StatsStrip({ page }: { page: TaskPageConfig }) {
  return (
    <section className="stats-strip" aria-label="本周任务概况">
      <div className="stat-block">
        <span className="stat-icon stat-icon--progress" aria-hidden="true">✓</span>
        <div>
          <small>本周完成</small>
          <strong>{page.stats.complete}</strong>
        </div>
        <div className="stat-progress" aria-label={`完成度${page.stats.percent}%`}>
          <i style={{ width: `${page.stats.percent}%` }} />
        </div>
        <b>{page.stats.percent}%</b>
      </div>
      <div className="stat-block">
        <span className="stat-icon stat-icon--star" aria-hidden="true">★</span>
        <div>
          <small>已获星愿值</small>
          <strong>{page.stats.stars}</strong>
        </div>
      </div>
      <div className="stat-block">
        <span className="stat-icon stat-icon--calendar" aria-hidden="true">日</span>
        <div>
          <small>距本周结束</small>
          <strong>{page.stats.days}<em>天</em></strong>
        </div>
      </div>
    </section>
  )
}

function TaskSidebar({
  activePage,
  onChange,
}: {
  activePage: TaskPageId
  onChange: (page: TaskPageId) => void
}) {
  const order: TaskPageId[] = ['newcomer', 'mainline', 'professional']

  return (
    <aside className="task-sidebar" aria-label="任务分类">
      <p className="task-sidebar__title">任务分类</p>
      <div className="task-sidebar__nav">
        {order.map((pageId) => {
          const page = taskPages[pageId]
          return (
            <button
              key={page.id}
              type="button"
              className={activePage === page.id ? 'is-active' : ''}
              aria-current={activePage === page.id ? 'page' : undefined}
              onClick={() => onChange(page.id)}
            >
              <span className="sidebar-icon" aria-hidden="true">{page.navIcon}</span>
              <strong>{page.title}</strong>
              <small>{page.count}</small>
            </button>
          )
        })}
      </div>
      <div className="sidebar-companion" aria-hidden="true">
        <span>✦</span>
        <div>成长旅程</div>
        <small>每一次完成<br />都在点亮未来</small>
      </div>
    </aside>
  )
}

function MentorCard({ onAction }: { onAction: (message: string) => void }) {
  return (
    <section className="mentor-section" aria-labelledby="mentor-heading">
      <div className="section-heading">
        <div>
          <h2 id="mentor-heading">导师带教</h2>
          <p>关注方向、反馈与沟通安排</p>
        </div>
        <span>不计星愿值</span>
      </div>
      <div className="mentor-card">
        <div className="mentor-avatar" aria-hidden="true">👩🏻‍💼</div>
        <div className="mentor-copy">
          <h3>导师：陈老师 <span>零售金融部</span></h3>
          <p><b>本周指导：</b>观察厅堂服务流程，重点关注客户需求识别</p>
          <p><b>最近反馈：</b>沟通主动性较好，可进一步提升产品理解</p>
        </div>
        <div className="mentor-time">
          <small>下次沟通</small>
          <strong>8月2日 16:00</strong>
          <span>待沟通</span>
        </div>
        <div className="mentor-actions">
          <button type="button" onClick={() => onAction('已为你打开导师沟通入口')}>联系导师</button>
          <button type="button" onClick={() => onAction('学习记录提交入口已打开')}>提交学习记录</button>
        </div>
      </div>
    </section>
  )
}

function TaskRow({
  task,
  completed,
  onAction,
}: {
  task: TaskItem
  completed: boolean
  onAction: (task: TaskItem) => void
}) {
  return (
    <article className={`task-row ${task.recommended ? 'is-recommended' : ''}`}>
      {task.recommended && <span className="recommended-ribbon">推荐</span>}
      <div className="task-row__icon" aria-hidden="true">{task.icon}</div>
      <div className="task-row__copy">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-row__status">
        {typeof task.progress === 'number' ? (
          <>
            <strong>{completed ? '已更新' : task.progressLabel}</strong>
            <div className="row-progress" aria-hidden="true">
              <i style={{ width: `${completed ? 100 : task.progress}%` }} />
            </div>
          </>
        ) : (
          <strong>{completed ? task.actionDone : task.status || task.meta}</strong>
        )}
        {task.meta && typeof task.progress === 'number' && <small>{task.meta}</small>}
      </div>
      <div className="task-row__ability">
        {task.ability && <span>{task.ability}</span>}
      </div>
      <div className="task-row__reward">
        {task.reward ? <><span aria-hidden="true">★</span><strong>+{task.reward}</strong><small>星愿值</small></> : null}
      </div>
      <button
        type="button"
        className={completed ? 'is-complete' : ''}
        disabled={completed}
        onClick={() => onAction(task)}
      >
        {completed ? task.actionDone : task.action}
      </button>
    </article>
  )
}

function BottomNavigation({
  onHome,
  onNotice,
}: {
  onHome: () => void
  onNotice: (message: string) => void
}) {
  return (
    <nav className="task-bottom-nav" aria-label="主要导航">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === 'tasks' ? 'is-active' : ''}
          aria-current={item.id === 'tasks' ? 'page' : undefined}
          onClick={() => {
            if (item.id === 'home') onHome()
            else if (item.id === 'tasks') onNotice('已在任务中心')
            else onNotice(`${item.label}模块将在后续阶段接入`)
          }}
        >
          <span aria-hidden="true">{item.icon}</span>
          <strong>{item.label}</strong>
        </button>
      ))}
    </nav>
  )
}

function TaskCenterPage({
  pageId,
  onPageChange,
  onHome,
}: {
  pageId: TaskPageId
  onPageChange: (page: TaskPageId) => void
  onHome: () => void
}) {
  const page = taskPages[pageId]
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({})
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const handleTaskAction = (task: TaskItem) => {
    setCompletedActions((current) => ({ ...current, [task.id]: true }))
    setNotice(`${task.title}：${task.actionDone || '操作成功'}`)
  }

  return (
    <main className={`task-page task-page--${page.id}`}>
      <div className="task-page__background" aria-hidden="true" />
      <header className="task-header">
        <div className="task-title-block">
          <button type="button" className="breadcrumb-home" onClick={onHome} aria-label="返回梦工场首页">⌂</button>
          <div>
            <p className="task-breadcrumb">梦工场 <span>›</span> 任务中心 <span>›</span> {page.title}</p>
            <h1>{page.title}<i aria-hidden="true">✦</i></h1>
            <p>{page.subtitle}</p>
          </div>
        </div>
        <PlayerPanel />
        <StatsStrip page={page} />
      </header>

      <div className="task-layout">
        <TaskSidebar activePage={page.id} onChange={onPageChange} />
        <section className="task-content" aria-label={`${page.title}内容`}>
          {page.id === 'professional' && <MentorCard onAction={setNotice} />}
          {page.sections.map((section) => (
            <section className="task-section" key={section.title} aria-labelledby={`${page.id}-${section.title}`}>
              <div className="section-heading">
                <div>
                  <h2 id={`${page.id}-${section.title}`}>{section.title}</h2>
                  {section.eyebrow && <p>{section.eyebrow}</p>}
                </div>
                <span>{section.tasks.length}项</span>
              </div>
              <div className="task-list">
                {section.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    completed={Boolean(completedActions[task.id])}
                    onAction={handleTaskAction}
                  />
                ))}
              </div>
            </section>
          ))}
          {page.id === 'professional' && (
            <div className="compliance-notice" role="note">
              请勿记录客户姓名、账号、联系方式及其他敏感信息；所有客户服务实践须在导师指导下完成。
            </div>
          )}
        </section>
      </div>

      <BottomNavigation onHome={onHome} onNotice={setNotice} />
      {notice && <div className="task-toast" role="status" aria-live="polite">{notice}</div>}
    </main>
  )
}

function HomePage({ onOpenTasks }: { onOpenTasks: () => void }) {
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModule(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const openModule = (module: ModuleItem) => {
    if (module.id === 'tasks') {
      onOpenTasks()
      return
    }
    setActiveModule(module)
  }

  const handleNav = (id: string, label: string) => {
    if (id === 'home') setNotice('已在青春梦工场首页')
    else if (id === 'tasks') onOpenTasks()
    else setNotice(`${label}模块将在后续阶段接入`)
  }

  return (
    <main className="app-shell">
      <section className="game-stage" aria-label="青春梦工场互动地图首页">
        <img className="game-stage__background" src="/dream-factory-home.png" alt="青春梦工场园区地图" />
        <button className="utility-hit utility-hit--growth" type="button" aria-label="查看本周成长" onClick={() => setNotice('本周已完成5项任务，学习进度72%，连续打卡12天')} />
        <button className="utility-hit utility-hit--profile" type="button" aria-label="查看个人信息" onClick={() => setNotice('梦想实习生 · Lv.6 · 星愿值1280')} />

        <div className="module-layer" aria-label="成长模块入口">
          {modules.map((module) => (
            <button key={module.id} type="button" className={`module-hotspot ${module.className}`} aria-label={`打开${module.name}：${module.summary}`} onClick={() => openModule(module)}>
              <span className="module-hotspot__glow" aria-hidden="true" />
              <span className="module-hotspot__tip">
                <strong>{module.name}</strong>
                <small>{module.summary}</small>
                <span>点击进入</span>
              </span>
            </button>
          ))}
        </div>

        <nav className="bottom-hit-layer" aria-label="底部导航">
          {navItems.map((item) => (
            <button key={item.id} type="button" className={`nav-hit nav-hit--${item.id}`} aria-label={item.label} onClick={() => handleNav(item.id, item.label)} />
          ))}
        </nav>

        <div className="landscape-hint" role="status">横屏浏览体验更佳</div>
        {notice && <div className="toast" role="status" aria-live="polite">{notice}</div>}

        {activeModule && (
          <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setActiveModule(null) }}>
            <section className="module-modal" role="dialog" aria-modal="true" aria-labelledby="module-modal-title">
              <div className="module-modal__emblem" aria-hidden="true">✦</div>
              <p className="module-modal__eyebrow">青春梦工场 · 模块预览</p>
              <h2 id="module-modal-title">{activeModule.name}</h2>
              <p>{activeModule.summary}</p>
              <p className="module-modal__coming">该模块将在后续阶段逐步接入。</p>
              <div className="module-modal__actions">
                <button type="button" onClick={() => setActiveModule(null)}>返回地图</button>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}

function App() {
  const [taskPage, setTaskPage] = useState<TaskPageId | null>(() => readTaskPageFromHash())

  useEffect(() => {
    const handleHashChange = () => setTaskPage(readTaskPageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToTaskPage = (page: TaskPageId) => {
    window.location.hash = `/tasks/${page}`
    setTaskPage(page)
  }

  const navigateHome = () => {
    window.history.pushState(null, '', window.location.pathname)
    setTaskPage(null)
  }

  return useMemo(
    () => taskPage
      ? <TaskCenterPage pageId={taskPage} onPageChange={navigateToTaskPage} onHome={navigateHome} />
      : <HomePage onOpenTasks={() => navigateToTaskPage('newcomer')} />,
    [taskPage],
  )
}

export default App
