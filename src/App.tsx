import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { TaskCenterPage } from './pages/TaskCenterPage'
import { authService } from './services/authService'
import type { AuthUser, UserRole } from './types/auth'
import type { TaskPageId } from './types/task'

const isTaskPageId = (value: string): value is TaskPageId => ['newcomer', 'mainline', 'professional'].includes(value)
const readTaskPageFromHash = (): TaskPageId | null => {
  const value = window.location.hash.replace('#/tasks/', '')
  return isTaskPageId(value) ? value : null
}

function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.restoreSession())
  const [taskPage, setTaskPage] = useState<TaskPageId | null>(() => readTaskPageFromHash())

  useEffect(() => {
    const handleHashChange = () => setTaskPage(readTaskPageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToTaskPage = (page: TaskPageId) => { window.location.hash = `/tasks/${page}`; setTaskPage(page) }
  const navigateHome = () => { window.history.pushState(null, '', window.location.pathname); setTaskPage(null) }
  const selectRole = async (role: UserRole): Promise<'entered' | 'unavailable'> => {
    if (role === 'admin') return 'unavailable'

    const user = await authService.signInAsRole(role)
    authService.saveSession(user)
    setCurrentUser(user)
    return 'entered'
  }

  if (!currentUser) return <LoginPage onSelectRole={selectRole} />

  return taskPage
    ? <TaskCenterPage pageId={taskPage} onPageChange={navigateToTaskPage} onHome={navigateHome} />
    : <HomePage onOpenTasks={() => navigateToTaskPage('newcomer')} />
}

export default App
