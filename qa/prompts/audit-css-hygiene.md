# Audit-Prompt — Design-Token + CSS-Hygiene

**Einsatz:** Nach vielen Feature-Ergänzungen, bei uneinheitlich wirkenden
Farben/Abständen, vor Design-System-Dokumentation.

**Was es findet:** Hardcodierte Farben und Abstände, tote Tokens, inkonsistente
Nutzung, unerklärte Sonderfälle.

**Bauzeit-Hinweis:** Das Token-System dieses Repos ist ungewöhnlich sauber
strukturiert (`src/styles/tokens.css`, 169 Zeilen mit Kontrast-Kommentaren).
Der Audit soll es nicht umkrempeln, sondern hartcodierte Abweichungen finden.

---

```
# Audit: Design-Token und CSS-Hygiene

## Kontext

Du pruefst das Styling-System von Relational Recovery auf Konsistenz,
Token-Nutzung und Wartbarkeit. Die Dreiteilung ist:

- `src/styles/tokens.css` — Single Source of Truth fuer Farben, Abstaende,
  Radii, Typografie, Motion. Kontrast-Zusagen sind als Kommentare
  dokumentiert.
- `src/styles/primitives.css` — `ui-`-praefixierte Komponenten-Klassen
  (BEM-aehnlich).
- `src/styles/app-global.css` — globale Regeln inkl. `@media print`
  (Abschnitt 9).

Tailwind 4 ist via `@tailwindcss/vite` eingebunden; Utility-Klassen werden
inline in JSX verwendet.

Kernregel: **Farb-Identitaet hat Vorrang vor Token-Coverage.** "Close
enough" ist bei Farben kein Argument — wenn ein Hex-Wert nicht exakt zu
einem Token passt, wird er nicht migriert, sondern als "neuer Token noetig"
markiert.

## Constraints

- Arbeitsbranch: der aktuelle Session-Branch.
- Bericht: `qa/audit-<nnn>-css-hygiene.md` (naechste freie Nummer ab 15).
- Keine visuellen Aenderungen in Phase 1/2. Nur Dokumentation.
- In Phase 3 nur Farb-Migrationen, die 1:1 auf einen bestehenden Token
  treffen. Sonst Token-Einfuehrung mit Freigabe.

## Phase 1 — Inventur (read-only)

### 1.1 Token-System erfassen

- `tokens.css` lesen, Token-Kategorien + Anzahl zaehlen (Farben, Abstaende,
  Fontsizes, Radii, Schatten, Motion).
- Token-Aliase identifizieren (Token A referenziert Token B).
- Dokumentations-Status: `docs/design-system/` durchgehen — was ist
  dokumentiert, was fehlt?

### 1.2 Hardcodierte Werte (systematisch)

Grep im gesamten Repo (ausser `tokens.css` und `node_modules`):
- **Hex-Farben** (`#[0-9a-fA-F]{3,8}`): alle Treffer in
  `src/styles/primitives.css`, `src/styles/app-global.css`, JSX-Dateien
  mit inline `style=`, sowie CSS-in-JS, falls vorhanden.
- **rgb/rgba/hsl/oklch** ausserhalb `tokens.css`.
- **px-Werte** in `margin`, `padding`, `gap`, `font-size`, `border-radius`,
  `box-shadow`.
- **Inline-Tailwind-Arbitrary-Werte** (`[12px]`, `[#abc]`) in JSX.

Pro Fund: Quelldatei, Zeile, Wert, naechster passender Token + Diff
(exakt / ~1-2px / farblich drift / kein Token vorhanden).

Ausnahmen, die NICHT geflaggt werden:
- Werte in `@media print` (Print-Typografie hat eigene Regeln — siehe
  CLAUDE.md "Material-Handouts").
- Werte innerhalb von SVG-`<svg>`-Tags (dekorative Illustrationen).
- Pfad-Definitionen (`d="M..."`).

### 1.3 Token-Nutzungs-Analyse

