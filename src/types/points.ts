export type PointsPageId = 'ranking' | 'gifts' | 'redemptions'
export type PointsPeriod = 'week' | 'month' | 'quarter'
export type GiftStatus = '上架' | '下架' | '编辑中'
export type RedemptionStatus = '待发放' | '正发放' | '已发放'
export type RankingChange = 'up' | 'down' | 'flat'

export interface RankingMember {
  id: string
  name: string
  department: string
  position: string
  weekly: number
  monthly: number
  quarter: number
  cumulative: number
  change: number
  changeDirection: RankingChange
}

export interface GiftItem {
  id: string
  name: string
  image?: string
  points: number
  stock: number
  status: GiftStatus
  category: string
}

export interface RedemptionRecipient {
  id: string
  name: string
  department: string
  redeemedAt: string
  issued: boolean
}

export interface RedemptionRecord {
  id: string
  giftId: string
  giftName: string
  image?: string
  points: number
  redeemedCount: number
  issuedCount: number
  status: RedemptionStatus
  recipients: RedemptionRecipient[]
}
