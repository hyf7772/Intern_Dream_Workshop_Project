import { useEffect, useMemo, useState } from 'react'
import { initialGifts, initialRedemptionRecords, rankingMembers } from '../mocks/pointsData'
import type { GiftItem, GiftStatus, PointsPageId, PointsPeriod, RedemptionRecord } from '../types/points'

interface PointsPageProps {
  pageId: PointsPageId
  onPageChange: (pageId: PointsPageId) => void
  onHome: () => void
}

interface GiftDraft {
  name: string
  points: string
  stock: string
  category: string
  status: GiftStatus
}

const periodLabels: Record<PointsPeriod, string> = { week: '本周', month: '本月', quarter: '近三个月' }
const periodField: Record<PointsPeriod, 'weekly' | 'monthly' | 'quarter'> = { week: 'weekly', month: 'monthly', quarter: 'quarter' }
const emptyGiftDraft: GiftDraft = { name: '', points: '', stock: '', category: '实用周边', status: '上架' }

const pointsAssets = {
  adminAvatar: '/assets/icons/0dfe422f-88c4-455b-839e-677070ec4c8a.png',
  rankingMale: '/assets/icons/23926e49-04d6-4b2a-adea-5b04b541825f.png',
  rankingMaleBlue: '/assets/icons/8910584a-bd1f-41be-81c9-e7c2c6d8a052.png',
  podium: '/assets/icons/87556fa5-351b-47be-8b04-7b91cb1f2b24.png',
  rankOne: '/assets/icons/b4d34b55-7369-4ccd-872f-4f9ac0bc5b01.png',
  rankTwo: '/assets/icons/1aa1d46e-b002-49f1-abe5-d357be1efaef.png',
  rankThree: '/assets/icons/81179d6c-6b60-424e-8d33-32fb848f06e0.png',
  gift: '/assets/icons/3be3a0fc-1a69-4539-bb48-d8a83d4c1320.png',
  redemption: '/assets/icons/b9771bde-48e8-45eb-b679-bf2e6eb3dd34.png',
} as const
const rankingAvatarAssets = [pointsAssets.adminAvatar, pointsAssets.rankingMale, pointsAssets.rankingMaleBlue]
const rankingMedalAssets = [pointsAssets.rankOne, pointsAssets.rankTwo, pointsAssets.rankThree]

const formatNumber = (value: number) => value.toLocaleString('zh-CN')
const getPeriodScore = (member: typeof rankingMembers[number], period: PointsPeriod) => member[periodField[period]]

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
      <header className="points-topbar">
        <button className="points-brand-placeholder" type="button" onClick={onHome} aria-label="返回梦工场首页">
          <span className="points-brand-image-slot"><img src={pointsAssets.podium} alt="星愿值排名奖台" /></span>
        </button>
        <div className="points-title-block">
          <p className="points-breadcrumb">管理侧 <span>›</span> 星愿值排名 <span>›</span> {pageId === 'ranking' ? '积分排名' : pageId === 'gifts' ? '礼品管理' : '兑换记录'}</p>
          <h1>星愿值排名 <i>✦</i></h1>
          <p>积分激励、礼品兑换与发放管理</p>
        </div>
        <div className="points-top-status">
          <span className="points-top-avatar-slot"><img src={pointsAssets.adminAvatar} alt="管理员头像" /></span>
          <div><span className="points-status-line"><span className="points-status-dot" />运营管理台</span><strong>星愿值中心</strong></div>
        </div>
      </header>

      <section className="points-workspace">
        <aside className="points-sidebar">
          <h2>功能模块</h2>
          <nav aria-label="星愿值排名功能导航">
            <button className={pageId === 'ranking' ? 'is-active' : ''} type="button" onClick={() => onPageChange('ranking')}><span className="points-side-icon"><img src={pointsAssets.podium} alt="" /></span><span>积分排名</span><i>›</i></button>
            <button className={pageId === 'gifts' ? 'is-active' : ''} type="button" onClick={() => onPageChange('gifts')}><span className="points-side-icon"><img src={pointsAssets.gift} alt="" /></span><span>礼品管理</span><i>›</i></button>
            <button className={pageId === 'redemptions' ? 'is-active' : ''} type="button" onClick={() => onPageChange('redemptions')}><span className="points-side-icon"><img src={pointsAssets.redemption} alt="" /></span><span>兑换记录</span><i>›</i></button>
          </nav>
          <div className="points-sidebar-feature"><span className="points-feature-image"><img src={pointsAssets.podium} alt="星愿值排名奖台" /></span><strong>星愿值激励</strong><p>积分排名、礼品兑换与线下发放一站式管理</p></div>
        </aside>
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

