import { useEffect, useState } from 'react'
import { ActivityOverviewPage } from './pages/ActivityOverviewPage'
import { ActivityPublishPage } from './pages/ActivityPublishPage'
import { ActivityReviewPage } from './pages/ActivityReviewPage'
import { PointsPage } from './pages/PointsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { TaskCenterPage } from './pages/TaskCenterPage'
import { authService } from './services/authService'
import type { AuthUser, UserRole } from './types/auth'
import type { ActivityPageId } from './types/activity'
import type { PointsPageId } from './types/points'
import type { TaskPageId } from './types/task'

const isTaskPageId = (value: string): value is TaskPageId => ['newcomer', 'mainline', 'professional'].includes(value)
const isActivityPageId = (value: string): value is ActivityPageId => ['general', 'professional', 'publish', 'review'].includes(value)
const isPointsPageId = (value: string): value is PointsPageId => ['ranking', 'gifts', 'redemptions'].includes(value)
const readTaskPageFromHash = (): TaskPageId | null => {
  const value = window.location.hash.replace('#/tasks/', '')
  return isTaskPageId(value) ? value : null
}
const readActivityPageFromHash = (): ActivityPageId | null => {
  const value = window.location.hash.replace('#/activities/', '')
  return isActivityPageId(value) ? value : null
}
const readPointsPageFromHash = (): PointsPageId | null => {
  const value = window.location.hash.replace('#/points/', '')
  return isPointsPageId(value) ? value : null
}

function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.restoreSession())
  const [taskPage, setTaskPage] = useState<TaskPageId | null>(() => readTaskPageFromHash())
  const [activityPage, setActivityPage] = useState<ActivityPageId | null>(() => readActivityPageFromHash())
  const [pointsPage, setPointsPage] = useState<PointsPageId | null>(() => readPointsPageFromHash())

  useEffect(() => {
    const handleHashChange = () => {
      setTaskPage(readTaskPageFromHash())
      setActivityPage(readActivityPageFromHash())
      setPointsPage(readPointsPageFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToTaskPage = (page: TaskPageId) => { window.location.hash = `/tasks/${page}`; setTaskPage(page) }
  const navigateToActivityPage = (page: ActivityPageId) => { window.location.hash = `/activities/${page}`; setActivityPage(page) }
  const navigateToPointsPage = (page: PointsPageId) => { window.location.hash = `/points/${page}`; setPointsPage(page) }
  const navigateHome = () => { window.history.pushState(null, '', window.location.pathname); setTaskPage(null); setActivityPage(null); setPointsPage(null) }
  const navigateToRoleSelection = () => {
    authService.clearSession()
    window.history.pushState(null, '', window.location.pathname)
    setCurrentUser(null)
    setTaskPage(null)
    setActivityPage(null)
    setPointsPage(null)
  }
  const selectRole = async (role: UserRole): Promise<'entered' | 'unavailable'> => {
    const user = await authService.signInAsRole(role)
    authService.saveSession(user)
    setCurrentUser(user)
    return 'entered'
  }

  if (!currentUser) return <LoginPage onSelectRole={selectRole} />

  let pageContent = taskPage
    ? <TaskCenterPage pageId={taskPage} onPageChange={navigateToTaskPage} onHome={navigateHome} />
    : <HomePage role={currentUser.role} onOpenTasks={() => navigateToTaskPage('newcomer')} onOpenActivities={() => navigateToActivityPage('general')} onOpenPoints={() => navigateToPointsPage('ranking')} onReturnRoleSelection={navigateToRoleSelection} />

  if (currentUser.role === 'admin' && pointsPage) {
    pageContent = <PointsPage pageId={pointsPage} onPageChange={navigateToPointsPage} onHome={navigateHome} />
  } else if (currentUser.role === 'admin' && activityPage) {
    pageContent = activityPage === 'publish'
      ? <ActivityPublishPage onPageChange={navigateToActivityPage} onHome={navigateHome} />
      : activityPage === 'review'
        ? <ActivityReviewPage onPageChange={navigateToActivityPage} onHome={navigateHome} />
        : <ActivityOverviewPage
          pageId={activityPage}
          onPageChange={page => navigateToActivityPage(page)}
          onOpenPublish={() => navigateToActivityPage('publish')}
          onOpenReview={() => navigateToActivityPage('review')}
          onHome={navigateHome}
        />
  }

  return pageContent
}

export default App
