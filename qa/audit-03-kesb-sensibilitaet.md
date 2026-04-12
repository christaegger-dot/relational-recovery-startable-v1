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

## Phase 2 -- Diagnose und Massnahmenkatalog

### Warum die Pfad-Reihenfolge in diesem Audit umgekehrt ist

In den meisten Audits ist sprachliche Reformulierung (Pfad 1) das Brot-und-Butter-Geschäft und inhaltliche Ergänzung (Pfad 3) das Sahnehäubchen. In diesem Audit ist es umgekehrt. Die Seite hat kein Sprachproblem -- der Grundton ist empathisch, die vorhandenen Formulierungen sind sorgfältig. Die Seite hat ein **Spektrum-Problem**: Sie zeigt zwei Zustände ("alles okay" und "Gefährdungsmeldung") und überspringt das gesamte mittlere Spektrum. Für eine Mutter, die gerade liest, fühlt sich jede Schwierigkeit an wie ein Schritt Richtung Gefährdungsmeldung, weil die entlastenden Zwischenstufen sprachlich gar nicht existieren. Reformulierungen allein lösen das nicht -- es braucht inhaltliche Ergänzung. Deshalb: Pfad 3 zuerst, dann Pfad 2, dann Pfad 1.

---

### 2.1 Gesamtbild

| Dimension | Wert |
|---|---|
| Fundstellen gesamt | 23 |
| Davon korrekt | 17 |
| Davon fragwürdig (juristische Prüfung) | 3 |
| Davon wahrscheinlich korrekt | 3 |
| Bedrohungsmarker | 6 |
| Disclaimer vorhanden | 8 (0 rechtsspezifisch) |
| Fehlende Themen | 9 (3 erheblich) |

**Hot-Spot-Templates:**

| Template | Fundstellen | Bedrohungsmarker | Disclaimer |
|---|---|---|---|
| **Toolbox** | 7 | 3 (T1, T5, T6) | 1 (aber nicht rechtsspezifisch) |
| **Vignetten** (via learningContent) | 5 | 1 (T3) | 0 |
| **Evidenz** | 5 | 1 (T4) | 1 (nicht rechtsspezifisch) |
| **Grundlagen** | 2 | 1 (T2) | 1 (allgemein "rechtliche Beurteilung") |
| **Glossar** | 2 | 0 | 1 (allgemein "juristische Fachberatung") |
| **Netzwerk** | 2 | 0 | 0 |

**Korrelation mit Zielgruppen-Markierung (Audit 02):**
Die problematischsten Stellen häufen sich in Templates mit `primaryAudience: 'fachpersonen'` (Toolbox, Vignetten). Das ist inhaltlich plausibel -- Fachpersonen-Content enthält mehr juristische Referenzen. Aber: die Grundlagen-FAQ (`primaryAudience: 'angehoerige'`) enthält Bedrohungsmarker T2, der direkt an Angehörige gerichtet ist. Das ist der sensibelste einzelne Befund.

**Verhältnis rechtliche Information zu supportiver Begleitung:**
Über die 23 Fundstellen: ca. 30% rechtliche Information, ca. 50% supportive Begleitung, ca. 20% Mischung. Das ist ein gutes Verhältnis. Das Problem liegt nicht in der Mischung, sondern in den **Lücken** -- die supportive Begleitung hat keinen rechtlichen Unterbau (keine Stufenfolge, keine Rechte der Betroffenen).

---

### 2.2 Stellen mit juristischem Prüfvorbehalt

Die folgenden 3 Stellen werden in Phase 3 **nicht angefasst**, auch nicht bei vollständiger Freigabe. Sie erfordern eine juristische Prüfung durch eine externe Stelle.

#### Stelle J1: "SPF (sorgerechtswahrend)"

**Aktuelles Zitat:** `"Installation einer SPF (sorgerechtswahrend)"` (learningContent.js, VIGNETTEN[0].options[1].label)

