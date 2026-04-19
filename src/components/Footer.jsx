// Design note: Editorial footer with warm layered panels, serif brand close, and calmer navigation rhythm that extends the paper-like interface language.
import { memo, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TAB_ITEMS } from '../data/appShellContent';
import { useAppState } from '../context/useAppState';

const Footer = memo(function Footer() {
  const { navigate } = useAppState();
  const footerRoutes = useMemo(
    () =>
      TAB_ITEMS.filter((route) => route.priority === 'primary').map((route) => ({
        label: route.label,
        tab: route.id,
        note: route.footerNote,
      })),
    []
  );

  return (
    <footer className="footer-shell no-print">
      <div className="footer-shell__inner">
        <div className="footer-grid">
          <div className="footer-panel footer-panel--brand">
            <div className="footer-brand-badge">Fachportal Zürich</div>
            {/* Audit: Brand-Lockup ist kein topical heading -- vorher als <h2>
                landete es auf jeder Seite zusaetzlich in der Heading-Outline und
                konkurrierte mit den inhaltlichen Sektionen. Das `<br />` mit
                Leerzeichen davor und danach produzierte zudem textContent
                "Eltern im  Beratungskontext" (Doppel-Leerzeichen) -- schlecht
                fuer Screen Reader. Loesung: `<p>` statt `<h2>` (Brand-Label
                statt Ueberschrift) und Span-Block-Lines statt `<br />`. */}
            <p className="footer-brand-title">
              <span className="footer-brand-title__line">Eltern im</span>{' '}
              <span className="footer-brand-title__line">Beratungskontext</span>
            </p>
            <p className="footer-brand-copy">
              Fachportal für Orientierung, Triage und Weitervermittlung: Arbeitshilfen für Fachpersonen, die mit
              Familien mit psychisch belasteten Eltern arbeiten. Schwerpunkt Kanton Zürich, schweizweite Ergänzungen.
            </p>
            <div className="footer-stat-grid">
              <div className="footer-stat-card">
                <div className="footer-stat-card__label">Schwerpunkt</div>
                <p className="footer-stat-card__value">systemische Orientierung</p>
              </div>
              <div className="footer-stat-card">
                <div className="footer-stat-card__label">Zielgruppe</div>
                <p className="footer-stat-card__value">Fachpersonen und Teams</p>
              </div>
              <div className="footer-stat-card">
                <div className="footer-stat-card__label">Format</div>
                <p className="footer-stat-card__value">Praxis, Evidenz, Tools</p>
              </div>
            </div>
          </div>

          <nav className="footer-panel footer-panel--nav" aria-label="Fusszeilen-Navigation">
            <div className="footer-kicker">Bereiche</div>
            <div className="footer-nav-list">
              {footerRoutes.map((route) => (
                <button
                  key={route.tab}
                  type="button"
                  onClick={() => navigate(route.tab, { focusTarget: 'heading' })}
                  className="footer-nav-link"
                >
                  <div className="footer-nav-link__body">
                    <div className="footer-nav-link__title">{route.label}</div>
                    <p className="footer-nav-link__copy">{route.note}</p>
                  </div>
                  <ArrowUpRight size={16} className="footer-nav-link__icon" aria-hidden="true" />
                </button>
              ))}
            </div>
          </nav>

          <div className="footer-panel footer-panel--framework">
            <div className="footer-kicker footer-kicker--inverse">Arbeitsrahmen</div>
            <div className="footer-framework-list">
              <div className="footer-framework-item">
                <p className="footer-framework-item__copy">
                  Zentrale Orientierung für Fachpersonen mit Fokus auf Einordnung, Triage, Gesprächsführung und
                  regionale Weitervermittlung.
                </p>
              </div>
              <div className="footer-framework-item">
                <p className="footer-framework-item__copy">
                  Arbeitsstände bleiben lokal im Browser und können jederzeit zurückgesetzt oder neu aufgebaut werden.
                </p>
              </div>
            </div>
            <div className="footer-framework-legal">© 2026 Eltern mit psychischen Erkrankungen im Beratungskontext.</div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom__claim">Fachlich ruhig. Systemisch. Praxisnah.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
