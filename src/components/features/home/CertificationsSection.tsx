import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import certifications from '@/config/content/certifications';

import CertificationCard from './CertificationCard';

const CertificationsSection: React.FC = () => {
  return (
    <Section id='certifications'>
      <div className='space-y-24'>
        <SectionHeader
          overline={sections.certifications.overline}
          title={sections.certifications.title}
          description={sections.certifications.description}
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} {...cert} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CertificationsSection;