**Was daran fragwürdig ist:** "SPF" wird als Abkürzung nicht aufgelöst (Sozialpädagogische Familienbegleitung). "Sorgerechtswahrend" ist kein juristischer Terminus des Schweizer Rechts -- das Sorgerecht wird durch eine SPF nicht tangiert, weil die SPF eine freiwillige Massnahme ist, kein KESB-Entscheid. Die Formulierung suggeriert, es gäbe auch "nicht-sorgerechtswahrende" Alternativen auf derselben Eskalationsstufe, was nicht zutrifft.

**Konkrete Frage an die Rechtsberatung:** "Ist die Bezeichnung 'sorgerechtswahrend' für eine SPF juristisch korrekt, oder sollte stattdessen 'freiwillige Massnahme ohne KESB-Beteiligung' verwendet werden? Und: kann eine SPF auch von der KESB angeordnet werden (Art. 307 Abs. 3 ZGB), und wenn ja, wie ändert das die Einordnung?"

**Empfohlene Prüfstelle:** PUK-Rechtsdienst oder kantonale Kindesschutz-Fachstelle (kjz).

#### Stelle J2: Art. 314c ZGB -- Anwendungsbereich

**Aktuelles Zitat:** `"Gefährdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)"` (learningContent.js, VIGNETTEN[1].options[0].label)

**Was daran fragwürdig ist:** Art. 314c ZGB regelt das Melderecht für "Personen, die in amtlicher Tätigkeit von einem... Kind Kenntnis erhalten" sowie für "Fachpersonen aus den Bereichen Medizin, Psychologie, Pflege, Betreuung, Erziehung, Bildung, Sozialberatung, Religion und Sport" (Abs. 2). Die Vignette impliziert, dass Klinikmitarbeitende unter Art. 314c fallen. Das ist wahrscheinlich korrekt, aber: Art. 314d regelt die **Meldepflicht** für bestimmte Fachpersonen. Ob die Fallsituation (akute Psychose, Nahrungsverweigerung eines Kindes) ein Melderecht oder eine Meldepflicht auslöst, hängt vom kantonalen Recht und der konkreten Berufskategorie ab. Die Vignette vereinfacht hier möglicherweise.

**Konkrete Frage an die Rechtsberatung:** "Löst die Fallsituation in Vignette 2 (stationärer Psychiatrieaufenthalt, Kindeswohlgefährdung) für die involvierten Fachpersonen ein Melderecht (Art. 314c) oder eine Meldepflicht (Art. 314d) aus? Ist die Angabe 'Melderecht nach Art. 314c' korrekt, oder müsste differenziert werden?"

**Empfohlene Prüfstelle:** PUK-Rechtsdienst (kennt die internen Abläufe bei Kindesschutzfragen in der Klinik).

#### Stelle J3: Art. 314c als einzige Rechtsgrundlage

**Aktuelles Zitat:** `"Art. 314c ZGB beschreibt dabei das Melderecht, nicht die eigentliche Schutzmassnahme."` (learningContent.js, VIGNETTEN[1].options[0].feedback)

**Was daran fragwürdig ist:** Die Aussage ist für sich korrekt, aber sie ist die **einzige** Rechtsgrundlage im gesamten Projekt. Art. 307 (Geeignete Massnahmen), 308 (Beistandschaft), 310 (Aufhebung Aufenthaltsbestimmungsrecht) werden nirgends erwähnt. Das erzeugt den Eindruck, Art. 314c sei die zentrale Rechtsgrundlage im Kindesschutz, obwohl es nur das Melderecht (den Eingangskanal) regelt. Die eigentlichen Massnahmen (307-310) fehlen komplett.

**Konkrete Frage an die Rechtsberatung:** "Soll das Vignetten-Feedback um einen kurzen Hinweis auf die Stufenfolge Art. 307-310 ergänzt werden? Und: wäre eine separate Übersicht 'Was passiert nach einer Meldung?' auf der Seite empfehlenswert?"

**Empfohlene Prüfstelle:** PUK-Rechtsdienst oder Anwält:in Familienrecht ZH.

---

### 2.3 Korrektur-Pfade (Pfad 3 → 2 → 1)

