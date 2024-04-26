import {
  LucideBriefcaseBusiness,
  LucideCode2,
  LucideHammer,
  LucideSend,
  LucideUser2,
} from 'lucide-react';

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
    icon: <LucideUser2 role="presentation" />,
    id: 'about',
    label: 'About Me',
    position: '01',
    title: 'Getting to Know Me',
  },
  {
    icon: <LucideBriefcaseBusiness role="presentation" />,
    id: 'experience',
    label: 'My Experience',
    position: '02',
    title: 'Where I’ve Worked',
  },
  {
    icon: <LucideHammer role="presentation" />,
    id: 'skills',
    label: 'My Skills',
    position: '03',
    title: 'My Technical Skills',
  },
  {
    icon: <LucideCode2 role="presentation" />,
    id: 'projects',
    label: 'My Projects',
    position: '04',
    title: 'My digital solutions',
  },
  {
    icon: <LucideSend role="presentation" />,
    id: 'contact',
    label: 'Contact Me',
    position: '05',
    title: "Let's work together",
  },
];

export default sections;
