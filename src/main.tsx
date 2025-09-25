import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { CurrencyProvider } from './context/CurrencyContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrencyProvider>
      <RouterProvider router={router} />
    </CurrencyProvider>
  </React.StrictMode>
);
