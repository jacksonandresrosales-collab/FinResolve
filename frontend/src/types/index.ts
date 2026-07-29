export interface HealthResponse {
  status: string;
  application: string;
  timestamp: string;
}

export interface ReclamoResponse {
  id: number;
  codigo: string;
  identificacion: string;
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
  fechaActualizacion: string;
  alertaSla: string;
}

export interface TableroResponse {
  totalReclamos: number;
  abiertos: number;
  resueltos: number;
  vencidos: number;
  proximosAVencer: number;
  distribucionPrioridad: Record<string, number>;
  distribucionCategoria: Record<string, number>;
}
