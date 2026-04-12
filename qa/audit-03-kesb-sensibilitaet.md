# Audit 03 -- Kindesschutz-/KESB-Sensibilitäts-Audit

## Phase 1 -- Vollinventur

### 1.1 Übernahme der vier vorinventarisierten Stellen (Audit 02)

| # | Quelle | Wortlaut | Klassifizierung |
|---|--------|----------|----------------|
| A | `learningContent.js`, VIGNETTEN[0].options[0].label | "Proaktive Gefährdungsmeldung (KESB)" -- als falsche Antwort markiert, Feedback: "ein stark eingreifendes Vorgehen", "verfrüht" | Mischung (rechtliche Info + Trainingsbewertung) |
| B | `learningContent.js`, VIGNETTEN[1].options[0].label | "Gefährdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)" -- als korrekte Antwort markiert | Rechtliche Information |
| C | `toolboxContent.js`, CHILD_PROTECTION_THRESHOLDS[2].text | "Eine besorgte Person muss eine Gefährdung nicht beweisen." -- steht isoliert unter "Was eine Meldung bedeutet" | Supportive Begleitung |
| D | `evidenceContent.js`, HELP_BARRIER_PRACTICE_POINTS[0] | "Ängste vor KESB, Bewertung oder Sorgerechtsverlust ansprechbar machen statt zu bagatellisieren" | Supportive Begleitung |

---

### 1.2 Erweiterte Suche: Alle Fundstellen

#### KESB / Kindes- und Erwachsenenschutzbehörde

| # | Datei | Feld | Wortlaut (max 25 W.) | Kontext |
|---|-------|------|----------------------|---------|
| 1 | learningContent.js | VIGNETTEN[0].options[0].label | "Proaktive Gefährdungsmeldung (KESB)" | Fall 1 (Depression): Option als falsch markiert. |
| 2 | learningContent.js | VIGNETTEN[1].options[0].label | "Gefährdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)" | Fall 2 (Psychose): Option als korrekt markiert. |
| 3 | toolboxContent.js | CHILD_PROTECTION_THRESHOLDS[2].text | "Die Prüfung und Kindeswohlabklärung ist Aufgabe der KESB oder der beauftragten Fachstellen." | Unter "Was eine Meldung bedeutet". |
| 4 | evidenceContent.js | HELP_BARRIER_PRACTICE_POINTS[0] | "Ängste vor KESB, Bewertung oder Sorgerechtsverlust ansprechbar machen statt zu bagatellisieren" | Praxistipps für Fachpersonen. |
| 5 | networkContent.js | RESOURCE_DATA[8] | "Offizielle Übersicht zur Gefährdungsmeldung, Kindeswohlabklärung und Rolle von KESB und kjz im Kanton Zürich." | Netzwerk-Ressource mit Link zu zh.ch. |

#### Gefährdungsmeldung / Meldung / melden / Melderecht

| # | Datei | Feld | Wortlaut | Kontext |
|---|-------|------|----------|---------|
| 6 | learningContent.js | VIGNETTEN[1].options[0].feedback | "Art. 314c ZGB beschreibt dabei das Melderecht, nicht die eigentliche Schutzmassnahme." | Wichtige juristische Präzisierung. |
| 7 | toolboxContent.js | CHILD_PROTECTION_THRESHOLDS[2].title | "Was eine Meldung bedeutet" | Einleitungstitel. |
| 8 | toolboxContent.js | CHILD_PROTECTION_TIPS[3] | "Nach einer Meldung weiter kooperieren: Schutz und Beziehung müssen nicht gegeneinander ausgespielt werden." | Praxistipp, verbindet Meldung mit Kooperation. |
| 9 | evidenceContent.js | HELP_BARRIER_PANELS[1].text | "...die Sorge, Hilfe könnte automatisch zu Kontrolle, Meldungen oder zum Verlust von Einfluss auf die Kinder führen." | Empathische Benennung der Barriere. |
| 10 | grundlagenContent.js | GRUNDLAGEN_CLUSTERS[2].faqs[3].answer | "...Mitteilung an eine zuständige Stelle oder im Notfall unmittelbare Krisenhilfe." | FAQ "Wann sollte ich nicht mehr nur abwarten?" |

