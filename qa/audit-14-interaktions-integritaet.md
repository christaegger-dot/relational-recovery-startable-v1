# Audit 14 — Interaktions-Integritaets-Audit

Ausloeser: Audit-13-Nachlauf. Audit 13 hat Touch-Target-Groessen, Kontraste und
statische Barrieren geprueft, jedoch keine geometrischen Ueberlagerungen
erkannt — der Notfall-Span-Bug im Header wurde erst durch einen Spotcheck mit
`overlap.mjs` entdeckt. Dieser Audit installiert daher eine permanente
Werkzeug-Schicht fuer Interaktions-Integritaet: automatisierte headless-Browser-
Tests, die systematisch pruefen, ob klickbare Elemente auch tatsaechlich
klickbar sind und das erwartete Ziel erreichen.

Fokus: nicht Aussehen (Design-Audit), nicht Barrierefreiheit im klassischen
Sinn (A11y-Audit), sondern **Klick-Erreichbarkeit und Verhaltens-Treue** —
die vierte Schicht der Notfall-Architektur (nach R31 tel:, P0 Print, F4
Touch-Targets).

---

## Phase 1 — Inventur und Werkzeug

### 1.1 Inventur interaktiver Elemente

Routen: `start`, `lernmodule`, `vignetten`, `glossar`, `grundlagen`, `evidenz`,
`toolbox`, `netzwerk` (8 Routen).

Pro Route Anzahl (Headless-Chromium, `networkidle` + 500 ms):

| Route       | Buttons | Links | tel: | extern |
|-------------|--------:|------:|-----:|-------:|
| start       |      36 |     5 |    3 |      1 |
| lernmodule  |    ~27  |   ~15 |    3 |   ~10 |
| vignetten   |    ~30  |   ~12 |    3 |    ~5 |
| glossar     |    ~24  |   ~18 |    3 |    ~8 |
| grundlagen  |    ~25  |   ~20 |    3 |    ~9 |
| evidenz     |      28 |    36 |    3 |     23 |
| toolbox     |      60 |     9 |    3 |      4 |
| netzwerk    |      42 |    25 |    3 |     19 |

Invarianten:

- Jede Route exponiert genau drei `tel:`-Links (R31-Konsistenz aus Audit 09).
- Toolbox ist die interaktions-schwerste Route (60 Buttons), Netzwerk die
  link-schwerste (25 interne + externe).

### 1.2 Werkzeug — drei Test-Scripts

Alle drei Scripts sind permanenter Bestandteil des Repos unter `qa/scripts/`
und basieren auf `playwright-core` (bereits in devDependencies).

#### Script A — `interaction-overlap.mjs`

Geometrischer Overlap-Detektor. Fuer jedes sichtbare, interaktive Element
wird der Mittelpunkt berechnet; `document.elementFromPoint(cx, cy)` liefert
das oberste Element am Punkt. Stimmt es nicht mit dem geprueften Element
ueberein (und ist auch kein Kind), liegt eine Ueberlagerung vor.

- Viewports: 375, 768, 1024, 1280, 1440, 1920 (6)
- Schwere-Klassifikation: `kritisch` (Notfall/tel:), `hoch` (Primaer-Nav,
  Zum-Inhalt-Skip), `mittel`, `niedrig`
- Exit-Code 1 bei kritisch oder hoch; 0 sonst; 2 bei Fehler

#### Script B — `click-reachability.mjs`

Simuliert tatsaechliche Maus-Klicks (`page.mouse.click(cx, cy)`) auf
Nav-Buttons und vergleicht das resultierende `window.location.hash` mit der
Erwartung. Das Mobile-Menue wird dafuer per `aria-controls="mobile-nav"`
geoeffnet (seit Audit 13 ist die Desktop-Nav permanent ausgeblendet; alle
Nav-Buttons sind ausschliesslich im Mobile-Menue erreichbar).

- Viewports: 375, 1280, 1920 (3 — Nav ist viewport-unabhaengig)
- Nav-Erwartung: Klick auf "Toolbox"-Button fuehrt zu `#toolbox`
- Tel-Erwartung: Mittelpunkt jedes `tel:`-Links hit-testet auf den Link
  selbst (nicht ein darueberliegendes Element). Check erfolgt bei
  geschlossenem Menue, sonst wuerde der Backdrop als Ueberlagerung gewertet.
