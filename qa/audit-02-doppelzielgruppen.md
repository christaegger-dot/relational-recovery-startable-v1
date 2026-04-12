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

## Phase 1b -- Inventur-Nachtrag: Endnutzer- vs. Meta-Text

### 1b.1 Klassifizierung pro Template

| # | Seite (Template) | Kategorie | Anteil E/M | Wörter gesamt | Wörter Endnutzer | Wörter Meta |
|---|---|---|---|---|---|---|
| 1 | **HomeLanding** | gemischt | 55/45 | ~450 | ~250 | ~200 |
| 2 | **Lernmodule** | gemischt | 40/60 | ~550 | ~220 | ~330 |
| 3 | **Vignetten** | endnutzer | 90/10 | ~500 | ~450 | ~50 |
| 4 | **Glossar** | gemischt | 75/25 | ~950 | ~710 | ~240 |
| 5 | **Grundlagen** | endnutzer | 95/5 | ~1800 | ~1710 | ~90 |
| 6 | **Evidenz** | endnutzer | 90/10 | ~4500 | ~4050 | ~450 |
| 7 | **Toolbox** | endnutzer | 85/15 | ~3200 | ~2720 | ~480 |
| 8 | **Netzwerk** | gemischt | 60/40 | ~1400 | ~840 | ~560 |
| 9 | **AppShell** | endnutzer | 95/5 | ~80 | ~76 | ~4 |

#### Detailbelege

**HomeLandingTemplate (gemischt 55/45)**

| Feld | Kat. | Beispiel (max 15 W.) | Quelle |
|---|---|---|---|
| hero.lead | endnutzer | "Interaktive Fachressourcen fuer die Begleitung von Eltern..." | HomeLandingTemplate.jsx |
| sections[0].description | meta | "Das Seitentemplate uebersetzt diese Logik in wiederverwendbare, editoriale Bausteine." | HomeLandingTemplate.jsx |
| sections[1].title | meta | "Die Startseite wird zur operativen Schaltflaeche des neuen Systems." | HomeLandingTemplate.jsx |
| sections[1].aside.label | meta | "Rebuild-Nutzen" | HomeLandingTemplate.jsx |
| sections[2].cards[0].copy | endnutzer | "Geeignet, wenn Familiendynamik, kindliche Perspektive... eingeordnet werden sollen." | HomeLandingTemplate.jsx |

**Lernmodule / ElearningSection (gemischt 40/60) -- stärkster Meta-Anteil**

| Feld | Kat. | Beispiel | Quelle |
|---|---|---|---|
| sequence.description | meta | "Die neue Seitenstruktur uebersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur." | ElearningSection.jsx |
| modulesSection.description | meta | "Der Modulbereich trennt wiederkehrende Struktur von konkreten Inhalten." | ElearningSection.jsx |
| E_MODULES[0].storyboard | endnutzer | "Emotionale Barrieren als biologische Stressreaktion validieren..." | learningContent.js |
| E_MODULES[1].quiz | endnutzer | "Warum koennen Metaphern hilfreich sein?" | learningContent.js |

**Glossar (gemischt 75/25)**

| Feld | Kat. | Beispiel | Quelle |
|---|---|---|---|
| GLOSSARY_INTRO.description | meta | "Die neue Glossar-Seite fuehrt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein." | glossaryContent.js |
| GLOSSARY_GROUPS[0].terms[0].definition | endnutzer | "Ein Arbeitsverstaendnis, das Erholung nicht nur als individuelle Symptomveraenderung versteht..." | glossaryContent.js |

**Netzwerk (gemischt 60/40)**

| Feld | Kat. | Beispiel | Quelle |
|---|---|---|---|
| hero.lead | meta | "Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander." | NetworkSection.jsx |
| directory.intro.paragraphs[1] | meta | "Die neue Seitenarchitektur loest das bisher monolithische Layout in einen wiederverwendbaren Directory-Baustein auf." | NetworkSection.jsx |
| RESOURCE_DATA[*] | endnutzer | 16 Fachstellen mit Beschreibungen und Links | networkContent.js |
| NETWORK_MAP_QUESTIONS | endnutzer | "Wer gehoert zu deiner Kernfamilie?" | networkContent.js |

**Grundlagen (endnutzer 95/5)**