#### Sorgerecht / Sorgerechtsverlust

| # | Datei | Feld | Wortlaut | Kontext |
|---|-------|------|----------|---------|
| 11 | learningContent.js | VIGNETTEN[0].options[1].label | "Installation einer SPF (sorgerechtswahrend)" | Korrekte Option Fall 1. "sorgerechtswahrend" betont Autonomieerhalt. |
| 12 | evidenceContent.js | PARENT_EXPERIENCE_POINTS[2] | "...die Angst, Hilfe könne automatisch zu Kontrolle, Abwertung oder Sorgerechtsfragen führen." | Elternperspektive, empathisch. |
| 13 | evidenceContent.js | HELP_BARRIER_PRACTICE_POINTS[0] | "Ängste vor KESB, Bewertung oder Sorgerechtsverlust ansprechbar machen..." | = Stelle D aus Audit 02. |

#### Kindeswohl / Kindeswohlgefährdung

| # | Datei | Feld | Wortlaut | Kontext |
|---|-------|------|----------|---------|
| 14 | glossaryContent.js | GLOSSARY_GROUPS[1].terms[0] | "Kindeswohl: Zusammenfassender Begriff für Bedingungen, unter denen ein Kind hinreichend sicher... aufwachsen kann." | Glossar-Arbeitsdefinition. |
| 15 | glossaryContent.js | GLOSSARY_GROUPS[1].terms[1] | "Kindeswohlgefährdung: Eine Situation, in der ernsthafte Hinweise bestehen, dass Schutz, Versorgung oder Entwicklung eines Kindes... erheblich beeinträchtigt sind." | Glossar-Arbeitsdefinition. |
| 16 | evidenceContent.js | CROSS_DIAGNOSIS_POINTS[0] | "Nicht jede psychische Erkrankung führt automatisch zu einer Kindeswohlgefährdung." | Wichtige entlastende Aussage. |
| 17 | ToolboxSection.jsx | clusters[2].description | "Nicht jede hohe Belastung verlangt sofort eine formelle Meldung..." | Cluster "Kindeswohl" in Toolbox. |
| 18 | toolboxContent.js | CHILD_PROTECTION_THRESHOLDS[1].text | "Wenn Nahrung, Aufsicht, medizinische Versorgung, Sicherheit oder Schutz vor Gewalt nicht verlässlich gewährleistet sind, braucht es eine vertiefte Kindesschutzabklärung." | Schwellen-Definition. |

#### ZGB / Gesetzesreferenzen

| # | Datei | Feld | Wortlaut | Kontext |
|---|-------|------|----------|---------|
| 19 | learningContent.js | VIGNETTEN[1].options[0].label | "Melderecht nach Art. 314c ZGB" | Einzige Gesetzesreferenz im Projekt. |
| 20 | learningContent.js | VIGNETTEN[1].options[0].feedback | "Art. 314c ZGB beschreibt dabei das Melderecht, nicht die eigentliche Schutzmassnahme." | Korrekte Präzisierung. |

**Art. 307, 308, 310, 314d werden nirgends erwähnt.**

#### Behörde / Amt (Kindesschutzkontext)

| # | Datei | Feld | Wortlaut | Kontext |
|---|-------|------|----------|---------|
| 21 | networkContent.js | RESOURCE_DATA[7] | kjz, Tags: ['Behörde', 'Begleitung', 'kostenlos', 'Zürich'] | |
| 22 | networkContent.js | RESOURCE_DATA[8] | Tags: ['Kindesschutz', 'Behörde', 'Zürich', 'offizielle Stelle'] | |
| 23 | evidenceContent.js | HELP_BARRIER_PANELS[1].text | "Gerade die Angst vor behördlichen Eingriffen kann Familien davon abhalten, früh Unterstützung anzunehmen." | Empathisch. |

#### Beistandschaft / Mandat / Fremdplatzierung / Pflegefamilie

