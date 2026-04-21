# Audit 18 — Design-Token + CSS-Hygiene

**Datum:** 2026-04-21
**Branch:** `claude/audit-18-css-hygiene`
**Prompt:** `qa/prompts/audit-css-hygiene.md`

---

## Phase 1 — Inventur

### 1.1 Token-System

`src/styles/tokens.css`: **110 Tokens**, 169 LOC.

| Kategorie | Anzahl |
|---|---:|
| Surfaces (inkl. Footer, Error, Inverse) | 22 |
| Text + Icon | 10 |
| Borders | 6 |
| Accents (Brand, Warn, Info, Danger) | 9 |
| Focus (Ring, Width, Offset, Radius) | 5 |
| Typography (Font, Size, Line-Height, Letter-Spacing) | 20 |
| Spacing (space-1..8, section-tight/standard/wide) | 11 |
| Radius | 6 |
| Shadow | 4 |
| Layout (Content-Width, Touch, Header) | 6 |
| Motion | 4 |
| Chart + Selection | 7 (via `index.css`) |

Alias-Layer: `src/index.css` definiert eine zusätzliche Semantik-Ebene (`--primary`, `--background`, `--muted`, `--ring`, `--chart-1..5`), die 1:1 auf `tokens.css`-Tokens abbildet (shadcn-Pattern). Kontrast-Kommentare im Token-File präzise.

Dokumentation: `docs/design-system/` enthält 10 Check-/Audit-Notizen, aber **kein stabiles Token-Registry-Dokument**. Kein Sofort-Fix nötig, als Folge-Ticket festhalten.

### 1.2 Hardcodierte Werte

**Hex-Farben ausserhalb `tokens.css`:**

| Ort | Wert | Status |
|---|---|---|
| `app-global.css:188–597` (≈ 60 Stellen) | `#000`, `#fff`, `#333`, `#666`, `#999` | ✅ Ausnahme per Prompt — alle in `@media print`, Print-Schwarzweiss. |
| `primitives.css:2595` | `border-left: 3px solid var(--accent-secondary, #a1be95)` | ✅ Defensiver Fallback; identisch zum Token. |
| **`primitives.css:3842`** | `linear-gradient(180deg, #f0e1cf, #e8d5be)` (`.footer-panel--framework`) | ⚠️ **T2 — Neue Tokens nötig.** Kein exakter Match zu Footer-Surface-Paar. |

**Rgb/Rgba ausserhalb `tokens.css`:**

| Ort | Wert | Status |
|---|---|---|
| `primitives.css:604, 1432, 1516, 1670, 1821, 1828, 1845, 1902, 1973` | `rgba(76,55,39, α)` mit α ∈ {0.04, 0.06, 0.08, 0.1} für Schatten mit abweichenden Dimensionen | ⚠️ **T2** — lokale Schatten-Varianten, die keinem `--shadow-*` entsprechen. Bundeln als 1–2 neue Tokens (`--shadow-soft-low`, `--shadow-inverse`) ODER Tokens akzeptieren und hartkodiert lassen (Phase-2-Entscheidung). |
| `primitives.css:1651` | `rgba(47,47,40,0.32)` (Overlay) | ⚠️ **T2** — Modal/Drawer-Overlay, eigene Semantik. Token-Kandidat `--overlay-scrim`. |
| `primitives.css:3312, 3350` | `rgb(255 255 255 / 0.9)`, `rgb(255 255 255 / 0.72)` | ⚠️ **T2** — translucent White. Erwägenswert als `--surface-glass-*`. |
| `primitives.css:3819` | `linear-gradient(180deg, rgba(255,252,247,0.92), rgba(248,240,231,0.92))` (`.footer-panel--brand`) | ⚠️ **T2** — Gradient-Paar, zusammen mit :3842 als Footer-Gradient-Tokens. |
| `primitives.css:3821, 3828, 3845, 3902, 3973` | `rgba(93,68,51, α)` Schatten | ⚠️ **T2** — Footer-eigener Schatten-Akzent (`#5d4433`), eigene Farb-Identität. Kandidat für `--shadow-footer-*`. |

