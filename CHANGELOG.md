# Changelog

Format orientiert an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/).

Daten in `YYYY-MM-DD` (lokale Schweizer Zeit). Sprache: Deutsch (de-CH).

## [Unreleased]

Offene Punkte für nach 1.0.0:

- Custom-Domain für die produktive Site (3 Netlify-Vorschauen aktuell parallel)
- Optionales `package.json`-Metadaten-Set (`description`, `repository`, `homepage`, `license`, `author`) — aktuell nur Pflichtfelder
- HSTS-`preload`-Aktivierung sobald produktive Custom-Domain steht
- Optionale CSP-Definition (bewusst noch nicht in `netlify.toml` — braucht eigene Prüfung wegen React/Vite-Inline-Styles)

## [1.0.0] — 2026-04-19

Initialer öffentlicher Release. Schweizer Fachportal «Eltern im Beratungskontext»
für Fachpersonen, die mit Familien arbeiten, in denen ein Elternteil psychisch
erkrankt ist.

### Hinzugefügt

- Brand-Favicon `public/favicon.svg` mit `EB`-Monogramm in Brand-Farben
- Security-Header in `netlify.toml`: HSTS, X-Content-Type-Options, X-Frame-Options DENY,
  Referrer-Policy, Permissions-Policy ([#59])
- README-Sektion zu E2E-, Lint- und Format-Befehlen ([#59])

### Geändert

- `package.json`: Version 0.1.0 → 1.0.0
- README: Hero-Asset-Referenz auf `.webp` korrigiert ([#59])
- README: stale Aussage «keine automatisierten Tests» ersetzt durch Verweis auf Playwright-Suite ([#59])

### Behoben

- A11y: dekorative `lucide-react`-Icons in Buttons/Links durchgängig mit `aria-hidden="true"`
  versehen (30 Stellen über 6 Templates und `ToolboxSection`) ([#58])
- A11y: toter `index.html`-Verweis auf `/favicon.svg` jetzt mit echtem Asset

### Sicherheit

- Dependencies: `npm audit fix` durchgezogen — keine high/critical mehr.
  `vite` 7.1.4 → 7.3.2, `@playwright/test` 1.52 → 1.59.1, `eslint` 9 → 10.
  `.npmrc`-Workaround `legacy-peer-deps=true` entfernt ([#56])

---

## Vor-Release-Verlauf

Die folgende Übersicht fasst die wichtigsten Etappen zwischen Projektstart
(2026-04-01) und dem aktuellen Pre-Release-Stand zusammen. Pro Etappe
chronologisch von alt nach neu.

### Etappe 1 — Initialer Aufbau (2026-04-01 bis 2026-04-03)

- React 19 + Vite 7 + Tailwind CSS 4 SPA
- Hash-basierte Tab-Navigation, lokale `localStorage`-Persistenz mit Cross-Tab-Sync
- Inhalts-Domänen: Start, Lernmodule, Training (Vignetten), Toolbox, Netzwerk, Evidenz
- Erste Visualisierungen: Toolbox-Triage-Diagramm, Schutzsystem, Familien-Diagramm,
  Netzwerk-Karte, klinische Pfaddiagramme
- Hero-Illustration + Mobile-Layout
- Editoriales Designgrundgerüst, deutschsprachige Mikrokopie

### Etappe 2 — Editorial Design System (2026-04-10 bis 2026-04-11)

- Migration aller Templates und Sektionen auf das `ui-`-Primitivensystem
  (`primitives.css`): Toolbox, Evidenz, Vignetten, Editorial, Grundlagen,
  Learning, Footer, Header, Closing, Glossar, Network
- Warmes editoriales Designsystem als verbindliche Frontend-Richtlinie
- Korrigierte UI-Umlaute, dokumentierte Umlautprüfung
- Initiale Netlify-Asset-Caching-Konfiguration
- Toolbox-isolierte Druckansicht stabilisiert

### Etappe 3 — Code-Qualitäts-Audits, Wave 1 (2026-04-12)

- ESLint 9 + Prettier eingeführt, Dead Code entfernt ([#13])
- DOMPurify-Sanitisierung für `dangerouslySetInnerHTML` ([#11])
- 25 Bug-Fixes über State-Management, A11y, Datenintegrität ([#10])
- 22-Punkte-Codebase-Optimierungs-Pass ([#8])
- E2E-Suite mit Playwright eingeführt (Assessment-Score, Navigation) ([#12])
- `EditorialIntro` und `EditorialIndex` als Shared Components extrahiert ([#9])
- Hash-Routing-Kanonisierung auf deutsche Slugs ([#4])
- WCAG-Verbesserungen über Layouts und Komponenten ([#18])
- Custom Hooks aus `App.jsx` extrahiert: `useMobileMenu`, `useNavigationFocus`,
  `useDownloadHandlers` ([#19])
- Persistenz-State in `AppStateContext` ausgelagert ([#14])
- Security/A11y: Dev-Server gehärtet, Focus-Visibility, Reduced-Motion-Preferences ([#20])
- ErrorBoundary, Asset-Optimierung, StrictMode ([#21])

### Etappe 4 — Inhalts-Audits, Audit-Welle 02–13 (2026-04-12 bis 2026-04-14)

Strukturierte Audits, jeweils mit Inventur → Diagnose → Massnahmen → Verifikation:

- **02** Doppelzielgruppen — `primaryAudience` für alle Templates ([#22])
- **03** KESB-Sensibilität — Bedrohungsmarker, juristische Faktenbasis,
  Stufenfolge Art. 307–310, Beistandschaft, Melderecht, FAQ Rechte der Betroffenen,
  Rechts-Disclaimer ([#23], [#24], [#25])
- **04** Evidenz-Inhalt + Umsetzung — Quellen-Datenstruktur (`sourcesContent.js`),
  Claims belegt, Formulierungen präzisiert ([#26], [#27])
- **05** Vignetten — Reformulierung Vignette 1, Stubs für Vignetten 2 und 3, Rahmentext ([#28])
- **06** Sprache — Nominalstil entzerrt, Anrede `RIGHTS_FAQ` 1–4 auf Ich-Form,
  Fachjargon entschärft, Meta-Texte M1–M14d übersetzt ([#29])
- **07** Glossar — Einträge KESB, Trialog, Parentifizierung, Komorbidität,
  Loyalitätskonflikt, Rollenumkehr, Gefährdungsmeldung, SPF;
  «relationale Recovery» entfernt ([#30])
- **08** Visual Clutter — `aside`-Karten in 9 Templates entfernt, redundante
  Sektion-Actions, Card-in-Card aufgelöst, dekorative Footer-Icons entfernt,
  Dot-Grid abgeschwächt ([#31])
- **09** Frontend-Compliance — 25 neue Design-Tokens, `t3`-Migration,
  Spacing-/Font-Size-Hardcodes auf Tokens, R8/R9/R12/R19/R22 ([#32])
- **10** Routing + SEO — `robots.txt`, `sitemap.xml`, OG-Image-Infrastruktur,
  Per-Route-Meta-Hook, JSON-LD Organization mit Contact-Points,
  Snapshot-basierter Prerender für Start-Route ([#33])
- **11** Print — Basis-Print-CSS mit Notfall-Footer, Vignetten-Print-Hinweis ([#34])
- **12** Wartbarkeit — JSDoc-Typen, konsolidierte Quellen, Glossar-Link-Infrastruktur,
  Base-URL als Single Source of Truth via Env, Content-Pflege-Doku ([#34])
- **13** Release-Readiness Wave 3 — Toolbox-Badge-Kontrast, Brand-Button-`aria-label`,
  Beltz-Leseprobe-404, Emergency-Banner-Touch-Targets, Safe-Note-Close-Touch-Target,
  Toolbox-Printview-`aria-hidden` ([#35])

### Etappe 5 — Netlify-Build-Stabilisierung (2026-04-14 bis 2026-04-15)

- `vite_base_url`-Fallback, Prerender-Timeout/-Health-Check
- Chromium-Cache via `netlify-plugin-cache`
- Basis-URL auf echte Netlify-Site-URL korrigiert
- Prerender entkoppelt von CI (snapshot-basiert statt browser-basiert) ([#36])

### Etappe 6 — UX-Welle Audience + Inhaltsausbau (2026-04-15 bis 2026-04-16)

- Startseite auf zwei Orientierungslogiken reduziert ([#38])
- Training: SEO-Titel auf Leit-Nomenklatur «Training» ([#39])
- Zielgruppen-Weiche in den Hero gezogen, Grundlagen-Lead geschärft ([#40])
- Hero-Stats konditional ab Count ≥ 3 ([#41])
- Phase 1+2 Fachpersonen-Fokus, neuer offizieller Titel ([#42], [#43])
- Inhalts-Cluster Grundlagen 4–6: «mit Kindern über die Erkrankung sprechen»,
  «altersgerecht erklären», «Formulierungshilfen je Störungsbild»
  ([#44], [#47], [#48])
- Toolbox: Fach-Kontext-Marker an Kindeswohl- und Rechte-Clustern ([#45])
- E2E: hartkodierter Chromium-Pfad entfernt, Selektoren repariert ([#46])
- Lernmodul 3 «Die vier A — Auftragsklärung im Erstgespräch» ([#49])
- Glossar + Evidenz: 4 neue Begriffe, OBSAN-Prävalenz als Anker ([#50])
- Evidenz: spezifische Schutzfaktoren als Kapitel-Opener ([#51])
- Eltern-Haltung ressourcenorientiert geschärft ([#52])
- Gesprächsbeispiele für ressourcenorientierte Elternarbeit ([#53])

### Etappe 7 — Ästhetische Verfeinerungen + Nutzer-Audit (2026-04-16)

- Glossar als Disclosure-Cards (progressive disclosure)
- Evidenz-Kapitel als Disclosure-Blöcke
- Sticky-Nav-Versuch in Evidenz wieder entfernt, Fragment bleibt
- Section-Spacing und Card-Padding erhöht
- Stringenz-Audit: 4 Befunde behoben
- Nutzer-Audit N1–N5: Scroll-Reveal subtiler, Footer-Leerfläche reduziert,
  Logo-Monogramm `RR` → `EB`, Training-Navigation bei einzelner Vignette ausgeblendet,
  Footer-Brand-Titel reduziert
- Drei ästhetische Verfeinerungen
- Letzte «Relational Recovery»-Reste in Print-Kicker und Krisenplan entfernt

### Etappe 8 — Inhalts-Update + Release-Polish (2026-04-19)

- Glossar-Lead «relationale Recovery» durch fachliche Formulierung ersetzt
- OBSAN-2024 als Quelle ergänzt, 2016er-Zahl transparent
- Evidenz-Daten auf Nationalen Gesundheitsbericht 2025 aktualisiert
- (siehe `[Unreleased]` für die letzten 4 PRs)

[#4]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/4
[#8]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/8
[#9]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/9
[#10]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/10
[#11]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/11
[#12]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/12
[#13]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/13
[#14]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/14
[#18]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/18
[#19]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/19
[#20]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/20
[#21]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/21
[#22]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/22
[#23]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/23
[#24]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/24
[#25]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/25
[#26]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/26
[#27]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/27
[#28]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/28
[#29]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/29
[#30]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/30
[#31]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/31
[#32]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/32
[#33]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/33
[#34]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/34
[#35]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/35
[#36]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/36
[#38]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/38
[#39]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/39
[#40]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/40
[#41]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/41
[#42]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/42
[#43]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/43
[#44]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/44
[#45]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/45
[#46]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/46
[#47]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/47
[#48]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/48
[#49]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/49
[#50]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/50
[#51]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/51
[#52]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/52
[#53]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/53
[#56]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/56
[#58]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/58
[#59]: https://github.com/christaegger-dot/relational-recovery-startable-v1/pull/59
