# Visuelle QA – Arbeitsnotizen

## Mobile 375 – erste Sichtung

Die 375px-Gesamtansicht wirkt insgesamt stabil und zeigt **keine offensichtliche horizontale Überbreite**. Die Karten folgen einer sauberen Einspalten-Logik, und die Hero-Fläche bricht ohne harte Kanten oder abgeschnittene Inhalte um.

Auffällig ist jedoch, dass die gespeicherte Menü-Ansicht visuell praktisch identisch zur normalen mobilen Gesamtansicht erscheint. Das deutet darauf hin, dass entweder das Overlay im Full-Page-Screenshot nicht sichtbar mit erfasst wurde oder das Öffnen des Menüs im Capture-Prozess nicht zuverlässig dokumentiert wurde. Dieser Punkt muss in einer Folgesichtung mit separatem Panel-Screenshot validiert werden.

Positiv fällt auf, dass die Start-Hero auch mobil die neue warme Token-Logik, die weicheren Panels und die reduzierte visuelle Lautstärke konsistent transportiert. Kritisch zu prüfen bleiben im nächsten Schritt die tatsächliche Header-Höhe, die mobile Menü-Komposition und die Lesbarkeit der sehr langen Seite bei Zwischenbreiten.

## Mobile 375 – Menüpanel

Der separate Menü-Panel-Screenshot zeigt, dass die mobile Navigation grundsätzlich gerendert wird. Sichtbar sind mehrere Navigationspunkte in einer ruhigen, gut lesbaren vertikalen Liste. Gleichzeitig wirkt der Ausschnitt **unvollständig**: Oberer Dialogkopf, Schliessen-Aktion und die Notfall-/Reset-Aktionen sind im finalen Bild nicht sauber mit erfasst. Für die QA bedeutet das, dass die mobile Menülogik funktional vorhanden ist, die visuelle Dokumentation des geöffneten Zustands aber noch nicht vollständig genug für eine Abschlussfreigabe ist.

## Desktop 1280 – Header

Der Header wirkt bei 1280px insgesamt **kompakt, hochwertig und klar hierarchisiert**. Die neue Pill-Navigation trägt die warme Editorial-Anmutung, und der Notfall-CTA sitzt visuell nachvollziehbar am rechten Rand. Gleichzeitig fällt auf, dass die Markenzeile links sehr eng neben die Navigation rückt und der Subline-Text unter dem Logo teilweise von der Navigation überlagert beziehungsweise visuell bedrängt wird. Das ist kein harter Layoutbruch, aber ein relevanter **Spacing- und Priorisierungsbefund** für den Pilot-Header.

## Tablet 768 – Header-Zwischenzustand

Bei 768px ist der Header klar in einen kompakten Markenblock links und einen reduzierten Steuerbereich rechts getrennt. Diese Schwelle wirkt grundsätzlich kontrolliert und vermeidet Überfüllung. Allerdings bleibt rechts eine große leere Fläche innerhalb der Header-Hülle bestehen, was darauf hindeutet, dass die Container-Logik in diesem Bereich zwar stabil, aber noch nicht optimal ausbalanciert ist.

## Laptop 1024 – Header-Schwelle

Bei 1024px kippt der Header in einen Zustand, in dem fast ausschließlich die Marke sichtbar bleibt. Die primäre Navigation ist in diesem Screenshot nicht präsent, wodurch die Leiste zwar formal sauber, aber **funktional unterinformiert** wirkt. Für eine visuelle QA ist das der stärkste Breakpoint-Befund: Zwischen Tablet und vollem Desktop fehlt offenbar eine klar lesbare Zwischenlösung mit sichtbarer Hauptnavigation oder eindeutigem Menü-Trigger.

## Desktop 1440 – Gesamtseite

Die Vollseite bei 1440px bestätigt eine **ruhige, editoriale Gesamtwirkung**. Panels, Karten, Weißraum und Farbgewichtung erscheinen konsistent. Besonders positiv ist, dass die neuen Welle-1-Tokens auf großer Breite nicht in sterile Leere kippen, sondern weiterhin zusammenhängend wirken. Es zeigen sich keine horizontalen Brüche, keine aus dem Raster fallenden Karten und keine unruhigen Farbsprünge.

## Laptop 1024 – Gesamtseite

Die Gesamtseite bleibt bei 1024px ebenfalls strukturell stabil. Der Hauptinhalt selbst skaliert sauber; Karten und Sektionen bleiben lesbar und wirken nicht gequetscht. Im Vergleich zur Desktop-Ansicht verschiebt sich das Hauptproblem klar in den Headerbereich: Die Inhaltsflächen tragen die Zwischenbreite gut, der Header jedoch verliert hier zu viel Orientierungskraft. Damit ist der zentrale QA-Befund kein generelles Responsivitätsproblem des Seitentyps, sondern eine **spezifische Breakpoint-Schwäche des Header-Piloten**.

## Toolbox-Migration – erste Nachsichtung

### Laptop 1024 – Gesamtseite

Die migrierte Toolbox wirkt bei 1024px deutlich systemischer als zuvor. Die Hero-Zone, Score-Karten und nachgelagerten Inhaltscluster folgen nun einer einheitlichen Oberflächen- und Abstandslogik. In der Vollseitenansicht zeigt sich **kein offensichtlicher horizontaler Overflow**; die Seite bleibt in der Zwischenbreite lang, aber kontrolliert und lesbar.

### Mobile 375 – Gesamtseite

Auch mobil bleibt die Toolbox nach der Migration stabil. Die Einspalten-Logik funktioniert, die Kartenradien und Abstände wirken konsistent, und es ist **keine offensichtliche Regression** gegenüber dem bisherigen mobilen Zustand sichtbar. Der Hauptbefund ist eher die erwartbar hohe Seitenlänge als ein konkreter visueller Bruch.

### Desktop 1280 – Gesamtseite

Bei 1280px wirkt die migrierte Toolbox klar, ruhig und editorial ausbalanciert. Besonders positiv ist, dass Hero, Score-Karten und die nachgelagerten Inhaltsblöcke nun wie Teile eines gemeinsamen Systems erscheinen statt wie lose Einzelmodule. Die Oberflächenhierarchie ist gut lesbar; harte Stilbrüche fallen in dieser Breite nicht auf.

### Tablet 768 – Gesamtseite

Bei 768px bleibt die Struktur ebenfalls stabil. Der Seitentyp wechselt sauber in eine kompaktere, aber weiterhin verständliche Rasterlogik. Visuell verdichtet sich die Seite deutlich, ohne dass einzelne Blöcke auseinanderfallen oder abgeschnitten wirken. Der zentrale Eindruck ist daher: **Die Toolbox-Migration trägt nicht nur auf Desktop, sondern auch auf der Zwischenbreite.**
