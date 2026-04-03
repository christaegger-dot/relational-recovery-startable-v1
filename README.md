# Relational Recovery

Interaktive Fachwebsite für die Begleitung von Eltern mit psychischer Belastung.  
Die Anwendung richtet sich visuell und sprachlich an Fachpersonen und verbindet Lernmodule, Vignetten, Toolbox, Evidenz und Netzwerk in einer einzelnen React/Vite-App.

Die Hilfsangebote sind bewusst **zürich-zentriert** angelegt und werden punktuell durch schweizweite Stellen ergänzt, wenn diese für Orientierung, Rechtefragen oder Krisenlogik besonders hilfreich sind. Die Website ist ein ergänzendes psychoedukatives Fachangebot und keine offizielle Unterseite der PUK Zürich.

## Aktueller Stand

- Vite + React 19
- Tailwind CSS 4 via Vite-Plugin
- inhaltlich und visuell auf eine ruhige, professionelle Fachzielgruppe ausgerichtet
- lokale Browser-Persistenz für Lern- und Toolzustände
- Cross-Tab-Synchronisierung per `localStorage` und `BroadcastChannel`
- tab-basiertes Code-Splitting für grössere Bereiche
- Hero-Illustration als reduziertes PNG-Asset im Projekt

## Voraussetzungen

- Node.js 20 oder neuer
- npm 10 oder neuer

## Entwicklung

Installation:

```bash
npm install
```

Dev-Server starten:

```bash
npm run dev
```

Produktionsbuild erstellen:

```bash
npm run build
```

Build lokal prüfen:

```bash
npm run preview
```

## Projektstruktur

- `index.html`
  Einstiegspunkt mit `#root`
- `src/main.jsx`
  React-Mounting
- `src/App.jsx`
  App-Shell, Navigation, Hash-Routing, Persistenz, Lazy-Loading
- `src/components/`
  wiederverwendete Shell-Komponenten wie Header und Footer
- `src/sections/`
  Hauptbereiche der Website
- `src/data/`
  inhaltliche Daten, nach Bereich aufgeteilt
- `src/utils/appHelpers.js`
  Persistenz-, Validierungs- und Hilfslogik
- `src/styles/app-global.css`
  globaler CSS-Einstieg mit Tailwind
- `src/assets/`
  versionierte Projekt-Assets, u. a. das Hero-Bild

## Datenstruktur

Die Inhalte liegen nicht mehr in einem grossen Einzelmodul, sondern bereichsbezogen:

- `src/data/appShellContent.js`
  App-Konstanten, Tab-Navigation, Default-State, kleine Summary-Werte für die Startseite
- `src/data/learningContent.js`
  Lernmodule, Vignetten, Assessment-Faktoren
- `src/data/networkContent.js`
  Netzwerkstellen und Filter
- `src/data/toolboxContent.js`
  Krisenhilfe, Sicherheitsplan, Kindesschutz, Rechtefragen
- `src/data/evidenceContent.js`
  Evidenz-, Praxis- und Literaturinhalte
- `src/data/content.js`
  reiner Re-Export der Teilmodule für Kompatibilität

## Architekturhinweise

### Navigation

- Die App verwendet tab-basierte Navigation über `activeTab`
- zusätzlich wird der Zustand mit dem URL-Hash synchronisiert
- Ziel-Headings werden nach Navigation fokussiert, auch bei lazy geladenen Bereichen

### Persistenz

- Zustände werden lokal im Browser gespeichert
- Schreiben nach `localStorage` ist defensiv abgesichert
- wiederhergestellte Daten werden semantisch normalisiert
- flüchtige Eingaben wie die Netzwerksuche werden bewusst nicht persistiert

### Performance

- grössere Sektionen werden per `React.lazy(...)` erst bei Bedarf geladen
- die Startseite nutzt kleine Count-Konstanten statt ganze Bereichsdaten
- Netzwerkdaten werden erst im Netzwerkbereich selbst importiert und gefiltert

## Wichtige Inhalte im UI

- `Start`
  Überblick, Hero, Lernfortschritt, Einstieg in zentrale Bereiche
- `Lernmodule`
  kurze fachliche Lernbausteine mit Reflexionsfrage
- `Training`
  Vignetten mit fachlicher Rückmeldung
- `Toolbox`
  Assessment, Krisenhilfe, Sicherheitsplan, Kindesschutz, Rechte
- `Netzwerk`
  filterbare Fachstellen und Hilfsangebote mit Fokus auf Zürich/Winterthur
- `Evidenz`
  fachliche Einordnung, Praxisbezug und Literatur

## Inhaltliche Linie

- ruhige, professionelle Ansprache für Fachpersonen
- keine emotional überzeichnete Bildsprache
- zürich-zentrierte Hilfelogik mit wenigen schweizweiten Ergänzungen
- Arbeitslogik: `verstehen -> einschätzen -> handeln -> vernetzen`
- Kombination aus Evidenz, Praxisinstrumenten und direkter Nutzbarkeit im Gesprächs- und Versorgungskontext

## Assets und generierte Dateien

- aktive Hero-Datei:
  `src/assets/relational-recovery-hero-v3-web.png`
- grössere Originalversion:
  `src/assets/relational-recovery-hero-v3.png`
- `output/` ist für generierte Zwischenstände reserviert und via `.gitignore` ausgeschlossen

## Bekannte Grenzen

- Es gibt aktuell keine automatisierten Tests.
- Der Fokus liegt auf statischer Fachinformation und lokaler Interaktion, nicht auf Backend-Integration.
- Ein Teil der Lernmodul-Metadaten bleibt bewusst früh verfügbar, weil er für Fortschritt und Zustandsvalidierung benötigt wird.
- Einige Arbeitsmaterialien werden aktuell als einfache `TXT`-Vorlagen bereitgestellt und nicht als gestaltete PDF-Dokumente.
