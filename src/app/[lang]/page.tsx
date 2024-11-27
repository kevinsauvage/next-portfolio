import AboutSection from '@/components/_scopes/section/AboutSection';
import CareerSection from '@/components/_scopes/section/CareerSection';
import ContactSection from '@/components/_scopes/section/ContactSection';
import Hero from '@/components/_scopes/section/Hero';
import PortfolioSection from '@/components/_scopes/section/PortfolioSection';
import GoogleReCaptchaProviderWrapper from '@/components/GoogleReCaptchaProviderWrapper';

const Home = ({ params: { lang } }: { params: { lang: string } }) => (
  <div className="h-full w-full grow flex flex-col justify-between m-auto">
    <Hero lang={lang} />
    <div className="container m-auto px-4">
      <AboutSection lang={lang} />
      <PortfolioSection lang={lang} />
      <CareerSection lang={lang} />
    </div>
    <GoogleReCaptchaProviderWrapper>
      <ContactSection lang={lang} />
    </GoogleReCaptchaProviderWrapper>
  </div>
);

export default Home;
