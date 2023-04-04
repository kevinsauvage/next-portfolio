import useSmoothScroll from '../hooks/useSmoothScroll';

import '../../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  useSmoothScroll();
  return <Component {...pageProps} />;
};

export default MyApp;
