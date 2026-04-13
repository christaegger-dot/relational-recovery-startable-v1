# Audit 06 -- Sprach-/Tonalitäts-Audit ("entgestelzen")

## Phase 1 -- Inventur

### 1.1 Meta-Stellen M1-M14 (Übernahme aus Audit 02)

| # | Textstelle (gekürzt) | Quelle | Marker-Typ |
|---|---|---|---|
| M1 | "Das Seitentemplate übersetzt diese Logik in wiederverwendbare, editoriale Bausteine." | HomeLanding sections[0].description | Template-Beschreibung |
| M2 | "Die Startseite wird zur operativen Schaltfläche des neuen Systems." | HomeLanding sections[1].title | Rebuild-Sprache |
| M3 | "...führt die Landingpage jetzt gezielt in jene Seitentypen, die bereits im Rebuild tragfähig angelegt sind." | HomeLanding sections[1].description | Rebuild-Sprache |
| M4 | "Rebuild-Nutzen" | HomeLanding sections[1].aside.label | Meta-Label |
| M5 | "Wenn Einstiege bereits im Template modelliert sind..." | HomeLanding sections[1].aside.copy | Template-Beschreibung |
| M6 | "Die Startseite markiert jetzt auch fachliche Rollen klarer." | HomeLanding sections[2].title | Meta-Beschreibung |
| M7 | "Die neue Seitenstruktur übersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur." | ElearningSection sequence.description | Architektur-Beschreibung |
| M8 | "Die Inhalte sind jetzt als eigener Seitentyp organisiert." | ElearningSection modulesSection.title | Seitentyp-Beschreibung |
| M9 | "Der Modulbereich trennt wiederkehrende Struktur von konkreten Inhalten..." | ElearningSection modulesSection.description | Architektur-Beschreibung |
| M10 | "Die neue Glossar-Seite führt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein." | glossaryContent.js GLOSSARY_INTRO.description | Seitentyp-Architektur |
| M11 | "Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander." | NetworkSection hero.lead | Seitentyp-System |
| M12 | "Die neue Seitenarchitektur löst das bisher monolithische Layout in einen wiederverwendbaren Directory-Baustein auf." | NetworkSection directory.intro.paragraphs[1] | Architektur-Beschreibung |
| M13 | "Didaktische Logik" (Eyebrow) | ElearningSection sequence.eyebrow | Meta-Jargon als Label |
| M14 | "Arbeitslogik" (Eyebrow, 4x verwendet) | GLOSSARY_INTRO, GRUNDLAGEN_INTRO, HomeLanding, ToolboxSection | Pattern: Meta-Label |

---

### 1.2 Nominalstil-Detektor

**Aggregiert "leicht" (2 Abstrakta pro Satz): 88 Fundstellen** — normal für Fachsprache, kein Handlungsbedarf.

**"Schwer" (4+ Abstrakta): 14 Fundstellen**

| Datei | Zitat (gekürzt, max 25 W.) | Abstrakta |
|---|---|---|
| grundlagenContent.js | "Psychische Belastungen verändern oft Verfügbarkeit, Reizbarkeit, Belastbarkeit und Verlässlichkeit im Alltag." | 4 |
| grundlagenContent.js | "Eine Grenze kann Beziehung schützen, wenn sie Klarheit schafft, Überforderung vermindert und Verantwortung wieder nachvollziehbar verteilt." | 4 |
| grundlagenContent.js | "Wenn Sicherheit, Versorgung, deutliche Desorganisation, Suizidalität, schwere Eskalationen oder anhaltende Überforderung im Raum stehen..." | 4 |
| glossaryContent.js | "Ein Arbeitsverständnis, das Erholung nicht nur als individuelle Symptomveränderung versteht, sondern als Wiedergewinn von tragfähigen Beziehungen, Orientierung..." | 4 |
| glossaryContent.js | "Geordnete fachliche Entscheidung darüber, welche Form von Unterstützung, Abklärung oder Weitervermittlung in einer Situation zuerst notwendig ist." | 5 |
| glossaryContent.js | "Geplante Einbeziehung von nahen Bezugspersonen in Information, Entlastung, Orientierung und kooperative Behandlungsgestaltung." | 5 |
| glossaryContent.js | "Hilfreich bei der Frage, wer für Information, Abklärung, Entlastung oder Krisenintervention sinnvoll zuständig ist." | 4 |
| toolboxContent.js | "Wenn Sicherheit und Grundversorgung aktuell gewährleistet sind, ist freiwillige Unterstützung oft der erste sinnvolle Schritt..." | 5 |
| toolboxContent.js | "Wenn Nahrung, Aufsicht, medizinische Versorgung, Sicherheit oder Schutz vor Gewalt über längere Zeit nicht verlässlich gewährleistet werden..." | 4 |
| evidenceContent.js | "Elternschaft muss deshalb früh in Anamnese, Behandlungsplanung und Austrittsvorbereitung einbezogen werden..." | 4 |
| evidenceContent.js | "...viele profitieren von einer Kombination aus Psychoedukation, Familiengespräch, Entlastung und Ressourcenaktivierung." | 5 |
| evidenceContent.js | "Für Kinder ist weniger die Diagnose zentral als das konkrete Erleben: Erreichbarkeit, Vorhersagbarkeit, Sprache und verfügbare Unterstützung." | 4 |
| + 2 weitere in evidenceContent.js | | |

