'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { apiGet } from '@/lib/api';
import { toReclamoUI, type ReclamoUIData } from '@/lib/apiTransform';
import type { ReclamoResponse } from '@/types';
import { PrioridadBadge, EstadoBadge, AlertaSLAIndicator } from '@/components/ui/Badges';
import { FileText, Filter, ChevronRight, Search, Plus, Loader2 } from 'lucide-react';

const ESTADOS = ['NUEVO', 'EN_ANALISIS', 'PENDIENTE_INFO', 'RESUELTO', 'CERRADO'] as const;
const PRIORIDADES = ['CRITICA', 'ALTA', 'MEDIA', 'BAJA'] as const;

export default function ReclamosPage() {
  const [reclamos, setReclamos] = useState<ReclamoUIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('TODOS');
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>('TODOS');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    apiGet<ReclamoResponse[]>('/reclamos')
      .then((data) => setReclamos(data.map(toReclamoUI)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const reclamosFiltrados = useMemo(() => {
    return reclamos.filter((r) => {
      const coincideEstado = filtroEstado === 'TODOS' || r.estado === filtroEstado;
      const coincidePrioridad = filtroPrioridad === 'TODOS' || r.prioridad === filtroPrioridad;
      const coincideBusqueda =
        busqueda === '' ||
        r.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.nombreCliente.toLowerCase().includes(busqueda.toLowerCase());
      return coincideEstado && coincidePrioridad && coincideBusqueda;
    });
  }, [reclamos, filtroEstado, filtroPrioridad, busqueda]);

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <FileText className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <p className="text-slate-400 font-medium">Error al cargar reclamos</p>
        <p className="text-sm text-slate-600 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Reclamos</h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestión y seguimiento de reclamos financieros
          </p>
        </div>
        <Link
          href="/reclamos/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Nuevo Reclamo
        </Link>
      </div>

      <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">Filtros</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por código o cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-800 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-3 py-2 bg-surface-800 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all cursor-pointer"
          >
            <option value="TODOS">Todos los estados</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>{e.replace(/_/g, ' ')}</option>
            ))}
          </select>
          <select
            value={filtroPrioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value)}
            className="px-3 py-2 bg-surface-800 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all cursor-pointer"
          >
            <option value="TODOS">Todas las prioridades</option>
            {PRIORIDADES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Mostrando <span className="font-semibold text-white">{reclamosFiltrados.length}</span> de{' '}
          <span className="font-semibold text-white">{reclamos.length}</span> reclamos
        </p>
      </div>

      <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Código</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Categoría</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Prioridad</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">SLA</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">Responsable</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Fecha</th>
                <th className="py-3.5 px-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reclamosFiltrados.map((reclamo) => (
                <tr key={reclamo.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-400 shrink-0" />
                      <span className="text-sm font-mono font-medium text-white">{reclamo.codigo}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{reclamo.nombreCliente}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-300">{reclamo.categoria}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <PrioridadBadge prioridad={reclamo.prioridad} />
                  </td>
                  <td className="py-3.5 px-4">
                    <EstadoBadge estado={reclamo.estado} />
                  </td>
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <AlertaSLAIndicator alerta={reclamo.alertaSla} />
                  </td>
                  <td className="py-3.5 px-4 hidden xl:table-cell">
                    <span className="text-sm text-slate-300">
                      {reclamo.responsable || <span className="text-slate-600 italic">Sin asignar</span>}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-400">{formatFecha(reclamo.fechaCreacion)}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Link href={`/reclamos/${reclamo.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/5">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reclamosFiltrados.length === 0 && (
          <div className="py-16 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No se encontraron reclamos</p>
            <p className="text-sm text-slate-600 mt-1">Prueba ajustando los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
