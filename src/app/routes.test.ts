import { describe, expect, it } from 'vitest'
import { canAccessRoute, parseHashRoute, routeToHash } from './routes'

describe('hash routes', () => {
  it('parses supported page hashes and falls back to home', () => {
    expect(parseHashRoute('#/tasks/newcomer')).toEqual({ kind: 'tasks', pageId: 'newcomer' })
    expect(parseHashRoute('#/activities/review-professional')).toEqual({ kind: 'activities', pageId: 'review-professional' })
    expect(parseHashRoute('#/points/gifts')).toEqual({ kind: 'points', pageId: 'gifts' })
    expect(parseHashRoute('#/unknown/page')).toEqual({ kind: 'home' })
  })

  it('serializes routes using the existing hash format', () => {
    expect(routeToHash({ kind: 'home' })).toBe('')
    expect(routeToHash({ kind: 'tasks', pageId: 'professional' })).toBe('#/tasks/professional')
  })

  it('limits management routes to administrators', () => {
    expect(canAccessRoute({ kind: 'tasks', pageId: 'newcomer' }, 'intern')).toBe(true)
    expect(canAccessRoute({ kind: 'points', pageId: 'ranking' }, 'intern')).toBe(false)
    expect(canAccessRoute({ kind: 'activities', pageId: 'general' }, 'admin')).toBe(true)
  })
})
