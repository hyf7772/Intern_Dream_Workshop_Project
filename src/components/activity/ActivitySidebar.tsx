import { activityConfigIcons } from '../../constants/assets'
import type { ActivityPageId } from '../../types/activity'

interface ActivitySidebarProps {
  activePage: ActivityPageId
  onPageChange: (pageId: ActivityPageId) => void
  className?: string
  illustration: {
    src: string
    alt: string
    title: string
    description: string
  }
}

const navigationItems: Array<{ id: ActivityPageId; label: string; icon: string }> = [
  { id: 'general', label: '通用活动总览', icon: activityConfigIcons.general },
  { id: 'professional', label: '专业活动总览', icon: activityConfigIcons.professional },
  { id: 'publish', label: '活动发布', icon: activityConfigIcons.publish },
  { id: 'review', label: '通用活动复盘', icon: activityConfigIcons.review },
  { id: 'review-professional', label: '专业活动复盘', icon: activityConfigIcons.review },
]

/** 活动配置页面共用的功能导航，页面只需提供当前项和跳转方法。 */
export function ActivitySidebar({ activePage, onPageChange, className, illustration }: ActivitySidebarProps) {
  return (
    <aside className={`activity-sidebar${className ? ` ${className}` : ''}`}>
      <h2>功能模块</h2>
      <nav aria-label="活动配置功能导航">
        {navigationItems.map(item => (
          <button className={activePage === item.id ? 'is-selected' : ''} type="button" key={item.id} onClick={() => onPageChange(item.id)}>
            <img className="activity-nav-icon" src={item.icon} alt="" aria-hidden="true" />{item.label}<i>›</i>
          </button>
        ))}
      </nav>
      <div className="activity-sidebar__illustration">
        <img src={illustration.src} alt={illustration.alt} />
        <strong>{illustration.title}</strong>
        <p>{illustration.description}</p>
      </div>
    </aside>
  )
}
