export type CurrencyCode = 
  | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'MXN' 
  | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR'
  | 'BRL' | 'ARS' | 'CLP' | 'COP' | 'PEN'
  | 'KRW' | 'SGD' | 'NOK' | 'SEK' | 'DKK'
  | 'PLN' | 'CZK' | 'HUF' | 'TRY' | 'ZAR'
  | 'RUB' | 'NZD' | 'HKD' | 'THB' | 'MYR';

export interface Country {
  cca3: string;
  name: { 
    common: string; 
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: { svg?: string; png?: string; alt?: string };
  region: string;
  subregion?: string;
  population: number;
  languages?: Record<string,string>;
  capital?: string[];
  borders?: string[];
  maps?: { googleMaps?: string; openStreetMaps?: string };
  cca2?: string;
  cca1?: string;
  currencies?: Record<string, { name: string; symbol?: string }>;
  altSpellings?: string[];
  translations?: Record<string, { official: string; common: string }>;
}

export interface FxRateResponse {
  base: string;
  rates: Record<string, number>;
  date?: string;
}