---

#### Pfad 3 -- Inhaltliche Lücken schliessen (höchste Priorität)

##### Lücke L1: Stufenfolge der Massnahmen (Art. 307-310 ZGB)

**Empfehlung: Ergänzen (höchste Priorität)**

**Begründung:** Dies ist die zentrale inhaltliche Lücke. Die Seite zeigt nur zwei Pole (freiwillige Hilfe / Gefährdungsmeldung). Die Realität hat mindestens vier Stufen:

1. **Ermahnung und Weisung** (Art. 307 Abs. 3): Die KESB kann Eltern ermahnen oder ihnen Weisungen erteilen -- z.B. Erziehungsberatung wahrnehmen. Das Sorgerecht bleibt unberührt.
2. **Beistandschaft** (Art. 308): Die häufigste Massnahme. Ein Beistand unterstützt die Eltern in bestimmten Bereichen. Das Sorgerecht bleibt bei den Eltern.
3. **Aufhebung des Aufenthaltsbestimmungsrechts** (Art. 310): Das Kind wird fremdplatziert, aber die Eltern behalten das Sorgerecht.
4. **Sorgerechtsentzug** (Art. 311/312): Die schwerste Massnahme, nur bei Aussichtslosigkeit. In der Praxis selten.

**Minimal-viable Inhalt:** Eine kompakte Übersicht (ca. 150-200 Wörter) mit den vier Stufen, jeweils 1-2 Sätze. Platzierung: im Toolbox-Cluster "Kindeswohl" als eigene Karte oder als Ergänzung zu den bestehenden `CHILD_PROTECTION_THRESHOLDS`. Alternativ: als neuer Glossareintrag.

**Hinweis:** Inhalt muss vor Veröffentlichung juristisch validiert werden. In Phase 3 nur als Stub mit Platzhalter.

##### Lücke L2: Beistandschaft als unterstützende Massnahme

**Empfehlung: Ergänzen (hohe Priorität)**

**Begründung:** "Beistandschaft" kommt im gesamten Projekt nicht vor. Für die Zielgruppe ist dies das wichtigste fehlende Puzzleteil: Die meisten KESB-Massnahmen sind Beistandschaften, nicht Fremdplatzierungen. Eltern, die nur "KESB = Kinder weg" kennen, könnten durch eine klare Erklärung entängstigt werden.

**Minimal-viable Inhalt:** Glossareintrag (~80 Wörter) + Kurzhinweis in der Toolbox (1 Satz in CHILD_PROTECTION_THRESHOLDS oder als Aside-Card): "Die häufigste KESB-Massnahme ist die Erziehungsbeistandschaft. Dabei unterstützt eine Fachperson die Familie in bestimmten Bereichen. Das Sorgerecht bleibt bei den Eltern."

##### Lücke L3: Rechte der Betroffenen

**Empfehlung: Ergänzen (hohe Priorität)**

**Begründung:** Akteneinsicht, Beschwerderecht, unentgeltliche Rechtspflege und Selbstmeldung sind zentrale Empowerment-Informationen. Ihr Fehlen verstärkt das Gefühl der Ohnmacht bei betroffenen Eltern.

**Minimal-viable Inhalt:** Erweiterung der bestehenden `RIGHTS_FAQ` in toolboxContent.js um 3-4 neue Fragen:
- "Kann ich mich selbst an die KESB wenden?" (Ja -- Selbstmeldung als präventive Option)
- "Habe ich Recht auf Akteneinsicht?" (Ja -- ZGB Art. 449b)
- "Kann ich gegen einen KESB-Entscheid vorgehen?" (Ja -- Beschwerde an das zuständige Gericht)
- "Habe ich Anspruch auf Rechtsbeistand?" (Ja -- unentgeltliche Rechtspflege bei Bedürftigkeit)

**Hinweis:** Antworten müssen juristisch validiert werden. In Phase 3 nur als Stub.

##### Lücke L4: Melderecht vs. Meldepflicht (Art. 314c vs. 314d)

