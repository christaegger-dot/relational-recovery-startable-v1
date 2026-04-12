import { GLOSSARY_GROUPS, GLOSSARY_HERO, GLOSSARY_INTRO } from '../data/glossaryContent';
import GlossarPageTemplate from '../templates/GlossarPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';

export default function GlossarSection() {
  return (
    <GlossarPageTemplate
      hero={GLOSSARY_HERO}
      pageHeadingId={getPageHeadingId('glossar')}
      intro={GLOSSARY_INTRO}
      groups={GLOSSARY_GROUPS}
    />
  );
}