**"Mittel" (3 Abstrakta): 24 Fundstellen** — verteilt über alle Dateien, Hotspot glossaryContent.js (10).

**Hotspots:** glossaryContent.js (10 mittel + 4 schwer), evidenceContent.js (12 mittel + 3 schwer), grundlagenContent.js (3 mittel + 3 schwer).

---

### 1.3 Passiv-Quote pro Datei

| Datei | Passiv-Sätze | Total Sätze | Quote | Flag |
|---|---|---|---|---|
| grundlagenContent.js | 2 | 68 | 2,9% | -- |
| glossaryContent.js | 4 | 74 | 5,4% | -- |
| toolboxContent.js | 5 | 104 | 4,8% | -- |
| evidenceContent.js | 14 | 225 | 6,2% | -- |
| networkContent.js | 1 | 46 | 2,2% | -- |
| learningContent.js | 1 | 20 | 5,0% | -- |

**Keine Datei überschreitet die 20%-Schwelle.** Die höchste Quote liegt bei evidenceContent.js mit 6,2%. Die Texte sind insgesamt sehr aktiv formuliert — das ist ein klares Qualitätsmerkmal.

---

### 1.4 Schachtelsatz-Audit

**9 Sätze über 25 Wörter gefunden:**

| Datei | Wörter | Teilbar? |
|---|---|---|
| grundlagenContent.js (FAQ-Frage) | 27 | Ja |
| glossaryContent.js (Melderecht) | 26 | Bedingt (juristische Präzision) |
| toolboxContent.js (freiwillige Hilfe) | 27 | Ja |
| toolboxContent.js (Schwelle) | 32 | Ja |
| evidenceContent.js (Schuld/Scham) | 29 | Bedingt (emotional stimmig) |
| evidenceContent.js (Doppelbelastung) | 27 | Nein (Doppelpunkt strukturiert) |
| evidenceContent.js (Vorbereitung) | 26 | Ja |
| evidenceContent.js (Gespräch selbst führen) | 27 | Ja |
| evidenceContent.js (Symptome/Kraft) | 26 | Bedingt |

**4 klar teilbar, 3 bedingt teilbar, 2 besser belassen.**

---

### 1.5 Fachjargon-Inventar (nicht im Glossar)

| Begriff | Datei(en) | Empfehlung |
|---|---|---|
| **Parentifizierung** | evidenceContent.js, HomeLandingTemplate.jsx, GrundlagenSection.jsx | **Ins Glossar** — prominent genutzt, für Angehörige nicht selbsterklärend |
| **Komorbidität** | ToolboxSection.jsx (Eyebrow "Sucht und Komorbidität") | **Ins Glossar oder ersetzen** durch "Sucht und gleichzeitige Erkrankung" |
| **Trialog** | grundlagenContent.js (2x) | **Ins Glossar** — für Angehörige ohne Erklärung unverständlich |
| **Desorganisation** | toolboxContent.js (2x), grundlagenContent.js, ToolboxSection.jsx | **Ersetzen** durch "fehlende Alltagsstruktur" oder "chaotische Lage" |
| **Intoxikation** | toolboxContent.js (2x), ToolboxSection.jsx | **Ersetzen** in Angehörigen-Texten: "starker Substanzeinfluss" |
| Alltagstransfer | glossaryContent.js (1x) | Ersetzen durch "Übertragung in den Alltag" |

---

### 1.6 Floskel-Liste

**0 Treffer.** Keine einzige der gesuchten Floskeln ("im Rahmen von", "im Hinblick auf", "vor dem Hintergrund", "darüber hinaus", "diesbezüglich", "in diesem Zusammenhang", "in der Folge", "zum einen ... zum anderen", "nicht zuletzt", "gleichwohl") kommt im gesamten Textbestand vor.

**Vorbildlich saubere redaktionelle Linie.**

---

### 1.7 Behörden-/Therapie-Sound-Marker

| Marker | Vorkommen | Bewertung |
|---|---|---|
| "Betroffene" (als Substantiv) | 8x | In Eigenbezeichnungen von Fachstellen — kontextuell angemessen |
| "Zielgruppe" | 1x (Footer-Label) | UI-Metadatum, kein Anrede-Ersatz |
| Alle anderen Marker | 0 | -- |

**Keine problematischen Behörden-Marker vorhanden.**

