# Audit — Accessibility und Interaktions-Integritaet

Auslöser: Neuer kombinierter Audit, der die klassische a11y-Dimension (WCAG,
Heading-Struktur, Landmarks, Labels, Fokus, reduzierte Bewegung) und die
geometrische Klick-Integritaet (Audit-14-Infrastruktur: Overlap, Reachability,
z-Stack) in einem Pass zusammenfuehrt.

Branch: `audit/a11y-interaktion` (abgezweigt von `origin/main @ 54954dc`).
Umfang Phase 1: read-only. Keine Substanz-Aenderung an Produkt-Code.

## Sandbox-Limitierung

- **Lighthouse**: nicht installierbar im Sandbox-Netz (kein DevTools-Protokoll-
  Download). Als Ersatz axe-core via Playwright gegen die lokale Preview.
- **Playwright-Chromium 1217**: nicht ladbar. Vorhandener Chromium 1194 unter
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` funktioniert mit den
  Scripts, wenn `PLAYWRIGHT_CHROMIUM_EXECUTABLE` gesetzt ist. Die vier Scripts
  wurden entsprechend minimal gepatcht (eine Zeile pro Script, rueckwaerts-
  kompatibel — Default-Verhalten unveraendert).

## Phase 1 – Inventur (read-only)

### 1.1 Automatisierte Pruefung — axe-core statt Lighthouse

Lauf: `qa/scripts/a11y-axe.mjs` (neu). 3 Viewports × 8 Routen × ca. 90 WCAG-
Regeln (`wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice`).

Ergebnis (eindeutige Regeln nach Impact):

| Impact   | Eindeutige Regeln |
|----------|------------------:|
| critical | 0 |
| serious  | 0 |
| moderate | 4 |
| minor    | 0 |

Die vier moderate-Regeln im Detail:

| Regel | Help | Betroffene Routen × VP | DOM-Knoten (Summe) |
|-------|------|------------------------:|-------------------:|
| `region` | All page content should be contained by landmarks | 24 (alle) | 48 |
| `landmark-complementary-is-top-level` | Aside should not be contained in another landmark | 18 (6 von 8 Routen × 3 VP) | 48 |
| `landmark-unique` | Landmarks should have a unique accessible name | 3 (nur material × 3 VP) | 3 |
| `heading-order` | Heading levels should only increase by one | 3 (nur material × 3 VP) | 3 |

Diagnose pro Regel:

- **`region`** — Zwei Elemente oberhalb von `<main>` sind nicht in einem
  Landmark gekapselt:
  1. Der Persistenz-Hinweis-Banner (`<div>` mit Datenschutz-Span, App.jsx:132-152)
  2. Der Emergency-Strip "Akute Krise" (`<div>` mit tel-Links, App.jsx:154-241)

  Beide liegen ausserhalb `<header>` und `<main>`. Das ist systemisch, trifft
  jede Route. WCAG 1.3.1/2.4.1 — nicht kritisch, weil der Notfall-Strip per
  tel-Link-Pruefung (Script B) fuer alle 66 Messungen erreichbar bleibt.

- **`landmark-complementary-is-top-level`** — Das `AsideCard`-Pattern rendert
  `<aside>`-Elemente als Sidebar-Karten innerhalb von Sections
  (`src/components/ui/AsideCard.jsx`). ARIA schreibt "complementary"-Landmarks
  als Top-Level vor. Viele Vorkommen, systemisches Muster:
  - `lernmodule`, `vignetten`, `evidenz`, `toolbox`, `netzwerk`: je 1–3 Vorkommen
  - `material`: 7 Vorkommen (Split-Layout pro Cluster + Downloads) plus
    zusaetzlich 4 `ui-material-handout__cross-refs`-Asides in den Handouts.

- **`landmark-unique`** — Mehrere `<aside aria-label="Verwandte Inhalte">` auf
  der Material-Seite (ein Cross-Ref-Block pro Handout). Screen-Reader-Nutzer
  koennen die vier Handout-Cross-Ref-Aside nicht auseinanderhalten.

- **`heading-order`** — `MaterialCrisisPlan` springt von `<h3>` (Handout-Titel
  "Mein Notfallplan") direkt zu `<h5>` (Owner-Felder "Dieser Plan gehört")
  ohne zwischengeschobenes `<h4>`. Nur an dieser einen Stelle;
  `MaterialHandoutShell`-basierte Handouts (H-5, H-6, H-3) haben die saubere
  Folge h3 → h4 → h5.

### 1.2 Manuelle Spotchecks

Per Script `qa/scripts/a11y-heading-tree.mjs` (neu) automatisiert, ergaenzt
durch statische Code-Inspektion.

#### Heading-Hierarchie

Laufzeit-Messung via Playwright (desktop-1280, dynamische Inhalte geladen):

| Route | H1 | Headings gesamt | Heading-Spruenge (>1 Stufe) |
|-------|---:|----------------:|----------------------------:|
| start | 1 | 6 | 0 |
| lernmodule | 1 | 9 | 0 |
| vignetten | 1 | 4 | 0 |
| glossar | 1 | 34 | 0 |
| material | 1 | 91 | **1** |
| evidenz | 1 | 127 | 0 |
| toolbox | 1 | 67 | 0 |
| netzwerk | 1 | 30 | 0 |

Jede Route hat genau eine H1 ✓. Der einzige Sprung ist die oben genannte
`MaterialCrisisPlan`-Stelle (bestaetigt axe-Befund).

#### Landmark-Struktur

Jede Route traegt: `<header>`, `<main>`, `<footer>`, `<nav aria-label=
"Fusszeilen-Navigation">`. Die Haupt-Navigation wird nur als `<nav aria-label=
"Hauptnavigation">` bzw. `<nav aria-label="Mobile Navigation">` im Header
gerendert (Header.jsx:57 + 175).

- Skip-Link: `.skip-link` → `#main-content` ist an App-Root positioniert,
  `<main>` hat `id="main-content"`, `ref`, `tabIndex={-1}`,
  `aria-labelledby` auf die H1-ID pro Tab ✓ (App.jsx:254-259).
