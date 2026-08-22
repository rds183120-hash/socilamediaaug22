import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Content Calendar', to: '/calendar' },
  { label: 'Clients / Brands', to: '/clients' },
  { label: 'Playbook', to: '/playbook' },
];

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">ContentCue</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