**Kein einziger Treffer im gesamten Projekt.** Dies ist eine erhebliche Lücke (s. Abschnitt 1.6).

---

### 1.3 Klassifikationsmatrix

| # | Rechtl. Korrektheit | Tonalität | Adressierung | Disclaimer |
|---|---------------------|-----------|--------------|------------|
| 1 | wahrscheinlich korrekt | neutral-informierend | Fachpersonen | nicht erforderlich |
| 2 | wahrscheinlich korrekt | neutral-informierend | Fachpersonen | fehlend |
| 3 | korrekt | unterstützend | Fachpersonen | fehlend |
| 4 | korrekt | unterstützend | Fachpersonen über Eltern | nicht erforderlich |
| 5 | korrekt | neutral-informierend | beide | nicht erforderlich |
| 6 | korrekt | neutral-informierend | Fachpersonen | nicht erforderlich |
| 7 | korrekt | neutral-informierend | Fachpersonen | fehlend |
| 8 | korrekt | unterstützend | Fachpersonen | nicht erforderlich |
| 9 | korrekt | unterstützend-empathisch | Fachpersonen über Eltern | nicht erforderlich |
| 10 | korrekt | unterstützend | Angehörige als Subjekt | fehlend |
| 11 | **fragwürdig** | neutral-informierend | Fachpersonen | fehlend |
| 12 | korrekt | unterstützend-empathisch | Fachpersonen über Eltern | nicht erforderlich |
| 13 | korrekt | unterstützend | Fachpersonen | nicht erforderlich |
| 14-15 | korrekt | neutral-informierend | Fachpersonen | vorhanden (Glossar-Hero) |
| 16 | korrekt | unterstützend-entlastend | beide | nicht erforderlich |
| 17 | korrekt | unterstützend-entlastend | Fachpersonen | nicht erforderlich |
| 18 | korrekt | **warnend** | Fachpersonen | fehlend |
| 19-20 | **fragwürdig** | neutral-informierend | Fachpersonen | fehlend |
| 21-22 | korrekt | neutral | beide | nicht erforderlich |
| 23 | korrekt | unterstützend-empathisch | Fachpersonen über Eltern | nicht erforderlich |

**Fragwürdige Stellen (3):**

- **#11 (SPF, "sorgerechtswahrend"):** "SPF" wird als Abkürzung nicht aufgelöst. "Sorgerechtswahrend" ist kein juristischer Terminus — korrekt wäre: freiwillige Massnahme, die das Sorgerecht nicht tangiert. Juristische Prüfung empfohlen.
- **#19-20 (Art. 314c ZGB):** Art. 314c regelt das Melderecht spezifisch für "Fachpersonen in den Bereichen... Erziehung, Betreuung, Seelsorge und Sport" sowie für Behörden. Die Vignette impliziert, dass Klinikmitarbeitende unter Art. 314c fallen — das ist wahrscheinlich korrekt (Gesundheitswesen), aber die Abgrenzung zu Art. 314d (Meldepflicht) fehlt komplett. Juristische Prüfung empfohlen.

---

### 1.4 Disclaimer-Inventar

| # | Ort | Wortlaut |
|---|-----|----------|
| D1 | HomeLandingTemplate, hero.asideCopy | "Dieses Angebot dient der psychoedukativen Orientierung. Für offizielle Informationen und Beratung bleibt die Angehörigenberatung der PUK Zürich die zentrale Anlaufstelle." |
| D2 | glossaryContent.js, GLOSSARY_HERO.asideCopy | "Die Einträge sind als knappe Arbeitsdefinitionen... formuliert. Sie ersetzen keine institutionellen Richtlinien oder juristische Fachberatung." |
| D3 | grundlagenContent.js, GRUNDLAGEN_HERO.asideCopy | "Die Antworten ersetzen keine individuelle klinische, rechtliche oder kindesschutzbezogene Beurteilung." |
| D4 | ElearningSection.jsx, hero.asideCopy | "Die Lernmodule sind als psychoedukative Orientierung... konzipiert, nicht als Ersatz für Supervision, Behandlung oder Krisenentscheidungen." |
| D5 | ToolboxSection.jsx, assessment.note | "Das Instrument ersetzt keine fachliche Gesamtbeurteilung..." |
| D6 | EvidenceSection.jsx, closingSection aside | "Downloads und Medien... ersetzen jedoch keine fachliche Beurteilung, kein Krisenmanagement und keine institutionelle Beratung." |
| D7 | evidenceContent.js, PUK_CONTEXT_POINTS[0] | "Diese Website ist ein ergänzendes psychoedukatives Informationsangebot und keine offizielle Unterseite der PUK Zürich." |
| D8 | evidenceContent.js, ABOUT_THIS_WEBSITE_POINTS[0] | "Die Website will orientieren, erklären und entlasten -- nicht institutionelle Beratung ersetzen." |

