# Audit 09 -- Frontend-Richtlinien-Compliance-Audit

## Phase 1 -- Inventur

### 1.0 Vorgehen

- Quelldokument: `docs/frontend-richtlinien.md` (178 Zeilen, philosophie- und regel-orientiert gemischt).
- Scope des Code-Abgleichs: `src/**/*.{jsx,js,css}` sowie `docs/frontend-richtlinien.md`.
- Methode: Regeln aus dem Dokument extrahiert, pro Regel Grep/Read-Abgleich, Befunde mit Datei + Zeile dokumentiert. Keine Code-Änderungen.

### 1.1 Regel-Extraktion

Das Richtliniendokument enthält **3 Leitprinzipien** (interpretativ, nicht direkt prüfbar), **30 konkrete Regeln** (grösstenteils prüfbar) und **1 Checkliste** (Arbeitsweise, nicht Compliance). Hier nur die direkt prüfbaren Regeln:

| Nr. | Kategorie | Regel (verdichtet) | Präzision |
|---|---|---|---|
| R1 | Farbe | Farben strikt über Tokens, nie Hex in Komponenten | **präzise** |
| R2 | Farbe | Transparenz-Abstufungen statt neuer Hex-Werte | präzise |
| R3 | Farbe | Jede Text-/Hintergrund-Kombination ≥ WCAG AA (4.5:1 normal / 3:1 large) | präzise |
| R4 | Farbe | Kontrastverhältnisse als Kommentar am Token dokumentieren | **präzise**, Format offen |
| R5 | Farbe | Signal-Farben reserviert für Signalisierung, nie Dekoration | interpretativ |
| R6 | Farbe | Token-Semantik nach Funktion, nicht Erscheinung (`--text-primary`, nicht `--grey-900`) | präzise |
| R7 | Farbe | Semi-transparente Text-Farben: Einsatzgrenze im Kommentar | präzise |
| R8 | Typografie | Eine Paarung Body-Font + Heading-Font. Nicht mehr. | präzise |
| R9 | Typografie | Schriftgrössen ausschliesslich über Tokens, nie rem/px inline | präzise |
| R10 | Typografie | Zeilenhöhe 1.6–1.8 für Fliesstext | präzise |
| R11 | Typografie | Heading-Levels folgen semantischer Hierarchie, nicht visueller Gewichtung | interpretativ |
| R12 | Spacing | Hardcodierte Pixel-/Rem-Werte sind technische Schuld | **präzise** |
| R13 | Spacing | Sektion-Abstände als eigene Tokens (`--section-*`) | präzise |
| R14 | Spacing | Content-Breiten als Tokens | präzise |
| R15 | Spacing | Mobile-Breakpoints haben dieselben Token-Anforderungen | präzise |
| R16 | Komponenten | Button-System mit genau vier Stufen: Primary, Secondary, Danger, Tertiary/Text-Link | **präzise** |
| R17 | Komponenten | Alle Buttons teilen font-family, font-size, padding, border-radius, min 44×44px | präzise |
| R18 | Komponenten | Neuer Button-Typ nur wenn keine bestehende Stufe passt, dokumentiert warum | präzise |
| R19 | A11y | Semantisches HTML vor ARIA | interpretativ |
| R20 | A11y | Skip-Links auf jeder Seite | präzise |
| R21 | A11y | Sichtbarer `:focus-visible`-Stil; kein `outline: none` ohne Ersatz | präzise |
| R22 | A11y | Reduced Motion: alle Animationen hinter `@media (prefers-reduced-motion: reduce)` | **präzise** |
| R23 | A11y | Touch-Targets ≥ 44×44 px für alles Interaktive | präzise |
| R24 | A11y | Farbe nie einziges Signal (Icon + Text + Form doppelt) | interpretativ |
| R25 | A11y | Fokus-Management bei dynamischen Inhalten (JS-Austausch → Fokus setzen) | präzise |
| R26 | Animation | Transition-Dauer 0.2–0.3s; selten >0.4s | präzise |
| R27 | Animation | Keine horizontalen Marquees / Parallax / pinned Sections ohne Grund | präzise |
| R28 | CSS-Arch | Flache Dateistruktur: `tokens.css` / `base.css` / `layout.css` / `components.css` / `pages.css` / `print.css` | **präzise** |
| R29 | CSS-Arch | Kein `!important` ausserhalb Print-CSS | präzise |
| R30 | CSS-Arch | Keine Override-Dateien | präzise |
| R31 | KritPfad | Telefonnummern auf kritischem Pfad klickbar (`tel:`, `mailto:`) | **präzise** |
| R32 | KritPfad | Keine Animationen, die Wahrnehmung verzögern; keine Experimente | interpretativ |

