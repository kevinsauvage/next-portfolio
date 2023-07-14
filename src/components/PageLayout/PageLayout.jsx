import Head from 'next/head';

import Aside from '@/components/Aside/Aside';
import Container from '@/components/Container/Container';
import Navigation from '@/components/Nav/Nav';
import { GlobalProvider } from '@/contexts/GlobalContext';

import FloatingNav from '../FloatingNav/FloatingNav';

import styles from './PageLayout.module.scss';

const PageLayout = ({ children, title }) => {
  // eslint-disable-next-line sonarjs/no-nested-template-literals
  const titleSeo = `Kévin Sauvage ${title ? `|  ${title}` : ''}`;

  return (
    <GlobalProvider>
      <div className={styles.PageLayout}>
        <Head>
          <title>{titleSeo}</title>
        </Head>

        <Container classname={styles.container}>
          <Aside />
          <div>{children}</div>
          <header className={styles.header}>
            <Navigation />
            <FloatingNav />
          </header>
        </Container>
      </div>
    </GlobalProvider>
  );
};

export default PageLayout;
