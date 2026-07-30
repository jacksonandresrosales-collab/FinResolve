'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet, apiPost } from '@/lib/api';
import { CatalogoResponse, ClienteResponse } from '@/types';
import {
  Send,
  ArrowLeft,
  User,
  Layers,
  Radio,
  FileText,
  DollarSign,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';

interface FormData {
  clientePersonaId: string;
  canalReclamoId: string;
  categoriaReclamoId: string;
  descripcion: string;
  montoReclamo: string;
  indisponibilidadDigital: boolean;
}

const initialForm: FormData = {
  clientePersonaId: '',
  canalReclamoId: '',
  categoriaReclamoId: '',
  descripcion: '',
  montoReclamo: '',
  indisponibilidadDigital: false,
};

export default function NuevoReclamoPage() {
  const router = useRouter();
  
  const [clientes, setClientes] = useState<ClienteResponse[]>([]);
  const [canales, setCanales] = useState<CatalogoResponse[]>([]);
  const [categorias, setCategorias] = useState<CatalogoResponse[]>([]);
  
  const [form, setForm] = useState<FormData>(initialForm);
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [codigoGenerado, setCodigoGenerado] = useState('');

  // Cargar catálogos al montar
  useEffect(() => {
    Promise.all([
      apiGet<ClienteResponse[]>('/catalogos/clientes'),
      apiGet<CatalogoResponse[]>('/catalogos/canales'),
      apiGet<CatalogoResponse[]>('/catalogos/categorias'),
    ])
      .then(([clientesData, canalesData, categoriasData]) => {
        setClientes(clientesData);
        setCanales(canalesData);
        setCategorias(categoriasData);
      })
      .catch((err) => console.error('Error cargando catálogos:', err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errores[name as keyof FormData]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validar = (): boolean => {
    const nuevosErrores: Partial<Record<keyof FormData, string>> = {};

    if (!form.clientePersonaId) nuevosErrores.clientePersonaId = 'Selecciona un cliente';
    if (!form.canalReclamoId) nuevosErrores.canalReclamoId = 'Selecciona un canal de ingreso';
    if (!form.categoriaReclamoId) nuevosErrores.categoriaReclamoId = 'Selecciona una categoría';
    
    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    } else if (form.descripcion.trim().length < 20) {
      nuevosErrores.descripcion = 'Describe el reclamo con al menos 20 caracteres';
    }

    if (form.montoReclamo && isNaN(Number(form.montoReclamo))) {
      nuevosErrores.montoReclamo = 'El monto debe ser numérico';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    try {
      const payload = {
        clientePersonaId: Number(form.clientePersonaId),
        canalReclamoId: Number(form.canalReclamoId),
        categoriaReclamoId: Number(form.categoriaReclamoId),
        descripcion: form.descripcion,
        montoReclamo: form.montoReclamo ? parseFloat(form.montoReclamo) : null,
        indisponibilidadDigital: form.indisponibilidadDigital,
        empresaId: 1, // Hardcodeado por la hackathon
        usuIdCreacion: 1, // Hardcodeado por la hackathon
      };

      const res = await apiPost<any>('/reclamos', payload);
      
      setCodigoGenerado(res.codigo || `REC-API-${Math.floor(Math.random() * 1000)}`);
      setEnviado(true);
    } catch (error) {
      console.error('Error al crear reclamo:', error);
      alert('Hubo un error al crear el reclamo. Revisa la consola.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6 animate-[scale-in_0.3s_ease-out]">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">¡Reclamo registrado!</h2>
          <p className="text-slate-400 mb-2">El sistema de motor de reglas ha calculado automáticamente la prioridad y fecha límite SLA.</p>
          <p className="text-sm text-slate-500 mb-8">
            Código asignado: <span className="font-mono font-semibold text-brand-400">{codigoGenerado}</span>
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setForm(initialForm);
                setEnviado(false);
              }}
              className="px-4 py-2.5 bg-surface-800 border border-white/10 text-white font-medium rounded-xl hover:bg-surface-700 transition-all"
            >
              Registrar otro
            </button>
            <button
              onClick={() => router.push('/reclamos')}
              className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25"
            >
              Ver todos los reclamos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Volver
        </button>
        <h1 className="text-2xl font-heading font-bold text-white">Nuevo Reclamo</h1>
        <p className="text-sm text-slate-400 mt-1">Complete el formulario para registrar un caso en la base de datos real.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del Cliente */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-400" /> Selección de Cliente
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Cliente <span className="text-rose-400">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                name="clientePersonaId"
                value={form.clientePersonaId}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all appearance-none cursor-pointer ${
                  errores.clientePersonaId ? 'border-rose-500/50' : 'border-white/10'
                } ${!form.clientePersonaId ? 'text-slate-600' : ''}`}
              >
                <option value="">Seleccionar cliente de la base de datos...</option>
                {clientes.map(c => (
                  <option key={c.personaId} value={c.personaId}>
                    {c.nombreCompleto} ({c.identificacion})
                  </option>
                ))}
              </select>
            </div>
            {errores.clientePersonaId && <p className="mt-1.5 text-xs text-rose-400">{errores.clientePersonaId}</p>}
          </div>
        </div>

        {/* Clasificación */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" /> Clasificación del Reclamo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Canal <span className="text-rose-400">*</span></label>
              <div className="relative">
                <Radio className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  name="canalReclamoId"
                  value={form.canalReclamoId}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer ${
                    errores.canalReclamoId ? 'border-rose-500/50' : 'border-white/10'
                  } ${!form.canalReclamoId ? 'text-slate-600' : ''}`}
                >
                  <option value="">Seleccionar canal...</option>
                  {canales.map(c => <option key={c.id} value={c.id}>{c.descripcion}</option>)}
                </select>
              </div>
              {errores.canalReclamoId && <p className="mt-1.5 text-xs text-rose-400">{errores.canalReclamoId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Categoría <span className="text-rose-400">*</span></label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  name="categoriaReclamoId"
                  value={form.categoriaReclamoId}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer ${
                    errores.categoriaReclamoId ? 'border-rose-500/50' : 'border-white/10'
                  } ${!form.categoriaReclamoId ? 'text-slate-600' : ''}`}
                >
                  <option value="">Seleccionar categoría...</option>
                  {categorias.map(c => <option key={c.id} value={c.id}>{c.descripcion}</option>)}
                </select>
              </div>
              {errores.categoriaReclamoId && <p className="mt-1.5 text-xs text-rose-400">{errores.categoriaReclamoId}</p>}
            </div>
          </div>
        </div>

        {/* Detalle */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" /> Detalle
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Descripción <span className="text-rose-400">*</span></label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describa el motivo del reclamo..."
              className={`w-full px-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all resize-none ${
                errores.descripcion ? 'border-rose-500/50' : 'border-white/10'
              }`}
            />
            {errores.descripcion && <p className="mt-1.5 text-xs text-rose-400">{errores.descripcion}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Monto (Opcional)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  name="montoReclamo"
                  value={form.montoReclamo}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                    errores.montoReclamo ? 'border-rose-500/50' : 'border-white/10'
                  }`}
                />
              </div>
              {errores.montoReclamo && <p className="mt-1.5 text-xs text-rose-400">{errores.montoReclamo}</p>}
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 px-3 py-2.5 bg-surface-800 border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-all w-full">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="indisponibilidadDigital"
                    checked={form.indisponibilidadDigital}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-brand-500 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform" />
                </div>
                <div className="flex items-center gap-1.5">
                  <WifiOff className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">Indisponibilidad digital</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-brand-500/5 border border-brand-500/10 rounded-2xl p-4 flex items-start gap-3">
          <div className="p-1.5 bg-brand-500/10 rounded-lg shrink-0 mt-0.5">
            <Layers className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <p className="text-sm text-slate-300 font-medium">Motor de Reglas Activado</p>
            <p className="text-xs text-slate-500 mt-0.5">Al enviar, el backend calculará automáticamente la prioridad del reclamo basándose en la matriz de decisión de la Hackathon.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
          >
            {enviando ? 'Enviando...' : <><Send className="w-4 h-4" /> Registrar en Base de Datos</>}
          </button>
        </div>
      </form>
    </div>
  );
}
