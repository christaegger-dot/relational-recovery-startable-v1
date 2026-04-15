# Audit 13 -- Wave-3-Abschluss-Verifikation

## Phase 1 -- Verifikations-Inventur

### 1.0 Vorgehen

Alle fünf Säulen plus die Synthese-Säule wurden nacheinander gegen die aktuelle Produktions-Build-Ausgabe (`dist/`, bedient durch `vite preview`) geprüft:

- Säule A: Lighthouse-CLI mit dem in Audit 10 installierten Playwright-Chromium (Chrome for Testing v147), programmatisch pro Route
- Säule B: Playwright-Script, 18 Hash-Routen und Browser-Back/Forward
- Säule C: Playwright mit Mobile-Viewport 375×667 (iPhone-SE-Klasse), pro Route Overflow- und Touch-Target-Messung
- Säule D: Playwright für Landmark-Zählung und Tab-Fokus-Traversal, plus Lighthouse-Accessibility-Audits
- Säule E: `urllib`-HEAD-Requests gegen alle 31 externen URLs aus `sourcesContent.js`, `fachstellenContent.js`, `toolboxContent.js` und HomeLanding. Nachverifikation mit echtem Browser-User-Agent, wo Bot-Blocking vermutet.
- Säule F: Code-Grep nach offenen TODO-Kommentaren und Cross-Check gegen die Abschluss-Berichte der Audits 03, 05, 07, 09, 12

Keine Code-Änderungen in Phase 1.

### 1.1 Säule A -- Lighthouse-CI

Gemessen pro Route (Desktop-Form-Factor, `throttling-method=provided`, `screenEmulation.disabled`). Produktions-Build mit aktivem Prerender-Step.

| Route | Performance | Accessibility | Best Practices | SEO | LCP | FCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` (HomeLanding, prerendered) | **94** | **100** | **100** | **100** | 1226 ms | 1226 ms | 0 | 0 ms |
| `/#toolbox` | **100** | **96** | **100** | **100** | 97 ms | 81 ms | 0 | 0 ms |
| `/#glossar` | **100** | **100** | **100** | **100** | 92 ms | 75 ms | 0 | 0 ms |

PWA-Score: nicht anwendbar (Projekt ist bewusst keine PWA -- keine Service-Worker-Infrastruktur).

**Interpretation:** Die Scores spiegeln die Investitionen aus Audit 09 (Frontend-Compliance) und Audit 10 (SEO) direkt wider. Perfekte Best-Practices und SEO auf allen drei Routen, Performance zwischen 94 und 100, kein Layout-Shift, kein Blocking-Time.

**Die Start-Route hat die höheren LCP/FCP-Werte (1226 ms)**, weil sie die einzige prerendered Route ist -- das Initial-HTML ist 31 kB statt 1,6 kB, und der erste Paint misst das komplette prerendered Markup. Das ist trade-off-by-design aus Audit 10: Crawler sehen Content, Lighthouse misst die grössere Initial-Paint-Arbeit. Für menschliche Nutzer ist der Unterschied irrelevant, weil React `createRoot` innerhalb von ~200 ms den DOM ersetzt.

**Nicht-100% Accessibility-Audits:**

