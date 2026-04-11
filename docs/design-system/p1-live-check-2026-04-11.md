## Zwischenstand Accessibility-Basis

Auf `https://eltern-a.netlify.app/#home` renderte die Live-App mit vollständiger Shell. Der Skip-Link "Zum Inhalt springen" war im sichtbaren DOM vorhanden, ebenso die Hauptnavigation, der Notfallzugang und die inhaltliche Startseitenstruktur. Der Klick auf den Skip-Link führte nicht zu einem Blankzustand oder offensichtlichen Renderfehler; die Shell blieb stabil sichtbar. Damit ist der frühere P1-Befund "Accessibility-Mechanismen im Blankzustand faktisch ausser Kraft" im aktuell geprüften Live-Zustand zumindest auf der Ebene der vorhandenen Shell und des sichtbaren Skip-Links nicht reproduzierbar.

Die DOM-Prüfung auf der Live-Startseite bestätigte zusätzlich, dass der sichtbare Skip-Link auf `#main-content` verweist und ein `MAIN`-Element mit `id="main-content"` vorhanden ist. Nach der Interaktion lag der aktive Fokus auf der Hauptüberschrift der Seite. Das spricht dafür, dass die grundlegende Fokusführung im aktuell geprüften Zustand nicht nur sichtbar angelegt, sondern funktional anschlussfähig ist.

Auch die Toolbox (`#toolbox`) renderte live mit vollständig sichtbarer Gestaltung, operativen Buttons, Assessment-Block und inhaltlicher Sektion. Damit ist der frühere P1-Befund "Design-Qualität live nicht belastbar prüfbar" im Sinne der grundsätzlichen visuellen Prüf- und Sichtbarkeit für die aktuell geprüften Kernseiten nicht mehr reproduzierbar.

Vorbehalt: Diese Aussage ersetzt noch keinen vollständigen P1-Abschluss über alle denkbaren Detailfälle, insbesondere nicht auf realem iPhone-Gerät oder für einen umfassenden Keyboard-/Screenreader-End-to-End-Test.

## End-to-End-Nachprüfung: iPhone, Tastatur, Screenreader-nahe Heuristik

Für die Live-App wurde eine zusätzliche End-to-End-Prüfung mit iPhone-13-Viewport-Emulation, Tastaturnavigation und browserseitigem Accessibility-Tree durchgeführt. Die mobile Kernfunktion wirkte in dieser Prüfung stabil: Startseite und Toolbox renderten im schmalen Viewport, die Toolbox zeigte Hero, Assessment, Notfallsprünge und den Print-Call-to-Action, und die nativen `details/summary`-Elemente liessen sich im mobilen Durchlauf öffnen.

Gleichzeitig ergaben sich **relevante Restbefunde im Accessibility-Bereich**, die gegen einen vollständig bestätigten P1-Abschluss sprechen. In der Tastaturprüfung landete der erste `Tab` auf der Startseite nicht verlässlich auf dem sichtbaren Skip-Link, sondern auf einem anderen interaktiven Element ("Falllogik trainieren"). Entsprechend führte die unmittelbare Aktivierung nicht in den Hauptinhalt, sondern auf `#elearning`. Auch im Toolbox-Pfad erreichte die sequenzielle Tastaturnavigation innerhalb des geprüften Durchlaufs die primären Aktionen wie "Arbeitsansicht drucken" und "Krisenplan herunterladen" nicht robust innerhalb eines klaren, linearen Fokuspfads.

Die Screenreader-nahe Heuristik über den Chromium-Accessibility-Tree bestätigte zwar auf der Startseite `main`, `navigation`, den benannten Skip-Link und die Hauptüberschrift, zeigte in der Toolbox aber kein gleichwertig klares Ergebnis für die zentrale Hero-Überschrift und den Print-Call-to-Action. Das ist noch **kein endgültiger VoiceOver-Nachweis eines Produktionsfehlers**, aber ausreichend, um den P1-Status derzeit **nicht vorbehaltlos als vollständig behoben** zu bestätigen.

Die detaillierte maschinelle Auswertung liegt zusätzlich in `tmp/p1-e2e-artifacts/summary.md` und `tmp/p1-e2e-artifacts/results.json`, ergänzt um Screenshots der mobilen Prüfpfade.
