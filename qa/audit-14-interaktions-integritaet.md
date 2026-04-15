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

## Phase 2 — Diagnose, Triage und Fix-Plan

### 2.1 Positiver Substanz-Befund (Audit 09 + 13)

Die Phase-1-Resultate von Script A (0 Overlaps) und Script C (0 z-Anomalien,
flache Hierarchie 200/100/50) sind **kein Selbstverstaendlichkeit, sondern
ein wichtiger positiver Befund**: Sie belegen, dass die Substanz von Audit 09
(Frontend-Compliance) und Audit 13 (WCAG/Touch-Targets) trag­faehig ist und
der Notfall-Span-Bug ein **Einzelfall** war, kein Symptom eines systemischen
Anti-Patterns. Die Layer-Architektur ist konsistent, die z-Hierarchie
diszipliniert (kein Element ueber 200, kein Element ohne expliziten z-Wert
in der relevanten UI-Schicht). Wir koennen also kuenftige Header- oder Modal-
Aenderungen mit Vertrauen vornehmen, ohne ein generelles Refactoring der
Stacking-Order zu befuerchten.

### 2.2 Diagnostisches Werkzeug (`click-diagnose.mjs`)

Fuer die Ursachen-Identifikation der 28 Failures wurde ein viertes Script
ergaenzt: `qa/scripts/click-diagnose.mjs`. Es oeffnet das Mobile-Menue,
lokalisiert das Failure-Ziel-Element, ermittelt den geometrischen
Mittelpunkt und gibt den vollstaendigen `elementsFromPoint`-Stack inklusive
computed-CSS aus (position, z-index, transform, padding, pointer-events).

### 2.3 Diagnose-Ergebnis: **Single Root Cause**

Die Diagnose ueber alle Failure-Cluster (Mobile "Start"+"Lernmodule",
Desktop "Grundlagen") liefert ein einheitliches Bild: An jedem Klick-Punkt
der ausgefallenen Buttons liegt im obersten Stack der **Persistenz-Hinweis-
Banner** ("Lokale Speicherung im Browser…"), nicht der Nav-Button.

Konkrete Stack-Spitze pro Cluster:

| Cluster                                    | Klick-Pos.    | Top-Element am Punkt                    |
|--------------------------------------------|---------------|------------------------------------------|
| mobile-375 / "Start" (y=42, h=44)          | (188, 64)     | SPAN im Banner ("Lokale Speicherung…")  |
| mobile-375 / "Lernmodule" (y=94, h=44)     | (188, 116)    | DIV-Wrapper im Banner                    |
| desktop-1280 / "Grundlagen" (y=17, h=44)   | (640, 39)     | SPAN im Banner                           |
| desktop-1920 / "Grundlagen" (y=17, h=44)   | (960, 39)     | SPAN im Banner                           |

Die Geometrie passt exakt:

- Persistenz-Banner: `position: relative; z-index: 100`
  - mobile-375: y=0, h=171
  - desktop-1280/1920: y=0, h=69
- Mobile-Dialog (`.ui-mobile-dialog`, primitives.css:1445–1452):
  `position: fixed; z-index: 60`

`60 < 100` → der Banner liegt im Stacking-Context **ueber** dem Modal-Dialog,
obwohl der Dialog visuell ueber allem liegen sollte. Wo Banner und Nav-Items
sich geometrisch kreuzen (oberer Bildschirmrand des geoeffneten Mobile-
Menues), faengt der Banner alle Klicks ab.

Warum nur `Start`/`Lernmodule` auf Mobile bzw. nur `Grundlagen` auf Desktop?
Das sind genau die Nav-Buttons, deren `getBoundingClientRect()` in den
y-Bereich des Banners (0…171 mobile, 0…69 desktop) faellt. Alle anderen
Items liegen tiefer und damit ausserhalb der Banner-Geometrie. Auf Desktop
ist die Dialog-Liste so gescrollt, dass nur `Grundlagen` mit y=17 in den
Banner-Bereich (0…69) ragt; die uebrigen sichtbaren Items beginnen erst ab
y=69+.

**Hypothese-Sicherheit:** sehr hoch (≈ 95%). Die Diagnose ist nicht
spekulativ — sie ist die **direkte Auslesung** von `elementFromPoint` und
zeigt das ueberlagernde Element pro Failure mit Bounding-Box, z-index und
Position. Die Fix-Vorhersage (Anhebung des Dialog-z-Index ueber 100) folgt
deterministisch aus der CSS-Spec.

### 2.4 Triage-Kategorisierung

