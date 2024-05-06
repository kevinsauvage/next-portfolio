'use client';

import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';

const sectionIds = sections.map((section) => section.id);

const NavigationPresenter = () => {
  const { openOnMobile } = useGlobalContext();
  const [activeSectionId, setActive] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const currentSection = sectionIds.find((sectionId) => {
        const section = document.querySelector(`#${sectionId}`) as HTMLElement;

        if (section) {
          const sectionTop = section.getBoundingClientRect().top + scrollPosition;
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

  return <Navigation activeSectionId={activeSectionId} isOpen={openOnMobile} />;
};

export default NavigationPresenter;
