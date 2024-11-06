const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2 className="text-5xl font-bold text-zinc-300 font-heading md:whitespace-nowrap">
      {children}
    </h2>
  );
};

export default SectionTitle;