### 1.2 Compliance-Abgleich pro Regel

Legende: ✓ konform / ≈ teilweise konform / ✗ nicht konform / ? nicht prüfbar / -- nicht anwendbar

#### R1 -- Keine Hex in Komponenten ✗ nicht konform

- **10 Tailwind arbitrary Hex in JSX**: `src/App.jsx` Zeilen 107 (3 Stück: `#f6efe7`, `#ead8c3`, `#5f3c2d`), 150 (3 Stück: `#4b392f`, `#3f322b`, `#2d241f`), 152 (`#eadfce`), 153 (`#f0c786`), 162 (`#f0c786`), 171 (2 Stück: `#fff6ee`, `#f4e4d6`), 173 (`#6d342c`), 174 (`#9a4b3c`), 185 (2 Stück: `#dec2b2`, `#fff0e6`). `src/components/ErrorBoundary.jsx` Zeilen 20 (`#e4cbbb`, `#fff6ee`), 30 (`#dec2b2`, `#6d342c`), 31 (`#9a4b3c`).
- **CSS-Hardcodes in `src/styles/primitives.css`** (ausserhalb Token-Datei): Footer-Farben Zeilen 2771–2990 (u. a. `#f5ede2`, `#eee2d4`, `#5a4a3f`, `#3d3128`, `#262019`, `#fff7ef`, `#e4d2c1`, `#7a4c35`, `#8a705f`, `#332a24`, `#d9cabb`, `#f2e6d9`), Amber-Utility Zeilen 1752–1758 (`#d97706`, `#fffbeb`, `#c2410c`, `#fff7ed`), `#8d3f32` wurde in Audit 08 bereits migriert.
- **Schwere**: Hoch. Betrifft Seitenhintergrund, Emergency-Banner, ErrorBoundary, Footer.

#### R2 -- Transparenz-Abstufungen statt neuer Hex ≈ teilweise konform

- `color-mix(in srgb, …, white/transparent/black X%)` wird breit eingesetzt (`primitives.css`), folgt dem Prinzip.
- Aber: `color-mix` mischt teilweise mit Token + Hex zugleich (z. B. `color-mix(... #fff ...)`), nicht durchgängig nur mit Tokens.

#### R3 -- WCAG AA Kontrast ? nicht prüfbar ohne Messung

- Kommentare in `tokens.css` behaupten AA-Konformität (z. B. `--text-primary: #2f2f28; /* AA+ on --surface-page… */`), aber keine messbaren Ratios.
- Code-seitig kein Verstoss ableitbar; echte Prüfung braucht Kontrastmessung in Phase 2.

#### R4 -- Kontrast-Kommentar am Token ≈ teilweise konform