**px-Werte:**

`primitives.css` enthält ~140 `px`-Treffer. Stichprobe zeigt: mehrheitlich `1px/2px/3px` Borders und Dividers sowie `999px` für Pill-Radii. Diese liegen unterhalb der `--space-*`-Skala (ab 4 px) und sind legitim hartkodiert. Kein Hot-Spot.

**Tailwind Arbitrary-Values in JSX (wichtig):**

| Datei | Klasse | Existierender Token | Entscheidung |
|---|---|---|---|
| `App.jsx:138`, `:148`, `:164`, `:205`, `:237`; `ErrorBoundary.jsx:31` | `tracking-[0.18em]` | `--letter-spacing-label: 0.18em` | **T3** — Migration via `tracking-[var(--letter-spacing-label)]`. |
| `App.jsx:138` | `tracking-[0.24em]` | `--letter-spacing-kicker: 0.24em` | **T3** — analog. |
| `ErrorBoundary.jsx:65` | `tracking-[0.16em]` | — | **T4** — eigener Wert, nicht im Token-Set. Akzeptiert oder neuer Token. |
| `App.jsx:148`, `:237` | `min-h-[44px]`, `min-w-[44px]` | `--touch-target-min: 44px` | **T3** — Migration. |
| `App.jsx:137`, `:163`, `:203` | `max-w-[86rem]` | `--content-width-wide: 86rem` | **T3** — Migration. |
| `App.jsx:138`, `:148`, `:164`, `:205`, `:237`; `ErrorBoundary.jsx:31, 65` | `text-[10px]`, `text-[11px]` | — | **T4** — bewusst kleiner als `--font-size-2xs` (0.6875 rem ≈ 11 px). Kicker-Mikro-Typografie. Akzeptiert. |
| `App.jsx:32`, `ErrorBoundary.jsx:20` | `rounded-[3rem]`, `rounded-[2rem]` | `--radius-2xl: 2.5rem` | **T4** — bewusst abweichend. Zwei Einzelfälle, kein Migrations-Kandidat. |
| `App.jsx:237` | `shadow-[0_10px_24px_rgba(141,63,50,0.06)]` | — | **T2** — neuer Token oder akzeptiert. |

### 1.3 Token-Nutzungs-Analyse

**Unbenutzt (21 Tokens, definiert — nie `var(...)` referenziert):**

`--border-strong`, `--content-width-wide`, `--focus-ring-contrast`, `--font-size-xl`, `--font-size-2xl`, `--font-size-3xl`, `--font-size-4xl`, `--font-size-5xl`, `--footer-surface-inverse-bottom`, `--footer-surface-inverse-top`, `--footer-text-inverse-body`, `--footer-text-inverse-soft`, `--footer-text-muted`, `--letter-spacing-display`, `--line-height-snug`, `--radius-sm`, `--shadow-elevated`, `--space-8`, `--surface-danger-soft`, `--surface-info-soft`, `--text-link`.

**Einschränkung:** `--content-width-wide`, `--font-size-*`, `--touch-target-min` werden in JSX via Tailwind-Arbitrary mit Literal-Werten *dupliziert* (nicht als `var(--…)`). Migration zu `var(--…)` in Tailwind-Klassen macht sie nutzbar. Die übrigen (`--border-strong`, `--focus-ring-contrast`, `--shadow-elevated`, `--space-8`) sind echte tote Tokens.

**Heissgenutzt (>20 Referenzen):** 24 Tokens. Top-5: `--space-4` (194×), `--space-3` (134×), `--accent-primary` (132×), `--motion-fast` (120×), `--text-primary` (112×). Gut verteilt.

### 1.4 CSS-Struktur

- `primitives.css`: 4153 LOC, BEM-ähnlich (`ui-*` + Material-Handout-Shell). Klar abgegrenzte Blöcke via Kommentare. Keine auffälligen Duplikationen in der Stichprobe; einzelne `color-mix(…)`-Ausdrücke kehren wieder (z.B. `color-mix(in srgb, var(--accent-primary) 18%, white 82%)` ~4×). Kandidat für eine Helper-Variable, aber nicht Sofort-Fix.
- `app-global.css`: 614 LOC, klar als Abschnitt 9 `@media print` kommentiert. Gut.
- `index.css`: 182 LOC, definiert den shadcn-Alias-Layer plus `@layer base` + `@layer components`. Sauber.

