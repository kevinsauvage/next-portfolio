import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { Body, BodySmall, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { iconSizes } from '@/design-system/tokens';

import { Award, Building2, Calendar, ExternalLink } from 'lucide-react';

type CertificationCardProps = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  index: number;
};

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  description,
  credentialUrl,
  skills,
  index,
}) => {
  const safeCredentialUrl = (() => {
    if (!credentialUrl) return undefined;
    try {
      const parsed = new URL(credentialUrl);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
        ? credentialUrl
        : undefined;
    } catch {
      return undefined;
    }
  })();
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
        <div className='flex items-start justify-between mb-0'>
          <div className='flex items-start gap-4 flex-1'>
            <CardIcon variant='primary' className='flex-shrink-0'>
              <Award
                size={iconSizes.xl}
                className='text-white transition-transform group-hover:rotate-12 group-hover:scale-110'
                strokeWidth={1.5}
                aria-hidden='true'
              />
            </CardIcon>
            <div className='flex-1 min-w-0'>
              <H3
                id={`cert-${index}`}
                className='group-hover:text-primary-400 transition-all duration-300 text-xl md:text-2xl leading-tight mb-1'
              >
                {title}
              </H3>
              <div className='flex items-center gap-4 flex-wrap'>
                <div className='flex items-center gap-2'>
                  <Building2
                    size={iconSizes.sm}
                    className='text-purple-400 transition-transform group-hover:rotate-12'
                    strokeWidth={1.5}
                    aria-hidden='true'
                  />
                  <Body className='group-hover:text-zinc-200 transition-colors'>{issuer}</Body>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar size={iconSizes.sm} className='text-zinc-500' aria-hidden='true' />
                  <BodySmall className='font-medium'>
                    <time dateTime={date}>{date}</time>
                  </BodySmall>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-6 flex-1'>
          <Body className='group-hover:text-zinc-200 transition-colors leading-relaxed'>
            {description}
          </Body>
        </div>
        <div className='flex flex-wrap gap-2'>
          {skills.map(skill => (
            <BodySmall key={skill}>{skill}</BodySmall>
          ))}
        </div>

        {safeCredentialUrl && (
          <a
            href={safeCredentialUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 py-2 text-sm ml-auto font-medium text-primary-300 rounded-lg hover:text-primary-200 transition-all duration-300 group/link'
          >
            <ExternalLink
              size={iconSizes.sm}
              className='transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
              aria-hidden='true'
            />
            <span>{sections.certifications.button}</span>
            <span className='sr-only'> for {title}</span>
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationCard;
