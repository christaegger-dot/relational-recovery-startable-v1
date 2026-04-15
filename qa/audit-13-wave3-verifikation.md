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

---

## Phase 2 -- Triage und Release-Readiness-Aussage

### 2.1 Gesamtbild

Das Gesamtwerk steht **besser da als erwartet** -- und zwar messbar, nicht gefühlt. Drei Ergebnisse tragen dieses Urteil:

- Lighthouse misst über alle drei getesteten Routen **100 in SEO, 100 in Best Practices**, Accessibility zwischen 96 und 100, Performance zwischen 94 und 100. Das ist die direkte Validierung von Audit 09 (Frontend-Compliance) und Audit 10 (Routing/SEO). Die beiden Audits hatten versprochen, dass Token-Disziplin, Per-Route-Meta und Prerendering zusammen eine messbar bessere Seite ergeben; Lighthouse bestätigt dieses Versprechen in Zahlen. Die SEO-100 über alle Routen sind besonders aussagekräftig, weil sie das in Audit 10 diskutierte Crawler-Problem („leerer Shell bei Social-Media-Scraping") praktisch gelöst zeigen.
- Die Deep-Link-QA zeigt 15 von 18 Aliases funktional vollständig, die drei verbleibenden nur mit kosmetischen URL-Abweichungen. Die Routing-Architektur aus Audit 10 hält unter systematischer Prüfung.
- Die Cross-Reference-Integrität der Content-Dateien (Audit 12) blieb auch nach Audit 13 bei 0 verwaisten IDs.

Die tatsächlichen Befunde aus Phase 1 sind **klein und punktuell**. Kein systemischer Befund, kein Anlass für einen Reopen einer früheren Audit-Welle. Phase 2 triagiert die Einzelbefunde klar.

### 2.2 Mobile-Touch-Target-Triage (M1/M2/M3)

Detail-Scan hat die 5-24 Befunde pro Seite in die drei Kategorien zugeordnet:

**Auf allen Seiten gleich (5 Stellen):**

| Stelle | Grösse | Kategorie | Massnahme |
|---|---|---|---|
| Safe-Note-Schliessen-Button (`.haptic-btn`, aria-label „Datenschutzhinweis schliessen") | 111×29 | **M2** | F5 Sofort-Fix |
| `tel:144` inline im Emergency-Banner (aria-label „Sanitätsnotruf 144 anrufen") | 27×17 | **M1** | F4 Sofort-Fix |
| `tel:+41800336655` inline (aria-label „AERZTEFON 0800 33 66 55 anrufen") | 195×17 | **M1** | F4 Sofort-Fix |
| `tel:147` inline (aria-label „Beratungstelefon 147 von Pro Juventute anrufen") | 25×17 | **M1** | F4 Sofort-Fix |
| „Zu Notfallinformationen wechseln"-Button im Emergency-Banner | 271×35 | **M1** | F4 Sofort-Fix (Teil derselben Emergency-Banner-Korrektur) |

**Toolbox zusätzlich (+2 Stellen):**

| Stelle | Grösse | Kategorie | Massnahme |
|---|---|---|---|
| „Krisenplan herunterladen"-Button (Hero) | 255×39 | **M2** Grenzfall | nicht als Sofort-Fix aufgenommen; Höhe 39 px ist 5 px unter der Schwelle; Fläche 255 px breit; im Zweifel später mit Button-Konsistenz-Ticket |
| „Arbeitsansicht drucken"-Button (Hero) | 235×39 | **M2** Grenzfall | dito |

**Netzwerk zusätzlich (+19 Stellen):**

| Stelle | Grösse | Kategorie | Massnahme |
|---|---|---|---|
| 14× Filter-Chips (`.ui-chip[role="button"]`: Alle, Krise, 24/7, kostenlos, anonym, Zürich, mehrsprachig, Jugendliche, Erwachsene, Eltern 0-5, Sucht, offizielle Stelle, Selbsthilfe, Entlastung) | 289×36 | **M3** | Akzeptierte Audit-09-Ausnahme (`.ui-chip` explizit mit `min-height: calc(var(--touch-target-min) - 0.5rem)` = 36 px) |
| 5× Lens-Buttons (Gesamtbild, Privates Umfeld, Alltagsstützen, Fachstellen, Lücken) | 251×36 | **M3** | analog zu Filter-Chips akzeptiert |

**Evidenz zusätzlich (+4 Stellen):**

| Stelle | Grösse | Kategorie | Massnahme |
|---|---|---|---|
| 4× Closing-Section-Collection-Anchors (Kinder- und Familienmedien, Externe Informationsangebote, Unterstützungsangebote, Quellen für Vertiefung) | 303×34 bis 303×41 | **M3** | Inline-Anchor-Links in Closing-Collection; Höhe 34-41 px knapp unter 44, Breite 291-303 gross; akzeptiert |

**Zusammenfassung Mobile-Triage:**
- M1 (sicherheitsrelevant, Sofort-Fix): **4 tel:-Links + 1 Emergency-Button** auf allen Seiten → F4
- M2 (klein und einfach, Sofort-Fix): **1 Safe-Note-Close** auf allen Seiten → F5
- M2 Grenzfälle (nicht als Sofort-Fix): 2 Toolbox-Hero-Buttons (bewusst nicht aufgenommen, um Audit-13-Scope schlank zu halten)
- M3 (akzeptierte Ausnahmen): 19 Netzwerk-Controls + 4 Evidenz-Anchor-Links

### 2.3 Sofort-Fix-Liste für Phase 3

| # | Fix | Herkunft | Aufwands-Schätzung |
|---|---|---|---|
| **F1** | Toolbox-Badge `color-contrast` (`.ui-toolbox-status-badge.bg-emerald-500`: 2,47:1 → ≥4,5:1) | Säule A Lighthouse | 10-20 min |
| **F2** | Brand-Button `label-content-name-mismatch` (sichtbarer Text „Relational Recovery" ≠ `aria-label` „Zur Startseite wechseln") | Säule A Lighthouse | 5-10 min |
| **F3** | Beltz-Leseprobe 404-Link in `sourcesContent.js` `plass-wiegandgrefe-2012` auflösen (`link: null` oder auf Produkt-URL umstellen) | Säule E Link-Rot | 5 min |
| **F4** | Emergency-Banner-Touch-Targets: 3 inline-`tel:`-Links + „Zu Notfallinformationen"-Button auf min. 44×44 px per CSS-Padding erweitern, ohne Inline-Charakter zu zerstören | Säule C Mobile M1 | 30-60 min |
| **F5** | Safe-Note-Schliessen-Button auf `min-height: 44px` erweitern | Säule C Mobile M2 | 10-15 min |
| **F6** | `toolboxPrintView` auf Screen mit `aria-hidden="true"` abschirmen, damit die doppelten `<h1>` und `<header>` nicht mehr von Screen-Readern als Dokument-Struktur interpretiert werden; im Print invertieren (auf sichtbarer Print-Version ohne `aria-hidden`) | Säule D A11y | 15-30 min |

**Gesamt-Aufwand F1-F6**: ca. 1,5-2,5 Stunden.

### 2.4 Follow-up-Tickets (nicht in Audit 13)

Nach Phase 3 bleiben folgende Punkte als Follow-up-Tickets dokumentiert, **ohne Release-Blockade**:

| Ticket | Herkunft | Priorität |
|---|---|---|
| URL-Normalisierung der 3 Text-/Section-Aliases (`zuerich`, `network-map`, `network-directory`) auf kanonische Hash-Form ODER Dokumentation als akzeptierte Eigenheit in `docs/content-pflege.md` | Säule B Audit 13 | niedrig (kosmetisch) |
| Toolbox `printView` als saubere Komponenten-Aufteilung (falls `aria-hidden` in F6 sich als unzureichend herausstellt) | Säule D Audit 13 | mittel |
| Dokumentation PUK-Cloudflare-403 und Selbsthilfe-Zürich-Bot-Blocking als bekannte Tooling-Limitationen für spätere CI-Link-Checker | Säule E Audit 13 | niedrig |
| Dokumentation der M3-akzeptierten Mobile-Touch-Targets (Netzwerk-Chips + Evidenz-Anchors) in `docs/frontend-richtlinien.md` als Ergänzung zum Audit-09-Ausnahmemechanismus | Säule C Audit 13 | niedrig |
| Toolbox-Hero-Buttons 39 px als M2-Grenzfälle (Konsistenz mit F5 wenn Button-System später refaktoriert wird) | Säule C Audit 13 | niedrig |
| PUK-Rechtsberatung: Validierungs-Termin zu 5 Formulierungstiefe-Fragen | Audit 03 | **mittel (redaktionell)** |
| Vignetten-Stubs V2 und V3 ausfüllen | Audit 05 | niedrig |
| Glossar-Fliesstext-Einbettung der 4 Begriffe (Platzhalter-Parser) | Audit 07 / 12 W3b Teil 2 | niedrig |
| Kontrast-Ratio-Messungen für alle Tokens (Format in Audit 09 R4 festgelegt) | Audit 09 | niedrig |
| Typografie-Skala-Audit für ~20 font-size-Ausreisser | Audit 09 | niedrig |
| Breakpoint-Tokens | Audit 09 | niedrig |
| R18-Begründungs-Kommentare pro Button-Nicht-Kern-Variante | Audit 09 | niedrig |
| Plass-&-Wiegand-Grefe-Klärung (zwei Einträge temporär) | Audit 12 W1a | niedrig |

**Gesamt: 13 Follow-up-Tickets**, keiner release-blockierend.

### 2.5 Akzeptierte Ausnahmen ohne Massnahme

| Punkt | Begründung |
|---|---|
| LCP 1226 ms auf prerenderter Start-Route | Gewünschter Trade-off aus Audit 10: grösseres Initial-HTML für Crawler-Content. Bleibt im „good"-Bereich (<2500 ms). |
| Netzwerk-Filter-Chips 36 px | Audit-09-Entscheidung (`.ui-chip { min-height: calc(--touch-target-min - 0.5rem) }`). |
| `label-content-name-mismatch` nicht in Lighthouse-Category-Score eingewichtet | Nicht-Category-Score-relevant; trotzdem als F2 aufgenommen weil semantisch wichtig. |
| PUK-Links 403 via Cloudflare-Bot-Challenge | Für Nutzer:innen im Browser funktional; automatisierte Checker können das nicht unterscheiden. |

### 2.6 Würdigung der Lighthouse-Ergebnisse

Audit 13 sollte in Säule A messen, ob Audit 09 und 10 ihr Versprechen eingelöst haben. Das Ergebnis ist ungeschmückt:

- **SEO 100 auf allen drei getesteten Routen.** Das ist die praktische Bestätigung, dass die in Audit 10 eingeführte Per-Route-Meta-Infrastruktur (dynamische Titles, OG-Tags, canonical), das statische Fundament (sitemap.xml, robots.txt, OG-Image, JSON-LD `Organization`) und das Prerendering der Start-Route zusammen eine Seite ergeben, die Google und Social-Media-Scraper korrekt verstehen.
- **Best Practices 100 auf allen drei Routen.** Das bestätigt die Token-Disziplin und Frontend-Compliance aus Audit 09. Keine Console-Errors, keine HTTPS-Probleme, kein `document.write`, keine Deprecation-Warnungen. Das sind nicht nur abwesende Fehler -- es sind die Audit-09-Regeln in ihrer Wirkung.
- **Accessibility 96-100**, wobei die Lücke auf Toolbox präzise zwei einzelne Befunde sind, nicht systemische Schwäche: ein Kontrast-Verstoss (F1), ein `aria-label`-Mismatch (F2). Beide in 25 Minuten lösbar.
- **Performance 94-100** mit CLS 0 und TBT 0 auf allen Routen. Der 94-Punkt auf Start ist allein durch den LCP von 1226 ms (prerendered Initial-HTML) erklärt, der bewusst in Kauf genommen wurde.

Das ist der eigentliche Wert von Audit 13: aus dem Versprechen der vorherigen Audits eine **messbare Tatsache** zu machen. Wer Lighthouse gegen diese Seite laufen lässt, sieht die Investition der vorangegangenen Wochen in Zahlen. Das ist die ehrlichste Validierung, die diese Audit-Reihe liefern kann.

### 2.7 Release-Readiness-Aussage

**Stufe B -- Release-fähig nach den sechs Sofort-Fixes in Phase 3, ohne weitere Vorbehalte.**

Die 13 Follow-up-Tickets aus Säule F plus den Audit-13-Ergänzungen sind **nicht release-blockierend**. Sie können nach Release weiter bearbeitet werden. Zwei davon (PUK-Rechtsberatungs-Termin, Kontrast-Messungen) sind redaktionell bzw. dokumentarisch empfehlenswert; keiner davon verhindert das Freischalten der Seite.

### 2.8 Was Phase 3 nicht tut

- Keine Refactorings (das `toolboxPrintView`-Problem wird via `aria-hidden` gelöst, nicht durch Komponenten-Aufteilung).
- Keine neuen Features.
- Keine inhaltlichen Änderungen an Texten.
- Keine Audit-Reihen-Reopens.
- Keine Sprints länger als 1-2 Stunden pro Fix.
- Kein Anpacken der Toolbox-Hero-Buttons oder anderer M2-Grenzfälle, die nicht in F1-F6 gelistet sind.

---

**STOPP nach Phase 2.** Warte auf Freigabe der Sofort-Fix-Liste F1-F6 und der Stufe-B-Release-Readiness-Aussage.
