import { useEffect, useState } from 'react'
import { GiftModule, PointsHeader, PointsSidebar, RankingModule, RedemptionModule } from '../components/points'
import type { PointsPageId } from '../types/points'

interface PointsPageProps {
  pageId: PointsPageId
  onPageChange: (pageId: PointsPageId) => void
  onHome: () => void
}

/** 星愿值中心页面壳，只负责页面导航、提示消息和业务模块编排。 */
export function PointsPage({ pageId, onPageChange, onHome }: PointsPageProps) {
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2400)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const showNotice = (message: string) => setNotice(message)

  return (
    <main className="points-page">
      <PointsHeader pageId={pageId} onHome={onHome} />

      <section className="points-workspace">
        <PointsSidebar pageId={pageId} onPageChange={onPageChange} />
        <section className="points-page-content">
          {pageId === 'ranking' && <RankingModule onNotice={showNotice} />}
          {pageId === 'gifts' && <GiftModule onNotice={showNotice} />}
          {pageId === 'redemptions' && <RedemptionModule onNotice={showNotice} />}
        </section>
      </section>

      {notice && <div className="points-toast" role="status">{notice}</div>}
    </main>
  )
}
