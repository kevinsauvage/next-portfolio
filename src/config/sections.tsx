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
  {
    icon: <LucideUser2 />,
    id: 'about',
    label: 'About Me',
    position: '01',
    title: 'Who I Am',
  },
  {
    icon: <LucideBriefcaseBusiness />,
    id: 'experience',
    label: 'My Experience',
    position: '02',
    title: 'Where I Worked',
  },
  {
    icon: <LucideHammer />,
    id: 'skills',
    label: 'My Skills',
    position: '03',
    title: 'What I Do',
  },
  {
    icon: <LucideCode2 />,
    id: 'projects',
    label: 'My Projects',
    position: '04',
    title: 'What I Built',
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
