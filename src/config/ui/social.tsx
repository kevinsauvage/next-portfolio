import { GitHubIcon, LinkedInIcon } from '@/components/shared/BrandIcons';
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site';

const socialButton = [
  {
    href: LINKEDIN_URL,
    icon: <LinkedInIcon size={30} />,
    id: 'linkedin',
    text: 'Visit my LinkedIn',
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    href: GITHUB_URL,
    icon: <GitHubIcon size={30} />,
    id: 'github',
    text: 'Visit my GitHub',
    ariaLabel: 'Visit my GitHub profile',
  },
];

export default socialButton;
