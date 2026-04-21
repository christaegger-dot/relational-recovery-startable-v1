/**
 * Alphabet-Navigation fuer den Glossar-Tab (Audit 25 / Sprint 5, O11).
 *
 * Zeigt alle 26 Buchstaben des Alphabets als kompaktes Pill-Band.
 * Buchstaben mit mindestens einem zugeordneten Term sind klickbare
 * Sprunglinks (Ankerziel: `#glossar-term-{id}` des ersten Terms); ohne
 * Term bleibt der Buchstabe als gedimmter Span sichtbar -- das Band
 * dient damit auch als At-a-Glance-Coverage-Indikator.
 *
 * Keine eigene Section -- Template bettet den Nav in einen schmalen
 * Container ein, damit Cluster-Nav und Letter-Nav direkt nebeneinander
 * liegen und sich nicht beide eine volle Section-Hoehe teilen.
 */
export default function GlossarLetterIndex({ entries = [] }) {
  if (!entries.length) return null;

  return (
    <nav className="ui-letter-index" aria-label="Alphabetische Navigation durch die Begriffe">
      <ul className="ui-letter-index__list">
        {entries.map((entry) => {
          const label = entry.firstTermId
            ? `${entry.letter} — ${entry.count} ${entry.count === 1 ? 'Begriff' : 'Begriffe'}`
            : `${entry.letter} — kein Begriff vorhanden`;
          const baseClass = 'ui-letter-index__item';
          const className = entry.firstTermId ? baseClass : `${baseClass} ${baseClass}--empty`;

          return (
            <li key={entry.letter} className="ui-letter-index__cell">
              {entry.firstTermId ? (
                <a className={className} href={`#glossar-term-${entry.firstTermId}`} aria-label={label}>
                  {entry.letter}
                </a>
              ) : (
                <span className={className} aria-label={label} aria-disabled="true">
                  {entry.letter}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