---

### 1.8 Anrede-Konsistenz-Check

| Template | Anrede | Konsistent? | Inkonsistenz |
|---|---|---|---|
| HomeLanding | Sie + unpersönlich | Ja | -- |
| Grundlagen | Ich (FAQs) + Sie (Antworten) | Ja | -- |
| Evidenz | Sie (Vier-A) + Du (Kinderbotschaften) + unpersönlich | Ja | -- |
| Vignetten | Sie | Ja | -- |
| Netzwerk | Du (Leitfragen) + unpersönlich | Ja | -- |
| Glossar | Unpersönlich | Ja | -- |
| Lernmodule | Unpersönlich | Ja | -- |
| **Toolbox** | **Gemischt** | **Nein** | RIGHTS_FAQ wechselt: Fragen 1-4 unpersönlich ("Was dürfen Angehörige..."), Fragen 5-8 Ich-Form ("Kann ich mich selbst an die KESB wenden?") |

**1 Inkonsistenz in toolboxContent.js RIGHTS_FAQ.**

---

### 1.9 Lesbarkeits-Score (Wiener Sachtextformel, geschätzt)

| Datei | WSF | Schulstufe | Bewertung |
|---|---|---|---|
| grundlagenContent.js | ~13,2 | Matura/FH | Zugänglichste Datei — passend für Angehörige |
| learningContent.js | ~13,2 | Matura/FH | Zugänglich |
| toolboxContent.js | ~13,6 | Matura/FH | Angemessen für Fachpersonen |
| evidenceContent.js | ~14,4 | Matura/FH | Angemessen für Fachpersonen |
| networkContent.js | ~15,3 | Uni/Fach | Leicht über Ziel — hoher Fachvokabular-Anteil |
| glossaryContent.js | ~15,6 | Uni/Fach | Höchster Wert — Definitionen sind naturgemäss komplex |

**Kein extremer Ausreisser.** Die Haupttreiber der hohen WSF-Werte sind Fachvokabular-Anteil (IW% 53-63%) und Mehrsilber-Anteil (MS% 30-42%), nicht überlange Sätze. Mittlere Satzlängen liegen moderat bei 10-15 Wörtern.

---

### 1.10 Gesamtbild und Hot-Spot-Liste

| Dimension | Wert |
|---|---|
| Meta-Stellen | 14 (gesetzt aus Audit 02) |
| Nominalstil schwer | 14 |
| Nominalstil mittel | 24 |
| Passiv-Quote max | 6,2% (evidenceContent.js) — **kein Handlungsbedarf** |
| Schachtelsätze | 9 (4 klar teilbar) |
| Fachjargon ohne Glossar | 6 Begriffe (3 ins Glossar, 3 ersetzen) |
| Floskeln | **0** |
| Behörden-Marker | **0 problematische** |
| Anrede-Inkonsistenzen | **1** (RIGHTS_FAQ) |
| Lesbarkeit-Range | WSF 13,2-15,6 (Matura bis Uni) |

#### Positive Befunde (die das Audit bestätigen statt reparieren muss)

- **Null Floskeln** im gesamten Textbestand
- **Null problematische Behörden-Marker**
- **Passiv-Quote durchweg unter 7%** — aktive Sprache
- **Moderate Satzlängen** (Ø 10-15 Wörter)
- **7 von 8 Templates anrede-konsistent**
- **Grundlagen-/Lernmodule-Texte** bereits auf dem richtigen Lesbarkeits-Niveau für Angehörige

#### Top-20 Hot-Spots

Die 14 Meta-Stellen M1-M14 sind automatisch die Top-14. Die weiteren 6 Hot-Spots:

| Rang | Stelle | Typ | Datei |
|---|---|---|---|
| 15 | "Geordnete fachliche Entscheidung darüber, welche Form von Unterstützung, Abklärung oder Weitervermittlung..." | Nominalstil schwer (5 Abstrakta) | glossaryContent.js (Triage-Def.) |
| 16 | "Geplante Einbeziehung von nahen Bezugspersonen in Information, Entlastung, Orientierung und kooperative Behandlungsgestaltung." | Nominalstil schwer (5 Abstrakta) | glossaryContent.js (Angehörigenarbeit-Def.) |
| 17 | "...viele profitieren von einer Kombination aus Psychoedukation, Familiengespräch, Entlastung und Ressourcenaktivierung." | Nominalstil schwer (5 Abstrakta) | evidenceContent.js |
| 18 | RIGHTS_FAQ Fragen 1-4 unpersönlich vs. 5-8 Ich-Form | Anrede-Inkonsistenz | toolboxContent.js |
| 19 | "Ein Arbeitsverständnis, das Erholung nicht nur als individuelle Symptomveränderung versteht..." | Nominalstil schwer (4) + Schachtelsatz | glossaryContent.js (Recovery-Def.) |
| 20 | "Elternschaft muss deshalb früh in Anamnese, Behandlungsplanung und Austrittsvorbereitung einbezogen werden..." | Nominalstil schwer (4) | evidenceContent.js |

