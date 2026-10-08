import type { ModuleItem } from '../../types/task'

interface ModulePreviewModalProps {
  module: ModuleItem
  previewIndex: number
  onClose: () => void
  onAdvance: () => void
}

/** 首页地图模块的统一预览弹窗，兼容单张预览和成长日志多页预览。 */
export function ModulePreviewModal({ module, previewIndex, onClose, onAdvance }: ModulePreviewModalProps) {
  const previewImages = module.previewImages ?? (module.previewImage ? [module.previewImage] : [])
  const isGrowthJournal = previewImages.length > 1

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose() }}>
      {previewImages.length > 0 ? (
        <section className={`module-image-modal${isGrowthJournal ? ' module-image-modal--journal' : ''}`} role="dialog" aria-modal="true" aria-label={`${module.name}展示`}>
          <button className="module-image-modal__close" type="button" onClick={onClose} aria-label="关闭并返回实习生主页面">×</button>
          {isGrowthJournal && <span className="module-image-modal__progress" aria-live="polite">{previewIndex + 1} / {previewImages.length}</span>}
          {isGrowthJournal ? (
            <button
              className="module-image-modal__image-button"
              type="button"
              onClick={onAdvance}
              aria-label={previewIndex === previewImages.length - 1 ? '完成成长回顾并返回实习生主页面' : `查看成长回顾第 ${previewIndex + 2} 页`}
            >
              <img src={previewImages[previewIndex]} alt={`${module.previewAlt ?? module.name}（第 ${previewIndex + 1} 页）`} />
            </button>
          ) : (
            <img src={previewImages[0]} alt={module.previewAlt ?? module.name} />
          )}
          {isGrowthJournal && <span className="module-image-modal__hint">{previewIndex === previewImages.length - 1 ? '点击完成回顾' : '点击图片查看下一页'}</span>}
        </section>
      ) : (
        <section className="module-modal" role="dialog" aria-modal="true" aria-labelledby="module-modal-title">
          <div className="module-modal__emblem" aria-hidden="true">✦</div>
          <p className="module-modal__eyebrow">青春梦工场 · 模块预览</p>
          <h2 id="module-modal-title">{module.name}</h2>
          <p>{module.summary}</p>
          <p className="module-modal__coming">该模块将在后续阶段逐步接入。</p>
          <div className="module-modal__actions"><button type="button" onClick={onClose}>返回地图</button></div>
        </section>
      )}
    </div>
  )
}
