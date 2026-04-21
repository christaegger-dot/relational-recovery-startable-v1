import { Printer } from 'lucide-react';

/**
 * Handout-Mechanik fuer den Material-Tab.
 *
 * Default-Export: <MaterialHandoutSwitch handout onNavigate onPrintHandout />
 * disponiert nach `handout.kind` an die jeweilige Handout-Komponente.
 *
 * Wie ein neues Handout angelegt wird (Kurzfassung, Details in CLAUDE.md):
 *
 *  1. Daten-Objekt in `src/data/materialContent.js` unter MATERIAL_HANDOUTS
 *     anlegen (`id`, `kind`, `eyebrow`, `title`, `description`, `usage`,
 *     handout-spezifische Felder, `disclaimer`, `crossRefs`).
 *  2. Hier in dieser Datei eine Komponente fuer den neuen `kind` ergaenzen.
 *     Empfohlen fuer einfache Faelle: <MaterialHandoutShell> als Wrapper
 *     liefert Article-Container + Head + Usage + Disclaimer + CrossRefs --
 *     die spezifische Komponente liefert nur die mittleren Sections
 *     ueber `children`.
 *  3. Im `MaterialHandoutSwitch` unten einen `case`-Branch ergaenzen.
 *  4. CSS-Klassen mit BEM-Praefix `.ui-material-handout__*` in
 *     `src/styles/primitives.css` (Bildschirm) und `app-global.css` §9
 *     (Print) ergaenzen, falls neue Bausteine ein eigenes Aussehen brauchen.
 *
 * Ausnahme: <MaterialCrisisPlan> verwendet die Helper bewusst NICHT --
 * seine DOM-Struktur ist von den Print-Tests + Print-Typografie abhaengig
 * und bleibt deshalb inline. Helper-Konsolidierung kommt erst, wenn ein
 * begruendeter Anlass besteht (z. B. Label-Vereinheitlichung).
 */

// ─── Sub-Components ────────────────────────────────────────────────────────

function MaterialHandoutField({ field }) {
  return (
    <section className="ui-material-handout__field">
      <h5 className="ui-material-handout__field-title">{field.title}</h5>
      <p className="ui-material-handout__field-hint">{field.hint}</p>
      {field.example ? (
        <p className="ui-material-handout__field-example">
          <em>Beispiel: {field.example}</em>
        </p>
      ) : null}
      <div aria-hidden="true" className="ui-material-handout__lines">
        <div className="ui-material-handout__line" />
        <div className="ui-material-handout__line" />
        <div className="ui-material-handout__line" />
      </div>
    </section>
  );
}

