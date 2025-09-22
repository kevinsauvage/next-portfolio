import { useTranslations } from 'next-intl';

import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

import clsx from 'clsx';

const CareerItem: React.FC<{
  company: string;
  description: string;
  period: string;
  position: string;
}> = ({ company, description, period, position }) => {
  return (
    <>
      <p className='text-zinc-300 text-base font-light whitespace-nowrap'>{period}</p>
      <BoxWithBackground>
        <div
          className={clsx(
            'p-6 flex flex-col justify-between items-center',
            'bg-gradient-to-t from-zinc-950 to-zinc-900/70',
          )}
        >
          <div className='pb-8 w-full flex flex-col justify-between sm:items-center gap-y-2 gap-x-12 flex-wrap sm:flex-row'>
            <h3 className='text-2xl font-medium text-zinc-200 leading-5 font-heading text-nowrap'>
              {company}
            </h3>
            <p className='text-zinc-300 font-light text-xl whitespace-nowrap'>{position}</p>
          </div>
          <div>
            <p className='text-zinc-300 font-light text-xl leading-6'>{description}</p>
          </div>
        </div>
      </BoxWithBackground>
    </>
  );
};

const CareerSection = () => {
  const t = useTranslations('home.career');
  const id = useTranslations('shared.header.nav');

  const jobs = ['first', 'second', 'third'].map(item => ({
    company: t(`jobs.${item}.company`),
    description: t(`jobs.${item}.description`),
    period: t(`jobs.${item}.period`),
    position: t(`jobs.${item}.position`),
  }));

  return (
    <Section id={id('career')?.toLowerCase()} className='lg:grid lg:grid-cols-5 gap-20'>
      <SectionHeader className='col-span-2'>
        <SectionTitle>{t('title')}</SectionTitle>
        <SectionDescription>{t('description')}</SectionDescription>
      </SectionHeader>
      <div className='grid items-stretch grid-cols-1 gap-5 lg:col-span-3'>
        {jobs.map((item, index) => (
          <CareerItem key={index} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default CareerSection;
