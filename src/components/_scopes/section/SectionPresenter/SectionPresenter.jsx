'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useOnScreen from '@/hooks/useOnScreen';
import { getSectionLabel } from '@/utils';

import Section from '../Section/Section';

const SectionPresenter = ({ label, ...rest }) => {
  const router = useRouter();

  const { isIntersecting, reference } = useOnScreen({
    rootMargin: '0px',
    threshold: 0.5,
  });

  useEffect(() => {
    if (!isIntersecting) return;
    router.replace(`/#${getSectionLabel(label)}`, { scroll: false });
  }, [isIntersecting, label, router]);

  return <Section {...rest} label={label} reference={reference} />;
};

export default SectionPresenter;
