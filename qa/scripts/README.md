# QA Test-Scripts — Interaktions-Integritaet + Baseline-Checks

Dieser Ordner sammelt permanente Verifikations-Scripts. Sie zerfallen in
zwei Kategorien:

1. **Interaktions-Integritaet** (Audit 14) — laufen gegen eine Preview-
   Instanz (`interaction-overlap`, `click-reachability`, `z-stack`,
   `click-diagnose`). Bewertung: Pflicht vor jedem Release.
2. **QA-Baseline** (Audit-Nachfolge) — laufen gegen die Produktions-URL
   (`link-health-check`, `lighthouse-baseline`). Bewertung: Monatlich via
   GitHub-Actions-Workflow `qa-baseline.yml` oder manuell vor Release.

## Voraussetzungen

- Node.js (>= 18)
- `playwright-core` (schon in `devDependencies`)
- Chromium muss einmalig installiert sein: `npx playwright install chromium`
- Preview-Server laufend auf Port 4173 oder 4180, oder alternative Base-URL

## Scripts

### `interaction-overlap.mjs`

Geometrischer Overlap-Detektor. Fuer jedes sichtbare, interaktive Element wird
der Mittelpunkt berechnet; `document.elementFromPoint(cx, cy)` liefert das
oberste Element am Punkt. Stimmt es nicht mit dem geprueften Element
ueberein (und ist auch kein Kind), liegt eine Ueberlagerung vor.

```
node qa/scripts/interaction-overlap.mjs [base-url]
```

6 Viewports × 8 Routen. Exit-Code 1 bei kritisch/hoch, 0 sonst.

### `click-reachability.mjs`

Simuliert tatsaechliche Maus-Klicks (`page.mouse.click`) auf alle Mobile-Nav-
Buttons und verifiziert die erwartete Hash-Aenderung. Prueft zusaetzlich bei
geschlossenem Menue, ob jeder `tel:`-Link auf seiner Mitte per
`elementFromPoint` erreichbar ist.

```
node qa/scripts/click-reachability.mjs [base-url]
```

3 Viewports × 8 Routen. Exit-Code 1 bei kritisch/hoch, 0 sonst.

### `z-stack.mjs`

Inventarisiert z-index-Hierarchie und flaggt Anomalien (z ≥ 1000, `position:
fixed` ohne z-index, z-Kollisionen). Diagnostisch — Exit-Code immer 0.

```
node qa/scripts/z-stack.mjs [base-url]
```

### `click-diagnose.mjs`

Diagnose-Werkzeug fuer Failure-Triagen (Phase-2-Tool). Fuer vordefinierte
Failure-Szenarien: oeffnet das Mobile-Menue, lokalisiert das Ziel-Element,
gibt den vollstaendigen `elementsFromPoint`-Stack mit Bounding-Box, z-index,
position, padding und pointer-events aus.

```
node qa/scripts/click-diagnose.mjs [base-url]
```

### `link-health-check.mjs`

Scannt `src/`, `public/` und `index.html` nach externen http(s)-URLs und
prueft jeden via HEAD (GET-Fallback) mit 15s-Timeout. Timeout, 4xx und
5xx werden nach Kategorie gebuendelt, Quellen-Dateien referenziert.
Report nach `qa/link-health-check-report.md`.

```
node qa/scripts/link-health-check.mjs
```

Braucht outbound HTTPS (wird in Sandbox-Umgebungen typischerweise
blockiert). Aus CI heraus via `qa-baseline.yml` triggerbar.

### `lighthouse-baseline.mjs`

Laeuft Lighthouse 13 via `npx` in Mobile + Desktop gegen die Produktions-
URL (oder eine uebergebene Base-URL). Erfasst die vier Category-Scores
(Performance, Accessibility, Best Practices, SEO) + Core Web Vitals
(LCP, TBT, CLS, FCP, Speed Index). Report nach
`qa/lighthouse-baseline.md`.

```
node qa/scripts/lighthouse-baseline.mjs                               # Produktion
node qa/scripts/lighthouse-baseline.mjs https://staging.example.com   # Staging
```

Braucht lokales Chrome/Chromium (Lighthouse bringt sein eigenes via
`chrome-launcher` mit) + outbound HTTPS. Aus CI heraus via
`qa-baseline.yml` triggerbar.

## Wann ausfuehren?

**Pflicht vor jedem Release:**

- `interaction-overlap.mjs` + `click-reachability.mjs` beide mit Exit-Code 0
- `z-stack.mjs` ohne neue Anomalien

**Empfohlen monatlich (oder via `qa-baseline.yml`-Workflow):**

- `link-health-check.mjs` — broken External-Links erkennen, bevor sie
  auffallen
- `lighthouse-baseline.mjs` — Score-Regressions sichtbar machen

**Nach allen Aenderungen an:**

- Header (`src/components/Header.jsx`)
- Mobile-Menue-Komponenten (Backdrop, Dialog)
- Persistenz-Banner oder andere `position: sticky|fixed|relative` Elemente mit
  z-index
- CSS-Primitives (`src/styles/primitives.css`), insbesondere Abschnitte
  `.ui-site-header`, `.ui-mobile-*`, Skip-Link
- Layout-Container mit `max-width` (`.page-shell*`)

**Bei neuen Failure-Signalen:**

- `click-diagnose.mjs` mit im Script angepassten `SCENARIOS`, um den
  `elementsFromPoint`-Stack am Klickpunkt auszulesen.

## Beispielworkflow (lokal)

```bash
npm run build
npm run preview &
PREVIEW_PID=$!

node qa/scripts/interaction-overlap.mjs http://127.0.0.1:4173
node qa/scripts/click-reachability.mjs http://127.0.0.1:4173
node qa/scripts/z-stack.mjs http://127.0.0.1:4173

kill $PREVIEW_PID
```

## Hintergrund

Script A und C wurden ausgeloest durch Audit 13 (Notfall-Span-Bug im Header),
den keiner der statischen Pruefungen entdeckt hatte. Audit 14 hat die
geometrische Dimension der Interaktions-Pruefung systematisiert. Script B
und D sind ergaenzende Werkzeuge fuer Verhaltensverifikation bzw. Diagnose.

Die derzeit geltende z-Hierarchie (Audit-14-Baseline):

```
Skip-Link        200
Site-Header      150
Mobile-Dialog    120
Mobile-Backdrop  110
Persistenz-Banner 100
```

Aenderungen an dieser Hierarchie muessen durch Re-Lauf von Script B (0
Failures) verifiziert werden.
