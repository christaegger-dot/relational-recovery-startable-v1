# Audit-Prompt — Accessibility + Interaktions-Integrität

**Einsatz:** Vor Release oder nach grösseren Layout-/Navigations-Änderungen.

**Was es findet:** WCAG-Verstösse, fehlende Labels, Kontrast-Probleme, kaputte
Tastatur-Navigation, überlagerte Klick-Ziele (Audit-14-Klasse).

**Bauzeit-Hinweis:** Die geometrischen Interaktions-Scripts sind **bereits
permanent im Repo** (`qa/scripts/`) — NICHT neu erstellen, nur laufen lassen.

---

```
# Audit: Accessibility und Interaktions-Integritaet

## Kontext

Du pruefst das Relational-Recovery-Fachportal (Schweizer Fachportal, de-CH)
systematisch auf Barrierefreiheit und interaktive Integritaet. Das schliesst
klassische WCAG-Pruefungen ein und eine Klasse von Defekten, die statische
Pruefer nicht finden: Elemente, die sich gegenseitig ueberlagern und Klicks
auf das falsche Ziel leiten.

Die vierte Schicht der Notfall-Architektur (Audit 14) ist bereits installiert:
`qa/scripts/interaction-overlap.mjs`, `qa/scripts/click-reachability.mjs`,
`qa/scripts/z-stack.mjs`, `qa/scripts/click-diagnose.mjs`. Diese Scripts
werden wiederverwendet — nicht neu angelegt.

## Constraints

- Arbeitsbranch: der aktuelle Session-Branch (nicht zwingend `audit/*`).
- Bericht: `qa/audit-<nnn>-a11y-interaktion.md` (naechste freie Nummer ab 15).
- Keine Code-Aenderungen in Phase 1 und 2.
- Schweizer Orthografie (`ss` statt `ß`) ist verbindlich.
- Barrierefreiheits-Substanz wird nie reduziert, nur ergaenzt.
- Notfallnummern (144, AERZTEFON, 147) muessen immer erreichbar sein — dieser
  Check ist nicht verhandelbar (siehe `CLAUDE.md`).

## Routen

Die App hat 8 Hash-Routen. Pruefe alle, nicht nur Stichproben:
`#start`, `#lernmodule`, `#vignetten`, `#glossar`, `#material`, `#evidenz`,
`#toolbox`, `#netzwerk`.

## Phase 1 — Inventur (read-only)

### 1.1 Automatisierte Pruefung

Starte Preview-Server im Hintergrund (`npm run build && npm run preview`,
Port 4173). Dann:

- Falls `pa11y` oder `@axe-core/cli` via `npx` verfuegbar: alle 8 Routen
  durchlaufen, Befunde nach Schwere gruppieren.
- Falls nicht verfuegbar: statische Pruefung ueber Grep/Read gegen JSX-Dateien
  (Labels, alt-Text, aria-*) und manuelle Heuristiken. Dokumentiere das als
  Werkzeug-Grenze — KEIN `npm install` ohne Freigabe.
- Lighthouse ist in dieser Umgebung nicht zwingend verfuegbar. Falls nicht,
  markiere den Block als "manuell nachzureichen" und ueberspringe.

### 1.2 Statische Semantik-Checks (read-only, per Grep/Read)

Pro Route die zugehoerige Section-/Template-Komponente pruefen:

- **Heading-Hierarchie**: Gibt es Spruenge (h1 → h3)? Mehrfache h1?
  Beachten: im Material-Tab gilt die dokumentierte Regel
  H1 Page → H2 Block → H3 Cluster (siehe CLAUDE.md "Material-Cluster").
- **Landmark-Struktur**: `<main>`, `<nav>`, `<header>`, `<footer>` vorhanden?
- **Bilder**: Jeder `<img>` mit `alt`-Attribut? Dekorative Bilder `alt=""`?
- **Links und Buttons**: kein leerer Text, kein `<button>` ohne Label,
  kein `<a>` ohne `href` oder mit `href="#"` als Pseudo-Button.
- **Formulare**: Inputs mit zugehoerigem `<label>` (htmlFor / id-Paar) oder
  `aria-label`.
- **Tastatur**: alle interaktiven Elemente Tab-erreichbar? Esc schliesst
  Modals (Mobile-Menue, Dialog-Varianten)?
- **Reduced-Motion**: gepruefte Komponenten respektieren
  `prefers-reduced-motion` (siehe CLAUDE.md).

### 1.3 Kontrast-Spotcheck

Anstatt blind durch alle Stellen zu gehen:

- Ziehe `src/styles/tokens.css`. Dort sind Kontrast-Zusagen kommentiert
  (z.B. "AA+ on --surface-page", "target AA"). Pruefe 5 Paarungen, die
  besonders risikoreich sind: `--text-muted` auf `--surface-subtle`,
  `--text-link` auf `--surface-info-soft`, Disabled-States, Badges,
  `--text-inverse-muted` auf `--surface-inverse-*`.
- Jede Paarung: berechneter Kontrast-Wert, WCAG-Level (AA/AAA/fail).

### 1.4 Interaktions-Overlap + Klick-Erreichbarkeit

Lass die bestehenden Scripts laufen (Preview muss aktiv sein):

```
node qa/scripts/interaction-overlap.mjs http://127.0.0.1:4173
node qa/scripts/click-reachability.mjs http://127.0.0.1:4173
node qa/scripts/z-stack.mjs http://127.0.0.1:4173
```

Dokumentiere:
- Exit-Codes (0 = sauber, 1 = kritisch/hoch).
- Overlap-Funde nach Viewport.
- Klick-Failures nach Route.
- Z-Index-Anomalien (bekannte Baseline: Skip 200, Header 150, Dialog 120,
  Backdrop 110, Persistenz 100 — siehe `qa/scripts/README.md`).

Falls ein neuer Failure-Typ auftaucht: `click-diagnose.mjs` mit angepassten
`SCENARIOS` einsetzen (Phase-2-Tool) — nicht in Phase 1 aendern, nur dokumentieren.

### 1.5 tel:-Link-Invariante (R31)

Pro Route muessen drei `tel:`-Links sichtbar und klickbar bleiben:
144, AERZTEFON (0800 33 66 55), 147. Das Script `click-reachability.mjs`
deckt das bereits ab — im Bericht die konkrete Zahl pro Route aufnehmen.

### 1.6 Gesamtbild

Tabelle in den Bericht:
- Pa11y/axe-Funde pro Route (oder "n.v.")
- Heading-Spruenge, fehlende Labels, Kontrast-Risiken
- Overlap-Funde nach Viewport
- Klick-Failures
- Z-Index-Anomalien
- tel:-Invariante pro Route (Soll: je 3)

**STOPP.** Fasse Phase 1 in 5-10 Zeilen zusammen und warte auf Freigabe.

## Phase 2 — Triage

Pro Befund einordnen als:
- **Sofort-Fix**: klein, klar, A11y-relevant → Kandidat fuer Phase 3.
- **Follow-up-Ticket**: substantiell, nicht release-blockierend.
- **Akzeptiert**: bewusste Design-Entscheidung, im Bericht begruendet.

Release-Readiness-Aussage mit Stufe A (release-ready), B (mit Caveats),
C (blockiert).

**STOPP.** Warte auf Freigabe fuer Phase 3.

## Phase 3 — Fixes (nur nach Freigabe)

Pro Fix ein eigener Commit. Commit-Pattern: `audit(a11y): fix <was>`.
Nach jedem Fix die drei Scripts erneut laufen lassen. Bei Regression:
Fix revertieren, Befund dokumentieren, keine "Notnagel"-Hotfixes.

## Phase 4 — Verifikation

- `npm run lint` + `npm run build` sauber.
- Lighthouse/Pa11y-Re-Run falls in Phase 1 verfuegbar.
- Alle drei qa/scripts gruen (Exit-Code 0).
- Finale Release-Readiness-Aussage im Bericht.
- PR-Body enthaelt Vorher/Nachher-Tabelle.
```
