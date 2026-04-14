// Notfall-Print-Footer.
//
// Erscheint ausschliesslich im gedruckten Dokument (via .print-only) am
// unteren Rand jeder A4-Seite (via position: fixed im @media print-Block
// in app-global.css). Zeigt die drei zentralen Notfallnummern als lesbare
// Zahlen -- keine tel:-Links, weil auf Papier funktional irrelevant.
//
// Das ist das Papier-Pendant zum R31-Fix aus Audit 09: dort wurden die
// Nummern am Bildschirm klickbar gemacht, hier werden sie auf Papier
// sichtbar gemacht. Beide Masnahmen zusammen stellen sicher, dass die
// Notfall-Funktionalitaet im Medium der echten Nutzung vorhanden ist.
//
// aria-hidden, weil die .print-only-Sichtbarkeit am Bildschirm ohnehin
// display: none ist und Screenreader den Text nicht wiederholt vorlesen
// sollen.

export default function PrintNotfallFooter() {
  return (
    <aside className="print-notfall-footer print-only" aria-hidden="true">
      <p>Notfall: 144 Sanität · 147 Pro Juventute · AERZTEFON 0800 33 66 55</p>
    </aside>
  );
}
