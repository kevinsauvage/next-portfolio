import { GitHubIcon, LinkedInIcon } from '@/components/shared/BrandIcons';
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site';

export const socialLinks = [
  {
    id: 'linkedin',
    href: LINKEDIN_URL,
    icon: LinkedInIcon,
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    id: 'github',
    href: GITHUB_URL,
    icon: GitHubIcon,
    ariaLabel: 'Visit my GitHub profile',
  },
] as const;
