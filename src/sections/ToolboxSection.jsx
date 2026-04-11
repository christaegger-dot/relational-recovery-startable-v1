import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Printer,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import ToolboxPageTemplate from '../templates/ToolboxPageTemplate';
import {
  ACUTE_CRISIS_CONTACTS,
  ACUTE_CRISIS_STEPS,
  ADDICTION_PANELS,
  ADDICTION_TIPS,
  CHILD_PROTECTION_THRESHOLDS,
  CHILD_PROTECTION_TIPS,
  PRACTICE_BLOCKS,
  PRACTICE_BLOCK_FILTERS,
  RIGHTS_FAQ,
  SAFETY_PLAN_POINTS,
  SAFETY_PLAN_TEMPLATE_FIELDS,
} from '../data/toolboxContent';
import { ASSESSMENT_ITEMS } from '../data/learningContent';
import { getPageHeadingId, getRiskLabel, getRiskTone } from '../utils/appHelpers';
import { createClosingSectionModel } from '../utils/closingModel';

const SCORE_STATUS_ID = 'assessment-score-status';

const RECOMMENDATION_TONE_CLASSNAMES = {
  'border-red-200 bg-red-50 text-red-950': 'border-[color-mix(in_srgb,#c2410c_22%,white_78%)] bg-[color-mix(in_srgb,#fff7ed_86%,white_14%)] text-[var(--text-primary)]',
  'border-amber-200 bg-amber-50 text-amber-950': 'border-[color-mix(in_srgb,#d97706_22%,white_78%)] bg-[color-mix(in_srgb,#fffbeb_84%,white_16%)] text-[var(--text-primary)]',
  'border-emerald-200 bg-emerald-50 text-emerald-950': 'border-[color-mix(in_srgb,var(--accent-primary)_20%,white_80%)] bg-[var(--surface-note)] text-[var(--text-primary)]',
  'border-slate-200 bg-slate-50 text-slate-900': 'border-[var(--border-default)] bg-[var(--surface-panel)] text-[var(--text-primary)]',
};

const SCORE_BAND_CLASSNAMES = {
  'border-emerald-200 bg-emerald-50 text-emerald-950': 'border-[color-mix(in_srgb,var(--accent-primary)_20%,white_80%)] bg-[var(--surface-note)] text-[var(--text-primary)]',
  'border-amber-200 bg-amber-50 text-amber-950': 'border-[color-mix(in_srgb,#d97706_22%,white_78%)] bg-[color-mix(in_srgb,#fffbeb_84%,white_16%)] text-[var(--text-primary)]',
  'border-red-200 bg-red-50 text-red-950': 'border-[color-mix(in_srgb,#c2410c_22%,white_78%)] bg-[color-mix(in_srgb,#fff7ed_86%,white_14%)] text-[var(--text-primary)]',
};

function mapRecommendationTone(className) {
  return RECOMMENDATION_TONE_CLASSNAMES[className] || 'border-[var(--border-default)] bg-[var(--surface-panel)] text-[var(--text-primary)]';
}

function mapScoreBandTone(className) {
  return SCORE_BAND_CLASSNAMES[className] || 'border-[var(--border-default)] bg-[var(--surface-panel)] text-[var(--text-primary)]';
}

