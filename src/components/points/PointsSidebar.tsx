import { pointsPageImages } from '../../constants/assets'
import type { PointsPageId } from '../../types/points'

interface PointsSidebarProps {
  pageId: PointsPageId
  onPageChange: (pageId: PointsPageId) => void
}

const navigationItems: Array<{ id: PointsPageId; label: string; icon: string }> = [
  { id: 'ranking', label: '积分排名', icon: pointsPageImages.podium },
  { id: 'gifts', label: '礼品管理', icon: pointsPageImages.gift },
  { id: 'redemptions', label: '兑换记录', icon: pointsPageImages.redemption },
]

/** 星愿值中心共用的功能导航。 */
export function PointsSidebar({ pageId, onPageChange }: PointsSidebarProps) {
  return (
    <aside className="points-sidebar">
      <h2>功能模块</h2>
      <nav aria-label="星愿值排名功能导航">
        {navigationItems.map(item => (
          <button className={pageId === item.id ? 'is-active' : ''} type="button" key={item.id} onClick={() => onPageChange(item.id)}>
            <span className="points-side-icon"><img src={item.icon} alt="" /></span><span>{item.label}</span><i>›</i>
          </button>
        ))}
      </nav>
      <div className="points-sidebar-feature"><span className="points-feature-image"><img src={pointsPageImages.podium} alt="星愿值排名奖台" /></span><strong>星愿值激励</strong><p>积分排名、礼品兑换与线下发放一站式管理</p></div>
    </aside>
  )
}