**Bewertung:** 8 Disclaimer vorhanden. Keiner enthält den expliziten Satz "Dies ersetzt keine Rechtsberatung" im Kontext der KESB-/Melderechts-Inhalte. D2 kommt am nächsten ("juristische Fachberatung"), D3 nennt "rechtliche Beurteilung". Aber bei den Toolbox-Clustern "Kindeswohl" und "Rolle und Rechte" sowie bei den Vignetten fehlt ein spezifischer Rechts-Disclaimer.

---

### 1.5 Bedrohungsmarker

| # | Quelle | Wortlaut | Unbeabsichtigte Wirkung |
|---|--------|----------|------------------------|
| T1 | toolboxContent.js, CHILD_PROTECTION_THRESHOLDS[1].text | "Wenn Nahrung, Aufsicht, medizinische Versorgung, Sicherheit oder Schutz vor Gewalt nicht verlässlich gewährleistet sind, braucht es eine vertiefte Kindesschutzabklärung." | Kann als "wenn ich nicht alles schaffe, wird abgeklärt" gelesen werden -- fehlende Entlastung, dass Schwächen im Alltag nicht automatisch eine Abklärung auslösen. |
| T2 | grundlagenContent.js, GRUNDLAGEN_CLUSTERS[2].faqs[3].answer | "...Mitteilung an eine zuständige Stelle oder im Notfall unmittelbare Krisenhilfe." | "Zuständige Stelle" lässt offen, ob KESB gemeint ist. Für Eltern mit Überforderungserleben kann dies als indirekter Meldehinweis gegen sich selbst gelesen werden. |
| T3 | learningContent.js, VIGNETTEN[1].options[0].label | "Gefährdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)" | Als "korrekte Antwort" in einem Psychose-Fall präsentiert. Ohne Kontextualisierung ("dies ist ein Extremfall") könnte ein Elternteil ableiten, dass bei Psychose generell eine KESB-Meldung erfolgt. |
| T4 | evidenceContent.js, HELP_BARRIER_PANELS[1].text | "...die Sorge, Hilfe könnte automatisch zu Kontrolle, Meldungen oder zum Verlust von Einfluss auf die Kinder führen." | Angst wird empathisch benannt, aber nicht aufgelöst -- es fehlt im selben Absatz die Information, dass eine Meldung nicht automatisch zu Sorgerechtsentzug führt. |
| T5 | toolboxContent.js, ACUTE_CRISIS_STEPS[2] | "Kinder und andere abhängige Personen sofort in Sicherheit bringen." | Imperativer Ton ohne Subjekt-Klärung. Könnte als "jemand wird meine Kinder wegnehmen" statt als Handlungsanweisung an Helfende gelesen werden. |
| T6 | ToolboxSection.jsx, clusters[2].description | "Nicht jede hohe Belastung verlangt sofort eine formelle Meldung. Entscheidend ist, ob Aufsicht, Sicherheit, Nahrung, medizinische Versorgung und Schutz vor Gewalt verlässlich gewährleistet sind." | Erster Satz entlastet, zweiter Satz kann als Checkliste gegen sich selbst gelesen werden. Fehlender Hinweis auf freiwillige Hilfe als Vorstufe. |

---

### 1.6 Lücken-Analyse

