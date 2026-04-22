import { BookOpenText } from 'lucide-react';
import glossarIllustration from '../assets/illustration-glossar.webp';
import { GLOSSARY_GROUPS, GLOSSARY_HERO, GLOSSARY_INTRO } from '../data/glossaryContent';
import GlossarPageTemplate from '../templates/GlossarPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';
import { createClosingSectionModel } from '../utils/closingModel';

export default function GlossarSection() {
  const closingSection = createClosingSectionModel({
    id: 'glossar-weiter',
    eyebrow: 'Weiterarbeit',
    title: 'Begriffe klären,',
    accent: 'dann anwenden.',
    paragraphs: [
      'Das Glossar ist als Nachschlagewerk gedacht — nicht als Leseliste. Wenn ein Begriff klar ist, liegt der nächste Schritt in der Praxis: im Gespräch, in der Einschätzung, in der Vernetzung.',
    ],
    relatedLinks: {
      eyebrow: 'Nächste Schritte',
      title: 'Direkt weiterarbeiten',
      items: [
        { label: 'Toolbox: Orientierung und Triage', target: 'toolbox' },
        { label: 'Evidenz: Fachliche Grundlagen', target: 'evidenz' },
        { label: 'Material: Handouts für das Gespräch', target: 'material' },
      ],
    },
  });

  return (
    <GlossarPageTemplate
      hero={{
        ...GLOSSARY_HERO,
        icon: BookOpenText,
        accentColor: 'var(--accent-info-strong)',
        asideTone: 'highlight',
        image: glossarIllustration,
        imageAlt: 'Illustration zweier überlappender Sprechblasen – Metapher für gemeinsame Fachsprache und Dialog.',
      }}
      pageHeadingId={getPageHeadingId('glossar')}
      intro={GLOSSARY_INTRO}
      groups={GLOSSARY_GROUPS}
      closingSection={closingSection}
    />
  );
}
