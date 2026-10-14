import Reveal from '@/components/shared/Reveal';
import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import certifications from '@/config/content/certifications';

import CertificationCard from './CertificationCard';

import clsx from 'clsx';

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
            <Reveal
              key={cert.id}
              delay={index * 60}
              className={clsx('h-full', cert.featured && 'lg:col-span-2')}
            >
              <CertificationCard {...cert} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CertificationsSection;
