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
  closeMenu: () => void;
  openMenu: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const threshold = 350;

let lastScrollTop = 0;
let lastScrollUp = 0;
let lastScrollDown = 0;
const GlobalProvider = ({ children }: GlobalProviderProperties) => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [openOnMobile, setOpenOnMobile] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
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
  }, []);

  // Control the header's scroll direction when the user scrolls
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.style.overflow = openOnMobile ? 'hidden' : 'auto';
  }, [openOnMobile]);

  const closeMenu = useCallback(() => {
    setOpenOnMobile(false);
  }, []);

  const openMenu = useCallback(() => {
    setOpenOnMobile(true);
  }, []);

  const value = useMemo(
    () => ({
      closeMenu,
      isAtTop,
      isScrollingDown,
      isScrollingUp,
      openMenu,
      openOnMobile,
    }),
    [isScrollingUp, isScrollingDown, isAtTop, openOnMobile, closeMenu, openMenu],
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
