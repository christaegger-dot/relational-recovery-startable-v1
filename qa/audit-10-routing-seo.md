# Audit 10 -- Routing-Architektur, SEO und Per-Route-Meta

## Phase 1 -- Inventur

### 1.0 Vorgehen

Read-only-Scan von `index.html`, `netlify.toml`, `src/App.jsx`, `src/context/AppStateContext.jsx`, `src/utils/appHelpers.js`, `src/utils/useNavigationFocus.js`, `qa/deep_link_qa.cjs`, `qa/deep-link-qa-result.json`, `package.json`, sowie ein Quer-Vergleich zur Schwester-Site `BipolarSite-main-aktuell` (Eleventy-SSG). Keine Code-Änderungen.

### 1.1 Aktuelle Routing-Architektur

**Form**: Hash-basiertes Routing mit `activeTab`-State in React-Context.

| Aspekt | Befund |
|---|---|
| Routing-Engine | Eigenbau, kein `react-router` oder `next/router` |
| URL-Form | `#start`, `#lernmodule`, `#vignetten`, `#glossar`, `#grundlagen`, `#evidenz`, `#toolbox`, `#netzwerk` |
| Section-Deep-Links | `#netzwerk-karte`, `#netzwerk-fachstellen` (springen innerhalb `#netzwerk`) |
| Hash-Aliases | 13 Einträge in `TAB_ALIASES` (`home`→`start`, `elearning`→`lernmodule`, `evidence`→`evidenz`, `network`→`netzwerk`, `zuerich`→`netzwerk`, `zaesur`→`evidenz`, plus Section-Aliases `network-map`→`netzwerk-karte` etc.) |
| Wo sitzt die Logik | `src/context/AppStateContext.jsx` hält `activeTab`. `src/utils/appHelpers.js` normalisiert den Hash. `src/utils/useNavigationFocus.js` synchronisiert Hash↔Tab und setzt Keyboard-Fokus. |
| `activeTab`-Setzung beim Laden | `getInitialAppState()` in `appHelpers.js:186` liest `window.location.hash` einmal beim Mount und setzt den Tab |
| `activeTab`-Setzung nach `navigate()` | `navigate()` setzt nur `activeTab`-State; der `useLayoutEffect` in `useNavigationFocus.js:48-69` reagiert darauf und setzt `window.location.hash = '#' + activeTab` |
| Hash-Änderung von aussen (Back-Button, Copy-Paste) | `useEffect` mit `window.addEventListener('hashchange', ...)` (Zeilen 128-158) reagiert, parst Hash, setzt `activeTab` entsprechend |
| **Browser-Back-Button** | **funktioniert** (Hash-History wird genutzt) |
| **Tab-Refreshen auf einer Unterseite** | **funktioniert** (Hash ist Teil der URL, `getInitialAppState` liest ihn beim Rehydrieren) |
| **Direkter Link auf `eltern-a.netlify.app/#netzwerk-karte`** | **funktioniert**: Hash wird normalisiert → Tab `netzwerk` aktiviert → nach Render-Frame Scroll und Fokus auf `#netzwerk-karte` (siehe `useNavigationFocus.js:160-193`) |
| Skip-Link-Hash | `#main-content` wird speziell behandelt (setzt Focus auf `main`, aber löst keinen Tab-Wechsel aus) |

**Zwischenfazit:** Das Routing ist deutlich ausgereifter als anfangs angenommen. Hash-Aliases, Section-Deep-Links, Back-Button-Handling und Fokus-Management sind alle implementiert. Das in `qa/deep_link_qa.cjs` dokumentierte Deep-Linking-Thema wurde -- ausweislich des gespeicherten Testergebnisses vom 2026-04-12 -- technisch gelöst.

### 1.2 Per-Route-Meta-Inventur

Aktueller Zustand in `index.html`:

