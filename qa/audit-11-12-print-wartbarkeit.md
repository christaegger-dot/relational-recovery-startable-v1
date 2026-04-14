# Audits 11 und 12 -- Gemeinsamer Sprint

Dieses Dokument dokumentiert zwei strukturell unabhängige Audits in einem gemeinsamen Branch. Teil A = Audit 11 (Print), Teil B = Audit 12 (Content-Wartbarkeit). Beide Teile haben ihre eigene Inventur-, Diagnose- und Umsetzungs-Abfolge.

---

# Teil A -- Audit 11: Print

## Phase 1A -- Inventur

### 1A.1 Bestehende Print-CSS-Regeln

Systematischer Scan nach `@media print`-Blöcken in `src/**/*.css`:

| Quelldatei | Zeilen | Selektoren | Verhalten |
|---|---|---|---|
| `src/styles/app-global.css` | 110-128 | `.no-print`, `.print-only`, `@page`, `html, body` | Vier Regeln, alle zielführend |

Die bestehenden vier Regeln im Detail:

```css
@media print {
  .no-print          { display: none !important; }
  .print-only        { display: block !important; }
  @page              { size: A4; margin: 10mm; }
  html, body         { background: #fff !important; }
}
```

**Was fehlt systemisch:**
- Kein `color-adjust` / `print-color-adjust`. Browser-Default ist „strip backgrounds" -- alle Surface-Farben aus dem Token-System (`--surface-error-soft`, `--surface-inverse-*`, `--footer-*`) verschwinden im Druck, übrig bleibt Text auf weiss.
- Keine `a[href]::after`-Regel. Links-URLs werden nicht als Text ausgegeben; Hyperlinks verlieren beim Drucken ihre Information.
- Keine `page-break-*`- oder `break-*`-Hinweise. Karten, Listen und Tabellen brechen mittendrin.
- Keine Font-Grössen-Anpassungen für Papier. Das Screen-`clamp()`-Schema bleibt aktiv, teils mit unpassenden Grössen.
- Keine Regel für dunkle Inverse-Flächen (Emergency-Banner-Gradient, Footer-Framework-Panel). Mit gedrucktem `background: #fff` werden diese zur reinen Textfläche, aber der Text ist in `--text-inverse` (hell) gesetzt → **unlesbar**. Allerdings: beide sind durch `.no-print` ohnehin ausgeblendet, also irrelevant für Print.

### 1A.2 Templates und Inhalte mit Print-Relevanz

Einschätzung pro Template:

| Template | Print-Relevanz | Begründung |
|---|---|---|
| **HomeLanding** | niedrig | Orientierungs-Dashboard. Kein druckbarer Gebrauch vorgesehen. |
| **Lernmodule** (Learning) | niedrig | E-Learning mit Quiz, rein digital. |
| **Vignetten** | niedrig-mittel | Trainingsfälle für Supervision oder Teambesprechung -- gedruckte Fallvignetten mit Entscheidungs-Optionen wären denkbar, aber aktuell nicht vorgesehen. |
| **Glossar** | mittel-hoch | Nachschlagewerk. Alphabetische Begriffssammlung ist ein klassisches Druck-Genre. |
| **Grundlagen** | mittel | FAQ für Angehörige. Ausgedruckt als „Mitnahme zum Gespräch" oder als Teamreferenz plausibel. |
| **Evidenz** | mittel | Literatur-/Materialübersicht. Ausgedruckt als Leselisten oder Referenzkataloge denkbar. |
| **Toolbox** | **hoch** | Expliziter Print-Button im UI (`Arbeitsansicht drucken`), dedizierte `toolboxPrintView`. Kern-Arbeitshilfe für Krisenvorsorge. |
| **Netzwerk** | mittel | Fachstellen-Liste mit Kontaktdaten. Klassisches Ausdruck-Genre (Kontakte mitnehmen). |

### 1A.3 Print-Risikofaktoren pro Template

Der bestehende Mechanismus: Templates markieren Screen-Sections via `className="no-print"` (Hiding), und nur `ClosingSection` unterstützt `printView` als explizit print-spezifische Alternative via `.print-only`.

Verteilung `no-print`/`print-only`-Nutzung pro Template:

| Template | `no-print`-Anzahl | `printView` vorhanden? | Effektiver Druckoutput |
|---|---|---|---|
| HomeLanding | 0 | nein | Alles druckt (inkl. Hero, Stats, CTAs) |
| GlossarPageTemplate | 0 | nein | Alles druckt |
| GrundlagenPageTemplate | 1 | nein | Fast alles druckt |
| LearningPageTemplate | 3 | nein | Einzelne Sektionen versteckt |
| NetworkPageTemplate | 3 | nein | Karten-Section, Verzeichnis-Header und Sentinels versteckt; Fachstellen drucken |
| EvidencePageTemplate | 4 | nein | Zonen-Header und Closing-Sentinel versteckt; Inhalt druckt |
| ToolboxPageTemplate | 7 | **ja** (ClosingSection-printView) | Screen-Sections alle `.no-print`; es druckt nur der dedizierte `toolboxPrintView` |
| VignettenPageTemplate | 6 | **nein** | Alle Screen-Sections `.no-print`, kein print-Alternative → **leeres Papier** |

**Kritischer Befund**: VignettenPageTemplate markiert ALLE Hauptsektionen als `.no-print`, hat aber keinen `printView`. Eine Print-Aktion auf der Vignetten-Seite produziert eine weitgehend leere Seite (nur Hero-Abschnitte ohne `.no-print` wären sichtbar).

### 1A.4 Screen-Shell-Elemente beim Druck

Globale Shell-Elemente und ihre Print-Sichtbarkeit:

| Element | `no-print`? | Konsequenz |
|---|---|---|
| Header (Navigation) | ja (`components/Header.jsx:40`) | hidden, sinnvoll |
| Footer | ja (`components/Footer.jsx:20`) | hidden, sinnvoll |
| Safe-Note-Banner (Daten-Hinweis oben) | ja (`App.jsx:153`) | hidden, sinnvoll |
| **Emergency-Banner mit tel:-Links** | **ja** (`App.jsx:174`) | **hidden auf Papier** |
| Debug/Reset-Banner | ja (`App.jsx:127`) | hidden, sinnvoll |

**Kritischer Befund (R31-relevant):** Der Emergency-Banner aus `App.jsx:174-203` (Akute-Krise-Zeile mit den drei `tel:`-Links 144, AERZTEFON +41 800 33 66 55, 147) ist als `.no-print` markiert. Wenn jemand eine beliebige Toolbox- oder Grundlagen-Seite ausdruckt und dann in einer belasteten Situation das Papier vor sich hat, **stehen die Notfallnummern nicht drauf**. Die `tel:`-Klickbarkeit auf Papier wäre ohnehin funktional irrelevant, aber die Lesbarkeit der Zahlen selbst ist bei einem Care-Portal ein Muss.

Die drei Nummern stehen aktuell nur in:
- Screen-Emergency-Banner (sichtbar, `tel:`-Link, aber `.no-print`)
- ErrorBoundary (nur bei Render-Fehlern aktiv)

Der Toolbox-`printView` enthält die Nummern **nicht** (nur den Ablauf des Sicherheitsplans, ohne konkrete Telefonnummern).

### 1A.5 Arbeitshilfen-Versprechen: Inventur

Die OG-Description und das Hero-Lead versprechen „printfähige Arbeitshilfen":

```
src/data/routeMeta.js:29 -- "Einstieg in das Fachportal mit Training, systemischer
  Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen."

src/templates/HomeLandingTemplate.jsx:14 -- "Interaktive Fachressourcen für die
  Begleitung von Eltern mit psychischer Belastung – mit Training, systemischer
  Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen."
```

Konkret vorhandene Arbeitshilfen im Code:

**Downloadbare TXT-Vorlagen** (`src/utils/useDownloadHandlers.js`, 6 Stück):

| Dateiname | Zweck |
|---|---|
| `krisenplan-vorlage.txt` | Bearbeitbare Textvorlage für Gespräch, Fallarbeit, gemeinsame Krisenvorsorge |
| `krisenplan-kompakt.txt` | Kurzfassung des Krisenplans |
| `gespraechsleitfaden-fachpersonen.txt` | Leitfaden für Erstgespräch, Verlaufsgespräch, Supervision |
| `netzwerkkarte-vorlage.txt` | Arbeitsvorlage für Kontaktinventar und Versorgungslücken |
| `psychoedukation-mit-kindern-sprechen.txt` | Gesprächsleitfaden für kindgerechte Psychoedukation |
| `schutzfaktoren-check.txt` | Check-Vorlage für Schutzfaktoren |

Diese sind **nicht** browser-druckbar, sondern als TXT-Download konzipiert. Das Promise „printfähig" ist hier indirekt erfüllt (TXT-Datei lässt sich natürlich auch drucken, aber der Begriff suggeriert browser-native Print-Ausgabe).

**Browser-druckfähige Arbeitshilfen** (`printView`-Mechanismus):

| Template | `printView`? | Inhalt |
|---|---|---|
| Toolbox | ja | Umfangreicher Arbeits-Bogen mit Kurzlage-Feldern, 4 Triage-Fragen (Ja/Nein-Kästchen), Krisenvorsorge-Feldern (6 Leitfragen mit Schreiblinien), nächste-Schritte-Bausteinen, Follow-up-Feldern für Zuständigkeit und Datum |
| Alle anderen Templates | nein | -- |

