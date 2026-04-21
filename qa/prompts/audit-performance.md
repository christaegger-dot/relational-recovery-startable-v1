# Audit-Prompt — Performance + Bundle-Hygiene

**Einsatz:** Bei Perf-Verdacht, vor Release, bei unerklaerlichem Bundle-Wachstum.

**Was es findet:** Unnoetige Dependencies, zu grosse Chunks, fehlende
Lazy-Loading-Gelegenheiten, unoptimierte Bilder, CLS-Quellen.

**Bauzeit-Hinweis:** Die App ist Vite 7 + React 19 + Tailwind 4. Lazy-Loading
ist konzeptuell schon gesetzt (Sections sind `React.lazy`, HomeLanding bewusst
nicht — siehe `CLAUDE.md`). Dieser Audit validiert die Umsetzung, nicht die
Idee.

---

```
# Audit: Performance und Bundle-Hygiene

## Kontext

Du pruefst Relational Recovery (Vite 7, React 19, Tailwind 4, rein
clientseitig, kein Backend) auf Performance-Probleme und Bundle-Hygiene.
Ziel: Core Web Vitals gruen, Bundle nachvollziehbar, keine toten
Dependencies.

Die App laedt keine externen Runtime-Ressourcen (siehe `netlify.toml`-
Kommentar) — das ist bereits ein Perf-Vorteil. Der Fokus liegt auf
Build-Output, Bildern und Split-Strategie.

## Constraints

- Arbeitsbranch: der aktuelle Session-Branch.
- Bericht: `qa/audit-<nnn>-performance.md` (naechste freie Nummer ab 15).
- Keine funktionalen Aenderungen in Phase 1/2.
- Keine neuen Dependencies ohne Freigabe — insbesondere kein
  Bundle-Analyzer via `npm install`, sondern Build-Output parsen.

## Routen

Desktop- und Mobile-Messung auf den 3 schwersten Routen:
`#toolbox` (interaktions-schwer), `#netzwerk` (link-schwer),
`#material` (Content + Print-Styling). Plus `#start` als Baseline.

## Phase 1 — Inventur (read-only)

### 1.1 Build-Output

`npm run build` ausfuehren. Dokumentiere:
- Gesamtgroesse `dist/` (JS, CSS, Assets getrennt).
- Pro Chunk: Dateiname, Groesse raw + gzip (Vite gibt beides aus).
- Top-5 groesste JS-Chunks — welches Feature sitzt drin?
- Gibt es einen Entry-Chunk > 200 KB (gzip)? Wenn ja: warum?

Kein Bundle-Analyzer installieren. Falls der User einen Analyzer will,
als Follow-up vorschlagen (rollup-plugin-visualizer waere der Standard).

### 1.2 Core-Web-Vitals (falls moeglich)

- Preview starten (`npm run preview`, Port 4173).
- Falls Lighthouse/PageSpeed-CLI verfuegbar: LCP, CLS, INP, FCP, Speed Index
  fuer die 4 Routen in Desktop und Mobile. Sonst: Block als
  "manuell nachzureichen" markieren.
- Alternative: Heuristik ueber Build-Output + statische Pruefung.

### 1.3 Dependency-Audit

`package.json` lesen. Pro Dependency:
- Wird sie per `import` referenziert? (Grep `from '<name>'` in `src/`.)
- Verwaiste Deps flaggen.
- Doppelte Funktionalitaet erkennen (z.B. zwei Icon-Libs). Aktueller Stand:
  nur `lucide-react` — das ist bewusst schlank.
- `npm audit --omit=dev` fuer Laufzeit-CVEs.

### 1.4 Bild-Audit

Alle Bilder in `public/` und `src/assets/`:
- Format (WebP/AVIF/PNG/JPG/SVG), Dateigroesse, Pixel-Dimensionen.
- Werden sie irgendwo in doppelter Groesse geladen?
- `loading="lazy"` auf allen below-the-fold-Bildern?
- Hero-Datei: `src/assets/relational-recovery-hero-v3-web.webp` — pruefen,
  ob sie als LCP-Kandidat mit `fetchpriority="high"` o.ae. markiert ist.

### 1.5 Lazy-Loading und Code-Splitting

- Welche Sections sind `React.lazy`? (Siehe `src/App.jsx`.) Ist
  `HomeLandingTemplate` weiterhin bewusst eager? (Siehe `CLAUDE.md`.)
- Gibt es Sections, die heute eager geladen werden, aber lazy sein sollten?
- Wird der Suspense-Fallback sinnvoll angezeigt (kein Layout-Shift)?

### 1.6 Layout-Shift-Quellen

- Bilder ohne `width`/`height` oder `aspect-ratio`?
- `@font-face` mit `font-display: swap` korrekt gesetzt?
- Dynamisch eingefuegte Elemente (Persistenz-Banner, Notfall-Banner) —
  verschieben sie Layout oder overlay-only?

### 1.7 Runtime-Hotspots (statisch)

Grep nach bekannten Smells:
- `useEffect`-Ketten mit teuren Dependencies.
- `Array.prototype.filter`/`.map` in Render ohne `useMemo`, wenn gross.
- React 19-spezifisch: `use` korrekt eingesetzt? Unnoetige Context-Subscriber?

### 1.8 Gesamtbild

Tabelle:
- Build-Groessen vs. Budget-Hypothese (JS < 200 KB gzip pro Route-Chunk?).
- CWV-Werte pro Route (falls gemessen).
- Deps: Gesamtzahl, verwaiste, CVE-Schwere.
- Bilder: ungeoptimierte Anzahl.
- Lazy-Loading-Coverage.
- CLS-Risikostellen.

Top-5 Hot-Spots fuer Gewinn pro Aufwand.

**STOPP.** Fasse Phase 1 in 5-10 Zeilen zusammen und warte auf Freigabe.

## Phase 2 — Massnahmenkatalog

Pro Hot-Spot: konkreter Vorschlag, erwarteter Gewinn (geschaetzt in KB oder
ms), Aufwand (S/M/L), Risiko. Priorisierung P1/P2/P3.

Spezielles Augenmerk:
- Bild-Optimierung vor Code-Splitting (hoechster Gewinn pro Aufwand).
- Keine "Hip"-Optimierungen (Preact-Migration, Astro-Umzug) vorschlagen —
  die App ist bewusst React-19.

**STOPP.** Warte auf Freigabe fuer Phase 3.

## Phase 3 — Umsetzung

Pro Massnahme ein Commit. Commit-Pattern: `audit(perf): <was>`.
Nach jeder Bild-/Asset-Aenderung: `npm run build` + Bundle-Diff im
Commit-Body.

## Phase 4 — Verifikation

- Build laeuft sauber, keine neuen Warnings.
- Bundle-Groessen vorher/nachher (Tabelle im Bericht).
- CWV-Re-Run falls in Phase 1 gemessen.
- `npm audit` unveraendert oder besser.
```
