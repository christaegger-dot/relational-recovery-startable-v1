/**
 * Letter-Index fuer den Glossar-Tab (Audit 25 / Sprint 5, O11).
 *
 * Baut aus einer Liste von GlossaryGroups ein Alphabet-Array, das fuer
 * jeden Buchstaben (A-Z, deutsche Umlaute werden auf ihren Basisbuchstaben
 * gefaltet: Ä->A, Ö->O, Ü->U) anzeigt, ob und zu welchem ersten Term
 * gesprungen werden kann. Buchstaben ohne Term bleiben sichtbar, aber
 * inaktiv -- das Index-Band zeigt damit auch die Abdeckung.
 *
 * Reihenfolge im Rueckgabewert entspricht der ueblichen de-CH-Sortierung
 * A-Z (26 Buchstaben). Der erste Term pro Buchstabe ist derjenige, der
 * in `groups` zuerst auftaucht -- das spiegelt die Cluster-Reihenfolge,
 * nicht die Alphabet-Reihenfolge innerhalb des Buchstabens.
 */
const BASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const UMLAUT_MAP = { Ä: 'A', Ö: 'O', Ü: 'U' };

function normalizeFirstLetter(term) {
  const first = term.trim().charAt(0).toUpperCase();
  return UMLAUT_MAP[first] || first;
}

/**
 * @param {Array<{terms: Array<{id: string, term: string}>}>} groups
 * @returns {Array<{letter: string, firstTermId: string|null, count: number}>}
 */
export function buildGlossarLetterIndex(groups = []) {
  const byLetter = new Map();
  for (const group of groups) {
    for (const entry of group.terms || []) {
      const letter = normalizeFirstLetter(entry.term);
      if (!byLetter.has(letter)) {
        byLetter.set(letter, { letter, firstTermId: entry.id, count: 0 });
      }
      byLetter.get(letter).count += 1;
    }
  }
  return BASE_ALPHABET.map(
    (letter) => byLetter.get(letter) || { letter, firstTermId: null, count: 0 }
  );
}
