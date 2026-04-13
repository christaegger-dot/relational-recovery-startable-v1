# Audit 05 -- Vignetten-Audit

## Phase 1 -- Inventur

### 1.1 Vignetten-Extraktion

Das Projekt enthält **2 Vignetten**, beide in `src/data/learningContent.js`, Export `VIGNETTEN`. Keine weiteren Vignetten oder vignetten-ähnlichen Inhalte in anderen Dateien.

#### V1: Begleitung bei depressiven Barrieren

| Feld | Wert |
|---|---|
| ID | `fall1` |
| Titel | "Fall 1: Begleitung bei depressiven Barrieren" |
| Quelldatei | learningContent.js, VIGNETTEN[0] |
| Volltext | "Frau M. (32) wird aufgrund einer schweren depressiven Episode stationär begleitet. Sie sorgt für zwei Kinder. Ihr Partner zeigt Zeichen von chronischer Erschöpfung. Aktuell besteht eine starke affektive Barriere zu den Kindern." |
| Wortumfang | 33 Wörter (Fallbeschreibung) + 2 Optionen mit Feedback |
| Protagonistin | Frau M., 32, Mutter |
| Erzählperspektive | Auktorial, Fachsprache, 3. Person |
| Status-Label | "Aufnahme / Woche 1" |

#### V2: Unterstützung bei psychotischem Erleben

| Feld | Wert |
|---|---|
| ID | `fall2` |
| Titel | "Fall 2: Unterstützung bei psychotischem Erleben" |
| Quelldatei | learningContent.js, VIGNETTEN[1] |
| Volltext | "Herr S. (40), alleinige elterliche Sorge, befindet sich in einer akuten psychotischen Krise. Er verweigert dem Kind seit 24 Stunden Nahrung aufgrund wahnhafter Befürchtungen. Dialogversuche zur freiwilligen Hilfe blieben ohne Ergebnis." |
| Wortumfang | 28 Wörter (Fallbeschreibung) + 2 Optionen mit Feedback |
| Protagonist | Herr S., 40, Vater (alleinige Sorge) |
| Erzählperspektive | Auktorial, Fachsprache, 3. Person |
| Status-Label | "Akutaufnahme" |

---

### 1.2 Anonymisierungs-Check

#### V1: Frau M. (32)

| Kriterium | Befund | Bewertung |
|---|---|---|
| Name | Pseudonym "Frau M." (Initial) | Unbedenklich |
| Alter | Exakt: 32 | **Unklar** -- exaktes Alter in Kombination mit anderen Details |
| Wohnort / Institution | Nicht genannt | Unbedenklich |
| Diagnose | "schwere depressive Episode" -- häufige Diagnose | Unbedenklich allein |
| Familiäre Details | "zwei Kinder", "Partner mit Erschöpfung" | **Unklar** -- Kombination 32 + 2 Kinder + Partner + stationär + Depression könnte in einem kleinen Setting erkennbar sein |
| Berufliche Details | Nicht genannt | Unbedenklich |
| **Gesamt** | **Unklar** | Die Kombination exaktes Alter + Kinderzahl + Partnersituation + Diagnose ist in einem PUK-Kontext potenziell re-identifizierend, wenn die Vignette auf einem realen Fall basiert |

#### V2: Herr S. (40)

| Kriterium | Befund | Bewertung |
|---|---|---|
| Name | Pseudonym "Herr S." (Initial) | Unbedenklich |
| Alter | Exakt: 40 | **Unklar** |
| Wohnort / Institution | Nicht genannt | Unbedenklich |
| Diagnose | "akute psychotische Krise" + "wahnhafte Befürchtungen" | Spezifischer als V1 |
| Familiäre Details | "alleinige elterliche Sorge", ein Kind, keine Partnerin | **Unklar** -- alleinerziehender Vater mit Psychose und Akutaufnahme ist eine seltene Konstellation |
| Besonderes Detail | "verweigert dem Kind seit 24 Stunden Nahrung" | **Re-Identifikations-Risiko** -- sehr spezifisches Detail, das in einem klinischen Umfeld erkennbar sein könnte |
| **Gesamt** | **Re-Identifikations-Risiko** | Die Kombination alleinerziehender Vater + Psychose + Nahrungsverweigerung + Akutaufnahme ist selten genug, um in einem Klinik-Kontext zuordenbar zu sein |

