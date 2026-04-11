# Ausführliches Design-Verifikationsaudit – Relational Recovery

**Autor:** Manus AI  
**Datum:** 2026-04-11  
**Prüfgegenstand:** Live-System unter [eltern-a.netlify.app](https://eltern-a.netlify.app/#home) sowie die zugehörige Frontend-Implementierung im Projektstand `rr_umlaut_docs_20260410` [1] [2]

## Executive Summary

Das Audit zeigt einen **kritischen Widerspruch zwischen Design-Anspruch und tatsächlicher Produktverfügbarkeit**. Auf konzeptioneller Ebene ist das Frontend klar an eine ruhige, editoriale und fürsorgliche Systemlogik angenähert. Die Referenz fordert ein Frontend, das **ruhig, menschlich, konsistent, token-basiert, barrierearm und verlässlich** ist [1]. Im aktuellen Live-Zustand scheitert die Anwendung jedoch bereits an einem fundamentalen Qualitätskriterium: **Direkte Hash-Aufrufe können in einen vollständig leeren Root-Zustand führen**, bei dem weder Header noch Main noch Footer sichtbar rendern [2] [3].

Damit ist die zentrale Verifikationsaussage dieses Audits eindeutig. Die größte aktuelle Design-Abweichung liegt **nicht** in einer verbleibenden ästhetischen Restdrift einzelner Karten, Buttons oder Sektionsflächen, sondern in einer **fehlenden Robustheit des Initial-Renderings**. Ein Frontend, das beim direkten Aufruf zentraler Routen seine Shell verliert, verletzt das Referenzprinzip **„Verlässlichkeit vor Überraschung“** unmittelbar [1].

| Dimension | Ziel laut Referenz | Beobachteter Ist-Zustand | Auditurteil |
|---|---|---|---|
| Grundhaltung | Ruhig, menschlich, fürsorglich, scanbar [1] | Im zuletzt beobachtbaren funktionierenden Zustand grundsätzlich angenähert; im Direktaufruf jedoch visuell komplett leer [2] [3] | **Kritisch verfehlt** |
| Verlässlichkeit | Seitenübergreifend konsistente Patterns und robuste Orientierung [1] | Mehrere Routen rendern beim Direktaufruf gar nicht | **Kritisch verfehlt** |
| Accessibility-Basis | Skip-Link, Fokusführung, semantische Shell, kritische Pfade zuverlässig verfügbar [1] | Bei leerem Root existieren die relevanten Shell-Elemente im DOM nicht | **Kritisch verfehlt** |
| Design-System-Disziplin | Tokens, zentrale Varianten, konsistente Komponentenlogik [1] | Im Code weitgehend vorhanden, live aber durch Render-Ausfall nicht belastbar verifizierbar | **Teilweise erfüllt, operativ blockiert** |
| Kritische Pfade | Sofort nutzbar, klar priorisiert, ohne Irritation [1] | Toolbox als Kernpfad zeitweise bzw. reproduzierbar blank | **Kritisch verfehlt** |

## Auditgrundlage und Methode

Das Audit kombiniert drei Perspektiven. Erstens wurde die produktive Oberfläche direkt im Browser entlang mehrerer Hash-Routen geprüft. Zweitens wurden zentrale Shell-, App- und Routing-Dateien des Frontends gelesen, um die Live-Befunde gegen die tatsächliche Render- und Tab-Logik zu verifizieren. Drittens wurden die Beobachtungen explizit gegen die universellen Frontend-Gestaltungsrichtlinien gespiegelt, deren Kernaussage in den drei Leitprinzipien **„Ruhe vor Wirkung“**, **„Menschlichkeit vor Neutralität“** und **„Verlässlichkeit vor Überraschung“** besteht [1] [2].

> Die Referenz versteht gutes Frontend nicht als Dekoration, sondern als Verantwortung gegenüber begrenzter Aufmerksamkeit und fordert eine Gestaltung, die Menschen in wenigen Sekunden orientiert, statt sie zusätzlich zu belasten. [1]

Für die technische Einordnung wurden zusätzlich DOM- und Ressourcenbefunde aus dem laufenden Browserzustand ausgewertet. Dadurch konnte zwischen einem bloßen Stylingproblem und einem tatsächlichen Initial-Render-Ausfall unterschieden werden [3] [4].

## Referenzrahmen für die Bewertung

Die Design-Referenz formuliert kein rein visuelles Stylesheet, sondern ein **prinzipienbasiertes Qualitätsmodell**. Daraus ergeben sich für dieses Audit fünf verbindliche Prüfkriterien.

| Prüfkriterium | Referenzerwartung | Bedeutung für dieses Produkt |
|---|---|---|
| Ruhe vor Wirkung | Niedrige Reizdichte, klare Hierarchie, keine konkurrierenden Signale [1] | Besonders wichtig in psychoedukativen und potenziell belasteten Nutzungssituationen |
| Menschlichkeit vor Neutralität | Warme, fürsorgliche, nicht sterile Editorial-Sprache [1] | Zentrale Vertrauensbasis für Eltern, Angehörige und Fachpersonen |
| Verlässlichkeit vor Überraschung | Gleiches Pattern-Verhalten auf allen Routen [1] | Kernbedingung für Navigation, Rückkehrbarkeit und Krisenpfade |
| Barrierefreiheit als Standard | Fokusmanagement, semantische Struktur, erreichbare Interaktion [1] | Unverzichtbar bei Stress, Müdigkeit, mobilen Kontexten und kognitiver Last |
| Kritische Pfade priorisieren | Notfall-, Schutz- und Handlungsinformationen müssen stabil erreichbar sein [1] | Toolbox und Notfallzugänge sind nicht nur Features, sondern Sicherheitsfunktionen |

## Systemischer Hauptbefund

Im aktuellen Live-System führt der Direktaufruf mehrerer Hash-Routen – darunter `#toolbox`, `#grundlagen`, `#elearning` und `#zaesur` – zu einer vollständig leeren, hell-beigen Ansicht ohne sichtbare interaktive Elemente. Eine direkte DOM-Auslesung auf einer betroffenen Route zeigt, dass der `#root`-Knoten existiert, aber **keine gerenderten Kinder** enthält. Zugleich fehlen `header`, `main` und `footer` vollständig im DOM [2] [3].

Noch bedeutsamer ist die technische Einordnung dieses Befunds. Die Produktseite liefert weiterhin regulär den statischen Einstiegspunkt mit `div id="root"`, lädt das Hauptskript, das Stylesheet sowie zusätzliche JavaScript-Chunks, und behält den Dokumenttitel bei [3] [4]. Der Fehler liegt damit nicht primär im CDN, in fehlenden Assets oder in bloßem CSS-Verstecken, sondern sehr wahrscheinlich **nach erfolgreichem Asset-Laden in der Initialisierung oder im Renderpfad der App** [3] [4].

| Beobachtung | Evidenz | Design-Relevanz |
|---|---|---|
| Blanke Ansicht auf mehreren Direkt-Hash-Routen | Live-Browser-Audit [2] | Fehlende Orientierung und fehlende Nutzbarkeit |
| Kein sichtbarer Header/Footer/Main | DOM-Auslesung [3] | Ausfall der gesamten App-Shell, nicht nur einzelner Templates |
| `#root` vorhanden, aber leer | DOM-Auslesung [3] | Wahrscheinlicher Render-Abbruch statt Layoutfehler |
| Skripte und Styles werden geladen | HTML-/Ressourcenprüfung [4] | Problem liegt tiefer als reine Asset-Auslieferung |

## Soll-Ist-Audit nach Bewertungsdimensionen

### 1. Orientierung und Shell-Verlässlichkeit

Die Referenz verlangt eine verlässliche, wiedererkennbare Shell. Im Code ist diese Absicht klar erkennbar: `App.jsx` rendert einen persistenten Header, eine Notfallleiste, den Main-Bereich und einen Footer grundsätzlich ausserhalb der tab-spezifischen Inhaltsblöcke [2]. Genau deshalb ist der Live-Befund so schwerwiegend. Wenn diese Elemente bei Direktaufruf vollständig fehlen, ist nicht bloß ein Inhaltsbereich gestört, sondern die **gesamte Orientierungsstruktur**.

| Soll | Ist | Bewertung |
|---|---|---|
| Persistente Shell auf jeder Route [1] | Shell fällt bei Direktaufruf komplett aus [2] [3] | **Kritisch** |
| Wiedererkennbare Navigation | Keine sichtbare Navigation auf betroffenen Routen | **Kritisch** |
| Rückkehrbarkeit und Lagegefühl | Nutzerinnen und Nutzer erhalten keine sichtbaren Wegweiser | **Kritisch** |

### 2. Kritische Pfade und Sicherheitslogik

Für dieses Produkt sind die Pfade zu Krise, Schutz, Priorisierung und nächsten Schritten keine Nebenthemen, sondern zentrale Nutzungsziele. In `App.jsx` ist die Toolbox explizit mit Prioritätsfokus, Krisenzugang und Schutzreferenzen verdrahtet [2]. Wenn ausgerechnet dieser Bereich auf Live-Direktaufruf leer bleibt, widerspricht das direkt der referenzierten Forderung, kritische Pfade besonders robust und erwartbar zu gestalten [1].

> Die Referenz verknüpft Gestaltung ausdrücklich mit Risikomanagement und fordert, dass kritische Pfade besonders klar, schnell und konsistent funktionieren. [1]

| Kritischer Pfad | Erwartung | Live-Befund | Auditurteil |
|---|---|---|---|
| Notfallzugang | Sofort erreichbar und klar sichtbar | Auf leerem Root nicht sichtbar | **Kritisch** |
| Toolbox / Triage | Stabiler Kernpfad | Direktaufruf reproduzierbar blank [2] | **Kritisch** |
| Grundlagen / Orientierung | Verlässliche Einordnung | Direktaufruf reproduzierbar blank [2] | **Kritisch** |
| Lernmodule / Vertiefung | Konsistenter Zweitpfad | Direktaufruf reproduzierbar blank [2] | **Kritisch** |

### 3. Menschlichkeit und Editorial-Sprache

Soweit die Anwendung im funktionierenden Zustand sichtbar war, zeigte die Oberfläche eine grundsätzlich passende Richtung: warme Flächen, zurückhaltende Kontraste, eine editoriale Grundstruktur und eine eher entlastende statt druckvolle Tonalität. Diese Qualitäten passen gut zum Zielbild der Referenz [1] [2]. Im Audit müssen sie jedoch sekundär behandelt werden, weil die verlässlich sichtbare Produktoberfläche aktuell nicht stabil reproduzierbar ist.

Die wichtigste Aussage in dieser Dimension lautet daher: **Die emotionale und visuelle Grundhaltung ist konzeptionell plausibel, operativ aber durch den Render-Ausfall entwertet.** Ein menschlich gestaltetes System verliert seinen Vertrauenseffekt, wenn es im entscheidenden Moment leer bleibt.

| Dimension | Tendenz | Einschränkung |
|---|---|---|
| Farb- und Flächenwirkung | Grundsätzlich warm und low-arousal | Live nicht stabil genug sichtbar für Vollabnahme |
| Editoriale Komposition | Im beobachtbaren Home-Zustand plausibel | Direktaufruf derzeit nicht robust |
| Tonalität und Care-Kontext | Grundsätzlich passend | Durch technische Unzuverlässigkeit geschwächt |

### 4. Barrierefreiheit und Interaktionssicherheit

Die Referenz versteht Barrierefreiheit als integrierten Qualitätsmaßstab und nennt ausdrücklich semantisches HTML, Skip-Links, Fokusindikatoren und Fokusmanagement nach dynamischen DOM-Updates als zentrale Anforderungen [1]. Im Code ist diese Absicht erkennbar: `App.jsx` enthält Skip-Link, Fokuslogik, Hash-Synchronisierung und mobile Fokussteuerung [2]. Im Live-Blankzustand können diese Mechanismen jedoch nicht greifen, weil die App-Shell überhaupt nicht gerendert wird.

| Accessibility-Aspekt | Code-Absicht | Live-Status | Bewertung |
|---|---|---|---|
| Skip-Link | Vorhanden in `App.jsx` [2] | Bei leerem Root nicht nutzbar | **Kritisch** |
| Fokusführung beim Tabwechsel | Implementiert [2] | Bei leerem Root faktisch wirkungslos | **Kritisch** |
| Semantische Hauptbereiche | Im JSX vorhanden [2] | Auf betroffenen Routen nicht im DOM | **Kritisch** |
| Kognitive Entlastung | Referenzkonform beabsichtigt [1] | Leere Seite erzeugt maximale Desorientierung | **Kritisch** |

### 5. Design-System-Disziplin und Wartbarkeit

Im Quellcode ist eine systematische Tab- und Shell-Architektur sichtbar. `TAB_ITEMS` definieren die kanonischen Routen, `normalizeHashToTab()` validiert eingehende Hashes gegen diese IDs, und `App.jsx` weist jeder Route eine konkrete Section-Komponente zu [2] [5]. Aus reiner Architekturperspektive wirkt diese Logik plausibel. Dass der Live-Zustand trotzdem in einen leeren Root kippt, deutet darauf hin, dass die Design-System-Disziplin **im Codeansatz vorhanden**, die **Release- oder Initialisierungssicherheit** jedoch unzureichend abgesichert ist.

| Design-System-Aspekt | Befund | Bewertung |
|---|---|---|
| Kanonische Routenliste | Vorhanden in `TAB_ITEMS` [5] | Positiv |
| Hash-Normalisierung | Vorhanden in `normalizeHashToTab()` [2] | Positiv |
| Persistente Shell-Komposition | Vorhanden in `App.jsx` [2] | Positiv im Code, negativ im Live-Verhalten |
| Release-Robustheit | Direktaufruf kann Root leeren | **Kritische Lücke** |

## Wahrscheinliche Problemklasse

Auf Basis des Audits ist die wahrscheinlichste Problemklasse **ein Initialisierungs- oder Render-Abbruch nach erfolgreichem Laden der Assets**. Dafür sprechen vier Indizien gleichzeitig: Erstens bleiben HTML-Einstiegspunkt und Dokumenttitel vorhanden. Zweitens werden JavaScript und CSS regulär geladen. Drittens ist `#root` im DOM vorhanden, aber leer. Viertens fehlen sogar die eigentlich persistenten Shell-Elemente, obwohl sie in `App.jsx` außerhalb der tab-spezifischen Inhalte definiert sind [2] [3] [4].

Dieses Muster passt deutlich eher zu einem frühen Fehler in der App-Initialisierung oder in einem globalen Laufzeitpfad als zu einer rein lokalen Template-Abweichung. Für das Design-Audit ist das wichtig, weil die Abhilfe nicht mit kosmetischen Anpassungen verwechselt werden darf. **Der nächste notwendige Schritt ist eine Stabilisierung des Renderpfads, nicht ein weiterer rein visueller Feinschliff.**

## Priorisierte Befunde

| Priorität | Befund | Schwere | Warum es zuerst relevant ist |
|---|---|---|---|
| P0 | Direktaufrufe können die gesamte App in einen leeren Root-Zustand versetzen | Blocker | Ohne stabile Shell ist keine verlässliche Nutzung möglich |
| P0 | Kritische Pfade wie Toolbox/Notfall sind dadurch nicht zuverlässig erreichbar | Blocker | Sicherheits- und Schutzfunktion des Produkts wird unterlaufen |
| P1 | Accessibility-Mechanismen sind im Blankzustand faktisch ausser Kraft | Hoch | Skip-Link, Fokusführung und Struktur sind nicht nutzbar |
| P1 | Design-Qualität der Sektionen ist live nicht belastbar prüfbar | Hoch | Visuelle Abnahme ist solange methodisch eingeschränkt |
| P2 | Editoriale Qualitäten sind vorhanden, aber operativ derzeit zweitrangig | Mittel | Erst nach Stabilisierung sinnvoll weiterzuprüfen |

## Empfohlene Korrekturmassnahmen

Die Maßnahmen sollten bewusst in zwei Ebenen getrennt werden: zuerst **Stabilität**, danach **Feinverifikation der Gestaltung**.

| Reihenfolge | Maßnahme | Ziel |
|---|---|---|
| 1 | Direktaufruf aller Hash-Routen reproduzierbar lokal und live debuggen | Exakte Ursache des leeren Roots isolieren |
| 2 | Initialisierungs- und Renderpfad von `App.jsx` instrumentieren | Frühen Render-Abbruch sichtbar machen |
| 3 | Release-Gate definieren: jede Haupt-Route per Direktlink prüfen | Verlässlichkeit vor nächstem visuellen Rollout absichern |
| 4 | Nach Stabilisierung vollständiges visuelles Sektionen-Audit erneut durchführen | Tatsächliche Restdrift pro Route seriös bewerten |
| 5 | Accessibility-Gate für Hash-Navigation und Fokusführung ergänzen | Referenzkonforme Zugänglichkeit belastbar machen |

## Schlussurteil

Das aktuelle Frontend zeigt auf Systemebene eine ernsthafte Verifikationslücke. Die gestalterische Richtung ist grundsätzlich anschlussfähig an die Referenz, aber die **Design-Qualität kann nicht als bestanden gelten**, solange die Anwendung bei Direktaufruf ihrer Kernrouten in einen leeren Root-Zustand fällt. In einem psychoedukativen Care-Kontext ist das nicht nur ein technischer Bug, sondern eine **verletzte Vertrauens- und Orientierungszusage**.

> Das Auditurteil lautet daher: **Design-Richtung teilweise stimmig, Produktverhalten aktuell nicht abnahmefähig.** Die Freigabe weiterer Designfeinheit sollte bis zur Stabilisierung des Initial-Renderings nachrangig behandelt werden. 

## Referenzen

[1]: file:///home/ubuntu/upload/AnalysederDesign-Referenz_UniverselleFrontend-Gestaltungsrichtlinien.md "Analyse der Design-Referenz: Universelle Frontend-Gestaltungsrichtlinien"
[2]: file:///home/ubuntu/rr_umlaut_docs_20260410/src/App.jsx "App.jsx – zentrale Shell-, Routing- und Renderlogik"
[3]: file:///home/ubuntu/rr_umlaut_docs_20260410/docs/design-system/design-verifikationsaudit-2026-04-11.md "Arbeitsnotiz zum Live-Audit und zur DOM-Diagnose"
[4]: file:///home/ubuntu/browser_html/eltern-a_netlify_app_page_1775862798111.html "Gespeichertes HTML der blanken Live-Startseite"
[5]: file:///home/ubuntu/rr_umlaut_docs_20260410/src/data/appShellContent.js "App-Shell-Inhaltsmodell und kanonische Tab-Definitionen"
