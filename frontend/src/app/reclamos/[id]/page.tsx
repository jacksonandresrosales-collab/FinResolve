'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet, apiPut } from '@/lib/api';
import { ReclamoDetalleResponse, CatalogoResponse } from '@/types';
import { toReclamoUI, ReclamoUIData } from '@/lib/apiTransform';
import { PrioridadBadge, EstadoBadge, AlertaSLAIndicator } from '@/components/ui/Badges';
import { toast } from 'sonner';
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
  Clock,
  ShieldCheck,
  Activity,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

export default function DetalleReclamoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [reclamoRaw, setReclamoRaw] = useState<ReclamoDetalleResponse | null>(null);
  const [reclamoUI, setReclamoUI] = useState<ReclamoUIData | null>(null);
  const [estadosCatalogo, setEstadosCatalogo] = useState<CatalogoResponse[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para modales/acciones
  const [isAssigning, setIsAssigning] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatusId, setNewStatusId] = useState('');
  const [observacion, setObservacion] = useState('');
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const cargarDatos = () => {
    setLoading(true);
    Promise.all([
      apiGet<ReclamoDetalleResponse>(`/reclamos/${id}`),
      apiGet<CatalogoResponse[]>('/catalogos/estados-reclamo')
    ])
      .then(([reclamoData, estadosData]) => {
        setReclamoRaw(reclamoData);
        setReclamoUI(toReclamoUI(reclamoData));
        setEstadosCatalogo(estadosData);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar el detalle del reclamo.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) cargarDatos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAsignar = async () => {
    setIsAssigning(true);
    try {
      await apiPut(`/reclamos/${id}/asignar`, {
        analistaUsuarioId: 1, // ID quemado para la hackathon
        usuarioActorId: 1,
      });
      toast.success('Reclamo asignado exitosamente');
      cargarDatos();
    } catch (err: any) {
      toast.error(err.message || 'Error al asignar reclamo');
    } finally {
      setIsAssigning(false);
    }
  };

  const handleCambiarEstado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatusId || !observacion.trim()) {
      toast.error('Selecciona un estado y escribe una observación');
      return;
    }

    setIsChangingStatus(true);
    try {
      await apiPut(`/reclamos/${id}/estado`, {
        estadoReclamoId: Number(newStatusId),
        observacion: observacion,
        usuarioActorId: 1, // ID quemado para la hackathon
      });
      toast.success('Estado actualizado correctamente');
      setShowStatusModal(false);
      setObservacion('');
      setNewStatusId('');
      cargarDatos();
    } catch (err: any) {
      toast.error(err.message || 'Error al cambiar estado');
    } finally {
      setIsChangingStatus(false);
    }
  };

  if (loading && !reclamoRaw) {
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
        <button onClick={() => router.back()} className="px-6 py-2.5 bg-surface-800 border border-white/10 text-white font-medium rounded-xl hover:bg-surface-700 transition-all">
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
    <div className="max-w-6xl mx-auto space-y-6 relative">
      
      {/* MODAL DE CAMBIO DE ESTADO */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-[scale-in_0.2s_ease-out]">
            <h2 className="text-xl font-heading font-bold text-white mb-4">Cambiar Estado</h2>
            <form onSubmit={handleCambiarEstado} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nuevo Estado</label>
                <div className="relative">
                  <select
                    value={newStatusId}
                    onChange={(e) => setNewStatusId(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-surface-800 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none"
                  >
                    <option value="">Selecciona...</option>
                    {estadosCatalogo.map(est => (
                      <option key={est.id} value={est.id}>{est.descripcion}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Observación / Resolución</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <textarea
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    rows={3}
                    placeholder="Motivo del cambio..."
                    className="w-full pl-9 pr-3 py-2.5 bg-surface-800 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isChangingStatus}
                  className="px-5 py-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-all"
                >
                  {isChangingStatus ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          
          <div className="flex flex-wrap items-center gap-3">
            {reclamoUI.responsable && reclamoUI.estado !== 'Resuelto' && reclamoUI.estado !== 'Cerrado' && (
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 bg-surface-800 hover:bg-surface-700 border border-white/10 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
              >
                Cambiar Estado
              </button>
            )}
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
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30 shrink-0">
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
                  <button
                    onClick={handleAsignar}
                    disabled={isAssigning}
                    className="px-4 py-2 bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 border border-brand-500/30 rounded-lg text-sm font-medium transition-colors w-full disabled:opacity-50"
                  >
                    {isAssigning ? 'Asignando...' : 'Asignarme a mí'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Historial (Timeline) */}
          <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden flex flex-col max-h-[500px]">
            <div className="p-5 border-b border-white/5 flex items-center gap-2 shrink-0">
              <Activity className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Historial</h2>
            </div>
            <div className="p-5 overflow-y-auto flex-1">
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
                        {evento.observacion && (
                          <p className="text-sm text-slate-300 mt-1 bg-surface-800 p-2.5 rounded-lg border border-white/5">
                            {evento.observacion}
                          </p>
                        )}
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
