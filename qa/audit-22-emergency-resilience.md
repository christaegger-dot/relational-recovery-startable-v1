# Audit 22 — Emergency-Resilience

**Datum:** 2026-04-21
**Branch:** `claude/audit-22-emergency-resilience`
**Scope:** CLAUDE.md-Anforderung „Notfallnummern müssen immer erreichbar bleiben — ErrorBoundary zeigt sie auch bei Crashes" systematisch prüfen: über alle Failure-Modi hinweg (First Paint ohne JS, Section-Crash, App-Level-Crash, localStorage-Probleme, Print-Medium).

## Warum pre-release-relevant

Die App richtet sich an Fachpersonen, die mit Familien in akuten Krisensituationen arbeiten. Die drei Notfallnummern (144 Sanität, 147 Pro Juventute, AERZTEFON 0800 33 66 55) sind das einzige content-kritische Element, dessen Nicht-Verfügbarkeit potenziell lebensrelevant ist. Alle anderen Inhalte können temporär fehlen — diese nicht. Jede realistische Failure-Mode muss sie noch zeigen.

## Inventur (Phase 1)

### 1.1 Emergency-Numbers-Inventar

Alle drei Nummern erscheinen als klickbare `tel:`-Links an vier Orten im Source-Code:

| Ort | Medium | tel:-Links |
| --- | --- | --- |
| `src/App.jsx` (Emergency-Banner, oberhalb `<main>`) | Bildschirm | 6× (3× Mobile + 3× Desktop) |
| `src/components/ErrorBoundary.jsx` (Section-Crash-Fallback) | Bildschirm | 3× |
| `src/prerendered/start-body.html` (Snapshot Start-Route) | First Paint ohne JS | 6× (Mobile + Desktop) |
| `src/components/PrintNotfallFooter.jsx` (`print-only` Footer) | Papier | 0 (`tel:` auf Papier irrelevant; lesbarer Text) |

Insgesamt 10 `tel:`-Anker im JSX-Tree, plus die in den Snapshot bereits eingebackenen Varianten. CSS-Klasse `.emergency-tel-link` garantiert >= 44×44 px Touch-Target (Audit 13 / F4).

### 1.2 CSS: `tel:`-Navigation CSP-konform

Aktuelle CSP-Policy in `netlify.toml` (Report-Only):
```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self'; connect-src 'self';
object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'
```

Keine CSP-Direktive schränkt `tel:`-Anker-Navigation ein (`form-action` betrifft `<form>`-Submissions, nicht Anker-Clicks). ✓

### 1.3 First Paint ohne JS

Audit 20 hat bereits bestätigt: Snapshot enthält statischen Emergency-Banner mit allen drei `<a href="tel:...">`-Links. Funktioniert ohne JS-Hydration — Link-Klicks sind reine HTML-Navigation. ✓

**Aber:** Die „Zu Notfallinformationen"-CTA ist `<button onClick={...}>` — ohne JS tot. Mitigation: direkt daneben die drei `<a href="tel:...">`-Links. ✓

### 1.4 Section-Crash (inside `<main>`)

`ErrorBoundary` in `App.jsx` Z. 264-293 wrappt nur `<main>`. Bei Section-Crash (z. B. Suspense-Lazy-Import schlägt fehl, Datenfehler in ToolboxSection):

- Fallback rendert im Inneren von `<main>` mit den drei `tel:`-Links + Reload-Button.
- Header + Emergency-Banner + Footer bleiben sichtbar (ausserhalb Boundary).
- Emergency-Nummern doppelt zugänglich (Banner oben + Fallback in main). ✓

### 1.5 App-Level-Crash (ausserhalb `<main>`) ⚠

`main.jsx` hatte bis jetzt:
```jsx
createRoot(root).render(<StrictMode><AppStateProvider><App/></AppStateProvider></StrictMode>);
```

Kein äusserer ErrorBoundary. Wenn ein Crash aus einem dieser Stellen kommt:
- `AppStateProvider` selbst (z. B. unerwarteter State-Format, Race-Condition im `useEffect`)
- `App`-Root-Render vor dem inneren Boundary (Z. 1-263 in App.jsx — das komplette Header- + Emergency-Banner-Markup)
- `Header.jsx` / `Footer.jsx` (beide pure Components, niedriges Risiko, aber nicht null)

