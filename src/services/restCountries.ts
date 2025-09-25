import type { Country } from '../types';

const BASE = 'https://restcountries.com/v3.1';

export async function getAllCountries(): Promise<Country[]> {
  const fields = [
    'name','flags','region','subregion','population','languages',
    'capital','borders','cca3','cca2','currencies','maps',
    'altSpellings','translations'
  ].join(',');
  const res = await fetch(`${BASE}/independent?status=true&fields=${fields}`);
  if (!res.ok) throw new Error('Error cargando países');
  return res.json();
}

export async function getByCCA3(code: string): Promise<Country> {
  const fields = [
    'name','flags','region','subregion','population','languages',
    'capital','borders','cca3','cca2','currencies','maps',
    'altSpellings','translations'
  ].join(',');
  const res = await fetch(`${BASE}/alpha/${code}?fields=${fields}`);
  if (!res.ok) throw new Error('País no encontrado');
  const country = await res.json();
  return country;
}
