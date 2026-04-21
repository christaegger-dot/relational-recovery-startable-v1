# Audit-Prompt — Sicherheit + Deployment-Hygiene

**Einsatz:** Vor dem ersten öffentlichen Deployment, nach Security-relevanten
Änderungen, regelmässig (quartalsweise) für Dependency-Hygiene.

**Was es findet:** Exponierte Secrets, fehlende HTTP-Headers, Dependency-CVEs,
offene Debug-Endpoints, unsichere Formulare, localStorage-Risiken.

**Bauzeit-Hinweis:** Relational Recovery ist eine rein clientseitige SPA ohne
Backend, ohne API-Calls, ohne eigene Auth. Das reduziert die Angriffsfläche
stark, aber verlagert sie auf Build-Artefakte, Deployment und Third-Party-
Links. `netlify.toml` setzt bereits die wichtigsten Header (bewusst ohne CSP
— Begründung im File).

---

```
# Audit: Sicherheit und Deployment-Hygiene

## Kontext

Du pruefst Relational Recovery (rein clientseitige React 19 SPA, Deployment
auf Netlify) auf Sicherheitsrisiken und Deployment-Hygiene.

Bestandsaufnahme zur Orientierung:
- Kein Backend, keine API-Calls, keine eigenen Credentials.
- `netlify.toml` setzt HSTS, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, Permissions-Policy. **CSP ist bewusst NICHT gesetzt** —
  die Begruendung steht als Kommentar im File. Das ist kein Defekt, sondern
  eine dokumentierte Design-Entscheidung zur Reconsideration.
- localStorage-Key: `rr_app_state_v5` (enthaelt keine personenbezogenen
  Daten — siehe CLAUDE.md).
- `.env.example` ist tracked, `.env*` ist in `.gitignore`.

## Constraints

- Arbeitsbranch: der aktuelle Session-Branch.
- Bericht: `qa/audit-<nnn>-sicherheit.md` (naechste freie Nummer ab 15).
- **Gefundene Secrets werden SOFORT gemeldet**, nicht erst im Phase-2-Bericht —
  menschliche Revocation hat Vorrang.
- Keine funktionalen Aenderungen in Phase 1/2.
- Kein `npm install` ohne Freigabe; `npm audit` geht auch ohne Install.

## Phase 1 — Inventur (read-only)

### 1.1 Secret-Scan (oberste Prioritaet)

Systematisch grep nach:
- Muster: `sk-`, `ghp_`, `gho_`, `ghs_`, `nfp_`, `xoxb-`, `xoxp-`,
  `AIza[0-9A-Za-z_\-]{35}`, `AKIA[0-9A-Z]{16}`.
- Variablennamen: `password\s*=`, `apiKey`, `api_key`, `secret\s*=`,
  `token\s*=`, `private_key`, `-----BEGIN .* PRIVATE KEY-----`.
- URLs mit Credentials: `https?://[^/\s]+:[^@\s]+@`.
- Base64-Muster (>= 40 Zeichen) in Code-Dateien — nur als Heuristik, nicht
  jeder Treffer ist ein Secret.

Scope: das gesamte Repo ausser `node_modules/`, `dist/`, `output/`,
`qa/mobile-artifacts/`.

**Wenn ein echtes Secret gefunden wird: SOFORT STOPPEN, melden, auf
Revocation warten, bevor der Audit fortgesetzt wird.**

### 1.2 Git-History-Check

- `git log --all -p -S "sk-" -S "password=" -S "apiKey"` — wurde jemals
  ein Secret-Muster im Diff eingefuehrt?
- `git log --all --full-history -- .env .env.local` — wurde eine echte
  `.env` jemals committed?

Falls Funde: im Bericht dokumentieren, **Secret gilt als kompromittiert,
auch wenn "geloescht"**. Revocation + BFG/filter-repo als Massnahme.

### 1.3 .gitignore-Pruefung

- `.gitignore` lesen. Deckt sie ab: `.env`, `.env.*`, `node_modules`,
  `dist/`, `output/`, `.DS_Store`, `*.log`, `test-results/`,
  `playwright-report/`, `.netlify`?
- Gibt es Dateien im Arbeitsbaum, die via `.gitignore` geblockt sein sollten
  (`git ls-files | grep ...`)?

### 1.4 HTTP-Security-Headers

- `netlify.toml` lesen und gegen Baseline pruefen:
  HSTS ✅, X-Content-Type-Options ✅, X-Frame-Options ✅,
  Referrer-Policy ✅, Permissions-Policy ✅, **CSP: absichtlich fehlend**.
- Im Bericht dokumentieren, welche weiteren Headers sinnvoll waeren
  (Cross-Origin-Opener-Policy, Cross-Origin-Embedder-Policy) — aber ohne
  direkt zu fixen. Das ist Phase 2-Gespraech.
- CSP: Pruefe, ob der Grund "inline-Styles/SVG aus React/Vite" heute noch
  gilt (bei React 19 + Vite 7). Wenn eine realistische CSP-Policy ohne
  `unsafe-inline` moeglich waere, als P2-Ticket empfehlen.

