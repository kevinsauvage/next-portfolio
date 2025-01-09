import { useTranslations } from 'next-intl';

import AboutSection from '@/components/_scopes/section/AboutSection';
import CareerSection from '@/components/_scopes/section/CareerSection';
import ContactSection from '@/components/_scopes/section/ContactSection';
import Hero from '@/components/_scopes/section/Hero';
import PortfolioSection from '@/components/_scopes/section/PortfolioSection';
import GoogleReCaptchaProviderWrapper from '@/components/GoogleReCaptchaProviderWrapper';

const Home = () => {
  const t = useTranslations('shared.header.nav');

  return (
    <div
      className="h-full w-full grow flex flex-col justify-between m-auto"
      id={t('home')?.toLowerCase()}
    >
      <Hero />
      <div className="container m-auto px-4">
        <AboutSection />
        <PortfolioSection />
        <CareerSection />
      </div>
      <GoogleReCaptchaProviderWrapper>
        <ContactSection />
      </GoogleReCaptchaProviderWrapper>
    </div>
  );
};

export default Home;
