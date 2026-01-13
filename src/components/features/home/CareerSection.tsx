import Section, { SectionHeader } from '@/components/ui/Section';
import { jobs, sections } from '@/config/content';
import { stackSpacing } from '@/design-system/tokens';

import CareerCard from './CareerCard';

const CareerSection = () => {
  return (
    <Section id='career'>
      <div className={stackSpacing['2xl']}>
        <SectionHeader
          overline={sections.career.overline}
          title={sections.career.title}
          description={sections.career.description}
        />

        <div className={stackSpacing.lg}>
          {jobs.map((job, index) => (
            <CareerCard key={job.id} {...job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CareerSection;