Pro Token in `tokens.css`:
- Wird er referenziert (Grep `var\(--<name>\)`)? Anzahl Treffer.
- Tote Tokens: definiert, nie referenziert.
- Heissgenutzte Tokens: > 20 Referenzen (Info fuer Change-Impact).

### 1.4 CSS-Strukturcheck

- `primitives.css`: 4146 Zeilen. Gibt es BEM-Blocks, die sich
  konzeptuell ueberschneiden? Duplizierte Regel-Koerper?
- `app-global.css`: 614 Zeilen. Klar abgegrenzte Sections? Kommentare
  als Nummerierung?
- Tailwind-Utility vs. `.ui-*`-Klassen: gibt es JSX, die dasselbe Styling
  doppelt bekommt (Utility + Klasse)?

### 1.5 Tote CSS-Regeln

Grep-gestuetzte Heuristik:
- Selektoren in `primitives.css` (`.ui-*`): kommt die Klasse in JSX vor?
  Wenn nicht: Kandidat fuer tote Regel.
- `@media`-Queries auf exotische Breakpoints, die nicht im Rest der App
  vorkommen.
- Leere CSS-Dateien oder fast-leere.

### 1.6 Print-Konsistenz

Da der Material-Tab druckbare Handouts enthaelt:
- `@media print`-Regeln in `app-global.css` (Abschnitt 9) — werden sie
  alle `.ui-material-handout*`-Klassen abgedeckt, die in `MaterialHandouts.jsx`
  existieren?
- Konflikte zwischen Bildschirm- und Print-Tokens sauber per `!important`
  getrennt, wo noetig (siehe CLAUDE.md zu `MaterialAgeGrid`).

### 1.7 Gesamtbild

Tabelle:
- Token-Zahlen (aktiv / tot / alias).
- Hardcodierte Werte nach Typ (Farbe/Spacing/Fontsize/Radius/Shadow) und
  nach Ort.
- Tote Regeln (geschaetzt).
- Strukturbewertung je Datei (A/B/C).

Top-5 Hot-Spots.

**STOPP.** Fasse Phase 1 in 5-10 Zeilen zusammen und warte auf Freigabe.

## Phase 2 — Massnahmenkatalog

Pro Hex-/px-Wert eine Entscheidung vorschlagen:
- **T1 — Token angleichen**: wenn der Token selbst den falschen Wert hat.
- **T2 — Neuen Token einfuehren**: wenn der Wert eine eigene semantische
  Rolle hat. Namensvorschlag + Kommentar-Zweck.
- **T3 — Migrieren zu bestehendem Token**: nur wenn Diff = 0 (Farbe) oder
  semantisch gerechtfertigt (Spacing).
- **T4 — Als Sonderfall belassen**: echte Ausnahme, im Bericht begruenden.

Spacing-Hardcodes (z.B. `margin: 12px`): lassen sie sich zu einem Spacing-
Token (`--space-3` etc.) migrieren? Wenn ja: in einem Commit buendeln.

Tote Tokens und Regeln: koennen sie ersatzlos gestrichen werden? Falls
unsicher: im Bericht als "Kandidat, menschliche Pruefung noetig" flaggen.

**STOPP.** Warte auf Freigabe fuer Phase 3.

## Phase 3 — Umsetzung

Pro Massnahme ein Commit. Commit-Pattern: `audit(css): <was>`.
Bei Farb-Migrationen: nach jedem Commit `npm run build` + Sichtkontrolle
der Preview. Falls Screenshots-Tool verfuegbar (z.B. das bestehende
`scripts/visual-qa.mjs`): Vorher/Nachher-Screenshots in den Commit-Body.

## Phase 4 — Verifikation

- `npm run lint` + `npm run build` sauber.
- Visueller Vorher/Nachher auf mind. 3 Routen (Start, Toolbox, Material).
- Keine Farb-Verschiebungen.
- Token-Coverage-Statistik: Anteil tokenisierter vs. hardcodierter Werte
  (Zahl vorher/nachher).
```
