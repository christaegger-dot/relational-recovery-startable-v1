# Audit 20 — Prerender-Integrität

**Datum:** 2026-04-21
**Branch:** `claude/audit-20-prerender`
**Scope:** Konsistenz zwischen committetem Snapshot (`src/prerendered/start-body.html`) und aktueller Code-/Daten-Basis; Abbildung First-Paint-relevanter Inhalte (Notfallnummern, Nav, Hero).

## Warum pre-release-relevant

Der Prerender ist der erste Eindruck für Nutzer:innen ohne JS (Crawler, Screenreader beim First Paint, Netzwerk-Drops) und für das Time-to-Meaningful-Content-Budget (LCP). Audit 16 und Audit 18 haben bereits zweimal Drift produziert (Tailwind-Arbitrary-Migrationen ohne Snapshot-Refresh). Nachgelagerte Fehler sind schwer zu sehen, weil `createRoot` (nicht `hydrateRoot`) den Snapshot einfach überschreibt — eine stale Momentaufnahme fällt nicht auf, bis jemand den ersten Paint anschaut.

## Inventur (Phase 1)

### 1.1 Drift-Check Snapshot ↔ Source ✓ Pass

- Snapshot-Letztstand: commit `23dc902` (Audit 18, 2026-04-21) — heute.
- Seit Snapshot-Regen nur ein Commit in `src/`: PR #140. Diff ist reine Prettier-Formatierung (`<img>`-Multi-Line → Single-Line) ohne DOM-Effekt.
- Rendered Counts im Snapshot — Module `3`, Netzwerkstellen `19` — stimmen mit aktuellen `E_MODULES.length=3`, `FACHSTELLEN.length=19` überein.
- `VIGNETTEN.length=1` < 3 → Trainingsfälle-Karte korrekt ausgeblendet (Schwelle in `HomeLandingTemplate.jsx`).
- Alle 8 `TAB_ITEMS`-Labels (Start / Lernmodule / Training / Glossar / Material / Evidenz / Toolbox / Netzwerk) im Snapshot vorhanden.
- Hero-Copy 1:1 Match: Eyebrow, Title, Accent, Lead, Audience-Note, Aside, drei Buttons.

### 1.2 Notfallnummern im Snapshot ✓ Pass

Statisch im HTML-Body (nicht JS-injected), also auch ohne JS-Hydration sichtbar:

- `<a href="tel:144">144</a>` — Sanitätsnotruf
- `<a href="tel:+41800336655">0800 33 66 55</a>` — AERZTEFON Kanton Zürich
- `<a href="tel:147">147</a>` — Pro Juventute

