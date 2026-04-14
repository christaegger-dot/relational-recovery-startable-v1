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

---

## Phase 2 -- Diagnose und Strategie-Optionen

### 2.1 Gesamtbild

Phase 1 hat das Audit-Problem verschoben. Die ursprünglich gleichgewichteten Baustellen „Routing" und „SEO" sind in der Realität ungleich gewichtet:

- **Routing funktioniert.** Hash-Based-Routing mit 13 Aliases, Section-Deep-Links, Back-Button-Handling, Hash↔Tab-Synchronisation und Keyboard-Fokus-Management sind ausgereift implementiert. Der 2026-04-12 gespeicherte Playwright-Test bestätigt das auf allen Haupt-Aliases.
- **SEO ist kaputt.** Initial-HTML ist 1,6 kB leerer Shell. Per-Route-Meta fehlen vollständig. Es gibt keine `sitemap.xml`, keine `robots.txt`, keine `canonical`-URLs, keine strukturierten Daten, kein `og:image`. Beim Teilen von `eltern-a.netlify.app/#toolbox` sieht der Social-Media-Crawler denselben OG-Title wie bei `/#start`.
- **Crawler-Wirkung:** Googlebot (mit JS) sieht nach Initial-Rendern nur `HomeLandingTemplate`, weil alle anderen Sections `React.lazy()` sind und erst beim Tab-Wechsel geladen werden. Social-Crawler ohne JS sehen nichts ausser den statischen Meta-Tags aus `index.html`.

**Risiko, wenn nichts geändert wird:** Die Seite ist für Empfehlungs-Traffic tragfähig (wer den Link kennt, kommt rein). Für organische Suche und Social-Sharing ist sie praktisch unsichtbar. Die Inhalte sind nach Audit 02-07 redaktionell fertig, aber nur von Eingeweihten findbar. Das ist für ein Fachportal, das Fachpersonen und Angehörige erreichen möchte, eine substantielle Lücke.

**Konsequenz für die Optionen-Bewertung:** Jede Option, die die SEO-Baustelle nicht direkt adressiert, löst das Problem nicht. Jede Option, die nur die Routing-Seite anfasst, adressiert ein nicht-existierendes Problem.

### 2.2 Fünf Strategie-Optionen

#### Option 1 -- Minimal-Refactor: Per-Route-Meta in der bestehenden SPA

**Was wird gemacht:**
- Per-Route-Meta dynamisch via JS setzen (`document.title`, OG-Tags, `description`, `canonical`) in einem kleinen Hook, der auf `activeTab`-Änderungen reagiert.
- Pro Tab ein Meta-Objekt (`title`, `description`, `ogImage`-optional) in `appShellContent.js` ergänzen -- in der Nähe der `TAB_ITEMS`.
- Statische `public/sitemap.xml` und `public/robots.txt` hinzufügen (8 Tab-URLs mit Hash, plus die Hauptseite).
- Statisches JSON-LD für `Organization` und evtl. `MedicalWebPage` in `index.html`.

**Was bleibt unverändert:** Routing, Komponenten, Token-System, AppStateContext, useNavigationFocus, Build-System.

**Was passiert mit Notfall-Funktionalität:** nichts. `tel:`-Links, Emergency-Banner, ErrorBoundary bleiben identisch.

**Aufwand:** **S** (1-2 Arbeitstage)

**SEO-Gewinn:**
- **Mittel für JS-fähige Crawler** (Googlebot): Per-Route-Title und -Description werden wahrgenommen.
- **Gering für Non-JS-Crawler** (Facebook, LinkedIn): Der Initial-HTML-Shell bleibt leer; OG-Scraping liefert statisch immer denselben Default.
- **Hoch für Discovery-Infrastruktur**: sitemap + robots + JSON-LD = erstmals vorhanden.

**Risiko:** sehr niedrig. Keine Architektur-Änderungen, keine Regression-Oberfläche.

**Umkehrbarkeit/Erweiterbarkeit:** ✓ Perfekt. Option 1 ist der Einstieg zu allen anderen Optionen. Alle nachfolgenden Optionen können auf den Per-Route-Meta-Hook und die SEO-Artefakte aufbauen.

---

#### Option 2 -- Hash-zu-History-Migration

**Nicht weiter auszuarbeiten.**

Hash-Routing funktioniert technisch vollständig (siehe Phase 1, Section-Aliases, Back-Button, Tab-Refreshen). History-Routing würde die URL-Form von `/#netzwerk` zu `/netzwerk` ändern, aber das eigentliche Problem (leerer Shell für Crawler) nicht lösen -- Crawler bekommen weiterhin dasselbe 1,6 kB-Initial-HTML. Gleichzeitig zwingt History-Routing eine Netlify-SPA-Fallback-Konfiguration (`_redirects`) und bricht potentiell bestehende geteilte Hash-Links. **Aufwand ohne Nutzen-Gewinn.**

