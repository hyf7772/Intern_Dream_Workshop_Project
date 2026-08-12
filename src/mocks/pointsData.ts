import type { GiftItem, RankingMember, RedemptionRecord } from '../types/points'

export const rankingMembers: RankingMember[] = [
  { id: 'r01', name: '王语桐', department: '人力资源部', position: '人力招聘实习生', weekly: 320, monthly: 1280, quarter: 2480, cumulative: 1280, change: 2, changeDirection: 'up' },
  { id: 'r02', name: '李明轩', department: '分行运营部', position: '运营实习生', weekly: 280, monthly: 1160, quarter: 2310, cumulative: 1160, change: 1, changeDirection: 'up' },
  { id: 'r03', name: '张子涵', department: '信息技术部', position: '系统研发实习生', weekly: 260, monthly: 1080, quarter: 2180, cumulative: 1080, change: 1, changeDirection: 'down' },
  { id: 'r04', name: '陈思雨', department: '人力资源部', position: '人事实习生', weekly: 210, monthly: 980, quarter: 1950, cumulative: 980, change: 1, changeDirection: 'up' },
  { id: 'r05', name: '刘宇航', department: '数据分析部', position: '数据分析实习生', weekly: 190, monthly: 920, quarter: 1870, cumulative: 920, change: 1, changeDirection: 'down' },
  { id: 'r06', name: '周子墨', department: '分行运营部', position: '内容运营实习生', weekly: 180, monthly: 860, quarter: 1760, cumulative: 860, change: 2, changeDirection: 'up' },
  { id: 'r07', name: '赵晨曦', department: '信息技术部', position: '数据开发实习生', weekly: 160, monthly: 790, quarter: 1650, cumulative: 790, change: 0, changeDirection: 'flat' },
  { id: 'r08', name: '孙雨桐', department: '人力资源部', position: '活动策划实习生', weekly: 150, monthly: 720, quarter: 1530, cumulative: 720, change: 1, changeDirection: 'up' },
  { id: 'r09', name: '吴俊杰', department: '公司金融部', position: '公司金融实习生', weekly: 120, monthly: 680, quarter: 1460, cumulative: 680, change: 2, changeDirection: 'down' },
  { id: 'r10', name: '何欣怡', department: '客户服务部', position: '客服实习生', weekly: 110, monthly: 640, quarter: 1390, cumulative: 640, change: 0, changeDirection: 'flat' },
  { id: 'r11', name: '林然', department: '零售金融部', position: '客户服务实习生', weekly: 100, monthly: 590, quarter: 1280, cumulative: 590, change: 1, changeDirection: 'up' },
  { id: 'r12', name: '谢安琪', department: '财务管理部', position: '财务分析实习生', weekly: 90, monthly: 540, quarter: 1170, cumulative: 540, change: 1, changeDirection: 'down' },
]

export const initialGifts: GiftItem[] = [
  { id: 'g01', name: '徽章礼盒', image: '/assets/icons/01_徽章礼盒.png', points: 200, stock: 50, status: '上架', category: '文创礼盒' },
  { id: 'g02', name: '向日葵马克杯', image: '/assets/icons/02_向日葵马克杯.png', points: 300, stock: 22, status: '上架', category: '实用周边' },
  { id: 'g03', name: '星空马克杯', image: '/assets/icons/03_星空马克杯.png', points: 300, stock: 0, status: '下架', category: '实用周边' },
  { id: 'g04', name: '小招喵纸巾盒', image: '/assets/icons/04_小招喵纸巾盒.png', points: 500, stock: 16, status: '上架', category: '实用周边' },
  { id: 'g05', name: '小招喵方形周边', image: '/assets/icons/05_小招喵方形周边.png', points: 800, stock: 22, status: '上架', category: '文创礼盒' },
  { id: 'g06', name: '小招喵马克杯', image: '/assets/icons/06_小招喵马克杯.png', points: 500, stock: 50, status: '编辑中', category: '实用周边' },
  { id: 'g07', name: '小招喵挂饰套装', image: '/assets/icons/07_小招喵挂饰套装.png', points: 200, stock: 0, status: '下架', category: '文创礼盒' },
  { id: 'g08', name: '小招喵拖鞋', image: '/assets/icons/08_小招喵拖鞋.png', points: 1000, stock: 16, status: '编辑中', category: '实用周边' },
]

export const initialRedemptionRecords: RedemptionRecord[] = [
  {
    id: 'e01', giftId: 'g01', giftName: '徽章礼盒', image: '/assets/icons/01_徽章礼盒.png', points: 200, redeemedCount: 32, issuedCount: 20, status: '正发放',
    recipients: [
      { id: 'p01', name: '陈思雨', department: '人力资源部 / 人事实习生', redeemedAt: '2025-05-16', issued: false },
      { id: 'p02', name: '刘宇航', department: '数据分析部 / 数据分析实习生', redeemedAt: '2025-05-17', issued: false },
      { id: 'p03', name: '周子墨', department: '分行运营部 / 内容运营实习生', redeemedAt: '2025-05-17', issued: true },
      { id: 'p04', name: '吴俊杰', department: '公司金融部 / 公司金融实习生', redeemedAt: '2025-05-18', issued: true },
      { id: 'p05', name: '何欣怡', department: '客户服务部 / 客服实习生', redeemedAt: '2025-05-18', issued: true },
    ],
  },
  { id: 'e02', giftId: 'g02', giftName: '向日葵马克杯', image: '/assets/icons/02_向日葵马克杯.png', points: 300, redeemedCount: 18, issuedCount: 18, status: '已发放', recipients: [] },
  { id: 'e03', giftId: 'g03', giftName: '星空马克杯', image: '/assets/icons/03_星空马克杯.png', points: 300, redeemedCount: 23, issuedCount: 18, status: '正发放', recipients: [] },
  { id: 'e04', giftId: 'g04', giftName: '小招喵纸巾盒', image: '/assets/icons/04_小招喵纸巾盒.png', points: 500, redeemedCount: 12, issuedCount: 0, status: '待发放', recipients: [] },
  { id: 'e05', giftId: 'g05', giftName: '小招喵方形周边', image: '/assets/icons/05_小招喵方形周边.png', points: 800, redeemedCount: 9, issuedCount: 7, status: '正发放', recipients: [] },
  { id: 'e06', giftId: 'g06', giftName: '小招喵马克杯', image: '/assets/icons/06_小招喵马克杯.png', points: 500, redeemedCount: 26, issuedCount: 26, status: '已发放', recipients: [] },
]