| Feld | Kat. | Beispiel | Quelle |
|---|---|---|---|
| GRUNDLAGEN_INTRO.eyebrow | meta | "Arbeitslogik" | grundlagenContent.js |
| FAQ Cluster 1-3 (alle) | endnutzer | "Bin ich schuld daran, dass es der anderen Person schlechter geht?" | grundlagenContent.js |

**Evidenz (endnutzer 90/10)**

| Feld | Kat. | Beispiel | Quelle |
|---|---|---|---|
| INTERVENTION_PROGRAM_POINTS[2] | meta-Anflug | "Fuer die Website reicht eine kompakte Einordnung..." | evidenceContent.js |
| Alle 35+ Daten-Exports | endnutzer | Durchgehend fachlich hochwertig | evidenceContent.js |

**Toolbox (endnutzer 85/15)**

| Feld | Kat. | Beispiel | Quelle |
|---|---|---|---|
| pathway.description | meta | "Die Toolbox fuehrt nicht linear durch Textbloecke, sondern ueber eine klare klinische Reihenfolge..." | ToolboxSection.jsx |
| ACUTE_CRISIS_STEPS[0] | endnutzer | "Suizidgedanken oder akute Gefaehrdung ruhig und direkt ansprechen." | toolboxContent.js |

---

### 1b.2 Aggregierte Sicht

| Kategorie | Anzahl Templates | Geschätzte Wörter | Anteil am Gesamttext |
|---|---|---|---|
| **Reine Endnutzer-Templates** (>85%) | 5 (Grundlagen, Evidenz, Toolbox, Vignetten, AppShell) | ~10'006 | ~75% |
| **Gemischte Templates** (25-60% Meta) | 4 (HomeLanding, Lernmodule, Glossar, Netzwerk) | ~3'350 | ~25% |
| **Reine Meta-Templates** (>70% Meta) | 0 | -- | -- |

| Textkategorie | Geschätzte Wörter | Anteil |
|---|---|---|
| **Endnutzer-Text** | ~11'026 | ~82% |
| **Meta-Text** | ~2'404 | ~18% |
| **Gesamt** | ~13'430 | 100% |

**Kein Template ist zu 100% Meta-Text.** Selbst die Lernmodule-Seite (schwerster Fall, 60% Meta) enthält wertvolle endnutzer-taugliche Modulinhalte. Das Problem ist nicht, dass Templates leer sind, sondern dass ihre **Rahmentexte** (Hero-Leads, Section-Descriptions, Eyebrows, Aside-Copies) über die Seite selbst statt über den Inhalt sprechen.

---

### 1b.3 Systematisches Verzeichnis der Meta-Text-Stellen

Die folgenden 14 konkreten Textstellen sind Meta-Sprache ohne Endnutzer-Informationswert:

| # | Textstelle (gekürzt) | Quelle | Marker-Typ |
|---|---|---|---|
| M1 | "Das Seitentemplate uebersetzt diese Logik in wiederverwendbare, editoriale Bausteine." | HomeLanding sections[0].description | Template-Beschreibung |
| M2 | "Die Startseite wird zur operativen Schaltflaeche des neuen Systems." | HomeLanding sections[1].title | Rebuild-Sprache |
| M3 | "...fuehrt die Landingpage jetzt gezielt in jene Seitentypen, die bereits im Rebuild tragfaehig angelegt sind." | HomeLanding sections[1].description | Rebuild-Sprache |
| M4 | "Rebuild-Nutzen" | HomeLanding sections[1].aside.label | Meta-Label |
| M5 | "Wenn Einstiege bereits im Template modelliert sind..." | HomeLanding sections[1].aside.copy | Template-Beschreibung |
| M6 | "Die Startseite markiert jetzt auch fachliche Rollen klarer." | HomeLanding sections[2].title | Meta-Beschreibung |
| M7 | "Die neue Seitenstruktur uebersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur." | ElearningSection sequence.description | Architektur-Beschreibung |
| M8 | "Die Inhalte sind jetzt als eigener Seitentyp organisiert." | ElearningSection modulesSection.title | Seitentyp-Beschreibung |
| M9 | "Der Modulbereich trennt wiederkehrende Struktur von konkreten Inhalten..." | ElearningSection modulesSection.description | Architektur-Beschreibung |
| M10 | "Die neue Glossar-Seite fuehrt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein." | glossaryContent.js GLOSSARY_INTRO.description | Seitentyp-Architektur |
| M11 | "Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander." | NetworkSection hero.lead | Seitentyp-System |
| M12 | "Die neue Seitenarchitektur loest das bisher monolithische Layout in einen wiederverwendbaren Directory-Baustein auf." | NetworkSection directory.intro.paragraphs[1] | Architektur-Beschreibung |
| M13 | "Didaktische Logik" (Eyebrow) | ElearningSection sequence.eyebrow | Meta-Jargon als Label |
| M14 | "Arbeitslogik" (Eyebrow, 4x verwendet) | GLOSSARY_INTRO, GRUNDLAGEN_INTRO, HomeLanding, ToolboxSection | Pattern: Meta-Label |