---

#### Option 3 -- Prerendering der bestehenden SPA

**Was wird gemacht:**
- Build-Plugin für Pre-Rendering in die Vite-Build-Pipeline einhängen. Drei realistische Kandidaten:
  - `vite-plugin-ssr` / neuerdings `vike` -- ausgereiftes SPA+SSR-Plugin
  - `vite-plugin-prerender` -- Puppeteer-basiert, rendert pro Route einmal
  - `@prerenderer/prerenderer` mit Vite-Adapter
- Pro Tab (8 Routen) wird zur Build-Zeit eine statische HTML-Datei erzeugt, die den gerenderten React-Output als Initial-HTML enthält -- inkl. Per-Route-Meta.
- Hydration zur Laufzeit für Interaktivität.
- Plus komplettes Option-1-Paket (Per-Route-Meta-Hook, sitemap, robots, JSON-LD).

**Was bleibt unverändert:** Komponenten-Code, Token-System, AppStateContext, useNavigationFocus. React-Architektur bleibt.

**Was ändert sich:** Build-System (Vite-Config erweitert), Netlify-Config (evtl. `_redirects` für neue statische Pfade, falls Prerendering URL-Pfade statt Hashes nutzt). Bei Hash-basiertem Prerendering bleibt die Netlify-Config gleich, aber Prerendering über Hash ist ungewöhnlich -- realistisch wechselt man gleichzeitig auf History-Routing, weil Prerendering-Tools Pfade erwarten.

**Was passiert mit Notfall-Funktionalität:** Erhalt möglich, aber: Pre-Rendering führt das komplette JS im Headless-Browser aus. Die `tel:`-Links sind statisch im Markup, daher unkritisch. Der Emergency-Banner wird mit-gerendert; State-abhängige Elemente (z. B. `showSafeNote: true` per Default) sind im Initial-HTML sichtbar -- das ist akzeptabel.

**Aufwand:** **M-L** (5-10 Arbeitstage)
- Build-Plugin-Integration: 1-2 Tage
- Pro-Route-Rendering-Setup: 1-2 Tage
- Hydration-Mismatch-Debugging (AppStateContext initialisiert sich aus localStorage, `useLayoutEffect` liest `window.location.hash`): 2-3 Tage
- Pro-Route-Meta-System + SEO-Artefakte: 1 Tag
- Testen auf allen 8 Tabs + Deep-Links: 1-2 Tage

**SEO-Gewinn:** **substanziell.** Crawler sehen pro Route vollständigen statischen Inhalt. OG-Scraping liefert pro Route die passenden Meta-Tags.

**Risiken:**
- Hydration-Mismatches zwischen Pre-Render und Client-State. Besonders kritisch: `AppStateContext` hydriert aus localStorage und hash, beides existiert beim Pre-Render nicht. Workaround: Pre-Render mit Default-State, Client hydriert darüber -- kann zu sichtbarem Content-Flash führen.
- Build-Zeit-Wachstum (jeder Pre-Render ist ein Headless-Browser-Run). Bei 8 Routen moderat (~30-90 s zusätzlich), bei mehr Routen problematisch.
- BroadcastChannel und localStorage-Zugriff in `AppStateContext` müssen SSR-sicher gemacht werden (`typeof window !== 'undefined'`-Guards -- die sind schon vorhanden, aber müssen vollständig sein).
- Kleine Regressions-Oberfläche bei der Render-Pipeline-Änderung.

**Umkehrbarkeit/Erweiterbarkeit:** ✓ Moderat. Prerendering kann bei Bedarf deaktiviert werden; Build-Config ist isoliert. Umstieg auf Astro (Option 4a) später bleibt möglich und ist sogar natürlicher, weil Astro dasselbe Konzept nativ löst.

---

#### Option 4a -- Migration auf Astro

**Was wird gemacht:**
- Astro als neues Build-Framework; Vite-Plugin bleibt indirekt (Astro baut auf Vite).
- Pro Tab eine `.astro`-Seite unter `src/pages/`: `index.astro` (= `/start`), `toolbox.astro`, `netzwerk.astro`, usw.
- Astro rendert alle Seiten statisch zur Build-Zeit.
- React-Komponenten werden als **Islands** (`client:load`, `client:idle`, `client:visible`) erhalten. Interaktive Teile (Toolbox mit Score, Vignetten mit State, Network mit Filter) bleiben React, werden pro Island hydriert.
- AppStateContext kann erhalten bleiben, muss aber für Cross-Page-State (State, der über mehrere Astro-Pages persistiert) angepasst werden -- entweder als einzelne Island am App-Root, oder via localStorage-Direktzugriff aus Vanilla-JS-Glue.
- useNavigationFocus wird **obsolet** -- File-based Routing ersetzt Hash↔Tab-Sync; Fokus-Management muss pro Page-Load via einfachem Script gelöst werden (deutlich einfacher als der bestehende 230-Zeilen-Hook).
- Tailwind v4 und Token-System bleiben 1:1.

