# Audit 15 — Accessibility + Interaktions-Integrität

**Stand:** 2026-04-21
**Bericht:** Phase 1 (Inventur, read-only)
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

## STOPP

Phase 1 abgeschlossen. Ich warte auf Freigabe für Phase 2 (Triage + Massnahmenkatalog).

### Vorschlag für Phase 2 (zur Diskussion, nicht zur Ausführung)

- **I-1 — Sofort-Fix**: Routenliste in drei qa/scripts von `grundlagen` → `material`; `click-diagnose.mjs` Zielliste ebenfalls aktualisieren. Ein Commit, trivial, aber wichtig.
- **A-1 / A-2 / A-3 — Follow-up-Tickets**: best-practice-Qualität, sauber, aber nicht release-blockierend. Zusammen fassbar oder einzeln.
- **C-1 — Follow-up-Ticket**: entweder Token-Wert anheben oder drei Nutzungen umflaggen.
- **Release-Readiness**: Stufe A (release-ready) empfehlenswert, sobald I-1 behoben ist.

### Nicht fortgeführte Spuren (bewusst)

- Lighthouse: nicht verfügbar. Falls später ein Full Accessibility Score gewünscht ist, manuell in Chrome DevTools laufen lassen — die axe-Abdeckung deckt das inhaltlich bereits ab.
- Tastatur-Durchlauf pro Route: nicht automatisiert getestet. Kein Indiz aus statischer Prüfung auf Defekte, aber menschliche Tab-Tour bleibt empfehlenswert vor dem nächsten Major-Release.

### Artefakte

- `qa/scratch/axe-scan.mjs`, `qa/scratch/axe-detail.mjs`, `qa/scratch/contrast.mjs` — nur für diesen Audit angelegt, stehen als Vorlage bereit. Vor Phase 3 entweder konsolidiert in `qa/scripts/` aufnehmen oder löschen.
