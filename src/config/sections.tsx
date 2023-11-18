import { FaUser } from 'react-icons/fa';
import { FaSuitcase } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';

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
    title: 'Beyond the Code: Getting to Know Me',
  },
  {
    icon: <FaSuitcase />,
    label: 'My Experience',
    tagLevel: 3,
    title: 'Explore my work history and achievements',
  },
  {
    icon: <FaCode />,
    label: 'My Projects',
    tagLevel: 4,
    title: 'Immerse yourself in my digital solutions',
  },
  {
    icon: <FaEnvelope />,
    label: 'Contact Me',
    tagLevel: 5,
    title: "Let's work together",
  },
];

export default sections;
