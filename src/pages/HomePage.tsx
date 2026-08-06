import { useEffect, useState } from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { taskService } from '../services/taskService'
import type { UserRole } from '../types/auth'
import type { ModuleItem, NavigationId } from '../types/task'

interface HomePageProps {
  role: UserRole
  onOpenTasks: () => void
  onOpenActivities: () => void
  onOpenPoints: () => void
}

const homeBackgrounds: Record<UserRole, string> = {
  admin: '/home-admin.png',
  intern: '/home-intern.png',
}

export function HomePage({ role, onOpenTasks, onOpenActivities, onOpenPoints }: HomePageProps) {
  const [modules, setModules] = useState<ModuleItem[]>([])
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => { taskService.getHomeModules(role).then(setModules) }, [role])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveModule(null) }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const openModule = (module: ModuleItem) => {
    if (module.id === 'tasks' && role === 'intern') onOpenTasks()
    else if (module.id === 'activities' && role === 'admin') onOpenActivities()
    else if (module.id === 'ranking' && role === 'admin') onOpenPoints()
    else setActiveModule(module)
  }

  const handleNavigation = (id: NavigationId, label: string) => {
    if (id === 'home') setNotice('已在青春梦工场首页')
    else if (id === 'tasks' && role === 'intern') onOpenTasks()
    else if (id === 'tasks' && role === 'admin') onOpenActivities()
    else if (id === 'points' && role === 'admin') onOpenPoints()
    else setNotice(`${label}模块将在后续阶段接入`)
  }

  return (
    <main className={`app-shell app-shell--${role}`}>
      <section className="game-stage" aria-label="青春梦工场互动地图首页">
        <img className="game-stage__background" src={homeBackgrounds[role]} alt="青春梦工场园区地图" />
        <button className="utility-hit utility-hit--growth" type="button" aria-label="查看本周成长" onClick={() => setNotice('本周已完成 7 项培养任务，成长进度 72%')} />
        <button className="utility-hit utility-hit--profile" type="button" aria-label="查看个人信息" onClick={() => setNotice(role === 'admin' ? '成长管理员 · 人力导师侧' : '梦想实习生 · Lv.6 · 星愿值 1280')} />
        <div className="module-layer" aria-label="成长模块入口">
          {modules.map(module => (
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
        <BottomNavigation active="home" onNavigate={handleNavigation} className="home-bottom-nav" />
        <div className="landscape-hint" role="status">横屏浏览体验更佳</div>
        {notice && <div className="toast" role="status" aria-live="polite">{notice}</div>}
        {activeModule && (
          <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) setActiveModule(null) }}>
            <section className="module-modal" role="dialog" aria-modal="true" aria-labelledby="module-modal-title">
              <div className="module-modal__emblem" aria-hidden="true">✦</div>
              <p className="module-modal__eyebrow">青春梦工场 · 模块预览</p>
              <h2 id="module-modal-title">{activeModule.name}</h2>
              <p>{activeModule.summary}</p>
              <p className="module-modal__coming">该模块将在后续阶段逐步接入。</p>
              <div className="module-modal__actions"><button type="button" onClick={() => setActiveModule(null)}>返回地图</button></div>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}
