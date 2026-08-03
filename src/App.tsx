import { useEffect, useMemo, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { TaskCenterPage } from './pages/TaskCenterPage'
import type { TaskPageId } from './types/task'

const isTaskPageId = (value: string): value is TaskPageId => ['newcomer', 'mainline', 'professional'].includes(value)
const readTaskPageFromHash = (): TaskPageId | null => {
  const value = window.location.hash.replace('#/tasks/', '')
  return isTaskPageId(value) ? value : null
}

function App() {
  const [taskPage, setTaskPage] = useState<TaskPageId | null>(() => readTaskPageFromHash())

  useEffect(() => {
    const handleHashChange = () => setTaskPage(readTaskPageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToTaskPage = (page: TaskPageId) => { window.location.hash = `/tasks/${page}`; setTaskPage(page) }
  const navigateHome = () => { window.history.pushState(null, '', window.location.pathname); setTaskPage(null) }

  return useMemo(() => taskPage
    ? <TaskCenterPage pageId={taskPage} onPageChange={navigateToTaskPage} onHome={navigateHome} />
    : <HomePage onOpenTasks={() => navigateToTaskPage('newcomer')} />, [taskPage])
}

export default App

