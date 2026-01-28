'use client';

import dynamic from 'next/dynamic';

const TestimonialsSectionDynamic = dynamic(
  () => import('@/components/features/home/TestimonialsSection')
);

export default TestimonialsSectionDynamic;
