# Audit 02 -- Doppelzielgruppen-Audit (Eltern vs. Fachpersonen)

## Phase 1 -- Inventur

### 1.1 Template-Inventar

| Template | Section-Datei | Datenquelle(n) | Sektionen | Wörter (ca.) | Erste Überschrift | Erster Absatz |
|----------|--------------|----------------|-----------|-------------|-------------------|---------------|
| HomeLandingTemplate | (inline) | appShellContent.js (Zähler) | 1 Hero + 3 Sections | ~550 | "Begleitung ist **Beziehungsarbeit.**" | "Interaktive Fachressourcen fuer die Begleitung von Eltern mit psychischer Belastung -- mit Training, systemischer Orientierung, Krisenhilfe, Netzwerk und printfaehigen Arbeitshilfen." |
| EvidencePageTemplate | EvidenceSection.jsx | evidenceContent.js (39 Exports) | 1 Hero + 1 Kapitelübersicht + 4 Zonen + 1 Closing | ~4500 | "Einordnen, benennen und **familienorientiert handeln.**" | "Diese Seite buendelt die fachliche Logik hinter Relational Recovery: warum Elternschaft in der Erwachsenenpsychiatrie relevant ist, wie Kinder Belastung erleben und welche Gespraechs- und Unterstuetzungsformen sich fuer die Praxis besonders bewaehren." |
| GlossarPageTemplate | GlossarSection.jsx | glossaryContent.js | 1 Hero + 1 Intro + 1 Index + 3 Cluster | ~900 | "Begriffe fuer **ruhige fachliche Orientierung.**" | "Das Glossar sammelt zentrale Begriffe aus relationaler Recovery, Kindesschutz, Angehoerigenarbeit und Netzwerkpraxis in einer einheitlichen Sprache. Es soll Fachpersonen helfen, schneller zwischen Einordnung, Gespraech und Weitervermittlung zu wechseln." |
| GrundlagenPageTemplate | GrundlagenSection.jsx | grundlagenContent.js | 1 Hero + 1 Intro + 1 Index + 3 FAQ-Cluster + 1 Closing | ~1400 | "Haeufige Fragen fuer **ruhigere Orientierung im Alltag.**" | "Der Grundlagenbereich beantwortet typische Fragen von Angehoerigen und Fachpersonen in einer klaren, entlastenden Sprache. Er soll Unsicherheit reduzieren, Begriffe in Alltagssituationen uebersetzen und den Blick auf naechste Schritte oeffnen." |
| LearningPageTemplate | ElearningSection.jsx | learningContent.js | 1 Hero + 1 Flow (3 Steps) + 1 Modules (2 Module) | ~600 | "Lernen in **ruhigen Fachsequenzen.**" | "Kompakte Module fuer Gespraechsfuehrung, Sprache und Einschaetzung im Klinikalltag. Jedes Modul fuehrt von einer Leitidee zu einer einzelnen Reflexionsfrage und bleibt damit naeher an Fallarbeit als an pruefungsartigem Wissenstest." |
| NetworkPageTemplate | NetworkSection.jsx | networkContent.js | 1 Hero + 1 Directory (16 Fachstellen, Filter/Suche) + 1 Netzwerkkarte | ~1200 | "Netzwerk in **Zuerich und schweizweit lesen.**" | "Die Seite verbindet zuerich-zentrierte Krisenwege, Familienberatung, Kinder- und Jugendangebote sowie wenige schweizweite Ergaenzungen. Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander." |
| ToolboxPageTemplate | ToolboxSection.jsx | toolboxContent.js, learningContent.js | 1 Hero + Assessment + Pathway + ScoreBands + Triage + Practice + 5 Cluster + Closing | ~3500 | "Toolbox: Orientierung, Schutz und naechste Schritte **in belasteten Familiensituationen.**" | "Strukturierte Einschaetzung familiaerer Belastung als Gespraechshilfe fuer Abwaegung, Schutz und naechste Schritte -- nicht als Diagnose- oder Urteilsinstrument." |
| VignettenPageTemplate | VignettenSection.jsx | learningContent.js (VIGNETTEN) | 1 Hero + 1 CaseStudy + 1 Decision + 1 Navigation | ~500 | "Training mit **Vignetten**" | "Kurze Fallsituationen zur Reflexion zwischen Schutz, Kooperation und systemischer Entlastung. Die Darstellung bleibt bewusst fachlich und abwaegend statt dramatisch." |
| EditorialPageTemplate | (Wrapper) | (via Props) | variabel | -- | -- | -- |

