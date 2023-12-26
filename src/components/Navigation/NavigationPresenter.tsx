'use client';

import { useEffect, useState } from 'react';

import sections from '@/config/sections';

import Navigation from './Navigation';

const sectionIds = sections.map((section) => section.id);

const NavigationPresenter = () => {
  const [activeSectionId, setActive] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const currentSection = sectionIds.find((sectionId) => {
        const section = document.querySelector(`#${sectionId}`) as HTMLElement;

        if (section) {
          const sectionTop = section.offsetTop - 50;
          const sectionBottom = sectionTop + section.offsetHeight;

          return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
        }
        return false;
      });

      if (currentSection) {
        setActive(currentSection);
      } else {
        setActive('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Navigation activeSectionId={activeSectionId} />;
};

export default NavigationPresenter;
