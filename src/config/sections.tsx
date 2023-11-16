import IconCodeSlash from '@/svg/IconCodeSlash';
import IconEmailOutline from '@/svg/IconEmailOutline';
import IconSuitcase from '@/svg/IconSuitcase';
import IconUser from '@/svg/IconUser';

export type Sections = Array<{
  icon: React.ReactNode;
  label: string;
  tagLevel: number;
  title: string;
}>;

const sections: Sections = [
  {
    icon: <IconUser />,
    label: 'About Me',
    tagLevel: 2,
    title: 'Beyond the Code: Getting to Know Me',
  },
  {
    icon: <IconSuitcase />,
    label: 'My Experience',
    tagLevel: 3,
    title: 'Explore my work history and achievements',
  },
  {
    icon: <IconCodeSlash />,
    label: 'My Projects',
    tagLevel: 4,
    title: 'Immerse yourself in my digital solutions',
  },
  {
    icon: <IconEmailOutline />,
    label: 'Contact Me',
    tagLevel: 5,
    title: "Let's work together",
  },
];

export default sections;
