'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';

import Hamburger from '../Navigation/Hamburger/Hamburger';

import Header from './Header';

const HeaderPresenter = () => {
  const { isAtTop, isScrollingUp, isScrollingDown } = useGlobalContext();

  return (
    <Header isScrollingUp={isScrollingUp} isScrollingDown={isScrollingDown} isAtTop={isAtTop}>
      <Hamburger />
    </Header>
  );
};

export default HeaderPresenter;