### 1.5 Dependency-Vulnerabilities

```
npm audit --omit=dev --json > /tmp/npm-audit-prod.json
npm audit --json > /tmp/npm-audit-all.json
```

Dokumentiere:
- Anzahl pro Schwere (critical / high / moderate / low).
- Fuer critical/high: Paket, Version, Fix verfuegbar?
- Dev-Only-Vulns separat — meist weniger dringend (beeinflussen nicht die
  Laufzeit der deployed App).

### 1.6 Inline-Scripts und Event-Handler

- Inline `<script>...</script>` in `index.html`, `public/*.html`,
  `src/prerendered/*`? (Das Prerender-Tooling injiziert moeglicherweise
  Scripts — als "beabsichtigt" dokumentieren, wenn so.)
- `on*`-Handler als Strings in HTML-Dateien (`onclick="..."`)?
- `dangerouslySetInnerHTML` in JSX? (CLAUDE.md sagt: darf nicht vorkommen —
  verifizieren.)
- `eval(`, `new Function(`, `setTimeout(stringArg,` — alle drei Grep.

### 1.7 Externe Links und Third-Party

- Alle externen Links mit `target="_blank"` haben `rel="noopener noreferrer"`
  (CLAUDE.md-Vorgabe). Grep `target="_blank"` ohne `rel=.*noopener`.
- Drittanbieter-Ressourcen im Build-Output? (`grep -r "fonts.googleapis" dist/`,
  `"cdn\." dist/`, etc.) — erwartet: keine.

### 1.8 localStorage/sessionStorage

- Was wird unter `rr_app_state_v5` abgelegt? Hole `src/context/AppStateContext*`
  und `src/utils/appHelpers*` und pruefe die geschriebenen Felder.
- Enthalten sie PII/Health-Daten nach DSGVO/DSG-Massstab?
- Gibt es weitere Storage-Keys (grep `localStorage\.setItem\(`,
  `sessionStorage\.setItem\(`)?

### 1.9 Formulare und User-Input

- Gibt es `<form>`-Elemente mit echtem Submit? (Erwartet: wenig bis keine,
  da kein Backend.)
- Falls ja: Sanitization beim Anzeigen (kein `dangerouslySetInnerHTML`)?
- Inputs, deren Werte in URL/Hash/localStorage landen: XSS-Risiko beim
  spaeteren Anzeigen?

### 1.10 Deployment-Konfiguration

- `netlify.toml`: Build-Command, Publish-Verzeichnis korrekt.
- `vite.config.js`: keine unerwarteten Plugins oder Secrets in `define:`.
- `scripts/replace-env.mjs`, `scripts/inject-prerender.mjs`: werden sie mit
  sicheren Inputs aufgerufen? (Command-Injection-Flaeche pruefen.)
- Gibt es Deployment-Automationen ausserhalb Netlify (`.github/workflows/`)?

### 1.11 Gesamtbild

Tabelle:
- Exponierte Secrets (Ziel: 0).
- Git-History-Secrets (Ziel: 0).
- Fehlende Headers (CSP ist separat gelistet mit dokumentierter Begruendung).
- Vulns nach Schwere.
- Inline-Scripts, `dangerouslySetInnerHTML`, eval-Muster.
- Externe Links ohne `rel="noopener"`.
- localStorage-Inhalt: sensitiv ja/nein.

Risiko-Einschaetzung: kritisch / hoch / mittel / niedrig.

**STOPP.** Fasse Phase 1 in 5-10 Zeilen zusammen und warte auf Freigabe.
Falls Secrets gefunden wurden: schon vorher gemeldet.

## Phase 2 — Massnahmenkatalog

Pro Befund: konkreter Fix, Schwere, Aufwand.
- Kritische Befunde (exponierte Secrets, bekannte Exploits, fehlendes
  `rel="noopener"` bei externen Links) sind **nicht verhandelbar**.
- CSP ist ein separates Kapitel: Vorschlag fuer eine realistische Policy
  mit minimalen Kompromissen, nicht "blind setzen".

**STOPP.** Warte auf Freigabe fuer Phase 3.

## Phase 3 — Umsetzung

Pro Fix ein Commit. Commit-Pattern: `audit(sec): <was>`.
- Secret-Revocations passieren AUSSERHALB des Repos (in den jeweiligen
  Service-Dashboards). Der Commit entfernt den Wert, die Revocation ist
  Menschenpflicht — im PR-Body explizit bestaetigen.
- Dependency-Updates: ein Commit pro Paket (oder gebuendelt nach Major),
  Changelog-Link im Commit-Body.

## Phase 4 — Verifikation

- `npm audit --omit=dev` zeigt 0 critical/high.
- Kein Secret-Muster im Diff (`git diff` vs. `main` nochmal grep).
- Security-Headers per `curl -I https://<deployed-url>` verifiziert (falls
  deployed).
- `.gitignore` deckt alle sensitiven Dateitypen ab.
- PR-Body enthaelt: Revocation bestaetigt ja/nein, welche Services.
```
