import About from '@/sections/About/About';
import Banner from '@/sections/Banner/Banner';
import Contact from '@/sections/Contact/Contact';
import Experiences from '@/sections/Experiences/Experiences';
// import Expertise from '@/sections/Expertises/Expertises';
import Projects from '@/sections/Projects/Projects';
import Skills from '@/sections/Skills/Skills';
import IconCodeSlash from '@/svg/IconCodeSlash';
import IconEmailOutline from '@/svg/IconEmailOutline';
// import IconHandExtendedOutline from '@/svg/IconHandExtendedOutline';
import IconIconHome from '@/svg/IconIconHome';
import IconShapeOutline from '@/svg/IconShapeOutline';
import IconSuitcase from '@/svg/IconSuitcase';
import IconUser from '@/svg/IconUser';

const sections = [
  { component: Banner, icon: <IconIconHome />, label: 'Introduction' },
  {
    component: About,
    icon: <IconUser />,
    label: 'About Me',
    tagLevel: 2,
    title:
      "Lifelong learner embracing technology's evolution to deliver <strong>high-quality results</strong>.",
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
    title: 'Immerse yourself in a gallery of my <strong>handcrafted digital solutions</strong>.',
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
    title: 'Reach out to explore how we can <strong>work together</strong>.',
  },
];

export default sections;
