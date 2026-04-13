# Audit 07 -- Glossar-Konsistenz-Audit

## Phase 1 -- Inventur

### 1.1 Glossar-Bestandsaufnahme

14 Einträge in 3 Clustern:

| # | Cluster | Begriff | Wörter (Def.) | Zielgruppen-Orientierung |
|---|---------|---------|--------------|--------------------------|
| G1 | C1 Sprache | Relationale Recovery | 19 | Eher Fachpersonen |
| G2 | C1 Sprache | Psychisch belastete Elternschaft | 23 | Beide |
| G3 | C1 Sprache | Psychoedukation | 16 | Eher Fachpersonen |
| G4 | C1 Sprache | Mentalisieren | 15 | Eher Fachpersonen |
| G5 | C2 Schutz | Kindeswohl | 16 | Beide |
| G6 | C2 Schutz | Kindeswohlgefährdung | 19 | Beide |
| G7 | C2 Schutz | Schutzfaktor | 18 | Beide |
| G8 | C2 Schutz | Triage | 15 | Beide |
| G9 | C2 Schutz | Beistandschaft (Art. 308 ZGB) | 45 | Beide (mustergültig) |
| G10 | C2 Schutz | Melderecht und Meldepflicht | 40 | Eher Fachpersonen (dicht) |
| G11 | C3 Netzwerk | Angehörigenarbeit | 12 | Beide |
| G12 | C3 Netzwerk | Weitervermittlung | 18 | Beide |
| G13 | C3 Netzwerk | Netzwerkkarte | 18 | Beide |
| G14 | C3 Netzwerk | Kooperationsfenster | 22 | Eher Fachpersonen |

---

### 1.2 Glossar → Fliesstext: Verwendungs-Check

| Begriff | Vorkommen ausserhalb Glossar | Varianten | Konsistenz |
|---------|------------------------------|-----------|------------|
| Relationale Recovery | **0** | Nur im Projektnamen | **inkonsistent** — Kernbegriff wird nie im Text verwendet |
| Psychisch belastete Elternschaft | 3 | "psychisch belastete Eltern", "psychisch erkrankte Eltern" | minor-abweichung |
| Psychoedukation | 21 (9 Dateien) | "psychoedukativ" | **konsistent** |
| Mentalisieren | 1 | "mentalisierungsorientiert" | minor-abweichung |
| Kindeswohl | Implizit via Komposita | "Kindeswohlgefährdung", "Kindeswohlabklärung" | **konsistent** |
| Kindeswohlgefährdung | 1 | Keine | **konsistent** |
| Schutzfaktor | 13 (7 Dateien) | "Schutzfaktoren" (Plural) | **konsistent** |
| Triage | 49 (9 Dateien) | Keine | **konsistent** |
| Beistandschaft | 3 | "Kindesschutz-Beistandschaft" | **konsistent** |
| Melderecht/Meldepflicht | 2 | "Gefährdungsmeldung" (verwandt) | **konsistent** |
| Angehörigenarbeit | 3 | "Angehörigenberatung" (anderer Begriff) | minor-abweichung |
| Weitervermittlung | 12 (6 Dateien) | Keine | **konsistent** |
| Netzwerkkarte | 13 (6 Dateien) | Keine | **konsistent** |
| Kooperationsfenster | **0** | Keine | **inkonsistent** — definiert, aber nie verwendet |

**Verteilung:** 9 konsistent, 3 minor-abweichung, 2 inkonsistent.

Die zwei inkonsistenten Begriffe haben ein gemeinsames Muster: Sie stehen im Glossar, werden aber im restlichen Content nicht benutzt. Das Glossar definiert Begriffe, die das Portal selbst nicht einsetzt.

---

### 1.3 Verlinkungsmechanismus

**Ergebnis: Kein Verlinkungsmechanismus vorhanden.**

| Prüfpunkt | Befund |
|---|---|
| Tooltip-/Popover-Komponente | Nicht vorhanden |
| CSS-Klasse für Glossar-Links | Nicht vorhanden |
| Datenstruktur für Begriffsmarkierung | Nicht vorhanden |
| Import von glossaryContent ausserhalb Glossar | **Nein** — nur in GlossarSection.jsx |
| Automatische Term-Erkennung | Nicht vorhanden |

Glossar und Fliesstext sind **strukturell vollständig getrennt**. Ein Fachbegriff im Evidenz-Teil hat keine Verbindung zum Glossar, ausser dass Lesende die Glossar-Seite selbst aufsuchen.

---