**Empfehlung:** Beide Vignetten verwenden exakte Altersangaben, die durch Alters-Ranges (z.B. "Anfang 30", "um die 40") ersetzt werden sollten. V2 hat ein zusätzliches Re-Identifikations-Risiko durch das spezifische Detail der Nahrungsverweigerung.

---

### 1.3 Stigma-Marker-Inventar

#### Vorinventarisierte Stellen aus Audit 02

**Stelle 1: "verweigert Nahrung" (V2)**

> "Er **verweigert** dem Kind seit 24 Stunden Nahrung aufgrund wahnhafter Befürchtungen."

Kontext (3 Sätze davor/danach): "Herr S. (40), alleinige elterliche Sorge, befindet sich in einer akuten psychotischen Krise. **Er verweigert dem Kind seit 24 Stunden Nahrung aufgrund wahnhafter Befürchtungen.** Dialogversuche zur freiwilligen Hilfe blieben ohne Ergebnis."

**Marker-Typ:** Fehlende Handlungsfähigkeit / Agentivitäts-Zuschreibung
**Unbeabsichtigte Wirkung:** "Verweigert" impliziert bewusste Entscheidung (Agentivität), obwohl die Nahrungsverweigerung Symptomfolge der Psychose ist. Eine Fachperson liest "wahnhafte Befürchtungen" als Erklärung, aber ein mitlesender Elternteil liest "er verweigert seinem Kind Nahrung" als moralisches Urteil.

**Stelle 2: "Kinder als Hochrisikogruppe" (evidenceContent.js, nicht Vignette)**

> Titel: "**Kinder als Hochrisikogruppe**"
> Text: "Kinder psychisch erkrankter Eltern tragen ein deutlich erhöhtes Risiko..."

**Hinweis:** Diese Stelle liegt in `evidenceContent.js` (CHILD_EXPERIENCE_PANELS[0]), nicht in den Vignetten. Sie wird hier als Kontext dokumentiert, gehört aber thematisch eher zu Audit 04 (Evidence) oder einem eigenen Sprach-Audit. Das Vignetten-Audit beschränkt sich im Folgenden auf die 2 Vignetten in `learningContent.js`.

#### Erweiterte Suche: Stigma-Marker in den Vignetten

| # | Zitat | Vignette | Marker-Typ | Einschätzung |
|---|---|---|---|---|
| S1 | "Er **verweigert** dem Kind seit 24 Stunden Nahrung" | V2 | Agentivität statt Symptom | Schwerwiegend -- suggeriert Absicht statt Krankheitsfolge |
| S2 | "**starke affektive Barriere** zu den Kindern" | V1 | Defizit-Sprache | Mittel -- rein klinischer Terminus, aber "Barriere zu den Kindern" kann als "will ihre Kinder nicht" gelesen werden |
| S3 | "**schweren** depressiven Episode" | V1 | Dramatisierende Qualifizierung | Leicht -- fachlich korrekt (ICD-Schweregrad), aber "schwer" kann für Laien bedrohlicher klingen als nötig |
| S4 | "Er verweigert dem Kind seit **24 Stunden** Nahrung" | V2 | Dramatisierendes Zeitdetail | Mittel -- das exakte Zeitfenster verstärkt die Dramatik, ohne für die fachliche Entscheidung zwingend nötig zu sein |
| S5 | "**wahnhafter** Befürchtungen" | V2 | Pathologisierung | Leicht -- fachlich korrekt, aber "wahnhaft" kann stigmatisierend wirken. In einem Fachpersonen-Kontext akzeptabel. |

**Keine gefundenen Marker für:**
- Pathologisierung als Personenbeschreibung ("die Borderlinerin") -- nicht vorhanden
- Moralische Untertöne -- nicht vorhanden
- Deterministische Narrative über Kinder -- nicht in den Vignetten (wohl aber in "Hochrisikogruppe" in evidenceContent.js)