- Exit-Code 1 bei kritisch oder hoch; 0 sonst

#### Script C — `z-stack.mjs`

Inventarisiert z-index-Hierarchie und flaggt Anomalien (z >= 1000, `position:
fixed` ohne expliziten z-index, mehr als zwei Elemente auf demselben
z-Level).

- Viewports: 375, 1280
- Routen-Sample: `start`, `toolbox`, `netzwerk`
- Diagnostisch — Exit-Code immer 0

### 1.3 Ergebnis der Erstlaeufe

#### Script A — Interaction Overlap

```
Overlaps gefunden: 0
Keine Overlap-Befunde. Interaction-Layer clean.
```

Keine geometrischen Ueberlagerungen auf keiner Route in keinem Viewport.
Der Notfall-Span-Bug (Audit-13-Nachlauf, Commit 435f41f) ist somit
verifiziert behoben.

#### Script B — Click Reachability

```
Nav-Klicks geprueft: 168 (8 Routen × 7 Nav-Ziele × 3 Viewports, Toolbox
  separat)
Tel-Links geprueft:  63  (8 Routen × 3 tel-Links × 3 Viewports, minus
  Start-Outlier)
Failures: 28 (alle hoch, 0 kritisch)
```

Muster der Failures:

- **mobile-375:** Klicks auf die Nav-Buttons "Start" und "Lernmodule" im
  Mobile-Menue fuehren auf allen Routen nicht zur erwarteten Hash-Aenderung.
  Pattern: bei `route=vignetten`, Klick "start" → `window.location.hash`
  bleibt `#vignetten`. Betroffen sind die ersten beiden Nav-Positionen.
- **desktop-1280 + desktop-1920:** Klicks auf "Grundlagen" (Position 5 in
  der Nav-Reihenfolge) fuehren nicht zur Hash-Aenderung. Andere Nav-Items
  funktionieren.
- Tel-Links: alle 63 Checks erreichbar. Notfall-Architektur intakt.

Diagnose-Hinweise fuer Phase 2: die betroffenen Positionen sind die
ersten zwei und die mittlere eines acht-elementigen Dialogs — das koennte
auf einen Render/Timing-Effekt im Menue (Scroll-Position, Focus-Trap,
erster-Renderrahmen) oder auf fixed-positionierte Dialog-Chrome
(Emergency-/Reset-Button am Kopf) hinweisen, die bestimmte Klick-Punkte
abfaengt. **Nicht** in Phase 1 fixen — erst triagieren.

#### Script C — Z-Stack

```
Anomalien: 0
```

Die z-index-Hierarchie ist konsistent und flach:

- `z=200` — Skip-Link "Zum Inhalt springen" (oberstes Element)
- `z=100` — Persistenz-Hinweis-Banner
- `z=50`  — Header

Kein z-index ≥ 1000, keine `position: fixed` ohne z-index, keine
z-Level-Kollision. Die Desktop-Stacking-Contexts auf `netzwerk` (16) und
`toolbox` (8) sind erhoeht, aber nicht anomal (typische Card-Layouts mit
`transform` oder `opacity < 1` in Hover-States).

### 1.4 Audit-13-Regression-Check

Spotcheck fuer den bereits gefixten Notfall-Span-Bug:

- Script A: 0 Overlaps — Fix wirksam ueber alle 6 Viewports.
- Mathematische Plausibilitaet: Commit 435f41f blendet `.ui-nav--desktop`
  und `.ui-header-actions` unkonditional aus, wodurch das Overflow-Problem
  im 86-rem-Container strukturell nicht mehr auftreten kann.

### 1.5 Werkzeug-Verstetigung

Die drei Scripts sind als permanente Repository-Assets eingerichtet:
`qa/scripts/interaction-overlap.mjs`, `qa/scripts/click-reachability.mjs`,
`qa/scripts/z-stack.mjs`. README-Eintrag und package.json-Script-Alias
folgen in Phase 4.

---

## Phase 2 — Triage und Fix-Plan

_(Folgt nach Freigabe von Phase 1.)_

## Phase 3 — Fixes

_(Folgt nach Freigabe von Phase 2.)_

## Phase 4 — Verifikation

_(Folgt nach Phase 3.)_
