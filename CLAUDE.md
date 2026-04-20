# Relational Recovery — Projektkontext

Schweizer Fachportal zur Unterstützung von Fachpersonen, die mit Familien arbeiten, in denen ein Elternteil psychisch erkrankt ist. Die Inhalte sind auf Deutsch (de-CH).

## Befehle

- `npm run dev` — Vite Dev-Server starten
- `npm run build` — Production-Build
- `npm run lint` — ESLint
- `npm run lint:fix` — ESLint mit Auto-Fix
- `npm run format` — Prettier
- `npm run test:e2e` — Playwright E2E-Tests

## Architektur

Rein clientseitige React 19 SPA ohne Backend. Kein Routing-Library — Hash-basierte Navigation (`#start`, `#toolbox`, `#evidenz` etc.).

### Verzeichnisstruktur

- `src/components/ui/` — Wiederverwendbare UI-Primitives (Button, Section, SectionHeader, AsideCard etc.)
- `src/components/closing/` — ClosingSection-Komponente (wiederverwendbar am Ende jeder Seite)
- `src/sections/` — Sektions-Komponenten: bauen View-Models aus Daten und reichen sie an Templates weiter
- `src/templates/` — Reine Rendering-Komponenten, empfangen Props von Sections
- `src/data/` — Statische Inhaltsdaten (deutsch)
- `src/context/` — AppStateContext (globaler State mit localStorage-Persistenz)
- `src/utils/` — Hilfsfunktionen und Custom Hooks (useMobileMenu, useNavigationFocus, useDownloadHandlers)
- `src/styles/` — CSS: `primitives.css` (UI-Komponentensystem), `app-global.css` (globale Stile)

### Patterns

- **Section → Template**: Sections bereiten Daten auf, Templates rendern. Sections sind lazy-loaded, HomeLandingTemplate nicht (bewusst — Startseite).
- **SectionHeader + AsideCard**: Wiederverwendbare Shared Components für das Split-Layout-Pattern (Eyebrow + Title + Description + Aside-Karte).
- **Custom Hooks in utils/**: `useMobileMenu`, `useNavigationFocus`, `useDownloadHandlers` — aus App.jsx extrahiert.

## Zielgruppen

- **Primäradressat aller Tabs: Fachpersonen** (Erwachsenenpsychiatrie und Beratungskontext). Default, sobald ein Tab kein `primaryAudience`-Feld in `appShellContent.js` trägt.
- **Ausnahme: der Material-Tab** (`#material`). Inhalte sind als Handout-Material gerahmt, das Fachpersonen im Gespräch mit Patient:innen und Angehörigen einsetzen oder zur Weitergabe verlinken. Trägt `primaryAudience: 'weitergabe'`.
- Mischung der Adressaten innerhalb eines Tabs bewusst vermeiden. Wenn unklar ist, welcher Zielgruppe ein neuer Inhalt dient: eher auf Fachperson zuspitzen und entlastendes/erklärendes Weitergabe-Material im Material-Tab bündeln.

## Konventionen

- Fachspezifische deutsche Begriffe in Section-/Template-Namen (GlossarSection, VignettenSection), technische Begriffe auf Englisch
- CSS: `ui-`-Prefix im BEM-ähnlichen Stil in `primitives.css`, Tailwind-Utilities in JSX
- Kein `dangerouslySetInnerHTML` — alle Inhalte über JSX
- Alle externen Links: `target="_blank" rel="noopener noreferrer"`
- `prefers-reduced-motion` wird für alle Animationen berücksichtigt

## Wichtig

- Die App enthält Notfallnummern (144, AERZTEFON, 147). Diese müssen immer erreichbar bleiben — ErrorBoundary zeigt sie auch bei Crashes.
- localStorage-Key: `rr_app_state_v5` — enthält keine personenbezogenen Daten
- Kein Backend, keine API-Calls, keine .env-Variablen nötig
