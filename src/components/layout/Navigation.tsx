'use client';

import { useEffect, useState } from 'react';

import { layout } from '@/config/content';

import NavigationView from './NavigationView';

const navItems = layout.header.navigation.items;

const Navigation: React.FC<{
  menuOpen: boolean;
  closeMenu: () => void;
}> = ({ closeMenu }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <NavigationView navItems={navItems} activeSection={activeSection} closeMenu={closeMenu} />;
};

export default Navigation;
