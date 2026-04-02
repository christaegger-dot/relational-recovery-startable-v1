# Relational Recovery – startbares Vite/React-Projekt

Dieses Paket enthält die modularisierte Website als direkt startbares React-Projekt mit Vite.

## Voraussetzungen

- Node.js 20 oder neuer
- npm 10 oder neuer

## Start

```bash
npm install
npm run dev
```

Danach ist die App lokal über die von Vite ausgegebene URL erreichbar.

## Produktionsbuild

```bash
npm run build
npm run preview
```

## Struktur

- `index.html` – HTML-Einstieg mit `#root`
- `src/main.jsx` – React-Mounting via `createRoot(...)`
- `src/App.jsx` – Hauptkomponente
- `src/components/*` – Header/Footer
- `src/sections/*` – Inhaltssektionen
- `src/data/content.js` – Inhalte und Ressourcen
- `src/utils/appHelpers.js` – Hilfsfunktionen
- `src/styles/app-global.css` – globale Styles
