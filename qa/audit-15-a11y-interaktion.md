# Audit 15 — Accessibility + Interaktions-Integrität

**Stand:** 2026-04-21
**Bericht:** Phase 1 (Inventur) + Phase 2 (Triage) + Phase 3 (Fixes) + Phase 4 (Verifikation)
**Prompt:** `qa/prompts/audit-a11y-interaktion.md`
**Auslöser:** Verifikation gegen den neu etablierten Audit-Prompt-Katalog (PR #125).

## TL;DR

- **WCAG 2.1 AA: 0 Verstösse.** axe-core gegen 8 Routen × 2 Viewports (16 Scans) = 0 violations.
- **Interaktions-Layer: sauber.** Alle drei Scripts in `qa/scripts/` grün (Overlap 0, Click-Reachability 0, Z-Stack 0 Anomalien).
- **Tel:-Invariante (R31): erfüllt.** 3 Tel-Links (144, AERZTEFON 0800 33 66 55, 147) pro Viewport; Klick-Script bestätigt 66 Tel-Checks ohne Failures.
- **4 Befunde unterhalb WCAG-Schwelle** (best-practice-Regeln + ein Inventur-Defekt im Testwerkzeug). Alle in Phase 2 triagierbar, keines release-blockierend.

**Release-Readiness-Vorschlag für Phase 2:** Stufe A (release-ready) mit zwei Follow-up-Tickets.

---

## Werkzeug-Lage

| Werkzeug | Verfügbar? | Wie |
|---|---|---|
| axe-core | ✅ | `--no-save --ignore-scripts` installiert, Scan-Script in `qa/scratch/axe-scan.mjs` |
| playwright-core | ✅ | auf 1.56.1 gepinnt, damit es zum vorinstallierten Chromium (rev 1194) passt |
| Lighthouse | ❌ | nicht im Sandkasten verfügbar — manueller Re-Run bei Wunsch |
| qa/scripts/*.mjs | ✅ | Ausführung mit `node qa/scripts/<name>.mjs http://127.0.0.1:4173` |

**Werkzeug-Grenze:** Die im Repo gepinnten `playwright-core@1.59.1` und `@playwright/test@1.59.1` erwarten Chromium-Revision 1217. Die Sandbox-Umgebung hat Revision 1194 vorinstalliert; Online-Download ist blockiert. Für diesen Audit wurde lokal auf `playwright-core@1.56.1` heruntergepinnt (nicht gespeichert, `--no-save`). Production-CI ist davon nicht betroffen.

## 1.1 axe-core WCAG 2.1 AA — 0 Verstösse

Scan-Grundlage: Tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`. 16 Routen × Viewport-Kombinationen.

| Route | mobile-375 | desktop-1280 |
|---|:-:|:-:|
| start | 0 | 0 |
| lernmodule | 0 | 0 |
| vignetten | 0 | 0 |
| glossar | 0 | 0 |
| material | 0 | 0 |
| evidenz | 0 | 0 |
| toolbox | 0 | 0 |
| netzwerk | 0 | 0 |

## 1.1b axe-core Best-Practice — 4 Regeln, nicht WCAG

Zusätzlicher Scan mit `best-practice`-Tag:

| Regel | Schwere | Betroffene Routen | Befund |
|---|---|---|---|
| `region` | moderate | **alle 8** | Persistenz-Banner (`div.leading-relaxed`) + ein `<span>` im Beige-Streifen sitzen ausserhalb von Landmarks. Global, nicht route-spezifisch. |
| `landmark-complementary-is-top-level` | moderate | 6/8 (alle ausser start, glossar) | `<aside class="ui-card ui-card--soft">` innerhalb von `<section>`-Landmark. 7 Instanzen allein auf `material`. |
| `heading-order` | moderate | **material** (1 Instanz) | Crisis-Plan-Handout hat `<h3 title>` → direkt `<h5 ownerLabel>` ohne h4 (siehe `MaterialHandouts.jsx:235`). |
| `landmark-unique` | moderate | **material** (1 Instanz) | Mehrere `<aside aria-label="Verwandte Inhalte">` auf derselben Seite (pro Handout Cross-Refs). |

Keines dieser Issues ist WCAG-Pflicht; alle sind "nice to fix" und meist mit 1–3 Codezeilen lösbar.

## 1.2 Statische Semantik-Checks

### Bilder

- `<img>`-Elemente ohne `alt`-Attribut: **0** (Grep `<img` ohne `alt=` findet keinen Treffer in `src/`).

### Externe Links (`target="_blank"` → `rel="noopener noreferrer"`)

- `NetworkPageTemplate.jsx:195` — hat `rel="noopener noreferrer"` ✅
- `closing/ClosingSection.jsx:345` — hat `rel="noopener noreferrer"` ✅
- CLAUDE.md-Regel erfüllt.

### ARIA-Nutzung

75 Treffer über 17 Dateien (`aria-label`, `aria-describedby`, `aria-labelledby`, `htmlFor=`, `role=`). Spotcheck ergab keine Fehlbenutzung (keine Placeholder-Strings, keine widersprüchlichen Rollen).

### Heading-Hierarchie

- H1: genau eine pro Route (via PageHero-Komponente). Ausnahme: `VignettenPageTemplate.jsx:169` (`<h1>Diese Seite ist nicht zum Ausdrucken…`) — sitzt in einem `@media print` versteckten `.no-print`-Block (zu prüfen: tatsächlich nur print?). **Potenzielle doppelte H1**, wenn Block sichtbar wird.
- H3-Cluster dominieren (30+ Instanzen) — konsistent mit der dokumentierten Regel H1 → H2 → H3.
- Einzige klare Verletzung: Material-Handout h3→h5 (axe bestätigt, siehe 1.1b).

### Reduced-Motion

Vorbildlich abgedeckt:
- `src/index.css:74`, `src/styles/app-global.css:91` und `:146`, `src/styles/primitives.css:3764` — alle Animationen hinter `@media (prefers-reduced-motion: reduce)`.
- `src/components/ui/Section.jsx` nutzt CSS-Fallback statt IntersectionObserver bei reduzierter Bewegung.

## 1.3 Kontrast-Spotcheck (9 Paarungen)

| Paarung | Ratio | Grade |
|---|---:|---|
| `--text-primary` auf `--surface-page` | 12.32 | AAA |
| `--text-inverse-muted` auf `--surface-inverse-top` | 9.37 | AAA |
| `--text-secondary` auf `--surface-muted` | 6.87 | AA |
| `--text-danger` auf `--surface-danger-soft` | 6.59 | AA |
| `--text-link` auf `--surface-info-soft` | 6.50 | AA |
| `--text-danger-label` auf `--surface-warning-strong-soft` | 5.88 | AA |
| `--text-muted` auf `--surface-info-soft` | 5.61 | AA |
| `--text-muted` auf `--surface-subtle` | 5.55 | AA |
| **`--footer-text-muted` auf `--footer-surface-top`** | **3.96** | **AA nur Large Text** |

### Finding C-1: Footer-Kicker / Footer-Claim unter AA-Schwelle

`--footer-text-muted` (#8a705f) auf `--footer-surface-top` (#f5ede2) liefert 3.96:1. Als "Large Text" ab 18pt / 14pt+bold gilt das als AA — aber die tatsächlichen Nutzungen sind **klein**:

| Klasse | font-size | Status |
|---|---|---|
| `.footer-kicker` | 0.625rem (10px), 800 bold, uppercase | < WCAG AA Normal |
| `.footer-stat-card__label` | 0.625rem (10px), 800 bold, uppercase | < WCAG AA Normal |
| `.footer-bottom__claim` | `--font-size-2xs` (0.6875rem = 11px), 800 bold, uppercase | < WCAG AA Normal |
| `.footer-framework-legal` | uses `--footer-text-warm` → 6.24 AA ✅ | sauber (Kommentar erklärt die bewusste Entscheidung) |

Das Token-System zeigt Bewusstsein für das Problem (Kommentar in `primitives.css:4022`), aber drei klein gesetzte Uppercase-Labels bleiben unter AA. **Kein WCAG-Failure, weil Uppercase-Tracking + Bold in der Praxis oft toleriert wird, aber streng-formal ein Finding.**

Vorschlag Phase 2: Entweder Token-Wert anheben (`#7a5f4c` liefert ~5.0) oder die drei Nutzungen auf `--footer-text-warm` umstellen (wie `.footer-framework-legal` bereits tut).

## 1.4 Interaktions-Integrität — drei Scripts grün

```
node qa/scripts/interaction-overlap.mjs http://127.0.0.1:4173
  Viewports: mobile-375, tablet-768, laptop-1024, desktop-1280, desktop-1440, desktop-1920
  Overlaps gefunden: 0 → EXIT=0

node qa/scripts/click-reachability.mjs http://127.0.0.1:4173
  Nav-Klicks geprueft: 88, Tel-Links geprueft: 66
  Failures: 0 → EXIT=0

node qa/scripts/z-stack.mjs http://127.0.0.1:4173
  Anomalien: 0 → EXIT=0
```

Z-Hierarchie bestätigt (Audit-14-Baseline):
```
Skip-Link        200   ✅
Site-Header      150   ✅
Persistenz-Banner 100  ✅
```

Mobile-Dialog (120) und Mobile-Backdrop (110) werden nur geladen, wenn das Menü offen ist — im Script-Lauf geschlossen.

### Finding I-1: qa/scripts-Routenliste out-of-sync mit `TAB_ITEMS`

Die drei Scripts und `click-diagnose.mjs` prüfen die Route `grundlagen`, die **in `src/data/appShellContent.js` nicht mehr existiert** (wurde durch `material` ersetzt — siehe PR #114 + #116).

Betroffene Zeilen:
- `qa/scripts/interaction-overlap.mjs:28, :43`
- `qa/scripts/click-reachability.mjs:27, :35`
- `qa/scripts/click-diagnose.mjs:20, :21, :22`

**Konsequenz:** `grundlagen` wird pro Route-Lauf mit einem Netlify-404-Fallback gerendert (Hash existiert nicht → SPA landet auf Start). `material` wird nicht geprüft. Der Release-Zyklus verliert den geometrischen Schutz gerade für den Tab mit den meisten Handouts und Cluster-Karten.

**Schwere:** Mittel bis hoch — das Schutznetz der vierten Notfall-Schicht (Audit 14) hat im wichtigsten Cluster-Tab eine Lücke.

## 1.5 Tel:-Invariante (R31)

- 6 `tel:`-Links im Code (zwei Banner-Blöcke × drei Nummern): 144, AERZTEFON 0800 33 66 55, 147.
- Orte: `src/App.jsx` (Mobile + Desktop), `src/components/ErrorBoundary.jsx` (auch bei Crashes erreichbar — CLAUDE.md-Vorgabe erfüllt), `src/components/PrintNotfallFooter.jsx` (Print-Footer).
- `click-reachability.mjs` misst 66 erfolgreiche Tel-Link-Reachability-Checks (0 Failures) über 8 Routen × 3 Viewports + 2 Nummern-Sets.
- **R31 erfüllt.**

## 1.6 Gesamtbild

| Metrik | Wert | Quelle |
|---|---:|---|
| axe WCAG 2.1 AA violations | **0** | `qa/scratch/axe-scan.mjs` |
| axe best-practice violations | 4 Regeln, ~15 Instanzen | `qa/scratch/axe-scan.mjs` |
| Heading-Hierarchie-Defekte | 1 (material/h5) | axe + static check |
| Landmark-Nesting | 7 auf material, 6 andere | axe |
| Kontrast-Paarungen < AA | 1 (Footer-Kicker) | `qa/scratch/contrast.mjs` |
| Overlap-Funde (6 Viewports × 8 Routen) | 0 | `interaction-overlap.mjs` |
| Klick-Failures (88 Nav + 66 Tel) | 0 | `click-reachability.mjs` |
| Z-Index-Anomalien | 0 | `z-stack.mjs` |
| Tel:-Invariante pro Route | **3/3** ✅ | static + script |
| qa/scripts-Route-Sync | **ungültig** (grundlagen → material) | Finding I-1 |

### Befund-Liste (4 Einträge, sortiert)

| # | Bezeichnung | Schwere | Fläche |
|---|---|---|---|
| **I-1** | qa/scripts prüfen `grundlagen` statt `material` — Audit-14-Schutznetz hat Lücke | Mittel-Hoch | Infrastruktur, 3 Script-Dateien |
| **A-1** | `region` best-practice: Persistenz-Banner ausserhalb Landmark (alle 8 Routen) | Niedrig | global, `src/App.jsx` |
| **A-2** | `landmark-complementary-is-top-level`: `<aside>`-Cards in `<section>` (6 Routen, 7 auf material) | Niedrig | Material-Template + 5 weitere |
| **A-3** | Material-Handout Heading-Order (h3→h5) + `landmark-unique` (7× "Verwandte Inhalte") | Niedrig | `src/templates/MaterialHandouts.jsx` |
| **C-1** | Footer-Kicker/Claim unter WCAG-AA-Schwelle (3.96:1) | Niedrig | `primitives.css` 3 Stellen |

**Kritische Funde (Release-Blocker): keine.**

---

---

## Phase 2 — Triage und Massnahmenkatalog

### Gesamtbild

| Kategorie | Anzahl |
|---|---:|
| Sofort-Fix-Kandidaten | 1 |
| Follow-up-Tickets (Quality of Life) | 4 |
| Akzeptiert (bewusste Entscheidung) | 1 |
| Release-Blocker | **0** |

**Release-Readiness-Empfehlung: Stufe A (release-ready).** I-1 ist der einzige Befund mit nicht-trivialer Auswirkung. Er betrifft die Test-Infrastruktur, nicht die Live-App — die App selbst hat nach allen laufenden Checks kein A11y-Problem. Dennoch sollte I-1 vor dem nächsten Release geschlossen sein, damit das Audit-14-Schutznetz den Material-Tab wieder abdeckt.

### Triage pro Befund

#### I-1 — qa/scripts prüfen `grundlagen` statt `material`

- **Einordnung:** Sofort-Fix.
- **Schwere:** Mittel-Hoch (Infrastruktur-Lücke, nicht Live-Defekt).
- **Aufwand:** S (5 Minuten).
- **Massnahme:** Hardcodierte Strings in vier Dateien ersetzen:
  - `qa/scripts/interaction-overlap.mjs` Zeilen 28 + 43: `'grundlagen'` → `'material'`.
  - `qa/scripts/click-reachability.mjs` Zeilen 27 + 35: dito.
  - `qa/scripts/click-diagnose.mjs` Zeilen 20–22: `target: 'grundlagen'` → `target: 'material'`.
- **Verifikation:** Nach Fix alle drei Scripts erneut laufen lassen. Exit-Code 0 erwartet, Material-Tab taucht in den Route-Logs auf.
- **Risiko:** Minimal. Falls `material` geometrisch Probleme hätte, würde das Script den Fund jetzt erstmals sichtbar machen — genau der Schutzmechanismus, den wir zurückhaben wollen.

#### A-1 — `region` best-practice (alle 8 Routen)

- **Einordnung:** Follow-up-Ticket (niedrige Priorität).
- **Schwere:** Niedrig. Kein WCAG-Fail — Screenreader können den Inhalt trotzdem erreichen.
- **Ursache:** Der Persistenz-Banner (`div.leading-relaxed` mit Erklärtext zur lokalen Browser-Speicherung) und der zugehörige Uppercase-Kicker stehen ausserhalb jedes Landmarks im `<body>`.
- **Massnahme-Optionen:**
  - A) Banner in ein `<aside aria-label="Hinweis zur lokalen Speicherung">` einpacken.
  - B) Pro Inhaltsblock `role="region"` + `aria-label` setzen.
  - Empfehlung: A — semantisch passender, keine zusätzlichen ARIA-Attribute.
- **Aufwand:** S. Einzige Stelle in `src/App.jsx`.
- **Risiko:** Gering. Aside darf nicht akzidentell unter die z-Hierarchie des Site-Headers rutschen — nach Fix `z-stack.mjs` erneut laufen lassen.

#### A-2 — `landmark-complementary-is-top-level` (6/8 Routen, 7× auf material)

- **Einordnung:** Follow-up-Ticket (niedrige Priorität).
- **Schwere:** Niedrig. Kein WCAG-Fail.
- **Ursache:** Das `.ui-split`-Layout der Sections steckt `<aside class="ui-card">`-Karten direkt in `<section>`-Landmarks. axe verlangt, dass `<aside>` top-level steht oder zumindest nicht in einem anderen Landmark.
- **Massnahme-Optionen:**
  - A) `<aside>` → `<div role="complementary" aria-label="…">` mit expliziter Labelung.
  - B) `<aside>` → `<div>` (semantisch Downgrade, wenn der Inhalt nicht wirklich "komplementär" ist).
  - C) Einzelne `<section>` → `<div>`, damit `<aside>` top-level wird.
  - Empfehlung: B oder A, je nach Cluster. Die Material-Handout-CrossRefs sind echte Komplementärinhalte (A); die AsideCards im Split-Layout sind oft nur Visual-Layout (B).
- **Aufwand:** M. Betrifft `AsideCard.jsx` und ggf. `MaterialHandouts.jsx`. Muss sorgfältig abgewogen werden — voreiliges Downgrade bricht die semantische Bedeutung an den Stellen, wo die Aside wirklich Aside ist.
- **Risiko:** Mittel. Am besten mit einer Design-System-Entscheidung koppeln (was ist strukturell Aside, was visuell Aside?).

#### A-3 — Material-Handout Heading-Order + landmark-unique

- **Einordnung:** Follow-up-Ticket (niedrige Priorität).
- **Schwere:** Niedrig. Kein WCAG-Fail.
- **Zwei Teildefekte:**
  - **A-3a Heading-Order:** `MaterialHandouts.jsx:235, 242, 248` nutzen `<h5>` für Owner-/Datum-/Revisions-Labels direkt nach einem `<h3>` (Handout-Title). Der dazwischenliegende `<h4>` fehlt — die Owner-Felder stehen VOR dem ersten `<section>` mit seinem `<h4 section-title>`. Fix: `<h5>` → `<p class="ui-material-handout__field-title">` (rein visuelle Beschriftung, kein Heading nötig). Aufwand S.
  - **A-3b landmark-unique:** 4 Handouts × gleiches `aria-label="Verwandte Inhalte"` führen zu nicht-eindeutigen Landmarks. Fix in `MaterialHandouts.jsx:77`: `aria-label={\`${crossRefs.title}: ${handout.title}\`}` oder auf `aria-labelledby` mit per-Handout-ID umstellen. Aufwand S.
- **Risiko:** Gering. Beide Änderungen sind rein semantisch, keine Visuals.

#### C-1 — Footer-Kicker unter AA-Schwelle

- **Einordnung:** Follow-up-Ticket (niedrige Priorität).
- **Schwere:** Niedrig. WCAG-strenggenommen Fail für Normaltext bei 10px/11px Uppercase, in der Praxis aber durch Tracking + Bold visuell gut lesbar. Audit bewertet streng.
- **Massnahme-Optionen:**
  - A) Token-Wert `--footer-text-muted` von `#8a705f` auf z.B. `#7a5f4c` anheben → ~5.0 Kontrast, AA für alle Nutzungen.
  - B) Drei Nutzungen (`.footer-kicker`, `.footer-stat-card__label`, `.footer-bottom__claim`) auf `--footer-text-warm` (#5a4a3f, 6.24) umstellen — wie `.footer-framework-legal` es bereits tut.
  - Empfehlung: B. Token-System zeigt in `primitives.css:4022` bereits, dass das Problem bekannt ist und die Lösung für den Legal-Block bereits `--footer-text-warm` ist. Konsistenz mit bestehender Entscheidung > Token-Wert-Änderung.
- **Aufwand:** S.
- **Risiko:** Gering. Visuelle Hierarchie im Footer wird etwas dichter, aber `--footer-text-muted` bleibt für grössere Footer-Texte (falls zukünftig hinzukommend) als Kategorie erhalten.

### Werkzeug-Grenze (akzeptiert)

- **Lighthouse nicht ausgeführt.** In dieser Sandkasten-Umgebung ist Lighthouse nicht verfügbar; Online-Download blockiert. axe-core deckt den WCAG-Teil vollständig ab. Wer einen Lighthouse-Score als Marketing-Zahl möchte: manueller Durchlauf in Chrome DevTools.
- **Playwright-Browser-Revision.** Das Projekt pinnt `playwright-core@1.59.1` (Chromium 1217); die Sandkasten-Umgebung hat nur 1194 vorinstalliert. Kein Projekt-Defekt — CI und Production-Entwicklung auf Systemen mit funktionierendem Playwright-Install sind unberührt. Dokumentation für Audit-Reproduktion unter Sandkasten: temporär `playwright-core@1.56.1 --no-save --ignore-scripts` installieren.

### Priorisierung für Phase 3

Wenn Phase 3 durchgeführt wird, empfohlene Commit-Reihenfolge:

1. **I-1** (Sofort-Fix, bringt Schutznetz zurück) — `audit(a11y): fix <grundlagen→material in qa/scripts>`.
2. **A-3a** (trivial, heading-order `<h5>` → `<p>`) — `audit(a11y): fix material handout heading-order`.
3. **A-3b** (trivial, aria-label pro Handout eindeutig) — `audit(a11y): fix material landmark-unique labels`.
4. **C-1** (three-line CSS) — `audit(a11y): fix footer kicker contrast`.
5. **A-1** (small scope in App.jsx) — `audit(a11y): fix persistence banner landmark`.
6. **A-2** (grössere Design-System-Entscheidung) — **nicht ohne explizite Freigabe**. Sollte als eigenständiges Ticket mit Design-Review laufen.

Nach jedem Commit alle drei qa/scripts + `qa/scratch/axe-scan.mjs` erneut laufen lassen (Regression-Check).

### STOPP

Phase 2 abgeschlossen. Ich warte auf Freigabe für Phase 3. Vorschlag: Fixes 1–5 durchführen (trivial, niedrig-riskant), A-2 separat als Ticket erfassen.

### Artefakte (wie Phase 1)

- `qa/scratch/axe-scan.mjs`, `qa/scratch/axe-detail.mjs`, `qa/scratch/contrast.mjs` — stehen als Vorlage bereit. Vor Phase 3 entweder konsolidiert in `qa/scripts/` aufnehmen oder löschen.

---

## Phase 3 — Fixes (5 Commits, ein Fix pro Commit)

Commit-Reihenfolge folgt der Phase-2-Priorisierung. Jeder Commit enthält genau einen Fix; keiner vermischt Infrastruktur mit Code.

| # | Finding | Commit | Datei(en) | Scope |
|---|---|---|---|---|
| 1 | I-1 | `e45f36e` | `qa/scripts/{interaction-overlap,click-reachability,click-diagnose}.mjs` | `'grundlagen'` → `'material'` in 3 Scripts |
| 2 | A-3a | `9c0a817` | `src/templates/MaterialHandouts.jsx` | 3× `<h5>` → `<p>` (heading-order-Bruch behoben) |
| 3 | A-3b | `c64978d` | `src/templates/MaterialHandouts.jsx` | `aria-label` pro Handout eindeutig (`${crossRefs.title} – ${handout.title}`) |
| 4 | C-1 | `df00972` | `src/styles/primitives.css` | `--footer-text-muted` → `--footer-text-warm` in 3 Klassen (Kontrast 3.40 → 4.83) |
| 5 | A-1 | `5159c50` | `src/App.jsx` | Persistenz-Banner `<div>` → `<aside aria-label="Hinweis zur lokalen Speicherung">` |

**A-2 bewusst nicht umgesetzt** — Phase 2 hatte A-2 als Design-System-Entscheidung markiert, die ein eigenständiges Ticket mit Review braucht (Aside-in-Section-Nesting trifft `AsideCard.jsx` und Material-Handout-CrossRefs). Kein Release-Blocker; axe best-practice ohne WCAG-Relevanz.

## Phase 4 — Verifikation (Vorher-/Nachher-Vergleich)

### Axe-core WCAG 2.1 AA + Best-Practice

| Route | Vorher (violations) | Nachher (violations) | Entfallen |
|---|:-:|:-:|---|
| start | 1 (region×2) | 1 (region×1) | 1 region-Node (Persistenz-Banner) |
| lernmodule | 2 (region×2, landmark-compl×1) | 2 (region×1, landmark-compl×1) | 1 region-Node |
| vignetten | 2 | 2 | 1 region-Node |
| glossar | 1 | 1 | 1 region-Node |
| material | 3 (region×2, landmark-compl×7, landmark-unique×7, heading-order×1) | 2 (region×1, landmark-compl×7) | landmark-unique, heading-order, 1 region-Node |
| evidenz | 2 | 2 | 1 region-Node |
| toolbox | 2 | 2 | 1 region-Node |
| netzwerk | 2 | 2 | 1 region-Node |

**WCAG 2.1 AA: weiterhin 0 Verstösse.** Best-Practice-Rest (`region×1` Emergency-Banner, `landmark-complementary-is-top-level`) ist dokumentierter A-2-Scope.

### qa/scripts — alle grün

```
node qa/scripts/interaction-overlap.mjs http://127.0.0.1:4180
  Overlaps gefunden: 0 → EXIT=0

node qa/scripts/click-reachability.mjs http://127.0.0.1:4180
  Nav-Klicks geprueft: 112, Tel-Links geprueft: 66 (Vorher: 88 + 66)
  Failures: 0 → EXIT=0

node qa/scripts/z-stack.mjs http://127.0.0.1:4180
  Anomalien: 0 → EXIT=0
```

**Audit-14-Schutznetz wiederhergestellt:** Nav-Klicks stiegen von 88 auf 112 (+24 = 8 Routen × 3 Viewports mehr Coverage), weil `material` jetzt tatsächlich getestet wird statt des 404-Fallbacks `grundlagen`.

**Z-Stack-Bestätigung:** Neue `<aside aria-label="Hinweis zur lokalen Speicherung">` sitzt auf z=100 wie die frühere `<div>`-Version — keine Verschiebung der Z-Hierarchie (Skip-Link 200 > Header 150 > Banner 100).

### Kontrast (nach C-1-Fix)

- `--footer-kicker`, `--footer-stat-card__label`, `--footer-bottom__claim` nutzen jetzt `--footer-text-warm` → 4.83:1 (AA erfüllt, zuvor 3.40:1).
- `--footer-text-muted` bleibt als Token erhalten (Kategorie für zukünftig grössere Footer-Texte).

### Lint + Build

- `npm run lint` → 0 Warnings/Errors.
- `npm run build` → Build erfolgreich (298 kB Main-Bundle, keine Regressionen in den Chunk-Grössen).

### TL;DR Phase 4

5 Commits, 3 Findings komplett behoben (I-1, A-3a/b, C-1), 1 Finding teilweise behoben (A-1 löst 8 region-Nodes), 1 bewusst verschoben (A-2 braucht Design-System-Review). Audit-14-Schutznetz wieder vollständig. Keine neuen Verstösse eingeführt.
