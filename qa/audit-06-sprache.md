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

*Phase 1 abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und Reformulierungs-Strategie).*