**Was bleibt unverändert:**
- Token-System, `primitives.css`, `app-global.css`
- Alle UI-Primitives (Button, SurfaceCard, SectionHeader, …)
- Inhalt in `src/data/*.js` (als ESM-Module weiterhin importierbar in Astro)
- Content-Struktur und Redaktions-Entscheide aus Audit 02-09
- Notfall-Funktionalität (`tel:`-Links, Emergency-Banner, ErrorBoundary) wird 1:1 in das `<Layout>`-Template übernommen

**Was ändert sich fundamental:**
- Build-Pipeline (Vite-React → Astro)
- Routing-Mechanismus (Hash-Router → File-based)
- Navigation zwischen Seiten (SPA-Soft-Navigation → Multi-Page-Page-Loads, optional mit Astro View Transitions)
- Deployment: Astro baut mehr statische HTML-Dateien, Netlify serviert sie direkt

**Ehrliche Bewertung der fundamentalen Hot-Spots:**

- **AppStateContext** (Komplexität fundamental bei Migration):
  - BroadcastChannel-Cross-Tab-Sync: bleibt funktional, weil es browserseitig läuft -- muss aber in einer Vanilla-JS-Glue-Schicht oder als globale React-Island neu verdrahtet werden.
  - localStorage-Persistenz: unkritisch, Browser-API.
  - State-Sharing zwischen Pages: **hier wird es heikel.** Im SPA-Modell hält React-State den aktiven Tab zusammen. Im Astro-Multi-Page-Modell ist State zwischen Page-Loads standardmässig weg. Zwei Optionen: (a) Store als separates JS-Modul mit localStorage-Sync, das pro Page beim Mount initialisiert -- bedeutet: der Navigation State existiert zwischen Pages, aber UI-State pro Page startet frisch; (b) Als einzelne grosse Island, die das gesamte App-Shell umschliesst -- dann ist Astro effektiv nur ein Build-Tool-Wrapper, kein echtes Multi-Page-Framework.
  - **Realistische Einschätzung:** AppStateContext als einzelne React-Island im Layout, die über alle Pages persistiert. Reduziert den SEO-Gewinn der Astro-Migration deutlich, weil die Initial-Hydration ähnlich teuer wird wie bei einer SPA.
- **useNavigationFocus** (Komplexität fundamental bei Migration):
  - Hash↔Tab-Sync: **obsolet**, weil Astro file-based routet. ✓ Reduktion der Komplexität.
  - Section-Deep-Links (`#netzwerk-karte`, `#netzwerk-fachstellen`): bleiben als Standard-HTML-Anchors funktionsfähig.
  - Keyboard-Fokus auf Page-Heading nach Navigation: muss neu implementiert werden, aber deutlich einfacher (~30 Zeilen Vanilla-JS).
  - **Realistische Einschätzung:** Der Fokus-Mechanismus wird auf ~20-30 % der aktuellen Komplexität reduziert. ✓ Echter Gewinn.
- **11 substanzielle interaktive Komponenten:**
  - Toolbox (Score, Triage, Print-View): als grosse React-Island -- funktioniert, aber der gesamte Island-Code muss geladen werden, sobald die Toolbox-Page aufgerufen wird. Ähnliche Grösse wie heute.
  - Vignetten, Network, Learning: gleich, pro Page eine Island mit interaktivem React.
  - Glossar, Grundlagen, Evidenz: primär statisch, können als rein-statisches Astro-Template gerendert werden -- **hier ist der echte Gewinn**, weil diese Pages dann gar kein React-JS auf dem Client brauchen.

**Aufwand:** **L** (10-15 Arbeitstage, realistisch eher 15-20 bei sauberem Test-Durchlauf)
- Astro-Projekt-Setup mit Tailwind, Layouts: 1-2 Tage
- Layout-Komponenten (`<Layout>`, Header, Footer, ErrorBoundary): 1-2 Tage
- Pro statische Page-Migration (start, glossar, grundlagen, evidenz): 3-4 Tage
- Interaktive Islands (toolbox, vignetten, netzwerk, lernmodule): 4-6 Tage
- State-Management über Pages (AppStateContext als Layout-Island oder Vanilla-Store): 2-3 Tage
- Fokus-Management, Section-Deep-Links, Back-Button-Testing: 1-2 Tage
- SEO-Artefakte (Astro hat sitemap-Plugin, robots, JSON-LD via `<meta>`-Integration): 1 Tag
- E2E-Regression-Testing auf allen 8 Pages: 2-3 Tage