**Gesamtumfang:** ca. 13'150 Wörter über 8 inhaltliche Templates.

---

### 1.2 Tonalitäts-Marker pro Template

#### HomeLandingTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | Gemischt: Sie in Section 3 ("Wenn **Sie** zuerst verstehen möchten"), sonst unpersönlich |
| **Fachbegriffe** (Top 5) | Triage, Psychoedukation, Falllogik, Parentifizierung, Schutzfaktoren |
| **Fachbegriffsdichte** | Mittel-hoch (~12 Fachbegriffe) |
| **Ich-Stellen** | 0 |
| **Empathie-Marker** | 3 ("Belastung" 2x, "Sorgen" 1x) |
| **Fachperson-Marker** | ~12 ("Triage", "Falllogik", "Template-Logik", "Rebuild", "Architektur") |

#### EvidencePageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | Unpersönlich; Du nur in zitierten Kinderbotschaften ("Du bist nicht schuld") |
| **Fachbegriffe** (Top 5) | Psychoedukation (>15x), Parentifizierung, Schutzfaktoren, Familiensystem, Anamnese |
| **Fachbegriffsdichte** | Hoch (~20 verschiedene Fachbegriffe) |
| **Ich-Stellen** | 0 (Vier-A-Modell enthält Sie-Fragen an Eltern) |
| **Empathie-Marker** | ~25 ("Belastung" >20x, "Scham" 8x, "Sorgen" 5x, "Erschöpfung" 5x) |
| **Fachperson-Marker** | ~20 ("Intervention", "Setting", "stationär", "Austrittsplanung", "klinische Praxis") |

#### GlossarPageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | Unpersönlich durchgehend |
| **Fachbegriffe** (Top 5) | Relationale Recovery, Psychoedukation, Mentalisieren, Kindeswohlgefährdung, Triage |
| **Fachbegriffsdichte** | Sehr hoch (~15 Fachbegriffe, 12 definierte Glossareinträge) |
| **Ich-Stellen** | 0 |
| **Empathie-Marker** | ~5 ("Belastung" 3x, "Scham" 1x, "Ambivalenz" 1x) |
| **Fachperson-Marker** | ~15 ("Setting", "Triage", "Versorgungssystem", "Fallbesprechungen") |

#### GrundlagenPageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | **Gemischt: Ich + Sie + unpersönlich** -- stärkste Mischung im Projekt |
| **Fachbegriffe** (Top 5) | Ambivalenz, KESB, Kindesschutz, Psychoedukation, Trialog |
| **Fachbegriffsdichte** | Niedrig-mittel (~10 Fachbegriffe, überwiegend alltagsnah erklärt) |
| **Ich-Stellen** | **6 direkte Ich-Fragen**: "Bin ich schuld daran?", "Woran merke ich, dass ich zu viel trage?", "Darf ich Grenzen setzen?", "Wie kann ich eine Grenze sagen?", "Wie finde ich Hilfe?", "Ist es normal, dass ich gleichzeitig Mitgefühl und Wut spüre?" |
| **Empathie-Marker** | ~18 ("Belastung" 8x, "Erschöpfung" 4x, "Entlastung" 5x, "Scham" 2x) |
| **Fachperson-Marker** | ~5 ("Trialog", "KESB", "Kindesschutzabklärung") |

#### LearningPageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | Unpersönlich durchgehend |
| **Fachbegriffe** (Top 5) | Fallarbeit, Affektbarriere, Scham-Regulation, Still-Face, Psychoedukation |
| **Fachbegriffsdichte** | Mittel (~8 Fachbegriffe) |
| **Ich-Stellen** | 0 |
| **Empathie-Marker** | ~3 ("Belastung" 1x, "Schuldgefühle" 1x) |
| **Fachperson-Marker** | ~8 ("Klinikalltag", "Fallarbeit", "Supervision", "didaktische Sequenz") |

#### NetworkPageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | **Gemischt: Du + unpersönlich** |
| **Du-Beispiele** | "Wer gehört zu **deiner** Kernfamilie?", "Wer hat **dir** bei Schwierigkeiten schon geholfen?", "Mit wem kannst **du** reden?" |
| **Fachbegriffe** (Top 5) | Triage, Netzwerkkarte, Versorgungslage, KESB, Weitervermittlung |
| **Fachbegriffsdichte** | Mittel (~10 Fachbegriffe) |
| **Ich-Stellen** | 0 (aber Du-Anrede in Leitfragen) |
| **Empathie-Marker** | ~8 ("Belastung" 3x, "Entlastung" 4x) |
| **Fachperson-Marker** | ~10 ("Triage" 4x, "Directory-Baustein", "Seitentyp-System") |

#### ToolboxPageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | Unpersönlich; vereinzelt Sie in Triage-Feedback |
| **Fachbegriffe** (Top 5) | Triage (>10x), Assessment (>5x), KESB, Suizidalität, Kindeswohlgefährdung |
| **Fachbegriffsdichte** | **Höchste im Projekt** (~30 Fachbegriffe) |
| **Ich-Stellen** | 0 |
| **Empathie-Marker** | ~15 ("Belastung" >10x, "Entlastung" 6x, "Scham" 3x) |
| **Fachperson-Marker** | **~30** ("Assessment", "Triage", "Gefährdungsmeldung", "Art. 314c ZGB", "Melderecht") |

#### VignettenPageTemplate

| Marker | Befund |
|--------|--------|
| **Anrede** | Sie durchgehend ("Wählen Sie die Option", "Sie können Ihre Wahl jederzeit ändern") |
| **Fachbegriffe** (Top 5) | KESB, SPF, Gefährdungsmeldung, Art. 314c ZGB, psychotische Krise |
| **Fachbegriffsdichte** | Hoch (~12 Fachbegriffe) |
| **Ich-Stellen** | 0 |
| **Empathie-Marker** | ~3 ("Belastung" 1x, "Erschöpfung" 1x) |
| **Fachperson-Marker** | ~12 ("KESB", "SPF", "Art. 314c ZGB", "Melderecht", "sorgerechtswahrend") |

---

### 1.3 Vermutete Primärzielgruppe pro Template

| Template | Primärzielgruppe | Begründung |
|----------|-----------------|------------|
| **HomeLanding** | Fachpersonen | Sprache durchgehend systemisch-fachlich ("Falllogik", "Triage"). CTA-Labels adressieren Fachhandeln. Kein Eltern-Einstieg vorhanden. |
| **Evidence** | Fachpersonen | Klinischer Kontext (Anamnese, Austrittsplanung, stationärer Rahmen). Elternperspektive wird *beschrieben*, aber nicht *an Eltern gerichtet*. |
| **Glossar** | Fachpersonen | Explizit: "Es soll **Fachpersonen** helfen". Rein fachsprachlich, keine Alltagssprache. |
| **Grundlagen** | **Angehörige/Eltern** | Einziges Template mit Ich-Perspektive ("Bin ich schuld?"). FAQ-Fragen simulieren Angehörigen-Erleben. Antworten sind alltagsnah und empathisch. |
| **Learning** | Fachpersonen | "Klinikalltag", "Supervision", "Fallarbeit" -- eindeutiges Fachvokabular. Module sind pädagogische Fachkonzepte. |
| **Network** | **Gemischt** | Fachstellenverzeichnis adressiert Fachpersonen (Triage, Filter). Netzwerkkarten-Leitfragen adressieren Betroffene direkt (Du-Form). |
| **Toolbox** | Fachpersonen | Fachsprachlich dichtestes Template. "Assessment", "Triage", "Gefährdungsmeldung", "Art. 314c ZGB" sind reines Fachvokabular. |
| **Vignetten** | Fachpersonen | Juristische Referenzen (Art. 314c ZGB), institutionelle Abkürzungen (KESB, SPF). Für Eltern unverständlich. |

