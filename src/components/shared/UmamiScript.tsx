'use client';

import Script from 'next/script';

import { flushUmamiQueue, getUmamiScriptProps } from '@/lib/analytics';

interface UmamiScriptProps {
  umamiId?: string | undefined;
  domains?: string | undefined;
}

const UmamiScript: React.FC<UmamiScriptProps> = ({ umamiId, domains }) => {
  const props = getUmamiScriptProps(umamiId, { domains });
  if (!props) return null;
  return <Script strategy='afterInteractive' onLoad={flushUmamiQueue} {...props} />;
};

export default UmamiScript;