**SEO-Gewinn:** **maximal** für statische Pages (Glossar, Grundlagen, Evidenz, Start). **Substanziell** für interaktive Pages (Initial-HTML enthält Page-Shell vor Hydration).

**Risiken:**
- Langer Migrations-Sprint. Projekt ist 15-20 Tage in „halb-fertig"-Zustand; währenddessen keine Audits 11/12/13 sinnvoll.
- State-Brücken-Design zwischen Pages ist nicht-trivial. Wenn ein Nutzer auf Toolbox den Score setzt und dann zu Netzwerk wechselt, erwartet er den Score beim Zurückwechseln -- das muss explizit über localStorage-Sync gelöst werden.
- Astro-Ökosystem ist jünger als React-SPA-Patterns; mögliche Unebenheiten bei Tailwind v4 + Astro-Integration (Tailwind v4 ist ausserdem frisch, `@tailwindcss/vite` funktioniert in Astro, aber weniger erprobt).
- Regressions-Oberfläche: 33 Komponenten × 8 Pages × Interaktive Zustände = breite Fläche für Feature-Verluste während der Migration.
- Notfall-Funktionalität muss auf jeder einzelnen Page erneut verifiziert werden.

**Umkehrbarkeit/Erweiterbarkeit:** ✗ Gering. Nach Astro-Migration ist zurück zu Vite-React aufwendig. Astro 5+ bleibt aber ein evolutionsfähiger Pfad; Hinzufügen weiterer Features ist günstig.

---

#### Option 4b -- Migration auf Eleventy (analog BipolarSite)

**Was wird gemacht:**
- Eleventy 2+ als Build-Framework, analog zu BipolarSite.
- Pro Tab eine `.njk` oder `.md` mit Front-Matter-Meta.
- File-based Routing.
- **Keine React-Komponenten auf dem Client.** Interaktive Teile werden zu Vanilla JS oder Alpine.js umgeschrieben.
- Tailwind v4 über Tailwind-CLI oder PostCSS (nicht mehr Vite-gekoppelt).
- sitemap und robots via `sitemap.njk` und `robots.njk`, analog BipolarSite.

**Was bleibt unverändert:**
- Token-System, `primitives.css`, `app-global.css` (rein CSS, portabel)
- Inhalt in `src/data/*.js` -- muss in Nunjucks-Templates oder JS-Data-Files übersetzt werden

**Was ändert sich fundamental:**
- Framework-Wechsel (React → Eleventy)
- **Alle 11 substanziellen interaktiven Komponenten** müssen in Vanilla JS oder Alpine.js neu geschrieben werden
- Build-System, Deployment-Prozess, Mental-Model

**Ehrliche Bewertung der fundamentalen Hot-Spots:**

- **AppStateContext** (Komplexität fundamental bei Migration):
  - React-Context → Vanilla-JS-Store (z. B. custom Event-Emitter oder `nanostores`).
  - BroadcastChannel-Sync: bleibt, in Vanilla JS.
  - 9 State-Fields: jeder muss einzeln verdrahtet werden.
  - Persistenz und Rehydration: muss analog zu React-Version implementiert werden.
  - **Realistische Einschätzung:** ~300-400 Zeilen Vanilla-JS, deckt aber nicht dieselbe DX ab wie React-Context. Subscription-Management wird fragiler.
- **useNavigationFocus**: obsolet wegen File-Routing, aber der Fokus-Trick nach Page-Load muss in Vanilla JS neu geschrieben werden. Deutlich einfacher (~30 Zeilen).
- **11 substanzielle interaktive Komponenten:**
  - Toolbox (Score, Triage, Print-View, Assessment-Items mit dynamischer Berechnung, Reset-State): **vollständiger Vanilla-JS-Rewrite.** Assessment-Score-Berechnung, Triage-Branching, Practice-Filter, Print-View -- alles muss ohne Framework zusammengehalten werden. Realistisch: ~800-1200 Zeilen Vanilla JS, wo heute ~600 Zeilen JSX stehen.
  - Vignetten (Index, Selected-Option-Persistenz pro Vignette, Next/Prev): Vanilla-JS-Rewrite, ~300-400 Zeilen.
  - Network (Filter, Suche, Karten-Lens, dynamische Node-Darstellung): das ist die anspruchsvollste Komponente. Filter + Suche + Map-Lens + Reflexion-Listen -- realistisch ~500-700 Zeilen Vanilla JS, anfällig für Event-Handler-Drift.
  - Learning (Quiz-State pro Modul, Completed-Tracking): Vanilla-JS-Rewrite, ~300 Zeilen.
  - Glossar, Grundlagen, Evidenz: können rein-statisch werden, das ist der einzige Gewinn.

