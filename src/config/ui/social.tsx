import { LucideGithub, LucideLinkedin } from 'lucide-react';

const socialButton = [
  {
    href: 'https://www.linkedin.com/in/kevin-sauvage/',
    icon: <LucideLinkedin size={30} strokeWidth={1} />,
    id: 'linkedin',
    text: 'Visit my LinkedIn',
  },
  {
    href: 'https://github.com/kevinsauvage/',
    icon: <LucideGithub size={30} strokeWidth={1} />,
    id: 'github',
    text: 'Visit my GitHub',
  },
];

export default socialButton;
