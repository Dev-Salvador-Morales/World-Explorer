import { useEffect, useState } from 'react';
import { getRates } from '../services/fxRates';

export function useFxRate(base: string, to: string) {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        
        // Validar que ambas monedas sean válidas
        if (!base || !to || base === to || base === 'N/A' || to === 'N/A') { 
          setRate(1); 
          return; 
        }
        
        // Validar que sean códigos de moneda válidos (3 letras)
        if (base.length !== 3 || to.length !== 3) {
          setRate(null);
          setErr('Código de moneda inválido');
          return;
        }
        
        const data = await getRates(base, [to]);
        const r = data.rates?.[to];
        if (!cancelled) setRate(r ?? null);
      } catch (e:any) {
        if (!cancelled) setErr(e.message ?? 'Error obteniendo tasas de cambio');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [base, to]);

  return { rate, loading, error };
}
