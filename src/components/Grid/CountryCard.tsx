import { Link } from 'react-router-dom';
import { formatNumber, mainLanguage } from '../../utils/format';
import type { Country } from '../../types';

export default function CountryCard({c}:{c:Country}) {
  const flag = c.flags.svg || c.flags.png;
  return (
    <Link to={`/country/${c.cca3}`} className="card" aria-label={`Abrir ${c.name.common}`}>
      {flag && <img className="img-fit" src={flag} alt={c.flags.alt ?? `Bandera de ${c.name.common}`} loading="lazy" />}
      <div style={{padding:12}}>
        <div className="card-title">{c.name.common}</div>
        <div className="row small">
          <span className="badge">{c.region || '—'}</span>
          <span>Población: {formatNumber(c.population)}</span>
          <span>Idioma: {mainLanguage(c.languages)}</span>
        </div>
      </div>
    </Link>
  );
}
