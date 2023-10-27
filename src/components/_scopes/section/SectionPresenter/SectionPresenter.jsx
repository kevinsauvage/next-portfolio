'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { useRouter } from 'next/navigation';

import useOnScreen from '@/hooks/useOnScreen';
import { getSectionLabel } from '@/utils';

import Section from '../Section/Section';

const trackedSection = [];

const SectionPresenter = ({ label, ...rest }) => {
  const router = useRouter();

  const { isIntersecting, reference } = useOnScreen({
    rootMargin: '0px',
    threshold: 0.5,
  });

  useEffect(() => {
    if (!isIntersecting) return;
    router.push(`/#${getSectionLabel(label)}`, { scroll: false });
    if (!trackedSection.includes(label)) {
      track('Section visible', { label });
      trackedSection.push(label);
    }
  }, [isIntersecting, label, router]);

  return <Section {...rest} label={label} reference={reference} />;
};

export default SectionPresenter;