**Empfehlung: Ergänzen (mittlere Priorität)**

**Begründung:** Die Seite nennt Art. 314c (Melderecht) korrekt, erwähnt aber Art. 314d (Meldepflicht bestimmter Fachpersonen) nirgends. Für Fachpersonen ist die Unterscheidung arbeitsrelevant: Bin ich nur meldeberechtigt, oder meldepflichtig?

**Minimal-viable Inhalt:** Kurzhinweis im Glossar oder in der Toolbox (~60 Wörter): Melderecht (Art. 314c) gilt für alle Personen. Meldepflicht (Art. 314d) gilt für bestimmte Fachpersonen (Medizin, Betreuung, Erziehung etc.) -- aber nur in bestimmten Kantonen bzw. unter bestimmten Bedingungen. Kantonale Unterschiede beachten.

##### Lücke L5: Anonyme Beratung vor einer Meldung

**Empfehlung: Ergänzen (mittlere Priorität)**

**Begründung:** Pro Mente Sana und 143/147 sind als Stellen aufgeführt, aber der explizite Satz "Sie können sich vor einer Meldung anonym beraten lassen" fehlt. Dieser Satz könnte in der Toolbox bei den `CHILD_PROTECTION_TIPS` ergänzt werden.

**Minimal-viable Inhalt:** 1 Satz als Ergänzung zu CHILD_PROTECTION_TIPS: "Vor einer Meldung können Sie sich anonym beraten lassen -- etwa bei Pro Mente Sana (0848 800 858) oder beim kjz."

##### Lücke L6: Rolle der eigenen Therapeut:in im Kindesschutz

**Empfehlung: Kann warten**

**Begründung:** Komplex (Spannungsfeld Schweigepflicht/Meldepflicht/Therapiebeziehung). Besser als eigenes redaktionelles Thema behandeln, nicht als Audit-Nebenprojekt.

##### Lücke L7: Kantonale Unterschiede

**Empfehlung: Kann warten**

**Begründung:** Die Seite ist bereits ZH-zentriert positioniert. Ein kurzer Disclaimer "Die Inhalte beziehen sich primär auf den Kanton Zürich" wäre sinnvoll (s. Pfad 2), eine vollständige kantonale Übersicht aber nicht verhältnismässig.

##### Lücke L8: Unentgeltliche Rechtspflege

**Empfehlung: Ergänzen (in Lücke L3 integrieren)**

**Begründung:** Wird als FAQ-Frage in L3 mitbehandelt.

##### Lücke L9: Recht auf Akteneinsicht / Beschwerderecht

**Empfehlung: Ergänzen (in Lücke L3 integrieren)**

**Begründung:** Wird als FAQ-Fragen in L3 mitbehandelt.

**Zusammenfassung Pfad 3:**

| Lücke | Priorität | Geschätzter Umfang | Phase 3 |
|-------|-----------|-------------------|---------|
| L1: Stufenfolge Art. 307-310 | Höchste | ~200 Wörter | Stub mit Platzhalter |
| L2: Beistandschaft | Hoch | ~80 Wörter (Glossar) + 1 Satz (Toolbox) | Stub |
| L3: Rechte der Betroffenen (4 FAQs) | Hoch | ~200 Wörter | Stub |
| L4: Melderecht vs. Meldepflicht | Mittel | ~60 Wörter | Stub |
| L5: Anonyme Beratung vor Meldung | Mittel | 1 Satz | Direkt umsetzbar |
| L6: Rolle Therapeut:in | Kann warten | -- | Nicht in Phase 3 |
| L7: Kantonale Unterschiede | Kann warten | 1 Satz Disclaimer | Via Pfad 2 |

---

#### Pfad 2 -- Rechtsspezifische Disclaimer-Kategorie etablieren

##### 2.4.1 Warum eine eigene Kategorie nötig ist

