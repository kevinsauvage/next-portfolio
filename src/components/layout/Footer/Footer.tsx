import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import { layout } from '@/config/content';

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
          <h2 className='text-2xl font-bold text-zinc-100 mb-2'>{layout.footer.name}</h2>
          <p className='text-zinc-200 max-w-2xl font-light'>{layout.footer.tagline}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8'>
          <nav aria-label='Footer navigation'>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4'>
              {layout.footer.sections.quickLinks.title}
            </h3>
            <ul className='space-y-2'>
              {layout.footer.sections.quickLinks.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-zinc-200 hover:text-blue-400 transition-all duration-200 text-sm hover:translate-x-1 py-2 flex items-center min-h-[44px]'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4 flex items-center gap-2'>
              <Code2
                size={20}
                className='transition-transform hover:rotate-12'
                aria-hidden='true'
              />
              {layout.footer.sections.techStack.title}
            </h3>
            <div className='flex flex-wrap gap-2'>
              {layout.footer.sections.techStack.skills.map(skill => (
                <span
                  key={skill}
                  className='px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4 flex items-center gap-2'>
              <Briefcase
                size={20}
                className='transition-transform hover:rotate-12'
                aria-hidden='true'
              />
              {layout.footer.sections.availability.title}
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <CheckCircle2
                  size={18}
                  className='text-green-400 transition-transform hover:rotate-12'
                  aria-hidden='true'
                />
                <span className='text-sm text-zinc-200'>
                  {layout.footer.sections.availability.status}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin
                  size={18}
                  className='text-blue-400 transition-transform hover:rotate-12'
                  aria-hidden='true'
                />
                <span className='text-sm text-zinc-200'>
                  {layout.footer.sections.availability.location}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4 flex items-center gap-2'>
              <Mail size={20} className='transition-transform hover:rotate-12' aria-hidden='true' />
              {layout.footer.sections.contact.title}
            </h3>
            <p className='text-zinc-200 text-sm mb-4 font-light'>
              {layout.footer.sections.contact.description}
            </p>
            <ContactInfo />
          </div>
        </div>

        <div className='pt-8 border-t border-zinc-800'>
          <p className='text-zinc-400 text-sm text-center'>
            © {new Date().getFullYear()} {layout.footer.name}. {layout.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
