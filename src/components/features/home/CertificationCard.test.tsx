import CertificationCard from './CertificationCard';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const baseProps = {
  id: 'ef-set-c1',
  index: 0,
  title: 'C1 English Certificate',
  issuer: 'EF SET',
  date: 'March 2024',
  description: 'Advanced English for international teams.',
  skills: ['English'],
};

describe('CertificationCard', () => {
  it('links the credential when a URL is provided', () => {
    render(<CertificationCard {...baseProps} credentialUrl='https://cert.efset.org/x' />);

    const link = screen.getByRole('link', { name: /view credential/i });
    expect(link).toHaveAttribute('href', 'https://cert.efset.org/x');
    expect(link).toHaveAttribute('data-analytics-cert-id', 'ef-set-c1');
  });

  it('renders no credential link without a URL', () => {
    render(<CertificationCard {...baseProps} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
