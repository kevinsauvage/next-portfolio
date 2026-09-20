import CertificationsSection from '@/components/features/home/CertificationsSection';
import FaqSection from '@/components/features/home/FaqSection';
import PortfolioSection from '@/components/features/home/PortfolioSection';
import TestimonialsCarousel from '@/components/features/home/TestimonialsCarousel';
import Footer from '@/components/layout/Footer';
import testimonials from '@/config/content/testimonials';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

/**
 * These components are rendered in isolation, so page-level rules that depend
 * on the surrounding document (`region`, `heading-order`) are disabled.
 * ARIA, labeling, alt text, and semantics rules stay enabled.
 */
const axeOptions = {
  rules: {
    'heading-order': { enabled: false },
    region: { enabled: false },
  },
};

const expectNoViolations = async (ui: React.ReactElement) => {
  const { container } = render(ui);
  expect(await axe(container, axeOptions)).toHaveNoViolations();
};

describe('accessibility (axe)', () => {
  it('Footer has no violations', async () => {
    await expectNoViolations(<Footer />);
  });

  it('FAQ section has no violations', async () => {
    await expectNoViolations(<FaqSection />);
  });

  it('Certifications section has no violations', async () => {
    await expectNoViolations(<CertificationsSection />);
  });

  it('Portfolio section has no violations', async () => {
    await expectNoViolations(<PortfolioSection />);
  });

  it('Testimonials carousel has no violations', async () => {
    await expectNoViolations(<TestimonialsCarousel testimonials={testimonials} />);
  });
});
