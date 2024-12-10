import Header from './Header';

const HeaderPresenter = () => {
  return (
    <header className="absolute top-3 left-0 z-50 w-full bg-opacity-95">
      <div className="flex justify-between m-auto items-center xl:container p-4">
        <Header />
      </div>
    </header>
  );
};

export default HeaderPresenter;
