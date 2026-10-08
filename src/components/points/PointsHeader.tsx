import { pointsPageImages } from '../../constants/assets'
import type { PointsPageId } from '../../types/points'

interface PointsHeaderProps {
  pageId: PointsPageId
  onHome: () => void
}

const pageLabels: Record<PointsPageId, string> = {
  ranking: '积分排名',
  gifts: '礼品管理',
  redemptions: '兑换记录',
}

/** 星愿值中心共用的管理者顶部栏。 */
export function PointsHeader({ pageId, onHome }: PointsHeaderProps) {
  return (
    <header className="points-topbar">
      <button className="points-brand-placeholder" type="button" onClick={onHome} aria-label="返回梦工场首页">
        <span className="points-brand-image-slot"><img src={pointsPageImages.podium} alt="星愿值排名奖台" /></span>
      </button>
      <div className="points-title-block">
        <p className="points-breadcrumb">管理侧 <span>›</span> 星愿值排名 <span>›</span> {pageLabels[pageId]}</p>
        <h1>星愿值排名 <i>✦</i></h1>
        <p>积分激励、礼品兑换与发放管理</p>
      </div>
      <div className="points-top-status">
        <span className="points-top-avatar-slot"><img src={pointsPageImages.adminAvatar} alt="管理员头像" /></span>
        <div><span className="points-status-line"><span className="points-status-dot" />阳洁</span><strong>星愿值中心</strong></div>
      </div>
    </header>
  )
}
