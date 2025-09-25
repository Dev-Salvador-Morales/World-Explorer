import type { Filters } from '../../hooks/useCountries';

type Props = {
  regions: string[];
  languages: string[];
  value: Filters;
  onChange: (f: Filters)=>void;
};

export default function FiltersBar({regions, languages, value, onChange}:Props){
  return (
    <div className="toolbar" role="region" aria-label="Filtros">
      <input
        className="input"
        placeholder="Buscar país, capital o código (ej: México, Mexico City, MX)..."
        value={value.search}
        onChange={e=>onChange({...value, search:e.target.value})}
      />
      <select value={value.region} onChange={e=>onChange({...value, region:e.target.value})}>
        <option value="">Todas las regiones</option>
        {regions.map(r=> <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={value.language} onChange={e=>onChange({...value, language:e.target.value})}>
        <option value="">Todos los idiomas</option>
        {languages.map(l=> <option key={l} value={l}>{l}</option>)}
      </select>
      <select value={value.sort ?? ''} onChange={e=>onChange({...value, sort:(e.target.value||null) as any})}>
        <option value="">Sin ordenar</option>
        <option value="pop-asc">Población ↑</option>
        <option value="pop-desc">Población ↓</option>
      </select>
    </div>
  );
}
