'use client';

import Hamburger from '@/components/_scopes/header/Hamburger';
import Header from '@/components/_scopes/layout/Header';
import { useGlobalContext } from '@/contexts/GlobalContext';

const HeaderPresenter = () => {
  const { isAtTop, isScrollingUp, isScrollingDown } = useGlobalContext();

  return (
    <Header isScrollingUp={isScrollingUp} isScrollingDown={isScrollingDown} isAtTop={isAtTop}>
      <Hamburger />
    </Header>
  );
};

export default HeaderPresenter;
