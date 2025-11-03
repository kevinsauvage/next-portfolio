import Script from 'next/script';

import { getUmamiScriptProps } from '@/lib/analytics';

const UmamiScript: React.FC<{ umamiId?: string | undefined }> = ({ umamiId }) => {
  const props = getUmamiScriptProps(umamiId);
  if (!props) return null;
  return <Script strategy='lazyOnload' {...props} />;
};

export default UmamiScript;
