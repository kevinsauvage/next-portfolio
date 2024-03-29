import { FaCode, FaEnvelope, FaSuitcase, FaTools, FaUser } from 'react-icons/fa';

export type Sections = Array<{
  icon: React.ReactNode;
  label: string;
  title: string;
  id: string;
  position: string;
}>;

const sections: Sections = [
  // {
  //   icon: <FaCode role="presentation" />,
  //   id: 'expertise',
  //   label: 'My Expertises',
  //   title: 'What I Do',
  // },
  {
    icon: <FaUser role="presentation" />,
    id: 'about',
    label: 'About Me',
    position: '01',
    title: 'Getting to Know Me',
  },
  {
    icon: <FaSuitcase role="presentation" />,
    id: 'experience',
    label: 'My Experience',
    position: '02',
    title: 'Where I’ve Worked',
  },
  {
    icon: <FaTools role="presentation" />,
    id: 'skills',
    label: 'My Skills',
    position: '03',
    title: 'My Technical Skills',
  },
  {
    icon: <FaCode role="presentation" />,
    id: 'projects',
    label: 'My Projects',
    position: '04',
    title: 'My digital solutions',
  },
  {
    icon: <FaEnvelope role="presentation" />,
    id: 'contact',
    label: 'Contact Me',
    position: '05',
    title: "Let's work together",
  },
];

export default sections;
