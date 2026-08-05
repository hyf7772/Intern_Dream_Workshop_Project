import { useEffect, useState } from 'react'
import { ActivityOverviewPage } from './pages/ActivityOverviewPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { TaskCenterPage } from './pages/TaskCenterPage'
import { authService } from './services/authService'
import type { AuthUser, UserRole } from './types/auth'
import type { ActivityOverviewId } from './types/activity'
import type { TaskPageId } from './types/task'

const isTaskPageId = (value: string): value is TaskPageId => ['newcomer', 'mainline', 'professional'].includes(value)
const isActivityOverviewId = (value: string): value is ActivityOverviewId => ['general', 'professional'].includes(value)
const readTaskPageFromHash = (): TaskPageId | null => {
  const value = window.location.hash.replace('#/tasks/', '')
  return isTaskPageId(value) ? value : null
}
const readActivityPageFromHash = (): ActivityOverviewId | null => {
  const value = window.location.hash.replace('#/activities/', '')
  return isActivityOverviewId(value) ? value : null
}

function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.restoreSession())
  const [taskPage, setTaskPage] = useState<TaskPageId | null>(() => readTaskPageFromHash())
  const [activityPage, setActivityPage] = useState<ActivityOverviewId | null>(() => readActivityPageFromHash())

  useEffect(() => {
    const handleHashChange = () => {
      setTaskPage(readTaskPageFromHash())
      setActivityPage(readActivityPageFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToTaskPage = (page: TaskPageId) => { window.location.hash = `/tasks/${page}`; setTaskPage(page) }
  const navigateToActivityPage = (page: ActivityOverviewId) => { window.location.hash = `/activities/${page}`; setActivityPage(page) }
  const navigateHome = () => { window.history.pushState(null, '', window.location.pathname); setTaskPage(null); setActivityPage(null) }
  const selectRole = async (role: UserRole): Promise<'entered' | 'unavailable'> => {
    const user = await authService.signInAsRole(role)
    authService.saveSession(user)
    setCurrentUser(user)
    return 'entered'
  }

  if (!currentUser) return <LoginPage onSelectRole={selectRole} />

  if (currentUser.role === 'admin' && activityPage) return <ActivityOverviewPage pageId={activityPage} onPageChange={navigateToActivityPage} onHome={navigateHome} />

  return taskPage
    ? <TaskCenterPage pageId={taskPage} onPageChange={navigateToTaskPage} onHome={navigateHome} />
    : <HomePage role={currentUser.role} onOpenTasks={() => navigateToTaskPage('newcomer')} onOpenActivities={() => navigateToActivityPage('general')} />
}

export default App
