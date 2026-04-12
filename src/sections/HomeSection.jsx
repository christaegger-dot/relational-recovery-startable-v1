// Design note: Editorial landing composition with warm paper panels, serif-led hierarchy, quieter cards, and high whitespace while preserving the original information architecture.
import { useMemo } from 'react';
import { ChevronRight, ClipboardCheck, ExternalLink, GraduationCap, HeartHandshake, Library, MapPin } from 'lucide-react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.png';
import { E_MODULE_COUNT, HOME_REFERENCE_COUNT, NETWORK_RESOURCE_COUNT, VIGNETTE_COUNT } from '../data/appShellContent';

const overviewCards = [
  { label: 'Module', val: E_MODULE_COUNT, desc: 'kompakte Lernbausteine', icon: GraduationCap, tab: 'lernmodule' },
  { label: 'Trainingsfälle', val: VIGNETTE_COUNT, desc: 'für Fallreflexion und Dialog', icon: HeartHandshake, tab: 'vignetten' },
  { label: 'Netzwerkstellen', val: NETWORK_RESOURCE_COUNT, desc: 'für Triage und Entlastung', icon: MapPin, tab: 'netzwerk' },
  { label: 'Referenzen', val: HOME_REFERENCE_COUNT, desc: 'für fachliche Vertiefung', icon: Library, tab: 'evidenz' },
];

const dashboardRoutes = [
  {
    title: 'Wenn du verstehen willst, was in der Familie passiert',
    desc: 'Belastung, Schutzfaktoren, Elternrolle und kindliche Perspektive fachlich einordnen.',
    target: 'evidenz',
    cta: 'Zu Evidenz',
    icon: Library,
  },
  {
    title: 'Wenn du entscheiden musst, was jetzt prioritär ist',
    desc: 'Assessment, Krisenlogik, Sicherheitsplan und Schutzfragen schrittweise durchgehen.',
    target: 'toolbox',
    cta: 'Zur Toolbox',
    icon: ClipboardCheck,
  },
  {
    title: 'Wenn du triagieren oder weitervermitteln willst',
    desc: 'Offizielle Stellen, Entlastung, Kinderangebote und regionale Hilfen gezielt finden.',
    target: 'netzwerk',
    cta: 'Zum Netzwerk',
    icon: MapPin,
  },
  {
    title: 'Wenn du üben oder im Team reflektieren willst',
    desc: 'Mit Lernmodulen und Vignetten Sprache, Einschätzung und Falllogik trainieren.',
    target: 'vignetten',
    cta: 'Zum Training',
    icon: HeartHandshake,
  },
];

const pathwaySteps = [
  {
    label: 'Verstehen',
    title: 'Familiendynamik einordnen',
    desc: 'Elternrolle, Belastung, kindliche Perspektive und Schutzfaktoren gemeinsam betrachten.',
  },
  {
    label: 'Einschätzen',
    title: 'Risiken und Ressourcen gewichten',
    desc: 'Krise, Entlastung, Parentifizierung, Routinen und verfügbare Bezugspersonen klären.',
  },
  {
    label: 'Handeln',
    title: 'Nächste Schritte konkret machen',
    desc: 'Psychoedukation, Krisenplan, Gesprächsführung und schriftliche Absprachen alltagstauglich übersetzen.',
  },
  {
    label: 'Vernetzen',
    title: 'Hilfen erreichbar machen',
    desc: 'Offizielle Stellen, Beratung, Kinderangebote und Entlastung passend zur Lage aktivieren.',
  },
];

