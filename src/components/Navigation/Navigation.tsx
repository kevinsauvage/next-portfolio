'use client';

import Link from 'next/link';

import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';

import AnimatedContainer from '../AnimatedContainer/AnimatedContainer';

import NavItem from './NavItem/NavItem';

import styles from './Navigation.module.scss';

type NavigationProperties = { activeSectionId: string; isOpen: boolean };

const Navigation: React.FC<NavigationProperties> = ({ activeSectionId, isOpen }) => {
  const { toggleOpenOnMobile } = useGlobalContext();

  return (
    <AnimatedContainer
      className={`${styles.Navigation} ${isOpen && styles.open}`}
      Tag="nav"
      from={{ opacity: 0, y: -50 }}
      to={{
        delay: 0.1,
        duration: 0.2,
        opacity: 1,
        stagger: {
          amount: 0.1,
        },
        y: 0,
      }}
      triggerClassName=".animated-navigation-item"
    >
      <ul>
        {sections.slice(0, -1).map((section) => (
          <li
            key={section.id}
            className="animated-navigation-item"
            style={{
              opacity: 0,
            }}
          >
            <NavItem id={section.id} label={section.id} activeSectionId={activeSectionId} />
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className={`${styles.button} animated-navigation-item`}
        aria-label="Get in Touch - Scroll to the contact section"
        onClick={toggleOpenOnMobile}
      >
        Contact me
      </Link>
    </AnimatedContainer>
  );
};

export default Navigation;
