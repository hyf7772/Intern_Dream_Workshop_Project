import { useEffect, useState } from 'react'
import { ActivityOverviewPage } from './pages/ActivityOverviewPage'
import { ActivityPublishPage } from './pages/ActivityPublishPage'
import { ActivityReviewPage } from './pages/ActivityReviewPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { TaskCenterPage } from './pages/TaskCenterPage'
import { authService } from './services/authService'
import type { AuthUser, UserRole } from './types/auth'
import type { ActivityPageId } from './types/activity'
import type { TaskPageId } from './types/task'

const isTaskPageId = (value: string): value is TaskPageId => ['newcomer', 'mainline', 'professional'].includes(value)
const isActivityPageId = (value: string): value is ActivityPageId => ['general', 'professional', 'publish', 'review'].includes(value)
const readTaskPageFromHash = (): TaskPageId | null => {
  const value = window.location.hash.replace('#/tasks/', '')
  return isTaskPageId(value) ? value : null
}
const readActivityPageFromHash = (): ActivityPageId | null => {
  const value = window.location.hash.replace('#/activities/', '')
  return isActivityPageId(value) ? value : null
}

function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.restoreSession())
  const [taskPage, setTaskPage] = useState<TaskPageId | null>(() => readTaskPageFromHash())
  const [activityPage, setActivityPage] = useState<ActivityPageId | null>(() => readActivityPageFromHash())

  useEffect(() => {
    const handleHashChange = () => {
      setTaskPage(readTaskPageFromHash())
      setActivityPage(readActivityPageFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToTaskPage = (page: TaskPageId) => { window.location.hash = `/tasks/${page}`; setTaskPage(page) }
  const navigateToActivityPage = (page: ActivityPageId) => { window.location.hash = `/activities/${page}`; setActivityPage(page) }
  const navigateHome = () => { window.history.pushState(null, '', window.location.pathname); setTaskPage(null); setActivityPage(null) }
  const selectRole = async (role: UserRole): Promise<'entered' | 'unavailable'> => {
    const user = await authService.signInAsRole(role)
    authService.saveSession(user)
    setCurrentUser(user)
    return 'entered'
  }

  if (!currentUser) return <LoginPage onSelectRole={selectRole} />

  if (currentUser.role === 'admin' && activityPage) {
    if (activityPage === 'publish') return <ActivityPublishPage onPageChange={navigateToActivityPage} onHome={navigateHome} />
    if (activityPage === 'review') return <ActivityReviewPage onPageChange={navigateToActivityPage} onHome={navigateHome} />

    return <ActivityOverviewPage
      pageId={activityPage}
      onPageChange={page => navigateToActivityPage(page)}
      onOpenPublish={() => navigateToActivityPage('publish')}
      onOpenReview={() => navigateToActivityPage('review')}
      onHome={navigateHome}
    />
  }

  return taskPage
    ? <TaskCenterPage pageId={taskPage} onPageChange={navigateToTaskPage} onHome={navigateHome} />
    : <HomePage role={currentUser.role} onOpenTasks={() => navigateToTaskPage('newcomer')} onOpenActivities={() => navigateToActivityPage('general')} />
}

export default App
