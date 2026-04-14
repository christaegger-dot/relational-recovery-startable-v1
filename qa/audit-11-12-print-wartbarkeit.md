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
