import { statIcons } from '../constants/assets'
import type { TaskStats } from '../types/task'

export function StatsStrip({ stats }: { stats: TaskStats }) {
  const percent = Math.round((stats.completed / Math.max(stats.total, 1)) * 100)
  return (
    <section className="stats-strip" aria-label="本周任务概况">
      <div className="stat-block">
        <img className="stat-icon" src={statIcons.completion} alt="" aria-hidden="true" />
        <div><small>本周完成</small><strong>{stats.completed}/{stats.total}</strong></div>
        <div className="stat-progress" aria-label={`完成度${percent}%`}><i style={{ width: `${percent}%` }} /></div>
        <b>{percent}%</b>
      </div>
      <div className="stat-block">
        <img className="stat-icon" src={statIcons.stars} alt="" aria-hidden="true" />
        <div><small>已获星愿值</small><strong>{stats.stars}</strong></div>
      </div>
      <div className="stat-block">
        <img className="stat-icon" src={statIcons.calendar} alt="" aria-hidden="true" />
        <div><small>距本周结束</small><strong>{stats.daysRemaining}<em>天</em></strong></div>
      </div>
    </section>
  )
}

