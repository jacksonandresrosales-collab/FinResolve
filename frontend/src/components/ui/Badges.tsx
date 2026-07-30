import { AlertTriangle, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

type Prioridad = 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';
type Estado = 'NUEVO' | 'EN_ANALISIS' | 'PENDIENTE_INFO' | 'RESUELTO' | 'CERRADO';
type AlertaSla = 'VENCIDO' | 'EN_RIESGO' | 'NORMAL';

const prioridadConfig: Record<Prioridad, { label: string; className: string; icon: typeof ShieldAlert }> = {
  CRITICA: {
    label: 'Crítica',
    className: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    icon: ShieldAlert,
  },
  ALTA: {
    label: 'Alta',
    className: 'bg-red-500/15 text-red-400 border-red-500/30',
    icon: AlertTriangle,
  },
  MEDIA: {
    label: 'Media',
    className: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    icon: Clock,
  },
  BAJA: {
    label: 'Baja',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle2,
  },
};

const estadoConfig: Record<Estado, { label: string; className: string }> = {
  NUEVO: {
    label: 'Nuevo',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  EN_ANALISIS: {
    label: 'En Análisis',
    className: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  },
  PENDIENTE_INFO: {
    label: 'Pendiente Info',
    className: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  },
  RESUELTO: {
    label: 'Resuelto',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  CERRADO: {
    label: 'Cerrado',
    className: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  },
};

const alertaConfig: Record<AlertaSla, { label: string; className: string; dot: string }> = {
  VENCIDO: {
    label: 'Vencido',
    className: 'text-rose-400',
    dot: 'bg-rose-500 animate-pulse',
  },
  EN_RIESGO: {
    label: 'En riesgo',
    className: 'text-amber-400',
    dot: 'bg-amber-500 animate-pulse',
  },
  NORMAL: {
    label: 'En tiempo',
    className: 'text-emerald-400',
    dot: 'bg-emerald-500',
  },
};

export function PrioridadBadge({ prioridad }: { prioridad: string }) {
  const config = prioridadConfig[prioridad as Prioridad] || prioridadConfig.BAJA;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.className} transition-all`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

export function EstadoBadge({ estado }: { estado: string }) {
  const config = estadoConfig[estado as Estado] || estadoConfig.NUEVO;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.className}`}>
      {config.label}
    </span>
  );
}

export function AlertaSLAIndicator({ alerta }: { alerta: string }) {
  const config = alertaConfig[alerta as AlertaSla] || alertaConfig.NORMAL;
  return (
    <div className={`flex items-center gap-2 ${config.className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
}