- Mobile-Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby=
  "mobile-nav-title"` ✓ (Header.jsx:131-138).
- Footer-Brand-Label ist bewusst `<p>`, nicht `<h2>` (Footer.jsx:25-30,
  Kommentar dokumentiert die Entscheidung aus frueherem Audit).

#### Bilder

Alle `<img>`-Vorkommen im Code: genau eines (`PageHero.jsx:140`), mit
`alt={imageAlt || ''}`. Drei Sections uebergeben `imageAlt`:

- `HomeLandingTemplate.jsx`: "Minimalistische Illustration eines
  Familiensystems mit Naehe, Distanz und Unterstuetzung"
- `ElearningSection.jsx`: "Illustration eines Familiensystems mit
  Beziehungslinien und ruhiger Orientierung"
- `NetworkSection.jsx`: identischer Text wie Elearning

Die uebrigen Sections uebergeben kein `image` → kein `<img>` gerendert. Kein
fehlendes Alt. Lucide-Icons in den Buttons haben `aria-hidden="true"` (z. B.
Header.jsx:102, 116, 150, 161, 170; Ueberall konsistent).

*Hinweis:* Elearning und Network teilen sich identischen Alt-Text. Inhaltlich
vertretbar (dieselbe Illustration), aber die Wiederholung koennte kontextu-
alisiert werden (z. B. "...Illustration im Lernmodule-Bereich"). Niedrig.

#### Links und Buttons

- Kein `href=""` oder `href="#"` im Code (grep).
- Kein `<button></button>` oder `<button />` (grep). Button-Inhalte sind
  entweder Text oder Icon + Text; reine Icon-Buttons tragen `aria-label`
  (Header: Menue-Toggle 114, Close 148, 168; Material-Print-Btn; Emergency-
  Banner-Close etc.).
- tel-Links haben alle `aria-label` mit sprechender Nummer, z. B.
  "Sanitaetsnotruf 144 anrufen" (App.jsx:169, 179, 189, 208, 216, 224).

#### Formulare

5 Inputs im gesamten Code; jeder hat entweder ein umschliessendes
`<label>` (`ClosingSection`, `VignettenPageTemplate`, `ToolboxPageTemplate`,
`LearningPageTemplate`) oder ein `<label htmlFor>` ueber der Eingabe
(`NetworkPageTemplate`). Komplette Paarung ✓.

#### Kontrast-Spotcheck

axe-core hat 0 `color-contrast`-Violations ueber 3 Viewports × 8 Routen
zurueckgegeben. Das deckt kleine Texte, Buttons, Links, Disabled-States
automatisiert ab. Kein manueller Nachbefund auf Basis dieser Inventur noetig.
(Etwas waermere Palette im Footer wurde in frueherem Audit bereits gegen
`--text-secondary`-Tokens vereinheitlicht.)

#### Tastatur-Navigation

- Skip-Link oben (`z-index: 200`) wird bei Fokus sichtbar, nur bei
  `:focus-visible` (app-global.css:29 + 99-104).
- `:focus-visible`-Ring global konfiguriert (app-global.css:99-104 + Spezial-
  faelle fuer Disclosure-Summary 106-112 und Choice-Card 114-119).
- Mobile-Menue: `aria-expanded` am Toggle, `role="dialog"` + `aria-modal`
  am Dialog-Container, `Escape`-Handler registriert
  (`useMobileMenu.js:35-74`). Erstes Nav-Item bekommt `firstMobileNavItemRef`
  (Header.jsx:179). Fokus-Trap selbst ist implizit durch Backdrop-Klick +
  `aria-modal` — aber ein echter Focus-Trap (tab cycle) ist nicht im Code
  erkennbar. Niedrig-bis-mittel: die Nav besteht aus Buttons, die bei Klick
  das Menue schliessen, daher ist die reale Einschraenkung klein, aber
  Tab-out aus dem Dialog kann zum Banner-Content fuehren.

Schlussergebnis Keyboard-Inventur: funktional, kein Blocker. Detail-Check
eines echten Focus-Traps steht auf der Follow-up-Liste.

#### Reduced-Motion

Drei `@media (prefers-reduced-motion: reduce)`-Bloecke abgedeckt:

- `index.css:74` — `html { scroll-behavior: auto }` + `a { transition: none }`
- `app-global.css:91` — `.reveal-on-scroll` (Section-Reveal) sofort sichtbar.
- `app-global.css:146` — zusaetzliche App-weit.
- `primitives.css:3764` — `.ui-button, .ui-chip, .ui-card--interactive,
  .ui-input` Transitions + Hover-Transforms aus; `.page-enter` Animation aus;
  `.haptic-btn` Transitions/Transforms aus.

Die relevanten Animation-Klassen sind abgedeckt. Es gibt zusaetzlich
Background-Gradients auf `body::before` (Punktraster), die statisch sind.

### 1.3 Interaktions-Overlap-Test

Lauf: `qa/scripts/interaction-overlap.mjs` gegen Preview (`:4180`).

- 6 Viewports: mobile-375, tablet-768, laptop-1024, desktop-1280, desktop-1440,
  desktop-1920
- 8 Routen (inkl. Legacy-Alias `grundlagen` → redirect zu `material`)
- Exit-Code 0.

Ergebnis: **0 Overlaps**. "Interaction-Layer clean." Keine Regression seit
Audit 14.

### 1.4 Klick-Erreichbarkeits-Test

Lauf: `qa/scripts/click-reachability.mjs` gegen Preview.

- 88 Nav-Klicks geprueft (Mobile-Menue-Navigation aller 8 Tabs in 3 Viewports).
- 66 tel-Link-Mittelpunkte geprueft (`tel:144`, `tel:+41800336655`, `tel:147`
  × 8 Routen × 3 Viewports, minus Edge-Cases beim Start-Tab).
- Exit-Code 0.

Ergebnis: **0 Failures**. Alle Notfallnummern auf allen Seiten in allen
getesteten Viewports klickbar. R31-Architektur intakt.

### 1.5 Z-Index-Inventar

Lauf: `qa/scripts/z-stack.mjs` gegen Preview.

- 2 Viewports × 3 Routen (start/toolbox/netzwerk), ~5-24 Stacking-Contexts
  pro Seite, 0 Fixed ohne z-index, 0 Anomalien.
- Top-Hierarchie (stabil seit Audit 14):
  ```
  z=200  Skip-Link
  z=150  Site-Header  (erzeugt Context fuer Mobile-Dialog-Subtree)
  z=120  Mobile-Dialog
  z=110  Mobile-Backdrop
  z=100  Persistenz-Banner
  ```

Ergebnis: **0 Anomalien**. Keine Regression seit Audit 14.

### 1.6 Gesamtbild

| Dimension | Befunde | Schwere |
|-----------|--------:|---------|
| axe-core critical | 0 | — |
| axe-core serious | 0 | — |
| axe-core moderate (eindeutige Regeln) | 4 | A11y-Findings zur Triage |
| axe-core minor | 0 | — |
| Heading-Spruenge (>1 Stufe) | 1 | nur Material / Crisis-Plan |
| Mehrfach-H1 | 0 | ✓ |
| Fehlende Labels / unlabelled Inputs | 0 | ✓ |
| Fehlende Alt-Texte | 0 | ✓ |
| Leere Buttons / Links | 0 | ✓ |
| Interaction-Overlaps | 0 | ✓ |
| Klick-Failures (Nav + tel:) | 0 | ✓ |
| Z-Index-Anomalien | 0 | ✓ |
| tel-Link-Reachability | 66/66 | ✓ Notfall-Architektur intakt |

**Positiver Substanz-Befund:** Die Notfall- und Hauptnavigations-Schichten
sind nach Audit 13/14 stabil. Die offenen Findings sind **semantische
Verbesserungen** (Landmark-Hygiene, Heading-Reihenfolge), keine Barrieren
fuer Screen-Reader-Nutzer im Notfall-Flow.

**STOPP nach Phase 1. Warte auf Freigabe.**

---

## Phase 2 – Triage

_(Folgt nach Freigabe von Phase 1.)_

## Phase 3 – Fixes

_(Folgt nach Freigabe von Phase 2.)_

## Phase 4 – Verifikation

_(Folgt nach Phase 3.)_

---

## Anhang A — Script-Artefakte

Neue Scripts in diesem Audit:

- `qa/scripts/a11y-axe.mjs` — WCAG-Auto-Audit (critical/serious-Exit-Code).
- `qa/scripts/a11y-axe-detail.mjs` — Detail-Variante pro Route mit Target-
  Selektoren und HTML-Snippets (diagnostisch).
- `qa/scripts/a11y-heading-tree.mjs` — Heading-Baum + Landmark-Inventar
  (diagnostisch).

Existierende Scripts (Audit 14), unveraendert in ihrer Funktion, minimal
gepatcht fuer `PLAYWRIGHT_CHROMIUM_EXECUTABLE`-Env-Var:

- `qa/scripts/interaction-overlap.mjs`
- `qa/scripts/click-reachability.mjs`
- `qa/scripts/z-stack.mjs`
- `qa/scripts/click-diagnose.mjs`

## Anhang B — Triage-Rohdaten (Phase 1)

### axe — Regel `region` (pro Route ueberall identisch)

Fund-Muster auf jeder Route, zwei Knoten:

```
target: .tracking-\[0\.24em\] > span
html:   <span>Lokale Speicherung im Browser • auf gemeinsam genutzten
        Geraeten nach der Nutzung zuruecksetzen • keine serverseitige
        Falldokumentation in dieser Ansicht</span>