Die 8 bestehenden Disclaimer adressieren den medizinisch-therapeutischen Bereich ("ersetzt keine Supervision", "keine fachliche Gesamtbeurteilung", "keine institutionelle Beratung"). Sie funktionieren dort gut. Aber: Eltern, die eine Information über KESB oder Melderecht lesen, brauchen einen anderen Disclaimer als Fachpersonen, die ein Assessment-Tool nutzen. Die Risiken sind verschieden: bei medizinischen Inhalten geht es um Fehlbehandlung, bei rechtlichen Inhalten um Fehleinschätzung eigener Rechte und Pflichten.

Wenn rechtliche Disclaimers in dasselbe visuelle Format wie die therapeutischen gepresst werden, entsteht Disclaimer-Inflation -- Nutzer:innen lesen irgendwann keinen mehr.

##### 2.4.2 Standard-Disclaimer Rechtskontext

**Vorschlag (max. 60 Wörter):**

> **Rechtliche Orientierung, keine Rechtsberatung.** Die folgenden Hinweise zu Kindesschutz, KESB-Verfahren oder Melderecht dienen der Erstorientierung. Sie ersetzen keine individuelle Rechtsberatung. Bei konkreten Fragen zu Ihrem Fall wenden Sie sich an eine Rechtsberatungsstelle, die Angehörigenberatung der PUK Zürich oder Pro Mente Sana (0848 800 858).

##### 2.4.3 Visuelle und sprachliche Differenzierung

| Dimension | Medizinischer Disclaimer (bestehend) | Rechtlicher Disclaimer (neu) |
|---|---|---|
| **Name** | "Einordnung" / "Nutzungshinweis" | "Rechtliche Orientierung" |
| **Visueller Ton** | Warm, dezent (SurfaceCard tone="soft") | Sachlicher, klarer Rahmen (SurfaceCard tone="default", oder eigene Variante mit Border-Akzent) |
| **Sprache** | "ersetzt keine..." (passiv, weich) | "dient der Erstorientierung" (aktiv, klar) + konkrete Anlaufstellen |
| **Position** | Hero-Aside (einmalig pro Seite) | **Inline**, nahe am rechtlichen Inhalt (bei CHILD_PROTECTION_THRESHOLDS, bei RIGHTS_FAQ, bei Vignetten-Feedback) |

##### 2.4.4 Technische Einbindung

**Empfehlung:** Neues Datenfeld `legalDisclaimer` (Boolean oder String) in den relevanten Content-Objekten. Wenn gesetzt, rendert das Template automatisch den Standard-Disclaimer-Block in der Nähe. Das vermeidet manuelle Platzierung und stellt sicher, dass neue rechtliche Inhalte automatisch disclaimert werden.

**Alternativ (einfacher):** Eine wiederverwendbare Komponente `<LegalDisclaimer />` in `src/components/ui/`, die manuell an 3-4 Stellen eingesetzt wird. Weniger elegant, aber geringerer Aufwand.

**Platzierung (minimal):**
1. Toolbox-Cluster "Kindeswohl" (vor oder nach CHILD_PROTECTION_THRESHOLDS)
2. Toolbox-Cluster "Rolle und Rechte" (vor RIGHTS_FAQ)
3. Vignetten-Seite (im Hero oder vor der ersten Vignette)
4. Grundlagen-FAQ Cluster 3 (bei den KESB-nahen Fragen)

##### 2.4.5 Kantonaler Kontext-Disclaimer

Zusätzlich zum Rechts-Disclaimer ein knapper Hinweis, der die kantonale Geltung markiert:

> Die rechtlichen Hinweise auf dieser Seite beziehen sich primär auf den Kanton Zürich. Verfahren und Zuständigkeiten können in anderen Kantonen abweichen.

Platzierung: einmalig im Footer oder in einem globalen Hinweisbereich.

---

#### Pfad 1 -- Sprachliche Reformulierungen (niedrigste Priorität)

Die folgenden Reformulierungsvorschläge betreffen Stellen, an denen der Inhalt stimmt, aber die Formulierung für mitlesende Eltern unnötig bedrohlich wirken kann. Alle Vorschläge halten die juristische Aussage intakt.

