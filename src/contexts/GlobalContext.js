'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');

  const updateActiveSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const state = useMemo(
    () => ({
      activeSection,
      updateActiveSection,
    }),
    [activeSection, updateActiveSection]
  );

  // Return the provider with the state values
  return <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};
