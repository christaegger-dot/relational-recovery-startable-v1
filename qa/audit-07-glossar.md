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

*Phase 1 abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und Massnahmenkatalog).*
