# Audit 25 — Visual Polish Options (Follow-up zu Audit 24)

**Datum:** 2026-04-21
**Branch:** `claude/audit-25-visual-polish-options`
**Scope:** Nach dem Clean Bill von Audit 24 explizite Suche nach **Optimierungs-Optionen** (nicht Defekten), die die visuelle Wirkung merklich heben wuerden. Methode: erneute Screenshot-Durchsicht (40+ Bilder aus Audit 24) + Token-Review mit der Frage „wo ist noch Luft nach oben?" statt „wo ist etwas kaputt?".

## Warum dieser Audit

Ein Clean Bill bedeutet „nichts zu reparieren", nicht „nichts zu gewinnen". Fuer ein Fachportal, das primaer ueber visuelle Glaubwuerdigkeit gelesen wird, lohnt sich eine separate Optionen-Liste: so wird transparent, welche Verbesserungen als bewusste Trade-offs offen liegen, welche als Pre-Release-Sprint machbar waeren und welche Post-Launch-Iteration sind.

## Methode

- Re-Review der Audit-24-Screenshots mit Fokus „was wirkt generisch / was wirkt unverdichtet / was koennte eine Stufe editorialer werden?"
- Token-Diff gegen Zielbild „redaktionelles Fachportal mit Magazin-Anmutung".
- Jeder Befund als **Option** (nicht „Finding"): Status quo, Hebel, Aufwand, Risiko.
- Ranking ueber Impact × Aufwand × Risiko am Ende.

## Options-Katalog

### Typografie

**O1 — Webfont-Self-Hosting (Manrope + Source Serif 4)**
- Status quo: In `tokens.css` deklariert, aber nicht via `@font-face` geladen. Browser faellt auf Georgia (Serif) + system-ui (Sans) zurueck. Audit-16-Trade-off zu Performance.
- Hebel: Source Serif 4 hat deutlich feineres Italic + hoehere Display-Qualitaet als Georgia; Manrope wirkt moderner, konsistenter ueber Windows/macOS/Linux. Direkter Hebel auf das Signature-Element „dunkelbraunes Roman + rotes Italic".
- Aufwand: M. `woff2`-Self-Hosting mit `font-display: swap`, `preload` nur fuer den Hero-Cut (Source Serif 4 Italic + Regular), Subsetting auf Latin. ~40–80kb zusaetzlich.
- Risiko: LCP auf langsamen Verbindungen. Mit `swap` + Preload und guter Fallback-Metric kompensierbar.

**O2 — Stats-Numerals in Serif mit tabular+lining figures**
- Status quo: `.ui-fact-card__value` erbt Sans-Serif, `font-weight: 800`. Zahlen „3", „19" wirken eher „UI-Metric" als redaktional.
- Hebel: `font-family: var(--font-heading)`, `font-variant-numeric: tabular-nums lining-nums`, Weight auf 500–600 runter. Zahlen werden Teil der Magazin-Anmutung.
- Aufwand: S. Eine CSS-Regel in `primitives.css`.
- Risiko: Niedrig. Nur visuell, kein Layout-Shift bei tabular-nums.

**O3 — Body-Copy in Serif fuer textdichte Tabs**
- Status quo: Globale Body-Font = Sans. Evidenz- und Glossar-Tab haben laengere Fliesstexte, die eine Serif-Lese-Erfahrung tragen wuerden.
- Hebel: `.evidenz-reading`, `.glossar-definition` o. ae. als opt-in-Klassen mit `font-family: var(--font-heading)`, `font-size: 1.0625rem`, `line-height: var(--line-height-copy)`. Unterstreicht „Fachportal"-Charakter.
- Aufwand: M. Editorial-Entscheidung + Lesbarkeits-Check auf Mobile (Serif auf 16px-Body braucht saubere Font-Metrics — setzt de facto O1 voraus).
- Risiko: Mittel ohne O1 (Georgia auf laengerem Body ermuedet manche Leser). Mit O1 niedrig.

### Farbe / Akzent

**O4 — Tab-spezifische Akzentfarben im Hero-Italic**
- Status quo: Alle Tabs nutzen `--accent-primary #d24136` fuer den Italic-Accent der H1. Wiederholt ueber 8 Tabs → homogen, aber auch etwas uniform.
- Hebel: Pro Tab eine eigene (existierende) Accent-Farbe aus der Palette: Start = `--accent-primary`, Lernmodule = `--accent-info-strong #1e656d`, Evidenz = `--accent-info-strong`, Toolbox = `--accent-warning #eb8a3e`, Vignetten = `--accent-primary-strong #8d3f32`, Glossar = `--accent-secondary` (abgedunkelt, da Sage sonst zu blass), Material = `--accent-primary-strong`, Netzwerk = `--accent-info-strong`. Jeder Tab bekommt visuelle Identitaet, Gesamtsystem bleibt harmonisch (alle Farben sind schon im Token-System).
- Aufwand: S–M. `PageHero.jsx` erhaelt einen optionalen `accentColor`-Prop; 8 Section-Templates setzen ihn.
- Risiko: Mittel. Redaktionelle Entscheidung, ob mehr Differenzierung oder mehr Einheit gewollt ist. AA-Kontrast muss je Farbe auf `--surface-page` geprueft werden (`#1e656d` → OK, `#eb8a3e` → grenzwertig, evtl. abdunkeln).

**O5 — `--surface-accent-soft` (#f1f3ce) als Tertiaer-Flaeche aktivieren**
- Status quo: Im Token-System mit Usage-Hinweis deklariert, aber in den Screenshots kaum sichtbar eingesetzt.
- Hebel: Als Background fuer ausgewaehlte AsideCards (z. B. „WICHTIGER HINWEIS" auf Start) oder Kicker-Sektionen. Setzt einen zweiten warmen Ton neben Creme + Braun, ohne die Palette zu oeffnen.
- Aufwand: S.
- Risiko: Niedrig. Farbe ist schon kuratiert.

### Komposition / Layout

**O6 — Per-Tab Hero-Illustrationen (statt 1× auf Start)**
- Status quo: Nur Start hat eine Custom-Illustration (Figuren-Gruppe). Alle anderen 7 Tabs haben eine Textkarte statt Bild in der Aside-Spalte.
- Hebel: Jeder Tab erhaelt eine eigene, stilkonsistente SVG-Illustration (z. B. Toolbox → stilisierte Werkzeug-Silhouette in Erdtoenen, Netzwerk → Knotennetz, Evidenz → Buch/Papier). Hebt die Seite aus „Content-Site" in „editoriales Portal".
- Aufwand: L. Design-Arbeit fuer 7 Illustrationen. SVG-Einbindung selbst ist trivial.
- Risiko: Mittel. Qualitativ nur so gut wie die Illustrationen selbst — schwache Assets schaden mehr, als sie nuetzen. Setzt ein konsistentes Illustrator-Briefing voraus.

**O7 — Rechte Hero-Spalte als redaktionelle Marginalie**
- Status quo: AsideCard in Hero enthaelt meist eine Disclaimer-Card oder Kontext-Card.
- Hebel: Zusaetzlich oder ersetzend ein kurzes Zitat, eine Randnotiz oder eine „Woran Sie erkennen, dass Sie hier richtig sind"-Mini-Liste. Kleine Typografie (`--font-size-sm`), viel Luft, Serif-Italic. Das macht den Hero wie eine Magazinseite lesbar.
- Aufwand: M. Redaktionell pro Tab.
- Risiko: Niedrig–Mittel. Redaktioneller Aufwand, kein technisches Risiko.

**O8 — PageHero-Layout-Varianten (2–3 Templates)**
- Status quo: Alle 8 Tabs nutzen dasselbe Hero-Split (links Title + Lead + CTAs, rechts Aside-Card).
- Hebel: Variante B = zentrierter Hero mit breitem Lead darunter (fuer Glossar / Evidenz). Variante C = asymmetrisch mit grosser Illustration (fuer Toolbox / Netzwerk). Monotonie-Bruch beim Tab-Wechsel.
- Aufwand: M. `PageHero.jsx` erhaelt einen `variant`-Prop.
- Risiko: Mittel. Je mehr Varianten, desto mehr Testflaeche. Drei ist harte Obergrenze.

### Interaktion / Motion

**O9 — Card-Hover-States intensivieren**
- Status quo: `.ui-card--editorial-link:hover` = `translateY(-2px)`. Diskret, fast unsichtbar.
- Hebel: `translateY(-4px)` + `box-shadow: var(--shadow-card) → var(--shadow-elevated)` Uebergang + Border `--border-default → --border-strong`. Cards bekommen „Pickup"-Feedback, das sich wertiger anfuehlt.
- Aufwand: S. Eine CSS-Regel.
- Risiko: Niedrig. Motion-Tokens existieren, `prefers-reduced-motion` greift schon.

**O10 — Reveal-Animation mit Stagger + Direction-Varianz**
- Status quo: Alle Sektionen faden via `.reveal-on-scroll` identisch ein (Opacity + translateY 6px). Uniform.
- Hebel: Pro Sektion einen Index-CSS-Variablen-Delay setzen (`--reveal-delay: calc(var(--reveal-index) * 60ms)`), damit Karten innerhalb eines Grids leicht versetzt erscheinen. Optional: alternierende Richtung (translateX +/- 8px) bei horizontalen Section-Paaren.
- Aufwand: M. Hook `useScrollReveal` erweitern um Index-Propagation.
- Risiko: Niedrig. `prefers-reduced-motion` bleibt harte Bypass.

**O11 — Tab-Change-Transition**
- Status quo: Tab-Wechsel = instantaner DOM-Austausch.
- Hebel: View Transition API (Chromium/Safari 18+) fuer einen 180ms-Cross-Fade beim Tab-Switch. Oder manueller Fade via `useState` + Timing. Macht die SPA als SPA erfahrbar statt „Seite-wechseln"-Eindruck.
- Aufwand: M. API-Support + Fallback.
- Risiko: Niedrig. Bei fehlender API-Unterstuetzung: No-op-Fallback.

### Icon / Signal

**O12 — Tab-Icons aus dem Menu auch im Page-Hero**
- Status quo: `lucide-react`-Icons werden nur im Menu-Drawer eingesetzt (HelpCircle, Activity etc.). Page-Hero hat keine Icon-Repraesentation des Tabs.
- Hebel: Kleines Icon (24px, `--text-muted`) ueber oder neben dem Eyebrow im Hero. Visuelle Bruecke Menu → Seite, verstaerkt die Verortung.
- Aufwand: S.
- Risiko: Niedrig. Icons existieren bereits, Paket ist Bundle.

### Micro-Details

**O13 — Emergency-Banner auf Mobile kollabierbar**
- Status quo: Dunkler Banner oben, ca. 80–120px, nicht dismissable. Auf 390×844 belegt er ~10–14% des ersten Viewports.
- Hebel: Auf Mobile Default-collapsed mit einer schlanken Zeile „144 — ⚠︎ Notfall" + Expand-Button. Expanded-Zustand bleibt wie heute. Mehr LCP-Flaeche fuer den Hero.
- Aufwand: M. Interaktionsmuster + a11y-Labeling + LocalStorage-Persistenz (oder bewusst nicht).
- Risiko: **Editorial-Entscheidung**. Die App hat eine klare „Emergency-First"-Haltung (Audit 22). Kollabieren widerspricht dem. Fuer Release wahrscheinlich **nicht** uebernehmen, explizit als dokumentierter Gegenvorschlag behalten.

**O14 — Section-Rhythmus bewusst variieren**
- Status quo: Fast alle Sections laufen auf `--section-standard (5.5rem)`. `--section-tight` und `--section-wide` sind vorhanden, aber selten genutzt.
- Hebel: Pro Tab 1–2 bewusst gesetzte `--section-wide`-Breaks (nach Hero, vor ClosingSection). Visuelle Zaesur betont Hierarchie.
- Aufwand: S.
- Risiko: Niedrig. Tokens existieren.

**O15 — Footer als Identitaetsflaeche statt Utility**
- Status quo: Footer hat eigenes Mini-Token-System (Gradient, Inverse-Panel, mehrstufige Text-Hierarchie), aber wirkt in den Screenshots dennoch primaer funktional (Links, Impressum).
- Hebel: Zusaetzliche Textpassage im Inverse-Panel („Was dieses Portal nicht ist" / „Fachlicher Stand") — Serif-Italic, mittlere Groesse. Macht den Footer zum Schluss-Statement.
- Aufwand: S–M. Text-Arbeit.
- Risiko: Niedrig.

**O16 — Logo / Monogramm aufwerten**
- Status quo: Mobile-Header zeigt „EB"-Kreis-Monogramm. Visuell zurueckhaltend, fast generisch.
- Hebel: Entweder ein verfeinertes Monogramm (bessere Font, warmes Farbpaar) oder ein schlanker Text-Wordmark „Relational Recovery" in Serif-Italic. Letzteres staerkt die Magazin-Anmutung.
- Aufwand: M. Design + Header-Anpassung.
- Risiko: Niedrig.

## Ranking (Impact × Aufwand × Risiko)

Legende: Impact H/M/L, Aufwand S/M/L, Risiko H/M/L. Zeilen sortiert nach empfohlener Reihenfolge.

| # | Option | Impact | Aufwand | Risiko | Empfehlung |
| --- | --- | --- | --- | --- | --- |
| O1 | Webfont-Self-Hosting | H | M | M | **Top 1** — groesster Hebel auf Signature-Typografie |
| O4 | Tab-Akzentfarben | H | S–M | M | **Top 2** — macht 8 Tabs visuell differenziert, Tokens existieren |
| O9 | Card-Hover intensivieren | M | S | L | **Top 3** — beste Aufwand-Nutzen-Ratio |
| O2 | Stats-Numerals in Serif | M | S | L | **Top 4** — kleine CSS-Regel, editorial sofort spuerbar |
| O8 | PageHero-Layout-Varianten | H | M | M | **Top 5** — nach O4 einer der groessten Anti-Monotonie-Hebel |
| O12 | Tab-Icons im Hero | M | S | L | Quick win |
| O14 | Section-Rhythmus variieren | M | S | L | Quick win |
| O15 | Footer als Identitaetsflaeche | M | S–M | L | Quick win |
| O5 | `--surface-accent-soft` aktivieren | L–M | S | L | Quick win |
| O7 | Hero-Marginalie | M | M | L–M | Redaktionelle Pflege |
| O10 | Reveal-Stagger | L–M | M | L | Nice-to-have |
| O11 | Tab-Change-Transition | M | M | L | Nice-to-have |
| O3 | Body-Copy in Serif | M–H | M | M | Erst nach O1 sinnvoll |
| O16 | Logo/Monogramm | M | M | L | Post-Launch |
| O6 | Per-Tab Hero-Illustrationen | H | L | M | Post-Launch (Design-Kapazitaet) |
| O13 | Emergency-Banner collapsible | H (Mobile-LCP) | M | H (editorial) | **Nicht empfohlen** — widerspricht Emergency-First |

## Pre-Release-Sprint-Empfehlung (falls Zeit)

Wenn vor Release ein 1–2-Tages-Sprint fuer visuelles Polish moeglich ist, wuerden folgende 5 Optionen zusammen die spuerbarste Aufwertung geben, ohne das System zu destabilisieren:

1. **O9** Card-Hover (15 min)
2. **O2** Stats-Numerals Serif (15 min)
3. **O12** Tab-Icons im Hero (45 min)
4. **O4** Tab-Akzentfarben (2–3 h inkl. Kontrast-Check je Farbe)
5. **O1** Webfont-Self-Hosting (3–4 h inkl. Subsetting, Preload, LCP-Messung)

Gesamtaufwand: ~1 Arbeitstag. Alle fuenf sind isoliert reversibel, kein Finding ist auf das andere angewiesen (ausser O3 auf O1).

## Post-Launch-Kandidaten

- O6 (Per-Tab Illustrationen) — Design-Kapazitaet und Briefing erforderlich.
- O8 (PageHero-Varianten) — braucht kuratierten Einsatzplan je Tab.
- O11 (Tab-Transition) — in Iteration 2 mit messbaren Metriken.
- O16 (Logo) — nur wenn Markenbildung explizit Thema wird.

## Nicht empfohlen

- **O13** Emergency-Banner collapsible — der visuelle Gewinn auf Mobile ist real, aber er widerspricht der dokumentierten Emergency-First-Haltung des Portals (Audit 22). Wenn ueberhaupt, dann in Form eines bewussten Re-Designs des Banners (schlanker + optisch leichter, ohne Dismiss), nicht als Collapse-Interaktion.

## Ergebnis

**16 Optionen identifiziert, davon 5 Top-Empfehlungen fuer einen kurzen Pre-Release-Sprint.** Keine davon ist ein Pre-Release-Blocker; alle sind reine Polish-Hebel auf ein bereits tragendes Design-System. Der Audit-24-Clean-Bill bleibt inhaltlich richtig (es ist nichts kaputt), dieser Audit 25 macht die offene Aufwertungs-Flaeche transparent.