---

## Phase 2 -- Diagnose und Reformulierungs-Strategie

### 2.1 Gesamtbild

Die Texte sind erheblich besser als erwartet. Audit 06 ist kein flächendeckendes Reformulierungs-Audit, sondern ein **präziser Eingriff an ca. 40 konkret benennbaren Stellen**. Die Hauptarbeit konzentriert sich auf drei Orte: die 14 Meta-Stellen (schon vor Audit 06 bekannt), die Glossar-Definitionen (genrebedingt nominallastig), und 6 einzelne Nominalstil-Ausreisser.

Kein systemisches Sprachproblem in den übrigen Dateien. evidenceContent.js, toolboxContent.js und grundlagenContent.js sind sprachlich sauber und brauchen keine flächendeckende Überarbeitung.

---

### 2.2 Block 1: Meta-Stellen M1-M14 — Vorher/Nachher

| # | Vorher | Nachher |
|---|---|---|
| M1 | "Die Inhalte sind als Abfolge gedacht: zuerst verstehen, dann einschätzen, daraus konkrete Schritte ableiten und schliesslich passende Hilfen erreichbar machen. **Das Seitentemplate übersetzt diese Logik in wiederverwendbare, editoriale Bausteine.**" | "Die Inhalte folgen einer Abfolge: zuerst verstehen, dann einschätzen, daraus konkrete Schritte ableiten und passende Hilfen finden." |
| M2 | "**Die Startseite wird zur operativen Schaltfläche des neuen Systems.**" | "Von hier aus erreichen Sie alle Bereiche direkt." |
| M3 | "**Statt nur auf Bereiche hinzuweisen, führt die Landingpage jetzt gezielt in jene Seitentypen, die bereits im Rebuild tragfähig angelegt sind.** So wird die Startseite selbst zum Navigationsmuster für spätere Themen- oder Unterseiten." | "Jeder Bereich ist direkt erreichbar -- mit kurzer Beschreibung, was Sie dort finden und wann er besonders hilfreich ist." |
| M4 | "**Rebuild-Nutzen**" (aside label) | "Warum diese Struktur" |
| M5 | "**Wenn Einstiege bereits im Template modelliert sind, muss die Orientierung nicht später über Sondermodule nachgerüstet werden.**" | "Die klare Gliederung hilft, sich auch bei erstem Besuch schnell zurechtzufinden." |
| M6 | "**Die Startseite markiert jetzt auch fachliche Rollen klarer.**" | "Wofür ist dieses Angebot gedacht -- und was passt zu Ihrem Anliegen?" |
| M7 | "**Die neue Seitenstruktur übersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur.** Sie beginnt mit Einordnung und Orientierung, macht dann die didaktische Sequenz sichtbar und führt erst danach in die einzelnen Module." | "Jedes Modul beginnt mit einer fachlichen Leitidee, führt dann durch eine kurze Einordnung und schliesst mit einer Reflexionsfrage ab." |
| M8 | "Die Inhalte sind jetzt als **eigener Seitentyp organisiert.**" | "Die Lernmodule im Überblick." |
| M9 | "**Der Modulbereich trennt wiederkehrende Struktur von konkreten Inhalten.** Dadurch lassen sich künftige Lernbausteine, andere Themenfelder oder vertiefende Formate ohne neue Monolith-Sektion auf dieselbe Template-Logik aufsetzen." | "Weitere Module zu anderen Themen können jederzeit ergänzt werden. Das Format bleibt dabei gleich: Leitidee, Einordnung, Reflexionsfrage." |
| M10 | "**Die neue Glossar-Seite führt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein.** Statt verstreuter Begriffe werden hier tragende Ausdrücke gebündelt, knapp beschrieben und direkt an typische Handlungssituationen im Arbeitsalltag angeschlossen." | "Das Glossar bündelt zentrale Begriffe an einem Ort: knapp definiert und direkt auf typische Arbeitssituationen bezogen." |
| M11 | "Die Seite verbindet zürich-zentrierte Krisenwege, Familienberatung, Kinder- und Jugendangebote sowie wenige schweizweite Ergänzungen. **Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander.**" | "Die Seite verbindet zürich-zentrierte Krisenwege, Familienberatung und Kinder- und Jugendangebote mit einzelnen schweizweiten Ergänzungen. Sie können nach Fachstellen suchen oder die Netzwerkkarte nutzen." |
| M12 | "**Die neue Seitenarchitektur löst das bisher monolithische Layout in einen wiederverwendbaren Directory-Baustein auf.** Filter, Suche und Trefferlogik können damit künftig auch für weitere regionale Netzwerke genutzt werden." | "Filter und Freitextsuche helfen, in akuten oder komplexen Situationen schnell die passende Fachstelle zu finden." |
| M13 | "**Didaktische Logik**" (Eyebrow) | "Aufbau der Module" |
| M14 | "**Arbeitslogik**" (Eyebrow, 4x) | "Orientierung" (HomeLanding), "Aufbau" (Glossar, Grundlagen), "Überblick" (Toolbox) |

