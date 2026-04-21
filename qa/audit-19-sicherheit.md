# Audit 19 — Sicherheit + Deployment-Hygiene

**Datum:** 2026-04-21
**Branch:** `claude/audit-19-sicherheit`
**Prompt:** `qa/prompts/audit-sicherheit.md`

---

## Phase 1 — Inventur

### 1.1 Secret-Scan

Patterns geprüft: `sk-*`, `ghp_*`, `gho_*`, `ghs_*`, `nfp_*`, `xoxb-*`, `xoxp-*`, `AIza…`, `AKIA…`, `-----BEGIN … PRIVATE KEY-----`, Variablen-Form `password/apiKey/secret/token`, URL-Credentials `user:pass@host`.

Scope: gesamtes Repo ausser `node_modules/`, `dist/`, `output/`, `qa/mobile-artifacts/`.

**Ergebnis: 0 Treffer.** (`sk-`-Matches in `qa/prompts/audit-sicherheit.md` sind die Dokumentation der Scan-Patterns selbst, nicht echte Secrets.)

### 1.2 Git-History-Check

- `git log --all -p -S "sk-" -S "password=" -S "apiKey"` — nur Matches aus dem Audit-Prompt-File selbst (Dokumentation).
- `git log --all --full-history -- .env .env.local` — **leer.** Keine `.env` wurde je committed.

**Ergebnis: 0 historische Secret-Leaks.**

### 1.3 `.gitignore`-Prüfung

`.gitignore` deckt ab: `node_modules`, `dist`, `.vite`, `.DS_Store`, `output`, `tmp/`, `pnpm-lock.yaml`, `test-results/`, `playwright-report/`, `coverage/`, `qa-artifacts/`, `.env` + `.env.*` (ausser `!.env.example`), `.idea/`, `.vscode/`, `*.swp`, `*.log`, `*.tgz`, `.netlify`.

**Vollständig.** Kein tracked File im Arbeitsbaum, das dort nicht hingehört.

### 1.4 HTTP-Security-Headers

`netlify.toml` setzt:

