# Visuelle QA – Welle 1

## Gegenstand und Vorgehen

Für die visuelle Qualitätssicherung der umgesetzten **Welle 1** wurde die laufende Anwendung über mehrere responsive Breiten geprüft. Bewertet wurden insbesondere die neue Token-Basis, die globale visuelle Ruhe, die Panel- und Kartenlogik sowie der refactorte **Header als Pilot-Screen**. Die Prüfung erfolgte anhand lokal erzeugter Screenshots für **375px**, **768px**, **1024px**, **1280px** und **1440px** sowie anhand der zugehörigen Layout-Metriken.

## Zusammenfassung

Die Welle-1-Umsetzung ist insgesamt **visuell tragfähig**. Die Seite bleibt über alle geprüften Breiten ohne horizontales Overflow stabil, und die neue gestalterische Richtung mit warmen Oberflächen, weichen Panel-Kanten und ruhiger Editorial-Hierarchie trägt sowohl mobil als auch auf großen Screens. Der klar wichtigste Befund betrifft nicht die Inhaltssektionen, sondern den **Header im Übergang zwischen Tablet und Desktop**, insbesondere um **1024px**.

| Bereich | Status | Einschätzung |
|---|---|---|
| 375px Mobile | Pass mit Beobachtung | Inhalt bleibt einspaltig, sauber lesbar und ohne horizontale Überbreite. |
| 768px Tablet | Pass mit Beobachtung | Header ist stabil, aber rechts noch unausbalanciert und vergleichsweise leer. |
| 1024px Laptop | Fail / kritisch | Header verliert zu viel Orientierungsfunktion; Hauptnavigation ist visuell nicht ausreichend präsent. |
| 1280px Desktop | Pass mit Beobachtung | Header wirkt hochwertig, aber die Marke links gerät in zu enge Nachbarschaft zur Navigation. |
| 1440px Desktop | Pass | Gesamtseite wirkt ruhig, konsistent und formal sehr stimmig. |

## Detaillierte Befunde

### 1. Mobile 375px

Die mobile 375px-Ansicht besteht die zentrale Gate-Prüfung. Der Content bricht sauber in eine Einspalten-Logik um, Karten und Panels bleiben lesbar, und die neue Welle-1-Oberflächenästhetik bleibt auch auf kleiner Breite konsistent. Die gemessene Dokumentbreite entspricht der Viewport-Breite; **horizontaler Overflow wurde nicht festgestellt**.

Der mobile Header wirkt formal kompakt und ruhig. Die separate Dokumentation des geöffneten Menüzustands zeigt, dass die mobile Navigation grundsätzlich gerendert wird. Für eine vollständige visuelle Freigabe wäre dennoch sinnvoll, den geöffneten Zustand nochmals gezielt mit vollständig sichtbarem Dialogkopf und allen Header-Aktionen zu capturen, da der erzeugte Panel-Screenshot den Zustand nur ausschnittweise dokumentiert.

### 2. Tablet 768px

Bei 768px bleibt der Header stabil und vermeidet Überfüllung. Der Markenblock links ist klar lesbar, und die reduzierte Steuerlogik auf dieser Breite verhindert visuelle Hektik. Gleichzeitig entsteht rechts innerhalb der Header-Hülle relativ viel Leerraum. Das ist kein Defekt, aber ein Hinweis darauf, dass die Zwischenbreite noch nicht optimal balanciert ist.

### 3. Laptop 1024px

Der kritischste Befund liegt bei 1024px. Während die **Inhaltssektionen** weiterhin sauber skalieren und die Gesamtseite geordnet bleibt, wirkt der Header an dieser Schwelle funktional unterinformiert. Im Screenshot ist nahezu nur die Marke klar präsent; eine gleichwertig sichtbare Hauptnavigation oder ein deutlicher Menü-Trigger prägt den Zustand nicht ausreichend. Damit entsteht ein Bruch in der Orientierungsqualität genau an einer häufigen Laptop-Breite.

Dieser Punkt ist wichtig, weil er zeigt, dass der Pilot-Header zwar an den Enden des Spektrums stärker funktioniert, aber im Übergangsbereich noch keine robuste Zwischenlösung besitzt.

### 4. Desktop 1280px

Bei 1280px wirkt der Header gestalterisch überzeugend. Die Pill-Navigation, der warme Tonwert und die Notfall-Aktion am rechten Rand vermitteln Professionalität und Ruhe. Gleichzeitig rückt die Navigation visuell relativ nah an die Markenzeile links. Die Marke ist noch lesbar, aber ihre Subline wird in dieser Konfiguration räumlich etwas bedrängt. Das ist eher ein **Spacing- als ein Strukturproblem**.

### 5. Desktop 1440px

Die 1440px-Vollansicht bestätigt die Stärke der neuen Systembasis. Die gesamte Startseite wirkt ruhig, gleichmäßig und editorial. Sektionen, Karten, Hero und Footer bleiben sauber im Raster, ohne sichtbare Kantenbrüche oder Überdehnung. Die Welle-1-Tokens tragen die Seite auf großer Breite konsistent.

## Metrische Prüfung

| Breakpoint | Horizontaler Overflow | Header-Höhe |
|---|---:|---:|
| 375px | nein | 89px |
| 768px | nein | 89px |
| 1024px | nein | 89px |
| 1280px | nein | 90.19px |
| 1440px | nein | 90.19px |

Die Layout-Metriken stützen den visuellen Eindruck: Die Seite ist technisch stabil und produziert auf den geprüften Breiten **keine horizontale Überbreite**. Das Problem bei 1024px ist daher kein Overflow-Fehler, sondern ein **Informations- und Zustandsproblem des Headers**.

## Priorisierte Empfehlungen

| Priorität | Empfehlung | Begründung |
|---|---|---|
| Hoch | Breakpoint-Logik des Headers um 1024px nachschärfen | Die Laptop-Schwelle ist aktuell der schwächste Zustand des Pilot-Headers. |
| Hoch | Definieren, ob 1024px noch als Mobile-/Dialog-Navigation oder schon als Desktop-Navigation behandelt wird | Der Zwischenzustand ist derzeit visuell nicht eindeutig genug. |
| Mittel | Linken Markenbereich und Hauptnavigation bei 1280px stärker entkoppeln | Verhindert visuelle Bedrängung der Subline und stärkt die Hierarchie. |
| Mittel | Tablet-Zustand rechts räumlich präziser ausbalancieren | Verbessert die Proportion der Header-Hülle bei 768px. |
| Niedrig | Mobile Menü-Dokumentation mit vollständigem Overlay-Zustand wiederholen | Dient der sauberen Abschlussdokumentation, nicht primär einem Bugfix. |

## Empfohlener nächster Umsetzungsschritt

Als sinnvollster nächster Schritt empfiehlt sich ein **gezielter Header-Nachschliff für die Schwelle 960–1120px**. Praktisch bedeutet das, dass für diesen Bereich eine eindeutige responsive Entscheidung getroffen werden sollte: entweder ein klarer kompakter Menüzustand mit sichtbarem Trigger und starker Priorisierung der Krisenaktion, oder eine bereits voll tragfähige Desktop-Navigation mit großzügigerer Marken-/Nav-Abstimmung. Erst danach lohnt sich die Übertragung des Header-Musters auf weitere Screens.

## Artefakte

Die wichtigsten QA-Artefakte liegen im Projekt unter `qa-artifacts/` vor. Besonders relevant für die Freigabe sind die Vollseiten- und Header-Screenshots der Breakpoints **375**, **1024**, **1280** und **1440**.
