import { FaCode, FaEnvelope, FaSuitcase, FaTools, FaUser } from 'react-icons/fa';

export type Sections = Array<{
  icon: React.ReactNode;
  label: string;
  TitleTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
}>;

const sections: Sections = [
  {
    TitleTag: 'h2',
    icon: <FaCode />,
    label: 'My Expertises',
    title: 'What I Do',
  },
  {
    TitleTag: 'h3',
    icon: <FaUser />,
    label: 'About Me',
    title: 'Getting to Know Me',
  },
  {
    TitleTag: 'h4',
    icon: <FaSuitcase />,
    label: 'My Experience',
    title: 'Where I’ve Worked',
  },
  {
    TitleTag: 'h5',
    icon: <FaTools />,
    label: 'My Skills',
    title: 'My Technical Skills',
  },
  {
    TitleTag: 'h6',
    icon: <FaCode />,
    label: 'My Projects',
    title: 'My digital solutions',
  },
  {
    TitleTag: 'h6',
    icon: <FaEnvelope />,
    label: 'Contact Me',
    title: "Let's work together",
  },
];

export default sections;