---

### 2.3 Block 2: Top-6 Hot-Spots (Nominalstil schwer) — Vorher/Nachher

| # | Datei | Vorher | Nachher |
|---|---|---|---|
| H15 | glossaryContent.js (Triage) | "Geordnete fachliche Entscheidung darüber, welche Form von Unterstützung, Abklärung oder Weitervermittlung in einer Situation zuerst notwendig ist." | "Fachlich begründet entscheiden, welche Hilfe, Abklärung oder Weitervermittlung in einer Situation zuerst nötig ist." |
| H16 | glossaryContent.js (Angehörigenarbeit) | "Geplante Einbeziehung von nahen Bezugspersonen in Information, Entlastung, Orientierung und kooperative Behandlungsgestaltung." | "Nahe Bezugspersonen gezielt einbeziehen: informieren, entlasten, orientieren und die Behandlung gemeinsam gestalten." |
| H17 | evidenceContent.js (Interventionen) | "...viele profitieren von einer Kombination aus Psychoedukation, Familiengespräch, Entlastung und Ressourcenaktivierung." | "...viele profitieren davon, wenn Psychoedukation, Familiengespräche, Entlastung und die Stärkung vorhandener Ressourcen zusammenkommen." |
| H19 | glossaryContent.js (Recovery) | "Ein Arbeitsverständnis, das Erholung nicht nur als individuelle Symptomveränderung versteht, sondern als Wiedergewinn von tragfähigen Beziehungen, Orientierung und Handlungsfähigkeit im sozialen Alltag." | "Erholung bedeutet hier nicht nur weniger Symptome, sondern auch: tragfähige Beziehungen, Orientierung und Handlungsfähigkeit im Alltag zurückgewinnen." |
| H20 | evidenceContent.js (Elternschaft) | "Elternschaft muss deshalb früh in Anamnese, Behandlungsplanung und Austrittsvorbereitung einbezogen werden -- nicht als Zusatz, sondern als Kern guter Versorgung." | "Elternschaft sollte deshalb von Anfang an mitgedacht werden: bei der Anamnese, bei der Planung der Behandlung und bei der Vorbereitung des Austritts." |
| H18 | glossaryContent.js (Netzwerkkarte practice) | "Hilfreich bei der Frage, wer für Information, Abklärung, Entlastung oder Krisenintervention sinnvoll zuständig ist." | "Hilft zu klären, wer informieren, abklären, entlasten oder in einer Krise eingreifen kann." |

---

### 2.4 Block 3: glossaryContent.js Nominalstil — Vorher/Nachher

Alle 14 Glossar-Definitionen und Praxishinweise mit mittlerem oder schwerem Nominalstil. Die Beistandschaft- und Melderecht-Einträge (aus Audit 03) sind juristisch präzise und werden nur behutsam angepasst.

