import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Body, BodySmall, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import certifications from '@/config/content/certifications';
import { gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { Award, Building2, Calendar, ExternalLink } from 'lucide-react';
import CertificationCard from './CertificationCard';

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
            <CertificationCard key={`${cert.issuer}-${cert.title}`} {...cert} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CertificationsSection;
