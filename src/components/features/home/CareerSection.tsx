import Reveal from '@/components/shared/Reveal';
import Section, { SectionHeader } from '@/components/ui/Section';
import { jobs, sections } from '@/config/content';

import CareerCard from './CareerCard';

const CareerSection = () => {
  return (
    <Section id='career'>
      <div className='space-y-24'>
        <SectionHeader
          overline={sections.career.overline}
          title={sections.career.title}
          description={sections.career.description}
        />

        <div className='space-y-12'>
          {jobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 60} className='h-full'>
              <CareerCard {...job} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CareerSection;
