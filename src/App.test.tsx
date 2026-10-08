import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { authService } from './services/authService'

describe('application entry', () => {
  it('shows role selection and enters the intern home page', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '实习生全周期智能成长平台' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /我是实习生/ }))

    await waitFor(() => expect(screen.getByLabelText('青春梦工场互动地图首页')).toBeInTheDocument())
  })

  it('keeps intern sessions away from management routes', () => {
    authService.saveSession({ id: 'intern-001', displayName: '梦想实习生', role: 'intern' })
    window.location.hash = '/points/ranking'

    render(<App />)

    expect(screen.getByLabelText('青春梦工场互动地图首页')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '星愿值排名' })).not.toBeInTheDocument()
  })
})
