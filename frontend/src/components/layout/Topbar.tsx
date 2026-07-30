import { Bell, Search, Menu } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-16 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 md:hidden">
        <button className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-heading font-bold text-lg tracking-tight text-foreground">
          Fin<span className="text-brand-500">Resolve</span>
        </span>
      </div>

      {/* Search Bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[var(--border-color)] rounded-xl leading-5 bg-surface-50 dark:bg-surface-900 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-surface-800 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
            placeholder="Buscar por código de reclamo o cliente..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors rounded-full hover:bg-surface-100 dark:hover:bg-surface-800">
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-priority-alta ring-2 ring-white dark:ring-surface-950" />
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
