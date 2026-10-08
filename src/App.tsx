import { useState } from 'react'
import { ActivityOverviewPage } from './pages/ActivityOverviewPage'
import { ActivityPublishPage } from './pages/ActivityPublishPage'
import { ActivityReviewPage } from './pages/ActivityReviewPage'
import { PointsPage } from './pages/PointsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { TaskCenterPage } from './pages/TaskCenterPage'
import { authService } from './services/authService'
import { canAccessRoute } from './app/routes'
import { useHashRoute } from './app/useHashRoute'
import type { AuthUser, UserRole } from './types/auth'
import type { ActivityPageId } from './types/activity'
import type { PointsPageId } from './types/points'
import type { TaskPageId } from './types/task'

function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.restoreSession())
  const { route, navigate } = useHashRoute()
  const currentRoute = currentUser && canAccessRoute(route, currentUser.role) ? route : { kind: 'home' as const }

  const navigateToTaskPage = (pageId: TaskPageId) => navigate({ kind: 'tasks', pageId })
  const navigateToActivityPage = (pageId: ActivityPageId) => navigate({ kind: 'activities', pageId })
  const navigateToPointsPage = (pageId: PointsPageId) => navigate({ kind: 'points', pageId })
  const navigateHome = () => navigate({ kind: 'home' })

  const navigateToRoleSelection = () => {
    authService.clearSession()
    navigateHome()
    setCurrentUser(null)
  }

  const selectRole = async (role: UserRole): Promise<'entered' | 'unavailable'> => {
    const user = await authService.signInAsRole(role)
    authService.saveSession(user)
    setCurrentUser(user)
    return 'entered'
  }

  if (!currentUser) {
    return <LoginPage onSelectRole={selectRole} />
  }

  let pageContent = currentRoute.kind === 'tasks'
    ? <TaskCenterPage pageId={currentRoute.pageId} onPageChange={navigateToTaskPage} onHome={navigateHome} />
    : <HomePage role={currentUser.role} onOpenTasks={() => navigateToTaskPage('newcomer')} onOpenActivities={() => navigateToActivityPage('general')} onOpenPoints={() => navigateToPointsPage('ranking')} onReturnRoleSelection={navigateToRoleSelection} />

  if (currentRoute.kind === 'points') {
    pageContent = <PointsPage pageId={currentRoute.pageId} onPageChange={navigateToPointsPage} onHome={navigateHome} />
  } else if (currentRoute.kind === 'activities') {
    pageContent = currentRoute.pageId === 'publish'
      ? <ActivityPublishPage onPageChange={navigateToActivityPage} onHome={navigateHome} />
      : (currentRoute.pageId === 'review' || currentRoute.pageId === 'review-professional')
        ? <ActivityReviewPage
          mode={currentRoute.pageId === 'review-professional' ? 'professional' : 'general'}
          onModeChange={mode => navigateToActivityPage(mode === 'professional' ? 'review-professional' : 'review')}
          onPageChange={navigateToActivityPage}
          onHome={navigateHome}
        />
        : <ActivityOverviewPage
          pageId={currentRoute.pageId}
          onPageChange={navigateToActivityPage}
          onHome={navigateHome}
        />
  }

  return pageContent
}

export default App