---

### 1.4 Repräsentations-Matrix

| Dimension | V1 | V2 |
|---|---|---|
| Geschlecht Protagonist:in | Frau | Mann |
| Diagnosegruppe | Affektiv (Depression) | Psychotisch |
| Sozialer Hintergrund | Nicht erkennbar | Nicht erkennbar |
| Migrationskontext | Nicht erkennbar | Nicht erkennbar |
| Alter des Kindes / der Kinder | Nicht spezifisch ("zwei Kinder") | Nicht spezifisch ("dem Kind") |
| Familienkonstellation | Kernfamilie (Partnerin + 2 Kinder) | Alleinerziehend (alleinige Sorge) |
| Setting | Stationär (Aufnahme) | Stationär (Akutaufnahme) |
| Eskalationsstufe | Niedrig (freiwillige Hilfe) | Hoch (Gefährdungsmeldung) |

#### Aggregierte Auswertung

**Positiv:**
- Geschlechterbalance: 1 Frau, 1 Mann
- Diagnose-Varianz: 1 affektiv, 1 psychotisch
- Eskalationsstufe: 1 niedrig (SPF), 1 hoch (KESB) -- bildet die Bandbreite ab
- Familienkonstellation: 1 Kernfamilie, 1 alleinerziehend

**Lücken (bei nur 2 Vignetten erwartbar, trotzdem benennen):**
- **Kein Sucht-Kontext** -- trotz eigenem Toolbox-Cluster "Sucht und Komorbidität"
- **Kein Migrationskontext** -- obwohl kulturelle Faktoren in der Angehörigenarbeit häufig relevant sind
- **Keine Teenager-Perspektive** -- Kindesalter durchgehend unspezifisch
- **Kein ambulanter Kontext** -- beide Vignetten spielen stationär
- **Keine Persönlichkeitsstörung** -- im Evidenzteil erwähnt, in Vignetten nicht repräsentiert
- **Keine Mehrkind-Dynamik** -- V1 hat zwei Kinder, aber die Dynamik zwischen ihnen wird nicht thematisiert

**Schlagseite:** Nicht die klassische "Mittelschicht-Mutter-mit-Depression-und-Schulkind"-Schlagseite. Stattdessen: **Klinik-zentrierte Akut-Situationen ohne Alltags- und Langzeitperspektive.** Beide Vignetten zeigen den Moment der stationären Aufnahme. Die Frage "Was passiert danach?" fehlt.

---

### 1.5 Kohärenz mit Relational Recovery

#### V1

| Frage | Befund |
|---|---|
| Kind als Beziehungspartner oder Schutzobjekt? | Weder noch -- Kinder werden nur erwähnt ("sorgt für zwei Kinder"), nicht als Personen sichtbar |
| Ressourcen/Handlungsfähigkeit der Eltern? | Teilweise -- Partner ist vorhanden (Ressource), aber als "erschöpft" markiert (Defizit). Frau M. selbst hat keine sichtbare Handlungsfähigkeit. |
| Familiäres Beziehungssystem als Veränderungsort? | Ja, implizit -- die korrekte Antwort (SPF) adressiert das System |
| Entwicklung / Bewegung / Möglichkeit? | Statisch -- die Vignette ist ein Snapshot der Aufnahme, keine Entwicklung |
| **Kohärenz** | **Teilweise kohärent** -- die Lösungsoption (SPF) ist relational, aber die Fallbeschreibung selbst ist defizitorientiert |

#### V2

| Frage | Befund |
|---|---|
| Kind als Beziehungspartner oder Schutzobjekt? | **Reines Schutzobjekt** -- "dem Kind" taucht nur als Empfänger von Nahrungsverweigerung auf |
| Ressourcen/Handlungsfähigkeit der Eltern? | **Keine** -- Herr S. ist komplett handlungsunfähig dargestellt, Dialogversuche "blieben ohne Ergebnis" |
| Familiäres Beziehungssystem? | Nicht sichtbar -- alleinerziehend, kein Netzwerk, keine Bezugspersonen |
| Entwicklung / Bewegung? | **Statisch und eskalativ** -- die einzige Bewegung ist die Eskalation zur KESB-Meldung |
| **Kohärenz** | **Inkohärent** -- die Vignette zeigt einen Elternteil als rein defizitäres, handlungsunfähiges Objekt behördlicher Intervention. Kein relationaler Aspekt sichtbar. |

