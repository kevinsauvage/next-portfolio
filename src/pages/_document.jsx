import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en" className="theme-dark">
    <Head>
      <meta
        name="description"
        content="Looking for a reliable full-stack web developer? Check out Kévin Sauvage's portfolio featuring expert-level skills in Javascript, React.js, and Next.js. Let's create something amazing together"
      />

      <meta name="google-site-verification" content="oklUq91tpHdbyYCySQE3l3LtgKkzC-WA8pgnt0vqlbc" />
      <meta property="og:url" content="https://www.kevin-sauvage.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Kévin Sauvage Portfolio" />
      <meta
        property="og:description"
        content="Looking for a reliable full-stack web developer? Check out Kévin Sauvage's portfolio featuring expert-level skills in Javascript, React.js, and Next.js. Let's create something amazing together"
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/kevincloudname/image/upload/v1649841116/portfolio/K%C3%A9vin-Sauvage-Portfolio_bthtru.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="kevin-sauvage.com" />
      <meta property="twitter:url" content="https://www.kevin-sauvage.com/" />
      <meta name="twitter:title" content="Kévin Sauvage Portfolio" />
      <meta
        name="twitter:description"
        content="Looking for a reliable full-stack web developer? Check out Kévin Sauvage's portfolio featuring expert-level skills in Javascript, React.js, and Next.js. Let's create something amazing together"
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/kevincloudname/image/upload/v1649841116/portfolio/K%C3%A9vin-Sauvage-Portfolio_bthtru.png"
      />
      <link rel="canonical" href="https://www.kevin-sauvage.com/" />

      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;500;600&family=Julius+Sans+One&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
