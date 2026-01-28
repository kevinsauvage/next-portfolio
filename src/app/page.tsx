import { Suspense } from 'react';

import AboutSection from '@/components/features/home/AboutSection';
import CareerSectionDynamic from '@/components/features/home/CareerSectionDynamic';
import CertificationsSectionDynamic from '@/components/features/home/CertificationsSectionDynamic';
import ContactSection from '@/components/features/home/ContactSection';
import Hero from '@/components/features/home/Hero';
import PortfolioSectionDynamic from '@/components/features/home/PortfolioSectionDynamic';
import TestimonialsSectionDynamic from '@/components/features/home/TestimonialsSectionDynamic';
import SpinnerLoader from '@/components/shared/SpinnerLoader';

const Home = () => {
  return (
    <div className='h-full w-full grow flex flex-col justify-between m-auto'>
      <Hero />
      <div className='container m-auto px-6'>
        <AboutSection />
        <Suspense
          fallback={
            <div className='flex justify-center items-center min-h-[400px]'>
              <SpinnerLoader />
            </div>
          }
        >
          <PortfolioSectionDynamic />
        </Suspense>
        <Suspense
          fallback={
            <div className='flex justify-center items-center min-h-[400px]'>
              <SpinnerLoader />
            </div>
          }
        >
          <CareerSectionDynamic />
        </Suspense>
        <Suspense
          fallback={
            <div className='flex justify-center items-center min-h-[400px]'>
              <SpinnerLoader />
            </div>
          }
        >
          <CertificationsSectionDynamic />
        </Suspense>
        <Suspense
          fallback={
            <div className='flex justify-center items-center min-h-[400px]'>
              <SpinnerLoader />
            </div>
          }
        >
          <TestimonialsSectionDynamic />
        </Suspense>
      </div>
      <ContactSection />
    </div>
  );
};

export default Home;
