import About from '@/sections/About/About';
import Banner from '@/sections/Banner/Banner';
import Contact from '@/sections/Contact/Contact';
import Experiences from '@/sections/Experiences/Experiences';
import Projects from '@/sections/Projects/Projects';
import IconCodeSlash from '@/svg/IconCodeSlash';
import IconEmailOutline from '@/svg/IconEmailOutline';
import IconIconHome from '@/svg/IconIconHome';
import IconSuitcase from '@/svg/IconSuitcase';
import IconUser from '@/svg/IconUser';

const sections = [
  {
    component: <Banner />,
    icon: <IconIconHome />,
    label: 'Introduction',
    style: { height: '100vh' },
    tagLevel: 1,
  },
  {
    component: <About />,
    icon: <IconUser />,
    label: 'About Me',
    tagLevel: 2,
    title: 'Beyond the Code: Getting to Know Me',
  },
  {
    component: <Experiences />,
    icon: <IconSuitcase />,
    label: 'My Experience',
    tagLevel: 3,
    title: 'Explore my work history and achievements.',
  },
  {
    component: <Projects />,
    icon: <IconCodeSlash />,
    label: 'My Projects',
    tagLevel: 4,
    title: 'Immerse yourself in my digital solutions.',
  },
  {
    component: <Contact />,
    icon: <IconEmailOutline />,
    label: 'Contact Me',
    subtitle: '',
    tagLevel: 5,
    title: "Let's work together.",
  },
];

export default sections;
