import { pointsPageImages } from '../../constants/assets'

export const pointsAssets = pointsPageImages
export const rankingAvatarAssets = [pointsAssets.adminAvatar, pointsAssets.rankingMale, pointsAssets.rankingMaleBlue]
export const rankingMedalAssets = [pointsAssets.rankOne, pointsAssets.rankTwo, pointsAssets.rankThree]
export const formatNumber = (value: number) => value.toLocaleString('zh-CN')