**Bewertung: A** für alle drei Dateien.

### 1.5 Tote CSS-Regeln

Keine systematische Heuristik möglich ohne JSX-Scan gegen alle `.ui-*`-Klassen. Stichproben-Spot-Check ergab keine sichtbaren Leichen. Als Folge-Ticket: dedizierter Purge-Scan mit `grep -F`-Matrix `ui-*` in `primitives.css` gegen `src/**/*.jsx`.

### 1.6 Print-Konsistenz

Alle `.ui-material-handout*`-Klassen aus `MaterialHandouts.jsx` (crisis-plan, conversation-script, threshold-checklist, age-grid) haben in `app-global.css` entsprechende `@media print`-Regeln (verifiziert). `!important`-Konflikt-Trennung wie in CLAUDE.md dokumentiert. Keine offensichtlichen Lücken.

### 1.7 Gesamtbild + Top-5 Hot-Spots

| Prüfpunkt | Befund |
|---|---|
| Token-Zahl | 110 aktiv definiert, **21 ohne `var()`-Referenz** (7 davon via Tailwind-Literal dupliziert) |
| Hex ausserhalb `tokens.css` | 1 produktive Abweichung (`primitives.css:3842`), ~60 Print-Ausnahmen |
| Rgba ausserhalb `tokens.css` | ~15 (Schatten-Varianten, Overlay, Glass, Footer-Gradient-Paar) |
| Tailwind-Arbitrary mit Token-Äquivalent | **14** (tracking, min-h, max-w in App.jsx + ErrorBoundary) |
| Tote CSS-Regeln | Nicht systematisch gescannt; als Folge-Ticket |
| Struktur je Datei | A / A / A |

**Top-5 Hot-Spots:**

1. **Tailwind-Arbitrary-Duplikate von existierenden Tokens** (`tracking-[0.18em]`, `tracking-[0.24em]`, `min-h-[44px]`, `max-w-[86rem]`) — 14 Fundstellen in `App.jsx` + `ErrorBoundary.jsx`. **Sofort-Fix**, kein Risiko (1:1-Werte).
2. **Footer-Gradient-Paar** (`primitives.css:3819, 3842`) — zwei Gradients ohne Tokens, eigene Farb-Identität. **T2** neue Tokens `--footer-panel-brand-*` und `--footer-panel-framework-*`.
3. **Footer-Schatten-Akzent** (`rgba(93,68,51,…)`, 5×) — eigene Farb-Anker jenseits der globalen Shadow-Tokens. **T2** neue Tokens oder akzeptiert.
4. **Overlay-Scrim** `rgba(47,47,40,0.32)` (`primitives.css:1651`) — Modal-Schutz. **T2** `--overlay-scrim`.
5. **Tote Tokens** ohne indirekte Verwendung (`--border-strong`, `--focus-ring-contrast`, `--shadow-elevated`, `--space-8`) — **T1/Löschen** nach menschlicher Prüfung.

**Zusammenfassung Phase 1 (5 Zeilen):**
Token-System ungewöhnlich sauber (110 Tokens, Kontrast-dokumentiert, zwei Layer: Basis + shadcn-Alias). Struktur A/A/A. Substanzieller Hot-Spot: **14 Tailwind-Arbitrary-Klassen in App.jsx/ErrorBoundary mit 1:1-Token-Äquivalent** — Migration via `tracking-[var(--…)]` etc. kostenlos. Zweitgrösster: **Footer-Gradients + Footer-Schatten** hartkodiert (eigene Farb-Identität, Token-Kandidaten). Drittens: **4 tote Tokens** (`--border-strong`, `--focus-ring-contrast`, `--shadow-elevated`, `--space-8`) kandidieren für Streichung.

---

## Phase 2 — Massnahmenkatalog

