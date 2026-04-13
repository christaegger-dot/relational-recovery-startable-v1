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

*Phase 1 abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und Massnahmenkatalog).*