**Aufwand:** **XL** (20-35 Arbeitstage, realistisch 5-7 Kalenderwochen)
- Eleventy-Projekt-Setup mit Tailwind-CLI: 1-2 Tage
- Layout, Header, Footer, ErrorBoundary-Äquivalent: 2-3 Tage
- Vanilla-JS-Store + Persistenz + BroadcastChannel: 2-3 Tage
- Statische Pages (start, glossar, grundlagen, evidenz) als Nunjucks/Markdown: 3-4 Tage
- Toolbox Vanilla-JS-Rewrite: 4-6 Tage
- Vignetten Vanilla-JS-Rewrite: 2-3 Tage
- Network Vanilla-JS-Rewrite: 3-4 Tage
- Learning Vanilla-JS-Rewrite: 2-3 Tage
- Fokus-Management, Deep-Links, Back-Button: 1-2 Tage
- SEO-Artefakte: 1 Tag
- E2E-Regression auf allen 8 Pages + interaktiven Flows: 3-4 Tage

**SEO-Gewinn:** **maximal.** Jede Page ist vollständig statisch, kein JS-Rendering für Crawler nötig.

**Risiken:**
- **Höchster Migrations-Aufwand der ganzen Audit-Reihe.** Projekt wäre 5-7 Wochen in „halb-fertig"-Zustand.
- **Feature-Verlust-Risiko real.** Ohne React-Komponenten-Struktur ist die Chance hoch, dass während des Rewrites subtile Features verloren gehen (Edge-Cases im Score, A11y-Details, Reduce-Motion-Guards pro Interaktion).
- **DX-Regression.** Team verliert React-Ergonomie, muss alle Interaktionen manuell verdrahten. Jede zukünftige Feature-Änderung teurer.
- **Inkonsistenz mit JavaScript-Konsum-Erwartung des Fach-Teams.** Wenn zukünftige Änderungen typischerweise inhaltlich sind (Audit 11: Print, Audit 12: Content-Wartbarkeit), ist Vanilla JS oft unpraktischer als React.
- **Token-System-Übernahme trivial, aber alles andere nicht.**

**Umkehrbarkeit/Erweiterbarkeit:** ✗ Sehr gering. Der Vanilla-JS-Code ist an Eleventy gebunden; Rückweg zu React bedeutet weiteren Rewrite. Feature-Hinzufügen ist teurer als in Astro oder in der aktuellen SPA.

**Zur Symmetrie-Frage:** BipolarSite ist primär eine Lese-Site mit minimaler Interaktivität. Relational Recovery hat vier echte Mini-Apps (Toolbox, Vignetten, Network, Learning). **Die Schwester-Site-Symmetrie ist ein schwaches Argument**, weil die Interaktivitäts-Profile unterschiedlich sind.

---

#### Option 5 -- Hybrid: Per-Route-Meta + gezieltes Prerendering + SEO-Infrastruktur

**Was wird gemacht:**
- **Kern wie Option 1** (Per-Route-Meta-Hook, sitemap, robots, JSON-LD).
- **Plus gezieltes Prerendering** nur dort, wo es den grössten Nutzen bringt:
  - **Start-Route** (`HomeLandingTemplate`, nicht-lazy) wird zur Build-Zeit ins Initial-HTML geschrieben. OG-Scraping funktioniert für die meistgeteilte URL sofort.
  - Optional: die 3-4 statischen Sub-Templates (Glossar, Grundlagen, Evidenz ohne interaktive Teile) ebenfalls pre-rendern -- wenn das technisch günstig ist.
- **Plus volle SEO-Infrastruktur:**
  - `public/sitemap.xml` -- statisch, 8 Tab-URLs
  - `public/robots.txt` -- einfach, erlaubt Crawl
  - `<link rel="canonical">` per-Route dynamisch
  - JSON-LD `Organization` + `MedicalWebPage` im `index.html`
  - `og:image` -- einmaliges Hero-Bild oder pro-Route-Variante
  - Twitter-Card-Tags

**Was bleibt unverändert:** Routing, alle Komponenten, Token-System, AppStateContext, useNavigationFocus, Build-System-Kern. Hash-Routing bleibt.

**Was ändert sich:**
- `index.html` erhält JSON-LD-Block.
- `vite.config.js` bekommt ggf. ein schlankes Pre-Render-Plugin nur für Start-Route.
- Neuer Hook `useDocumentMeta` (ca. 30-50 Zeilen) in `src/utils/`.
- Neue Datei `src/data/routeMeta.js` mit `title`, `description`, `ogTitle`, `ogDescription` pro Tab.

**Was passiert mit Notfall-Funktionalität:** nichts. Emergency-Banner ist Teil der Start-Route und wird beim Prerender mit-gerendert -- zusätzliche Sichtbarkeit ohne Funktionsverlust.

**Aufwand:** **S-M** (3-5 Arbeitstage)
- Per-Route-Meta-Hook + Meta-Datei: 0,5 Tage
- sitemap/robots/canonical/JSON-LD: 0,5 Tage
- Pre-Render-Plugin-Integration für Start-Route: 1-2 Tage
- Optional: Pre-Render für statische Sub-Templates: 1-2 zusätzliche Tage
- Testen: 0,5-1 Tag

