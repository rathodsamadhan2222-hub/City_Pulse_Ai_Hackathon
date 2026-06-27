import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardLayout() {
  return (
    <div className="bg-[#070b19] text-[var(--color-on-surface)] selection:bg-[var(--color-primary)]/20 min-h-screen">
      <Sidebar />
      <main className="md:ml-64 min-h-screen flex flex-col">
        <Outlet />
        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
