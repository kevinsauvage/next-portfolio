import Head from 'next/head';

import Aside from '@/components/Aside/Aside';
import Container from '@/components/Container/Container';
import Header from '@/components/Header/Header';
import { GlobalProvider } from '@/contexts/GlobalContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

import Notification from '../Notification/Notification';

import styles from './PageLayout.module.scss';

const PageLayout = ({ children, title }) => {
  // eslint-disable-next-line sonarjs/no-nested-template-literals
  const titleSeo = `Kévin Sauvage ${title ? `|  ${title}` : ''}`;

  return (
    <GlobalProvider>
      <ThemeProvider>
        <NotificationProvider>
          <div className={styles.PageLayout}>
            <Head>
              <title>{titleSeo}</title>
            </Head>
            <Container classname={styles.container}>
              <Aside />
              <div className={styles.children}>{children}</div>
              <Header />
            </Container>
          </div>
          <Notification multiple />
        </NotificationProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default PageLayout;
