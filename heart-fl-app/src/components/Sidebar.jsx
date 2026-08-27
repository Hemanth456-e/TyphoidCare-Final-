import { ShieldPlus } from 'lucide-react'

export default function Sidebar({ items, activePage, onNavigate, roleLabel, theme = 'navy' }) {
  const navItems = items.filter((i) => !i.danger)
  const logoutItem = items.find((i) => i.danger)

  return (
    <aside className={`sidebar theme-${theme}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <ShieldPlus size={19} strokeWidth={2.2} />
        </div>
        <div className="sidebar-brand-text">
          <strong>Heart Disease</strong>
          <span>FL System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.key === activePage
          return (
            <button
              key={item.key}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {logoutItem && (
        <div className="sidebar-logout-wrap">
          <button className="sidebar-link danger" onClick={() => onNavigate(logoutItem.key)}>
            <logoutItem.icon size={18} />
            <span>{logoutItem.label}</span>
          </button>
        </div>
      )}
    </aside>
  )
}