##### R1: Bedrohungsmarker T1

**Vorher:** "Wenn Nahrung, Aufsicht, medizinische Versorgung, Sicherheit oder Schutz vor Gewalt nicht verlässlich gewährleistet sind, braucht es eine vertiefte Kindesschutzabklärung."

**Nachher:** "Wenn Nahrung, Aufsicht, medizinische Versorgung, Sicherheit oder Schutz vor Gewalt über längere Zeit nicht verlässlich gewährleistet werden können, ist eine fachliche Einschätzung sinnvoll -- oft zuerst über das kjz oder eine Beratungsstelle."

**Begründung:** "Braucht es eine vertiefte Kindesschutzabklärung" klingt wie ein automatischer Mechanismus. "Fachliche Einschätzung sinnvoll" + Nennung einer niederschwelligen Stelle entschärft ohne juristische Verwässerung.

##### R2: Bedrohungsmarker T2

**Vorher:** "...Mitteilung an eine zuständige Stelle oder im Notfall unmittelbare Krisenhilfe."

**Nachher:** "...Rücksprache mit einer Fachstelle wie dem kjz, der Angehörigenberatung oder im Notfall sofortige Krisenhilfe (144 / 147)."

**Begründung:** "Zuständige Stelle" ist unspezifisch und für Angehörige bedrohlich. Konkrete, bekannte Stellen nennen entängstigt.

##### R3: Bedrohungsmarker T5

**Vorher:** "Kinder und andere abhängige Personen sofort in Sicherheit bringen."

**Nachher:** "Sicherstellen, dass Kinder und andere abhängige Personen versorgt und beaufsichtigt sind."

**Begründung:** "In Sicherheit bringen" suggeriert Wegnahme. "Versorgt und beaufsichtigt" beschreibt dasselbe Ziel aus der Fürsorge-Perspektive.

##### R4: Bedrohungsmarker T4 (Evidenz)

**Vorher:** "...die Sorge, Hilfe könnte automatisch zu Kontrolle, Meldungen oder zum Verlust von Einfluss auf die Kinder führen."

**Nachher:** "...die Sorge, Hilfe könnte automatisch zu Kontrolle oder Meldungen führen. In der Praxis sind die meisten Kindesschutzmassnahmen unterstützend, nicht trennend."

**Begründung:** Angst wird weiterhin empathisch benannt, aber im selben Absatz mit einer entlastenden Realitätseinordnung verbunden. **Vorbehalt:** Der Zusatzsatz setzt voraus, dass L1 (Stufenfolge) ergänzt wird, damit die Aussage einen Verweis hat.

##### R5: Bedrohungsmarker T6 (Toolbox Cluster Kindeswohl)

**Vorher:** "Nicht jede hohe Belastung verlangt sofort eine formelle Meldung. Entscheidend ist, ob Aufsicht, Sicherheit, Nahrung, medizinische Versorgung und Schutz vor Gewalt verlässlich gewährleistet sind."

**Nachher:** "Nicht jede hohe Belastung verlangt sofort eine formelle Meldung. Als Orientierung dient die Frage: Sind Aufsicht, Sicherheit, Nahrung und Schutz aktuell gewährleistet? Wenn Zweifel bestehen, ist der erste Schritt oft ein vertrauliches Gespräch mit einer Beratungsstelle."

**Begründung:** Der Checklist-Charakter ("Sind A, B, C, D, E gewährleistet?") wird durch eine offene Leitfrage + nächsten Schritt ersetzt.

##### R6: Bedrohungsmarker T3 (Vignette 2)

**Kein Reformulierungsvorschlag.** Die Vignette stellt korrekt dar, dass in einem Extremfall (Psychose, Nahrungsverweigerung eines Kindes seit 24 Stunden) eine Gefährdungsmeldung angezeigt ist. Der Bedrohungsmarker liegt hier nicht in der Formulierung, sondern im fehlenden Rahmentext ("Dies ist ein Extremfall"). Die Empfehlung ist eine strukturelle Ergänzung (Pfad 2: ein kurzer Kontextsatz vor den Vignetten: "Die Trainingsfälle zeigen zugespitzte Situationen. Im Arbeitsalltag gibt es häufig mehr Spielraum und mehr Abstufungen als hier dargestellt.").