**Zusammenfassung:** 6 von 8 Templates adressieren primär Fachpersonen. 1 Template (Grundlagen) adressiert primär Angehörige/Eltern. 1 Template (Network) ist gemischt.

---

### 1.4 Einstiegspunkte-Inventar

**Direkt via Header-Navigation erreichbar (8 Tabs):**

| Tab | Template | Primärzielgruppe |
|-----|----------|-----------------|
| Start | HomeLanding | Fachpersonen |
| Lernmodule | Learning | Fachpersonen |
| Training | Vignetten | Fachpersonen |
| Glossar | Glossar | Fachpersonen |
| Grundlagen | Grundlagen | Angehörige/Eltern |
| Evidenz | Evidence | Fachpersonen |
| Toolbox | Toolbox | Fachpersonen |
| Netzwerk | Network | Gemischt |

**Nur über interne Verlinkungen erreichbar:**
- EditorialPageTemplate (Wrapper, kein eigenständiger Tab)

**Expliziter Zielgruppen-Hinweis auf der Startseite ("Sie sind Fachperson?" / "Sie sind betroffen?"): NEIN.** Kein solcher Prompt existiert im Code.

---

### 1.5 Tonalitäts-Brüche innerhalb von Templates

#### Starke Brüche

**GrundlagenPageTemplate -- stärkster Bruch im Projekt**
- **FAQ-Fragen und -Antworten** (Cluster 1-3): Warm, alltagsnah, Ich-Perspektive ("Bin ich schuld?"), empathisch, leicht verständlich. Klingt wie für betroffene Angehörige geschrieben.
- **Intro-Section und Closing-Section**: Fachsprachlich-architektonisch ("Die neue Glossar-Seite führt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein", "Passende Anschlussräume für Vertiefung und Weitervermittlung").
- **Bewertung:** Die FAQ-Inhalte und der Rahmentext wirken, als wären sie für zwei verschiedene Publikationen geschrieben worden.

**NetworkPageTemplate -- deutlicher Bruch**
- **Netzwerkkarten-Leitfragen**: Du-Anrede, warm, kindnah ("Wer gehört zu deiner Kernfamilie?", "Mit wem kannst du reden?")
- **Sektionsbeschreibungen**: Meta-architektonisch ("Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander")

#### Leichte Brüche

**HomeLandingTemplate**
- Sections 1-2: Meta-architektonische Sprache ("Das Seitentemplate übersetzt diese Logik", "Rebuild-Nutzen")
- Section 3: Wechsel zur Sie-Anrede, zugänglicher

**LearningPageTemplate**
- Modul-Inhalte: Klar und praxisnah
- Sektionsbeschreibungen: "Die neue Seitenstruktur übersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur"

**ToolboxPageTemplate**
- Assessment/Triage: Kühl-klinisch
- Cluster "Akute Krise": Dringlicher Ton
- Cluster "Rolle und Rechte": Alltagsnäher, FAQ-Format

#### Keine Brüche
- **Glossar**: Durchgehend gleichmässig fachlich-sachlich
- **Vignetten**: Durchgehend fachlich-sachlich, Sie-Anrede konsistent
- **Evidence**: Leichter Wechsel zwischen Evidenzton (Kap. 1) und Empathieton (Kap. 2-3), aber inhaltlich nachvollziehbar