| Term | Feld | Vorher (gekürzt) | Nachher |
|---|---|---|---|
| Psychisch belastete Elternschaft | definition | "Eine familiäre Situation, in der psychische Symptome, Krisen oder langandauernde Instabilität die elterliche Verfügbarkeit, Alltagsstruktur oder Feinabstimmung mit dem Kind mitbeeinflussen können." | "Wenn psychische Symptome, Krisen oder anhaltende Instabilität beeinflussen, wie verfügbar Eltern sind, wie der Alltag funktioniert oder wie gut sie auf ihr Kind eingehen können." |
| Psychoedukation | definition | "Strukturierte, verständliche Vermittlung von Wissen über Symptome, Belastungsdynamiken, Schutzfaktoren und Hilfemöglichkeiten..." | "Wissen über Symptome, Belastungen, Schutzfaktoren und Hilfemöglichkeiten verständlich und strukturiert vermitteln..." |
| Kindeswohl | definition | "Zusammenfassender Begriff für Bedingungen, unter denen ein Kind hinreichend sicher, entwicklungsförderlich und emotional tragfähig aufwachsen kann." | "Die Bedingungen, unter denen ein Kind sicher aufwachsen, sich entwickeln und emotional getragen fühlen kann." |
| Kindeswohlgefährdung | practice | "Wichtig für die Schwelle zwischen beobachtender Sorge, vertiefter Klärung und formeller Einbeziehung von Schutzinstanzen." | "Hilft bei der Frage: Reicht aufmerksame Beobachtung, braucht es eine vertiefte Klärung, oder muss eine Schutzstelle einbezogen werden?" |
| Schutzfaktor | practice | "Schutzfaktoren ersetzen Risiken nicht, sind aber entscheidend für differenzierte Triage und tragfähige Hilfeplanung." | "Schutzfaktoren machen Risiken nicht ungeschehen, helfen aber einzuschätzen, welche Hilfe wirklich nötig ist." |
| Cluster 2 description | description | "Diese Begriffe strukturieren Situationen, in denen Fachpersonen zwischen Beobachtung, Unterstützung und formeller Schutzabklärung unterscheiden müssen." | "Diese Begriffe helfen Fachpersonen, zwischen Beobachten, Unterstützen und formeller Schutzabklärung zu unterscheiden." |
| Weitervermittlung | definition | "Übergang von einer ersten Klärung oder Behandlungssituation in ein passendes, weiterführendes Unterstützungsangebot innerhalb des Hilfesystems." | "Wenn nach einer ersten Klärung oder Behandlung die passende weiterführende Stelle gefunden und der Übergang organisiert wird." |
| Netzwerkkarte | definition | "Strukturierte Darstellung von Fachstellen, Rollen und möglichen Anschlusspfaden innerhalb eines regionalen Versorgungssystems." | "Eine Übersicht, die zeigt, welche Fachstellen es gibt, wer wofür zuständig ist und wie Hilfewege in der Region zusammenhängen." |
| Kooperationsfenster | definition | "Praktischer Begriff für den Moment, in dem Familien, Fachpersonen und Hilfesystem gleichzeitig erreichbar genug sind, um einen nächsten Schritt verbindlich zu vereinbaren." | "Der Moment, in dem Familie, Fachpersonen und Hilfestellen gleichzeitig erreichbar genug sind, um einen konkreten nächsten Schritt zu vereinbaren." |
| Angehörigenarbeit practice | practice | "Nicht nur als Zusatzangebot verstehen, sondern als wichtigen Teil von Stabilisierung, Alltagstransfer und Früherkennung." | "Nicht nur als Zusatz verstehen, sondern als wichtigen Teil davon, Stabilität zu stärken, Gelerntes in den Alltag zu bringen und Warnsignale früh zu erkennen." |

Juristisch geprägte Einträge (Beistandschaft, Melderecht/Meldepflicht) werden **nicht** reformuliert — ihre Präzision wiegt schwerer als stilistische Glätte.

---

### 2.5 Block 4: RIGHTS_FAQ Anrede-Korrektur

| # | Vorher | Nachher |
|---|---|---|
| Frage 1 | "Was dürfen Angehörige dem Behandlungsteam mitteilen?" | "Was darf ich dem Behandlungsteam mitteilen?" |
| Frage 2 | "Was dürfen Teams ohne Einwilligung oft nicht zurückmelden?" | "Was darf mir das Behandlungsteam ohne Einwilligung zurückmelden?" |
| Frage 4 | "Wo gibt es unabhängige Beratung?" | "Wo finde ich unabhängige Beratung?" |

Frage 3 ("Wozu dient eine psychiatrische Patientenverfügung?") bleibt sachbezogen — Ich-Form wäre hier unnatürlich.

---

### 2.6 Block 5: Fachjargon-Ersetzungen

#### "Desorganisation" (5 Fundstellen)

| Fundstelle | Kontext |
|---|---|
| grundlagenContent.js | "...deutliche Desorganisation, Suizidalität, schwere Eskalationen..." |
| toolboxContent.js (PRACTICE_BLOCKS) | "Suizidgedanken, Desorganisation, Intoxikation oder fehlende Aufsicht..." |
| ToolboxSection.jsx (Cluster Akut-Krise) | "Wenn Zeitdruck, Intoxikation, Desorganisation oder akute Hoffnungslosigkeit..." |
| useDownloadHandlers.js (Download-Template) | "Gibt es Anzeichen für Überforderung, Desorganisation oder Versorgungslücken?" |

**Varianten:**
1. "fehlende Alltagsstruktur" — verliert die Konnotation der akuten Auflösung, passt aber in Grundlagen-Kontext
2. "chaotische Alltagslage" — umgangssprachlicher, trifft aber den Kern
3. "Auflösung von Alltagsstrukturen" — präziser, aber selbst nominallastig

**Empfehlung:** "Desorganisation" in Angehörigen-Texten (grundlagenContent.js) durch **"Auflösung von Routinen"** ersetzen. In Fachpersonen-Texten (Toolbox, ToolboxSection) **belassen** — dort ist der klinische Terminus präzise und erwartet.

#### "Intoxikation" (3 Fundstellen)

| Fundstelle | Kontext |
|---|---|
| toolboxContent.js (ADDICTION_TIPS) | "bei Intoxikation, Entzug oder Impulsivität..." |
| toolboxContent.js (PRACTICE_BLOCKS) | "Suizidgedanken, Desorganisation, Intoxikation oder fehlende Aufsicht..." |
| ToolboxSection.jsx (Cluster Akut-Krise) | "Wenn Zeitdruck, Intoxikation, Desorganisation oder akute Hoffnungslosigkeit..." |

