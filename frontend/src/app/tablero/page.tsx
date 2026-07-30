'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet } from '@/lib/api';
import type { TableroResponse } from '@/types';
import {
  LayoutDashboard,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  ChevronRight,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { PrioridadBadge, EstadoBadge } from '@/components/ui/Badges';

// Componente custom para el Tooltip de Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-surface-800 border border-white/10 p-3 rounded-xl shadow-xl shadow-black/50">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{data.name}</p>
        <p className="text-xl font-heading font-bold text-white">
          {payload[0].value} <span className="text-sm font-normal text-slate-400">reclamos</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function TableroPage() {
  const [data, setData] = useState<TableroResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TableroResponse>('/tablero')
      .then(setData)
      .catch((err) => console.error('Error cargando tablero:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium animate-pulse">Cargando métricas en tiempo real...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="text-xl font-heading font-bold text-white mb-2">Error de conexión</h2>
        <p className="text-slate-400">No se pudieron cargar las métricas del tablero operativo.</p>
      </div>
    );
  }

  // Tarjetas principales
  const cards = [
    { label: 'Total Reclamos', value: data.totalReclamos, icon: LayoutDashboard, color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
    { label: 'Pendientes', value: data.pendientes, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'En Análisis', value: data.enAnalisis, icon: AlertTriangle, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { label: 'Resueltos', value: data.resueltos, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Vencidos SLA', value: data.vencidos, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]' },
  ];

  // Datos para los gráficos
  const estadoData = [
    { name: 'Nuevos', value: data.pendientes, color: '#60a5fa' },     // blue-400
    { name: 'En Análisis', value: data.enAnalisis, color: '#a78bfa' }, // violet-400
    { name: 'Resueltos', value: data.resueltos, color: '#34d399' },    // emerald-400
    { name: 'Rechazados', value: data.rechazados, color: '#94a3b8' },  // slate-400
  ].filter(item => item.value > 0); // Ocultar los que están en 0 para no afear el pie chart

  const prioridadData = [
    { name: 'Críticos', value: data.criticos, color: '#fb7185' }, // rose-400
    { name: 'Altos', value: data.altos, color: '#f87171' },       // red-400
    { name: 'Medios', value: data.medios, color: '#fbbf24' },     // amber-400
    { name: 'Bajos', value: data.bajos, color: '#34d399' },       // emerald-400
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-white tracking-tight">Tablero Operativo</h1>
        <p className="text-sm text-slate-400 mt-1">Métricas y KPIs en tiempo real desde MySQL.</p>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`bg-surface-900/50 backdrop-blur-sm border ${c.border} rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${c.bg} ${c.color}`}>
                <c.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-white mb-1">{c.value}</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fila de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico de Pastel: Por Estado */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <PieIcon className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Distribución por Estado</h2>
          </div>
          <div className="h-[300px] w-full">
            {estadoData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                  <Pie
                    data={estadoData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {estadoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">No hay datos de estados</div>
            )}
          </div>
        </div>

        {/* Gráfico de Barras: Por Prioridad */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Volumen por Prioridad</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prioridadData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff0a', radius: 8 }} />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500} 
                  animationEasing="ease-out"
                >
                  {prioridadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Últimos Reclamos */}
      <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Últimos Casos Registrados</h2>
          </div>
          <Link href="/reclamos" className="text-xs font-medium text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors group">
            Ver todos <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Código</th>
                <th className="pb-3 px-4">Cliente</th>
                <th className="pb-3 px-4 hidden sm:table-cell">Fecha</th>
                <th className="pb-3 px-4 text-right">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimosReclamos.length > 0 ? (
                data.ultimosReclamos.slice(0, 5).map((r) => (
                  <tr key={r.reclamoId} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => window.location.href = `/reclamos/${r.reclamoId}`}>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">{r.codigo}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-300">{r.clienteNombre}</span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="text-sm text-slate-400">{new Date(r.fechaReclamo).toLocaleDateString('es-EC')}</span>
                    </td>
                    <td className="py-4 px-4 text-right flex items-center justify-end gap-3">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-surface-800 text-slate-300 border border-white/10 rounded-lg">
                        {r.estadoReclamoDescripcion}
                      </span>
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-800 border border-white/5 group-hover:bg-brand-500/10 group-hover:border-brand-500/30 transition-all">
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-slate-500">
                    No hay reclamos recientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
