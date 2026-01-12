import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import testimonials from '@/config/content/testimonials';
import { stackSpacing } from '@/design-system/tokens';

import TestimonialsCarousel from './TestimonialsCarousel';

const TestimonialsSection: React.FC = () => {
  return (
    <Section id='testimonials'>
      <div className={stackSpacing.lg}>
        <SectionHeader
          overline={sections.testimonials.overline}
          title={sections.testimonials.title}
          description={sections.testimonials.description}
        />

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </Section>
  );
};

export default TestimonialsSection;
