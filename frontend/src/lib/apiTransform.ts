import type { ReclamoResponse, EstadoKey, PrioridadKey, AlertaSlaKey } from '@/types';

const estadoMap: Record<string, string> = {
  'Nuevo': 'NUEVO',
  'En analisis': 'EN_ANALISIS',
  'Resuelto': 'RESUELTO',
  'Rechazado': 'CERRADO',
};

const prioridadMap: Record<string, string> = {
  'Critica': 'CRITICA',
  'Alta': 'ALTA',
  'Media': 'MEDIA',
  'Baja': 'BAJA',
};

function calcularAlertaSLA(fechaLimite: string, estadoReclamoDescripcion: string): AlertaSlaKey {
  if (estadoReclamoDescripcion === 'Resuelto' || estadoReclamoDescripcion === 'Rechazado') {
    return 'NORMAL';
  }
  const limite = new Date(fechaLimite);
  const ahora = new Date();
  const diffMs = limite.getTime() - ahora.getTime();
  const diffHoras = diffMs / (1000 * 60 * 60);

  if (diffHoras < 0) return 'VENCIDO';
  if (diffHoras < 4) return 'EN_RIESGO';
  return 'NORMAL';
}

export interface ReclamoUIData {
  id: number;
  codigo: string;
  identificacion?: string;
  nombreCliente: string;
  canal: string;
  categoria: string;
  descripcion: string;
  monto: number | null;
  indisponibilidadDigital: boolean;
  estado: string;
  puntaje: number;
  prioridad: string;
  responsable: string | null;
  fechaCreacion: string;
  fechaLimite: string;
  alertaSla: AlertaSlaKey;
}

export function toReclamoUI(api: ReclamoResponse): ReclamoUIData {
  return {
    id: api.reclamoId,
    codigo: api.codigo,
    nombreCliente: api.clienteNombre,
    canal: api.canalDescripcion,
    categoria: api.categoriaDescripcion,
    descripcion: api.descripcion,
    monto: api.montoReclamo,
    indisponibilidadDigital: api.indisponibilidadDigital,
    estado: estadoMap[api.estadoReclamoDescripcion as EstadoKey] || api.estadoReclamoDescripcion,
    puntaje: api.puntaje,
    prioridad: prioridadMap[api.prioridadDescripcion as PrioridadKey] || api.prioridadDescripcion,
    responsable: api.analistaNombre,
    fechaCreacion: api.fechaReclamo,
    fechaLimite: api.fechaLimite,
    alertaSla: calcularAlertaSLA(api.fechaLimite, api.estadoReclamoDescripcion),
  };
}