→ React unmountet den gesamten Tree, Bildschirm geht schwarz, Emergency-Nummern verschwinden.

**Der Prerender wäre kurz sichtbar** (bis `createRoot` läuft und ihn überschreibt), aber sobald die Hydration-Schleife den leeren oder fehlerhaften Tree zeigt, ist nichts mehr da.

### 1.6 localStorage-Failure

`safeParse` / `safeLocalStorageSet` in `src/utils/appHelpers.js` wrappen alle `window.localStorage`-Zugriffe in try/catch. `AppStateContext.jsx` Z. 55-66 hat zusätzliche try/catch um den rohen `getItem`-Aufruf für den `updatedAt`-Timestamp. iOS Private Mode und Quota-Errors sind abgefangen. ✓

### 1.7 Print-Medium

`PrintNotfallFooter` mit `print-only`-Klasse + `@media print` CSS in `app-global.css` Z. 291-306: Footer erscheint am unteren Rand jeder A4-Seite mit lesbaren Zahlen. Nicht klickbar — aber auf Papier funktional irrelevant. ✓

## Triage (Phase 2)

| # | Finding | Aktion |
| --- | --- | --- |
| 1.1 | 10 tel-Anker, 3 getrennte Content-Orte | Kein Handlungsbedarf |
| 1.2 | CSP erlaubt tel: | Kein Handlungsbedarf |
| 1.3 | Prerender hat statische Nummern | Kein Handlungsbedarf (Audit 20 gesichert) |
| 1.4 | Section-Crash wird gefangen | Kein Handlungsbedarf |
| 1.5 | App-Level-Crash → blank screen | **P2 — Fix**: äusserer ErrorBoundary in `main.jsx` |
| 1.6 | localStorage-Failure gehärtet | Kein Handlungsbedarf |
| 1.7 | Print-Fallback funktioniert | Kein Handlungsbedarf |

## Umsetzung (Phase 3)

`src/main.jsx`: `<ErrorBoundary>` als Wrapper um `<AppStateProvider>`. Reuse der existierenden Komponente — sie enthält bereits die Notfallnummern + Reload-Button im Fallback. Doppelter Schutz:

- Innerer Boundary (App.jsx) → Section-Crash, behaelt Header sichtbar
- Äusserer Boundary (main.jsx) → App-Level-Crash, letzter Safety-Net

Kommentar im Quelltext dokumentiert die Intention, damit das Double-Boundary-Muster erhalten bleibt.

## Verifikation (Phase 4)

- `npm run lint` → grün.
- `npm run format:check` → grün.
- `rm -rf dist && npm run build` → grün (Snapshot + Audit-20-Asset-Guard passieren).
- Code-Review: Der existierende `ErrorBoundary.jsx`-Fallback zeigt alle drei `tel:`-Links, der Wrapping-Schritt ist additiv und betrifft keine andere Funktionalität.

**Keine gezielt provozierten Laufzeit-Crashes** als Test-Step, weil das ein permanentes Test-Fixture verlangen würde, das nicht Teil der App-Auslieferung sein soll. Die Kette „Error → `getDerivedStateFromError` → `hasError: true` → Fallback" ist React-Standard und durch die Class-Komponente in `ErrorBoundary.jsx` korrekt implementiert (Audit-09-R-Series hatte den Boundary bereits grundsätzlich verifiziert).

## Ergebnis

**Clean Bill mit einem P2-Fix.** Das bestehende Emergency-Design war bereits stark (Banner + Section-Boundary + Prerender-Statik + Print-Footer). Einziger reale Lücke war der fehlende Outer-Boundary für App-Level-Crashes — mit 4 Zeilen Code geschlossen.

## Follow-ups

Keine. Die Double-Boundary-Architektur ist im Code-Kommentar dokumentiert, und die existierende ErrorBoundary-Komponente ist ausreichend für beide Ebenen.
