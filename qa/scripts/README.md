# QA Test-Scripts — Interaktions-Integritaet

Diese vier headless-browser-basierten Scripts bilden die permanente Verifikations-
Infrastruktur fuer Interaktions-Integritaet, entstanden aus Audit 14. Sie laufen
gegen eine laufende Preview-Instanz der Site (`npm run preview` bzw. gegen eine
beliebige Base-URL).

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

## Wann ausfuehren?

**Pflicht vor jedem Release:**

- `interaction-overlap.mjs` + `click-reachability.mjs` beide mit Exit-Code 0
- `z-stack.mjs` ohne neue Anomalien

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