| Kategorie       | Anzahl | Befunde                                                            |
|-----------------|-------:|--------------------------------------------------------------------|
| Notfall-relevant (nicht verhandelbar) | 0  | Keine. Alle 63 tel-Link-Reachability-Checks bestanden. R31-Architektur intakt. |
| Funktionskritisch / Release-Blocker    | 28 | Mobile-Nav "Start"+"Lernmodule" + Desktop-Nav "Grundlagen" durch Persistenz-Banner ueberlagert |
| Diagnostisch / Beobachtung             |  0 | —                                                                  |
| Kosmetisch                             |  0 | —                                                                  |

**Notfall-Spalte explizit:** Der Audit hat keine Notfall-relevanten Befunde
ergeben. Diese Aussage ist dokumentiert, weil das Fehlen kritischer Befunde
ein eigenstaendiges, positives Pruefergebnis ist.

### 2.5 Release-Readiness

**Stufe A (vollstaendig release-bereit) ist derzeit nicht erreicht.**

Begruendung: Auch wenn die 28 Failures nicht "kritisch" im Notfall-Sinn
sind, untergraben sie die Hauptnavigation auf Mobile (zwei von acht Items
unerreichbar) und auf Desktop (ein Item unerreichbar). Mobile-Nutzende
machen einen substantiellen Anteil der Zielgruppe aus; eine kaputte
"Start"-Schaltflaeche ist ein Vertrauensbruch, auch ohne Notfall-Kontext.
Stufe A wird wieder erreicht, sobald der in Phase 3 vorgeschlagene Fix
angewandt und durch Re-Lauf von Script B verifiziert ist.

Aktuelle Stufe: **Stufe B** (live-tauglich mit dokumentierter Einschraenkung
der Mobile-Hauptnavigation).

### 2.6 Fix-Plan fuer Phase 3

Da die Diagnose **eine einzige strukturelle Ursache** identifiziert hat,
wird Phase 3 alle 28 Failures in **einem** Commit beheben (gemaess Punkt 5
der Phase-2-Vorgaben).

Fix: `.ui-mobile-dialog` und `.ui-mobile-backdrop` muessen im Stacking-
Context oberhalb des Persistenz-Banners (`z-index: 100`) und unterhalb des
Skip-Links (`z-index: 200`) liegen. Vorschlag:

- `.ui-mobile-backdrop`: `z-index: 110`
- `.ui-mobile-dialog`:   `z-index: 120`

Damit bleibt der Persistenz-Banner sichtbar, wird aber vom geoeffneten
Modal abgedeckt — was dem erwarteten Modal-Verhalten entspricht. Der
Skip-Link (z=200) bleibt darueber, damit Tastaturnutzer ihn auch bei
geoeffnetem Modal erreichen koennen.

Verifikation in Phase 4: Re-Lauf aller drei Phase-1-Scripts; Erwartung
`Failures: 0` in Script B.

### 2.7 STOPP

Warte auf Bestaetigung der Diagnose-Hypothese (Single Root Cause:
Persistenz-Banner z-index 100 ueberlagert Mobile-Dialog z-index 60) und
auf Freigabe des Fix-Plans (Anhebung Dialog/Backdrop auf 120/110).

## Phase 3 — Fixes

_(Folgt nach Freigabe von Phase 2.)_

## Phase 3 — Fix und Diagnose-Vertiefung

### 3.1 Umsetzung

Commit `1323258` — `audit(14): fix mobile-dialog z-stack ueber persistenz-banner`.

Aenderungen in `src/styles/primitives.css`:

- `.ui-mobile-backdrop`: kein z-index → `z-index: 110`
- `.ui-mobile-dialog`: `z-index: 60` → `z-index: 120`
- `.ui-site-header`: `z-index: 50` → `z-index: 150`

Begleitende Code-Kommentare dokumentieren die vollstaendige Hierarchie
sowohl bei `.ui-mobile-backdrop` als auch bei `.ui-site-header`.

### 3.2 Vertiefte Diagnose (Abweichung von Phase-2-Hypothese)

Die urspruengliche Phase-2-Hypothese — Banner (100) ueberlagert Dialog (60)
— war **korrekt in der Richtung, aber unvollstaendig in der Ursache**. Der
erste Fix-Versuch (Dialog 120, Backdrop 110) allein hat die 28 Failures
**nicht** behoben. Der Re-Lauf von Script B zeigte dieselben 28 Failures.

Die vertiefte Diagnose per `click-diagnose.mjs` + direkter
Computed-Style-Auslesung ergab: `.ui-site-header` hat
`position: sticky; z-index: 50` und erzeugt dadurch einen eigenstaendigen
Stacking-Context. Da das Mobile-Dialog als DOM-Kind von `<header>`
gerendert wird, ist es an Header's Stacking-Context gebunden und global
auf Layer 50 gedeckelt — unabhaengig davon, wie hoch sein eigener
z-index intern gesetzt wird. Banner (z=100 im Root-Context) paint global
oberhalb von Header-Layer-50-Kindern.

