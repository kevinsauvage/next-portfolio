import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import testimonials from '@/config/content/testimonials';
import { gapSpacing, stackSpacing } from '@/design-system/tokens';

import TestimonialCard from './TestimonialCard';

import clsx from 'clsx';

const TestimonialsSection: React.FC = () => {
  return (
    <Section id='testimonials'>
      <div className={stackSpacing.lg}>
        <SectionHeader
          overline={sections.testimonials.overline}
          title={sections.testimonials.title}
          description={sections.testimonials.description}
        />

        <div className={clsx('grid grid-cols-1 lg:grid-cols-2', gapSpacing.md)}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
