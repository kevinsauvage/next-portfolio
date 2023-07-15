import About from '@/sections/About/About';
import Banner from '@/sections/Banner/Banner';
import Contact from '@/sections/Contact/Contact';
import Experiences from '@/sections/Experiences/Experiences';
import Expertise from '@/sections/Expertises/Expertises';
import Projects from '@/sections/Projects/Projects';
import Skills from '@/sections/Skills/Skills';
import IconCodeSlash from '@/svg/IconCodeSlash';
import IconEmailOutline from '@/svg/IconEmailOutline';
import IconHandExtendedOutline from '@/svg/IconHandExtendedOutline';
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
    title:
      'Discover the person behind the work: <strong>my passion</strong>, <strong>expertise</strong>, and <strong>experience</strong>.',
  },
  {
    component: Expertise,
    icon: <IconHandExtendedOutline />,
    label: 'My Expertise',
    title: 'Discover my diverse range of <strong>services and skills</strong>.',
  },
  {
    component: Experiences,
    icon: <IconSuitcase />,
    label: 'My Experience',
    title:
      'Explore my <strong>work history</strong> and <strong>achievements</strong> in the related field.',
  },
  {
    component: Projects,
    icon: <IconCodeSlash />,
    label: 'My Projects',
    title: 'Take a tour of my personal <strong>projects</strong>.',
  },
  {
    component: Skills,
    icon: <IconShapeOutline />,
    label: 'My Skills',
    title: 'Discover the range of <strong>skills</strong> and <strong>tools</strong> I use.',
  },
  {
    component: Contact,
    icon: <IconEmailOutline />,
    label: 'Contact Me',
    subtitle: '',
    title: 'Get <strong>in touch</strong>',
  },
];

export default sections;
