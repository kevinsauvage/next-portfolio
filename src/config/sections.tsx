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
    icon: <FaTools />,
    label: 'My Skills',
    tagLevel: 2,
    title: 'My Technical Skills',
  },
  {
    icon: <FaUser />,
    label: 'About Me',
    tagLevel: 3,
    title: 'Getting to Know Me',
  },
  {
    icon: <FaSuitcase />,
    label: 'My Experience',
    tagLevel: 4,
    title: 'Explore my work history',
  },
  {
    icon: <FaCode />,
    label: 'My Projects',
    tagLevel: 5,
    title: 'Dive into my digital solutions',
  },
  {
    icon: <FaEnvelope />,
    label: 'Contact Me',
    tagLevel: 6,
    title: "Let's work together",
  },
];

export default sections;
