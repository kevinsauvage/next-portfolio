import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:url" content="https://www.kevin-sauvage.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kévin Sauvage Portfolio" />
        <meta
          property="og:description"
          content="I'm Kévin Sauvage. The main area of my expertise is front-end development, HTML, CSS, JS and I also have experience in back end using Node.js, Express.js."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/kevincloudname/image/upload/v1647285290/portfolio/portfolio_home_3_ahmilj.png"
        />
        <meta name="twitter:card" content="/portfolio_home.png" />
        <meta property="twitter:domain" content="kevin-sauvage.com" />
        <meta property="twitter:url" content="https://www.kevin-sauvage.com/" />
        <meta name="twitter:title" content="Kévin Sauvage Portfolio" />
        <meta
          name="twitter:description"
          content="I'm Kévin Sauvage. The main area of my expertise is front-end development, HTML, CSS, JS and I also have experience in back end using Node.js, Express.js."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/kevincloudname/image/upload/v1647285290/portfolio/portfolio_home_3_ahmilj.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
