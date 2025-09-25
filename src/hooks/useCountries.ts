import { useEffect, useMemo, useState } from 'react';
import { getAllCountries } from '../services/restCountries';
import type { Country } from '../types';

export type Filters = {
  region: string; language: string; search: string; sort: 'pop-asc'|'pop-desc'|null;
};

export function useCountries() {
  const [all, setAll] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({region:'', language:'', search:'', sort:null});

  useEffect(() => {
    (async ()=> {
      try {
        setLoading(true);
        setAll(await getAllCountries());
      } catch (e:any) {
        setError(e.message ?? 'Error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const regions = useMemo(()=> Array.from(new Set(all.map(c=>c.region).filter(Boolean))).sort(), [all]);
  const languages = useMemo(()=> {
    const bag = new Set<string>();
    all.forEach(c => c.languages && Object.values(c.languages).forEach(l=>bag.add(l)));
    return Array.from(bag).sort();
  }, [all]);

  const filtered = useMemo(()=> {
    let res = all.slice();
    if (filters.region) res = res.filter(c => c.region === filters.region);
    if (filters.language) res = res.filter(c => Object.values(c.languages ?? {}).includes(filters.language));
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      res = res.filter(c => {
        // Búsqueda en nombres en inglés
        if (c.name.common.toLowerCase().includes(q)) return true;
        if (c.name.official.toLowerCase().includes(q)) return true;
        
        // Búsqueda en nombres nativos (incluye español)
        if (c.name.nativeName) {
          for (const lang of Object.values(c.name.nativeName)) {
            if (lang.common?.toLowerCase().includes(q)) return true;
            if (lang.official?.toLowerCase().includes(q)) return true;
          }
        }
        
        // Búsqueda en capitales
        if (c.capital) {
          for (const capital of c.capital) {
            if (capital.toLowerCase().includes(q)) return true;
          }
        }
        
        // Búsqueda en formas alternativas
        if (c.altSpellings) {
          for (const alt of c.altSpellings) {
            if (alt.toLowerCase().includes(q)) return true;
          }
        }
        
        // Búsqueda en traducciones (español, etc.)
        if (c.translations) {
          for (const translation of Object.values(c.translations)) {
            if (translation.common?.toLowerCase().includes(q)) return true;
            if (translation.official?.toLowerCase().includes(q)) return true;
          }
        }
        
        // Búsqueda en códigos de país
        if (c.cca2?.toLowerCase().includes(q)) return true;
        if (c.cca3?.toLowerCase().includes(q)) return true;
        
        return false;
      });
    }
    if (filters.sort === 'pop-asc') res.sort((a,b)=>a.population-b.population);
    if (filters.sort === 'pop-desc') res.sort((a,b)=>b.population-a.population);
    return res;
  }, [all, filters]);

  return { all, filtered, regions, languages, loading, error, filters, setFilters };
}
