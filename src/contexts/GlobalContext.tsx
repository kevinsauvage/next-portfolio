'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type GlobalProviderProperties = {
  children: ReactNode;
};

type GlobalContextType = {
  isAtTop: boolean;
  isScrollingDown: boolean;
  isScrollingUp: boolean;
  openOnMobile: boolean;
  toggleOpenOnMobile: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const threshold = 350;

const GlobalProvider = ({ children }: GlobalProviderProperties) => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [openOnMobile, setOpenOnMobile] = useState<boolean>(false);

  // Control the header's scroll direction when the page loads
  useEffect(() => {
    const { scrollTop } = document.documentElement;

    if (scrollTop > 0) {
      setIsScrollingDown(true);
      setIsScrollingUp(false);
    }
  }, []);

  // Control the header's scroll direction when the user scrolls
  useEffect(() => {
    let lastScrollTop = 0;
    let lastScrollUp = 0;
    let lastScrollDown = 0;

    const handleScroll = () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop < 50) setIsAtTop(true);
      else setIsAtTop(false);

      // Handle scroll up
      if (scrollTop < lastScrollTop) {
        lastScrollUp = scrollTop;

        if (lastScrollUp < lastScrollDown - threshold || scrollTop < 50) {
          setIsScrollingUp(true);
          setIsScrollingDown(false);
        }
      }

      // Handle scroll down
      if (scrollTop > lastScrollTop) {
        lastScrollDown = scrollTop;

        if (lastScrollDown > lastScrollUp + threshold) {
          setIsScrollingUp(false);
          setIsScrollingDown(true);
        }
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openOnMobile ? 'hidden' : 'auto';
  }, [openOnMobile]);

  const toggleOpenOnMobile = useCallback(() => {
    setOpenOnMobile((previous) => !previous);
  }, []);

  const value = useMemo(
    () => ({
      isAtTop,
      isScrollingDown,
      isScrollingUp,
      openOnMobile,
      toggleOpenOnMobile,
    }),
    [isScrollingUp, isScrollingDown, isAtTop, openOnMobile, toggleOpenOnMobile],
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
