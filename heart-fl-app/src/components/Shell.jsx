import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'

export default function Shell({
  sidebarItems,
  activePage,
  onNavigate,
  roleLabel,
  title,
  subtitle,
  userEmail,
  theme = 'navy',
  children,
}) {
  return (
    <div className="app-shell">
      <Sidebar
        items={sidebarItems}
        activePage={activePage}
        onNavigate={onNavigate}
        roleLabel={roleLabel}
        theme={theme}
      />
      <div className="app-main">
        <Header title={title} subtitle={subtitle} userEmail={userEmail} roleLabel={roleLabel} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
