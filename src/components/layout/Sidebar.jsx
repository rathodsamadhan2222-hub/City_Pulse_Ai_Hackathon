import { NavLink, useLocation } from 'react-router-dom';
import { sidebarNavItems, adminProfile } from '../../data/navigationData';
import MaterialIcon from '../ui/MaterialIcon';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-[var(--color-surface-container-lowest)] border-r border-[var(--color-outline-variant)]/30 hidden md:flex flex-col py-6">
      <div className="px-6 mb-8">
        <NavLink to="/" className="text-label-md font-bold text-[var(--color-primary)] tracking-tight">
          CityPulse AI
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 transition-all ${
              isActive(item.path)
                ? 'bg-[var(--color-primary-container)]/10 text-[var(--color-primary)] border-l-4 border-[var(--color-primary)] rounded-r-xl font-medium'
                : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] rounded-xl group'
            }`}
          >
            <MaterialIcon
              icon={item.icon}
              filled={isActive(item.path)}
              className={isActive(item.path) ? '' : 'group-hover:text-[var(--color-primary)] transition-colors'}
            />
            <span className="text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 pt-6 border-t border-[var(--color-outline-variant)]/30 space-y-4">
        <NavLink
          to="/report"
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <MaterialIcon icon="add" className="text-[18px]" />
          <span>New Report</span>
        </NavLink>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)]/20">
            <img className="w-full h-full object-cover" src={adminProfile.avatar} alt="Admin" />
          </div>
          <div className="flex flex-col">
            <span className="text-label-md font-bold leading-none">{adminProfile.name}</span>
            <span className="text-label-sm text-[var(--color-on-surface-variant)]">{adminProfile.subtitle}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
