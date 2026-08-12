import { useState } from 'react'

const welcomeImages = [
  { src: '/assets/intern-welcome-01-childrens-day.png', alt: '2026 六一儿童节快乐' },
  { src: '/assets/intern-welcome-02-party-day.png', alt: '2026 七一建党节' },
  { src: '/assets/intern-welcome-03-qixi.png', alt: '2026 七夕快乐' },
  { src: '/assets/intern-welcome-04-birthday.png', alt: '2026 生日快乐' },
]

interface InternWelcomeCarouselProps {
  onComplete: () => void
}

export function InternWelcomeCarousel({ onComplete }: InternWelcomeCarouselProps) {
  const [index, setIndex] = useState(0)
  const isLastPage = index === welcomeImages.length - 1

  const advance = () => {
    if (isLastPage) {
      onComplete()
      return
    }
    setIndex(currentIndex => currentIndex + 1)
  }

  return (
    <div className="intern-welcome-backdrop" role="presentation">
      <section className="intern-welcome-carousel" role="dialog" aria-modal="true" aria-label="节日祝福">
        <span className="intern-welcome-carousel__progress" aria-live="polite">{index + 1} / {welcomeImages.length}</span>
        <button className="intern-welcome-carousel__close" type="button" onClick={advance} aria-label={isLastPage ? '完成祝福并进入梦工场' : '查看下一张祝福图片'}>×</button>
        <button className="intern-welcome-carousel__image-button" type="button" onClick={advance} aria-label={isLastPage ? '完成祝福并进入梦工场' : '查看下一张祝福图片'}>
          <img src={welcomeImages[index].src} alt={welcomeImages[index].alt} />
        </button>
        <span className="intern-welcome-carousel__hint">{isLastPage ? '点击进入梦工场' : '点击图片或右上角 × 查看下一张'}</span>
      </section>
    </div>
  )
}
