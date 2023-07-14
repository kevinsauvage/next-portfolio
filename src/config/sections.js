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
    subtitle:
      'Discover the person behind the work: my passion, expertise, and experience that drive my creative vision.',
    title: 'Who <strong>am I</strong>',
  },
  {
    component: Expertise,
    icon: <IconHandExtendedOutline />,
    label: 'My Expertise',
    subtitle:
      'Discover a diverse range of services and skills tailored to exceed your expectations and meet your unique needs.',
    title: 'My <strong>Expertise</strong>',
  },
  {
    component: Experiences,
    icon: <IconSuitcase />,
    label: 'My Experience',
    subtitle:
      'Explore my work history and achievements in the related field, showcasing my professional journey and expertise.',
    title: 'Work <strong>history</strong>',
  },
  {
    component: Projects,
    icon: <IconCodeSlash />,
    label: 'My Projects',
    subtitle:
      'Take a tour of my development projects, featuring a diverse range of creations that showcase my skills and creativity.',
    title: 'Things I’ve <strong>Built</strong>',
  },
  {
    component: Skills,
    icon: <IconShapeOutline />,
    label: 'My Skills',
    subtitle:
      'Discover the range of skills and tools I utilize to bring projects to life and achieve outstanding results.',
    title: 'My Range of <strong>Skills</strong>',
  },
  {
    component: Contact,
    icon: <IconEmailOutline />,
    label: 'Contact Me',
    showSubtitle: true,
    subtitle:
      "Although I am not currently seeking new opportunities, I value building meaningful connections and expanding my network. Please feel free to reach out if you have any questions or just want to say hello. I'll do my best to respond as soon as possible. Thank you for your interest!",
    title: 'Get <strong>in touch</strong>',
  },
];

export default sections;
