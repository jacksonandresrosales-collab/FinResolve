import Link from 'next/link';
import { LayoutDashboard, FileText, PlusCircle, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen hidden md:flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] fixed left-0 top-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">F</span>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            Fin<span className="text-brand-500">Resolve</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
          Principal
        </div>
        
        <Link 
          href="/tablero" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30 transition-all group"
        >
          <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Tablero</span>
        </Link>
        
        <Link 
          href="/reclamos" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30 transition-all group"
        >
          <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Reclamos</span>
        </Link>
        
        <Link 
          href="/reclamos/nuevo" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30 transition-all group"
        >
          <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Nuevo Reclamo</span>
        </Link>

        <div className="mt-8 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
          Sistema
        </div>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30 transition-all group"
        >
          <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Configuración SLA</span>
        </Link>
      </nav>

      {/* User Profile Area (Mock) */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold">
            AJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Analista Junior</p>
            <p className="text-xs text-slate-500 truncate">analista@finresolve.com</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