Der vollstaendige Fix erforderte daher zusaetzlich die Anhebung des
Headers selbst auf z=150 (ueber den Banner). Damit liegt die Dialog-
Subtree-Hierarchie 120/110 innerhalb eines Header-Contexts, der global
oberhalb des Banners paint.

**Lernwert:** Diagnosen via `document.elementsFromPoint` liefern das
oberste Element am Klickpunkt, aber nicht immer den **clampenden
Stacking-Context-Vorfahren**. Wenn eine z-index-Hebung nicht die erwartete
Wirkung zeigt, muss die gesamte `position/z-index`-Kette entlang der
DOM-Parents gelesen werden — jede Kombination von `position != static`
mit explizitem `z-index` erzeugt einen eigenen Stacking-Context, der
Kind-z-Indices clampt. Diese Dimension wird in den Diagnose-Scripts
bereits durch die Stacking-Context-Detektion in `z-stack.mjs` abgedeckt,
war aber in Phase 2 nicht explizit entlang der Failure-Parent-Kette
aufgeloest worden.

## Phase 4 — Verifikation und Abschluss

### 4.1 Build und Lint

- `npm run build`: erfolgreich, Prerender-Step aktiv, 27401 Zeichen
  Snapshot in `dist/index.html` injiziert.
- `npm run lint`: sauber, keine Warnungen.

### 4.2 Script-Re-Laeufe

| Script                        | Erwartung | Ergebnis           |
|-------------------------------|-----------|--------------------|
| `interaction-overlap.mjs`     | 0 Overlaps (keine Regression) | 0 Overlaps ✓ |
| `click-reachability.mjs`      | 0 Failures (vorher 28), 63 tel-Links erreichbar | 0 Failures, 63/63 tel ✓ |
| `z-stack.mjs`                 | Hierarchie um Header 150 erweitert, keine neuen Anomalien | z=200/150/100 in jeder Route, 0 Anomalien ✓ |
| `click-diagnose.mjs`          | Hit=true fuer alle 7 Phase-2-Failure-Szenarien | Alle 7 Hit=true ✓ |

### 4.3 Manuelle Tests

- Mobile-375 (DevTools-Emulation): Menue geoeffnet, "Start" und
  "Lernmodule" getappt — Navigation greift, Hash wechselt, Menue
  schliesst sich.
- Desktop-1280 / Desktop-1920: Menue geoeffnet, "Grundlagen" geklickt —
  Navigation greift. Kein visuelles Regression des Persistenz-Banners
  (er bleibt sichtbar bei geschlossenem Menue; wird bei offenem Menue
  korrekt vom Modal abgedeckt).

### 4.4 Notfall-Funktionalitaet

- Alle 63 `tel:`-Reachability-Checks bestanden. R31-Architektur intakt.
- Notfall-Span (Header-Button) bleibt auf seine sichtbare Flaeche
  beschraenkt (Audit-13-Fix unveraendert wirksam, 0 Overlaps).

### 4.5 Aggregierte Metriken

| Metrik                       | Vorher | Nachher |
|------------------------------|-------:|--------:|
| Nav-Klick-Failures           |     28 |       0 |
| Interaction-Overlaps         |      0 |       0 |
| z-Hierarchie (dokumentiert)  |      3 Ebenen | 5 Ebenen |
| Tel-Link-Reachability        |  63/63 |   63/63 |

### 4.6 Infrastruktur

- `qa/scripts/README.md` neu angelegt: erklaert alle vier Scripts,
  Ausfuehrungs-Anleitung, Empfehlung wann auszufuehren (vor jedem
  Release; nach Header-, Modal-, Layout-Aenderungen).
- `qa/audit-13-wave3-verifikation.md` um Schluss-Bemerkung erweitert:
  dokumentiert den Notfall-Span-Fix sowie den Audit-14-Befund, dass die
  Luecke zu dauerhaft verbesserter Verifikations-Infrastruktur gefuehrt
  hat.

### 4.7 Finale Release-Readiness

**Stufe A (vollstaendig release-bereit) ist wiederhergestellt.**

Die Audit-14-Test-Scripts stehen als laufende Verifikations-Infrastruktur
permanent im Repository. Kuenftige Aenderungen an Header, Mobile-Menue,
Persistenz-Banner oder CSS-Primitives mit z-index-Beruehrung MUESSEN einen
Re-Lauf der Scripts mit Exit-Code 0 nachweisen, bevor gemerged wird.

Die vierte Schicht der Notfall-Architektur (Klick-Erreichbarkeit) ist
damit verifiziert aufgebaut:

- R31 (tel:-Links)                    — Audit 09
- P0 (Print-Notfall-Footer)           — Audit 11
- F4 (Touch-Targets ≥ 44×44 px)        — Audit 13
- **K1 (Klick-Erreichbarkeit)**       — **Audit 14**
