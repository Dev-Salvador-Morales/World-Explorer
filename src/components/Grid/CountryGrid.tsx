import CountryCard from './CountryCard';
import type { Country } from '../../types';

export default function CountryGrid({items}:{items:Country[]}) {
  return (
    <div className="grid" role="list">
      {items.map(c => <CountryCard key={c.cca3} c={c} />)}
    </div>
  );
}
