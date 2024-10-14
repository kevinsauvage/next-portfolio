import Section from '@/components/_scopes/section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUpTitle';
import about, { BOLD_WORDS } from '@/config/about.config';
import sections, { Sections } from '@/config/sections';

const label = 'About Me';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

type AboutItemType = { content: string };

type Properties = { item: AboutItemType } & React.HTMLAttributes<HTMLLIElement>;

const AboutItem = ({ item, className }: Properties) => {
  const { content } = item || {};
  const regexPattern = new RegExp(BOLD_WORDS.join('|'), 'gi');

  return (
    <li className={`mb-4 text-lg text-slate-300 ${className}`}>
      <p
        dangerouslySetInnerHTML={{
          __html: content.replaceAll(regexPattern, '<strong class="text-slate-50">$&</strong>'),
        }}
      />
    </li>
  );
};

const About = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <ul>
      {about.map((item) => (
        <AboutItem key={item.content} item={item} className="animated-about" />
      ))}
    </ul>
  </Section>
);

export default About;
