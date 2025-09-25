import { useCurrency } from '../../context/CurrencyContext';
import type { CurrencyCode } from '../../types';

const CURRENCY_OPTIONS: Array<{code: CurrencyCode, name: string, flag: string}> = [
  // Principales monedas mundiales
  { code: 'USD', name: 'Dólar estadounidense', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'Libra esterlina', flag: '🇬🇧' },
  { code: 'JPY', name: 'Yen japonés', flag: '🇯🇵' },
  { code: 'CHF', name: 'Franco suizo', flag: '🇨🇭' },
  
  // América
  { code: 'MXN', name: 'Peso mexicano', flag: '🇲🇽' },
  { code: 'CAD', name: 'Dólar canadiense', flag: '🇨🇦' },
  { code: 'BRL', name: 'Real brasileño', flag: '🇧🇷' },
  { code: 'ARS', name: 'Peso argentino', flag: '🇦🇷' },
  { code: 'CLP', name: 'Peso chileno', flag: '🇨🇱' },
  { code: 'COP', name: 'Peso colombiano', flag: '🇨🇴' },
  { code: 'PEN', name: 'Sol peruano', flag: '🇵🇪' },
  
  // Asia-Pacífico
  { code: 'CNY', name: 'Yuan chino', flag: '🇨🇳' },
  { code: 'INR', name: 'Rupia india', flag: '🇮🇳' },
  { code: 'KRW', name: 'Won surcoreano', flag: '🇰🇷' },
  { code: 'AUD', name: 'Dólar australiano', flag: '🇦🇺' },
  { code: 'NZD', name: 'Dólar neozelandés', flag: '🇳🇿' },
  { code: 'SGD', name: 'Dólar singapurense', flag: '🇸🇬' },
  { code: 'HKD', name: 'Dólar hongkonés', flag: '🇭🇰' },
  { code: 'THB', name: 'Baht tailandés', flag: '🇹🇭' },
  { code: 'MYR', name: 'Ringgit malayo', flag: '🇲🇾' },
  
  // Europa
  { code: 'NOK', name: 'Corona noruega', flag: '🇳🇴' },
  { code: 'SEK', name: 'Corona sueca', flag: '🇸🇪' },
  { code: 'DKK', name: 'Corona danesa', flag: '🇩🇰' },
  { code: 'PLN', name: 'Zloty polaco', flag: '🇵🇱' },
  { code: 'CZK', name: 'Corona checa', flag: '🇨🇿' },
  { code: 'HUF', name: 'Forinto húngaro', flag: '🇭🇺' },
  
  // Otros
  { code: 'TRY', name: 'Lira turca', flag: '🇹🇷' },
  { code: 'ZAR', name: 'Rand sudafricano', flag: '🇿🇦' },
  { code: 'RUB', name: 'Rublo ruso', flag: '🇷🇺' },
];

export default function CurrencySelector() {
  const { target, setTarget } = useCurrency();
  return (
    <label className="currency-selector" aria-label="Selector de moneda">
      <span className="small">💱 Moneda:</span>
      <select 
        value={target} 
        onChange={e=>setTarget(e.target.value as CurrencyCode)}
        className="currency-select"
      >
        {CURRENCY_OPTIONS.map(({code, name, flag}) => (
          <option key={code} value={code}>
            {flag} {code} - {name}
          </option>
        ))}
      </select>
    </label>
  );
}