- `tokens.css`: 6 von 19 Text-/Surface-Tokens haben Kontext-Kommentar, aber nur 1 enthält etwas, das wie eine Ratio-Angabe wirkt (`--focus-ring`: „target visible AA-level contrast"). Keine einzige konkrete Ratio wie `4.5:1` oder `4.69:1`.
- Border-, Accent-, Surface-Tokens ohne Kontrast-Einordnung.
- **Format-Lücke in der Richtlinie**: Das geforderte Format ist nicht spezifiziert.

#### R5 -- Signal-Farben nur für Signalisierung ? nicht prüfbar pauschal

- Stichprobe: `--accent-danger`, `--surface-danger-soft`, `--accent-warning` werden in Error/Alert-Kontexten verwendet. Keine dekorative Nutzung im Groben sichtbar.

#### R6 -- Token-Semantik nach Funktion ✓ konform

- `tokens.css` durchgängig funktional benannt: `--text-primary`, `--surface-app`, `--accent-primary-strong`, `--border-subtle`. Keine `--grey-900`/`--white`/`--blue-500` Muster.

#### R7 -- Einsatzgrenze bei semi-transparenten Text-Farben ✗ nicht konform

- Keine einzige `rgba(…)`-Deklaration in Tokens mit einer „nur auf Hintergründen mit Luminanz < X"-Angabe. Semi-transparente Flächen existieren (`--surface-elevated: rgba(255, 250, 246, 0.86)`), aber ohne Grenzkommentar.

#### R8 -- Eine Body + Heading Font ≈ teilweise konform

- `tokens.css` definiert `--font-body` (Manrope) und `--font-heading` (Source Serif 4). Korrekte Paarung.
- **Aber**: `src/styles/primitives.css:2836` referenziert `var(--font-display)`, das **nirgends deklariert** ist. Ein undefinierter Font-Token, der beim Rendern nur durch Fallback-Chain abgefangen wird. Das ist **halb toter Code, halb verdeckter dritter Font**.

#### R9 -- Schriftgrössen über Tokens ≈ teilweise konform

- Mehrheit der CSS-Regeln nutzt `var(--font-size-*)`-Tokens.
- Einzelausreisser: `primitives.css:290` (`.ui-button { font-size: 0.75rem; }`), `primitives.css:1308` (`.ui-input { font-size: 1rem; }`). Beide Werte existieren als Token (`--font-size-xs: 0.75rem`, `--font-size-md: 1rem`) und sind trivial ersetzbar.
- Kein grossflächiger Missbrauch.

#### R10 -- Zeilenhöhe 1.6–1.8 ✓ konform

- `--line-height-copy: 1.7`, `--line-height-relaxed: 1.8` in Range. `.footer-brand-copy: 1.9` liegt knapp darüber, aber in einem Brand-Kontext (kein Fliesstext) gerechtfertigt.

#### R11 -- Heading-Hierarchie ? Stichprobe konform

- `HeadingTag` wird in Templates explizit via Props gesteuert (z. B. `SectionHeader` Default h2). Keine h1→h4-Sprünge im Stichproben-Scan. Vollständige Prüfung bräuchte Outline-Tool.

#### R12 -- Hardcodierte Pixel/Rem ✗ nicht konform

- **~110+ inline rem-Werte in `primitives.css`** für Padding/Margin/Gap. Häufigste: `1rem` (~30 Vorkommen), `1.25rem` (~13), `0.75rem` (~9), `1.5rem` (~6), `0.5rem`, `0.625rem`, `0.875rem` (je 4-5).
- Spacing-Tokens existieren (`--space-1` bis `--space-8` in `tokens.css:68–75`), werden aber selten referenziert.
- In JSX: 0 Tailwind-Arbitrary-Spacing-Verstösse gefunden.

#### R13 -- Sektion-Abstände als Tokens ✓ konform

- `--section-tight/standard/wide` in `tokens.css`, verwendet in `.ui-section*`-Regeln, Responsive-Override in Mobile-Media-Query.

#### R14 -- Content-Breiten als Tokens ✓ konform

- `--content-width`, `--content-width-wide`, `--content-width-copy` definiert und genutzt.

#### R15 -- Mobile-Breakpoints ≈ teilweise konform

- Media-Query-Werte (`48rem`, `64rem`) sind literal im CSS, nicht als Token (`--breakpoint-sm`, `--breakpoint-md`) definiert. Aber Properties **innerhalb** der Media-Queries nutzen Tokens. Die Richtlinie ist hier interpretierbar: geht sie nur um Properties oder auch um Breakpoint-Werte?

#### R16 -- Button-System vier Stufen ✗ nicht konform

- `src/components/ui/Button.jsx` definiert **6 Varianten**: `primary`, `secondary`, `subtle`, `ghost`, `danger`, `emergency`. Soll: genau 4 (Primary / Secondary / Danger / Tertiary-Text-Link).
- `emergency` ist eine eigene Kategorie ohne Richtlinien-Deckung (aber fachlich begründet für Notfall-CTA).
- `subtle` und `ghost` sind beides Tertiary-Kandidaten.

#### R17 -- Button-Basis ≥ 44×44px ✓ konform

- `.ui-button { min-height: var(--touch-target-min); }` in `primitives.css:281`. Token = 44px.

#### R18 -- Neue Button-Typen dokumentiert ✗ nicht konform

- `emergency`-Variante existiert ohne Code-Kommentar zur Begründung. Die Richtlinie verlangt Dokumentation der Abweichung.

#### R19 -- Semantisches HTML vor ARIA ✓ grösstenteils konform

- `<header>`, `<nav aria-label="…">`, `<main>`, `<button>`, `<section>` konsistent verwendet.
- **Eine Ausnahme**: `src/components/Header.jsx:123` ist `<div className="ui-mobile-backdrop" aria-hidden="true" onClick={closeMobileMenu}>` — Click-Backdrop als `div`. Mit `aria-hidden="true"` und begleitendem Dialog-Button ist das ein etabliertes Pattern, aber grenzwertig.

#### R20 -- Skip-Link ✓ konform

- `src/App.jsx:108–121` Skip-Link zu `#main-content`, gestylt in `app-global.css:2–33` mit revealed `:focus-visible`.

#### R21 -- Focus-visible sichtbar, kein outline:none ohne Ersatz ✓ konform

- `app-global.css:72–77` zentraler `:focus-visible`-Stil mit Outline. Stichprobe ergab keine `outline: none;` ohne Ersatz.

#### R22 -- Reduced Motion durchgängig ≈ teilweise konform

- Zwei `prefers-reduced-motion`-Blöcke: `src/index.css:74–78` (Scroll-Behavior) und `primitives.css:2740–2766` (Buttons, Chips, Page-Enter, Haptic-Btn).
- **Aber**: Weitere Transitions in `app-global.css:23–25` (Skip-Link), `app-global.css:36–42` (Haptic-Btn Basis), `index.css:129–134` (Link-Transition) haben keinen expliziten Reduce-Motion-Guard. Cascade-Glück statt Absicht.

#### R23 -- Touch-Targets 44px überall ✓ konform

- Buttons, Skip-Link, Nav-Items, Inputs, Disclosure-Toggles alle mit `min-height: var(--touch-target-min)`. Chips mit `calc(var(--touch-target-min) - 0.5rem)` = 38px (grenzwertig, in Filter-Kontexten akzeptabel).

#### R24 -- Farbe nicht einziges Signal ✓ Stichprobe konform

- ErrorBoundary: Icon + Text + Farbe. Emergency-CTA: Icon + Text + Farbe. Score-Bands: Label + Farbe.

#### R25 -- Fokus-Management bei dynamischen Inhalten ✓ konform

- `useNavigationFocus` Hook in `src/utils/`, `focusTarget: 'heading'`-Parameter in allen `navigate()`-Aufrufen. Gute, konsistente Umsetzung.

#### R26 -- Transition-Dauer 0.2–0.3s ✓ konform

- Tokens: `--motion-fast: 0.18s`, `--motion-standard: 0.28s`, `--motion-slow: 0.55s`. Keine literalen Durations ausserhalb der Tokens gefunden. `0.55s` wird für Page-Enter verwendet (grenzwertig laut Richtlinie, aber ausserhalb Micro-Interaktion).

#### R27 -- Keine Marquees/Parallax ✓ konform

- Kein Parallax-, Marquee- oder pinned-Section-Code im Projekt.

#### R28 -- Flache Dateistruktur ✗ nicht konform

- **Soll**: 6 Dateien nach Verantwortung (`tokens`, `base`, `layout`, `components`, `pages`, `print`).
- **Ist**: 4 Dateien, davon eine **Mega-Datei**.

| Ist-Datei | Zeilen | Gemisch |
|---|---|---|
| `src/styles/tokens.css` | 119 | Tokens (konform) |
| `src/styles/app-global.css` | 117 | Base + Skip-Link + Haptic + Print (hybrid) |
| `src/styles/primitives.css` | **3019** | Base + Layout + Components + Pages + Print-Views |
| `src/index.css` | ~135 | Tailwind-Import + Base + Body-BG-Gradient + Dot-Grid |

- `primitives.css` kumuliert Layout-Grids, Buttons, Cards, Forms, Footer, Print-Ansichten in einer Datei.
- Print-Styles sind **verteilt** (`app-global.css:98–117`, `primitives.css`-Sektionen für Print-Views) statt zentralisiert.

#### R29 -- Kein !important ausserhalb Print ✓ konform

- 3 Vorkommen, alle in `@media print`-Blöcken (`app-global.css:100, 104, 114`).

#### R30 -- Keine Override-Dateien ✓ konform

- Keine `overrides.css` oder vergleichbares.

#### R31 -- Telefonnummern klickbar ✗ nicht konform

- **Notfallnummern sind nicht klickbar.** Im Emergency-Banner (`App.jsx:177–180`) und in ErrorBoundary (`ErrorBoundary.jsx:35–38`) erscheinen `144`, `AERZTEFON 0800 33 66 55`, `147` als `<span>` bzw. `<strong>`. Kein einziger `tel:`-Link in `src/**/*.jsx` oder `*.js`.
- **Kritischer-Pfad-Verstoss**, weil Notfallkontakt laut CLAUDE.md das zentrale Sicherheitsversprechen der App ist.

#### R32 -- Keine Experimente auf kritischen Pfaden ? Stichprobe konform

- ErrorBoundary und Emergency-Banner: keine Animationen, kein A/B-Test-Code, klare Aktionshierarchie. Konform im Stichproben-Scan.

### 1.3 Spezialfall -- die 17 offenen Hex-Werte aus Audit 08 (plus 10 neu entdeckte)

Pro Wert: Datei/Zeilen (Stichprobe), aktueller Wert, nächster Token, Empfehlung T1/T2/T3/T4 mit Begründung. **Keine Umsetzung in Phase 1.**

#### Aus Audit 08 bekannt (17 Werte, plus `#8d3f32` bereits migriert)

| Hex | Orte (Stichprobe) | Nächster Token / Delta | Empfehlung | Begründung |
|---|---|---|---|---|
| `#f6efe7` | App.jsx:107 (bg) | `--surface-subtle` #f7f0e8 (Δ minimal) | **T3** | Seiten-Hintergrund-Utility, durch Token ersetzbar, Farb-Shift unmerklich. Sichtkontrolle nötig. |
| `#ead8c3` | App.jsx:107 (selection:bg) | keiner sauber | **T2 neu** `--surface-selection` | Semantische eigene Rolle (Selection-Highlight). |
| `#5f3c2d` | App.jsx:107 (selection:text) | `--text-secondary` #5e493d (Δ Farbton) | **T2 neu** `--text-on-selection` | Gehört zur Selection-Paarung mit #ead8c3, verdient eigenes Token. |
| `#4b392f` | App.jsx:150 (border) | `--border-strong` #bda894 (zu hell) | **T2 neu** `--border-inverse` | Dunkel-Mode-Border für Header-Banner; semantisch eigene Rolle. |
| `#3f322b`, `#2d241f` | App.jsx:150 (gradient-stops) | kein Token passend | **T2 neu** `--surface-inverse-top/bottom` | Emergency-Banner-Gradient. Identität-tragend, eigenes Token-Paar. |
| `#eadfce` | App.jsx:152 (text auf dark) | `--text-inverse` #fffaf6 (zu hell) | **T2 neu** `--text-inverse-soft` | Gedämpfter Text auf dunklem Banner. Semantische Lücke. |
| `#f0c786` | App.jsx:153, 162 (icon auf dark) | `--accent-warning` #eb8a3e (deutlich anders) | **T2 neu** `--accent-warning-on-inverse` | Icon-Akzent im Emergency-Banner; keine exakte Warning-Variante. |
| `#fff6ee`, `#e4cbbb` | ErrorBoundary.jsx:20 (bg + border) | `--surface-app` #fffaf6 bzw. `--border-default` #d5c9b1 | **T3** für #fff6ee (Δ minimal), **T2 neu** für #e4cbbb (eigene ErrorBoundary-Border) | Zwei unterschiedliche Rollen im Error-Panel. |
| `#dec2b2` | App.jsx:185, ErrorBoundary.jsx:30 (border) | `--border-default` #d5c9b1 (Δ sichtbar) | **T2 neu** `--border-warm-soft` | Zweite Vorkommen bestätigt semantische Rolle. |
| `#6d342c` | App.jsx:173, ErrorBoundary.jsx:30 (Text) | `--text-danger` #8d3f32 (ähnlich, aber dunkler) | **T1** (Token `--text-danger` minimal verdunkeln) **ODER T2 neu** `--text-danger-strong` | Entscheidung offen; beides ist Text auf Warn-Surface. |
| `#9a4b3c` | App.jsx:174, ErrorBoundary.jsx:31 (Label auf warn) | `--accent-primary-strong` #8d3f32 (heller Rot) | **T2 neu** `--text-danger-muted` oder **T3** Nutzen von `--text-link` | Label-Nutzung, nicht reiner Danger-Text. |
| `#fff0e6` | App.jsx:185 (hover bg) | keiner | **T2 neu** `--surface-hover-warm` | Hover-State für Emergency-Button. |

#### Neu entdeckt (nicht in Audit 08 erfasst)

| Hex | Orte | Nächster Token | Empfehlung | Begründung |
|---|---|---|---|---|
| `#f5ede2`, `#eee2d4` | primitives.css:2771–2773 (Footer-Gradient-Light) | keiner | **T2 neu** `--footer-surface-top/bottom` | Footer-Identität, gradient-tragend. |
| `#3d3128`, `#262019` | primitives.css:2809–2810 (Footer-Gradient-Dark, Framework-Panel) | keiner | **T2 neu** `--footer-surface-inverse-top/bottom` | Zweite Gradient-Zone. |
| `#fff7ef` | primitives.css:2812 (Text auf Framework-Dark) | `--text-inverse` #fffaf6 | **T3** | Δ minimal, durch Token ersetzbar. |
| `#e4d2c1`, `#7a4c35` | primitives.css:2822–2825 (Badge auf Footer) | `--border-default`/`--text-danger` (unpassend) | **T2 neu** `--footer-badge-surface/text` | Footer-Badge-Identität. |
| `#5a4a3f` | primitives.css:2773 (Footer-Text-Warm) | `--text-secondary` #5e493d (Δ minimal) | **T3** | Praktisch identisch, Migration trivial. |
| `#8a705f` | primitives.css:2866, 2884, 2990 (Footer-Meta, Stat) | `--text-muted` #785a46 (Δ sichtbar) | **T3** mit Freigabe | Dreifach verwendet, Kandidat für Angleichung. |
| `#332a24` | primitives.css:2876 (Footer-Dark-Text-Dunkler) | keiner | **T2 neu** `--footer-text-inverse-strong` | Eigene Rolle. |
| `#d9cabb` | primitives.css:2893, 2975 (Footer-Light-Text auf Dark) | `--text-inverse` (zu hell) | **T2 neu** `--footer-text-inverse-soft` | Passend zu #eadfce-Muster aus Banner. |
| `#f2e6d9` | primitives.css:2966 (Footer-Hover) | keiner | **T2 neu** `--footer-surface-hover` | Interaction-State. |
| `#d97706`, `#fffbeb`, `#c2410c`, `#fff7ed` | primitives.css:1752–1758 (Amber-Utility-Klasse) | `--accent-warning` teilweise | **T3 oder T4** | Tailwind-Amber-Wert-Reste aus Prototyping. Wahrscheinlich entfernbar, wenn keine Klasse sie nutzt. Prüfung in Phase 2. |
| `#fff` | app-global.css:114 (print @page) | keiner | **T4** | Print-Kontext, ok als literal. |

**Zwischenergebnis:** 27 unique Hex-Werte insgesamt. Empfehlungsprofil:
- **T1** (Token auf echten Wert angleichen): 0–1 Fälle (`--text-danger` vs. `#6d342c`, offen)
- **T2** (neue Tokens einführen): ca. 15–18 (Selection, Inverse-Surfaces, Footer-Identität, Emergency-Banner)
- **T3** (Hex durch bestehenden Token ersetzen, Farb-Shift hinnehmen): ca. 6–8 (Werte, deren Δ unterhalb der Wahrnehmungsschwelle liegt)
- **T4** (als Ausnahme belassen): 1–2 (Print-Hintergrund; evtl. Amber-Utility, wenn effektiv tot)

### 1.4 Richtlinien-Qualitäts-Check

Ehrliche Einschätzung von `docs/frontend-richtlinien.md` als Sollvorgabe für ein React 19 + Tailwind v4 Projekt:

#### Klar und nützlich
- **A11y-Block (R19–R25)**: Sehr präzise, gut operationalisierbar, wird im Code auch eingehalten. Gutes Regelwerk.
- **R17 (Touch-Target 44px)**: Eindeutig, konsistent umgesetzt.
- **R29/R30 (Kein !important / keine Overrides)**: Klare Disziplin-Regeln, im Code eingehalten.
- **R13/R14 (Sektion-/Content-Tokens)**: Funktional, sauber umgesetzt.
- **R26 (Motion-Dauern)**: Konkret, messbar, eingehalten.

#### Veraltet / unklar

1. **R28 (Dateistruktur `tokens/base/layout/components/pages/print.css`)** ist **für klassisches CSS-Projekt** formuliert, nicht für Tailwind + CSS-Layer. Die reale Struktur (`primitives.css` als Components+Layout+Pages) entspricht eher React-CSS-Konventionen. Ohne Anpassung bleibt die Regel als Dauer-Verstoss stehen oder erzwingt einen grossen Umbau, dessen Nutzen in einem Tailwind-Projekt fraglich ist.
2. **R16 (Genau 4 Button-Varianten)** kollidiert mit fachlicher Notwendigkeit: `emergency` ist aus Care-Kontext begründet, `subtle`/`ghost` sind beides Tertiary-Abstufungen. Die Richtlinie müsste entweder das Tertiary-Spektrum aufmachen oder eine Kategorie `Emergency` als fünfte Stufe dokumentieren.
3. **R4 (Kontrast-Kommentar am Token)** ohne **Format-Vorgabe**. Manche Tokens haben narrativen Kontext, keiner eine echte Ratio. Ohne Format bleibt die Regel unprüfbar.
4. **R8 (Eine Body + Heading Font)** -- `--font-display` wird in Code referenziert, ist nirgends definiert. Die Richtlinie klärt nicht, ob ein dritter Brand-/Display-Font erlaubt ist; der Code tut es (halbherzig), ohne es zu begründen.
5. **R15 (Mobile-Breakpoints)** ist interpretierbar: Geht es um Properties **innerhalb** Media-Queries oder auch um Breakpoint-Werte selbst (`48rem`, `64rem` literal)?

#### Unklar / widersprüchlich

6. **R2 (Transparenz-Abstufungen statt Hex)** versus Realität: `color-mix(in srgb, var(--token) X%, white Y%)` wird breit verwendet. Das ist strenggenommen weder ein Token noch ein reiner Hex, sondern eine Laufzeit-Berechnung aus Token + Hex. Die Richtlinie adressiert das nicht.
7. **R12 (Hardcodes = technische Schuld)** -- der Code hat ~110 davon. Entweder ist die Regel konsequent zu Ende zu gehen (grosses Refactoring), oder sie ist zu präzisieren: „Layout-/Sektion-/Komponenten-Haupt-Abstände zwingend Token, Detail-Paddings innerhalb einer Komponente dürfen literal sein, solange sie der Spacing-Skala folgen."

#### Fehlend

8. **Tailwind-Arbitrary-Values** -- keine Regel im Dokument, obwohl das Projekt Tailwind v4 nutzt. `bg-[#abc]`, `text-[var(--token)]`, `p-[12px]` sind alles Muster, die im Code vorkommen oder vermieden werden sollten. Ohne Regel gibt es keine Orientierung.
9. **`color-mix()` als Pattern** -- siehe Punkt 6. Braucht eigene Regel: erlaubt, wenn Basis ein Token ist; verboten, wenn Basis Hex.
10. **Media-Query-Breakpoints als Tokens** -- nicht adressiert.
11. **Keine Regel zu Undokumentierten Patterns**: Hash-Navigation, `AppStateContext`, `Section → Template → Content`-Schichtung, `focusTarget`-Prop, `haptic-btn`-Klasse, `ui-visually-hidden`-Utility sind allesamt **sehr konsistent im Code** und **nirgends im Richtliniendokument**. Das ist eine Lücke: Wer neu dazukommt, wird den konsistenten Stil nicht erkennen oder reproduzieren.
12. **Keine Regel zu Zielgruppen-Metadaten (`primaryAudience`)** -- aus Audit 02, im Code etabliert, in den Richtlinien nicht erwähnt.

### 1.5 Gesamtbild

**Regel-Statistik**

| Status | Anzahl | Prozent |
|---|---|---|
| ✓ konform | 13 | 41 % |
| ≈ teilweise konform | 7 | 22 % |
| ✗ nicht konform | 6 | 19 % |
| ? nicht prüfbar (pauschal) | 4 | 12 % |
| -- nicht anwendbar | 2 | 6 % |
| **Total** | **32** | |

**Top-5-Hot-Spots (nach Schwere und Häufigkeit)**

1. **R12 -- Spacing-Hardcodes in `primitives.css`** (~110 Vorkommen, 1 Datei). Hohe Zahl, aber alle folgen der Spacing-Skala. Migration ist mechanisch, nicht konzeptionell.
2. **R1 -- Hex-Werte in JSX und CSS** (27 unique Werte, Emergency-Banner, ErrorBoundary, Footer). Direkter Richtlinien-Verstoss. Audit-09-Block-1 adressiert das.
3. **R31 -- Notfallnummern nicht klickbar** (`tel:`-Links fehlen). Kritischer-Pfad-Verstoss, fachlich schwer (Care-Produkt), mechanisch trivial.
4. **R28 -- Mega-CSS-Datei `primitives.css`** (3019 Zeilen). Struktureller Verstoss, grosses Refactoring. Alternativ: Richtlinie anpassen.
5. **R16 -- Button-System 6 statt 4 Varianten**. Strukturell, aber Button-Varianten sind fachlich begründet.

**Hex-Statistik**

- 27 unique Werte total.
- Empfehlungs-Split ungefähr: T1 0–1, T2 15–18, T3 6–8, T4 1–2.
- Audit 08 hat 1 Wert (`#8d3f32`) erfolgreich migriert. Audit 09 Block 1 nimmt die restlichen 26 (17 aus Audit 08 + 10 neu entdeckt + 1 Print-Literal zur Ausnahme-Bestätigung).

**Richtlinien-Qualitäts-Befunde**

- 5 veraltet / unklar (R28, R16, R4, R8, R15).
- 2 widersprüchlich zur Code-Realität (R2/`color-mix`, R12/Detail-Paddings).
- 5 fehlende Regeln (Tailwind arbitrary, `color-mix`, Breakpoint-Tokens, undokumentierte Patterns, primaryAudience).

**Undokumentierte Code-Konventionen (positive Befunde, die in die Richtlinien aufgenommen gehören)**

1. Hash-Navigation + `useNavigationFocus`-Pattern.
2. `AppStateContext` + `useAppState`-Hook als zentraler Client-State.
3. `Section → Template → Content`-Dreischicht-Architektur.
4. `focusTarget: 'heading'`-Prop für Keyboard-Orientierung nach Navigation.
5. `.haptic-btn`-Micro-Interaction-Klasse (Scale-Transform + Lift).
6. `.ui-visually-hidden`-Utility mit Clip-Path (Screenreader-Only-Text).
7. `aria-hidden="true"` + `aria-label`-Paar für dekorative Icons plus Button-Label.
8. `primaryAudience`-Metadaten pro Template-Tab (Audit 02).

---

**STOPP nach Phase 1.** Warte auf Freigabe für Phase 2 (Diagnose und Massnahmenkatalog).
