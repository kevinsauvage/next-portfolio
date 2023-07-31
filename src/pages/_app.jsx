import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.scss';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Analytics />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </>
);

export default MyApp;
