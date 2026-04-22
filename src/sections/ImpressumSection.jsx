import { IMPRESSUM_CONTENT } from '../data/legalContent';
import LegalPageTemplate from '../templates/LegalPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';

export default function ImpressumSection() {
  return <LegalPageTemplate content={IMPRESSUM_CONTENT} pageHeadingId={getPageHeadingId('impressum')} />;
}
