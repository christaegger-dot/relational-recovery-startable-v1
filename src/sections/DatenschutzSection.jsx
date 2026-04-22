import { DATENSCHUTZ_CONTENT } from '../data/legalContent';
import LegalPageTemplate from '../templates/LegalPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';

export default function DatenschutzSection() {
  return (
    <LegalPageTemplate
      content={DATENSCHUTZ_CONTENT}
      pageHeadingId={getPageHeadingId('datenschutz')}
      standNotice={DATENSCHUTZ_CONTENT.standNotice}
    />
  );
}
