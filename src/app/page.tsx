import dynamic from 'next/dynamic';

import AboutSection from '@/components/features/home/AboutSection';
import ContactSection from '@/components/features/home/ContactSection';
import Hero from '@/components/features/home/Hero';
import SpinnerLoader from '@/components/shared/SpinnerLoader';

const PortfolioSection = dynamic(() => import('@/components/features/home/PortfolioSection'), {
  loading: () => (
    <div className='flex justify-center items-center min-h-[400px]'>
      <SpinnerLoader />
    </div>
  ),
});

const CareerSection = dynamic(() => import('@/components/features/home/CareerSection'), {
  loading: () => (
    <div className='flex justify-center items-center min-h-[400px]'>
      <SpinnerLoader />
    </div>
  ),
});

const CertificationsSection = dynamic(
  () => import('@/components/features/home/CertificationsSection'),
  {
    loading: () => (
      <div className='flex justify-center items-center min-h-[400px]'>
        <SpinnerLoader />
      </div>
    ),
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/features/home/TestimonialsSection'),
  {
    loading: () => (
      <div className='flex justify-center items-center min-h-[400px]'>
        <SpinnerLoader />
      </div>
    ),
  }
);

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
