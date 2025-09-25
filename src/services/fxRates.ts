import type { FxRateResponse } from '../types';

const BASE = import.meta.env.VITE_FXRATES_BASE_URL ?? 'https://api.fxratesapi.com';
const KEY = import.meta.env.VITE_FXRATES_API_KEY;

export async function getRates(base: string, symbols: string[]): Promise<FxRateResponse> {
  // Validar entradas
  if (!base || symbols.length === 0) {
    throw new Error('Parámetros de moneda inválidos');
  }
  
  // Ejemplo de endpoint tipo: GET /latest?base=MXN&symbols=USD,EUR
  const qs = new URLSearchParams({
    base: base.toUpperCase(), 
    symbols: symbols.map(s => s.toUpperCase()).join(',')
  });
  const url = `${BASE}/latest?${qs.toString()}`;
  
  const res = await fetch(url, {
    headers: KEY ? { Authorization: `Bearer ${KEY}` } : {}
  });
  
  if (!res.ok) {
    if (res.status === 400) {
      throw new Error(`Moneda no válida: ${base}`);
    } else if (res.status === 429) {
      throw new Error('Demasiadas solicitudes. Intenta más tarde');
    } else {
      throw new Error(`Error del servidor: ${res.status}`);
    }
  }
  
  return res.json();
}
