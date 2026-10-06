import { initialGifts, initialRedemptionRecords, rankingMembers } from '../mocks/pointsData'
import type { GiftItem, RankingMember, RedemptionRecord } from '../types/points'

const clone = <T,>(value: T): T => structuredClone(value)
type GiftInput = Pick<GiftItem, 'name' | 'points' | 'stock' | 'category' | 'status'>

export const pointsService = {
  // 当前返回 mock；接入后端时替换为星愿值接口。
  getRankingMembers(): RankingMember[] {
    return clone(rankingMembers)
  },

  getGifts(): GiftItem[] {
    return clone(initialGifts)
  },

  getRedemptionRecords(): RedemptionRecord[] {
    return clone(initialRedemptionRecords)
  },

  createGift(input: GiftInput): GiftItem {
    return clone({ ...input, id: `g-${Date.now()}` })
  },

  updateGift(gift: GiftItem, input: GiftInput): GiftItem {
    return clone({ ...gift, ...input })
  },

  removeGift(gifts: GiftItem[], giftId: string): GiftItem[] {
    return clone(gifts.filter(gift => gift.id !== giftId))
  },

  markRedemptionIssued(record: RedemptionRecord): RedemptionRecord {
    return clone({
      ...record,
      issuedCount: record.redeemedCount,
      status: '已发放',
      recipients: record.recipients.map(recipient => ({ ...recipient, issued: true })),
    })
  },
}