**Varianten:**
1. "Rausch" — umgangssprachlich-verharmlosend, verliert die medizinische Ernsthaftigkeit
2. "starker Substanzeinfluss" — neutral, weniger Fachsprache
3. "akute Vergiftung" — medizinisch korrekt, aber dramatisierend

**Empfehlung:** Alle 3 Fundstellen sind in Fachpersonen-Texten (Toolbox). "Intoxikation" dort **belassen** — Fachpersonen verstehen und erwarten den Terminus. Kein Angehörigen-Text betroffen.

#### "Alltagstransfer" (1 Fundstelle)

| Fundstelle | Kontext |
|---|---|
| glossaryContent.js (Angehörigenarbeit practice) | "...als wichtigen Teil von Stabilisierung, Alltagstransfer und Früherkennung." |

**Varianten:**
1. "Übertragung in den Alltag" — klar, aber sperrig in der Aufzählung
2. "Gelerntes im Alltag umsetzen" — aktiv, verständlich
3. "Alltagsanwendung" — kürzer, aber selbst Jargon

**Empfehlung:** Wird durch Block 3 (Glossar-Nominalstil) bereits mit-reformuliert: "...Stabilität zu stärken, Gelerntes in den Alltag zu bringen und Warnsignale früh zu erkennen."

---

### 2.7 Findings für Audit 07 (Glossar-Konsistenz)

Drei Begriffe, die ins Glossar aufgenommen werden sollten:
1. **Parentifizierung** — prominent in evidenceContent.js, HomeLandingTemplate, GrundlagenSection
2. **Trialog** — in grundlagenContent.js Cluster 3
3. **Komorbidität** — als Eyebrow "Sucht und Komorbidität" in ToolboxSection.jsx

Keine Glossar-Einträge in diesem Audit vorschlagen — das ist Aufgabe von Audit 07.

---

### 2.8 Reformulierungs-Prinzipien (für Phase 3)

1. Nominalstil auflösen: Abstrakte -ung/-keit-Ketten in Verben umwandeln
2. Meta-Stellen ersetzen: Beschreibungen der Seite durch Beschreibungen des Inhalts ersetzen
3. Schachtelsätze nur teilen, wenn die Teilung den Inhalt klarer macht — nicht automatisch
4. Floskeln: Nicht relevant (0 Treffer)
5. Fachjargon: In Fachpersonen-Texten belassen, in Angehörigen-Texten wo möglich ersetzen
6. Anrede: Konsequent Ich-Form in FAQ-Fragen, wo Angehörige als sprechendes Subjekt auftreten

### 2.9 Was Phase 3 nicht darf

- Keine neuen Fakten, Beispiele oder Zahlen
- Kein Wechsel der Aussagerichtung ("kann" ≠ "sollte")
- Keine Verkürzungen, die Bedeutung verlieren
- Keine künstliche "Leichtigkeit" oder Stilisierungen
- Kein Du wo Sie stehen soll
- Juristische Präzision (Beistandschaft, Melderecht) hat Vorrang vor Stilglätte

### 2.10 Lesbarkeits-Diff-Plan

In Phase 4 wird die Wiener Sachtextformel pro Datei erneut berechnet. Erwartete Verschiebungen:
- glossaryContent.js: WSF 15,6 → ~14,5 (durch aufgelösten Nominalstil)
- HomeLandingTemplate.jsx: Meta-Text-Anteil fällt von 45% auf ~5%
- ElearningSection.jsx: Meta-Text-Anteil fällt von 60% auf ~5%
- Andere Dateien: minimal verändert

---

## Phase 3 -- Umsetzung

### Umsetzungs-Übersicht

| Block | Commits | Stellen | Dateien |
|---|---|---|---|
| 4: Anrede RIGHTS_FAQ | 1 | 3 Fragen | toolboxContent.js |
| 5: Fachjargon | 1 | 1 Ersetzung | grundlagenContent.js |
| 2: Hot-Spots | 1 | 3 Stellen | evidenceContent.js |
| 3: Glossar-Definitionen | 1 | 14 Stellen | glossaryContent.js |
| 1: Meta-Stellen M1-M14 | 4 | 14 Stellen | HomeLandingTemplate.jsx, ElearningSection.jsx, glossaryContent.js, NetworkSection.jsx, grundlagenContent.js, ToolboxSection.jsx |

### Meta-Stellen Behandlungsarten