---

### 1.6 Funktion der Vignetten im Template

Beide Vignetten dienen derselben Funktion: **Fallbasierte Lernhilfe für Fachpersonen** mit einer binären Entscheidungsfrage ("Welche Option ist fachlich eher angezeigt?").

Das Template (`VignettenPageTemplate.jsx`) rahmt sie als:
- "Training mit Vignetten"
- "Kurze Fallsituationen zur Reflexion zwischen Schutz, Kooperation und systemischer Entlastung"
- "Gedacht als Gesprächsimpuls, nicht als Prüfung"
- "Die Darstellung bleibt bewusst fachlich und abwägend statt dramatisch"

**Beobachtung:** Der Rahmentext verspricht "Reflexion" und "Gesprächsimpuls", die Vignetten selbst sind aber binäre Entscheidungen mit einer einzigen korrekten Antwort. Das Versprechen "nicht als Prüfung" steht in Spannung zur Struktur "richtig/falsch".

**Zielgruppe (Audit 02):** `primaryAudience: 'fachpersonen'` -- bestätigt. Die Vignetten adressieren klinisches Personal in stationären Aufnahme-Situationen.

---

### 1.7 Gesamtbild

| Dimension | Wert |
|---|---|
| Vignetten total | 2 |
| Anonymisierung "unbedenklich" | 0 |
| Anonymisierung "unklar" | 1 (V1) |
| Anonymisierung "re-identifikations-risiko" | 1 (V2) |
| Stigma-Marker total | 5 (1 schwerwiegend, 2 mittel, 2 leicht) |
| Kohärenz "kohärent" | 0 |
| Kohärenz "teilweise kohärent" | 1 (V1) |
| Kohärenz "inkohärent" | 1 (V2) |
| Repräsentationslücken | 6 (Sucht, Migration, Teenager, Ambulant, Persönlichkeit, Mehrkind) |

#### Top-5-Problemstellen

| Rang | Stelle | Warum problematisch |
|---|---|---|
| 1 | **V2 "verweigert Nahrung"** | Schwerwiegendster Stigma-Marker: Agentivität statt Symptom + Re-Identifikations-Risiko durch spezifisches Detail |
| 2 | **V2 Gesamt** | Inkohärent mit Relational Recovery: Elternteil als reines Defizit-Objekt, Kind als reines Schutzobjekt, kein Beziehungsaspekt |
| 3 | **V2 Anonymisierung** | Alleinerziehender Vater + Psychose + Nahrungsverweigerung + Akutaufnahme = seltene Konstellation |
| 4 | **V1 "affektive Barriere"** | Klinischer Terminus, der als "will ihre Kinder nicht" gelesen werden kann |
| 5 | **Beide: exaktes Alter** | Exakte Altersangaben (32, 40) erhöhen Re-Identifikations-Risiko unnötig |

---

## Phase 2 -- Diagnose und Massnahmenkatalog

### 2.0 Strategische Ausgangsfrage: Reichen zwei Vignetten?

Bei n=2 trägt jede Vignette 50% der Repräsentations-Last. Jede Schlagseite wird zur 50%-Schlagseite. Die Geschlechterbalance (1/1) ist ein Zufallseffekt, kein Verdienst. Drei Szenarien:

#### Szenario A: Bei zwei Vignetten bleiben

| Dimension | Wert |
|---|---|
| **Aufwand** | S |
| **Konsequenz** | V2 muss in jedem Fall gerettet werden, weil es keine Ausweichoption gibt. Keine Repräsentations-Breite erreichbar. |
| **Risiken** | Zwei Vignetten für ein Fachportal wirken dünn. Die binäre richtig/falsch-Struktur lässt wenig Raum für die versprochene "Reflexion". |
| **Voraussetzungen** | V1 reformulieren, V2 substanziell umschreiben. Kein redaktioneller Neuaufwand jenseits der Reparatur. |

