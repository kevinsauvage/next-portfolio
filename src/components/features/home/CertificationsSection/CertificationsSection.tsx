import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Body, BodySmall, H4, H5 } from '@/components/ui/Typography';
import certifications from '@/config/content/certifications';
import { gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { Award, Building2, Calendar, ExternalLink } from 'lucide-react';

const CertificationCard: React.FC<{
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  index: number;
}> = ({ title, issuer, date, description, credentialUrl, skills, index }) => {
  return (
    <Card
      hover='subtle'
      size='md'
      glow='secondary-accent'
      animationIndex={index}
      aria-labelledby={`cert-${index}`}
      className='group relative h-full'
    >
      <CardContent spacing='lg' className='relative z-10 h-full flex flex-col'>
        {/* Header Section */}
        <div className='flex items-start justify-between mb-0'>
          <div className='flex items-start gap-4 flex-1'>
            <CardIcon variant='primary' className='flex-shrink-0'>
              <Award
                size={iconSizes.lg}
                className='text-white transition-transform group-hover:rotate-12 group-hover:scale-110'
                strokeWidth={1.5}
                aria-hidden='true'
              />
            </CardIcon>
            <div className='flex-1 min-w-0'>
              <H4
                id={`cert-${index}`}
                className='group-hover:text-primary-400 transition-all duration-300 text-xl md:text-2xl leading-tight'
              >
                {title}
              </H4>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <div className='flex items-center gap-2'>
            <Building2
              size={iconSizes.sm}
              className='text-purple-400 transition-transform group-hover:rotate-12'
              strokeWidth={1.5}
              aria-hidden='true'
            />
            <H5 className='text-zinc-300 group-hover:text-zinc-200 transition-colors'>{issuer}</H5>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={iconSizes.sm} className='text-zinc-500' aria-hidden='true' />
            <BodySmall className='text-zinc-400 font-medium'>
              <time dateTime={date}>{date}</time>
            </BodySmall>
          </div>
        </div>

        {/* Description Section */}
        <div className='mb-6 flex-1'>
          <Body className='text-zinc-300 group-hover:text-zinc-200 transition-colors leading-relaxed'>
            {description}
          </Body>
        </div>
        <div className='flex flex-wrap gap-2'>
          {skills.map(skill => (
            <span
              key={skill}
              className='px-3 py-1.5 text-sm font-medium text-primary-300 bg-primary-950/40 border border-primary-800/40 rounded-full group-hover:border-primary-700/60 group-hover:bg-primary-900/40 group-hover:text-primary-200 transition-all duration-300'
            >
              {skill}
            </span>
          ))}
        </div>

        {credentialUrl && (
          <a
            href={credentialUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 py-2 text-sm ml-auto font-medium text-primary-300 rounded-lg hover:text-primary-200 transition-all duration-300 group/link'
          >
            <ExternalLink
              size={iconSizes.sm}
              className='transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
              aria-hidden='true'
            />
            <span>View Credential</span>
            <span className='sr-only'> for {title}</span>
          </a>
        )}
      </CardContent>
    </Card>
  );
};

const CertificationsSection: React.FC = () => {
  return (
    <Section id='certifications'>
      <div className={clsx(stackSpacing['2xl'])}>
        <SectionHeader
          overline='Continuous Learning'
          title='Certifications & Achievements'
          description='Committed to staying current with industry best practices and emerging technologies through continuous education and professional development.'
        />

        <div className={clsx('grid grid-cols-1 lg:grid-cols-2', gapSpacing.xl)}>
          {certifications.map((cert, index) => (
            <CertificationCard key={`${cert.issuer}-${cert.title}`} {...cert} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CertificationsSection;
