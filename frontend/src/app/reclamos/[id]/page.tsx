'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api';
import { ReclamoDetalleResponse } from '@/types';
import { toReclamoUI, ReclamoUIData } from '@/lib/apiTransform';
import { PrioridadBadge, EstadoBadge, AlertaSLAIndicator } from '@/components/ui/Badges';
import {
  ArrowLeft,
  User,
  CreditCard,
  Mail,
  Phone,
  FileText,
  Layers,
  Radio,
  DollarSign,
  Calendar,
  Clock,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function DetalleReclamoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [reclamoRaw, setReclamoRaw] = useState<ReclamoDetalleResponse | null>(null);
  const [reclamoUI, setReclamoUI] = useState<ReclamoUIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    apiGet<ReclamoDetalleResponse>(`/reclamos/${id}`)
      .then((data) => {
        setReclamoRaw(data);
        setReclamoUI(toReclamoUI(data));
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar el detalle del reclamo. Puede que no exista.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium animate-pulse">Cargando detalles...</p>
      </div>
    );
  }

  if (error || !reclamoRaw || !reclamoUI) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="text-xl font-heading font-bold text-white mb-2">Reclamo no encontrado</h2>
        <p className="text-slate-400 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-surface-800 border border-white/10 text-white font-medium rounded-xl hover:bg-surface-700 transition-all"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Encabezado */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver a reclamos
        </button>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold text-white tracking-tight">
                {reclamoUI.codigo}
              </h1>
              <EstadoBadge estado={reclamoUI.estado} />
              <PrioridadBadge prioridad={reclamoUI.prioridad} />
            </div>
            <p className="text-sm text-slate-400">
              Registrado el {formatFecha(reclamoUI.fechaCreacion)}
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-3 px-4">
            <div className="pr-4 border-r border-white/10">
              <p className="text-xs text-slate-500 mb-0.5">SLA Límite</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                <Clock className="w-4 h-4 text-slate-400" />
                {new Date(reclamoUI.fechaLimite).toLocaleString('es-EC', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
              </div>
            </div>
            <div className="pl-1">
              <AlertaSLAIndicator alerta={reclamoUI.alertaSla} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Detalles del Reclamo */}
          <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Detalle del Reclamo</h2>
            </div>
            <div className="p-5 space-y-6">
              <div>
                <h3 className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Descripción del cliente</h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-surface-800/50 p-4 rounded-xl border border-white/5">
                  {reclamoUI.descripcion}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Categoría
                  </h3>
                  <p className="text-sm font-medium text-white">{reclamoUI.categoria}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" /> Canal
                  </h3>
                  <p className="text-sm font-medium text-white">{reclamoUI.canal}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Monto Involucrado
                  </h3>
                  <p className="text-sm font-medium text-emerald-400">
                    {reclamoUI.monto ? `$${reclamoUI.monto.toFixed(2)}` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información del Cliente */}
          <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center gap-2">
              <User className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Información del Cliente</h2>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shrink-0">
                  <span className="text-violet-400 font-heading font-bold text-lg">
                    {reclamoUI.nombreCliente.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-white">{reclamoUI.nombreCliente}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mt-0.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{reclamoRaw.clienteIdentificacion}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-surface-800/50 rounded-xl border border-white/5">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">{reclamoRaw.clienteCorreo || 'Sin correo'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-800/50 rounded-xl border border-white/5">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">{reclamoRaw.clienteTelefono || 'Sin teléfono'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha (1/3) */}
        <div className="space-y-6">
          
          {/* Asignación */}
          <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Asignación</h2>
            </div>
            <div className="p-5">
              {reclamoUI.responsable ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">
                    {reclamoUI.responsable.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{reclamoUI.responsable}</p>
                    <p className="text-xs text-slate-400">Analista Asignado</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-400 mb-3">Este reclamo no tiene responsable asignado.</p>
                  <button className="px-4 py-2 bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 border border-brand-500/30 rounded-lg text-sm font-medium transition-colors w-full">
                    Asignarme a mí
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Historial (Timeline) */}
          <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Historial</h2>
            </div>
            <div className="p-5">
              {reclamoRaw.historial && reclamoRaw.historial.length > 0 ? (
                <div className="relative border-l border-white/10 ml-3 space-y-6">
                  {reclamoRaw.historial.map((evento, index) => (
                    <div key={evento.reclamoHistorialId || index} className="relative pl-5">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand-500 ring-4 ring-surface-900" />
                      <div>
                        <p className="text-xs font-medium text-brand-400 mb-0.5">
                          {formatFecha(evento.fechaEvento)}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {evento.tipoEvento}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                          {evento.observacion}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Por: {evento.usuarioActorNombre}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No hay historial registrado.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
