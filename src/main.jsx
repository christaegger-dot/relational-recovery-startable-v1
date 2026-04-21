import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppStateProvider } from './context/AppStateContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Doppelter ErrorBoundary-Schutz fuer Emergency-Resilience (Audit 22):
// - Innerer Boundary in App.jsx faengt Section-Crashes ab und behaelt
//   Header/Footer/Emergency-Banner sichtbar.
// - Dieser aeussere Boundary faengt Crashes in AppStateProvider, App,
//   Header oder Footer ab, die sonst den gesamten Tree unmounten und
//   den Bildschirm schwarz lassen wuerden. Sein Fallback zeigt die
//   Notfallnummern als letzte Absicherung.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ErrorBoundary>
  </StrictMode>
);
