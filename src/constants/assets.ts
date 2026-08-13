import type { NavigationId, TaskPageId } from '../types/task'

/**
 * Resolve files from /public so they work both at the site root and under a
 * GitHub Pages project path such as /Intern_Dream_Workshop_Project/.
 *
 * Keep public image filenames in this module. Replacing an image later only
 * requires changing this catalog instead of searching the whole app.
 */
export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const ICON_ROOT = publicAsset('assets/icons')
const iconAsset = (filename: string) => `${ICON_ROOT}/${filename}`

export const homeBackgrounds = {
  admin: publicAsset('home-admin.png'),
  intern: publicAsset('home-intern.png'),
} as const

export const welcomeImages = [
  { src: publicAsset('assets/intern-welcome-01-childrens-day.png'), alt: '2026 六一儿童节快乐' },
  { src: publicAsset('assets/intern-welcome-02-party-day.png'), alt: '2026 七一建党节' },
  { src: publicAsset('assets/intern-welcome-03-qixi.png'), alt: '2026 七夕快乐' },
  { src: publicAsset('assets/intern-welcome-04-birthday.png'), alt: '2026 生日快乐' },
] as const

export const homeModuleImages = {
  internProfile: publicAsset('assets/intern-profile-gallery.png'),
  adminProfile: publicAsset('assets/admin-profile-overview.png'),
  growthJournal: [
    publicAsset('assets/growth-journal-01.png'),
    publicAsset('assets/growth-journal-02.png'),
    publicAsset('assets/growth-journal-03.png'),
    publicAsset('assets/growth-journal-04.png'),
    publicAsset('assets/growth-journal-05.png'),
    publicAsset('assets/growth-journal-06.png'),
    publicAsset('assets/growth-journal-07.png'),
    publicAsset('assets/growth-journal-08.png'),
  ],
} as const

export const activityImages = {
  operations: publicAsset('assets/activity-operations.png'),
  poster: publicAsset('assets/activity-poster.png'),
  sprite: publicAsset('assets/activity-icon-sprite.png'),
  pendingReviews: iconAsset('1f73c0e2-f8f5-42da-b4d3-4d540ae49cb4.png'),
} as const

export const pointsPageImages = {
  adminAvatar: iconAsset('0dfe422f-88c4-455b-839e-677070ec4c8a.png'),
  rankingMale: iconAsset('23926e49-04d6-4b2a-adea-5b04b541825f.png'),
  rankingMaleBlue: iconAsset('8910584a-bd1f-41be-81c9-e7c2c6d8a052.png'),
  podium: iconAsset('87556fa5-351b-47be-8b04-7b91cb1f2b24.png'),
  rankOne: iconAsset('b4d34b55-7369-4ccd-872f-4f9ac0bc5b01.png'),
  rankTwo: iconAsset('1aa1d46e-b002-49f1-abe5-d357be1efaef.png'),
  rankThree: iconAsset('81179d6c-6b60-424e-8d33-32fb848f06e0.png'),
  gift: iconAsset('3be3a0fc-1a69-4539-bb48-d8a83d4c1320.png'),
  redemption: iconAsset('b9771bde-48e8-45eb-b679-bf2e6eb3dd34.png'),
} as const

export const giftImages = {
  g01: iconAsset('01_徽章礼盒.png'),
  g02: iconAsset('02_向日葵马克杯.png'),
  g03: iconAsset('03_星空马克杯.png'),
  g04: iconAsset('04_小招喵纸巾盒.png'),
  g05: iconAsset('05_小招喵方形周边.png'),
  g06: iconAsset('06_小招喵马克杯.png'),
  g07: iconAsset('07_小招喵挂饰套装.png'),
  g08: iconAsset('08_小招喵拖鞋.png'),
} as const

/** CSS cannot import TypeScript constants directly, so main.tsx installs these as CSS variables. */
export const assetCssVariables = {
  '--asset-login-background': `url("${publicAsset('dream-factory-home.png')}")`,
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
  activityManager: iconAsset('84f9a030-1d33-4277-ae62-c6b020ad10af.png'),
  intern: iconAsset('23926e49-04d6-4b2a-adea-5b04b541825f.png'),
  mentor: iconAsset('mentor-avatar.png'),
} as const

export const loginMascotIcons = {
  brand: iconAsset('288283da-c07f-4a5c-9201-79aeca8f9581.png'),
} as const

export const categoryIcons: Record<TaskPageId, string> = {
  newcomer: iconAsset('category-newcomer.png'),
  mainline: iconAsset('category-mainline.png'),
  professional: iconAsset('category-professional.png'),
}

export const navigationIcons: Record<NavigationId, string> = {
  home: iconAsset('nav-home.png'),
  tasks: iconAsset('nav-task.png'),
  growth: iconAsset('nav-growth.png'),
  points: iconAsset('nav-points.png'),
  mine: iconAsset('nav-profile.png'),
}

export const sharedActivityIcon = iconAsset('activity-shared.png')

export const taskIcons = {
  checklist: sharedActivityIcon,
  taskPlan: iconAsset('3f1209a7-1fe2-4de0-8204-743413d5e115.png'),
  sports: iconAsset('f0b9227d-af7b-4e37-9581-1c382bdef72b.png'),
  branchVisit: iconAsset('877f1149-c894-487f-857d-6be5ce94bca1.png'),
  announcement: iconAsset('605370fc-2e18-4d89-ae13-42e952ba5de5.png'),
  communication: iconAsset('7d7ad457-d4e0-487a-a725-2ca44ea3a0ae.png'),
  handbook: iconAsset('f631f4ee-e48a-49e1-8dec-6d722b6b26b5.png'),
} as const
