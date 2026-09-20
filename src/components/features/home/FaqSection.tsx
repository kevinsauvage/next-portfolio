import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import faqs from '@/config/content/faq';

import FaqItem from './FaqItem';

const FaqSection: React.FC = () => {
  return (
    <Section id='faq'>
      <div className='space-y-12 md:space-y-16'>
        <SectionHeader
          overline={sections.faq.overline}
          title={sections.faq.title}
          description={sections.faq.description}
        />

        <div className='mx-auto w-full max-w-3xl divide-y divide-zinc-800/70 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/70'>
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.id}
              id={faq.id}
              index={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FaqSection;