| Meta-Element | Wert | Pro-Route-Update? |
|---|---|---|
| `<html lang>` | `de-CH` | nein (statisch) |
| `<title>` | „Relational Recovery" | **nein** (statisch) |
| `<meta name="description">` | Standard-Beschreibung | **nein** |
| `<meta property="og:title">` | „Relational Recovery -- Schweizer Fachportal" | **nein** |
| `<meta property="og:description">` | Standard-Beschreibung (anders als `description`) | **nein** |
| `<meta property="og:type">` | `website` | nein |
| `<meta name="theme-color">` | `#f9f4ee` | nein |
| `<link rel="icon">` | `favicon.svg` | nein |
| `<link rel="canonical">` | **fehlt** | — |
| Strukturierte Daten (JSON-LD) | **fehlt** | — |
| Open Graph `og:image` | **fehlt** | — |
| Twitter-Card-Tags | **fehlt** | — |

**Zentraler Befund:** Keine Per-Route-Meta. Alle Templates teilen denselben Shell-Meta-Satz. Wer `#netzwerk` teilt, sieht denselben OG-Title und dieselbe OG-Description wie bei `#start`.

**Einzige pro-Route-Dynamik im DOM:** Das Heading-Element hat pro Tab eine eigene `id` (`page-heading-start`, `page-heading-netzwerk`, …), und `main` referenziert sie via `aria-labelledby`. Das ist A11y, nicht SEO.

### 1.3 SEO-Crawlbarkeit

**Initial-HTML-Messung** (Production-Build `dist/index.html`):

- **Grösse**: 1575 Bytes
- **Inhalt**: `<head>`-Block (Meta, Fonts-Preconnect, Module-Preload) + `<body><div id="root"></div></body>`
- **Sichtbarer Text für Crawler ohne JS**: **0 Zeichen Inhalt.** Nur die Meta-Tags im `<head>`.

**Was Crawler mit JS-Rendering sehen**: Nach Hydration den vollen App-Shell, zunächst nur `HomeLandingTemplate` (nicht lazy); alle anderen Sections werden erst beim Tab-Wechsel per `React.lazy()` nachgeladen (siehe `App.jsx:14-20`). Crawler ohne Interaktion (z. B. Googlebot nach erstem Rendern) sehen also nur `start`.

| Metrik | Wert |
|---|---|
| Initial-HTML (kB) | 1,6 kB |
| Main-Bundle JS (gzip) | ~91 kB |
| Total gzip-Assets | ~130 kB (index + icons + vendor + chunks) |
| DOM-Text nach Hydration auf `#start` | ~6-8 kB (Hero + Stats + 3 Section-Karten-Gruppen) |
| DOM-Text nach Tab-Wechsel | zusätzlich pro Section ~4-14 kB |

**Crawler-Realität:**
- **Googlebot** rendert JS (nach einer Verzögerung), sieht also irgendwann `HomeLandingTemplate`, aber ohne Tab-Switch **nicht** Toolbox, Netzwerk, Evidenz, Glossar usw.
- **Bing/DuckDuckGo/Brave-Bot** rendern teils nicht oder verzögert → sehen nur 1,6 kB HTML.
- **Social-Media-Crawler** (Facebook, LinkedIn, Twitter/X) rendern **kein JavaScript** für OG-Scraping → sehen garantiert nur die Standard-Meta-Tags, unabhängig vom geteilten Hash.

**Keine sitemap.xml, keine robots.txt, keine canonical URLs, keine strukturierten Daten.**

### 1.4 Deep-Linking-Test -- Ist-Zustand

Aus `qa/deep-link-qa-result.json` (2026-04-12, Playwright-Test mit allen Haupt-Aliases):