export default function HomeSection({ activeTab, setActiveTab, progressPercent, completedModules }) {
  const progressSummaryItems = useMemo(
    () => [
      {
        label: 'Bearbeitet',
        value: `${completedModules.length} von ${E_MODULE_COUNT}`,
        note: 'Lernmodule mit Abschlussstatus',
      },
      {
        label: 'Offen',
        value: `${Math.max(E_MODULE_COUNT - completedModules.length, 0)}`,
        note: 'noch nicht bearbeitete Module',
      },
      {
        label: 'Fortschritt',
        value: `${progressPercent}%`,
        note: 'orientierender Lernstand',
      },
    ],
    [completedModules.length, progressPercent],
  );

  return (
    <article className="home-section no-print">
      <section className="home-hero-layout">
        <div className="home-hero-main">
          <div className="home-hero-main__inner">
            <div className="home-hero-main__header">
              <div className="ui-eyebrow">Systemische Orientierung</div>

              <div className="home-hero-main__title-wrap">
                <h2 id="page-heading-start" tabIndex={-1} className="home-hero-main__title">
                  Begleitung ist <span className="ui-hero__accent">Beziehungsarbeit</span>.
                </h2>
                <p className="home-hero-main__lead">
                  Interaktive Fachressourcen für die Begleitung von Eltern mit psychischer Belastung – mit Training,
                  systemischer Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen.
                </p>
              </div>
            </div>

            <div className="ui-button-row">
              <button type="button" onClick={() => setActiveTab('lernmodule')} className="ui-button ui-button--primary">
                Falllogik trainieren <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => setActiveTab('toolbox')} className="ui-button ui-button--secondary">
                Prioritäten klären
              </button>
            </div>

            <div className="ui-note-panel home-hero-main__progress-note">
              <div className="ui-note-panel__label">Lernstand</div>
              <p className="ui-note-panel__copy">
                {completedModules.length} von {E_MODULE_COUNT} Lernmodulen bearbeitet. Das Dashboard unten führt direkt zu den
                nächsten Arbeitsbereichen.
              </p>
            </div>

            <div className="home-hero-main__media">
              <div className="home-hero-main__figure">
                <img
                  src={heroIllustration}
                  alt="Minimalistische Illustration eines Familiensystems mit Nähe, Distanz und Unterstützung"
                />
              </div>
            </div>

            <div className="ui-note-panel home-hero-note">
              <div className="ui-note-panel__label">Wichtiger Hinweis zur Einordnung</div>
              <div className="ui-copy">
                <p>
                  Diese Website ist ein ergänzendes psychoedukatives Informationsangebot im Themenfeld Angehörigenarbeit,
                  psychisch belastete Elternschaft und Kinder psychisch erkrankter Eltern. Für offizielle Informationen und Beratung
                  bleibt die Angehörigenberatung der PUK Zürich die zentrale Anlaufstelle.
                </p>
              </div>
              <div className="ui-button-row">
                <button type="button" onClick={() => setActiveTab('netzwerk')} className="ui-button ui-button--secondary">
                  Zum Netzwerkbereich mit PUK-Angeboten
                </button>
                <a
                  href="https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-button ui-button--secondary"
                >
                  Offizielle PUK-Seite öffnen <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <aside className="home-progress-panel home-hero-aside">
          <div>
            <p className="home-progress-panel__eyebrow">Lernfortschritt</p>
            <div className="home-progress-panel__card">
              <div>
                <p className="home-progress-panel__value">{progressPercent}%</p>
                <p className="home-progress-panel__lead">
                  {completedModules.length} von {E_MODULE_COUNT} Lernmodulen sind bereits bearbeitet.
                </p>
              </div>

              <div className="home-progress-panel__list">
                {progressSummaryItems.map((item) => (
                  <div key={item.label} className="home-progress-panel__item">
                    <div className="home-progress-panel__item-header">
                      <span className="home-progress-panel__item-label">{item.label}</span>
                      <span className="home-progress-panel__item-value">{item.value}</span>
                    </div>
                    <p className="home-progress-panel__item-note">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="home-progress-panel__footer">
            <p className="home-progress-panel__copy">
              Die Fortschrittsansicht bleibt bewusst ruhig und textbasiert, damit Orientierung wichtiger ist als reine UI-Inszenierung.
            </p>
            {activeTab !== 'vignetten' && (
              <button type="button" onClick={() => setActiveTab('vignetten')} className="ui-button ui-button--secondary">
                Zu den Trainingsfällen <ChevronRight size={14} />
              </button>
            )}
          </div>
        </aside>
      </section>

      <section className="home-feature-panel home-feature-panel--pathway">
        <div className="ui-split home-feature-panel__header">
          <div className="home-feature-panel__intro">
            <div className="ui-eyebrow">Fachdiagramm</div>
            <h3 className="home-feature-panel__title">
              Ein möglicher <span className="ui-hero__accent">Arbeitsweg</span> durch die Website.
            </h3>
            <p className="home-feature-panel__lead">
              Die Inhalte sind nicht als lose Sammlung gedacht, sondern als fachliche Abfolge: erst verstehen, dann einschätzen,
              daraus konkrete Schritte ableiten und passende Hilfen vernetzen. Das Diagramm bündelt diese Logik auf einer Seite.
            </p>
          </div>
          <aside className="ui-note-panel home-support-panel">
            <div className="ui-note-panel__label">Einordnung</div>
            <p className="ui-note-panel__copy">
              Kein starres Schema, sondern eine ruhige fachliche Leitstruktur für Orientierung, Triage und Gesprächsplanung.
            </p>
          </aside>
        </div>

        <div className="home-pathway-shell">
          <div className="ui-card-grid ui-card-grid--4 home-pathway-grid">
            {pathwaySteps.map((step, index) => (
              <div key={step.label} className="home-pathway-step">
                <section className="ui-card home-pathway-step__card">
                  <div className="ui-card__body">
                    <div className="ui-badge ui-badge--soft home-pathway-step__badge">{step.label}</div>
                    <h4 className="home-pathway-step__title">{step.title}</h4>
                    <p className="home-pathway-step__copy">{step.desc}</p>
                  </div>
                </section>

                {index < pathwaySteps.length - 1 && (
                  <div className="home-pathway-step__connector" aria-hidden="true">
                    <span className="home-pathway-step__connector-dot">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ui-note-panel ui-note-panel--muted home-pathway-summary">
            <p className="ui-note-panel__copy">
              Leitidee: Gute Begleitung verbindet systemisches Verstehen, pragmatische Einschätzung, klare nächste Schritte und
              aktivierte Unterstützung statt isolierter Einzelentscheidungen.
            </p>
          </div>
        </div>
      </section>

      <section className="home-feature-panel home-feature-panel--dashboard">
        <div className="ui-split home-feature-panel__header">
          <div className="home-feature-panel__intro">
            <div className="ui-eyebrow">Navigations-Dashboard</div>
            <h3 className="home-feature-panel__title">
              Einstieg nach <span className="ui-hero__accent">Fachfrage</span> statt nach Menüpunkt.
            </h3>
            <p className="home-feature-panel__lead">
              Die Startseite funktioniert am besten, wenn typische Praxisanliegen direkt in den passenden Bereich führen. Die Karten
              unten übersetzen häufige Arbeitsfragen in klare Einstiegswege.
            </p>
          </div>
          <aside className="ui-note-panel home-support-panel">
            <div className="ui-note-panel__label">Orientierung</div>
            <p className="ui-note-panel__copy">
              Weniger suchen, schneller einsteigen: Verstehen, entscheiden, triagieren oder trainieren.
            </p>
          </aside>
        </div>

        <div className="ui-card-grid ui-card-grid--2 home-route-grid">
          {dashboardRoutes.map((route) => (
            <button
              key={route.title}
              type="button"
              onClick={() => setActiveTab(route.target)}
              className="ui-card ui-card--interactive home-route-card"
            >
              <div className="ui-card__body home-route-card__body">
                <div className="home-icon-badge">
                  <route.icon size={24} strokeWidth={2.1} />
                </div>
                <div className="home-route-card__content">
                  <h4 className="home-route-card__title">{route.title}</h4>
                  <p className="home-route-card__copy">{route.desc}</p>
                  <div className="home-inline-cta">
                    {route.cta} <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="home-overview-grid">
        {overviewCards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => setActiveTab(card.tab)}
            className="ui-card ui-card--interactive home-overview-card"
          >
            <div className="home-icon-badge home-overview-card__icon">
              <card.icon size={24} strokeWidth={2.1} />
            </div>
            <p className="home-overview-card__value">{card.val}</p>
            <h3 className="home-overview-card__label">{card.label}</h3>
            <p className="home-overview-card__copy">{card.desc}</p>
            <div className="home-inline-cta">
              Bereich öffnen <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </section>
    </article>
  );
}