---

### 2.5 Empfehlung für eine Linkliste Rechtsberatung

**Empfohlene Kategorien:**

| Kategorie | Beispiel-Stellen | Relevanz |
|---|---|---|
| Unabhängige psychosoziale Rechtsberatung | Pro Mente Sana (0848 800 858) | Hoch -- bereits auf der Seite, aber nicht im Rechtskontext verlinkt |
| Kantonale Ombudsstelle Kindesschutz | Ombudsstelle Kindes- und Jugendschutz ZH (falls vorhanden) | Mittel |
| Unentgeltliche Rechtspflege ZH | Kantonale Schlichtungsstelle / Rechtsberatungsstelle | Hoch (wenn L3 ergänzt wird) |
| Elternberatung Kindesschutz | Pro Juventute Elternberatung (058 261 61 61) | Hoch -- kostenlos, anonym |
| Angehörigen-spezifische Rechtsberatung | Angehörigenberatung PUK Zürich | Hoch -- bereits auf der Seite |
| Nationale Anlaufstelle | Bundesamt für Justiz (Kindesschutz-Informationen) | Niedrig -- zu allgemein |

**Empfohlene Platzierung:** Erweiterung der bestehenden `RESOURCE_DATA` in networkContent.js um 2-3 Einträge mit einem neuen Tag `'Rechtsberatung'`. Alternativ: eigene Sektion im Toolbox-Cluster "Rolle und Rechte" als weiterführende Links.

---

### 2.6 Risikoeinschätzung

**Vor einem öffentlichen Release zwingend zu korrigieren:**

1. **Lücke L1 (Stufenfolge)** -- Ohne diese Information vermittelt die Seite ein binäres Bild, das Eltern abschrecken kann. Mindestens ein Stub mit "Inhalt in Vorbereitung" oder ein Verweis auf eine externe Quelle.
2. **Lücke L2 (Beistandschaft)** -- Dasselbe Problem: "KESB = Kinder weg" wird nicht korrigiert.
3. **Rechts-Disclaimer** -- Ohne einen spezifischen Rechts-Disclaimer bei den KESB-/Melderechts-Inhalten besteht ein Haftungsrisiko, falls Nutzer:innen die Informationen als Rechtsberatung verstehen.

**Vor Release empfehlenswert, aber tolerierbar:**

4. Lücke L3 (Rechte der Betroffenen) -- Fehlt, ist aber nicht direkt irreführend.
5. Reformulierungen R1-R5 -- Verbesserungen, aber kein akutes Risiko.
6. Linkliste Rechtsberatung -- Nice-to-have.
7. Lücke L5 (anonyme Beratung vor Meldung) -- 1 Satz, schnell gemacht.

**Unkritisch:**

8. Lücke L4 (Melderecht vs. Meldepflicht) -- Relevant für Fachpersonen, kein akutes Risiko.
9. Lücke L6-L7 -- Können warten.
10. Die 3 fragwürdigen Stellen (J1-J3) -- Sind wahrscheinlich korrekt, aber die juristische Validierung sollte vor Release erfolgen.

---

## Phase 3 -- Umsetzung

### Umgesetzt

