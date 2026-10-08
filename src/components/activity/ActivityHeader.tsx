import { activityConfigIcons, profileAvatars } from '../../constants/assets'

interface ActivityHeaderProps {
  icon: string
  title: string
  subtitle: string
  crumb: string
  onHome: () => void
}

/** 活动配置页面共用的顶部品牌、面包屑和用户信息。 */
export function ActivityHeader({ icon, title, subtitle, crumb, onHome }: ActivityHeaderProps) {
  return (
    <header className="activity-header">
      <button className="activity-brand" type="button" onClick={onHome} aria-label="返回梦工场首页">
        <img className="activity-brand__icon" src={icon || activityConfigIcons.general} alt="" aria-hidden="true" />
      </button>
      <div className="activity-heading">
        <p className="activity-crumb">梦工场 <span>›</span> 活动配置中心 <span>›</span> {crumb}</p>
        <h1>{title} <i>✦</i></h1>
        <p>{subtitle}</p>
      </div>
      <aside className="activity-user-card" aria-label="当前登录用户">
        <div className="activity-user-card__avatar" aria-hidden="true"><img src={profileAvatars.activityManager} alt="" /></div>
        <div><strong>阳洁</strong><small>活动配置中心</small></div>
      </aside>
    </header>
  )
}
