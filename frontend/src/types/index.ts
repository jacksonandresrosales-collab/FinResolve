export interface HealthResponse {
  status: string;
  application: string;
  timestamp: string;
}

export interface ReclamoResponse {
  reclamoId: number;
  codigo: string;
  clienteNombre: string;
  canalDescripcion: string;
  categoriaDescripcion: string;
  descripcion: string;
  montoReclamo: number | null;
  indisponibilidadDigital: boolean;
  puntaje: number;
  prioridadDescripcion: string;
  slaDescripcion: string;
  estadoReclamoDescripcion: string;
  analistaNombre: string | null;
  fechaReclamo: string;
  fechaLimite: string;
  fechaCreacion: string;
}

export interface ReclamoDetalleResponse extends ReclamoResponse {
  clienteIdentificacion: string;
  clienteDireccion: string;
  clienteTelefono: string;
  clienteCorreo: string;
  historial: ReclamoHistorialResponse[];
}

export interface ReclamoHistorialResponse {
  reclamoHistorialId: number;
  usuarioActorNombre: string;
  tipoEvento: string;
  estadoAnteriorDescripcion: string | null;
  estadoNuevoDescripcion: string | null;
  analistaAnteriorNombre: string | null;
  analistaNuevoNombre: string | null;
  observacion: string;
  fechaEvento: string;
}

export interface CatalogoResponse {
  id: number;
  descripcion: string;
}

export interface ClienteResponse {
  personaId: number;
  nombreCompleto: string;
  identificacion: string;
  telefono: string | null;
  correoElectronico: string | null;
}

export interface TableroResponse {
  totalReclamos: number;
  pendientes: number;
  enAnalisis: number;
  resueltos: number;
  rechazados: number;
  criticos: number;
  altos: number;
  medios: number;
  bajos: number;
  vencidos: number;
  ultimosReclamos: ReclamoResponse[];
}

export type EstadoKey = 'Nuevo' | 'En analisis' | 'Resuelto' | 'Rechazado';
export type PrioridadKey = 'Critica' | 'Alta' | 'Media' | 'Baja';
export type AlertaSlaKey = 'VENCIDO' | 'EN_RIESGO' | 'NORMAL';