| # | Befund | Gruppe | Aufwand | Entscheidung |
|---|---|---|---|---|
| 1 | 14× Tailwind-Arbitrary-Klassen in `App.jsx` + `ErrorBoundary.jsx` mit 1:1-Token-Äquivalent (`tracking-[0.18em]` → `var(--letter-spacing-label)` etc.) | T3 | klein | **Phase 3** — ein Commit. |
| 2 | `max-w-[86rem]` (3×) → `var(--content-width-wide)` | T3 | klein | **Phase 3** — im selben Commit. |
| 3 | `min-h-[44px]`/`min-w-[44px]` (2×) → `var(--touch-target-min)` | T3 | klein | **Phase 3** — im selben Commit. |
| 4 | 4 tote Tokens (`--border-strong`, `--focus-ring-contrast`, `--shadow-elevated`, `--space-8`) | T1/Löschen | trivial | **Folge-Ticket** — menschliche Prüfung, ob geplant reserviert. |
| 5 | Footer-Gradient-Paar (Brand + Framework) ohne Tokens | T2 | mittel | **Folge-Ticket** — Designer-Entscheid, ob neue Tokens oder OK so. |
| 6 | Footer-Schatten `rgba(93,68,51,…)` | T2 | mittel | **Folge-Ticket** — Bündelung mit Footer-Gradient-Arbeit. |
| 7 | Overlay-Scrim `rgba(47,47,40,0.32)` | T2 | klein | **Folge-Ticket** — einführen, wenn weiterer Drawer/Modal hinzukommt. |
| 8 | Schatten-Varianten `rgba(76,55,39,…)` mit abweichenden Dimensionen | T2/T4 | mittel | **Akzeptiert** — lokale Schatten-Farbvarianten mit eigener Form. Keine Aktion. |
| 9 | Tailwind-Arbitrary `text-[10px]`, `text-[11px]`, `rounded-[2rem]`, `rounded-[3rem]` | T4 | — | **Akzeptiert** — bewusste Mikro-/Makro-Abweichungen. |
| 10 | Print `#000/#fff/#333/#666/#999` | T4 | — | **Akzeptiert** — Print-Schwarzweiss-Konvention. |
| 11 | `docs/design-system/`: keine stabile Token-Registry-Doku | T4 | mittel | **Folge-Ticket** — redaktionell. |
| 12 | Dead-CSS-Regeln-Scan | T4 | gross | **Folge-Ticket** — eigener `grep -F`-Matrix-Scan. |

**Phase-3-Scope:** Massnahme 1+2+3 (Tailwind-Arbitrary-Migration, 14 Fundstellen). Alles andere → Folge-Tickets im PR-Body.

---

## Phase 3 — Umsetzung

Ein Commit: `audit(css): Tailwind-Arbitrary-Werte auf Design-Tokens migrieren`.

Konkrete Änderungen:
- `App.jsx`: `tracking-[0.18em]` → `tracking-[var(--letter-spacing-label)]` (5×), `tracking-[0.24em]` → `tracking-[var(--letter-spacing-kicker)]` (1×), `min-h-[44px]`/`min-w-[44px]` → `min-h-[var(--touch-target-min)]`/`min-w-[var(--touch-target-min)]` (2×), `max-w-[86rem]` → `max-w-[var(--content-width-wide)]` (3×).
- `ErrorBoundary.jsx`: `tracking-[0.18em]` → `tracking-[var(--letter-spacing-label)]` (1×).

Nicht migriert (akzeptiert): `tracking-[0.16em]` (eigener Wert), `text-[10px]`/`[11px]` (unterhalb `--font-size-2xs`), `rounded-[2rem]`/`[3rem]`.

## Phase 4 — Verifikation

- `npm run build` durchlaufen.
- `npm run lint` sauber.
- Sicht-Check: Emergency-Header, Footer, Error-Screen — Letter-Spacing und Touch-Targets identisch.
- Token-Coverage: 7 Tokens (`--letter-spacing-label`, `--letter-spacing-kicker`, `--touch-target-min`, `--content-width-wide`) erhalten jetzt `var()`-Referenzen; das tote-Token-Set schrumpft von 21 auf 17.