function RankingModule({ onNotice }: { onNotice: (message: string) => void }) {
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
    .sort((a, b) => getPeriodScore(b, period) - getPeriodScore(a, period)), [department, position, query, period])
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
      <div className="ranking-table-card"><div className="ranking-table-scroll"><table className="points-table ranking-table"><thead><tr><th>排名</th><th>实习生</th><th>部门 / 岗位</th><th>{scoreLabel}</th><th>累计星愿值</th><th>排名变化</th><th>操作</th></tr></thead><tbody>{remaining.map((member, index) => <tr key={member.id}><td className="ranking-number">{index + 4}</td><td><span className="table-avatar-placeholder"><img src={rankingAvatarAssets[(index + 1) % rankingAvatarAssets.length]} alt="" /></span> <strong>{member.name}</strong></td><td>{member.department} / {member.position}</td><td><span className="table-star">★</span> {formatNumber(getPeriodScore(member, period))}</td><td>{formatNumber(member.cumulative)}</td><td><span className={`rank-change is-${member.changeDirection}`}>{member.changeDirection === 'up' ? '↑' : member.changeDirection === 'down' ? '↓' : '—'} {member.change || ''}</span></td><td><button className="text-action" type="button" onClick={() => onNotice(`已打开${member.name}的积分明细`)}>查看明细</button></td></tr>)}</tbody></table></div><footer className="points-table-footer"><span>共 {filtered.length} 条</span><div><button type="button" disabled>‹</button><button type="button" className="is-current">1</button><button type="button" disabled>›</button></div><label>10条/页⌄</label></footer></div>
    </section>
  )
}

