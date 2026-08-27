import { Menu, Bell, UserCircle2 } from 'lucide-react'

export default function Header({ title, subtitle, userEmail, roleLabel }) {
  return (
    <header className="page-header">
      <div className="page-header-left">
        <button className="header-menu-btn" aria-label="Toggle menu">
          <Menu size={18} />
        </button>
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="page-header-right">
        <span className="header-bell">
          <Bell size={20} />
          <span className="header-bell-dot" />
        </span>
        <div className="header-avatar-wrap">
          <div className="header-avatar">
            <UserCircle2 size={24} />
          </div>
          <div className="header-avatar-text">
            <strong>{userEmail}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