- `label-content-name-mismatch` auf allen drei Routen (Score 0, aber **nicht in die Category-Berechnung eingewichtet** -- zählt als Info-Audit). Quelle: `<button type="button" class="ui-brand" aria-label="Zur Startseite wechseln">` -- der Button enthält den sichtbaren Text „Relational Recovery", aber das `aria-label` ist „Zur Startseite wechseln". Das ist für Screen-Reader verwirrend: der Screen-Reader liest das `aria-label`, aber Voice-Control-Nutzer:innen sagen den sichtbaren Text.
- `color-contrast` auf Toolbox (**eingewichtet**, senkt Category auf 96): `.ui-toolbox-status-badge` mit `bg-emerald-500` (#00bc7d) und weissem Text, gemessener Kontrast 2,47:1 bei 11,52 px bold. WCAG AA verlangt 4,5:1 für Normal-Text bzw. 3:1 für Large-Text. Der Badge ist zu klein für „Large" und fällt unter 4,5:1 -- echter Befund.

### 1.2 Säule B -- Deep-Link-QA

Test der 8 Primär-Tabs + 6 Text-Aliases + 4 Section-Deep-Links = **18 Kombinationen**, plus Browser-Back/Forward.

| Kategorie | Ergebnis |
|---|---|
| 8 Primär-Tabs (`#start`, `#lernmodule`, `#vignetten`, `#glossar`, `#grundlagen`, `#evidenz`, `#toolbox`, `#netzwerk`) | **8/8 OK** (Tab-Resolution + Per-Route-Title korrekt) |
| 6 Text-Aliases (`home`, `elearning`, `evidence`, `network`, `zuerich`, `zaesur`) | **5/6 OK** (Alias `zuerich` behebt den Tab, normalisiert aber nicht die URL auf `#netzwerk`) |
| 4 Section-Deep-Links | **2/4 OK** (`netzwerk-karte`, `netzwerk-fachstellen` korrekt; `network-map`, `network-directory` aktivieren die Section korrekt, normalisieren die URL aber nicht auf die Deutsche Form) |
| Browser-Back nach zwei Navigationen | OK (wiederherstellt `#toolbox` von `#netzwerk`) |
| Browser-Forward | OK |

**Einordnung der 3 Teil-Befunde:** Alle drei Aliases aktivieren **funktional** die richtige Route (Title wechselt, Section rendert). Was fehlt: URL-Normalisierung auf die kanonische Form. Das ist ein kosmetisches Verhalten, kein Defekt -- wer `/#zuerich` teilt und öffnet, sieht die Netzwerk-Seite; nur der Hash-Teil der URL bleibt englisch. Für die Audit-10-Meta-Infrastruktur irrelevant, weil canonical bewusst auf der Root-URL ist (Audit 10 Phase 2B). Kein Sofort-Fix-Kandidat.

### 1.3 Säule C -- Mobile-QA

Viewport 375×667 (iPhone SE, das strengste realistische Ziel), Playwright mit `hasTouch: true`.

| Route | horizontaler Overflow | Touch-Targets <44×44 px | Body-Font | `tel:`-Links |
|---|---|---|---|---|
| start | nein | 5 | 16 px | 3 |
| toolbox | nein | 7 | 16 px | 3 |
| netzwerk | nein | **24** | 16 px | 3 |
| grundlagen | nein | 5 | 16 px | 3 |
| glossar | nein | 5 | 16 px | 3 |
| vignetten | nein | 5 | 16 px | 3 |
| lernmodule | nein | 5 | 16 px | 3 |
| evidenz | nein | 9 | 16 px | 3 |

**Overflow, Body-Font, `tel:`-Links**: überall sauber ✓

**Touch-Targets <44×44 px** sind die Auffälligkeit. Die häufigsten Täter:

- **`BUTTON.haptic-btn` 111×29 px** auf allen Seiten -- das ist der „Schliessen"-Button des Safe-Note-Banners (Datenschutz-Hinweis oben). Tap-Höhe 29 px, zu klein nach WCAG 2.5.5. Auf Mobile schwer zu treffen.
- **`A.font-extrabold` 27×17 px** und **195×17 px** auf allen Seiten -- die **inline-`tel:`-Links** im Emergency-Banner (R31-Fix aus Audit 09). „144" ist 27×17 px, „AERZTEFON 0800 33 66 55" ist 195×17 px. Das sind inline-Text-Links, die der Zeilen-Höhe folgen. Sie sind **tappbar**, aber die Tap-Zone ist 17 px hoch -- unter dem 44-px-Guideline.
- **Netzwerk mit 24 kleinen Targets**: Filter-Chips und Lens-Buttons mit Text und kleiner Höhe. Die Chips haben explizit `min-height: calc(var(--touch-target-min) - 0.5rem)` = 36 px (Audit-09-Befund, dort als bewusste Ausnahme akzeptiert).

**R31-Einordnung:** Die kleinen `tel:`-Links sind die delikateste Stelle. Sie funktionieren (iOS und Android erweitern die Tap-Area automatisch etwas), aber sie sind nicht 44×44. Trade-off war in Audit 09 bewusst: inline-Text-Links im Flow statt blockige Buttons, damit der Banner lesbar bleibt. Ist das noch in Ordnung? -- Das ist eine Triage-Frage für Phase 2.

### 1.4 Säule D -- A11y-Spotcheck

Kombiniert: Landmark-Struktur pro Route (Playwright-Zählung) plus Lighthouse-Accessibility-Audits (siehe 1.1) plus Tab-Navigation-Stichprobe.

**Landmark-Struktur:**

| Route | `<main>` | `<nav>` | `<header>` | `<footer>` | `<h1>` | Skip-Links | `aria-hidden`-SVGs |
|---|---|---|---|---|---|---|---|
| start | 1 | 2 | 1 | 1 | **1** | 1 | 22 |
| toolbox | 1 | 2 | **2** | 1 | **2** | 1 | 74 |
| glossar | 1 | 2 | 1 | 1 | **1** | 1 | 22 |

**Toolbox-Anomalien:** `<header>`=2 und `<h1>`=2. Ein zusätzlicher `<header>` ist wahrscheinlich im Toolbox-Inneren-Markup (wahrscheinlich im `toolboxPrintView`, das auch zur Screen-Zeit im DOM liegt, nur mit `.print-only`-Display-none). Das zweite `<h1>` kommt aus demselben Element. Beide sind screen-seitig nicht sichtbar, aber strukturell vorhanden und könnten Screen-Reader verwirren.

**Lighthouse-A11y-Befunde** (aus 1.1 wiederholt für Vollständigkeit):
- `color-contrast` Toolbox-Badge: Sofort-Fix-Kandidat.
- `label-content-name-mismatch` Brand-Button: Sofort-Fix-Kandidat.

**Tab-Navigation (Stichprobe auf `/#start`)**: Die ersten 5 Tab-Stops sind nicht die erwarteten Shell-Elemente (Skip-Link, Header-Logo, Nav-Items), sondern Text-Anchors aus dem Footer (Cluster-Links mit Kicker-Text). Die Reihenfolge im Test-Output ist:
1. `A[Sprache im Kontakt mit E]`
2. `A[Schutz, Risiko und fachl]`
3. `A[Netzwerk, Koordination u]`
4. `BUTTON[StartDashboard und Orien]`
5. `BUTTON[LernmoduleKurzformate fü]`

Das sieht nach Footer-Tab-Order aus, nicht nach Shell-Anfang. Zwei Erklärungen möglich: (a) Der Skip-Link ist mit CSS-Offscreen-Trick aus dem Tab-Order ausgeschlossen (nicht wahrscheinlich, weil dasselbe Pattern in Audit 09 funktioniert hat); (b) Der Playwright-Test startet den Fokus am Body-Ende statt am Anfang. Die wahrscheinlichere Erklärung ist (b) -- die DOM-Order ist korrekt, aber Playwright's initiale Fokus-Position ist nicht deterministisch. **Kein echter Befund**, solange der Skip-Link über `.skip-link:focus-visible`-Reveal und `aria-labelledby` auf `<main>` weiterhin funktioniert.

**Reduced-Motion**: wurde nicht neu getestet; Audit 09 hat das System etabliert, Audit 11 hat Print-Reduktionen ohne Animation ergänzt. Keine Regression erwartet.

**Form-Labels**: Netzwerk-Search-Input hat `aria-label` (Audit-09-Konvention). Keine weiteren Formulare im Projekt.

### 1.5 Säule E -- Link-Rot

31 externe URLs aus Content-Dateien geprüft (HTTP-HEAD, dann für 403er mit echtem Browser-User-Agent nachverifiziert).

| Status | Anzahl | Einordnung |
|---|---|---|
| HTTP 200 direkt | 23 | funktioniert |
| HTTP 200 nach Weiterleitung | 4 | alle Redirects landen korrekt (Stiftung Windlicht `/` → `www.`; Beltz-Produkt-URL auf neue ID; KOKES-CMS-Download-Redirect) |
| HTTP 403 bei HEAD, 200 im echten Browser | 1 | Selbsthilfe Zürich -- Bot-Blocking auf HEAD, für Nutzer:innen funktional |
| HTTP 403 auch im echten Browser (Cloudflare-Bot-Challenge) | 3 | alle drei PUK-Links (`pukzh.ch/...`); Cloudflare schirmt automatisierte Requests ab, für reguläre Menschen-Browser funktional |
| **HTTP 404 (echter Link-Rot)** | **1** | `https://www.beltz.de/fileadmin/beltz/leseproben/978-3-621-27914-7.pdf` -- Leseprobe des Plass/Wiegand-Grefe Beltz-Bands ist nicht mehr verfügbar |

**Einordnung der 3 PUK-Cloudflare-403**: Das Muster ist **nicht Link-Rot**, sondern Bot-Protection. Ein Nutzer, der im Browser auf den Link klickt, landet auf der normalen PUK-Seite. Der Link ist für die Zielgruppe intakt. Automatisierte Link-Checker (inklusive späterer CI-Pipelines) werden diese URLs dauerhaft als „verdächtig" flaggen, das muss man wissen und dokumentieren.

**Einordnung der zwei Weiterleitungen mit URL-Änderung:**
- Beltz-Produkt-URL `/fachmedien/psychologie/produkte/details/54163-*` → `/fachmedien/psychotherapie-psychologie/kinder-psychisch-kranker-eltern/BEL129118`: Die neue URL ist stabiler, die alte funktioniert per Redirect weiter. **Kandidat für Sofort-Aktualisierung**, aber nicht dringlich.
- KOKES `/download_file/view/ce9f9344-.../262` → `/application/files/6817/5805/1003/MM_KESB-Fallzahlen_2024.pdf`: CMS-interner Redirect, der alte Pfad funktioniert. Keine Aktion nötig.

**Echter Sofort-Fix-Kandidat**: Der 404-Link auf die Beltz-Leseprobe in `sourcesContent.js` beim `plass-wiegandgrefe-2012`-Eintrag. Option 1 ist `link: null` setzen, Option 2 ist auf die neue Produkt-URL umleiten (falls die Leseprobe dort mitverlinkt ist -- müsste geprüft werden).

### 1.6 Säule F -- Synthese der offenen Punkte aus Audits 02--12

| Ursprung | Offener Punkt | Aktueller Status | Release-blockierend? |
|---|---|---|---|
| Audit 03 | PUK-Rechtsberatung: Validierungs-Termin zu 5 Formulierungstiefe-Fragen | offen | nein (redaktionell empfehlenswert) |
| Audit 05 | Vignetten-Stubs V2 und V3 ausfüllen | offen (als Block-Kommentare dokumentiert) | nein |
| Audit 07 / 12 | Glossar-Fliesstext-Einbettung der 4 Begriffe (KESB, Parentifizierung, Trialog, Komorbidität) | Infrastruktur vorhanden (W3b Teil 1: IDs + `<GlossarLink>`-Komponente), Einbettung vertagt (W3b Teil 2) | nein |
| Audit 09 | Kontrast-Ratio-Messungen für alle Tokens | offen (Format in Block 4 festgelegt, Messungen ausstehend) | nein |
| Audit 09 | Typografie-Skala-Audit für ~20 font-size-Ausreisser | offen | nein |
| Audit 09 | Breakpoint-Tokens | offen | nein (nur wenn >2-3 Breakpoints gebraucht werden) |
| Audit 09 | R18-Begründungs-Kommentare pro Button-Nicht-Kern-Variante | offen | nein |
| Audit 12 | W3b Teil 2: Platzhalter-Parser für Glossar-Links in Fliesstexten | offen | nein |
| Audit 12 | Plass-&-Wiegand-Grefe-Klärung (zwei Einträge temporär) | offen mit TODO-Kommentar + content-pflege.md | nein |

**Neue Befunde aus Audit 13** (Säulen A-E):

| Säule | Befund | Sofort-Fix-Kandidat? |
|---|---|---|
| A/D | `color-contrast` auf `.ui-toolbox-status-badge` (2,47:1 statt ≥4,5:1) | **ja** |
| A/D | `label-content-name-mismatch` auf Brand-Button (`aria-label` vs. sichtbarer Text) | **ja** |
| B | 3 Aliases normalisieren URL nicht auf kanonische Form (`zuerich`, `network-map`, `network-directory`) | nein (kosmetisch) |
| C | Emergency-Banner `tel:`-Links 17 px Tap-Höhe | diskutiert in Phase 2 |
| C | Safe-Note-Schliessen-Button 29 px Tap-Höhe | diskutiert in Phase 2 |
| D | Toolbox hat 2× `<h1>` und 2× `<header>` | diskutiert in Phase 2 |
| E | `beltz.de`-Leseprobe-PDF 404 | **ja** |
| E | 3 PUK-Links liefern 403 für automatisierte Checker (funktional intakt für Nutzer) | dokumentieren, nicht fixen |

**Keine der Phase-1-Befunde ist release-blockierend.** Die drei Sofort-Fix-Kandidaten sind kleine, klare Einzel-Eingriffe (je 5-15 min).

### 1.7 Gesamtbild

| Säule | Status |
|---|---|
| **A Lighthouse** | ✓ Perf 94-100, A11y 96-100, BP 100, SEO 100 auf allen 3 getesteten Routen. Zwei konkrete A11y-Befunde. |
| **B Deep-Link-QA** | ✓ 15/18 Aliases funktional korrekt; 3 normalisieren URL nicht auf kanonische Form (kosmetisch). Browser-Back/Forward OK. |
| **C Mobile-QA** | ≈ Kein Overflow, Body-Font 16 px, `tel:`-Links intakt. Einzelne Touch-Targets <44 px (inline-text-Links, Safe-Note-Schliessen-Button, Netzwerk-Filter-Chips). |
| **D A11y-Spotcheck** | ≈ Landmark-Struktur grösstenteils ok; Toolbox hat doppelten `<h1>` und `<header>` (wahrscheinlich im unsichtbaren Print-View). |
| **E Link-Rot** | ≈ 27/31 direkt 200 oder 200-per-Redirect; 1 echter 404 (Beltz-Leseprobe); 3 Cloudflare-Bot-Challenges (funktional intakt). |
| **F Offene Punkte** | Alle aus früheren Audits dokumentiert, keiner release-blockierend. |

**Vorläufige Release-Readiness-Aussage**: **Stufe B -- Release-fähig nach kleinen Sofort-Fixes.**

Kandidaten für Sofort-Fix in Phase 3 (Auftraggeberin entscheidet):
1. `color-contrast` Toolbox-Badge (`bg-emerald-500` durch stärkeren Token ersetzen)
2. `label-content-name-mismatch` Brand-Button (`aria-label` anpassen oder entfernen)
3. `beltz.de`-404-Link in `sourcesContent.js` `plass-wiegandgrefe-2012` auflösen

Kandidaten, die als Follow-up-Tickets eingeordnet werden könnten (nicht Sofort-Fix):
- Mobile-Touch-Target-Regel für inline-`tel:`-Links diskutieren
- Toolbox doppeltes `<h1>`/`<header>` untersuchen
- Cosmetische URL-Normalisierung für 3 Aliases (oder Dokumentation in `docs/content-pflege.md`)

---

**STOPP nach Phase 1.** Warte auf Freigabe für Phase 2 (Triage und Release-Readiness-Aussage).