function GiftModule({ onNotice }: { onNotice: (message: string) => void }) {
  const [gifts, setGifts] = useState<GiftItem[]>(initialGifts)
  const [status, setStatus] = useState('全部状态')
  const [category, setCategory] = useState('全部分类')
  const [stock, setStock] = useState('全部库存')
  const [query, setQuery] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<GiftDraft>(emptyGiftDraft)
  const categories = Array.from(new Set(gifts.map(gift => gift.category)))
  const filtered = gifts.filter(gift => (status === '全部状态' || gift.status === status)
    && (category === '全部分类' || gift.category === category)
    && (stock === '全部库存' || (stock === '有库存' ? gift.stock > 0 : gift.stock === 0))
    && (!query.trim() || gift.name.includes(query.trim())))

  const updateDraft = <K extends keyof GiftDraft>(key: K, value: GiftDraft[K]) => setDraft(previous => ({ ...previous, [key]: value }))
  const openNewGift = () => { setEditingId(null); setDraft(emptyGiftDraft); setShowEditor(true) }
  const openEditGift = (gift: GiftItem) => { setEditingId(gift.id); setDraft({ name: gift.name, points: String(gift.points), stock: String(gift.stock), category: gift.category, status: gift.status }); setShowEditor(true) }
  const saveGift = () => {
    const name = draft.name.trim()
    if (!name || Number(draft.points) <= 0 || Number(draft.stock) < 0) { onNotice('请完善商品名称、星愿值和库存'); return }
    if (editingId) {
      setGifts(previous => previous.map(gift => gift.id === editingId ? { ...gift, name, points: Number(draft.points), stock: Number(draft.stock), category: draft.category, status: draft.status } : gift))
      onNotice(`“${name}”已更新`)
    } else {
      setGifts(previous => [...previous, { id: `g-${Date.now()}`, name, points: Number(draft.points), stock: Number(draft.stock), category: draft.category, status: draft.status }])
      onNotice(`“${name}”已添加`)
    }
    setShowEditor(false)
  }
  const deleteGift = (gift: GiftItem) => { setGifts(previous => previous.filter(item => item.id !== gift.id)); onNotice(`“${gift.name}”已删除`) }

  return (
    <section className="points-module gifts-module">
      <div className="points-module-heading"><div><h2>礼品管理</h2><p>设置满足星愿值门槛即可兑换的招商银行相关礼品</p></div><button className="points-primary-button" type="button" onClick={openNewGift}>＋ 添加礼品</button></div>
      <div className="points-filter-row gift-filter-row"><label><span>状态筛选</span><select value={status} onChange={event => setStatus(event.target.value)}><option>全部状态</option><option>上架</option><option>下架</option><option>编辑中</option></select></label><label><span>礼品分类</span><select value={category} onChange={event => setCategory(event.target.value)}><option>全部分类</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label><label><span>库存状态</span><select value={stock} onChange={event => setStock(event.target.value)}><option>全部库存</option><option>有库存</option><option>无库存</option></select></label><label className="points-search-field"><span>关键词搜索</span><div><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入礼品名称/关键词" /><b>⌕</b></div></label></div>
      <div className={`gift-workspace ${showEditor ? 'has-editor' : ''}`}>
        <div className="gift-list-card"><div className="points-card-heading"><h3>▤ 礼品列表</h3><span>共 {filtered.length} 件</span></div><div className="gift-table-scroll"><table className="points-table gift-table"><thead><tr><th>商品图片</th><th>商品名称</th><th>星愿值</th><th>库存</th><th>状态</th><th>操作</th></tr></thead><tbody>{filtered.map(gift => <tr key={gift.id}><td><span className="gift-image-placeholder" aria-label={`${gift.name}图片预留`} /></td><td><strong>{gift.name}</strong><small>{gift.category}</small></td><td><span className="table-star">★</span> {formatNumber(gift.points)}</td><td className={gift.stock === 0 ? 'is-zero-stock' : ''}>{gift.stock}</td><td><span className={`gift-status is-${gift.status === '上架' ? 'online' : gift.status === '下架' ? 'offline' : 'editing'}`}>{gift.status}</span></td><td><button className="text-action" type="button" onClick={() => openEditGift(gift)}>编辑</button><button className="text-action is-danger" type="button" onClick={() => deleteGift(gift)}>删除</button></td></tr>)}{!filtered.length && <tr><td colSpan={6} className="points-empty">没有匹配的礼品</td></tr>}</tbody></table></div><footer className="points-table-footer"><span>共 {filtered.length} 条</span><div><button type="button" disabled>‹</button><button type="button" className="is-current">1</button><button type="button" disabled>›</button></div><label>10条/页⌄</label></footer></div>
        {showEditor && <aside className="gift-editor-card"><div className="points-card-heading"><h3>◆ {editingId ? '编辑礼品' : '添加礼品'}</h3><button type="button" onClick={() => setShowEditor(false)} aria-label="关闭">×</button></div><label className="gift-upload-placeholder"><span>＋</span><strong>图片区域</strong><small>后续补充 PNG / JPG 商品图</small></label><label className="points-field"><span>商品名称</span><input value={draft.name} maxLength={50} onChange={event => updateDraft('name', event.target.value)} placeholder="请输入商品名称" /></label><label className="points-field"><span>星愿值</span><input type="number" min="1" value={draft.points} onChange={event => updateDraft('points', event.target.value)} placeholder="请输入兑换所需星愿值" /></label><label className="points-field"><span>库存</span><input type="number" min="0" value={draft.stock} onChange={event => updateDraft('stock', event.target.value)} placeholder="请输入库存数量" /></label><label className="points-field"><span>分类</span><select value={draft.category} onChange={event => updateDraft('category', event.target.value)}><option>实用周边</option><option>文创礼盒</option><option>办公用品</option></select></label><label className="points-field"><span>状态</span><select value={draft.status} onChange={event => updateDraft('status', event.target.value as GiftStatus)}><option>上架</option><option>下架</option><option>编辑中</option></select></label><div className="gift-editor-actions"><button className="points-outline-button" type="button" onClick={() => setShowEditor(false)}>取消</button><button className="points-primary-button" type="button" onClick={saveGift}>{editingId ? '保存修改' : '确认上架'}</button></div></aside>}
      </div>
    </section>
  )
}