### 1.4 Lücken-Analyse

#### Zwingende Lücken (aus Audit 06 + neu)

| Begriff | Dateien | Häufigkeit | Bewertung |
|---|---|---|---|
| **Parentifizierung** | evidenceContent, HomeLanding, GrundlagenSection | 3 | **zwingend** — zentrales Konzept, nirgends erklärt |
| **Trialog** | grundlagenContent (2x) | 2 | **zwingend** — Fachbegriff ohne jede Erklärung |
| **Komorbidität** | ToolboxSection (Eyebrow) | 1 | **zwingend** — als Überschrift verwendet, nie erklärt |
| **KESB** | 7 Dateien, 18 Stellen | 18 | **zwingend** — häufigster ungeklärter Fachbegriff im Projekt, für Angehörige zentral und oft angstbesetzt |

#### Empfehlenswerte Lücken

| Begriff | Dateien | Häufigkeit | Bewertung |
|---|---|---|---|
| **Schweigepflicht** | toolboxContent (2x), GrundlagenSection, ToolboxSection | 4 | empfehlenswert |
| **SPF (Sozialpädagogische Familienbegleitung)** | learningContent (2x), toolboxContent | 3 | empfehlenswert |
| **Rollenumkehr** | learningContent, evidenceContent (3x) | 4 | empfehlenswert |
| **Loyalitätskonflikt** | evidenceContent (5x) | 5 | empfehlenswert |
| **Gefährdungsmeldung** | learningContent, networkContent, toolboxContent | 3 | empfehlenswert |

#### Optionale Lücken

| Begriff | Häufigkeit | Bewertung |
|---|---|---|
| Patientenverfügung (psychiatrische) | 1 | optional |
| Intoxikation | 4 | optional |
| Verhältnismässigkeit(sprinzip) | 3 | optional |
| Stigma/Stigmatisierung | 4 | optional |
| Prävalenz | 2 | optional |
| Affektbarriere | 1 | optional |

---

### 1.5 Glossar-interne Konsistenz

**Keine Widersprüche.** Die Definitionen sind inhaltlich kohärent.

**1 strukturelle Lücke:** Der Beistandschaft-Eintrag (G9) und der Melderecht-Eintrag (G10) verwenden den Begriff "KESB" intensiv, der aber selbst kein Glossareintrag ist. Lesende, die "KESB" nicht kennen, stossen in der Erklärung einer Massnahme auf einen unklärten Begriff.

Leichte Überlappung zwischen Triage und Weitervermittlung im Praxisfeld — aber die Definitionen differenzieren klar (Triage = Entscheidung, Weitervermittlung = Umsetzung).

---

### 1.6 Zielgruppen-Eignung

| Passung | Anzahl | Begriffe |
|---|---|---|
| Beide Zielgruppen | 9 | G2, G5, G6, G7, G8, G9, G11, G12, G13 |
| Eher Fachpersonen | 4 | G1 (Recovery), G3 (Psychoedukation), G4 (Mentalisieren), G14 (Kooperationsfenster) |
| Zu dicht für Angehörige | 1 | G10 (Melderecht/Meldepflicht) |

Der Beistandschaft-Eintrag (G9) ist ein Vorbild: juristisch korrekt und trotzdem entlastend für Angehörige ("keine Bestrafung", "Sorgerecht bleibt").

---

### 1.7 Gesamtbild

| Dimension | Wert |
|---|---|
| Glossar-Einträge | 14 |
| Konsistent verwendet | 9 |
| Minor-Abweichung | 3 |
| Inkonsistent (definiert, aber nicht benutzt) | 2 |
| Verlinkungsmechanismus | **Keiner** |
| Zwingende Lücken | **4** (Parentifizierung, Trialog, Komorbidität, KESB) |
| Empfehlenswerte Lücken | 5 |
| Optionale Lücken | 6 |

#### Top-5 Inkonsistenzen / Probleme

| Rang | Befund |
|---|---|
| 1 | **KESB fehlt im Glossar** — 18 Vorkommen in 7 Dateien, häufigster ungeklärter Begriff |
| 2 | **Relationale Recovery** — Kernbegriff des Projekts, wird im Content nie verwendet |
| 3 | **Kooperationsfenster** — definiert, aber nie im Content benutzt |
| 4 | **Kein Verlinkungsmechanismus** — Glossar und Fliesstext strukturell getrennt |
| 5 | **Parentifizierung** — 3x verwendet, zentrales Konzept, fehlt im Glossar |

#### Top-10 fehlende Begriffe

