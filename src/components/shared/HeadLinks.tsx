const HeadLinks = () => {
  return (
    <>
      {/* No preconnect to googletagmanager.com: a connection hint reaches Google
          before the visitor has consented. GTM loads lazily once they do. */}
      <link rel='preconnect' href='https://www.google.com' crossOrigin='anonymous' />
      <link rel='dns-prefetch' href='https://www.google.com' />
      <meta name='theme-color' content='#000000' />
      <noscript>
        <style>{'.reveal{opacity:1 !important;transform:none !important;}'}</style>
      </noscript>
    </>
  );
};

export default HeadLinks;
