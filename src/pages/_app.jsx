import { Analytics } from '@vercel/analytics/react';

import useSmoothScroll from '../hooks/useSmoothScroll';

import '../../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  useSmoothScroll();
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
