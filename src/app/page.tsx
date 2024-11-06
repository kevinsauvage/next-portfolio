import AboutSection from '@/components/_scopes/section/AboutSection';
import ContactSection from '@/components/_scopes/section/ContactSection';
import ExperienceSection from '@/components/_scopes/section/ExperienceSection';
import ProjectSection from '@/components/_scopes/section/ProjectSection';
import GoogleReCaptchaProviderWrapper from '@/components/GoogleReCaptchaProviderWrapper';
import Hero from '@/components/Hero';

const Home = () => (
  <div className="h-full w-full grow flex flex-col justify-between m-auto">
    <Hero />
    <AboutSection />
    <ProjectSection />
    <ExperienceSection />
    <GoogleReCaptchaProviderWrapper>
      <ContactSection />
    </GoogleReCaptchaProviderWrapper>
  </div>
);

export default Home;
