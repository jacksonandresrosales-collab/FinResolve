'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet } from '@/lib/api';
import type { TableroResponse } from '@/types';
import { LayoutDashboard, FileText, PlusCircle, ArrowRight, ShieldCheck, Clock, AlertTriangle, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [tablero, setTablero] = useState<TableroResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TableroResponse>('/tablero')
      .then(setTablero)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full mb-6">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-semibold text-brand-400">Sistema de Gestión de Reclamos</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
          Bienvenido a{' '}
          <span className="bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">
            FinResolve
          </span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Plataforma inteligente para la gestión y priorización automática de reclamos financieros
          con control de SLA en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        <Link href="/tablero" className="group relative bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-brand-500/30 transition-all hover:shadow-lg hover:shadow-brand-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-brand-500/10 rounded-xl">
              <LayoutDashboard className="w-5 h-5 text-brand-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-heading font-semibold text-white mb-1">Tablero</h3>
          <p className="text-sm text-slate-500">KPIs y métricas en tiempo real</p>
        </Link>

        <Link href="/reclamos" className="group relative bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all hover:shadow-lg hover:shadow-violet-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-violet-500/10 rounded-xl">
              <FileText className="w-5 h-5 text-violet-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-heading font-semibold text-white mb-1">Ver Reclamos</h3>
          <p className="text-sm text-slate-500">Lista completa con filtros</p>
        </Link>

        <Link href="/reclamos/nuevo" className="group relative bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-heading font-semibold text-white mb-1">Nuevo Reclamo</h3>
          <p className="text-sm text-slate-500">Registrar un nuevo caso</p>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
        {loading ? (
          <div className="col-span-3 flex justify-center">
            <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
          </div>
        ) : tablero ? (
          <>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="text-2xl font-heading font-bold text-white">{tablero.vencidos}</span>
              </div>
              <p className="text-xs text-slate-500">SLA Vencidos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-2xl font-heading font-bold text-white">{tablero.pendientes}</span>
              </div>
              <p className="text-xs text-slate-500">Abiertos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <FileText className="w-4 h-4 text-brand-400" />
                <span className="text-2xl font-heading font-bold text-white">{tablero.totalReclamos}</span>
              </div>
              <p className="text-xs text-slate-500">Total Reclamos</p>
            </div>
          </>
        ) : (
          <div className="col-span-3 text-center text-slate-500 text-sm">No se pudieron cargar las métricas</div>
        )}
      </div>
    </div>
  );
}
