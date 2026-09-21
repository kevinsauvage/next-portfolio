import dynamic from 'next/dynamic';

import Hero from '@/components/features/home/Hero';

const AboutSection = dynamic(() => import('@/components/features/home/AboutSection'));
const CareerSection = dynamic(() => import('@/components/features/home/CareerSection'));
const TestimonialsSection = dynamic(() => import('@/components/features/home/TestimonialsSection'));
const PortfolioSection = dynamic(() => import('@/components/features/home/PortfolioSection'));
const CertificationsSection = dynamic(
  () => import('@/components/features/home/CertificationsSection')
);
const FaqSection = dynamic(() => import('@/components/features/home/FaqSection'));
const ContactSection = dynamic(() => import('@/components/features/home/ContactSection'));

const Home = () => {
  return (
    <div className='h-full w-full grow flex flex-col justify-between m-auto'>
      <Hero />
      <AboutSection />
      <CareerSection />
      <TestimonialsSection />
      <PortfolioSection />
      <CertificationsSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default Home;
