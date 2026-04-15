// Glossar-Link: Oeffnet den Glossar-Tab und scrollt zum referenzierten Term.
//
// Audit 12 / W3b Teil 1: Die Infrastruktur-Ebene ist implementiert
// (Glossar-Term-IDs plus diese Komponente). Die eigentliche Fliesstext-
// Einbettung der vier in Audit 07 vorbereiteten Begriffe (KESB,
// Parentifizierung, Trialog, Komorbiditaet) ist als Follow-up vertagt,
// weil sie entweder JSX-Fragmente in Content-Dateien oder einen
// Platzhalter-Parser verlangt. Siehe Audit-11-12-Bericht Abschnitt W3b.
//
// Nutzung (nach spaeterer Follow-up-Umsetzung):
//   <GlossarLink term="kesb">KESB</GlossarLink>
//
// Die href-URL verwendet das Hash-Routing aus Audit 10: '#glossar-<id>'.
// Beim Klick wird ueber useAppState().navigate gezielt auf den Glossar-
// Tab gesprungen und ueber das in Audit 10 etablierte Focus-Management
// zum Ziel-Heading gescrollt.

import { useAppState } from '../../context/useAppState';

export default function GlossarLink({ term, children, className = '' }) {
  const { navigate } = useAppState();

  const handleClick = (event) => {
    event.preventDefault();
    navigate('glossar', { focusTarget: 'heading' });
    // Zusaetzlich den Hash auf den Term-Anker setzen, damit der Browser-Back-
    // Button auf die Herkunftsseite zurueckbringt und das Focus-Management
    // aus useNavigationFocus.js den Term ansteuert, sobald ein entsprechender
    // DOM-Knoten mit id='glossar-<id>' existiert.
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#glossar-${term}`);
    }
  };

  const classes = ['ui-glossar-link', className].filter(Boolean).join(' ');

  return (
    <a
      href={`#glossar-${term}`}
      onClick={handleClick}
      className={classes}
      aria-label={`${typeof children === 'string' ? children : term} im Glossar öffnen`}
    >
      {children}
    </a>
  );
}