function MaterialHandoutEmergency({ emergency }) {
  return (
    <section
      className="ui-material-handout__emergency"
      aria-labelledby={`${emergency.titleId || 'handout-emergency'}-title`}
    >
      <h5 id={`${emergency.titleId || 'handout-emergency'}-title`} className="ui-material-handout__emergency-title">
        {emergency.title}
      </h5>
      <p className="ui-material-handout__emergency-intro">{emergency.intro}</p>
      <ul className="ui-material-handout__emergency-list">
        {emergency.items.map((item) => (
          <li key={item.number} className="ui-material-handout__emergency-item">
            <span className="ui-material-handout__emergency-number">{item.number}</span>
            <span className="ui-material-handout__emergency-desc">{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MaterialHandoutCrossRefs({ crossRefs, onNavigate, handoutTitle }) {
  if (!crossRefs?.items?.length) return null;

  const ariaLabel = handoutTitle ? `${crossRefs.title} – ${handoutTitle}` : crossRefs.title;

  return (
    <aside className="ui-material-handout__cross-refs" aria-label={ariaLabel}>
      <p className="ui-fact-card__label">{crossRefs.title}</p>
      <ul className="ui-material-handout__cross-refs-list">
        {crossRefs.items.map((ref) => {
          if (ref.target) {
            return (
              <li key={ref.label}>
                <button
                  type="button"
                  className="ui-link ui-material-handout__cross-ref-link"
                  onClick={() => onNavigate?.(ref.target, { focusTarget: 'heading' })}
                >
                  {ref.label}
                </button>
              </li>
            );
          }
          return (
            <li key={ref.label}>
              <a href={ref.anchor} className="ui-link ui-material-handout__cross-ref-link">
                {ref.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

// ─── Geteilte Bausteine fuer Tier-1+ Handouts ──────────────────────────────

function MaterialHandoutHead({ handout, onPrintHandout }) {
  return (
    <header className="ui-material-handout__head">
      <div className="ui-material-handout__head-text">
        <p className="ui-fact-card__label">{handout.eyebrow}</p>
        <h3 className="ui-material-handout__title">{handout.title}</h3>
        <p className="ui-material-handout__lead">{handout.description}</p>
      </div>
      {onPrintHandout ? (
        <button
          type="button"
          className="ui-material-handout__print-btn no-print"
          data-action="print"
          onClick={() => onPrintHandout(handout.id)}
          aria-label={`${handout.title} drucken oder als PDF speichern`}
        >
          <Printer size={14} aria-hidden="true" />
          <span>Drucken / PDF</span>
        </button>
      ) : null}
    </header>
  );
}

function MaterialHandoutUsage({ usage }) {
  return (
    <div className="ui-material-handout__usage" aria-label="Hinweise zur Nutzung">
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Wann</p>
        <p>{usage.when}</p>
      </div>
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Mit wem</p>
        <p>{usage.people}</p>
      </div>
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Wie lange gilt es</p>
        <p>{usage.validity}</p>
      </div>
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Wohin damit</p>
        <p>{usage.where}</p>
      </div>
    </div>
  );
}

function MaterialHandoutDisclaimer({ disclaimer }) {
  if (!disclaimer) return null;
  return (
    <div className="ui-material-handout__disclaimer" role="note">
      <p>{disclaimer}</p>
    </div>
  );
}

/**
 * Wrapper fuer Tier-1+ Handouts: Article-Container + Head + Usage am Anfang,
 * Disclaimer + CrossRefs am Ende. Die spezifische Komponente liefert nur
 * die mittleren Sections via `children`. DOM-identisch zur frueheren
 * inline-Variante in MaterialConversationScript / MaterialThresholdChecklist.
 */
function MaterialHandoutShell({ handout, onNavigate, onPrintHandout, children }) {
  return (
    <article id={handout.id} data-handout-id={handout.id} className="ui-material-handout ui-section-anchor-offset">
      <MaterialHandoutHead handout={handout} onPrintHandout={onPrintHandout} />
      <MaterialHandoutUsage usage={handout.usage} />
      {children}
      <MaterialHandoutDisclaimer disclaimer={handout.disclaimer} />
      <MaterialHandoutCrossRefs crossRefs={handout.crossRefs} onNavigate={onNavigate} handoutTitle={handout.title} />
    </article>
  );
}

// ─── Handout-Komponenten ───────────────────────────────────────────────────

/**
 * Tier-1-Handout (#107): Krisenplan-Vorlage zum Ausfuellen. Nutzt bewusst
 * NICHT die geteilten Helper -- die DOM-Struktur ist von den Print-Tests
 * + Print-Typografie in app-global.css §9 abhaengig. Konsolidierung kommt
 * erst, wenn ein begruendeter Anlass besteht.
 */
function MaterialCrisisPlan({ handout, onNavigate, onPrintHandout }) {
  return (
    <article id={handout.id} data-handout-id={handout.id} className="ui-material-handout ui-section-anchor-offset">
      <header className="ui-material-handout__head">
        <div className="ui-material-handout__head-text">
          <p className="ui-fact-card__label">{handout.eyebrow}</p>
          <h3 className="ui-material-handout__title">{handout.title}</h3>
          <p className="ui-material-handout__lead">{handout.description}</p>
        </div>
        {onPrintHandout ? (
          <button
            type="button"
            className="ui-material-handout__print-btn no-print"
            data-action="print"
            onClick={() => onPrintHandout(handout.id)}
            aria-label={`${handout.title} drucken oder als PDF speichern`}
          >
            <Printer size={14} aria-hidden="true" />
            <span>Drucken / PDF</span>
          </button>
        ) : null}
      </header>

      <div className="ui-material-handout__usage" aria-label="Hinweise zur Nutzung">
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Wann</p>
          <p>{handout.usage.when}</p>
        </div>
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Mit wem</p>
          <p>{handout.usage.people}</p>
        </div>
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Wie lange gilt er</p>
          <p>{handout.usage.validity}</p>
        </div>
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Wohin damit</p>
          <p>{handout.usage.where}</p>
        </div>
      </div>

      <div className="ui-material-handout__ownership">
        <div className="ui-material-handout__field ui-material-handout__field--inline">
          <p className="ui-material-handout__field-title">{handout.header.ownerLabel}</p>
          <div aria-hidden="true" className="ui-material-handout__lines">
            <div className="ui-material-handout__line" />
          </div>
        </div>
        <div className="ui-material-handout__ownership-meta">
          <div className="ui-material-handout__field ui-material-handout__field--inline">
            <p className="ui-material-handout__field-title">{handout.header.dateLabel}</p>
            <div aria-hidden="true" className="ui-material-handout__lines">
              <div className="ui-material-handout__line" />
            </div>
          </div>
          <div className="ui-material-handout__field ui-material-handout__field--inline">
            <p className="ui-material-handout__field-title">{handout.header.revisedLabel}</p>
            <div aria-hidden="true" className="ui-material-handout__lines">
              <div className="ui-material-handout__line" />
            </div>
          </div>
        </div>
      </div>

      {handout.sections.map((section) => (
        <section key={section.id} id={section.id} className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{section.title}</h4>
          <div className="ui-material-handout__fields">
            {section.fields.map((field) => (
              <MaterialHandoutField key={field.title} field={field} />
            ))}
          </div>
          {section.emergency ? (
            <MaterialHandoutEmergency emergency={{ ...section.emergency, titleId: `${section.id}-emergency` }} />
          ) : null}
        </section>
      ))}

      {handout.footer ? (
        <footer className="ui-material-handout__foot">
          <p>{handout.footer}</p>
        </footer>
      ) : null}

      {handout.disclaimer ? (
        <div className="ui-material-handout__disclaimer" role="note">
          <p>{handout.disclaimer}</p>
        </div>
      ) : null}

      <MaterialHandoutCrossRefs crossRefs={handout.crossRefs} onNavigate={onNavigate} handoutTitle={handout.title} />
    </article>
  );
}

/**
 * Tier-1-Handout (#112): Gespraech-Skript fuer betroffene Eltern.
 * Format B (Conversation Script) -- vorbereiteter Einstieg, fuenf typische
 * Kinder-Fragen mit Antwort-Ankern, Verstehens-Check + Prozess-Notizen.
 */
function MaterialConversationScript({ handout, onNavigate, onPrintHandout }) {
  return (
    <MaterialHandoutShell handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout}>
      {handout.opener ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.opener.title}</h4>
          <blockquote className="ui-material-handout__opener">
            <p className="ui-material-handout__opener-text">{handout.opener.text}</p>
            {handout.opener.note ? <p className="ui-material-handout__opener-note">{handout.opener.note}</p> : null}
          </blockquote>
        </section>
      ) : null}

      {handout.childQuestions?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.childQuestions.title}</h4>
          {handout.childQuestions.intro ? (
            <p className="ui-material-handout__section-intro">{handout.childQuestions.intro}</p>
          ) : null}
          <ol className="ui-material-handout__qa-list">
            {handout.childQuestions.items.map((item, index) => (
              <li key={item.question} className="ui-material-handout__qa-item">
                <p className="ui-material-handout__qa-question">
                  <span className="ui-material-handout__qa-number">{index + 1}.</span> {item.question}
                </p>
                <p className="ui-material-handout__qa-anchor">{item.anchor}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {handout.understandingCheck ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.understandingCheck.title}</h4>
          {handout.understandingCheck.intro ? (
            <p className="ui-material-handout__section-intro">{handout.understandingCheck.intro}</p>
          ) : null}
          <p className="ui-material-handout__prompt">{handout.understandingCheck.prompt}</p>
          {handout.understandingCheck.note ? (
            <p className="ui-material-handout__section-note">{handout.understandingCheck.note}</p>
          ) : null}
        </section>
      ) : null}

      {handout.process?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.process.title}</h4>
          <ul className="ui-material-handout__notes">
            {handout.process.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </MaterialHandoutShell>
  );
}

/**
 * Tier-1-Handout (#113): Schwellen-Karte fuer Angehoerige. Format C
 * (Threshold Checklist) -- Reihenfolge in der Krise, Beobachtungs-Items mit
 * klarer Wenn-Dann-Logik, kompakte CH-Anlaufstellen, Selbst-Schwelle als
 * legitimer Anlass.
 */
function MaterialThresholdChecklist({ handout, onNavigate, onPrintHandout }) {
  return (
    <MaterialHandoutShell handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout}>
      {handout.priorityRule?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.priorityRule.title}</h4>
          {handout.priorityRule.intro ? (
            <p className="ui-material-handout__section-intro">{handout.priorityRule.intro}</p>
          ) : null}
          <ol className="ui-material-handout__steps">
            {handout.priorityRule.items.map((step) => (
              <li key={step.step} className="ui-material-handout__step">
                <span className="ui-material-handout__step-number" aria-hidden="true">
                  {step.step}
                </span>
                <div className="ui-material-handout__step-body">
                  <p className="ui-material-handout__step-label">{step.label}</p>
                  <p className="ui-material-handout__step-detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {handout.thresholds?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.thresholds.title}</h4>
          {handout.thresholds.intro ? (
            <p className="ui-material-handout__section-intro">{handout.thresholds.intro}</p>
          ) : null}
          <ul className="ui-material-handout__thresholds">
            {handout.thresholds.items.map((item) => (
              <li key={item.observation} className="ui-material-handout__threshold">
                <p className="ui-material-handout__threshold-observation">{item.observation}</p>
                <p className="ui-material-handout__threshold-escalate">
                  <span className="ui-fact-card__label">Wenn ja</span>
                  {item.escalate}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {handout.contacts?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.contacts.title}</h4>
          {handout.contacts.intro ? (
            <p className="ui-material-handout__section-intro">{handout.contacts.intro}</p>
          ) : null}
          <ul className="ui-material-handout__contacts">
            {handout.contacts.items.map((c) => (
              <li key={`${c.number || ''}-${c.name || ''}`} className="ui-material-handout__contact">
                {c.number ? <span className="ui-material-handout__contact-number">{c.number}</span> : null}
                <div className="ui-material-handout__contact-body">
                  {c.name ? <p className="ui-material-handout__contact-name">{c.name}</p> : null}
                  {c.detail ? <p className="ui-material-handout__contact-detail">{c.detail}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {handout.selfNote ? (
        <aside className="ui-material-handout__callout" aria-label={handout.selfNote.title}>
          <p className="ui-fact-card__label">{handout.selfNote.title}</p>
          <p>{handout.selfNote.text}</p>
        </aside>
      ) : null}
    </MaterialHandoutShell>
  );
}

/**
 * Tier-2-Handout (#116): Altersgerechte Uebersicht fuer Eltern + Fachpersonen.
 * Format D (Age-Grid) -- vier Karten (Kleinkind / Kindergarten / Schulkind /
 * Jugendliche), jede mit vier Sub-Sektionen (Symptome / Bedarf / Eltern-
 * Hilfen / Fachstellen-Schwelle). Mobile: 1-Spalten-Stack. Tablet: 2 Spalten.
 * Desktop: 4 Spalten. Print: 2x2 auf A4 Portrait (siehe app-global.css §9).
 */
function MaterialAgeGrid({ handout, onNavigate, onPrintHandout }) {
  return (
    <MaterialHandoutShell handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout}>
      {handout.ageGroups?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.ageGroups.title}</h4>
          {handout.ageGroups.intro ? (
            <p className="ui-material-handout__section-intro">{handout.ageGroups.intro}</p>
          ) : null}
          <ul className="ui-material-handout__age-grid">
            {handout.ageGroups.items.map((group) => (
              <li key={group.id} className="ui-material-handout__age-group">
                <header className="ui-material-handout__age-head">
                  <p className="ui-material-handout__age-range">{group.ageRange}</p>
                  <h5 className="ui-material-handout__age-label">{group.label}</h5>
                </header>
                {[group.symptoms, group.needs, group.parentHelp].map((sub) =>
                  sub?.items?.length ? (
                    <div key={sub.title} className="ui-material-handout__age-subsection">
                      <p className="ui-material-handout__age-subsection-title">{sub.title}</p>
                      <ul className="ui-material-handout__age-subsection-list">
                        {sub.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
                {group.threshold ? (
                  <div className="ui-material-handout__age-threshold">
                    <p className="ui-material-handout__age-subsection-title">{group.threshold.title}</p>
                    <p className="ui-material-handout__age-threshold-text">{group.threshold.text}</p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </MaterialHandoutShell>
  );
}

// ─── Switch (Default-Export) ───────────────────────────────────────────────

export default function MaterialHandoutSwitch({ handout, onNavigate, onPrintHandout }) {
  switch (handout.kind) {
    case 'crisis-plan':
      return <MaterialCrisisPlan handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    case 'conversation-script':
      return <MaterialConversationScript handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    case 'threshold-checklist':
      return <MaterialThresholdChecklist handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    case 'age-grid':
      return <MaterialAgeGrid handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    default:
      return null;
  }
}