**Gap-Analyse:**
- Die Aussage „printfähige Arbeitshilfen" ist **teilweise gedeckt**: durch 6 TXT-Downloads (funktional, aber nicht browser-druckbar) und 1 browser-druckbare Arbeitsansicht (Toolbox).
- Für Templates mit mittlerer Print-Relevanz (Glossar, Grundlagen, Netzwerk) existiert keine spezifische Print-Aufbereitung.
- Das Versprechen ist vorhanden, aber die Erfüllung ist schmaler als das Plural suggeriert (faktisch eine einzige echte „printfähige Arbeitshilfe" im Browser-Sinn, plus 6 Text-Downloads).

### 1A.6 Weitere Print-Risikofaktoren

| Risikofaktor | Befund |
|---|---|
| `print-color-adjust` | Nirgends gesetzt. Browser-Default: Backgrounds werden im Druck weggelassen. Konsequenz: Token-basierte Surface-Farben (z. B. `--surface-error-soft`, `--surface-subtle`, `--footer-*`) verschwinden, Text bleibt. Für die meisten Kontexte OK, aber für Toolbox-Band-Farben (`--surface-warning-strong-soft`, `--surface-danger-strong-soft`) bedeutet das: der semantische Farb-Hinweis (caution/danger) geht verloren. |
| Links-URL-Anzeige | Keine `a[href]::after`-Regel. URLs werden im Druck nicht sichtbar. Bei Netzwerk-Fachstellen mit externen Links (PUK-Seite, Beratungsstellen) verliert das Papier die Web-Adresse. |
| `page-break` / `break-inside` | Nirgends gesetzt. Cards, Grids, Listen brechen mittendrin. |
| Font-Grössen | Screen-`clamp()` bleibt aktiv; auf Papier teils zu gross (Hero-Titles sind clamp(2.5rem, 6vw, 3.75rem) → im Druck riesige Schrift mit leerer Fläche drumherum). |
| Lucide-Icons | SVGs drucken per Default mit. Bei Checklisten-Icons sinnvoll, bei dekorativen Icons Tinten-Verschwendung. |
| Hero-Bild (HomeLanding) | Als `<img>` im Layout; druckt mit. Da HomeLanding Print-Relevanz niedrig ist, weniger problematisch. |
| Footer-Kontaktdetails | Footer ist `.no-print` → keine Kontakt-Info auf Papier. Für Templates mit hoher Print-Relevanz (Toolbox, Netzwerk) wäre ein print-spezifischer Mini-Footer mit den drei Notfallnummern und/oder dem PUK-Verweis sinnvoll. |

### 1A.7 Gesamtbild

**Statistik:**

| Metrik | Wert |
|---|---|
| `@media print`-Blöcke im Projekt | 1 (app-global.css) |
| Print-CSS-Regeln in diesem Block | 4 |
| Templates mit hoher Print-Relevanz | 1 (Toolbox) |
| Templates mit mittlerer Print-Relevanz | 4 (Glossar, Grundlagen, Netzwerk, Evidenz) |
| Templates mit niedriger Print-Relevanz | 3 (HomeLanding, Learning, Vignetten) |
| Templates mit dediziertem `printView` | 1 (Toolbox) |
| Templates mit „leerem Papier"-Risiko | **1** (Vignetten: aggressive `.no-print` ohne Alternative) |
| Browser-druckbare Arbeitshilfen konkret | 1 (Toolbox-Arbeitsansicht) |
| TXT-Download-Arbeitshilfen | 6 |
| Notfallnummern auf normalem Papier | **0** (Emergency-Banner ist `.no-print`, Toolbox-`printView` enthält sie nicht) |
| Identifizierte systemische Print-Lücken | 5 (color-adjust fehlt, Link-URLs fehlen, page-break fehlt, Font-Skalierung, Notfall-Footer) |

**Top-3-Befunde:**

1. **Notfallnummern verschwinden im Druck.** Emergency-Banner ist `.no-print`; Toolbox-`printView` enthält keine konkreten Nummern. Wer ein Arbeitsblatt in der Familie ablegt, hat 144, AERZTEFON, 147 nicht griffbereit. Das ist R31-nahe Thematik (Audit 09): die Funktionalität am kritischen Pfad wird auf Papier schlicht nicht gezeigt.
2. **Vignetten-Seite druckt leer.** Alle Sections `.no-print` ohne `printView`. Wer die Seite ausdruckt, bekommt fast leeres Papier.
3. **OG-Description verspricht mehr als geliefert wird.** „Printfähige Arbeitshilfen" im Plural deckt faktisch eine browser-druckbare Arbeitsansicht (Toolbox) plus sechs TXT-Downloads. Kein redaktioneller Betrug, aber ehrlich betrachtet schmal.

**Gap zwischen Versprochen und Eingelöst:**

- Versprochen: „printfähige Arbeitshilfen" (Plural, in OG-Description und Hero-Lead)
- Eingelöst (browser-druckbar): 1 Toolbox-Arbeitsansicht
- Eingelöst (als Download): 6 TXT-Vorlagen
- Nicht eingelöst (Infrastruktur): Basis-Print-CSS, Notfallnummern auf Papier, Vignetten-Print-Output, systemische Risikofaktoren (color-adjust, Link-URLs, page-break)

---

**STOPP nach Phase 1A.** Warte auf Freigabe für Phase 2A (Diagnose und Massnahmenkatalog).

---

## Phase 2A -- Diagnose und Massnahmenkatalog

### 2A.1 Gesamtbild

Die Print-Lücke ist **systemisch, aber punktuell lösbar**. Die bestehende Infrastruktur (`.no-print`/`.print-only`-Mechanismus, dediziertes `toolboxPrintView`) zeigt, dass Print im Projekt grundsätzlich mitgedacht wird, aber ohne durchgehendes Basis-Stylesheet. Das Ergebnis: Toolbox druckt gut, Vignetten druckt leer, alle anderen drucken „irgendwie" -- mit fehlenden Backgrounds, schlechten Page-Breaks und ohne Notfallkontext.

**Die schwerste Lücke ist strukturell identisch zum R31-Fix aus Audit 09**: Die Notfall-Funktionalität ist am Bildschirm vollständig da (drei `tel:`-Links im Emergency-Banner), aber im Medium der echten Nutzung -- ein ausgedrucktes Arbeitsblatt, das jemand in der Familie liegen lässt -- fehlt sie. Audit 09 hat die Bildschirm-Seite dieser Asymmetrie behoben (Text → `tel:`-Link). Audit 11 muss die Papier-Seite beheben (Nummern sichtbar drucken).

**Das Arbeitshilfen-Versprechen** der OG-Description wird in diesem Audit **nicht durch neue Inhalte** geschlossen. Die Lösung ist ein Basis-Print-Stylesheet, das die „mittlere Print-Relevanz"-Templates (Glossar, Grundlagen, Netzwerk, Evidenz) tatsächlich druckbar macht. Damit wird das Plural in „printfähige Arbeitshilfen" plausibel, auch ohne neue redaktionelle Inhalte.

### 2A.2 Vier Massnahmen-Kategorien

---

#### P0 -- Notfallnummern-Print-Footer (vor Release zwingend)

**Problem:** Alle drei Notfallnummern (144, AERZTEFON +41 800 33 66 55, 147) stehen nur im Emergency-Banner (`.no-print`) oder in der ErrorBoundary (nur bei Render-Fehlern aktiv). Auf gedrucktem Papier sind sie nirgends sichtbar. Der Toolbox-`printView` enthält sie auch nicht.

**Lösung:** Ein zentral definierter Print-Footer-Block, der per `@media print` auf **jeder** gedruckten Seite automatisch erscheint. Nicht pro Template duplizieren, nicht als `tel:`-Link (auf Papier funktional irrelevant), sondern rein als lesbare Zahlen.

**Vorschlag Markup + CSS:**

```html
<!-- In App.jsx oder einer neuen PrintNotfallFooter-Komponente -->
<aside class="print-notfall-footer print-only" aria-hidden="true">
  <p>Notfall: 144 Sanität · 147 Pro Juventute · AERZTEFON 0800 33 66 55</p>
</aside>
```

```css
@media print {
  .print-notfall-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4mm 10mm;
    border-top: 1pt solid #333;
    font-size: 9pt;
    font-weight: 700;
    color: #000;
    background: #fff;
  }
}
```

**Warum `position: fixed` im Print-Kontext:** Damit der Block am unteren Rand jeder gedruckten A4-Seite erscheint, nicht nur am Ende des Dokuments. `position: fixed` verhält sich in `@media print` so, dass moderne Browser (Chrome, Firefox, Safari, Edge) den Block pro Druckseite wiederholen -- genau das gewünschte Verhalten.

**`aria-hidden="true"`:** Weil der Block zur Bildschirmzeit (`.print-only` → display:none) ohnehin unsichtbar ist; auf Papier ist er selbsterklärend. Bei Screenreadern würde der `.print-only`-Inhalt sonst stumm mitgelesen werden.

**Platzierung im Code:** Ein `<PrintNotfallFooter />` als kleine Komponente im `App.jsx`, direkt vor `<Footer />`. Das ist eine Shell-Komponente, wie Header und Footer, nicht template-spezifisch.

**Swiss-German-Orthografie:** „Notfall: 144 Sanität · 147 Pro Juventute · AERZTEFON 0800 33 66 55". `Sanität` statt `Sanitätsnotruf` (kürzer auf einzeiligem Footer); Punkt-Separatoren als Mittelpunkt `·` für kompakte Trennung ohne Komma-Verwirrung.

**Risiko:** Sehr niedrig. Die CSS-Regel ist isoliert; `position: fixed` im Print-Mode wird von allen Modern-Browsern korrekt gerendert.

**Umsetzung:** Ein Commit. `audit(11): notfallnummern-print-footer`.

---

#### P1 -- Globales Basis-Print-Stylesheet (vor Release empfehlenswert)

**Problem:** Die systemischen Lücken aus 1A.6 (fehlendes `color-adjust`, keine URL-Anzeige, keine `page-break`-Hints, unpassende Font-Grössen).

**Lösung:** Ein einziges, gebündeltes Print-Stylesheet, das alle systemischen Lücken auf einmal schliesst. Neue Datei `src/styles/print.css`, importiert in `main.jsx` oder `App.jsx`. Alternativ als zusätzlicher Block in der bestehenden `app-global.css` (wo bereits der minimal-`@media print`-Block steht).

**Entscheidung zur Datei-Ablage:** Die bestehende `app-global.css` hat bereits einen `@media print`-Block (4 Regeln). Die neue CSS gehört **daneben**, im selben Block oder direkt danach. Eine separate `print.css` wäre redundant und würde Print-Logik über zwei Dateien verteilen. Kompakter: den bestehenden Block in `app-global.css` erweitern.

**Regel-Katalog für den Block:**

```css
@media print {
  /* --- Bestand --- */
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  @page { size: A4; margin: 12mm 14mm 18mm; }  /* bottom: Platz für Notfall-Footer */
  html, body { background: #fff !important; }

  /* --- Neu (P1): Basis-Typografie und Farb-Reset --- */
  html {
    font-size: 11pt;              /* ersetzt clamp()-Skala */
    line-height: 1.45;
    color: #000;
  }
  body {
    background: #fff !important;
    color: #000;
  }
  h1 {
    font-size: 18pt;
    font-weight: 800;
    line-height: 1.15;
    margin-top: 0;
  }
  h2 { font-size: 14pt; line-height: 1.2; }
  h3 { font-size: 12pt; line-height: 1.25; }
  p, li { font-size: 11pt; color: #000; }

  /* --- Neu (P1): Farb-Adjust fuer semantisch kritische Flaechen --- */
  /* Toolbox-Baender: Farbe erzwingen, weil Caution/Danger als semantische
     Marker dienen. Alternativ: Unterstreichen oder Rand-Marker. Wir waehlen
     Erzwingen via print-color-adjust, weil das am verlaesslichsten ist. */
  .ui-toolbox-band--caution,
  .ui-toolbox-band--danger,
  .ui-toolbox-feedback--caution,
  .ui-toolbox-feedback--danger {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* --- Neu (P1): Link-URL-Anzeige fuer externe Links --- */
  a[href^="http"]:not([href*="eltern-a.netlify.app"])::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #333;
    word-break: break-all;
  }
  /* tel:-Links: URL unterdruecken, weil der sichtbare Text bereits die
     Nummer ist (aria-label enthaelt nur Zusatz-Kontext). */
  a[href^="tel:"]::after {
    content: none;
  }
  /* mailto: optional, aktuell nicht im Code verwendet, deshalb keine Regel. */

  /* --- Neu (P1): Page-Break-Verhalten --- */
  h1, h2, h3 {
    break-after: avoid;
    page-break-after: avoid;
  }
  .ui-card,
  .ui-card-grid > *,
  .ui-stack--loose > *,
  .toolbox-print-card,
  figure, table, pre {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  ul, ol { orphans: 3; widows: 3; }

  /* --- Neu (P1): Shell gezielt verstecken --- */
  /* Buttons mit .haptic-btn oder interaktive CTAs, die auf Papier sinnlos
     sind, nicht drucken. Wir nutzen weiter .no-print als Opt-out und
     zusaetzlich eine Heuristik fuer reine Interaktions-Controls. */
  .ui-button[data-interactive-only="true"],
  button[aria-expanded],
  .ui-chip[role="button"] {
    display: none !important;
  }

  /* Hero-Bild: auf HomeLanding Tinten-sparend weglassen. */
  .ui-hero__image,
  .ui-hero img {
    display: none !important;
  }

  /* --- Notfall-Footer (P0) gehoert auch in diesen Block --- */
  .print-notfall-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4mm 10mm;
    border-top: 1pt solid #333;
    font-size: 9pt;
    font-weight: 700;
    color: #000;
    background: #fff;
  }
}
```

**Kommentare pro Block in Swiss-German, damit der Code selbst-erklärend bleibt.**

**Heikler Punkt: `print-color-adjust: exact`.** Dieser greift nur für die Toolbox-Bänder, weil dort die Farbe den semantischen Unterschied Caution/Danger trägt. Alle anderen Surface-Farben (Cards, Footer, Banner) bleiben ohne exact-Adjust und verschwinden im Druck -- was erwünscht ist (weisser Hintergrund spart Tinte).

**Buttons und interaktive Controls:** `.no-print` ist weiterhin der primäre Opt-out. Die zusätzliche Heuristik über `aria-expanded` und `[role="button"]` fängt Elemente, die nicht explizit als `.no-print` markiert sind, aber auf Papier keinen Sinn ergeben (Accordion-Toggles, Filter-Chips). Falls das zu aggressiv ist, kann die Regel gestrichen werden; aktuell gibt es keine bekannten gegen-Beispiele.

**Hero-Bild:** Auf HomeLanding wird es ausgeblendet -- HomeLanding hat niedrige Print-Relevanz, und das Hero-Bild ist reine Dekoration.

**Risiko:** Niedrig bis mittel. Die grösste Unsicherheit ist das `page-break`-Verhalten pro Template, weil Karten-Grids unterschiedlich strukturiert sind. Die `break-inside: avoid`-Regel wirkt auf `.ui-card` und `.ui-card-grid > *` global; einzelne zu grosse Karten könnten dann auf mehrere Seiten verschoben werden, wenn sie nicht ganz auf eine Seite passen. Der Trade-off ist vertretbar: lieber einen Seitenwechsel vor einer langen Karte als einen Seitenwechsel mitten durch.

**Umsetzung:** Ein Commit, der P0 und P1 bündelt -- weil der Notfall-Footer CSS-seitig Teil des Blocks ist und das Markup (die Komponente) minimal ist. Variante: zwei Commits, einer für CSS, einer für Markup. Ich empfehle **einen Commit**, weil beide Teile ineinander greifen und einzeln nicht sinnvoll sind. Commit: `audit(11): basis-print-stylesheet mit notfall-footer`.

Alternativ zwei Commits bei strikter Trennung:
- `audit(11): basis-print-stylesheet` (CSS-Block)
- `audit(11): notfallnummern-print-footer` (Komponente + CSS-Anbindung)

Die Auftraggeberin entscheidet über die Commit-Granularität.

---

#### P2 -- Vignetten-Print-Behandlung (Entscheidungsfrage)

**Problem:** VignettenPageTemplate markiert alle Hauptsektionen als `.no-print` ohne `printView`-Alternative. Ctrl+P liefert leeres Papier. Das ist entweder Absicht (aus Audit-05-Anonymisierung, weil Vignetten nicht einfach mitgenommen werden sollen) oder ein Versehen.

**Zwei Optionen:**

**Option V1 -- Vignetten sind bewusst nicht druckbar.**

Begründung: Die sieben Vignetten sind fiktive Fallbeispiele aus Audit 05 und an strenge Anonymisierungs- und Kontextualisierungs-Regeln gebunden. Ausgedruckte Kopien, die ausserhalb des Supervisions-Kontexts zirkulieren, widersprechen der sorgfältigen Kontextualisierung. Wer die Vignette nutzen will, nutzt sie im Browser.

Umsetzung:

```jsx
// In VignettenPageTemplate.jsx, als print-only-Hinweis eingefügt:
<div className="print-only print-not-intended-notice">
  <h1>Diese Seite ist nicht zum Ausdrucken vorgesehen.</h1>
  <p>
    Vignetten sind ausschliesslich für die digitale Ansicht gedacht, weil
    die Fallkontexte eine sorgfältige Einordnung brauchen, die auf Papier
    nicht durchgehalten werden kann.
  </p>
  <p>
    Für druckbare Arbeitshilfen öffnen Sie die Toolbox im Browser und
    nutzen dort die Arbeitsansicht „Arbeitsansicht drucken".
  </p>
</div>
```

Mit Styling:

```css
@media print {
  .print-not-intended-notice {
    max-width: 14cm;
    margin: 4cm auto;
    padding: 8mm;
    border: 1pt solid #333;
    text-align: left;
  }
  .print-not-intended-notice h1 {
    margin: 0 0 4mm;
    font-size: 14pt;
  }
  .print-not-intended-notice p {
    margin: 0 0 3mm;
    font-size: 11pt;
    line-height: 1.5;
  }
}
```

**Aufwand:** 15-30 min. Ein Commit: `audit(11): vignetten-print-hinweis`.

**Risiko:** null.

**Option V2 -- Vignetten sollen druckbar sein, die `.no-print` sind ein Versehen.**

Umsetzung: `printView` analog zum Toolbox-Pattern. Pro Vignette wird beim Drucken eine kompakte Druck-Ansicht gerendert -- Kurzbeschreibung plus Reflexionsfrage. Ohne interaktive Zustände (keine ausgewählte Option, keine Next-/Prev-Nav).

Struktur:

```jsx
const vignettenPrintView = (
  <div className="vignetten-print-view">
    {VIGNETTEN.map((v, i) => (
      <section key={v.id} className="vignetten-print-card">
        <p className="vignetten-print-kicker">Fall {i + 1}</p>
        <h2 className="vignetten-print-title">{v.title}</h2>
        <p className="vignetten-print-body">{v.body}</p>
        <p className="vignetten-print-question">{v.question}</p>
      </section>
    ))}
  </div>
);
```

Plus ein CSS-Block für `.vignetten-print-*` in `print.css` oder `app-global.css`.

**Aufwand:** 1-2 Stunden. Ein Commit: `audit(11): vignetten-print-view`.

**Risiko:** niedrig-mittel -- die Print-Darstellung muss alle 7 Vignetten auf Papier sauber formatieren, mit `break-inside: avoid` pro Fall.

**Empfehlung zum Entscheidungs-Prozess:** V1 ist wahrscheinlicher, weil Audit 05 sensible Kontextualisierungs-Regeln für Vignetten gesetzt hat. Aber diese Einschätzung ist nicht verifiziert; die Auftraggeberin entscheidet aus der redaktionellen Sicht.

---

#### P3 -- Optionale Feinheiten (kann warten)

Aktuell nicht drängend, aber bei späterer Gelegenheit sinnvoll:

- **URL-Verkürzung bei sehr langen Links.** Manche Fachstellen-URLs in `networkContent.js` sind lang (z. B. deeppfade zu PUK-Unterseiten). Eine `::after`-Regel könnte URLs über X Zeichen abschneiden oder mit CSS `text-overflow: ellipsis` verkürzen. Geringer Mehrwert.
- **Print-spezifische Font-Wechsel.** Das Projekt nutzt Manrope (Body) und Source Serif 4 (Heading). Auf Papier sind serif-Fonts für Fliesstext traditionell besser lesbar, sans-serif für Headings kräftiger. Ein Wechsel wäre stilistisch, aber optional. Aktuell bleibt die Screen-Typografie im Druck.
- **Print-optimierte Page-Numbering.** `@page :first { ... }` und `counter(page)` könnten Seitenzahlen einblenden. Bei längeren Toolbox-Ausdrucken (potentiell 2-3 Seiten) hilfreich. Niedriger Mehrwert bei aktuellen Inhalts-Längen.
- **`@page :left`/`:right`-Unterschiede** für spätere Duplex-Drucke. Out of scope.

Kein Commit in diesem Audit; wenn später Bedarf entsteht, in ein eigenes Ticket.

### 2A.3 Was Audit 11 NICHT tut

- **Keine neuen Arbeitshilfen-Inhalte.** Die OG-Description-Aussage „printfähige Arbeitshilfen" wird durch das Basis-Print-Stylesheet breiter gedeckt (Glossar, Grundlagen, Netzwerk, Evidenz werden tatsächlich druckbar), aber nicht durch Erfinden neuer Merkblätter. Wenn die Auftraggeberin nach Audit 11 findet, dass konkrete zusätzliche Arbeitshilfen fehlen (z. B. eine dedizierte Netzwerk-Druckansicht mit Kontakt-Tabelle statt langer Fliesstext-Karten), ist das ein redaktionelles Folge-Ticket.
- **Kein PDF-Export.** Print heisst Browser-Print via Ctrl+P, nicht generierte PDF-Dateien.
- **Keine Änderung der bestehenden TXT-Download-Architektur.** Die 6 TXT-Vorlagen aus `useDownloadHandlers.js` bleiben als **separater** Pfad erhalten. Die Zwei-Pfad-Architektur (TXT-Download + Browser-Print) ist legitim; jede Variante trägt andere Stärken. Wenn die Auftraggeberin später entscheidet, die TXT-Vorlagen als HTML-Varianten besser zu platzieren, ist das ein redaktionelles Folge-Ticket -- nicht Print-CSS-Thema.

### 2A.4 Priorisierung

| Kategorie | Bezeichnung | Priorität | Begründung |
|---|---|---|---|
| **P0** | Notfallnummern-Print-Footer | **vor Release zwingend** | Strukturell identisch zum R31-Fix aus Audit 09: Notfall-Funktionalität am Bildschirm da, auf Papier nicht. Care-Portal-Pflicht. |
| **P1** | Globales Basis-Print-Stylesheet | **vor Release empfehlenswert** | Schliesst systemische Lücken (Font, Page-Break, Color-Adjust, URLs); ohne diese bleibt der OG-Description-Promise schmaler als nötig. |
| **P2** | Vignetten-Print-Behandlung (V1 oder V2) | **vor Release empfehlenswert**, Entscheidung offen | V1 = Hinweis (15-30 min, niedriges Risiko). V2 = printView (1-2 h, niedrig-mittleres Risiko). Der Status quo (leeres Papier) ist nicht akzeptabel, aber welche der beiden Richtungen liegt bei der Auftraggeberin. |
| **P3** | Optionale Feinheiten (URL-Kürzung, Print-Fonts, Page-Nummern, Duplex) | **kann warten** | Kein Nutzer-Impact ohne klaren Anlass. |

### 2A.5 Umsetzungs-Reihenfolge für Phase 3A (nach Freigabe)

Vorschlag:

1. **Erstens P0+P1 zusammen** (entweder ein Commit oder zwei, nach Präferenz der Auftraggeberin). Das ist der strukturelle Eingriff, der allen Templates zugutekommt.
2. **Dann P2** (Vignetten V1 oder V2), nach Entscheidung.
3. P3 wird übersprungen.

**Abhängigkeiten:** Keine. Beide Schritte können sequenziell oder parallel laufen.

### 2A.6 Was die Auftraggeberin entscheiden muss

1. **P0+P1 Commit-Granularität:** Ein Commit (CSS + Komponente gebündelt) oder zwei Commits (CSS separat, Komponente separat)?
2. **P2 Richtung:** V1 (Vignetten nicht druckbar + Hinweis) oder V2 (Vignetten mit `printView`)?
3. **Datei-Ablage Print-CSS:** Erweiterung des bestehenden `@media print`-Blocks in `app-global.css` (kompakter, empfohlen) oder neue Datei `src/styles/print.css` (separater, formal sauberer)?

---

**STOPP nach Phase 2A.** Warte auf Freigabe der Einzelvorschläge, insbesondere der Vignetten-Entscheidung (V1 vs. V2).

---

# Teil B -- Audit 12: Content-Wartbarkeit

## Phase 1B -- Inventur

### 1B.1 Datei-Inventar `src/data/*.js`

| Datei | Zeilen | Primärer Nutzer | Grob-Schema | Beeinflusst durch |
|---|---|---|---|---|
| `appShellContent.js` | 91 | App-Shell, Header, Footer | `TAB_ITEMS[]` mit `{id, label, icon, footerNote, priority, primaryAudience}` + STORAGE/VERSION-Konstanten | Audit 02 (primaryAudience) |
| `evidenceContent.js` | 619 | EvidenceSection | **35 benannte Exports**, gemischt: Punkt-Listen, Panel-Arrays, Stats mit `sourceIds`, SUPPORT_OFFERS, MEDIA_BOOKS, MEDIA_DIGITAL | Audit 04 (sourceIds), Audit 06, 07 |
| `glossaryContent.js` | 234 | GlossarSection | `GLOSSARY_GROUPS[]` mit clusters → terms `{term, definition, practice}`; HERO, INTRO | Audit 07 (Eintrags-Erweiterung auf 21) |
| `grundlagenContent.js` | 162 | GrundlagenSection | `GRUNDLAGEN_CLUSTERS[]` → `faqs[]` `{question, answer}`; HERO, INTRO | Audit 06, 07 |
| `learningContent.js` | 74 | ElearningSection, VignettenSection | `VIGNETTEN[]` `{id, title, description, status, options[]}`, `E_MODULES[]` `{id, title, duration, storyboard, quiz, quizOptions, correctQuizIdx}`, `ASSESSMENT_ITEMS[]` `{id, label, val}` | Audit 05 |
| `networkContent.js` | 286 | NetworkSection | `RESOURCE_DATA[]` `{name, info, link, tags}`, NETWORK_FILTERS, MAP_NODES, MAP_LENSES, LEGAL_* | Audit 04 (Stubs) |
| `routeMeta.js` | 104 | `useDocumentMeta` | `DEFAULT_META`, `ROUTE_META{start,lernmodule,...}`, Funktion `getRouteMeta()` | Audit 10 (neu) |
| `sourcesContent.js` | 217 | Cross-Ref via `sourceIds[]` | `SOURCES{}`: 16 Einträge mit `{id, author, year, title, journal, publisher, type, doi, link, chFocus}` | Audit 04 (zentrales Quellen-Register) |
| `toolboxContent.js` | 298 | ToolboxSection | ACUTE_CRISIS_STEPS/_CONTACTS, SAFETY_PLAN_POINTS/_TEMPLATE_FIELDS, CHILD_PROTECTION_*, ADDICTION_*, RIGHTS_FAQ, PRACTICE_BLOCKS | Audit 03, 04, 07 |

**Summe**: 9 Dateien, 2085 Zeilen.

### 1B.2 Schema-Konsistenz-Check

**Innerhalb der Dateien:**

| Datei | Befund |
|---|---|
| `sourcesContent.js` | ✓ vollständig konsistent: alle 16 SOURCES-Einträge haben exakt die 10 Felder mit `null`-Werten für fehlende Angaben |
| `glossaryContent.js` | ✓ alle 21 Glossar-Terms haben `{term, definition, practice}` |
| `appShellContent.js` | ✓ alle 8 TAB_ITEMS haben `{id, label, icon, footerNote, priority, primaryAudience}` |
| `routeMeta.js` | ✓ alle 8 Route-Entries haben `{title, description, ogTitle, ogDescription}` |
| `networkContent.js` RESOURCE_DATA | ✓ alle 16 Einträge haben `{name, info, link, tags}` |
| `toolboxContent.js` | ≈ teilweise: SAFETY_PLAN_TEMPLATE_FIELDS hat `{title, hint}`, CHILD_PROTECTION_THRESHOLDS hat `{title, text}` (unterschiedliches Feld-Naming für gleiche Rolle). Konsistent innerhalb jedes Arrays, nicht zwischen ähnlichen Arrays. |
| `learningContent.js` | ≈ **VIGNETTEN**: 1 echter Eintrag (`fall1`) plus 2 Stubs als Block-Kommentare (V2, V3). `VIGNETTEN.length === 1`. Schema des aktiven Eintrags konsistent. Die Stub-Kommentare sind menschenlesbare Platzhalter, nicht maschinenlesbare Einträge. |
| `evidenceContent.js` | ≈ verschiedene Schemas pro Array (erwartbar bei 35 Exports mit unterschiedlichem Zweck), aber innerhalb jedes Arrays konsistent |
| `grundlagenContent.js` | ✓ alle GRUNDLAGEN_CLUSTERS haben `id, eyebrow, title, description, faqs[]`; alle `faqs[]` haben `{question, answer}` |

**Zwischen verwandten Dateien:**

| Vergleich | Befund |
|---|---|
| `RESOURCE_DATA` (networkContent) vs. `SUPPORT_OFFERS` (evidenceContent) | **Schema-Divergenz.** Beide beschreiben Fachstellen-Angebote, nutzen aber unterschiedliche Feldnamen: `info` vs. `description`, `tags[]` vs. `category + audience`. Zusätzlich **inhaltliche Überlappung** (~8 Einträge kommen in beiden Arrays vor -- PUK, iks, Stiftung Windlicht, Caritas «mit mir», Pro Mente Sana, kjz, feel-ok.ch, Elternnotruf-Pendant). Unterschiedliche Beschreibungen derselben Angebote. |
| `LITERATUR` (evidenceContent) vs. `SOURCES` (sourcesContent) | **Schema-Divergenz plus Dopplung.** `LITERATUR` hat `{author, title, publisher, link?}` als Free-Text-Liste (legacy). `SOURCES` hat das vollständige strukturierte Schema. Beide enthalten dieselben Studien, aber nur `SOURCES` ist über IDs referenzierbar. Das Audit-04-Pattern ist teilweise eingeführt: `RELEVANCE_STATS` nutzt `sourceIds`, `LITERATUR` nicht. |
| `ACUTE_CRISIS_CONTACTS` (toolboxContent) vs. `RESOURCE_DATA` (networkContent) | **Schema-Divergenz.** ACUTE_CRISIS_CONTACTS: `{name, note, link}`. RESOURCE_DATA: `{name, info, link, tags}`. Gleiche Semantik (`note`=`info`), anderer Name. |

### 1B.3 Cross-Reference-Integritäts-Check

**Python-Scan der `sourceIds[]`-Referenzen aus `evidenceContent.js` gegen `SOURCES`-Keys in `sourcesContent.js`:**

| Metrik | Wert |
|---|---|
| SOURCES-Einträge in sourcesContent.js | 16 |
| Unique `sourceIds`-Referenzen in evidenceContent.js | 8 |
| **Verwaiste Referenzen** (referenziert, aber nicht in SOURCES) | **0** |
| SOURCES-Einträge ohne `sourceIds`-Referenz | **8 (50 %)** |

Die 8 nicht formell referenzierten SOURCES-Einträge sind: `jones-2016`, `koopmann-2025`, `lenz-2014`, `lenz-2019`, `puk-angehoerigenarbeit`, `reupert-2021`, `stauber-2020`, `wiegand-grefe-2024`. Sie tauchen alle als **Free-Text-Einträge in LITERATUR** auf (inhaltlich genutzt), aber ohne ID-Brücke ins strukturierte Register.

**Konsequenz:** Das Audit-04-Pattern (zentrales Quellen-Register + `sourceIds[]`-Referenzen) ist **halb implementiert**: 8 von 16 Studien sind formell verlinkt, 8 bleiben als LITERATUR-Paralleleinträge. Wer eine Studie ändert (z. B. neue Auflage, anderer Link), muss an zwei Stellen ändern -- redaktionelle Fussangel.

**Weitere Cross-References:**

| Referenz-Pattern | Befund |
|---|---|
| `glossaryId` oder Glossar-Verlinkungs-Marker | **keine gefunden.** Audit 07 hat 4 "vorbereitete Verlinkungen" erwähnt, aber im Code existiert kein Mechanismus dazu. Inline-Kommentare wie `// L2: Beistandschaft`, `// L4: Melderecht` zeigen Absicht, aber keine aktive Verlinkung. |
| `primaryAudience`-Werte | konsistent: nur `"beide"`, `"fachpersonen"`, `"angehoerige"` in allen 8 TAB_ITEMS. Aber: **nirgends konsumiert.** Grep auf `primaryAudience` findet nur Vorkommen in `appShellContent.js`. Eingeführt durch Audit 02, aber aktuell reine Doku-Metadaten, kein Code-Konsum. |
| `VIGNETTEN[].options[].isCorrect` | vorhanden in `fall1`. Durch VignettenSection konsumiert. ✓ |
| `E_MODULES[].correctQuizIdx` | Integer-Index in `quizOptions[]`. Konsistent. ✓ |
| `ASSESSMENT_ITEMS[].id` | Referenziert durch ToolboxSection (Score-Checked-Tracking). ✓ |

### 1B.4 JSDoc-Typisierung

**`grep` auf `@typedef|@param|@type|@returns` im gesamten `src/`:** Zero Treffer. JSDoc wird nirgends eingesetzt.

Das ist eine saubere Ausgangslage für eine spätere Einführung -- keine halben Fragmente, keine inkonsistenten Annotations. Bei einer Einführung müssten die Schemas aus 1B.2 als Typedefs erfasst werden: `Source`, `GlossaryTerm`, `TabItem`, `RouteMeta`, `ResourceOffer`, `VignetteFall`, `EModule`, `AssessmentItem`, plus ggf. interne Hilfstypen.

### 1B.5 Redaktionelle Fussangeln

Pro Datei konkrete Stellen, die bei künftiger Pflege besonders fehleranfällig sind:

**`sourcesContent.js`:**
- Die ID `'foo-yyyy'` ist freie Konvention (nachname-jahr oder lead-lastword-year). Keine enforced Form. Bei neuen Einträgen könnte die Benennung abweichen und die `sourceIds[]`-Referenzen bräuchten Anpassung.
- `chFocus: true/false` ist ein binärer Flag, der Audit-04-Semantik trägt. Bei neuen Einträgen vergessbar.
- `doi`, `link`, `journal`, `publisher` mit `null` für fehlend: Muss konsistent `null` sein, nicht leerer String oder `undefined`. Aktuell sauber, aber eine leise Fussangel.

**`evidenceContent.js`:**
- **`LITERATUR`-Doppelpflege**: Wenn eine Studie in SOURCES aktualisiert wird, muss LITERATUR separat angepasst werden. Nichts erzwingt Konsistenz. Konkretes Risiko.
- **`SUPPORT_OFFERS` vs. `RESOURCE_DATA` (networkContent)**: Bei Änderung einer Fachstellenbeschreibung an einer Stelle bleibt die andere unverändert. ~8 Überlappungs-Angebote.
- Inline-Kommentar in Zeile 24: "Weblinks (...) nach SUPPORT_OFFERS verschoben -- siehe sourcesContent.js". Der Kommentar verweist ins falsche Register: verschoben wurde nach SUPPORT_OFFERS (evidenceContent.js selbst), nicht nach sourcesContent.js. **Kleiner Doku-Fehler.**

**`glossaryContent.js`:**
- Keine IDs pro Term. Verlinkung (Audit 07 als "vorbereitet") wäre ohne ID-Feld schwer robust.
- Inline-Kommentare wie `// L2: Beistandschaft (Art. 308 ZGB) – Quelle: Faktenbasis Abschnitt 2` dokumentieren Audit-07-Herkunft, sind aber nicht maschinenlesbar.
- Konvention "Begriff als String-Key, mit Klammer-Ergänzung für Abkürzungen" (z. B. `'KESB (Kindes- und Erwachsenenschutzbehörde)'`): Fussangel bei späterer Verlinkung, weil der Anker-Text komplex ist.

**`learningContent.js`:**
- **VIGNETTEN-Stubs als Block-Kommentare**, nicht als Daten-Einträge. `VIGNETTEN.length === 1`. Wer oberflächlich liest, könnte denken, es seien 3 Fälle vorgesehen. **UI zeigt aktuell korrekt "1".** Die Stubs sind redaktionell erwartet und mit Audit-05-Begründungen kommentiert, aber sie könnten beim Auffüllen leicht Schema-inkonsistent werden.
- `correctQuizIdx` als Zahl (Index) statt ID ist fragil bei Umstrukturierung der `quizOptions[]`.

**`networkContent.js`:**
- Freie `tags[]`-Strings ohne zentrale Enumeration. Neue Tags können an einer Stelle entstehen und an anderer Stelle unbekannt bleiben. Filter greift nur auf explizit deklarierte Tags in `NETWORK_FILTERS` zu.
- Keine IDs pro Ressource → bei Änderung einer Beschreibung muss der Eintrag per String-Match identifiziert werden.
- Schema-Dopplung mit SUPPORT_OFFERS (siehe 1B.2).

**`toolboxContent.js`:**
- Arrays mit Free-Text-Strings (ACUTE_CRISIS_STEPS, SAFETY_PLAN_POINTS, CHILD_PROTECTION_TIPS, ADDICTION_TIPS, PARENT_SELF_HELP_POINTS): Keine IDs, Reihenfolge ist positions-stabil durch Array-Index. Ändern der Reihenfolge könnte Template-Logik beeinflussen, falls irgendwo ein Index genutzt wird.
- `ACUTE_CRISIS_CONTACTS`: die Emergency-Nummer `144` hat `link: null` -- wäre konsistenter mit den anderen Contacts, wenn sie als `link: 'tel:144'` stünde (aktuell wird sie nur als Text gerendert). R31-Fix aus Audit 09 wirkt ausserhalb dieses Arrays.

**`routeMeta.js`:**
- **BASE_URL** hartkodiert auf `'https://eltern-a.netlify.app'`. Bei Domainwechsel zentrale Stelle, aber auch in `index.html` JSON-LD und in `public/robots.txt` und `public/sitemap.xml` -- **vier Stellen synchron zu halten.**
- Felder pro Route-Entry optional (z. B. `ogImage` nicht explizit gesetzt → Fallback auf DEFAULT_META). Strukturierung funktioniert, aber bei Ergänzung neuer Felder kann Defaultierung leicht übersehen werden.

**`appShellContent.js`:**
- `primaryAudience` ist redaktionelle Metadaten ohne Code-Konsum. Pflege-Risiko: Feld wird bei neuen Tabs vergessen, niemand merkt es.
- Icon-Imports aus `lucide-react` direkt in der Content-Datei → Refactoring-Fussangel, wenn die Icon-Bibliothek gewechselt würde.

### 1B.6 Migrations-Option erwägen

Keine Empfehlung, nur Darstellung:

| Option | Vorteile | Nachteile |
|---|---|---|
| **Beibehalten als JS-Module** (Status quo) | Konsistenz mit Vite-Build; Typ-Inferenz via JSDoc möglich; Icons direkt importierbar; keine Migration nötig | Niederschwellige redaktionelle Pflege heikel (Nicht-Entwickler-Zielgruppe, JavaScript-Syntax); bei Syntaxfehler bricht der Build; Quotes-Escaping fehleranfällig |
| **Markdown / MDX** | Niederschwellige Pflege; klassische Struktur für Content-lastige Seiten; MDX würde Komponenten weiter zulassen | Verlust strukturierter Felder (z. B. `sourceIds`, Score-IDs); neuer Build-Schritt; Migration von 2000 Zeilen substanzieller Aufwand; bricht die bestehende Section→Template→Content-Schicht aus Audit 09 |
| **Strukturiertes JSON** mit Schema-Validierung | Schema-Validierbar z. B. via `ajv`, eindeutige Strukturen, maschinell prüfbar, hinter eine kleine Editor-Schicht setzbar | Verlust von Kommentaren (legales JSON lässt keine Kommentare zu); ESM-Import ist weniger bequem; JSON5 oder YAML wären realistischere Kandidaten; Icon-Imports müssten extern gelöst werden |
| **Hybrid**: JS-Module behalten, aber JSDoc-Typisierung und Schema-Validierungs-Tests ergänzen | Niedrigschwellig; fügt Sicherheit hinzu ohne Migration; VSCode-Typ-Inferenz aktivierbar | Lösung ist additiv; nicht strukturell sauberer |

**Einschätzung:** Die Dateien sind **grundsätzlich gesund**. Die Hauptprobleme (1B.2, 1B.3, 1B.5) sind **harmonisierbar ohne Migration** -- es handelt sich um Schema-Anpassungen, Doppelpflege-Auflösung und eine ID-Einführung für das Glossar. Eine vollständige Markdown- oder JSON-Migration würde mehr Aufwand erzeugen als die identifizierten Probleme rechtfertigen.

### 1B.7 Gesamtbild

**Statistik:**

| Metrik | Wert |
|---|---|
| Datei-Anzahl | 9 |
| Zeilen total | 2 085 |
| Schema-Inkonsistenzen innerhalb einzelner Dateien | 2 (toolboxContent title/text vs title/hint; VIGNETTEN mit Stub-Kommentaren) |
| Schema-Divergenzen zwischen verwandten Dateien | 3 (LITERATUR/SOURCES, RESOURCE_DATA/SUPPORT_OFFERS, ACUTE_CRISIS_CONTACTS/RESOURCE_DATA) |
| Verwaiste Cross-References | **0** |
| SOURCES-Einträge ohne formelle Referenz | **8 von 16 (50 %)** |
| JSDoc-Abdeckung | **0 %** |
| Redaktionelle Fussangeln identifiziert | **12** (querfelderweise, siehe 1B.5) |
| Migrations-Einschätzung | **Beibehalten als JS-Module**, Nachpflege empfohlen |

**Top-5-Hot-Spots:**

1. **LITERATUR vs. SOURCES: 50 % Doppelpflege.** 8 Studien stehen in beiden Arrays, nur die SOURCES-Form ist über IDs referenzierbar. Die LITERATUR-Einträge bräuchten entweder eine Migration auf `sourceIds`-Basis oder eine klare Rollentrennung (LITERATUR = rein redaktionelle Display-Liste, SOURCES = Cross-Ref-Register).
2. **RESOURCE_DATA vs. SUPPORT_OFFERS: 8 überlappende Fachstellen mit unterschiedlichen Schemas.** Bei Änderung einer Fachstellen-Beschreibung muss an zwei Stellen geändert werden, mit divergenten Feldnamen.
3. **`primaryAudience` ist totes Metadatum.** Audit 02 hat es eingeführt, aber kein Code konsumiert es. Entweder aktivieren (Filter, Empfehlungs-Logik, Meta-Output) oder explizit als redaktionelle Dokumentation markieren.
4. **Glossar-Verlinkung nicht formalisiert.** Audit 07 hat 4 Terme als "vorbereitete Verlinkungen" deklariert, aber der Code hat weder IDs pro Term noch einen Verlinkungs-Mechanismus. Die Absicht bleibt ungeerntet.
5. **BASE_URL an vier Stellen synchron.** `routeMeta.js`, `index.html` (JSON-LD, canonical, OG-URL), `public/robots.txt`, `public/sitemap.xml`. Bei Domainwechsel leicht übersehbar.

**Nicht-Hot-Spots (positiv):**
- Cross-Reference-Integrität (0 verwaiste IDs).
- Schema-Konsistenz innerhalb der meisten Dateien.
- JSDoc-Start-Punkt ist sauber (0 %, nicht halbvolle Einzelfragmente).
- Migrations-Option ist fachlich offen, aber nicht dringend.

---

**STOPP nach Phase 1B.** Warte auf Freigabe für Phase 2B (Diagnose und Massnahmenkatalog).

---

## Phase 2B -- Diagnose und Massnahmenkatalog

> **Fussnote zur Git-History:** Die Phase-2A-Commit-Message hatte versehentlich „sieben Vignetten nach Audit 05" angegeben. Tatsächlich ist **eine Vignette aktiv** (`fall1`) plus **zwei Audit-05-Stubs** (V2, V3) als Block-Kommentare. Die Entscheidung für V1 (Vignetten-Print-Hinweis statt druckbarer `printView`) bleibt davon unberührt, weil sie unabhängig von der Anzahl greift. Kein Force-Push, kein Rewrite -- nur diese Richtigstellung.

### 2B.1 Gesamtbild

Die Datenstruktur ist nach neun Audits **grundsätzlich gesund** (0 verwaiste Cross-References, 7 von 9 Dateien vollständig schema-konsistent in sich), aber sie zeigt drei erwartbare Entropie-Stellen:

- **Doppelpflege** zwischen alten Free-Text-Listen und neuen strukturierten Registern (Audit-04-Pattern nur zur Hälfte implementiert).
- **Tote Metadatenfelder** aus früheren Audits (`primaryAudience`, Glossar-Verlinkungs-Kommentare), die entweder aktiviert oder explizit als redaktionelle Doku gekennzeichnet gehören.
- **Hartkodierte Konstanten** (BASE_URL), die sich über mehrere Dateien verteilen und bei späterem Domainwechsel zur Stolperfalle werden.

Keine dieser Probleme verursacht einen nutzer-sichtbaren Defekt. Audit 12 hat deshalb **keine „vor Release zwingend"-Massnahmen**. Die Priorisierung weiter unten unterscheidet klar zwischen „empfehlenswert als Investition in die Zukunft der Seite" und „kann warten".

Migrations-Fragestellung (Markdown/JSON) wird mit „Beibehalten als JS-Module plus Nachpflege" beantwortet -- die identifizierten Probleme sind ohne Migration lösbar. Eine Markdown-Migration würde zusätzlich die in Audit 09 etablierte Section → Template → Content-Schicht aufbrechen.

### 2B.2 Sieben Massnahmen-Kategorien

---

#### W1a -- Schema-Harmonisierung: LITERATUR → SOURCES

**Problem:** `evidenceContent.js` enthält eine `LITERATUR`-Liste mit 15 Free-Text-Einträgen. Das zentrale Register `SOURCES` in `sourcesContent.js` enthält 16 strukturierte Einträge. 8 Studien existieren in **beiden** Arrays mit unterschiedlichem Schema -- bei Änderungen müssen zwei Stellen synchron gehalten werden. Nur die SOURCES-Seite ist über `sourceIds[]` cross-ref-fähig.

**Migrations-Plan:**

- **Kanonisches Schema**: `SOURCES` (Audit-04-Pattern). Jeder neue oder bestehende Eintrag lebt mit `{id, author, year, title, journal, publisher, type, doi, link, chFocus}`.
- **LITERATUR-Rolle neu definiert**: keine eigene Content-Liste, sondern abgeleitete Ansicht. Die bestehende `LITERATUR`-Konstante wird durch eine `LITERATUR_IDS = [...]`-Liste ersetzt, die IDs in der gewünschten Sortier-Reihenfolge listet. Template rendert über `LITERATUR_IDS.map(id => SOURCES[id])`.
- **Zuordnungs-Tabelle** (LITERATUR-Einträge → SOURCES-IDs):

| LITERATUR-Eintrag | existiert in SOURCES als | Massnahme |
|---|---|---|
| Lenz (2014) | `lenz-2014` | direkt verlinken |
| Koopmann et al. (2025) | `koopmann-2025` | direkt verlinken |
| Plass & Wiegand-Grefe (2012) | `plass-wiegandgrefe-2012` | direkt verlinken (aber Titel-Divergenz beachten, LITERATUR-Titel weicht von SOURCES-Titel ab) |
| pädiatrie schweiz (2021) | `albermann-mueller-2021` | direkt verlinken |
| Jones et al. (2016) | `jones-2016` | direkt verlinken |
| Reupert et al. (2021) | `reupert-2021` | direkt verlinken |
| Stauber et al. (2020) | `stauber-2020` | direkt verlinken |
| Lenz (2019) | `lenz-2019` | direkt verlinken |
| Höller et al. (2023) | `hoeller-2023` | direkt verlinken |
| Grube & Dorn (2007) | `grube-dorn-2007` | direkt verlinken |
| Leijdesdorff et al. (2017) | `leijdesdorff-2017` | direkt verlinken |
| Wiegand-Grefe et al. (2024) | `wiegand-grefe-2024` | direkt verlinken |
| Wiegand-Grefe & Plass-Christl (2025) | `wiegand-grefe-plass-christl-2025` | direkt verlinken |
| Albermann & Müller (2021) | `albermann-mueller-2021` | **Dublette!** Identischer Eintrag wie "pädiatrie schweiz (2021)". Empfehlung: eine Referenz behalten, andere entfernen. |
| Schuler et al. (2016) | `obsan-72-schuler-2016` | direkt verlinken |

- **Titel-Divergenz bei Plass & Wiegand-Grefe (2012)**: LITERATUR sagt „Ursachen, Folgen und Hilfen für Kinder psychisch Kranker. Stuttgart: Kohlhammer." -- SOURCES sagt „Kinder psychisch kranker Eltern. Entwicklungsrisiken erkennen und behandeln. Weinheim: Beltz". Das sind **zwei verschiedene Bücher derselben Autorenschaft**. SOURCES-Eintrag referenziert den Weinheim-Band. Wenn der Stuttgart-Band weiterhin zitiert werden soll, braucht er einen eigenen SOURCES-Eintrag (z. B. `plass-wiegandgrefe-2012-kohlhammer`). **Manuelle Entscheidung der Auftraggeberin erforderlich.**
- **Dublette Albermann/pädiatrie schweiz**: beide Einträge verweisen auf dieselbe Paediatrica-Veröffentlichung. Empfehlung: nur ein Eintrag in der abgeleiteten Liste.

**Code-Anpassung:** `src/templates/EvidencePageTemplate.jsx` konsumiert `LITERATUR` (über `EvidenceSection.jsx`). Dort wird die Map-Funktion auf die neue abgeleitete Struktur umgestellt. Templates können pro Eintrag zusätzlich `DOI`, `type`, `chFocus` als UI-Information rendern, falls gewünscht.

**Aufwand:** **M** (halber Tag)
- Zuordnung manuell prüfen: 30 min
- 1-2 neue SOURCES-Einträge bei unklaren Abbildungen: 15 min
- LITERATUR-Array durch LITERATUR_IDS ersetzen: 15 min
- Template-Anpassung: 30 min
- Testen: 15 min

**Risiko:** niedrig. Render-Ausgabe auf Evidenz-Seite muss visuell gleich bleiben.

**Commit:** `audit(12): literatur auf sources-register ueberfuehren`

---

#### W1b -- Schema-Harmonisierung: RESOURCE_DATA + SUPPORT_OFFERS konsolidieren

**Problem:** Zwei Arrays beschreiben Fachstellen-Angebote mit unterschiedlichen Schemas. `networkContent.js` hat `RESOURCE_DATA` (16 Einträge: `{name, info, link, tags}`), `evidenceContent.js` hat `SUPPORT_OFFERS` (9 Einträge: `{name, category, audience, description, link, official?, highlight?}`). Etwa 8 Angebote stehen in beiden Arrays (PUK, iks, Stiftung Windlicht, Caritas «mit mir», Pro Mente Sana, kjz, feel-ok.ch, Elternnotruf-Pendant).

**Migrations-Plan:**

- **Kanonisches Schema** in einer neuen zentralen Datei `src/data/fachstellenContent.js`:

```js
/**
 * @typedef {Object} Fachstelle
 * @property {string} id                 - kebab-case, stabil
 * @property {string} name               - Anzeigename
 * @property {string} description        - kurze Beschreibung (1-2 Saetze)
 * @property {string} link               - URL
 * @property {string[]} tags             - fuer Netzwerk-Filter; enum aus NETWORK_FILTERS
 * @property {string=} audience          - Zielgruppen-Bezeichnung (optional, fuer Evidenz)
 * @property {string=} category          - thematische Kategorie (optional, fuer Evidenz)
 * @property {boolean=} official         - ist offizielle Stelle (optional)
 * @property {string=} highlight         - Hervorhebungs-Badge (optional, z.B. "kostenlos")
 */
```

- **Feld-Konsolidierung**: `info` → `description` (harmoniert auf Evidenz-Begriff, weil „Beschreibung" klarer ist als „info"). `category + audience` bleiben optional für Evidenz-Kontext. `tags[]` bleibt für Network-Filter.
- **Einträge**: Beide Arrays werden in `FACHSTELLEN[]` zusammengeführt, mit stabilen IDs (`puk-angehoerigenberatung`, `iks`, `stiftung-windlicht`, etc.). Überlappende Einträge werden einmal geführt -- mit der Vereinigung beider Beschreibungen (vorzugsweise die aus SUPPORT_OFFERS, weil etwas ausführlicher; falls die Network-Beschreibung einen anderen Akzent trägt, als zusätzliches `audience`-Feld aufnehmen).
- **Manuelle Zuordnungs-Entscheidungen** (pro überlappendes Paar kurzes redaktionelles Urteil):

| Fachstelle | Network-Text | Evidenz-Text | Entscheidung |
|---|---|---|---|
| PUK Angehörigenberatung | „Offizielle und kostenlose..." | „Kostenlose und vertrauliche Beratung der Fachstelle..." | Evidenz-Text nehmen (ausführlicher). Tags aus Network. |
| iks | „Schweizweite Fachstelle..." | „Nationale Anlaufstelle mit Beratung, Präventionsangeboten..." | Evidenz-Text. Tags aus Network. |
| Stiftung Windlicht | „Geschützter Raum..." | „Geschützter Raum in Winterthur und Zürich..." | Evidenz-Text (enthält Ortsangabe). |
| Caritas «mit mir» | „Patenschaftsangebot..." | „Patenschaftsangebot..." | praktisch identisch; Evidenz-Text nehmen. |
| Pro Mente Sana | „Kostenlose psychosoziale..." | „Unabhängige psychosoziale..." | Evidenz-Text (betont „unabhängig"). |
| kjz | „Erziehungsberatung..." | „Flächendeckende Beratung..." | Evidenz-Text. |
| feel-ok.ch | „Schweizer Jugendportal..." | -- | nur Network, bleibt so. |
| Elternnotruf | „143 – Die Dargebotene Hand" (Network) ≠ Elternnotruf (Evidenz) | -- | **Unterschiedliche Stellen.** 143 und Elternnotruf bleiben als zwei Einträge. |

- **Code-Anpassung:**
  - `NetworkSection.jsx` konsumiert `RESOURCE_DATA` → neu `FACHSTELLEN` mit denselben Feldern (`name`, `info`/`description` harmonisiert), Filter weiter über `tags[]`.
  - `EvidenceSection.jsx` konsumiert `SUPPORT_OFFERS` → neu `FACHSTELLEN.filter(s => s.category)` oder explizite ID-Liste analog zur LITERATUR-Lösung. Evidenz-Render bleibt gleich, nutzt die optionalen Felder `category`, `audience`, `official`, `highlight`.

**Aufwand:** **M-L** (ein Tag)
- Zentrale `fachstellenContent.js` mit 20 Einträgen: 2 h
- Ressourcen-IDs vergeben und Dubletten zusammenführen: 1 h
- Feld-Namen harmonisieren: 30 min
- `NetworkSection.jsx` + `EvidenceSection.jsx` + Templates anpassen: 1,5 h
- Testen (Netzwerk-Filter, Evidenz-Render): 1 h
- Puffer für Edge-Cases: 1 h

**Risiko:** mittel. Die grössten Unsicherheiten sind die Tag-Migrations (Network-Filter darf nicht brechen) und die Evidenz-Darstellung (die eventuell spezifisches Styling für `official/highlight` hat).

**Commit:** `audit(12): fachstellen zentral konsolidieren`

---

#### W2 -- `primaryAudience`-Entscheidung (strategische Frage)

**Problem:** Das Metadatum aus Audit 02 ist konsistent gesetzt (alle 8 TAB_ITEMS), aber nirgends im Runtime-Code konsumiert. Es ist **dokumentierte Intention** aus Audit 06 Block 5 (z. B. „Desorganisation nur in Angehörigen-Texten"), aber bleibt aktuell unsichtbar für den Code.

**Zwei Optionen:**

**Option PA1 -- Als dokumentierte Intention belassen.**

Keine Runtime-Änderung. Ein JSDoc-Kommentar am TAB_ITEMS-Schema erklärt Bedeutung und historische Verwendung:

```js
/**
 * @typedef {Object} TabItem
 * @property {'start'|'lernmodule'|'vignetten'|'glossar'|'grundlagen'|'evidenz'|'toolbox'|'netzwerk'} id
 * @property {string} label
 * @property {React.ComponentType} icon
 * @property {string} footerNote
 * @property {'primary'} priority
 * @property {'fachpersonen'|'angehoerige'|'beide'} primaryAudience -
 *   Redaktionelles Metadatum aus Audit 02. Dokumentiert die primaere
 *   Zielgruppe eines Tabs. Wird aktuell nicht im Runtime konsumiert, aber
 *   bei redaktionellen Entscheidungen (z.B. Fachjargon-Schwelle in Audit 06
 *   Block 5) verwendet. Bei neuen Tabs setzen, damit die Konvention
 *   lebendig bleibt.
 */
```

**Aufwand:** 10 Minuten. Ein Commit-Teil von `audit(12): jsdoc-typen fuer tab-items und routemeta`.

**Risiko:** null.

**Option PA2 -- Ins Runtime-Verhalten integrieren.**

Das Metadatum wird zu einem funktionalen Flag, z. B.:
- Ein `data-primary-audience`-Attribut auf `<body>` oder `<main>`, das per CSS-Selektor Layout-Varianten erlaubt.
- Eine Bedingung in `useDocumentMeta.js`, die pro Tab den `twitter:audience`-Tag setzt.
- Ein Filter in HomeLanding, der die Direkte-Einstiege-Karten nach Audience gruppiert („Für Fachpersonen" / „Für Angehörige").

**Aufwand:** **M** (halber bis ganzer Tag), weil jede dieser Nutzungen konkret definiert, designt und getestet werden muss.

**Risiko:** mittel, weil jede neue Nutzung eine Design-Entscheidung ist und die Seite nach Audit 10 bereits release-fähig ist -- Runtime-Änderungen haben höhere Regressions-Oberfläche als reine Doku.

**Empfehlung von Claude Code: PA1.** Drei Gründe:

1. Die Seite ist inhaltlich release-fähig. PA2 würde neue Design-Entscheidungen einführen, die nicht durch ein konkretes Nutzer-Problem motiviert sind.
2. PA1 kostet 10 Minuten, hält die Intention lebendig und ermöglicht PA2 jederzeit später, falls ein konkreter Anlass entsteht.
3. Die historische Verwendung (Audit 06 Block 5) war redaktionell, nicht Runtime. Ein JSDoc-Kommentar ehrt diese Rolle präzise.

**Commit:** Teil von W3a (JSDoc-Typen).

---

#### W3a -- JSDoc-Typen für fünf Schemas

**Nicht Vollabdeckung**, sondern die fünf zentralen Schemas:

| Typ | Datei | Zweck |
|---|---|---|
| `TabItem` | `appShellContent.js` | TAB_ITEMS-Einträge (inkl. primaryAudience-Kommentar aus PA1) |
| `Source` | `sourcesContent.js` | SOURCES-Einträge |
| `GlossaryTerm` | `glossaryContent.js` | Einzelne Glossar-Term-Einträge inkl. der neuen `id`-Felder aus W3b |
| `Fachstelle` | `fachstellenContent.js` (neu aus W1b) | konsolidierte Fachstellen-Einträge |
| `RouteMeta` | `routeMeta.js` | Per-Route-Meta-Einträge |

Typen werden als `@typedef`-Blöcke an den Anfang der jeweiligen Datei gesetzt. Keine Tooling-Änderung (kein TypeScript-Compiler), aber VSCode und andere moderne Editoren nutzen die Typen automatisch für Autovervollständigung und Hover-Tooltips.

**Aufwand:** **S** (2-3 h)
- 5 Typ-Definitionen pro Datei: ca. 20-30 min
- Zusätzlich pro Schema ein `@returns` oder `@param` an der wichtigsten Helfer-Funktion (`getRouteMeta`, `useAppState`-Getter): ca. 30-60 min
- Verifikation durch VSCode (Hover-Tooltips anzeigen): 15 min

**Risiko:** null. JSDoc ist rein kommentarisch, wird vom Build ignoriert.

**Commits** (pro Schema einer oder in einem gebündelten Commit, je nach Präferenz):
- `audit(12): jsdoc-typen fuer tab-items und routemeta`
- `audit(12): jsdoc-typen fuer sources und glossar-terme`
- `audit(12): jsdoc-typ fuer fachstellen`

Empfehlung: drei Commits wie oben, weil jeder Commit auch inhaltliche Schema-Aspekte (PA1, W3b, W1b) anstösst.

---

#### W3b -- Glossar-Verlinkung minimal implementieren

**Problem:** Audit 07 hat vier Terme (KESB, Parentifizierung, Trialog, Komorbidität) als „vorbereitet für Verlinkung" dokumentiert (Inline-Kommentare wie `// L2: Beistandschaft`, `// L4: Melderecht`). Aber: kein ID-Feld pro Term, kein Verlinkungs-Mechanismus.

**Skizze der minimalen Implementierung:**

1. **Glossar-Terme bekommen IDs.**

```js
{
  id: 'kesb',
  term: 'KESB (Kindes- und Erwachsenenschutzbehörde)',
  definition: '...',
  practice: '...',
}
```

IDs: `kesb`, `parentifizierung`, `trialog`, `komorbiditaet` (kebab-case, swiss-german-tauglich, kein ß). Alle 21 Terme bekommen IDs, nicht nur die vier verlinkten -- das erlaubt spätere Erweiterung ohne Schema-Wechsel.

2. **Kleine Helfer-Komponente** `<GlossarLink term="kesb">KESB</GlossarLink>`.

```jsx
// src/components/ui/GlossarLink.jsx
import { useAppState } from '../../context/useAppState';

export default function GlossarLink({ term, children }) {
  const { navigate } = useAppState();

  const handleClick = (event) => {
    event.preventDefault();
    navigate('glossar', { focusTarget: 'heading' });
    // Nach Navigation: Zielterm via hash oder focus highlighten.
    // Hier Minimum: einfacher Fokus-Wechsel auf Glossar-Tab.
  };

  return (
    <a
      href={`#glossar-${term}`}
      onClick={handleClick}
      className="ui-glossar-link"
      aria-label={`${children} im Glossar öffnen`}
    >
      {children}
    </a>
  );
}
```

3. **Vier Verlinkungen im Fliesstext** (konkrete Stellen aus Audit 07):
   - KESB: `toolboxContent.js` RIGHTS_FAQ, `glossaryContent.js` Gefährdungsmeldung-Term
   - Parentifizierung: `evidenceContent.js` CHILD_EXPERIENCE-Bereich
   - Trialog: `glossaryContent.js` Angehörigenarbeit-Term (cross-glossar)
   - Komorbidität: `evidenceContent.js` CROSS_DIAGNOSIS_POINTS oder ToolboxSection `addiction`-Cluster

Aber -- und hier stolpere ich über ein Design-Problem: Die Content-Dateien sind aktuell **reine Strings und Objekte**, kein JSX. Die vier Fliesstext-Stellen sind heute Plain-Text (`text: '... Parentifizierung ...'`). Um `<GlossarLink>` einzubetten, müssten diese Strings entweder zu JSX-Fragmenten werden (grosse Schema-Änderung) oder zu einem kleinen Markup-Parser mit Platzhaltern (`{glossar:parentifizierung|Parentifizierung}`) gerendert werden.

**Das sprengt den Audit-12-Rahmen.** Die saubere Umsetzung verlangt entweder:
- Template-weite JSX-Fragmente statt Strings in Content-Dateien (Architektur-Eingriff), oder
- Einen kleinen Platzhalter-Parser in Templates, der `{glossar:id|Label}` zu `<GlossarLink>` auflöst (neue Utility, moderate Komplexität).

**Aufwands-Einschätzung:**
- Minimale Variante (IDs pro Term + `<GlossarLink>`-Komponente, aber noch keine eingebetteten Links): **S** (2-3 h)
- Vollversion mit Platzhalter-Parser + 4 eingebetteten Links: **M-L** (ganzer Tag, plus Template-Tests)

**Empfehlung:** **Teilschritt jetzt**, Vollversion vertagen.

- **In Audit 12 umgesetzt**: IDs pro Term in `glossaryContent.js` + `<GlossarLink>`-Komponente (funktional, aber noch nicht in Fliesstexten eingebunden). Ein Commit: `audit(12): glossar-ids und glossarlink-komponente`.
- **Vertagt als Follow-up-Ticket**: Platzhalter-Parser + 4 eingebettete Verlinkungen. Im Bericht dokumentiert als „Glossar-Verlinkung Teil 2: Inline-Integration in Fliesstexten". Das wäre ein eigenes kleines Audit oder redaktionelles Ticket.

Falls die Auftraggeberin die Vollversion direkt in Audit 12 will, ist das machbar -- aber es verdoppelt den W3b-Aufwand und streift die in Audit 09 etablierte Schichtung.

---

#### W4 -- BASE_URL single source of truth

**Problem:** Der String `'https://eltern-a.netlify.app'` steht in:
- `src/data/routeMeta.js` (konstante `BASE_URL`)
- `index.html` (JSON-LD, canonical, og:url, og:image -- insgesamt 5 Vorkommen)
- `public/robots.txt` (Sitemap-Zeile)
- `public/sitemap.xml` (loc-Element)

**Lösungsansatz:** Build-Zeit-Injection.

Vite unterstützt `define`-basierte Konstanten und `env`-Variablen. Zwei realistische Varianten:

**Variante A -- `.env`-Datei mit `VITE_BASE_URL`.**

```env
# .env
VITE_BASE_URL=https://eltern-a.netlify.app
```

- `routeMeta.js`: `export const BASE_URL = import.meta.env.VITE_BASE_URL;`
- `index.html`: Vite unterstützt `%VITE_BASE_URL%`-Substitutionen in `index.html` bei Build-Zeit.
- `public/robots.txt` und `public/sitemap.xml`: Statische Dateien, **kein** automatischer Env-Replace. Hier braucht es ein kleines Build-Script (z. B. in `scripts/replace-env.mjs`), das post-build über `dist/robots.txt` und `dist/sitemap.xml` geht und Platzhalter ersetzt. Oder: die Dateien werden direkt aus einem Template im Build-Schritt generiert.

**Variante B -- zentrale `src/config.js` + statisches Copy-Script.**

```js
// src/config.js
export const BASE_URL = 'https://eltern-a.netlify.app';
```

- `routeMeta.js`: importiert aus `./config.js`.
- `index.html`: bleibt hartkodiert, aber bekommt einen Build-Schritt, der aus `src/config.js` die URL liest und in `dist/index.html` post-build ersetzt.
- `public/robots.txt` + `public/sitemap.xml`: gleiches Post-Build-Script.

**Empfehlung: Variante A mit Env-Variable.**

Begründung: Bei späterem Staging/Preview-Deployment (z. B. `relational-recovery-staging.netlify.app`) braucht es ohnehin Env-basierte URL-Variation. Die Env-Variante ist skalierbar.

**Aufwands-Einschätzung:**
- `.env`-Datei + `routeMeta.js`-Anpassung: 15 min
- `index.html` mit `%VITE_BASE_URL%`: 15 min  
- Build-Script `scripts/replace-env.mjs` für robots/sitemap: 1 h
- `package.json`-Build-Chain erweitern: 15 min
- Testen + dokumentieren: 30 min

**Gesamt: S (2-3 h)**

**Risiko:** niedrig. Build-Chain wird länger (um einen Schritt), aber der Schritt ist isoliert und testbar.

**Commit:** `audit(12): base-url als single source of truth via env`

---

#### W5 -- Redaktionelle Fussangeln: Gruppe A / B

Die 12 Fussangeln aus 1B.5 in zwei Gruppen:

**Gruppe A -- Durch Code lösbar (werden in W1a, W1b, W3a, W3b, W4 aufgefangen):**

1. `LITERATUR`-Doppelpflege → W1a
2. Inline-Kommentar-Fehler in evidenceContent.js Zeile 24 („nach sourcesContent.js") → W1a (Kommentar beim Refactor aktualisieren/entfernen)
3. `SUPPORT_OFFERS` vs. `RESOURCE_DATA` Doppelpflege → W1b
4. Glossar-Verlinkung ohne IDs → W3b
5. Schema-Divergenz `ACUTE_CRISIS_CONTACTS` vs. `RESOURCE_DATA` → W1b (wird mitmigriert oder als bewusste Ausnahme im JSDoc dokumentiert)
6. BASE_URL in vier Stellen → W4
7. `primaryAudience` totes Metadatum → W2/PA1 (JSDoc-Kommentar)
8. `correctQuizIdx` als Index statt ID → W3a (JSDoc-Kommentar, der die Index-Semantik dokumentiert und warnt vor Umsortierung)

**Gruppe B -- Dokumentativ lösbar (gehen in `docs/content-pflege.md`):**

9. SOURCES-ID-Konvention (Nachname-Jahr oder Leadwort-Jahr, unverbindlich)
10. `doi`/`link`/`journal`/`publisher` müssen `null` sein, nicht leerer String / `undefined`
11. VIGNETTEN-Stub-Block-Kommentare als menschenlesbare Platzhalter (nicht maschinenlesbare Einträge)
12. `tags[]`-Strings ohne zentrale Enumeration (nur Network-Filter-Tags sind enforced; weitere Tags können an einer Stelle entstehen und sind an anderer Stelle unbekannt)

**`docs/content-pflege.md`** wird ein kurzer Leitfaden von ca. 100-150 Zeilen, der folgende Abschnitte enthält:

- Konventionen beim Hinzufügen einer neuen Quelle zu `SOURCES`
- Umgang mit der `LITERATUR_IDS`-Liste (nach W1a)
- Hinzufügen einer neuen Fachstelle zu `FACHSTELLEN` (nach W1b)
- Glossar-Term-Pflege (IDs, Verlinkbarkeit)
- VIGNETTEN-Stubs: Wie ausgefüllt werden und welches Schema gilt
- `primaryAudience`-Konvention (mit Audit-02- und -06-Verweis)
- Tag-Pflege in networkContent (Enumerationsdisziplin für Filter)
- BASE_URL-Pflege nach W4

**Aufwand:** **S** (2 h). **Risiko:** null (reine Dokumentation).

**Commit:** `audit(12): docs content-pflege leitfaden`

---

### 2B.3 Migrations-Empfehlung (Gesamtbild)

Audit 12 empfiehlt **Beibehalten als JS-Module**. Die identifizierten Probleme sind durch Schema-Harmonisierung (W1a, W1b), JSDoc-Typen (W3a), kleine Refaktorierung (W3b, W4) und einen Leitfaden (W5-Gruppe B) lösbar. Keine Markdown/MDX/JSON-Migration notwendig oder empfohlen.

### 2B.4 Priorisierung

**Wichtig:** Audit 12 hat keine „vor Release zwingend"-Massnahmen. Alle Probleme sind **Investitionen in die Zukunft der Seite**, keine Korrekturen bestehender Defekte. Die Seite funktioniert nach Audit 10 für Nutzer fehlerfrei.

| Kategorie | Bezeichnung | Priorität | Aufwand | Begründung |
|---|---|---|---|---|
| **W1a** | LITERATUR → SOURCES | **empfehlenswert** | M (halber Tag) | Hoher Reibungsgewinn: löst 50 % Doppelpflege auf |
| **W1b** | FACHSTELLEN konsolidieren | **empfehlenswert** | M-L (ganzer Tag) | Löst 8 überlappende Einträge auf; grösste Einzel-Arbeit |
| **W2** | `primaryAudience` PA1 (JSDoc) | **empfehlenswert** | XS (10 min) | Metadatum wird aktiv genutzt gehalten ohne Runtime-Eingriff |
| **W3a** | JSDoc-Typen für 5 Schemas | **empfehlenswert** | S (2-3 h) | VSCode-Autovervollständigung, Doku pro Schema |
| **W3b** | Glossar-IDs + GlossarLink-Komponente (Teil 1) | **empfehlenswert** | S (2-3 h) | Aktiviert Audit-07-Absicht. Vollversion mit Inline-Platzhalter-Parser vertagt |
| **W4** | BASE_URL single source of truth | **empfehlenswert** | S (2-3 h) | Kleiner, sauberer Refaktor |
| **W5-A** | Fussangeln Gruppe A (Code-lösbar) | **empfehlenswert** (gekoppelt an W1-W4) | -- | Werden durch W1-W4 aufgefangen |
| **W5-B** | `docs/content-pflege.md` | **kann warten** | S (2 h) | Leitfaden für spätere Pflege; blockiert keinen Release |

**Gesamt-Aufwandsschätzung** aller W1-W4: ca. **3-4 Arbeitstage** bei sauberer Umsetzung.

### 2B.5 Umsetzungs-Reihenfolge für Phase 3B (nach Freigabe)

Vorschlag:

1. **W4** (BASE_URL) zuerst, weil es isoliert ist und später andere Änderungen nicht verkompliziert.
2. **W1a** (LITERATUR → SOURCES). Kleiner, klarer Schritt.
3. **W1b** (FACHSTELLEN konsolidieren). Grösster Einzel-Schritt.
4. **W3a** (JSDoc-Typen für 5 Schemas) inkl. W2/PA1. Nach W1a/W1b, damit die Typen die konsolidierten Schemas treffen.
5. **W3b** (Glossar-IDs + Komponente, Teil 1).
6. **W5-B** (docs/content-pflege.md) als Abschluss.

### 2B.6 Was die Auftraggeberin entscheiden muss

1. **E-W2**: **PA1 (JSDoc-Kommentar)** oder **PA2 (Runtime-Integration)**? Empfehlung: PA1.
2. **E-W3b**: Glossar-Verlinkung in Audit 12 nur als **Teil 1** (IDs + Komponente) oder **Vollversion** mit Platzhalter-Parser und 4 eingebetteten Links? Empfehlung: Teil 1 in Audit 12, Vollversion vertagen.
3. **E-W1a-Spezialfall**: `plass-wiegandgrefe-2012` -- LITERATUR zitiert den Stuttgart-Kohlhammer-Band, SOURCES den Weinheim-Beltz-Band. Soll der Stuttgart-Band einen eigenen SOURCES-Eintrag bekommen, oder in LITERATUR durch den Weinheim-Band ersetzt werden? (Redaktionelle Entscheidung, nicht von mir fällbar.)
4. **E-W5-B**: `docs/content-pflege.md` in Audit 12 mit erzeugen oder als eigenes späteres Ticket?
5. **E-W4-Variante**: Env-Variable (A, empfohlen) oder zentrale `src/config.js` (B)?
6. **E-Bündelung**: Alle W1-W5 in Audit 12 umsetzen, oder W3b und/oder W5-B vertagen?

---

**STOPP nach Phase 2B.** Warte auf Freigabe der Einzelentscheidungen, speziell zu `primaryAudience` (PA1 oder PA2) und Glossar-Verlinkung (Inclusion als Teil 1 oder Vertagung komplett).