---

### 1b.4 Findings für andere Audits

#### Audit 03 (KESB/Kindesschutz)

| Stelle | Befund | Quelle |
|---|---|---|
| "Proaktive Gefaehrdungsmeldung (KESB)" als Antwortoption | "Proaktiv" koennte als empfohlenes Vorgehen missverstanden werden; Vignettenlogik stuft es als "verfruehtes" Vorgehen ein | learningContent.js, VIGNETTEN[0].options[0] |
| "Gefaehrdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)" | Korrekte Rechtsreferenz | learningContent.js, VIGNETTEN[1].options[0] |
| "Eine besorgte Person muss eine Gefaehrdung nicht beweisen." | Fachlich korrekt, steht aber isoliert und koennte als Aufforderung zu Meldungen gelesen werden | toolboxContent.js, CHILD_PROTECTION_THRESHOLDS[2] |
| "Aengste vor KESB, Bewertung oder Sorgerechtsverlust ansprechbar machen" | "Sorgerechtsverlust" ist emotional geladen und kann stigmatisierend wirken | evidenceContent.js, HELP_BARRIER_PRACTICE_POINTS[0] |

#### Audit 05 (Vignetten)

| Stelle | Befund | Quelle |
|---|---|---|
| "Herr S. (40)...verweigert dem Kind seit 24 Stunden Nahrung aufgrund wahnhafter Befuerchtungen" | "Verweigert" impliziert Intention (Agentivität), nicht Symptomfolge. Besser: "Das Kind hat seit 24 Stunden keine Nahrung erhalten" | learningContent.js, VIGNETTEN[1].description |
| "Kinder als Hochrisikogruppe" (Panel-Titel) | Epidemiologisch korrekt, als Überschrift potenziell stigmatisierend | evidenceContent.js, CHILD_EXPERIENCE_PANELS[0].title |

#### Audit 06 (Sprache)

| Stelle | Befund | Quelle |
|---|---|---|
| "Aeussere Ebene" mit grossem Ae | Inkonsistent mit Schweizer ss-Schreibung (korrekt wäre "Äussere" oder "äussere") | NetworkPageTemplate.jsx |
| "nicht paternalistisch" in Hero-Stats | Gutes Signal, aber Formulierung selbst leicht paternalistisch im Ton | grundlagenContent.js, GRUNDLAGEN_HERO.stats |
| Meta-Texte M1-M14 | Müssen im Sprach-Audit als erste Priorität behandelt werden | Siehe Verzeichnis oben |

---

## Phase 2 -- Diagnose und Optionen

### 2.1 Gesamtbild

#### Substanz vs. Rahmen

