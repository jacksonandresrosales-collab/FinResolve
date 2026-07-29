"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import type { HealthResponse } from "@/types";

type ConnectionStatus = "checking" | "connected" | "error";

export default function Home() {
  const [status, setStatus] = useState<ConnectionStatus>("checking");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    apiGet<HealthResponse>("/public/health")
      .then((data) => {
        setHealth(data);
        setStatus("connected");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setStatus("error");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">FinResolve</h1>
        <p className="text-gray-500">
          Plataforma para la gestión y priorización de reclamos financieros
        </p>

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Estado de Conexión</h2>

          {status === "checking" && (
            <div className="flex items-center justify-center gap-2 text-yellow-600">
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-400 animate-pulse" />
              Verificando conexión con el backend...
            </div>
          )}

          {status === "connected" && health && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
                Conectado
              </div>
              <div className="text-sm text-left space-y-1 bg-gray-50 rounded-lg p-3">
                <p><span className="font-medium">Backend:</span> {health.application}</p>
                <p><span className="font-medium">Status:</span> {health.status}</p>
                <p><span className="font-medium">Timestamp:</span> {health.timestamp}</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-red-600">
                <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
                Error de conexión
              </div>
              <p className="text-sm text-red-500 bg-red-50 rounded-lg p-3">{errorMsg}</p>
              <p className="text-xs text-gray-400">
                Asegúrate de que el backend esté corriendo en puerto 8080
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
