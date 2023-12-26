type Properties = {
  children: React.ReactNode;
  id?: string;
};

const SectionPresenter = ({ children, id }: Properties) => <div id={id}>{children}</div>;

export default SectionPresenter;
