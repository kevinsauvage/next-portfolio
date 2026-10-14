import Link from 'next/link';

import ButtonContent from './ButtonContent';
import { type ButtonSize, type ButtonVariant, getButtonClasses } from './buttonStyles';

type ButtonLinkProps = {
  label: string;
  svg?: React.ReactNode;
  variant?: ButtonVariant;
  /** Analytics event name; sent by the delegated listener in `AnalyticsTracker`. */
  eventName?: string;
  /** Extra event properties, emitted as `data-analytics-*` attributes. */
  eventProperties?: Record<string, string>;
  size?: ButtonSize;
} & React.ComponentPropsWithoutRef<typeof Link>;

const analyticsAttributes = (
  eventName: string | undefined,
  eventProperties: Record<string, string> | undefined
): Record<string, string> => {
  if (!eventName) return {};

  const attributes: Record<string, string> = { 'data-analytics-event': eventName };
  for (const [key, value] of Object.entries(eventProperties ?? {})) {
    attributes[`data-analytics-${key.replaceAll('_', '-')}`] = value;
  }
  return attributes;
};

const ButtonLink = ({
  variant = 'primary',
  label,
  svg,
  size = 'md',
  className,
  eventName,
  eventProperties,
  ...rest
}: ButtonLinkProps) => (
  <Link
    className={getButtonClasses(variant, size, false, className)}
    {...analyticsAttributes(eventName, eventProperties)}
    {...rest}
  >
    <ButtonContent label={label} svg={svg} />
  </Link>
);

export default ButtonLink;
