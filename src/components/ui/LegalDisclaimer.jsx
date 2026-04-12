import { Scale } from 'lucide-react';

const DEFAULT_TEXT =
  'Die folgenden Hinweise zu Kindesschutz, KESB-Verfahren oder Melderecht dienen der Erstorientierung. Sie ersetzen keine individuelle Rechtsberatung. Bei konkreten Fragen zu Ihrem Fall wenden Sie sich an eine Rechtsberatungsstelle, die Angehörigenberatung der PUK Zürich oder Pro Mente Sana (0848 800 858).';

const CANTONAL_NOTE =
  'Die rechtlichen Hinweise auf dieser Seite beziehen sich primär auf den Kanton Zürich. Verfahren und Zuständigkeiten können in anderen Kantonen abweichen.';

export default function LegalDisclaimer({ text, showCantonalNote = false }) {
  return (
    <div className="ui-note-panel" role="note" aria-label="Rechtliche Orientierung">
      <div className="ui-note-panel__label ui-note-panel__label--with-icon">
        <Scale size={14} aria-hidden="true" />
        Rechtliche Orientierung
      </div>
      <p className="ui-note-panel__copy">{text || DEFAULT_TEXT}</p>
      {showCantonalNote ? (
        <p className="ui-note-panel__copy" style={{ marginTop: '0.5rem', opacity: 0.85 }}>
          {CANTONAL_NOTE}
        </p>
      ) : null}
    </div>
  );
}
