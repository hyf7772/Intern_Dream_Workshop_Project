import { statIcons } from '../constants/assets'
import type { UserSummary } from '../types/task'

export function PlayerPanel({ user }: { user: UserSummary }) {
  return (
    <div className="player-panel" aria-label={`${user.displayName}，${user.level}级，星愿值${user.stars}`}>
      <div className="player-avatar" aria-hidden="true">🧑🏻‍💼</div>
      <div className="player-copy">
        <strong>{user.displayName}</strong>
        <span><b>Lv.{user.level}</b><i aria-hidden="true" /></span>
      </div>
      <div className="player-stars"><img src={statIcons.stars} alt="" aria-hidden="true" />{user.stars}</div>
    </div>
  )
}

