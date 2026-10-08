import { useMemo, useState } from 'react'
import { pointsService } from '../../services/pointsService'
import type { PointsPeriod, RankingMember } from '../../types/points'
import { formatNumber, rankingAvatarAssets, rankingMedalAssets } from './pointsModuleUtils'

interface RankingModuleProps {
  onNotice: (message: string) => void
}

const periodLabels: Record<PointsPeriod, string> = { week: '本周', month: '本月', quarter: '近三个月' }
const periodField: Record<PointsPeriod, 'weekly' | 'monthly' | 'quarter'> = { week: 'weekly', month: 'monthly', quarter: 'quarter' }
const getPeriodScore = (member: RankingMember, period: PointsPeriod) => member[periodField[period]]

export function RankingModule({ onNotice }: RankingModuleProps) {
  const [rankingMembers] = useState(() => pointsService.getRankingMembers())
  const [period, setPeriod] = useState<PointsPeriod>('month')
  const [department, setDepartment] = useState('全部部门')
  const [position, setPosition] = useState('全部岗位')
  const [query, setQuery] = useState('')
  const departments = Array.from(new Set(rankingMembers.map(member => member.department)))
  const positions = Array.from(new Set(rankingMembers.map(member => member.position)))
  const filtered = useMemo(() => rankingMembers
    .filter(member => (department === '全部部门' || member.department === department)
      && (position === '全部岗位' || member.position === position)
      && (!query.trim() || member.name.includes(query.trim())))
    .sort((a, b) => getPeriodScore(b, period) - getPeriodScore(a, period)), [department, position, query, period, rankingMembers])
  const topThree = filtered.slice(0, 3)
  const remaining = filtered.slice(3, 10)
  const scoreLabel = period === 'week' ? '本周新增' : period === 'month' ? '本期新增' : '近三个月新增'

  return (
    <section className="points-module ranking-module">
      <div className="points-module-heading"><div><h2>积分排名</h2><p>按周期查看实习生星愿值排名与成长表现</p></div><button className="points-outline-button" type="button" onClick={() => onNotice('排名数据已准备导出')}>导出排名</button></div>
      <div className="points-filter-row ranking-filter-row"><label><span>部门</span><select value={department} onChange={event => setDepartment(event.target.value)}><option>全部部门</option>{departments.map(item => <option key={item}>{item}</option>)}</select></label><label><span>实习岗位</span><select value={position} onChange={event => setPosition(event.target.value)}><option>全部岗位</option>{positions.map(item => <option key={item}>{item}</option>)}</select></label><label className="points-search-field"><span>姓名</span><div><input value={query} onChange={event => setQuery(event.target.value)} placeholder="请输入实习生姓名" /><b>⌕</b></div></label></div>
      <div className="ranking-periods" role="tablist" aria-label="排名周期"><span>排名周期</span>{(Object.keys(periodLabels) as PointsPeriod[]).map(item => <button className={period === item ? 'is-active' : ''} type="button" role="tab" aria-selected={period === item} key={item} onClick={() => setPeriod(item)}>{periodLabels[item]}</button>)}</div>

      <div className="ranking-section-title"><h3>★ TOP 3</h3><span>{periodLabels[period]} · 共 {filtered.length} 人</span></div>
      <div className="ranking-top-three">{topThree.map((member, index) => <article className={`ranking-top-card rank-${index + 1}`} key={member.id}><div className="ranking-medal"><img src={rankingMedalAssets[index]} alt={`第${index + 1}名奖牌`} /></div><div className="ranking-avatar-placeholder"><img src={rankingAvatarAssets[index]} alt={`${member.name}头像`} /></div><div className="ranking-top-info"><h4>{member.name}</h4><span>{member.department}</span><p>{member.position}</p><strong><i>★</i>{formatNumber(getPeriodScore(member, period))}</strong></div><div className="ranking-laurel left" /><div className="ranking-laurel right" /></article>)}</div>

      <div className="ranking-section-title lower-title"><h3>第4名 - 第10名</h3><span>星愿值达到即可兑换礼品，暂不扣减</span></div>
      <div className="ranking-table-card"><div className="ranking-table-scroll"><table className="points-table ranking-table"><thead><tr><th>排名</th><th>实习生</th><th>部门 / 岗位</th><th>{scoreLabel}</th><th>累计星愿值</th><th>排名变化</th><th>操作</th></tr></thead><tbody>{remaining.map((member, index) => <tr key={member.id}><td className="ranking-number">{index + 4}</td><td><span className="table-avatar-placeholder"><img src={rankingAvatarAssets[(index + 1) % rankingAvatarAssets.length]} alt="" /></span> <strong>{member.name}</strong></td><td>{member.department} / {member.position}</td><td><span className="table-star">★</span> {formatNumber(getPeriodScore(member, period))}</td><td>{formatNumber(member.cumulative)}</td><td><span className={`rank-change is-${member.changeDirection}`}>{member.changeDirection === 'up' ? '↑' : member.changeDirection === 'down' ? '↓' : '—'} {member.change || ''}</span></td><td><button className="text-action" type="button" onClick={() => onNotice(`已打开${member.name}的积分明细`)}>查看明细</button></td></tr>)}</tbody></table></div><footer className="points-table-footer"><span>共 {filtered.length} 条</span><div><button type="button" disabled>‹</button><button type="button" className="is-current">1</button><button type="button" disabled>›</button></div><label>10条/页</label></footer></div>
    </section>
  )
}
