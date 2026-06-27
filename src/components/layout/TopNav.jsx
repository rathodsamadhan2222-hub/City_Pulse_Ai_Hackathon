import MaterialIcon from '../ui/MaterialIcon';
import StatusPulse from '../ui/StatusPulse';

export default function TopNav({ title, showSearch = true }) {
  return (
    <header className="h-20 glass flex items-center justify-between px-[var(--spacing-margin-desktop)] sticky top-0 z-30 border-b border-[var(--color-outline-variant)]/30">
      <div className="flex items-center gap-[var(--spacing-stack-lg)] flex-1">
        {showSearch && (
          <div className="relative w-full max-w-md hidden lg:block">
            <MaterialIcon icon="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]" />
            <input
              className="w-full pl-12 pr-4 py-2.5 bg-[var(--color-surface-container-low)] border-none rounded-full text-label-md focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all placeholder:text-[var(--color-outline)]"
              placeholder="Search urban data, citizens, or reports..."
              type="text"
            />
          </div>
        )}
        {title && (
          <div className="lg:hidden">
            <h1 className="text-headline-sm font-bold tracking-tight">{title}</h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full hover:bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] transition-colors relative">
          <MaterialIcon icon="notifications" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--color-error)] rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2.5 rounded-full hover:bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] transition-colors">
          <MaterialIcon icon="dark_mode" />
        </button>
        <div className="h-8 w-[1px] bg-[var(--color-outline-variant)]/30 mx-2"></div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-outline-variant)]/30 hover:bg-[var(--color-surface-container-low)] transition-all">
          <span className="text-label-md font-semibold">City Status: Active</span>
          <StatusPulse color="bg-emerald-500" />
        </button>
      </div>
    </header>
  );
}
