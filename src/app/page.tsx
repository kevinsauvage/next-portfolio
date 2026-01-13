import AboutSection from '@/components/features/home/AboutSection';
import CareerSection from '@/components/features/home/CareerSection';
import CertificationsSection from '@/components/features/home/CertificationsSection';
import ContactSection from '@/components/features/home/ContactSection';
import Hero from '@/components/features/home/Hero';
import PortfolioSection from '@/components/features/home/PortfolioSection';
import TestimonialsSection from '@/components/features/home/TestimonialsSection';

const Home = () => {
  return (
    <div className='h-full w-full grow flex flex-col justify-between m-auto'>
      <Hero />
      <div className='container m-auto px-6'>
        <AboutSection />
        <PortfolioSection />
        <CareerSection />
        <CertificationsSection />
        <TestimonialsSection />
      </div>
      <ContactSection />
    </div>
  );
};

export default Home;
