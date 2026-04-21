# Audit 16 — Performance + Bundle-Hygiene

**Stand:** 2026-04-21
**Bericht:** Phase 1 (Inventur)
**Prompt:** `qa/prompts/audit-performance.md`
**Auslöser:** Verifikation gegen den Audit-Prompt-Katalog, nachdem Audit 15 (a11y + Interaktion) release-ready abgeschlossen ist (PR #126, PR #129).
**Stack:** Vite 7.3.2 + React 19.2 + Tailwind 4.1.0, rein clientseitig, kein Backend. Start-Route wird per `scripts/inject-prerender.mjs` statisch in `dist/index.html` injiziert.

## TL;DR

- **Total dist:** 696 KB (JS ≈ 500 KB raw / 160 KB gzip, CSS 119 KB raw / 19.45 KB gzip, Assets 15.5 KB).
- **Kein Entry-Chunk > 200 KB gzip** (Index 298.80 KB raw / 95.60 KB gzip, knapp unter Budget).
- **0 CVEs** (`npm audit --omit=dev` = clean).
- **Lazy-Loading-Konzept sauber umgesetzt:** 7/7 Sections sind `React.lazy`, nur `HomeLandingTemplate` eager — genau wie CLAUDE.md definiert.
- **Bilder:** 2 WebP-Dateien, je 7.78 KB bei 1200×800 — bereits stark optimiert. Hero hat `width`/`height` → kein CLS.
- **Prerender-Setup** minimiert FCP: `start`-Route hat HTML-Body statisch in `dist/index.html` (23.5 KB Snapshot).
- **3 konkrete Hot-Spots** für niedrig-Aufwand/hoher-Gewinn (siehe unten).

**Release-Readiness-Vorschlag für Phase 2:** Stufe A (release-ready). Keine Blocker, drei P1-Optimierungen mit zusammen geschätzt 100-300 ms LCP-Gewinn und besserer Cache-Hygiene.

---

## 1.1 Build-Output

`npm run build` (Vite 7.3.2, `target: 'es2020'`, keine Sourcemaps):

| Datei | raw | gzip | Rolle |
|---|---:|---:|---|
| `index-ChpUHoqa.js` | 298.80 KB | **95.60 KB** | Entry: App, main, AppStateContext, HomeLandingTemplate, EditorialPageTemplate, Header, Footer, ErrorBoundary, Utilities, **und React/ReactDOM-Interna** (!) |
| `MaterialSection-*.js` | 66.10 KB | 19.66 KB | Material-Tab + Handouts |
| `ToolboxSection-*.js` | 33.33 KB | 8.90 KB | Toolbox (Assessment, Crisis-Plan, Rights) |
| `EvidenceSection-*.js` | 22.56 KB | 8.09 KB | Evidenz + Closing |
| `GlossarSection-*.js` | 17.74 KB | 6.83 KB | Glossar |
| `NetworkSection-*.js` | 16.26 KB | 5.00 KB | Netzwerk |
| `icons-Cp75dKh1.js` | 14.61 KB | 5.77 KB | lucide-react (+ React-Shared?) |
| `closingModel-*.js` | 11.00 KB | 3.17 KB | Shared Closing-Model |
| `VignettenSection-*.js` | 7.39 KB | 2.77 KB | Vignetten |
| `ElearningSection-*.js` | 6.98 KB | 2.66 KB | Lernmodule |
| `vendor-DcQNHtSh.js` | **3.65 KB** | **1.38 KB** | Sollte React+ReactDOM halten — tut es nicht (siehe Hot-Spot P1-1) |
| `EditorialIntro-*.js` | 1.12 KB | 0.50 KB | |
| `LegalDisclaimer-*.js` | 1.05 KB | 0.60 KB | |
| `index-CCi6KhCq.css` | 119.40 KB | 19.45 KB | Tailwind 4 + primitives.css |
| `relational-recovery-hero-v3-web-*.webp` | 7.78 KB | — | Hero-Bild |

**Build-Hygiene-Warnings:** 6× `%VITE_BASE_URL% is not defined in env variables found in /index.html. Is the variable mistyped?` — der Post-Build-Schritt `scripts/replace-env.mjs` ersetzt den Platzhalter korrekt, aber Vite warnt vorher. Nur Build-Noise, kein Runtime-Problem.

## 1.2 Core-Web-Vitals

**Werkzeug-Lage:** Lighthouse/PageSpeed-CLI ist in der Sandbox nicht verfügbar (wie bei Audit 15 dokumentiert — kein Online-Chrome-Download). **Heuristische Einschätzung** basierend auf Build-Output + statischer Prüfung:

- **FCP:** Sehr gut — Start-Route hat statisch-injizierten HTML-Body (23.5 KB, `scripts/inject-prerender.mjs`). First Paint erfordert keinen JS-Parse.
- **LCP:** Gut — Hero-Bild ist 7.78 KB WebP bei 1200×800. **Nicht markiert als LCP-Kandidat** (kein `fetchpriority="high"`, siehe Hot-Spot P1-3). Schätzung: 1.5-2.5 s auf 3G-Mobile.
- **CLS:** Sehr gut — Hero-`<img>` hat explizit `width={1200}` und `height={800}`, Persistenz-Banner ist im Prerender bereits drin (default-state matcht initial UI). Keine dynamisch eingefügten Layout-Verschieber.
- **INP:** Gut — `AppStateContext.value` ist `useMemo`-wrapped, Navigationen triggern nur den Section-Switch (via Suspense). Toolbox hat die meisten Interaktionen (20 `.filter/.map`-Stellen) und ist lazy-geladen, daher ist der Rest der Seite nicht betroffen.

**Block:** Exakte CWV-Zahlen müssen manuell nachgereicht werden (z. B. via Netlify-Deploy + Chrome DevTools Performance-Tab auf `eltern-angehoerige-fa.netlify.app`).

## 1.3 Dependency-Audit

`package.json` (dependencies, nicht dev):

| Dependency | Version | Import-Referenzen | Status |
|---|---|---:|---|
| `react` | ^19.2.0 | 32 Treffer in 26 Dateien | ✅ Aktiv |
| `react-dom` | ^19.2.0 | 1 (`main.jsx`) | ✅ Aktiv |
| `lucide-react` | ^0.542.0 | in 26 Dateien via `from 'lucide-react'` | ✅ Aktiv |

- **Verwaiste Deps:** keine.
- **Doppelte Funktionalität:** keine. lucide-react ist die einzige Icon-Lib (bewusst schlank, CLAUDE.md bestätigt).
- **`npm audit --omit=dev`:** `found 0 vulnerabilities`.

## 1.4 Bild-Audit

| Pfad | Format | Pixel | Datei | `loading` | `fetchpriority` |
|---|---|---|---:|---|---|
| `src/assets/relational-recovery-hero-v3-web.webp` | WebP VP8 | 1200×800 | 7.78 KB | — (default eager) | **fehlt** |
| `public/og-image.webp` | WebP VP8 | 1200×800 | 7.78 KB | n/a (Social-Preview) | n/a |

**Bemerkungen:**

- Hero-Bild ist bereits sehr gut optimiert (7.78 KB für 1200×800 — das ist aggressiv komprimiert).
- Hero-`<img>` in `PageHero.jsx:140` hat `width={1200}` + `height={800}` → Aspect-Ratio vorhanden, kein CLS.
- Hero-Bild ist der **LCP-Kandidat** auf der Start-Route, aber **nicht** mit `fetchpriority="high"` markiert (→ Hot-Spot P1-3).
- Below-the-fold: keine zusätzlichen Bilder im src-Tree (`<img>` kommt nur genau hier vor). Lucide-Icons sind Inline-SVG, keine `<img>`-Tags.
- `og-image.webp` ist byte-identisch mit dem Hero (beide 7778 B). Als `og:image` im Social-Share-Kontext in Ordnung; keine Handlung nötig.

## 1.5 Lazy-Loading und Code-Splitting

`src/App.jsx`:

```
ElearningSection = lazy(() => import('./sections/ElearningSection'));
VignettenSection = lazy(() => import('./sections/VignettenSection'));
GlossarSection   = lazy(() => import('./sections/GlossarSection'));
MaterialSection  = lazy(() => import('./sections/MaterialSection'));
ToolboxSection   = lazy(() => import('./sections/ToolboxSection'));
NetworkSection   = lazy(() => import('./sections/NetworkSection'));
EvidenceSection  = lazy(() => import('./sections/EvidenceSection'));
// HomeLandingTemplate: eager (bewusst — Start-Route).
```

- **Coverage:** 7 von 8 Routen lazy, 1 eager → **100% konform mit CLAUDE.md-Regel**.
- **Suspense-Fallback:** `SectionLoadingFallback` in `App.jsx:27-43` rendert eine Skeleton-Card (`rounded-[3rem] … shadow-sm md:px-12 md:py-16`) mit `aria-busy="true"` + SR-Text. Keine Layout-Verschiebung beim Einblenden der gerenderten Section erkennbar (gleicher Container-Wrapper).
- **Keine eager-Section unter Verdacht**, lazy zu werden: HomeLanding ist die einzige eager-Section und für LCP essentiell.

## 1.6 Layout-Shift-Quellen

- **Bilder:** nur das Hero-Bild, mit `width`/`height` (s.o.) → kein CLS.
- **Schriften:** `tokens.css` deklariert `--font-body: 'Manrope', ui-sans-serif, ...` und `--font-heading: 'Source Serif 4', Georgia, ...`, **aber** es gibt nirgends ein `@font-face`, kein `@import url(...)` und keinen `<link href="https://fonts.googleapis.com/css?family=...">`. Das heisst: **Manrope und Source Serif 4 werden nie geladen**, und die App läuft durchgängig auf System-Fallbacks (`ui-sans-serif`/`Georgia`). Siehe Hot-Spot P1-2.
- **Dynamische Banner:**
  - Persistenz-Banner (`showSafeNote`): Default `true` für neue Nutzende (`utils/appHelpers.js:121`), und der Prerender-Snapshot enthält ihn bereits → kein CLS beim Hydrieren.
  - Für Rückkehrer mit `showSafeNote: false` entfernt JS den Banner nach Hydration → **einmalige CLS-Situation bei ~2-5% der Nutzenden**. Niedrige Priorität, da Banner `position: static` ist und der Sprung ~50 px beträgt.
  - Akute-Krise-Banner: sitzt immer im HTML, statisch, kein CLS.

## 1.7 Runtime-Hotspots (statisch)

- **useMemo/useCallback-Coverage:** 43 Treffer über 11 Dateien. `AppStateContext.value` ist vollständig memoized (9 Hooks), `useDownloadHandlers` hat 8 Hooks. Keine sichtbaren Render-Leaks.
- **`.filter/.map` im Render:** 42 Treffer über 6 Section-Dateien. Schwerpunkt `ToolboxSection` (20) und `EvidenceSection` (15). Diese Sections sind lazy-geladen; bei den vorhandenen Collection-Grössen (< 50 Einträge) kein messbarer Perf-Impact.
- **React 19-spezifisch:** kein `use()` eingesetzt (keine externen Resources), kein Context-Overuse. `AppStateContext` ist der einzige Context.
- **`prefers-reduced-motion`:** gesetzt (Audit 15 bestätigt, `index.css:73-83` + `primitives.css`).

## 1.8 Gesamtbild

| Metrik | Wert | Budget-Hypothese | Status |
|---|---|---|:---:|
| Entry-Chunk JS gzip | 95.60 KB | < 200 KB | ✅ |
| Grösste Route-Chunk gzip | 19.66 KB (Material) | < 100 KB | ✅ |
| CSS gzip | 19.45 KB | < 50 KB | ✅ |
| Total dist | 696 KB | < 1.5 MB | ✅ |
| Lazy-Coverage | 7/8 Routen (87.5%) | = 87.5% (1 eager ok) | ✅ |
| CVEs Prod-Deps | 0 | = 0 | ✅ |
| Bilder ohne `width`/`height` | 0 | = 0 | ✅ |
| Verwaiste Deps | 0 | = 0 | ✅ |

**Status: grün auf allen objektiv messbaren Achsen.** Die Optimierungen weiter unten sind Feintuning für Cache-Hygiene + LCP, keine Release-Blocker.

## Top-Hot-Spots für Gewinn pro Aufwand

### P1-1 — Vendor-Chunk greift nicht (manualChunks-Misskonfiguration)

**Befund:** `vite.config.js:19-24` deklariert `manualChunks: { vendor: ['react', 'react-dom'], icons: ['lucide-react'] }`. Im Build landet `vendor-DcQNHtSh.js` aber nur bei **3.65 KB raw / 1.38 KB gzip** und importiert seinerseits `from "./icons-Cp75dKh1.js"` — d. h. React/ReactDOM werden trotz Konfiguration **nicht in vendor extrahiert**, sondern in den Entry-Chunk (298.80 KB) bzw. teilweise in den 14.61-KB-icons-Chunk verteilt.

**Warum das wehtut:** Jede App-Änderung invalidiert den Entry-Chunk mitsamt der React-Runtime im Browser-Cache. React 19 wird pro Release neu geladen, obwohl es zwischen Releases quasi nie ändert.

**Fix (Phase 3):** Function-Form der `manualChunks` verwenden:

```js
manualChunks: (id) => {
  if (id.includes('node_modules/react') ||
      id.includes('node_modules/react-dom') ||
      id.includes('node_modules/scheduler')) return 'vendor';
  if (id.includes('node_modules/lucide-react')) return 'icons';
}
```

**Erwartung:** vendor wächst auf ~40-50 KB gzip (React+ReactDOM komplett), Entry-Chunk sinkt entsprechend. Erst-Load gleich, Wiederbesuch **~40-50 KB schneller** (304-Not-Modified auf vendor).

**Aufwand:** S (3 Zeilen vite.config.js). **Risiko:** niedrig, Build-Verifikation ausreichend.

### P1-2 — Tote Preconnect-Hints auf Google Fonts

**Befund:** `index.html:32-33`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

…aber weder `@font-face`, `@import url(...)`, noch `<link href="https://fonts.googleapis.com/css...">` existieren irgendwo. Die deklarierten Fonts (`Manrope`, `Source Serif 4`) werden **nie geladen** — die App rendert auf System-Fallbacks (`ui-sans-serif`, `Georgia`). Die beiden `preconnect`-Hints triggern aber auf jedem Kalt-Load einen unnötigen DNS-Lookup + TLS-Handshake für eine Origin, die nie angesprochen wird.

**Warum das wehtut:** Jeder Kalt-Load verschwendet 50-200 ms auf zwei leere Handshake-Ketten zu fonts.googleapis.com und fonts.gstatic.com.

**Fix (Phase 3):** Die beiden `<link rel="preconnect">`-Zeilen entfernen. Die Fonts bleiben weiterhin im Token deklariert als Future-Hook (sind die erste Entscheidung in der Font-Fallback-Chain und treten in Kraft, sobald jemand sie tatsächlich lädt — z. B. via `@import url('https://fonts.bunny.net/...')` oder Self-Hosting).

**Aufwand:** S (2 Zeilen Löschung + kurzer CLAUDE.md-Hinweis). **Risiko:** null (System-Fonts sind ohnehin aktiv, User merken nichts).

**Alternative (für späteren Audit/Editorial):** Fonts tatsächlich laden, wenn die redaktionelle Intention wirklich Manrope+Source Serif ist. Dann wäre der Preconnect korrekt, aber es braucht auch `font-display: swap` + Self-Hosting, um den Third-Party-Round-Trip abzustellen. **Nicht Teil dieses Audits.** (`docs/frontend-richtlinien.md` und `qa/audit-09-frontend-compliance.md` haben die Font-Frage bereits für eine eigene Design-Entscheidung markiert.)

### P1-3 — Hero-Bild ohne `fetchpriority="high"`

**Befund:** `src/components/ui/PageHero.jsx:140` rendert das Hero-Bild als `<img src={image} alt={imageAlt || ''} width={1200} height={800} />`. Das Hero ist auf der Start-Route der LCP-Kandidat (grösstes above-the-fold-Element), wird aber **nicht** priorisiert.

**Warum das wehtut:** Der Browser entdeckt das Bild erst beim HTML-Parsing. Mit `fetchpriority="high"` (unterstützt seit Chrome 101, Safari 17.4, Firefox 132) wird das Hero in die hohe Priority-Queue gestellt → LCP typischerweise **100-300 ms** schneller.

**Fix (Phase 3):** Im Hero-`<img>` zwei Attribute ergänzen:

```jsx
<img
  src={image}
  alt={imageAlt || ''}
  width={1200}
  height={800}
  fetchpriority="high"
  decoding="async"
/>
```

`fetchpriority` wird nur auf dem Hero gesetzt (PageHero ist eine shared Komponente, aber sie rendert pro Seite genau einmal; auf Non-Start-Routen ist das Hero unterschiedlich, und die Priorität gewinnen ist dort unkritisch, aber auch harmlos).

**Aufwand:** S (2 Attribute an einer Stelle). **Risiko:** null (nur Hint, kein Layout-Impact).

### P2-1 — VITE_BASE_URL-Build-Warnings (Kosmetik)

6× Warning beim Build. Entsteht, weil `%VITE_BASE_URL%` in `index.html` ein Post-Build-Platzhalter ist, den Vite nicht kennt. `scripts/replace-env.mjs` ersetzt ihn nach Vite-Build korrekt.

**Fix:** Vite-Env-Variable `VITE_BASE_URL` optional für die Build-Zeit auf einen harmlosen Default setzen (`VITE_BASE_URL=__POST_BUILD_PLACEHOLDER__ npm run build`) oder das Script `replace-env.mjs` per Vite-Plugin integrieren. **Niedrige Priorität**, nur Build-Noise.

**Aufwand:** S. **Risiko:** niedrig. **Gewinn:** nur DX (kein Runtime-Impact).

### P3-1 — CSS-Bundle 119 KB (bereits akzeptabel)

Tailwind 4 + primitives.css ergeben 119.40 KB raw / 19.45 KB gzip. Für einen Design-System-intensiven SPA-App ist das gut. Kein Hebel mit niedrigem Aufwand/hohem Gewinn sichtbar — Refactoring von `primitives.css` (3868 Zeilen) wäre ein eigener Audit.

**Kein Fix in diesem Audit.**

---

## Empfehlung Phase 2

Die P1-Fixes (P1-1 vendor-split, P1-2 dead preconnects, P1-3 fetchpriority) sind alle S-Aufwand und zusammen voraussichtlich 100-300 ms LCP + 40-50 KB Repeat-Visit-Gewinn. **Vorschlag: alle drei in Phase 3 umsetzen**, je ein Commit, danach Re-Build + Diff-Tabelle im Bericht. P2-1 und P3-1 bleiben als Follow-up-Notizen ohne Ticket.

**Bundle-Analyzer-Empfehlung:** Der User hat explizit keinen `npm install` für Analyzer erlaubt. Falls später gewünscht: `rollup-plugin-visualizer` wäre der Standard, als devDep ins package.json, liefert `stats.html` pro Build. Nicht Teil dieses Audits.