#### Szenario B: Ausbau auf vier Vignetten

| Dimension | Wert |
|---|---|
| **Aufwand** | M (V1 reformulieren, V2 entfernen oder ersetzen, 2 neue Vignetten als Stubs → redaktionelle Ausarbeitung durch Auftraggeberin) |
| **Konsequenz** | V2 kann ersetzt werden. Zwei neue Stubs schliessen Repräsentationslücken (z.B. ambulante Alltagssituation, Suchtkontext, Langzeitbegleitung). Echte Varianz wird möglich. |
| **Risiken** | Redaktioneller Aufwand für 2 neue Vignetten liegt bei der Auftraggeberin, nicht bei Claude Code. Neue Vignetten dürfen keine LLM-Erfindungen sein — sie brauchen klinische Plausibilität und Sensibilität, die nur aus Praxiswissen kommen kann. |
| **Voraussetzungen** | Auftraggeberin formuliert 2 neue Fallbeschreibungen. Claude Code liefert nur die Datenstruktur-Stubs und die Template-Anpassung. |

#### Szenario C: Ausbau auf sechs oder mehr Vignetten

| Dimension | Wert |
|---|---|
| **Aufwand** | L (4+ neue Vignetten, systematische Repräsentations-Matrix, ggf. Dramaturgie-Umbau) |
| **Konsequenz** | Echte Fallvielfalt: Depression, Psychose, Sucht, Persönlichkeit, ambulant, stationär, Teenager, Kleinkind, Migration, Mehrfachbelastung. |
| **Risiken** | Grösster Aufwand. Bindet erhebliche redaktionelle Kapazität. Gefahr der Überforderung, wenn die Qualität der Einzelvignetten nicht gehalten wird. |
| **Voraussetzungen** | Redaktionelles Konzept mit systematischer Repräsentations-Matrix vorab. Alle Vignetten von der Auftraggeberin inhaltlich verantwortet. |

**Keine Empfehlung.** Die Entscheidung liegt bei der Auftraggeberin und hängt von den verfügbaren redaktionellen Kapazitäten ab.

---

### 2.1 Diagnose

#### V1: Strukturell intakt, braucht kosmetische Arbeit

V1 ist im Kern rettbar. Die Fallkonstellation (Mutter mit Depression, Partner vorhanden, stationäre Aufnahme, SPF als Lösung) ist sinnvoll und zeigt einen realistischen Entscheidungsmoment. Die Probleme sind:
- Exaktes Alter (32) → durch Range ersetzen
- "Affektive Barriere" → verständlicher formulieren
- Kinder als Personen unsichtbar → einen Satz zur kindlichen Perspektive ergänzen
- Keine Ressource sichtbar → Partnerpräsenz als Ressource markieren

**Kategorie: Reformulieren.**

#### V2: Substanziell problematisch, Kern nicht kompatibel

V2 hat drei überlagerte Probleme, die einzeln reformulierbar wären, in Kombination aber den Kern der Vignette betreffen:

1. **Fachlich falsch:** "Verweigert Nahrung" ist ein Verb der Handlungsabsicht. Bei einer akuten Psychose ist die Handlungsfähigkeit eingeschränkt — das ist genau das, was die Episode definiert. Die Formulierung macht aus einem Symptom eine Willensentscheidung. Das ist nicht nur stigmatisierend, sondern **sachlich unzutreffend**.

2. **Konzeptuell inkohärent:** Herr S. ist ein handlungsunfähiges Defizit-Objekt. Kein Beziehungsaspekt, keine Ressource, keine Entwicklungsmöglichkeit. Das ist das Gegenteil von "Relational Recovery".

3. **Re-Identifikations-Risiko:** Alleinerziehender Vater + Psychose + Nahrungsverweigerung + Akutaufnahme ist eine so seltene Konstellation, dass sie in einem PUK-nahen Portal erkennbar sein könnte.

Ein "Umschreiben" müsste alle drei Probleme lösen, was faktisch eine neue Vignette ergibt. Deshalb:

