import { useEffect, useState } from 'react'

type ModuleItem = {
  id: string
  name: string
  summary: string
  className: string
  badge?: number
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

const navItems = [
  { id: 'home', label: '梦工厂', className: 'nav-hit--home' },
  { id: 'tasks', label: '任务', className: 'nav-hit--tasks' },
  { id: 'growth', label: '成长', className: 'nav-hit--growth' },
  { id: 'points', label: '积分', className: 'nav-hit--points' },
  { id: 'mine', label: '我的', className: 'nav-hit--mine' },
]

function App() {
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
    setActiveModule(module)
  }

  const handleNav = (id: string, label: string) => {
    if (id === 'home') {
      setNotice('已在青春梦工厂首页')
      return
    }

    if (id === 'tasks') {
      const taskModule = modules.find((module) => module.id === 'tasks')
      if (taskModule) openModule(taskModule)
      return
    }

    setNotice(`${label}模块将在后续阶段接入`)
  }

  return (
    <main className="app-shell">
      <section className="game-stage" aria-label="青春梦工厂互动地图首页">
        <img
          className="game-stage__background"
          src="/dream-factory-home.png"
          alt="青春梦工厂园区地图，包含七个实习生成长模块"
        />

        <button
          className="utility-hit utility-hit--growth"
          type="button"
          aria-label="查看本周成长"
          onClick={() => setNotice('本周已完成5项任务，学习进度72%，连续打卡12天')}
        />
        <button
          className="utility-hit utility-hit--profile"
          type="button"
          aria-label="查看梦想实习生个人信息"
          onClick={() => setNotice('梦想实习生 · Lv.6 · 星愿值1280')}
        />

        <div className="module-layer" aria-label="成长模块入口">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              className={`module-hotspot ${module.className}`}
              aria-label={`打开${module.name}：${module.summary}`}
              onClick={() => openModule(module)}
            >
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
            <button
              key={item.id}
              type="button"
              className={`nav-hit ${item.className}`}
              aria-label={item.label}
              onClick={() => handleNav(item.id, item.label)}
            />
          ))}
        </nav>

        <div className="landscape-hint" role="status">
          横屏浏览体验更佳
        </div>

        {notice && (
          <div className="toast" role="status" aria-live="polite">
            {notice}
          </div>
        )}

        {activeModule && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setActiveModule(null)
            }}
          >
            <section
              className="module-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="module-modal-title"
            >
              <div className="module-modal__emblem" aria-hidden="true">
                {activeModule.id === 'tasks' ? '!' : '✦'}
              </div>
              <p className="module-modal__eyebrow">青春梦工厂 · 模块预览</p>
              <h2 id="module-modal-title">{activeModule.name}</h2>
              <p>{activeModule.summary}</p>
              {activeModule.id === 'tasks' ? (
                <div className="module-modal__preview">
                  <span>新手任务</span>
                  <span>主线任务</span>
                  <span>专业任务</span>
                </div>
              ) : (
                <p className="module-modal__coming">该模块将在后续阶段逐步接入。</p>
              )}
              <div className="module-modal__actions">
                <button type="button" onClick={() => setActiveModule(null)}>
                  返回地图
                </button>
                {activeModule.id === 'tasks' && (
                  <button
                    type="button"
                    className="module-modal__primary"
                    onClick={() => setNotice('任务中心将在下一阶段开发')}
                  >
                    下一阶段接入
                  </button>
                )}
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
