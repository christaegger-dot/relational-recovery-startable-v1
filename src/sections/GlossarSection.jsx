import { BookOpenText } from 'lucide-react';
import glossarIllustration from '../assets/illustration-glossar.webp';
import { GLOSSARY_GROUPS, GLOSSARY_HERO, GLOSSARY_INTRO } from '../data/glossaryContent';
import GlossarPageTemplate from '../templates/GlossarPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';

export default function GlossarSection() {
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
    />
  );
}