**Kategorie: Entfernen und durch neue Vignette ersetzen** (bei Szenario B oder C) oder **substanziell umschreiben** (bei Szenario A, wenn keine neue Vignette möglich ist).

---

### 2.2 Dramaturgie und Framing

Die Inventur hat eine Diskrepanz zwischen Rahmentext und Vignetten-Struktur festgestellt:

| Rahmentext verspricht | Vignetten liefern |
|---|---|
| "Reflexion" | Binäre richtig/falsch-Entscheidung |
| "Gesprächsimpuls" | Einzelarbeit mit sofortigem Feedback |
| "Nicht als Prüfung" | Exakt eine korrekte Antwort mit Bewertung |
| "Fachlich und abwägend" | Klare Eskalationslogik (SPF vs. KESB) |

Zwei Optionen:

#### Option D1: Rahmentext an die tatsächliche Funktion anpassen

Der Rahmentext wird ehrlich: "Fallprüfungen zur Einschätzung von Entscheidungssituationen im Kindesschutz" statt "Reflexion und Gesprächsimpuls". Die Vignetten bleiben strukturell wie sie sind (binäre Entscheidung).

| Pro | Contra |
|---|---|
| Geringster Aufwand | Das Versprechen von Reflexion war ein gutes Versprechen |
| Ehrlich | Fallprüfungen haben einen engeren Lerneffekt als Gesprächsimpulse |

#### Option D2: Vignetten an das Versprechen anpassen

Die Vignetten werden als offene Gesprächsimpulse umgebaut: statt "richtig/falsch" werden mehrere fachlich vertretbare Optionen mit differenziertem Feedback angeboten. Keine einzige "korrekte" Antwort, sondern Abwägungen.

| Pro | Contra |
|---|---|
| Entspricht dem Relational-Recovery-Geist (Komplexität statt Vereinfachung) | Substanzieller Umbau, jede Vignette braucht 3-4 Optionen statt 2 |
| Fördert echte Reflexion | Fachlich anspruchsvoll: Optionen müssen alle vertretbar und unterscheidbar sein |

**Keine Empfehlung.** Die Dramaturgie-Entscheidung hängt von der Zielgruppe (Fachpersonen in Ausbildung vs. erfahrene Fachpersonen) und vom gewünschten Lerneffekt ab.

---

### 2.3 Massnahmen pro Vignette

#### V1: Reformulieren

| Stelle | Vorher | Nachher (Vorschlag) |
|---|---|---|
| Alter | "Frau M. (32)" | "Frau M. (Anfang 30)" |
| "affektive Barriere" | "starke affektive Barriere zu den Kindern" | "findet aktuell kaum emotionalen Zugang zu den Kindern" |
| Kinder unsichtbar | (fehlt) | Einen Satz ergänzen: z.B. "Die ältere Tochter (Schulkind) zeigt sich still und zurückhaltend." |
| Partner als Defizit | "Ihr Partner zeigt Zeichen von chronischer Erschöpfung" | "Ihr Partner ist anwesend und kooperationsbereit, zeigt aber Zeichen von Erschöpfung" |

#### V2: Entfernen oder substanziell umschreiben

**Bei Szenario A (Umschreiben):**

| Stelle | Vorher | Nachher (Vorschlag) |
|---|---|---|
| Alter | "Herr S. (40)" | "Herr S. (um die 40)" |
| "verweigert Nahrung" | "Er verweigert dem Kind seit 24 Stunden Nahrung aufgrund wahnhafter Befürchtungen" | "Das Kind hat seit dem Vortag keine regelmässige Mahlzeit erhalten. Herr S. ist aktuell nicht in der Lage, die Versorgung sicherzustellen." |
| Keine Ressource | (fehlt) | "Eine Nachbarin hat die Situation bemerkt und sich gemeldet." |
| Kind als Schutzobjekt | "dem Kind" | Alter/Geschlecht andeuten, Kind minimal als Person sichtbar machen |

