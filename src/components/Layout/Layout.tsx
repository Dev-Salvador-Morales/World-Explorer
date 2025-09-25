import { Outlet } from 'react-router-dom';
import CurrencySelector from '../Header/CurrencySelector';

export default function Layout() {
  return (
    <>
      <header className="header">
        <div className="header-inner container">
          <div className="title">🌍 World Explorer</div>
          <CurrencySelector />
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
