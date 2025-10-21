import Link from 'next/link';

import ContactInfo from './ContactInfo';

import { Briefcase, CheckCircle2, Code2, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Career', href: '#career' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'JavaScript',
    'HTML',
    'CSS',
    'Git',
    'REST API',
    'MongoDB',
    'PostgreSQL',
    'Express',
  ];

  return (
    <footer className='border-t border-zinc-800 bg-zinc-950/50'>
      <div className='container m-auto px-6 py-12'>
        {/* Main tagline */}
        <div className='mb-10 text-center md:text-left'>
          <h2 className='text-2xl font-bold text-zinc-100 mb-2'>Kevin Sauvage</h2>
          <p className='text-zinc-400 max-w-2xl'>
            Full-stack developer crafting modern web experiences with passion and precision.
            Let&apos;s build something amazing together.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8'>
          {/* Quick Links */}
          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-zinc-400 hover:text-blue-400 transition-all duration-200 text-sm hover:translate-x-1 inline-block'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4 flex items-center gap-2'>
              <Code2 size={20} />
              Tech Stack
            </h3>
            <div className='flex flex-wrap gap-2'>
              {skills.map(skill => (
                <span
                  key={skill}
                  className='px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Status & Availability */}
          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4 flex items-center gap-2'>
              <Briefcase size={20} />
              Availability
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <CheckCircle2 size={18} className='text-green-400' />
                <span className='text-sm text-zinc-300'>Open to opportunities</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin size={18} className='text-blue-400' />
                <span className='text-sm text-zinc-300'>Barcelona, Spain</span>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className='text-zinc-100 text-lg font-semibold mb-4 flex items-center gap-2'>
              <Mail size={20} />
              Get in Touch
            </h3>
            <p className='text-zinc-400 text-sm mb-4'>
              Feel free to reach out for collaborations or just a friendly chat.
            </p>
            <ContactInfo />
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-8 border-t border-zinc-800'>
          <p className='text-zinc-400 text-sm text-center'>
            © {new Date().getFullYear()} Kevin Sauvage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
