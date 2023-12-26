import { FaCode, FaEnvelope, FaSuitcase, FaTools, FaUser } from 'react-icons/fa';

export type Sections = Array<{
  icon: React.ReactNode;
  label: string;
  title: string;
}>;

const sections: Sections = [
  {
    icon: <FaCode />,
    label: 'My Expertises',
    title: 'What I Do',
  },
  {
    icon: <FaUser />,
    label: 'About Me',
    title: 'Getting to Know Me',
  },
  {
    icon: <FaSuitcase />,
    label: 'My Experience',
    title: 'Where I’ve Worked',
  },
  {
    icon: <FaTools />,
    label: 'My Skills',
    title: 'My Technical Skills',
  },
  {
    icon: <FaCode />,
    label: 'My Projects',
    title: 'My digital solutions',
  },
  {
    icon: <FaEnvelope />,
    label: 'Contact Me',
    title: "Let's work together",
  },
];

export default sections;