export default function ToolboxSection({
  score,
  onToggleAssessment,
  onResetAssessment,
  onPrint,
  onDownloadCrisisPlan,
  acuteCrisisSectionRef,
  safetyPlanSectionRef,
  childProtectionSectionRef,
  addictionSectionRef,
  rightsSectionRef,
  onJumpToPrioritySection,
}) {
  const [triageAnswers, setTriageAnswers] = useState({});
  const [activePracticeFilter, setActivePracticeFilter] = useState('all');

  const assessmentLiveText = `Aktueller Assessment-Score: ${score.risk}. ${getRiskLabel(score.risk)}. Der Score dient nur als Orientierungshilfe.`;

  const pathwaySteps = [
    {
      label: 'Orientieren',
      title: 'Belastung kurz einordnen',
      desc: 'Welche Faktoren sind aktuell sichtbar, und wo braucht es sofort mehr Aufmerksamkeit?',
    },
    {
      label: 'Sichern',
      title: 'Akute Risiken zuerst klären',
      desc: 'Selbstgefährdung, Kindersicherheit, Versorgung und erreichbare Sofortkontakte priorisieren.',
    },
    {
      label: 'Planen',
      title: 'Krisenvorsorge schriftlich machen',
      desc: 'Warnzeichen, Betreuung, Kontaktkette und Übergaben für belastete Phasen festhalten.',
    },
    {
      label: 'Kooperieren',
      title: 'Freiwillige Hilfe oder Abklärung',
      desc: 'Mit Familie, Netzwerk und Fachstellen den nächsten tragfähigen Schritt bestimmen.',
    },
  ];

  const scoreBands = [
    {
      label: '0–2',
      title: 'tragende Ressourcen genauer sichtbar machen',
      className: mapScoreBandTone('border-emerald-200 bg-emerald-50 text-emerald-950'),
    },
    {
      label: '3–6',
      title: 'vertiefte Begleitung und Krisenvorsorge prüfen',
      className: mapScoreBandTone('border-amber-200 bg-amber-50 text-amber-950'),
    },
    {
      label: '7+',
      title: 'Schutz, Sicherung und formelle Abklärung mitdenken',
      className: mapScoreBandTone('border-red-200 bg-red-50 text-red-950'),
    },
  ];

  const triagePrompts = [
    {
      id: 'acute-danger',
      question: 'Gibt es Hinweise auf akute Selbstgefährdung, Fremdgefährdung oder unmittelbare Unsicherheit für Kinder?',
      yes: {
        title: 'Akute Sicherheit sofort priorisieren',
        text: 'Notruf, Krisendienst oder offizielle Notfallwege gehen vor längerer Abklärung. Kinderbetreuung und Aufsicht sofort mitdenken.',
        target: 'acute-crisis',
        targetLabel: 'Zur Akut-Krise',
        className: mapRecommendationTone('border-red-200 bg-red-50 text-red-950'),
      },
      no: {
        title: 'Akute Gefährdung aktuell nicht im Vordergrund',
        text: 'Die Einschätzung kann ruhiger in Richtung Krisenvorsorge, Alltag und Kooperation weitergeführt werden.',
        target: 'safety-plan',
        targetLabel: 'Zum Sicherheitsplan',
        className: mapRecommendationTone('border-emerald-200 bg-emerald-50 text-emerald-950'),
      },
    },
    {
      id: 'care-gap',
      question: 'Sind Aufsicht, Tagesstruktur, Versorgung oder verlässliche Betreuung der Kinder derzeit brüchig?',
      yes: {
        title: 'Schutz und Entlastung konkret prüfen',
        text: 'Wenn Grundversorgung oder Aufsicht nicht verlässlich sind, braucht es rasch konkrete Hilfe und gegebenenfalls eine Kindesschutzabklärung.',
        target: 'child-protection',
        targetLabel: 'Zum Kindeswohl',
        className: mapRecommendationTone('border-amber-200 bg-amber-50 text-amber-950'),
      },
      no: {
        title: 'Versorgung wirkt aktuell tragfähig',
        text: 'Dann lohnt es sich, tragende Routinen und Schutzfaktoren sichtbar zu halten und nicht nur auf Risiken zu fokussieren.',
        target: 'safety-plan',
        targetLabel: 'Schutzfaktoren absichern',
        className: mapRecommendationTone('border-emerald-200 bg-emerald-50 text-emerald-950'),
      },
    },
    {
      id: 'crisis-plan',
      question: 'Gibt es bereits einen besprochenen Krisen- oder Sicherheitsplan mit Kinder-Schutzteil?',
      yes: {
        title: 'Bestehende Absprachen aktualisieren',
        text: 'Vorhandene Pläne sind hilfreich, wenn sie überprüft, mit Kontakten ergänzt und in stabileren Phasen gemeinsam geübt werden.',
        target: 'safety-plan',
        targetLabel: 'Plan überprüfen',
        className: mapRecommendationTone('border-slate-200 bg-slate-50 text-slate-900'),
      },
      no: {
        title: 'Krisenvorsorge schriftlich machen',
        text: 'Ein kurzer Plan zu Warnzeichen, Kinderbetreuung, Kontaktkette und sicheren Orten entlastet in belasteten Phasen deutlich.',
        target: 'safety-plan',
        targetLabel: 'Plan anlegen',
        className: mapRecommendationTone('border-emerald-200 bg-emerald-50 text-emerald-950'),
      },
    },
    {
      id: 'network',
      question: 'Gibt es mindestens eine mitwissende Bezugsperson oder Fachstelle, die kurzfristig mittragen kann?',
      yes: {
        title: 'Kooperation aktiv nutzen',
        text: 'Bestehende Unterstützung sollte konkret in Absprachen, Übergaben und Rückmeldewegen eingebunden werden.',
        target: 'safety-plan',
        targetLabel: 'Kooperation konkretisieren',
        className: mapRecommendationTone('border-slate-200 bg-slate-50 text-slate-900'),
      },
      no: {
        title: 'Netzwerk rasch erweitern',
        text: 'Fehlende Mitwissende erhöhen die Belastung. Jetzt sind niedrigschwellige Hilfen, Bezugspersonen und Fachstellen besonders wichtig.',
        target: 'child-protection',
        targetLabel: 'Unterstützung prüfen',
        className: mapRecommendationTone('border-amber-200 bg-amber-50 text-amber-950'),
      },
    },
  ];

  const answeredPrompts = triagePrompts.filter((prompt) => triageAnswers[prompt.id]);
  const triagePriorities = answeredPrompts.map((prompt) => prompt[triageAnswers[prompt.id]]);
  const primaryPriority =
    triagePriorities.find((item) => item.target === 'acute-crisis') ||
    triagePriorities.find((item) => item.target === 'child-protection') ||
    triagePriorities.find((item) => item.target === 'safety-plan') ||
    null;

  const setTriageAnswer = (id, answer) => {
    setTriageAnswers((current) => ({
      ...current,
      [id]: current[id] === answer ? undefined : answer,
    }));
  };

  const filteredPracticeBlocks = PRACTICE_BLOCKS.filter(
    (item) => activePracticeFilter === 'all' || item.tags.includes(activePracticeFilter)
  );
  const answeredCount = answeredPrompts.length;
  const triageSummaryText =
    answeredCount === 0
      ? 'Noch keine Fragen beantwortet. Die Triage startet mit akuter Sicherheit und endet bei Kooperation und Absicherung.'
      : `${answeredCount} von ${triagePrompts.length} Fragen beantwortet. Die aktuell wichtigste Spur ist ${primaryPriority?.title?.toLowerCase() ?? 'noch offen'}.`;

  const hero = {
    eyebrow: 'Klinische Orientierung',
    title: 'Toolbox: Orientierung, Schutz und nächste Schritte',
    accent: 'in belasteten Familiensituationen.',
    headingAriaLabel: 'Toolbox: Orientierung, Schutz und nächste Schritte in belasteten Familiensituationen.',
    description:
      'Strukturierte Einschätzung familiärer Belastung als Gesprächshilfe für Abwägung, Schutz und nächste Schritte – nicht als Diagnose- oder Urteilsinstrument.',
    supportingCopy:
      'Hohe Werte bedeuten nicht automatisch Gefährdung. Sie zeigen vor allem an, dass Schutz, Entlastung, Krisenvorsorge und gemeinsame Absprachen genauer betrachtet werden sollten.',
    actions: [
      {
        label: 'Krisenplan herunterladen',
        ariaLabel: 'Krisenplan der Toolbox herunterladen',
        onClick: onDownloadCrisisPlan,
        icon: <Download size={16} />,
      },
      {
        label: 'Arbeitsansicht drucken',
        ariaLabel: 'Arbeitsansicht drucken',
        onClick: onPrint,
        icon: <Printer size={16} />,
        variant: 'secondary',
      },
    ],
    aside: {
      label: 'Arbeitslogik',
      title: 'Sicherheit zuerst, dann Struktur, dann Kooperation',
      copy:
        'Die Seite priorisiert zuerst akute Risiken, danach Versorgung und Kinder-Schutzteil und erst anschliessend die längerfristige Zusammenarbeit mit Netzwerk und Fachstellen.',
      tone: 'soft',
    },
  };

  const assessment = {
    eyebrow: 'Assessment',
    title: 'Belastung orientierend einschätzen',
    description:
      'Die Faktoren dienen als klinische Gesprächshilfe. Sie helfen, relevante Belastungshinweise sichtbar zu machen und daraus Schutz-, Vorsorge- oder Unterstützungsbedarfe abzuleiten.',
    note:
      'Das Instrument ersetzt keine fachliche Gesamtbeurteilung und ist bewusst auf beobachtbare Alltagshinweise fokussiert.',
    scoreAside: {
      label: 'Orientierender Hinweis',
      value: score.risk,
      badge: getRiskLabel(score.risk),
      badgeClassName: getRiskTone(score.risk),
      liveText: assessmentLiveText,
      action: {
        label: 'Assessment zurücksetzen',
        onClick: onResetAssessment,
        icon: <RotateCcw size={16} />,
      },
    },
    itemsLabel: 'Assessment-Faktoren',
    items: ASSESSMENT_ITEMS.map((item) => ({
      id: item.id,
      label: item.label,
      meta: `Wert ${item.val}`,
      checked: score.checked.includes(item.id),
      onChange: () => onToggleAssessment(item.id),
      checkIcon: <Check size={16} />,
    })),
  };

  const pathway = {
    eyebrow: 'Arbeitsweg',
    titlePrefix: 'Von der ersten',
    titleAccent: 'Einordnung zum nächsten tragfähigen Schritt',
    description:
      'Die Toolbox führt nicht linear durch Textblöcke, sondern über eine klare klinische Reihenfolge: zuerst orientieren, dann sichern, danach Krisenvorsorge schriftlich machen und schliesslich Kooperation verbindlich organisieren.',
    summary:
      'Die Reihenfolge schützt vor dem typischen Fehler, zu früh lange zu erklären, obwohl Sicherheit, Kinderbetreuung oder Mitwissende noch ungeklärt sind.',
    aside: {
      label: 'Warum diese Reihenfolge?',
      title: 'Niedriger kognitiver Druck in angespannten Situationen',
      copy:
        'In akuten oder hoch belasteten Lagen helfen kurze Entscheidungen, sichtbare Prioritäten und konkrete Anschlusswege mehr als grosse Informationsmengen.',
    },
    steps: pathwaySteps,
  };

  const scoreBandSection = {
    eyebrow: 'Einordnung',
    description:
      'Die Werte markieren keine Diagnose. Sie helfen lediglich dabei, die Aufmerksamkeit zwischen tragenden Ressourcen, vertiefter Begleitung und möglichem Schutzbedarf zu gewichten.',
    items: scoreBands,
    aside: {
      label: 'Interpretation',
      copy:
        'Auch niedrige Werte können bei einzelnen hoch relevanten Ereignissen dringlich sein. Umgekehrt bedeuten höhere Werte vor allem: genauer hinschauen, absichern, kooperieren.',
    },
  };

  const triage = {
    eyebrow: 'Sofort-Triage',
    titlePrefix: 'Vier kurze Fragen für die',
    titleAccent: 'erste Priorisierung',
    description:
      'Die Ja/Nein-Fragen verdichten die klinische Lage rasch auf die nächste sinnvolle Spur. So entsteht eine sofort handhabbare Reihenfolge statt einer diffusen Sammelliste von Risiken.',
    aside: {
      label: 'Hinweis',
      copy: 'Mehrere positive Hinweise können gleichzeitig bestehen. Die Seite priorisiert deshalb akute Sicherheit vor Schutzschwellen und diese wiederum vor allgemeiner Krisenvorsorge.',
    },
    prompts: triagePrompts.map((prompt) => ({
      id: prompt.id,
      question: prompt.question,
      currentAnswer: triageAnswers[prompt.id],
      onAnswer: (answer) => setTriageAnswer(prompt.id, answer),
      recommendation: triageAnswers[prompt.id]
        ? {
            ...prompt[triageAnswers[prompt.id]],
            onJump: onJumpToPrioritySection,
          }
        : null,
    })),
    status: {
      label: 'Zwischenstand',
      copy: triageSummaryText,
    },
    primaryPriority: primaryPriority
      ? {
          ...primaryPriority,
          onJump: onJumpToPrioritySection,
        }
      : null,
  };

  const practice = {
    eyebrow: 'Praxisblöcke',
    titlePrefix: 'Typische Situationen in',
    titleAccent: 'konkrete Anschlusswege übersetzen',
    description:
      'Die Karten bündeln wiederkehrende klinische Situationen in kurze handlungsorientierte Einstiege. Sie verbinden Gesprächsführung, Schutzfokus und nächste Anlaufstellen.',
    aside: {
      label: 'Nutzung',
      copy: 'Die Filter helfen, je nach Anlass rasch den passenden Arbeitsmodus zu finden – etwa Krise, Kinderschutz, Vernetzung oder Gespräch.',
    },
    filterAriaLabel: 'Praxisblöcke filtern',
    filters: PRACTICE_BLOCK_FILTERS.map((filter) => ({
      ...filter,
      active: activePracticeFilter === filter.id,
      onSelect: () => setActivePracticeFilter(filter.id),
    })),
    items: filteredPracticeBlocks.map((item) => ({
      ...item,
      onJump: onJumpToPrioritySection,
    })),
  };

  const clusters = useMemo(
    () => [
      {
        id: 'acute-crisis',
        sectionRef: acuteCrisisSectionRef,
        eyebrow: 'Akute Krise',
        titlePrefix: 'Sofort handeln bei',
        titleAccent: 'unmittelbarer Gefahr',
        description: [
          'Akute Selbstgefährdung, Fremdgefährdung oder unmittelbare Unsicherheit für Kinder gehen jedem längeren Gespräch vor.',
          'Die ersten Schritte sollen entlasten, strukturieren und Kinder sowie andere abhängige Personen sofort mitdenken.',
        ],
        aside: {
          label: 'Merksatz',
          title: 'Nicht zuerst erklären, sondern sichern',
          copy: 'Wenn Zeitdruck, Intoxikation, Desorganisation oder akute Hoffnungslosigkeit im Raum stehen, sind klare Notfallwege wichtiger als vertiefte Exploration.',
          tone: 'accent',
        },
        actions: [
          {
            label: 'Krisenplan herunterladen',
            onClick: onDownloadCrisisPlan,
            icon: <Download size={16} />,
            variant: 'primary',
          },
        ],
        listCards: ACUTE_CRISIS_STEPS.map((step, index) => ({
          title: `Sofort-Schritt ${index + 1}`,
          text: step,
          icon: <AlertTriangle size={18} />,
          className: 'bg-white',
        })),
        disclosureItems: ACUTE_CRISIS_CONTACTS.map((contact) => ({
          title: contact.name,
          summaryAriaLabel: `Kontaktinformation ${contact.name}`,
          content: [contact.note],
          actionLabel: contact.link ? 'Kontakt öffnen' : null,
          href: contact.link,
          target: contact.link ? '_blank' : undefined,
          rel: contact.link ? 'noreferrer' : undefined,
          actionIcon: contact.link ? <ExternalLink size={14} /> : null,
        })),
      },
      {
        id: 'safety-plan',
        sectionRef: safetyPlanSectionRef,
        eyebrow: 'Krisenvorsorge',
        titlePrefix: 'Ein kurzer',
        titleAccent: 'Sicherheits- und Kinder-Schutzteil',
        description: [
          'Ein schriftlicher Plan reduziert Entscheidungsdruck in belasteten Phasen und schafft eine gemeinsame Sprache für Warnzeichen, Kontakte und Übergaben.',
          'Besonders wichtig ist der Kinder-Schutzteil: Wer übernimmt Betreuung, Information und sichere Orte, wenn Symptome eskalieren?',
        ],
        aside: {
          label: 'Ziel',
          title: 'Aus diffuser Sorge wird eine konkrete Abfolge',
          copy: 'Der Plan muss kurz, mitwissend und alltagstauglich bleiben. Er hilft nur dann, wenn er in einer belasteten Situation tatsächlich verwendbar ist.',
          tone: 'soft',
        },
        actions: [
          {
            label: 'Krisenplan herunterladen',
            onClick: onDownloadCrisisPlan,
            icon: <Download size={16} />,
            variant: 'primary',
          },
          {
            label: 'Druckansicht öffnen',
            onClick: onPrint,
            icon: <Printer size={16} />,
            variant: 'secondary',
          },
        ],
        listCards: SAFETY_PLAN_POINTS.map((item, index) => ({
          title: `Baustein ${index + 1}`,
          text: item,
          icon: <ShieldCheck size={18} />,
          className: 'bg-white',
        })),
        gridCards: SAFETY_PLAN_TEMPLATE_FIELDS.map((field) => ({
          label: 'Leitfrage',
          title: field.title,
          copy: field.hint,
          tone: 'soft',
        })),
        gridClassName: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3',
      },
      {
        id: 'child-protection',
        sectionRef: childProtectionSectionRef,
        eyebrow: 'Kindeswohl',
        titlePrefix: 'Wann freiwillige Hilfe reicht und wann',
        titleAccent: 'Schutzschwellen enger werden',
        description: [
          'Nicht jede hohe Belastung verlangt sofort eine formelle Meldung. Entscheidend ist, ob Aufsicht, Sicherheit, Nahrung, medizinische Versorgung und Schutz vor Gewalt verlässlich gewährleistet sind.',
          'Wenn das nicht mehr tragfähig erscheint, braucht es eine vertiefte fachliche Klärung und gegebenenfalls eine Kindesschutzabklärung.',
        ],
        aside: {
          label: 'Arbeitsfokus',
          title: 'Beobachtbares vor Deutung',
          copy: 'Für Schutzfragen sind konkrete Hinweise zu Versorgung, Aufsicht, Gewalt, Rückzug oder Krisenverlauf hilfreicher als vorschnelle diagnostische Zuschreibungen.',
          tone: 'default',
        },
        gridCards: CHILD_PROTECTION_THRESHOLDS.map((item) => ({
          label: 'Schwelle',
          title: item.title,
          copy: item.text,
          tone: 'default',
        })),
        listCards: CHILD_PROTECTION_TIPS.map((tip, index) => ({
          title: `Leitfrage ${index + 1}`,
          text: tip,
          icon: <CheckCircle2 size={18} />,
          className: 'bg-[var(--surface-panel)]',
        })),
      },
      {
        id: 'addiction',
        sectionRef: addictionSectionRef,
        eyebrow: 'Sucht und Komorbidität',
        titlePrefix: 'Substanzkonsum und psychische Symptome',
        titleAccent: 'gemeinsam betrachten',
        description:
          'Wenn psychische Erkrankung und Substanzkonsum zusammenkommen, steigen oft Sicherheitsrisiken, Impulsivität und Belastungen in der Kinderbetreuung. Darum braucht es klare Regeln ohne Beschämung.',
        aside: {
          label: 'Klinische Haltung',
          title: 'Sicherheit statt Moral',
          copy: 'Hilfreich ist eine nüchterne Sprache: Auswirkungen im Alltag benennen, konkrete Grenzen formulieren und Hilfewege offen halten.',
          tone: 'soft',
        },
        gridCards: ADDICTION_PANELS.map((panel) => ({
          label: 'Einordnung',
          title: panel.title,
          copy: panel.text,
          tone: 'default',
        })),
        listCards: ADDICTION_TIPS.map((tip, index) => ({
          title: `Leitlinie ${index + 1}`,
          text: tip,
          icon: <ChevronRight size={18} />,
          className: 'bg-white',
        })),
      },
      {
        id: 'rights',
        sectionRef: rightsSectionRef,
        eyebrow: 'Rolle und Rechte',
        titlePrefix: 'Schweigepflicht, Rückmeldung und',
        titleAccent: 'pragmatische Orientierung',
        description:
          'Angehörige und Fachpersonen verlieren in belasteten Situationen oft Zeit, weil unklar ist, was mitgeteilt werden darf und was nicht. Die FAQ bündeln die wichtigsten alltagsnahen Klärungen.',
        aside: {
          label: 'Kurzformel',
          title: 'Mitteilen ist oft eher möglich als Rückmeldung erhalten',
          copy: 'Beobachtungen zu Alltag, Krise oder Kindersicherheit dürfen in der Regel weitergegeben werden. Grenzen betreffen meist detaillierte Behandlungsinformationen.',
          tone: 'default',
        },
        disclosureItems: RIGHTS_FAQ.map((item) => ({
          title: item.question,
          summaryAriaLabel: `FAQ ${item.question}`,
          content: [item.answer],
        })),
      },
    ],
    [
      acuteCrisisSectionRef,
      childProtectionSectionRef,
      addictionSectionRef,
      rightsSectionRef,
      onDownloadCrisisPlan,
      onPrint,
      safetyPlanSectionRef,
    ]
  );

  const toolboxPrintView = (
    <div className="toolbox-print-view bg-white text-slate-950">
      <div className="mx-auto flex w-full max-w-[840px] flex-col gap-6 p-6 text-[12px] leading-relaxed">
        <header className="toolbox-print-block rounded-[1.5rem] border border-slate-300 bg-white p-6">
          <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-500">Relational Recovery · Toolbox Arbeitsansicht</p>
          <h1 className="mt-3 text-[2rem] font-black leading-tight text-slate-950">Orientierung, Schutz und nächste Schritte</h1>
          <p className="mt-3 m-0 text-sm text-slate-700">
            Kompakte Gesprächs- und Protokollansicht für akute Belastung, Krisenvorsorge und nächste verlässliche Schritte.
          </p>
        </header>

        <section className="toolbox-print-section toolbox-print-grid-two gap-4">
          <div className="toolbox-print-block rounded-[1.25rem] border border-slate-300 p-5">
            <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-500">Kurzlage</p>
            <div className="mt-4 space-y-3">
              <div>
                <p className="m-0 font-bold text-slate-900">Beobachtbare Hinweise / Anlass</p>
                <div className="mt-2 h-20 rounded-xl border border-slate-300 bg-white" />
              </div>
              <div>
                <p className="m-0 font-bold text-slate-900">Tragende Ressourcen / Mitwissende</p>
                <div className="mt-2 h-16 rounded-xl border border-slate-300 bg-white" />
              </div>
            </div>
          </div>

          <div className="toolbox-print-block rounded-[1.25rem] border border-slate-300 p-5">
            <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-500">Sofort-Triage</p>
            <div className="mt-4 space-y-3">
              {triagePrompts.map((prompt, index) => (
                <div key={prompt.id} className="toolbox-print-block rounded-xl border border-slate-300 px-4 py-3">
                  <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.16em] text-slate-500">Frage {index + 1}</p>
                  <p className="mt-1 mb-2 font-semibold text-slate-900">{prompt.question}</p>
                  <div className="flex gap-4 text-sm text-slate-700">
                    <span>☐ Ja</span>
                    <span>☐ Nein</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="toolbox-print-section toolbox-print-section-compact rounded-[1.25rem] border border-slate-300 p-5">
          <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-500">Krisenvorsorge und Kinder-Schutzteil</p>
          <div className="toolbox-print-grid-two mt-4 gap-4">
            {SAFETY_PLAN_TEMPLATE_FIELDS.map((field) => (
              <div key={field.title} className="toolbox-print-block rounded-xl border border-slate-300 p-4">
                <p className="m-0 font-bold text-slate-900">{field.title}</p>
                <p className="mt-1 mb-3 text-sm text-slate-600">{field.hint}</p>
                <div className="h-24 rounded-lg border border-slate-300 bg-white" />
              </div>
            ))}
          </div>
        </section>

        <section className="toolbox-print-section rounded-[1.25rem] border border-slate-300 p-5">
          <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-500">Nächste verlässliche Schritte</p>
          <div className="toolbox-print-grid-two mt-4 gap-3">
            {SAFETY_PLAN_POINTS.map((item, index) => (
              <div key={item} className="toolbox-print-block rounded-xl border border-slate-300 px-4 py-3">
                <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.16em] text-slate-500">Baustein {index + 1}</p>
                <p className="mt-1 m-0 font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
          <div className="toolbox-print-grid-two toolbox-print-followup-grid mt-4 gap-4">
            <div>
              <p className="m-0 font-bold text-slate-900">Zuständigkeit / nächste Kontaktaufnahme</p>
              <div className="mt-2 h-20 rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <p className="m-0 font-bold text-slate-900">Datum / Rückmeldung / Follow-up</p>
              <div className="mt-2 h-20 rounded-xl border border-slate-300 bg-white" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const closingSection = createClosingSectionModel({
    id: 'toolbox-next-steps',
    eyebrow: 'Weiterarbeiten',
    title: 'Von Priorisierung zu',
    accent: 'konkreten nächsten Schritten.',
    description:
      'Die Toolbox endet nicht bei Orientierung. Im Anschluss helfen druckbare Arbeitsmittel und die nächsten passenden Seitentypen dabei, Gespräche, Einordnung und Weitervermittlung tatsächlich umzusetzen.',
    paragraphs: [
      'Wenn eine akute Spur sichtbar wird, sollte sie in eine kurze schriftliche Absprache, einen Kontakt oder eine abgestimmte Weitervermittlung übersetzt werden.',
      'Wenn die Lage weniger akut ist, tragen oft Glossar, Grundlagen oder Netzwerk dazu bei, Sprache, Arbeitslogik und Anschlussversorgung zu stabilisieren.',
    ],
    aside: {
      label: 'Praxisnutzen',
      title: 'Kurz halten, festhalten, weiterleiten',
      copy: 'Gerade in hoch belasteten Situationen hilft weniger ein grosser Informationsblock als ein kleiner nächster Schritt mit klarer Zuständigkeit.',
      tone: 'soft',
    },
    printView: toolboxPrintView,
    primaryActions: [
      {
        kind: 'download',
        title: 'Krisenplan als Textvorlage',
        description: 'Bearbeitbare Kurzvorlage für Warnzeichen, Kontaktkette, Kinderbetreuung, sichere Orte und nächste Schritte.',
        meta: ['TXT editierbar', 'Krise / Vorsorge'],
        actionLabel: 'Vorlage herunterladen',
        ariaLabel: 'Krisenplan als Textvorlage aus der Toolbox herunterladen',
        onClick: onDownloadCrisisPlan,
        actionIcon: <Download size={14} />,
      },
      {
        kind: 'custom',
        title: 'Arbeitsansicht drucken',
        description: 'Praktisch für Gespräch, Supervision oder gemeinsame Krisenvorsorge im Team oder mit Angehörigen.',
        meta: ['Print', 'Gespräch / Team'],
        actionLabel: 'Druckansicht öffnen',
        ariaLabel: 'Druckansicht der Toolbox-Arbeitsansicht öffnen',
        onClick: onPrint,
        actionIcon: <Printer size={14} />,
      },
    ],
  });

  return (
    <ToolboxPageTemplate
      hero={hero}
      pageHeadingId={getPageHeadingId('toolbox')}
      assessment={assessment}
      scoreStatusId={SCORE_STATUS_ID}
      pathway={pathway}
      scoreBands={scoreBandSection}
      triage={triage}
      practice={practice}
      clusters={clusters}
      closingSection={closingSection}
    />
  );
}
