import { useState } from 'react'
import { pointsService } from '../../services/pointsService'
import type { RedemptionRecord } from '../../types/points'
import { GiftImage } from './GiftImage'
import { formatNumber } from './pointsModuleUtils'

interface RedemptionModuleProps {
  onNotice: (message: string) => void
}

export function RedemptionModule({ onNotice }: RedemptionModuleProps) {
  const [records, setRecords] = useState<RedemptionRecord[]>(() => pointsService.getRedemptionRecords())
  const [giftFilter, setGiftFilter] = useState('全部礼品')
  const [status, setStatus] = useState('全部状态')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(() => pointsService.getRedemptionRecords()[0]?.id ?? '')
  const filtered = records.filter(record => (giftFilter === '全部礼品' || record.giftName === giftFilter) && (status === '全部状态' || record.status === status) && (!query.trim() || record.giftName.includes(query.trim())))
  const selected = filtered.find(record => record.id === selectedId) ?? filtered[0] ?? records[0]
  const pendingTotal = records.reduce((total, record) => total + record.redeemedCount - record.issuedCount, 0)
  const markIssued = (record: RedemptionRecord) => {
    setRecords(previous => previous.map(item => item.id === record.id ? pointsService.markRedemptionIssued(item) : item))
    onNotice(`“${record.giftName}”已全部标记为已发放`)
  }

  return (
    <section className="points-module redemption-module">
      <div className="points-module-heading"><div><h2>兑换记录</h2><p>按礼品汇总实习生兑换记录，方便线下统一发放</p></div><button className="points-outline-button" type="button" onClick={() => onNotice('兑换记录已准备导出')}>导出记录</button></div>
      <div className="points-filter-row redemption-filter-row"><label><span>礼品名称</span><select value={giftFilter} onChange={event => setGiftFilter(event.target.value)}><option>全部礼品</option>{records.map(record => <option key={record.id}>{record.giftName}</option>)}</select></label><label><span>发放状态</span><select value={status} onChange={event => setStatus(event.target.value)}><option>全部状态</option><option>待发放</option><option>正发放</option><option>已发放</option></select></label><label className="points-search-field"><span>关键词搜索</span><div><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入礼品名称/关键词" /><b>⌕</b></div></label></div>
      <div className="redemption-workspace"><div className="redemption-list-card"><div className="points-card-heading"><h3>兑换记录汇总</h3><span>{pendingTotal} 份待发放</span></div><div className="redemption-table-scroll"><table className="points-table redemption-table"><thead><tr><th>商品图片</th><th>礼品名称</th><th>所需星愿值</th><th>兑换人数</th><th>兑换数量</th><th>待发放</th><th>已发放</th><th>状态</th><th>操作</th></tr></thead><tbody>{filtered.map(record => <tr className={record.id === selected.id ? 'is-selected' : ''} key={record.id} onClick={() => setSelectedId(record.id)}><td><GiftImage image={record.image} name={record.giftName} /></td><td><strong>{record.giftName}</strong></td><td><span className="table-star">★</span> {formatNumber(record.points)}</td><td>{record.redeemedCount}</td><td>{record.redeemedCount}</td><td className={record.redeemedCount - record.issuedCount > 0 ? 'is-pending-number' : ''}>{record.redeemedCount - record.issuedCount}</td><td>{record.issuedCount}</td><td><span className={`redemption-status is-${record.status === '已发放' ? 'done' : record.status === '待发放' ? 'pending' : 'partial'}`}>{record.status}</span></td><td><button className="text-action" type="button" onClick={event => { event.stopPropagation(); setSelectedId(record.id); onNotice(`已打开${record.giftName}兑换详情`) }}>查看名单</button>{record.status !== '已发放' && <button className="text-action is-danger" type="button" onClick={event => { event.stopPropagation(); markIssued(record) }}>标记发放</button>}</td></tr>)}{!filtered.length && <tr><td colSpan={9} className="points-empty">没有匹配的兑换记录</td></tr>}</tbody></table></div><footer className="points-table-footer"><span>共 {filtered.length} 条</span><div><button type="button" disabled>‹</button><button type="button" className="is-current">1</button><button type="button" disabled>›</button></div><label>10条/页</label></footer></div>
        <aside className="redemption-detail-card"><div className="points-card-heading"><h3>◆ 礼品兑换详情</h3><span>{selected.status}</span></div><div className="redemption-product"><GiftImage image={selected.image} name={selected.giftName} large /><div><h4>{selected.giftName}</h4><p>所需星愿值：<strong>{formatNumber(selected.points)}</strong></p></div></div><div className="redemption-metrics"><div><span>兑换人数</span><strong>{selected.redeemedCount}人</strong></div><div><span>兑换数量</span><strong>{selected.redeemedCount}份</strong></div><div><span>待发放</span><strong className="is-red">{selected.redeemedCount - selected.issuedCount}份</strong></div><div><span>已发放</span><strong>{selected.issuedCount}份</strong></div></div><div className="redemption-recipients"><div className="detail-subheading"><h4>待发放名单（部分）</h4><button type="button" onClick={() => onNotice(`已加载${selected.giftName}全部兑换名单`)}>查看全部</button></div>{selected.recipients.length ? selected.recipients.map(recipient => <div className="recipient-row" key={recipient.id}><span className="recipient-placeholder" /><strong>{recipient.name}</strong><small>{recipient.department}</small><span>{recipient.redeemedAt}</span><b className={recipient.issued ? 'is-issued' : ''}>{recipient.issued ? '已发放' : '待发放'}</b></div>) : <div className="recipient-empty">名单详情将在实习生兑换后显示</div>}</div><button className="points-primary-button full-width" type="button" disabled={selected.status === '已发放'} onClick={() => markIssued(selected)}>{selected.status === '已发放' ? '已全部发放' : '批量标记已发放'}</button><div className="redemption-note"><strong>发放说明</strong><p>兑换只校验实习生当前星愿值是否达到门槛，暂不执行星愿值扣减。线下发放后可在此处统一标记。</p></div></aside></div>
    </section>
  )
}