**Bei Szenario B oder C (Entfernen):**
V2 ersatzlos entfernen und durch einen Stub mit klarer Markierung ersetzen: "NEUE VIGNETTE ERFORDERLICH — inhaltliche Ausarbeitung durch Auftraggeberin". Der Stub sollte die gewünschte Repräsentationslücke benennen (z.B. "ambulante Alltagssituation" oder "Sucht-Kontext").

---

### 2.4 Reformulierungs-Prinzipien

Für alle Vignetten-Texte (bestehende und künftige):

1. **Handlungs-Sprache statt Defizit-Sprache:** "findet aktuell kaum Zugang" statt "hat eine Barriere"; "ist nicht in der Lage" statt "verweigert"
2. **Diagnose als Kontext:** "eine Frau, die wegen einer depressiven Episode begleitet wird" statt "die Depressive"
3. **Kinder als Subjekte:** Mindestens ein Satz pro Vignette, der das Kind als Person sichtbar macht (Alter, Verhalten, Perspektive)
4. **Ressourcen sichtbar machen:** Auch in schwierigen Situationen mindestens eine Ressource benennen (Partner, Nachbar:in, Fachperson, eigene Kooperationsbereitschaft)
5. **Entwicklungsmöglichkeit andeuten:** Nicht durch Happy-End, sondern durch einen offenen Satz ("Die Frage ist, welcher nächste Schritt jetzt am meisten trägt.")
6. **Symptom statt Absicht:** Bei psychotischem oder dissoziativem Erleben immer das Symptom als Ursache markieren, nie die Person als Akteurin der Einschränkung

---

### 2.5 Repräsentations-Lücken-Empfehlung

**Vorbehalt:** Bei n=2 ist die Repräsentations-Matrix mathematisch unterinformativ. Aussagen über Schlagseiten sind nicht tragfähig. Die Matrix wird erst bei Szenario B oder C zum nützlichen Werkzeug.

Falls Szenario B (4 Vignetten) gewählt wird, sollten die 2 neuen Vignetten idealerweise abdecken:

| Lücke | Möglicher Fokus (Stichwort-Skizze, keine Ausarbeitung) |
|---|---|
| **Ambulante Alltagssituation** | Elternteil mit leichter-mittlerer Depression, ambulant behandelt, Alltags-Management, Schulkind, Frage: ab wann professionelle Entlastung? |
| **Sucht-Kontext oder Langzeitbegleitung** | Elternteil mit Suchterkrankung und Komorbidität, oder: Langzeitbegleitung nach stationärem Aufenthalt, Rückkehr in den Alltag |

---

### 2.6 Anonymisierungs-Standard

Vorschlag für alle bestehenden und künftigen Vignetten:

| Detail | Regel |
|---|---|
| Name | Initial-Pseudonyme (Frau M., Herr S.) -- beibehalten |
| Alter | **Alters-Range** statt exaktes Alter ("Anfang 30", "um die 40", "Mitte 20") |
| Wohnort | Nie nennen |
| Institution | Nie nennen ("wird stationär begleitet", nicht "wird in der PUK aufgenommen") |
| Diagnose | Diagnosegruppe ja, spezifische Unterdiagnose nur wenn nötig |
| Familiäre Details | Höchstens 2 identifizierende Details pro Vignette (z.B. Kinderzahl + Familienkonstellation, aber nicht + exaktes Alter + spezifische Symptombeschreibung) |
| Zeitangaben | Keine exakten Zeitangaben ("seit dem Vortag" statt "seit 24 Stunden") |

---

### 2.7 Risikoeinschätzung

**Vor Release zwingend:**

1. **V2 "verweigert Nahrung"** muss korrigiert werden — egal welches Szenario. Die Formulierung ist fachlich falsch (Agentivität statt Symptom), stigmatisierend und birgt Re-Identifikations-Risiko. Wenn V2 beibehalten wird, muss sie substanziell umgeschrieben werden. Wenn Szenario B gewählt wird, kann sie ersetzt werden.

2. **Exakte Altersangaben** in beiden Vignetten durch Ranges ersetzen.

**Empfehlenswert, aber tolerierbar:**

