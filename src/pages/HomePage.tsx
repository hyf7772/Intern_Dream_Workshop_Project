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
  onReturnRoleSelection: () => void
}

const homeBackgrounds: Record<UserRole, string> = {
  admin: '/home-admin.png',
  intern: '/home-intern.png',
}

export function HomePage({ role, onOpenTasks, onOpenActivities, onOpenPoints, onReturnRoleSelection }: HomePageProps) {
  const [modules, setModules] = useState<ModuleItem[]>([])
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [notice, setNotice] = useState('')

  const closeModulePreview = () => {
    setActiveModule(null)
    setPreviewIndex(0)
  }

  const activePreviewImages = activeModule?.previewImages ?? (activeModule?.previewImage ? [activeModule.previewImage] : [])
  const isGrowthJournal = activePreviewImages.length > 1

  const advancePreview = () => {
    if (previewIndex >= activePreviewImages.length - 1) {
      closeModulePreview()
      return
    }
    setPreviewIndex(index => index + 1)
  }

  useEffect(() => { taskService.getHomeModules(role).then(setModules) }, [role])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeModulePreview() }
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
    else {
      setPreviewIndex(0)
      setActiveModule(module)
    }
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
        <button className="role-selection-back" type="button" onClick={onReturnRoleSelection} aria-label="返回身份选择页">
          <span aria-hidden="true">‹</span> 返回身份选择
        </button>
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
          <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) closeModulePreview() }}>
            {activePreviewImages.length > 0 ? (
              <section className={`module-image-modal${isGrowthJournal ? ' module-image-modal--journal' : ''}`} role="dialog" aria-modal="true" aria-label={`${activeModule.name}展示`}>
                <button className="module-image-modal__close" type="button" onClick={closeModulePreview} aria-label="关闭并返回实习生主页面">×</button>
                {isGrowthJournal && <span className="module-image-modal__progress" aria-live="polite">{previewIndex + 1} / {activePreviewImages.length}</span>}
                {isGrowthJournal ? (
                  <button
                    className="module-image-modal__image-button"
                    type="button"
                    onClick={advancePreview}
                    aria-label={previewIndex === activePreviewImages.length - 1 ? '完成成长回顾并返回实习生主页面' : `查看成长回顾第 ${previewIndex + 2} 页`}
                  >
                    <img src={activePreviewImages[previewIndex]} alt={`${activeModule.previewAlt ?? activeModule.name}（第 ${previewIndex + 1} 页）`} />
                  </button>
                ) : (
                  <img src={activePreviewImages[0]} alt={activeModule.previewAlt ?? activeModule.name} />
                )}
                {isGrowthJournal && <span className="module-image-modal__hint">{previewIndex === activePreviewImages.length - 1 ? '点击完成回顾' : '点击图片查看下一页'}</span>}
              </section>
            ) : (
              <section className="module-modal" role="dialog" aria-modal="true" aria-labelledby="module-modal-title">
                <div className="module-modal__emblem" aria-hidden="true">✦</div>
                <p className="module-modal__eyebrow">青春梦工场 · 模块预览</p>
                <h2 id="module-modal-title">{activeModule.name}</h2>
                <p>{activeModule.summary}</p>
                <p className="module-modal__coming">该模块将在后续阶段逐步接入。</p>
                <div className="module-modal__actions"><button type="button" onClick={closeModulePreview}>返回地图</button></div>
              </section>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
