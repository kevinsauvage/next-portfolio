import IconEmailOutline from '@/svg/IconEmailOutline';
import IconGithub from '@/svg/IconGithub';
import IconLinkedinCircled from '@/svg/IconLinkedinCircled';
import IconUser from '@/svg/IconUser';

const socialButton = [
  {
    href: 'https://www.linkedin.com/in/kevin-sauvage/',
    icon: <IconLinkedinCircled />,
    text: 'Visit my Linkedin',
  },
  { href: 'https://github.com/kevinsauvage/', icon: <IconGithub />, text: 'Visit my Github' },
  { href: `/kevin-sauvage-cv.pdf`, icon: <IconUser />, text: 'Download my curriculum' },
  {
    href: 'mailto:kevinsauvage@outlook.com',
    icon: <IconEmailOutline />,
    text: 'Send me an e-mail',
  },
];

export default socialButton;
