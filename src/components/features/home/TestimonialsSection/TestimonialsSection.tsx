import { Card, CardContent, CardFooter, CardIcon } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Body, Caption } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import testimonials from '@/config/content/testimonials';
import { gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, Calendar, Quote, User } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

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
            <TestimonialCard
              key={`${testimonial.author.name}-${index}`}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