| Header | Wert |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Cache-Control` (Root + `*.html`) | `no-cache, no-store, must-revalidate` |
| `Cache-Control` (`/assets/*`) | `public, max-age=31536000, immutable` |
| **`Content-Security-Policy`** | **bewusst nicht gesetzt** — begründet im File (Inline-Styles/SVG aus React/Vite). |
| `Cross-Origin-Opener-Policy` | nicht gesetzt |
| `Cross-Origin-Embedder-Policy` | nicht gesetzt |

Baseline-Security-Headers komplett. CSP ist als reconsider-Ticket gelistet; mit React 19 + Vite 7 und dem neuen Build (ohne externe Ressourcen, kein `fonts.googleapis`) wäre eine Policy wie `default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'` realistisch — Empfehlung als P3-Ticket, kein Sofort-Fix.

### 1.5 Dependency-Vulnerabilities

```
npm audit --omit=dev --json  →  {info:0, low:0, moderate:0, high:0, critical:0, total:0}
npm audit --json             →  {info:0, low:0, moderate:0, high:0, critical:0, total:0}
```

**Ergebnis: 0 Vulnerabilities** (Prod + Dev). Starker Zustand. Empfehlung: quartalsweiser `npm audit`-Rerun.

### 1.6 Inline-Scripts, eval, Dangerous Patterns

- `dangerouslySetInnerHTML`: **0 Treffer** in `src/**/*.jsx`. Entspricht CLAUDE.md-Regel.
- `eval(`, `new Function(`: **0 Treffer**.
- `setTimeout('string', …)` (String-erstes-Argument): **0 Treffer**.
- Inline `<script>` in `index.html`:
  - `<script type="application/ld+json">` — Schema.org Organization-Markup für SEO, statische Daten, kein Code.
  - `<script type="module" src="/src/main.jsx">` — der reguläre Vite-Bootstrap.

Beide legitim, kein XSS-Vektor.

### 1.7 Externe Links und Third-Party

`target="_blank"` in produktivem Code (ohne Test-/Prompt-Dateien):
- `src/templates/NetworkPageTemplate.jsx:195` — `rel="noopener noreferrer"` ✅
- `src/components/closing/ClosingSection.jsx:345` — `rel="noopener noreferrer"` ✅
- `src/prerendered/start-body.html` (1 anchor) — `rel="noopener noreferrer"` ✅

**Ergebnis: 0 externe Links ohne `rel="noopener noreferrer"`.**

Third-Party-Ressourcen im Build (`dist/`): keine. `fonts.googleapis`/`cdn.*`-Treffer sind ausschliesslich Kommentar-Nennungen aus Audit 16.

### 1.8 localStorage / sessionStorage

- **Einziger Key:** `rr_app_state_v5` (konstante in `src/data/appShellContent.js:166`).
- **Geschriebene Felder** (`AppStateContext.jsx:88-101`): `activeTab`, `currentVignette`, `selectedOption` (Vignetten-Antworten), `searchTerm`, `activeResourceFilter`, `quizState`, `showSafeNote`, `score` (Assessment-Risk), `completedModules`, Meta-Felder `version`, `updatedAt`, `sourceId`.
- **sessionStorage**: nicht genutzt.
- **PII-/Gesundheitsdaten-Bewertung**: keine Namen, keine Geburtsdaten, keine Fall-Beschreibungen. Nur UI-State + anonyme Selbsteinschätzungs-Werte. **Keine PII, keine Health-Records.** CLAUDE.md-Aussage bestätigt.

### 1.9 Formulare und User-Input

- `<form>`-Elemente in `src/**/*.jsx`: **0 Treffer.**
- `onSubmit=`: **0 Treffer.**

Keine submit-basierten Forms. User-Input fliesst ausschliesslich in localStorage-basierten State, nicht an externe Endpoints.

### 1.10 Deployment-Konfiguration

- `netlify.toml`: `[build] command = "npm run build"`, `publish = "dist"`. Sauber.
- `vite.config.js`: kein `define:` mit Secrets, nur `manualChunks` aus Audit 16.
- `scripts/replace-env.mjs`: ersetzt `__VITE_BASE_URL__`/`%VITE_BASE_URL%` in `dist/robots.txt`, `dist/sitemap.xml`, `dist/index.html`. Liest `.env` via Regex-Parse, ohne `eval`/Shell-Exec. **Keine Command-Injection-Fläche.**
- `scripts/inject-prerender.mjs`: liest `src/prerendered/start-body.html`, ersetzt `<div id="root"></div>` in `dist/index.html`. Simple String-Substitution, kein Shell-Call.
- `.github/workflows/ci.yml`: reiner Integritäts-Gate (Lint + Format + Build), kein Deploy-Pfad, keine Secrets, keine `VITE_BASE_URL`-Env (Fallback in `replace-env.mjs`).

### 1.11 Gesamtbild + Risikoeinschätzung

| Prüfpunkt | Befund |
|---|---|
| Exponierte Secrets (aktuell) | 0 |
| Secrets in Git-History | 0 |
| `.env*` je committed | nein |
| HTTP-Security-Headers | 5 Baseline gesetzt; CSP + COOP/COEP dokumentiert offen |
| `npm audit` (prod / dev) | 0 / 0 |
| `dangerouslySetInnerHTML` / `eval` / `Function` / `setTimeout(string)` | 0 / 0 / 0 / 0 |
| Inline-Scripts | 2 (JSON-LD, Vite-Bootstrap) — beide legitim |
| Externe Links ohne `rel="noopener noreferrer"` | 0 |
| Third-Party im Build-Output | 0 |
| localStorage-Inhalt PII | nein |
| Forms / submit-Endpoints | 0 |
| Command-Injection in Build-Scripts | 0 |

**Risikoeinschätzung: niedrig.**

Keine kritischen oder hohen Befunde. Drei Themen mit P3-Charakter bleiben als Folge-Tickets stehen (CSP, COOP/COEP, Audit-Cadence).

**Zusammenfassung Phase 1 (5 Zeilen):**
Clean Bill. Secret-Scan + Git-History leer, `.env` nie committed. `npm audit` prod+dev = 0. React-Sicherheits-Smells (`dangerouslySetInnerHTML`/`eval`/`Function`) alle null. Alle `target="_blank"` haben `rel="noopener noreferrer"`. localStorage enthält UI-State + anonyme Selbsteinschätzung, keine PII. Offen als P3: CSP ernsthaft erwägen (Build ist heute inline-style-limitiert, aber ohne externe Ressourcen), COOP/COEP als Ergänzung, `npm audit` als Quartals-Cadence.

---

## Phase 2 — Massnahmenkatalog

| # | Befund | Schwere | Aufwand | Entscheidung |
|---|---|---|---|---|
| 1 | Alle Phase-1-Checks bestanden | — | — | Keine Code-Änderungen in Phase 3. |
| 2 | CSP-Header fehlt (dokumentiert) | P3 | mittel | **Folge-Ticket**: Realistische Policy skizzieren, gegen Build testen, stufenweise (Report-Only → Enforce). Empfehlung: `default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`. |
| 3 | `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` nicht gesetzt | P3 | klein | **Folge-Ticket**: `COOP: same-origin` ist risikolos; `COEP: require-corp` würde eingebettete Ressourcen brechen (derzeit keine vorhanden, aber Flexibilitäts-Verlust). |
| 4 | Kein regelmässiger Security-Cadence | P3 | klein | **Folge-Ticket**: Quartals-`npm audit` als CI-Schritt oder Reminder-Issue. |

**Phase-3-Scope:** keine Code-Änderungen. Nur der Bericht wird committed. Die drei Folge-Tickets stehen im PR-Body.

---

## Phase 3 — Umsetzung

Keine Code-Änderungen. Ein Commit: `audit(sec): Audit 19 Sicherheit + Deployment-Hygiene — Clean Bill`.

## Phase 4 — Verifikation

- `npm run lint` + `npm run build` unverändert sauber (kein neuer Code eingeführt).
- `git diff main…HEAD` enthält ausschliesslich `qa/audit-19-sicherheit.md`.
- `npm audit --omit=dev` bestätigt 0 critical/high.
- Security-Headers-Live-Check gegen deployte Netlify-Domain als Folge-Aufgabe des menschlichen Reviewers (Sandbox-Egress blockt externe Requests — siehe Audit 17).
