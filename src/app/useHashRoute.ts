import { useCallback, useEffect, useState } from 'react'
import { parseHashRoute, routeToHash, type AppRoute } from './routes'

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() => parseHashRoute(window.location.hash))

  useEffect(() => {
    const syncRoute = () => setRoute(parseHashRoute(window.location.hash))
    window.addEventListener('hashchange', syncRoute)
    window.addEventListener('popstate', syncRoute)
    return () => {
      window.removeEventListener('hashchange', syncRoute)
      window.removeEventListener('popstate', syncRoute)
    }
  }, [])

  const navigate = useCallback((nextRoute: AppRoute) => {
    const hash = routeToHash(nextRoute)
    if (hash) {
      window.location.hash = hash.slice(1)
    } else {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    setRoute(nextRoute)
  }, [])

  return { route, navigate }
}
