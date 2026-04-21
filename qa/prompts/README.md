# Audit-Prompts

Wiederverwendbare Claude-Code-Prompts für systematische Audits dieses Repos.
Jeder Prompt ist **projektspezifisch** optimiert — Routen, Scripts, Tokens und
Audience-Framework sind bereits eingetragen. Kein Nachfüllen von Platzhaltern
nötig.

## Arbeitsweise

Jeder Prompt folgt demselben 4-Phasen-Muster:

1. **Phase 1 — Inventur (read-only):** Claude sammelt Befunde, schreibt Bericht.
2. **Phase 2 — Triage / Massnahmenkatalog:** Claude gruppiert + priorisiert.
3. **Phase 3 — Umsetzung:** nur nach expliziter Freigabe, ein Commit pro Fix.
4. **Phase 4 — Verifikation:** Vorher/Nachher-Vergleich, Scripts re-run.

**Zwischen-Stopps sind das Qualitätsmerkmal** — nicht alles auf einmal laufen
lassen.

## Verfügbare Prompts

| Datei | Audit | Einsatzzeitpunkt |
|---|---|---|
| [`audit-a11y-interaktion.md`](audit-a11y-interaktion.md) | 1 · Accessibility + Interaktions-Integrität | Vor Release, nach Layout-Änderungen |
| [`audit-performance.md`](audit-performance.md) | 2 · Performance + Bundle-Hygiene | Bei langsamen Seiten, vor Release, Bundle-Wachstum |
| [`audit-content-sprache.md`](audit-content-sprache.md) | 3 · Content-Qualität + Sprache (inkl. Audience-Framework) | Vor grösseren Content-Freigaben |
| [`audit-css-hygiene.md`](audit-css-hygiene.md) | 4 · Design-Token + CSS-Hygiene | Nach vielen Feature-Ergänzungen, uneinheitliche Tokens |
| [`audit-sicherheit.md`](audit-sicherheit.md) | 5 · Sicherheit + Deployment-Hygiene | Vor Deployment, nach Security-relevanten Änderungen |

## Nutzung

1. Öffne den gewünschten Prompt.
2. Kopiere den Inhalt des `# Audit: …`-Blocks (markierter Bereich).
3. Starte in einem neuen Claude-Code-Session-Branch (siehe Prompt).
4. Füge den Prompt ein. Claude arbeitet Phase 1 ab und stoppt.
5. Nach Review: Freigabe für Phase 2. Wieder Stopp.
6. Nach Review: Freigabe für Phase 3 + 4.

## Bericht-Konvention

Audit-Berichte werden fortlaufend nummeriert (`qa/audit-15-*.md`, `-16-*.md`,
usw.). Die aktuelle höchste Nummer ist **14**. Die Prompts schlagen Dateinamen
vor, der konkrete Präfix wird zu Beginn jedes Audits bestätigt.

## Reihenfolge-Empfehlung für einen Release-Zyklus

1. **Sicherheit** — zuerst, damit Secrets sofort behandelt werden können.
2. **Accessibility** — weil A11y-Defekte am schwersten wiegen.
3. **Content** — inhaltliche Probleme vor visuellen.
4. **CSS-Hygiene** — Styling-Konsistenz auf sauberem Inhalt.
5. **Performance** — zuletzt, weil sie auf stabilem Code am meisten bringt.

## Hinweise

- Schweizer Orthografie (`ss` statt `ß`) ist verbindlich.
- Alle Prompts respektieren das `primaryAudience`-Framework (siehe `CLAUDE.md`).
- Die Audits werden NICHT von Claude auto-gemergt — jede Änderung läuft durch
  einen PR mit menschlicher Freigabe.
