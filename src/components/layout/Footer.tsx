import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import { BodySmall, H3, H4 } from '@/components/ui/Typography';
import { layout } from '@/config/content';
import { colors } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, CheckCircle2, Code2, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer
      className='border-t border-zinc-800 bg-zinc-950/50'
      role='contentinfo'
      aria-label='Site footer'
    >
      <div className='container m-auto px-6 py-12'>
        <div className='mb-10 text-center md:text-left'>
          <H3 className='mb-2'>{layout.footer.name}</H3>
          <BodySmall className='max-w-sm'>{layout.footer.tagline}</BodySmall>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8'>
          <nav aria-label='Footer navigation'>
            <H4 className='mb-4'>{layout.footer.sections.quickLinks.title}</H4>
            <ul className='space-y-2'>
              {layout.footer.sections.quickLinks.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      colors.status.hover.info,
                      'transition-all duration-200 hover:translate-x-1 py-2 flex items-center min-h-[44px]'
                    )}
                  >
                    <BodySmall className={colors.text.secondary}>{link.name}</BodySmall>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <H4 className='mb-4 flex items-center gap-2'>
              <Code2
                size={20}
                className='transition-transform hover:rotate-12'
                aria-hidden='true'
              />
              {layout.footer.sections.techStack.title}
            </H4>
            <div className='flex flex-wrap gap-2 max-w-52'>
              {layout.footer.sections.techStack.skills.map(skill => (
                <span
                  key={skill}
                  className={`px-3 py-1 bg-zinc-800/50 text-xs rounded-full border border-zinc-700 ${colors.text.tertiary}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <H4 className='mb-4 flex items-center gap-2'>
              <Briefcase
                size={20}
                className='transition-transform hover:rotate-12'
                aria-hidden='true'
              />
              {layout.footer.sections.availability.title}
            </H4>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <CheckCircle2
                  size={18}
                  className={clsx(colors.status.success, 'transition-transform hover:rotate-12')}
                  aria-hidden='true'
                />
                <BodySmall className='text-sm'>
                  {layout.footer.sections.availability.status}
                </BodySmall>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin
                  size={18}
                  className={clsx(colors.status.info, 'transition-transform hover:rotate-12')}
                  aria-hidden='true'
                />
                <span className='text-sm'>{layout.footer.sections.availability.location}</span>
              </div>
            </div>
          </div>

          <div>
            <H4 className='mb-4 flex items-center gap-2'>
              <Mail size={20} className='transition-transform hover:rotate-12' aria-hidden='true' />
              {layout.footer.sections.contact.title}
            </H4>
            <BodySmall className='mb-4 max-w-40'>
              {layout.footer.sections.contact.description}
            </BodySmall>
            <ContactInfo />
          </div>
        </div>

        <div className='pt-8 border-t border-zinc-800'>
          <p className={clsx('text-sm text-center', colors.text.muted)}>
            © {new Date().getFullYear()} {layout.footer.name}. {layout.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
