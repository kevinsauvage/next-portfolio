import dynamic from 'next/dynamic';

import Banner from '@/sections/Banner/Banner';
import IconCodeSlash from '@/svg/IconCodeSlash';
import IconEmailOutline from '@/svg/IconEmailOutline';
import IconIconHome from '@/svg/IconIconHome';
import IconSuitcase from '@/svg/IconSuitcase';
import IconUser from '@/svg/IconUser';

const Projects = dynamic(() => import('@/sections/Projects/Projects'), { suspense: true });
const Experiences = dynamic(() => import('@/sections/Experiences/Experiences'), { suspense: true });
const Contact = dynamic(() => import('@/sections/Contact/Contact'), { suspense: true });
const About = dynamic(() => import('@/sections/About/About'), { suspense: true });

const sections = [
  {
    component: Banner,
    icon: <IconIconHome />,
    label: 'Introduction',
  },
  {
    component: About,
    icon: <IconUser />,
    label: 'About Me',
    tagLevel: 2,
  },

  {
    component: Experiences,
    icon: <IconSuitcase />,
    label: 'My Experience',
    tagLevel: 3,
    title: 'Explore my work history</strong> and achievements</strong>.',
  },
  {
    component: Projects,
    icon: <IconCodeSlash />,
    label: 'My Projects',
    tagLevel: 4,
    title: 'Immerse yourself</strong> in a gallery of my digital solutions</strong>.',
  },
  {
    component: Contact,
    icon: <IconEmailOutline />,
    label: 'Contact Me',

    subtitle: '',
    tagLevel: 6,
    title: "Let's work together</strong>.",
  },
];

export default sections;