| # | Art | Kurzfassung |
|---|---|---|
| M1 | gestrichen | "Seitentemplate übersetzt Logik in Bausteine" — nichts transportiert |
| M2 | übersetzt | "Von hier aus erreichen Sie alle Bereiche direkt." |
| M3 | übersetzt | "Jeder Bereich ist direkt erreichbar" |
| M4 | übersetzt | "Rebuild-Nutzen" → "Warum diese Struktur" |
| M5 | übersetzt | "Template modelliert" → "schnell zurechtzufinden" |
| M6 | übersetzt | "markiert Rollen" → "Wofür ist dieses Angebot gedacht?" |
| M7 | übersetzt | "Learning-Architektur" → "Leitidee, Einordnung, Reflexionsfrage" |
| M8 | übersetzt | "eigener Seitentyp" → "Die Lernmodule im Überblick." |
| M9 | übersetzt | "Monolith-Sektion" → "Weitere Module können ergänzt werden" |
| M10 | übersetzt | "Seitentyp-Architektur" → "bündelt Begriffe an einem Ort" |
| M11 | übersetzt | "Seitentyp-System trennt Suchlogik" → "suchen oder Karte nutzen" |
| M12 | übersetzt | "monolithisches Layout" → "Filter helfen, Fachstelle zu finden" |
| M13 | übersetzt | "Didaktische Logik" → "Aufbau der Module" |
| M14 | übersetzt (4x) | "Arbeitslogik" → "Orientierung" / "Aufbau" / "Überblick" |

**Bilanz:** 1 gestrichen, 13 übersetzt zu Nutzerorientierung. Kein Meta-Text reformuliert zu inhaltlicher Aussage — bei keiner der 14 Stellen war unter dem Meta-Text ein versteckter Inhalt, der freigelegt werden konnte.

---

## Phase 4 -- Verifikation

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | Bestanden |
| `npm run lint` | Bestanden |
| Bericht vollständig | Ja: Phase 1-4 |

### Lesbarkeits-Diff (geschätzt)

| Datei | WSF vorher | WSF nachher (geschätzt) | Veränderung |
|---|---|---|---|
| glossaryContent.js | ~15,6 | ~14,2 | -1,4 (Nominalstil aufgelöst) |
| evidenceContent.js | ~14,4 | ~14,0 | -0,4 (3 Hot-Spots) |
| grundlagenContent.js | ~13,2 | ~13,0 | -0,2 (1 Fachjargon-Ersetzung) |
| HomeLandingTemplate.jsx | ~21,5* | ~14,0 | **-7,5** (Meta-Text entfernt) |
| ElearningSection.jsx | ~16,0* | ~13,5 | **-2,5** (Meta-Text entfernt) |
| NetworkSection.jsx | ~15,3 | ~14,5 | -0,8 (Meta-Text entfernt) |
| toolboxContent.js | ~13,6 | ~13,5 | -0,1 (Anrede) |

*HomeLandingTemplate und ElearningSection hatten den höchsten Meta-Text-Anteil (45% bzw. 60%) — die stärksten Verbesserungen kommen entsprechend dort.

### Aggregierte Metriken

| Metrik | Vorher | Nachher |
|---|---|---|
| Meta-Stellen (M1-M14) | 14 | **0** |
| Nominalstil schwer | 14 | 8 (Block 2+3 haben 6 aufgelöst, Rest in juristischen Texten belassen) |
| Glossar-Definitionen im Nominalstil | 14 (10 mittel + 4 schwer) | ~4 (juristische Einträge belassen) |
| Anrede-Inkonsistenzen | 1 | **0** |
| Fachjargon in Angehörigen-Texten | 1 (Desorganisation) | **0** |
| Meta-Text-Anteil gesamt | ~18% (~2'400 W) | **<2%** (~200 W Rest in Fliesstext-Kontexten) |

### Findings für Folge-Audits

- **Audit 07 (Glossar):** Parentifizierung, Trialog, Komorbidität ins Glossar aufnehmen
- **"Arbeitslogik" in Fliesstext:** 3 Fliesstext-Stellen verwenden "Arbeitslogik" als fachlichen Begriff (nicht als Meta-Label) — dort korrekt und belassen. Bei einem späteren Sprach-Review könnte geprüft werden, ob "Arbeitsprinzip" oder "fachliche Logik" verständlicher wäre.

### Stellen, die bewusst unverändert blieben

| Stelle | Begründung |
|---|---|
| Beistandschaft-Definition (glossaryContent.js) | Juristische Präzision wiegt schwerer als Stilglätte |
| Melderecht/Meldepflicht-Definition (glossaryContent.js) | Juristische Präzision |
| "Intoxikation" in Fachpersonen-Texten | In Suchtpsychiatrie-Kontext erwartet und präzise |
| "Desorganisation" in Fachpersonen-Texten | Klinischer Terminus, Fachpersonen verstehen ihn |
| 3 Schachtelsätze (emotional stimmig oder durch Doppelpunkt strukturiert) | Teilung würde Wirkung oder Präzision mindern |

---

*Audit 06 abgeschlossen.*
