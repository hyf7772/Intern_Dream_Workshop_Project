import { useState } from 'react'
import { pointsService } from '../../services/pointsService'
import type { GiftItem, GiftStatus } from '../../types/points'
import { GiftImage } from './GiftImage'
import { formatNumber } from './pointsModuleUtils'

interface GiftModuleProps {
  onNotice: (message: string) => void
}

interface GiftDraft {
  name: string
  points: string
  stock: string
  category: string
  status: GiftStatus
}

const emptyGiftDraft: GiftDraft = { name: '', points: '', stock: '', category: '实用周边', status: '上架' }

export function GiftModule({ onNotice }: GiftModuleProps) {
  const [gifts, setGifts] = useState<GiftItem[]>(() => pointsService.getGifts())
  const [status, setStatus] = useState('全部状态')
  const [category, setCategory] = useState('全部分类')
  const [stock, setStock] = useState('全部库存')
  const [query, setQuery] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<GiftDraft>(emptyGiftDraft)
  const categories = Array.from(new Set(gifts.map(gift => gift.category)))
  const editingGift = gifts.find(gift => gift.id === editingId)
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
      setGifts(previous => previous.map(gift => gift.id === editingId ? pointsService.updateGift(gift, { name, points: Number(draft.points), stock: Number(draft.stock), category: draft.category, status: draft.status }) : gift))
      onNotice(`“${name}”已更新`)
    } else {
      setGifts(previous => [...previous, pointsService.createGift({ name, points: Number(draft.points), stock: Number(draft.stock), category: draft.category, status: draft.status })])
      onNotice(`“${name}”已添加`)
    }
    setShowEditor(false)
  }
  const deleteGift = (gift: GiftItem) => { setGifts(previous => pointsService.removeGift(previous, gift.id)); onNotice(`“${gift.name}”已删除`) }

  return (
    <section className="points-module gifts-module">
      <div className="points-module-heading"><div><h2>礼品管理</h2><p>设置满足星愿值门槛即可兑换的招商银行相关礼品</p></div><button className="points-primary-button" type="button" onClick={openNewGift}>＋ 添加礼品</button></div>
      <div className="points-filter-row gift-filter-row"><label><span>状态筛选</span><select value={status} onChange={event => setStatus(event.target.value)}><option>全部状态</option><option>上架</option><option>下架</option><option>编辑中</option></select></label><label><span>礼品分类</span><select value={category} onChange={event => setCategory(event.target.value)}><option>全部分类</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label><label><span>库存状态</span><select value={stock} onChange={event => setStock(event.target.value)}><option>全部库存</option><option>有库存</option><option>无库存</option></select></label><label className="points-search-field"><span>关键词搜索</span><div><input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入礼品名称/关键词" /><b>⌕</b></div></label></div>
      <div className={`gift-workspace ${showEditor ? 'has-editor' : ''}`}>
        <div className="gift-list-card"><div className="points-card-heading"><h3>礼品列表</h3><span>共 {filtered.length} 件</span></div><div className="gift-table-scroll"><table className="points-table gift-table"><thead><tr><th>商品图片</th><th>商品名称</th><th>星愿值</th><th>库存</th><th>状态</th><th>操作</th></tr></thead><tbody>{filtered.map(gift => <tr key={gift.id}><td><GiftImage image={gift.image} name={gift.name} /></td><td><strong>{gift.name}</strong><small>{gift.category}</small></td><td><span className="table-star">★</span> {formatNumber(gift.points)}</td><td className={gift.stock === 0 ? 'is-zero-stock' : ''}>{gift.stock}</td><td><span className={`gift-status is-${gift.status === '上架' ? 'online' : gift.status === '下架' ? 'offline' : 'editing'}`}>{gift.status}</span></td><td><button className="text-action" type="button" onClick={() => openEditGift(gift)}>编辑</button><button className="text-action is-danger" type="button" onClick={() => deleteGift(gift)}>删除</button></td></tr>)}{!filtered.length && <tr><td colSpan={6} className="points-empty">没有匹配的礼品</td></tr>}</tbody></table></div><footer className="points-table-footer"><span>共 {filtered.length} 条</span><div><button type="button" disabled>‹</button><button type="button" className="is-current">1</button><button type="button" disabled>›</button></div><label>10条/页</label></footer></div>
        {showEditor && <aside className="gift-editor-card"><div className="points-card-heading"><h3>◆ {editingId ? '编辑礼品' : '添加礼品'}</h3><button type="button" onClick={() => setShowEditor(false)} aria-label="关闭">×</button></div><label className="gift-upload-placeholder">{editingGift?.image ? <img src={editingGift.image} alt={`${editingGift.name}商品图`} /> : <span>＋</span>}<strong>{editingGift?.image ? '已绑定商品图片' : '图片区域'}</strong><small>{editingGift?.image ? '修改名称不会影响当前礼品图片' : '图片将按礼品名称匹配现有素材'}</small></label><label className="points-field"><span>商品名称</span><input value={draft.name} maxLength={50} onChange={event => updateDraft('name', event.target.value)} placeholder="请输入商品名称" /></label><label className="points-field"><span>星愿值</span><input type="number" min="1" value={draft.points} onChange={event => updateDraft('points', event.target.value)} placeholder="请输入兑换所需星愿值" /></label><label className="points-field"><span>库存</span><input type="number" min="0" value={draft.stock} onChange={event => updateDraft('stock', event.target.value)} placeholder="请输入库存数量" /></label><label className="points-field"><span>分类</span><select value={draft.category} onChange={event => updateDraft('category', event.target.value)}><option>实用周边</option><option>文创礼盒</option><option>办公用品</option></select></label><label className="points-field"><span>状态</span><select value={draft.status} onChange={event => updateDraft('status', event.target.value as GiftStatus)}><option>上架</option><option>下架</option><option>编辑中</option></select></label><div className="gift-editor-actions"><button className="points-outline-button" type="button" onClick={() => setShowEditor(false)}>取消</button><button className="points-primary-button" type="button" onClick={saveGift}>{editingId ? '保存修改' : '确认上架'}</button></div></aside>}
      </div>
    </section>
  )
}
