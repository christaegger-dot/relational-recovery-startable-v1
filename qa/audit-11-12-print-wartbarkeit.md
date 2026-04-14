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
