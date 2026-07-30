'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
const CANALES = ['Banca en Línea', 'App Móvil', 'Call Center', 'Sucursal', 'Correo Electrónico'];
const CATEGORIAS = ['Transacción no reconocida', 'Cobro duplicado', 'Error en transferencia', 'Producto/Servicio deficiente', 'Demora en proceso'];

import {
  Send,
  ArrowLeft,
  User,
  CreditCard,
  Layers,
  Radio,
  FileText,
  DollarSign,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';

interface FormData {
  identificacion: string;
  nombreCliente: string;
  canal: string;
  categoria: string;
  descripcion: string;
  monto: string;
  indisponibilidadDigital: boolean;
}

const initialForm: FormData = {
  identificacion: '',
  nombreCliente: '',
  canal: '',
  categoria: '',
  descripcion: '',
  monto: '',
  indisponibilidadDigital: false,
};

export default function NuevoReclamoPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpiar error del campo al escribir
    if (errores[name as keyof FormData]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validar = (): boolean => {
    const nuevosErrores: Partial<Record<keyof FormData, string>> = {};

    if (!form.identificacion.trim()) {
      nuevosErrores.identificacion = 'La cédula o RUC es obligatoria';
    } else if (form.identificacion.trim().length < 10) {
      nuevosErrores.identificacion = 'Debe tener al menos 10 dígitos';
    }

    if (!form.nombreCliente.trim()) {
      nuevosErrores.nombreCliente = 'El nombre del cliente es obligatorio';
    }

    if (!form.canal) {
      nuevosErrores.canal = 'Selecciona un canal de ingreso';
    }

    if (!form.categoria) {
      nuevosErrores.categoria = 'Selecciona una categoría';
    }

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción del reclamo es obligatoria';
    } else if (form.descripcion.trim().length < 20) {
      nuevosErrores.descripcion = 'Describe el reclamo con al menos 20 caracteres';
    }

    if (form.monto && isNaN(Number(form.monto))) {
      nuevosErrores.monto = 'El monto debe ser un número válido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validar()) return;

    setEnviando(true);

    // Simular envío (aquí conectaremos con la API real después)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Reclamo enviado (mock):', {
      ...form,
      monto: form.monto ? parseFloat(form.monto) : null,
    });

    setEnviando(false);
    setEnviado(true);
  };

  // Pantalla de éxito
  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6 animate-[scale-in_0.3s_ease-out]">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            ¡Reclamo registrado!
          </h2>
          <p className="text-slate-400 mb-2">
            El sistema ha calculado automáticamente la prioridad y fecha límite SLA.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Código asignado:{' '}
            <span className="font-mono font-semibold text-brand-400">
              REC-{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-
              {String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}
            </span>
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
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver
        </button>
        <h1 className="text-2xl font-heading font-bold text-white">Nuevo Reclamo</h1>
        <p className="text-sm text-slate-400 mt-1">
          Complete el formulario para registrar un nuevo reclamo. El sistema calculará la prioridad
          automáticamente.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección: Datos del Cliente */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-400" />
            Datos del Cliente
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Identificación */}
            <div>
              <label htmlFor="identificacion" className="block text-sm font-medium text-slate-300 mb-1.5">
                Cédula / RUC <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="identificacion"
                  name="identificacion"
                  type="text"
                  value={form.identificacion}
                  onChange={handleChange}
                  maxLength={13}
                  placeholder="0912345678"
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all ${
                    errores.identificacion ? 'border-rose-500/50' : 'border-white/10'
                  }`}
                />
              </div>
              {errores.identificacion && (
                <p className="mt-1.5 text-xs text-rose-400">{errores.identificacion}</p>
              )}
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="nombreCliente" className="block text-sm font-medium text-slate-300 mb-1.5">
                Nombre Completo <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="nombreCliente"
                  name="nombreCliente"
                  type="text"
                  value={form.nombreCliente}
                  onChange={handleChange}
                  placeholder="Nombre del cliente"
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all ${
                    errores.nombreCliente ? 'border-rose-500/50' : 'border-white/10'
                  }`}
                />
              </div>
              {errores.nombreCliente && (
                <p className="mt-1.5 text-xs text-rose-400">{errores.nombreCliente}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección: Clasificación */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            Clasificación del Reclamo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Canal */}
            <div>
              <label htmlFor="canal" className="block text-sm font-medium text-slate-300 mb-1.5">
                Canal de Ingreso <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Radio className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  id="canal"
                  name="canal"
                  value={form.canal}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none cursor-pointer ${
                    errores.canal ? 'border-rose-500/50' : 'border-white/10'
                  } ${!form.canal ? 'text-slate-600' : ''}`}
                >
                  <option value="">Seleccionar canal...</option>
                  {CANALES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {errores.canal && <p className="mt-1.5 text-xs text-rose-400">{errores.canal}</p>}
            </div>

            {/* Categoría */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-slate-300 mb-1.5">
                Categoría <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  id="categoria"
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none cursor-pointer ${
                    errores.categoria ? 'border-rose-500/50' : 'border-white/10'
                  } ${!form.categoria ? 'text-slate-600' : ''}`}
                >
                  <option value="">Seleccionar categoría...</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {errores.categoria && (
                <p className="mt-1.5 text-xs text-rose-400">{errores.categoria}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección: Detalle */}
        <div className="bg-surface-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            Detalle del Reclamo
          </h2>

          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-slate-300 mb-1.5">
              Descripción <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describe detalladamente el motivo del reclamo..."
              className={`w-full px-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none ${
                errores.descripcion ? 'border-rose-500/50' : 'border-white/10'
              }`}
            />
            <div className="flex items-center justify-between mt-1.5">
              {errores.descripcion ? (
                <p className="text-xs text-rose-400">{errores.descripcion}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-slate-600">
                {form.descripcion.length} caracteres
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monto */}
            <div>
              <label htmlFor="monto" className="block text-sm font-medium text-slate-300 mb-1.5">
                Monto Reclamado (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="monto"
                  name="monto"
                  type="text"
                  inputMode="decimal"
                  value={form.monto}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full pl-9 pr-3 py-2.5 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all ${
                    errores.monto ? 'border-rose-500/50' : 'border-white/10'
                  }`}
                />
              </div>
              {errores.monto && (
                <p className="mt-1.5 text-xs text-rose-400">{errores.monto}</p>
              )}
            </div>

            {/* Indisponibilidad */}
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

        {/* Nota informativa */}
        <div className="bg-brand-500/5 border border-brand-500/10 rounded-2xl p-4 flex items-start gap-3">
          <div className="p-1.5 bg-brand-500/10 rounded-lg shrink-0 mt-0.5">
            <Layers className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <p className="text-sm text-slate-300 font-medium">Priorización automática</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Al enviar este formulario, el sistema calculará automáticamente el nivel de prioridad
              (Crítica, Alta, Media, Baja) y asignará una fecha límite SLA basada en la categoría,
              monto, canal e indisponibilidad digital.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98]"
          >
            {enviando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Registrar Reclamo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
