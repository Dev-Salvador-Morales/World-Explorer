import { useCountries } from '../../hooks/useCountries';
import FiltersBar from '../Filters/FiltersBar';
import CountryGrid from '../Grid/CountryGrid';
import RegionsPie from '../Charts/RegionsPie';
import Top10PopulationBar from '../Charts/Top10PopulationBar';
import Loader from '../ui/Loader';
import ErrorState from '../ui/ErrorState';

export default function Home() {
  const { filtered, regions, languages, loading, error, filters, setFilters, all } = useCountries();

  return (
    <>
      <section className="section" aria-label="filtros">
        <FiltersBar
          regions={regions}
          languages={languages}
          value={filters}
          onChange={setFilters}
        />
      </section>

      {loading && <Loader />}
      {error && <ErrorState msg={error} />}

      {!loading && !error && (
        <>
          <section className="section">
            <CountryGrid items={filtered} />
          </section>

          <section className="section" aria-label="charts">
            <div className="charts-grid">
              <RegionsPie items={all} />
              <Top10PopulationBar items={all} />
            </div>
          </section>
        </>
      )}
    </>
  );
}
