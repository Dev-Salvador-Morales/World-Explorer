import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { getByCCA3 } from '../../services/restCountries';
import { currencyOf, formatNumber } from '../../utils/format';
import { useCurrency } from '../../context/CurrencyContext';
import { useFxRate } from '../../hooks/useFxRates';
import Loader from '../ui/Loader';
import ErrorState from '../ui/ErrorState';
import type { Country } from '../../types';

export default function CountryDetail(){
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string|null>(null);

  useEffect(()=> {
    (async () => {
      try {
        setLoading(true);
        setCountry(await getByCCA3(code!));
      } catch (e:any) {
        setErr(e.message ?? 'Error');
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  const { target } = useCurrency();
  const localCurrency = useMemo(()=> currencyOf(country?.currencies), [country]);
  const { rate, loading:fxLoading, error:fxErr } = useFxRate(localCurrency.code, target);

  if (loading) return <Loader label="Cargando país..." />;
  if (err || !country) return <ErrorState msg={err ?? 'Sin datos'} />;

  const flag = country.flags.svg || country.flags.png;

  return (
    <div className="section">
      <Link to="/" className="back-link">← Volver a la lista</Link>
      
      <div className="country-detail-layout">
        {flag && (
          <div className="flag-container">
            <img 
              src={flag} 
              alt={country.flags.alt ?? `Bandera de ${country.name.common}`} 
              className="flag-detail"
            />
          </div>
        )}
        
        <div className="country-info">
          <h1 className="country-title">{country.name.official}</h1>
          <p className="country-common-name">({country.name.common})</p>
          
          <div className="region-badges">
            <span className="badge region-badge">{country.region}</span>
            {country.subregion && <span className="badge subregion-badge">{country.subregion}</span>}
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Capital:</span>
              <span className="info-value">{country.capital?.[0] ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Población:</span>
              <span className="info-value">{formatNumber(country.population)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Moneda:</span>
              <span className="info-value">{localCurrency.name} ({localCurrency.code})</span>
            </div>
            <div className="info-item">
              <span className="info-label">Idiomas:</span>
              <span className="info-value">{country.languages ? Object.values(country.languages).join(', ') : '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Fronteras:</span>
              <span className="info-value">{country.borders?.join(', ') || 'Sin fronteras terrestres'}</span>
            </div>
          </div>

          {/* Conversión de moneda */}
          {localCurrency.code !== target && (
            <div className="currency-conversion">
              <h3>💱 Conversión de moneda</h3>
              {fxErr ? (
                <div className="error-message">
                  ⚠️ {fxErr}
                  <div className="small">La conversión no está disponible temporalmente</div>
                </div>
              ) : (
                <>
                  <div className="conversion-display">
                    <span className="amount">1 {localCurrency.code}</span>
                    <span className="equals">≈</span>
                    {fxLoading ? (
                      <span className="loading">Cargando...</span>
                    ) : (
                      <span className="converted-amount">
                        {rate ? rate.toFixed(4) : '—'} {target}
                      </span>
                    )}
                  </div>
                  <p className="conversion-note">
                    💡 Puedes cambiar la moneda objetivo en el header
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mapa - Ancho completo */}
      {country.maps?.googleMaps && (
        <div className="map-section">
          <h3>🗺️ Ubicación en el mapa</h3>
          <div className="map-container">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(country.name.common)}&t=&z=6&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="300"
              style={{border: 0, borderRadius: '12px'}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${country.name.common}`}
            />
          </div>
          <div className="map-link">
            <a href={country.maps.googleMaps} target="_blank" rel="noreferrer">
              🔗 Ver en Google Maps →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