**SEO-Gewinn:**
- **Hoch für die Start-Route** (OG-Scraping funktioniert, weil Initial-HTML echten Inhalt enthält).
- **Mittel für alle anderen Routen** (JS-fähige Crawler sehen Per-Route-Meta und Page-Inhalt nach Hydration; Non-JS-Crawler sehen Standard-OG).
- **Hoch für Discovery** (sitemap, robots, JSON-LD).
- **Praktisch gelöst**: Das Kernproblem „Seite ist unsichtbar für Social-Media-Sharing" wird an der Stelle gelöst, wo es praktisch weh tut (geteilte Start-URL).

**Risiken:**
- Niedrig-mittel. Pre-Render-Plugin-Integration kann AppStateContext-Initialisierung stören (localStorage/hash-Zugriff in Headless-Browser). Workaround: `typeof window`-Guards konsequent ausbauen, Pre-Render mit Default-State.
- Wenn die Sub-Template-Pre-Renderings auch verfolgt werden: React.lazy-Bundles müssen zur Build-Zeit auflösbar sein, und `activeTab`-State muss vor Render pro Route gesetzt werden können. Machbar, aber das ist der Kostentreiber in der Option.

**Umkehrbarkeit/Erweiterbarkeit:** ✓ **Beste** aller Optionen. Alles an Option 5 ist additiv. Wenn später Option 3 (volles Prerendering) oder Option 4a (Astro-Migration) gewählt wird, ist die Per-Route-Meta-Struktur und die SEO-Infrastruktur 1:1 übertragbar. Option 5 ist ein valider End-Zustand **oder** eine gute Zwischenstation.

**Migrationspfad nach Option 5:**
- → Option 3: das bestehende Pre-Render-Plugin auf alle 8 Routes erweitern. Inkrementell.
- → Option 4a (Astro): Per-Route-Meta-Datei (`routeMeta.js`) wird zu Frontmatter in `.astro`-Pages. JSON-LD und sitemap werden Astro-Plugins. Hook wird obsolet.

---

### 2.3 Empfehlung

**Empfohlen: Option 5 (Hybrid).** In dieser Reihenfolge begründet:

**(a) Welche Option löst das eigentliche Problem am direktesten?**

Das eigentliche Problem ist dreifach:
1. Social-Media-Scraping zeigt Standard-OG für alle Links.
2. Suchmaschinen ohne JS-Rendering sehen leeren Shell.
3. Keine Discovery-Infrastruktur (sitemap, robots, canonical, JSON-LD).

- **Option 1** löst (1) teilweise (nur für JS-Scraper), (3) vollständig. Lässt (2) ungelöst.
- **Option 5** löst (1) vollständig (Pre-Render der Start-Route füllt das Initial-HTML), (2) für die meistbetroffene Route, (3) vollständig.
- **Option 3** löst alle drei vollständig.
- **Option 4a** löst alle drei vollständig, aber mit Architektur-Kosten.
- **Option 4b** löst alle drei vollständig, mit höchsten Architektur-Kosten.

Option 5 ist die erste Stufe, die alle drei Probleme adressiert. Option 3 macht dasselbe für alle Routes, aber die meisten Routes werden nicht direkt geteilt -- Start und evtl. Toolbox/Netzwerk sind die realistischen Share-Kandidaten. Der Grenz-Nutzen von Option 3 über Option 5 ist gering, solange man die Schlüssel-Routes in Option 5 priorisiert.

**(b) Welche Option hat das beste Aufwands-Nutzen-Verhältnis für ein release-fähiges Projekt?**

| Option | Aufwand | SEO-Gewinn | Verhältnis |
|---|---|---|---|
| 1 | S (1-2 d) | mittel | gut |
| 3 | M-L (5-10 d) | substanziell | mittelmässig |
| 4a | L (15-20 d) | maximal | mässig |
| 4b | XL (20-35 d) | maximal | schlecht |
| **5** | **S-M (3-5 d)** | **hoch** | **sehr gut** |

Option 5 ist die Option mit dem höchsten Nutzen pro Arbeitstag. Das Projekt ist nach Audits 02-09 inhaltlich release-fähig; es braucht keine Architektur-Neuaufstellung „nur um der Modernität willen".

**(c) Welche Option ist umkehrbar/erweiterbar?**

- Option 5 ist zu 100 % additiv. Alle nachfolgenden Wege (Option 3 oder 4a) können auf Option 5 aufbauen.
- Option 1 ist fast zu 100 % additiv, liefert aber weniger.
- Option 3 ist grossteils umkehrbar, weil das Prerender-Plugin deaktivierbar ist.
- Option 4a/4b sind kaum umkehrbar; sie sind architektonische Einbahnstrassen.