function RedemptionModule({ onNotice }: { onNotice: (message: string) => void }) {
  const [records, setRecords] = useState<RedemptionRecord[]>(initialRedemptionRecords)
  const [giftFilter, setGiftFilter] = useState('全部礼品')
  const [status, setStatus] = useState('全部状态')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(initialRedemptionRecords[0].id)
  const filtered = records.filter(record => (giftFilter === '全部礼品' || record.giftName === giftFilter) && (status === '全部状态' || record.status === status) && (!query.trim() || record.giftName.includes(query.trim())))
  const selected = filtered.find(record => record.id === selectedId) ?? filtered[0] ?? records[0]
  const pendingTotal = records.reduce((total, record) => total + record.redeemedCount - record.issuedCount, 0)
  const markIssued = (record: RedemptionRecord) => {
    setRecords(previous => previous.map(item => item.id === record.id ? { ...item, issuedCount: item.redeemedCount, status: '已发放', recipients: item.recipients.map(recipient => ({ ...recipient, issued: true })) } : item))
    onNotice(`“${record.giftName}”已全部标记为已发放`)
  }

  return (
    <section className="points-module redemption-module">
      <div className="points-module-heading"><div><h2>兑换记录</h2><p>按礼品汇总实习生兑换记录，方便线下统一发放</p></div><button className="points-outline-button" type="button" onClick={() => onNotice('兑换记录已准备导出')}>导出记录</button></div>
      <div className="points-filter-row redemption-filter-row"><label><span>礼品名称</span><select value={giftFilter} onChange={event => setGiftFilter(event.target.value)}><option>全部礼品</option>{records.map(record => <option key={record.id}>{record.giftName}</option>)}</select></label><label><span>发放状态</span><select value={status} onChange={event => setStatus(event.target.value)}><option>全部状态</option><option>待发放</option><option>部分发放</option><option>已发放</option></select></label><label className="points-search-field"><span>关键词搜索</span><div><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入礼品名称/关键词" /><b>⌕</b></div></label></div>
      <div className="redemption-workspace"><div className="redemption-list-card"><div className="points-card-heading"><h3>▤ 兑换记录汇总</h3><span>{pendingTotal} 份待发放</span></div><div className="redemption-table-scroll"><table className="points-table redemption-table"><thead><tr><th>商品图片</th><th>礼品名称</th><th>所需星愿值</th><th>兑换人数</th><th>兑换数量</th><th>待发放</th><th>已发放</th><th>状态</th><th>操作</th></tr></thead><tbody>{filtered.map(record => <tr className={record.id === selected.id ? 'is-selected' : ''} key={record.id} onClick={() => setSelectedId(record.id)}><td><span className="gift-image-placeholder" /></td><td><strong>{record.giftName}</strong></td><td><span className="table-star">★</span> {formatNumber(record.points)}</td><td>{record.redeemedCount}</td><td>{record.redeemedCount}</td><td className={record.redeemedCount - record.issuedCount > 0 ? 'is-pending-number' : ''}>{record.redeemedCount - record.issuedCount}</td><td>{record.issuedCount}</td><td><span className={`redemption-status is-${record.status === '已发放' ? 'done' : record.status === '待发放' ? 'pending' : 'partial'}`}>{record.status}</span></td><td><button className="text-action" type="button" onClick={event => { event.stopPropagation(); setSelectedId(record.id); onNotice(`已打开${record.giftName}兑换详情`) }}>查看名单</button>{record.status !== '已发放' && <button className="text-action is-danger" type="button" onClick={event => { event.stopPropagation(); markIssued(record) }}>标记发放</button>}</td></tr>)}{!filtered.length && <tr><td colSpan={9} className="points-empty">没有匹配的兑换记录</td></tr>}</tbody></table></div><footer className="points-table-footer"><span>共 {filtered.length} 条</span><div><button type="button" disabled>‹</button><button type="button" className="is-current">1</button><button type="button" disabled>›</button></div><label>10条/页⌄</label></footer></div>
        <aside className="redemption-detail-card"><div className="points-card-heading"><h3>◆ 礼品兑换详情</h3><span>{selected.status}</span></div><div className="redemption-product"><span className="gift-image-placeholder large" /><div><h4>{selected.giftName}</h4><p>所需星愿值：<strong>{formatNumber(selected.points)}</strong></p></div></div><div className="redemption-metrics"><div><span>兑换人数</span><strong>{selected.redeemedCount}人</strong></div><div><span>兑换数量</span><strong>{selected.redeemedCount}份</strong></div><div><span>待发放</span><strong className="is-red">{selected.redeemedCount - selected.issuedCount}份</strong></div><div><span>已发放</span><strong>{selected.issuedCount}份</strong></div></div><div className="redemption-recipients"><div className="detail-subheading"><h4>待发放名单（部分）</h4><button type="button" onClick={() => onNotice(`已加载${selected.giftName}全部兑换名单`)}>查看全部</button></div>{selected.recipients.length ? selected.recipients.map(recipient => <div className="recipient-row" key={recipient.id}><span className="recipient-placeholder" /><strong>{recipient.name}</strong><small>{recipient.department}</small><span>{recipient.redeemedAt}</span><b className={recipient.issued ? 'is-issued' : ''}>{recipient.issued ? '已发放' : '待发放'}</b></div>) : <div className="recipient-empty">名单详情将在实习生兑换后显示</div>}</div><button className="points-primary-button full-width" type="button" disabled={selected.status === '已发放'} onClick={() => markIssued(selected)}>{selected.status === '已发放' ? '已全部发放' : '⇧ 批量标记已发放'}</button><div className="redemption-note"><strong>发放说明</strong><p>兑换只校验实习生当前星愿值是否达到门槛，暂不执行星愿值扣减。线下发放后可在此处统一标记。</p></div></aside></div>
    </section>
  )
}
