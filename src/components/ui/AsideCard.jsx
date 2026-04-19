import SurfaceCard from './SurfaceCard';

export default function AsideCard({ aside, tone = 'soft' }) {
  if (!aside) return null;

  return (
    <SurfaceCard as="aside" tone={aside.tone || tone}>
      {aside.label ? <p className="ui-fact-card__label">{aside.label}</p> : null}
      {aside.title ? <h3 className="ui-card__title">{aside.title}</h3> : null}
      {aside.value ? <p className="ui-fact-card__value">{aside.value}</p> : null}
      {/* Audit (Redundanzen-Welle): `aside.note` wurde hier zuvor zusaetzlich
          gerendert, war aber im gesamten src/-Tree nirgends gesetzt. Drei
          parallele Felder (`copy`/`note` + value-abhaengige Klassen) loesten
          effektiv denselben Job mit unklarer Semantik. Verbleibend: `aside.copy`
          rendert als `ui-card__copy`, faellt aber zu `ui-fact-card__note`
          herunter, wenn ein `aside.value` darueber steht (kleinere Typo unter
          der Kennzahl). */}
      {aside.copy ? (
        <p className={aside.value ? 'ui-fact-card__note' : 'ui-card__copy'}>{aside.copy}</p>
      ) : null}
      {aside.badges?.length ? (
        <div className="ui-badge-row ui-editorial-card__action">
          {aside.badges.map((badge) => (
            <span key={badge} className="ui-badge">
              {badge}
            </span>
          ))}
        </div>
      ) : null}
      {aside.points?.length ? (
        <div className="ui-card__section--spaced ui-stack ui-stack--tight">
          {aside.points.map((item, i) => (
            <div key={i} className="ui-bullet-panel__item">
              <span className="ui-bullet-panel__dot" />
              <p className="ui-bullet-panel__copy">{item}</p>
            </div>
          ))}
        </div>
      ) : null}
      {aside.items?.length ? (
        <div className="ui-stack ui-stack--tight ui-card__section--spaced">
          {aside.items.map((item, i) => (
            <div key={i} className="ui-bullet-panel__item">
              {item.icon ? (
                <span className="ui-bullet-panel__marker ui-toolbox-inline-icon">{item.icon}</span>
              ) : null}
              <p className="ui-bullet-panel__copy">{item.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </SurfaceCard>
  );
}