**Zusammengefasst:** Option 5 ist der **geringste Eingriff, der das tatsächliche Problem tatsächlich löst**, und er hält alle weiteren Architektur-Wege offen. Option 1 ist eine valide Fallback-Stufe, wenn Pre-Render-Integration unerwartet Probleme macht. Option 3 ist der nächste logische Schritt, wenn Option 5 ausgeschöpft und Bedarf für mehr da ist. Option 4a ist nur dann sinnvoll, wenn das Projekt langfristig stärker wachsen soll (mehr Routes, mehr Interaktivität, SSR-Features) -- eine Entscheidung, die nicht im Rahmen von Audit 10 fallen sollte. Option 4b ist für dieses Projekt die falsche Form (Interaktivitäts-Profil passt nicht zu rein-statischem Eleventy).

### 2.4 Implikationen für Audits 11, 12, 13

**Option 1:**
- **Audit 11 (Print):** unverändert. Print-Views sind React-Komponenten, bleiben in SPA.
- **Audit 12 (Content-Wartbarkeit):** unverändert. Content bleibt in `src/data/*.js`. Per-Route-Meta-Datei (`routeMeta.js`) wird als neue Content-Quelle im Audit betrachtet.
- **Audit 13 (Wave-3-Verifikation):** unverändert. Dieselbe Architektur, dieselben E2E-Tests.

**Option 3:**
- **Audit 11:** minimal verändert. Print funktioniert weiterhin via `window.print()`; Pre-Rendering ändert daran nichts.
- **Audit 12:** leicht verändert. Content-Dateien bleiben, aber Prerender-Zeit-Validierung der Inhalte wird relevant (keine Laufzeit-Abhängigkeit von Browser-APIs).
- **Audit 13:** verändert. E2E-Tests müssen zusätzlich den Prerender-Output verifizieren (curl-ohne-JS).

**Option 4a (Astro):**
- **Audit 11:** **erheblich verändert.** Print-Views müssen pro Astro-Page implementiert werden; globale Print-Styles in CSS bleiben, aber Layout-Struktur ändert sich.
- **Audit 12:** **substanziell verändert.** Content wandert von `src/data/*.js` zu Markdown-Files oder Frontmatter-Patterns -- oder bleibt als JS-Modul-Import in Astro-Pages.
- **Audit 13:** **vollständig neu.** Neues Test-Setup für Astro, andere Playwright-Strategien (mehrere separate HTML-Dateien statt SPA).

**Option 4b (Eleventy):**
- **Audit 11:** **erheblich verändert.** Print-Ansichten als Vanilla-HTML/Nunjucks-Templates.
- **Audit 12:** **fundamental verändert.** Content wandert zu Markdown oder Nunjucks-Data-Dateien; keine React-Komponenten mehr, die Inhalt strukturieren.
- **Audit 13:** **vollständig neu.** Keine React-Architektur, andere Test-Strategien, weit weniger SPA-typische Probleme.

**Option 5:**
- **Audit 11:** unverändert. Print bleibt React-basiert; Pre-Render für Start-Route berührt Print nicht.
- **Audit 12:** leicht verändert. Neue Content-Quelle `routeMeta.js` wird in Audit 12 mitgeprüft.
- **Audit 13:** leicht verändert. E2E-Tests plus curl-Test für Start-Route-Initial-HTML.

### 2.5 Risiko- und Aufwands-Zusammenfassung

| Option | Aufwand | Risiko | SEO-Gewinn | Umkehrbar | Empfehlung |
|---|---|---|---|---|---|
| 1 | S (1-2 d) | sehr niedrig | mittel | vollständig | Fallback, wenn 5 blockiert |
| 2 | -- | -- | -- | -- | verworfen |
| 3 | M-L (5-10 d) | niedrig-mittel | substanziell | moderat | Erweiterungs-Pfad nach 5 |
| 4a | L (15-20 d) | mittel | maximal | gering | wenn Projekt langfristig wächst |
| 4b | XL (20-35 d) | hoch | maximal | sehr gering | nicht empfohlen |
| **5** | **S-M (3-5 d)** | **niedrig** | **hoch** | **vollständig** | **empfohlen** |

### 2.6 Was NICHT in Audit 10 behandelt wird

Ausdrücklich:

