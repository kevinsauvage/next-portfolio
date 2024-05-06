'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';

const Hamburger: React.FC = () => {
  const { openMenu, closeMenu, openOnMobile } = useGlobalContext();

  const lineSharedClass =
    'absolute bg-slate-50 h-1 w-full rounded transform transition-all duration-300';

  const firstLineClass = `left-0 ${lineSharedClass} ${
    openOnMobile ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-0'
  }`;
  const secondLineClass = `top-1/2 transform -translate-y-1/2 left-0 ${lineSharedClass} ${
    openOnMobile ? 'opacity-0' : ''
  }`;
  const thirdLineClass = `left-0 ${lineSharedClass} ${
    openOnMobile ? '-rotate-45 bottom-1/2 translate-y-1/2' : 'bottom-0 '
  }`;

  return (
    <button
      className="relative z-50 w-8 h-8 border-none bg-transparent cursor-pointer lg:hidden"
      onClick={() => (openOnMobile ? closeMenu() : openMenu())}
    >
      <span className={firstLineClass} />
      <span className={secondLineClass} />
      <span className={thirdLineClass} />
    </button>
  );
};

export default Hamburger;