| Rang | Begriff | Bewertung |
|---|---|---|
| 1 | **KESB** | zwingend |
| 2 | **Parentifizierung** | zwingend |
| 3 | **Trialog** | zwingend |
| 4 | **Komorbidität** | zwingend |
| 5 | Loyalitätskonflikt | empfehlenswert |
| 6 | Rollenumkehr | empfehlenswert |
| 7 | SPF | empfehlenswert |
| 8 | Schweigepflicht | empfehlenswert |
| 9 | Gefährdungsmeldung | empfehlenswert |
| 10 | Stigma | optional |

---

## Phase 2 -- Diagnose und Massnahmenkatalog

### Der KESB-Sonderfall

KESB ist nicht einfach eine von vier Lücken, sondern die zentrale Einzellücke des gesamten Audits. 18 Vorkommen in 7 Dateien, innerhalb anderer Glossar-Einträge vorausgesetzt, für Angehörige angstbesetzt. Eine Leserin, die im Glossar "Beistandschaft" nachschlägt, stösst auf "KESB" — und findet keine Erklärung.

Die Definition muss zwei Anforderungen gleichzeitig erfüllen: juristische Korrektheit (Audit-03-Faktenbasis) und Entängstigung (Mildeste-Mittel-Logik).

**Entwurf KESB-Glossareintrag** (aus Audit-03-Quellen, keine Erfindung):

```
term: 'KESB (Kindes- und Erwachsenenschutzbehörde)'
definition:
  'Die KESB ist die behördliche Stelle, die in der Schweiz für den Schutz
  von Kindern und schutzbedürftigen Erwachsenen zuständig ist. Sie wird
  tätig, wenn das Wohl eines Kindes gefährdet erscheint und die Eltern
  nicht selbst für Abhilfe sorgen können (Art. 307 ZGB). Im Kanton Zürich
  gibt es 13 KESB.'
practice:
  'Wichtig zu wissen: Nicht jede Meldung an die KESB führt zu einer
  Massnahme -- im Kanton Zürich enden rund zwei Drittel der Meldungen
  mit einer Abklärung, Beratung oder ohne behördliche Anordnung. Wenn
  die KESB tätig wird, ist die häufigste Massnahme die Beistandschaft
  (Art. 308 ZGB): eine Fachperson unterstützt die Familie, das Sorgerecht
  bleibt bei den Eltern. Eine Fremdplatzierung (Art. 310 ZGB) ist die
  Ausnahme, nicht die Regel.'
```

**Quellen für jeden Definitionsbestandteil:**

| Element | Audit-03-Quelle |
|---|---|
| Art. 307 ZGB als Grundnorm | Faktenbasis Abschnitt 1 |
| 13 KESB im Kanton Zürich | Faktenbasis Abschnitt 1 (Praxisindikatoren) |
| Zwei Drittel ohne Massnahme | Stadt Zürich 2024: 32% führen zu Massnahme → 68% nicht (Faktenbasis Abschnitt 1) |
| Beistandschaft häufigste Massnahme | KOKES 2024: 86% in ZH (Faktenbasis Abschnitt 1) |
| Art. 308, Art. 310 | Faktenbasis Abschnitt 1 |

Cluster-Zuordnung: **C2 (Schutz, Risiko und fachliche Schwellen)** — direkt vor Beistandschaft, damit die Leserichtung stimmt (KESB → Beistandschaft → Melderecht).

---

### Der Relational-Recovery-Befund

Drei Deutungen:

**Deutung A: Arbeitstitel, soll ins Schreiben einfliessen.**
Der Begriff ist inhaltlich tragend (die Glossar-Definition beschreibt ein konkretes fachliches Verständnis), wurde aber nie im Fliesstext eingeführt. Konsequenz: An 1-2 strategischen Stellen (HomeLanding-Lead, Evidenz-Einleitung) einführen.

**Deutung B: Bewusst vermieden, zu voraussetzungsvoll.**
"Recovery" ist ein Anglizismus, "relational" ein Fachbegriff. Für Angehörige schwer zugänglich. Konsequenz: Glossar-Eintrag entfernen.

**Deutung C: Nur Label, kein Konzept.**
Konsequenz: Glossar-Eintrag neutralisiert sich oder wird entfernt.