Zusätzlich: `print-notfall-footer` als Print-only-Fallback am Body-Ende. Erfüllt die CLAUDE.md-Anforderung („Notfallnummern müssen immer erreichbar bleiben").

### 1.3 Prerender-Scope ✓ Pass

`scripts/inject-prerender.mjs` schreibt ausschließlich `dist/index.html`. Andere Routen sind Hash-basiert im SPA-Modell (kein separates `material/index.html` o. ä.) — Scope ist strukturell korrekt. Der Script ist idempotent: wenn `<div id="root" data-prerendered="start">` bereits vorhanden ist, wird der Step übersprungen (Re-Build ohne Vite-Clean bleibt sauber).

### 1.4 Hash-/Anchor-Konsistenz ✓ Pass

Snapshot enthält genau einen Anchor: `<a href="#main-content">Zum Inhalt springen</a>` (Skip-Link). Ziel `id="main-content"` ist im Snapshot vorhanden. Tab-Navigation ist `<button>`-basiert (kein `href="#tab"` im DOM) — konsistent mit hash-basierter clientseitiger Navigation: beim Mount übernimmt React das Routing via `AppStateContext`, der Snapshot zeigt bewusst die Start-Route.

### 1.5 Asset-Path-Stabilität ⚠ Latentes Risiko

Snapshot referenziert **einen** Vite-gehashten Asset:

```
/assets/relational-recovery-hero-v3-web-f61AzqVV.webp
```

Verifikations-Rebuild mit `rm -rf dist/ && npm run build` erzeugt denselben Hash `f61AzqVV` — Vite content-hasht, solange die `.webp`-Bytes und der Hash-Algorithmus stabil bleiben.

**Risikopfad:** Wenn jemand
- das Hero-Asset austauscht (Re-Export mit anderer Kompression → neue Bytes → neuer Hash), oder
- Vite auf eine Minor-Version wechselt, die den Hash-Algorithmus / das Salt anpasst,

und **vergisst `npm run refresh-prerender`** auszuführen, referenziert der Snapshot einen 404-Asset. Der Bug ist still: die Seite hydratisiert über `createRoot`, React überschreibt den Snapshot — aber **der erste Paint** zeigt eine leere Bild-Box. LCP-Regression, die in keinem Unit- oder E2E-Test auftaucht.

**Mitigation:** Build-Zeit-Guard im `inject-prerender.mjs` — nach dem Inject prüfen, dass alle `/assets/...`-Pfade aus dem Snapshot auch in `dist/assets/` existieren. Fail-Fast mit aussagekräftiger Meldung („Snapshot ist stale — bitte `npm run refresh-prerender` ausführen und committen.")

### 1.6 Hydration-Match ✓ Pass (No-op)

`src/main.jsx` nutzt `createRoot()` (nicht `hydrateRoot()`). React erwartet **keine** strukturelle DOM-Kongruenz mit dem Snapshot und räumt beim Mount einfach auf. Das ist die bewusste Architekturentscheidung aus Audit 10 (siehe Kommentare in `scripts/inject-prerender.mjs` Z. 1-21): CI-Build darf auch mit veraltetem Snapshot durchlaufen — die Seite rendert clientseitig ohnehin neu.

Für Audit-20-Zwecke: keine Hydration-Warnings möglich, kein Handlungsbedarf hier.

## Triage (Phase 2)

| # | Finding | Schweregrad | Aktion |
| --- | --- | --- | --- |
| 1.1 | Snapshot ist in sync | — | Kein Handlungsbedarf |
| 1.2 | Notfallnummern statisch im Snapshot | — | Kein Handlungsbedarf |
| 1.3 | Prerender-Scope deklarativ korrekt | — | Kein Handlungsbedarf |
| 1.4 | Anchor `#main-content` konsistent | — | Kein Handlungsbedarf |
| 1.5 | Stale-Asset-Path-Risiko | **P2** | Build-Zeit-Guard in `inject-prerender.mjs` ergänzen |
| 1.6 | `createRoot` statt `hydrateRoot` | — | Kein Handlungsbedarf (bewusste Wahl) |

Einziger umsetzungswürdiger Befund: **1.5 — Asset-Path-Guard**. Der Guard verhindert latentes Regression-Risiko, ist billig (wenige Zeilen) und erhöht kein Build-Zeit-Budget merklich.

## Umsetzung (Phase 3)

Fix in `scripts/inject-prerender.mjs`: Nach dem Inject Regex-Extraktion der `/assets/...`-Pfade aus dem Snapshot, Cross-Reference gegen `dist/assets/`. Fail-Fast, wenn einer fehlt.

Siehe Diff in PR.

## Verifikation (Phase 4)

- `rm -rf dist/ && npm run build` → Build grün, keine Guard-Meldung (Snapshot ist aktuell).
- Gegentest: Snapshot manuell auf Hash `f61AzqVV-CORRUPT` patchen → Build fehlgeschlagen mit erwarteter Meldung → Snapshot wiederhergestellt.
- `npm run lint` → grün.
- `npm run format:check` → grün.

## Ergebnis

**Clean Bill mit einem P2-Fix.** Der Prerender ist inhaltlich synchron mit der Source-Basis, Notfallnummern sind im First Paint vorhanden, Scope ist korrekt. Einziges latentes Risiko war ein stale-Asset-Pfad ohne Absicherung — mit dem Build-Zeit-Guard ist das geschlossen.

## Follow-ups

Keine. Das Asset-Path-Thema ist durch den Guard abgedeckt; eine zusätzliche Doku-Erwähnung in `docs/content-pflege.md` ist nicht nötig, weil der Guard selbst die Meldung ausgibt („bitte `npm run refresh-prerender` ausführen").
