type Properties = { children: React.ReactNode; id?: string };

const Section = ({ children, id }: Properties) => {
  return (
    <section id={id} className="mt-10 mb-60">
      {children}
    </section>
  );
};

export default Section;
