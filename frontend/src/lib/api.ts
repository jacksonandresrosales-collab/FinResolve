const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error de conexión" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error de conexión" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error de conexión" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiPatch<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error de conexión" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiGetText(endpoint: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}
