# 🌍 World Explorer

Dashboard para explorar países (REST Countries) y ver conversión de moneda (FXRatesAPI).

## Stack
- React + Vite + TypeScript
- CSS Modules (mobile-first)
- Recharts (gráficas)
- React Router
- Vitest + Testing Library

## Funcionalidad
- Tarjetas con nombre, bandera, región, población, idioma principal
- Filtros: región, idioma, búsqueda por nombre, ordenar por población
- Detalle: bandera grande, nombre oficial, capital, subregión, moneda (nombre y código),
  idiomas, fronteras, link a mapa, conversión 1 [moneda local] → [moneda objetivo]
- Selector global de moneda (USD, EUR, GBP, JPY, MXN)
- Gráficas: distribución por región, top 10 por población
- Responsivo + loaders + manejo de errores

## Configuración
1. `cp .env.example .env` y coloca tu `VITE_FXRATES_BASE_URL` y `VITE_FXRATES_API_KEY` (si tu plan lo requiere).
2. `npm i && npm run dev`

> **Nota:** La API de FX puede variar (ruta `/latest`, auth por header o query). Ajusta `services/fxRates.ts` si tu proveedor exige otra firma.

## Decisiones técnicas
- **CSS Modules** por simplicidad y alineado a preferencia previa (no Tailwind).
- **Context** para moneda objetivo y hooks reutilizables (`useCountries`, `useFxRate`).
- **Separación lógica/UI**: `services` + `hooks` + `components`.
- **Accesibilidad**: labels, roles, estados aria básicos.
- **Gráficas**: Recharts sin colores personalizados para neutralidad.


## Despliegue
- Vercel/Netlify/Cloudflare Pages. Recuerda configurar variables de entorno.

