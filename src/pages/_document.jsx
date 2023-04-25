import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
      <meta
        name="description"
        content="Full-stack developer with proficiency in HTML, CSS, JS, React/Next, Svelte. Providing superior digital solutions to meet client needs."
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="og:url" content="https://www.kevin-sauvage.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Kévin Sauvage Portfolio" />
      <meta
        property="og:description"
        content="Full-stack developer with proficiency in HTML, CSS, JS, React/Next, Svelte. Providing superior digital solutions to meet client needs."
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
        content="Full-stack developer with proficiency in HTML, CSS, JS, React/Next, Svelte. Providing superior digital solutions to meet client needs."
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/kevincloudname/image/upload/v1649841116/portfolio/K%C3%A9vin-Sauvage-Portfolio_bthtru.png"
      />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
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
