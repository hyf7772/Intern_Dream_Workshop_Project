import { describe, expect, it } from 'vitest'
import { pointsService } from './pointsService'

describe('pointsService', () => {
  it('does not expose mutable mock arrays', () => {
    const gifts = pointsService.getGifts()
    gifts[0].name = '被测试修改'

    expect(pointsService.getGifts()[0].name).not.toBe('被测试修改')
  })

  it('creates, updates and removes gifts', () => {
    const created = pointsService.createGift({ name: '测试礼品', points: 100, stock: 3, category: '实用周边', status: '上架' })
    const updated = pointsService.updateGift(created, { name: '更新礼品', points: 120, stock: 2, category: '文创礼盒', status: '编辑中' })
    const other = pointsService.createGift({ name: '其他礼品', points: 80, stock: 1, category: '实用周边', status: '上架' })

    expect(updated).toMatchObject({ id: created.id, name: '更新礼品', points: 120, stock: 2 })
    expect(pointsService.removeGift([updated, other], created.id)).toEqual([other])
  })

  it('marks all redemption recipients as issued', () => {
    const record = pointsService.getRedemptionRecords()[0]
    const issued = pointsService.markRedemptionIssued(record)

    expect(issued.status).toBe('已发放')
    expect(issued.issuedCount).toBe(issued.redeemedCount)
    expect(issued.recipients.every(recipient => recipient.issued)).toBe(true)
  })
})
