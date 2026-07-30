'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet } from '@/lib/api';
import type { TableroResponse } from '@/types';
import { LayoutDashboard, AlertTriangle, Clock, CheckCircle2, XCircle, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';

export default function TableroPage() {
  const [data, setData] = useState<TableroResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TableroResponse>('/tablero')
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-brand-400 animate-spin" /></div>;
  }

  if (!data) {
    return <div className="py-16 text-center text-slate-500">Error al cargar el tablero</div>;
  }

  const cards = [
    { label: 'Total Reclamos', value: data.totalReclamos, icon: LayoutDashboard, color: 'text-brand-400 bg-brand-500/10' },
    { label: 'Pendientes', value: data.pendientes, icon: Clock, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'En Análisis', value: data.enAnalisis, icon: AlertTriangle, color: 'text-violet-400 bg-violet-500/10' },
    { label: 'Resueltos', value: data.resueltos, icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Rechazados', value: data.rechazados, icon: XCircle, color: 'text-slate-400 bg-slate-500/10' },
    { label: 'Vencidos', value: data.vencidos, icon: AlertTriangle, color: 'text-rose-400 bg-rose-500/10' },
  ];

  const prioridadCards = [
    { label: 'Críticos', value: data.criticos, color: 'text-rose-400 bg-rose-500/10' },
    { label: 'Altos', value: data.altos, color: 'text-red-400 bg-red-500/10' },
    { label: 'Medios', value: data.medios, color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Bajos', value: data.bajos, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Tablero Operativo</h1>
        <p className="text-sm text-slate-400 mt-1">Métricas y KPIs en tiempo real</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
            <div className={`inline-flex p-2 rounded-xl ${c.color} mb-3`}>
              <c.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-heading font-bold text-white">{c.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5">
        <h2 className="font-heading font-semibold text-white mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-brand-400" />
          Por Prioridad
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {prioridadCards.map((p) => (
            <div key={p.label} className={`${p.color} rounded-xl p-3 text-center`}>
              <p className="text-xl font-heading font-bold">{p.value}</p>
              <p className="text-xs mt-0.5">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-white">Últimos Reclamos</h2>
          <Link href="/reclamos" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
            Ver todos <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {data.ultimosReclamos.slice(0, 5).map((r) => (
            <Link key={r.reclamoId} href={`/reclamos/${r.reclamoId}`}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div>
                <p className="text-sm font-medium text-white">{r.codigo}</p>
                <p className="text-xs text-slate-500">{r.clienteNombre}</p>
              </div>
              <span className="text-xs text-slate-400">{r.estadoReclamoDescripcion}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
