export const formatNumber = (n: number) =>
  new Intl.NumberFormat('es-MX').format(n);

export const firstKey = <T extends object>(obj?: T): keyof T | undefined =>
  obj ? (Object.keys(obj)[0] as keyof T) : undefined;

export const mainLanguage = (langs?: Record<string,string>) =>
  langs ? Object.values(langs)[0] : '—';

export const currencyOf = (curr?: Record<string,{name:string}>) => {
  if (!curr) return { code: 'USD', name: 'Dólar estadounidense' };
  const code = Object.keys(curr)[0];
  return { code, name: curr[code].name };
};