**Einschätzung von Claude Code:** Deutung A ist am plausibelsten. Die bestehende Glossar-Definition beschreibt ein konkretes, fachlich gehaltvolles Konzept ("Erholung bedeutet hier nicht nur weniger Symptome, sondern auch: tragfähige Beziehungen, Orientierung und Handlungsfähigkeit im Alltag zurückgewinnen"). Das ist kein leeres Label, sondern ein inhaltliches Versprechen, das die gesamte Website einlöst, ohne es beim Namen zu nennen. Der HomeLanding-Lead wäre die natürliche Stelle, das nachzuholen.

**Keine Empfehlung — Entscheidung bei der Auftraggeberin.**

---

### Verlinkungs-Entscheidung

| Option | Aufwand | Wartbarkeit | Lesefluss | Risiko |
|---|---|---|---|---|
| **Automatisch** (Parser erkennt Glossar-Begriffe) | M-L | Hoch (neue Begriffe automatisch verlinkt) | Störend bei hoher Begriffsdichte (jeder 3. Fachbegriff markiert) | Fehlzuordnungen möglich |
| **Manuell** (pro Vorkommen im Daten-Feld markiert) | M | Niedrig (jedes neue Vorkommen manuell) | Kontrolliert — nur wichtige Stellen | Vergessene Stellen |
| **Hybrid** (zentrale Begriffe manuell, periphere nicht) | S-M | Mittel | **Bester Kompromiss** | Inkonsistenz: warum wird X verlinkt, Y nicht? |
| **Keine** (Glossar als Stand-alone-Seite) | S | Hoch (nichts zu warten) | Kein Eingriff | Glossar bleibt unsichtbar für Lesende, die nicht selbst dorthin navigieren |

**Empfehlung: Hybrid.** Die 5-8 zentralen Begriffe (KESB, Parentifizierung, Beistandschaft, Triage, Psychoedukation, Schutzfaktor) werden beim ersten Vorkommen pro Sektion manuell verlinkt. Alle übrigen Begriffe nicht. Das vermeidet Lesefluss-Störungen und stellt sicher, dass die wichtigsten Begriffe den Weg zum Glossar weisen.

Technische Umsetzung: Ein neues Datenfeld `glossaryTermId` an den Stellen im Content, wo ein Begriff beim ersten Vorkommen verlinkt werden soll. Das Template rendert dann einen dezenten Link (z.B. gestrichelte Unterstreichung, kein eigenes Tooltip-Popup). Die Implementierung der Link-Komponente gehört allerdings in ein **eigenes Ticket**, nicht in dieses Audit — hier wird nur die Datenstruktur vorbereitet.

---

### Die zwei toten Glossar-Einträge

**Relationale Recovery (G1):**
Siehe "Der Relational-Recovery-Befund" oben. Empfehlung hängt von der strategischen Entscheidung ab. Bei Deutung A: im Content ergänzen. Bei B oder C: entfernen.

**Kooperationsfenster (G14):**
Der Begriff beschreibt ein nützliches Praxiskonzept ("der Moment, in dem alle Beteiligten erreichbar genug sind, um den nächsten Schritt zu vereinbaren"). Er wird aber im Content nie benutzt, weil die Texte dieses Konzept umschreiben, statt es zu benennen.

**Empfehlung: Im Content ergänzen**, nicht entfernen. Der Begriff passt inhaltlich in die Toolbox (Krisenvorsorge, Netzwerkplanung) und in die Evidenz (Übergangsmanagement). 1-2 Stellen, wo der bestehende Text das Konzept bereits umschreibt, könnten den Begriff explizit verwenden. Das macht den Glossar-Eintrag lebendig.

---

### Kategorie A: Begriffsverwendungs-Harmonisierung

Die 3 minor-Abweichungen:

| Begriff | Problem | Empfehlung |
|---|---|---|
| "Psychisch belastete Elternschaft" | Im Fliesstext häufiger "psychisch belastete Eltern" (ohne -schaft) | **Belassen** — die Fliesstext-Variante ist natürlicher. Glossar-Term als kanonische Fachform, Fliesstext darf die Alltagsform verwenden. |
| "Mentalisieren" | Nur 1x als "mentalisierungsorientiert" (Kompositum) | **Belassen** — Kompositum ist korrekte Ableitung, keine Inkonsistenz. |
| "Angehörigenarbeit" vs. "Angehörigenberatung" | Werden nebeneinander verwendet | **Differenzieren**: Angehörigenarbeit = fachliches Konzept (Glossar), Angehörigenberatung = konkretes Angebot (z.B. PUK). Kurzen Hinweis im Glossar-Praxistext ergänzen. |

Kein Harmonisierungsbedarf mit Fliesstext-Änderungen. Die Abweichungen sind Varianten, keine Inkonsistenzen.

