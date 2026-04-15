import { memo } from 'react';
import { AlertTriangle, Check, Menu, Trash2, X } from 'lucide-react';
import { TAB_ITEMS } from '../data/appShellContent';
import Button from './ui/Button';
import { useAppState } from '../context/useAppState';

const Header = memo(function Header({
  mobileMenuOpen,
  openMobileMenu,
  closeMobileMenu,
  mobileMenuButtonRef,
  firstMobileNavItemRef,
  mobileMenuContainerRef,
  onEmergencyAccess,
  onReset,
}) {
  const { activeTab, navigate, isResetting } = useAppState();

  const handleNavigate = (tabId) => {
    navigate(tabId, { focusTarget: 'heading' });
    closeMobileMenu();
  };

  const handleHomeClick = () => {
    navigate('start', { focusTarget: 'heading' });
    closeMobileMenu();
  };

  const handleEmergencyClick = () => {
    onEmergencyAccess();
    closeMobileMenu();
  };

  const handleResetClick = () => {
    onReset();
    closeMobileMenu();
  };

  return (
    <header className="ui-site-header no-print">
      <div className="page-shell--wide ui-site-header__bar">
        <button
          type="button"
          onClick={handleHomeClick}
          className="ui-brand"
          aria-label="Relational Recovery – zur Startseite wechseln"
        >
          <div className="ui-brand__mark" aria-hidden="true">
            RR
          </div>
          <div className="ui-brand__copy">
            <span className="ui-brand__title">Relational Recovery</span>
            <p className="ui-kicker ui-brand__meta">Schweizer Fachportal</p>
          </div>
        </button>

        <nav className="ui-nav ui-nav--desktop" aria-label="Hauptnavigation">
          {TAB_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`ui-nav__item haptic-btn ${activeTab === item.id ? 'is-active' : ''}`}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <item.icon size={14} strokeWidth={2.1} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ui-header-actions">
          <Button
            variant="emergency"
            className="haptic-btn"
            onClick={handleEmergencyClick}
            aria-label="Sofortzugang zu Notfall- und Kriseninformationen"
          >
            <AlertTriangle size={16} aria-hidden="true" />
            <span>Notfall / akute Krise</span>
          </Button>
          <Button
            variant="ghost"
            className="ui-header-actions__reset haptic-btn"
            onClick={handleResetClick}
            title="Sitzung zurücksetzen"
            aria-label="Sitzung zurücksetzen"
          >
            {isResetting ? <Check size={18} aria-hidden="true" /> : <Trash2 size={18} aria-hidden="true" />}
            <span className="sr-only">Sitzung zurücksetzen</span>
          </Button>
        </div>

        <div className="ui-header-compact-actions">
          <Button
            variant="emergency"
            className="ui-header-compact-actions__emergency haptic-btn"
            onClick={handleEmergencyClick}
            aria-label="Sofortzugang zu Notfall- und Kriseninformationen"
          >
            <AlertTriangle size={16} aria-hidden="true" />
            <span className="ui-header-compact-actions__emergency-label">Notfall</span>
          </Button>

          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="ui-mobile-toggle haptic-btn"
            onClick={() => (mobileMenuOpen ? closeMobileMenu() : openMobileMenu())}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="dialog"
            aria-label={mobileMenuOpen ? 'Menü schliessen' : 'Menü öffnen'}
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span className="ui-mobile-toggle__label">Menü</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="ui-mobile-backdrop"
            aria-label="Menü schliessen"
            tabIndex={-1}
            onClick={closeMobileMenu}
          />
          <div
            ref={mobileMenuContainerRef}
            id="mobile-nav"
            className="ui-mobile-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
          >
            <div className="page-shell--wide ui-mobile-dialog__inner">
              <div className="ui-mobile-dialog__header">
                <h2 id="mobile-nav-title" className="ui-kicker ui-mobile-dialog__title">
                  Navigation
                </h2>
                <Button
                  variant="ghost"
                  className="ui-mobile-dialog__close"
                  onClick={closeMobileMenu}
                  aria-label="Menü schliessen"
                >
                  <X size={18} aria-hidden="true" />
                </Button>
              </div>

              <div className="ui-mobile-dialog__actions">
                <Button
                  variant="emergency"
                  className="haptic-btn"
                  onClick={handleEmergencyClick}
                  aria-label="Sofortzugang zu Notfall- und Kriseninformationen"
                >
                  <AlertTriangle size={16} aria-hidden="true" />
                  <span>Notfall / akute Krise</span>
                </Button>
                <Button
                  variant="ghost"
                  className="haptic-btn"
                  onClick={handleResetClick}
                  aria-label="Sitzung zurücksetzen"
                >
                  {isResetting ? <Check size={18} aria-hidden="true" /> : <Trash2 size={18} aria-hidden="true" />}
                  <span>Sitzung zurücksetzen</span>
                </Button>
              </div>

              <nav className="ui-nav ui-nav--mobile" aria-label="Mobile Navigation">
                {TAB_ITEMS.map((item, index) => (
                  <button
                    key={item.id}
                    ref={index === 0 ? firstMobileNavItemRef : undefined}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`ui-nav__item haptic-btn ${activeTab === item.id ? 'is-active' : ''}`}
                    aria-current={activeTab === item.id ? 'page' : undefined}
                  >
                    <item.icon size={18} strokeWidth={2.1} aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
});

export default Header;