3. V1 "affektive Barriere" → verständlicher formulieren
4. V1 Kinder als Personen sichtbar machen
5. Dramaturgie-Diskrepanz (Rahmentext vs. Vignetten-Struktur) klären

**Strategische Entscheidung (nicht Release-blockierend, aber richtungsweisend):**

6. Szenario-Wahl (A/B/C)
7. Dramaturgie-Wahl (D1/D2)

---

### Entscheidungen der Auftraggeberin

1. **Szenario B** (vier Vignetten) — V2 kann ersetzt werden, 2 neue Stubs schliessen Repräsentationslücken
2. **V2 entfernen und durch Stub ersetzen** — "verweigert Nahrung" ist fachlich falsch, Kern inkohärent mit Relational Recovery
3. **D1 jetzt, D2 als Zielbild** — Rahmentext ehrlich anpassen, neue Stubs als Gesprächsimpulse vorsehen

---

## Phase 3 -- Umsetzung

### Arbeitsblock A: V1 Reformulierungen

| Stelle | Vorher | Nachher |
|---|---|---|
| Alter | "Frau M. (32)" | "Frau M. (Anfang 30)" |
| Schweregrad | "schweren depressiven Episode" | "depressiven Episode" |
| Affektive Barriere | "starke affektive Barriere zu den Kindern" | "findet aktuell kaum emotionalen Zugang zu den Kindern" |
| Partner | "zeigt Zeichen von chronischer Erschöpfung" | "ist anwesend und kooperationsbereit, zeigt aber Zeichen von Erschöpfung" |
| Kind sichtbar | (fehlte) | "Die ältere Tochter (Schulkind) zeigt sich still und zurückhaltend." |

### Arbeitsblock B+C: V2 entfernt + Stubs V2/V3 angelegt

V2 (Herr S., Psychose, "verweigert Nahrung") vollständig entfernt. Zwei Stubs als Kommentare in `learningContent.js` angelegt (im Frontend nicht sichtbar):

- **Stub V2:** Ambulante Alltagssituation — Repräsentationslücke "kein stationärer Akut-Moment"
- **Stub V3:** Langzeitbegleitung — Repräsentationslücke "kein binärer Entscheidungsmoment"

Beide markiert: "INHALT AUSSTEHEND", D2-Zielbild (Gesprächsimpuls), Anonymisierungs-Standard dokumentiert.

### Arbeitsblock D: Rahmentext D1

| Stelle | Vorher | Nachher |
|---|---|---|
| Hero-Lead | "Reflexion" | "Fallprüfungen zur fachlichen Einschätzung" |
| Hero-Aside | "Gesprächsimpuls, nicht als Prüfung" | "begründete Einschätzung, nicht ein Wissenstest" |
| CaseStudy | "Klinik, Familie und Entscheidungsspielraum" | "Entscheidungssituation aus Familie und Versorgungskontext" |

### Arbeitsblock E: Anonymisierungs-Standard

`qa/vignetten-anonymisierungsstandard.md` angelegt mit Pflichtregeln, Prinzip der kombinierten Verfremdung, Formulierungs-Prinzipien und D2-Zielbild.

---

## Phase 4 -- Verifikation

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | Bestanden |
| `npm run lint` | Bestanden |
| Stubs im Frontend nicht sichtbar | Ja -- als Kommentare angelegt |
| Bericht vollständig | Ja: Phase 1-4 |

### Offene Punkte (redaktionelle Tickets)

1. **Stub V2 ausarbeiten** — ambulante Alltagssituation, D2-Format (Gesprächsimpuls)
2. **Stub V3 ausarbeiten** — Langzeitbegleitung, D2-Format
3. **V1 auf D2 umbauen** — sobald V2/V3 ausgearbeitet sind, auch V1 zu offenem Gesprächsimpuls erweitern
4. **Rahmentext auf D2 aufwerten** — sobald alle Vignetten im Gesprächsimpuls-Format vorliegen
5. **"Hochrisikogruppe" in evidenceContent.js** — Panel-Titel überarbeiten (nicht in diesem Audit, gehört zu Sprach-Audit oder Evidence-Review)

---

*Audit 05 abgeschlossen.*
