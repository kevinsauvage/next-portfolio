import AboutSection from '@/components/_scopes/section/AboutSection';
import CareerSection from '@/components/_scopes/section/CareerSection';
import CertificationsSection from '@/components/_scopes/section/CertificationsSection';
import ContactSection from '@/components/_scopes/section/ContactSection';
import Hero from '@/components/_scopes/section/Hero';
import PortfolioSection from '@/components/_scopes/section/PortfolioSection';
import TestimonialsSection from '@/components/_scopes/section/TestimonialsSection';

const Home = () => {
  return (
    <div className='h-full w-full grow flex flex-col justify-between m-auto' id='home'>
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
