import { H2 } from '@/components/Typography';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <H2
      gradient
      className='animate-gradient bg-[length:200%_auto] text-4xl md:text-5xl lg:text-6xl'
    >
      {children}
    </H2>
  );
};

export default SectionTitle;
