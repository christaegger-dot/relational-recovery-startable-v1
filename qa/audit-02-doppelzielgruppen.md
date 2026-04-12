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

*Phase 1b abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und vier Optionen).*