---

### Kategorie B: Neue Glossar-Einträge

#### Zwingende Einträge (P1)

| Begriff | Aus bestehendem Content ableitbar? | Recherche nötig? |
|---|---|---|
| **KESB** | **Ja** — aus Audit-03-Faktenbasis vollständig | Nein |
| **Parentifizierung** | **Ja** — evidenceContent.js CHILD_EXPERIENCE_PANELS[1] erklärt den Begriff ausführlich | Nein |
| **Trialog** | **Teilweise** — wird in grundlagenContent.js erwähnt, aber nicht erklärt | Kurze Recherche |
| **Komorbidität** | **Nein** — wird nur als Eyebrow verwendet, nirgends erklärt | Kurze Recherche |

#### Empfehlenswerte Einträge (P2)

| Begriff | Aus bestehendem Content ableitbar? |
|---|---|
| Loyalitätskonflikt | **Ja** — evidenceContent.js CHILD_EXPERIENCE_PANELS[2] erklärt ihn |
| Rollenumkehr | **Ja** — evidenceContent.js erklärt den Zusammenhang mit Parentifizierung |
| SPF | **Ja** — learningContent.js Vignette-Feedback + toolboxContent.js |
| Schweigepflicht | **Teilweise** — toolboxContent.js RIGHTS_FAQ berührt das Thema |
| Gefährdungsmeldung | **Ja** — toolboxContent.js CHILD_PROTECTION_THRESHOLDS |

**Befund: Für 8 von 9 P1/P2-Begriffen kann die Definition aus dem bestehenden Content abgeleitet werden.** Nur Komorbidität und teilweise Trialog brauchen eine externe Mini-Recherche. Die Recherche-Liste wird sehr kurz.

---

### Priorisierung

| Prio | Massnahme | Stellen |
|---|---|---|
| **P1** | KESB-Glossareintrag (Sonderfall) | 1 Eintrag, ausgearbeitet |
| **P1** | Parentifizierung, Trialog, Komorbidität | 3 Einträge |
| **P1** | Verlinkungs-Entscheidung | Architektonisch |
| **P2** | 5 empfehlenswerte Einträge (Loyalitätskonflikt, Rollenumkehr, SPF, Schweigepflicht, Gefährdungsmeldung) | 5 Einträge |
| **P2** | Kooperationsfenster im Content ergänzen | 1-2 Stellen |
| **P2** | Angehörigenarbeit-Differenzierung im Glossar | 1 Praxistext-Ergänzung |
| **P3** | Relational-Recovery-Entscheidung | Strategisch |
| **P3** | Optionale Einträge (Patientenverfügung, Stigma, Prävalenz etc.) | 6 potenzielle Einträge |

---

### Recherche-Liste

Nur 2 Begriffe brauchen externe Recherche:

| Begriff | Frage | Prio |
|---|---|---|
| **Trialog** | Was ist die gängige deutschsprachige Arbeitsdefinition von "Trialog" im psychiatrischen Versorgungskontext? (Dreier-Gespräch Betroffene + Angehörige + Fachpersonen) | P1 |
| **Komorbidität** | Was ist eine alltagstaugliche Definition für "Komorbidität" im Kontext psychische Erkrankung + Sucht? | P1 |

Falls die Recherche-Liste so kurz bleibt, kann sie direkt im Chat geklärt werden statt in einer formalen Sitzung.

---

### Risikoeinschätzung

**Vor Release zwingend:**
1. **KESB-Glossareintrag** — der häufigste ungeklärte, angstbesetzteste Begriff. Ohne Glossar-Definition bleibt die Seite für Angehörige an ihrer empfindlichsten Stelle intransparent.
2. **Parentifizierung** — zentrales Konzept der Kinderperspektive, prominent in Überschriften, nirgends erklärt.

**Empfehlenswert:**
3. Komorbidität und Trialog — als Eyebrow/Meta-Begriffe verwendet, ohne Erklärung.
4. Verlinkungs-Architektur (Datenstruktur vorbereiten, Rendering-Komponente als Folge-Ticket).

**Kann warten:**
5. Die 5 empfehlenswerten Einträge — der Content erklärt sie kontextuell mit.
6. Relational-Recovery-Entscheidung — ist strategisch, aber nicht release-blockierend.

---

*Phase 2 abgeschlossen. Warte auf Freigabe und drei Entscheidungen: (1) Relational Recovery (Deutung A/B/C), (2) Verlinkungs-Option, (3) Kooperationsfenster ergänzen oder belassen.*
