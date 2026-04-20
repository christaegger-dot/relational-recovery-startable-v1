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

### Material-Handouts: Print / PDF-Export

Jedes einzelne Handout im Material-Tab ist druckbar via Print-Button im Handout-Head. Der Browser-Druckdialog deckt auch "Als PDF speichern" ab (keine separate PDF-Bibliothek nötig).

**Wie ein neues Handout print-ready wird:**

1. Handout-Objekt in `src/data/materialContent.js` unter `MATERIAL_HANDOUTS` anlegen (mit `id`, `kind`, etc.).
2. Im Template (`src/templates/MaterialPageTemplate.jsx`) eine passende Komponente für den neuen `kind` im `MaterialHandoutSwitch` ergänzen. Die Komponente muss:
   - `data-handout-id={handout.id}` auf dem `<article>` setzen (Voraussetzung für den Scoped-Print-Style),
   - den `onPrintHandout`-Prop annehmen und als Button-Handler in Nähe des Titels nutzen (Muster: `MaterialCrisisPlan`),
   - den Print-Button mit `className="ui-material-handout__print-btn no-print"` versehen.
3. Print-Typografie: Standardregeln für `.ui-material-handout*` im `@media print`-Block in `src/styles/app-global.css` (Abschnitt 9) greifen automatisch. Handout-spezifische Eigenheiten nur ergänzen, wenn ein Format stark abweicht.
4. Der `useMaterialHandoutPrint`-Hook rendert beim Click einen scoped `<style>`-Block, der beim Druck alle anderen Handouts ausblendet — kein zusätzlicher Code pro Handout-Typ nötig.

Alle Rahmung (Hero, Intro, Index, FAQ-Cluster, ClosingSection) ist im `MaterialPageTemplate` mit `.no-print`-Wrappern versehen, damit beim Druck nur der Handout-Grid übrig bleibt.

### Material-Cluster: Zielgruppen-Blöcke

Die FAQ-Cluster im Material-Tab adressieren zwei Gruppen: Cluster 1–3 Angehörige, Cluster 4–6 betroffene Eltern. Die Gliederung wird im Template über zwei Eingaben gesteuert:

- **`audience`** pro Cluster in `MATERIAL_CLUSTERS` (`'angehoerige'` | `'eltern'`) — rendert das `.ui-badge--soft`-Label im Cluster-Header.
- **`MATERIAL_CLUSTER_AUDIENCES`** — Array mit einem Eintrag pro Gruppe (`id`, `badge`, `title`, `description`). Jede Gruppe bekommt einen eigenen Block-Header (H2). Cluster-Titel rutschen dadurch auf H3 (Outline-Regel: H1 Page → H2 Block → H3 Cluster).

Neue Cluster hinzufügen: `audience`-Feld nicht vergessen. Wenn eine neue Zielgruppe dazukommt, einen weiteren Eintrag in `MATERIAL_CLUSTER_AUDIENCES` anlegen und ggf. eine Badge-Variante in `primitives.css` unter `.ui-badge[data-audience='…']` ergänzen.

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
