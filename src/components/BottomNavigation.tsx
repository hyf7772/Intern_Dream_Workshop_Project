import { navigationIcons } from '../constants/assets'
import { navigationItems } from '../constants/navigation'
import type { NavigationId } from '../types/task'

interface BottomNavigationProps {
  active: NavigationId
  onNavigate: (id: NavigationId, label: string) => void
  className?: string
}

export function BottomNavigation({ active, onNavigate, className = '' }: BottomNavigationProps) {
  return (
    <nav className={`task-bottom-nav ${className}`.trim()} aria-label="主要导航">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === active ? 'is-active' : ''}
          aria-current={item.id === active ? 'page' : undefined}
          onClick={() => onNavigate(item.id, item.label)}
        >
          <img src={navigationIcons[item.id]} alt="" aria-hidden="true" />
          <strong>{item.label}</strong>
        </button>
      ))}
    </nav>
  )
}