| Thema | Status | Bemerkung |
|-------|--------|-----------|
| **Recht auf Akteneinsicht** | Vollständig fehlend | Betroffene können Akteneinsicht bei KESB verlangen -- nirgends erwähnt. |
| **Melderecht vs. Meldepflicht (nach Beruf)** | Nur angerissen | Art. 314c (Melderecht) wird korrekt benannt. Art. 314d (Meldepflicht für bestimmte Fachpersonen) fehlt. Die zentrale Unterscheidung, welche Berufsgruppen meldepflichtig und welche nur meldeberechtigt sind, fehlt. |
| **Kantonale Unterschiede** | Teilweise | Netzwerkseite ist ZH-zentriert (kjz, zh.ch-Links). Aber der Hinweis, dass KESB-Verfahren kantonal variieren, fehlt. |
| **Selbstmeldung als Option** | Vollständig fehlend | Eltern können sich selbst bei der KESB melden, um präventiv Unterstützung zu erhalten. Zentrales Empowerment-Thema -- nicht erwähnt. |
| **Anonyme Beratung vor einer Meldung** | Teilweise | Pro Mente Sana und 143/147 als anonyme Stellen aufgeführt. Aber der explizite Hinweis "Sie können sich vor einer Meldung anonym beraten lassen" fehlt. |
| **Rolle eigener Therapeut:in im Kindesschutz** | Vollständig fehlend | Schweigepflicht wird allgemein thematisiert, aber die spezifische Rolle der eigenen Therapeut:in (Melderecht? Meldepflicht? Therapiebeziehung) fehlt. |
| **Unentgeltliche Rechtspflege** | Vollständig fehlend | Kein Hinweis auf kostenlose Rechtshilfe bei KESB-Verfahren. |
| **Beschwerderecht gegen KESB-Entscheide** | Vollständig fehlend | KESB-Entscheide können vor Gericht angefochten werden -- nirgends erwähnt. Für betroffene Eltern eine zentrale entängstigende Information. |
| **Beistandschaft als unterstützende Massnahme** | **Vollständig fehlend** | Das Wort "Beistandschaft" kommt im gesamten Projekt nicht vor. Art. 308 ZGB (Erziehungsbeistandschaft) als häufigste und mildeste KESB-Massnahme wird nicht erklärt. Eltern kennen oft nur "KESB = Kinder weg" -- die Seite tut nichts, um dieses Bild zu korrigieren. |
| **Stufenfolge der Massnahmen (Art. 307-310)** | Vollständig fehlend | Die Stufenfolge Ermahnung/Weisung → Beistandschaft → Aufhebung Aufenthaltsbestimmungsrecht → Sorgerechtsentzug wird nirgends dargestellt. Nur der Extremfall (Gefährdungsmeldung) ist präsent. |

---

### Zusammenfassung Phase 1

**Quantitativ:**
- 23 Fundstellen im Gesamtprojekt
- 6 Bedrohungsmarker
- 8 Disclaimer vorhanden (keiner spezifisch für Rechtskontext)
- 3 fragwürdige Stellen (juristische Prüfung empfohlen)
- 9 vollständig fehlende Themen, davon 3 erheblich (Beistandschaft, Stufenfolge, Beschwerderecht)

**Positive Aspekte:**
- Grundton durchgehend empathisch und respektvoll
- "Angst vor KESB" wird explizit als Barriere benannt, nicht bagatellisiert
- Toolbox differenziert zwischen freiwilliger Hilfe und formeller Eskalation
- Art. 314c wird korrekt als "Melderecht" (nicht Meldepflicht) bezeichnet
- Entlastende Aussage "Nicht jede psychische Erkrankung führt automatisch zu einer Kindeswohlgefährdung" vorhanden

**Kritischste Lücke:**
Beistandschaft (Art. 308 ZGB) als häufigste KESB-Massnahme wird nirgends erklärt. Das Bild, das die Seite vermittelt, ist binär: entweder alles okay, oder Gefährdungsmeldung. Die dazwischenliegenden, unterstützenden Massnahmen -- die den Alltag der meisten KESB-Fälle ausmachen -- sind unsichtbar.

---

*Phase 1 abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und Massnahmenkatalog).*
