import NavigationPresenter from '@/components/_scopes/header/NavigationPresenter';
import Logo from '@/components/Logo';

type Properties = {
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isAtTop: boolean;
  children: React.ReactNode;
};

const Header = ({ children, isScrollingUp, isScrollingDown, isAtTop }: Properties) => (
  <header
    className={`w-full fixed top-0 right-0 left-0 z-30 bg-transparent  will-change-auto transition-all
    ${isAtTop && 'py-6'}
    ${isScrollingUp && !isAtTop && 'py-4 translate-y-0 bg-slate-950/50 backdrop-blur-md lg:py-0'} 
    ${isScrollingDown && !isAtTop && '-translate-y-full backdrop-blur-md'} 
    ${isAtTop && 'bg-transparent backdrop-blur-0'}`}
  >
    <div className="container px-3 flex justify-between m-auto items-center">
      <Logo />
      <NavigationPresenter />
      {children}
    </div>
  </header>
);

export default Header;
