import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html');
    html.style.overflow = menuIsOpen ? 'hidden' : '';
  }, [menuIsOpen]);

  const updateActiveSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const updateMenuOpen = useCallback((isOpen) => {
    setMenuIsOpen(isOpen);
  }, []);

  const state = useMemo(
    () => ({
      activeSection,
      menuIsOpen,
      updateActiveSection,
      updateMenuOpen,
    }),
    [activeSection, updateActiveSection, updateMenuOpen, menuIsOpen]
  );

  // Return the provider with the state values
  return <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return { ...context };
};