- **Inhaltliche Änderungen** an Texten, Tonalität, Orthographie. Das wurde in Audits 02, 06, 07 abgeschlossen.
- **Visuelle Reduktion.** Audit 08 hat das erledigt.
- **Farb-, Token-, Spacing-Compliance.** Audit 09 hat das erledigt.
- **Komponenten-Refactoring innerhalb der bestehenden React-Architektur**, solange es nicht routing- oder SEO-relevant ist.
- **A11y-Audits**, die nicht direkt mit Routing oder Meta-Tags zu tun haben. Fokus-Management nach Navigation ist drin, weil es routing-relevant ist.
- **Performance-Audits** (Bundle-Splitting, Code-Reduktion, Asset-Optimierung). Werden nur dann berührt, wenn eine Option sie zwangsläufig verändert (z. B. Pre-Rendering).
- **Print-Views.** Kommt in Audit 11.
- **Content-Management-Struktur.** Kommt in Audit 12.

### 2.7 Was die Auftraggeberin entscheiden muss, um Phase 3 zu starten

**Wenn Option 5 gewählt wird (empfohlen):**

1. **Pre-Render-Scope-Entscheidung:** Nur Start-Route pre-rendern, oder auch die drei statischen Sub-Templates (Glossar, Grundlagen, Evidenz)? Die Entscheidung beeinflusst Aufwand (S vs. M) und Grenz-Nutzen.
2. **Pre-Render-Tool-Wahl:** Drei realistische Kandidaten, mit Trade-offs:
   - `vite-plugin-ssr` bzw. `vike`: ausgereift, grosse Community, etwas schwergewichtig für reine Pre-Render-Zwecke.
   - `vite-plugin-prerender` (falls noch gepflegt): schlank, Puppeteer-basiert, pro Route ein Headless-Browser-Run.
   - **`@prerenderer/prerenderer`** (empfohlen): schlank, rein Pre-Render-fokussiert, ohne SSR-Overhead. Integration via Plugin, ~50 Zeilen Config.

   Empfehlung: `@prerenderer/prerenderer` (vormals `prerender-spa-plugin`). Wenn die Auftraggeberin `vike` bevorzugt, weil es wachstumsfreundlicher ist, ist das auch ok -- erhöht den Aufwand um ~1-2 Tage.
3. **OG-Image-Entscheidung:** Einheitliches Hero-Bild für alle OG-Tags, oder pro-Route-Variante (4-8 Bilder produzieren)? Fallback ohne Bild ist akzeptabel, aber ein Standard-Hero verbessert Social-Sharing deutlich.
4. **JSON-LD-Typen:** Nur `Organization` (minimal), oder zusätzlich `MedicalWebPage` (fachportal-spezifisch)? `MedicalWebPage` ist Schema.org und valide für Fach-Portale; signalisiert Suchmaschinen die Ernsthaftigkeit.
5. **`robots.txt`-Strenge:** Alles erlauben (`Disallow:` leer), oder bestimmte Routes ausschliessen (z. B. keine)? Empfehlung: alles erlauben, plus `Sitemap:`-Verweis.

**Wenn Option 1 gewählt wird:**
- Kein Pre-Render. Sonst dieselben Fragen wie 3, 4, 5 oben.

**Wenn Option 3 gewählt wird:**
- Pre-Render-Tool-Wahl (wie oben), aber für alle 8 Routes.
- Umgang mit AppStateContext-Hydration-Mismatch: Default-State-Policy (immer starten mit `showSafeNote: true` und `activeTab: 'start'`, localStorage-Sync nach Hydration), oder nur Client-seitig hydrieren?
- Build-Zeit-Budget: ist eine Build-Verlängerung von 30-90 s akzeptabel?

**Wenn Option 4a gewählt wird:**
- Braucht es vorher einen **Feasibility-Prototyp** mit einer einzelnen migrierten Komponente (vorschlagsweise Toolbox, weil anspruchsvollste Island)? Das ist bei einem 15-20-Tage-Sprint kein verschwendeter Zeit-Einsatz.
- Tailwind-v4-Astro-Integration-Risiko: wie frisch ist das Zusammenspiel? (Tailwind v4 ist frisch, Astro unterstützt es, aber Produktions-Erfahrungen sind spärlich.)
- AppStateContext-Strategie: Layout-Island (eine Insel über alle Pages) oder Vanilla-JS-Store mit localStorage-Sync?
- Soll das Projekt in parallel zur Migration weiter Audits 11/12/13 erhalten, oder werden diese erst nach Migration gestartet?

**Wenn Option 4b gewählt wird:**
- **Feasibility-Prototyp obligatorisch.** Eine komplexe Komponente (z. B. Toolbox mit Score und Triage) in Vanilla JS + Alpine.js als Machbarkeits-Nachweis. Erst danach die Gesamt-Entscheidung.
- Klare Akzeptanz, dass Audits 11/12/13 nach der Migration neu konzipiert werden müssen.
- Explizite Entscheidung, dass das Projekt die DX-Regression akzeptiert.
- Ehrliche Einschätzung, wer die Migration ausführt und testet (5-7 Kalenderwochen sind eine substanzielle Zeit-Bindung).

---

**STOPP nach Phase 2.** Warte auf Strategie-Entscheidung der Auftraggeberin.
