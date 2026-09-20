import { GitHubIcon, LinkedInIcon } from '@/components/shared/BrandIcons';

const socialButton = [
  {
    href: 'https://www.linkedin.com/in/kevin-sauvage/',
    icon: <LinkedInIcon size={30} />,
    id: 'linkedin',
    text: 'Visit my LinkedIn',
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    href: 'https://github.com/kevinsauvage/',
    icon: <GitHubIcon size={30} />,
    id: 'github',
    text: 'Visit my GitHub',
    ariaLabel: 'Visit my GitHub profile',
  },
];

export default socialButton;