target: .leading-relaxed
html:   <div class="text-sm leading-relaxed text-[var(--text-danger-strong)]">
        (Emergency-Strip "Akute Krise ...")
```

Beide aus `src/App.jsx` (Zeile 132-152 bzw. 154-241).

### axe — Regel `landmark-complementary-is-top-level` (sample)

Auf `lernmodule` ein Befund:

```
target: .ui-split > aside
html:   <aside class="ui-card"><div class="ui-card__body">... (AsideCard)
```

Auf `material` sieben Befunde (je ein `.ui-card--soft`-Aside pro Cluster-
Split-Layout, plus ein Downloads-Aside).

### axe — Regel `landmark-unique` (material)

```
target: #material-handout-mein-notfallplan >
        .ui-material-handout__cross-refs[aria-label="Verwandte Inhalte"]
```

Vier Handout-Sections haben identisch "Verwandte Inhalte" als Aria-Label.

### axe — Regel `heading-order` (material)

```
target: .ui-material-handout__ownership > ... > .ui-material-handout__field-title
html:   <h5 class="ui-material-handout__field-title">Dieser Plan gehört</h5>
```

Kontext: auf `<h3 class="ui-material-handout__title">Mein Notfallplan</h3>`
folgt direkt `<h5>` (Owner-Felder). Es fehlt das `<h4>` zwischen Handout-Titel
und Feld-Labeln. Die spaeteren Felder "Krisenplan" und "Was mir im Alltag
hilft" haben `<h4>`, die Ownership-Felder (Name/Datum/Zuletzt-ueberarbeitet)
aber `<h5>`. Lokalisierter Inconsistenz im Crisis-Plan-Template,
`MaterialHandoutShell`-Handouts sind davon nicht betroffen.
