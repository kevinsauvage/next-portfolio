import { FaUser } from 'react-icons/fa';
import { FaSuitcase } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';

export type Sections = Array<{
  icon: React.ReactNode;
  label: string;
  tagLevel: number;
  title: string;
}>;

const sections: Sections = [
  {
    icon: <FaUser />,
    label: 'About Me',
    tagLevel: 2,
    title: 'Getting to Know Me',
  },
  {
    icon: <FaTools />,
    label: 'My Skills',
    tagLevel: 3,
    title: 'My Technical Skills',
  },
  {
    icon: <FaSuitcase />,
    label: 'My Experience',
    tagLevel: 4,
    title: 'Where I’ve Worked',
  },
  {
    icon: <FaCode />,
    label: 'My Projects',
    tagLevel: 5,
    title: 'My digital solutions',
  },
  {
    icon: <FaEnvelope />,
    label: 'Contact Me',
    tagLevel: 6,
    title: "Let's work together",
  },
];

export default sections;