| Link | Tab-Resolution | Section-Scroll | Title-Wechsel |
|---|---|---|---|
| `/#network` | `#netzwerk` ✓ | (kein Target) | — („Relational Recovery") |
| `/#network-map` | `#netzwerk` + Scroll zu `#netzwerk-karte` ✓ | ✓ scrollY 4203 | — |
| `/#network-directory` | `#netzwerk` + Scroll zu `#netzwerk-fachstellen` ✓ | ✓ scrollY 1200 | — |
| `/#netzwerk-karte` | direkt, ohne Alias | ✓ | — |
| `/#netzwerk-fachstellen` | direkt, ohne Alias | ✓ | — |
| Klick auf `a[href="#netzwerk-karte"]` | wechselt Hash + Scroll | ✓ | — |

**Zusammenfassung:**
- Routing, Section-Targeting und Alias-Auflösung funktionieren.
- **Title bleibt statisch** auf „Relational Recovery" (keine Per-Route-Title-Update).
- **Heading-Text im Test-Log** ist „Relational Recovery" -- das ist vermutlich der `h1` im `Header.jsx`-Brand-Block, nicht der Page-Heading pro Tab. Der Page-Heading existiert (z. B. `h2` mit `id="page-heading-netzwerk"`), wird aber im Playwright-`querySelector('h1')` nicht erfasst.

**Netlify-SPA-Fallback-Check:** `netlify.toml` hat **keinen** `[[redirects]]`-Block. Ein Request auf `/netzwerk` (history-API-Form, nicht Hash) würde **404** liefern. Aktuell nicht relevant, weil das Routing Hash-basiert ist.

### 1.5 Migrations-Komplexität

Inventur der Komponenten und Patterns, die bei einer Architektur-Migration bewegt werden müssten.

**Komponenten-Bestand:**

| Kategorie | Anzahl Dateien | Zeilen grob | Migrations-Komplexität |
|---|---|---|---|
| App-Root | 1 (`App.jsx`, 272 Zeilen) | 272 | **substanziell** (Routing-Switch + Toolbox-Refs-Prop-Drilling) |
| Shell-Komponenten | 2 (`Header.jsx`, `Footer.jsx`) | ~240 | moderat |
| ErrorBoundary | 1 | 67 | trivial |
| UI-Primitives (`src/components/ui/*`) | 11 (Button, Container, SurfaceCard, SectionHeader, …) | ~500 | trivial bis moderat |
| Closing-Komponente | 1 (`src/components/closing/ClosingSection.jsx`) | ~100 | trivial |
| Sektions-Komponenten | 7 (`src/sections/*`) | ~2000 | substanziell (Business-Logik + Hooks + Daten-Aufbereitung) |
| Templates | 9 (`src/templates/*`) | ~2500 | substanziell (JSX-intensiv, viele Props) |
| **Summe** | **33 Komponenten-Dateien** | **~6000 Zeilen** | -- |

**State-Management:**

- `AppStateContext` (277 Zeilen): persistenter Client-State mit BroadcastChannel-Sync zwischen Tabs, localStorage-Persistenz (`rr_app_state_v5`), 9 State-Fields. **Komplexität: fundamental** für Migration auf SSG -- BroadcastChannel und Multi-Tab-Sync sind kein SSG-Pattern, müssten als Vanilla-JS-Insel separat gelöst werden.

**Custom Hooks:**

- `useNavigationFocus` (230 Zeilen): koppelt Hash ↔ Tab ↔ Fokus. **Komplexität: substanziell** bei Option 4, weil File-based Routing den gesamten Hash-Sync obsolet macht -- aber das Fokus-Management auf Page-Heading muss erhalten bleiben.
- `useMobileMenu`, `useDownloadHandlers`: **moderat** -- Vanilla-JS-portabel.

**Dependencies (`package.json`):**

- Runtime: `react` 19, `react-dom` 19, `lucide-react` 0.542 (Icons)
- Build: `vite` 7, `@vitejs/plugin-react` 5, `@tailwindcss/vite` 4, `tailwindcss` 4
- Test: `@playwright/test` 1.52, `playwright-core` 1.59
- Quality: `eslint` 10, `prettier` 3

**Dependency-Einschätzung:**

| Abhängigkeit | Migration zu SSG (Option 4) |
|---|---|
| `react` + `react-dom` | Bei Astro als Framework-Island behaltbar; bei Eleventy müssten interaktive Teile zu Vanilla JS oder Alpine.js werden. |
| `lucide-react` | Bei Astro: bleibt. Bei Eleventy: `lucide` (plain ESM) oder Inline-SVG. |
| `vite` + `@tailwindcss/vite` | Bei Astro: bleibt (Astro baut auf Vite). Bei Eleventy: wechselt zu Tailwind-CLI oder PostCSS. |
| `tailwindcss` v4 | portabel; Token-System (`tokens.css`) und `primitives.css` (nach Audit 09: 3019 → ~3040 Zeilen) sind 1:1 übernehmbar. |

**Tailwind v4 mit Token-System aus Audit 09:** Die `tokens.css` (44 Tokens nach Audit 09) und `primitives.css` mit `.ui-*`-Namespace sind framework-unabhängig. Sowohl Astro als auch Eleventy können sie ohne Änderung übernehmen.

**Komponenten-Typ-Verteilung nach Migrations-Aufwand:**

| Aufwand | Anzahl | Beispiele |
|---|---|---|
| **trivial** | ~14 | UI-Primitives, ClosingSection, ErrorBoundary |
| **moderat** | ~6 | Header, Footer, useMobileMenu, useDownloadHandlers |
| **substanziell** | ~11 | 7 Sections + 4 interaktive Templates (Toolbox, Vignetten, Network, Learning) |
| **fundamental** | 2 | AppStateContext (BroadcastChannel, Persistenz), useNavigationFocus (Hash↔Tab-Sync) |

### 1.6 Vergleichsblick BipolarSite

Schwesterprojekt `BipolarSite-main-aktuell` (auf `/Users/christaegger/Desktop/Webprojekte_Code/Bipolar_Website/`).

**Architektur:**
- **Build-Tool**: Eleventy 2.0.1 (`@11ty/eleventy`)
- **Routing**: File-based via Verzeichnisstruktur (`modul/1/`, `modul/2/`, …, `modul/8/`, plus `notfall/`, `impressum/`, `handouts/`)
- **Content**: HTML/Markdown mit Nunjucks-Templates; Struktur im Filesystem 1:1 = URL-Struktur
- **SEO**: `src/sitemap.njk` und `src/robots.njk` werden zu `_site/sitemap.xml` und `_site/robots.txt` gebaut
- **Styling**: `css/`-Ordner mit klassischen CSS-Dateien (nicht Tailwind), eigene Design-Tokens
- **Interaktivität**: Vanilla JS, keine React-Komponenten
- **Deployment**: Netlify mit `netlify.toml`
- **404**: dedizierte `404.html`

**Übertragbare Lessons (Beobachtungen, keine Entscheidungen):**
1. File-based Routing gibt URL-Struktur kostenlos -- aber setzt voraus, dass jede „Seite" ein statisches Content-Bündel ist. Die interaktiven Relational-Recovery-Templates (Toolbox mit Score, Vignetten mit State, Network mit Filter) passen nicht 1:1 in dieses Modell.
2. Eleventy ohne React-Islands = Vanilla-JS-Refactor aller interaktiven Elemente. Für die 11 substanziellen Komponenten ein erheblicher Aufwand.
3. Astro wäre der nähere Partner, weil es React-Islands unterstützt und gleichzeitig die SSG-Vorteile (Per-Route-Meta, File-Routing, statische HTML-Pre-Generation) liefert.

**Symmetrie zu BipolarSite ist kein Selbstzweck.** Die beiden Sites haben unterschiedliche Interaktivitäts-Level (Bipolar ist primär Lese-Site, Relational Recovery hat interaktive Tools). Das allein spricht gegen einen 1:1-Eleventy-Transfer.

### 1.7 Gesamtbild

**Routing-Status:**

| Aspekt | Bewertung |
|---|---|
| Hash-Routing implementiert | ✓ |
| Deep-Linking funktioniert | ✓ (inkl. Section-Aliases) |
| Browser-Back-Button | ✓ |
| Tab-Refreshen erhält View | ✓ |
| Keyboard-Fokus-Management | ✓ (ausgereift, Audit-09-Konvention) |

**SEO-Status:**

| Aspekt | Bewertung |
|---|---|
| Initial-HTML enthält Inhalt | ✗ (leerer `<div id="root">`) |
| Per-Route-`<title>` | ✗ |
| Per-Route-`<meta description>` | ✗ |
| Per-Route-Open-Graph | ✗ |
| `<link rel="canonical">` | ✗ |
| `sitemap.xml` | ✗ |
| `robots.txt` | ✗ |
| JSON-LD strukturierte Daten | ✗ |
| Social-Media-Sharing mit Deep-Link | zeigt Standard-OG, nicht Route-spezifisch |

**Top-3-Bottlenecks für SEO und Deep-Linking:**

1. **Leeres Initial-HTML.** Social-Crawler ohne JS-Rendering sehen garantiert keine Inhalte. Googlebot mit JS sieht nur `HomeLandingTemplate`, weil alle anderen Sections lazy geladen und erst bei Tab-Wechsel gerendert werden.
2. **Keine Per-Route-Meta.** Jeder geteilte Link (`eltern-a.netlify.app/#toolbox`) zeigt denselben OG-Title und dieselbe Beschreibung. Praktisch unbrauchbar für gezieltes Sharing.
3. **Keine Discovery-Artefakte.** Ohne `sitemap.xml` und `robots.txt` gibt es keine offizielle Struktur-Signale an Crawler.

**Top-3-Risiken bei einer Migration:**

1. **`AppStateContext` mit BroadcastChannel und localStorage-Sync** ist kein trivial portierbares Pattern. Bei Option 4 (Astro/Eleventy) muss es als React-Island oder Vanilla-JS-Modul neu verdrahtet werden -- mit Regression-Risiko für Persistenz, Multi-Tab-Sync und Audit-02-Pattern.
2. **Toolbox, Vignetten und Network sind echte Apps innerhalb der Site** (Score, Vignetten-State, Filter + Freitext + Karten-Rendering). Bei Eleventy müssten sie zu Vanilla-JS oder Alpine.js umgeschrieben werden -- Feature-Verlust-Risiko.
3. **Notfall-Funktionalität** (`tel:`-Links, Emergency-Banner, ErrorBoundary) ist nach Audit-09-Block `fix: tel-links` R31-kritisch. Jede Migration muss diese erhalten; ein Architektur-Wechsel vergrössert die Oberfläche für Regressionen auf exakt diesem Pfad.

**Komponenten-Inventur-Zusammenfassung:**

- 33 Komponenten-Dateien, ~6000 Zeilen JSX
- 2 Komponenten mit **fundamentaler** Migrations-Komplexität (AppStateContext, useNavigationFocus)
- 11 Komponenten mit **substanzieller** Komplexität (7 Sections + 4 interaktive Templates)
- 20 Komponenten mit **moderater oder trivialer** Komplexität
- Token-System und `primitives.css` aus Audit 09 sind framework-unabhängig, 1:1 übernehmbar

**Die beiden objektiven Messpunkte für Phase 2:**

1. **SEO-Crawlbarkeit**: initial 0 kB Content → klare strategische Baustelle.
2. **Deep-Linking-Funktionsfähigkeit**: technisch gelöst; was fehlt, ist nur die Per-Route-Meta-Darstellung beim Teilen.

Das verschiebt das Audit-10-Problem: Das Hauptproblem ist **nicht** Routing (das funktioniert), sondern **SEO/Meta** und **Initial-HTML-Content**.

---

**STOPP nach Phase 1.** Warte auf Freigabe für Phase 2 (Diagnose und Strategie-Optionen).
