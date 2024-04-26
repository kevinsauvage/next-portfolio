/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement } from 'react';

import {
  LucideBriefcaseBusiness,
  LucideCode2,
  LucideHammer,
  LucideSend,
  LucideUser2,
} from 'lucide-react';

export type Sections = Array<{
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  label: string;
  title: string;
  id: string;
  position: string;
}>;

const sections: Sections = [
  // {
  //   icon: <FaCode />,
  //   id: 'expertise',
  //   label: 'My Expertises',
  //   title: 'What I Do',
  // },
  {
    icon: <LucideUser2 />,
    id: 'about',
    label: 'About Me',
    position: '01',
    title: 'Getting to Know Me',
  },
  {
    icon: <LucideBriefcaseBusiness />,
    id: 'experience',
    label: 'My Experience',
    position: '02',
    title: 'Where I’ve Worked',
  },
  {
    icon: <LucideHammer />,
    id: 'skills',
    label: 'My Skills',
    position: '03',
    title: 'My Technical Skills',
  },
  {
    icon: <LucideCode2 />,
    id: 'projects',
    label: 'My Projects',
    position: '04',
    title: 'My digital solutions',
  },
  {
    icon: <LucideSend />,
    id: 'contact',
    label: 'Contact Me',
    position: '05',
    title: "Let's work together",
  },
];

export default sections;
