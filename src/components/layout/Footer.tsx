import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import CookieSettingsButton from '@/components/shared/CookieSettingsButton';
import { BodySmall, H3, H4 } from '@/components/ui/Typography';
import { accessibilityFooterLabel, layout, siteMap } from '@/config/content';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import { Briefcase, CheckCircle2, Code2, Mail, MapPin } from 'lucide-react';

const LEGAL_LINK_CLASSES =
  'inline-flex min-h-11 items-center text-zinc-300 underline-offset-4 transition-colors hover:text-primary-400 hover:underline';

const Footer: React.FC = () => {
  return (
    <footer className='border-t border-zinc-800 bg-zinc-950/50' aria-label='Site footer'>
      <div className='container m-auto px-6 py-12'>
        <div className='mb-10 text-center md:text-left'>
          <H3 className='mb-2'>{layout.footer.name}</H3>
          <BodySmall className='max-w-sm'>{layout.footer.tagline}</BodySmall>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          <nav aria-label='Footer navigation'>
            <H4 className='mb-4'>{layout.footer.sections.quickLinks.title}</H4>
            <ul className='grid grid-cols-2 gap-x-4 gap-y-1'>
              {layout.footer.sections.quickLinks.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='hover:text-primary-400 transition-[color,transform] duration-200 hover:translate-x-1 py-1 flex items-center min-h-11'
                    data-analytics-event={ANALYTICS_EVENTS.NAV_SECTION_CLICK}
                    data-analytics-location='footer'
                    data-analytics-section={link.name}
                  >
                    <BodySmall className='text-zinc-200'>{link.name}</BodySmall>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <H4 className='mb-4 flex items-center gap-2'>
              <Code2
                size={20}

                aria-hidden='true'
              />
              {layout.footer.sections.techStack.title}
            </H4>
            <div className='flex flex-wrap gap-2 max-w-52'>
              {layout.footer.sections.techStack.skills.map(skill => (
                <span
                  key={skill}
                  className='px-3 py-1 bg-zinc-800/50 text-xs rounded-full border border-zinc-700 text-zinc-300'
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

                aria-hidden='true'
              />
              {layout.footer.sections.availability.title}
            </H4>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <CheckCircle2 size={18} className='text-primary-400' aria-hidden='true' />
                <BodySmall className='text-sm'>
                  {layout.footer.sections.availability.status}
                </BodySmall>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin size={18} className='text-secondary-400' aria-hidden='true' />
                <span className='text-sm'>{layout.footer.sections.availability.location}</span>
              </div>
            </div>
          </div>

          <div>
            <H4 className='mb-4 flex items-center gap-2'>
              <Mail size={20} aria-hidden='true' />
              {layout.footer.sections.contact.title}
            </H4>
            <BodySmall className='mb-4 max-w-40'>
              {layout.footer.sections.contact.description}
            </BodySmall>
            <ContactInfo />
          </div>
        </div>

        <div className='pt-8 border-t border-zinc-800 flex flex-col items-center gap-3 sm:flex-row sm:justify-between'>
          <p className='text-sm text-zinc-400'>
            © {new Date().getFullYear()} {layout.footer.name}. {layout.footer.copyright}
          </p>
          <nav aria-label='Legal'>
            <ul className='flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm'>
              <li>
                <Link href='/accessibility' className={LEGAL_LINK_CLASSES}>
                  {accessibilityFooterLabel}
                </Link>
              </li>
              <li>
                <Link href='/site-map' className={LEGAL_LINK_CLASSES}>
                  {siteMap.title}
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