---

### Übergreifende Befunde

#### 1. Meta-architektonische Sprache als Fremdkörper

In mindestens 5 Templates enthalten die Sektionsbeschreibungen Sätze, die wie interne Entwicklerdokumentation klingen und weder für Eltern noch für Fachpersonen sinnvoll sind:

| Template | Beispiel |
|----------|---------|
| HomeLanding | "Das Seitentemplate übersetzt diese Logik in wiederverwendbare, editoriale Bausteine." |
| HomeLanding | "Wenn Einstiege bereits im Template modelliert sind, muss die Orientierung nicht später über Sondermodule nachgerüstet werden." |
| Learning | "Die neue Seitenstruktur übersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur." |
| Learning | "Der Modulbereich trennt wiederkehrende Struktur von konkreten Inhalten." |
| Network | "Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander." |
| Grundlagen | "Die neue Glossar-Seite führt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein." |
| Toolbox | "Die Toolbox führt nicht linear durch Textblöcke, sondern über eine klare klinische Reihenfolge." |

Diese Texte sind vermutlich Überbleibsel aus Entwicklungsphasen und sollten durch endnutzerorientierte Beschreibungen ersetzt werden.

#### 2. Anrede-Inkonsistenz über das Gesamtprojekt

| Anrede | Wo verwendet |
|--------|-------------|
| **Du** | Netzwerk-Leitfragen, Kinder-Botschaften in Evidenz |
| **Sie** | Grundlagen-FAQ-Antworten, Vignetten, HomeLanding Section 3 |
| **Ich** | Grundlagen-FAQ-Fragen |
| **Unpersönlich** | Alle übrigen Stellen (Mehrheit) |

Es gibt keine projektweite Entscheidung über die Anredeform.

#### 3. Grundlagen als einziges wirklich elternnahes Template

Nur `grundlagenContent.js` schreibt aus der Ich-Perspektive Betroffener. Alle anderen Templates adressieren Fachpersonen oder bleiben unpersönlich. Dies erzeugt einen isolierten "warmen Fleck" im Projekt, ohne dass er von der Navigation oder der Startseite her als solcher erkennbar wäre.

#### 4. Mengenarchitektur

| Aspekt | Wert |
|--------|------|
| Grösste Datenmenge | evidenceContent.js (~4500 W) |
| Umfangreichstes Template | Toolbox (12+ Sektionen) |
| Kleinstes Template | Vignetten (4 Sektionen) |
| Lernmodule | 2 |
| Vignetten | 2 |
| Fachstellen | 16 |
| Glossarbegriffe | 12 |

---

### Findings für andere Audits

Die folgenden Beobachtungen gehören nicht in diesen Audit, werden aber für spätere Audits notiert:

1. **KESB-Formulierungen (Audit 03):** Die Toolbox und Vignetten enthalten juristische Referenzen (Art. 314c ZGB, Melderecht, Gefährdungsmeldung), die auf korrekte und aktuelle Formulierung geprüft werden sollten. Grundlagen-FAQ Cluster 3 enthält KESB-bezogene Fragen ("Wann darf die KESB eingreifen?"), die sensibel formuliert sein müssen.

2. **Sprach-Audit (Audit 05):** Die meta-architektonischen Texte (s. Abschnitt "Übergreifende Befunde") müssen im Sprach-Audit als Priorität behandelt werden. Ebenso die Anrede-Inkonsistenz.

3. **Routing-Audit:** Die flache Navigation (alle 8 Tabs gleichwertig nebeneinander) spiegelt die Zielgruppen-Mischung wider. Eine eventuelle Zielgruppen-Trennung hätte direkte Auswirkungen auf die Navigationsarchitektur.

---

*Phase 1 abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und Optionen).*
