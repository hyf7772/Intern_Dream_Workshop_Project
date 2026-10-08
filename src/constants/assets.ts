import type { NavigationId, TaskPageId } from '../types/task'

/**
 * Resolve files from /public so they work both at the site root and under a
 * GitHub Pages project path such as /Intern_Dream_Workshop_Project/.
 *
 * Keep public image filenames in this module. Replacing an image later only
 * requires changing this catalog instead of searching the whole app.
 */
export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const asset = (folder: string, filename: string) => publicAsset(`assets/${folder}/${filename}`)
const iconAsset = (filename: string) => asset('icons', filename)
const avatarAsset = (filename: string) => asset('avatars', filename)
const illustrationAsset = (filename: string) => asset('illustrations', filename)
const pointAsset = (filename: string) => asset('points', filename)
const giftAsset = (filename: string) => asset('gifts', filename)
const brandingAsset = (filename: string) => asset('branding', filename)

export const homeBackgrounds = {
  admin: asset('backgrounds', 'home-admin.png'),
  intern: asset('backgrounds', 'home-intern.png'),
} as const

export const welcomeImages = [
  { src: illustrationAsset('intern-welcome-01-childrens-day.png'), alt: '2026 六一儿童节快乐' },
  { src: illustrationAsset('intern-welcome-02-party-day.png'), alt: '2026 七一建党节' },
  { src: illustrationAsset('intern-welcome-03-qixi.png'), alt: '2026 七夕快乐' },
  { src: illustrationAsset('intern-welcome-04-birthday.png'), alt: '2026 生日快乐' },
] as const

export const homeModuleImages = {
  internProfile: illustrationAsset('intern-profile-gallery.png'),
  adminProfile: illustrationAsset('admin-profile-overview.png'),
  growthJournal: [
    illustrationAsset('growth-journal-01.png'),
    illustrationAsset('growth-journal-02.png'),
    illustrationAsset('growth-journal-03.png'),
    illustrationAsset('growth-journal-04.png'),
    illustrationAsset('growth-journal-05.png'),
    illustrationAsset('growth-journal-06.png'),
    illustrationAsset('growth-journal-07.png'),
    illustrationAsset('growth-journal-08.png'),
  ],
} as const

export const activityImages = {
  operations: illustrationAsset('activity-operations.png'),
  poster: publicAsset('assets/posters/activity-poster.png'),
  sprite: iconAsset('activity-icon-sprite.png'),
  pendingReviews: illustrationAsset('pending-reviews.png'),
} as const

export const pointsPageImages = {
  adminAvatar: avatarAsset('admin-avatar.png'),
  rankingMale: avatarAsset('intern-avatar.png'),
  rankingMaleBlue: avatarAsset('ranking-male-blue.png'),
  podium: pointAsset('podium.png'),
  rankOne: pointAsset('rank-one.png'),
  rankTwo: pointAsset('rank-two.png'),
  rankThree: pointAsset('rank-three.png'),
  gift: pointAsset('gift.png'),
  redemption: pointAsset('redemption.png'),
} as const

export const giftImages = {
  g01: giftAsset('badge-box.png'),
  g02: giftAsset('sunflower-mug.png'),
  g03: giftAsset('starry-mug.png'),
  g04: giftAsset('xiaozhaomiao-tissue-box.png'),
  g05: giftAsset('xiaozhaomiao-square-gift.png'),
  g06: giftAsset('xiaozhaomiao-mug.png'),
  g07: giftAsset('xiaozhaomiao-hanging-set.png'),
  g08: giftAsset('xiaozhaomiao-slippers.png'),
} as const

/** CSS cannot import TypeScript constants directly, so main.tsx installs these as CSS variables. */
export const assetCssVariables = {
  '--asset-login-background': `url("${asset('backgrounds', 'login-background.png')}")`,
  '--asset-activity-sprite': `url("${activityImages.sprite}")`,
  '--asset-recipient-avatar': `url("${pointsPageImages.adminAvatar}")`,
} as const

export const statIcons = {
  completion: iconAsset('stat-complete.png'),
  stars: iconAsset('stat-star.png'),
  calendar: iconAsset('stat-calendar.png'),
} as const

export const activityConfigIcons = {
  general: iconAsset('activity-overview-general.png'),
  professional: iconAsset('activity-overview-professional.png'),
  publish: iconAsset('activity-publish.png'),
  review: iconAsset('activity-review.png'),
  stats: {
    weekly: iconAsset('stat-weekly-activities.png'),
    inProgress: iconAsset('stat-in-progress-tasks.png'),
    completed: iconAsset('stat-completed-tasks.png'),
    pendingReview: iconAsset('stat-pending-review.png'),
  },
} as const

export const profileAvatars = {
  activityManager: avatarAsset('activity-manager.png'),
  intern: avatarAsset('intern-avatar.png'),
  mentor: avatarAsset('mentor-avatar.png'),
} as const

export const loginMascotIcons = {
  brand: brandingAsset('login-brand.png'),
} as const

export const categoryIcons: Record<TaskPageId, string> = {
  newcomer: iconAsset('task-category-newcomer.png'),
  mainline: iconAsset('task-category-mainline.png'),
  professional: iconAsset('task-category-professional.png'),
}

export const navigationIcons: Record<NavigationId, string> = {
  home: iconAsset('nav-home.png'),
  tasks: iconAsset('nav-task.png'),
  growth: iconAsset('nav-growth.png'),
  points: iconAsset('nav-points.png'),
  mine: iconAsset('nav-profile.png'),
}

export const sharedActivityIcon = iconAsset('task-checklist.png')

export const taskIcons = {
  checklist: sharedActivityIcon,
  taskPlan: iconAsset('task-plan.png'),
  sports: iconAsset('task-sports.png'),
  branchVisit: iconAsset('task-branch-visit.png'),
  announcement: iconAsset('task-announcement.png'),
  communication: iconAsset('task-communication.png'),
  handbook: iconAsset('task-handbook.png'),
} as const
