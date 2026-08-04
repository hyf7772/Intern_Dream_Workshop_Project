import { useEffect, useState } from 'react'
import { categoryIcons, navigationIcons } from '../constants/assets'
import type { UserRole } from '../types/auth'

interface LoginPageProps {
  onSelectRole: (role: UserRole) => Promise<'entered' | 'unavailable'>
}

const identityCards = [
  {
    role: 'intern',
    title: '我是实习生',
    description: '进入青春梦工场，完成任务、参与活动并记录成长足迹',
    action: '进入梦工场',
    icon: navigationIcons.mine,
  },
  {
    role: 'admin',
    title: '我是管理员',
    description: '面向导师与人力，发布活动并管理实习生成长计划',
    action: '管理员入口',
    icon: categoryIcons.professional,
  },
] satisfies Array<{
  role: UserRole
  title: string
  description: string
  action: string
  icon: string
}>

export function LoginPage({ onSelectRole }: LoginPageProps) {
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const selectRole = async (role: UserRole) => {
    if (pendingRole) return
    setPendingRole(role)

    try {
      const result = await onSelectRole(role)
      if (result === 'unavailable') setNotice('管理员工作台正在建设中，敬请期待')
    } finally {
      setPendingRole(null)
    }
  }

  return (
    <main className="login-page">
      <div className="login-page__background" aria-hidden="true" />
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand">
          <span className="login-brand__emblem" aria-hidden="true">✦</span>
          <p>招商银行 · 青春梦工场</p>
          <h1 id="login-title">实习生全周期智能成长平台</h1>
          <span>请选择身份，开启你的成长旅程</span>
        </div>

        <div className="identity-grid" aria-label="选择登录身份">
          {identityCards.map(card => (
            <button
              key={card.role}
              className={`identity-card identity-card--${card.role}`}
              type="button"
              disabled={pendingRole !== null}
              onClick={() => selectRole(card.role)}
            >
              <span className="identity-card__icon"><img src={card.icon} alt="" aria-hidden="true" /></span>
              <strong>{card.title}</strong>
              <small>{card.description}</small>
              <span className="identity-card__action">
                {pendingRole === card.role ? '正在进入…' : card.action}
                <b aria-hidden="true">›</b>
              </span>
            </button>
          ))}
        </div>

      </section>
      {notice && <div className="login-toast" role="status" aria-live="polite">{notice}</div>}
    </main>
  )
}

