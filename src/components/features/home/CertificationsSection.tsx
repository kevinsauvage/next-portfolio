import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import certifications from '@/config/content/certifications';
import { gapSpacing, stackSpacing } from '@/design-system/tokens';

import CertificationCard from './CertificationCard';

import clsx from 'clsx';

const CertificationsSection: React.FC = () => {
  return (
    <Section id='certifications'>
      <div className={clsx(stackSpacing['2xl'])}>
        <SectionHeader
          overline={sections.certifications.overline}
          title={sections.certifications.title}
          description={sections.certifications.description}
        />

        <div className={clsx('grid grid-cols-1 lg:grid-cols-2', gapSpacing.xl)}>
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} {...cert} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CertificationsSection;
