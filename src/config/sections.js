import dynamic from 'next/dynamic';

// import Expertise from '@/sections/Expertises/Expertises';
// import IconHandExtendedOutline from '@/svg/IconHandExtendedOutline';
import Banner from '@/sections/Banner/Banner';
import IconCodeSlash from '@/svg/IconCodeSlash';
import IconEmailOutline from '@/svg/IconEmailOutline';
import IconIconHome from '@/svg/IconIconHome';
import IconShapeOutline from '@/svg/IconShapeOutline';
import IconSuitcase from '@/svg/IconSuitcase';
import IconUser from '@/svg/IconUser';

const Skills = dynamic(() => import('@/sections/Skills/Skills'), { suspense: true });
const Projects = dynamic(() => import('@/sections/Projects/Projects'), { suspense: true });
const Experiences = dynamic(() => import('@/sections/Experiences/Experiences'), { suspense: true });
const Contact = dynamic(() => import('@/sections/Contact/Contact'), { suspense: true });
const About = dynamic(() => import('@/sections/About/About'), { suspense: true });

const sections = [
  { component: Banner, icon: <IconIconHome />, label: 'Introduction' },
  {
    component: About,
    icon: <IconUser />,
    label: 'About Me',
    tagLevel: 2,
    title:
      "Lifelong <strong>learner</strong> embracing <strong>technology's</strong> evolution to deliver <strong>high-quality results</strong>.",
  },
  /*   {
    component: Expertise,
    icon: <IconHandExtendedOutline />,
    label: 'My Expertise',
    title:
      'Create  <strong>engaging</strong> user interfaces and <strong>interactive experiences</strong>.',
  }, */
  {
    component: Experiences,
    icon: <IconSuitcase />,
    label: 'My Experience',
    tagLevel: 3,
    title: 'Explore my <strong>work history</strong> and <strong>achievements</strong>.',
  },
  {
    component: Projects,
    icon: <IconCodeSlash />,
    label: 'My Projects',
    tagLevel: 4,
    title:
      '<strong>Immerse yourself</strong> in a gallery of my <strong>digital solutions</strong>.',
  },
  {
    component: Skills,
    icon: <IconShapeOutline />,
    label: 'My Skills',

    tagLevel: 5,
    title: 'Witness <strong>my coding skills</strong> and <strong>craftsmanship</strong>.',
  },
  {
    component: Contact,
    icon: <IconEmailOutline />,
    label: 'Contact Me',

    subtitle: '',
    tagLevel: 6,
    title: "Let's <strong>work together</strong>.",
  },
];

export default sections;
