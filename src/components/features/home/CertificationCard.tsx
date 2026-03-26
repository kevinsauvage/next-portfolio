import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, Caption, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import { Award, Building2, Calendar, ExternalLink } from 'lucide-react';

type CertificationCardProps = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  index: number;
};

const CertificationHeader = ({
  title,
  issuer,
  date,
  index,
}: {
  title: string;
  issuer: string;
  date: string;
  index: number;
}) => {
  return (
    <div className='flex items-start gap-3 mb-4'>
      <CardIcon variant='primary' className='flex-shrink-0 mt-0.5'>
        <Award
          size={24}
          className='text-zinc-50 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'
          strokeWidth={1.5}
          aria-hidden='true'
          tabIndex={-1}
        />
      </CardIcon>

      <div className='flex-1 min-w-0 space-y-1'>
        <H3
          id={`cert-${index}`}
          size='sm'
          className='transition-colors duration-300 leading-snug group-hover:text-primary-400'
        >
          {title}
        </H3>

        <div className='flex items-center gap-3 flex-wrap'>
          <div className='flex items-center gap-1.5'>
            <Building2
              size={14}
              className='text-purple-400 flex-shrink-0'
              strokeWidth={1.5}
              aria-hidden='true'
              tabIndex={-1}
            />
            <Caption className='transition-colors text-zinc-200'>{issuer}</Caption>
          </div>
          <span className='text-zinc-600 text-xs'>•</span>
          <div className='flex items-center gap-1.5'>
            <Calendar
              size={14}
              className='text-zinc-400 flex-shrink-0'
              aria-hidden='true'
              tabIndex={-1}
            />
            <Caption className='text-zinc-400'>
              <time dateTime={date}>{date}</time>
            </Caption>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificationDescription = ({ description }: { description: string }) => {
  return (
    <BodySmall className='flex-1 mb-5 transition-colors leading-relaxed text-zinc-200 group-hover:text-zinc-200'>
      {description}
    </BodySmall>
  );
};

const CertificationSkills = ({ skills }: { skills: string[] }) => {
  return (
    <div className='flex flex-wrap gap-1.5 mb-4'>
      {skills.map(skill => (
        <Tag key={skill}>{skill}</Tag>
      ))}
    </div>
  );
};

const CredentialLink = ({
  credentialUrl,
  title,
  certId,
}: {
  credentialUrl: string;
  title: string;
  certId: string;
}) => {
  return (
    <a
      href={credentialUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center gap-1.5 mt-auto pt-3 text-xs font-medium border-t border-zinc-800/50 transition-all duration-300 group/link text-primary-300 hover:text-primary-200'
      data-umami-event={UMAMI_EVENTS.CERT_CREDENTIAL_CLICK}
      data-umami-event-cert-id={certId}
    >
      <ExternalLink
        size={14}
        className='transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
        aria-hidden='true'
        tabIndex={-1}
      />
      <span>{sections.certifications.button}</span>
      <span className='sr-only'> for {title}</span>
    </a>
  );
};

const CertificationCard: React.FC<CertificationCardProps> = ({
  id,
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
    if (credentialUrl.startsWith('/')) return credentialUrl;
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
        <CertificationHeader title={title} issuer={issuer} date={date} index={index} />
        <CertificationDescription description={description} />
        <CertificationSkills skills={skills} />
        {safeCredentialUrl && (
          <CredentialLink credentialUrl={safeCredentialUrl} title={title} certId={id} />
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationCard;
