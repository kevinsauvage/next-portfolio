'use client';

import { useEffect, useRef, useState } from 'react';

import { layout } from '@/config/content';

import NavigationView from './NavigationView';

const navItems = layout.header.navigation.items;
const sectionIds = navItems.map(item => item.href.substring(1));
const defaultSection = 'home';

const Navigation: React.FC<{
  menuOpen: boolean;
  closeMenu: () => void;
}> = ({ closeMenu }) => {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const visibleSectionsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        // Update visible sections based on intersection entries
        entries.forEach(entry => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSectionsRef.current.add(id);
          } else {
            visibleSectionsRef.current.delete(id);
          }
        });

        // Find the last (bottom-most) visible section based on DOM order
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          if (id && visibleSectionsRef.current.has(id)) {
            setActiveSection(id);
            return;
          }
        }

        // Fallback to default if no sections are visible
        if (visibleSectionsRef.current.size === 0) {
          setActiveSection(defaultSection);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.25],
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <NavigationView navItems={navItems} activeSection={activeSection} closeMenu={closeMenu} />;
};

export default Navigation;
