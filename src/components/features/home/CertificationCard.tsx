import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, Caption, H4 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { colors, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';
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
        {/* Header */}
        <div className='flex items-start gap-3 mb-4'>
          <CardIcon variant='primary' className='flex-shrink-0 mt-0.5'>
            <Award
              size={iconSizes.lg}
              className={clsx(
                colors.text.primary,
                'transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'
              )}
              strokeWidth={1.5}
              aria-hidden='true'
              tabIndex={-1}
            />
          </CardIcon>

          <div className='flex-1 min-w-0 space-y-1'>
            <H4
              id={`cert-${index}`}
              className={clsx(
                'transition-colors duration-300 leading-snug',
                colors.brandColors.groupHover.primary400
              )}
            >
              {title}
            </H4>

            {/* Metadata row */}
            <div className='flex items-center gap-3 flex-wrap'>
              <div className='flex items-center gap-1.5'>
                <Building2
                  size={iconSizes.xs}
                  className={clsx(colors.brandColors.purple, 'flex-shrink-0')}
                  strokeWidth={1.5}
                  aria-hidden='true'
                  tabIndex={-1}
                />
                <Caption className={clsx('transition-colors', colors.text.secondary)}>
                  {issuer}
                </Caption>
              </div>
              <span className='text-zinc-600 text-xs'>•</span>
              <div className='flex items-center gap-1.5'>
                <Calendar
                  size={iconSizes.xs}
                  className={clsx(colors.text.muted, 'flex-shrink-0')}
                  aria-hidden='true'
                  tabIndex={-1}
                />
                <Caption className={colors.text.muted}>
                  <time dateTime={date}>{date}</time>
                </Caption>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <BodySmall
          className={clsx(
            'flex-1 mb-5 transition-colors leading-relaxed',
            colors.text.secondary,
            colors.text.groupHover.secondary
          )}
        >
          {description}
        </BodySmall>

        {/* Skills Tags */}
        <div className='flex flex-wrap gap-1.5 mb-4'>
          {skills.map(skill => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>

        {/* Credential Link */}
        {safeCredentialUrl && (
          <a
            href={safeCredentialUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={clsx(
              'inline-flex items-center gap-1.5 mt-auto pt-3 text-xs font-medium',
              'border-t border-zinc-800/50',
              'transition-all duration-300 group/link',
              colors.brandColors.primary[300],
              colors.brandColors.hover.primary200
            )}
          >
            <ExternalLink
              size={iconSizes.xs}
              className='transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
              aria-hidden='true'
              tabIndex={-1}
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