| # | Massnahme | Status | Commit |
|---|-----------|--------|--------|
| **Validierungs-Dokument** | `qa/audit-03-juristische-validierung.md` mit J1-J3 und L1-L3 | Vollständig | `audit(03): juristische validierung dokument` |
| **L1 Stufenfolge** | Stub `CHILD_PROTECTION_MEASURES_STUB` in toolboxContent.js | Stub (juristische Validierung ausstehend) | `audit(03): stubs L1-L5` |
| **L2 Beistandschaft** | Stub-Kommentar in glossaryContent.js Cluster 2 | Stub (juristische Validierung ausstehend) | `audit(03): stubs L1-L5` |
| **L3 Rechte der Betroffenen** | Stub-Kommentar in RIGHTS_FAQ mit 4 FAQ-Outlines | Stub (juristische Validierung ausstehend) | `audit(03): stubs L1-L5` |
| **L4 Melderecht/Meldepflicht** | Stub-Kommentar in glossaryContent.js Cluster 2 | Stub (juristische Validierung ausstehend) | `audit(03): stubs L1-L5` |
| **L5 Anonyme Beratung** | Neuer Eintrag in CHILD_PROTECTION_TIPS | **Vollständig** (keine juristische Validierung nötig) | `audit(03): stubs L1-L5` |
| **Rechts-Disclaimer** | `LegalDisclaimer`-Komponente + 4 Platzierungen | **Vollständig** | `audit(03): rechts-disclaimer komponente` |
| **R1** (T1 Schwelle) | Reformuliert in toolboxContent.js | **Vollständig** | `audit(03): reformulierungen R1-R5` |
| **R2** (T2 FAQ Grundlagen) | Reformuliert in grundlagenContent.js | **Vollständig** | `audit(03): reformulierungen R1-R5` |
| **R3** (T5 Akut-Krise) | Reformuliert in toolboxContent.js | **Vollständig** | `audit(03): reformulierungen R1-R5` |
| **R4** (T4 Evidenz Barrieren) | Reformuliert in evidenceContent.js | **Vollständig** | `audit(03): reformulierungen R1-R5` |
| **R5** (T6 Kindeswohl-Cluster) | Reformuliert in ToolboxSection.jsx | **Vollständig** | `audit(03): reformulierungen R1-R5` |
| **Linkliste Rechtsberatung** | Datenstruktur in networkContent.js, 5 Kategorien, 2 Platzhalter | Struktur vollständig, Einträge durch Auftraggeberin | `audit(03): linkliste rechtsberatung` |

### Bewusst offen (Validierungs-Vorbehalt)

| # | Was offen ist | Warum | Nächster Schritt |
|---|--------------|-------|-----------------|
| J1, J2, J3 | Fragwürdige Stellen im bestehenden Content | Brauchen juristische Prüfung | `qa/audit-03-juristische-validierung.md` → PUK-Rechtsberatung |
| L1, L2, L3, L4 | Inhaltliche Stubs ohne ausformulierten Text | Rechtliche Erklärtexte für Eltern dürfen nicht von LLM formuliert werden | Nach juristischer Validierung: Stubs durch validierten Inhalt ersetzen |
| Linkliste Einträge | Nur 2 Platzhalter, keine kuratierte Liste | Vertrauenssignal darf nicht aus Web-Suche kommen | Auftraggeberin stellt Liste zusammen |

---

## Phase 4 -- Verifikation

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | Bestanden |
| `npm run lint` | Bestanden |
| `npm run test:e2e` | Nicht lokal ausführbar (vorbestehendes CI-Problem, kein Regressionsfehler) |
| Visuelle Regression | LegalDisclaimer-Komponente rendert an 4 Stellen korrekt. Alle anderen Templates unverändert. |
| Bericht vollständig | Ja: Vollinventur (Phase 1), Diagnose und Massnahmenkatalog (Phase 2), Umsetzung (Phase 3), Verifikation (Phase 4) |

### Deliverables

1. `qa/audit-03-kesb-sensibilitaet.md` -- Vollständiger Bericht (4 Phasen)
2. `qa/audit-03-juristische-validierung.md` -- Übergabe-Dokument für PUK-Rechtsberatung (J1-J3, L1-L3)
3. `src/components/ui/LegalDisclaimer.jsx` -- Neue Disclaimer-Komponente
4. 5 Stubs in `toolboxContent.js` und `glossaryContent.js` (L1-L5)
5. 5 Reformulierungen in 4 Dateien (R1-R5)
6. Linkliste-Datenstruktur in `networkContent.js`
7. Branch `audit/03-kesb-sensibilitaet` mit 7 Commits

---

*Audit 03 abgeschlossen.*
