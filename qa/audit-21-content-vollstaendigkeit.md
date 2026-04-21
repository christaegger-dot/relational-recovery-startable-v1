# Audit 21 — Content-Vollständigkeit + Stub-Sweep

**Datum:** 2026-04-21
**Branch:** `claude/audit-21-content-sweep`
**Scope:** Pre-Release-Absicherung, dass kein STUB/TODO/FIXME-Content in Produktion gelangt. Unterscheidung: echter sichtbarer Content-Stub vs. Entwickler-Kommentar vs. dormant infrastructure.

## Warum pre-release-relevant

Ein STUB oder „INHALT AUSSTEHEND" in einer sichtbaren Vignette, einer Literaturangabe oder einer Fachstellen-Karte wäre schwer peinlich gegenüber einer Fachzielgruppe, die auf redaktionelle Verlässlichkeit reagiert. Die Audits 05 (Vignetten), 12 (Literatur) und 13 (Wave-3-Verifikation) haben bewusst Platzhalter hinterlassen; der Abschluss-Pass prüft, dass nichts davon auf die Nutzenden durchschlägt.

## Inventur (Phase 1)

Grep-Pattern: `STUB|TODO|FIXME|XXX|PLACEHOLDER|INHALT AUSSTEHEND|Lorem|Dummy|Platzhalter|coming soon|demnaechst|folgt noch|TBD|tbc` — case-insensitive, Scope `src/` (Runtime-Code).

### A. Echte Content-Stubs, die User sehen würden: **keine** ✓

Keine Treffer in gerenderten Strings (JSX, Data-Values). Alle geprüften Datenfelder (`title`, `label`, `copy`, `description`, `text`) haben substantiellen Inhalt.

Zusatz-Checks (alle negativ):
- `href="#"` / `href=""` / `href="javascript:..."` / `href="#void"` — kein Treffer.
- `example.com` / `example.org` — kein Treffer.
- `TBD` / `N/A` / `XXX` in rendered Content — kein Treffer.
- `console.log` / `console.debug` / `debugger` — kein Treffer.
- `Lorem ipsum` / `Dummy` / `Beispieltext` — kein Treffer.

`<input placeholder="…">`-Werte (3 Treffer) sind legitime UI-Hinweise mit konkreten deutschen Beispielen — nicht zu verwechseln mit Content-Platzhaltern.

### B. Dokumentierte Content-Lücken (tracked, non-shipping)

| # | Ort | Kind | Shipt? | Getrackt in | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | `src/data/learningContent.js:25,36` | STUB-Kommentar (V2, V3 Vignetten) | **Nein** — nur Kommentarzeilen, nicht im VIGNETTEN-Array | Audit 05, `docs/content-pflege.md` | Gate: externe redaktionelle Ausarbeitung nötig; zusätzlich UI-Signal-Schwelle (`VIGNETTE_COUNT >= 3`) blendet Start-Stats automatisch aus, solange < 3 |
| 2 | `src/data/sourcesContent.js:148` | TODO-Kommentar zur Plass-&-Wiegand-Grefe-Duplikatsfrage | **Ja** — als realer Quellen-Eintrag mit Titel, Jahr, Autor:innen | Audit 12, `docs/content-pflege.md` unter „Offene redaktionelle Klärungen" | Dauer-Eintrag, bis Auftraggeberin entscheidet: Kohlhammer- + Beltz-Band sind ein Werk oder zwei. Kein Stub, nur Redaktions-Frage. |
| 3 | `src/components/ui/GlossarLink.jsx` | Dormant-Komponente (50 LOC) | **Nein** — nicht importiert, wird von Vite tree-shaken. `grep` im Build-Bundle `dist/assets/*.js` bestätigt: Komponente taucht in gebautem Code nicht auf. | Audit 11-12 W3b, `docs/content-pflege.md` | Infrastruktur ohne Call-Sites; Aktivierung braucht redaktionelle Fliesstext-Einbettung in Content-Dateien. Kein Bundle-Overhead, kein User-Signal. |

### C. Dokumentations-Drift (eine Stelle)

`src/data/networkContent.js:171` trug den Kommentar:

> `// Kuratierte Liste folgt – Platzhalter-Einträge markiert.`

Fakt ist: Das `LEGAL_COUNSELING_RESOURCES`-Array enthält 5 gepflegte, reale Einträge (Pro Mente Sana, Pro Juventute Elternberatung, kjz Kanton Zürich, KESB-Verfahren-Infoseite, Pro Juventute 147). Die „Platzhalter"-Formulierung ist ein Audit-03-Era-Artefakt, das stehen geblieben ist, obwohl die Kuration abgeschlossen wurde.

## Triage (Phase 2)

| # | Finding | Aktion |
| --- | --- | --- |
| A | Keine sichtbaren Stubs | Kein Handlungsbedarf ✓ |
| B1 | 2 Vignette-STUBs als Kommentare | Stehen lassen — Gate durch externe Redaktion + UI-Schwelle |
| B2 | Plass-Quellen-TODO | Stehen lassen — Redaktions-Klärung pending, Eintrag shippt real |
| B3 | GlossarLink dormant | Stehen lassen — tree-shaken, getrackte Infrastruktur |
| C | Stale Comment in networkContent.js:171 | **Fix**: Kommentar an aktuellen Stand anpassen |

Begründung B3 (nicht löschen): Die CLAUDE.md-Regel „Don't design for hypothetical future requirements" adressiert neue Abstraktionen, nicht bestehende Infrastruktur mit dokumentiertem P3-Follow-up. Ein Audit-Pre-Release-Sweep ist der falsche Moment, um Architekturentscheidungen aus Audit 12 zu revertieren. Wenn die Fliesstext-Einbettung tatsächlich nicht mehr kommt, gehört das in einen eigenen PR mit redaktioneller Begründung.

## Umsetzung (Phase 3)

Siehe Diff: `src/data/networkContent.js` Zeile 169-171, Kommentar aktualisiert.

## Verifikation (Phase 4)

- `npm run lint` → grün.
- `npm run format:check` → grün.
- `rm -rf dist && npm run build` → grün (Snapshot + Guard aus Audit 20 passieren).
- Re-Grep `Platzhalter|STUB` in `src/` → nur die bekannten, dokumentierten Treffer bleiben übrig.

## Ergebnis

**Clean Bill.** Keine sichtbaren Content-Stubs in Produktion. Drei dokumentierte Content-Debt-Punkte (zwei Vignetten, eine Literaturfrage) sind korrekt getrackt und gated. Eine dormant Komponente ohne Bundle-Impact bleibt als Audit-12-Infrastruktur stehen. Eine Stelle mit stale Doc-Kommentar in den Daten aktualisiert.

## Follow-ups

Keine. Alle externen Redaktions-Pendings sind bereits in `docs/content-pflege.md` erfasst.