82% des Textvolumens (~11'000 Wörter) sind substanzieller Endnutzer-Text. Die ursprünglich erwogene **Option D** ("Erst Substanz, dann Architektur") entfällt damit -- die Inhalte sind vorhanden, das Problem liegt nicht in fehlender Substanz, sondern in den Rahmentexten.

#### Wo sitzt das Problem?

Die 18% Meta-Text (~2'400 Wörter) verteilen sich nicht gleichmässig. Sie konzentrieren sich auf **Rahmentexte** -- also genau die Stellen, die Nutzer:innen als erstes lesen: Hero-Leads, Section-Descriptions, Eyebrows, Aside-Copies. Die eigentlichen Fach- und Praxisinhalte darunter sind fast durchgehend hochwertig.

#### Korrelation Tonbrüche ↔ Meta-Text

**Ja, die Korrelation ist stark.** Die beiden Templates mit den stärksten Tonbrüchen (Grundlagen, Netzwerk) sind genau die, bei denen warmer Endnutzer-Content in Meta-Rahmentexten steckt. Bei Grundlagen: warme Ich-FAQs eingerahmt von "Die neue Glossar-Seite führt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein". Bei Netzwerk: Du-Leitfragen eingerahmt von "Das neue Seitentyp-System trennt Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander".

Die Tonbrüche sind also kein Zielgruppen-Problem, sondern ein **Rahmentext-Problem**. Sobald die Meta-Texte durch endnutzerorientierte Texte ersetzt werden, verschwinden die meisten Tonbrüche.

#### Erkennbares Muster

| Bereich | Ton | Zielgruppe | Qualität |
|---|---|---|---|
| Toolbox, Vignetten, Evidence | Fachlich-klinisch, konsistent | Fachpersonen | Hoch |
| Grundlagen FAQ-Inhalte | Warm, empathisch, Ich-Perspektive | Angehörige/Eltern | Hoch |
| Netzwerk Fachstellen + Karte | Sachlich + warm (Leitfragen) | Gemischt | Hoch |
| **Rahmentexte überall** | Meta-architektonisch | Niemand | **Fremdkörper** |

---

### 2.2 Drei Architektur-Optionen

---

#### Option A -- Bewusste Mischform

**Beschreibung:** Eine gemeinsame Seite für alle Nutzer:innen. Pro Template wird eine Primärzielgruppe deklariert und dezent sichtbar gemacht (z.B. ein "Für wen?"-Badge). Tonalität wird pro Template vereinheitlicht, aber unterschiedlich: Fachsprache in der Toolbox, Alltagssprache in Grundlagen. Die Startseite bleibt ein gemeinsamer Einstieg.

**Startseite bei Option A:** Die Startseite behält eine gemeinsame Ansprache, aber die Section "Vertrauen und Orientierung" (Section 3) wird zum Zielgruppen-Wegweiser ausgebaut: "Wenn Sie als Fachperson priorisieren müssen → Toolbox" / "Wenn Sie als Angehörige:r Orientierung suchen → Grundlagen".

**Vorteile:**
- Geringster struktureller Eingriff
- Nutzt die bestehende Stärke: die meisten Inhalte sind bereits zielgruppenspezifisch geschrieben
- Kein Routing-Umbau nötig
- Angehörige und Fachpersonen sehen das gesamte Angebot

**Nachteile:**
- Angehörige landen weiterhin auf einer überwiegend fachsprachlichen Seite
- "Badges" lösen das Orientierungsproblem nicht wirklich -- Nutzer:innen müssen trotzdem alle Tabs durchgehen
- Die Grundlagen-FAQ steht isoliert als einziges wirklich elternnahes Angebot

**Aufwand:** S-M

**Hot-Spot-Bewertung Option A:**

| Template | Konkreter Eingriff | Schreibaufwand | Struktureller Eingriff |
|---|---|---|---|
| **HomeLanding** | Meta-Texte in Sections 1-2 durch endnutzerorientierte Beschreibungen ersetzen. Section 3 zum Zielgruppen-Wegweiser ausbauen. | ~200 Wörter neu | Gering (nur Textfelder) |
| **Lernmodule** | `sequence.description` und `modulesSection` Meta-Texte ersetzen. Badge "Für Fachpersonen" ergänzen. | ~150 Wörter neu | Gering (nur Textfelder + 1 Metadatum) |
| **Netzwerk** | Hero-Lead und Directory-Intro-Absatz 2 ersetzen. Badge "Für alle" ergänzen. | ~100 Wörter neu | Gering |
| **Glossar** | GLOSSARY_INTRO.description ersetzen. Badge "Für Fachpersonen" ergänzen. | ~50 Wörter neu | Minimal |

---

#### Option B -- Geteilte Einstiege, geteilte Pfade

**Beschreibung:** Die Startseite erhält zwei klare Einstiege ("Ich begleite Familien als Fachperson" / "Ich bin selbst betroffen oder angehörig"). Dahinter teilweise dieselben Inhalte, aber mit unterschiedlichen Einstiegstexten, Navigation-Highlighting oder Akzentuierungen. Die Navigation zeigt ggf. nur die für die gewählte Rolle relevanten Tabs oder hebt sie hervor.

**Startseite bei Option B:** Die Startseite wird zum Entscheidungspunkt mit zwei gleich prominenten Kacheln: "Fachpersonen → Toolbox, Evidenz, Vignetten, Lernmodule" und "Betroffene & Angehörige → Grundlagen, Netzwerk, Glossar" -- jeweils mit einer kurzen, warmen Einleitung.

**Vorteile:**
- Klarste Orientierung für beide Zielgruppen
- Angehörige werden nicht mit Fachsprache konfrontiert, bevor sie Orientierung finden
- Ermöglicht unterschiedliche Tonalität pro Pfad

**Nachteile:**
- Höchster Implementierungsaufwand (Navigation, State, ggf. URL-Routing)
- Erzwingt eine Entscheidung, die manche Nutzer:innen nicht treffen wollen oder können (Fachpersonen, die selbst betroffen sind; Angehörige mit Fachwissen)
- Grundlagen, Netzwerk und Glossar müssten als "Angehörigen-Templates" neu gerahmt werden, obwohl sie auch Fachpersonen nutzen
- Doppelter Schreibaufwand für Meta-Text-Templates: jede Variante braucht eigene Rahmentexte
- Blockiert bis Routing-Audit abgeschlossen ist

**Aufwand:** L

**Hot-Spot-Bewertung Option B:**

| Template | Konkreter Eingriff | Schreibaufwand | Struktureller Eingriff |
|---|---|---|---|
| **HomeLanding** | Komplett neu: zwei Einstiegskacheln statt drei Content-Sections. Gesamte inline-Daten umschreiben. | ~400 Wörter neu | Hoch (JSX-Struktur, Navigation-State) |
| **Lernmodule** | Meta-Texte ersetzen + eigene Intro-Variante für Angehörigen-Pfad falls über Grundlagen verlinkt. | ~200 Wörter neu | Mittel (bedingter Rahmentext) |
| **Netzwerk** | Hero/Intro in zwei Varianten: Fachperson ("Triage und Versorgungslage") vs. Angehörige ("Wer kann helfen?"). | ~200 Wörter neu | Mittel (Pfad-abhängiger Rahmentext) |
| **Glossar** | Intro-Variante für Angehörige ("Begriffe, die Ihnen begegnen könnten"). | ~100 Wörter neu | Mittel |

---

#### Option C -- Fokussierung auf eine Primärzielgruppe

**Beschreibung:** Die Seite entscheidet sich für **Fachpersonen** als Hauptzielgruppe (entspricht dem Ist-Zustand bei 6/8 Templates). Grundlagen und Netzwerk werden entweder auf Fachpersonen-Ton umgeschrieben oder als "Materialien für die Arbeit mit Angehörigen" gerahmt ("Diesen Text können Sie Angehörigen zeigen" / "Diese Leitfragen können Sie im Gespräch nutzen"). Angehörige sind eingeladen, die Seite zu nutzen, aber sie wird nicht für sie optimiert.

**Startseite bei Option C:** Die Startseite adressiert Fachpersonen direkt: "Dieses Portal unterstützt Sie bei der Begleitung von Familien mit psychischer Belastung" -- mit einem sekundären Hinweis: "Für betroffene Angehörige: Die Grundlagen- und Netzwerkseite enthält auch direkt nutzbare Orientierung."

**Vorteile:**
- Konsistenteste Tonalität über alle Templates
- Geringster Schreibaufwand bei Grundlagen und Netzwerk (Rahmentext umformulieren statt Inhalt neu schreiben)
- Die bestehenden Ich-FAQs in Grundlagen können als "Gesprächshilfe für die Arbeit mit Angehörigen" gerahmt werden -- der Inhalt bleibt, nur die Rahmung ändert sich
- Klare Identität: "Schweizer Fachportal" wird eingelöst
- Meta-Tags und Hero stimmen bereits mit dieser Option überein

**Nachteile:**
- Angehörige, die eigenständig auf die Seite kommen, fühlen sich möglicherweise nicht angesprochen
- Die warmen Grundlagen-FAQs verlieren durch die Fachpersonen-Rahmung etwas von ihrer direkten Ansprache
- Die Du-Leitfragen in der Netzwerkkarte müssten auf Sie umgestellt oder als "Übung für das Gespräch" gerahmt werden
- Mission der PUK-Angehörigenarbeit wird verengt, wenn Angehörige nur "mitgemeint" statt direkt adressiert werden

**Aufwand:** S

**Hot-Spot-Bewertung Option C:**

| Template | Konkreter Eingriff | Schreibaufwand | Struktureller Eingriff |
|---|---|---|---|
| **HomeLanding** | Meta-Texte durch Fachpersonen-adressierte Texte ersetzen. Section 3 "Vertrauen" leicht umformulieren. | ~200 Wörter neu | Gering (nur Textfelder) |
| **Lernmodule** | Meta-Texte ersetzen. Kein Zielgruppen-Konflikt (ist bereits Fachpersonen-orientiert). | ~150 Wörter neu | Minimal |
| **Netzwerk** | Hero/Intro ersetzen. Du-Leitfragen als "Übung für das Gespräch mit Angehörigen" rahmen. | ~120 Wörter neu | Gering (Rahmentext + 1 Satz Kontextualisierung) |
| **Glossar** | GLOSSARY_INTRO.description ersetzen. Kein Konflikt. | ~50 Wörter neu | Minimal |

---

### 2.2.1 HomeLanding als Sonderfall

Die Startseite ist der Ort, an dem die Optionen-Wahl am sichtbarsten wird. Bei 45% Meta-Anteil und fehlendem Zielgruppen-Routing ist sie gleichzeitig die grösste Baustelle und die grösste Chance.

| Option | Wie die neue Startseite aussieht |
|---|---|
| **A** | Gemeinsamer Einstieg mit klarer Arbeitslogik ("Verstehen → Einschätzen → Handeln → Vernetzen") und einem expliziten Wegweiser-Block: "Wenn Sie als Fachperson..." / "Wenn Sie als Angehörige:r..." |
| **B** | Zwei gleichwertige Einstiegskacheln ("Ich begleite Familien" / "Ich bin betroffen"), die in unterschiedliche Navigationspfade führen -- die heutigen drei Content-Sections entfallen komplett. |
| **C** | Klare Fachpersonen-Adresse: "Dieses Portal unterstützt Sie bei der Begleitung von Familien mit psychischer Belastung" -- mit einem sekundären, warmen Hinweis für Angehörige, die eigenständig hier gelandet sind. |

---

### 2.3 Empfehlung

**Empfohlene Option: A -- Bewusste Mischform.**

Begründung entlang der vier Bewertungsachsen:

**1. Aufwand vs. Nutzen:**
Option A erfordert ~500 Wörter neue Rahmentexte und minimale strukturelle Eingriffe. Option C wäre noch schlanker (~520 Wörter), verengt aber die Reichweite. Option B erfordert das Drei- bis Vierfache an Aufwand und blockiert bis zum Routing-Audit.

**2. Entlastung der Folge-Audits:**
Option A schafft pro Template eine deklarierte Primärzielgruppe, an der sich Sprach-Audit (06) und Visual-Audit (08) orientieren können. Weder Routing noch Komponentenstruktur müssen vorher geändert werden. Alle Folge-Audits können sofort starten.

**3. Risiko einer nicht tragfähigen Architektur:**
Option A ist die flexibelste: Wenn sich nach Audit 06 (Sprache) herausstellt, dass die Mischform nicht funktioniert, kann immer noch auf C (Fokussierung) oder B (geteilte Pfade) gewechselt werden. Option C oder B vorab festzulegen wäre eine schwerere Festlegung mit weniger Datenbasis.

**4. Kohärenz mit der Mission:**
Die Fachstelle Angehörigenarbeit der PUK adressiert sowohl Fachpersonen als auch Betroffene/Angehörige. Option A bildet diese Doppelfunktion am ehrlichsten ab. Option C würde die Angehörigen-Reichweite einschränken, Option B würde sie überbetonen (nur 1 von 8 Templates adressiert heute primär Angehörige).

**Zusammengefasst:** Option A ist die ehrlichste Abbildung des Ist-Zustands, erfordert den geringsten Eingriff bei maximalem Klärungsgewinn, und hält alle Türen offen für spätere Vertiefung.

---

### 2.4 Implikationen für Folge-Audits

| Folge-Audit | Implikation bei Option A |
|---|---|
| **03 KESB/Kindesschutz** | Unabhängig von der Zielgruppen-Option. Die KESB-Formulierungen müssen für Fachpersonen korrekt und für Angehörige nicht angstauslösend sein -- das ist bei der Mischform sogar wichtiger als bei reiner Fokussierung. Kann sofort starten. |
| **04 Evidence** | Evidence ist bereits konsistent fachpersonen-orientiert (90% endnutzer). Kein Zielgruppen-Konflikt. Kann sofort starten. |
| **05 Vignetten** | Vignetten sind konsistent fachpersonen-orientiert. Die Stigma-Befunde (Phase 1b) sind zielgruppenunabhängig. Kann sofort starten. |
| **06 Sprache** | Profitiert am stärksten von Option A: Mit deklarierten Primärzielgruppen pro Template kann das Sprach-Audit Anrede, Fachbegriffsdichte und Ton gezielt pro Template harmonisieren statt projektweite Einheitlichkeit zu erzwingen. Meta-Texte M1-M14 werden als erste Priorität behandelt. |
| **07 Glossar** | Der Glossar ist bereits konsistent fachsprachlich. Die Intro-Description (M10) wird im Sprach-Audit ersetzt. Kein Zielgruppen-Konflikt. |
| **08 Visual** | Bei Option A: visuelle Differenzierung pro Zielgruppe möglich aber nicht zwingend (z.B. wärmere Farbtöne für Grundlagen, kühlere für Toolbox). Die Entscheidung darüber fällt im Visual-Audit. |
| **10 Routing** | Option A erfordert kein Routing-Redesign. Die flache Tab-Navigation bleibt. Falls später auf Option B gewechselt wird, wird das Routing-Audit relevanter. |

---

### 2.5 Anrede-Vorschlag (Diskussionsgrundlage)

#### Empfehlung: Sie als Standard, Ich in Eltern-/Angehörigen-Perspektivtexten

| Kontext | Anrede | Begründung |
|---|---|---|
| **Fachpersonen-Templates** (Toolbox, Evidenz, Vignetten, Learning, Glossar) | **Sie** | Respektvoll-professionell, passt zum "Schweizer Fachportal"-Anspruch. Bereits in Vignetten durchgehend verwendet. |
| **Angehörigen-Template** (Grundlagen FAQ-Fragen) | **Ich** | Simuliert die Innenperspektive Betroffener. Ist die grösste Stärke der Grundlagen-FAQs und sollte erhalten bleiben. |
| **Angehörigen-Template** (Grundlagen FAQ-Antworten) | **Sie** | Wechsel auf Du wäre inkonsistent mit dem Rest der Seite. Sie hält professionelle Wärme ohne Anbiederung. |
| **Netzwerk-Leitfragen** | **Sie** statt Du | Die Du-Form in den Netzwerkkarten-Leitfragen bricht mit dem Rest der Seite. Vorschlag: "Wer gehört zu Ihrer Kernfamilie?" statt "Wer gehört zu deiner Kernfamilie?". Alternativ: Du beibehalten und als "Übung für das Gespräch mit Kindern/Jugendlichen" rahmen. |
| **Kinder-Botschaften** (Evidenz, Psychoedukation) | **Du** | "Du bist nicht schuld" ist ein direktes Zitat an Kinder. Muss Du bleiben. |

#### Beispiele

| Heute | Vorschlag |
|---|---|
| "Wer gehört zu **deiner** Kernfamilie?" | "Wer gehört zu **Ihrer** Kernfamilie?" |
| "Bin **ich** schuld daran?" (FAQ-Frage) | Bleibt: "Bin **ich** schuld daran?" |
| "Was **Sie** beobachten..." (FAQ-Antwort) | Bleibt: "Was **Sie** beobachten..." |
| "**Du** bist nicht schuld." (Kinderbotschaft) | Bleibt: "**Du** bist nicht schuld." |
| Unpersönlich: "Die Inhalte sind als Abfolge gedacht" | → "**Sie** finden hier eine fachliche Abfolge: verstehen, einschätzen, handeln, vernetzen." |

Dieser Vorschlag wird im Sprach-Audit (06) verbindlich gemacht oder verworfen. Er dient hier nur als Diskussionsgrundlage.

---

*Phase 2 abgeschlossen. Warte auf Entscheidung der Auftraggeberin, welche Option umgesetzt wird, bevor Phase 3 startet.*
