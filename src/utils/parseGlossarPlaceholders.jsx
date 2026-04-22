import GlossarLink from '../components/ui/GlossarLink';

/**
 * Parst Strings mit `[[glossar:id]]`- oder `[[glossar:id|Label]]`-Markern
 * und ersetzt sie durch `<GlossarLink>`-Komponenten.
 *
 * Konvention (Issue #123, Audit 12 W3b Teil 2):
 * - `[[glossar:kesb]]` → <GlossarLink term="kesb">KESB</GlossarLink>
 *   (Label = Term aus glossaryContent.js, erster Buchstabe gross)
 * - `[[glossar:kesb|die KESB]]` → <GlossarLink term="kesb">die KESB</GlossarLink>
 *   (explizites Label)
 *
 * Strings ohne Marker werden unverändert zurückgegeben (kein Array-Wrap).
 *
 * @param {string} text
 * @returns {string | Array<string | import('react').ReactElement>}
 */
export default function parseGlossarPlaceholders(text) {
  if (!text || typeof text !== 'string') return text;

  const pattern = /\[\[glossar:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;
  if (!pattern.test(text)) return text;

  // Reset lastIndex nach test()
  pattern.lastIndex = 0;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Text vor dem Match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const termId = match[1];
    const label = match[2] || termId.charAt(0).toUpperCase() + termId.slice(1).replace(/-/g, ' ');

    parts.push(
      <GlossarLink key={`${termId}-${match.index}`} term={termId}>
        {label}
      </GlossarLink>
    );

    lastIndex = match.index + match[0].length;
  }

  // Rest nach dem letzten Match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
