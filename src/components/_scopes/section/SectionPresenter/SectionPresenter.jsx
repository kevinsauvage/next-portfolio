'use client';

import { useEffect } from 'react';

import { useGlobalContext } from '@/contexts/GlobalContext';
import useOnScreen from '@/hooks/useOnScreen';

import Section from '../Section/Section';

const SectionPresenter = ({ label, ...rest }) => {
  const { isIntersecting, reference } = useOnScreen({
    rootMargin: '0px',
    threshold: 0.7,
  });

  const { updateActiveSection } = useGlobalContext();

  useEffect(() => {
    if (isIntersecting) {
      updateActiveSection(label);
    }
  }, [isIntersecting, label, updateActiveSection]);

  return <Section {...rest} label={label} reference={reference} />;
};

export default SectionPresenter;
